function LlenarConEnter(e) {
  if (e.keyCode == 13) {
    var pokebuscado = document.getElementById('resultadoBusqueda').value;
    var optionS = document.getElementsByName(pokebuscado);
    var pokeidS = optionS[0].getAttribute('id');
    var pokeid = parseInt(pokeidS);
    alert(pokeid+1);
    requestPokemon(pokeid+1);
  }
}

function requestPokemon(pokeid) {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange=function() {
  if (this.readyState == 4 && this.status == 200) {
    pokemon = JSON.parse(this.responseText);
    console.log(pokemon);
    Pokeinfo();
  }
  };
  xhttp.open("GET", "https://pokeapi.co/api/v2/pokemon/"+pokeid, true);
  xhttp.send();
}
function Pokeinfo() {
  document.getElementById('pokeNombre').innerHTML = pokemon.species.name;
//  document.getElementById('imgPokemon').src = pokemon.sprites.front_default;
}
