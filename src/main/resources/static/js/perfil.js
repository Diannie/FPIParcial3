window.onload = function() {
    document.getElementById('usuarioLogueado').style.display='none';
}

function verificarCookie(){
	if(document.cookie.length>0){
		document.getElementById("usuarioLogueado").innerHTML = document.cookie.split(",")[1];
	}else{
		location.href = "pokedex.html"
	}
}

verificarCookie();
setInterval(function(){verificarCookie()},1000);
