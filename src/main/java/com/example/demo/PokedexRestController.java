package com.example.demo;

import java.util.ArrayList;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class PokedexRestController {
	@Autowired
	Conexion conexion;
	
	@RequestMapping(value = "/login", method = RequestMethod.POST ,headers="Accept=application/json")
	public Usuario login(@RequestBody Usuario usuario) {
		conexion.connect();		
		if(usuario != null) {
			Usuario user = conexion.findByCorreo(usuario.getEmail());
			if(user != null) {
				if(user.getPass().equals(usuario.getPass())) {
					conexion.close();
					System.out.println("Ha ingresado "+user.getName());
					return user;
				}				
			}			
		}
		conexion.close();
		return null;
	}
	
	@RequestMapping(value = "/register", method = RequestMethod.POST ,headers="Accept=application/json")
	public boolean register(@RequestBody Usuario usuario) {
		conexion.connect();
		if(usuario != null) {
			if (conexion.saveUsuario(usuario)) {
				System.out.println("Se ha registrado"+usuario.getEmail());
				conexion.close();
				return true;
			}
		}
		conexion.close();
		return false;
	}
	
	
	
	@RequestMapping( value="/favorites/{idUsuario}", method = RequestMethod.GET)
	public ArrayList<Favorito> allFavorites(@PathVariable int idUsuario) {
		conexion.connect();
		ArrayList<Favorito> favoritos = conexion.favoritos(idUsuario);		
		conexion.close();
		return favoritos;
	}

}
