package com.example.demo;

import java.util.ArrayList;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class PokedexRestController {
	@Autowired
	Conexion conexion;

	@RequestMapping(value = "/createUser", method = RequestMethod.POST, headers="Accept=application/json") 
	public Usuario crearUsuario(@RequestBody Usuario usuario) {
		conexion.connect();
		Usuario user = conexion.saveUsuario(usuario.getName(), usuario.getEmail(), usuario.getGender(), usuario.getPass());
		conexion.close();
		return user;
	}

	@RequestMapping(value="/saveFavorite", method = RequestMethod.POST, headers="Accept=application/json")
	public void agregarFavoritos(@RequestBody ArrayList<Object> arreglo) {
		conexion.connect();
		conexion.saveFavoritePokemon(Integer.parseInt(arreglo.get(0).toString()),
				(Integer.parseInt(arreglo.get(1).toString())));
		conexion.close();
		
	}

	@RequestMapping(value = "/logIn", method = RequestMethod.POST, headers="Accept=application/json")
	public Usuario loguearse(@RequestBody Usuario usuario) {
		conexion.connect();
		Usuario user = conexion.buscarUsuarioByCorreo(usuario.getEmail());
		if(user != null) {
			if(!user.getContrasena().equals(usuario.getContrasena())) {
				System.out.println("-"+user.getContrasena()+"-");
				System.out.println("-"+usuario.getContrasena()+"-");
				user = new Usuario(null,null,null,null);
			}
		}else {
			//user = new Usuario(null,null,null,null);
		}
		conexion.close();
		return user;
	}

}
