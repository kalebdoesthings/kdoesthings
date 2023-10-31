alert("Press [ or { to go into fullscreen")
document.addEventListener("keyup", function(event) {
  if (event.keyCode === 219) {
   document.getElementById('full').requestFullscreen()  
  }
});