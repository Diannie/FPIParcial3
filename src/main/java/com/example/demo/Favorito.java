package com.example.demo;

public class Favorito {
	private Integer idFavorito;
	private Integer idUsuario;
	private Integer idPokemon;
	private String nombrePokemon;
	private String urlPokemon;
	
	public Favorito() {
		// TODO Auto-generated constructor stub
	}

	public Favorito(Integer idFavorito, Integer idUsuario, Integer idPokemon, String nombrePokemon, String urlPokemon) {
		this.idFavorito = idFavorito;
		this.idUsuario = idUsuario;
		this.idPokemon = idPokemon;
		this.nombrePokemon = nombrePokemon;
		this.urlPokemon = urlPokemon;
	}

	public Integer getIdFavorito() {
		return idFavorito;
	}

	public void setIdFavorito(Integer idFavorito) {
		this.idFavorito = idFavorito;
	}

	public Integer getIdUsuario() {
		return idUsuario;
	}

	public void setIdUsuario(Integer idUsuario) {
		this.idUsuario = idUsuario;
	}

	public Integer getIdPokemon() {
		return idPokemon;
	}

	public void setIdPokemon(Integer idPokemon) {
		this.idPokemon = idPokemon;
	}

	public String getNombrePokemon() {
		return nombrePokemon;
	}

	public void setNombrePokemon(String nombrePokemon) {
		this.nombrePokemon = nombrePokemon;
	}

	public String getUrlPokemon() {
		return urlPokemon;
	}

	public void setUrlPokemon(String urlPokemon) {
		this.urlPokemon = urlPokemon;
	}
		

}
