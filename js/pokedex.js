var pokemon;
var especie;
var evolucion;
var pokemons = [];
var validacion = false;

window.onload = function() {
  document.getElementById('busqueda').style.display='none';
  RequestAutocompletar();
}

function Existe(vector, texto) {
  var tamanio = vector.length;
  for (var i = 0; i < tamanio; i++) {
    if (vector[i] == texto) {
      validacion = true;
      return validacion;
    }
  }
  validacion = false;
  return validacion;
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
    Existe(pokemons, pokebuscado);
    if (validacion) {
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
  //Evoluciones
  var contador=0;
  var evolucionesArray = [];
  ////////////////////////Evolucion 1///////////////////////////////////////////
    document.getElementById('pokeEvolucion1').innerHTML = evolucion.chain.species.name;
    evolucionesArray[0] = evolucion.chain.species.url.slice(42, -1);
    contador = 1;
  ////////////////////////Evolucion 2///////////////////////////////////////////
    if (evolucion.chain.evolves_to[0] != null && evolucion.chain.evolves_to[0] != undefined) {
        for (var i = 0; i < evolucion.chain.evolves_to.length; i++) {
          document.getElementById('pokeEvolucion2').innerHTML += evolucion.chain.evolves_to[i].species.name + "<br>";
          evolucionesArray[contador] = evolucion.chain.evolves_to[i].species.url.slice(42, -1);
          contador = contador + 1;
        }

    } else {
        document.getElementById('pokeEvolucion2').innerHTML += "No evolutions founds";
    }
  ////////////////////////Evolucion 3///////////////////////////////////////////
    if ((evolucion.chain.evolves_to[0] != null && evolucion.chain.evolves_to[0] != undefined) && (evolucion.chain.evolves_to[0].evolves_to[0] != null && evolucion.chain.evolves_to[0].evolves_to[0] != undefined)) {
        for (var i = 0; i < evolucion.chain.evolves_to.length; i++) {
            for (var j = 0; j < evolucion.chain.evolves_to[i].evolves_to.length; j++) {
              document.getElementById('pokeEvolucion3').innerHTML += evolucion.chain.evolves_to[i].evolves_to[j].species.name+ "<br>";
              evolucionesArray[contador] = evolucion.chain.evolves_to[i].evolves_to[j].species.url.slice(42, -1);
              contador = contador + 1;
            }
        }
    } else {
        document.getElementById('pokeEvolucion3').innerHTML += "No evolutions founds";
    }
    document.getElementById('busqueda').style.display='block';
}
