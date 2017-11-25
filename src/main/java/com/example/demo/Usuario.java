package com.example.demo;

public class Usuario {
	private Integer id;
	private String email;
	private String name;
	private String gender;
	private String pass;

	public Usuario() {
		
	}

public Usuario(Integer id, String email, String name, String gender, String pass) {
	this.id = id;
	this.email = email;
	this.name = name;
	this.gender = gender;
	this.pass = pass;
}

public Integer getId() {
	return id;
}

public void setId(Integer id) {
	this.id = id;
}

public String getEmail() {
	return email;
}

public void setEmail(String email) {
	this.email = email;
}

public String getName() {
	return name;
}

public void setName(String name) {
	this.name = name;
}

public String getGender() {
	return gender;
}

public void setGender(String gender) {
	this.gender = gender;
}

public String getPass() {
	return pass;
}

public void setPass(String pass) {
	this.pass = pass;
}



}
