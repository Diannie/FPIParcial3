function CargarSignin() {
  document.getElementById('signup').style.display = 'none';
  document.getElementById('signin').style.display = 'block';
  document.getElementById('errores').style.display = 'none';
}
function CargarSignup() {
  document.getElementById('signup').style.display = 'block';
  document.getElementById('signin').style.display = 'none';
  document.getElementById('errores').style.display = 'none';
}

document.getElementById('loginForm').onsubmit = function(e){
  e.preventDefault();
  var email = document.getElementById("email").value;
  var pass = document.getElementById("pass").value;
  var obj = {"id": 0, "email": email, "name": "", "gender": "",  "pass": pass};
  var userRequest = new XMLHttpRequest();
    userRequest.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
    	  if (this.responseText!="") {
    		  var respuesta = JSON.parse(this.responseText);
    		  if(respuesta.id===null){
    			  document.getElementById('errores').value = "Contraseña o Correo incorrectos";
    			  document.getElementById('errores').style.display = "block";
    		  }else{
    			  var date = new Date();
    			  date.setTime(date.getTime() + (180 * 1000));
    			  var expires = "; expires="+date.toGMTString();
    			  document.cookie = "usuarioLogueado="+[respuesta.id,respuesta.name,respuesta.email]+expires;
    	      location.href= "../pokedex.html";
    		  }
    	  }else{
    		  document.getElementById('errores').value = "Contraseña o Correo incorrectos";
			  document.getElementById('errores').style.display = "block";
    	  }

      }
    };
    userRequest.open('POST', '/sigin');
    userRequest.setRequestHeader("Content-Type", "application/json");
    userRequest.setRequestHeader("Accept", "application/json");
    userRequest.send(JSON.stringify(obj));
}

////////////////////////////////////REGISTRO///////////////////////////////////
document.getElementById('registroForm').onsubmit = function(e){
  e.preventDefault();
  var email = document.getElementById("emailReg").value;
  var name = document.getElementById("nameReg").value;
  var gender = document.getElementById("generoReg").value;
  var pass = document.getElementById("passReg").value;
  var obj = {"id": 0, "email": email, "name": name, "gender": gender,  "pass": pass};
  var userRequest = new XMLHttpRequest();
  userRequest.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      var respuesta = JSON.parse(this.responseText);
      if (respuesta) {
        var date = new Date();
        date.setTime(date.getTime() + (180 * 1000));
        var expires = "; expires="+date.toGMTString();
        document.cookie = "usuarioLogueado="+[respuesta.id,respuesta.name,respuesta.email]+expires;
        location.href= "../pokedex.html";
      }else{
        alert("Correo ya registrado");
      }
    }
  };
  userRequest.open('POST', '/register');
  userRequest.setRequestHeader("Content-Type", "application/json");
  userRequest.setRequestHeader("Accept", "application/json");
  userRequest.send(JSON.stringify(obj));
}
