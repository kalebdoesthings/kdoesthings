function lock(){
document.addEventListener("keyup", function(event) {
  if (event.keyCode === 89) {
    var x = 2
    localStorage.setItem("isHU", x)
  }
});

if (localStorage.getItem("isHU") == null) {
return


}


if (localStorage.getItem("isHU") == "2"){

var pisa = prompt("password man")
if (pisa != "e[];'"){


window.location.replace("https://fortnitebattlepass.com")


}

if (pisa == "e[];'"){
  alert("grant")
  localStorage.removeItem("isHU")
  return


}



}





}