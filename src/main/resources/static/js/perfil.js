window.onload = function() {
    document.getElementById('usuarioLogueado').style.display='none';
    cargarFavoritos();
}

function verificarCookie(){
	if(document.cookie.length==0){
		location.href = "pokedex.html"
	}else{
    document.getElementById("usuarioLogueado").innerHTML = document.cookie.split(",")[1];
	}
}

verificarCookie();
setInterval(function(){verificarCookie()},5000);

function cargarFavoritos() {
  userLoged = document.getElementById('usuarioLogueado').value;
  div = document.getElementById('areaFavoritos');
  var favRequest = new XMLHttpRequest();
    favRequest.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
         var respuesta = JSON.parse(this.responseText);
         for (var i in respuesta) {
           GenerarDivFavoritos(div, respuesta[i].urlPokemon, respuesta[i].nombrePokemon, respuesta[i].idPokemon)
         }
      }
    };
    favRequest.open('GET', '/favorites/'+userLoged);
    favRequest.send();

}

function GenerarDivFavoritos(divPrincipal, ruta, nombre, idDeseado) {
  var divEvolucion = document.createElement("DIV");
  var divEvolucionImg = document.createElement("DIV");
  var divEvolucionName = document.createElement("DIV");
  var hTitulo = document.createElement("H1");
  var iImg = document.createElement("IMG");
  var eName = document.createTextNode(nombre);
  iImg.setAttribute("class","img-pokemon-evolucion-img");
  iImg.setAttribute("src",ruta);
  hTitulo.setAttribute("class","titulo-pokemon-evolucion");
  divEvolucionImg.setAttribute("class","div-pokemon-evolucion-img");
  divEvolucionName.setAttribute("class","div-pokemon-evolucion-name");
  divEvolucion.setAttribute("class","div-pokemon-evolucion");
  divEvolucion.setAttribute("onclick","Capturar("+idDeseado+")");
  hTitulo.appendChild(eName);
  divEvolucionImg.appendChild(iImg);
  divEvolucionName.appendChild(hTitulo);
  divEvolucion.appendChild(divEvolucionImg);
  divEvolucion.appendChild(divEvolucionName);
  divPrincipal.appendChild(divEvolucion);
}

function Capturar(idDeseado) {
  alert("El id de este pokemon es"+idDeseado);
}
