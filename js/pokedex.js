var pokemon;
var especie;
var evolucion;
var pokemons = [];
var idEvoluciones = [];
var evolutionArray;
var cantidadEv;

window.onload = function() {
  document.getElementById('busqueda').style.display='none';
  RequestAutocompletar();
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

//////////////////////////////Hace set de todo////////////////////////////////
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
  for (var i = 0; i < especie.flavor_text_entries.length; i++) {
				if (especie.flavor_text_entries[i].language.name == "en") {
					var descripcion = especie.flavor_text_entries[i].flavor_text;
					if(descripcion.length > 195){
						descripcion = descripcion.substring(0,195)+"...";
					}
					document.getElementById('pokeDescripcion').innerHTML = descripcion;
					break;
				}
			}

  //Generar evoluciones
  var areaDivEvoluciones = document.getElementById('areaEvoluciones');
  var numeroTercera = 0;
  areaDivEvoluciones.innerHTML = "";
  evolutionArray = evolucion.chain;
  cantidadEv = evolutionArray.evolves_to.length;
  for (var i = -1; i < cantidadEv; i++) {
    if (i<0) {
      idEvoluciones.push(evolucion.chain.species.url.slice(42, -1));
      EvolucionURL(parseInt(idEvoluciones[0]), areaDivEvoluciones, evolutionArray.species.name);

    }else{
      idEvoluciones.push(evolucion.chain.evolves_to[i].species.url.slice(42, -1));
      EvolucionURL(parseInt(idEvoluciones[i+1]), areaDivEvoluciones, evolucion.chain.evolves_to[i].species.name);
      numeroTercera = idEvoluciones.length;
    }
  }
  for (var i = 0; i < evolutionArray.evolves_to.length; i++) {
    for (var j = 0; j < evolutionArray.evolves_to[i].evolves_to.length; j++) {
      idEvoluciones.push(evolucion.chain.evolves_to[i].evolves_to[j].species.url.slice(42, -1));
      EvolucionURL(parseInt(idEvoluciones[numeroTercera]), areaDivEvoluciones, evolutionArray.evolves_to[i].evolves_to[j].species.name);
    }
  }

  //Muestra el div de la busqueda
  document.getElementById('busqueda').style.display='block';
}

///////////////////////////////////Funcionalidades//////////////////////////////

//Carga el pokemon al hacer enter en la busqueda
function LlenarConEnter(e) {
  if (e.keyCode == 13) {
    var pokebuscado = document.getElementById('resultadoBusqueda').value;

    if (Existe(pokemons, pokebuscado)) {
      Limpiar();
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

//Cuenta las terceras evoluciones
function cantidadTerceras(arreglo) {
  var contador = 0;
  for (var i = 0; i < arreglo.length; i++) {
    contador += arreglo[i].evolves_to.length;
  }
  return contador;
}

//Hace el appendChild de los divs de las evoluciones
function GenerarDivEvolucion(divPrincipal, ruta, nombre, idDeseado) {
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
  divEvolucion.setAttribute("onclick","RedireccionEvolucion("+idDeseado+")");
  hTitulo.appendChild(eName);
  divEvolucionImg.appendChild(iImg);
  divEvolucionName.appendChild(hTitulo);
  divEvolucion.appendChild(divEvolucionImg);
  divEvolucion.appendChild(divEvolucionName);
  divPrincipal.appendChild(divEvolucion);
}

//Limpia el area para poder cargar otro pokemon
function Limpiar(){
  document.getElementById('imagen').src ="img/cargando.gif";
  document.getElementById('pokeID').innerHTML = "";
  document.getElementById('pokeNombre').innerHTML = "";
  document.getElementById('pokeTipo').innerHTML = "";
  document.getElementById('pokeUbicacion').innerHTML = "";
  document.getElementById("listaMovs").innerHTML = "";
  document.getElementById('pokeDescripcion').innerHTML = "";
  document.getElementById('areaEvoluciones').innerHTML = "";
  idEvoluciones = [];
  evolutionArray = [];
  cantidadEv = 0;
  alert("The search is in process, please wait");
}

//Comprueba si existe un valor en un vector
function Existe(vector, texto) {
  var tamanio = vector.length;
  for (var i = 0; i < tamanio; i++) {
    if (vector[i] == texto) {
      return true;
    }
  }
  return false;
}

//Captura la URL de la evolucion y llama al appendChild
function EvolucionURL(idDeseado, areaDivEvoluciones, nombre){
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange=function() {
    if (this.readyState == 4 && this.status == 200) {
      pokemon = JSON.parse(this.responseText);
        GenerarDivEvolucion(areaDivEvoluciones, pokemon.sprites.front_default, nombre, idDeseado);
    }
    };
    xhttp.open("GET", "https://pokeapi.co/api/v2/pokemon/"+idDeseado, true);
    xhttp.send();
}

//Para irse a la pagina de una de las evoluciones
function RedireccionEvolucion(idDeseado) {
  Limpiar();
  requestPokemon(idDeseado);
}
