window.requestSmoothMouse = (function () {
  //http://code.google.com/p/chromium/issues/detail?id=5598
  // ios
  return (
    window.requestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    window.oRequestAnimationFrame ||
    window.msRequestAnimationFrame ||
    function (callback, element) {
      window.setTimeout(callback, 1000 / 60);
    }
  );
})();

var pos = [],
  Mouse = window.Mouse;

Mouse = {
  x: -1,
  y: -1,
  xA: [cw / 2],
  yA: [ch / 2],
  xDown: -1,
  xUp: -1,
  yDown: -1,
  yUp: -1,
  up: true,
  clicks: 0,
};

Mouse.events = {};
Mouse.events.move = function (e) {
  // ios
  if ("touches" in e) e = e.touches[0];
  if (e.pageX === Mouse.x && e.pageY === Mouse.y) {
    return;
  }
  Mouse.x = e.pageX;
  Mouse.y = e.pageY;
};

Mouse.path = [];
Mouse.path.x = [];
Mouse.path.y = [];
Mouse.path.capture = function (x, y) {
  Mouse.path.x.unshift([x]);
  Mouse.path.y.unshift([y]);
  while (Mouse.path.x.length > 32) {
    Mouse.path.x.pop();
    Mouse.path.y.pop();
  }
};
Mouse.avg = function (a, followSpeed, x, y) {
  //if (!Array.isArray(pos[a])) {pos[a] = [Mouse.x, Mouse.y]; }
  if (!Array.isArray(pos[a])) pos[a] = [Mouse.x, Mouse.y];

  if (x > pos[a][0]) {
    pos[a][0] += (x - pos[a][0]) / followSpeed;
  } else if (x < pos[a][0]) {
    pos[a][0] -= (pos[a][0] - x) / followSpeed;
  } else {
    pos[a][0] += 0;
  }
  if (y > pos[a][1]) {
    pos[a][1] += (y - pos[a][1]) / followSpeed;
  } else if (y < pos[a][1]) {
    pos[a][1] -= (pos[a][1] - y) / followSpeed;
  } else {
    pos[a][1] += 0;
  }
  Mouse.xA[a] = Math.round(pos[a][0]);
  Mouse.yA[a] = Math.round(pos[a][1]);
};

Mouse.events.up = function (e) {
  Mouse.down = false;
  Mouse.up = true;
  Mouse.xUp = Mouse.x;
  Mouse.yUp = Mouse.y;
};

Mouse.events.down = function (e) {
  if ("touches" in e) {
    e.preventDefault();
    e = e.touches[0];
  }
  Mouse.down = true;
  Mouse.up = false;
  Mouse.clicks += 1;
  Mouse.xDown = Mouse.x;
  Mouse.yDown = Mouse.y;
  Mouse.xUp = Mouse.x;
  Mouse.yUp = Mouse.y;
};

function smoothMouse() {
  if (Mouse.x !== -1 && Mouse.y !== -1) {
    Mouse.avg(0, 2, Mouse.x, Mouse.y);
    for (var i = 1; i <= 64; i++) {
      Mouse.avg(i, 2, Mouse.xA[i - 1], Mouse.yA[i - 1]);
    }
    Mouse.path.capture(Mouse.xA[0], Mouse.yA[0]);
  }
  window.Mouse = Mouse;
  window.requestSmoothMouse(smoothMouse);
}
smoothMouse();

document.addEventListener("mousemove", Mouse.events.move);

document.addEventListener("touchmove", Mouse.events.move);
document.addEventListener("mousedown", Mouse.events.down);

document.addEventListener("touchstart", Mouse.events.down);
document.addEventListener("touchend", Mouse.events.up);
document.addEventListener("mouseup", Mouse.events.up);
