document.getElementById('loginForm').onsubmit = function(e){
  alert("ok");
  e.preventDefault();
  var email = document.getElementById("email").value;
  var pass = document.getElementById("pass").value;
  var obj = {"id": 0, "email": email, "name": "", "gender": "",  "pass": pass};
  var userRequest = new XMLHttpRequest();
    userRequest.onreadystatechange = function() {
      alert("ok");
      if (this.readyState == 4 && this.status == 200) {
        alert("email");
        alert("pass");
      }
    };
    userRequest.open('POST', 'http://192.168.1.23:8080/sigin');
    userRequest.setRequestHeader("Content-Type", "application/json");
    userRequest.setRequestHeader("Accept", "application/json");
    userRequest.send(JSON.stringify(obj));
}
