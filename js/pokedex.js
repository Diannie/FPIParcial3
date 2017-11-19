var pokemon;
var especie;
var evolucion;
var pokemons = [];

window.onload = function() {
  document.getElementById('busqueda').style.display='none';
  RequestAutocompletar();
}

function Existe(vector, texto) {
  var tamanio = vector.length;
  for (var i = 0; i < tamanio; i++) {
    if (vector[i] == texto) {
      return true;
    }
  }
  return false;
}

///////////////////////////////Buscador///////////////////////////////////////
function RequestAutocompletar() {
  var request = new XMLHttpRequest();
  request.onreadystatechange=function() {
  if (this.readyState == 4 && this.status == 200) {
    var pokemon = JSON.parse(this.responseText);
      for(i=0 ; i<802 ; i++){
        pokemons.push(String(pokemon.results[i].name));
      }
      LlenarDatalist(pokemons);
    }
  };
  request.open("GET", "https://pokeapi.co/api/v2/pokemon/?limit=802", true);
  request.send();
}

function LlenarDatalist(pokemons){
  for(i=0; i<802 ; i++){
    var opcion = document.getElementById("pokemons");
    var node = document.createElement("option");
    var textnode = document.createTextNode(pokemons[i]);
    node.appendChild(textnode);
    node.setAttribute("id",i);
    node.setAttribute("name",pokemons[i]);
    opcion.appendChild(node);
    console.log("OK");
  }
}
////////////////////////////////Consumir////////////////////////////////////////

function LlenarConEnter(e) {
  if (e.keyCode == 13) {
    var pokebuscado = document.getElementById('resultadoBusqueda').value;

    if (Existe(pokemons, pokebuscado)) {
      document.getElementById('sinBusqueda').style.display='none';
      var optionS = document.getElementsByName(pokebuscado);
      var pokeidS = optionS[0].getAttribute('id');
      var pokeid = parseInt(pokeidS);
      requestPokemon(pokeid+1);
    }else {
      alert("The search it's not valid");
    }
  }
}

function requestPokemon(pokeid) {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange=function() {
  if (this.readyState == 4 && this.status == 200) {
    pokemon = JSON.parse(this.responseText);
    var urlSpecies = pokemon.species.url;
    requestSpecies(urlSpecies);
  }
  };
  xhttp.open("GET", "https://pokeapi.co/api/v2/pokemon/"+pokeid, true);
  xhttp.send();
}

function requestSpecies(urlSpecies) {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange=function() {
  if (this.readyState == 4 && this.status == 200) {
    especie = JSON.parse(this.responseText);
    var urlEvolution = especie.evolution_chain.url;
    requestEvolution(urlEvolution);
  }
  };
  xhttp.open("GET", urlSpecies, true);
  xhttp.send();
}

function requestEvolution(urlEvolution) {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange=function() {
  if (this.readyState == 4 && this.status == 200) {
    evolucion = JSON.parse(this.responseText);
    Pokeinfo();
  }
  };
  xhttp.open("GET", urlEvolution, true);
  xhttp.send();
}

function Pokeinfo() {
  //Imagen
  document.getElementById('imagen').src = pokemon.sprites.front_default;
  //ID
  document.getElementById('pokeID').innerHTML = pokemon.id;
  //Nombre
  document.getElementById('pokeNombre').innerHTML = pokemon.species.name;
  //Tipos
  for (var i = 0; i < pokemon.types.length; i++) {
  document.getElementById('pokeTipo').innerHTML = pokemon.types[i].type.name+"<br>";
  }
  //Ubicacion
  if (especie.habitat != null && especie.habitat != "undefined") {
      document.getElementById('pokeUbicacion').innerHTML = especie.habitat.name;
  } else
  {
      document.getElementById('pokeUbicacion').innerHTML = "unknown";
  }
  //Movimientos
  document.getElementById("listaMovs").innerHTML = "";
  for (var i = 0; i < 5; i++) {
    var liMovs = document.getElementById("listaMovs");
    var node = document.createElement("li");
    var textnode = document.createTextNode(pokemon.moves[i].move.name);
    node.appendChild(textnode);
    node.setAttribute("class","nav-abilities-li");
    liMovs.appendChild(node);
  }
  //Descripcion
  document.getElementById('pokeDescripcion').innerHTML = especie.flavor_text_entries[2].flavor_text;
  //Generar evoluciones
  //var pokemon;
  //var especie;
  //var evolucion;
  //var pokemons = [];
  //Evolucion por defecto
  var areaDivEvoluciones = document.getElementById('areaEvoluciones');
  areaDivEvoluciones.innerHTML = "";
  var evolutionArray = evolucion.chain;
  
  for (var i = -1; i < evolutionArray.evolves_to.length; i++) {
    if (i<0) {
      var divEvolucion = document.createElement("DIV");
      var divEvolucionImg = document.createElement("DIV");
      var divEvolucionName = document.createElement("DIV");
      var hTitulo = document.createElement("H1");
      var iImg = document.createElement("IMG");
      //var eImg.src;//Luego
      var eName = document.createTextNode(evolutionArray.species.name);
      iImg.setAttribute("class","img-pokemon-evolucion-img");
      //iImg.setAttribute("src","#");
      hTitulo.setAttribute("class","titulo-pokemon-evolucion");
      divEvolucionImg.setAttribute("class","div-pokemon-evolucion-img");
      divEvolucionName.setAttribute("class","div-pokemon-evolucion-name");
      divEvolucion.setAttribute("class","div-pokemon-evolucion");
      hTitulo.appendChild(eName);
      divEvolucionImg.appendChild(iImg);
      divEvolucionName.appendChild(hTitulo);
      divEvolucion.appendChild(divEvolucionImg);
      divEvolucion.appendChild(divEvolucionName);
      areaDivEvoluciones.appendChild(divEvolucion);
    }else {
      var divEvolucion = document.createElement("DIV");
      var divEvolucionImg = document.createElement("DIV");
      var divEvolucionName = document.createElement("DIV");
      var hTitulo = document.createElement("H1");
      var iImg = document.createElement("IMG");
      //var eImg.src;//Luego
      var eName = document.createTextNode(evolutionArray.evolves_to[i].species.name);
      iImg.setAttribute("class","img-pokemon-evolucion-img");
      //iImg.setAttribute("src","#");
      hTitulo.setAttribute("class","titulo-pokemon-evolucion");
      divEvolucionImg.setAttribute("class","div-pokemon-evolucion-img");
      divEvolucionName.setAttribute("class","div-pokemon-evolucion-name");
      divEvolucion.setAttribute("class","div-pokemon-evolucion");
      hTitulo.appendChild(eName);
      divEvolucionImg.appendChild(iImg);
      divEvolucionName.appendChild(hTitulo);
      divEvolucion.appendChild(divEvolucionImg);
      divEvolucion.appendChild(divEvolucionName);
      areaDivEvoluciones.appendChild(divEvolucion);
    }
  }



  //Muestra el div de la busqueda
  document.getElementById('busqueda').style.display='block';
}
