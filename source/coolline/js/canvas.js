/**
 * User: chris
 * Date: 02/10/12
 * Time: 9:53 AM
 */
// todo: tool switching, path recording

var ctx = document.getElementById("canvas").getContext("2d"),
  Mouse = window.Mouse,
  cw = window.cw,
  ch = window.ch,
  cMin = window.cMin,
  cMax = window.cMax,
  time = 0;

function imageSmoothing(a) {
  ctx.imageSmoothingEnabled = a;
  ctx.mozImageSmoothingEnabled = a;
  ctx.webkitImageSmoothingEnabled = a;
}

window.requestAnimFrame = (function () {
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

function timer() {
  time += 1;
}

function hsla(h, s, l, a) {
  var hue = h === undefined ? 1 : h,
    sat = s === undefined ? 1 : s,
    light = l === undefined ? 1 : l,
    alpha = a === undefined ? 1 : a;
  return "hsla" + "(" + hue + ", " + sat + "%, " + light + "%, " + alpha + ")";
}

function hypotenuse(a, b) {
  return Math.sqrt(a * a + (b * b || a * a)) / 2;
}

function simple_moving_averager(period) {
  //http://rosettacode.org/wiki/Averages/Simple_moving_average#JavaScript
  var nums = [];
  return function (num) {
    nums.push(num);
    if (nums.length > period) nums.splice(0, 1); // remove the first element of the array
    var sum = 0;
    for (var i in nums) sum += nums[i];
    var n = period;
    if (nums.length < period) n = nums.length;
    return sum / n;
  };
}

function clear() {
  ctx.clearRect(0, 0, cw, ch);
}

function clearCanvas(a) {
  ctx.fillStyle = hsla(0, 0, 0, a);
  ctx.fillRect(0, 0, cw, ch);
}
clearCanvas(1);

function drawText(text, x, y) {
  ctx.lineWidth = 2;
  ctx.fillStyle = "white";
  ctx.strokeStyle = "black";
  ctx.strokeText(text, x, y);
  ctx.fillText(text, x, y);
}

function pointer() {
  var size = 20,
    a = Mouse.x - Mouse.xA[1],
    b = Mouse.y - Mouse.yA[1],
    hue = Math.abs(hypotenuse(a, b)) * 4 + 240;
  ctx.save();
  ctx.translate(Mouse.xA[2], Mouse.yA[2]);
  ctx.fillStyle = hsla(hue, 100, 50, 1);
  ctx.fillRect(-size / 2, -size / 2, size, size);
  ctx.restore();
}

var aRandomNumber = Math.random() * 360 + 1;
function line(width) {
  ctx.lineWidth = width || 2;
  ctx.beginPath();
  ctx.moveTo(Mouse.path.x[1], Mouse.path.y[1]);
  for (var i = 0; i < 64; i++) {
    ctx.lineTo(Mouse.xA[i - 1], Mouse.yA[i - 1]);
    ctx.lineTo(Mouse.xA[i], Mouse.yA[i]);
    var a = Mouse.xA[i] - Mouse.xA[i - 1] || 1,
      b = Mouse.yA[i] - Mouse.yA[i - 1] || 1,
      hue = Math.abs(Math.ceil(hypotenuse(a, b))) * 8 + 240;
    ctx.strokeStyle = hsla(hue + time / 2 - i * 4, 100, 50, 1);
    ctx.stroke();
    ctx.beginPath();
  }
  ctx.stroke();
}

function lineb(width) {
  ctx.lineWidth = width || 2;
  ctx.beginPath();
  for (var i = 0; i < 64; i++) {
    ctx.moveTo(Mouse.xA[i - 1], Mouse.yA[i - 1]);
    ctx.lineTo(Mouse.xA[i], Mouse.yA[i]);
    var hue;
    if (i >= 32) {
      hue = time / 32 + Mouse.clicks * 90;
    } else {
      hue = time / 32 + Mouse.clicks * 90 + 240;
    }
    var light;
    if (i % 32 < 16) {
      light = 100;
    } else {
      light = 0;
    }
    var a = Mouse.xA[i] - Mouse.xA[i - 1] || 1,
      b = Mouse.yA[i] - Mouse.yA[i - 1] || 1;
    ctx.strokeStyle = hsla(0, 100, light, 1);
    ctx.stroke();
    ctx.beginPath();
  }
  ctx.stroke();
}

function linec(width) {
  ctx.lineWidth = width || 2;
  ctx.beginPath();
  for (var i = 0; i < 64; i++) {
    ctx.moveTo(Mouse.xA[i - 1], Mouse.yA[i - 1]);
    ctx.lineTo(Mouse.xA[i], Mouse.yA[i]);
    var hue;
    if (i >= 32) {
      hue = time / 32 + Mouse.clicks * 90;
    } else {
      hue = time / 32 + Mouse.clicks * 90 + 240;
    }
    var light;
    if (i % 32 < 16) {
      light = 50;
    } else {
      light = 0;
    }
    var a = Mouse.xA[i] - Mouse.xA[i - 1] || 1,
      b = Mouse.yA[i] - Mouse.yA[i - 1] || 1;
    ctx.strokeStyle = hsla(hue + hypotenuse(a, b) * 4, 100, light, 1);
    ctx.stroke();
    ctx.beginPath();
  }
  ctx.stroke();
}

function decay(hor, ver, spread, rotate) {
  var h = hor,
    v = ver,
    s = spread || 2;
  ctx.save();
  ctx.translate(h, v);
  ctx.rotate(rotate || 0);
  ctx.drawImage(canvas, -s / 2, -s / 2, cw + s, ch + s);
  ctx.restore();
}

function decay2(hor, ver, spread, rotate) {
  var h = hor,
    v = ver,
    s = spread || 2;
  ctx.save();
  ctx.translate(cw / 2 + h, ch / 2 + v);
  ctx.rotate(rotate || 0);
  ctx.drawImage(canvas, -s / 2 - cw / 2, -s / 2 - ch / 2, cw + s, ch + s);
  ctx.restore();
}

function decayR(rotate) {
  ctx.save();
  ctx.translate(cw / 2, ch / 2);
  ctx.rotate(rotate || 0);
  ctx.drawImage(canvas, -cw / 2, -ch / 2, cw, ch);
  ctx.restore();
}

//EDIT THIS ONE DUMMY
function decay3(hor, ver, spread, rotate) {
  var h = hor,
    v = ver,
    s = spread || 2,
    cDif = cMax - cMin;
  ctx.save();
  ctx.translate(-cDif / 2, -cDif / 2); //cw-cMax, ch-cMax
  ctx.drawImage(canvas, 0, 0, cw + cDif, ch + cDif);
  // clearCanvas(1);
  // ctx.drawImage(canvas, 0,0, cw-cDif, ch-cDif)
  // ctx.drawImage(canvas, 0,0, cw-cDif, ch-cDif)
  ctx.restore();
  drawText(cDif);
}

function grid(interval, color) {
  ctx.fillStyle = color || "black";
  for (i = 0; i <= cw; i += interval) {
    for (j = 0; j <= ch; j += interval) {
      ctx.fillRect(i, j, interval / 2, interval / 2);
    }
  }
}

function dots() {
  var hAdj = (Math.random() - 0.5) * (Mouse.xA[0] - Mouse.xA[100]),
    vAdj = (Math.random() - 0.5) * 10;
  ctx.strokeStyle = hsla(time, 100, 50, 1);
  ctx.fillStyle = hsla(time + 180, 100, 50, 1);
  ctx.beginPath();
  ctx.arc(Mouse.x + hAdj, Mouse.y + vAdj, 5, 0, Math.PI * 2, true);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();
}

function ray() {
  // var h = Mouse.x - Mouse.xA[0] ,
  //   v = Mouse.y - Mouse.yA[0];

  var a, b, c;
  (a = { x: Mouse.xA[0], y: Mouse.yA[0] }),
    (b = { x: Mouse.x, y: Mouse.y }),
    (c = {
      x: 2 * Mouse.x - Mouse.xA[0],
      y: 2 * Mouse.y - Mouse.yA[0],
    });
  a.h = hypotenuse(a.x - b.x, a.y - b.y);
  b.h = hypotenuse(a.x - c.x, a.y - c.y);
  c.h = hypotenuse(c.x - b.x || 1, c.y - b.y || 1);

  var size = a.h / 1.5 + 5,
    xPosition = a.x + a.h / 2 - c.h,
    yPosition = a.y + a.h / 2 - c.h;
  var a = Mouse.x - Mouse.xA[0],
    b = Mouse.y - Mouse.yA[0],
    hue = c.h * 1.5 + 240 + time / 2;

  ctx.strokeStyle = hsla(0, 0, 0, 1);
  ctx.fillStyle = hsla(hue + aRandomNumber, 100, 50, 1);
  ctx.beginPath();
  ctx.arc(xPosition, yPosition, size, 0, Math.PI * 2);
  ctx.closePath();
  ctx.fill();
}

var fps = {
  past: [0],
  capture: function () {
    var i = 0;
    while (this.past.length < cw) {
      i++;
      this.past.unshift(Date.now());
      this.past[i] = 1000 / (this.past[i - 1] - this.past[i]);
    }
    this.past.pop();
  },
  sma30: simple_moving_averager(30),
  sma60: simple_moving_averager(60),
  sma120: simple_moving_averager(120),
  show: function () {
    this.capture();
    var i = 0,
      count = 80;
    ctx.fillStyle = hsla(0, 0, 0, 0.5);
    ctx.fillRect(cw - count, 0, count, 41);
    while (i < count) {
      var n = fps.past[i];
      ctx.fillStyle = hsla(n * 6 + 180, 100, 40, 0.8);
      ctx.fillRect(-i + fps.past.length, 40, 1, -n / 3);
      ctx.fillStyle = hsla(this.sma30(n) * 6 + 180, 100, 50, 1);
      ctx.fillRect(-i + fps.past.length + 6, 40 - this.sma30(n) / 3, 1, 2);
      i++;
    }
    drawText(Math.round(this.sma60(fps.past[10])), cw - 15, 10);
  },
};
window.fps = fps;
