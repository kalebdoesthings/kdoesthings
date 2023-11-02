/**
 * Author: tim baker http://bon.gs
 */
//var cw = window.cw,
//  ch = window.ch,
//  cMin = window.cMin,
//  cMax = window.cMax,
//  canvas = window.canvas,
//  ctx = window.ctx;

//var canvas, ctx, cw, ch, cMin, cMax;

function getWindowSize() {
  var w = window,
    d = document,
    e = d.documentElement,
    g = d.getElementsByTagName("body")[0];

  cw = w.innerWidth || e.clientWidth || g.clientWidth;
  ch = w.innerHeight || e.clientHeight || g.clientHeight;
  cMin = Math.min(cw, ch);
  cMax = Math.max(cw, ch);
}

getWindowSize();
function sizeCanvas(w, h) {
  canvas = document.getElementById("canvas");
  canvas.setAttribute("height", h);
  canvas.setAttribute("width", w);
}
sizeCanvas(cw, ch);

function sizeContext(w, h) {
  ctx = document.getElementById("canvas").getContext("2d");
}
sizeContext(cw, ch);

function windowGotResized() {
  var canvasCopy = document.createElement("canvas"),
    ow = cw,
    oh = ch,
    contextCopy = canvasCopy.getContext("2d");
  canvasCopy.setAttribute("width", ow);
  canvasCopy.setAttribute("height", oh);
  contextCopy.drawImage(canvas, 0, 0);

  //resize canvas
  getWindowSize();
  sizeCanvas(cw, ch);

  //paste copied canvas onto resized canvas
  ctx.drawImage(canvasCopy, 0, 0, ow, oh, 0, 0, cw, ch);
  sizeContext(cw, ch);
}

function reloadWindow() {
  window.location = window.location;
}

window.onresize = windowGotResized;

window.top.scrollTo(0, 1);
