package com.example.demo;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.logging.Level;
import java.util.logging.Logger;

import org.springframework.stereotype.Component;

@Component
public class Conexion {
	String url = "C:/Users/Juan/Documents/GitHub/FPIParcial3/src/main/java/com/example/demo/pokedex.db";
	Connection connect;

	public void connect() {
		try {
			connect = DriverManager.getConnection("jdbc:sqlite:" + url);
			if (connect != null) {
				System.out.println("Conectado");
			}
		} catch (SQLException ex) {
			System.err.println("No se ha podido conectar a la base de datos\n" + ex.getMessage());
		}
	}

	public void close() {
		try {
			connect.close();
		} catch (SQLException ex) {
			Logger.getLogger(Conexion.class.getName()).log(Level.SEVERE, null, ex);
		}
	}

	public Usuario findByCorreo(String correo){
	Usuario user = null;
	try{
		PreparedStatement st = connect.prepareStatement("SELECT * FROM usuarios WHERE emailUsuario=?");
		st.setString(1, correo);
		ResultSet rs = st.executeQuery();
		while (rs.next()) {
			user = new Usuario(rs.getInt(1), rs.getString(2), rs.getString(3), rs.getString(4), rs.getString(5));
		}
	return user;
	}catch(SQLException ex){
		System.err.println(ex.getMessage());
		return null;
	}
	}
	
	public Usuario logIn(String email, String contrasena) {
		Usuario user = findByCorreo(email);
		if(user != null) {
			if(user.getPass() == contrasena) {
				return user;
			}
		}
		return user;
	}

	public Usuario saveUsuario(String name, String email, String genero, String password) {
		Usuario user = null;
		try {
			if(findByCorreo(email)==null) {
			PreparedStatement st = connect.prepareStatement("insert into usuarios (emailUsuario, nombreUsuario, generoUsuario, contraUsuario) values (?,?,?,?)");
			st.setString(1, email);
			st.setString(2, name);
			st.setString(3, genero);
			st.setString(4, password);
			st.execute();
			user = findByCorreo(email);
			}else {
				 user = null;
			}
		} catch (SQLException ex) {
			System.err.println(ex.getMessage());
			 user = null;
		}
		return user;
	}

	public void saveFavoritePokemon(int idUsuario, int idPokemon, String nombrePokemon, String urlPokemon) {
		try {
			PreparedStatement st = connect.prepareStatement("insert into favoritos (idUsuario, idPokemon, nombrePokemon, urlPokemon) values (?,?,?,?)");
			st.setInt(1, idUsuario);
			st.setInt(2, idPokemon);
			st.setString(3, nombrePokemon);
			st.setString(4, urlPokemon);
			st.execute();
		} catch (SQLException ex) {
			System.err.println(ex.getMessage());
		}
	}
	
	public void removeFavoritePokemon(int idUsuario, int idPokemon) {
		try {
			PreparedStatement st = connect.prepareStatement("delete from favoritos where idUsuario=? and idPokemon=?");
			st.setInt(1, idUsuario);
			st.setInt(2, idPokemon);
			st.execute();
		} catch (SQLException ex) {
			System.err.println(ex.getMessage());
		}
	}
}