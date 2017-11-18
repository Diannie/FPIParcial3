var pokemons = [];
setInterval(LlenarDatalist, 2000);
function RequestPokemon(idPokemon) {
  var request = new XMLHttpRequest();
  request.onreadystatechange=function() {
  if (this.readyState == 4 && this.status == 200) {
    var pokemon = JSON.parse(this.responseText);
    console.log(pokemon);
    pokemons.push(pokemon.species.name);
  }
  };
  request.open("GET", "https://pokeapi.co/api/v2/pokemon/"+idPokemon, true);
  request.send();
}

function CapturarPokemons(){
  for (var i = 1; i < 802; i++) {
    RequestPokemon(i);
  }
}

function LlenarDatalist(){
  for (var i in pokemons) {
    var opcion = document.getElementById("pokemons");
    var node = document.createElement("option");
    var textnode = document.createTextNode(pokemons[i]);
    node.appendChild(textnode);
    node.setAttribute("value",pokemons[i]);
    node.setAttribute("id",i);
    opcion.appendChild(node);
      console.log("OK");
  }
}
