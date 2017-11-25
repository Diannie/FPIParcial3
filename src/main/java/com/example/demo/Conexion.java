package com.example.demo;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.logging.Level;
import java.util.logging.Logger;

import org.springframework.stereotype.Component;

@Component
public class Conexion {
	private String url = "C:\\Users\\Merling\\Desktop\\FPIParcial3\\src\\main\\java\\com\\example\\demo\\pokedex.db";
	private Connection connect;

	public void connect() {
		try {
			connect = DriverManager.getConnection("jdbc:sqlite:" + url);
			if (connect != null) {
				System.out.println("Conexion con DB exitosa");
			}
		} catch (SQLException ex) {
			System.err.println("No se ha podido conectar a la base de datos\n" + ex.getMessage());
		}
	}

	public void close() {
		try {
			connect.close();
			System.out.println("Conexion Cerrada");
		} catch (SQLException ex) {
			Logger.getLogger(Conexion.class.getName()).log(Level.SEVERE, null, ex);
		}
	}
	
	public Usuario primerUser(){
		Usuario user = null;		
		try{
			PreparedStatement st = connect.prepareStatement("SELECT * FROM usuarios WHERE idUsuario=?");
			st.setInt(1, 1);
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

	public boolean saveUsuario(Usuario usuario) {
		try {
			if(findByCorreo(usuario.getEmail())==null) {
				PreparedStatement st = connect.prepareStatement("insert into usuarios (emailUsuario, nombreUsuario, generoUsuario, contraUsuario) values (?,?,?,?)");
				st.setString(1, usuario.getEmail());
				st.setString(2, usuario.getName());
				st.setString(3, usuario.getGender());
				st.setString(4, usuario.getPass());
				st.execute();
				return true;
			}else {
				System.out.println("Usuario ya existe");
			}
		} catch (SQLException ex) {
			System.err.println(ex.getMessage());
		}
		return false;
	}

	public void saveFavoritePokemon(Favorito fav) {
		try {
			PreparedStatement st = connect.prepareStatement("insert into favoritos (idUsuario, idPokemon, nombrePokemon, urlPokemon) values (?,?,?,?)");
			st.setInt(1, fav.getIdUsuario());
			st.setInt(2, fav.getIdPokemon());
			st.setString(3, fav.getNombrePokemon());
			st.setString(4, fav.getUrlPokemon());
			st.execute();
		} catch (SQLException ex) {
			System.err.println(ex.getMessage());
		}
	}
	public boolean findFavoriteBy(int idUsuario, int idFavorito) {
		Favorito fav = null;
		try{
			PreparedStatement st = connect.prepareStatement("SELECT * FROM favoritos WHERE idUsuario=? and idFavorito=?");
			st.setInt(1, idUsuario);
			st.setInt(2, idFavorito);
			ResultSet rs = st.executeQuery();
			while (rs.next()) {
				fav = new Favorito(rs.getInt(1), rs.getInt(2), rs.getInt(3), rs.getString(4), rs.getString(5));
			}
			return true;
		}catch(SQLException ex){
			System.err.println(ex.getMessage());			
		}
		return false;		
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
	
	public ArrayList<Favorito> favoritos(int idUsuario){
		ArrayList<Favorito> temp = new ArrayList<>();
		try {
			PreparedStatement st = connect.prepareStatement("SELECT * FROM favoritos WHERE idUsuario=?");
			st.setInt(1, idUsuario);
			ResultSet rs = st.executeQuery();
			while (rs.next()) {
				Favorito fav = new Favorito(rs.getInt(1), rs.getInt(2), rs.getInt(3), rs.getString(4), rs.getString(5));
				temp.add(fav);
			}
		} catch (SQLException ex) {
			System.err.println(ex.getMessage());
		}
		return temp;
	}
}