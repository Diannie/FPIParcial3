document.getElementById('loginForm').onsubmit = function(e){
  alert("ok");
  e.preventDefault();
  var email = document.getElementById("email").value;
  var pass = document.getElementById("pass").value;
  var obj = {"id": 0, "email": email, "name": "", "gender": "",  "pass": pass};
  var userRequest = new XMLHttpRequest();
    userRequest.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        if(respuesta.id===null){
  				  e.preventDefault();
  				  document.getElementById('errores').value = "Contraseña o Correo incorrectos";
  				  document.getElementById('errores').style.display = "block";
  			  }else{
    			  var date = new Date();
    			  date.setTime(date.getTime()+(3*60*1000));
    			  var expires = "; expires="+date.toGMTString();
    			  document.cookie = "usuarioLogueado="+[respuesta.id,respuesta.name,respuesta.email]+expires;
            location.href= "../pokedex.html";
            document.getElementById('navSigin').style.display = "none";
            document.getElementById('navProfile').style.display = "block";
  			  }
      }
    };
    userRequest.open('POST', '/sigin');
    userRequest.setRequestHeader("Content-Type", "application/json");
    userRequest.setRequestHeader("Accept", "application/json");
    userRequest.send(JSON.stringify(obj));
}
