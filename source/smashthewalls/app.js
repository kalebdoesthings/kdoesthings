function init() {
  (container = document.createElement("div")),
    document.body.appendChild(container),
    (image = container);
  var t = 2 * Math.atan(imageHeight / (2 * cameraStart)) * (180 / Math.PI);
  (scene = new THREE.Scene()),
    (scene.background = new THREE.Color(0)),
    (camera = new THREE.PerspectiveCamera(
      t,
      window.innerWidth / window.innerHeight,
      1,
      2e4
    )),
    camera.position.set(0, 0, cameraStart),
    scene.add(camera);
  var e = new THREE.PointLight(16777215, 1);
  camera.add(e),
    (group = new THREE.Group()),
    group.position.set(0.5 * -imageWidth, 0.5 * -imageHeight, 0),
    scene.add(group),
    (renderer = new THREE.WebGLRenderer({ antialias: !0 })),
    renderer.setPixelRatio(window.devicePixelRatio),
    renderer.setSize(window.innerWidth, window.innerHeight),
    container.appendChild(renderer.domElement),
    image.addEventListener("click", imageClickHandler),
    window.addEventListener("resize", onWindowResize, !1);
}
function updateNumber(t) {
  var e = document.getElementById("counter"),
    i = document.getElementById("counter-inner");
  "zoom" != e.className &&
    (i.innerHTML = "<span>" + t.toLocaleString() + "</span>"),
    (document.title = t.toLocaleString() + " Walls Smashed");
}
function addShape(t, e, i, s, n, r, a, o, h, c) {
  var l = new THREE.ExtrudeGeometry(t, e),
    u = new THREE.Mesh(l, new THREE.MeshPhongMaterial({ color: i }));
  return u.position.set(s, n, r), group.add(u), u;
}
function onMouseMove(t) {
  (mouse.x = (t.clientX / window.innerWidth) * 2 - 1),
    (mouse.y = 2 * -(t.clientY / window.innerHeight) + 1);
}
function onWindowResize() {
  (imageWidth = window.innerWidth),
    (imageHeight = window.innerHeight),
    (camera.aspect = window.innerWidth / window.innerHeight),
    (camera.fov =
      2 * Math.atan(imageHeight / (2 * cameraStart)) * (180 / Math.PI)),
    camera.updateProjectionMatrix(),
    (group.position.x = 0.5 * -imageWidth),
    (group.position.y = 0.5 * -imageHeight),
    renderer.setSize(window.innerWidth, window.innerHeight),
    (clickPosition[0] = window.innerWidth / 2),
    (clickPosition[1] = window.innerHeight / 2),
    triangulate(),
    shatter();
}
function animate() {
  requestAnimationFrame(animate), render();
}
function render() {
  renderer.render(scene, camera);
}
function imagesLoaded() {
  placeImage(!1), triangulate(), shatter();
}
function newImage() {
  makeBox();
}
function getColor(t) {
  var e = randomColor();
  return t == e && (e = randomColor()), e;
}
function makeBox() {
  (imageDepth = getRandomWallDepth()), (color = getColor(color));
  var t = new THREE.Mesh(
    new THREE.BoxGeometry(imageWidth, imageHeight, imageDepth),
    new THREE.MeshPhongMaterial({ color: color })
  );
  (cursor -= imageDepth), (t.position.z = cursor), (t.name = "box");
  var e = new TimelineMax();
  e.to(camera.position, 0.5, {
    z: cameraStart + t.position.z,
    ease: Cubic.easeOut,
  }),
    scene.add(t);
}
function imageClickHandler(t) {
  var e = image.getBoundingClientRect();
  e.top, e.left;
  (clickPosition[0] = t.clientX), (clickPosition[1] = imageHeight - t.clientY);
  var i = 1 - t.clientX / (window.innerWidth / 2);
  t.clientX > 0.5 * window.innerWidth
    ? ((i *= -1), (clickPosition[0] -= ((i * t.clientX) / 4) * 0.5))
    : (clickPosition[0] += i * t.clientX * 0.5);
  var s = 1 - t.clientY / (window.innerHeight / 2);
  t.clientY > 0.5 * window.innerHeight
    ? ((i *= -1), (clickPosition[1] -= ((s * t.clientY) / 4) * 0.5))
    : (clickPosition[1] -= s * t.clientY * 0.5),
    clicks++;
  var n = document.getElementById("counter");
  clicks % CADANCE === 0 &&
    ("zoom" === n.className ? (n.className = "") : (n.className = "zoom")),
    triangulate(),
    shatter();
}
function triangulate() {
  var t,
    e,
    i = [
      { r: window.innerWidth / 12, c: 12 },
      { r: window.innerWidth / 8, c: 12 },
      { r: window.innerWidth / 4, c: 12 },
      { r: window.innerWidth, c: 12 },
    ],
    s = clickPosition[0],
    n = clickPosition[1];
  vertices.push([s, n]),
    i.forEach(function (i) {
      for (var r = i.r, a = i.c, o = 0.25 * r, h = 0; h < a; h++)
        (t = Math.cos((h / a) * TWO_PI) * r + s + randomRange(-o, o)),
          (e = Math.sin((h / a) * TWO_PI) * r + n + randomRange(-o, o)),
          vertices.push([t, e]);
    }),
    vertices.forEach(function (t) {
      (t[0] = clamp(t[0], 0, imageWidth)), (t[1] = clamp(t[1], 0, imageHeight));
    }),
    (indices = Delaunay.triangulate(vertices));
}
function getRandomWallDepth() {
  return Math.floor(500 * Math.random()) + 100;
}
function shatter() {
  var t,
    e,
    i,
    s,
    n = scene.getObjectByName("box");
  scene.remove(n);
  for (
    var r = new TimelineMax({ onComplete: shatterCompleteHandler }),
      a = {
        depth: imageDepth,
        bevelEnabled: !1,
        bevelSegments: 2,
        steps: 2,
        bevelSize: 1,
        bevelThickness: 1,
      },
      o = 0;
    o < indices.length;
    o += 3
  ) {
    (t = vertices[indices[o + 0]]),
      (e = vertices[indices[o + 1]]),
      (i = vertices[indices[o + 2]]);
    var h = new THREE.Shape();
    h.moveTo(t[0], t[1]), h.lineTo(e[0], e[1]), h.lineTo(i[0], i[1]);
    var c =
        (Math.min(t[0], e[0], i[0]),
        Math.max(t[0], e[0], i[0]),
        Math.min(t[1], e[1], i[1]),
        Math.max(t[1], e[1], i[1]),
        (t[0] + e[0] + i[0]) / 3),
      l = (t[1] + e[1] + i[1]) / 3,
      u = [c, l];
    s = addShape(h, a, color, 0, 0, cursor, 0, 0, 0, 1);
    var d = u[0] - clickPosition[0],
      _ = u[1] - clickPosition[1],
      p = Math.sqrt(d * d + _ * _),
      f = (30 * sign(_), 90 * -sign(d), 0.0025 * p * randomRange(0.9, 1.1)),
      m = new TimelineMax();
    m.to(s.position, 0.9, { y: -3e3, ease: Cubic.easeIn }),
      m.to(s, 0.9, {
        onCompleteScope: s,
        onComplete: function () {
          group.remove(this), this.geometry.dispose(), this.material.dispose();
        },
      }),
      r.insert(m, f);
  }
  (vertices.length = 0), (indices.length = 0), newImage();
}
function shatterCompleteHandler(t) {}
function randomRange(t, e) {
  return t + (e - t) * Math.random();
}
function clamp(t, e, i) {
  return t < e ? e : t > i ? i : t;
}
function sign(t) {
  return t < 0 ? -1 : 1;
}
var Delaunay;
!(function () {
  "use strict";
  function t(t) {
    var e,
      i,
      s,
      n,
      r,
      a,
      o = Number.POSITIVE_INFINITY,
      h = Number.POSITIVE_INFINITY,
      c = Number.NEGATIVE_INFINITY,
      l = Number.NEGATIVE_INFINITY;
    for (e = t.length; e--; )
      t[e][0] < o && (o = t[e][0]),
        t[e][0] > c && (c = t[e][0]),
        t[e][1] < h && (h = t[e][1]),
        t[e][1] > l && (l = t[e][1]);
    return (
      (i = c - o),
      (s = l - h),
      (n = Math.max(i, s)),
      (r = o + 0.5 * i),
      (a = h + 0.5 * s),
      [
        [r - 20 * n, a - n],
        [r, a + 20 * n],
        [r + 20 * n, a - n],
      ]
    );
  }
  function e(t, e, i, n) {
    var r,
      a,
      o,
      h,
      c,
      l,
      u,
      d,
      _,
      p,
      f = t[e][0],
      m = t[e][1],
      g = t[i][0],
      v = t[i][1],
      y = t[n][0],
      b = t[n][1],
      w = Math.abs(m - v),
      x = Math.abs(v - b);
    if (w < s && x < s) throw new Error("Eek! Coincident points!");
    return (
      w < s
        ? ((h = -((y - g) / (b - v))),
          (l = (g + y) / 2),
          (d = (v + b) / 2),
          (r = (g + f) / 2),
          (a = h * (r - l) + d))
        : x < s
        ? ((o = -((g - f) / (v - m))),
          (c = (f + g) / 2),
          (u = (m + v) / 2),
          (r = (y + g) / 2),
          (a = o * (r - c) + u))
        : ((o = -((g - f) / (v - m))),
          (h = -((y - g) / (b - v))),
          (c = (f + g) / 2),
          (l = (g + y) / 2),
          (u = (m + v) / 2),
          (d = (v + b) / 2),
          (r = (o * c - h * l + d - u) / (o - h)),
          (a = w > x ? o * (r - c) + u : h * (r - l) + d)),
      (_ = g - r),
      (p = v - a),
      { i: e, j: i, k: n, x: r, y: a, r: _ * _ + p * p }
    );
  }
  function i(t) {
    var e, i, s, n, r, a;
    for (i = t.length; i; )
      for (n = t[--i], s = t[--i], e = i; e; )
        if (
          ((a = t[--e]),
          (r = t[--e]),
          (s === r && n === a) || (s === a && n === r))
        ) {
          t.splice(i, 2), t.splice(e, 2);
          break;
        }
  }
  var s = 1 / 1048576;
  (Delaunay = {
    triangulate: function (n, r) {
      var a,
        o,
        h,
        c,
        l,
        u,
        d,
        _,
        p,
        f,
        m,
        g,
        v = n.length;
      if (v < 3) return [];
      if (((n = n.slice(0)), r)) for (a = v; a--; ) n[a] = n[a][r];
      for (h = new Array(v), a = v; a--; ) h[a] = a;
      for (
        h.sort(function (t, e) {
          return n[e][0] - n[t][0];
        }),
          c = t(n),
          n.push(c[0], c[1], c[2]),
          l = [e(n, v + 0, v + 1, v + 2)],
          u = [],
          d = [],
          a = h.length;
        a--;
        d.length = 0
      ) {
        for (g = h[a], o = l.length; o--; )
          (_ = n[g][0] - l[o].x),
            _ > 0 && _ * _ > l[o].r
              ? (u.push(l[o]), l.splice(o, 1))
              : ((p = n[g][1] - l[o].y),
                _ * _ + p * p - l[o].r > s ||
                  (d.push(l[o].i, l[o].j, l[o].j, l[o].k, l[o].k, l[o].i),
                  l.splice(o, 1)));
        for (i(d), o = d.length; o; )
          (m = d[--o]), (f = d[--o]), l.push(e(n, f, m, g));
      }
      for (a = l.length; a--; ) u.push(l[a]);
      for (l.length = 0, a = u.length; a--; )
        u[a].i < v &&
          u[a].j < v &&
          u[a].k < v &&
          l.push(u[a].i, u[a].j, u[a].k);
      return l;
    },
    contains: function (t, e) {
      if (
        (e[0] < t[0][0] && e[0] < t[1][0] && e[0] < t[2][0]) ||
        (e[0] > t[0][0] && e[0] > t[1][0] && e[0] > t[2][0]) ||
        (e[1] < t[0][1] && e[1] < t[1][1] && e[1] < t[2][1]) ||
        (e[1] > t[0][1] && e[1] > t[1][1] && e[1] > t[2][1])
      )
        return null;
      var i = t[1][0] - t[0][0],
        s = t[2][0] - t[0][0],
        n = t[1][1] - t[0][1],
        r = t[2][1] - t[0][1],
        a = i * r - s * n;
      if (0 === a) return null;
      var o = (r * (e[0] - t[0][0]) - s * (e[1] - t[0][1])) / a,
        h = (i * (e[1] - t[0][1]) - n * (e[0] - t[0][0])) / a;
      return o < 0 || h < 0 || o + h > 1 ? null : [o, h];
    },
  }),
    "undefined" != typeof module && (module.exports = Delaunay);
})();
var _gsScope =
  "undefined" != typeof module && module.exports && "undefined" != typeof global
    ? global
    : this || window;
(_gsScope._gsQueue || (_gsScope._gsQueue = [])).push(function () {
  "use strict";
  _gsScope._gsDefine(
    "TweenMax",
    ["core.Animation", "core.SimpleTimeline", "TweenLite"],
    function (t, e, i) {
      var s = function (t) {
          var e,
            i = [],
            s = t.length;
          for (e = 0; e !== s; i.push(t[e++]));
          return i;
        },
        n = function (t, e, s) {
          i.call(this, t, e, s),
            (this._cycle = 0),
            (this._yoyo = this.vars.yoyo === !0),
            (this._repeat = this.vars.repeat || 0),
            (this._repeatDelay = this.vars.repeatDelay || 0),
            (this._dirty = !0),
            (this.render = n.prototype.render);
        },
        r = 1e-10,
        a = i._internals,
        o = a.isSelector,
        h = a.isArray,
        c = (n.prototype = i.to({}, 0.1, {})),
        l = [];
      (n.version = "1.13.2"),
        (c.constructor = n),
        (c.kill()._gc = !1),
        (n.killTweensOf = n.killDelayedCallsTo = i.killTweensOf),
        (n.getTweensOf = i.getTweensOf),
        (n.lagSmoothing = i.lagSmoothing),
        (n.ticker = i.ticker),
        (n.render = i.render),
        (c.invalidate = function () {
          return (
            (this._yoyo = this.vars.yoyo === !0),
            (this._repeat = this.vars.repeat || 0),
            (this._repeatDelay = this.vars.repeatDelay || 0),
            this._uncache(!0),
            i.prototype.invalidate.call(this)
          );
        }),
        (c.updateTo = function (t, e) {
          var s,
            n = this.ratio;
          e &&
            this._startTime < this._timeline._time &&
            ((this._startTime = this._timeline._time),
            this._uncache(!1),
            this._gc
              ? this._enabled(!0, !1)
              : this._timeline.insert(this, this._startTime - this._delay));
          for (s in t) this.vars[s] = t[s];
          if (this._initted)
            if (e) this._initted = !1;
            else if (
              (this._gc && this._enabled(!0, !1),
              this._notifyPluginsOfEnabled &&
                this._firstPT &&
                i._onPluginEvent("_onDisable", this),
              this._time / this._duration > 0.998)
            ) {
              var r = this._time;
              this.render(0, !0, !1),
                (this._initted = !1),
                this.render(r, !0, !1);
            } else if (this._time > 0) {
              (this._initted = !1), this._init();
              for (var a, o = 1 / (1 - n), h = this._firstPT; h; )
                (a = h.s + h.c), (h.c *= o), (h.s = a - h.c), (h = h._next);
            }
          return this;
        }),
        (c.render = function (t, e, i) {
          this._initted ||
            (0 === this._duration && this.vars.repeat && this.invalidate());
          var s,
            n,
            o,
            h,
            c,
            u,
            d,
            _,
            p = this._dirty ? this.totalDuration() : this._totalDuration,
            f = this._time,
            m = this._totalTime,
            g = this._cycle,
            v = this._duration,
            y = this._rawPrevTime;
          if (
            (t >= p
              ? ((this._totalTime = p),
                (this._cycle = this._repeat),
                this._yoyo && 0 !== (1 & this._cycle)
                  ? ((this._time = 0),
                    (this.ratio = this._ease._calcEnd
                      ? this._ease.getRatio(0)
                      : 0))
                  : ((this._time = v),
                    (this.ratio = this._ease._calcEnd
                      ? this._ease.getRatio(1)
                      : 1)),
                this._reversed || ((s = !0), (n = "onComplete")),
                0 === v &&
                  (this._initted || !this.vars.lazy || i) &&
                  (this._startTime === this._timeline._duration && (t = 0),
                  (0 === t || 0 > y || y === r) &&
                    y !== t &&
                    ((i = !0), y > r && (n = "onReverseComplete")),
                  (this._rawPrevTime = _ = !e || t || y === t ? t : r)))
              : 1e-7 > t
              ? ((this._totalTime = this._time = this._cycle = 0),
                (this.ratio = this._ease._calcEnd ? this._ease.getRatio(0) : 0),
                (0 !== m || (0 === v && y > 0 && y !== r)) &&
                  ((n = "onReverseComplete"), (s = this._reversed)),
                0 > t &&
                  ((this._active = !1),
                  0 === v &&
                    (this._initted || !this.vars.lazy || i) &&
                    (y >= 0 && (i = !0),
                    (this._rawPrevTime = _ = !e || t || y === t ? t : r))),
                this._initted || (i = !0))
              : ((this._totalTime = this._time = t),
                0 !== this._repeat &&
                  ((h = v + this._repeatDelay),
                  (this._cycle = (this._totalTime / h) >> 0),
                  0 !== this._cycle &&
                    this._cycle === this._totalTime / h &&
                    this._cycle--,
                  (this._time = this._totalTime - this._cycle * h),
                  this._yoyo &&
                    0 !== (1 & this._cycle) &&
                    (this._time = v - this._time),
                  this._time > v
                    ? (this._time = v)
                    : 0 > this._time && (this._time = 0)),
                this._easeType
                  ? ((c = this._time / v),
                    (u = this._easeType),
                    (d = this._easePower),
                    (1 === u || (3 === u && c >= 0.5)) && (c = 1 - c),
                    3 === u && (c *= 2),
                    1 === d
                      ? (c *= c)
                      : 2 === d
                      ? (c *= c * c)
                      : 3 === d
                      ? (c *= c * c * c)
                      : 4 === d && (c *= c * c * c * c),
                    (this.ratio =
                      1 === u
                        ? 1 - c
                        : 2 === u
                        ? c
                        : 0.5 > this._time / v
                        ? c / 2
                        : 1 - c / 2))
                  : (this.ratio = this._ease.getRatio(this._time / v))),
            f === this._time && !i && g === this._cycle)
          )
            return void (
              m !== this._totalTime &&
              this._onUpdate &&
              (e ||
                this._onUpdate.apply(
                  this.vars.onUpdateScope || this,
                  this.vars.onUpdateParams || l
                ))
            );
          if (!this._initted) {
            if ((this._init(), !this._initted || this._gc)) return;
            if (
              !i &&
              this._firstPT &&
              ((this.vars.lazy !== !1 && this._duration) ||
                (this.vars.lazy && !this._duration))
            )
              return (
                (this._time = f),
                (this._totalTime = m),
                (this._rawPrevTime = y),
                (this._cycle = g),
                a.lazyTweens.push(this),
                void (this._lazy = [t, e])
              );
            this._time && !s
              ? (this.ratio = this._ease.getRatio(this._time / v))
              : s &&
                this._ease._calcEnd &&
                (this.ratio = this._ease.getRatio(0 === this._time ? 0 : 1));
          }
          for (
            this._lazy !== !1 && (this._lazy = !1),
              this._active ||
                (!this._paused &&
                  this._time !== f &&
                  t >= 0 &&
                  (this._active = !0)),
              0 === m &&
                (2 === this._initted && t > 0 && this._init(),
                this._startAt &&
                  (t >= 0
                    ? this._startAt.render(t, e, i)
                    : n || (n = "_dummyGS")),
                this.vars.onStart &&
                  (0 !== this._totalTime || 0 === v) &&
                  (e ||
                    this.vars.onStart.apply(
                      this.vars.onStartScope || this,
                      this.vars.onStartParams || l
                    ))),
              o = this._firstPT;
            o;

          )
            o.f
              ? o.t[o.p](o.c * this.ratio + o.s)
              : (o.t[o.p] = o.c * this.ratio + o.s),
              (o = o._next);
          this._onUpdate &&
            (0 > t &&
              this._startAt &&
              this._startTime &&
              this._startAt.render(t, e, i),
            e ||
              ((this._totalTime !== m || s) &&
                this._onUpdate.apply(
                  this.vars.onUpdateScope || this,
                  this.vars.onUpdateParams || l
                ))),
            this._cycle !== g &&
              (e ||
                this._gc ||
                (this.vars.onRepeat &&
                  this.vars.onRepeat.apply(
                    this.vars.onRepeatScope || this,
                    this.vars.onRepeatParams || l
                  ))),
            n &&
              (!this._gc || i) &&
              (0 > t &&
                this._startAt &&
                !this._onUpdate &&
                this._startTime &&
                this._startAt.render(t, e, i),
              s &&
                (this._timeline.autoRemoveChildren && this._enabled(!1, !1),
                (this._active = !1)),
              !e &&
                this.vars[n] &&
                this.vars[n].apply(
                  this.vars[n + "Scope"] || this,
                  this.vars[n + "Params"] || l
                ),
              0 === v &&
                this._rawPrevTime === r &&
                _ !== r &&
                (this._rawPrevTime = 0));
        }),
        (n.to = function (t, e, i) {
          return new n(t, e, i);
        }),
        (n.from = function (t, e, i) {
          return (
            (i.runBackwards = !0),
            (i.immediateRender = 0 != i.immediateRender),
            new n(t, e, i)
          );
        }),
        (n.fromTo = function (t, e, i, s) {
          return (
            (s.startAt = i),
            (s.immediateRender =
              0 != s.immediateRender && 0 != i.immediateRender),
            new n(t, e, s)
          );
        }),
        (n.staggerTo = n.allTo =
          function (t, e, r, a, c, u, d) {
            a = a || 0;
            var _,
              p,
              f,
              m,
              g = r.delay || 0,
              v = [],
              y = function () {
                r.onComplete &&
                  r.onComplete.apply(r.onCompleteScope || this, arguments),
                  c.apply(d || this, u || l);
              };
            for (
              h(t) ||
                ("string" == typeof t && (t = i.selector(t) || t),
                o(t) && (t = s(t))),
                _ = t.length,
                f = 0;
              _ > f;
              f++
            ) {
              p = {};
              for (m in r) p[m] = r[m];
              (p.delay = g),
                f === _ - 1 && c && (p.onComplete = y),
                (v[f] = new n(t[f], e, p)),
                (g += a);
            }
            return v;
          }),
        (n.staggerFrom = n.allFrom =
          function (t, e, i, s, r, a, o) {
            return (
              (i.runBackwards = !0),
              (i.immediateRender = 0 != i.immediateRender),
              n.staggerTo(t, e, i, s, r, a, o)
            );
          }),
        (n.staggerFromTo = n.allFromTo =
          function (t, e, i, s, r, a, o, h) {
            return (
              (s.startAt = i),
              (s.immediateRender =
                0 != s.immediateRender && 0 != i.immediateRender),
              n.staggerTo(t, e, s, r, a, o, h)
            );
          }),
        (n.delayedCall = function (t, e, i, s, r) {
          return new n(e, 0, {
            delay: t,
            onComplete: e,
            onCompleteParams: i,
            onCompleteScope: s,
            onReverseComplete: e,
            onReverseCompleteParams: i,
            onReverseCompleteScope: s,
            immediateRender: !1,
            useFrames: r,
            overwrite: 0,
          });
        }),
        (n.set = function (t, e) {
          return new n(t, 0, e);
        }),
        (n.isTweening = function (t) {
          return i.getTweensOf(t, !0).length > 0;
        });
      var u = function (t, e) {
          for (var s = [], n = 0, r = t._first; r; )
            r instanceof i
              ? (s[n++] = r)
              : (e && (s[n++] = r), (s = s.concat(u(r, e))), (n = s.length)),
              (r = r._next);
          return s;
        },
        d = (n.getAllTweens = function (e) {
          return u(t._rootTimeline, e).concat(u(t._rootFramesTimeline, e));
        });
      (n.killAll = function (t, i, s, n) {
        null == i && (i = !0), null == s && (s = !0);
        var r,
          a,
          o,
          h = d(0 != n),
          c = h.length,
          l = i && s && n;
        for (o = 0; c > o; o++)
          (a = h[o]),
            (l ||
              a instanceof e ||
              ((r = a.target === a.vars.onComplete) && s) ||
              (i && !r)) &&
              (t
                ? a.totalTime(a._reversed ? 0 : a.totalDuration())
                : a._enabled(!1, !1));
      }),
        (n.killChildTweensOf = function (t, e) {
          if (null != t) {
            var r,
              c,
              l,
              u,
              d,
              _ = a.tweenLookup;
            if (
              ("string" == typeof t && (t = i.selector(t) || t),
              o(t) && (t = s(t)),
              h(t))
            )
              for (u = t.length; --u > -1; ) n.killChildTweensOf(t[u], e);
            else {
              r = [];
              for (l in _)
                for (c = _[l].target.parentNode; c; )
                  c === t && (r = r.concat(_[l].tweens)), (c = c.parentNode);
              for (d = r.length, u = 0; d > u; u++)
                e && r[u].totalTime(r[u].totalDuration()),
                  r[u]._enabled(!1, !1);
            }
          }
        });
      var _ = function (t, i, s, n) {
        (i = i !== !1), (s = s !== !1), (n = n !== !1);
        for (var r, a, o = d(n), h = i && s && n, c = o.length; --c > -1; )
          (a = o[c]),
            (h ||
              a instanceof e ||
              ((r = a.target === a.vars.onComplete) && s) ||
              (i && !r)) &&
              a.paused(t);
      };
      return (
        (n.pauseAll = function (t, e, i) {
          _(!0, t, e, i);
        }),
        (n.resumeAll = function (t, e, i) {
          _(!1, t, e, i);
        }),
        (n.globalTimeScale = function (e) {
          var s = t._rootTimeline,
            n = i.ticker.time;
          return arguments.length
            ? ((e = e || r),
              (s._startTime = n - ((n - s._startTime) * s._timeScale) / e),
              (s = t._rootFramesTimeline),
              (n = i.ticker.frame),
              (s._startTime = n - ((n - s._startTime) * s._timeScale) / e),
              (s._timeScale = t._rootTimeline._timeScale = e),
              e)
            : s._timeScale;
        }),
        (c.progress = function (t) {
          return arguments.length
            ? this.totalTime(
                this.duration() *
                  (this._yoyo && 0 !== (1 & this._cycle) ? 1 - t : t) +
                  this._cycle * (this._duration + this._repeatDelay),
                !1
              )
            : this._time / this.duration();
        }),
        (c.totalProgress = function (t) {
          return arguments.length
            ? this.totalTime(this.totalDuration() * t, !1)
            : this._totalTime / this.totalDuration();
        }),
        (c.time = function (t, e) {
          return arguments.length
            ? (this._dirty && this.totalDuration(),
              t > this._duration && (t = this._duration),
              this._yoyo && 0 !== (1 & this._cycle)
                ? (t =
                    this._duration -
                    t +
                    this._cycle * (this._duration + this._repeatDelay))
                : 0 !== this._repeat &&
                  (t += this._cycle * (this._duration + this._repeatDelay)),
              this.totalTime(t, e))
            : this._time;
        }),
        (c.duration = function (e) {
          return arguments.length
            ? t.prototype.duration.call(this, e)
            : this._duration;
        }),
        (c.totalDuration = function (t) {
          return arguments.length
            ? -1 === this._repeat
              ? this
              : this.duration(
                  (t - this._repeat * this._repeatDelay) / (this._repeat + 1)
                )
            : (this._dirty &&
                ((this._totalDuration =
                  -1 === this._repeat
                    ? 999999999999
                    : this._duration * (this._repeat + 1) +
                      this._repeatDelay * this._repeat),
                (this._dirty = !1)),
              this._totalDuration);
        }),
        (c.repeat = function (t) {
          return arguments.length
            ? ((this._repeat = t), this._uncache(!0))
            : this._repeat;
        }),
        (c.repeatDelay = function (t) {
          return arguments.length
            ? ((this._repeatDelay = t), this._uncache(!0))
            : this._repeatDelay;
        }),
        (c.yoyo = function (t) {
          return arguments.length ? ((this._yoyo = t), this) : this._yoyo;
        }),
        n
      );
    },
    !0
  ),
    _gsScope._gsDefine(
      "TimelineLite",
      ["core.Animation", "core.SimpleTimeline", "TweenLite"],
      function (t, e, i) {
        var s = function (t) {
            e.call(this, t),
              (this._labels = {}),
              (this.autoRemoveChildren = this.vars.autoRemoveChildren === !0),
              (this.smoothChildTiming = this.vars.smoothChildTiming === !0),
              (this._sortChildren = !0),
              (this._onUpdate = this.vars.onUpdate);
            var i,
              s,
              n = this.vars;
            for (s in n)
              (i = n[s]),
                o(i) &&
                  -1 !== i.join("").indexOf("{self}") &&
                  (n[s] = this._swapSelfInParams(i));
            o(n.tweens) && this.add(n.tweens, 0, n.align, n.stagger);
          },
          n = 1e-10,
          r = i._internals,
          a = r.isSelector,
          o = r.isArray,
          h = r.lazyTweens,
          c = r.lazyRender,
          l = [],
          u = _gsScope._gsDefine.globals,
          d = function (t) {
            var e,
              i = {};
            for (e in t) i[e] = t[e];
            return i;
          },
          _ = function (t, e, i, s) {
            var n = t._timeline._totalTime;
            (e || !this._forcingPlayhead) &&
              (t._timeline.pause(t._startTime),
              e && e.apply(s || t._timeline, i || l),
              this._forcingPlayhead && t._timeline.seek(n));
          },
          p = function (t) {
            var e,
              i = [],
              s = t.length;
            for (e = 0; e !== s; i.push(t[e++]));
            return i;
          },
          f = (s.prototype = new e());
        return (
          (s.version = "1.13.2"),
          (f.constructor = s),
          (f.kill()._gc = f._forcingPlayhead = !1),
          (f.to = function (t, e, s, n) {
            var r = (s.repeat && u.TweenMax) || i;
            return e ? this.add(new r(t, e, s), n) : this.set(t, s, n);
          }),
          (f.from = function (t, e, s, n) {
            return this.add(((s.repeat && u.TweenMax) || i).from(t, e, s), n);
          }),
          (f.fromTo = function (t, e, s, n, r) {
            var a = (n.repeat && u.TweenMax) || i;
            return e ? this.add(a.fromTo(t, e, s, n), r) : this.set(t, n, r);
          }),
          (f.staggerTo = function (t, e, n, r, o, h, c, l) {
            var u,
              _ = new s({
                onComplete: h,
                onCompleteParams: c,
                onCompleteScope: l,
                smoothChildTiming: this.smoothChildTiming,
              });
            for (
              "string" == typeof t && (t = i.selector(t) || t),
                a(t) && (t = p(t)),
                r = r || 0,
                u = 0;
              t.length > u;
              u++
            )
              n.startAt && (n.startAt = d(n.startAt)),
                _.to(t[u], e, d(n), u * r);
            return this.add(_, o);
          }),
          (f.staggerFrom = function (t, e, i, s, n, r, a, o) {
            return (
              (i.immediateRender = 0 != i.immediateRender),
              (i.runBackwards = !0),
              this.staggerTo(t, e, i, s, n, r, a, o)
            );
          }),
          (f.staggerFromTo = function (t, e, i, s, n, r, a, o, h) {
            return (
              (s.startAt = i),
              (s.immediateRender =
                0 != s.immediateRender && 0 != i.immediateRender),
              this.staggerTo(t, e, s, n, r, a, o, h)
            );
          }),
          (f.call = function (t, e, s, n) {
            return this.add(i.delayedCall(0, t, e, s), n);
          }),
          (f.set = function (t, e, s) {
            return (
              (s = this._parseTimeOrLabel(s, 0, !0)),
              null == e.immediateRender &&
                (e.immediateRender = s === this._time && !this._paused),
              this.add(new i(t, 0, e), s)
            );
          }),
          (s.exportRoot = function (t, e) {
            (t = t || {}),
              null == t.smoothChildTiming && (t.smoothChildTiming = !0);
            var n,
              r,
              a = new s(t),
              o = a._timeline;
            for (
              null == e && (e = !0),
                o._remove(a, !0),
                a._startTime = 0,
                a._rawPrevTime = a._time = a._totalTime = o._time,
                n = o._first;
              n;

            )
              (r = n._next),
                (e && n instanceof i && n.target === n.vars.onComplete) ||
                  a.add(n, n._startTime - n._delay),
                (n = r);
            return o.add(a, 0), a;
          }),
          (f.add = function (n, r, a, h) {
            var c, l, u, d, _, p;
            if (
              ("number" != typeof r &&
                (r = this._parseTimeOrLabel(r, 0, !0, n)),
              !(n instanceof t))
            ) {
              if (n instanceof Array || (n && n.push && o(n))) {
                for (
                  a = a || "normal", h = h || 0, c = r, l = n.length, u = 0;
                  l > u;
                  u++
                )
                  o((d = n[u])) && (d = new s({ tweens: d })),
                    this.add(d, c),
                    "string" != typeof d &&
                      "function" != typeof d &&
                      ("sequence" === a
                        ? (c = d._startTime + d.totalDuration() / d._timeScale)
                        : "start" === a && (d._startTime -= d.delay())),
                    (c += h);
                return this._uncache(!0);
              }
              if ("string" == typeof n) return this.addLabel(n, r);
              if ("function" != typeof n)
                throw (
                  "Cannot add " +
                  n +
                  " into the timeline; it is not a tween, timeline, function, or string."
                );
              n = i.delayedCall(0, n);
            }
            if (
              (e.prototype.add.call(this, n, r),
              (this._gc || this._time === this._duration) &&
                !this._paused &&
                this._duration < this.duration())
            )
              for (_ = this, p = _.rawTime() > n._startTime; _._timeline; )
                p && _._timeline.smoothChildTiming
                  ? _.totalTime(_._totalTime, !0)
                  : _._gc && _._enabled(!0, !1),
                  (_ = _._timeline);
            return this;
          }),
          (f.remove = function (e) {
            if (e instanceof t) return this._remove(e, !1);
            if (e instanceof Array || (e && e.push && o(e))) {
              for (var i = e.length; --i > -1; ) this.remove(e[i]);
              return this;
            }
            return "string" == typeof e
              ? this.removeLabel(e)
              : this.kill(null, e);
          }),
          (f._remove = function (t, i) {
            e.prototype._remove.call(this, t, i);
            var s = this._last;
            return (
              s
                ? this._time > s._startTime + s._totalDuration / s._timeScale &&
                  ((this._time = this.duration()),
                  (this._totalTime = this._totalDuration))
                : (this._time =
                    this._totalTime =
                    this._duration =
                    this._totalDuration =
                      0),
              this
            );
          }),
          (f.append = function (t, e) {
            return this.add(t, this._parseTimeOrLabel(null, e, !0, t));
          }),
          (f.insert = f.insertMultiple =
            function (t, e, i, s) {
              return this.add(t, e || 0, i, s);
            }),
          (f.appendMultiple = function (t, e, i, s) {
            return this.add(t, this._parseTimeOrLabel(null, e, !0, t), i, s);
          }),
          (f.addLabel = function (t, e) {
            return (this._labels[t] = this._parseTimeOrLabel(e)), this;
          }),
          (f.addPause = function (t, e, i, s) {
            return this.call(_, ["{self}", e, i, s], this, t);
          }),
          (f.removeLabel = function (t) {
            return delete this._labels[t], this;
          }),
          (f.getLabelTime = function (t) {
            return null != this._labels[t] ? this._labels[t] : -1;
          }),
          (f._parseTimeOrLabel = function (e, i, s, n) {
            var r;
            if (n instanceof t && n.timeline === this) this.remove(n);
            else if (n && (n instanceof Array || (n.push && o(n))))
              for (r = n.length; --r > -1; )
                n[r] instanceof t &&
                  n[r].timeline === this &&
                  this.remove(n[r]);
            if ("string" == typeof i)
              return this._parseTimeOrLabel(
                i,
                s && "number" == typeof e && null == this._labels[i]
                  ? e - this.duration()
                  : 0,
                s
              );
            if (
              ((i = i || 0),
              "string" != typeof e || (!isNaN(e) && null == this._labels[e]))
            )
              null == e && (e = this.duration());
            else {
              if (((r = e.indexOf("=")), -1 === r))
                return null == this._labels[e]
                  ? s
                    ? (this._labels[e] = this.duration() + i)
                    : i
                  : this._labels[e] + i;
              (i =
                parseInt(e.charAt(r - 1) + "1", 10) * Number(e.substr(r + 1))),
                (e =
                  r > 1
                    ? this._parseTimeOrLabel(e.substr(0, r - 1), 0, s)
                    : this.duration());
            }
            return Number(e) + i;
          }),
          (f.seek = function (t, e) {
            return this.totalTime(
              "number" == typeof t ? t : this._parseTimeOrLabel(t),
              e !== !1
            );
          }),
          (f.stop = function () {
            return this.paused(!0);
          }),
          (f.gotoAndPlay = function (t, e) {
            return this.play(t, e);
          }),
          (f.gotoAndStop = function (t, e) {
            return this.pause(t, e);
          }),
          (f.render = function (t, e, i) {
            this._gc && this._enabled(!0, !1);
            var s,
              r,
              a,
              o,
              u,
              d = this._dirty ? this.totalDuration() : this._totalDuration,
              _ = this._time,
              p = this._startTime,
              f = this._timeScale,
              m = this._paused;
            if (
              (t >= d
                ? ((this._totalTime = this._time = d),
                  this._reversed ||
                    this._hasPausedChild() ||
                    ((r = !0),
                    (o = "onComplete"),
                    0 === this._duration &&
                      (0 === t ||
                        0 > this._rawPrevTime ||
                        this._rawPrevTime === n) &&
                      this._rawPrevTime !== t &&
                      this._first &&
                      ((u = !0),
                      this._rawPrevTime > n && (o = "onReverseComplete"))),
                  (this._rawPrevTime =
                    this._duration || !e || t || this._rawPrevTime === t
                      ? t
                      : n),
                  (t = d + 1e-4))
                : 1e-7 > t
                ? ((this._totalTime = this._time = 0),
                  (0 !== _ ||
                    (0 === this._duration &&
                      this._rawPrevTime !== n &&
                      (this._rawPrevTime > 0 ||
                        (0 > t && this._rawPrevTime >= 0)))) &&
                    ((o = "onReverseComplete"), (r = this._reversed)),
                  0 > t
                    ? ((this._active = !1),
                      this._rawPrevTime >= 0 && this._first && (u = !0),
                      (this._rawPrevTime = t))
                    : ((this._rawPrevTime =
                        this._duration || !e || t || this._rawPrevTime === t
                          ? t
                          : n),
                      (t = 0),
                      this._initted || (u = !0)))
                : (this._totalTime = this._time = this._rawPrevTime = t),
              (this._time !== _ && this._first) || i || u)
            ) {
              if (
                (this._initted || (this._initted = !0),
                this._active ||
                  (!this._paused &&
                    this._time !== _ &&
                    t > 0 &&
                    (this._active = !0)),
                0 === _ &&
                  this.vars.onStart &&
                  0 !== this._time &&
                  (e ||
                    this.vars.onStart.apply(
                      this.vars.onStartScope || this,
                      this.vars.onStartParams || l
                    )),
                this._time >= _)
              )
                for (
                  s = this._first;
                  s && ((a = s._next), !this._paused || m);

                )
                  (s._active ||
                    (s._startTime <= this._time && !s._paused && !s._gc)) &&
                    (s._reversed
                      ? s.render(
                          (s._dirty ? s.totalDuration() : s._totalDuration) -
                            (t - s._startTime) * s._timeScale,
                          e,
                          i
                        )
                      : s.render((t - s._startTime) * s._timeScale, e, i)),
                    (s = a);
              else
                for (s = this._last; s && ((a = s._prev), !this._paused || m); )
                  (s._active || (_ >= s._startTime && !s._paused && !s._gc)) &&
                    (s._reversed
                      ? s.render(
                          (s._dirty ? s.totalDuration() : s._totalDuration) -
                            (t - s._startTime) * s._timeScale,
                          e,
                          i
                        )
                      : s.render((t - s._startTime) * s._timeScale, e, i)),
                    (s = a);
              this._onUpdate &&
                (e ||
                  (h.length && c(),
                  this._onUpdate.apply(
                    this.vars.onUpdateScope || this,
                    this.vars.onUpdateParams || l
                  ))),
                o &&
                  (this._gc ||
                    ((p === this._startTime || f !== this._timeScale) &&
                      (0 === this._time || d >= this.totalDuration()) &&
                      (r &&
                        (h.length && c(),
                        this._timeline.autoRemoveChildren &&
                          this._enabled(!1, !1),
                        (this._active = !1)),
                      !e &&
                        this.vars[o] &&
                        this.vars[o].apply(
                          this.vars[o + "Scope"] || this,
                          this.vars[o + "Params"] || l
                        ))));
            }
          }),
          (f._hasPausedChild = function () {
            for (var t = this._first; t; ) {
              if (t._paused || (t instanceof s && t._hasPausedChild()))
                return !0;
              t = t._next;
            }
            return !1;
          }),
          (f.getChildren = function (t, e, s, n) {
            n = n || -9999999999;
            for (var r = [], a = this._first, o = 0; a; )
              n > a._startTime ||
                (a instanceof i
                  ? e !== !1 && (r[o++] = a)
                  : (s !== !1 && (r[o++] = a),
                    t !== !1 &&
                      ((r = r.concat(a.getChildren(!0, e, s))),
                      (o = r.length)))),
                (a = a._next);
            return r;
          }),
          (f.getTweensOf = function (t, e) {
            var s,
              n,
              r = this._gc,
              a = [],
              o = 0;
            for (
              r && this._enabled(!0, !0), s = i.getTweensOf(t), n = s.length;
              --n > -1;

            )
              (s[n].timeline === this || (e && this._contains(s[n]))) &&
                (a[o++] = s[n]);
            return r && this._enabled(!1, !0), a;
          }),
          (f._contains = function (t) {
            for (var e = t.timeline; e; ) {
              if (e === this) return !0;
              e = e.timeline;
            }
            return !1;
          }),
          (f.shiftChildren = function (t, e, i) {
            i = i || 0;
            for (var s, n = this._first, r = this._labels; n; )
              n._startTime >= i && (n._startTime += t), (n = n._next);
            if (e) for (s in r) r[s] >= i && (r[s] += t);
            return this._uncache(!0);
          }),
          (f._kill = function (t, e) {
            if (!t && !e) return this._enabled(!1, !1);
            for (
              var i = e ? this.getTweensOf(e) : this.getChildren(!0, !0, !1),
                s = i.length,
                n = !1;
              --s > -1;

            )
              i[s]._kill(t, e) && (n = !0);
            return n;
          }),
          (f.clear = function (t) {
            var e = this.getChildren(!1, !0, !0),
              i = e.length;
            for (this._time = this._totalTime = 0; --i > -1; )
              e[i]._enabled(!1, !1);
            return t !== !1 && (this._labels = {}), this._uncache(!0);
          }),
          (f.invalidate = function () {
            for (var e = this._first; e; ) e.invalidate(), (e = e._next);
            return t.prototype.invalidate.call(this);
          }),
          (f._enabled = function (t, i) {
            if (t === this._gc)
              for (var s = this._first; s; ) s._enabled(t, !0), (s = s._next);
            return e.prototype._enabled.call(this, t, i);
          }),
          (f.totalTime = function () {
            this._forcingPlayhead = !0;
            var e = t.prototype.totalTime.apply(this, arguments);
            return (this._forcingPlayhead = !1), e;
          }),
          (f.duration = function (t) {
            return arguments.length
              ? (0 !== this.duration() &&
                  0 !== t &&
                  this.timeScale(this._duration / t),
                this)
              : (this._dirty && this.totalDuration(), this._duration);
          }),
          (f.totalDuration = function (t) {
            if (!arguments.length) {
              if (this._dirty) {
                for (var e, i, s = 0, n = this._last, r = 999999999999; n; )
                  (e = n._prev),
                    n._dirty && n.totalDuration(),
                    n._startTime > r && this._sortChildren && !n._paused
                      ? this.add(n, n._startTime - n._delay)
                      : (r = n._startTime),
                    0 > n._startTime &&
                      !n._paused &&
                      ((s -= n._startTime),
                      this._timeline.smoothChildTiming &&
                        (this._startTime += n._startTime / this._timeScale),
                      this.shiftChildren(-n._startTime, !1, -9999999999),
                      (r = 0)),
                    (i = n._startTime + n._totalDuration / n._timeScale),
                    i > s && (s = i),
                    (n = e);
                (this._duration = this._totalDuration = s), (this._dirty = !1);
              }
              return this._totalDuration;
            }
            return (
              0 !== this.totalDuration() &&
                0 !== t &&
                this.timeScale(this._totalDuration / t),
              this
            );
          }),
          (f.usesFrames = function () {
            for (var e = this._timeline; e._timeline; ) e = e._timeline;
            return e === t._rootFramesTimeline;
          }),
          (f.rawTime = function () {
            return this._paused
              ? this._totalTime
              : (this._timeline.rawTime() - this._startTime) * this._timeScale;
          }),
          s
        );
      },
      !0
    ),
    _gsScope._gsDefine(
      "TimelineMax",
      ["TimelineLite", "TweenLite", "easing.Ease"],
      function (t, e, i) {
        var s = function (e) {
            t.call(this, e),
              (this._repeat = this.vars.repeat || 0),
              (this._repeatDelay = this.vars.repeatDelay || 0),
              (this._cycle = 0),
              (this._yoyo = this.vars.yoyo === !0),
              (this._dirty = !0);
          },
          n = 1e-10,
          r = [],
          a = e._internals,
          o = a.lazyTweens,
          h = a.lazyRender,
          c = new i(null, null, 1, 0),
          l = (s.prototype = new t());
        return (
          (l.constructor = s),
          (l.kill()._gc = !1),
          (s.version = "1.13.2"),
          (l.invalidate = function () {
            return (
              (this._yoyo = this.vars.yoyo === !0),
              (this._repeat = this.vars.repeat || 0),
              (this._repeatDelay = this.vars.repeatDelay || 0),
              this._uncache(!0),
              t.prototype.invalidate.call(this)
            );
          }),
          (l.addCallback = function (t, i, s, n) {
            return this.add(e.delayedCall(0, t, s, n), i);
          }),
          (l.removeCallback = function (t, e) {
            if (t)
              if (null == e) this._kill(null, t);
              else
                for (
                  var i = this.getTweensOf(t, !1),
                    s = i.length,
                    n = this._parseTimeOrLabel(e);
                  --s > -1;

                )
                  i[s]._startTime === n && i[s]._enabled(!1, !1);
            return this;
          }),
          (l.tweenTo = function (t, i) {
            i = i || {};
            var s,
              n,
              a,
              o = {
                ease: c,
                overwrite: i.delay ? 2 : 1,
                useFrames: this.usesFrames(),
                immediateRender: !1,
              };
            for (n in i) o[n] = i[n];
            return (
              (o.time = this._parseTimeOrLabel(t)),
              (s =
                Math.abs(Number(o.time) - this._time) / this._timeScale ||
                0.001),
              (a = new e(this, s, o)),
              (o.onStart = function () {
                a.target.paused(!0),
                  a.vars.time !== a.target.time() &&
                    s === a.duration() &&
                    a.duration(
                      Math.abs(a.vars.time - a.target.time()) /
                        a.target._timeScale
                    ),
                  i.onStart &&
                    i.onStart.apply(i.onStartScope || a, i.onStartParams || r);
              }),
              a
            );
          }),
          (l.tweenFromTo = function (t, e, i) {
            (i = i || {}),
              (t = this._parseTimeOrLabel(t)),
              (i.startAt = {
                onComplete: this.seek,
                onCompleteParams: [t],
                onCompleteScope: this,
              }),
              (i.immediateRender = i.immediateRender !== !1);
            var s = this.tweenTo(e, i);
            return s.duration(
              Math.abs(s.vars.time - t) / this._timeScale || 0.001
            );
          }),
          (l.render = function (t, e, i) {
            this._gc && this._enabled(!0, !1);
            var s,
              a,
              c,
              l,
              u,
              d,
              _ = this._dirty ? this.totalDuration() : this._totalDuration,
              p = this._duration,
              f = this._time,
              m = this._totalTime,
              g = this._startTime,
              v = this._timeScale,
              y = this._rawPrevTime,
              b = this._paused,
              w = this._cycle;
            if (
              (t >= _
                ? (this._locked ||
                    ((this._totalTime = _), (this._cycle = this._repeat)),
                  this._reversed ||
                    this._hasPausedChild() ||
                    ((a = !0),
                    (l = "onComplete"),
                    0 === this._duration &&
                      (0 === t || 0 > y || y === n) &&
                      y !== t &&
                      this._first &&
                      ((u = !0), y > n && (l = "onReverseComplete"))),
                  (this._rawPrevTime =
                    this._duration || !e || t || this._rawPrevTime === t
                      ? t
                      : n),
                  this._yoyo && 0 !== (1 & this._cycle)
                    ? (this._time = t = 0)
                    : ((this._time = p), (t = p + 1e-4)))
                : 1e-7 > t
                ? (this._locked || (this._totalTime = this._cycle = 0),
                  (this._time = 0),
                  (0 !== f ||
                    (0 === p &&
                      y !== n &&
                      (y > 0 || (0 > t && y >= 0)) &&
                      !this._locked)) &&
                    ((l = "onReverseComplete"), (a = this._reversed)),
                  0 > t
                    ? ((this._active = !1),
                      y >= 0 && this._first && (u = !0),
                      (this._rawPrevTime = t))
                    : ((this._rawPrevTime =
                        p || !e || t || this._rawPrevTime === t ? t : n),
                      (t = 0),
                      this._initted || (u = !0)))
                : (0 === p && 0 > y && (u = !0),
                  (this._time = this._rawPrevTime = t),
                  this._locked ||
                    ((this._totalTime = t),
                    0 !== this._repeat &&
                      ((d = p + this._repeatDelay),
                      (this._cycle = (this._totalTime / d) >> 0),
                      0 !== this._cycle &&
                        this._cycle === this._totalTime / d &&
                        this._cycle--,
                      (this._time = this._totalTime - this._cycle * d),
                      this._yoyo &&
                        0 !== (1 & this._cycle) &&
                        (this._time = p - this._time),
                      this._time > p
                        ? ((this._time = p), (t = p + 1e-4))
                        : 0 > this._time
                        ? (this._time = t = 0)
                        : (t = this._time)))),
              this._cycle !== w && !this._locked)
            ) {
              var x = this._yoyo && 0 !== (1 & w),
                T = x === (this._yoyo && 0 !== (1 & this._cycle)),
                S = this._totalTime,
                P = this._cycle,
                E = this._rawPrevTime,
                j = this._time;
              if (
                ((this._totalTime = w * p),
                w > this._cycle ? (x = !x) : (this._totalTime += p),
                (this._time = f),
                (this._rawPrevTime = 0 === p ? y - 1e-4 : y),
                (this._cycle = w),
                (this._locked = !0),
                (f = x ? 0 : p),
                this.render(f, e, 0 === p),
                e ||
                  this._gc ||
                  (this.vars.onRepeat &&
                    this.vars.onRepeat.apply(
                      this.vars.onRepeatScope || this,
                      this.vars.onRepeatParams || r
                    )),
                T && ((f = x ? p + 1e-4 : -1e-4), this.render(f, !0, !1)),
                (this._locked = !1),
                this._paused && !b)
              )
                return;
              (this._time = j),
                (this._totalTime = S),
                (this._cycle = P),
                (this._rawPrevTime = E);
            }
            if (!((this._time !== f && this._first) || i || u))
              return void (
                m !== this._totalTime &&
                this._onUpdate &&
                (e ||
                  this._onUpdate.apply(
                    this.vars.onUpdateScope || this,
                    this.vars.onUpdateParams || r
                  ))
              );
            if (
              (this._initted || (this._initted = !0),
              this._active ||
                (!this._paused &&
                  this._totalTime !== m &&
                  t > 0 &&
                  (this._active = !0)),
              0 === m &&
                this.vars.onStart &&
                0 !== this._totalTime &&
                (e ||
                  this.vars.onStart.apply(
                    this.vars.onStartScope || this,
                    this.vars.onStartParams || r
                  )),
              this._time >= f)
            )
              for (s = this._first; s && ((c = s._next), !this._paused || b); )
                (s._active ||
                  (s._startTime <= this._time && !s._paused && !s._gc)) &&
                  (s._reversed
                    ? s.render(
                        (s._dirty ? s.totalDuration() : s._totalDuration) -
                          (t - s._startTime) * s._timeScale,
                        e,
                        i
                      )
                    : s.render((t - s._startTime) * s._timeScale, e, i)),
                  (s = c);
            else
              for (s = this._last; s && ((c = s._prev), !this._paused || b); )
                (s._active || (f >= s._startTime && !s._paused && !s._gc)) &&
                  (s._reversed
                    ? s.render(
                        (s._dirty ? s.totalDuration() : s._totalDuration) -
                          (t - s._startTime) * s._timeScale,
                        e,
                        i
                      )
                    : s.render((t - s._startTime) * s._timeScale, e, i)),
                  (s = c);
            this._onUpdate &&
              (e ||
                (o.length && h(),
                this._onUpdate.apply(
                  this.vars.onUpdateScope || this,
                  this.vars.onUpdateParams || r
                ))),
              l &&
                (this._locked ||
                  this._gc ||
                  ((g === this._startTime || v !== this._timeScale) &&
                    (0 === this._time || _ >= this.totalDuration()) &&
                    (a &&
                      (o.length && h(),
                      this._timeline.autoRemoveChildren &&
                        this._enabled(!1, !1),
                      (this._active = !1)),
                    !e &&
                      this.vars[l] &&
                      this.vars[l].apply(
                        this.vars[l + "Scope"] || this,
                        this.vars[l + "Params"] || r
                      ))));
          }),
          (l.getActive = function (t, e, i) {
            null == t && (t = !0), null == e && (e = !0), null == i && (i = !1);
            var s,
              n,
              r = [],
              a = this.getChildren(t, e, i),
              o = 0,
              h = a.length;
            for (s = 0; h > s; s++) (n = a[s]), n.isActive() && (r[o++] = n);
            return r;
          }),
          (l.getLabelAfter = function (t) {
            t || (0 !== t && (t = this._time));
            var e,
              i = this.getLabelsArray(),
              s = i.length;
            for (e = 0; s > e; e++) if (i[e].time > t) return i[e].name;
            return null;
          }),
          (l.getLabelBefore = function (t) {
            null == t && (t = this._time);
            for (var e = this.getLabelsArray(), i = e.length; --i > -1; )
              if (t > e[i].time) return e[i].name;
            return null;
          }),
          (l.getLabelsArray = function () {
            var t,
              e = [],
              i = 0;
            for (t in this._labels) e[i++] = { time: this._labels[t], name: t };
            return (
              e.sort(function (t, e) {
                return t.time - e.time;
              }),
              e
            );
          }),
          (l.progress = function (t, e) {
            return arguments.length
              ? this.totalTime(
                  this.duration() *
                    (this._yoyo && 0 !== (1 & this._cycle) ? 1 - t : t) +
                    this._cycle * (this._duration + this._repeatDelay),
                  e
                )
              : this._time / this.duration();
          }),
          (l.totalProgress = function (t, e) {
            return arguments.length
              ? this.totalTime(this.totalDuration() * t, e)
              : this._totalTime / this.totalDuration();
          }),
          (l.totalDuration = function (e) {
            return arguments.length
              ? -1 === this._repeat
                ? this
                : this.duration(
                    (e - this._repeat * this._repeatDelay) / (this._repeat + 1)
                  )
              : (this._dirty &&
                  (t.prototype.totalDuration.call(this),
                  (this._totalDuration =
                    -1 === this._repeat
                      ? 999999999999
                      : this._duration * (this._repeat + 1) +
                        this._repeatDelay * this._repeat)),
                this._totalDuration);
          }),
          (l.time = function (t, e) {
            return arguments.length
              ? (this._dirty && this.totalDuration(),
                t > this._duration && (t = this._duration),
                this._yoyo && 0 !== (1 & this._cycle)
                  ? (t =
                      this._duration -
                      t +
                      this._cycle * (this._duration + this._repeatDelay))
                  : 0 !== this._repeat &&
                    (t += this._cycle * (this._duration + this._repeatDelay)),
                this.totalTime(t, e))
              : this._time;
          }),
          (l.repeat = function (t) {
            return arguments.length
              ? ((this._repeat = t), this._uncache(!0))
              : this._repeat;
          }),
          (l.repeatDelay = function (t) {
            return arguments.length
              ? ((this._repeatDelay = t), this._uncache(!0))
              : this._repeatDelay;
          }),
          (l.yoyo = function (t) {
            return arguments.length ? ((this._yoyo = t), this) : this._yoyo;
          }),
          (l.currentLabel = function (t) {
            return arguments.length
              ? this.seek(t, !0)
              : this.getLabelBefore(this._time + 1e-8);
          }),
          s
        );
      },
      !0
    ),
    (function () {
      var t = 180 / Math.PI,
        e = [],
        i = [],
        s = [],
        n = {},
        r = function (t, e, i, s) {
          (this.a = t),
            (this.b = e),
            (this.c = i),
            (this.d = s),
            (this.da = s - t),
            (this.ca = i - t),
            (this.ba = e - t);
        },
        a =
          ",x,y,z,left,top,right,bottom,marginTop,marginLeft,marginRight,marginBottom,paddingLeft,paddingTop,paddingRight,paddingBottom,backgroundPosition,backgroundPosition_y,",
        o = function (t, e, i, s) {
          var n = { a: t },
            r = {},
            a = {},
            o = { c: s },
            h = (t + e) / 2,
            c = (e + i) / 2,
            l = (i + s) / 2,
            u = (h + c) / 2,
            d = (c + l) / 2,
            _ = (d - u) / 8;
          return (
            (n.b = h + (t - h) / 4),
            (r.b = u + _),
            (n.c = r.a = (n.b + r.b) / 2),
            (r.c = a.a = (u + d) / 2),
            (a.b = d - _),
            (o.b = l + (s - l) / 4),
            (a.c = o.a = (a.b + o.b) / 2),
            [n, r, a, o]
          );
        },
        h = function (t, n, r, a, h) {
          var c,
            l,
            u,
            d,
            _,
            p,
            f,
            m,
            g,
            v,
            y,
            b,
            w,
            x = t.length - 1,
            T = 0,
            S = t[0].a;
          for (c = 0; x > c; c++)
            (_ = t[T]),
              (l = _.a),
              (u = _.d),
              (d = t[T + 1].d),
              h
                ? ((y = e[c]),
                  (b = i[c]),
                  (w = (0.25 * (b + y) * n) / (a ? 0.5 : s[c] || 0.5)),
                  (p = u - (u - l) * (a ? 0.5 * n : 0 !== y ? w / y : 0)),
                  (f = u + (d - u) * (a ? 0.5 * n : 0 !== b ? w / b : 0)),
                  (m =
                    u - (p + (((f - p) * ((3 * y) / (y + b) + 0.5)) / 4 || 0))))
                : ((p = u - 0.5 * (u - l) * n),
                  (f = u + 0.5 * (d - u) * n),
                  (m = u - (p + f) / 2)),
              (p += m),
              (f += m),
              (_.c = g = p),
              (_.b = 0 !== c ? S : (S = _.a + 0.6 * (_.c - _.a))),
              (_.da = u - l),
              (_.ca = g - l),
              (_.ba = S - l),
              r
                ? ((v = o(l, S, g, u)),
                  t.splice(T, 1, v[0], v[1], v[2], v[3]),
                  (T += 4))
                : T++,
              (S = f);
          (_ = t[T]),
            (_.b = S),
            (_.c = S + 0.4 * (_.d - S)),
            (_.da = _.d - _.a),
            (_.ca = _.c - _.a),
            (_.ba = S - _.a),
            r &&
              ((v = o(_.a, S, _.c, _.d)),
              t.splice(T, 1, v[0], v[1], v[2], v[3]));
        },
        c = function (t, s, n, a) {
          var o,
            h,
            c,
            l,
            u,
            d,
            _ = [];
          if (a)
            for (t = [a].concat(t), h = t.length; --h > -1; )
              "string" == typeof (d = t[h][s]) &&
                "=" === d.charAt(1) &&
                (t[h][s] = a[s] + Number(d.charAt(0) + d.substr(2)));
          if (((o = t.length - 2), 0 > o))
            return (_[0] = new r(t[0][s], 0, 0, t[-1 > o ? 0 : 1][s])), _;
          for (h = 0; o > h; h++)
            (c = t[h][s]),
              (l = t[h + 1][s]),
              (_[h] = new r(c, 0, 0, l)),
              n &&
                ((u = t[h + 2][s]),
                (e[h] = (e[h] || 0) + (l - c) * (l - c)),
                (i[h] = (i[h] || 0) + (u - l) * (u - l)));
          return (_[h] = new r(t[h][s], 0, 0, t[h + 1][s])), _;
        },
        l = function (t, r, o, l, u, d) {
          var _,
            p,
            f,
            m,
            g,
            v,
            y,
            b,
            w = {},
            x = [],
            T = d || t[0];
          (u = "string" == typeof u ? "," + u + "," : a), null == r && (r = 1);
          for (p in t[0]) x.push(p);
          if (t.length > 1) {
            for (b = t[t.length - 1], y = !0, _ = x.length; --_ > -1; )
              if (((p = x[_]), Math.abs(T[p] - b[p]) > 0.05)) {
                y = !1;
                break;
              }
            y &&
              ((t = t.concat()),
              d && t.unshift(d),
              t.push(t[1]),
              (d = t[t.length - 3]));
          }
          for (e.length = i.length = s.length = 0, _ = x.length; --_ > -1; )
            (p = x[_]),
              (n[p] = -1 !== u.indexOf("," + p + ",")),
              (w[p] = c(t, p, n[p], d));
          for (_ = e.length; --_ > -1; )
            (e[_] = Math.sqrt(e[_])), (i[_] = Math.sqrt(i[_]));
          if (!l) {
            for (_ = x.length; --_ > -1; )
              if (n[p])
                for (f = w[x[_]], v = f.length - 1, m = 0; v > m; m++)
                  (g = f[m + 1].da / i[m] + f[m].da / e[m]),
                    (s[m] = (s[m] || 0) + g * g);
            for (_ = s.length; --_ > -1; ) s[_] = Math.sqrt(s[_]);
          }
          for (_ = x.length, m = o ? 4 : 1; --_ > -1; )
            (p = x[_]),
              (f = w[p]),
              h(f, r, o, l, n[p]),
              y && (f.splice(0, m), f.splice(f.length - m, m));
          return w;
        },
        u = function (t, e, i) {
          e = e || "soft";
          var s,
            n,
            a,
            o,
            h,
            c,
            l,
            u,
            d,
            _,
            p,
            f = {},
            m = "cubic" === e ? 3 : 2,
            g = "soft" === e,
            v = [];
          if ((g && i && (t = [i].concat(t)), null == t || m + 1 > t.length))
            throw "invalid Bezier data";
          for (d in t[0]) v.push(d);
          for (c = v.length; --c > -1; ) {
            for (
              d = v[c], f[d] = h = [], _ = 0, u = t.length, l = 0;
              u > l;
              l++
            )
              (s =
                null == i
                  ? t[l][d]
                  : "string" == typeof (p = t[l][d]) && "=" === p.charAt(1)
                  ? i[d] + Number(p.charAt(0) + p.substr(2))
                  : Number(p)),
                g && l > 1 && u - 1 > l && (h[_++] = (s + h[_ - 2]) / 2),
                (h[_++] = s);
            for (u = _ - m + 1, _ = 0, l = 0; u > l; l += m)
              (s = h[l]),
                (n = h[l + 1]),
                (a = h[l + 2]),
                (o = 2 === m ? 0 : h[l + 3]),
                (h[_++] = p =
                  3 === m
                    ? new r(s, n, a, o)
                    : new r(s, (2 * n + s) / 3, (2 * n + a) / 3, a));
            h.length = _;
          }
          return f;
        },
        d = function (t, e, i) {
          for (
            var s, n, r, a, o, h, c, l, u, d, _, p = 1 / i, f = t.length;
            --f > -1;

          )
            for (
              d = t[f],
                r = d.a,
                a = d.d - r,
                o = d.c - r,
                h = d.b - r,
                s = n = 0,
                l = 1;
              i >= l;
              l++
            )
              (c = p * l),
                (u = 1 - c),
                (s = n - (n = (c * c * a + 3 * u * (c * o + u * h)) * c)),
                (_ = f * i + l - 1),
                (e[_] = (e[_] || 0) + s * s);
        },
        _ = function (t, e) {
          e = e >> 0 || 6;
          var i,
            s,
            n,
            r,
            a = [],
            o = [],
            h = 0,
            c = 0,
            l = e - 1,
            u = [],
            _ = [];
          for (i in t) d(t[i], a, e);
          for (n = a.length, s = 0; n > s; s++)
            (h += Math.sqrt(a[s])),
              (r = s % e),
              (_[r] = h),
              r === l &&
                ((c += h),
                (r = (s / e) >> 0),
                (u[r] = _),
                (o[r] = c),
                (h = 0),
                (_ = []));
          return { length: c, lengths: o, segments: u };
        },
        p = _gsScope._gsDefine.plugin({
          propName: "bezier",
          priority: -1,
          version: "1.3.3",
          API: 2,
          global: !0,
          init: function (t, e, i) {
            (this._target = t),
              e instanceof Array && (e = { values: e }),
              (this._func = {}),
              (this._round = {}),
              (this._props = []),
              (this._timeRes =
                null == e.timeResolution ? 6 : parseInt(e.timeResolution, 10));
            var s,
              n,
              r,
              a,
              o,
              h = e.values || [],
              c = {},
              d = h[0],
              p = e.autoRotate || i.vars.orientToBezier;
            this._autoRotate = p
              ? p instanceof Array
                ? p
                : [["x", "y", "rotation", p === !0 ? 0 : Number(p) || 0]]
              : null;
            for (s in d) this._props.push(s);
            for (r = this._props.length; --r > -1; )
              (s = this._props[r]),
                this._overwriteProps.push(s),
                (n = this._func[s] = "function" == typeof t[s]),
                (c[s] = n
                  ? t[
                      s.indexOf("set") ||
                      "function" != typeof t["get" + s.substr(3)]
                        ? s
                        : "get" + s.substr(3)
                    ]()
                  : parseFloat(t[s])),
                o || (c[s] !== h[0][s] && (o = c));
            if (
              ((this._beziers =
                "cubic" !== e.type &&
                "quadratic" !== e.type &&
                "soft" !== e.type
                  ? l(
                      h,
                      isNaN(e.curviness) ? 1 : e.curviness,
                      !1,
                      "thruBasic" === e.type,
                      e.correlate,
                      o
                    )
                  : u(h, e.type, c)),
              (this._segCount = this._beziers[s].length),
              this._timeRes)
            ) {
              var f = _(this._beziers, this._timeRes);
              (this._length = f.length),
                (this._lengths = f.lengths),
                (this._segments = f.segments),
                (this._l1 = this._li = this._s1 = this._si = 0),
                (this._l2 = this._lengths[0]),
                (this._curSeg = this._segments[0]),
                (this._s2 = this._curSeg[0]),
                (this._prec = 1 / this._curSeg.length);
            }
            if ((p = this._autoRotate))
              for (
                this._initialRotations = [],
                  p[0] instanceof Array || (this._autoRotate = p = [p]),
                  r = p.length;
                --r > -1;

              ) {
                for (a = 0; 3 > a; a++)
                  (s = p[r][a]),
                    (this._func[s] =
                      "function" == typeof t[s] &&
                      t[
                        s.indexOf("set") ||
                        "function" != typeof t["get" + s.substr(3)]
                          ? s
                          : "get" + s.substr(3)
                      ]);
                (s = p[r][2]),
                  (this._initialRotations[r] = this._func[s]
                    ? this._func[s].call(this._target)
                    : this._target[s]);
              }
            return (this._startRatio = i.vars.runBackwards ? 1 : 0), !0;
          },
          set: function (e) {
            var i,
              s,
              n,
              r,
              a,
              o,
              h,
              c,
              l,
              u,
              d = this._segCount,
              _ = this._func,
              p = this._target,
              f = e !== this._startRatio;
            if (this._timeRes) {
              if (
                ((l = this._lengths),
                (u = this._curSeg),
                (e *= this._length),
                (n = this._li),
                e > this._l2 && d - 1 > n)
              ) {
                for (c = d - 1; c > n && e >= (this._l2 = l[++n]); );
                (this._l1 = l[n - 1]),
                  (this._li = n),
                  (this._curSeg = u = this._segments[n]),
                  (this._s2 = u[(this._s1 = this._si = 0)]);
              } else if (this._l1 > e && n > 0) {
                for (; n > 0 && (this._l1 = l[--n]) >= e; );
                0 === n && this._l1 > e ? (this._l1 = 0) : n++,
                  (this._l2 = l[n]),
                  (this._li = n),
                  (this._curSeg = u = this._segments[n]),
                  (this._s1 = u[(this._si = u.length - 1) - 1] || 0),
                  (this._s2 = u[this._si]);
              }
              if (
                ((i = n),
                (e -= this._l1),
                (n = this._si),
                e > this._s2 && u.length - 1 > n)
              ) {
                for (c = u.length - 1; c > n && e >= (this._s2 = u[++n]); );
                (this._s1 = u[n - 1]), (this._si = n);
              } else if (this._s1 > e && n > 0) {
                for (; n > 0 && (this._s1 = u[--n]) >= e; );
                0 === n && this._s1 > e ? (this._s1 = 0) : n++,
                  (this._s2 = u[n]),
                  (this._si = n);
              }
              o = (n + (e - this._s1) / (this._s2 - this._s1)) * this._prec;
            } else
              (i = 0 > e ? 0 : e >= 1 ? d - 1 : (d * e) >> 0),
                (o = (e - i * (1 / d)) * d);
            for (s = 1 - o, n = this._props.length; --n > -1; )
              (r = this._props[n]),
                (a = this._beziers[r][i]),
                (h = (o * o * a.da + 3 * s * (o * a.ca + s * a.ba)) * o + a.a),
                this._round[r] && (h = Math.round(h)),
                _[r] ? p[r](h) : (p[r] = h);
            if (this._autoRotate) {
              var m,
                g,
                v,
                y,
                b,
                w,
                x,
                T = this._autoRotate;
              for (n = T.length; --n > -1; )
                (r = T[n][2]),
                  (w = T[n][3] || 0),
                  (x = T[n][4] === !0 ? 1 : t),
                  (a = this._beziers[T[n][0]]),
                  (m = this._beziers[T[n][1]]),
                  a &&
                    m &&
                    ((a = a[i]),
                    (m = m[i]),
                    (g = a.a + (a.b - a.a) * o),
                    (y = a.b + (a.c - a.b) * o),
                    (g += (y - g) * o),
                    (y += (a.c + (a.d - a.c) * o - y) * o),
                    (v = m.a + (m.b - m.a) * o),
                    (b = m.b + (m.c - m.b) * o),
                    (v += (b - v) * o),
                    (b += (m.c + (m.d - m.c) * o - b) * o),
                    (h = f
                      ? Math.atan2(b - v, y - g) * x + w
                      : this._initialRotations[n]),
                    _[r] ? p[r](h) : (p[r] = h));
            }
          },
        }),
        f = p.prototype;
      (p.bezierThrough = l),
        (p.cubicToQuadratic = o),
        (p._autoCSS = !0),
        (p.quadraticToCubic = function (t, e, i) {
          return new r(t, (2 * e + t) / 3, (2 * e + i) / 3, i);
        }),
        (p._cssRegister = function () {
          var t = _gsScope._gsDefine.globals.CSSPlugin;
          if (t) {
            var e = t._internals,
              i = e._parseToProxy,
              s = e._setPluginRatio,
              n = e.CSSPropTween;
            e._registerComplexSpecialProp("bezier", {
              parser: function (t, e, r, a, o, h) {
                e instanceof Array && (e = { values: e }), (h = new p());
                var c,
                  l,
                  u,
                  d = e.values,
                  _ = d.length - 1,
                  f = [],
                  m = {};
                if (0 > _) return o;
                for (c = 0; _ >= c; c++)
                  (u = i(t, d[c], a, o, h, _ !== c)), (f[c] = u.end);
                for (l in e) m[l] = e[l];
                return (
                  (m.values = f),
                  (o = new n(t, "bezier", 0, 0, u.pt, 2)),
                  (o.data = u),
                  (o.plugin = h),
                  (o.setRatio = s),
                  0 === m.autoRotate && (m.autoRotate = !0),
                  !m.autoRotate ||
                    m.autoRotate instanceof Array ||
                    ((c = m.autoRotate === !0 ? 0 : Number(m.autoRotate)),
                    (m.autoRotate =
                      null != u.end.left
                        ? [["left", "top", "rotation", c, !1]]
                        : null != u.end.x && [["x", "y", "rotation", c, !1]])),
                  m.autoRotate &&
                    (a._transform || a._enableTransforms(!1),
                    (u.autoRotate = a._target._gsTransform)),
                  h._onInitTween(u.proxy, m, a._tween),
                  o
                );
              },
            });
          }
        }),
        (f._roundProps = function (t, e) {
          for (var i = this._overwriteProps, s = i.length; --s > -1; )
            (t[i[s]] || t.bezier || t.bezierThrough) && (this._round[i[s]] = e);
        }),
        (f._kill = function (t) {
          var e,
            i,
            s = this._props;
          for (e in this._beziers)
            if (e in t)
              for (
                delete this._beziers[e], delete this._func[e], i = s.length;
                --i > -1;

              )
                s[i] === e && s.splice(i, 1);
          return this._super._kill.call(this, t);
        });
    })(),
    _gsScope._gsDefine(
      "plugins.CSSPlugin",
      ["plugins.TweenPlugin", "TweenLite"],
      function (t, e) {
        var i,
          s,
          n,
          r,
          a = function () {
            t.call(this, "css"),
              (this._overwriteProps.length = 0),
              (this.setRatio = a.prototype.setRatio);
          },
          o = {},
          h = (a.prototype = new t("css"));
        (h.constructor = a),
          (a.version = "1.13.2"),
          (a.API = 2),
          (a.defaultTransformPerspective = 0),
          (a.defaultSkewType = "compensated"),
          (h = "px"),
          (a.suffixMap = {
            top: h,
            right: h,
            bottom: h,
            left: h,
            width: h,
            height: h,
            fontSize: h,
            padding: h,
            margin: h,
            perspective: h,
            lineHeight: "",
          });
        var c,
          l,
          u,
          d,
          _,
          p,
          f = /(?:\d|\-\d|\.\d|\-\.\d)+/g,
          m = /(?:\d|\-\d|\.\d|\-\.\d|\+=\d|\-=\d|\+=.\d|\-=\.\d)+/g,
          g = /(?:\+=|\-=|\-|\b)[\d\-\.]+[a-zA-Z0-9]*(?:%|\b)/gi,
          v = /[^\d\-\.]/g,
          y = /(?:\d|\-|\+|=|#|\.)*/g,
          b = /opacity *= *([^)]*)/i,
          w = /opacity:([^;]*)/i,
          x = /alpha\(opacity *=.+?\)/i,
          T = /^(rgb|hsl)/,
          S = /([A-Z])/g,
          P = /-([a-z])/gi,
          E = /(^(?:url\(\"|url\())|(?:(\"\))$|\)$)/gi,
          j = function (t, e) {
            return e.toUpperCase();
          },
          A = /(?:Left|Right|Width)/i,
          L = /(M11|M12|M21|M22)=[\d\-\.e]+/gi,
          M = /progid\:DXImageTransform\.Microsoft\.Matrix\(.+?\)/i,
          R = /,(?=[^\)]*(?:\(|$))/gi,
          C = Math.PI / 180,
          I = 180 / Math.PI,
          D = {},
          O = document,
          k = O.createElement("div"),
          N = O.createElement("img"),
          F = (a._internals = { _specialProps: o }),
          X = navigator.userAgent,
          B = (function () {
            var t,
              e = X.indexOf("Android"),
              i = O.createElement("div");
            return (
              (u =
                -1 !== X.indexOf("Safari") &&
                -1 === X.indexOf("Chrome") &&
                (-1 === e || Number(X.substr(e + 8, 1)) > 3)),
              (_ = u && 6 > Number(X.substr(X.indexOf("Version/") + 8, 1))),
              (d = -1 !== X.indexOf("Firefox")),
              /MSIE ([0-9]{1,}[\.0-9]{0,})/.exec(X) &&
                (p = parseFloat(RegExp.$1)),
              (i.innerHTML = "<a style='top:1px;opacity:.55;'>a</a>"),
              (t = i.getElementsByTagName("a")[0]),
              !!t && /^0.55/.test(t.style.opacity)
            );
          })(),
          H = function (t) {
            return b.test(
              "string" == typeof t
                ? t
                : (t.currentStyle ? t.currentStyle.filter : t.style.filter) ||
                    ""
            )
              ? parseFloat(RegExp.$1) / 100
              : 1;
          },
          U = function (t) {
            window.console && console.log(t);
          },
          Y = "",
          q = "",
          G = function (t, e) {
            e = e || k;
            var i,
              s,
              n = e.style;
            if (void 0 !== n[t]) return t;
            for (
              t = t.charAt(0).toUpperCase() + t.substr(1),
                i = ["O", "Moz", "ms", "Ms", "Webkit"],
                s = 5;
              --s > -1 && void 0 === n[i[s] + t];

            );
            return s >= 0
              ? ((q = 3 === s ? "ms" : i[s]),
                (Y = "-" + q.toLowerCase() + "-"),
                q + t)
              : null;
          },
          z = O.defaultView ? O.defaultView.getComputedStyle : function () {},
          V = (a.getStyle = function (t, e, i, s, n) {
            var r;
            return B || "opacity" !== e
              ? (!s && t.style[e]
                  ? (r = t.style[e])
                  : (i = i || z(t))
                  ? (r =
                      i[e] ||
                      i.getPropertyValue(e) ||
                      i.getPropertyValue(e.replace(S, "-$1").toLowerCase()))
                  : t.currentStyle && (r = t.currentStyle[e]),
                null == n ||
                (r && "none" !== r && "auto" !== r && "auto auto" !== r)
                  ? r
                  : n)
              : H(t);
          }),
          W = (F.convertToPixels = function (t, i, s, n, r) {
            if ("px" === n || !n) return s;
            if ("auto" === n || !s) return 0;
            var o,
              h,
              c,
              l = A.test(i),
              u = t,
              d = k.style,
              _ = 0 > s;
            if ((_ && (s = -s), "%" === n && -1 !== i.indexOf("border")))
              o = (s / 100) * (l ? t.clientWidth : t.clientHeight);
            else {
              if (
                ((d.cssText =
                  "border:0 solid red;position:" +
                  V(t, "position") +
                  ";line-height:0;"),
                "%" !== n && u.appendChild)
              )
                d[l ? "borderLeftWidth" : "borderTopWidth"] = s + n;
              else {
                if (
                  ((u = t.parentNode || O.body),
                  (h = u._gsCache),
                  (c = e.ticker.frame),
                  h && l && h.time === c)
                )
                  return (h.width * s) / 100;
                d[l ? "width" : "height"] = s + n;
              }
              u.appendChild(k),
                (o = parseFloat(k[l ? "offsetWidth" : "offsetHeight"])),
                u.removeChild(k),
                l &&
                  "%" === n &&
                  a.cacheWidths !== !1 &&
                  ((h = u._gsCache = u._gsCache || {}),
                  (h.time = c),
                  (h.width = 100 * (o / s))),
                0 !== o || r || (o = W(t, i, s, n, !0));
            }
            return _ ? -o : o;
          }),
          J = (F.calculateOffset = function (t, e, i) {
            if ("absolute" !== V(t, "position", i)) return 0;
            var s = "left" === e ? "Left" : "Top",
              n = V(t, "margin" + s, i);
            return (
              t["offset" + s] - (W(t, e, parseFloat(n), n.replace(y, "")) || 0)
            );
          }),
          Q = function (t, e) {
            var i,
              s,
              n = {};
            if ((e = e || z(t, null)))
              if ((i = e.length))
                for (; --i > -1; )
                  n[e[i].replace(P, j)] = e.getPropertyValue(e[i]);
              else for (i in e) n[i] = e[i];
            else if ((e = t.currentStyle || t.style))
              for (i in e)
                "string" == typeof i &&
                  void 0 === n[i] &&
                  (n[i.replace(P, j)] = e[i]);
            return (
              B || (n.opacity = H(t)),
              (s = St(t, e, !1)),
              (n.rotation = s.rotation),
              (n.skewX = s.skewX),
              (n.scaleX = s.scaleX),
              (n.scaleY = s.scaleY),
              (n.x = s.x),
              (n.y = s.y),
              xt &&
                ((n.z = s.z),
                (n.rotationX = s.rotationX),
                (n.rotationY = s.rotationY),
                (n.scaleZ = s.scaleZ)),
              n.filters && delete n.filters,
              n
            );
          },
          Z = function (t, e, i, s, n) {
            var r,
              a,
              o,
              h = {},
              c = t.style;
            for (a in i)
              "cssText" !== a &&
                "length" !== a &&
                isNaN(a) &&
                (e[a] !== (r = i[a]) || (n && n[a])) &&
                -1 === a.indexOf("Origin") &&
                ("number" == typeof r || "string" == typeof r) &&
                ((h[a] =
                  "auto" !== r || ("left" !== a && "top" !== a)
                    ? ("" !== r && "auto" !== r && "none" !== r) ||
                      "string" != typeof e[a] ||
                      "" === e[a].replace(v, "")
                      ? r
                      : 0
                    : J(t, a)),
                void 0 !== c[a] && (o = new ut(c, a, c[a], o)));
            if (s) for (a in s) "className" !== a && (h[a] = s[a]);
            return { difs: h, firstMPT: o };
          },
          K = { width: ["Left", "Right"], height: ["Top", "Bottom"] },
          $ = ["marginLeft", "marginRight", "marginTop", "marginBottom"],
          tt = function (t, e, i) {
            var s = parseFloat("width" === e ? t.offsetWidth : t.offsetHeight),
              n = K[e],
              r = n.length;
            for (i = i || z(t, null); --r > -1; )
              (s -= parseFloat(V(t, "padding" + n[r], i, !0)) || 0),
                (s -= parseFloat(V(t, "border" + n[r] + "Width", i, !0)) || 0);
            return s;
          },
          et = function (t, e) {
            (null == t || "" === t || "auto" === t || "auto auto" === t) &&
              (t = "0 0");
            var i = t.split(" "),
              s =
                -1 !== t.indexOf("left")
                  ? "0%"
                  : -1 !== t.indexOf("right")
                  ? "100%"
                  : i[0],
              n =
                -1 !== t.indexOf("top")
                  ? "0%"
                  : -1 !== t.indexOf("bottom")
                  ? "100%"
                  : i[1];
            return (
              null == n ? (n = "0") : "center" === n && (n = "50%"),
              ("center" === s ||
                (isNaN(parseFloat(s)) && -1 === (s + "").indexOf("="))) &&
                (s = "50%"),
              e &&
                ((e.oxp = -1 !== s.indexOf("%")),
                (e.oyp = -1 !== n.indexOf("%")),
                (e.oxr = "=" === s.charAt(1)),
                (e.oyr = "=" === n.charAt(1)),
                (e.ox = parseFloat(s.replace(v, ""))),
                (e.oy = parseFloat(n.replace(v, "")))),
              s + " " + n + (i.length > 2 ? " " + i[2] : "")
            );
          },
          it = function (t, e) {
            return "string" == typeof t && "=" === t.charAt(1)
              ? parseInt(t.charAt(0) + "1", 10) * parseFloat(t.substr(2))
              : parseFloat(t) - parseFloat(e);
          },
          st = function (t, e) {
            return null == t
              ? e
              : "string" == typeof t && "=" === t.charAt(1)
              ? parseInt(t.charAt(0) + "1", 10) * Number(t.substr(2)) + e
              : parseFloat(t);
          },
          nt = function (t, e, i, s) {
            var n,
              r,
              a,
              o,
              h = 1e-6;
            return (
              null == t
                ? (o = e)
                : "number" == typeof t
                ? (o = t)
                : ((n = 360),
                  (r = t.split("_")),
                  (a =
                    Number(r[0].replace(v, "")) *
                      (-1 === t.indexOf("rad") ? 1 : I) -
                    ("=" === t.charAt(1) ? 0 : e)),
                  r.length &&
                    (s && (s[i] = e + a),
                    -1 !== t.indexOf("short") &&
                      ((a %= n),
                      a !== a % (n / 2) && (a = 0 > a ? a + n : a - n)),
                    -1 !== t.indexOf("_cw") && 0 > a
                      ? (a = ((a + 9999999999 * n) % n) - (0 | (a / n)) * n)
                      : -1 !== t.indexOf("ccw") &&
                        a > 0 &&
                        (a = ((a - 9999999999 * n) % n) - (0 | (a / n)) * n)),
                  (o = e + a)),
              h > o && o > -h && (o = 0),
              o
            );
          },
          rt = {
            aqua: [0, 255, 255],
            lime: [0, 255, 0],
            silver: [192, 192, 192],
            black: [0, 0, 0],
            maroon: [128, 0, 0],
            teal: [0, 128, 128],
            blue: [0, 0, 255],
            navy: [0, 0, 128],
            white: [255, 255, 255],
            fuchsia: [255, 0, 255],
            olive: [128, 128, 0],
            yellow: [255, 255, 0],
            orange: [255, 165, 0],
            gray: [128, 128, 128],
            purple: [128, 0, 128],
            green: [0, 128, 0],
            red: [255, 0, 0],
            pink: [255, 192, 203],
            cyan: [0, 255, 255],
            transparent: [255, 255, 255, 0],
          },
          at = function (t, e, i) {
            return (
              (t = 0 > t ? t + 1 : t > 1 ? t - 1 : t),
              0 |
                (255 *
                  (1 > 6 * t
                    ? e + 6 * (i - e) * t
                    : 0.5 > t
                    ? i
                    : 2 > 3 * t
                    ? e + 6 * (i - e) * (2 / 3 - t)
                    : e) +
                  0.5)
            );
          },
          ot = function (t) {
            var e, i, s, n, r, a;
            return t && "" !== t
              ? "number" == typeof t
                ? [t >> 16, 255 & (t >> 8), 255 & t]
                : ("," === t.charAt(t.length - 1) &&
                    (t = t.substr(0, t.length - 1)),
                  rt[t]
                    ? rt[t]
                    : "#" === t.charAt(0)
                    ? (4 === t.length &&
                        ((e = t.charAt(1)),
                        (i = t.charAt(2)),
                        (s = t.charAt(3)),
                        (t = "#" + e + e + i + i + s + s)),
                      (t = parseInt(t.substr(1), 16)),
                      [t >> 16, 255 & (t >> 8), 255 & t])
                    : "hsl" === t.substr(0, 3)
                    ? ((t = t.match(f)),
                      (n = (Number(t[0]) % 360) / 360),
                      (r = Number(t[1]) / 100),
                      (a = Number(t[2]) / 100),
                      (i = 0.5 >= a ? a * (r + 1) : a + r - a * r),
                      (e = 2 * a - i),
                      t.length > 3 && (t[3] = Number(t[3])),
                      (t[0] = at(n + 1 / 3, e, i)),
                      (t[1] = at(n, e, i)),
                      (t[2] = at(n - 1 / 3, e, i)),
                      t)
                    : ((t = t.match(f) || rt.transparent),
                      (t[0] = Number(t[0])),
                      (t[1] = Number(t[1])),
                      (t[2] = Number(t[2])),
                      t.length > 3 && (t[3] = Number(t[3])),
                      t))
              : rt.black;
          },
          ht = "(?:\\b(?:(?:rgb|rgba|hsl|hsla)\\(.+?\\))|\\B#.+?\\b";
        for (h in rt) ht += "|" + h + "\\b";
        ht = RegExp(ht + ")", "gi");
        var ct = function (t, e, i, s) {
            if (null == t)
              return function (t) {
                return t;
              };
            var n,
              r = e ? (t.match(ht) || [""])[0] : "",
              a = t.split(r).join("").match(g) || [],
              o = t.substr(0, t.indexOf(a[0])),
              h = ")" === t.charAt(t.length - 1) ? ")" : "",
              c = -1 !== t.indexOf(" ") ? " " : ",",
              l = a.length,
              u = l > 0 ? a[0].replace(f, "") : "";
            return l
              ? (n = e
                  ? function (t) {
                      var e, d, _, p;
                      if ("number" == typeof t) t += u;
                      else if (s && R.test(t)) {
                        for (
                          p = t.replace(R, "|").split("|"), _ = 0;
                          p.length > _;
                          _++
                        )
                          p[_] = n(p[_]);
                        return p.join(",");
                      }
                      if (
                        ((e = (t.match(ht) || [r])[0]),
                        (d = t.split(e).join("").match(g) || []),
                        (_ = d.length),
                        l > _--)
                      )
                        for (; l > ++_; )
                          d[_] = i ? d[0 | ((_ - 1) / 2)] : a[_];
                      return (
                        o +
                        d.join(c) +
                        c +
                        e +
                        h +
                        (-1 !== t.indexOf("inset") ? " inset" : "")
                      );
                    }
                  : function (t) {
                      var e, r, d;
                      if ("number" == typeof t) t += u;
                      else if (s && R.test(t)) {
                        for (
                          r = t.replace(R, "|").split("|"), d = 0;
                          r.length > d;
                          d++
                        )
                          r[d] = n(r[d]);
                        return r.join(",");
                      }
                      if (((e = t.match(g) || []), (d = e.length), l > d--))
                        for (; l > ++d; )
                          e[d] = i ? e[0 | ((d - 1) / 2)] : a[d];
                      return o + e.join(c) + h;
                    })
              : function (t) {
                  return t;
                };
          },
          lt = function (t) {
            return (
              (t = t.split(",")),
              function (e, i, s, n, r, a, o) {
                var h,
                  c = (i + "").split(" ");
                for (o = {}, h = 0; 4 > h; h++)
                  o[t[h]] = c[h] = c[h] || c[((h - 1) / 2) >> 0];
                return n.parse(e, o, r, a);
              }
            );
          },
          ut =
            ((F._setPluginRatio = function (t) {
              this.plugin.setRatio(t);
              for (
                var e,
                  i,
                  s,
                  n,
                  r = this.data,
                  a = r.proxy,
                  o = r.firstMPT,
                  h = 1e-6;
                o;

              )
                (e = a[o.v]),
                  o.r ? (e = Math.round(e)) : h > e && e > -h && (e = 0),
                  (o.t[o.p] = e),
                  (o = o._next);
              if (
                (r.autoRotate && (r.autoRotate.rotation = a.rotation), 1 === t)
              )
                for (o = r.firstMPT; o; ) {
                  if (((i = o.t), i.type)) {
                    if (1 === i.type) {
                      for (n = i.xs0 + i.s + i.xs1, s = 1; i.l > s; s++)
                        n += i["xn" + s] + i["xs" + (s + 1)];
                      i.e = n;
                    }
                  } else i.e = i.s + i.xs0;
                  o = o._next;
                }
            }),
            function (t, e, i, s, n) {
              (this.t = t),
                (this.p = e),
                (this.v = i),
                (this.r = n),
                s && ((s._prev = this), (this._next = s));
            }),
          dt =
            ((F._parseToProxy = function (t, e, i, s, n, r) {
              var a,
                o,
                h,
                c,
                l,
                u = s,
                d = {},
                _ = {},
                p = i._transform,
                f = D;
              for (
                i._transform = null,
                  D = e,
                  s = l = i.parse(t, e, s, n),
                  D = f,
                  r &&
                    ((i._transform = p),
                    u && ((u._prev = null), u._prev && (u._prev._next = null)));
                s && s !== u;

              ) {
                if (
                  1 >= s.type &&
                  ((o = s.p),
                  (_[o] = s.s + s.c),
                  (d[o] = s.s),
                  r || ((c = new ut(s, "s", o, c, s.r)), (s.c = 0)),
                  1 === s.type)
                )
                  for (a = s.l; --a > 0; )
                    (h = "xn" + a),
                      (o = s.p + "_" + h),
                      (_[o] = s.data[h]),
                      (d[o] = s[h]),
                      r || (c = new ut(s, h, o, c, s.rxp[h]));
                s = s._next;
              }
              return { proxy: d, end: _, firstMPT: c, pt: l };
            }),
            (F.CSSPropTween = function (t, e, s, n, a, o, h, c, l, u, d) {
              (this.t = t),
                (this.p = e),
                (this.s = s),
                (this.c = n),
                (this.n = h || e),
                t instanceof dt || r.push(this.n),
                (this.r = c),
                (this.type = o || 0),
                l && ((this.pr = l), (i = !0)),
                (this.b = void 0 === u ? s : u),
                (this.e = void 0 === d ? s + n : d),
                a && ((this._next = a), (a._prev = this));
            })),
          _t = (a.parseComplex = function (t, e, i, s, n, r, a, o, h, l) {
            (i = i || r || ""),
              (a = new dt(t, e, 0, 0, a, l ? 2 : 1, null, !1, o, i, s)),
              (s += "");
            var u,
              d,
              _,
              p,
              g,
              v,
              y,
              b,
              w,
              x,
              S,
              P,
              E = i.split(", ").join(",").split(" "),
              j = s.split(", ").join(",").split(" "),
              A = E.length,
              L = c !== !1;
            for (
              (-1 !== s.indexOf(",") || -1 !== i.indexOf(",")) &&
                ((E = E.join(" ").replace(R, ", ").split(" ")),
                (j = j.join(" ").replace(R, ", ").split(" ")),
                (A = E.length)),
                A !== j.length && ((E = (r || "").split(" ")), (A = E.length)),
                a.plugin = h,
                a.setRatio = l,
                u = 0;
              A > u;
              u++
            )
              if (((p = E[u]), (g = j[u]), (b = parseFloat(p)), b || 0 === b))
                a.appendXtra(
                  "",
                  b,
                  it(g, b),
                  g.replace(m, ""),
                  L && -1 !== g.indexOf("px"),
                  !0
                );
              else if (n && ("#" === p.charAt(0) || rt[p] || T.test(p)))
                (P = "," === g.charAt(g.length - 1) ? ")," : ")"),
                  (p = ot(p)),
                  (g = ot(g)),
                  (w = p.length + g.length > 6),
                  w && !B && 0 === g[3]
                    ? ((a["xs" + a.l] += a.l ? " transparent" : "transparent"),
                      (a.e = a.e.split(j[u]).join("transparent")))
                    : (B || (w = !1),
                      a
                        .appendXtra(
                          w ? "rgba(" : "rgb(",
                          p[0],
                          g[0] - p[0],
                          ",",
                          !0,
                          !0
                        )
                        .appendXtra("", p[1], g[1] - p[1], ",", !0)
                        .appendXtra("", p[2], g[2] - p[2], w ? "," : P, !0),
                      w &&
                        ((p = 4 > p.length ? 1 : p[3]),
                        a.appendXtra(
                          "",
                          p,
                          (4 > g.length ? 1 : g[3]) - p,
                          P,
                          !1
                        )));
              else if ((v = p.match(f))) {
                if (((y = g.match(m)), !y || y.length !== v.length)) return a;
                for (_ = 0, d = 0; v.length > d; d++)
                  (S = v[d]),
                    (x = p.indexOf(S, _)),
                    a.appendXtra(
                      p.substr(_, x - _),
                      Number(S),
                      it(y[d], S),
                      "",
                      L && "px" === p.substr(x + S.length, 2),
                      0 === d
                    ),
                    (_ = x + S.length);
                a["xs" + a.l] += p.substr(_);
              } else a["xs" + a.l] += a.l ? " " + p : p;
            if (-1 !== s.indexOf("=") && a.data) {
              for (P = a.xs0 + a.data.s, u = 1; a.l > u; u++)
                P += a["xs" + u] + a.data["xn" + u];
              a.e = P + a["xs" + u];
            }
            return a.l || ((a.type = -1), (a.xs0 = a.e)), a.xfirst || a;
          }),
          pt = 9;
        for (h = dt.prototype, h.l = h.pr = 0; --pt > 0; )
          (h["xn" + pt] = 0), (h["xs" + pt] = "");
        (h.xs0 = ""),
          (h._next =
            h._prev =
            h.xfirst =
            h.data =
            h.plugin =
            h.setRatio =
            h.rxp =
              null),
          (h.appendXtra = function (t, e, i, s, n, r) {
            var a = this,
              o = a.l;
            return (
              (a["xs" + o] += r && o ? " " + t : t || ""),
              i || 0 === o || a.plugin
                ? (a.l++,
                  (a.type = a.setRatio ? 2 : 1),
                  (a["xs" + a.l] = s || ""),
                  o > 0
                    ? ((a.data["xn" + o] = e + i),
                      (a.rxp["xn" + o] = n),
                      (a["xn" + o] = e),
                      a.plugin ||
                        ((a.xfirst = new dt(
                          a,
                          "xn" + o,
                          e,
                          i,
                          a.xfirst || a,
                          0,
                          a.n,
                          n,
                          a.pr
                        )),
                        (a.xfirst.xs0 = 0)),
                      a)
                    : ((a.data = { s: e + i }),
                      (a.rxp = {}),
                      (a.s = e),
                      (a.c = i),
                      (a.r = n),
                      a))
                : ((a["xs" + o] += e + (s || "")), a)
            );
          });
        var ft = function (t, e) {
            (e = e || {}),
              (this.p = e.prefix ? G(t) || t : t),
              (o[t] = o[this.p] = this),
              (this.format =
                e.formatter ||
                ct(e.defaultValue, e.color, e.collapsible, e.multi)),
              e.parser && (this.parse = e.parser),
              (this.clrs = e.color),
              (this.multi = e.multi),
              (this.keyword = e.keyword),
              (this.dflt = e.defaultValue),
              (this.pr = e.priority || 0);
          },
          mt = (F._registerComplexSpecialProp = function (t, e, i) {
            "object" != typeof e && (e = { parser: i });
            var s,
              n,
              r = t.split(","),
              a = e.defaultValue;
            for (i = i || [a], s = 0; r.length > s; s++)
              (e.prefix = 0 === s && e.prefix),
                (e.defaultValue = i[s] || a),
                (n = new ft(r[s], e));
          }),
          gt = function (t) {
            if (!o[t]) {
              var e = t.charAt(0).toUpperCase() + t.substr(1) + "Plugin";
              mt(t, {
                parser: function (t, i, s, n, r, a, h) {
                  var c = (_gsScope.GreenSockGlobals || _gsScope).com.greensock
                    .plugins[e];
                  return c
                    ? (c._cssRegister(), o[s].parse(t, i, s, n, r, a, h))
                    : (U("Error: " + e + " js file not loaded."), r);
                },
              });
            }
          };
        (h = ft.prototype),
          (h.parseComplex = function (t, e, i, s, n, r) {
            var a,
              o,
              h,
              c,
              l,
              u,
              d = this.keyword;
            if (
              (this.multi &&
                (R.test(i) || R.test(e)
                  ? ((o = e.replace(R, "|").split("|")),
                    (h = i.replace(R, "|").split("|")))
                  : d && ((o = [e]), (h = [i]))),
              h)
            ) {
              for (
                c = h.length > o.length ? h.length : o.length, a = 0;
                c > a;
                a++
              )
                (e = o[a] = o[a] || this.dflt),
                  (i = h[a] = h[a] || this.dflt),
                  d &&
                    ((l = e.indexOf(d)),
                    (u = i.indexOf(d)),
                    l !== u && ((i = -1 === u ? h : o), (i[a] += " " + d)));
              (e = o.join(", ")), (i = h.join(", "));
            }
            return _t(t, this.p, e, i, this.clrs, this.dflt, s, this.pr, n, r);
          }),
          (h.parse = function (t, e, i, s, r, a) {
            return this.parseComplex(
              t.style,
              this.format(V(t, this.p, n, !1, this.dflt)),
              this.format(e),
              r,
              a
            );
          }),
          (a.registerSpecialProp = function (t, e, i) {
            mt(t, {
              parser: function (t, s, n, r, a, o) {
                var h = new dt(t, n, 0, 0, a, 2, n, !1, i);
                return (h.plugin = o), (h.setRatio = e(t, s, r._tween, n)), h;
              },
              priority: i,
            });
          });
        var vt =
            "scaleX,scaleY,scaleZ,x,y,z,skewX,skewY,rotation,rotationX,rotationY,perspective,xPercent,yPercent".split(
              ","
            ),
          yt = G("transform"),
          bt = Y + "transform",
          wt = G("transformOrigin"),
          xt = null !== G("perspective"),
          Tt = (F.Transform = function () {
            this.skewY = 0;
          }),
          St = (F.getTransform = function (t, e, i, s) {
            if (t._gsTransform && i && !s) return t._gsTransform;
            var n,
              r,
              o,
              h,
              c,
              l,
              u,
              d,
              _,
              p,
              f,
              m,
              g,
              v = i ? t._gsTransform || new Tt() : new Tt(),
              y = 0 > v.scaleX,
              b = 2e-5,
              w = 1e5,
              x = 179.99,
              T = x * C,
              S = xt
                ? parseFloat(V(t, wt, e, !1, "0 0 0").split(" ")[2]) ||
                  v.zOrigin ||
                  0
                : 0,
              P = parseFloat(a.defaultTransformPerspective) || 0;
            if (
              (yt
                ? (n = V(t, bt, e, !0))
                : t.currentStyle &&
                  ((n = t.currentStyle.filter.match(L)),
                  (n =
                    n && 4 === n.length
                      ? [
                          n[0].substr(4),
                          Number(n[2].substr(4)),
                          Number(n[1].substr(4)),
                          n[3].substr(4),
                          v.x || 0,
                          v.y || 0,
                        ].join(",")
                      : "")),
              n && "none" !== n && "matrix(1, 0, 0, 1, 0, 0)" !== n)
            ) {
              for (
                r = (n || "").match(/(?:\-|\b)[\d\-\.e]+\b/gi) || [],
                  o = r.length;
                --o > -1;

              )
                (h = Number(r[o])),
                  (r[o] = (c = h - (h |= 0))
                    ? (0 | (c * w + (0 > c ? -0.5 : 0.5))) / w + h
                    : h);
              if (16 === r.length) {
                var E = r[8],
                  j = r[9],
                  A = r[10],
                  M = r[12],
                  R = r[13],
                  D = r[14];
                if (
                  (v.zOrigin &&
                    ((D = -v.zOrigin),
                    (M = E * D - r[12]),
                    (R = j * D - r[13]),
                    (D = A * D + v.zOrigin - r[14])),
                  !i || s || null == v.rotationX)
                ) {
                  var O,
                    k,
                    N,
                    F,
                    X,
                    B,
                    H,
                    U = r[0],
                    Y = r[1],
                    q = r[2],
                    G = r[3],
                    z = r[4],
                    W = r[5],
                    J = r[6],
                    Q = r[7],
                    Z = r[11],
                    K = Math.atan2(J, A),
                    $ = -T > K || K > T;
                  (v.rotationX = K * I),
                    K &&
                      ((F = Math.cos(-K)),
                      (X = Math.sin(-K)),
                      (O = z * F + E * X),
                      (k = W * F + j * X),
                      (N = J * F + A * X),
                      (E = z * -X + E * F),
                      (j = W * -X + j * F),
                      (A = J * -X + A * F),
                      (Z = Q * -X + Z * F),
                      (z = O),
                      (W = k),
                      (J = N)),
                    (K = Math.atan2(E, U)),
                    (v.rotationY = K * I),
                    K &&
                      ((B = -T > K || K > T),
                      (F = Math.cos(-K)),
                      (X = Math.sin(-K)),
                      (O = U * F - E * X),
                      (k = Y * F - j * X),
                      (N = q * F - A * X),
                      (j = Y * X + j * F),
                      (A = q * X + A * F),
                      (Z = G * X + Z * F),
                      (U = O),
                      (Y = k),
                      (q = N)),
                    (K = Math.atan2(Y, W)),
                    (v.rotation = K * I),
                    K &&
                      ((H = -T > K || K > T),
                      (F = Math.cos(-K)),
                      (X = Math.sin(-K)),
                      (U = U * F + z * X),
                      (k = Y * F + W * X),
                      (W = Y * -X + W * F),
                      (J = q * -X + J * F),
                      (Y = k)),
                    H && $
                      ? (v.rotation = v.rotationX = 0)
                      : H && B
                      ? (v.rotation = v.rotationY = 0)
                      : B && $ && (v.rotationY = v.rotationX = 0),
                    (v.scaleX = (0 | (Math.sqrt(U * U + Y * Y) * w + 0.5)) / w),
                    (v.scaleY = (0 | (Math.sqrt(W * W + j * j) * w + 0.5)) / w),
                    (v.scaleZ = (0 | (Math.sqrt(J * J + A * A) * w + 0.5)) / w),
                    (v.skewX = 0),
                    (v.perspective = Z ? 1 / (0 > Z ? -Z : Z) : 0),
                    (v.x = M),
                    (v.y = R),
                    (v.z = D);
                }
              } else if (
                !(
                  (xt &&
                    !s &&
                    r.length &&
                    v.x === r[4] &&
                    v.y === r[5] &&
                    (v.rotationX || v.rotationY)) ||
                  (void 0 !== v.x && "none" === V(t, "display", e))
                )
              ) {
                var tt = r.length >= 6,
                  et = tt ? r[0] : 1,
                  it = r[1] || 0,
                  st = r[2] || 0,
                  nt = tt ? r[3] : 1;
                (v.x = r[4] || 0),
                  (v.y = r[5] || 0),
                  (l = Math.sqrt(et * et + it * it)),
                  (u = Math.sqrt(nt * nt + st * st)),
                  (d = et || it ? Math.atan2(it, et) * I : v.rotation || 0),
                  (_ = st || nt ? Math.atan2(st, nt) * I + d : v.skewX || 0),
                  (p = l - Math.abs(v.scaleX || 0)),
                  (f = u - Math.abs(v.scaleY || 0)),
                  Math.abs(_) > 90 &&
                    270 > Math.abs(_) &&
                    (y
                      ? ((l *= -1),
                        (_ += 0 >= d ? 180 : -180),
                        (d += 0 >= d ? 180 : -180))
                      : ((u *= -1), (_ += 0 >= _ ? 180 : -180))),
                  (m = (d - v.rotation) % 180),
                  (g = (_ - v.skewX) % 180),
                  (void 0 === v.skewX ||
                    p > b ||
                    -b > p ||
                    f > b ||
                    -b > f ||
                    (m > -x && x > m && !1 | (m * w)) ||
                    (g > -x && x > g && !1 | (g * w))) &&
                    ((v.scaleX = l),
                    (v.scaleY = u),
                    (v.rotation = d),
                    (v.skewX = _)),
                  xt &&
                    ((v.rotationX = v.rotationY = v.z = 0),
                    (v.perspective = P),
                    (v.scaleZ = 1));
              }
              v.zOrigin = S;
              for (o in v) b > v[o] && v[o] > -b && (v[o] = 0);
            } else
              v = {
                x: 0,
                y: 0,
                z: 0,
                scaleX: 1,
                scaleY: 1,
                scaleZ: 1,
                skewX: 0,
                perspective: P,
                rotation: 0,
                rotationX: 0,
                rotationY: 0,
                zOrigin: 0,
              };
            return i && (t._gsTransform = v), (v.xPercent = v.yPercent = 0), v;
          }),
          Pt = function (t) {
            var e,
              i,
              s = this.data,
              n = -s.rotation * C,
              r = n + s.skewX * C,
              a = 1e5,
              o = (0 | (Math.cos(n) * s.scaleX * a)) / a,
              h = (0 | (Math.sin(n) * s.scaleX * a)) / a,
              c = (0 | (Math.sin(r) * -s.scaleY * a)) / a,
              l = (0 | (Math.cos(r) * s.scaleY * a)) / a,
              u = this.t.style,
              d = this.t.currentStyle;
            if (d) {
              (i = h), (h = -c), (c = -i), (e = d.filter), (u.filter = "");
              var _,
                f,
                m = this.t.offsetWidth,
                g = this.t.offsetHeight,
                v = "absolute" !== d.position,
                w =
                  "progid:DXImageTransform.Microsoft.Matrix(M11=" +
                  o +
                  ", M12=" +
                  h +
                  ", M21=" +
                  c +
                  ", M22=" +
                  l,
                x = s.x + (m * s.xPercent) / 100,
                T = s.y + (g * s.yPercent) / 100;
              if (
                (null != s.ox &&
                  ((_ = (s.oxp ? 0.01 * m * s.ox : s.ox) - m / 2),
                  (f = (s.oyp ? 0.01 * g * s.oy : s.oy) - g / 2),
                  (x += _ - (_ * o + f * h)),
                  (T += f - (_ * c + f * l))),
                v
                  ? ((_ = m / 2),
                    (f = g / 2),
                    (w +=
                      ", Dx=" +
                      (_ - (_ * o + f * h) + x) +
                      ", Dy=" +
                      (f - (_ * c + f * l) + T) +
                      ")"))
                  : (w += ", sizingMethod='auto expand')"),
                (u.filter =
                  -1 !== e.indexOf("DXImageTransform.Microsoft.Matrix(")
                    ? e.replace(M, w)
                    : w + " " + e),
                (0 === t || 1 === t) &&
                  1 === o &&
                  0 === h &&
                  0 === c &&
                  1 === l &&
                  ((v && -1 === w.indexOf("Dx=0, Dy=0")) ||
                    (b.test(e) && 100 !== parseFloat(RegExp.$1)) ||
                    (-1 === e.indexOf(e.indexOf("Alpha")) &&
                      u.removeAttribute("filter"))),
                !v)
              ) {
                var S,
                  P,
                  E,
                  j = 8 > p ? 1 : -1;
                for (
                  _ = s.ieOffsetX || 0,
                    f = s.ieOffsetY || 0,
                    s.ieOffsetX = Math.round(
                      (m - ((0 > o ? -o : o) * m + (0 > h ? -h : h) * g)) / 2 +
                        x
                    ),
                    s.ieOffsetY = Math.round(
                      (g - ((0 > l ? -l : l) * g + (0 > c ? -c : c) * m)) / 2 +
                        T
                    ),
                    pt = 0;
                  4 > pt;
                  pt++
                )
                  (P = $[pt]),
                    (S = d[P]),
                    (i =
                      -1 !== S.indexOf("px")
                        ? parseFloat(S)
                        : W(this.t, P, parseFloat(S), S.replace(y, "")) || 0),
                    (E =
                      i !== s[P]
                        ? 2 > pt
                          ? -s.ieOffsetX
                          : -s.ieOffsetY
                        : 2 > pt
                        ? _ - s.ieOffsetX
                        : f - s.ieOffsetY),
                    (u[P] =
                      (s[P] = Math.round(
                        i - E * (0 === pt || 2 === pt ? 1 : j)
                      )) + "px");
              }
            }
          },
          Et = (F.set3DTransformRatio = function (t) {
            var e,
              i,
              s,
              n,
              r,
              a,
              o,
              h,
              c,
              l,
              u,
              _,
              p,
              f,
              m,
              g,
              v,
              y,
              b,
              w,
              x,
              T,
              S,
              P = this.data,
              E = this.t.style,
              j = P.rotation * C,
              A = P.scaleX,
              L = P.scaleY,
              M = P.scaleZ,
              R = P.x,
              I = P.y,
              D = P.z,
              O = P.perspective;
            if (
              !(
                (1 !== t && 0 !== t) ||
                "auto" !== P.force3D ||
                P.rotationY ||
                P.rotationX ||
                1 !== M ||
                O ||
                D
              )
            )
              return void jt.call(this, t);
            if (d) {
              var k = 1e-4;
              k > A && A > -k && (A = M = 2e-5),
                k > L && L > -k && (L = M = 2e-5),
                !O || P.z || P.rotationX || P.rotationY || (O = 0);
            }
            if (j || P.skewX)
              (y = Math.cos(j)),
                (b = Math.sin(j)),
                (e = y),
                (r = b),
                P.skewX &&
                  ((j -= P.skewX * C),
                  (y = Math.cos(j)),
                  (b = Math.sin(j)),
                  "simple" === P.skewType &&
                    ((w = Math.tan(P.skewX * C)),
                    (w = Math.sqrt(1 + w * w)),
                    (y *= w),
                    (b *= w))),
                (i = -b),
                (a = y);
            else {
              if (!(P.rotationY || P.rotationX || 1 !== M || O))
                return void (E[yt] =
                  (P.xPercent || P.yPercent
                    ? "translate(" +
                      P.xPercent +
                      "%," +
                      P.yPercent +
                      "%) translate3d("
                    : "translate3d(") +
                  R +
                  "px," +
                  I +
                  "px," +
                  D +
                  "px)" +
                  (1 !== A || 1 !== L ? " scale(" + A + "," + L + ")" : ""));
              (e = a = 1), (i = r = 0);
            }
            (u = 1),
              (s = n = o = h = c = l = _ = p = f = 0),
              (m = O ? -1 / O : 0),
              (g = P.zOrigin),
              (v = 1e5),
              (j = P.rotationY * C),
              j &&
                ((y = Math.cos(j)),
                (b = Math.sin(j)),
                (c = u * -b),
                (p = m * -b),
                (s = e * b),
                (o = r * b),
                (u *= y),
                (m *= y),
                (e *= y),
                (r *= y)),
              (j = P.rotationX * C),
              j &&
                ((y = Math.cos(j)),
                (b = Math.sin(j)),
                (w = i * y + s * b),
                (x = a * y + o * b),
                (T = l * y + u * b),
                (S = f * y + m * b),
                (s = i * -b + s * y),
                (o = a * -b + o * y),
                (u = l * -b + u * y),
                (m = f * -b + m * y),
                (i = w),
                (a = x),
                (l = T),
                (f = S)),
              1 !== M && ((s *= M), (o *= M), (u *= M), (m *= M)),
              1 !== L && ((i *= L), (a *= L), (l *= L), (f *= L)),
              1 !== A && ((e *= A), (r *= A), (c *= A), (p *= A)),
              g && ((_ -= g), (n = s * _), (h = o * _), (_ = u * _ + g)),
              (n = (w = (n += R) - (n |= 0))
                ? (0 | (w * v + (0 > w ? -0.5 : 0.5))) / v + n
                : n),
              (h = (w = (h += I) - (h |= 0))
                ? (0 | (w * v + (0 > w ? -0.5 : 0.5))) / v + h
                : h),
              (_ = (w = (_ += D) - (_ |= 0))
                ? (0 | (w * v + (0 > w ? -0.5 : 0.5))) / v + _
                : _),
              (E[yt] =
                (P.xPercent || P.yPercent
                  ? "translate(" +
                    P.xPercent +
                    "%," +
                    P.yPercent +
                    "%) matrix3d("
                  : "matrix3d(") +
                [
                  (0 | (e * v)) / v,
                  (0 | (r * v)) / v,
                  (0 | (c * v)) / v,
                  (0 | (p * v)) / v,
                  (0 | (i * v)) / v,
                  (0 | (a * v)) / v,
                  (0 | (l * v)) / v,
                  (0 | (f * v)) / v,
                  (0 | (s * v)) / v,
                  (0 | (o * v)) / v,
                  (0 | (u * v)) / v,
                  (0 | (m * v)) / v,
                  n,
                  h,
                  _,
                  O ? 1 + -_ / O : 1,
                ].join(",") +
                ")");
          }),
          jt = (F.set2DTransformRatio = function (t) {
            var e,
              i,
              s,
              n,
              r,
              a = this.data,
              o = this.t,
              h = o.style,
              c = a.x,
              l = a.y;
            return a.rotationX ||
              a.rotationY ||
              a.z ||
              a.force3D === !0 ||
              ("auto" === a.force3D && 1 !== t && 0 !== t)
              ? ((this.setRatio = Et), void Et.call(this, t))
              : void (a.rotation || a.skewX
                  ? ((e = a.rotation * C),
                    (i = e - a.skewX * C),
                    (s = 1e5),
                    (n = a.scaleX * s),
                    (r = a.scaleY * s),
                    (h[yt] =
                      (a.xPercent || a.yPercent
                        ? "translate(" +
                          a.xPercent +
                          "%," +
                          a.yPercent +
                          "%) matrix("
                        : "matrix(") +
                      (0 | (Math.cos(e) * n)) / s +
                      "," +
                      (0 | (Math.sin(e) * n)) / s +
                      "," +
                      (0 | (Math.sin(i) * -r)) / s +
                      "," +
                      (0 | (Math.cos(i) * r)) / s +
                      "," +
                      c +
                      "," +
                      l +
                      ")"))
                  : (h[yt] =
                      (a.xPercent || a.yPercent
                        ? "translate(" +
                          a.xPercent +
                          "%," +
                          a.yPercent +
                          "%) matrix("
                        : "matrix(") +
                      a.scaleX +
                      ",0,0," +
                      a.scaleY +
                      "," +
                      c +
                      "," +
                      l +
                      ")"));
          });
        mt(
          "transform,scale,scaleX,scaleY,scaleZ,x,y,z,rotation,rotationX,rotationY,rotationZ,skewX,skewY,shortRotation,shortRotationX,shortRotationY,shortRotationZ,transformOrigin,transformPerspective,directionalRotation,parseTransform,force3D,skewType,xPercent,yPercent",
          {
            parser: function (t, e, i, s, r, o, h) {
              if (s._transform) return r;
              var c,
                l,
                u,
                d,
                _,
                p,
                f,
                m = (s._transform = St(t, n, !0, h.parseTransform)),
                g = t.style,
                v = 1e-6,
                y = vt.length,
                b = h,
                w = {};
              if ("string" == typeof b.transform && yt)
                (u = k.style),
                  (u[yt] = b.transform),
                  (u.display = "block"),
                  (u.position = "absolute"),
                  O.body.appendChild(k),
                  (c = St(k, null, !1)),
                  O.body.removeChild(k);
              else if ("object" == typeof b) {
                if (
                  ((c = {
                    scaleX: st(null != b.scaleX ? b.scaleX : b.scale, m.scaleX),
                    scaleY: st(null != b.scaleY ? b.scaleY : b.scale, m.scaleY),
                    scaleZ: st(b.scaleZ, m.scaleZ),
                    x: st(b.x, m.x),
                    y: st(b.y, m.y),
                    z: st(b.z, m.z),
                    xPercent: st(b.xPercent, m.xPercent),
                    yPercent: st(b.yPercent, m.yPercent),
                    perspective: st(b.transformPerspective, m.perspective),
                  }),
                  (f = b.directionalRotation),
                  null != f)
                )
                  if ("object" == typeof f) for (u in f) b[u] = f[u];
                  else b.rotation = f;
                "string" == typeof b.x &&
                  -1 !== b.x.indexOf("%") &&
                  ((c.x = 0), (c.xPercent = st(b.x, m.xPercent))),
                  "string" == typeof b.y &&
                    -1 !== b.y.indexOf("%") &&
                    ((c.y = 0), (c.yPercent = st(b.y, m.yPercent))),
                  (c.rotation = nt(
                    "rotation" in b
                      ? b.rotation
                      : "shortRotation" in b
                      ? b.shortRotation + "_short"
                      : "rotationZ" in b
                      ? b.rotationZ
                      : m.rotation,
                    m.rotation,
                    "rotation",
                    w
                  )),
                  xt &&
                    ((c.rotationX = nt(
                      "rotationX" in b
                        ? b.rotationX
                        : "shortRotationX" in b
                        ? b.shortRotationX + "_short"
                        : m.rotationX || 0,
                      m.rotationX,
                      "rotationX",
                      w
                    )),
                    (c.rotationY = nt(
                      "rotationY" in b
                        ? b.rotationY
                        : "shortRotationY" in b
                        ? b.shortRotationY + "_short"
                        : m.rotationY || 0,
                      m.rotationY,
                      "rotationY",
                      w
                    ))),
                  (c.skewX = null == b.skewX ? m.skewX : nt(b.skewX, m.skewX)),
                  (c.skewY = null == b.skewY ? m.skewY : nt(b.skewY, m.skewY)),
                  (l = c.skewY - m.skewY) &&
                    ((c.skewX += l), (c.rotation += l));
              }
              for (
                xt && null != b.force3D && ((m.force3D = b.force3D), (p = !0)),
                  m.skewType = b.skewType || m.skewType || a.defaultSkewType,
                  _ =
                    m.force3D ||
                    m.z ||
                    m.rotationX ||
                    m.rotationY ||
                    c.z ||
                    c.rotationX ||
                    c.rotationY ||
                    c.perspective,
                  _ || null == b.scale || (c.scaleZ = 1);
                --y > -1;

              )
                (i = vt[y]),
                  (d = c[i] - m[i]),
                  (d > v || -v > d || null != D[i]) &&
                    ((p = !0),
                    (r = new dt(m, i, m[i], d, r)),
                    i in w && (r.e = w[i]),
                    (r.xs0 = 0),
                    (r.plugin = o),
                    s._overwriteProps.push(r.n));
              return (
                (d = b.transformOrigin),
                (d || (xt && _ && m.zOrigin)) &&
                  (yt
                    ? ((p = !0),
                      (i = wt),
                      (d = (d || V(t, i, n, !1, "50% 50%")) + ""),
                      (r = new dt(g, i, 0, 0, r, -1, "transformOrigin")),
                      (r.b = g[i]),
                      (r.plugin = o),
                      xt
                        ? ((u = m.zOrigin),
                          (d = d.split(" ")),
                          (m.zOrigin =
                            (d.length > 2 && (0 === u || "0px" !== d[2])
                              ? parseFloat(d[2])
                              : u) || 0),
                          (r.xs0 = r.e = d[0] + " " + (d[1] || "50%") + " 0px"),
                          (r = new dt(m, "zOrigin", 0, 0, r, -1, r.n)),
                          (r.b = u),
                          (r.xs0 = r.e = m.zOrigin))
                        : (r.xs0 = r.e = d))
                    : et(d + "", m)),
                p &&
                  (s._transformType = _ || 3 === this._transformType ? 3 : 2),
                r
              );
            },
            prefix: !0,
          }
        ),
          mt("boxShadow", {
            defaultValue: "0px 0px 0px 0px #999",
            prefix: !0,
            color: !0,
            multi: !0,
            keyword: "inset",
          }),
          mt("borderRadius", {
            defaultValue: "0px",
            parser: function (t, e, i, r, a) {
              e = this.format(e);
              var o,
                h,
                c,
                l,
                u,
                d,
                _,
                p,
                f,
                m,
                g,
                v,
                y,
                b,
                w,
                x,
                T = [
                  "borderTopLeftRadius",
                  "borderTopRightRadius",
                  "borderBottomRightRadius",
                  "borderBottomLeftRadius",
                ],
                S = t.style;
              for (
                f = parseFloat(t.offsetWidth),
                  m = parseFloat(t.offsetHeight),
                  o = e.split(" "),
                  h = 0;
                T.length > h;
                h++
              )
                this.p.indexOf("border") && (T[h] = G(T[h])),
                  (u = l = V(t, T[h], n, !1, "0px")),
                  -1 !== u.indexOf(" ") &&
                    ((l = u.split(" ")), (u = l[0]), (l = l[1])),
                  (d = c = o[h]),
                  (_ = parseFloat(u)),
                  (v = u.substr((_ + "").length)),
                  (y = "=" === d.charAt(1)),
                  y
                    ? ((p = parseInt(d.charAt(0) + "1", 10)),
                      (d = d.substr(2)),
                      (p *= parseFloat(d)),
                      (g = d.substr((p + "").length - (0 > p ? 1 : 0)) || ""))
                    : ((p = parseFloat(d)), (g = d.substr((p + "").length))),
                  "" === g && (g = s[i] || v),
                  g !== v &&
                    ((b = W(t, "borderLeft", _, v)),
                    (w = W(t, "borderTop", _, v)),
                    "%" === g
                      ? ((u = 100 * (b / f) + "%"), (l = 100 * (w / m) + "%"))
                      : "em" === g
                      ? ((x = W(t, "borderLeft", 1, "em")),
                        (u = b / x + "em"),
                        (l = w / x + "em"))
                      : ((u = b + "px"), (l = w + "px")),
                    y &&
                      ((d = parseFloat(u) + p + g),
                      (c = parseFloat(l) + p + g))),
                  (a = _t(S, T[h], u + " " + l, d + " " + c, !1, "0px", a));
              return a;
            },
            prefix: !0,
            formatter: ct("0px 0px 0px 0px", !1, !0),
          }),
          mt("backgroundPosition", {
            defaultValue: "0 0",
            parser: function (t, e, i, s, r, a) {
              var o,
                h,
                c,
                l,
                u,
                d,
                _ = "background-position",
                f = n || z(t, null),
                m = this.format(
                  (f
                    ? p
                      ? f.getPropertyValue(_ + "-x") +
                        " " +
                        f.getPropertyValue(_ + "-y")
                      : f.getPropertyValue(_)
                    : t.currentStyle.backgroundPositionX +
                      " " +
                      t.currentStyle.backgroundPositionY) || "0 0"
                ),
                g = this.format(e);
              if (
                (-1 !== m.indexOf("%")) != (-1 !== g.indexOf("%")) &&
                ((d = V(t, "backgroundImage").replace(E, "")),
                d && "none" !== d)
              ) {
                for (
                  o = m.split(" "),
                    h = g.split(" "),
                    N.setAttribute("src", d),
                    c = 2;
                  --c > -1;

                )
                  (m = o[c]),
                    (l = -1 !== m.indexOf("%")),
                    l !== (-1 !== h[c].indexOf("%")) &&
                      ((u =
                        0 === c
                          ? t.offsetWidth - N.width
                          : t.offsetHeight - N.height),
                      (o[c] = l
                        ? (parseFloat(m) / 100) * u + "px"
                        : 100 * (parseFloat(m) / u) + "%"));
                m = o.join(" ");
              }
              return this.parseComplex(t.style, m, g, r, a);
            },
            formatter: et,
          }),
          mt("backgroundSize", { defaultValue: "0 0", formatter: et }),
          mt("perspective", { defaultValue: "0px", prefix: !0 }),
          mt("perspectiveOrigin", { defaultValue: "50% 50%", prefix: !0 }),
          mt("transformStyle", { prefix: !0 }),
          mt("backfaceVisibility", { prefix: !0 }),
          mt("userSelect", { prefix: !0 }),
          mt("margin", {
            parser: lt("marginTop,marginRight,marginBottom,marginLeft"),
          }),
          mt("padding", {
            parser: lt("paddingTop,paddingRight,paddingBottom,paddingLeft"),
          }),
          mt("clip", {
            defaultValue: "rect(0px,0px,0px,0px)",
            parser: function (t, e, i, s, r, a) {
              var o, h, c;
              return (
                9 > p
                  ? ((h = t.currentStyle),
                    (c = 8 > p ? " " : ","),
                    (o =
                      "rect(" +
                      h.clipTop +
                      c +
                      h.clipRight +
                      c +
                      h.clipBottom +
                      c +
                      h.clipLeft +
                      ")"),
                    (e = this.format(e).split(",").join(c)))
                  : ((o = this.format(V(t, this.p, n, !1, this.dflt))),
                    (e = this.format(e))),
                this.parseComplex(t.style, o, e, r, a)
              );
            },
          }),
          mt("textShadow", {
            defaultValue: "0px 0px 0px #999",
            color: !0,
            multi: !0,
          }),
          mt("autoRound,strictUnits", {
            parser: function (t, e, i, s, n) {
              return n;
            },
          }),
          mt("border", {
            defaultValue: "0px solid #000",
            parser: function (t, e, i, s, r, a) {
              return this.parseComplex(
                t.style,
                this.format(
                  V(t, "borderTopWidth", n, !1, "0px") +
                    " " +
                    V(t, "borderTopStyle", n, !1, "solid") +
                    " " +
                    V(t, "borderTopColor", n, !1, "#000")
                ),
                this.format(e),
                r,
                a
              );
            },
            color: !0,
            formatter: function (t) {
              var e = t.split(" ");
              return (
                e[0] +
                " " +
                (e[1] || "solid") +
                " " +
                (t.match(ht) || ["#000"])[0]
              );
            },
          }),
          mt("borderWidth", {
            parser: lt(
              "borderTopWidth,borderRightWidth,borderBottomWidth,borderLeftWidth"
            ),
          }),
          mt("float,cssFloat,styleFloat", {
            parser: function (t, e, i, s, n) {
              var r = t.style,
                a = "cssFloat" in r ? "cssFloat" : "styleFloat";
              return new dt(r, a, 0, 0, n, -1, i, !1, 0, r[a], e);
            },
          });
        var At = function (t) {
          var e,
            i = this.t,
            s = i.filter || V(this.data, "filter"),
            n = 0 | (this.s + this.c * t);
          100 === n &&
            (-1 === s.indexOf("atrix(") &&
            -1 === s.indexOf("radient(") &&
            -1 === s.indexOf("oader(")
              ? (i.removeAttribute("filter"), (e = !V(this.data, "filter")))
              : ((i.filter = s.replace(x, "")), (e = !0))),
            e ||
              (this.xn1 && (i.filter = s = s || "alpha(opacity=" + n + ")"),
              -1 === s.indexOf("pacity")
                ? (0 === n && this.xn1) ||
                  (i.filter = s + " alpha(opacity=" + n + ")")
                : (i.filter = s.replace(b, "opacity=" + n)));
        };
        mt("opacity,alpha,autoAlpha", {
          defaultValue: "1",
          parser: function (t, e, i, s, r, a) {
            var o = parseFloat(V(t, "opacity", n, !1, "1")),
              h = t.style,
              c = "autoAlpha" === i;
            return (
              "string" == typeof e &&
                "=" === e.charAt(1) &&
                (e =
                  ("-" === e.charAt(0) ? -1 : 1) * parseFloat(e.substr(2)) + o),
              c &&
                1 === o &&
                "hidden" === V(t, "visibility", n) &&
                0 !== e &&
                (o = 0),
              B
                ? (r = new dt(h, "opacity", o, e - o, r))
                : ((r = new dt(h, "opacity", 100 * o, 100 * (e - o), r)),
                  (r.xn1 = c ? 1 : 0),
                  (h.zoom = 1),
                  (r.type = 2),
                  (r.b = "alpha(opacity=" + r.s + ")"),
                  (r.e = "alpha(opacity=" + (r.s + r.c) + ")"),
                  (r.data = t),
                  (r.plugin = a),
                  (r.setRatio = At)),
              c &&
                ((r = new dt(
                  h,
                  "visibility",
                  0,
                  0,
                  r,
                  -1,
                  null,
                  !1,
                  0,
                  0 !== o ? "inherit" : "hidden",
                  0 === e ? "hidden" : "inherit"
                )),
                (r.xs0 = "inherit"),
                s._overwriteProps.push(r.n),
                s._overwriteProps.push(i)),
              r
            );
          },
        });
        var Lt = function (t, e) {
            e &&
              (t.removeProperty
                ? ("ms" === e.substr(0, 2) && (e = "M" + e.substr(1)),
                  t.removeProperty(e.replace(S, "-$1").toLowerCase()))
                : t.removeAttribute(e));
          },
          Mt = function (t) {
            if (((this.t._gsClassPT = this), 1 === t || 0 === t)) {
              this.t.setAttribute("class", 0 === t ? this.b : this.e);
              for (var e = this.data, i = this.t.style; e; )
                e.v ? (i[e.p] = e.v) : Lt(i, e.p), (e = e._next);
              1 === t &&
                this.t._gsClassPT === this &&
                (this.t._gsClassPT = null);
            } else
              this.t.getAttribute("class") !== this.e &&
                this.t.setAttribute("class", this.e);
          };
        mt("className", {
          parser: function (t, e, s, r, a, o, h) {
            var c,
              l,
              u,
              d,
              _,
              p = t.getAttribute("class") || "",
              f = t.style.cssText;
            if (
              ((a = r._classNamePT = new dt(t, s, 0, 0, a, 2)),
              (a.setRatio = Mt),
              (a.pr = -11),
              (i = !0),
              (a.b = p),
              (l = Q(t, n)),
              (u = t._gsClassPT))
            ) {
              for (d = {}, _ = u.data; _; ) (d[_.p] = 1), (_ = _._next);
              u.setRatio(1);
            }
            return (
              (t._gsClassPT = a),
              (a.e =
                "=" !== e.charAt(1)
                  ? e
                  : p.replace(RegExp("\\s*\\b" + e.substr(2) + "\\b"), "") +
                    ("+" === e.charAt(0) ? " " + e.substr(2) : "")),
              r._tween._duration &&
                (t.setAttribute("class", a.e),
                (c = Z(t, l, Q(t), h, d)),
                t.setAttribute("class", p),
                (a.data = c.firstMPT),
                (t.style.cssText = f),
                (a = a.xfirst = r.parse(t, c.difs, a, o))),
              a
            );
          },
        });
        var Rt = function (t) {
          if (
            (1 === t || 0 === t) &&
            this.data._totalTime === this.data._totalDuration &&
            "isFromStart" !== this.data.data
          ) {
            var e,
              i,
              s,
              n,
              r = this.t.style,
              a = o.transform.parse;
            if ("all" === this.e) (r.cssText = ""), (n = !0);
            else
              for (e = this.e.split(","), s = e.length; --s > -1; )
                (i = e[s]),
                  o[i] &&
                    (o[i].parse === a
                      ? (n = !0)
                      : (i = "transformOrigin" === i ? wt : o[i].p)),
                  Lt(r, i);
            n && (Lt(r, yt), this.t._gsTransform && delete this.t._gsTransform);
          }
        };
        for (
          mt("clearProps", {
            parser: function (t, e, s, n, r) {
              return (
                (r = new dt(t, s, 0, 0, r, 2)),
                (r.setRatio = Rt),
                (r.e = e),
                (r.pr = -10),
                (r.data = n._tween),
                (i = !0),
                r
              );
            },
          }),
            h = "bezier,throwProps,physicsProps,physics2D".split(","),
            pt = h.length;
          pt--;

        )
          gt(h[pt]);
        (h = a.prototype),
          (h._firstPT = null),
          (h._onInitTween = function (t, e, o) {
            if (!t.nodeType) return !1;
            (this._target = t),
              (this._tween = o),
              (this._vars = e),
              (c = e.autoRound),
              (i = !1),
              (s = e.suffixMap || a.suffixMap),
              (n = z(t, "")),
              (r = this._overwriteProps);
            var h,
              d,
              p,
              f,
              m,
              g,
              v,
              y,
              b,
              x = t.style;
            if (
              (l &&
                "" === x.zIndex &&
                ((h = V(t, "zIndex", n)),
                ("auto" === h || "" === h) && this._addLazySet(x, "zIndex", 0)),
              "string" == typeof e &&
                ((f = x.cssText),
                (h = Q(t, n)),
                (x.cssText = f + ";" + e),
                (h = Z(t, h, Q(t)).difs),
                !B && w.test(e) && (h.opacity = parseFloat(RegExp.$1)),
                (e = h),
                (x.cssText = f)),
              (this._firstPT = d = this.parse(t, e, null)),
              this._transformType)
            ) {
              for (
                b = 3 === this._transformType,
                  yt
                    ? u &&
                      ((l = !0),
                      "" === x.zIndex &&
                        ((v = V(t, "zIndex", n)),
                        ("auto" === v || "" === v) &&
                          this._addLazySet(x, "zIndex", 0)),
                      _ &&
                        this._addLazySet(
                          x,
                          "WebkitBackfaceVisibility",
                          this._vars.WebkitBackfaceVisibility ||
                            (b ? "visible" : "hidden")
                        ))
                    : (x.zoom = 1),
                  p = d;
                p && p._next;

              )
                p = p._next;
              (y = new dt(t, "transform", 0, 0, null, 2)),
                this._linkCSSP(y, null, p),
                (y.setRatio = b && xt ? Et : yt ? jt : Pt),
                (y.data = this._transform || St(t, n, !0)),
                r.pop();
            }
            if (i) {
              for (; d; ) {
                for (g = d._next, p = f; p && p.pr > d.pr; ) p = p._next;
                (d._prev = p ? p._prev : m) ? (d._prev._next = d) : (f = d),
                  (d._next = p) ? (p._prev = d) : (m = d),
                  (d = g);
              }
              this._firstPT = f;
            }
            return !0;
          }),
          (h.parse = function (t, e, i, r) {
            var a,
              h,
              l,
              u,
              d,
              _,
              p,
              f,
              m,
              g,
              v = t.style;
            for (a in e)
              (_ = e[a]),
                (h = o[a]),
                h
                  ? (i = h.parse(t, _, a, this, i, r, e))
                  : ((d = V(t, a, n) + ""),
                    (m = "string" == typeof _),
                    "color" === a ||
                    "fill" === a ||
                    "stroke" === a ||
                    -1 !== a.indexOf("Color") ||
                    (m && T.test(_))
                      ? (m ||
                          ((_ = ot(_)),
                          (_ =
                            (_.length > 3 ? "rgba(" : "rgb(") +
                            _.join(",") +
                            ")")),
                        (i = _t(v, a, d, _, !0, "transparent", i, 0, r)))
                      : !m || (-1 === _.indexOf(" ") && -1 === _.indexOf(","))
                      ? ((l = parseFloat(d)),
                        (p = l || 0 === l ? d.substr((l + "").length) : ""),
                        ("" === d || "auto" === d) &&
                          ("width" === a || "height" === a
                            ? ((l = tt(t, a, n)), (p = "px"))
                            : "left" === a || "top" === a
                            ? ((l = J(t, a, n)), (p = "px"))
                            : ((l = "opacity" !== a ? 0 : 1), (p = ""))),
                        (g = m && "=" === _.charAt(1)),
                        g
                          ? ((u = parseInt(_.charAt(0) + "1", 10)),
                            (_ = _.substr(2)),
                            (u *= parseFloat(_)),
                            (f = _.replace(y, "")))
                          : ((u = parseFloat(_)),
                            (f = m ? _.substr((u + "").length) || "" : "")),
                        "" === f && (f = a in s ? s[a] : p),
                        (_ = u || 0 === u ? (g ? u + l : u) + f : e[a]),
                        p !== f &&
                          "" !== f &&
                          (u || 0 === u) &&
                          l &&
                          ((l = W(t, a, l, p)),
                          "%" === f
                            ? ((l /= W(t, a, 100, "%") / 100),
                              e.strictUnits !== !0 && (d = l + "%"))
                            : "em" === f
                            ? (l /= W(t, a, 1, "em"))
                            : "px" !== f && ((u = W(t, a, u, f)), (f = "px")),
                          g && (u || 0 === u) && (_ = u + l + f)),
                        g && (u += l),
                        (!l && 0 !== l) || (!u && 0 !== u)
                          ? void 0 !== v[a] &&
                            (_ || ("NaN" != _ + "" && null != _))
                            ? ((i = new dt(
                                v,
                                a,
                                u || l || 0,
                                0,
                                i,
                                -1,
                                a,
                                !1,
                                0,
                                d,
                                _
                              )),
                              (i.xs0 =
                                "none" !== _ ||
                                ("display" !== a && -1 === a.indexOf("Style"))
                                  ? _
                                  : d))
                            : U("invalid " + a + " tween value: " + e[a])
                          : ((i = new dt(
                              v,
                              a,
                              l,
                              u - l,
                              i,
                              0,
                              a,
                              c !== !1 && ("px" === f || "zIndex" === a),
                              0,
                              d,
                              _
                            )),
                            (i.xs0 = f)))
                      : (i = _t(v, a, d, _, !0, null, i, 0, r))),
                r && i && !i.plugin && (i.plugin = r);
            return i;
          }),
          (h.setRatio = function (t) {
            var e,
              i,
              s,
              n = this._firstPT,
              r = 1e-6;
            if (
              1 !== t ||
              (this._tween._time !== this._tween._duration &&
                0 !== this._tween._time)
            )
              if (
                t ||
                (this._tween._time !== this._tween._duration &&
                  0 !== this._tween._time) ||
                this._tween._rawPrevTime === -1e-6
              )
                for (; n; ) {
                  if (
                    ((e = n.c * t + n.s),
                    n.r ? (e = Math.round(e)) : r > e && e > -r && (e = 0),
                    n.type)
                  )
                    if (1 === n.type)
                      if (((s = n.l), 2 === s))
                        n.t[n.p] = n.xs0 + e + n.xs1 + n.xn1 + n.xs2;
                      else if (3 === s)
                        n.t[n.p] =
                          n.xs0 + e + n.xs1 + n.xn1 + n.xs2 + n.xn2 + n.xs3;
                      else if (4 === s)
                        n.t[n.p] =
                          n.xs0 +
                          e +
                          n.xs1 +
                          n.xn1 +
                          n.xs2 +
                          n.xn2 +
                          n.xs3 +
                          n.xn3 +
                          n.xs4;
                      else if (5 === s)
                        n.t[n.p] =
                          n.xs0 +
                          e +
                          n.xs1 +
                          n.xn1 +
                          n.xs2 +
                          n.xn2 +
                          n.xs3 +
                          n.xn3 +
                          n.xs4 +
                          n.xn4 +
                          n.xs5;
                      else {
                        for (i = n.xs0 + e + n.xs1, s = 1; n.l > s; s++)
                          i += n["xn" + s] + n["xs" + (s + 1)];
                        n.t[n.p] = i;
                      }
                    else
                      -1 === n.type
                        ? (n.t[n.p] = n.xs0)
                        : n.setRatio && n.setRatio(t);
                  else n.t[n.p] = e + n.xs0;
                  n = n._next;
                }
              else
                for (; n; )
                  2 !== n.type ? (n.t[n.p] = n.b) : n.setRatio(t),
                    (n = n._next);
            else
              for (; n; )
                2 !== n.type ? (n.t[n.p] = n.e) : n.setRatio(t), (n = n._next);
          }),
          (h._enableTransforms = function (t) {
            (this._transformType = t || 3 === this._transformType ? 3 : 2),
              (this._transform = this._transform || St(this._target, n, !0));
          });
        var Ct = function () {
          (this.t[this.p] = this.e),
            this.data._linkCSSP(this, this._next, null, !0);
        };
        (h._addLazySet = function (t, e, i) {
          var s = (this._firstPT = new dt(t, e, 0, 0, this._firstPT, 2));
          (s.e = i), (s.setRatio = Ct), (s.data = this);
        }),
          (h._linkCSSP = function (t, e, i, s) {
            return (
              t &&
                (e && (e._prev = t),
                t._next && (t._next._prev = t._prev),
                t._prev
                  ? (t._prev._next = t._next)
                  : this._firstPT === t &&
                    ((this._firstPT = t._next), (s = !0)),
                i
                  ? (i._next = t)
                  : s || null !== this._firstPT || (this._firstPT = t),
                (t._next = e),
                (t._prev = i)),
              t
            );
          }),
          (h._kill = function (e) {
            var i,
              s,
              n,
              r = e;
            if (e.autoAlpha || e.alpha) {
              r = {};
              for (s in e) r[s] = e[s];
              (r.opacity = 1), r.autoAlpha && (r.visibility = 1);
            }
            return (
              e.className &&
                (i = this._classNamePT) &&
                ((n = i.xfirst),
                n && n._prev
                  ? this._linkCSSP(n._prev, i._next, n._prev._prev)
                  : n === this._firstPT && (this._firstPT = i._next),
                i._next && this._linkCSSP(i._next, i._next._next, n._prev),
                (this._classNamePT = null)),
              t.prototype._kill.call(this, r)
            );
          });
        var It = function (t, e, i) {
          var s, n, r, a;
          if (t.slice) for (n = t.length; --n > -1; ) It(t[n], e, i);
          else
            for (s = t.childNodes, n = s.length; --n > -1; )
              (r = s[n]),
                (a = r.type),
                r.style && (e.push(Q(r)), i && i.push(r)),
                (1 !== a && 9 !== a && 11 !== a) ||
                  !r.childNodes.length ||
                  It(r, e, i);
        };
        return (
          (a.cascadeTo = function (t, i, s) {
            var n,
              r,
              a,
              o = e.to(t, i, s),
              h = [o],
              c = [],
              l = [],
              u = [],
              d = e._internals.reservedProps;
            for (
              t = o._targets || o.target,
                It(t, c, u),
                o.render(i, !0),
                It(t, l),
                o.render(0, !0),
                o._enabled(!0),
                n = u.length;
              --n > -1;

            )
              if (((r = Z(u[n], c[n], l[n])), r.firstMPT)) {
                r = r.difs;
                for (a in s) d[a] && (r[a] = s[a]);
                h.push(e.to(u[n], i, r));
              }
            return h;
          }),
          t.activate([a]),
          a
        );
      },
      !0
    ),
    (function () {
      var t = _gsScope._gsDefine.plugin({
          propName: "roundProps",
          priority: -1,
          API: 2,
          init: function (t, e, i) {
            return (this._tween = i), !0;
          },
        }),
        e = t.prototype;
      (e._onInitAllProps = function () {
        for (
          var t,
            e,
            i,
            s = this._tween,
            n =
              s.vars.roundProps instanceof Array
                ? s.vars.roundProps
                : s.vars.roundProps.split(","),
            r = n.length,
            a = {},
            o = s._propLookup.roundProps;
          --r > -1;

        )
          a[n[r]] = 1;
        for (r = n.length; --r > -1; )
          for (t = n[r], e = s._firstPT; e; )
            (i = e._next),
              e.pg
                ? e.t._roundProps(a, !0)
                : e.n === t &&
                  (this._add(e.t, t, e.s, e.c),
                  i && (i._prev = e._prev),
                  e._prev
                    ? (e._prev._next = i)
                    : s._firstPT === e && (s._firstPT = i),
                  (e._next = e._prev = null),
                  (s._propLookup[t] = o)),
              (e = i);
        return !1;
      }),
        (e._add = function (t, e, i, s) {
          this._addTween(t, e, i, i + s, e, !0), this._overwriteProps.push(e);
        });
    })(),
    _gsScope._gsDefine.plugin({
      propName: "attr",
      API: 2,
      version: "0.3.3",
      init: function (t, e) {
        var i, s, n;
        if ("function" != typeof t.setAttribute) return !1;
        (this._target = t),
          (this._proxy = {}),
          (this._start = {}),
          (this._end = {});
        for (i in e)
          (this._start[i] = this._proxy[i] = s = t.getAttribute(i)),
            (n = this._addTween(this._proxy, i, parseFloat(s), e[i], i)),
            (this._end[i] = n ? n.s + n.c : e[i]),
            this._overwriteProps.push(i);
        return !0;
      },
      set: function (t) {
        this._super.setRatio.call(this, t);
        for (
          var e,
            i = this._overwriteProps,
            s = i.length,
            n = 1 === t ? this._end : t ? this._proxy : this._start;
          --s > -1;

        )
          (e = i[s]), this._target.setAttribute(e, n[e] + "");
      },
    }),
    (_gsScope._gsDefine.plugin({
      propName: "directionalRotation",
      version: "0.2.1",
      API: 2,
      init: function (t, e) {
        "object" != typeof e && (e = { rotation: e }), (this.finals = {});
        var i,
          s,
          n,
          r,
          a,
          o,
          h = e.useRadians === !0 ? 2 * Math.PI : 360,
          c = 1e-6;
        for (i in e)
          "useRadians" !== i &&
            ((o = (e[i] + "").split("_")),
            (s = o[0]),
            (n = parseFloat(
              "function" != typeof t[i]
                ? t[i]
                : t[
                    i.indexOf("set") ||
                    "function" != typeof t["get" + i.substr(3)]
                      ? i
                      : "get" + i.substr(3)
                  ]()
            )),
            (r = this.finals[i] =
              "string" == typeof s && "=" === s.charAt(1)
                ? n + parseInt(s.charAt(0) + "1", 10) * Number(s.substr(2))
                : Number(s) || 0),
            (a = r - n),
            o.length &&
              ((s = o.join("_")),
              -1 !== s.indexOf("short") &&
                ((a %= h), a !== a % (h / 2) && (a = 0 > a ? a + h : a - h)),
              -1 !== s.indexOf("_cw") && 0 > a
                ? (a = ((a + 9999999999 * h) % h) - (0 | (a / h)) * h)
                : -1 !== s.indexOf("ccw") &&
                  a > 0 &&
                  (a = ((a - 9999999999 * h) % h) - (0 | (a / h)) * h)),
            (a > c || -c > a) &&
              (this._addTween(t, i, n, n + a, i),
              this._overwriteProps.push(i)));
        return !0;
      },
      set: function (t) {
        var e;
        if (1 !== t) this._super.setRatio.call(this, t);
        else
          for (e = this._firstPT; e; )
            e.f ? e.t[e.p](this.finals[e.p]) : (e.t[e.p] = this.finals[e.p]),
              (e = e._next);
      },
    })._autoCSS = !0),
    _gsScope._gsDefine(
      "easing.Back",
      ["easing.Ease"],
      function (t) {
        var e,
          i,
          s,
          n = _gsScope.GreenSockGlobals || _gsScope,
          r = n.com.greensock,
          a = 2 * Math.PI,
          o = Math.PI / 2,
          h = r._class,
          c = function (e, i) {
            var s = h("easing." + e, function () {}, !0),
              n = (s.prototype = new t());
            return (n.constructor = s), (n.getRatio = i), s;
          },
          l = t.register || function () {},
          u = function (t, e, i, s) {
            var n = h(
              "easing." + t,
              { easeOut: new e(), easeIn: new i(), easeInOut: new s() },
              !0
            );
            return l(n, t), n;
          },
          d = function (t, e, i) {
            (this.t = t),
              (this.v = e),
              i &&
                ((this.next = i),
                (i.prev = this),
                (this.c = i.v - e),
                (this.gap = i.t - t));
          },
          _ = function (e, i) {
            var s = h(
                "easing." + e,
                function (t) {
                  (this._p1 = t || 0 === t ? t : 1.70158),
                    (this._p2 = 1.525 * this._p1);
                },
                !0
              ),
              n = (s.prototype = new t());
            return (
              (n.constructor = s),
              (n.getRatio = i),
              (n.config = function (t) {
                return new s(t);
              }),
              s
            );
          },
          p = u(
            "Back",
            _("BackOut", function (t) {
              return (t -= 1) * t * ((this._p1 + 1) * t + this._p1) + 1;
            }),
            _("BackIn", function (t) {
              return t * t * ((this._p1 + 1) * t - this._p1);
            }),
            _("BackInOut", function (t) {
              return 1 > (t *= 2)
                ? 0.5 * t * t * ((this._p2 + 1) * t - this._p2)
                : 0.5 * ((t -= 2) * t * ((this._p2 + 1) * t + this._p2) + 2);
            })
          ),
          f = h(
            "easing.SlowMo",
            function (t, e, i) {
              (e = e || 0 === e ? e : 0.7),
                null == t ? (t = 0.7) : t > 1 && (t = 1),
                (this._p = 1 !== t ? e : 0),
                (this._p1 = (1 - t) / 2),
                (this._p2 = t),
                (this._p3 = this._p1 + this._p2),
                (this._calcEnd = i === !0);
            },
            !0
          ),
          m = (f.prototype = new t());
        return (
          (m.constructor = f),
          (m.getRatio = function (t) {
            var e = t + (0.5 - t) * this._p;
            return this._p1 > t
              ? this._calcEnd
                ? 1 - (t = 1 - t / this._p1) * t
                : e - (t = 1 - t / this._p1) * t * t * t * e
              : t > this._p3
              ? this._calcEnd
                ? 1 - (t = (t - this._p3) / this._p1) * t
                : e + (t - e) * (t = (t - this._p3) / this._p1) * t * t * t
              : this._calcEnd
              ? 1
              : e;
          }),
          (f.ease = new f(0.7, 0.7)),
          (m.config = f.config =
            function (t, e, i) {
              return new f(t, e, i);
            }),
          (e = h(
            "easing.SteppedEase",
            function (t) {
              (t = t || 1), (this._p1 = 1 / t), (this._p2 = t + 1);
            },
            !0
          )),
          (m = e.prototype = new t()),
          (m.constructor = e),
          (m.getRatio = function (t) {
            return (
              0 > t ? (t = 0) : t >= 1 && (t = 0.999999999),
              ((this._p2 * t) >> 0) * this._p1
            );
          }),
          (m.config = e.config =
            function (t) {
              return new e(t);
            }),
          (i = h(
            "easing.RoughEase",
            function (e) {
              e = e || {};
              for (
                var i,
                  s,
                  n,
                  r,
                  a,
                  o,
                  h = e.taper || "none",
                  c = [],
                  l = 0,
                  u = 0 | (e.points || 20),
                  _ = u,
                  p = e.randomize !== !1,
                  f = e.clamp === !0,
                  m = e.template instanceof t ? e.template : null,
                  g = "number" == typeof e.strength ? 0.4 * e.strength : 0.4;
                --_ > -1;

              )
                (i = p ? Math.random() : (1 / u) * _),
                  (s = m ? m.getRatio(i) : i),
                  "none" === h
                    ? (n = g)
                    : "out" === h
                    ? ((r = 1 - i), (n = r * r * g))
                    : "in" === h
                    ? (n = i * i * g)
                    : 0.5 > i
                    ? ((r = 2 * i), (n = 0.5 * r * r * g))
                    : ((r = 2 * (1 - i)), (n = 0.5 * r * r * g)),
                  p
                    ? (s += Math.random() * n - 0.5 * n)
                    : _ % 2
                    ? (s += 0.5 * n)
                    : (s -= 0.5 * n),
                  f && (s > 1 ? (s = 1) : 0 > s && (s = 0)),
                  (c[l++] = { x: i, y: s });
              for (
                c.sort(function (t, e) {
                  return t.x - e.x;
                }),
                  o = new d(1, 1, null),
                  _ = u;
                --_ > -1;

              )
                (a = c[_]), (o = new d(a.x, a.y, o));
              this._prev = new d(0, 0, 0 !== o.t ? o : o.next);
            },
            !0
          )),
          (m = i.prototype = new t()),
          (m.constructor = i),
          (m.getRatio = function (t) {
            var e = this._prev;
            if (t > e.t) {
              for (; e.next && t >= e.t; ) e = e.next;
              e = e.prev;
            } else for (; e.prev && e.t >= t; ) e = e.prev;
            return (this._prev = e), e.v + ((t - e.t) / e.gap) * e.c;
          }),
          (m.config = function (t) {
            return new i(t);
          }),
          (i.ease = new i()),
          u(
            "Bounce",
            c("BounceOut", function (t) {
              return 1 / 2.75 > t
                ? 7.5625 * t * t
                : 2 / 2.75 > t
                ? 7.5625 * (t -= 1.5 / 2.75) * t + 0.75
                : 2.5 / 2.75 > t
                ? 7.5625 * (t -= 2.25 / 2.75) * t + 0.9375
                : 7.5625 * (t -= 2.625 / 2.75) * t + 0.984375;
            }),
            c("BounceIn", function (t) {
              return 1 / 2.75 > (t = 1 - t)
                ? 1 - 7.5625 * t * t
                : 2 / 2.75 > t
                ? 1 - (7.5625 * (t -= 1.5 / 2.75) * t + 0.75)
                : 2.5 / 2.75 > t
                ? 1 - (7.5625 * (t -= 2.25 / 2.75) * t + 0.9375)
                : 1 - (7.5625 * (t -= 2.625 / 2.75) * t + 0.984375);
            }),
            c("BounceInOut", function (t) {
              var e = 0.5 > t;
              return (
                (t = e ? 1 - 2 * t : 2 * t - 1),
                (t =
                  1 / 2.75 > t
                    ? 7.5625 * t * t
                    : 2 / 2.75 > t
                    ? 7.5625 * (t -= 1.5 / 2.75) * t + 0.75
                    : 2.5 / 2.75 > t
                    ? 7.5625 * (t -= 2.25 / 2.75) * t + 0.9375
                    : 7.5625 * (t -= 2.625 / 2.75) * t + 0.984375),
                e ? 0.5 * (1 - t) : 0.5 * t + 0.5
              );
            })
          ),
          u(
            "Circ",
            c("CircOut", function (t) {
              return Math.sqrt(1 - (t -= 1) * t);
            }),
            c("CircIn", function (t) {
              return -(Math.sqrt(1 - t * t) - 1);
            }),
            c("CircInOut", function (t) {
              return 1 > (t *= 2)
                ? -0.5 * (Math.sqrt(1 - t * t) - 1)
                : 0.5 * (Math.sqrt(1 - (t -= 2) * t) + 1);
            })
          ),
          (s = function (e, i, s) {
            var n = h(
                "easing." + e,
                function (t, e) {
                  (this._p1 = t || 1),
                    (this._p2 = e || s),
                    (this._p3 =
                      (this._p2 / a) * (Math.asin(1 / this._p1) || 0));
                },
                !0
              ),
              r = (n.prototype = new t());
            return (
              (r.constructor = n),
              (r.getRatio = i),
              (r.config = function (t, e) {
                return new n(t, e);
              }),
              n
            );
          }),
          u(
            "Elastic",
            s(
              "ElasticOut",
              function (t) {
                return (
                  this._p1 *
                    Math.pow(2, -10 * t) *
                    Math.sin(((t - this._p3) * a) / this._p2) +
                  1
                );
              },
              0.3
            ),
            s(
              "ElasticIn",
              function (t) {
                return -(
                  this._p1 *
                  Math.pow(2, 10 * (t -= 1)) *
                  Math.sin(((t - this._p3) * a) / this._p2)
                );
              },
              0.3
            ),
            s(
              "ElasticInOut",
              function (t) {
                return 1 > (t *= 2)
                  ? -0.5 *
                      this._p1 *
                      Math.pow(2, 10 * (t -= 1)) *
                      Math.sin(((t - this._p3) * a) / this._p2)
                  : 0.5 *
                      this._p1 *
                      Math.pow(2, -10 * (t -= 1)) *
                      Math.sin(((t - this._p3) * a) / this._p2) +
                      1;
              },
              0.45
            )
          ),
          u(
            "Expo",
            c("ExpoOut", function (t) {
              return 1 - Math.pow(2, -10 * t);
            }),
            c("ExpoIn", function (t) {
              return Math.pow(2, 10 * (t - 1)) - 0.001;
            }),
            c("ExpoInOut", function (t) {
              return 1 > (t *= 2)
                ? 0.5 * Math.pow(2, 10 * (t - 1))
                : 0.5 * (2 - Math.pow(2, -10 * (t - 1)));
            })
          ),
          u(
            "Sine",
            c("SineOut", function (t) {
              return Math.sin(t * o);
            }),
            c("SineIn", function (t) {
              return -Math.cos(t * o) + 1;
            }),
            c("SineInOut", function (t) {
              return -0.5 * (Math.cos(Math.PI * t) - 1);
            })
          ),
          h(
            "easing.EaseLookup",
            {
              find: function (e) {
                return t.map[e];
              },
            },
            !0
          ),
          l(n.SlowMo, "SlowMo", "ease,"),
          l(i, "RoughEase", "ease,"),
          l(e, "SteppedEase", "ease,"),
          p
        );
      },
      !0
    );
}),
  _gsScope._gsDefine && _gsScope._gsQueue.pop()(),
  (function (t, e) {
    "use strict";
    var i = (t.GreenSockGlobals = t.GreenSockGlobals || t);
    if (!i.TweenLite) {
      var s,
        n,
        r,
        a,
        o,
        h = function (t) {
          var e,
            s = t.split("."),
            n = i;
          for (e = 0; s.length > e; e++) n[s[e]] = n = n[s[e]] || {};
          return n;
        },
        c = h("com.greensock"),
        l = 1e-10,
        u = function (t) {
          var e,
            i = [],
            s = t.length;
          for (e = 0; e !== s; i.push(t[e++]));
          return i;
        },
        d = function () {},
        _ = (function () {
          var t = Object.prototype.toString,
            e = t.call([]);
          return function (i) {
            return (
              null != i &&
              (i instanceof Array ||
                ("object" == typeof i && !!i.push && t.call(i) === e))
            );
          };
        })(),
        p = {},
        f = function (s, n, r, a) {
          (this.sc = p[s] ? p[s].sc : []),
            (p[s] = this),
            (this.gsClass = null),
            (this.func = r);
          var o = [];
          (this.check = function (c) {
            for (var l, u, d, _, m = n.length, g = m; --m > -1; )
              (l = p[n[m]] || new f(n[m], [])).gsClass
                ? ((o[m] = l.gsClass), g--)
                : c && l.sc.push(this);
            if (0 === g && r)
              for (
                u = ("com.greensock." + s).split("."),
                  d = u.pop(),
                  _ = h(u.join("."))[d] = this.gsClass = r.apply(r, o),
                  a &&
                    ((i[d] = _),
                    "function" == typeof define && define.amd
                      ? define(
                          (t.GreenSockAMDPath ? t.GreenSockAMDPath + "/" : "") +
                            s.split(".").pop(),
                          [],
                          function () {
                            return _;
                          }
                        )
                      : s === e &&
                        "undefined" != typeof module &&
                        module.exports &&
                        (module.exports = _)),
                  m = 0;
                this.sc.length > m;
                m++
              )
                this.sc[m].check();
          }),
            this.check(!0);
        },
        m = (t._gsDefine = function (t, e, i, s) {
          return new f(t, e, i, s);
        }),
        g = (c._class = function (t, e, i) {
          return (
            (e = e || function () {}),
            m(
              t,
              [],
              function () {
                return e;
              },
              i
            ),
            e
          );
        });
      m.globals = i;
      var v = [0, 0, 1, 1],
        y = [],
        b = g(
          "easing.Ease",
          function (t, e, i, s) {
            (this._func = t),
              (this._type = i || 0),
              (this._power = s || 0),
              (this._params = e ? v.concat(e) : v);
          },
          !0
        ),
        w = (b.map = {}),
        x = (b.register = function (t, e, i, s) {
          for (
            var n,
              r,
              a,
              o,
              h = e.split(","),
              l = h.length,
              u = (i || "easeIn,easeOut,easeInOut").split(",");
            --l > -1;

          )
            for (
              r = h[l],
                n = s ? g("easing." + r, null, !0) : c.easing[r] || {},
                a = u.length;
              --a > -1;

            )
              (o = u[a]),
                (w[r + "." + o] =
                  w[o + r] =
                  n[o] =
                    t.getRatio ? t : t[o] || new t());
        });
      for (
        r = b.prototype,
          r._calcEnd = !1,
          r.getRatio = function (t) {
            if (this._func)
              return (
                (this._params[0] = t), this._func.apply(null, this._params)
              );
            var e = this._type,
              i = this._power,
              s = 1 === e ? 1 - t : 2 === e ? t : 0.5 > t ? 2 * t : 2 * (1 - t);
            return (
              1 === i
                ? (s *= s)
                : 2 === i
                ? (s *= s * s)
                : 3 === i
                ? (s *= s * s * s)
                : 4 === i && (s *= s * s * s * s),
              1 === e ? 1 - s : 2 === e ? s : 0.5 > t ? s / 2 : 1 - s / 2
            );
          },
          s = ["Linear", "Quad", "Cubic", "Quart", "Quint,Strong"],
          n = s.length;
        --n > -1;

      )
        (r = s[n] + ",Power" + n),
          x(new b(null, null, 1, n), r, "easeOut", !0),
          x(
            new b(null, null, 2, n),
            r,
            "easeIn" + (0 === n ? ",easeNone" : "")
          ),
          x(new b(null, null, 3, n), r, "easeInOut");
      (w.linear = c.easing.Linear.easeIn), (w.swing = c.easing.Quad.easeInOut);
      var T = g("events.EventDispatcher", function (t) {
        (this._listeners = {}), (this._eventTarget = t || this);
      });
      (r = T.prototype),
        (r.addEventListener = function (t, e, i, s, n) {
          n = n || 0;
          var r,
            h,
            c = this._listeners[t],
            l = 0;
          for (
            null == c && (this._listeners[t] = c = []), h = c.length;
            --h > -1;

          )
            (r = c[h]),
              r.c === e && r.s === i
                ? c.splice(h, 1)
                : 0 === l && n > r.pr && (l = h + 1);
          c.splice(l, 0, { c: e, s: i, up: s, pr: n }),
            this !== a || o || a.wake();
        }),
        (r.removeEventListener = function (t, e) {
          var i,
            s = this._listeners[t];
          if (s)
            for (i = s.length; --i > -1; )
              if (s[i].c === e) return void s.splice(i, 1);
        }),
        (r.dispatchEvent = function (t) {
          var e,
            i,
            s,
            n = this._listeners[t];
          if (n)
            for (e = n.length, i = this._eventTarget; --e > -1; )
              (s = n[e]),
                s.up
                  ? s.c.call(s.s || i, { type: t, target: i })
                  : s.c.call(s.s || i);
        });
      var S = t.requestAnimationFrame,
        P = t.cancelAnimationFrame,
        E =
          Date.now ||
          function () {
            return new Date().getTime();
          },
        j = E();
      for (s = ["ms", "moz", "webkit", "o"], n = s.length; --n > -1 && !S; )
        (S = t[s[n] + "RequestAnimationFrame"]),
          (P =
            t[s[n] + "CancelAnimationFrame"] ||
            t[s[n] + "CancelRequestAnimationFrame"]);
      g("Ticker", function (t, e) {
        var i,
          s,
          n,
          r,
          h,
          c = this,
          u = E(),
          _ = e !== !1 && S,
          p = 500,
          f = 33,
          m = function (t) {
            var e,
              a,
              o = E() - j;
            o > p && (u += o - f),
              (j += o),
              (c.time = (j - u) / 1e3),
              (e = c.time - h),
              (!i || e > 0 || t === !0) &&
                (c.frame++, (h += e + (e >= r ? 0.004 : r - e)), (a = !0)),
              t !== !0 && (n = s(m)),
              a && c.dispatchEvent("tick");
          };
        T.call(c),
          (c.time = c.frame = 0),
          (c.tick = function () {
            m(!0);
          }),
          (c.lagSmoothing = function (t, e) {
            (p = t || 1 / l), (f = Math.min(e, p, 0));
          }),
          (c.sleep = function () {
            null != n &&
              (_ && P ? P(n) : clearTimeout(n),
              (s = d),
              (n = null),
              c === a && (o = !1));
          }),
          (c.wake = function () {
            null !== n ? c.sleep() : c.frame > 10 && (j = E() - p + 5),
              (s =
                0 === i
                  ? d
                  : _ && S
                  ? S
                  : function (t) {
                      return setTimeout(t, 0 | (1e3 * (h - c.time) + 1));
                    }),
              c === a && (o = !0),
              m(2);
          }),
          (c.fps = function (t) {
            return arguments.length
              ? ((i = t),
                (r = 1 / (i || 60)),
                (h = this.time + r),
                void c.wake())
              : i;
          }),
          (c.useRAF = function (t) {
            return arguments.length ? (c.sleep(), (_ = t), void c.fps(i)) : _;
          }),
          c.fps(t),
          setTimeout(function () {
            _ && (!n || 5 > c.frame) && c.useRAF(!1);
          }, 1500);
      }),
        (r = c.Ticker.prototype = new c.events.EventDispatcher()),
        (r.constructor = c.Ticker);
      var A = g("core.Animation", function (t, e) {
        if (
          ((this.vars = e = e || {}),
          (this._duration = this._totalDuration = t || 0),
          (this._delay = Number(e.delay) || 0),
          (this._timeScale = 1),
          (this._active = e.immediateRender === !0),
          (this.data = e.data),
          (this._reversed = e.reversed === !0),
          Y)
        ) {
          o || a.wake();
          var i = this.vars.useFrames ? U : Y;
          i.add(this, i._time), this.vars.paused && this.paused(!0);
        }
      });
      (a = A.ticker = new c.Ticker()),
        (r = A.prototype),
        (r._dirty = r._gc = r._initted = r._paused = !1),
        (r._totalTime = r._time = 0),
        (r._rawPrevTime = -1),
        (r._next = r._last = r._onUpdate = r._timeline = r.timeline = null),
        (r._paused = !1);
      var L = function () {
        o && E() - j > 2e3 && a.wake(), setTimeout(L, 2e3);
      };
      L(),
        (r.play = function (t, e) {
          return null != t && this.seek(t, e), this.reversed(!1).paused(!1);
        }),
        (r.pause = function (t, e) {
          return null != t && this.seek(t, e), this.paused(!0);
        }),
        (r.resume = function (t, e) {
          return null != t && this.seek(t, e), this.paused(!1);
        }),
        (r.seek = function (t, e) {
          return this.totalTime(Number(t), e !== !1);
        }),
        (r.restart = function (t, e) {
          return this.reversed(!1)
            .paused(!1)
            .totalTime(t ? -this._delay : 0, e !== !1, !0);
        }),
        (r.reverse = function (t, e) {
          return (
            null != t && this.seek(t || this.totalDuration(), e),
            this.reversed(!0).paused(!1)
          );
        }),
        (r.render = function () {}),
        (r.invalidate = function () {
          return (
            (this._time = this._totalTime = 0),
            (this._initted = this._gc = !1),
            (this._rawPrevTime = -1),
            (this._gc || !this.timeline) && this._enabled(!0),
            this
          );
        }),
        (r.isActive = function () {
          var t,
            e = this._timeline,
            i = this._startTime;
          return (
            !e ||
            (!this._gc &&
              !this._paused &&
              e.isActive() &&
              (t = e.rawTime()) >= i &&
              i + this.totalDuration() / this._timeScale > t)
          );
        }),
        (r._enabled = function (t, e) {
          return (
            o || a.wake(),
            (this._gc = !t),
            (this._active = this.isActive()),
            e !== !0 &&
              (t && !this.timeline
                ? this._timeline.add(this, this._startTime - this._delay)
                : !t && this.timeline && this._timeline._remove(this, !0)),
            !1
          );
        }),
        (r._kill = function () {
          return this._enabled(!1, !1);
        }),
        (r.kill = function (t, e) {
          return this._kill(t, e), this;
        }),
        (r._uncache = function (t) {
          for (var e = t ? this : this.timeline; e; )
            (e._dirty = !0), (e = e.timeline);
          return this;
        }),
        (r._swapSelfInParams = function (t) {
          for (var e = t.length, i = t.concat(); --e > -1; )
            "{self}" === t[e] && (i[e] = this);
          return i;
        }),
        (r.eventCallback = function (t, e, i, s) {
          if ("on" === (t || "").substr(0, 2)) {
            var n = this.vars;
            if (1 === arguments.length) return n[t];
            null == e
              ? delete n[t]
              : ((n[t] = e),
                (n[t + "Params"] =
                  _(i) && -1 !== i.join("").indexOf("{self}")
                    ? this._swapSelfInParams(i)
                    : i),
                (n[t + "Scope"] = s)),
              "onUpdate" === t && (this._onUpdate = e);
          }
          return this;
        }),
        (r.delay = function (t) {
          return arguments.length
            ? (this._timeline.smoothChildTiming &&
                this.startTime(this._startTime + t - this._delay),
              (this._delay = t),
              this)
            : this._delay;
        }),
        (r.duration = function (t) {
          return arguments.length
            ? ((this._duration = this._totalDuration = t),
              this._uncache(!0),
              this._timeline.smoothChildTiming &&
                this._time > 0 &&
                this._time < this._duration &&
                0 !== t &&
                this.totalTime(this._totalTime * (t / this._duration), !0),
              this)
            : ((this._dirty = !1), this._duration);
        }),
        (r.totalDuration = function (t) {
          return (
            (this._dirty = !1),
            arguments.length ? this.duration(t) : this._totalDuration
          );
        }),
        (r.time = function (t, e) {
          return arguments.length
            ? (this._dirty && this.totalDuration(),
              this.totalTime(t > this._duration ? this._duration : t, e))
            : this._time;
        }),
        (r.totalTime = function (t, e, i) {
          if ((o || a.wake(), !arguments.length)) return this._totalTime;
          if (this._timeline) {
            if (
              (0 > t && !i && (t += this.totalDuration()),
              this._timeline.smoothChildTiming)
            ) {
              this._dirty && this.totalDuration();
              var s = this._totalDuration,
                n = this._timeline;
              if (
                (t > s && !i && (t = s),
                (this._startTime =
                  (this._paused ? this._pauseTime : n._time) -
                  (this._reversed ? s - t : t) / this._timeScale),
                n._dirty || this._uncache(!1),
                n._timeline)
              )
                for (; n._timeline; )
                  n._timeline._time !==
                    (n._startTime + n._totalTime) / n._timeScale &&
                    n.totalTime(n._totalTime, !0),
                    (n = n._timeline);
            }
            this._gc && this._enabled(!0, !1),
              (this._totalTime !== t || 0 === this._duration) &&
                (this.render(t, e, !1), D.length && q());
          }
          return this;
        }),
        (r.progress = r.totalProgress =
          function (t, e) {
            return arguments.length
              ? this.totalTime(this.duration() * t, e)
              : this._time / this.duration();
          }),
        (r.startTime = function (t) {
          return arguments.length
            ? (t !== this._startTime &&
                ((this._startTime = t),
                this.timeline &&
                  this.timeline._sortChildren &&
                  this.timeline.add(this, t - this._delay)),
              this)
            : this._startTime;
        }),
        (r.timeScale = function (t) {
          if (!arguments.length) return this._timeScale;
          if (
            ((t = t || l), this._timeline && this._timeline.smoothChildTiming)
          ) {
            var e = this._pauseTime,
              i = e || 0 === e ? e : this._timeline.totalTime();
            this._startTime = i - ((i - this._startTime) * this._timeScale) / t;
          }
          return (this._timeScale = t), this._uncache(!1);
        }),
        (r.reversed = function (t) {
          return arguments.length
            ? (t != this._reversed &&
                ((this._reversed = t),
                this.totalTime(
                  this._timeline && !this._timeline.smoothChildTiming
                    ? this.totalDuration() - this._totalTime
                    : this._totalTime,
                  !0
                )),
              this)
            : this._reversed;
        }),
        (r.paused = function (t) {
          if (!arguments.length) return this._paused;
          if (t != this._paused && this._timeline) {
            o || t || a.wake();
            var e = this._timeline,
              i = e.rawTime(),
              s = i - this._pauseTime;
            !t &&
              e.smoothChildTiming &&
              ((this._startTime += s), this._uncache(!1)),
              (this._pauseTime = t ? i : null),
              (this._paused = t),
              (this._active = this.isActive()),
              !t &&
                0 !== s &&
                this._initted &&
                this.duration() &&
                this.render(
                  e.smoothChildTiming
                    ? this._totalTime
                    : (i - this._startTime) / this._timeScale,
                  !0,
                  !0
                );
          }
          return this._gc && !t && this._enabled(!0, !1), this;
        });
      var M = g("core.SimpleTimeline", function (t) {
        A.call(this, 0, t),
          (this.autoRemoveChildren = this.smoothChildTiming = !0);
      });
      (r = M.prototype = new A()),
        (r.constructor = M),
        (r.kill()._gc = !1),
        (r._first = r._last = null),
        (r._sortChildren = !1),
        (r.add = r.insert =
          function (t, e) {
            var i, s;
            if (
              ((t._startTime = Number(e || 0) + t._delay),
              t._paused &&
                this !== t._timeline &&
                (t._pauseTime =
                  t._startTime +
                  (this.rawTime() - t._startTime) / t._timeScale),
              t.timeline && t.timeline._remove(t, !0),
              (t.timeline = t._timeline = this),
              t._gc && t._enabled(!0, !0),
              (i = this._last),
              this._sortChildren)
            )
              for (s = t._startTime; i && i._startTime > s; ) i = i._prev;
            return (
              i
                ? ((t._next = i._next), (i._next = t))
                : ((t._next = this._first), (this._first = t)),
              t._next ? (t._next._prev = t) : (this._last = t),
              (t._prev = i),
              this._timeline && this._uncache(!0),
              this
            );
          }),
        (r._remove = function (t, e) {
          return (
            t.timeline === this &&
              (e || t._enabled(!1, !0),
              t._prev
                ? (t._prev._next = t._next)
                : this._first === t && (this._first = t._next),
              t._next
                ? (t._next._prev = t._prev)
                : this._last === t && (this._last = t._prev),
              (t._next = t._prev = t.timeline = null),
              this._timeline && this._uncache(!0)),
            this
          );
        }),
        (r.render = function (t, e, i) {
          var s,
            n = this._first;
          for (this._totalTime = this._time = this._rawPrevTime = t; n; )
            (s = n._next),
              (n._active || (t >= n._startTime && !n._paused)) &&
                (n._reversed
                  ? n.render(
                      (n._dirty ? n.totalDuration() : n._totalDuration) -
                        (t - n._startTime) * n._timeScale,
                      e,
                      i
                    )
                  : n.render((t - n._startTime) * n._timeScale, e, i)),
              (n = s);
        }),
        (r.rawTime = function () {
          return o || a.wake(), this._totalTime;
        });
      var R = g(
          "TweenLite",
          function (e, i, s) {
            if (
              (A.call(this, i, s),
              (this.render = R.prototype.render),
              null == e)
            )
              throw "Cannot tween a null target.";
            this.target = e = "string" != typeof e ? e : R.selector(e) || e;
            var n,
              r,
              a,
              o =
                e.jquery ||
                (e.length &&
                  e !== t &&
                  e[0] &&
                  (e[0] === t || (e[0].nodeType && e[0].style && !e.nodeType))),
              h = this.vars.overwrite;
            if (
              ((this._overwrite = h =
                null == h
                  ? H[R.defaultOverwrite]
                  : "number" == typeof h
                  ? h >> 0
                  : H[h]),
              (o || e instanceof Array || (e.push && _(e))) &&
                "number" != typeof e[0])
            )
              for (
                this._targets = a = u(e),
                  this._propLookup = [],
                  this._siblings = [],
                  n = 0;
                a.length > n;
                n++
              )
                (r = a[n]),
                  r
                    ? "string" != typeof r
                      ? r.length &&
                        r !== t &&
                        r[0] &&
                        (r[0] === t ||
                          (r[0].nodeType && r[0].style && !r.nodeType))
                        ? (a.splice(n--, 1),
                          (this._targets = a = a.concat(u(r))))
                        : ((this._siblings[n] = G(r, this, !1)),
                          1 === h &&
                            this._siblings[n].length > 1 &&
                            z(r, this, null, 1, this._siblings[n]))
                      : ((r = a[n--] = R.selector(r)),
                        "string" == typeof r && a.splice(n + 1, 1))
                    : a.splice(n--, 1);
            else
              (this._propLookup = {}),
                (this._siblings = G(e, this, !1)),
                1 === h &&
                  this._siblings.length > 1 &&
                  z(e, this, null, 1, this._siblings);
            (this.vars.immediateRender ||
              (0 === i &&
                0 === this._delay &&
                this.vars.immediateRender !== !1)) &&
              ((this._time = -l), this.render(-this._delay));
          },
          !0
        ),
        C = function (e) {
          return (
            e.length &&
            e !== t &&
            e[0] &&
            (e[0] === t || (e[0].nodeType && e[0].style && !e.nodeType))
          );
        },
        I = function (t, e) {
          var i,
            s = {};
          for (i in t)
            B[i] ||
              (i in e &&
                "transform" !== i &&
                "x" !== i &&
                "y" !== i &&
                "width" !== i &&
                "height" !== i &&
                "className" !== i &&
                "border" !== i) ||
              !(!N[i] || (N[i] && N[i]._autoCSS)) ||
              ((s[i] = t[i]), delete t[i]);
          t.css = s;
        };
      (r = R.prototype = new A()),
        (r.constructor = R),
        (r.kill()._gc = !1),
        (r.ratio = 0),
        (r._firstPT = r._targets = r._overwrittenProps = r._startAt = null),
        (r._notifyPluginsOfEnabled = r._lazy = !1),
        (R.version = "1.13.2"),
        (R.defaultEase = r._ease = new b(null, null, 1, 1)),
        (R.defaultOverwrite = "auto"),
        (R.ticker = a),
        (R.autoSleep = !0),
        (R.lagSmoothing = function (t, e) {
          a.lagSmoothing(t, e);
        }),
        (R.selector =
          t.$ ||
          t.jQuery ||
          function (e) {
            var i = t.$ || t.jQuery;
            return i
              ? ((R.selector = i), i(e))
              : "undefined" == typeof document
              ? e
              : document.querySelectorAll
              ? document.querySelectorAll(e)
              : document.getElementById("#" === e.charAt(0) ? e.substr(1) : e);
          });
      var D = [],
        O = {},
        k = (R._internals = { isArray: _, isSelector: C, lazyTweens: D }),
        N = (R._plugins = {}),
        F = (k.tweenLookup = {}),
        X = 0,
        B = (k.reservedProps = {
          ease: 1,
          delay: 1,
          overwrite: 1,
          onComplete: 1,
          onCompleteParams: 1,
          onCompleteScope: 1,
          useFrames: 1,
          runBackwards: 1,
          startAt: 1,
          onUpdate: 1,
          onUpdateParams: 1,
          onUpdateScope: 1,
          onStart: 1,
          onStartParams: 1,
          onStartScope: 1,
          onReverseComplete: 1,
          onReverseCompleteParams: 1,
          onReverseCompleteScope: 1,
          onRepeat: 1,
          onRepeatParams: 1,
          onRepeatScope: 1,
          easeParams: 1,
          yoyo: 1,
          immediateRender: 1,
          repeat: 1,
          repeatDelay: 1,
          data: 1,
          paused: 1,
          reversed: 1,
          autoCSS: 1,
          lazy: 1,
        }),
        H = {
          none: 0,
          all: 1,
          auto: 2,
          concurrent: 3,
          allOnStart: 4,
          preexisting: 5,
          true: 1,
          false: 0,
        },
        U = (A._rootFramesTimeline = new M()),
        Y = (A._rootTimeline = new M()),
        q = (k.lazyRender = function () {
          var t = D.length;
          for (O = {}; --t > -1; )
            (s = D[t]),
              s &&
                s._lazy !== !1 &&
                (s.render(s._lazy[0], s._lazy[1], !0), (s._lazy = !1));
          D.length = 0;
        });
      (Y._startTime = a.time),
        (U._startTime = a.frame),
        (Y._active = U._active = !0),
        setTimeout(q, 1),
        (A._updateRoot = R.render =
          function () {
            var t, e, i;
            if (
              (D.length && q(),
              Y.render((a.time - Y._startTime) * Y._timeScale, !1, !1),
              U.render((a.frame - U._startTime) * U._timeScale, !1, !1),
              D.length && q(),
              !(a.frame % 120))
            ) {
              for (i in F) {
                for (e = F[i].tweens, t = e.length; --t > -1; )
                  e[t]._gc && e.splice(t, 1);
                0 === e.length && delete F[i];
              }
              if (
                ((i = Y._first),
                (!i || i._paused) &&
                  R.autoSleep &&
                  !U._first &&
                  1 === a._listeners.tick.length)
              ) {
                for (; i && i._paused; ) i = i._next;
                i || a.sleep();
              }
            }
          }),
        a.addEventListener("tick", A._updateRoot);
      var G = function (t, e, i) {
          var s,
            n,
            r = t._gsTweenID;
          if (
            (F[r || (t._gsTweenID = r = "t" + X++)] ||
              (F[r] = { target: t, tweens: [] }),
            e && ((s = F[r].tweens), (s[(n = s.length)] = e), i))
          )
            for (; --n > -1; ) s[n] === e && s.splice(n, 1);
          return F[r].tweens;
        },
        z = function (t, e, i, s, n) {
          var r, a, o, h;
          if (1 === s || s >= 4) {
            for (h = n.length, r = 0; h > r; r++)
              if ((o = n[r]) !== e) o._gc || (o._enabled(!1, !1) && (a = !0));
              else if (5 === s) break;
            return a;
          }
          var c,
            u = e._startTime + l,
            d = [],
            _ = 0,
            p = 0 === e._duration;
          for (r = n.length; --r > -1; )
            (o = n[r]) === e ||
              o._gc ||
              o._paused ||
              (o._timeline !== e._timeline
                ? ((c = c || V(e, 0, p)), 0 === V(o, c, p) && (d[_++] = o))
                : u >= o._startTime &&
                  o._startTime + o.totalDuration() / o._timeScale > u &&
                  (((p || !o._initted) && 2e-10 >= u - o._startTime) ||
                    (d[_++] = o)));
          for (r = _; --r > -1; )
            (o = d[r]),
              2 === s && o._kill(i, t) && (a = !0),
              (2 !== s || (!o._firstPT && o._initted)) &&
                o._enabled(!1, !1) &&
                (a = !0);
          return a;
        },
        V = function (t, e, i) {
          for (
            var s = t._timeline, n = s._timeScale, r = t._startTime;
            s._timeline;

          ) {
            if (((r += s._startTime), (n *= s._timeScale), s._paused))
              return -100;
            s = s._timeline;
          }
          return (
            (r /= n),
            r > e
              ? r - e
              : (i && r === e) || (!t._initted && 2 * l > r - e)
              ? l
              : (r += t.totalDuration() / t._timeScale / n) > e + l
              ? 0
              : r - e - l
          );
        };
      (r._init = function () {
        var t,
          e,
          i,
          s,
          n,
          r = this.vars,
          a = this._overwrittenProps,
          o = this._duration,
          h = !!r.immediateRender,
          c = r.ease;
        if (r.startAt) {
          this._startAt && (this._startAt.render(-1, !0), this._startAt.kill()),
            (n = {});
          for (s in r.startAt) n[s] = r.startAt[s];
          if (
            ((n.overwrite = !1),
            (n.immediateRender = !0),
            (n.lazy = h && r.lazy !== !1),
            (n.startAt = n.delay = null),
            (this._startAt = R.to(this.target, 0, n)),
            h)
          )
            if (this._time > 0) this._startAt = null;
            else if (0 !== o) return;
        } else if (r.runBackwards && 0 !== o)
          if (this._startAt)
            this._startAt.render(-1, !0),
              this._startAt.kill(),
              (this._startAt = null);
          else {
            0 !== this._time && (h = !1), (i = {});
            for (s in r) (B[s] && "autoCSS" !== s) || (i[s] = r[s]);
            if (
              ((i.overwrite = 0),
              (i.data = "isFromStart"),
              (i.lazy = h && r.lazy !== !1),
              (i.immediateRender = h),
              (this._startAt = R.to(this.target, 0, i)),
              h)
            ) {
              if (0 === this._time) return;
            } else
              this._startAt._init(),
                this._startAt._enabled(!1),
                this.vars.immediateRender && (this._startAt = null);
          }
        if (
          ((this._ease = c =
            c
              ? c instanceof b
                ? c
                : "function" == typeof c
                ? new b(c, r.easeParams)
                : w[c] || R.defaultEase
              : R.defaultEase),
          r.easeParams instanceof Array &&
            c.config &&
            (this._ease = c.config.apply(c, r.easeParams)),
          (this._easeType = this._ease._type),
          (this._easePower = this._ease._power),
          (this._firstPT = null),
          this._targets)
        )
          for (t = this._targets.length; --t > -1; )
            this._initProps(
              this._targets[t],
              (this._propLookup[t] = {}),
              this._siblings[t],
              a ? a[t] : null
            ) && (e = !0);
        else
          e = this._initProps(this.target, this._propLookup, this._siblings, a);
        if (
          (e && R._onPluginEvent("_onInitAllProps", this),
          a &&
            (this._firstPT ||
              ("function" != typeof this.target && this._enabled(!1, !1))),
          r.runBackwards)
        )
          for (i = this._firstPT; i; )
            (i.s += i.c), (i.c = -i.c), (i = i._next);
        (this._onUpdate = r.onUpdate), (this._initted = !0);
      }),
        (r._initProps = function (e, i, s, n) {
          var r, a, o, h, c, l;
          if (null == e) return !1;
          O[e._gsTweenID] && q(),
            this.vars.css ||
              (e.style &&
                e !== t &&
                e.nodeType &&
                N.css &&
                this.vars.autoCSS !== !1 &&
                I(this.vars, e));
          for (r in this.vars) {
            if (((l = this.vars[r]), B[r]))
              l &&
                (l instanceof Array || (l.push && _(l))) &&
                -1 !== l.join("").indexOf("{self}") &&
                (this.vars[r] = l = this._swapSelfInParams(l, this));
            else if (
              N[r] &&
              (h = new N[r]())._onInitTween(e, this.vars[r], this)
            ) {
              for (
                this._firstPT = c =
                  {
                    _next: this._firstPT,
                    t: h,
                    p: "setRatio",
                    s: 0,
                    c: 1,
                    f: !0,
                    n: r,
                    pg: !0,
                    pr: h._priority,
                  },
                  a = h._overwriteProps.length;
                --a > -1;

              )
                i[h._overwriteProps[a]] = this._firstPT;
              (h._priority || h._onInitAllProps) && (o = !0),
                (h._onDisable || h._onEnable) &&
                  (this._notifyPluginsOfEnabled = !0);
            } else
              (this._firstPT =
                i[r] =
                c =
                  {
                    _next: this._firstPT,
                    t: e,
                    p: r,
                    f: "function" == typeof e[r],
                    n: r,
                    pg: !1,
                    pr: 0,
                  }),
                (c.s = c.f
                  ? e[
                      r.indexOf("set") ||
                      "function" != typeof e["get" + r.substr(3)]
                        ? r
                        : "get" + r.substr(3)
                    ]()
                  : parseFloat(e[r])),
                (c.c =
                  "string" == typeof l && "=" === l.charAt(1)
                    ? parseInt(l.charAt(0) + "1", 10) * Number(l.substr(2))
                    : Number(l) - c.s || 0);
            c && c._next && (c._next._prev = c);
          }
          return n && this._kill(n, e)
            ? this._initProps(e, i, s, n)
            : this._overwrite > 1 &&
              this._firstPT &&
              s.length > 1 &&
              z(e, this, i, this._overwrite, s)
            ? (this._kill(i, e), this._initProps(e, i, s, n))
            : (this._firstPT &&
                ((this.vars.lazy !== !1 && this._duration) ||
                  (this.vars.lazy && !this._duration)) &&
                (O[e._gsTweenID] = !0),
              o);
        }),
        (r.render = function (t, e, i) {
          var s,
            n,
            r,
            a,
            o = this._time,
            h = this._duration,
            c = this._rawPrevTime;
          if (t >= h)
            (this._totalTime = this._time = h),
              (this.ratio = this._ease._calcEnd ? this._ease.getRatio(1) : 1),
              this._reversed || ((s = !0), (n = "onComplete")),
              0 === h &&
                (this._initted || !this.vars.lazy || i) &&
                (this._startTime === this._timeline._duration && (t = 0),
                (0 === t || 0 > c || c === l) &&
                  c !== t &&
                  ((i = !0), c > l && (n = "onReverseComplete")),
                (this._rawPrevTime = a = !e || t || c === t ? t : l));
          else if (1e-7 > t)
            (this._totalTime = this._time = 0),
              (this.ratio = this._ease._calcEnd ? this._ease.getRatio(0) : 0),
              (0 !== o || (0 === h && c > 0 && c !== l)) &&
                ((n = "onReverseComplete"), (s = this._reversed)),
              0 > t &&
                ((this._active = !1),
                0 === h &&
                  (this._initted || !this.vars.lazy || i) &&
                  (c >= 0 && (i = !0),
                  (this._rawPrevTime = a = !e || t || c === t ? t : l))),
              this._initted || (i = !0);
          else if (((this._totalTime = this._time = t), this._easeType)) {
            var u = t / h,
              d = this._easeType,
              _ = this._easePower;
            (1 === d || (3 === d && u >= 0.5)) && (u = 1 - u),
              3 === d && (u *= 2),
              1 === _
                ? (u *= u)
                : 2 === _
                ? (u *= u * u)
                : 3 === _
                ? (u *= u * u * u)
                : 4 === _ && (u *= u * u * u * u),
              (this.ratio =
                1 === d
                  ? 1 - u
                  : 2 === d
                  ? u
                  : 0.5 > t / h
                  ? u / 2
                  : 1 - u / 2);
          } else this.ratio = this._ease.getRatio(t / h);
          if (this._time !== o || i) {
            if (!this._initted) {
              if ((this._init(), !this._initted || this._gc)) return;
              if (
                !i &&
                this._firstPT &&
                ((this.vars.lazy !== !1 && this._duration) ||
                  (this.vars.lazy && !this._duration))
              )
                return (
                  (this._time = this._totalTime = o),
                  (this._rawPrevTime = c),
                  D.push(this),
                  void (this._lazy = [t, e])
                );
              this._time && !s
                ? (this.ratio = this._ease.getRatio(this._time / h))
                : s &&
                  this._ease._calcEnd &&
                  (this.ratio = this._ease.getRatio(0 === this._time ? 0 : 1));
            }
            for (
              this._lazy !== !1 && (this._lazy = !1),
                this._active ||
                  (!this._paused &&
                    this._time !== o &&
                    t >= 0 &&
                    (this._active = !0)),
                0 === o &&
                  (this._startAt &&
                    (t >= 0
                      ? this._startAt.render(t, e, i)
                      : n || (n = "_dummyGS")),
                  this.vars.onStart &&
                    (0 !== this._time || 0 === h) &&
                    (e ||
                      this.vars.onStart.apply(
                        this.vars.onStartScope || this,
                        this.vars.onStartParams || y
                      ))),
                r = this._firstPT;
              r;

            )
              r.f
                ? r.t[r.p](r.c * this.ratio + r.s)
                : (r.t[r.p] = r.c * this.ratio + r.s),
                (r = r._next);
            this._onUpdate &&
              (0 > t &&
                this._startAt &&
                this._startTime &&
                this._startAt.render(t, e, i),
              e ||
                ((this._time !== o || s) &&
                  this._onUpdate.apply(
                    this.vars.onUpdateScope || this,
                    this.vars.onUpdateParams || y
                  ))),
              n &&
                (!this._gc || i) &&
                (0 > t &&
                  this._startAt &&
                  !this._onUpdate &&
                  this._startTime &&
                  this._startAt.render(t, e, i),
                s &&
                  (this._timeline.autoRemoveChildren && this._enabled(!1, !1),
                  (this._active = !1)),
                !e &&
                  this.vars[n] &&
                  this.vars[n].apply(
                    this.vars[n + "Scope"] || this,
                    this.vars[n + "Params"] || y
                  ),
                0 === h &&
                  this._rawPrevTime === l &&
                  a !== l &&
                  (this._rawPrevTime = 0));
          }
        }),
        (r._kill = function (t, e) {
          if (
            ("all" === t && (t = null),
            null == t && (null == e || e === this.target))
          )
            return (this._lazy = !1), this._enabled(!1, !1);
          e =
            "string" != typeof e
              ? e || this._targets || this.target
              : R.selector(e) || e;
          var i, s, n, r, a, o, h, c;
          if ((_(e) || C(e)) && "number" != typeof e[0])
            for (i = e.length; --i > -1; ) this._kill(t, e[i]) && (o = !0);
          else {
            if (this._targets) {
              for (i = this._targets.length; --i > -1; )
                if (e === this._targets[i]) {
                  (a = this._propLookup[i] || {}),
                    (this._overwrittenProps = this._overwrittenProps || []),
                    (s = this._overwrittenProps[i] =
                      t ? this._overwrittenProps[i] || {} : "all");
                  break;
                }
            } else {
              if (e !== this.target) return !1;
              (a = this._propLookup),
                (s = this._overwrittenProps =
                  t ? this._overwrittenProps || {} : "all");
            }
            if (a) {
              (h = t || a),
                (c =
                  t !== s &&
                  "all" !== s &&
                  t !== a &&
                  ("object" != typeof t || !t._tempKill));
              for (n in h)
                (r = a[n]) &&
                  (r.pg && r.t._kill(h) && (o = !0),
                  (r.pg && 0 !== r.t._overwriteProps.length) ||
                    (r._prev
                      ? (r._prev._next = r._next)
                      : r === this._firstPT && (this._firstPT = r._next),
                    r._next && (r._next._prev = r._prev),
                    (r._next = r._prev = null)),
                  delete a[n]),
                  c && (s[n] = 1);
              !this._firstPT && this._initted && this._enabled(!1, !1);
            }
          }
          return o;
        }),
        (r.invalidate = function () {
          return (
            this._notifyPluginsOfEnabled &&
              R._onPluginEvent("_onDisable", this),
            (this._firstPT =
              this._overwrittenProps =
              this._startAt =
              this._onUpdate =
                null),
            (this._notifyPluginsOfEnabled = this._active = this._lazy = !1),
            (this._propLookup = this._targets ? {} : []),
            A.prototype.invalidate.call(this),
            this.vars.immediateRender &&
              ((this._time = -l), this.render(-this._delay)),
            this
          );
        }),
        (r._enabled = function (t, e) {
          if ((o || a.wake(), t && this._gc)) {
            var i,
              s = this._targets;
            if (s)
              for (i = s.length; --i > -1; )
                this._siblings[i] = G(s[i], this, !0);
            else this._siblings = G(this.target, this, !0);
          }
          return (
            A.prototype._enabled.call(this, t, e),
            !(!this._notifyPluginsOfEnabled || !this._firstPT) &&
              R._onPluginEvent(t ? "_onEnable" : "_onDisable", this)
          );
        }),
        (R.to = function (t, e, i) {
          return new R(t, e, i);
        }),
        (R.from = function (t, e, i) {
          return (
            (i.runBackwards = !0),
            (i.immediateRender = 0 != i.immediateRender),
            new R(t, e, i)
          );
        }),
        (R.fromTo = function (t, e, i, s) {
          return (
            (s.startAt = i),
            (s.immediateRender =
              0 != s.immediateRender && 0 != i.immediateRender),
            new R(t, e, s)
          );
        }),
        (R.delayedCall = function (t, e, i, s, n) {
          return new R(e, 0, {
            delay: t,
            onComplete: e,
            onCompleteParams: i,
            onCompleteScope: s,
            onReverseComplete: e,
            onReverseCompleteParams: i,
            onReverseCompleteScope: s,
            immediateRender: !1,
            useFrames: n,
            overwrite: 0,
          });
        }),
        (R.set = function (t, e) {
          return new R(t, 0, e);
        }),
        (R.getTweensOf = function (t, e) {
          if (null == t) return [];
          t = "string" != typeof t ? t : R.selector(t) || t;
          var i, s, n, r;
          if ((_(t) || C(t)) && "number" != typeof t[0]) {
            for (i = t.length, s = []; --i > -1; )
              s = s.concat(R.getTweensOf(t[i], e));
            for (i = s.length; --i > -1; )
              for (r = s[i], n = i; --n > -1; ) r === s[n] && s.splice(i, 1);
          } else
            for (s = G(t).concat(), i = s.length; --i > -1; )
              (s[i]._gc || (e && !s[i].isActive())) && s.splice(i, 1);
          return s;
        }),
        (R.killTweensOf = R.killDelayedCallsTo =
          function (t, e, i) {
            "object" == typeof e && ((i = e), (e = !1));
            for (var s = R.getTweensOf(t, e), n = s.length; --n > -1; )
              s[n]._kill(i, t);
          });
      var W = g(
        "plugins.TweenPlugin",
        function (t, e) {
          (this._overwriteProps = (t || "").split(",")),
            (this._propName = this._overwriteProps[0]),
            (this._priority = e || 0),
            (this._super = W.prototype);
        },
        !0
      );
      if (
        ((r = W.prototype),
        (W.version = "1.10.1"),
        (W.API = 2),
        (r._firstPT = null),
        (r._addTween = function (t, e, i, s, n, r) {
          var a, o;
          return null != s &&
            (a =
              "number" == typeof s || "=" !== s.charAt(1)
                ? Number(s) - i
                : parseInt(s.charAt(0) + "1", 10) * Number(s.substr(2)))
            ? ((this._firstPT = o =
                {
                  _next: this._firstPT,
                  t: t,
                  p: e,
                  s: i,
                  c: a,
                  f: "function" == typeof t[e],
                  n: n || e,
                  r: r,
                }),
              o._next && (o._next._prev = o),
              o)
            : void 0;
        }),
        (r.setRatio = function (t) {
          for (var e, i = this._firstPT, s = 1e-6; i; )
            (e = i.c * t + i.s),
              i.r ? (e = Math.round(e)) : s > e && e > -s && (e = 0),
              i.f ? i.t[i.p](e) : (i.t[i.p] = e),
              (i = i._next);
        }),
        (r._kill = function (t) {
          var e,
            i = this._overwriteProps,
            s = this._firstPT;
          if (null != t[this._propName]) this._overwriteProps = [];
          else for (e = i.length; --e > -1; ) null != t[i[e]] && i.splice(e, 1);
          for (; s; )
            null != t[s.n] &&
              (s._next && (s._next._prev = s._prev),
              s._prev
                ? ((s._prev._next = s._next), (s._prev = null))
                : this._firstPT === s && (this._firstPT = s._next)),
              (s = s._next);
          return !1;
        }),
        (r._roundProps = function (t, e) {
          for (var i = this._firstPT; i; )
            (t[this._propName] ||
              (null != i.n && t[i.n.split(this._propName + "_").join("")])) &&
              (i.r = e),
              (i = i._next);
        }),
        (R._onPluginEvent = function (t, e) {
          var i,
            s,
            n,
            r,
            a,
            o = e._firstPT;
          if ("_onInitAllProps" === t) {
            for (; o; ) {
              for (a = o._next, s = n; s && s.pr > o.pr; ) s = s._next;
              (o._prev = s ? s._prev : r) ? (o._prev._next = o) : (n = o),
                (o._next = s) ? (s._prev = o) : (r = o),
                (o = a);
            }
            o = e._firstPT = n;
          }
          for (; o; )
            o.pg && "function" == typeof o.t[t] && o.t[t]() && (i = !0),
              (o = o._next);
          return i;
        }),
        (W.activate = function (t) {
          for (var e = t.length; --e > -1; )
            t[e].API === W.API && (N[new t[e]()._propName] = t[e]);
          return !0;
        }),
        (m.plugin = function (t) {
          if (!(t && t.propName && t.init && t.API))
            throw "illegal plugin definition.";
          var e,
            i = t.propName,
            s = t.priority || 0,
            n = t.overwriteProps,
            r = {
              init: "_onInitTween",
              set: "setRatio",
              kill: "_kill",
              round: "_roundProps",
              initAll: "_onInitAllProps",
            },
            a = g(
              "plugins." + i.charAt(0).toUpperCase() + i.substr(1) + "Plugin",
              function () {
                W.call(this, i, s), (this._overwriteProps = n || []);
              },
              t.global === !0
            ),
            o = (a.prototype = new W(i));
          (o.constructor = a), (a.API = t.API);
          for (e in r) "function" == typeof t[e] && (o[r[e]] = t[e]);
          return (a.version = t.version), W.activate([a]), a;
        }),
        (s = t._gsQueue))
      ) {
        for (n = 0; s.length > n; n++) s[n]();
        for (r in p)
          p[r].func ||
            t.console.log(
              "GSAP encountered missing dependency: com.greensock." + r
            );
      }
      o = !1;
    }
  })(
    "undefined" != typeof module &&
      module.exports &&
      "undefined" != typeof global
      ? global
      : this || window,
    "TweenMax"
  ),
  (function (t, e) {
    if ("object" == typeof exports) {
      var i = e();
      "object" == typeof module &&
        module &&
        module.exports &&
        (exports = module.exports = i),
        (exports.randomColor = i);
    } else
      "function" == typeof define && define.amd
        ? define([], e)
        : (t.randomColor = e());
  })(this, function () {
    function t(t) {
      var e = r(t.hue),
        i = h(e);
      return i < 0 && (i = 360 + i), i;
    }
    function e(t, e) {
      if ("monochrome" === e.hue) return 0;
      if ("random" === e.luminosity) return h([0, 100]);
      var i = a(t),
        s = i[0],
        n = i[1];
      switch (e.luminosity) {
        case "bright":
          s = 55;
          break;
        case "dark":
          s = n - 10;
          break;
        case "light":
          n = 55;
      }
      return h([s, n]);
    }
    function i(t, e, i) {
      var s = n(t, e),
        r = 100;
      switch (i.luminosity) {
        case "dark":
          r = s + 20;
          break;
        case "light":
          s = (r + s) / 2;
          break;
        case "random":
          (s = 0), (r = 100);
      }
      return h([s, r]);
    }
    function s(t, e) {
      switch (e.format) {
        case "hsvArray":
          return t;
        case "hslArray":
          return p(t);
        case "hsl":
          var i = p(t);
          return "hsl(" + i[0] + ", " + i[1] + "%, " + i[2] + "%)";
        case "hsla":
          var s = p(t),
            n = e.alpha || Math.random();
          return "hsla(" + s[0] + ", " + s[1] + "%, " + s[2] + "%, " + n + ")";
        case "rgbArray":
          return d(t);
        case "rgb":
          var r = d(t);
          return "rgb(" + r.join(", ") + ")";
        case "rgba":
          var a = d(t),
            n = e.alpha || Math.random();
          return "rgba(" + a.join(", ") + ", " + n + ")";
        default:
          return c(t);
      }
    }
    function n(t, e) {
      for (var i = o(t).lowerBounds, s = 0; s < i.length - 1; s++) {
        var n = i[s][0],
          r = i[s][1],
          a = i[s + 1][0],
          h = i[s + 1][1];
        if (e >= n && e <= a) {
          var c = (h - r) / (a - n),
            l = r - c * n;
          return c * e + l;
        }
      }
      return 0;
    }
    function r(t) {
      if ("number" == typeof parseInt(t)) {
        var e = parseInt(t);
        if (e < 360 && e > 0) return [e, e];
      }
      if ("string" == typeof t)
        if (g[t]) {
          var i = g[t];
          if (i.hueRange) return i.hueRange;
        } else if (t.match(/^#?([0-9A-F]{3}|[0-9A-F]{6})$/i)) {
          var s = _(t)[0];
          return [s, s];
        }
      return [0, 360];
    }
    function a(t) {
      return o(t).saturationRange;
    }
    function o(t) {
      t >= 334 && t <= 360 && (t -= 360);
      for (var e in g) {
        var i = g[e];
        if (i.hueRange && t >= i.hueRange[0] && t <= i.hueRange[1]) return g[e];
      }
      return "Color not found";
    }
    function h(t) {
      if (null === m)
        return Math.floor(t[0] + Math.random() * (t[1] + 1 - t[0]));
      var e = t[1] || 1,
        i = t[0] || 0;
      m = (9301 * m + 49297) % 233280;
      var s = m / 233280;
      return Math.floor(i + s * (e - i));
    }
    function c(t) {
      function e(t) {
        var e = t.toString(16);
        return 1 == e.length ? "0" + e : e;
      }
      var i = d(t),
        s = "#" + e(i[0]) + e(i[1]) + e(i[2]);
      return s;
    }
    function l(t, e, i) {
      var s = i[0][0],
        n = i[i.length - 1][0],
        r = i[i.length - 1][1],
        a = i[0][1];
      g[t] = {
        hueRange: e,
        lowerBounds: i,
        saturationRange: [s, n],
        brightnessRange: [r, a],
      };
    }
    function u() {
      l("monochrome", null, [
        [0, 0],
        [100, 0],
      ]),
        l(
          "red",
          [-26, 18],
          [
            [20, 100],
            [30, 92],
            [40, 89],
            [50, 85],
            [60, 78],
            [70, 70],
            [80, 60],
            [90, 55],
            [100, 50],
          ]
        ),
        l(
          "orange",
          [19, 46],
          [
            [20, 100],
            [30, 93],
            [40, 88],
            [50, 86],
            [60, 85],
            [70, 70],
            [100, 70],
          ]
        ),
        l(
          "yellow",
          [47, 62],
          [
            [25, 100],
            [40, 94],
            [50, 89],
            [60, 86],
            [70, 84],
            [80, 82],
            [90, 80],
            [100, 75],
          ]
        ),
        l(
          "green",
          [63, 178],
          [
            [30, 100],
            [40, 90],
            [50, 85],
            [60, 81],
            [70, 74],
            [80, 64],
            [90, 50],
            [100, 40],
          ]
        ),
        l(
          "blue",
          [179, 257],
          [
            [20, 100],
            [30, 86],
            [40, 80],
            [50, 74],
            [60, 60],
            [70, 52],
            [80, 44],
            [90, 39],
            [100, 35],
          ]
        ),
        l(
          "purple",
          [258, 282],
          [
            [20, 100],
            [30, 87],
            [40, 79],
            [50, 70],
            [60, 65],
            [70, 59],
            [80, 52],
            [90, 45],
            [100, 42],
          ]
        ),
        l(
          "pink",
          [283, 334],
          [
            [20, 100],
            [30, 90],
            [40, 86],
            [60, 84],
            [80, 80],
            [90, 75],
            [100, 73],
          ]
        );
    }
    function d(t) {
      var e = t[0];
      0 === e && (e = 1), 360 === e && (e = 359), (e /= 360);
      var i = t[1] / 100,
        s = t[2] / 100,
        n = Math.floor(6 * e),
        r = 6 * e - n,
        a = s * (1 - i),
        o = s * (1 - r * i),
        h = s * (1 - (1 - r) * i),
        c = 256,
        l = 256,
        u = 256;
      switch (n) {
        case 0:
          (c = s), (l = h), (u = a);
          break;
        case 1:
          (c = o), (l = s), (u = a);
          break;
        case 2:
          (c = a), (l = s), (u = h);
          break;
        case 3:
          (c = a), (l = o), (u = s);
          break;
        case 4:
          (c = h), (l = a), (u = s);
          break;
        case 5:
          (c = s), (l = a), (u = o);
      }
      var d = [Math.floor(255 * c), Math.floor(255 * l), Math.floor(255 * u)];
      return d;
    }
    function _(t) {
      (t = t.replace(/^#/, "")),
        (t = 3 === t.length ? t.replace(/(.)/g, "$1$1") : t);
      var e = parseInt(t.substr(0, 2), 16) / 255,
        i = parseInt(t.substr(2, 2), 16) / 255,
        s = parseInt(t.substr(4, 2), 16) / 255,
        n = Math.max(e, i, s),
        r = n - Math.min(e, i, s),
        a = n ? r / n : 0;
      switch (n) {
        case e:
          return [60 * (((i - s) / r) % 6) || 0, a, n];
        case i:
          return [60 * ((s - e) / r + 2) || 0, a, n];
        case s:
          return [60 * ((e - i) / r + 4) || 0, a, n];
      }
    }
    function p(t) {
      var e = t[0],
        i = t[1] / 100,
        s = t[2] / 100,
        n = (2 - i) * s;
      return [
        e,
        Math.round(((i * s) / (n < 1 ? n : 2 - n)) * 1e4) / 100,
        (n / 2) * 100,
      ];
    }
    function f(t) {
      for (
        var e = 0, i = 0;
        i !== t.length && !(e >= Number.MAX_SAFE_INTEGER);
        i++
      )
        e += t.charCodeAt(i);
      return e;
    }
    var m = null,
      g = {};
    u();
    var v = function (n) {
      if (
        ((n = n || {}),
        void 0 !== n.seed && null !== n.seed && n.seed === parseInt(n.seed, 10))
      )
        m = n.seed;
      else if ("string" == typeof n.seed) m = f(n.seed);
      else {
        if (void 0 !== n.seed && null !== n.seed)
          throw new TypeError("The seed value must be an integer or string");
        m = null;
      }
      var r, a, o;
      if (null !== n.count && void 0 !== n.count) {
        var h = n.count,
          c = [];
        for (n.count = null; h > c.length; )
          m && n.seed && (n.seed += 1), c.push(v(n));
        return (n.count = h), c;
      }
      return (r = t(n)), (a = e(r, n)), (o = i(r, a, n)), s([r, a, o], n);
    };
    return v;
  }),
  (this.createjs = this.createjs || {}),
  (createjs.extend = function (t, e) {
    "use strict";
    function i() {
      this.constructor = t;
    }
    return (i.prototype = e.prototype), (t.prototype = new i());
  }),
  (this.createjs = this.createjs || {}),
  (createjs.promote = function (t, e) {
    "use strict";
    var i = t.prototype,
      s = (Object.getPrototypeOf && Object.getPrototypeOf(i)) || i.__proto__;
    if (s) {
      i[(e += "_") + "constructor"] = s.constructor;
      for (var n in s)
        i.hasOwnProperty(n) && "function" == typeof s[n] && (i[e + n] = s[n]);
    }
    return t;
  }),
  (this.createjs = this.createjs || {}),
  (createjs.indexOf = function (t, e) {
    "use strict";
    for (var i = 0, s = t.length; s > i; i++) if (e === t[i]) return i;
    return -1;
  }),
  (this.createjs = this.createjs || {}),
  (function () {
    "use strict";
    function t(t, e, i) {
      (this.type = t),
        (this.target = null),
        (this.currentTarget = null),
        (this.eventPhase = 0),
        (this.bubbles = !!e),
        (this.cancelable = !!i),
        (this.timeStamp = new Date().getTime()),
        (this.defaultPrevented = !1),
        (this.propagationStopped = !1),
        (this.immediatePropagationStopped = !1),
        (this.removed = !1);
    }
    var e = t.prototype;
    (e.preventDefault = function () {
      this.defaultPrevented = this.cancelable && !0;
    }),
      (e.stopPropagation = function () {
        this.propagationStopped = !0;
      }),
      (e.stopImmediatePropagation = function () {
        this.immediatePropagationStopped = this.propagationStopped = !0;
      }),
      (e.remove = function () {
        this.removed = !0;
      }),
      (e.clone = function () {
        return new t(this.type, this.bubbles, this.cancelable);
      }),
      (e.set = function (t) {
        for (var e in t) this[e] = t[e];
        return this;
      }),
      (e.toString = function () {
        return "[Event (type=" + this.type + ")]";
      }),
      (createjs.Event = t);
  })(),
  (this.createjs = this.createjs || {}),
  (function () {
    "use strict";
    function t() {
      (this._listeners = null), (this._captureListeners = null);
    }
    var e = t.prototype;
    (t.initialize = function (t) {
      (t.addEventListener = e.addEventListener),
        (t.on = e.on),
        (t.removeEventListener = t.off = e.removeEventListener),
        (t.removeAllEventListeners = e.removeAllEventListeners),
        (t.hasEventListener = e.hasEventListener),
        (t.dispatchEvent = e.dispatchEvent),
        (t._dispatchEvent = e._dispatchEvent),
        (t.willTrigger = e.willTrigger);
    }),
      (e.addEventListener = function (t, e, i) {
        var s;
        s = i
          ? (this._captureListeners = this._captureListeners || {})
          : (this._listeners = this._listeners || {});
        var n = s[t];
        return (
          n && this.removeEventListener(t, e, i),
          (n = s[t]),
          n ? n.push(e) : (s[t] = [e]),
          e
        );
      }),
      (e.on = function (t, e, i, s, n, r) {
        return (
          e.handleEvent && ((i = i || e), (e = e.handleEvent)),
          (i = i || this),
          this.addEventListener(
            t,
            function (t) {
              e.call(i, t, n), s && t.remove();
            },
            r
          )
        );
      }),
      (e.removeEventListener = function (t, e, i) {
        var s = i ? this._captureListeners : this._listeners;
        if (s) {
          var n = s[t];
          if (n)
            for (var r = 0, a = n.length; a > r; r++)
              if (n[r] == e) {
                1 == a ? delete s[t] : n.splice(r, 1);
                break;
              }
        }
      }),
      (e.off = e.removeEventListener),
      (e.removeAllEventListeners = function (t) {
        t
          ? (this._listeners && delete this._listeners[t],
            this._captureListeners && delete this._captureListeners[t])
          : (this._listeners = this._captureListeners = null);
      }),
      (e.dispatchEvent = function (t, e, i) {
        if ("string" == typeof t) {
          var s = this._listeners;
          if (!(e || (s && s[t]))) return !0;
          t = new createjs.Event(t, e, i);
        } else t.target && t.clone && (t = t.clone());
        try {
          t.target = this;
        } catch (n) {}
        if (t.bubbles && this.parent) {
          for (var r = this, a = [r]; r.parent; ) a.push((r = r.parent));
          var o,
            h = a.length;
          for (o = h - 1; o >= 0 && !t.propagationStopped; o--)
            a[o]._dispatchEvent(t, 1 + (0 == o));
          for (o = 1; h > o && !t.propagationStopped; o++)
            a[o]._dispatchEvent(t, 3);
        } else this._dispatchEvent(t, 2);
        return !t.defaultPrevented;
      }),
      (e.hasEventListener = function (t) {
        var e = this._listeners,
          i = this._captureListeners;
        return !!((e && e[t]) || (i && i[t]));
      }),
      (e.willTrigger = function (t) {
        for (var e = this; e; ) {
          if (e.hasEventListener(t)) return !0;
          e = e.parent;
        }
        return !1;
      }),
      (e.toString = function () {
        return "[EventDispatcher]";
      }),
      (e._dispatchEvent = function (t, e) {
        var i,
          s = 1 == e ? this._captureListeners : this._listeners;
        if (t && s) {
          var n = s[t.type];
          if (!n || !(i = n.length)) return;
          try {
            t.currentTarget = this;
          } catch (r) {}
          try {
            t.eventPhase = e;
          } catch (r) {}
          (t.removed = !1), (n = n.slice());
          for (var a = 0; i > a && !t.immediatePropagationStopped; a++) {
            var o = n[a];
            o.handleEvent ? o.handleEvent(t) : o(t),
              t.removed && (this.off(t.type, o, 1 == e), (t.removed = !1));
          }
        }
      }),
      (createjs.EventDispatcher = t);
  })(),
  (this.createjs = this.createjs || {}),
  (function () {
    "use strict";
    function t() {
      throw "Ticker cannot be instantiated.";
    }
    (t.RAF_SYNCHED = "synched"),
      (t.RAF = "raf"),
      (t.TIMEOUT = "timeout"),
      (t.useRAF = !1),
      (t.timingMode = null),
      (t.maxDelta = 0),
      (t.paused = !1),
      (t.removeEventListener = null),
      (t.removeAllEventListeners = null),
      (t.dispatchEvent = null),
      (t.hasEventListener = null),
      (t._listeners = null),
      createjs.EventDispatcher.initialize(t),
      (t._addEventListener = t.addEventListener),
      (t.addEventListener = function () {
        return !t._inited && t.init(), t._addEventListener.apply(t, arguments);
      }),
      (t._inited = !1),
      (t._startTime = 0),
      (t._pausedTime = 0),
      (t._ticks = 0),
      (t._pausedTicks = 0),
      (t._interval = 50),
      (t._lastTime = 0),
      (t._times = null),
      (t._tickTimes = null),
      (t._timerId = null),
      (t._raf = !0),
      (t.setInterval = function (e) {
        (t._interval = e), t._inited && t._setupTick();
      }),
      (t.getInterval = function () {
        return t._interval;
      }),
      (t.setFPS = function (e) {
        t.setInterval(1e3 / e);
      }),
      (t.getFPS = function () {
        return 1e3 / t._interval;
      });
    try {
      Object.defineProperties(t, {
        interval: { get: t.getInterval, set: t.setInterval },
        framerate: { get: t.getFPS, set: t.setFPS },
      });
    } catch (e) {
      console.log(e);
    }
    (t.init = function () {
      t._inited ||
        ((t._inited = !0),
        (t._times = []),
        (t._tickTimes = []),
        (t._startTime = t._getTime()),
        t._times.push((t._lastTime = 0)),
        (t.interval = t._interval));
    }),
      (t.reset = function () {
        if (t._raf) {
          var e =
            window.cancelAnimationFrame ||
            window.webkitCancelAnimationFrame ||
            window.mozCancelAnimationFrame ||
            window.oCancelAnimationFrame ||
            window.msCancelAnimationFrame;
          e && e(t._timerId);
        } else clearTimeout(t._timerId);
        t.removeAllEventListeners("tick"),
          (t._timerId = t._times = t._tickTimes = null),
          (t._startTime = t._lastTime = t._ticks = 0),
          (t._inited = !1);
      }),
      (t.getMeasuredTickTime = function (e) {
        var i = 0,
          s = t._tickTimes;
        if (!s || s.length < 1) return -1;
        e = Math.min(s.length, e || 0 | t.getFPS());
        for (var n = 0; e > n; n++) i += s[n];
        return i / e;
      }),
      (t.getMeasuredFPS = function (e) {
        var i = t._times;
        return !i || i.length < 2
          ? -1
          : ((e = Math.min(i.length - 1, e || 0 | t.getFPS())),
            1e3 / ((i[0] - i[e]) / e));
      }),
      (t.setPaused = function (e) {
        t.paused = e;
      }),
      (t.getPaused = function () {
        return t.paused;
      }),
      (t.getTime = function (e) {
        return t._startTime ? t._getTime() - (e ? t._pausedTime : 0) : -1;
      }),
      (t.getEventTime = function (e) {
        return t._startTime
          ? (t._lastTime || t._startTime) - (e ? t._pausedTime : 0)
          : -1;
      }),
      (t.getTicks = function (e) {
        return t._ticks - (e ? t._pausedTicks : 0);
      }),
      (t._handleSynch = function () {
        (t._timerId = null),
          t._setupTick(),
          t._getTime() - t._lastTime >= 0.97 * (t._interval - 1) && t._tick();
      }),
      (t._handleRAF = function () {
        (t._timerId = null), t._setupTick(), t._tick();
      }),
      (t._handleTimeout = function () {
        (t._timerId = null), t._setupTick(), t._tick();
      }),
      (t._setupTick = function () {
        if (null == t._timerId) {
          var e = t.timingMode || (t.useRAF && t.RAF_SYNCHED);
          if (e == t.RAF_SYNCHED || e == t.RAF) {
            var i =
              window.requestAnimationFrame ||
              window.webkitRequestAnimationFrame ||
              window.mozRequestAnimationFrame ||
              window.oRequestAnimationFrame ||
              window.msRequestAnimationFrame;
            if (i)
              return (
                (t._timerId = i(e == t.RAF ? t._handleRAF : t._handleSynch)),
                void (t._raf = !0)
              );
          }
          (t._raf = !1),
            (t._timerId = setTimeout(t._handleTimeout, t._interval));
        }
      }),
      (t._tick = function () {
        var e = t.paused,
          i = t._getTime(),
          s = i - t._lastTime;
        if (
          ((t._lastTime = i),
          t._ticks++,
          e && (t._pausedTicks++, (t._pausedTime += s)),
          t.hasEventListener("tick"))
        ) {
          var n = new createjs.Event("tick"),
            r = t.maxDelta;
          (n.delta = r && s > r ? r : s),
            (n.paused = e),
            (n.time = i),
            (n.runTime = i - t._pausedTime),
            t.dispatchEvent(n);
        }
        for (
          t._tickTimes.unshift(t._getTime() - i);
          t._tickTimes.length > 100;

        )
          t._tickTimes.pop();
        for (t._times.unshift(i); t._times.length > 100; ) t._times.pop();
      });
    var i =
      window.performance &&
      (performance.now ||
        performance.mozNow ||
        performance.msNow ||
        performance.oNow ||
        performance.webkitNow);
    (t._getTime = function () {
      return (
        ((i && i.call(performance)) || new Date().getTime()) - t._startTime
      );
    }),
      (createjs.Ticker = t);
  })(),
  (this.createjs = this.createjs || {}),
  (function () {
    "use strict";
    function t() {
      throw "UID cannot be instantiated";
    }
    (t._nextID = 0),
      (t.get = function () {
        return t._nextID++;
      }),
      (createjs.UID = t);
  })(),
  (this.createjs = this.createjs || {}),
  (function () {
    "use strict";
    function t(t, e, i, s, n, r, a, o, h, c, l) {
      this.Event_constructor(t, e, i),
        (this.stageX = s),
        (this.stageY = n),
        (this.rawX = null == h ? s : h),
        (this.rawY = null == c ? n : c),
        (this.nativeEvent = r),
        (this.pointerID = a),
        (this.primary = !!o),
        (this.relatedTarget = l);
    }
    var e = createjs.extend(t, createjs.Event);
    (e._get_localX = function () {
      return this.currentTarget.globalToLocal(this.rawX, this.rawY).x;
    }),
      (e._get_localY = function () {
        return this.currentTarget.globalToLocal(this.rawX, this.rawY).y;
      }),
      (e._get_isTouch = function () {
        return -1 !== this.pointerID;
      });
    try {
      Object.defineProperties(e, {
        localX: { get: e._get_localX },
        localY: { get: e._get_localY },
        isTouch: { get: e._get_isTouch },
      });
    } catch (i) {}
    (e.clone = function () {
      return new t(
        this.type,
        this.bubbles,
        this.cancelable,
        this.stageX,
        this.stageY,
        this.nativeEvent,
        this.pointerID,
        this.primary,
        this.rawX,
        this.rawY
      );
    }),
      (e.toString = function () {
        return (
          "[MouseEvent (type=" +
          this.type +
          " stageX=" +
          this.stageX +
          " stageY=" +
          this.stageY +
          ")]"
        );
      }),
      (createjs.MouseEvent = createjs.promote(t, "Event"));
  })(),
  (this.createjs = this.createjs || {}),
  (function () {
    "use strict";
    function t(t, e, i, s, n, r) {
      this.setValues(t, e, i, s, n, r);
    }
    var e = t.prototype;
    (t.DEG_TO_RAD = Math.PI / 180),
      (t.identity = null),
      (e.setValues = function (t, e, i, s, n, r) {
        return (
          (this.a = null == t ? 1 : t),
          (this.b = e || 0),
          (this.c = i || 0),
          (this.d = null == s ? 1 : s),
          (this.tx = n || 0),
          (this.ty = r || 0),
          this
        );
      }),
      (e.append = function (t, e, i, s, n, r) {
        var a = this.a,
          o = this.b,
          h = this.c,
          c = this.d;
        return (
          (1 != t || 0 != e || 0 != i || 1 != s) &&
            ((this.a = a * t + h * e),
            (this.b = o * t + c * e),
            (this.c = a * i + h * s),
            (this.d = o * i + c * s)),
          (this.tx = a * n + h * r + this.tx),
          (this.ty = o * n + c * r + this.ty),
          this
        );
      }),
      (e.prepend = function (t, e, i, s, n, r) {
        var a = this.a,
          o = this.c,
          h = this.tx;
        return (
          (this.a = t * a + i * this.b),
          (this.b = e * a + s * this.b),
          (this.c = t * o + i * this.d),
          (this.d = e * o + s * this.d),
          (this.tx = t * h + i * this.ty + n),
          (this.ty = e * h + s * this.ty + r),
          this
        );
      }),
      (e.appendMatrix = function (t) {
        return this.append(t.a, t.b, t.c, t.d, t.tx, t.ty);
      }),
      (e.prependMatrix = function (t) {
        return this.prepend(t.a, t.b, t.c, t.d, t.tx, t.ty);
      }),
      (e.appendTransform = function (e, i, s, n, r, a, o, h, c) {
        if (r % 360)
          var l = r * t.DEG_TO_RAD,
            u = Math.cos(l),
            d = Math.sin(l);
        else (u = 1), (d = 0);
        return (
          a || o
            ? ((a *= t.DEG_TO_RAD),
              (o *= t.DEG_TO_RAD),
              this.append(
                Math.cos(o),
                Math.sin(o),
                -Math.sin(a),
                Math.cos(a),
                e,
                i
              ),
              this.append(u * s, d * s, -d * n, u * n, 0, 0))
            : this.append(u * s, d * s, -d * n, u * n, e, i),
          (h || c) &&
            ((this.tx -= h * this.a + c * this.c),
            (this.ty -= h * this.b + c * this.d)),
          this
        );
      }),
      (e.prependTransform = function (e, i, s, n, r, a, o, h, c) {
        if (r % 360)
          var l = r * t.DEG_TO_RAD,
            u = Math.cos(l),
            d = Math.sin(l);
        else (u = 1), (d = 0);
        return (
          (h || c) && ((this.tx -= h), (this.ty -= c)),
          a || o
            ? ((a *= t.DEG_TO_RAD),
              (o *= t.DEG_TO_RAD),
              this.prepend(u * s, d * s, -d * n, u * n, 0, 0),
              this.prepend(
                Math.cos(o),
                Math.sin(o),
                -Math.sin(a),
                Math.cos(a),
                e,
                i
              ))
            : this.prepend(u * s, d * s, -d * n, u * n, e, i),
          this
        );
      }),
      (e.rotate = function (e) {
        e *= t.DEG_TO_RAD;
        var i = Math.cos(e),
          s = Math.sin(e),
          n = this.a,
          r = this.b;
        return (
          (this.a = n * i + this.c * s),
          (this.b = r * i + this.d * s),
          (this.c = -n * s + this.c * i),
          (this.d = -r * s + this.d * i),
          this
        );
      }),
      (e.skew = function (e, i) {
        return (
          (e *= t.DEG_TO_RAD),
          (i *= t.DEG_TO_RAD),
          this.append(
            Math.cos(i),
            Math.sin(i),
            -Math.sin(e),
            Math.cos(e),
            0,
            0
          ),
          this
        );
      }),
      (e.scale = function (t, e) {
        return (this.a *= t), (this.b *= t), (this.c *= e), (this.d *= e), this;
      }),
      (e.translate = function (t, e) {
        return (
          (this.tx += this.a * t + this.c * e),
          (this.ty += this.b * t + this.d * e),
          this
        );
      }),
      (e.identity = function () {
        return (
          (this.a = this.d = 1), (this.b = this.c = this.tx = this.ty = 0), this
        );
      }),
      (e.invert = function () {
        var t = this.a,
          e = this.b,
          i = this.c,
          s = this.d,
          n = this.tx,
          r = t * s - e * i;
        return (
          (this.a = s / r),
          (this.b = -e / r),
          (this.c = -i / r),
          (this.d = t / r),
          (this.tx = (i * this.ty - s * n) / r),
          (this.ty = -(t * this.ty - e * n) / r),
          this
        );
      }),
      (e.isIdentity = function () {
        return (
          0 === this.tx &&
          0 === this.ty &&
          1 === this.a &&
          0 === this.b &&
          0 === this.c &&
          1 === this.d
        );
      }),
      (e.equals = function (t) {
        return (
          this.tx === t.tx &&
          this.ty === t.ty &&
          this.a === t.a &&
          this.b === t.b &&
          this.c === t.c &&
          this.d === t.d
        );
      }),
      (e.transformPoint = function (t, e, i) {
        return (
          (i = i || {}),
          (i.x = t * this.a + e * this.c + this.tx),
          (i.y = t * this.b + e * this.d + this.ty),
          i
        );
      }),
      (e.decompose = function (e) {
        null == e && (e = {}),
          (e.x = this.tx),
          (e.y = this.ty),
          (e.scaleX = Math.sqrt(this.a * this.a + this.b * this.b)),
          (e.scaleY = Math.sqrt(this.c * this.c + this.d * this.d));
        var i = Math.atan2(-this.c, this.d),
          s = Math.atan2(this.b, this.a),
          n = Math.abs(1 - i / s);
        return (
          1e-5 > n
            ? ((e.rotation = s / t.DEG_TO_RAD),
              this.a < 0 &&
                this.d >= 0 &&
                (e.rotation += e.rotation <= 0 ? 180 : -180),
              (e.skewX = e.skewY = 0))
            : ((e.skewX = i / t.DEG_TO_RAD), (e.skewY = s / t.DEG_TO_RAD)),
          e
        );
      }),
      (e.copy = function (t) {
        return this.setValues(t.a, t.b, t.c, t.d, t.tx, t.ty);
      }),
      (e.clone = function () {
        return new t(this.a, this.b, this.c, this.d, this.tx, this.ty);
      }),
      (e.toString = function () {
        return (
          "[Matrix2D (a=" +
          this.a +
          " b=" +
          this.b +
          " c=" +
          this.c +
          " d=" +
          this.d +
          " tx=" +
          this.tx +
          " ty=" +
          this.ty +
          ")]"
        );
      }),
      (t.identity = new t()),
      (createjs.Matrix2D = t);
  })(),
  (this.createjs = this.createjs || {}),
  (function () {
    "use strict";
    function t(t, e, i, s, n) {
      this.setValues(t, e, i, s, n);
    }
    var e = t.prototype;
    (e.setValues = function (t, e, i, s, n) {
      return (
        (this.visible = null == t || !!t),
        (this.alpha = null == e ? 1 : e),
        (this.shadow = i),
        (this.compositeOperation = s),
        (this.matrix =
          n ||
          (this.matrix && this.matrix.identity()) ||
          new createjs.Matrix2D()),
        this
      );
    }),
      (e.append = function (t, e, i, s, n) {
        return (
          (this.alpha *= e),
          (this.shadow = i || this.shadow),
          (this.compositeOperation = s || this.compositeOperation),
          (this.visible = this.visible && t),
          n && this.matrix.appendMatrix(n),
          this
        );
      }),
      (e.prepend = function (t, e, i, s, n) {
        return (
          (this.alpha *= e),
          (this.shadow = this.shadow || i),
          (this.compositeOperation = this.compositeOperation || s),
          (this.visible = this.visible && t),
          n && this.matrix.prependMatrix(n),
          this
        );
      }),
      (e.identity = function () {
        return (
          (this.visible = !0),
          (this.alpha = 1),
          (this.shadow = this.compositeOperation = null),
          this.matrix.identity(),
          this
        );
      }),
      (e.clone = function () {
        return new t(
          this.alpha,
          this.shadow,
          this.compositeOperation,
          this.visible,
          this.matrix.clone()
        );
      }),
      (createjs.DisplayProps = t);
  })(),
  (this.createjs = this.createjs || {}),
  (function () {
    "use strict";
    function t(t, e) {
      this.setValues(t, e);
    }
    var e = t.prototype;
    (e.setValues = function (t, e) {
      return (this.x = t || 0), (this.y = e || 0), this;
    }),
      (e.copy = function (t) {
        return (this.x = t.x), (this.y = t.y), this;
      }),
      (e.clone = function () {
        return new t(this.x, this.y);
      }),
      (e.toString = function () {
        return "[Point (x=" + this.x + " y=" + this.y + ")]";
      }),
      (createjs.Point = t);
  })(),
  (this.createjs = this.createjs || {}),
  (function () {
    "use strict";
    function t(t, e, i, s) {
      this.setValues(t, e, i, s);
    }
    var e = t.prototype;
    (e.setValues = function (t, e, i, s) {
      return (
        (this.x = t || 0),
        (this.y = e || 0),
        (this.width = i || 0),
        (this.height = s || 0),
        this
      );
    }),
      (e.extend = function (t, e, i, s) {
        return (
          (i = i || 0),
          (s = s || 0),
          t + i > this.x + this.width && (this.width = t + i - this.x),
          e + s > this.y + this.height && (this.height = e + s - this.y),
          t < this.x && ((this.width += this.x - t), (this.x = t)),
          e < this.y && ((this.height += this.y - e), (this.y = e)),
          this
        );
      }),
      (e.pad = function (t, e, i, s) {
        return (
          (this.x -= e),
          (this.y -= t),
          (this.width += e + s),
          (this.height += t + i),
          this
        );
      }),
      (e.copy = function (t) {
        return this.setValues(t.x, t.y, t.width, t.height);
      }),
      (e.contains = function (t, e, i, s) {
        return (
          (i = i || 0),
          (s = s || 0),
          t >= this.x &&
            t + i <= this.x + this.width &&
            e >= this.y &&
            e + s <= this.y + this.height
        );
      }),
      (e.union = function (t) {
        return this.clone().extend(t.x, t.y, t.width, t.height);
      }),
      (e.intersection = function (e) {
        var i = e.x,
          s = e.y,
          n = i + e.width,
          r = s + e.height;
        return (
          this.x > i && (i = this.x),
          this.y > s && (s = this.y),
          this.x + this.width < n && (n = this.x + this.width),
          this.y + this.height < r && (r = this.y + this.height),
          i >= n || s >= r ? null : new t(i, s, n - i, r - s)
        );
      }),
      (e.intersects = function (t) {
        return (
          t.x <= this.x + this.width &&
          this.x <= t.x + t.width &&
          t.y <= this.y + this.height &&
          this.y <= t.y + t.height
        );
      }),
      (e.isEmpty = function () {
        return this.width <= 0 || this.height <= 0;
      }),
      (e.clone = function () {
        return new t(this.x, this.y, this.width, this.height);
      }),
      (e.toString = function () {
        return (
          "[Rectangle (x=" +
          this.x +
          " y=" +
          this.y +
          " width=" +
          this.width +
          " height=" +
          this.height +
          ")]"
        );
      }),
      (createjs.Rectangle = t);
  })(),
  (this.createjs = this.createjs || {}),
  (function () {
    "use strict";
    function t(t, e, i, s, n, r, a) {
      t.addEventListener &&
        ((this.target = t),
        (this.overLabel = null == i ? "over" : i),
        (this.outLabel = null == e ? "out" : e),
        (this.downLabel = null == s ? "down" : s),
        (this.play = n),
        (this._isPressed = !1),
        (this._isOver = !1),
        (this._enabled = !1),
        (t.mouseChildren = !1),
        (this.enabled = !0),
        this.handleEvent({}),
        r &&
          (a && ((r.actionsEnabled = !1), r.gotoAndStop && r.gotoAndStop(a)),
          (t.hitArea = r)));
    }
    var e = t.prototype;
    (e.setEnabled = function (t) {
      if (t != this._enabled) {
        var e = this.target;
        (this._enabled = t),
          t
            ? ((e.cursor = "pointer"),
              e.addEventListener("rollover", this),
              e.addEventListener("rollout", this),
              e.addEventListener("mousedown", this),
              e.addEventListener("pressup", this),
              e._reset && ((e.__reset = e._reset), (e._reset = this._reset)))
            : ((e.cursor = null),
              e.removeEventListener("rollover", this),
              e.removeEventListener("rollout", this),
              e.removeEventListener("mousedown", this),
              e.removeEventListener("pressup", this),
              e.__reset && ((e._reset = e.__reset), delete e.__reset));
      }
    }),
      (e.getEnabled = function () {
        return this._enabled;
      });
    try {
      Object.defineProperties(e, {
        enabled: { get: e.getEnabled, set: e.setEnabled },
      });
    } catch (i) {}
    (e.toString = function () {
      return "[ButtonHelper]";
    }),
      (e.handleEvent = function (t) {
        var e,
          i = this.target,
          s = t.type;
        "mousedown" == s
          ? ((this._isPressed = !0), (e = this.downLabel))
          : "pressup" == s
          ? ((this._isPressed = !1),
            (e = this._isOver ? this.overLabel : this.outLabel))
          : "rollover" == s
          ? ((this._isOver = !0),
            (e = this._isPressed ? this.downLabel : this.overLabel))
          : ((this._isOver = !1),
            (e = this._isPressed ? this.overLabel : this.outLabel)),
          this.play
            ? i.gotoAndPlay && i.gotoAndPlay(e)
            : i.gotoAndStop && i.gotoAndStop(e);
      }),
      (e._reset = function () {
        var t = this.paused;
        this.__reset(), (this.paused = t);
      }),
      (createjs.ButtonHelper = t);
  })(),
  (this.createjs = this.createjs || {}),
  (function () {
    "use strict";
    function t(t, e, i, s) {
      (this.color = t || "black"),
        (this.offsetX = e || 0),
        (this.offsetY = i || 0),
        (this.blur = s || 0);
    }
    var e = t.prototype;
    (t.identity = new t("transparent", 0, 0, 0)),
      (e.toString = function () {
        return "[Shadow]";
      }),
      (e.clone = function () {
        return new t(this.color, this.offsetX, this.offsetY, this.blur);
      }),
      (createjs.Shadow = t);
  })(),
  (this.createjs = this.createjs || {}),
  (function () {
    "use strict";
    function t(t) {
      this.EventDispatcher_constructor(),
        (this.complete = !0),
        (this.framerate = 0),
        (this._animations = null),
        (this._frames = null),
        (this._images = null),
        (this._data = null),
        (this._loadCount = 0),
        (this._frameHeight = 0),
        (this._frameWidth = 0),
        (this._numFrames = 0),
        (this._regX = 0),
        (this._regY = 0),
        (this._spacing = 0),
        (this._margin = 0),
        this._parseData(t);
    }
    var e = createjs.extend(t, createjs.EventDispatcher);
    e.getAnimations = function () {
      return this._animations.slice();
    };
    try {
      Object.defineProperties(e, { animations: { get: e.getAnimations } });
    } catch (i) {}
    (e.getNumFrames = function (t) {
      if (null == t)
        return this._frames ? this._frames.length : this._numFrames || 0;
      var e = this._data[t];
      return null == e ? 0 : e.frames.length;
    }),
      (e.getAnimation = function (t) {
        return this._data[t];
      }),
      (e.getFrame = function (t) {
        var e;
        return this._frames && (e = this._frames[t]) ? e : null;
      }),
      (e.getFrameBounds = function (t, e) {
        var i = this.getFrame(t);
        return i
          ? (e || new createjs.Rectangle()).setValues(
              -i.regX,
              -i.regY,
              i.rect.width,
              i.rect.height
            )
          : null;
      }),
      (e.toString = function () {
        return "[SpriteSheet]";
      }),
      (e.clone = function () {
        throw "SpriteSheet cannot be cloned.";
      }),
      (e._parseData = function (t) {
        var e, i, s, n;
        if (null != t) {
          if (
            ((this.framerate = t.framerate || 0),
            t.images && (i = t.images.length) > 0)
          )
            for (n = this._images = [], e = 0; i > e; e++) {
              var r = t.images[e];
              if ("string" == typeof r) {
                var a = r;
                (r = document.createElement("img")), (r.src = a);
              }
              n.push(r),
                r.getContext ||
                  r.naturalWidth ||
                  (this._loadCount++,
                  (this.complete = !1),
                  (function (t, e) {
                    r.onload = function () {
                      t._handleImageLoad(e);
                    };
                  })(this, a),
                  (function (t, e) {
                    r.onerror = function () {
                      t._handleImageError(e);
                    };
                  })(this, a));
            }
          if (null == t.frames);
          else if (Array.isArray(t.frames))
            for (
              this._frames = [], n = t.frames, e = 0, i = n.length;
              i > e;
              e++
            ) {
              var o = n[e];
              this._frames.push({
                image: this._images[o[4] ? o[4] : 0],
                rect: new createjs.Rectangle(o[0], o[1], o[2], o[3]),
                regX: o[5] || 0,
                regY: o[6] || 0,
              });
            }
          else
            (s = t.frames),
              (this._frameWidth = s.width),
              (this._frameHeight = s.height),
              (this._regX = s.regX || 0),
              (this._regY = s.regY || 0),
              (this._spacing = s.spacing || 0),
              (this._margin = s.margin || 0),
              (this._numFrames = s.count),
              0 == this._loadCount && this._calculateFrames();
          if (((this._animations = []), null != (s = t.animations))) {
            this._data = {};
            var h;
            for (h in s) {
              var c = { name: h },
                l = s[h];
              if ("number" == typeof l) n = c.frames = [l];
              else if (Array.isArray(l))
                if (1 == l.length) c.frames = [l[0]];
                else
                  for (
                    c.speed = l[3], c.next = l[2], n = c.frames = [], e = l[0];
                    e <= l[1];
                    e++
                  )
                    n.push(e);
              else {
                (c.speed = l.speed), (c.next = l.next);
                var u = l.frames;
                n = c.frames = "number" == typeof u ? [u] : u.slice(0);
              }
              (c.next === !0 || void 0 === c.next) && (c.next = h),
                (c.next === !1 || (n.length < 2 && c.next == h)) &&
                  (c.next = null),
                c.speed || (c.speed = 1),
                this._animations.push(h),
                (this._data[h] = c);
            }
          }
        }
      }),
      (e._handleImageLoad = function () {
        0 == --this._loadCount &&
          (this._calculateFrames(),
          (this.complete = !0),
          this.dispatchEvent("complete"));
      }),
      (e._handleImageError = function (t) {
        var e = new createjs.Event("error");
        (e.src = t),
          this.dispatchEvent(e),
          0 == --this._loadCount && this.dispatchEvent("complete");
      }),
      (e._calculateFrames = function () {
        if (!this._frames && 0 != this._frameWidth) {
          this._frames = [];
          var t = this._numFrames || 1e5,
            e = 0,
            i = this._frameWidth,
            s = this._frameHeight,
            n = this._spacing,
            r = this._margin;
          t: for (var a = 0, o = this._images; a < o.length; a++)
            for (
              var h = o[a], c = h.width, l = h.height, u = r;
              l - r - s >= u;

            ) {
              for (var d = r; c - r - i >= d; ) {
                if (e >= t) break t;
                e++,
                  this._frames.push({
                    image: h,
                    rect: new createjs.Rectangle(d, u, i, s),
                    regX: this._regX,
                    regY: this._regY,
                  }),
                  (d += i + n);
              }
              u += s + n;
            }
          this._numFrames = e;
        }
      }),
      (createjs.SpriteSheet = createjs.promote(t, "EventDispatcher"));
  })(),
  (this.createjs = this.createjs || {}),
  (function () {
    "use strict";
    function t() {
      (this.command = null),
        (this._stroke = null),
        (this._strokeStyle = null),
        (this._oldStrokeStyle = null),
        (this._strokeDash = null),
        (this._oldStrokeDash = null),
        (this._strokeIgnoreScale = !1),
        (this._fill = null),
        (this._instructions = []),
        (this._commitIndex = 0),
        (this._activeInstructions = []),
        (this._dirty = !1),
        (this._storeIndex = 0),
        this.clear();
    }
    var e = t.prototype,
      i = t;
    (t.getRGB = function (t, e, i, s) {
      return (
        null != t &&
          null == i &&
          ((s = e), (i = 255 & t), (e = (t >> 8) & 255), (t = (t >> 16) & 255)),
        null == s
          ? "rgb(" + t + "," + e + "," + i + ")"
          : "rgba(" + t + "," + e + "," + i + "," + s + ")"
      );
    }),
      (t.getHSL = function (t, e, i, s) {
        return null == s
          ? "hsl(" + (t % 360) + "," + e + "%," + i + "%)"
          : "hsla(" + (t % 360) + "," + e + "%," + i + "%," + s + ")";
      }),
      (t.BASE_64 = {
        A: 0,
        B: 1,
        C: 2,
        D: 3,
        E: 4,
        F: 5,
        G: 6,
        H: 7,
        I: 8,
        J: 9,
        K: 10,
        L: 11,
        M: 12,
        N: 13,
        O: 14,
        P: 15,
        Q: 16,
        R: 17,
        S: 18,
        T: 19,
        U: 20,
        V: 21,
        W: 22,
        X: 23,
        Y: 24,
        Z: 25,
        a: 26,
        b: 27,
        c: 28,
        d: 29,
        e: 30,
        f: 31,
        g: 32,
        h: 33,
        i: 34,
        j: 35,
        k: 36,
        l: 37,
        m: 38,
        n: 39,
        o: 40,
        p: 41,
        q: 42,
        r: 43,
        s: 44,
        t: 45,
        u: 46,
        v: 47,
        w: 48,
        x: 49,
        y: 50,
        z: 51,
        0: 52,
        1: 53,
        2: 54,
        3: 55,
        4: 56,
        5: 57,
        6: 58,
        7: 59,
        8: 60,
        9: 61,
        "+": 62,
        "/": 63,
      }),
      (t.STROKE_CAPS_MAP = ["butt", "round", "square"]),
      (t.STROKE_JOINTS_MAP = ["miter", "round", "bevel"]);
    var s = createjs.createCanvas
      ? createjs.createCanvas()
      : document.createElement("canvas");
    s.getContext && ((t._ctx = s.getContext("2d")), (s.width = s.height = 1)),
      (e.getInstructions = function () {
        return this._updateInstructions(), this._instructions;
      });
    try {
      Object.defineProperties(e, { instructions: { get: e.getInstructions } });
    } catch (n) {}
    (e.isEmpty = function () {
      return !(this._instructions.length || this._activeInstructions.length);
    }),
      (e.draw = function (t, e) {
        this._updateInstructions();
        for (
          var i = this._instructions, s = this._storeIndex, n = i.length;
          n > s;
          s++
        )
          i[s].exec(t, e);
      }),
      (e.drawAsPath = function (t) {
        this._updateInstructions();
        for (
          var e, i = this._instructions, s = this._storeIndex, n = i.length;
          n > s;
          s++
        )
          (e = i[s]).path !== !1 && e.exec(t);
      }),
      (e.moveTo = function (t, e) {
        return this.append(new i.MoveTo(t, e), !0);
      }),
      (e.lineTo = function (t, e) {
        return this.append(new i.LineTo(t, e));
      }),
      (e.arcTo = function (t, e, s, n, r) {
        return this.append(new i.ArcTo(t, e, s, n, r));
      }),
      (e.arc = function (t, e, s, n, r, a) {
        return this.append(new i.Arc(t, e, s, n, r, a));
      }),
      (e.quadraticCurveTo = function (t, e, s, n) {
        return this.append(new i.QuadraticCurveTo(t, e, s, n));
      }),
      (e.bezierCurveTo = function (t, e, s, n, r, a) {
        return this.append(new i.BezierCurveTo(t, e, s, n, r, a));
      }),
      (e.rect = function (t, e, s, n) {
        return this.append(new i.Rect(t, e, s, n));
      }),
      (e.closePath = function () {
        return this._activeInstructions.length
          ? this.append(new i.ClosePath())
          : this;
      }),
      (e.clear = function () {
        return (
          (this._instructions.length =
            this._activeInstructions.length =
            this._commitIndex =
              0),
          (this._strokeStyle =
            this._oldStrokeStyle =
            this._stroke =
            this._fill =
            this._strokeDash =
            this._oldStrokeDash =
              null),
          (this._dirty = this._strokeIgnoreScale = !1),
          this
        );
      }),
      (e.beginFill = function (t) {
        return this._setFill(t ? new i.Fill(t) : null);
      }),
      (e.beginLinearGradientFill = function (t, e, s, n, r, a) {
        return this._setFill(new i.Fill().linearGradient(t, e, s, n, r, a));
      }),
      (e.beginRadialGradientFill = function (t, e, s, n, r, a, o, h) {
        return this._setFill(
          new i.Fill().radialGradient(t, e, s, n, r, a, o, h)
        );
      }),
      (e.beginBitmapFill = function (t, e, s) {
        return this._setFill(new i.Fill(null, s).bitmap(t, e));
      }),
      (e.endFill = function () {
        return this.beginFill();
      }),
      (e.setStrokeStyle = function (t, e, s, n, r) {
        return (
          this._updateInstructions(!0),
          (this._strokeStyle = this.command = new i.StrokeStyle(t, e, s, n, r)),
          this._stroke && (this._stroke.ignoreScale = r),
          (this._strokeIgnoreScale = r),
          this
        );
      }),
      (e.setStrokeDash = function (t, e) {
        return (
          this._updateInstructions(!0),
          (this._strokeDash = this.command = new i.StrokeDash(t, e)),
          this
        );
      }),
      (e.beginStroke = function (t) {
        return this._setStroke(t ? new i.Stroke(t) : null);
      }),
      (e.beginLinearGradientStroke = function (t, e, s, n, r, a) {
        return this._setStroke(new i.Stroke().linearGradient(t, e, s, n, r, a));
      }),
      (e.beginRadialGradientStroke = function (t, e, s, n, r, a, o, h) {
        return this._setStroke(
          new i.Stroke().radialGradient(t, e, s, n, r, a, o, h)
        );
      }),
      (e.beginBitmapStroke = function (t, e) {
        return this._setStroke(new i.Stroke().bitmap(t, e));
      }),
      (e.endStroke = function () {
        return this.beginStroke();
      }),
      (e.curveTo = e.quadraticCurveTo),
      (e.drawRect = e.rect),
      (e.drawRoundRect = function (t, e, i, s, n) {
        return this.drawRoundRectComplex(t, e, i, s, n, n, n, n);
      }),
      (e.drawRoundRectComplex = function (t, e, s, n, r, a, o, h) {
        return this.append(new i.RoundRect(t, e, s, n, r, a, o, h));
      }),
      (e.drawCircle = function (t, e, s) {
        return this.append(new i.Circle(t, e, s));
      }),
      (e.drawEllipse = function (t, e, s, n) {
        return this.append(new i.Ellipse(t, e, s, n));
      }),
      (e.drawPolyStar = function (t, e, s, n, r, a) {
        return this.append(new i.PolyStar(t, e, s, n, r, a));
      }),
      (e.append = function (t, e) {
        return (
          this._activeInstructions.push(t),
          (this.command = t),
          e || (this._dirty = !0),
          this
        );
      }),
      (e.decodePath = function (e) {
        for (
          var i = [
              this.moveTo,
              this.lineTo,
              this.quadraticCurveTo,
              this.bezierCurveTo,
              this.closePath,
            ],
            s = [2, 2, 4, 6, 0],
            n = 0,
            r = e.length,
            a = [],
            o = 0,
            h = 0,
            c = t.BASE_64;
          r > n;

        ) {
          var l = e.charAt(n),
            u = c[l],
            d = u >> 3,
            _ = i[d];
          if (!_ || 3 & u) throw "bad path data (@" + n + "): " + l;
          var p = s[d];
          d || (o = h = 0), (a.length = 0), n++;
          for (var f = ((u >> 2) & 1) + 2, m = 0; p > m; m++) {
            var g = c[e.charAt(n)],
              v = g >> 5 ? -1 : 1;
            (g = ((31 & g) << 6) | c[e.charAt(n + 1)]),
              3 == f && (g = (g << 6) | c[e.charAt(n + 2)]),
              (g = (v * g) / 10),
              m % 2 ? (o = g += o) : (h = g += h),
              (a[m] = g),
              (n += f);
          }
          _.apply(this, a);
        }
        return this;
      }),
      (e.store = function () {
        return (
          this._updateInstructions(!0),
          (this._storeIndex = this._instructions.length),
          this
        );
      }),
      (e.unstore = function () {
        return (this._storeIndex = 0), this;
      }),
      (e.clone = function () {
        var e = new t();
        return (
          (e.command = this.command),
          (e._stroke = this._stroke),
          (e._strokeStyle = this._strokeStyle),
          (e._strokeDash = this._strokeDash),
          (e._strokeIgnoreScale = this._strokeIgnoreScale),
          (e._fill = this._fill),
          (e._instructions = this._instructions.slice()),
          (e._commitIndex = this._commitIndex),
          (e._activeInstructions = this._activeInstructions.slice()),
          (e._dirty = this._dirty),
          (e._storeIndex = this._storeIndex),
          e
        );
      }),
      (e.toString = function () {
        return "[Graphics]";
      }),
      (e.mt = e.moveTo),
      (e.lt = e.lineTo),
      (e.at = e.arcTo),
      (e.bt = e.bezierCurveTo),
      (e.qt = e.quadraticCurveTo),
      (e.a = e.arc),
      (e.r = e.rect),
      (e.cp = e.closePath),
      (e.c = e.clear),
      (e.f = e.beginFill),
      (e.lf = e.beginLinearGradientFill),
      (e.rf = e.beginRadialGradientFill),
      (e.bf = e.beginBitmapFill),
      (e.ef = e.endFill),
      (e.ss = e.setStrokeStyle),
      (e.sd = e.setStrokeDash),
      (e.s = e.beginStroke),
      (e.ls = e.beginLinearGradientStroke),
      (e.rs = e.beginRadialGradientStroke),
      (e.bs = e.beginBitmapStroke),
      (e.es = e.endStroke),
      (e.dr = e.drawRect),
      (e.rr = e.drawRoundRect),
      (e.rc = e.drawRoundRectComplex),
      (e.dc = e.drawCircle),
      (e.de = e.drawEllipse),
      (e.dp = e.drawPolyStar),
      (e.p = e.decodePath),
      (e._updateInstructions = function (e) {
        var i = this._instructions,
          s = this._activeInstructions,
          n = this._commitIndex;
        if (this._dirty && s.length) {
          (i.length = n), i.push(t.beginCmd);
          var r = s.length,
            a = i.length;
          i.length = a + r;
          for (var o = 0; r > o; o++) i[o + a] = s[o];
          this._fill && i.push(this._fill),
            this._stroke &&
              (this._strokeDash !== this._oldStrokeDash &&
                ((this._oldStrokeDash = this._strokeDash),
                i.push(this._strokeDash)),
              this._strokeStyle !== this._oldStrokeStyle &&
                ((this._oldStrokeStyle = this._strokeStyle),
                i.push(this._strokeStyle)),
              i.push(this._stroke)),
            (this._dirty = !1);
        }
        e && ((s.length = 0), (this._commitIndex = i.length));
      }),
      (e._setFill = function (t) {
        return (
          this._updateInstructions(!0), (this.command = this._fill = t), this
        );
      }),
      (e._setStroke = function (t) {
        return (
          this._updateInstructions(!0),
          (this.command = this._stroke = t) &&
            (t.ignoreScale = this._strokeIgnoreScale),
          this
        );
      }),
      ((i.LineTo = function (t, e) {
        (this.x = t), (this.y = e);
      }).prototype.exec = function (t) {
        t.lineTo(this.x, this.y);
      }),
      ((i.MoveTo = function (t, e) {
        (this.x = t), (this.y = e);
      }).prototype.exec = function (t) {
        t.moveTo(this.x, this.y);
      }),
      ((i.ArcTo = function (t, e, i, s, n) {
        (this.x1 = t),
          (this.y1 = e),
          (this.x2 = i),
          (this.y2 = s),
          (this.radius = n);
      }).prototype.exec = function (t) {
        t.arcTo(this.x1, this.y1, this.x2, this.y2, this.radius);
      }),
      ((i.Arc = function (t, e, i, s, n, r) {
        (this.x = t),
          (this.y = e),
          (this.radius = i),
          (this.startAngle = s),
          (this.endAngle = n),
          (this.anticlockwise = !!r);
      }).prototype.exec = function (t) {
        t.arc(
          this.x,
          this.y,
          this.radius,
          this.startAngle,
          this.endAngle,
          this.anticlockwise
        );
      }),
      ((i.QuadraticCurveTo = function (t, e, i, s) {
        (this.cpx = t), (this.cpy = e), (this.x = i), (this.y = s);
      }).prototype.exec = function (t) {
        t.quadraticCurveTo(this.cpx, this.cpy, this.x, this.y);
      }),
      ((i.BezierCurveTo = function (t, e, i, s, n, r) {
        (this.cp1x = t),
          (this.cp1y = e),
          (this.cp2x = i),
          (this.cp2y = s),
          (this.x = n),
          (this.y = r);
      }).prototype.exec = function (t) {
        t.bezierCurveTo(
          this.cp1x,
          this.cp1y,
          this.cp2x,
          this.cp2y,
          this.x,
          this.y
        );
      }),
      ((i.Rect = function (t, e, i, s) {
        (this.x = t), (this.y = e), (this.w = i), (this.h = s);
      }).prototype.exec = function (t) {
        t.rect(this.x, this.y, this.w, this.h);
      }),
      ((i.ClosePath = function () {}).prototype.exec = function (t) {
        t.closePath();
      }),
      ((i.BeginPath = function () {}).prototype.exec = function (t) {
        t.beginPath();
      }),
      (e = (i.Fill = function (t, e) {
        (this.style = t), (this.matrix = e);
      }).prototype),
      (e.exec = function (t) {
        if (this.style) {
          t.fillStyle = this.style;
          var e = this.matrix;
          e && (t.save(), t.transform(e.a, e.b, e.c, e.d, e.tx, e.ty)),
            t.fill(),
            e && t.restore();
        }
      }),
      (e.linearGradient = function (e, i, s, n, r, a) {
        for (
          var o = (this.style = t._ctx.createLinearGradient(s, n, r, a)),
            h = 0,
            c = e.length;
          c > h;
          h++
        )
          o.addColorStop(i[h], e[h]);
        return (
          (o.props = {
            colors: e,
            ratios: i,
            x0: s,
            y0: n,
            x1: r,
            y1: a,
            type: "linear",
          }),
          this
        );
      }),
      (e.radialGradient = function (e, i, s, n, r, a, o, h) {
        for (
          var c = (this.style = t._ctx.createRadialGradient(s, n, r, a, o, h)),
            l = 0,
            u = e.length;
          u > l;
          l++
        )
          c.addColorStop(i[l], e[l]);
        return (
          (c.props = {
            colors: e,
            ratios: i,
            x0: s,
            y0: n,
            r0: r,
            x1: a,
            y1: o,
            r1: h,
            type: "radial",
          }),
          this
        );
      }),
      (e.bitmap = function (e, i) {
        if (e.naturalWidth || e.getContext || e.readyState >= 2) {
          var s = (this.style = t._ctx.createPattern(e, i || ""));
          s.props = { image: e, repetition: i, type: "bitmap" };
        }
        return this;
      }),
      (e.path = !1),
      (e = (i.Stroke = function (t, e) {
        (this.style = t), (this.ignoreScale = e);
      }).prototype),
      (e.exec = function (t) {
        this.style &&
          ((t.strokeStyle = this.style),
          this.ignoreScale && (t.save(), t.setTransform(1, 0, 0, 1, 0, 0)),
          t.stroke(),
          this.ignoreScale && t.restore());
      }),
      (e.linearGradient = i.Fill.prototype.linearGradient),
      (e.radialGradient = i.Fill.prototype.radialGradient),
      (e.bitmap = i.Fill.prototype.bitmap),
      (e.path = !1),
      (e = (i.StrokeStyle = function (t, e, i, s, n) {
        (this.width = t),
          (this.caps = e),
          (this.joints = i),
          (this.miterLimit = s),
          (this.ignoreScale = n);
      }).prototype),
      (e.exec = function (e) {
        (e.lineWidth = null == this.width ? "1" : this.width),
          (e.lineCap =
            null == this.caps
              ? "butt"
              : isNaN(this.caps)
              ? this.caps
              : t.STROKE_CAPS_MAP[this.caps]),
          (e.lineJoin =
            null == this.joints
              ? "miter"
              : isNaN(this.joints)
              ? this.joints
              : t.STROKE_JOINTS_MAP[this.joints]),
          (e.miterLimit = null == this.miterLimit ? "10" : this.miterLimit),
          (e.ignoreScale = null != this.ignoreScale && this.ignoreScale);
      }),
      (e.path = !1),
      ((i.StrokeDash = function (t, e) {
        (this.segments = t), (this.offset = e || 0);
      }).prototype.exec = function (t) {
        t.setLineDash &&
          (t.setLineDash(this.segments || i.StrokeDash.EMPTY_SEGMENTS),
          (t.lineDashOffset = this.offset || 0));
      }),
      (i.StrokeDash.EMPTY_SEGMENTS = []),
      ((i.RoundRect = function (t, e, i, s, n, r, a, o) {
        (this.x = t),
          (this.y = e),
          (this.w = i),
          (this.h = s),
          (this.radiusTL = n),
          (this.radiusTR = r),
          (this.radiusBR = a),
          (this.radiusBL = o);
      }).prototype.exec = function (t) {
        var e = (c > h ? h : c) / 2,
          i = 0,
          s = 0,
          n = 0,
          r = 0,
          a = this.x,
          o = this.y,
          h = this.w,
          c = this.h,
          l = this.radiusTL,
          u = this.radiusTR,
          d = this.radiusBR,
          _ = this.radiusBL;
        0 > l && (l *= i = -1),
          l > e && (l = e),
          0 > u && (u *= s = -1),
          u > e && (u = e),
          0 > d && (d *= n = -1),
          d > e && (d = e),
          0 > _ && (_ *= r = -1),
          _ > e && (_ = e),
          t.moveTo(a + h - u, o),
          t.arcTo(a + h + u * s, o - u * s, a + h, o + u, u),
          t.lineTo(a + h, o + c - d),
          t.arcTo(a + h + d * n, o + c + d * n, a + h - d, o + c, d),
          t.lineTo(a + _, o + c),
          t.arcTo(a - _ * r, o + c + _ * r, a, o + c - _, _),
          t.lineTo(a, o + l),
          t.arcTo(a - l * i, o - l * i, a + l, o, l),
          t.closePath();
      }),
      ((i.Circle = function (t, e, i) {
        (this.x = t), (this.y = e), (this.radius = i);
      }).prototype.exec = function (t) {
        t.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
      }),
      ((i.Ellipse = function (t, e, i, s) {
        (this.x = t), (this.y = e), (this.w = i), (this.h = s);
      }).prototype.exec = function (t) {
        var e = this.x,
          i = this.y,
          s = this.w,
          n = this.h,
          r = 0.5522848,
          a = (s / 2) * r,
          o = (n / 2) * r,
          h = e + s,
          c = i + n,
          l = e + s / 2,
          u = i + n / 2;
        t.moveTo(e, u),
          t.bezierCurveTo(e, u - o, l - a, i, l, i),
          t.bezierCurveTo(l + a, i, h, u - o, h, u),
          t.bezierCurveTo(h, u + o, l + a, c, l, c),
          t.bezierCurveTo(l - a, c, e, u + o, e, u);
      }),
      ((i.PolyStar = function (t, e, i, s, n, r) {
        (this.x = t),
          (this.y = e),
          (this.radius = i),
          (this.sides = s),
          (this.pointSize = n),
          (this.angle = r);
      }).prototype.exec = function (t) {
        var e = this.x,
          i = this.y,
          s = this.radius,
          n = ((this.angle || 0) / 180) * Math.PI,
          r = this.sides,
          a = 1 - (this.pointSize || 0),
          o = Math.PI / r;
        t.moveTo(e + Math.cos(n) * s, i + Math.sin(n) * s);
        for (var h = 0; r > h; h++)
          (n += o),
            1 != a &&
              t.lineTo(e + Math.cos(n) * s * a, i + Math.sin(n) * s * a),
            (n += o),
            t.lineTo(e + Math.cos(n) * s, i + Math.sin(n) * s);
        t.closePath();
      }),
      (t.beginCmd = new i.BeginPath()),
      (createjs.Graphics = t);
  })(),
  (this.createjs = this.createjs || {}),
  (function () {
    "use strict";
    function t() {
      this.EventDispatcher_constructor(),
        (this.alpha = 1),
        (this.cacheCanvas = null),
        (this.cacheID = 0),
        (this.id = createjs.UID.get()),
        (this.mouseEnabled = !0),
        (this.tickEnabled = !0),
        (this.name = null),
        (this.parent = null),
        (this.regX = 0),
        (this.regY = 0),
        (this.rotation = 0),
        (this.scaleX = 1),
        (this.scaleY = 1),
        (this.skewX = 0),
        (this.skewY = 0),
        (this.shadow = null),
        (this.visible = !0),
        (this.x = 0),
        (this.y = 0),
        (this.transformMatrix = null),
        (this.compositeOperation = null),
        (this.snapToPixel = !0),
        (this.filters = null),
        (this.mask = null),
        (this.hitArea = null),
        (this.cursor = null),
        (this._cacheOffsetX = 0),
        (this._cacheOffsetY = 0),
        (this._filterOffsetX = 0),
        (this._filterOffsetY = 0),
        (this._cacheScale = 1),
        (this._cacheDataURLID = 0),
        (this._cacheDataURL = null),
        (this._props = new createjs.DisplayProps()),
        (this._rectangle = new createjs.Rectangle()),
        (this._bounds = null);
    }
    var e = createjs.extend(t, createjs.EventDispatcher);
    (t._MOUSE_EVENTS = [
      "click",
      "dblclick",
      "mousedown",
      "mouseout",
      "mouseover",
      "pressmove",
      "pressup",
      "rollout",
      "rollover",
    ]),
      (t.suppressCrossDomainErrors = !1),
      (t._snapToPixelEnabled = !1);
    var i = createjs.createCanvas
      ? createjs.createCanvas()
      : document.createElement("canvas");
    i.getContext &&
      ((t._hitTestCanvas = i),
      (t._hitTestContext = i.getContext("2d")),
      (i.width = i.height = 1)),
      (t._nextCacheID = 1),
      (e.getStage = function () {
        for (var t = this, e = createjs.Stage; t.parent; ) t = t.parent;
        return t instanceof e ? t : null;
      });
    try {
      Object.defineProperties(e, { stage: { get: e.getStage } });
    } catch (s) {}
    (e.isVisible = function () {
      return !!(
        this.visible &&
        this.alpha > 0 &&
        0 != this.scaleX &&
        0 != this.scaleY
      );
    }),
      (e.draw = function (t, e) {
        var i = this.cacheCanvas;
        if (e || !i) return !1;
        var s = this._cacheScale;
        return (
          t.drawImage(
            i,
            this._cacheOffsetX + this._filterOffsetX,
            this._cacheOffsetY + this._filterOffsetY,
            i.width / s,
            i.height / s
          ),
          !0
        );
      }),
      (e.updateContext = function (e) {
        var i = this,
          s = i.mask,
          n = i._props.matrix;
        s &&
          s.graphics &&
          !s.graphics.isEmpty() &&
          (s.getMatrix(n),
          e.transform(n.a, n.b, n.c, n.d, n.tx, n.ty),
          s.graphics.drawAsPath(e),
          e.clip(),
          n.invert(),
          e.transform(n.a, n.b, n.c, n.d, n.tx, n.ty)),
          this.getMatrix(n);
        var r = n.tx,
          a = n.ty;
        t._snapToPixelEnabled &&
          i.snapToPixel &&
          ((r = (r + (0 > r ? -0.5 : 0.5)) | 0),
          (a = (a + (0 > a ? -0.5 : 0.5)) | 0)),
          e.transform(n.a, n.b, n.c, n.d, r, a),
          (e.globalAlpha *= i.alpha),
          i.compositeOperation &&
            (e.globalCompositeOperation = i.compositeOperation),
          i.shadow && this._applyShadow(e, i.shadow);
      }),
      (e.cache = function (t, e, i, s, n) {
        (n = n || 1),
          this.cacheCanvas ||
            (this.cacheCanvas = createjs.createCanvas
              ? createjs.createCanvas()
              : document.createElement("canvas")),
          (this._cacheWidth = i),
          (this._cacheHeight = s),
          (this._cacheOffsetX = t),
          (this._cacheOffsetY = e),
          (this._cacheScale = n),
          this.updateCache();
      }),
      (e.updateCache = function (e) {
        var i = this.cacheCanvas;
        if (!i) throw "cache() must be called before updateCache()";
        var s = this._cacheScale,
          n = this._cacheOffsetX * s,
          r = this._cacheOffsetY * s,
          a = this._cacheWidth,
          o = this._cacheHeight,
          h = i.getContext("2d"),
          c = this._getFilterBounds();
        (n += this._filterOffsetX = c.x),
          (r += this._filterOffsetY = c.y),
          (a = Math.ceil(a * s) + c.width),
          (o = Math.ceil(o * s) + c.height),
          a != i.width || o != i.height
            ? ((i.width = a), (i.height = o))
            : e || h.clearRect(0, 0, a + 1, o + 1),
          h.save(),
          (h.globalCompositeOperation = e),
          h.setTransform(s, 0, 0, s, -n, -r),
          this.draw(h, !0),
          this._applyFilters(),
          h.restore(),
          (this.cacheID = t._nextCacheID++);
      }),
      (e.uncache = function () {
        (this._cacheDataURL = this.cacheCanvas = null),
          (this.cacheID =
            this._cacheOffsetX =
            this._cacheOffsetY =
            this._filterOffsetX =
            this._filterOffsetY =
              0),
          (this._cacheScale = 1);
      }),
      (e.getCacheDataURL = function () {
        return this.cacheCanvas
          ? (this.cacheID != this._cacheDataURLID &&
              (this._cacheDataURL = this.cacheCanvas.toDataURL()),
            this._cacheDataURL)
          : null;
      }),
      (e.localToGlobal = function (t, e, i) {
        return this.getConcatenatedMatrix(this._props.matrix).transformPoint(
          t,
          e,
          i || new createjs.Point()
        );
      }),
      (e.globalToLocal = function (t, e, i) {
        return this.getConcatenatedMatrix(this._props.matrix)
          .invert()
          .transformPoint(t, e, i || new createjs.Point());
      }),
      (e.localToLocal = function (t, e, i, s) {
        return (s = this.localToGlobal(t, e, s)), i.globalToLocal(s.x, s.y, s);
      }),
      (e.setTransform = function (t, e, i, s, n, r, a, o, h) {
        return (
          (this.x = t || 0),
          (this.y = e || 0),
          (this.scaleX = null == i ? 1 : i),
          (this.scaleY = null == s ? 1 : s),
          (this.rotation = n || 0),
          (this.skewX = r || 0),
          (this.skewY = a || 0),
          (this.regX = o || 0),
          (this.regY = h || 0),
          this
        );
      }),
      (e.getMatrix = function (t) {
        var e = this,
          i = (t && t.identity()) || new createjs.Matrix2D();
        return e.transformMatrix
          ? i.copy(e.transformMatrix)
          : i.appendTransform(
              e.x,
              e.y,
              e.scaleX,
              e.scaleY,
              e.rotation,
              e.skewX,
              e.skewY,
              e.regX,
              e.regY
            );
      }),
      (e.getConcatenatedMatrix = function (t) {
        for (var e = this, i = this.getMatrix(t); (e = e.parent); )
          i.prependMatrix(e.getMatrix(e._props.matrix));
        return i;
      }),
      (e.getConcatenatedDisplayProps = function (t) {
        t = t ? t.identity() : new createjs.DisplayProps();
        var e = this,
          i = e.getMatrix(t.matrix);
        do
          t.prepend(e.visible, e.alpha, e.shadow, e.compositeOperation),
            e != this && i.prependMatrix(e.getMatrix(e._props.matrix));
        while ((e = e.parent));
        return t;
      }),
      (e.hitTest = function (e, i) {
        var s = t._hitTestContext;
        s.setTransform(1, 0, 0, 1, -e, -i), this.draw(s);
        var n = this._testHit(s);
        return s.setTransform(1, 0, 0, 1, 0, 0), s.clearRect(0, 0, 2, 2), n;
      }),
      (e.set = function (t) {
        for (var e in t) this[e] = t[e];
        return this;
      }),
      (e.getBounds = function () {
        if (this._bounds) return this._rectangle.copy(this._bounds);
        var t = this.cacheCanvas;
        if (t) {
          var e = this._cacheScale;
          return this._rectangle.setValues(
            this._cacheOffsetX,
            this._cacheOffsetY,
            t.width / e,
            t.height / e
          );
        }
        return null;
      }),
      (e.getTransformedBounds = function () {
        return this._getBounds();
      }),
      (e.setBounds = function (t, e, i, s) {
        null == t && (this._bounds = t),
          (this._bounds = (this._bounds || new createjs.Rectangle()).setValues(
            t,
            e,
            i,
            s
          ));
      }),
      (e.clone = function () {
        return this._cloneProps(new t());
      }),
      (e.toString = function () {
        return "[DisplayObject (name=" + this.name + ")]";
      }),
      (e._cloneProps = function (t) {
        return (
          (t.alpha = this.alpha),
          (t.mouseEnabled = this.mouseEnabled),
          (t.tickEnabled = this.tickEnabled),
          (t.name = this.name),
          (t.regX = this.regX),
          (t.regY = this.regY),
          (t.rotation = this.rotation),
          (t.scaleX = this.scaleX),
          (t.scaleY = this.scaleY),
          (t.shadow = this.shadow),
          (t.skewX = this.skewX),
          (t.skewY = this.skewY),
          (t.visible = this.visible),
          (t.x = this.x),
          (t.y = this.y),
          (t.compositeOperation = this.compositeOperation),
          (t.snapToPixel = this.snapToPixel),
          (t.filters = null == this.filters ? null : this.filters.slice(0)),
          (t.mask = this.mask),
          (t.hitArea = this.hitArea),
          (t.cursor = this.cursor),
          (t._bounds = this._bounds),
          t
        );
      }),
      (e._applyShadow = function (t, e) {
        (e = e || Shadow.identity),
          (t.shadowColor = e.color),
          (t.shadowOffsetX = e.offsetX),
          (t.shadowOffsetY = e.offsetY),
          (t.shadowBlur = e.blur);
      }),
      (e._tick = function (t) {
        var e = this._listeners;
        e &&
          e.tick &&
          ((t.target = null),
          (t.propagationStopped = t.immediatePropagationStopped = !1),
          this.dispatchEvent(t));
      }),
      (e._testHit = function (e) {
        try {
          var i = e.getImageData(0, 0, 1, 1).data[3] > 1;
        } catch (s) {
          if (!t.suppressCrossDomainErrors)
            throw "An error has occurred. This is most likely due to security restrictions on reading canvas pixel data with local or cross-domain images.";
        }
        return i;
      }),
      (e._applyFilters = function () {
        if (this.filters && 0 != this.filters.length && this.cacheCanvas)
          for (
            var t = this.filters.length,
              e = this.cacheCanvas.getContext("2d"),
              i = this.cacheCanvas.width,
              s = this.cacheCanvas.height,
              n = 0;
            t > n;
            n++
          )
            this.filters[n].applyFilter(e, 0, 0, i, s);
      }),
      (e._getFilterBounds = function () {
        var t,
          e = this.filters,
          i = this._rectangle.setValues(0, 0, 0, 0);
        if (!e || !(t = e.length)) return i;
        for (var s = 0; t > s; s++) {
          var n = this.filters[s];
          n.getBounds && n.getBounds(i);
        }
        return i;
      }),
      (e._getBounds = function (t, e) {
        return this._transformBounds(this.getBounds(), t, e);
      }),
      (e._transformBounds = function (t, e, i) {
        if (!t) return t;
        var s = t.x,
          n = t.y,
          r = t.width,
          a = t.height,
          o = this._props.matrix;
        (o = i ? o.identity() : this.getMatrix(o)),
          (s || n) && o.appendTransform(0, 0, 1, 1, 0, 0, 0, -s, -n),
          e && o.prependMatrix(e);
        var h = r * o.a,
          c = r * o.b,
          l = a * o.c,
          u = a * o.d,
          d = o.tx,
          _ = o.ty,
          p = d,
          f = d,
          m = _,
          g = _;
        return (
          (s = h + d) < p ? (p = s) : s > f && (f = s),
          (s = h + l + d) < p ? (p = s) : s > f && (f = s),
          (s = l + d) < p ? (p = s) : s > f && (f = s),
          (n = c + _) < m ? (m = n) : n > g && (g = n),
          (n = c + u + _) < m ? (m = n) : n > g && (g = n),
          (n = u + _) < m ? (m = n) : n > g && (g = n),
          t.setValues(p, m, f - p, g - m)
        );
      }),
      (e._hasMouseEventListener = function () {
        for (var e = t._MOUSE_EVENTS, i = 0, s = e.length; s > i; i++)
          if (this.hasEventListener(e[i])) return !0;
        return !!this.cursor;
      }),
      (createjs.DisplayObject = createjs.promote(t, "EventDispatcher"));
  })(),
  (this.createjs = this.createjs || {}),
  (function () {
    "use strict";
    function t() {
      this.DisplayObject_constructor(),
        (this.children = []),
        (this.mouseChildren = !0),
        (this.tickChildren = !0);
    }
    var e = createjs.extend(t, createjs.DisplayObject);
    e.getNumChildren = function () {
      return this.children.length;
    };
    try {
      Object.defineProperties(e, { numChildren: { get: e.getNumChildren } });
    } catch (i) {}
    (e.initialize = t),
      (e.isVisible = function () {
        var t = this.cacheCanvas || this.children.length;
        return !!(
          this.visible &&
          this.alpha > 0 &&
          0 != this.scaleX &&
          0 != this.scaleY &&
          t
        );
      }),
      (e.draw = function (t, e) {
        if (this.DisplayObject_draw(t, e)) return !0;
        for (var i = this.children.slice(), s = 0, n = i.length; n > s; s++) {
          var r = i[s];
          r.isVisible() &&
            (t.save(), r.updateContext(t), r.draw(t), t.restore());
        }
        return !0;
      }),
      (e.addChild = function (t) {
        if (null == t) return t;
        var e = arguments.length;
        if (e > 1) {
          for (var i = 0; e > i; i++) this.addChild(arguments[i]);
          return arguments[e - 1];
        }
        return (
          t.parent && t.parent.removeChild(t),
          (t.parent = this),
          this.children.push(t),
          t.dispatchEvent("added"),
          t
        );
      }),
      (e.addChildAt = function (t, e) {
        var i = arguments.length,
          s = arguments[i - 1];
        if (0 > s || s > this.children.length) return arguments[i - 2];
        if (i > 2) {
          for (var n = 0; i - 1 > n; n++) this.addChildAt(arguments[n], s + n);
          return arguments[i - 2];
        }
        return (
          t.parent && t.parent.removeChild(t),
          (t.parent = this),
          this.children.splice(e, 0, t),
          t.dispatchEvent("added"),
          t
        );
      }),
      (e.removeChild = function (t) {
        var e = arguments.length;
        if (e > 1) {
          for (var i = !0, s = 0; e > s; s++)
            i = i && this.removeChild(arguments[s]);
          return i;
        }
        return this.removeChildAt(createjs.indexOf(this.children, t));
      }),
      (e.removeChildAt = function (t) {
        var e = arguments.length;
        if (e > 1) {
          for (var i = [], s = 0; e > s; s++) i[s] = arguments[s];
          i.sort(function (t, e) {
            return e - t;
          });
          for (var n = !0, s = 0; e > s; s++) n = n && this.removeChildAt(i[s]);
          return n;
        }
        if (0 > t || t > this.children.length - 1) return !1;
        var r = this.children[t];
        return (
          r && (r.parent = null),
          this.children.splice(t, 1),
          r.dispatchEvent("removed"),
          !0
        );
      }),
      (e.removeAllChildren = function () {
        for (var t = this.children; t.length; ) this.removeChildAt(0);
      }),
      (e.getChildAt = function (t) {
        return this.children[t];
      }),
      (e.getChildByName = function (t) {
        for (var e = this.children, i = 0, s = e.length; s > i; i++)
          if (e[i].name == t) return e[i];
        return null;
      }),
      (e.sortChildren = function (t) {
        this.children.sort(t);
      }),
      (e.getChildIndex = function (t) {
        return createjs.indexOf(this.children, t);
      }),
      (e.swapChildrenAt = function (t, e) {
        var i = this.children,
          s = i[t],
          n = i[e];
        s && n && ((i[t] = n), (i[e] = s));
      }),
      (e.swapChildren = function (t, e) {
        for (
          var i, s, n = this.children, r = 0, a = n.length;
          a > r &&
          (n[r] == t && (i = r), n[r] == e && (s = r), null == i || null == s);
          r++
        );
        r != a && ((n[i] = e), (n[s] = t));
      }),
      (e.setChildIndex = function (t, e) {
        var i = this.children,
          s = i.length;
        if (!(t.parent != this || 0 > e || e >= s)) {
          for (var n = 0; s > n && i[n] != t; n++);
          n != s && n != e && (i.splice(n, 1), i.splice(e, 0, t));
        }
      }),
      (e.contains = function (t) {
        for (; t; ) {
          if (t == this) return !0;
          t = t.parent;
        }
        return !1;
      }),
      (e.hitTest = function (t, e) {
        return null != this.getObjectUnderPoint(t, e);
      }),
      (e.getObjectsUnderPoint = function (t, e, i) {
        var s = [],
          n = this.localToGlobal(t, e);
        return this._getObjectsUnderPoint(n.x, n.y, s, i > 0, 1 == i), s;
      }),
      (e.getObjectUnderPoint = function (t, e, i) {
        var s = this.localToGlobal(t, e);
        return this._getObjectsUnderPoint(s.x, s.y, null, i > 0, 1 == i);
      }),
      (e.getBounds = function () {
        return this._getBounds(null, !0);
      }),
      (e.getTransformedBounds = function () {
        return this._getBounds();
      }),
      (e.clone = function (e) {
        var i = this._cloneProps(new t());
        return e && this._cloneChildren(i), i;
      }),
      (e.toString = function () {
        return "[Container (name=" + this.name + ")]";
      }),
      (e._tick = function (t) {
        if (this.tickChildren)
          for (var e = this.children.length - 1; e >= 0; e--) {
            var i = this.children[e];
            i.tickEnabled && i._tick && i._tick(t);
          }
        this.DisplayObject__tick(t);
      }),
      (e._cloneChildren = function (t) {
        t.children.length && t.removeAllChildren();
        for (var e = t.children, i = 0, s = this.children.length; s > i; i++) {
          var n = this.children[i].clone(!0);
          (n.parent = t), e.push(n);
        }
      }),
      (e._getObjectsUnderPoint = function (e, i, s, n, r, a) {
        if (((a = a || 0), !a && !this._testMask(this, e, i))) return null;
        var o,
          h = createjs.DisplayObject._hitTestContext;
        r = r || (n && this._hasMouseEventListener());
        for (var c = this.children, l = c.length, u = l - 1; u >= 0; u--) {
          var d = c[u],
            _ = d.hitArea;
          if (
            d.visible &&
            (_ || d.isVisible()) &&
            (!n || d.mouseEnabled) &&
            (_ || this._testMask(d, e, i))
          )
            if (!_ && d instanceof t) {
              var p = d._getObjectsUnderPoint(e, i, s, n, r, a + 1);
              if (!s && p) return n && !this.mouseChildren ? this : p;
            } else {
              if (n && !r && !d._hasMouseEventListener()) continue;
              var f = d.getConcatenatedDisplayProps(d._props);
              if (
                ((o = f.matrix),
                _ &&
                  (o.appendMatrix(_.getMatrix(_._props.matrix)),
                  (f.alpha = _.alpha)),
                (h.globalAlpha = f.alpha),
                h.setTransform(o.a, o.b, o.c, o.d, o.tx - e, o.ty - i),
                (_ || d).draw(h),
                !this._testHit(h))
              )
                continue;
              if (
                (h.setTransform(1, 0, 0, 1, 0, 0), h.clearRect(0, 0, 2, 2), !s)
              )
                return n && !this.mouseChildren ? this : d;
              s.push(d);
            }
        }
        return null;
      }),
      (e._testMask = function (t, e, i) {
        var s = t.mask;
        if (!s || !s.graphics || s.graphics.isEmpty()) return !0;
        var n = this._props.matrix,
          r = t.parent;
        (n = r ? r.getConcatenatedMatrix(n) : n.identity()),
          (n = s.getMatrix(s._props.matrix).prependMatrix(n));
        var a = createjs.DisplayObject._hitTestContext;
        return (
          a.setTransform(n.a, n.b, n.c, n.d, n.tx - e, n.ty - i),
          s.graphics.drawAsPath(a),
          (a.fillStyle = "#000"),
          a.fill(),
          !!this._testHit(a) &&
            (a.setTransform(1, 0, 0, 1, 0, 0), a.clearRect(0, 0, 2, 2), !0)
        );
      }),
      (e._getBounds = function (t, e) {
        var i = this.DisplayObject_getBounds();
        if (i) return this._transformBounds(i, t, e);
        var s = this._props.matrix;
        (s = e ? s.identity() : this.getMatrix(s)), t && s.prependMatrix(t);
        for (var n = this.children.length, r = null, a = 0; n > a; a++) {
          var o = this.children[a];
          o.visible &&
            (i = o._getBounds(s)) &&
            (r ? r.extend(i.x, i.y, i.width, i.height) : (r = i.clone()));
        }
        return r;
      }),
      (createjs.Container = createjs.promote(t, "DisplayObject"));
  })(),
  (this.createjs = this.createjs || {}),
  (function () {
    "use strict";
    function t(t) {
      this.Container_constructor(),
        (this.autoClear = !0),
        (this.canvas = "string" == typeof t ? document.getElementById(t) : t),
        (this.mouseX = 0),
        (this.mouseY = 0),
        (this.drawRect = null),
        (this.snapToPixelEnabled = !1),
        (this.mouseInBounds = !1),
        (this.tickOnUpdate = !0),
        (this.mouseMoveOutside = !1),
        (this.preventSelection = !0),
        (this._pointerData = {}),
        (this._pointerCount = 0),
        (this._primaryPointerID = null),
        (this._mouseOverIntervalID = null),
        (this._nextStage = null),
        (this._prevStage = null),
        this.enableDOMEvents(!0);
    }
    var e = createjs.extend(t, createjs.Container);
    (e._get_nextStage = function () {
      return this._nextStage;
    }),
      (e._set_nextStage = function (t) {
        this._nextStage && (this._nextStage._prevStage = null),
          t && (t._prevStage = this),
          (this._nextStage = t);
      });
    try {
      Object.defineProperties(e, {
        nextStage: { get: e._get_nextStage, set: e._set_nextStage },
      });
    } catch (i) {}
    (e.update = function (t) {
      if (
        this.canvas &&
        (this.tickOnUpdate && this.tick(t),
        this.dispatchEvent("drawstart", !1, !0) !== !1)
      ) {
        createjs.DisplayObject._snapToPixelEnabled = this.snapToPixelEnabled;
        var e = this.drawRect,
          i = this.canvas.getContext("2d");
        i.setTransform(1, 0, 0, 1, 0, 0),
          this.autoClear &&
            (e
              ? i.clearRect(e.x, e.y, e.width, e.height)
              : i.clearRect(
                  0,
                  0,
                  this.canvas.width + 1,
                  this.canvas.height + 1
                )),
          i.save(),
          this.drawRect &&
            (i.beginPath(), i.rect(e.x, e.y, e.width, e.height), i.clip()),
          this.updateContext(i),
          this.draw(i, !1),
          i.restore(),
          this.dispatchEvent("drawend");
      }
    }),
      (e.tick = function (t) {
        if (
          this.tickEnabled &&
          this.dispatchEvent("tickstart", !1, !0) !== !1
        ) {
          var e = new createjs.Event("tick");
          if (t) for (var i in t) t.hasOwnProperty(i) && (e[i] = t[i]);
          this._tick(e), this.dispatchEvent("tickend");
        }
      }),
      (e.handleEvent = function (t) {
        "tick" == t.type && this.update(t);
      }),
      (e.clear = function () {
        if (this.canvas) {
          var t = this.canvas.getContext("2d");
          t.setTransform(1, 0, 0, 1, 0, 0),
            t.clearRect(0, 0, this.canvas.width + 1, this.canvas.height + 1);
        }
      }),
      (e.toDataURL = function (t, e) {
        var i,
          s = this.canvas.getContext("2d"),
          n = this.canvas.width,
          r = this.canvas.height;
        if (t) {
          i = s.getImageData(0, 0, n, r);
          var a = s.globalCompositeOperation;
          (s.globalCompositeOperation = "destination-over"),
            (s.fillStyle = t),
            s.fillRect(0, 0, n, r);
        }
        var o = this.canvas.toDataURL(e || "image/png");
        return (
          t && (s.putImageData(i, 0, 0), (s.globalCompositeOperation = a)), o
        );
      }),
      (e.enableMouseOver = function (t) {
        if (
          (this._mouseOverIntervalID &&
            (clearInterval(this._mouseOverIntervalID),
            (this._mouseOverIntervalID = null),
            0 == t && this._testMouseOver(!0)),
          null == t)
        )
          t = 20;
        else if (0 >= t) return;
        var e = this;
        this._mouseOverIntervalID = setInterval(function () {
          e._testMouseOver();
        }, 1e3 / Math.min(50, t));
      }),
      (e.enableDOMEvents = function (t) {
        null == t && (t = !0);
        var e,
          i,
          s = this._eventListeners;
        if (!t && s) {
          for (e in s) (i = s[e]), i.t.removeEventListener(e, i.f, !1);
          this._eventListeners = null;
        } else if (t && !s && this.canvas) {
          var n = window.addEventListener ? window : document,
            r = this;
          (s = this._eventListeners = {}),
            (s.mouseup = {
              t: n,
              f: function (t) {
                r._handleMouseUp(t);
              },
            }),
            (s.mousemove = {
              t: n,
              f: function (t) {
                r._handleMouseMove(t);
              },
            }),
            (s.dblclick = {
              t: this.canvas,
              f: function (t) {
                r._handleDoubleClick(t);
              },
            }),
            (s.mousedown = {
              t: this.canvas,
              f: function (t) {
                r._handleMouseDown(t);
              },
            });
          for (e in s) (i = s[e]), i.t.addEventListener(e, i.f, !1);
        }
      }),
      (e.clone = function () {
        throw "Stage cannot be cloned.";
      }),
      (e.toString = function () {
        return "[Stage (name=" + this.name + ")]";
      }),
      (e._getElementRect = function (t) {
        var e;
        try {
          e = t.getBoundingClientRect();
        } catch (i) {
          e = {
            top: t.offsetTop,
            left: t.offsetLeft,
            width: t.offsetWidth,
            height: t.offsetHeight,
          };
        }
        var s =
            (window.pageXOffset || document.scrollLeft || 0) -
            (document.clientLeft || document.body.clientLeft || 0),
          n =
            (window.pageYOffset || document.scrollTop || 0) -
            (document.clientTop || document.body.clientTop || 0),
          r = window.getComputedStyle
            ? getComputedStyle(t, null)
            : t.currentStyle,
          a = parseInt(r.paddingLeft) + parseInt(r.borderLeftWidth),
          o = parseInt(r.paddingTop) + parseInt(r.borderTopWidth),
          h = parseInt(r.paddingRight) + parseInt(r.borderRightWidth),
          c = parseInt(r.paddingBottom) + parseInt(r.borderBottomWidth);
        return {
          left: e.left + s + a,
          right: e.right + s - h,
          top: e.top + n + o,
          bottom: e.bottom + n - c,
        };
      }),
      (e._getPointerData = function (t) {
        var e = this._pointerData[t];
        return e || (e = this._pointerData[t] = { x: 0, y: 0 }), e;
      }),
      (e._handleMouseMove = function (t) {
        t || (t = window.event),
          this._handlePointerMove(-1, t, t.pageX, t.pageY);
      }),
      (e._handlePointerMove = function (t, e, i, s, n) {
        if ((!this._prevStage || void 0 !== n) && this.canvas) {
          var r = this._nextStage,
            a = this._getPointerData(t),
            o = a.inBounds;
          this._updatePointerPosition(t, e, i, s),
            (o || a.inBounds || this.mouseMoveOutside) &&
              (-1 === t &&
                a.inBounds == !o &&
                this._dispatchMouseEvent(
                  this,
                  o ? "mouseleave" : "mouseenter",
                  !1,
                  t,
                  a,
                  e
                ),
              this._dispatchMouseEvent(this, "stagemousemove", !1, t, a, e),
              this._dispatchMouseEvent(a.target, "pressmove", !0, t, a, e)),
            r && r._handlePointerMove(t, e, i, s, null);
        }
      }),
      (e._updatePointerPosition = function (t, e, i, s) {
        var n = this._getElementRect(this.canvas);
        (i -= n.left), (s -= n.top);
        var r = this.canvas.width,
          a = this.canvas.height;
        (i /= (n.right - n.left) / r), (s /= (n.bottom - n.top) / a);
        var o = this._getPointerData(t);
        (o.inBounds = i >= 0 && s >= 0 && r - 1 >= i && a - 1 >= s)
          ? ((o.x = i), (o.y = s))
          : this.mouseMoveOutside &&
            ((o.x = 0 > i ? 0 : i > r - 1 ? r - 1 : i),
            (o.y = 0 > s ? 0 : s > a - 1 ? a - 1 : s)),
          (o.posEvtObj = e),
          (o.rawX = i),
          (o.rawY = s),
          (t === this._primaryPointerID || -1 === t) &&
            ((this.mouseX = o.x),
            (this.mouseY = o.y),
            (this.mouseInBounds = o.inBounds));
      }),
      (e._handleMouseUp = function (t) {
        this._handlePointerUp(-1, t, !1);
      }),
      (e._handlePointerUp = function (t, e, i, s) {
        var n = this._nextStage,
          r = this._getPointerData(t);
        if (!this._prevStage || void 0 !== s) {
          var a = null,
            o = r.target;
          s ||
            (!o && !n) ||
            (a = this._getObjectsUnderPoint(r.x, r.y, null, !0)),
            r.down &&
              (this._dispatchMouseEvent(this, "stagemouseup", !1, t, r, e, a),
              (r.down = !1)),
            a == o && this._dispatchMouseEvent(o, "click", !0, t, r, e),
            this._dispatchMouseEvent(o, "pressup", !0, t, r, e),
            i
              ? (t == this._primaryPointerID && (this._primaryPointerID = null),
                delete this._pointerData[t])
              : (r.target = null),
            n && n._handlePointerUp(t, e, i, s || (a && this));
        }
      }),
      (e._handleMouseDown = function (t) {
        this._handlePointerDown(-1, t, t.pageX, t.pageY);
      }),
      (e._handlePointerDown = function (t, e, i, s, n) {
        this.preventSelection && e.preventDefault(),
          (null == this._primaryPointerID || -1 === t) &&
            (this._primaryPointerID = t),
          null != s && this._updatePointerPosition(t, e, i, s);
        var r = null,
          a = this._nextStage,
          o = this._getPointerData(t);
        n || (r = o.target = this._getObjectsUnderPoint(o.x, o.y, null, !0)),
          o.inBounds &&
            (this._dispatchMouseEvent(this, "stagemousedown", !1, t, o, e, r),
            (o.down = !0)),
          this._dispatchMouseEvent(r, "mousedown", !0, t, o, e),
          a && a._handlePointerDown(t, e, i, s, n || (r && this));
      }),
      (e._testMouseOver = function (t, e, i) {
        if (!this._prevStage || void 0 !== e) {
          var s = this._nextStage;
          if (!this._mouseOverIntervalID)
            return void (s && s._testMouseOver(t, e, i));
          var n = this._getPointerData(-1);
          if (
            n &&
            (t ||
              this.mouseX != this._mouseOverX ||
              this.mouseY != this._mouseOverY ||
              !this.mouseInBounds)
          ) {
            var r,
              a,
              o,
              h = n.posEvtObj,
              c = i || (h && h.target == this.canvas),
              l = null,
              u = -1,
              d = "";
            !e &&
              (t || (this.mouseInBounds && c)) &&
              ((l = this._getObjectsUnderPoint(
                this.mouseX,
                this.mouseY,
                null,
                !0
              )),
              (this._mouseOverX = this.mouseX),
              (this._mouseOverY = this.mouseY));
            var _ = this._mouseOverTarget || [],
              p = _[_.length - 1],
              f = (this._mouseOverTarget = []);
            for (r = l; r; ) f.unshift(r), d || (d = r.cursor), (r = r.parent);
            for (
              this.canvas.style.cursor = d,
                !e && i && (i.canvas.style.cursor = d),
                a = 0,
                o = f.length;
              o > a && f[a] == _[a];
              a++
            )
              u = a;
            for (
              p != l &&
                this._dispatchMouseEvent(p, "mouseout", !0, -1, n, h, l),
                a = _.length - 1;
              a > u;
              a--
            )
              this._dispatchMouseEvent(_[a], "rollout", !1, -1, n, h, l);
            for (a = f.length - 1; a > u; a--)
              this._dispatchMouseEvent(f[a], "rollover", !1, -1, n, h, p);
            p != l && this._dispatchMouseEvent(l, "mouseover", !0, -1, n, h, p),
              s && s._testMouseOver(t, e || (l && this), i || (c && this));
          }
        }
      }),
      (e._handleDoubleClick = function (t, e) {
        var i = null,
          s = this._nextStage,
          n = this._getPointerData(-1);
        e ||
          ((i = this._getObjectsUnderPoint(n.x, n.y, null, !0)),
          this._dispatchMouseEvent(i, "dblclick", !0, -1, n, t)),
          s && s._handleDoubleClick(t, e || (i && this));
      }),
      (e._dispatchMouseEvent = function (t, e, i, s, n, r, a) {
        if (t && (i || t.hasEventListener(e))) {
          var o = new createjs.MouseEvent(
            e,
            i,
            !1,
            n.x,
            n.y,
            r,
            s,
            s === this._primaryPointerID || -1 === s,
            n.rawX,
            n.rawY,
            a
          );
          t.dispatchEvent(o);
        }
      }),
      (createjs.Stage = createjs.promote(t, "Container"));
  })(),
  (this.createjs = this.createjs || {}),
  (function () {
    function t(t) {
      this.DisplayObject_constructor(),
        "string" == typeof t
          ? ((this.image = document.createElement("img")), (this.image.src = t))
          : (this.image = t),
        (this.sourceRect = null);
    }
    var e = createjs.extend(t, createjs.DisplayObject);
    (e.initialize = t),
      (e.isVisible = function () {
        var t = this.image,
          e =
            this.cacheCanvas ||
            (t && (t.naturalWidth || t.getContext || t.readyState >= 2));
        return !!(
          this.visible &&
          this.alpha > 0 &&
          0 != this.scaleX &&
          0 != this.scaleY &&
          e
        );
      }),
      (e.draw = function (t, e) {
        if (this.DisplayObject_draw(t, e) || !this.image) return !0;
        var i = this.image,
          s = this.sourceRect;
        if (s) {
          var n = s.x,
            r = s.y,
            a = n + s.width,
            o = r + s.height,
            h = 0,
            c = 0,
            l = i.width,
            u = i.height;
          0 > n && ((h -= n), (n = 0)),
            a > l && (a = l),
            0 > r && ((c -= r), (r = 0)),
            o > u && (o = u),
            t.drawImage(i, n, r, a - n, o - r, h, c, a - n, o - r);
        } else t.drawImage(i, 0, 0);
        return !0;
      }),
      (e.getBounds = function () {
        var t = this.DisplayObject_getBounds();
        if (t) return t;
        var e = this.image,
          i = this.sourceRect || e,
          s = e && (e.naturalWidth || e.getContext || e.readyState >= 2);
        return s ? this._rectangle.setValues(0, 0, i.width, i.height) : null;
      }),
      (e.clone = function () {
        var e = new t(this.image);
        return (
          this.sourceRect && (e.sourceRect = this.sourceRect.clone()),
          this._cloneProps(e),
          e
        );
      }),
      (e.toString = function () {
        return "[Bitmap (name=" + this.name + ")]";
      }),
      (createjs.Bitmap = createjs.promote(t, "DisplayObject"));
  })(),
  (this.createjs = this.createjs || {}),
  (function () {
    "use strict";
    function t(t, e) {
      this.DisplayObject_constructor(),
        (this.currentFrame = 0),
        (this.currentAnimation = null),
        (this.paused = !0),
        (this.spriteSheet = t),
        (this.currentAnimationFrame = 0),
        (this.framerate = 0),
        (this._animation = null),
        (this._currentFrame = null),
        (this._skipAdvance = !1),
        null != e && this.gotoAndPlay(e);
    }
    var e = createjs.extend(t, createjs.DisplayObject);
    (e.initialize = t),
      (e.isVisible = function () {
        var t = this.cacheCanvas || this.spriteSheet.complete;
        return !!(
          this.visible &&
          this.alpha > 0 &&
          0 != this.scaleX &&
          0 != this.scaleY &&
          t
        );
      }),
      (e.draw = function (t, e) {
        if (this.DisplayObject_draw(t, e)) return !0;
        this._normalizeFrame();
        var i = this.spriteSheet.getFrame(0 | this._currentFrame);
        if (!i) return !1;
        var s = i.rect;
        return (
          s.width &&
            s.height &&
            t.drawImage(
              i.image,
              s.x,
              s.y,
              s.width,
              s.height,
              -i.regX,
              -i.regY,
              s.width,
              s.height
            ),
          !0
        );
      }),
      (e.play = function () {
        this.paused = !1;
      }),
      (e.stop = function () {
        this.paused = !0;
      }),
      (e.gotoAndPlay = function (t) {
        (this.paused = !1), (this._skipAdvance = !0), this._goto(t);
      }),
      (e.gotoAndStop = function (t) {
        (this.paused = !0), this._goto(t);
      }),
      (e.advance = function (t) {
        var e = this.framerate || this.spriteSheet.framerate,
          i = e && null != t ? t / (1e3 / e) : 1;
        this._normalizeFrame(i);
      }),
      (e.getBounds = function () {
        return (
          this.DisplayObject_getBounds() ||
          this.spriteSheet.getFrameBounds(this.currentFrame, this._rectangle)
        );
      }),
      (e.clone = function () {
        return this._cloneProps(new t(this.spriteSheet));
      }),
      (e.toString = function () {
        return "[Sprite (name=" + this.name + ")]";
      }),
      (e._cloneProps = function (t) {
        return (
          this.DisplayObject__cloneProps(t),
          (t.currentFrame = this.currentFrame),
          (t.currentAnimation = this.currentAnimation),
          (t.paused = this.paused),
          (t.currentAnimationFrame = this.currentAnimationFrame),
          (t.framerate = this.framerate),
          (t._animation = this._animation),
          (t._currentFrame = this._currentFrame),
          (t._skipAdvance = this._skipAdvance),
          t
        );
      }),
      (e._tick = function (t) {
        this.paused ||
          (this._skipAdvance || this.advance(t && t.delta),
          (this._skipAdvance = !1)),
          this.DisplayObject__tick(t);
      }),
      (e._normalizeFrame = function (t) {
        t = t || 0;
        var e,
          i = this._animation,
          s = this.paused,
          n = this._currentFrame;
        if (i) {
          var r = i.speed || 1,
            a = this.currentAnimationFrame;
          if (((e = i.frames.length), a + t * r >= e)) {
            var o = i.next;
            if (this._dispatchAnimationEnd(i, n, s, o, e - 1)) return;
            if (o) return this._goto(o, t - (e - a) / r);
            (this.paused = !0), (a = i.frames.length - 1);
          } else a += t * r;
          (this.currentAnimationFrame = a),
            (this._currentFrame = i.frames[0 | a]);
        } else if (
          ((n = this._currentFrame += t),
          (e = this.spriteSheet.getNumFrames()),
          n >= e &&
            e > 0 &&
            !this._dispatchAnimationEnd(i, n, s, e - 1) &&
            (this._currentFrame -= e) >= e)
        )
          return this._normalizeFrame();
        (n = 0 | this._currentFrame),
          this.currentFrame != n &&
            ((this.currentFrame = n), this.dispatchEvent("change"));
      }),
      (e._dispatchAnimationEnd = function (t, e, i, s, n) {
        var r = t ? t.name : null;
        if (this.hasEventListener("animationend")) {
          var a = new createjs.Event("animationend");
          (a.name = r), (a.next = s), this.dispatchEvent(a);
        }
        var o = this._animation != t || this._currentFrame != e;
        return (
          o ||
            i ||
            !this.paused ||
            ((this.currentAnimationFrame = n), (o = !0)),
          o
        );
      }),
      (e._goto = function (t, e) {
        if (((this.currentAnimationFrame = 0), isNaN(t))) {
          var i = this.spriteSheet.getAnimation(t);
          i &&
            ((this._animation = i),
            (this.currentAnimation = t),
            this._normalizeFrame(e));
        } else
          (this.currentAnimation = this._animation = null),
            (this._currentFrame = t),
            this._normalizeFrame();
      }),
      (createjs.Sprite = createjs.promote(t, "DisplayObject"));
  })(),
  (this.createjs = this.createjs || {}),
  (function () {
    "use strict";
    function t(t) {
      this.DisplayObject_constructor(),
        (this.graphics = t ? t : new createjs.Graphics());
    }
    var e = createjs.extend(t, createjs.DisplayObject);
    (e.isVisible = function () {
      var t = this.cacheCanvas || (this.graphics && !this.graphics.isEmpty());
      return !!(
        this.visible &&
        this.alpha > 0 &&
        0 != this.scaleX &&
        0 != this.scaleY &&
        t
      );
    }),
      (e.draw = function (t, e) {
        return (
          !!this.DisplayObject_draw(t, e) || (this.graphics.draw(t, this), !0)
        );
      }),
      (e.clone = function (e) {
        var i = e && this.graphics ? this.graphics.clone() : this.graphics;
        return this._cloneProps(new t(i));
      }),
      (e.toString = function () {
        return "[Shape (name=" + this.name + ")]";
      }),
      (createjs.Shape = createjs.promote(t, "DisplayObject"));
  })(),
  (this.createjs = this.createjs || {}),
  (function () {
    "use strict";
    function t(t, e, i) {
      this.DisplayObject_constructor(),
        (this.text = t),
        (this.font = e),
        (this.color = i),
        (this.textAlign = "left"),
        (this.textBaseline = "top"),
        (this.maxWidth = null),
        (this.outline = 0),
        (this.lineHeight = 0),
        (this.lineWidth = null);
    }
    var e = createjs.extend(t, createjs.DisplayObject),
      i = createjs.createCanvas
        ? createjs.createCanvas()
        : document.createElement("canvas");
    i.getContext &&
      ((t._workingContext = i.getContext("2d")), (i.width = i.height = 1)),
      (t.H_OFFSETS = { start: 0, left: 0, center: -0.5, end: -1, right: -1 }),
      (t.V_OFFSETS = {
        top: 0,
        hanging: -0.01,
        middle: -0.4,
        alphabetic: -0.8,
        ideographic: -0.85,
        bottom: -1,
      }),
      (e.isVisible = function () {
        var t = this.cacheCanvas || (null != this.text && "" !== this.text);
        return !!(
          this.visible &&
          this.alpha > 0 &&
          0 != this.scaleX &&
          0 != this.scaleY &&
          t
        );
      }),
      (e.draw = function (t, e) {
        if (this.DisplayObject_draw(t, e)) return !0;
        var i = this.color || "#000";
        return (
          this.outline
            ? ((t.strokeStyle = i), (t.lineWidth = 1 * this.outline))
            : (t.fillStyle = i),
          this._drawText(this._prepContext(t)),
          !0
        );
      }),
      (e.getMeasuredWidth = function () {
        return this._getMeasuredWidth(this.text);
      }),
      (e.getMeasuredLineHeight = function () {
        return 1.2 * this._getMeasuredWidth("M");
      }),
      (e.getMeasuredHeight = function () {
        return this._drawText(null, {}).height;
      }),
      (e.getBounds = function () {
        var e = this.DisplayObject_getBounds();
        if (e) return e;
        if (null == this.text || "" === this.text) return null;
        var i = this._drawText(null, {}),
          s =
            this.maxWidth && this.maxWidth < i.width ? this.maxWidth : i.width,
          n = s * t.H_OFFSETS[this.textAlign || "left"],
          r = this.lineHeight || this.getMeasuredLineHeight(),
          a = r * t.V_OFFSETS[this.textBaseline || "top"];
        return this._rectangle.setValues(n, a, s, i.height);
      }),
      (e.getMetrics = function () {
        var e = { lines: [] };
        return (
          (e.lineHeight = this.lineHeight || this.getMeasuredLineHeight()),
          (e.vOffset = e.lineHeight * t.V_OFFSETS[this.textBaseline || "top"]),
          this._drawText(null, e, e.lines)
        );
      }),
      (e.clone = function () {
        return this._cloneProps(new t(this.text, this.font, this.color));
      }),
      (e.toString = function () {
        return (
          "[Text (text=" +
          (this.text.length > 20
            ? this.text.substr(0, 17) + "..."
            : this.text) +
          ")]"
        );
      }),
      (e._cloneProps = function (t) {
        return (
          this.DisplayObject__cloneProps(t),
          (t.textAlign = this.textAlign),
          (t.textBaseline = this.textBaseline),
          (t.maxWidth = this.maxWidth),
          (t.outline = this.outline),
          (t.lineHeight = this.lineHeight),
          (t.lineWidth = this.lineWidth),
          t
        );
      }),
      (e._prepContext = function (t) {
        return (
          (t.font = this.font || "10px sans-serif"),
          (t.textAlign = this.textAlign || "left"),
          (t.textBaseline = this.textBaseline || "top"),
          t
        );
      }),
      (e._drawText = function (e, i, s) {
        var n = !!e;
        n || ((e = t._workingContext), e.save(), this._prepContext(e));
        for (
          var r = this.lineHeight || this.getMeasuredLineHeight(),
            a = 0,
            o = 0,
            h = String(this.text).split(/(?:\r\n|\r|\n)/),
            c = 0,
            l = h.length;
          l > c;
          c++
        ) {
          var u = h[c],
            d = null;
          if (
            null != this.lineWidth &&
            (d = e.measureText(u).width) > this.lineWidth
          ) {
            var _ = u.split(/(\s)/);
            (u = _[0]), (d = e.measureText(u).width);
            for (var p = 1, f = _.length; f > p; p += 2) {
              var m = e.measureText(_[p] + _[p + 1]).width;
              d + m > this.lineWidth
                ? (n && this._drawTextLine(e, u, o * r),
                  s && s.push(u),
                  d > a && (a = d),
                  (u = _[p + 1]),
                  (d = e.measureText(u).width),
                  o++)
                : ((u += _[p] + _[p + 1]), (d += m));
            }
          }
          n && this._drawTextLine(e, u, o * r),
            s && s.push(u),
            i && null == d && (d = e.measureText(u).width),
            d > a && (a = d),
            o++;
        }
        return i && ((i.width = a), (i.height = o * r)), n || e.restore(), i;
      }),
      (e._drawTextLine = function (t, e, i) {
        this.outline
          ? t.strokeText(e, 0, i, this.maxWidth || 65535)
          : t.fillText(e, 0, i, this.maxWidth || 65535);
      }),
      (e._getMeasuredWidth = function (e) {
        var i = t._workingContext;
        i.save();
        var s = this._prepContext(i).measureText(e).width;
        return i.restore(), s;
      }),
      (createjs.Text = createjs.promote(t, "DisplayObject"));
  })(),
  (this.createjs = this.createjs || {}),
  (function () {
    "use strict";
    function t(t, e) {
      this.Container_constructor(),
        (this.text = t || ""),
        (this.spriteSheet = e),
        (this.lineHeight = 0),
        (this.letterSpacing = 0),
        (this.spaceWidth = 0),
        (this._oldProps = {
          text: 0,
          spriteSheet: 0,
          lineHeight: 0,
          letterSpacing: 0,
          spaceWidth: 0,
        });
    }
    var e = createjs.extend(t, createjs.Container);
    (t.maxPoolSize = 100),
      (t._spritePool = []),
      (e.draw = function (t, e) {
        this.DisplayObject_draw(t, e) ||
          (this._updateText(), this.Container_draw(t, e));
      }),
      (e.getBounds = function () {
        return this._updateText(), this.Container_getBounds();
      }),
      (e.isVisible = function () {
        var t =
          this.cacheCanvas ||
          (this.spriteSheet && this.spriteSheet.complete && this.text);
        return !!(
          this.visible &&
          this.alpha > 0 &&
          0 !== this.scaleX &&
          0 !== this.scaleY &&
          t
        );
      }),
      (e.clone = function () {
        return this._cloneProps(new t(this.text, this.spriteSheet));
      }),
      (e.addChild =
        e.addChildAt =
        e.removeChild =
        e.removeChildAt =
        e.removeAllChildren =
          function () {}),
      (e._cloneProps = function (t) {
        return (
          this.Container__cloneProps(t),
          (t.lineHeight = this.lineHeight),
          (t.letterSpacing = this.letterSpacing),
          (t.spaceWidth = this.spaceWidth),
          t
        );
      }),
      (e._getFrameIndex = function (t, e) {
        var i,
          s = e.getAnimation(t);
        return (
          s ||
            (t != (i = t.toUpperCase()) ||
              t != (i = t.toLowerCase()) ||
              (i = null),
            i && (s = e.getAnimation(i))),
          s && s.frames[0]
        );
      }),
      (e._getFrame = function (t, e) {
        var i = this._getFrameIndex(t, e);
        return null == i ? i : e.getFrame(i);
      }),
      (e._getLineHeight = function (t) {
        var e =
          this._getFrame("1", t) ||
          this._getFrame("T", t) ||
          this._getFrame("L", t) ||
          t.getFrame(0);
        return e ? e.rect.height : 1;
      }),
      (e._getSpaceWidth = function (t) {
        var e =
          this._getFrame("1", t) ||
          this._getFrame("l", t) ||
          this._getFrame("e", t) ||
          this._getFrame("a", t) ||
          t.getFrame(0);
        return e ? e.rect.width : 1;
      }),
      (e._updateText = function () {
        var e,
          i = 0,
          s = 0,
          n = this._oldProps,
          r = !1,
          a = this.spaceWidth,
          o = this.lineHeight,
          h = this.spriteSheet,
          c = t._spritePool,
          l = this.children,
          u = 0,
          d = l.length;
        for (var _ in n) n[_] != this[_] && ((n[_] = this[_]), (r = !0));
        if (r) {
          var p = !!this._getFrame(" ", h);
          p || a || (a = this._getSpaceWidth(h)),
            o || (o = this._getLineHeight(h));
          for (var f = 0, m = this.text.length; m > f; f++) {
            var g = this.text.charAt(f);
            if (" " != g || p)
              if ("\n" != g && "\r" != g) {
                var v = this._getFrameIndex(g, h);
                null != v &&
                  (d > u
                    ? (e = l[u])
                    : (l.push((e = c.length ? c.pop() : new createjs.Sprite())),
                      (e.parent = this),
                      d++),
                  (e.spriteSheet = h),
                  e.gotoAndStop(v),
                  (e.x = i),
                  (e.y = s),
                  u++,
                  (i += e.getBounds().width + this.letterSpacing));
              } else
                "\r" == g && "\n" == this.text.charAt(f + 1) && f++,
                  (i = 0),
                  (s += o);
            else i += a;
          }
          for (; d > u; ) c.push((e = l.pop())), (e.parent = null), d--;
          c.length > t.maxPoolSize && (c.length = t.maxPoolSize);
        }
      }),
      (createjs.BitmapText = createjs.promote(t, "Container"));
  })(),
  (this.createjs = this.createjs || {}),
  (function () {
    "use strict";
    function t(e, i, s, n) {
      this.Container_constructor(),
        !t.inited && t.init(),
        (this.mode = e || t.INDEPENDENT),
        (this.startPosition = i || 0),
        (this.loop = s),
        (this.currentFrame = 0),
        (this.timeline = new createjs.Timeline(null, n, {
          paused: !0,
          position: i,
          useTicks: !0,
        })),
        (this.paused = !1),
        (this.actionsEnabled = !0),
        (this.autoReset = !0),
        (this.frameBounds = this.frameBounds || null),
        (this.framerate = null),
        (this._synchOffset = 0),
        (this._prevPos = -1),
        (this._prevPosition = 0),
        (this._t = 0),
        (this._managed = {});
    }
    function e() {
      throw "MovieClipPlugin cannot be instantiated.";
    }
    var i = createjs.extend(t, createjs.Container);
    (t.INDEPENDENT = "independent"),
      (t.SINGLE_FRAME = "single"),
      (t.SYNCHED = "synched"),
      (t.inited = !1),
      (t.init = function () {
        t.inited || (e.install(), (t.inited = !0));
      }),
      (i.getLabels = function () {
        return this.timeline.getLabels();
      }),
      (i.getCurrentLabel = function () {
        return this._updateTimeline(), this.timeline.getCurrentLabel();
      }),
      (i.getDuration = function () {
        return this.timeline.duration;
      });
    try {
      Object.defineProperties(i, {
        labels: { get: i.getLabels },
        currentLabel: { get: i.getCurrentLabel },
        totalFrames: { get: i.getDuration },
        duration: { get: i.getDuration },
      });
    } catch (s) {}
    (i.initialize = t),
      (i.isVisible = function () {
        return !!(
          this.visible &&
          this.alpha > 0 &&
          0 != this.scaleX &&
          0 != this.scaleY
        );
      }),
      (i.draw = function (t, e) {
        return (
          !!this.DisplayObject_draw(t, e) ||
          (this._updateTimeline(), this.Container_draw(t, e), !0)
        );
      }),
      (i.play = function () {
        this.paused = !1;
      }),
      (i.stop = function () {
        this.paused = !0;
      }),
      (i.gotoAndPlay = function (t) {
        (this.paused = !1), this._goto(t);
      }),
      (i.gotoAndStop = function (t) {
        (this.paused = !0), this._goto(t);
      }),
      (i.advance = function (e) {
        var i = t.INDEPENDENT;
        if (this.mode == i) {
          for (var s = this, n = s.framerate; (s = s.parent) && null == n; )
            s.mode == i && (n = s._framerate);
          this._framerate = n;
          var r =
              null != n && -1 != n && null != e ? e / (1e3 / n) + this._t : 1,
            a = 0 | r;
          for (this._t = r - a; !this.paused && a--; )
            (this._prevPosition =
              this._prevPos < 0 ? 0 : this._prevPosition + 1),
              this._updateTimeline();
        }
      }),
      (i.clone = function () {
        throw "MovieClip cannot be cloned.";
      }),
      (i.toString = function () {
        return "[MovieClip (name=" + this.name + ")]";
      }),
      (i._tick = function (t) {
        this.advance(t && t.delta), this.Container__tick(t);
      }),
      (i._goto = function (t) {
        var e = this.timeline.resolve(t);
        null != e &&
          (-1 == this._prevPos && (this._prevPos = NaN),
          (this._prevPosition = e),
          (this._t = 0),
          this._updateTimeline());
      }),
      (i._reset = function () {
        (this._prevPos = -1),
          (this._t = this.currentFrame = 0),
          (this.paused = !1);
      }),
      (i._updateTimeline = function () {
        var e = this.timeline,
          i = this.mode != t.INDEPENDENT;
        e.loop = null == this.loop || this.loop;
        var s = i
            ? this.startPosition +
              (this.mode == t.SINGLE_FRAME ? 0 : this._synchOffset)
            : this._prevPos < 0
            ? 0
            : this._prevPosition,
          n = i || !this.actionsEnabled ? createjs.Tween.NONE : null;
        if (
          ((this.currentFrame = e._calcPosition(s)),
          e.setPosition(s, n),
          (this._prevPosition = e._prevPosition),
          this._prevPos != e._prevPos)
        ) {
          this.currentFrame = this._prevPos = e._prevPos;
          for (var r in this._managed) this._managed[r] = 1;
          for (var a = e._tweens, o = 0, h = a.length; h > o; o++) {
            var c = a[o],
              l = c._target;
            if (l != this && !c.passive) {
              var u = c._stepPosition;
              l instanceof createjs.DisplayObject
                ? this._addManagedChild(l, u)
                : this._setState(l.state, u);
            }
          }
          var d = this.children;
          for (o = d.length - 1; o >= 0; o--) {
            var _ = d[o].id;
            1 == this._managed[_] &&
              (this.removeChildAt(o), delete this._managed[_]);
          }
        }
      }),
      (i._setState = function (t, e) {
        if (t)
          for (var i = t.length - 1; i >= 0; i--) {
            var s = t[i],
              n = s.t,
              r = s.p;
            for (var a in r) n[a] = r[a];
            this._addManagedChild(n, e);
          }
      }),
      (i._addManagedChild = function (e, i) {
        e._off ||
          (this.addChildAt(e, 0),
          e instanceof t &&
            ((e._synchOffset = i),
            e.mode == t.INDEPENDENT &&
              e.autoReset &&
              !this._managed[e.id] &&
              e._reset()),
          (this._managed[e.id] = 2));
      }),
      (i._getBounds = function (t, e) {
        var i = this.DisplayObject_getBounds();
        return (
          i ||
            (this._updateTimeline(),
            this.frameBounds &&
              (i = this._rectangle.copy(this.frameBounds[this.currentFrame]))),
          i ? this._transformBounds(i, t, e) : this.Container__getBounds(t, e)
        );
      }),
      (createjs.MovieClip = createjs.promote(t, "Container")),
      (e.priority = 100),
      (e.install = function () {
        createjs.Tween.installPlugin(e, ["startPosition"]);
      }),
      (e.init = function (t, e, i) {
        return i;
      }),
      (e.step = function () {}),
      (e.tween = function (e, i, s, n, r, a) {
        return e.target instanceof t ? (1 == a ? r[i] : n[i]) : s;
      });
  })(),
  (this.createjs = this.createjs || {}),
  (function () {
    "use strict";
    function t() {
      throw "SpriteSheetUtils cannot be instantiated";
    }
    var e = createjs.createCanvas
      ? createjs.createCanvas()
      : document.createElement("canvas");
    e.getContext &&
      ((t._workingCanvas = e),
      (t._workingContext = e.getContext("2d")),
      (e.width = e.height = 1)),
      (t.addFlippedFrames = function (e, i, s, n) {
        if (i || s || n) {
          var r = 0;
          i && t._flip(e, ++r, !0, !1),
            s && t._flip(e, ++r, !1, !0),
            n && t._flip(e, ++r, !0, !0);
        }
      }),
      (t.extractFrame = function (e, i) {
        isNaN(i) && (i = e.getAnimation(i).frames[0]);
        var s = e.getFrame(i);
        if (!s) return null;
        var n = s.rect,
          r = t._workingCanvas;
        (r.width = n.width),
          (r.height = n.height),
          t._workingContext.drawImage(
            s.image,
            n.x,
            n.y,
            n.width,
            n.height,
            0,
            0,
            n.width,
            n.height
          );
        var a = document.createElement("img");
        return (a.src = r.toDataURL("image/png")), a;
      }),
      (t.mergeAlpha = function (t, e, i) {
        i ||
          (i = createjs.createCanvas
            ? createjs.createCanvas()
            : document.createElement("canvas")),
          (i.width = Math.max(e.width, t.width)),
          (i.height = Math.max(e.height, t.height));
        var s = i.getContext("2d");
        return (
          s.save(),
          s.drawImage(t, 0, 0),
          (s.globalCompositeOperation = "destination-in"),
          s.drawImage(e, 0, 0),
          s.restore(),
          i
        );
      }),
      (t._flip = function (e, i, s, n) {
        for (
          var r = e._images,
            a = t._workingCanvas,
            o = t._workingContext,
            h = r.length / i,
            c = 0;
          h > c;
          c++
        ) {
          var l = r[c];
          (l.__tmp = c),
            o.setTransform(1, 0, 0, 1, 0, 0),
            o.clearRect(0, 0, a.width + 1, a.height + 1),
            (a.width = l.width),
            (a.height = l.height),
            o.setTransform(
              s ? -1 : 1,
              0,
              0,
              n ? -1 : 1,
              s ? l.width : 0,
              n ? l.height : 0
            ),
            o.drawImage(l, 0, 0);
          var u = document.createElement("img");
          (u.src = a.toDataURL("image/png")),
            (u.width = l.width),
            (u.height = l.height),
            r.push(u);
        }
        var d = e._frames,
          _ = d.length / i;
        for (c = 0; _ > c; c++) {
          l = d[c];
          var p = l.rect.clone();
          u = r[l.image.__tmp + h * i];
          var f = { image: u, rect: p, regX: l.regX, regY: l.regY };
          s && ((p.x = u.width - p.x - p.width), (f.regX = p.width - l.regX)),
            n &&
              ((p.y = u.height - p.y - p.height), (f.regY = p.height - l.regY)),
            d.push(f);
        }
        var m = "_" + (s ? "h" : "") + (n ? "v" : ""),
          g = e._animations,
          v = e._data,
          y = g.length / i;
        for (c = 0; y > c; c++) {
          var b = g[c];
          l = v[b];
          var w = { name: b + m, speed: l.speed, next: l.next, frames: [] };
          l.next && (w.next += m), (d = l.frames);
          for (var x = 0, T = d.length; T > x; x++) w.frames.push(d[x] + _ * i);
          (v[w.name] = w), g.push(w.name);
        }
      }),
      (createjs.SpriteSheetUtils = t);
  })(),
  (this.createjs = this.createjs || {}),
  (function () {
    "use strict";
    function t(t) {
      this.EventDispatcher_constructor(),
        (this.maxWidth = 2048),
        (this.maxHeight = 2048),
        (this.spriteSheet = null),
        (this.scale = 1),
        (this.padding = 1),
        (this.timeSlice = 0.3),
        (this.progress = -1),
        (this.framerate = t || 0),
        (this._frames = []),
        (this._animations = {}),
        (this._data = null),
        (this._nextFrameIndex = 0),
        (this._index = 0),
        (this._timerID = null),
        (this._scale = 1);
    }
    var e = createjs.extend(t, createjs.EventDispatcher);
    (t.ERR_DIMENSIONS = "frame dimensions exceed max spritesheet dimensions"),
      (t.ERR_RUNNING = "a build is already running"),
      (e.addFrame = function (e, i, s, n, r) {
        if (this._data) throw t.ERR_RUNNING;
        var a = i || e.bounds || e.nominalBounds;
        return (
          !a && e.getBounds && (a = e.getBounds()),
          a
            ? ((s = s || 1),
              this._frames.push({
                source: e,
                sourceRect: a,
                scale: s,
                funct: n,
                data: r,
                index: this._frames.length,
                height: a.height * s,
              }) - 1)
            : null
        );
      }),
      (e.addAnimation = function (e, i, s, n) {
        if (this._data) throw t.ERR_RUNNING;
        this._animations[e] = { frames: i, next: s, speed: n };
      }),
      (e.addMovieClip = function (e, i, s, n, r, a) {
        if (this._data) throw t.ERR_RUNNING;
        var o = e.frameBounds,
          h = i || e.bounds || e.nominalBounds;
        if ((!h && e.getBounds && (h = e.getBounds()), h || o)) {
          var c,
            l,
            u = this._frames.length,
            d = e.timeline.duration;
          for (c = 0; d > c; c++) {
            var _ = o && o[c] ? o[c] : h;
            this.addFrame(e, _, s, this._setupMovieClipFrame, {
              i: c,
              f: n,
              d: r,
            });
          }
          var p = e.timeline._labels,
            f = [];
          for (var m in p) f.push({ index: p[m], label: m });
          if (f.length)
            for (
              f.sort(function (t, e) {
                return t.index - e.index;
              }),
                c = 0,
                l = f.length;
              l > c;
              c++
            ) {
              for (
                var g = f[c].label,
                  v = u + f[c].index,
                  y = u + (c == l - 1 ? d : f[c + 1].index),
                  b = [],
                  w = v;
                y > w;
                w++
              )
                b.push(w);
              (!a || (g = a(g, e, v, y))) && this.addAnimation(g, b, !0);
            }
        }
      }),
      (e.build = function () {
        if (this._data) throw t.ERR_RUNNING;
        for (this._startBuild(); this._drawNext(); );
        return this._endBuild(), this.spriteSheet;
      }),
      (e.buildAsync = function (e) {
        if (this._data) throw t.ERR_RUNNING;
        (this.timeSlice = e), this._startBuild();
        var i = this;
        this._timerID = setTimeout(function () {
          i._run();
        }, 50 - 50 * Math.max(0.01, Math.min(0.99, this.timeSlice || 0.3)));
      }),
      (e.stopAsync = function () {
        clearTimeout(this._timerID), (this._data = null);
      }),
      (e.clone = function () {
        throw "SpriteSheetBuilder cannot be cloned.";
      }),
      (e.toString = function () {
        return "[SpriteSheetBuilder]";
      }),
      (e._startBuild = function () {
        var e = this.padding || 0;
        (this.progress = 0),
          (this.spriteSheet = null),
          (this._index = 0),
          (this._scale = this.scale);
        var i = [];
        this._data = {
          images: [],
          frames: i,
          framerate: this.framerate,
          animations: this._animations,
        };
        var s = this._frames.slice();
        if (
          (s.sort(function (t, e) {
            return t.height <= e.height ? -1 : 1;
          }),
          s[s.length - 1].height + 2 * e > this.maxHeight)
        )
          throw t.ERR_DIMENSIONS;
        for (var n = 0, r = 0, a = 0; s.length; ) {
          var o = this._fillRow(s, n, a, i, e);
          if ((o.w > r && (r = o.w), (n += o.h), !o.h || !s.length)) {
            var h = createjs.createCanvas
              ? createjs.createCanvas()
              : document.createElement("canvas");
            (h.width = this._getSize(r, this.maxWidth)),
              (h.height = this._getSize(n, this.maxHeight)),
              (this._data.images[a] = h),
              o.h || ((r = n = 0), a++);
          }
        }
      }),
      (e._setupMovieClipFrame = function (t, e) {
        var i = t.actionsEnabled;
        (t.actionsEnabled = !1),
          t.gotoAndStop(e.i),
          (t.actionsEnabled = i),
          e.f && e.f(t, e.d, e.i);
      }),
      (e._getSize = function (t, e) {
        for (var i = 4; Math.pow(2, ++i) < t; );
        return Math.min(e, Math.pow(2, i));
      }),
      (e._fillRow = function (e, i, s, n, r) {
        var a = this.maxWidth,
          o = this.maxHeight;
        i += r;
        for (var h = o - i, c = r, l = 0, u = e.length - 1; u >= 0; u--) {
          var d = e[u],
            _ = this._scale * d.scale,
            p = d.sourceRect,
            f = d.source,
            m = Math.floor(_ * p.x - r),
            g = Math.floor(_ * p.y - r),
            v = Math.ceil(_ * p.height + 2 * r),
            y = Math.ceil(_ * p.width + 2 * r);
          if (y > a) throw t.ERR_DIMENSIONS;
          v > h ||
            c + y > a ||
            ((d.img = s),
            (d.rect = new createjs.Rectangle(c, i, y, v)),
            (l = l || v),
            e.splice(u, 1),
            (n[d.index] = [
              c,
              i,
              y,
              v,
              s,
              Math.round(-m + _ * f.regX - r),
              Math.round(-g + _ * f.regY - r),
            ]),
            (c += y));
        }
        return { w: c, h: l };
      }),
      (e._endBuild = function () {
        (this.spriteSheet = new createjs.SpriteSheet(this._data)),
          (this._data = null),
          (this.progress = 1),
          this.dispatchEvent("complete");
      }),
      (e._run = function () {
        for (
          var t = 50 * Math.max(0.01, Math.min(0.99, this.timeSlice || 0.3)),
            e = new Date().getTime() + t,
            i = !1;
          e > new Date().getTime();

        )
          if (!this._drawNext()) {
            i = !0;
            break;
          }
        if (i) this._endBuild();
        else {
          var s = this;
          this._timerID = setTimeout(function () {
            s._run();
          }, 50 - t);
        }
        var n = (this.progress = this._index / this._frames.length);
        if (this.hasEventListener("progress")) {
          var r = new createjs.Event("progress");
          (r.progress = n), this.dispatchEvent(r);
        }
      }),
      (e._drawNext = function () {
        var t = this._frames[this._index],
          e = t.scale * this._scale,
          i = t.rect,
          s = t.sourceRect,
          n = this._data.images[t.img],
          r = n.getContext("2d");
        return (
          t.funct && t.funct(t.source, t.data),
          r.save(),
          r.beginPath(),
          r.rect(i.x, i.y, i.width, i.height),
          r.clip(),
          r.translate(Math.ceil(i.x - s.x * e), Math.ceil(i.y - s.y * e)),
          r.scale(e, e),
          t.source.draw(r),
          r.restore(),
          ++this._index < this._frames.length
        );
      }),
      (createjs.SpriteSheetBuilder = createjs.promote(t, "EventDispatcher"));
  })(),
  (this.createjs = this.createjs || {}),
  (function () {
    "use strict";
    function t(t) {
      this.DisplayObject_constructor(),
        "string" == typeof t && (t = document.getElementById(t)),
        (this.mouseEnabled = !1);
      var e = t.style;
      (e.position = "absolute"),
        (e.transformOrigin =
          e.WebkitTransformOrigin =
          e.msTransformOrigin =
          e.MozTransformOrigin =
          e.OTransformOrigin =
            "0% 0%"),
        (this.htmlElement = t),
        (this._oldProps = null);
    }
    var e = createjs.extend(t, createjs.DisplayObject);
    (e.isVisible = function () {
      return null != this.htmlElement;
    }),
      (e.draw = function () {
        return !0;
      }),
      (e.cache = function () {}),
      (e.uncache = function () {}),
      (e.updateCache = function () {}),
      (e.hitTest = function () {}),
      (e.localToGlobal = function () {}),
      (e.globalToLocal = function () {}),
      (e.localToLocal = function () {}),
      (e.clone = function () {
        throw "DOMElement cannot be cloned.";
      }),
      (e.toString = function () {
        return "[DOMElement (name=" + this.name + ")]";
      }),
      (e._tick = function (t) {
        var e = this.getStage();
        e && e.on("drawend", this._handleDrawEnd, this, !0),
          this.DisplayObject__tick(t);
      }),
      (e._handleDrawEnd = function () {
        var t = this.htmlElement;
        if (t) {
          var e = t.style,
            i = this.getConcatenatedDisplayProps(this._props),
            s = i.matrix,
            n = i.visible ? "visible" : "hidden";
          if ((n != e.visibility && (e.visibility = n), i.visible)) {
            var r = this._oldProps,
              a = r && r.matrix,
              o = 1e4;
            if (!a || !a.equals(s)) {
              var h =
                "matrix(" +
                ((s.a * o) | 0) / o +
                "," +
                ((s.b * o) | 0) / o +
                "," +
                ((s.c * o) | 0) / o +
                "," +
                ((s.d * o) | 0) / o +
                "," +
                ((s.tx + 0.5) | 0);
              (e.transform =
                e.WebkitTransform =
                e.OTransform =
                e.msTransform =
                  h + "," + ((s.ty + 0.5) | 0) + ")"),
                (e.MozTransform = h + "px," + ((s.ty + 0.5) | 0) + "px)"),
                r || (r = this._oldProps = new createjs.DisplayProps(!0, NaN)),
                r.matrix.copy(s);
            }
            r.alpha != i.alpha &&
              ((e.opacity = "" + ((i.alpha * o) | 0) / o), (r.alpha = i.alpha));
          }
        }
      }),
      (createjs.DOMElement = createjs.promote(t, "DisplayObject"));
  })(),
  (this.createjs = this.createjs || {}),
  (function () {
    "use strict";
    function t() {}
    var e = t.prototype;
    (e.getBounds = function (t) {
      return t;
    }),
      (e.applyFilter = function (t, e, i, s, n, r, a, o) {
        (r = r || t), null == a && (a = e), null == o && (o = i);
        try {
          var h = t.getImageData(e, i, s, n);
        } catch (c) {
          return !1;
        }
        return !!this._applyFilter(h) && (r.putImageData(h, a, o), !0);
      }),
      (e.toString = function () {
        return "[Filter]";
      }),
      (e.clone = function () {
        return new t();
      }),
      (e._applyFilter = function () {
        return !0;
      }),
      (createjs.Filter = t);
  })(),
  (this.createjs = this.createjs || {}),
  (function () {
    "use strict";
    function t(t, e, i) {
      (isNaN(t) || 0 > t) && (t = 0),
        (isNaN(e) || 0 > e) && (e = 0),
        (isNaN(i) || 1 > i) && (i = 1),
        (this.blurX = 0 | t),
        (this.blurY = 0 | e),
        (this.quality = 0 | i);
    }
    var e = createjs.extend(t, createjs.Filter);
    (t.MUL_TABLE = [
      1, 171, 205, 293, 57, 373, 79, 137, 241, 27, 391, 357, 41, 19, 283, 265,
      497, 469, 443, 421, 25, 191, 365, 349, 335, 161, 155, 149, 9, 278, 269,
      261, 505, 245, 475, 231, 449, 437, 213, 415, 405, 395, 193, 377, 369, 361,
      353, 345, 169, 331, 325, 319, 313, 307, 301, 37, 145, 285, 281, 69, 271,
      267, 263, 259, 509, 501, 493, 243, 479, 118, 465, 459, 113, 446, 55, 435,
      429, 423, 209, 413, 51, 403, 199, 393, 97, 3, 379, 375, 371, 367, 363,
      359, 355, 351, 347, 43, 85, 337, 333, 165, 327, 323, 5, 317, 157, 311, 77,
      305, 303, 75, 297, 294, 73, 289, 287, 71, 141, 279, 277, 275, 68, 135, 67,
      133, 33, 262, 260, 129, 511, 507, 503, 499, 495, 491, 61, 121, 481, 477,
      237, 235, 467, 232, 115, 457, 227, 451, 7, 445, 221, 439, 218, 433, 215,
      427, 425, 211, 419, 417, 207, 411, 409, 203, 202, 401, 399, 396, 197, 49,
      389, 387, 385, 383, 95, 189, 47, 187, 93, 185, 23, 183, 91, 181, 45, 179,
      89, 177, 11, 175, 87, 173, 345, 343, 341, 339, 337, 21, 167, 83, 331, 329,
      327, 163, 81, 323, 321, 319, 159, 79, 315, 313, 39, 155, 309, 307, 153,
      305, 303, 151, 75, 299, 149, 37, 295, 147, 73, 291, 145, 289, 287, 143,
      285, 71, 141, 281, 35, 279, 139, 69, 275, 137, 273, 17, 271, 135, 269,
      267, 133, 265, 33, 263, 131, 261, 130, 259, 129, 257, 1,
    ]),
      (t.SHG_TABLE = [
        0, 9, 10, 11, 9, 12, 10, 11, 12, 9, 13, 13, 10, 9, 13, 13, 14, 14, 14,
        14, 10, 13, 14, 14, 14, 13, 13, 13, 9, 14, 14, 14, 15, 14, 15, 14, 15,
        15, 14, 15, 15, 15, 14, 15, 15, 15, 15, 15, 14, 15, 15, 15, 15, 15, 15,
        12, 14, 15, 15, 13, 15, 15, 15, 15, 16, 16, 16, 15, 16, 14, 16, 16, 14,
        16, 13, 16, 16, 16, 15, 16, 13, 16, 15, 16, 14, 9, 16, 16, 16, 16, 16,
        16, 16, 16, 16, 13, 14, 16, 16, 15, 16, 16, 10, 16, 15, 16, 14, 16, 16,
        14, 16, 16, 14, 16, 16, 14, 15, 16, 16, 16, 14, 15, 14, 15, 13, 16, 16,
        15, 17, 17, 17, 17, 17, 17, 14, 15, 17, 17, 16, 16, 17, 16, 15, 17, 16,
        17, 11, 17, 16, 17, 16, 17, 16, 17, 17, 16, 17, 17, 16, 17, 17, 16, 16,
        17, 17, 17, 16, 14, 17, 17, 17, 17, 15, 16, 14, 16, 15, 16, 13, 16, 15,
        16, 14, 16, 15, 16, 12, 16, 15, 16, 17, 17, 17, 17, 17, 13, 16, 15, 17,
        17, 17, 16, 15, 17, 17, 17, 16, 15, 17, 17, 14, 16, 17, 17, 16, 17, 17,
        16, 15, 17, 16, 14, 17, 16, 15, 17, 16, 17, 17, 16, 17, 15, 16, 17, 14,
        17, 16, 15, 17, 16, 17, 13, 17, 16, 17, 17, 16, 17, 14, 17, 16, 17, 16,
        17, 16, 17, 9,
      ]),
      (e.getBounds = function (t) {
        var e = 0 | this.blurX,
          i = 0 | this.blurY;
        if (0 >= e && 0 >= i) return t;
        var s = Math.pow(this.quality, 0.2);
        return (t || new createjs.Rectangle()).pad(
          e * s + 1,
          i * s + 1,
          e * s + 1,
          i * s + 1
        );
      }),
      (e.clone = function () {
        return new t(this.blurX, this.blurY, this.quality);
      }),
      (e.toString = function () {
        return "[BlurFilter]";
      }),
      (e._applyFilter = function (e) {
        var i = this.blurX >> 1;
        if (isNaN(i) || 0 > i) return !1;
        var s = this.blurY >> 1;
        if (isNaN(s) || 0 > s) return !1;
        if (0 == i && 0 == s) return !1;
        var n = this.quality;
        (isNaN(n) || 1 > n) && (n = 1),
          (n |= 0),
          n > 3 && (n = 3),
          1 > n && (n = 1);
        var r = e.data,
          a = 0,
          o = 0,
          h = 0,
          c = 0,
          l = 0,
          u = 0,
          d = 0,
          _ = 0,
          p = 0,
          f = 0,
          m = 0,
          g = 0,
          v = 0,
          y = 0,
          b = 0,
          w = (i + i + 1) | 0,
          x = (s + s + 1) | 0,
          T = 0 | e.width,
          S = 0 | e.height,
          P = (T - 1) | 0,
          E = (S - 1) | 0,
          j = (i + 1) | 0,
          A = (s + 1) | 0,
          L = { r: 0, b: 0, g: 0, a: 0 },
          M = L;
        for (h = 1; w > h; h++) M = M.n = { r: 0, b: 0, g: 0, a: 0 };
        M.n = L;
        var R = { r: 0, b: 0, g: 0, a: 0 },
          C = R;
        for (h = 1; x > h; h++) C = C.n = { r: 0, b: 0, g: 0, a: 0 };
        C.n = R;
        for (
          var I = null,
            D = 0 | t.MUL_TABLE[i],
            O = 0 | t.SHG_TABLE[i],
            k = 0 | t.MUL_TABLE[s],
            N = 0 | t.SHG_TABLE[s];
          n-- > 0;

        ) {
          d = u = 0;
          var F = D,
            X = O;
          for (o = S; --o > -1; ) {
            for (
              _ = j * (g = r[0 | u]),
                p = j * (v = r[(u + 1) | 0]),
                f = j * (y = r[(u + 2) | 0]),
                m = j * (b = r[(u + 3) | 0]),
                M = L,
                h = j;
              --h > -1;

            )
              (M.r = g), (M.g = v), (M.b = y), (M.a = b), (M = M.n);
            for (h = 1; j > h; h++)
              (c = (u + ((h > P ? P : h) << 2)) | 0),
                (_ += M.r = r[c]),
                (p += M.g = r[c + 1]),
                (f += M.b = r[c + 2]),
                (m += M.a = r[c + 3]),
                (M = M.n);
            for (I = L, a = 0; T > a; a++)
              (r[u++] = (_ * F) >>> X),
                (r[u++] = (p * F) >>> X),
                (r[u++] = (f * F) >>> X),
                (r[u++] = (m * F) >>> X),
                (c = (d + ((c = a + i + 1) < P ? c : P)) << 2),
                (_ -= I.r - (I.r = r[c])),
                (p -= I.g - (I.g = r[c + 1])),
                (f -= I.b - (I.b = r[c + 2])),
                (m -= I.a - (I.a = r[c + 3])),
                (I = I.n);
            d += T;
          }
          for (F = k, X = N, a = 0; T > a; a++) {
            for (
              u = (a << 2) | 0,
                _ = (A * (g = r[u])) | 0,
                p = (A * (v = r[(u + 1) | 0])) | 0,
                f = (A * (y = r[(u + 2) | 0])) | 0,
                m = (A * (b = r[(u + 3) | 0])) | 0,
                C = R,
                h = 0;
              A > h;
              h++
            )
              (C.r = g), (C.g = v), (C.b = y), (C.a = b), (C = C.n);
            for (l = T, h = 1; s >= h; h++)
              (u = (l + a) << 2),
                (_ += C.r = r[u]),
                (p += C.g = r[u + 1]),
                (f += C.b = r[u + 2]),
                (m += C.a = r[u + 3]),
                (C = C.n),
                E > h && (l += T);
            if (((u = a), (I = R), n > 0))
              for (o = 0; S > o; o++)
                (c = u << 2),
                  (r[c + 3] = b = (m * F) >>> X),
                  b > 0
                    ? ((r[c] = (_ * F) >>> X),
                      (r[c + 1] = (p * F) >>> X),
                      (r[c + 2] = (f * F) >>> X))
                    : (r[c] = r[c + 1] = r[c + 2] = 0),
                  (c = (a + ((c = o + A) < E ? c : E) * T) << 2),
                  (_ -= I.r - (I.r = r[c])),
                  (p -= I.g - (I.g = r[c + 1])),
                  (f -= I.b - (I.b = r[c + 2])),
                  (m -= I.a - (I.a = r[c + 3])),
                  (I = I.n),
                  (u += T);
            else
              for (o = 0; S > o; o++)
                (c = u << 2),
                  (r[c + 3] = b = (m * F) >>> X),
                  b > 0
                    ? ((b = 255 / b),
                      (r[c] = ((_ * F) >>> X) * b),
                      (r[c + 1] = ((p * F) >>> X) * b),
                      (r[c + 2] = ((f * F) >>> X) * b))
                    : (r[c] = r[c + 1] = r[c + 2] = 0),
                  (c = (a + ((c = o + A) < E ? c : E) * T) << 2),
                  (_ -= I.r - (I.r = r[c])),
                  (p -= I.g - (I.g = r[c + 1])),
                  (f -= I.b - (I.b = r[c + 2])),
                  (m -= I.a - (I.a = r[c + 3])),
                  (I = I.n),
                  (u += T);
          }
        }
        return !0;
      }),
      (createjs.BlurFilter = createjs.promote(t, "Filter"));
  })(),
  (this.createjs = this.createjs || {}),
  (function () {
    "use strict";
    function t(t) {
      (this.alphaMap = t), (this._alphaMap = null), (this._mapData = null);
    }
    var e = createjs.extend(t, createjs.Filter);
    (e.clone = function () {
      var e = new t(this.alphaMap);
      return (e._alphaMap = this._alphaMap), (e._mapData = this._mapData), e;
    }),
      (e.toString = function () {
        return "[AlphaMapFilter]";
      }),
      (e._applyFilter = function (t) {
        if (!this.alphaMap) return !0;
        if (!this._prepAlphaMap()) return !1;
        for (
          var e = t.data, i = this._mapData, s = 0, n = e.length;
          n > s;
          s += 4
        )
          e[s + 3] = i[s] || 0;
        return !0;
      }),
      (e._prepAlphaMap = function () {
        if (!this.alphaMap) return !1;
        if (this.alphaMap == this._alphaMap && this._mapData) return !0;
        this._mapData = null;
        var t,
          e = (this._alphaMap = this.alphaMap),
          i = e;
        e instanceof HTMLCanvasElement
          ? (t = i.getContext("2d"))
          : ((i = createjs.createCanvas
              ? createjs.createCanvas()
              : document.createElement("canvas")),
            (i.width = e.width),
            (i.height = e.height),
            (t = i.getContext("2d")),
            t.drawImage(e, 0, 0));
        try {
          var s = t.getImageData(0, 0, e.width, e.height);
        } catch (n) {
          return !1;
        }
        return (this._mapData = s.data), !0;
      }),
      (createjs.AlphaMapFilter = createjs.promote(t, "Filter"));
  })(),
  (this.createjs = this.createjs || {}),
  (function () {
    "use strict";
    function t(t) {
      this.mask = t;
    }
    var e = createjs.extend(t, createjs.Filter);
    (e.applyFilter = function (t, e, i, s, n, r, a, o) {
      return (
        !this.mask ||
        ((r = r || t),
        null == a && (a = e),
        null == o && (o = i),
        r.save(),
        t == r &&
          ((r.globalCompositeOperation = "destination-in"),
          r.drawImage(this.mask, a, o),
          r.restore(),
          !0))
      );
    }),
      (e.clone = function () {
        return new t(this.mask);
      }),
      (e.toString = function () {
        return "[AlphaMaskFilter]";
      }),
      (createjs.AlphaMaskFilter = createjs.promote(t, "Filter"));
  })(),
  (this.createjs = this.createjs || {}),
  (function () {
    "use strict";
    function t(t, e, i, s, n, r, a, o) {
      (this.redMultiplier = null != t ? t : 1),
        (this.greenMultiplier = null != e ? e : 1),
        (this.blueMultiplier = null != i ? i : 1),
        (this.alphaMultiplier = null != s ? s : 1),
        (this.redOffset = n || 0),
        (this.greenOffset = r || 0),
        (this.blueOffset = a || 0),
        (this.alphaOffset = o || 0);
    }
    var e = createjs.extend(t, createjs.Filter);
    (e.toString = function () {
      return "[ColorFilter]";
    }),
      (e.clone = function () {
        return new t(
          this.redMultiplier,
          this.greenMultiplier,
          this.blueMultiplier,
          this.alphaMultiplier,
          this.redOffset,
          this.greenOffset,
          this.blueOffset,
          this.alphaOffset
        );
      }),
      (e._applyFilter = function (t) {
        for (var e = t.data, i = e.length, s = 0; i > s; s += 4)
          (e[s] = e[s] * this.redMultiplier + this.redOffset),
            (e[s + 1] = e[s + 1] * this.greenMultiplier + this.greenOffset),
            (e[s + 2] = e[s + 2] * this.blueMultiplier + this.blueOffset),
            (e[s + 3] = e[s + 3] * this.alphaMultiplier + this.alphaOffset);
        return !0;
      }),
      (createjs.ColorFilter = createjs.promote(t, "Filter"));
  })(),
  (this.createjs = this.createjs || {}),
  (function () {
    "use strict";
    function t(t, e, i, s) {
      this.setColor(t, e, i, s);
    }
    var e = t.prototype;
    (t.DELTA_INDEX = [
      0, 0.01, 0.02, 0.04, 0.05, 0.06, 0.07, 0.08, 0.1, 0.11, 0.12, 0.14, 0.15,
      0.16, 0.17, 0.18, 0.2, 0.21, 0.22, 0.24, 0.25, 0.27, 0.28, 0.3, 0.32,
      0.34, 0.36, 0.38, 0.4, 0.42, 0.44, 0.46, 0.48, 0.5, 0.53, 0.56, 0.59,
      0.62, 0.65, 0.68, 0.71, 0.74, 0.77, 0.8, 0.83, 0.86, 0.89, 0.92, 0.95,
      0.98, 1, 1.06, 1.12, 1.18, 1.24, 1.3, 1.36, 1.42, 1.48, 1.54, 1.6, 1.66,
      1.72, 1.78, 1.84, 1.9, 1.96, 2, 2.12, 2.25, 2.37, 2.5, 2.62, 2.75, 2.87,
      3, 3.2, 3.4, 3.6, 3.8, 4, 4.3, 4.7, 4.9, 5, 5.5, 6, 6.5, 6.8, 7, 7.3, 7.5,
      7.8, 8, 8.4, 8.7, 9, 9.4, 9.6, 9.8, 10,
    ]),
      (t.IDENTITY_MATRIX = [
        1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0,
        1,
      ]),
      (t.LENGTH = t.IDENTITY_MATRIX.length),
      (e.setColor = function (t, e, i, s) {
        return this.reset().adjustColor(t, e, i, s);
      }),
      (e.reset = function () {
        return this.copy(t.IDENTITY_MATRIX);
      }),
      (e.adjustColor = function (t, e, i, s) {
        return (
          this.adjustHue(s),
          this.adjustContrast(e),
          this.adjustBrightness(t),
          this.adjustSaturation(i)
        );
      }),
      (e.adjustBrightness = function (t) {
        return 0 == t || isNaN(t)
          ? this
          : ((t = this._cleanValue(t, 255)),
            this._multiplyMatrix([
              1,
              0,
              0,
              0,
              t,
              0,
              1,
              0,
              0,
              t,
              0,
              0,
              1,
              0,
              t,
              0,
              0,
              0,
              1,
              0,
              0,
              0,
              0,
              0,
              1,
            ]),
            this);
      }),
      (e.adjustContrast = function (e) {
        if (0 == e || isNaN(e)) return this;
        e = this._cleanValue(e, 100);
        var i;
        return (
          0 > e
            ? (i = 127 + (e / 100) * 127)
            : ((i = e % 1),
              (i =
                0 == i
                  ? t.DELTA_INDEX[e]
                  : t.DELTA_INDEX[e << 0] * (1 - i) +
                    t.DELTA_INDEX[(e << 0) + 1] * i),
              (i = 127 * i + 127)),
          this._multiplyMatrix([
            i / 127,
            0,
            0,
            0,
            0.5 * (127 - i),
            0,
            i / 127,
            0,
            0,
            0.5 * (127 - i),
            0,
            0,
            i / 127,
            0,
            0.5 * (127 - i),
            0,
            0,
            0,
            1,
            0,
            0,
            0,
            0,
            0,
            1,
          ]),
          this
        );
      }),
      (e.adjustSaturation = function (t) {
        if (0 == t || isNaN(t)) return this;
        t = this._cleanValue(t, 100);
        var e = 1 + (t > 0 ? (3 * t) / 100 : t / 100),
          i = 0.3086,
          s = 0.6094,
          n = 0.082;
        return (
          this._multiplyMatrix([
            i * (1 - e) + e,
            s * (1 - e),
            n * (1 - e),
            0,
            0,
            i * (1 - e),
            s * (1 - e) + e,
            n * (1 - e),
            0,
            0,
            i * (1 - e),
            s * (1 - e),
            n * (1 - e) + e,
            0,
            0,
            0,
            0,
            0,
            1,
            0,
            0,
            0,
            0,
            0,
            1,
          ]),
          this
        );
      }),
      (e.adjustHue = function (t) {
        if (0 == t || isNaN(t)) return this;
        t = (this._cleanValue(t, 180) / 180) * Math.PI;
        var e = Math.cos(t),
          i = Math.sin(t),
          s = 0.213,
          n = 0.715,
          r = 0.072;
        return (
          this._multiplyMatrix([
            s + e * (1 - s) + i * -s,
            n + e * -n + i * -n,
            r + e * -r + i * (1 - r),
            0,
            0,
            s + e * -s + 0.143 * i,
            n + e * (1 - n) + 0.14 * i,
            r + e * -r + i * -0.283,
            0,
            0,
            s + e * -s + i * -(1 - s),
            n + e * -n + i * n,
            r + e * (1 - r) + i * r,
            0,
            0,
            0,
            0,
            0,
            1,
            0,
            0,
            0,
            0,
            0,
            1,
          ]),
          this
        );
      }),
      (e.concat = function (e) {
        return (
          (e = this._fixMatrix(e)),
          e.length != t.LENGTH ? this : (this._multiplyMatrix(e), this)
        );
      }),
      (e.clone = function () {
        return new t().copy(this);
      }),
      (e.toArray = function () {
        for (var e = [], i = 0, s = t.LENGTH; s > i; i++) e[i] = this[i];
        return e;
      }),
      (e.copy = function (e) {
        for (var i = t.LENGTH, s = 0; i > s; s++) this[s] = e[s];
        return this;
      }),
      (e.toString = function () {
        return "[ColorMatrix]";
      }),
      (e._multiplyMatrix = function (t) {
        var e,
          i,
          s,
          n = [];
        for (e = 0; 5 > e; e++) {
          for (i = 0; 5 > i; i++) n[i] = this[i + 5 * e];
          for (i = 0; 5 > i; i++) {
            var r = 0;
            for (s = 0; 5 > s; s++) r += t[i + 5 * s] * n[s];
            this[i + 5 * e] = r;
          }
        }
      }),
      (e._cleanValue = function (t, e) {
        return Math.min(e, Math.max(-e, t));
      }),
      (e._fixMatrix = function (e) {
        return (
          e instanceof t && (e = e.toArray()),
          e.length < t.LENGTH
            ? (e = e
                .slice(0, e.length)
                .concat(t.IDENTITY_MATRIX.slice(e.length, t.LENGTH)))
            : e.length > t.LENGTH && (e = e.slice(0, t.LENGTH)),
          e
        );
      }),
      (createjs.ColorMatrix = t);
  })(),
  (this.createjs = this.createjs || {}),
  (function () {
    "use strict";
    function t(t) {
      this.matrix = t;
    }
    var e = createjs.extend(t, createjs.Filter);
    (e.toString = function () {
      return "[ColorMatrixFilter]";
    }),
      (e.clone = function () {
        return new t(this.matrix);
      }),
      (e._applyFilter = function (t) {
        for (
          var e,
            i,
            s,
            n,
            r = t.data,
            a = r.length,
            o = this.matrix,
            h = o[0],
            c = o[1],
            l = o[2],
            u = o[3],
            d = o[4],
            _ = o[5],
            p = o[6],
            f = o[7],
            m = o[8],
            g = o[9],
            v = o[10],
            y = o[11],
            b = o[12],
            w = o[13],
            x = o[14],
            T = o[15],
            S = o[16],
            P = o[17],
            E = o[18],
            j = o[19],
            A = 0;
          a > A;
          A += 4
        )
          (e = r[A]),
            (i = r[A + 1]),
            (s = r[A + 2]),
            (n = r[A + 3]),
            (r[A] = e * h + i * c + s * l + n * u + d),
            (r[A + 1] = e * _ + i * p + s * f + n * m + g),
            (r[A + 2] = e * v + i * y + s * b + n * w + x),
            (r[A + 3] = e * T + i * S + s * P + n * E + j);
        return !0;
      }),
      (createjs.ColorMatrixFilter = createjs.promote(t, "Filter"));
  })(),
  (this.createjs = this.createjs || {}),
  (function () {
    "use strict";
    function t() {
      throw "Touch cannot be instantiated";
    }
    (t.isSupported = function () {
      return !!(
        "ontouchstart" in window ||
        (window.navigator.msPointerEnabled &&
          window.navigator.msMaxTouchPoints > 0) ||
        (window.navigator.pointerEnabled && window.navigator.maxTouchPoints > 0)
      );
    }),
      (t.enable = function (e, i, s) {
        return (
          !!(e && e.canvas && t.isSupported()) &&
          (!!e.__touch ||
            ((e.__touch = {
              pointers: {},
              multitouch: !i,
              preventDefault: !s,
              count: 0,
            }),
            "ontouchstart" in window
              ? t._IOS_enable(e)
              : (window.navigator.msPointerEnabled ||
                  window.navigator.pointerEnabled) &&
                t._IE_enable(e),
            !0))
        );
      }),
      (t.disable = function (e) {
        e &&
          ("ontouchstart" in window
            ? t._IOS_disable(e)
            : (window.navigator.msPointerEnabled ||
                window.navigator.pointerEnabled) &&
              t._IE_disable(e),
          delete e.__touch);
      }),
      (t._IOS_enable = function (e) {
        var i = e.canvas,
          s = (e.__touch.f = function (i) {
            t._IOS_handleEvent(e, i);
          });
        i.addEventListener("touchstart", s, !1),
          i.addEventListener("touchmove", s, !1),
          i.addEventListener("touchend", s, !1),
          i.addEventListener("touchcancel", s, !1);
      }),
      (t._IOS_disable = function (t) {
        var e = t.canvas;
        if (e) {
          var i = t.__touch.f;
          e.removeEventListener("touchstart", i, !1),
            e.removeEventListener("touchmove", i, !1),
            e.removeEventListener("touchend", i, !1),
            e.removeEventListener("touchcancel", i, !1);
        }
      }),
      (t._IOS_handleEvent = function (t, e) {
        if (t) {
          t.__touch.preventDefault && e.preventDefault && e.preventDefault();
          for (
            var i = e.changedTouches, s = e.type, n = 0, r = i.length;
            r > n;
            n++
          ) {
            var a = i[n],
              o = a.identifier;
            a.target == t.canvas &&
              ("touchstart" == s
                ? this._handleStart(t, o, e, a.pageX, a.pageY)
                : "touchmove" == s
                ? this._handleMove(t, o, e, a.pageX, a.pageY)
                : ("touchend" == s || "touchcancel" == s) &&
                  this._handleEnd(t, o, e));
          }
        }
      }),
      (t._IE_enable = function (e) {
        var i = e.canvas,
          s = (e.__touch.f = function (i) {
            t._IE_handleEvent(e, i);
          });
        void 0 === window.navigator.pointerEnabled
          ? (i.addEventListener("MSPointerDown", s, !1),
            window.addEventListener("MSPointerMove", s, !1),
            window.addEventListener("MSPointerUp", s, !1),
            window.addEventListener("MSPointerCancel", s, !1),
            e.__touch.preventDefault && (i.style.msTouchAction = "none"))
          : (i.addEventListener("pointerdown", s, !1),
            window.addEventListener("pointermove", s, !1),
            window.addEventListener("pointerup", s, !1),
            window.addEventListener("pointercancel", s, !1),
            e.__touch.preventDefault && (i.style.touchAction = "none")),
          (e.__touch.activeIDs = {});
      }),
      (t._IE_disable = function (t) {
        var e = t.__touch.f;
        void 0 === window.navigator.pointerEnabled
          ? (window.removeEventListener("MSPointerMove", e, !1),
            window.removeEventListener("MSPointerUp", e, !1),
            window.removeEventListener("MSPointerCancel", e, !1),
            t.canvas && t.canvas.removeEventListener("MSPointerDown", e, !1))
          : (window.removeEventListener("pointermove", e, !1),
            window.removeEventListener("pointerup", e, !1),
            window.removeEventListener("pointercancel", e, !1),
            t.canvas && t.canvas.removeEventListener("pointerdown", e, !1));
      }),
      (t._IE_handleEvent = function (t, e) {
        if (t) {
          t.__touch.preventDefault && e.preventDefault && e.preventDefault();
          var i = e.type,
            s = e.pointerId,
            n = t.__touch.activeIDs;
          if ("MSPointerDown" == i || "pointerdown" == i) {
            if (e.srcElement != t.canvas) return;
            (n[s] = !0), this._handleStart(t, s, e, e.pageX, e.pageY);
          } else
            n[s] &&
              ("MSPointerMove" == i || "pointermove" == i
                ? this._handleMove(t, s, e, e.pageX, e.pageY)
                : ("MSPointerUp" == i ||
                    "MSPointerCancel" == i ||
                    "pointerup" == i ||
                    "pointercancel" == i) &&
                  (delete n[s], this._handleEnd(t, s, e)));
        }
      }),
      (t._handleStart = function (t, e, i, s, n) {
        var r = t.__touch;
        if (r.multitouch || !r.count) {
          var a = r.pointers;
          a[e] || ((a[e] = !0), r.count++, t._handlePointerDown(e, i, s, n));
        }
      }),
      (t._handleMove = function (t, e, i, s, n) {
        t.__touch.pointers[e] && t._handlePointerMove(e, i, s, n);
      }),
      (t._handleEnd = function (t, e, i) {
        var s = t.__touch,
          n = s.pointers;
        n[e] && (s.count--, t._handlePointerUp(e, i, !0), delete n[e]);
      }),
      (createjs.Touch = t);
  })(),
  (this.createjs = this.createjs || {}),
  (function () {
    "use strict";
    var t = (createjs.EaselJS = createjs.EaselJS || {});
    (t.version = "0.8.2"), (t.buildDate = "Thu, 26 Nov 2015 20:44:34 GMT");
  })(),
  (this.createjs = this.createjs || {}),
  (createjs.extend = function (t, e) {
    "use strict";
    function i() {
      this.constructor = t;
    }
    return (i.prototype = e.prototype), (t.prototype = new i());
  }),
  (this.createjs = this.createjs || {}),
  (createjs.promote = function (t, e) {
    "use strict";
    var i = t.prototype,
      s = (Object.getPrototypeOf && Object.getPrototypeOf(i)) || i.__proto__;
    if (s) {
      i[(e += "_") + "constructor"] = s.constructor;
      for (var n in s)
        i.hasOwnProperty(n) && "function" == typeof s[n] && (i[e + n] = s[n]);
    }
    return t;
  }),
  (this.createjs = this.createjs || {}),
  (createjs.indexOf = function (t, e) {
    "use strict";
    for (var i = 0, s = t.length; s > i; i++) if (e === t[i]) return i;
    return -1;
  }),
  (this.createjs = this.createjs || {}),
  (function () {
    "use strict";
    function t(t, e, i) {
      (this.type = t),
        (this.target = null),
        (this.currentTarget = null),
        (this.eventPhase = 0),
        (this.bubbles = !!e),
        (this.cancelable = !!i),
        (this.timeStamp = new Date().getTime()),
        (this.defaultPrevented = !1),
        (this.propagationStopped = !1),
        (this.immediatePropagationStopped = !1),
        (this.removed = !1);
    }
    var e = t.prototype;
    (e.preventDefault = function () {
      this.defaultPrevented = this.cancelable && !0;
    }),
      (e.stopPropagation = function () {
        this.propagationStopped = !0;
      }),
      (e.stopImmediatePropagation = function () {
        this.immediatePropagationStopped = this.propagationStopped = !0;
      }),
      (e.remove = function () {
        this.removed = !0;
      }),
      (e.clone = function () {
        return new t(this.type, this.bubbles, this.cancelable);
      }),
      (e.set = function (t) {
        for (var e in t) this[e] = t[e];
        return this;
      }),
      (e.toString = function () {
        return "[Event (type=" + this.type + ")]";
      }),
      (createjs.Event = t);
  })(),
  (this.createjs = this.createjs || {}),
  (function () {
    "use strict";
    function t() {
      (this._listeners = null), (this._captureListeners = null);
    }
    var e = t.prototype;
    (t.initialize = function (t) {
      (t.addEventListener = e.addEventListener),
        (t.on = e.on),
        (t.removeEventListener = t.off = e.removeEventListener),
        (t.removeAllEventListeners = e.removeAllEventListeners),
        (t.hasEventListener = e.hasEventListener),
        (t.dispatchEvent = e.dispatchEvent),
        (t._dispatchEvent = e._dispatchEvent),
        (t.willTrigger = e.willTrigger);
    }),
      (e.addEventListener = function (t, e, i) {
        var s;
        s = i
          ? (this._captureListeners = this._captureListeners || {})
          : (this._listeners = this._listeners || {});
        var n = s[t];
        return (
          n && this.removeEventListener(t, e, i),
          (n = s[t]),
          n ? n.push(e) : (s[t] = [e]),
          e
        );
      }),
      (e.on = function (t, e, i, s, n, r) {
        return (
          e.handleEvent && ((i = i || e), (e = e.handleEvent)),
          (i = i || this),
          this.addEventListener(
            t,
            function (t) {
              e.call(i, t, n), s && t.remove();
            },
            r
          )
        );
      }),
      (e.removeEventListener = function (t, e, i) {
        var s = i ? this._captureListeners : this._listeners;
        if (s) {
          var n = s[t];
          if (n)
            for (var r = 0, a = n.length; a > r; r++)
              if (n[r] == e) {
                1 == a ? delete s[t] : n.splice(r, 1);
                break;
              }
        }
      }),
      (e.off = e.removeEventListener),
      (e.removeAllEventListeners = function (t) {
        t
          ? (this._listeners && delete this._listeners[t],
            this._captureListeners && delete this._captureListeners[t])
          : (this._listeners = this._captureListeners = null);
      }),
      (e.dispatchEvent = function (t, e, i) {
        if ("string" == typeof t) {
          var s = this._listeners;
          if (!(e || (s && s[t]))) return !0;
          t = new createjs.Event(t, e, i);
        } else t.target && t.clone && (t = t.clone());
        try {
          t.target = this;
        } catch (n) {}
        if (t.bubbles && this.parent) {
          for (var r = this, a = [r]; r.parent; ) a.push((r = r.parent));
          var o,
            h = a.length;
          for (o = h - 1; o >= 0 && !t.propagationStopped; o--)
            a[o]._dispatchEvent(t, 1 + (0 == o));
          for (o = 1; h > o && !t.propagationStopped; o++)
            a[o]._dispatchEvent(t, 3);
        } else this._dispatchEvent(t, 2);
        return !t.defaultPrevented;
      }),
      (e.hasEventListener = function (t) {
        var e = this._listeners,
          i = this._captureListeners;
        return !!((e && e[t]) || (i && i[t]));
      }),
      (e.willTrigger = function (t) {
        for (var e = this; e; ) {
          if (e.hasEventListener(t)) return !0;
          e = e.parent;
        }
        return !1;
      }),
      (e.toString = function () {
        return "[EventDispatcher]";
      }),
      (e._dispatchEvent = function (t, e) {
        var i,
          s = 1 == e ? this._captureListeners : this._listeners;
        if (t && s) {
          var n = s[t.type];
          if (!n || !(i = n.length)) return;
          try {
            t.currentTarget = this;
          } catch (r) {}
          try {
            t.eventPhase = e;
          } catch (r) {}
          (t.removed = !1), (n = n.slice());
          for (var a = 0; i > a && !t.immediatePropagationStopped; a++) {
            var o = n[a];
            o.handleEvent ? o.handleEvent(t) : o(t),
              t.removed && (this.off(t.type, o, 1 == e), (t.removed = !1));
          }
        }
      }),
      (createjs.EventDispatcher = t);
  })(),
  (this.createjs = this.createjs || {}),
  (function () {
    "use strict";
    function t() {
      throw "Ticker cannot be instantiated.";
    }
    (t.RAF_SYNCHED = "synched"),
      (t.RAF = "raf"),
      (t.TIMEOUT = "timeout"),
      (t.useRAF = !1),
      (t.timingMode = null),
      (t.maxDelta = 0),
      (t.paused = !1),
      (t.removeEventListener = null),
      (t.removeAllEventListeners = null),
      (t.dispatchEvent = null),
      (t.hasEventListener = null),
      (t._listeners = null),
      createjs.EventDispatcher.initialize(t),
      (t._addEventListener = t.addEventListener),
      (t.addEventListener = function () {
        return !t._inited && t.init(), t._addEventListener.apply(t, arguments);
      }),
      (t._inited = !1),
      (t._startTime = 0),
      (t._pausedTime = 0),
      (t._ticks = 0),
      (t._pausedTicks = 0),
      (t._interval = 50),
      (t._lastTime = 0),
      (t._times = null),
      (t._tickTimes = null),
      (t._timerId = null),
      (t._raf = !0),
      (t.setInterval = function (e) {
        (t._interval = e), t._inited && t._setupTick();
      }),
      (t.getInterval = function () {
        return t._interval;
      }),
      (t.setFPS = function (e) {
        t.setInterval(1e3 / e);
      }),
      (t.getFPS = function () {
        return 1e3 / t._interval;
      });
    try {
      Object.defineProperties(t, {
        interval: { get: t.getInterval, set: t.setInterval },
        framerate: { get: t.getFPS, set: t.setFPS },
      });
    } catch (e) {
      console.log(e);
    }
    (t.init = function () {
      t._inited ||
        ((t._inited = !0),
        (t._times = []),
        (t._tickTimes = []),
        (t._startTime = t._getTime()),
        t._times.push((t._lastTime = 0)),
        (t.interval = t._interval));
    }),
      (t.reset = function () {
        if (t._raf) {
          var e =
            window.cancelAnimationFrame ||
            window.webkitCancelAnimationFrame ||
            window.mozCancelAnimationFrame ||
            window.oCancelAnimationFrame ||
            window.msCancelAnimationFrame;
          e && e(t._timerId);
        } else clearTimeout(t._timerId);
        t.removeAllEventListeners("tick"),
          (t._timerId = t._times = t._tickTimes = null),
          (t._startTime = t._lastTime = t._ticks = 0),
          (t._inited = !1);
      }),
      (t.getMeasuredTickTime = function (e) {
        var i = 0,
          s = t._tickTimes;
        if (!s || s.length < 1) return -1;
        e = Math.min(s.length, e || 0 | t.getFPS());
        for (var n = 0; e > n; n++) i += s[n];
        return i / e;
      }),
      (t.getMeasuredFPS = function (e) {
        var i = t._times;
        return !i || i.length < 2
          ? -1
          : ((e = Math.min(i.length - 1, e || 0 | t.getFPS())),
            1e3 / ((i[0] - i[e]) / e));
      }),
      (t.setPaused = function (e) {
        t.paused = e;
      }),
      (t.getPaused = function () {
        return t.paused;
      }),
      (t.getTime = function (e) {
        return t._startTime ? t._getTime() - (e ? t._pausedTime : 0) : -1;
      }),
      (t.getEventTime = function (e) {
        return t._startTime
          ? (t._lastTime || t._startTime) - (e ? t._pausedTime : 0)
          : -1;
      }),
      (t.getTicks = function (e) {
        return t._ticks - (e ? t._pausedTicks : 0);
      }),
      (t._handleSynch = function () {
        (t._timerId = null),
          t._setupTick(),
          t._getTime() - t._lastTime >= 0.97 * (t._interval - 1) && t._tick();
      }),
      (t._handleRAF = function () {
        (t._timerId = null), t._setupTick(), t._tick();
      }),
      (t._handleTimeout = function () {
        (t._timerId = null), t._setupTick(), t._tick();
      }),
      (t._setupTick = function () {
        if (null == t._timerId) {
          var e = t.timingMode || (t.useRAF && t.RAF_SYNCHED);
          if (e == t.RAF_SYNCHED || e == t.RAF) {
            var i =
              window.requestAnimationFrame ||
              window.webkitRequestAnimationFrame ||
              window.mozRequestAnimationFrame ||
              window.oRequestAnimationFrame ||
              window.msRequestAnimationFrame;
            if (i)
              return (
                (t._timerId = i(e == t.RAF ? t._handleRAF : t._handleSynch)),
                void (t._raf = !0)
              );
          }
          (t._raf = !1),
            (t._timerId = setTimeout(t._handleTimeout, t._interval));
        }
      }),
      (t._tick = function () {
        var e = t.paused,
          i = t._getTime(),
          s = i - t._lastTime;
        if (
          ((t._lastTime = i),
          t._ticks++,
          e && (t._pausedTicks++, (t._pausedTime += s)),
          t.hasEventListener("tick"))
        ) {
          var n = new createjs.Event("tick"),
            r = t.maxDelta;
          (n.delta = r && s > r ? r : s),
            (n.paused = e),
            (n.time = i),
            (n.runTime = i - t._pausedTime),
            t.dispatchEvent(n);
        }
        for (
          t._tickTimes.unshift(t._getTime() - i);
          t._tickTimes.length > 100;

        )
          t._tickTimes.pop();
        for (t._times.unshift(i); t._times.length > 100; ) t._times.pop();
      });
    var i =
      window.performance &&
      (performance.now ||
        performance.mozNow ||
        performance.msNow ||
        performance.oNow ||
        performance.webkitNow);
    (t._getTime = function () {
      return (
        ((i && i.call(performance)) || new Date().getTime()) - t._startTime
      );
    }),
      (createjs.Ticker = t);
  })(),
  (this.createjs = this.createjs || {}),
  (function () {
    "use strict";
    function t() {
      throw "UID cannot be instantiated";
    }
    (t._nextID = 0),
      (t.get = function () {
        return t._nextID++;
      }),
      (createjs.UID = t);
  })(),
  (this.createjs = this.createjs || {}),
  (function () {
    "use strict";
    function t(t, e, i, s, n, r, a, o, h, c, l) {
      this.Event_constructor(t, e, i),
        (this.stageX = s),
        (this.stageY = n),
        (this.rawX = null == h ? s : h),
        (this.rawY = null == c ? n : c),
        (this.nativeEvent = r),
        (this.pointerID = a),
        (this.primary = !!o),
        (this.relatedTarget = l);
    }
    var e = createjs.extend(t, createjs.Event);
    (e._get_localX = function () {
      return this.currentTarget.globalToLocal(this.rawX, this.rawY).x;
    }),
      (e._get_localY = function () {
        return this.currentTarget.globalToLocal(this.rawX, this.rawY).y;
      }),
      (e._get_isTouch = function () {
        return -1 !== this.pointerID;
      });
    try {
      Object.defineProperties(e, {
        localX: { get: e._get_localX },
        localY: { get: e._get_localY },
        isTouch: { get: e._get_isTouch },
      });
    } catch (i) {}
    (e.clone = function () {
      return new t(
        this.type,
        this.bubbles,
        this.cancelable,
        this.stageX,
        this.stageY,
        this.nativeEvent,
        this.pointerID,
        this.primary,
        this.rawX,
        this.rawY
      );
    }),
      (e.toString = function () {
        return (
          "[MouseEvent (type=" +
          this.type +
          " stageX=" +
          this.stageX +
          " stageY=" +
          this.stageY +
          ")]"
        );
      }),
      (createjs.MouseEvent = createjs.promote(t, "Event"));
  })(),
  (this.createjs = this.createjs || {}),
  (function () {
    "use strict";
    function t(t, e, i, s, n, r) {
      this.setValues(t, e, i, s, n, r);
    }
    var e = t.prototype;
    (t.DEG_TO_RAD = Math.PI / 180),
      (t.identity = null),
      (e.setValues = function (t, e, i, s, n, r) {
        return (
          (this.a = null == t ? 1 : t),
          (this.b = e || 0),
          (this.c = i || 0),
          (this.d = null == s ? 1 : s),
          (this.tx = n || 0),
          (this.ty = r || 0),
          this
        );
      }),
      (e.append = function (t, e, i, s, n, r) {
        var a = this.a,
          o = this.b,
          h = this.c,
          c = this.d;
        return (
          (1 != t || 0 != e || 0 != i || 1 != s) &&
            ((this.a = a * t + h * e),
            (this.b = o * t + c * e),
            (this.c = a * i + h * s),
            (this.d = o * i + c * s)),
          (this.tx = a * n + h * r + this.tx),
          (this.ty = o * n + c * r + this.ty),
          this
        );
      }),
      (e.prepend = function (t, e, i, s, n, r) {
        var a = this.a,
          o = this.c,
          h = this.tx;
        return (
          (this.a = t * a + i * this.b),
          (this.b = e * a + s * this.b),
          (this.c = t * o + i * this.d),
          (this.d = e * o + s * this.d),
          (this.tx = t * h + i * this.ty + n),
          (this.ty = e * h + s * this.ty + r),
          this
        );
      }),
      (e.appendMatrix = function (t) {
        return this.append(t.a, t.b, t.c, t.d, t.tx, t.ty);
      }),
      (e.prependMatrix = function (t) {
        return this.prepend(t.a, t.b, t.c, t.d, t.tx, t.ty);
      }),
      (e.appendTransform = function (e, i, s, n, r, a, o, h, c) {
        if (r % 360)
          var l = r * t.DEG_TO_RAD,
            u = Math.cos(l),
            d = Math.sin(l);
        else (u = 1), (d = 0);
        return (
          a || o
            ? ((a *= t.DEG_TO_RAD),
              (o *= t.DEG_TO_RAD),
              this.append(
                Math.cos(o),
                Math.sin(o),
                -Math.sin(a),
                Math.cos(a),
                e,
                i
              ),
              this.append(u * s, d * s, -d * n, u * n, 0, 0))
            : this.append(u * s, d * s, -d * n, u * n, e, i),
          (h || c) &&
            ((this.tx -= h * this.a + c * this.c),
            (this.ty -= h * this.b + c * this.d)),
          this
        );
      }),
      (e.prependTransform = function (e, i, s, n, r, a, o, h, c) {
        if (r % 360)
          var l = r * t.DEG_TO_RAD,
            u = Math.cos(l),
            d = Math.sin(l);
        else (u = 1), (d = 0);
        return (
          (h || c) && ((this.tx -= h), (this.ty -= c)),
          a || o
            ? ((a *= t.DEG_TO_RAD),
              (o *= t.DEG_TO_RAD),
              this.prepend(u * s, d * s, -d * n, u * n, 0, 0),
              this.prepend(
                Math.cos(o),
                Math.sin(o),
                -Math.sin(a),
                Math.cos(a),
                e,
                i
              ))
            : this.prepend(u * s, d * s, -d * n, u * n, e, i),
          this
        );
      }),
      (e.rotate = function (e) {
        e *= t.DEG_TO_RAD;
        var i = Math.cos(e),
          s = Math.sin(e),
          n = this.a,
          r = this.b;
        return (
          (this.a = n * i + this.c * s),
          (this.b = r * i + this.d * s),
          (this.c = -n * s + this.c * i),
          (this.d = -r * s + this.d * i),
          this
        );
      }),
      (e.skew = function (e, i) {
        return (
          (e *= t.DEG_TO_RAD),
          (i *= t.DEG_TO_RAD),
          this.append(
            Math.cos(i),
            Math.sin(i),
            -Math.sin(e),
            Math.cos(e),
            0,
            0
          ),
          this
        );
      }),
      (e.scale = function (t, e) {
        return (this.a *= t), (this.b *= t), (this.c *= e), (this.d *= e), this;
      }),
      (e.translate = function (t, e) {
        return (
          (this.tx += this.a * t + this.c * e),
          (this.ty += this.b * t + this.d * e),
          this
        );
      }),
      (e.identity = function () {
        return (
          (this.a = this.d = 1), (this.b = this.c = this.tx = this.ty = 0), this
        );
      }),
      (e.invert = function () {
        var t = this.a,
          e = this.b,
          i = this.c,
          s = this.d,
          n = this.tx,
          r = t * s - e * i;
        return (
          (this.a = s / r),
          (this.b = -e / r),
          (this.c = -i / r),
          (this.d = t / r),
          (this.tx = (i * this.ty - s * n) / r),
          (this.ty = -(t * this.ty - e * n) / r),
          this
        );
      }),
      (e.isIdentity = function () {
        return (
          0 === this.tx &&
          0 === this.ty &&
          1 === this.a &&
          0 === this.b &&
          0 === this.c &&
          1 === this.d
        );
      }),
      (e.equals = function (t) {
        return (
          this.tx === t.tx &&
          this.ty === t.ty &&
          this.a === t.a &&
          this.b === t.b &&
          this.c === t.c &&
          this.d === t.d
        );
      }),
      (e.transformPoint = function (t, e, i) {
        return (
          (i = i || {}),
          (i.x = t * this.a + e * this.c + this.tx),
          (i.y = t * this.b + e * this.d + this.ty),
          i
        );
      }),
      (e.decompose = function (e) {
        null == e && (e = {}),
          (e.x = this.tx),
          (e.y = this.ty),
          (e.scaleX = Math.sqrt(this.a * this.a + this.b * this.b)),
          (e.scaleY = Math.sqrt(this.c * this.c + this.d * this.d));
        var i = Math.atan2(-this.c, this.d),
          s = Math.atan2(this.b, this.a),
          n = Math.abs(1 - i / s);
        return (
          1e-5 > n
            ? ((e.rotation = s / t.DEG_TO_RAD),
              this.a < 0 &&
                this.d >= 0 &&
                (e.rotation += e.rotation <= 0 ? 180 : -180),
              (e.skewX = e.skewY = 0))
            : ((e.skewX = i / t.DEG_TO_RAD), (e.skewY = s / t.DEG_TO_RAD)),
          e
        );
      }),
      (e.copy = function (t) {
        return this.setValues(t.a, t.b, t.c, t.d, t.tx, t.ty);
      }),
      (e.clone = function () {
        return new t(this.a, this.b, this.c, this.d, this.tx, this.ty);
      }),
      (e.toString = function () {
        return (
          "[Matrix2D (a=" +
          this.a +
          " b=" +
          this.b +
          " c=" +
          this.c +
          " d=" +
          this.d +
          " tx=" +
          this.tx +
          " ty=" +
          this.ty +
          ")]"
        );
      }),
      (t.identity = new t()),
      (createjs.Matrix2D = t);
  })(),
  (this.createjs = this.createjs || {}),
  (function () {
    "use strict";
    function t(t, e, i, s, n) {
      this.setValues(t, e, i, s, n);
    }
    var e = t.prototype;
    (e.setValues = function (t, e, i, s, n) {
      return (
        (this.visible = null == t || !!t),
        (this.alpha = null == e ? 1 : e),
        (this.shadow = i),
        (this.compositeOperation = s),
        (this.matrix =
          n ||
          (this.matrix && this.matrix.identity()) ||
          new createjs.Matrix2D()),
        this
      );
    }),
      (e.append = function (t, e, i, s, n) {
        return (
          (this.alpha *= e),
          (this.shadow = i || this.shadow),
          (this.compositeOperation = s || this.compositeOperation),
          (this.visible = this.visible && t),
          n && this.matrix.appendMatrix(n),
          this
        );
      }),
      (e.prepend = function (t, e, i, s, n) {
        return (
          (this.alpha *= e),
          (this.shadow = this.shadow || i),
          (this.compositeOperation = this.compositeOperation || s),
          (this.visible = this.visible && t),
          n && this.matrix.prependMatrix(n),
          this
        );
      }),
      (e.identity = function () {
        return (
          (this.visible = !0),
          (this.alpha = 1),
          (this.shadow = this.compositeOperation = null),
          this.matrix.identity(),
          this
        );
      }),
      (e.clone = function () {
        return new t(
          this.alpha,
          this.shadow,
          this.compositeOperation,
          this.visible,
          this.matrix.clone()
        );
      }),
      (createjs.DisplayProps = t);
  })(),
  (this.createjs = this.createjs || {}),
  (function () {
    "use strict";
    function t(t, e) {
      this.setValues(t, e);
    }
    var e = t.prototype;
    (e.setValues = function (t, e) {
      return (this.x = t || 0), (this.y = e || 0), this;
    }),
      (e.copy = function (t) {
        return (this.x = t.x), (this.y = t.y), this;
      }),
      (e.clone = function () {
        return new t(this.x, this.y);
      }),
      (e.toString = function () {
        return "[Point (x=" + this.x + " y=" + this.y + ")]";
      }),
      (createjs.Point = t);
  })(),
  (this.createjs = this.createjs || {}),
  (function () {
    "use strict";
    function t(t, e, i, s) {
      this.setValues(t, e, i, s);
    }
    var e = t.prototype;
    (e.setValues = function (t, e, i, s) {
      return (
        (this.x = t || 0),
        (this.y = e || 0),
        (this.width = i || 0),
        (this.height = s || 0),
        this
      );
    }),
      (e.extend = function (t, e, i, s) {
        return (
          (i = i || 0),
          (s = s || 0),
          t + i > this.x + this.width && (this.width = t + i - this.x),
          e + s > this.y + this.height && (this.height = e + s - this.y),
          t < this.x && ((this.width += this.x - t), (this.x = t)),
          e < this.y && ((this.height += this.y - e), (this.y = e)),
          this
        );
      }),
      (e.pad = function (t, e, i, s) {
        return (
          (this.x -= e),
          (this.y -= t),
          (this.width += e + s),
          (this.height += t + i),
          this
        );
      }),
      (e.copy = function (t) {
        return this.setValues(t.x, t.y, t.width, t.height);
      }),
      (e.contains = function (t, e, i, s) {
        return (
          (i = i || 0),
          (s = s || 0),
          t >= this.x &&
            t + i <= this.x + this.width &&
            e >= this.y &&
            e + s <= this.y + this.height
        );
      }),
      (e.union = function (t) {
        return this.clone().extend(t.x, t.y, t.width, t.height);
      }),
      (e.intersection = function (e) {
        var i = e.x,
          s = e.y,
          n = i + e.width,
          r = s + e.height;
        return (
          this.x > i && (i = this.x),
          this.y > s && (s = this.y),
          this.x + this.width < n && (n = this.x + this.width),
          this.y + this.height < r && (r = this.y + this.height),
          i >= n || s >= r ? null : new t(i, s, n - i, r - s)
        );
      }),
      (e.intersects = function (t) {
        return (
          t.x <= this.x + this.width &&
          this.x <= t.x + t.width &&
          t.y <= this.y + this.height &&
          this.y <= t.y + t.height
        );
      }),
      (e.isEmpty = function () {
        return this.width <= 0 || this.height <= 0;
      }),
      (e.clone = function () {
        return new t(this.x, this.y, this.width, this.height);
      }),
      (e.toString = function () {
        return (
          "[Rectangle (x=" +
          this.x +
          " y=" +
          this.y +
          " width=" +
          this.width +
          " height=" +
          this.height +
          ")]"
        );
      }),
      (createjs.Rectangle = t);
  })(),
  (this.createjs = this.createjs || {}),
  (function () {
    "use strict";
    function t(t, e, i, s, n, r, a) {
      t.addEventListener &&
        ((this.target = t),
        (this.overLabel = null == i ? "over" : i),
        (this.outLabel = null == e ? "out" : e),
        (this.downLabel = null == s ? "down" : s),
        (this.play = n),
        (this._isPressed = !1),
        (this._isOver = !1),
        (this._enabled = !1),
        (t.mouseChildren = !1),
        (this.enabled = !0),
        this.handleEvent({}),
        r &&
          (a && ((r.actionsEnabled = !1), r.gotoAndStop && r.gotoAndStop(a)),
          (t.hitArea = r)));
    }
    var e = t.prototype;
    (e.setEnabled = function (t) {
      if (t != this._enabled) {
        var e = this.target;
        (this._enabled = t),
          t
            ? ((e.cursor = "pointer"),
              e.addEventListener("rollover", this),
              e.addEventListener("rollout", this),
              e.addEventListener("mousedown", this),
              e.addEventListener("pressup", this),
              e._reset && ((e.__reset = e._reset), (e._reset = this._reset)))
            : ((e.cursor = null),
              e.removeEventListener("rollover", this),
              e.removeEventListener("rollout", this),
              e.removeEventListener("mousedown", this),
              e.removeEventListener("pressup", this),
              e.__reset && ((e._reset = e.__reset), delete e.__reset));
      }
    }),
      (e.getEnabled = function () {
        return this._enabled;
      });
    try {
      Object.defineProperties(e, {
        enabled: { get: e.getEnabled, set: e.setEnabled },
      });
    } catch (i) {}
    (e.toString = function () {
      return "[ButtonHelper]";
    }),
      (e.handleEvent = function (t) {
        var e,
          i = this.target,
          s = t.type;
        "mousedown" == s
          ? ((this._isPressed = !0), (e = this.downLabel))
          : "pressup" == s
          ? ((this._isPressed = !1),
            (e = this._isOver ? this.overLabel : this.outLabel))
          : "rollover" == s
          ? ((this._isOver = !0),
            (e = this._isPressed ? this.downLabel : this.overLabel))
          : ((this._isOver = !1),
            (e = this._isPressed ? this.overLabel : this.outLabel)),
          this.play
            ? i.gotoAndPlay && i.gotoAndPlay(e)
            : i.gotoAndStop && i.gotoAndStop(e);
      }),
      (e._reset = function () {
        var t = this.paused;
        this.__reset(), (this.paused = t);
      }),
      (createjs.ButtonHelper = t);
  })(),
  (this.createjs = this.createjs || {}),
  (function () {
    "use strict";
    function t(t, e, i, s) {
      (this.color = t || "black"),
        (this.offsetX = e || 0),
        (this.offsetY = i || 0),
        (this.blur = s || 0);
    }
    var e = t.prototype;
    (t.identity = new t("transparent", 0, 0, 0)),
      (e.toString = function () {
        return "[Shadow]";
      }),
      (e.clone = function () {
        return new t(this.color, this.offsetX, this.offsetY, this.blur);
      }),
      (createjs.Shadow = t);
  })(),
  (this.createjs = this.createjs || {}),
  (function () {
    "use strict";
    function t(t) {
      this.EventDispatcher_constructor(),
        (this.complete = !0),
        (this.framerate = 0),
        (this._animations = null),
        (this._frames = null),
        (this._images = null),
        (this._data = null),
        (this._loadCount = 0),
        (this._frameHeight = 0),
        (this._frameWidth = 0),
        (this._numFrames = 0),
        (this._regX = 0),
        (this._regY = 0),
        (this._spacing = 0),
        (this._margin = 0),
        this._parseData(t);
    }
    var e = createjs.extend(t, createjs.EventDispatcher);
    e.getAnimations = function () {
      return this._animations.slice();
    };
    try {
      Object.defineProperties(e, { animations: { get: e.getAnimations } });
    } catch (i) {}
    (e.getNumFrames = function (t) {
      if (null == t)
        return this._frames ? this._frames.length : this._numFrames || 0;
      var e = this._data[t];
      return null == e ? 0 : e.frames.length;
    }),
      (e.getAnimation = function (t) {
        return this._data[t];
      }),
      (e.getFrame = function (t) {
        var e;
        return this._frames && (e = this._frames[t]) ? e : null;
      }),
      (e.getFrameBounds = function (t, e) {
        var i = this.getFrame(t);
        return i
          ? (e || new createjs.Rectangle()).setValues(
              -i.regX,
              -i.regY,
              i.rect.width,
              i.rect.height
            )
          : null;
      }),
      (e.toString = function () {
        return "[SpriteSheet]";
      }),
      (e.clone = function () {
        throw "SpriteSheet cannot be cloned.";
      }),
      (e._parseData = function (t) {
        var e, i, s, n;
        if (null != t) {
          if (
            ((this.framerate = t.framerate || 0),
            t.images && (i = t.images.length) > 0)
          )
            for (n = this._images = [], e = 0; i > e; e++) {
              var r = t.images[e];
              if ("string" == typeof r) {
                var a = r;
                (r = document.createElement("img")), (r.src = a);
              }
              n.push(r),
                r.getContext ||
                  r.naturalWidth ||
                  (this._loadCount++,
                  (this.complete = !1),
                  (function (t, e) {
                    r.onload = function () {
                      t._handleImageLoad(e);
                    };
                  })(this, a),
                  (function (t, e) {
                    r.onerror = function () {
                      t._handleImageError(e);
                    };
                  })(this, a));
            }
          if (null == t.frames);
          else if (Array.isArray(t.frames))
            for (
              this._frames = [], n = t.frames, e = 0, i = n.length;
              i > e;
              e++
            ) {
              var o = n[e];
              this._frames.push({
                image: this._images[o[4] ? o[4] : 0],
                rect: new createjs.Rectangle(o[0], o[1], o[2], o[3]),
                regX: o[5] || 0,
                regY: o[6] || 0,
              });
            }
          else
            (s = t.frames),
              (this._frameWidth = s.width),
              (this._frameHeight = s.height),
              (this._regX = s.regX || 0),
              (this._regY = s.regY || 0),
              (this._spacing = s.spacing || 0),
              (this._margin = s.margin || 0),
              (this._numFrames = s.count),
              0 == this._loadCount && this._calculateFrames();
          if (((this._animations = []), null != (s = t.animations))) {
            this._data = {};
            var h;
            for (h in s) {
              var c = { name: h },
                l = s[h];
              if ("number" == typeof l) n = c.frames = [l];
              else if (Array.isArray(l))
                if (1 == l.length) c.frames = [l[0]];
                else
                  for (
                    c.speed = l[3], c.next = l[2], n = c.frames = [], e = l[0];
                    e <= l[1];
                    e++
                  )
                    n.push(e);
              else {
                (c.speed = l.speed), (c.next = l.next);
                var u = l.frames;
                n = c.frames = "number" == typeof u ? [u] : u.slice(0);
              }
              (c.next === !0 || void 0 === c.next) && (c.next = h),
                (c.next === !1 || (n.length < 2 && c.next == h)) &&
                  (c.next = null),
                c.speed || (c.speed = 1),
                this._animations.push(h),
                (this._data[h] = c);
            }
          }
        }
      }),
      (e._handleImageLoad = function (t) {
        0 == --this._loadCount &&
          (this._calculateFrames(),
          (this.complete = !0),
          this.dispatchEvent("complete"));
      }),
      (e._handleImageError = function (t) {
        var e = new createjs.Event("error");
        (e.src = t),
          this.dispatchEvent(e),
          0 == --this._loadCount && this.dispatchEvent("complete");
      }),
      (e._calculateFrames = function () {
        if (!this._frames && 0 != this._frameWidth) {
          this._frames = [];
          var t = this._numFrames || 1e5,
            e = 0,
            i = this._frameWidth,
            s = this._frameHeight,
            n = this._spacing,
            r = this._margin;
          t: for (var a = 0, o = this._images; a < o.length; a++)
            for (
              var h = o[a], c = h.width, l = h.height, u = r;
              l - r - s >= u;

            ) {
              for (var d = r; c - r - i >= d; ) {
                if (e >= t) break t;
                e++,
                  this._frames.push({
                    image: h,
                    rect: new createjs.Rectangle(d, u, i, s),
                    regX: this._regX,
                    regY: this._regY,
                  }),
                  (d += i + n);
              }
              u += s + n;
            }
          this._numFrames = e;
        }
      }),
      (createjs.SpriteSheet = createjs.promote(t, "EventDispatcher"));
  })(),
  (this.createjs = this.createjs || {}),
  (function () {
    "use strict";
    function t() {
      (this.command = null),
        (this._stroke = null),
        (this._strokeStyle = null),
        (this._oldStrokeStyle = null),
        (this._strokeDash = null),
        (this._oldStrokeDash = null),
        (this._strokeIgnoreScale = !1),
        (this._fill = null),
        (this._instructions = []),
        (this._commitIndex = 0),
        (this._activeInstructions = []),
        (this._dirty = !1),
        (this._storeIndex = 0),
        this.clear();
    }
    var e = t.prototype,
      i = t;
    (t.getRGB = function (t, e, i, s) {
      return (
        null != t &&
          null == i &&
          ((s = e), (i = 255 & t), (e = (t >> 8) & 255), (t = (t >> 16) & 255)),
        null == s
          ? "rgb(" + t + "," + e + "," + i + ")"
          : "rgba(" + t + "," + e + "," + i + "," + s + ")"
      );
    }),
      (t.getHSL = function (t, e, i, s) {
        return null == s
          ? "hsl(" + (t % 360) + "," + e + "%," + i + "%)"
          : "hsla(" + (t % 360) + "," + e + "%," + i + "%," + s + ")";
      }),
      (t.BASE_64 = {
        A: 0,
        B: 1,
        C: 2,
        D: 3,
        E: 4,
        F: 5,
        G: 6,
        H: 7,
        I: 8,
        J: 9,
        K: 10,
        L: 11,
        M: 12,
        N: 13,
        O: 14,
        P: 15,
        Q: 16,
        R: 17,
        S: 18,
        T: 19,
        U: 20,
        V: 21,
        W: 22,
        X: 23,
        Y: 24,
        Z: 25,
        a: 26,
        b: 27,
        c: 28,
        d: 29,
        e: 30,
        f: 31,
        g: 32,
        h: 33,
        i: 34,
        j: 35,
        k: 36,
        l: 37,
        m: 38,
        n: 39,
        o: 40,
        p: 41,
        q: 42,
        r: 43,
        s: 44,
        t: 45,
        u: 46,
        v: 47,
        w: 48,
        x: 49,
        y: 50,
        z: 51,
        0: 52,
        1: 53,
        2: 54,
        3: 55,
        4: 56,
        5: 57,
        6: 58,
        7: 59,
        8: 60,
        9: 61,
        "+": 62,
        "/": 63,
      }),
      (t.STROKE_CAPS_MAP = ["butt", "round", "square"]),
      (t.STROKE_JOINTS_MAP = ["miter", "round", "bevel"]);
    var s = createjs.createCanvas
      ? createjs.createCanvas()
      : document.createElement("canvas");
    s.getContext && ((t._ctx = s.getContext("2d")), (s.width = s.height = 1)),
      (e.getInstructions = function () {
        return this._updateInstructions(), this._instructions;
      });
    try {
      Object.defineProperties(e, { instructions: { get: e.getInstructions } });
    } catch (n) {}
    (e.isEmpty = function () {
      return !(this._instructions.length || this._activeInstructions.length);
    }),
      (e.draw = function (t, e) {
        this._updateInstructions();
        for (
          var i = this._instructions, s = this._storeIndex, n = i.length;
          n > s;
          s++
        )
          i[s].exec(t, e);
      }),
      (e.drawAsPath = function (t) {
        this._updateInstructions();
        for (
          var e, i = this._instructions, s = this._storeIndex, n = i.length;
          n > s;
          s++
        )
          (e = i[s]).path !== !1 && e.exec(t);
      }),
      (e.moveTo = function (t, e) {
        return this.append(new i.MoveTo(t, e), !0);
      }),
      (e.lineTo = function (t, e) {
        return this.append(new i.LineTo(t, e));
      }),
      (e.arcTo = function (t, e, s, n, r) {
        return this.append(new i.ArcTo(t, e, s, n, r));
      }),
      (e.arc = function (t, e, s, n, r, a) {
        return this.append(new i.Arc(t, e, s, n, r, a));
      }),
      (e.quadraticCurveTo = function (t, e, s, n) {
        return this.append(new i.QuadraticCurveTo(t, e, s, n));
      }),
      (e.bezierCurveTo = function (t, e, s, n, r, a) {
        return this.append(new i.BezierCurveTo(t, e, s, n, r, a));
      }),
      (e.rect = function (t, e, s, n) {
        return this.append(new i.Rect(t, e, s, n));
      }),
      (e.closePath = function () {
        return this._activeInstructions.length
          ? this.append(new i.ClosePath())
          : this;
      }),
      (e.clear = function () {
        return (
          (this._instructions.length =
            this._activeInstructions.length =
            this._commitIndex =
              0),
          (this._strokeStyle =
            this._oldStrokeStyle =
            this._stroke =
            this._fill =
            this._strokeDash =
            this._oldStrokeDash =
              null),
          (this._dirty = this._strokeIgnoreScale = !1),
          this
        );
      }),
      (e.beginFill = function (t) {
        return this._setFill(t ? new i.Fill(t) : null);
      }),
      (e.beginLinearGradientFill = function (t, e, s, n, r, a) {
        return this._setFill(new i.Fill().linearGradient(t, e, s, n, r, a));
      }),
      (e.beginRadialGradientFill = function (t, e, s, n, r, a, o, h) {
        return this._setFill(
          new i.Fill().radialGradient(t, e, s, n, r, a, o, h)
        );
      }),
      (e.beginBitmapFill = function (t, e, s) {
        return this._setFill(new i.Fill(null, s).bitmap(t, e));
      }),
      (e.endFill = function () {
        return this.beginFill();
      }),
      (e.setStrokeStyle = function (t, e, s, n, r) {
        return (
          this._updateInstructions(!0),
          (this._strokeStyle = this.command = new i.StrokeStyle(t, e, s, n, r)),
          this._stroke && (this._stroke.ignoreScale = r),
          (this._strokeIgnoreScale = r),
          this
        );
      }),
      (e.setStrokeDash = function (t, e) {
        return (
          this._updateInstructions(!0),
          (this._strokeDash = this.command = new i.StrokeDash(t, e)),
          this
        );
      }),
      (e.beginStroke = function (t) {
        return this._setStroke(t ? new i.Stroke(t) : null);
      }),
      (e.beginLinearGradientStroke = function (t, e, s, n, r, a) {
        return this._setStroke(new i.Stroke().linearGradient(t, e, s, n, r, a));
      }),
      (e.beginRadialGradientStroke = function (t, e, s, n, r, a, o, h) {
        return this._setStroke(
          new i.Stroke().radialGradient(t, e, s, n, r, a, o, h)
        );
      }),
      (e.beginBitmapStroke = function (t, e) {
        return this._setStroke(new i.Stroke().bitmap(t, e));
      }),
      (e.endStroke = function () {
        return this.beginStroke();
      }),
      (e.curveTo = e.quadraticCurveTo),
      (e.drawRect = e.rect),
      (e.drawRoundRect = function (t, e, i, s, n) {
        return this.drawRoundRectComplex(t, e, i, s, n, n, n, n);
      }),
      (e.drawRoundRectComplex = function (t, e, s, n, r, a, o, h) {
        return this.append(new i.RoundRect(t, e, s, n, r, a, o, h));
      }),
      (e.drawCircle = function (t, e, s) {
        return this.append(new i.Circle(t, e, s));
      }),
      (e.drawEllipse = function (t, e, s, n) {
        return this.append(new i.Ellipse(t, e, s, n));
      }),
      (e.drawPolyStar = function (t, e, s, n, r, a) {
        return this.append(new i.PolyStar(t, e, s, n, r, a));
      }),
      (e.append = function (t, e) {
        return (
          this._activeInstructions.push(t),
          (this.command = t),
          e || (this._dirty = !0),
          this
        );
      }),
      (e.decodePath = function (e) {
        for (
          var i = [
              this.moveTo,
              this.lineTo,
              this.quadraticCurveTo,
              this.bezierCurveTo,
              this.closePath,
            ],
            s = [2, 2, 4, 6, 0],
            n = 0,
            r = e.length,
            a = [],
            o = 0,
            h = 0,
            c = t.BASE_64;
          r > n;

        ) {
          var l = e.charAt(n),
            u = c[l],
            d = u >> 3,
            _ = i[d];
          if (!_ || 3 & u) throw "bad path data (@" + n + "): " + l;
          var p = s[d];
          d || (o = h = 0), (a.length = 0), n++;
          for (var f = ((u >> 2) & 1) + 2, m = 0; p > m; m++) {
            var g = c[e.charAt(n)],
              v = g >> 5 ? -1 : 1;
            (g = ((31 & g) << 6) | c[e.charAt(n + 1)]),
              3 == f && (g = (g << 6) | c[e.charAt(n + 2)]),
              (g = (v * g) / 10),
              m % 2 ? (o = g += o) : (h = g += h),
              (a[m] = g),
              (n += f);
          }
          _.apply(this, a);
        }
        return this;
      }),
      (e.store = function () {
        return (
          this._updateInstructions(!0),
          (this._storeIndex = this._instructions.length),
          this
        );
      }),
      (e.unstore = function () {
        return (this._storeIndex = 0), this;
      }),
      (e.clone = function () {
        var e = new t();
        return (
          (e.command = this.command),
          (e._stroke = this._stroke),
          (e._strokeStyle = this._strokeStyle),
          (e._strokeDash = this._strokeDash),
          (e._strokeIgnoreScale = this._strokeIgnoreScale),
          (e._fill = this._fill),
          (e._instructions = this._instructions.slice()),
          (e._commitIndex = this._commitIndex),
          (e._activeInstructions = this._activeInstructions.slice()),
          (e._dirty = this._dirty),
          (e._storeIndex = this._storeIndex),
          e
        );
      }),
      (e.toString = function () {
        return "[Graphics]";
      }),
      (e.mt = e.moveTo),
      (e.lt = e.lineTo),
      (e.at = e.arcTo),
      (e.bt = e.bezierCurveTo),
      (e.qt = e.quadraticCurveTo),
      (e.a = e.arc),
      (e.r = e.rect),
      (e.cp = e.closePath),
      (e.c = e.clear),
      (e.f = e.beginFill),
      (e.lf = e.beginLinearGradientFill),
      (e.rf = e.beginRadialGradientFill),
      (e.bf = e.beginBitmapFill),
      (e.ef = e.endFill),
      (e.ss = e.setStrokeStyle),
      (e.sd = e.setStrokeDash),
      (e.s = e.beginStroke),
      (e.ls = e.beginLinearGradientStroke),
      (e.rs = e.beginRadialGradientStroke),
      (e.bs = e.beginBitmapStroke),
      (e.es = e.endStroke),
      (e.dr = e.drawRect),
      (e.rr = e.drawRoundRect),
      (e.rc = e.drawRoundRectComplex),
      (e.dc = e.drawCircle),
      (e.de = e.drawEllipse),
      (e.dp = e.drawPolyStar),
      (e.p = e.decodePath),
      (e._updateInstructions = function (e) {
        var i = this._instructions,
          s = this._activeInstructions,
          n = this._commitIndex;
        if (this._dirty && s.length) {
          (i.length = n), i.push(t.beginCmd);
          var r = s.length,
            a = i.length;
          i.length = a + r;
          for (var o = 0; r > o; o++) i[o + a] = s[o];
          this._fill && i.push(this._fill),
            this._stroke &&
              (this._strokeDash !== this._oldStrokeDash &&
                ((this._oldStrokeDash = this._strokeDash),
                i.push(this._strokeDash)),
              this._strokeStyle !== this._oldStrokeStyle &&
                ((this._oldStrokeStyle = this._strokeStyle),
                i.push(this._strokeStyle)),
              i.push(this._stroke)),
            (this._dirty = !1);
        }
        e && ((s.length = 0), (this._commitIndex = i.length));
      }),
      (e._setFill = function (t) {
        return (
          this._updateInstructions(!0), (this.command = this._fill = t), this
        );
      }),
      (e._setStroke = function (t) {
        return (
          this._updateInstructions(!0),
          (this.command = this._stroke = t) &&
            (t.ignoreScale = this._strokeIgnoreScale),
          this
        );
      }),
      ((i.LineTo = function (t, e) {
        (this.x = t), (this.y = e);
      }).prototype.exec = function (t) {
        t.lineTo(this.x, this.y);
      }),
      ((i.MoveTo = function (t, e) {
        (this.x = t), (this.y = e);
      }).prototype.exec = function (t) {
        t.moveTo(this.x, this.y);
      }),
      ((i.ArcTo = function (t, e, i, s, n) {
        (this.x1 = t),
          (this.y1 = e),
          (this.x2 = i),
          (this.y2 = s),
          (this.radius = n);
      }).prototype.exec = function (t) {
        t.arcTo(this.x1, this.y1, this.x2, this.y2, this.radius);
      }),
      ((i.Arc = function (t, e, i, s, n, r) {
        (this.x = t),
          (this.y = e),
          (this.radius = i),
          (this.startAngle = s),
          (this.endAngle = n),
          (this.anticlockwise = !!r);
      }).prototype.exec = function (t) {
        t.arc(
          this.x,
          this.y,
          this.radius,
          this.startAngle,
          this.endAngle,
          this.anticlockwise
        );
      }),
      ((i.QuadraticCurveTo = function (t, e, i, s) {
        (this.cpx = t), (this.cpy = e), (this.x = i), (this.y = s);
      }).prototype.exec = function (t) {
        t.quadraticCurveTo(this.cpx, this.cpy, this.x, this.y);
      }),
      ((i.BezierCurveTo = function (t, e, i, s, n, r) {
        (this.cp1x = t),
          (this.cp1y = e),
          (this.cp2x = i),
          (this.cp2y = s),
          (this.x = n),
          (this.y = r);
      }).prototype.exec = function (t) {
        t.bezierCurveTo(
          this.cp1x,
          this.cp1y,
          this.cp2x,
          this.cp2y,
          this.x,
          this.y
        );
      }),
      ((i.Rect = function (t, e, i, s) {
        (this.x = t), (this.y = e), (this.w = i), (this.h = s);
      }).prototype.exec = function (t) {
        t.rect(this.x, this.y, this.w, this.h);
      }),
      ((i.ClosePath = function () {}).prototype.exec = function (t) {
        t.closePath();
      }),
      ((i.BeginPath = function () {}).prototype.exec = function (t) {
        t.beginPath();
      }),
      (e = (i.Fill = function (t, e) {
        (this.style = t), (this.matrix = e);
      }).prototype),
      (e.exec = function (t) {
        if (this.style) {
          t.fillStyle = this.style;
          var e = this.matrix;
          e && (t.save(), t.transform(e.a, e.b, e.c, e.d, e.tx, e.ty)),
            t.fill(),
            e && t.restore();
        }
      }),
      (e.linearGradient = function (e, i, s, n, r, a) {
        for (
          var o = (this.style = t._ctx.createLinearGradient(s, n, r, a)),
            h = 0,
            c = e.length;
          c > h;
          h++
        )
          o.addColorStop(i[h], e[h]);
        return (
          (o.props = {
            colors: e,
            ratios: i,
            x0: s,
            y0: n,
            x1: r,
            y1: a,
            type: "linear",
          }),
          this
        );
      }),
      (e.radialGradient = function (e, i, s, n, r, a, o, h) {
        for (
          var c = (this.style = t._ctx.createRadialGradient(s, n, r, a, o, h)),
            l = 0,
            u = e.length;
          u > l;
          l++
        )
          c.addColorStop(i[l], e[l]);
        return (
          (c.props = {
            colors: e,
            ratios: i,
            x0: s,
            y0: n,
            r0: r,
            x1: a,
            y1: o,
            r1: h,
            type: "radial",
          }),
          this
        );
      }),
      (e.bitmap = function (e, i) {
        if (e.naturalWidth || e.getContext || e.readyState >= 2) {
          var s = (this.style = t._ctx.createPattern(e, i || ""));
          s.props = { image: e, repetition: i, type: "bitmap" };
        }
        return this;
      }),
      (e.path = !1),
      (e = (i.Stroke = function (t, e) {
        (this.style = t), (this.ignoreScale = e);
      }).prototype),
      (e.exec = function (t) {
        this.style &&
          ((t.strokeStyle = this.style),
          this.ignoreScale && (t.save(), t.setTransform(1, 0, 0, 1, 0, 0)),
          t.stroke(),
          this.ignoreScale && t.restore());
      }),
      (e.linearGradient = i.Fill.prototype.linearGradient),
      (e.radialGradient = i.Fill.prototype.radialGradient),
      (e.bitmap = i.Fill.prototype.bitmap),
      (e.path = !1),
      (e = (i.StrokeStyle = function (t, e, i, s, n) {
        (this.width = t),
          (this.caps = e),
          (this.joints = i),
          (this.miterLimit = s),
          (this.ignoreScale = n);
      }).prototype),
      (e.exec = function (e) {
        (e.lineWidth = null == this.width ? "1" : this.width),
          (e.lineCap =
            null == this.caps
              ? "butt"
              : isNaN(this.caps)
              ? this.caps
              : t.STROKE_CAPS_MAP[this.caps]),
          (e.lineJoin =
            null == this.joints
              ? "miter"
              : isNaN(this.joints)
              ? this.joints
              : t.STROKE_JOINTS_MAP[this.joints]),
          (e.miterLimit = null == this.miterLimit ? "10" : this.miterLimit),
          (e.ignoreScale = null != this.ignoreScale && this.ignoreScale);
      }),
      (e.path = !1),
      ((i.StrokeDash = function (t, e) {
        (this.segments = t), (this.offset = e || 0);
      }).prototype.exec = function (t) {
        t.setLineDash &&
          (t.setLineDash(this.segments || i.StrokeDash.EMPTY_SEGMENTS),
          (t.lineDashOffset = this.offset || 0));
      }),
      (i.StrokeDash.EMPTY_SEGMENTS = []),
      ((i.RoundRect = function (t, e, i, s, n, r, a, o) {
        (this.x = t),
          (this.y = e),
          (this.w = i),
          (this.h = s),
          (this.radiusTL = n),
          (this.radiusTR = r),
          (this.radiusBR = a),
          (this.radiusBL = o);
      }).prototype.exec = function (t) {
        var e = (c > h ? h : c) / 2,
          i = 0,
          s = 0,
          n = 0,
          r = 0,
          a = this.x,
          o = this.y,
          h = this.w,
          c = this.h,
          l = this.radiusTL,
          u = this.radiusTR,
          d = this.radiusBR,
          _ = this.radiusBL;
        0 > l && (l *= i = -1),
          l > e && (l = e),
          0 > u && (u *= s = -1),
          u > e && (u = e),
          0 > d && (d *= n = -1),
          d > e && (d = e),
          0 > _ && (_ *= r = -1),
          _ > e && (_ = e),
          t.moveTo(a + h - u, o),
          t.arcTo(a + h + u * s, o - u * s, a + h, o + u, u),
          t.lineTo(a + h, o + c - d),
          t.arcTo(a + h + d * n, o + c + d * n, a + h - d, o + c, d),
          t.lineTo(a + _, o + c),
          t.arcTo(a - _ * r, o + c + _ * r, a, o + c - _, _),
          t.lineTo(a, o + l),
          t.arcTo(a - l * i, o - l * i, a + l, o, l),
          t.closePath();
      }),
      ((i.Circle = function (t, e, i) {
        (this.x = t), (this.y = e), (this.radius = i);
      }).prototype.exec = function (t) {
        t.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
      }),
      ((i.Ellipse = function (t, e, i, s) {
        (this.x = t), (this.y = e), (this.w = i), (this.h = s);
      }).prototype.exec = function (t) {
        var e = this.x,
          i = this.y,
          s = this.w,
          n = this.h,
          r = 0.5522848,
          a = (s / 2) * r,
          o = (n / 2) * r,
          h = e + s,
          c = i + n,
          l = e + s / 2,
          u = i + n / 2;
        t.moveTo(e, u),
          t.bezierCurveTo(e, u - o, l - a, i, l, i),
          t.bezierCurveTo(l + a, i, h, u - o, h, u),
          t.bezierCurveTo(h, u + o, l + a, c, l, c),
          t.bezierCurveTo(l - a, c, e, u + o, e, u);
      }),
      ((i.PolyStar = function (t, e, i, s, n, r) {
        (this.x = t),
          (this.y = e),
          (this.radius = i),
          (this.sides = s),
          (this.pointSize = n),
          (this.angle = r);
      }).prototype.exec = function (t) {
        var e = this.x,
          i = this.y,
          s = this.radius,
          n = ((this.angle || 0) / 180) * Math.PI,
          r = this.sides,
          a = 1 - (this.pointSize || 0),
          o = Math.PI / r;
        t.moveTo(e + Math.cos(n) * s, i + Math.sin(n) * s);
        for (var h = 0; r > h; h++)
          (n += o),
            1 != a &&
              t.lineTo(e + Math.cos(n) * s * a, i + Math.sin(n) * s * a),
            (n += o),
            t.lineTo(e + Math.cos(n) * s, i + Math.sin(n) * s);
        t.closePath();
      }),
      (t.beginCmd = new i.BeginPath()),
      (createjs.Graphics = t);
  })(),
  (this.createjs = this.createjs || {}),
  (function () {
    "use strict";
    function t() {
      this.EventDispatcher_constructor(),
        (this.alpha = 1),
        (this.cacheCanvas = null),
        (this.cacheID = 0),
        (this.id = createjs.UID.get()),
        (this.mouseEnabled = !0),
        (this.tickEnabled = !0),
        (this.name = null),
        (this.parent = null),
        (this.regX = 0),
        (this.regY = 0),
        (this.rotation = 0),
        (this.scaleX = 1),
        (this.scaleY = 1),
        (this.skewX = 0),
        (this.skewY = 0),
        (this.shadow = null),
        (this.visible = !0),
        (this.x = 0),
        (this.y = 0),
        (this.transformMatrix = null),
        (this.compositeOperation = null),
        (this.snapToPixel = !0),
        (this.filters = null),
        (this.mask = null),
        (this.hitArea = null),
        (this.cursor = null),
        (this._cacheOffsetX = 0),
        (this._cacheOffsetY = 0),
        (this._filterOffsetX = 0),
        (this._filterOffsetY = 0),
        (this._cacheScale = 1),
        (this._cacheDataURLID = 0),
        (this._cacheDataURL = null),
        (this._props = new createjs.DisplayProps()),
        (this._rectangle = new createjs.Rectangle()),
        (this._bounds = null);
    }
    var e = createjs.extend(t, createjs.EventDispatcher);
    (t._MOUSE_EVENTS = [
      "click",
      "dblclick",
      "mousedown",
      "mouseout",
      "mouseover",
      "pressmove",
      "pressup",
      "rollout",
      "rollover",
    ]),
      (t.suppressCrossDomainErrors = !1),
      (t._snapToPixelEnabled = !1);
    var i = createjs.createCanvas
      ? createjs.createCanvas()
      : document.createElement("canvas");
    i.getContext &&
      ((t._hitTestCanvas = i),
      (t._hitTestContext = i.getContext("2d")),
      (i.width = i.height = 1)),
      (t._nextCacheID = 1),
      (e.getStage = function () {
        for (var t = this, e = createjs.Stage; t.parent; ) t = t.parent;
        return t instanceof e ? t : null;
      });
    try {
      Object.defineProperties(e, { stage: { get: e.getStage } });
    } catch (s) {}
    (e.isVisible = function () {
      return !!(
        this.visible &&
        this.alpha > 0 &&
        0 != this.scaleX &&
        0 != this.scaleY
      );
    }),
      (e.draw = function (t, e) {
        var i = this.cacheCanvas;
        if (e || !i) return !1;
        var s = this._cacheScale;
        return (
          t.drawImage(
            i,
            this._cacheOffsetX + this._filterOffsetX,
            this._cacheOffsetY + this._filterOffsetY,
            i.width / s,
            i.height / s
          ),
          !0
        );
      }),
      (e.updateContext = function (e) {
        var i = this,
          s = i.mask,
          n = i._props.matrix;
        s &&
          s.graphics &&
          !s.graphics.isEmpty() &&
          (s.getMatrix(n),
          e.transform(n.a, n.b, n.c, n.d, n.tx, n.ty),
          s.graphics.drawAsPath(e),
          e.clip(),
          n.invert(),
          e.transform(n.a, n.b, n.c, n.d, n.tx, n.ty)),
          this.getMatrix(n);
        var r = n.tx,
          a = n.ty;
        t._snapToPixelEnabled &&
          i.snapToPixel &&
          ((r = (r + (0 > r ? -0.5 : 0.5)) | 0),
          (a = (a + (0 > a ? -0.5 : 0.5)) | 0)),
          e.transform(n.a, n.b, n.c, n.d, r, a),
          (e.globalAlpha *= i.alpha),
          i.compositeOperation &&
            (e.globalCompositeOperation = i.compositeOperation),
          i.shadow && this._applyShadow(e, i.shadow);
      }),
      (e.cache = function (t, e, i, s, n) {
        (n = n || 1),
          this.cacheCanvas ||
            (this.cacheCanvas = createjs.createCanvas
              ? createjs.createCanvas()
              : document.createElement("canvas")),
          (this._cacheWidth = i),
          (this._cacheHeight = s),
          (this._cacheOffsetX = t),
          (this._cacheOffsetY = e),
          (this._cacheScale = n),
          this.updateCache();
      }),
      (e.updateCache = function (e) {
        var i = this.cacheCanvas;
        if (!i) throw "cache() must be called before updateCache()";
        var s = this._cacheScale,
          n = this._cacheOffsetX * s,
          r = this._cacheOffsetY * s,
          a = this._cacheWidth,
          o = this._cacheHeight,
          h = i.getContext("2d"),
          c = this._getFilterBounds();
        (n += this._filterOffsetX = c.x),
          (r += this._filterOffsetY = c.y),
          (a = Math.ceil(a * s) + c.width),
          (o = Math.ceil(o * s) + c.height),
          a != i.width || o != i.height
            ? ((i.width = a), (i.height = o))
            : e || h.clearRect(0, 0, a + 1, o + 1),
          h.save(),
          (h.globalCompositeOperation = e),
          h.setTransform(s, 0, 0, s, -n, -r),
          this.draw(h, !0),
          this._applyFilters(),
          h.restore(),
          (this.cacheID = t._nextCacheID++);
      }),
      (e.uncache = function () {
        (this._cacheDataURL = this.cacheCanvas = null),
          (this.cacheID =
            this._cacheOffsetX =
            this._cacheOffsetY =
            this._filterOffsetX =
            this._filterOffsetY =
              0),
          (this._cacheScale = 1);
      }),
      (e.getCacheDataURL = function () {
        return this.cacheCanvas
          ? (this.cacheID != this._cacheDataURLID &&
              (this._cacheDataURL = this.cacheCanvas.toDataURL()),
            this._cacheDataURL)
          : null;
      }),
      (e.localToGlobal = function (t, e, i) {
        return this.getConcatenatedMatrix(this._props.matrix).transformPoint(
          t,
          e,
          i || new createjs.Point()
        );
      }),
      (e.globalToLocal = function (t, e, i) {
        return this.getConcatenatedMatrix(this._props.matrix)
          .invert()
          .transformPoint(t, e, i || new createjs.Point());
      }),
      (e.localToLocal = function (t, e, i, s) {
        return (s = this.localToGlobal(t, e, s)), i.globalToLocal(s.x, s.y, s);
      }),
      (e.setTransform = function (t, e, i, s, n, r, a, o, h) {
        return (
          (this.x = t || 0),
          (this.y = e || 0),
          (this.scaleX = null == i ? 1 : i),
          (this.scaleY = null == s ? 1 : s),
          (this.rotation = n || 0),
          (this.skewX = r || 0),
          (this.skewY = a || 0),
          (this.regX = o || 0),
          (this.regY = h || 0),
          this
        );
      }),
      (e.getMatrix = function (t) {
        var e = this,
          i = (t && t.identity()) || new createjs.Matrix2D();
        return e.transformMatrix
          ? i.copy(e.transformMatrix)
          : i.appendTransform(
              e.x,
              e.y,
              e.scaleX,
              e.scaleY,
              e.rotation,
              e.skewX,
              e.skewY,
              e.regX,
              e.regY
            );
      }),
      (e.getConcatenatedMatrix = function (t) {
        for (var e = this, i = this.getMatrix(t); (e = e.parent); )
          i.prependMatrix(e.getMatrix(e._props.matrix));
        return i;
      }),
      (e.getConcatenatedDisplayProps = function (t) {
        t = t ? t.identity() : new createjs.DisplayProps();
        var e = this,
          i = e.getMatrix(t.matrix);
        do
          t.prepend(e.visible, e.alpha, e.shadow, e.compositeOperation),
            e != this && i.prependMatrix(e.getMatrix(e._props.matrix));
        while ((e = e.parent));
        return t;
      }),
      (e.hitTest = function (e, i) {
        var s = t._hitTestContext;
        s.setTransform(1, 0, 0, 1, -e, -i), this.draw(s);
        var n = this._testHit(s);
        return s.setTransform(1, 0, 0, 1, 0, 0), s.clearRect(0, 0, 2, 2), n;
      }),
      (e.set = function (t) {
        for (var e in t) this[e] = t[e];
        return this;
      }),
      (e.getBounds = function () {
        if (this._bounds) return this._rectangle.copy(this._bounds);
        var t = this.cacheCanvas;
        if (t) {
          var e = this._cacheScale;
          return this._rectangle.setValues(
            this._cacheOffsetX,
            this._cacheOffsetY,
            t.width / e,
            t.height / e
          );
        }
        return null;
      }),
      (e.getTransformedBounds = function () {
        return this._getBounds();
      }),
      (e.setBounds = function (t, e, i, s) {
        null == t && (this._bounds = t),
          (this._bounds = (this._bounds || new createjs.Rectangle()).setValues(
            t,
            e,
            i,
            s
          ));
      }),
      (e.clone = function () {
        return this._cloneProps(new t());
      }),
      (e.toString = function () {
        return "[DisplayObject (name=" + this.name + ")]";
      }),
      (e._cloneProps = function (t) {
        return (
          (t.alpha = this.alpha),
          (t.mouseEnabled = this.mouseEnabled),
          (t.tickEnabled = this.tickEnabled),
          (t.name = this.name),
          (t.regX = this.regX),
          (t.regY = this.regY),
          (t.rotation = this.rotation),
          (t.scaleX = this.scaleX),
          (t.scaleY = this.scaleY),
          (t.shadow = this.shadow),
          (t.skewX = this.skewX),
          (t.skewY = this.skewY),
          (t.visible = this.visible),
          (t.x = this.x),
          (t.y = this.y),
          (t.compositeOperation = this.compositeOperation),
          (t.snapToPixel = this.snapToPixel),
          (t.filters = null == this.filters ? null : this.filters.slice(0)),
          (t.mask = this.mask),
          (t.hitArea = this.hitArea),
          (t.cursor = this.cursor),
          (t._bounds = this._bounds),
          t
        );
      }),
      (e._applyShadow = function (t, e) {
        (e = e || Shadow.identity),
          (t.shadowColor = e.color),
          (t.shadowOffsetX = e.offsetX),
          (t.shadowOffsetY = e.offsetY),
          (t.shadowBlur = e.blur);
      }),
      (e._tick = function (t) {
        var e = this._listeners;
        e &&
          e.tick &&
          ((t.target = null),
          (t.propagationStopped = t.immediatePropagationStopped = !1),
          this.dispatchEvent(t));
      }),
      (e._testHit = function (e) {
        try {
          var i = e.getImageData(0, 0, 1, 1).data[3] > 1;
        } catch (s) {
          if (!t.suppressCrossDomainErrors)
            throw "An error has occurred. This is most likely due to security restrictions on reading canvas pixel data with local or cross-domain images.";
        }
        return i;
      }),
      (e._applyFilters = function () {
        if (this.filters && 0 != this.filters.length && this.cacheCanvas)
          for (
            var t = this.filters.length,
              e = this.cacheCanvas.getContext("2d"),
              i = this.cacheCanvas.width,
              s = this.cacheCanvas.height,
              n = 0;
            t > n;
            n++
          )
            this.filters[n].applyFilter(e, 0, 0, i, s);
      }),
      (e._getFilterBounds = function (t) {
        var e,
          i = this.filters,
          s = this._rectangle.setValues(0, 0, 0, 0);
        if (!i || !(e = i.length)) return s;
        for (var n = 0; e > n; n++) {
          var r = this.filters[n];
          r.getBounds && r.getBounds(s);
        }
        return s;
      }),
      (e._getBounds = function (t, e) {
        return this._transformBounds(this.getBounds(), t, e);
      }),
      (e._transformBounds = function (t, e, i) {
        if (!t) return t;
        var s = t.x,
          n = t.y,
          r = t.width,
          a = t.height,
          o = this._props.matrix;
        (o = i ? o.identity() : this.getMatrix(o)),
          (s || n) && o.appendTransform(0, 0, 1, 1, 0, 0, 0, -s, -n),
          e && o.prependMatrix(e);
        var h = r * o.a,
          c = r * o.b,
          l = a * o.c,
          u = a * o.d,
          d = o.tx,
          _ = o.ty,
          p = d,
          f = d,
          m = _,
          g = _;
        return (
          (s = h + d) < p ? (p = s) : s > f && (f = s),
          (s = h + l + d) < p ? (p = s) : s > f && (f = s),
          (s = l + d) < p ? (p = s) : s > f && (f = s),
          (n = c + _) < m ? (m = n) : n > g && (g = n),
          (n = c + u + _) < m ? (m = n) : n > g && (g = n),
          (n = u + _) < m ? (m = n) : n > g && (g = n),
          t.setValues(p, m, f - p, g - m)
        );
      }),
      (e._hasMouseEventListener = function () {
        for (var e = t._MOUSE_EVENTS, i = 0, s = e.length; s > i; i++)
          if (this.hasEventListener(e[i])) return !0;
        return !!this.cursor;
      }),
      (createjs.DisplayObject = createjs.promote(t, "EventDispatcher"));
  })(),
  (this.createjs = this.createjs || {}),
  (function () {
    "use strict";
    function t() {
      this.DisplayObject_constructor(),
        (this.children = []),
        (this.mouseChildren = !0),
        (this.tickChildren = !0);
    }
    var e = createjs.extend(t, createjs.DisplayObject);
    e.getNumChildren = function () {
      return this.children.length;
    };
    try {
      Object.defineProperties(e, { numChildren: { get: e.getNumChildren } });
    } catch (i) {}
    (e.initialize = t),
      (e.isVisible = function () {
        var t = this.cacheCanvas || this.children.length;
        return !!(
          this.visible &&
          this.alpha > 0 &&
          0 != this.scaleX &&
          0 != this.scaleY &&
          t
        );
      }),
      (e.draw = function (t, e) {
        if (this.DisplayObject_draw(t, e)) return !0;
        for (var i = this.children.slice(), s = 0, n = i.length; n > s; s++) {
          var r = i[s];
          r.isVisible() &&
            (t.save(), r.updateContext(t), r.draw(t), t.restore());
        }
        return !0;
      }),
      (e.addChild = function (t) {
        if (null == t) return t;
        var e = arguments.length;
        if (e > 1) {
          for (var i = 0; e > i; i++) this.addChild(arguments[i]);
          return arguments[e - 1];
        }
        return (
          t.parent && t.parent.removeChild(t),
          (t.parent = this),
          this.children.push(t),
          t.dispatchEvent("added"),
          t
        );
      }),
      (e.addChildAt = function (t, e) {
        var i = arguments.length,
          s = arguments[i - 1];
        if (0 > s || s > this.children.length) return arguments[i - 2];
        if (i > 2) {
          for (var n = 0; i - 1 > n; n++) this.addChildAt(arguments[n], s + n);
          return arguments[i - 2];
        }
        return (
          t.parent && t.parent.removeChild(t),
          (t.parent = this),
          this.children.splice(e, 0, t),
          t.dispatchEvent("added"),
          t
        );
      }),
      (e.removeChild = function (t) {
        var e = arguments.length;
        if (e > 1) {
          for (var i = !0, s = 0; e > s; s++)
            i = i && this.removeChild(arguments[s]);
          return i;
        }
        return this.removeChildAt(createjs.indexOf(this.children, t));
      }),
      (e.removeChildAt = function (t) {
        var e = arguments.length;
        if (e > 1) {
          for (var i = [], s = 0; e > s; s++) i[s] = arguments[s];
          i.sort(function (t, e) {
            return e - t;
          });
          for (var n = !0, s = 0; e > s; s++) n = n && this.removeChildAt(i[s]);
          return n;
        }
        if (0 > t || t > this.children.length - 1) return !1;
        var r = this.children[t];
        return (
          r && (r.parent = null),
          this.children.splice(t, 1),
          r.dispatchEvent("removed"),
          !0
        );
      }),
      (e.removeAllChildren = function () {
        for (var t = this.children; t.length; ) this.removeChildAt(0);
      }),
      (e.getChildAt = function (t) {
        return this.children[t];
      }),
      (e.getChildByName = function (t) {
        for (var e = this.children, i = 0, s = e.length; s > i; i++)
          if (e[i].name == t) return e[i];
        return null;
      }),
      (e.sortChildren = function (t) {
        this.children.sort(t);
      }),
      (e.getChildIndex = function (t) {
        return createjs.indexOf(this.children, t);
      }),
      (e.swapChildrenAt = function (t, e) {
        var i = this.children,
          s = i[t],
          n = i[e];
        s && n && ((i[t] = n), (i[e] = s));
      }),
      (e.swapChildren = function (t, e) {
        for (
          var i, s, n = this.children, r = 0, a = n.length;
          a > r &&
          (n[r] == t && (i = r), n[r] == e && (s = r), null == i || null == s);
          r++
        );
        r != a && ((n[i] = e), (n[s] = t));
      }),
      (e.setChildIndex = function (t, e) {
        var i = this.children,
          s = i.length;
        if (!(t.parent != this || 0 > e || e >= s)) {
          for (var n = 0; s > n && i[n] != t; n++);
          n != s && n != e && (i.splice(n, 1), i.splice(e, 0, t));
        }
      }),
      (e.contains = function (t) {
        for (; t; ) {
          if (t == this) return !0;
          t = t.parent;
        }
        return !1;
      }),
      (e.hitTest = function (t, e) {
        return null != this.getObjectUnderPoint(t, e);
      }),
      (e.getObjectsUnderPoint = function (t, e, i) {
        var s = [],
          n = this.localToGlobal(t, e);
        return this._getObjectsUnderPoint(n.x, n.y, s, i > 0, 1 == i), s;
      }),
      (e.getObjectUnderPoint = function (t, e, i) {
        var s = this.localToGlobal(t, e);
        return this._getObjectsUnderPoint(s.x, s.y, null, i > 0, 1 == i);
      }),
      (e.getBounds = function () {
        return this._getBounds(null, !0);
      }),
      (e.getTransformedBounds = function () {
        return this._getBounds();
      }),
      (e.clone = function (e) {
        var i = this._cloneProps(new t());
        return e && this._cloneChildren(i), i;
      }),
      (e.toString = function () {
        return "[Container (name=" + this.name + ")]";
      }),
      (e._tick = function (t) {
        if (this.tickChildren)
          for (var e = this.children.length - 1; e >= 0; e--) {
            var i = this.children[e];
            i.tickEnabled && i._tick && i._tick(t);
          }
        this.DisplayObject__tick(t);
      }),
      (e._cloneChildren = function (t) {
        t.children.length && t.removeAllChildren();
        for (var e = t.children, i = 0, s = this.children.length; s > i; i++) {
          var n = this.children[i].clone(!0);
          (n.parent = t), e.push(n);
        }
      }),
      (e._getObjectsUnderPoint = function (e, i, s, n, r, a) {
        if (((a = a || 0), !a && !this._testMask(this, e, i))) return null;
        var o,
          h = createjs.DisplayObject._hitTestContext;
        r = r || (n && this._hasMouseEventListener());
        for (var c = this.children, l = c.length, u = l - 1; u >= 0; u--) {
          var d = c[u],
            _ = d.hitArea;
          if (
            d.visible &&
            (_ || d.isVisible()) &&
            (!n || d.mouseEnabled) &&
            (_ || this._testMask(d, e, i))
          )
            if (!_ && d instanceof t) {
              var p = d._getObjectsUnderPoint(e, i, s, n, r, a + 1);
              if (!s && p) return n && !this.mouseChildren ? this : p;
            } else {
              if (n && !r && !d._hasMouseEventListener()) continue;
              var f = d.getConcatenatedDisplayProps(d._props);
              if (
                ((o = f.matrix),
                _ &&
                  (o.appendMatrix(_.getMatrix(_._props.matrix)),
                  (f.alpha = _.alpha)),
                (h.globalAlpha = f.alpha),
                h.setTransform(o.a, o.b, o.c, o.d, o.tx - e, o.ty - i),
                (_ || d).draw(h),
                !this._testHit(h))
              )
                continue;
              if (
                (h.setTransform(1, 0, 0, 1, 0, 0), h.clearRect(0, 0, 2, 2), !s)
              )
                return n && !this.mouseChildren ? this : d;
              s.push(d);
            }
        }
        return null;
      }),
      (e._testMask = function (t, e, i) {
        var s = t.mask;
        if (!s || !s.graphics || s.graphics.isEmpty()) return !0;
        var n = this._props.matrix,
          r = t.parent;
        (n = r ? r.getConcatenatedMatrix(n) : n.identity()),
          (n = s.getMatrix(s._props.matrix).prependMatrix(n));
        var a = createjs.DisplayObject._hitTestContext;
        return (
          a.setTransform(n.a, n.b, n.c, n.d, n.tx - e, n.ty - i),
          s.graphics.drawAsPath(a),
          (a.fillStyle = "#000"),
          a.fill(),
          !!this._testHit(a) &&
            (a.setTransform(1, 0, 0, 1, 0, 0), a.clearRect(0, 0, 2, 2), !0)
        );
      }),
      (e._getBounds = function (t, e) {
        var i = this.DisplayObject_getBounds();
        if (i) return this._transformBounds(i, t, e);
        var s = this._props.matrix;
        (s = e ? s.identity() : this.getMatrix(s)), t && s.prependMatrix(t);
        for (var n = this.children.length, r = null, a = 0; n > a; a++) {
          var o = this.children[a];
          o.visible &&
            (i = o._getBounds(s)) &&
            (r ? r.extend(i.x, i.y, i.width, i.height) : (r = i.clone()));
        }
        return r;
      }),
      (createjs.Container = createjs.promote(t, "DisplayObject"));
  })(),
  (this.createjs = this.createjs || {}),
  (function () {
    "use strict";
    function t(t) {
      this.Container_constructor(),
        (this.autoClear = !0),
        (this.canvas = "string" == typeof t ? document.getElementById(t) : t),
        (this.mouseX = 0),
        (this.mouseY = 0),
        (this.drawRect = null),
        (this.snapToPixelEnabled = !1),
        (this.mouseInBounds = !1),
        (this.tickOnUpdate = !0),
        (this.mouseMoveOutside = !1),
        (this.preventSelection = !0),
        (this._pointerData = {}),
        (this._pointerCount = 0),
        (this._primaryPointerID = null),
        (this._mouseOverIntervalID = null),
        (this._nextStage = null),
        (this._prevStage = null),
        this.enableDOMEvents(!0);
    }
    var e = createjs.extend(t, createjs.Container);
    (e._get_nextStage = function () {
      return this._nextStage;
    }),
      (e._set_nextStage = function (t) {
        this._nextStage && (this._nextStage._prevStage = null),
          t && (t._prevStage = this),
          (this._nextStage = t);
      });
    try {
      Object.defineProperties(e, {
        nextStage: { get: e._get_nextStage, set: e._set_nextStage },
      });
    } catch (i) {}
    (e.update = function (t) {
      if (
        this.canvas &&
        (this.tickOnUpdate && this.tick(t),
        this.dispatchEvent("drawstart", !1, !0) !== !1)
      ) {
        createjs.DisplayObject._snapToPixelEnabled = this.snapToPixelEnabled;
        var e = this.drawRect,
          i = this.canvas.getContext("2d");
        i.setTransform(1, 0, 0, 1, 0, 0),
          this.autoClear &&
            (e
              ? i.clearRect(e.x, e.y, e.width, e.height)
              : i.clearRect(
                  0,
                  0,
                  this.canvas.width + 1,
                  this.canvas.height + 1
                )),
          i.save(),
          this.drawRect &&
            (i.beginPath(), i.rect(e.x, e.y, e.width, e.height), i.clip()),
          this.updateContext(i),
          this.draw(i, !1),
          i.restore(),
          this.dispatchEvent("drawend");
      }
    }),
      (e.tick = function (t) {
        if (
          this.tickEnabled &&
          this.dispatchEvent("tickstart", !1, !0) !== !1
        ) {
          var e = new createjs.Event("tick");
          if (t) for (var i in t) t.hasOwnProperty(i) && (e[i] = t[i]);
          this._tick(e), this.dispatchEvent("tickend");
        }
      }),
      (e.handleEvent = function (t) {
        "tick" == t.type && this.update(t);
      }),
      (e.clear = function () {
        if (this.canvas) {
          var t = this.canvas.getContext("2d");
          t.setTransform(1, 0, 0, 1, 0, 0),
            t.clearRect(0, 0, this.canvas.width + 1, this.canvas.height + 1);
        }
      }),
      (e.toDataURL = function (t, e) {
        var i,
          s = this.canvas.getContext("2d"),
          n = this.canvas.width,
          r = this.canvas.height;
        if (t) {
          i = s.getImageData(0, 0, n, r);
          var a = s.globalCompositeOperation;
          (s.globalCompositeOperation = "destination-over"),
            (s.fillStyle = t),
            s.fillRect(0, 0, n, r);
        }
        var o = this.canvas.toDataURL(e || "image/png");
        return (
          t && (s.putImageData(i, 0, 0), (s.globalCompositeOperation = a)), o
        );
      }),
      (e.enableMouseOver = function (t) {
        if (
          (this._mouseOverIntervalID &&
            (clearInterval(this._mouseOverIntervalID),
            (this._mouseOverIntervalID = null),
            0 == t && this._testMouseOver(!0)),
          null == t)
        )
          t = 20;
        else if (0 >= t) return;
        var e = this;
        this._mouseOverIntervalID = setInterval(function () {
          e._testMouseOver();
        }, 1e3 / Math.min(50, t));
      }),
      (e.enableDOMEvents = function (t) {
        null == t && (t = !0);
        var e,
          i,
          s = this._eventListeners;
        if (!t && s) {
          for (e in s) (i = s[e]), i.t.removeEventListener(e, i.f, !1);
          this._eventListeners = null;
        } else if (t && !s && this.canvas) {
          var n = window.addEventListener ? window : document,
            r = this;
          (s = this._eventListeners = {}),
            (s.mouseup = {
              t: n,
              f: function (t) {
                r._handleMouseUp(t);
              },
            }),
            (s.mousemove = {
              t: n,
              f: function (t) {
                r._handleMouseMove(t);
              },
            }),
            (s.dblclick = {
              t: this.canvas,
              f: function (t) {
                r._handleDoubleClick(t);
              },
            }),
            (s.mousedown = {
              t: this.canvas,
              f: function (t) {
                r._handleMouseDown(t);
              },
            });
          for (e in s) (i = s[e]), i.t.addEventListener(e, i.f, !1);
        }
      }),
      (e.clone = function () {
        throw "Stage cannot be cloned.";
      }),
      (e.toString = function () {
        return "[Stage (name=" + this.name + ")]";
      }),
      (e._getElementRect = function (t) {
        var e;
        try {
          e = t.getBoundingClientRect();
        } catch (i) {
          e = {
            top: t.offsetTop,
            left: t.offsetLeft,
            width: t.offsetWidth,
            height: t.offsetHeight,
          };
        }
        var s =
            (window.pageXOffset || document.scrollLeft || 0) -
            (document.clientLeft || document.body.clientLeft || 0),
          n =
            (window.pageYOffset || document.scrollTop || 0) -
            (document.clientTop || document.body.clientTop || 0),
          r = window.getComputedStyle
            ? getComputedStyle(t, null)
            : t.currentStyle,
          a = parseInt(r.paddingLeft) + parseInt(r.borderLeftWidth),
          o = parseInt(r.paddingTop) + parseInt(r.borderTopWidth),
          h = parseInt(r.paddingRight) + parseInt(r.borderRightWidth),
          c = parseInt(r.paddingBottom) + parseInt(r.borderBottomWidth);
        return {
          left: e.left + s + a,
          right: e.right + s - h,
          top: e.top + n + o,
          bottom: e.bottom + n - c,
        };
      }),
      (e._getPointerData = function (t) {
        var e = this._pointerData[t];
        return e || (e = this._pointerData[t] = { x: 0, y: 0 }), e;
      }),
      (e._handleMouseMove = function (t) {
        t || (t = window.event),
          this._handlePointerMove(-1, t, t.pageX, t.pageY);
      }),
      (e._handlePointerMove = function (t, e, i, s, n) {
        if ((!this._prevStage || void 0 !== n) && this.canvas) {
          var r = this._nextStage,
            a = this._getPointerData(t),
            o = a.inBounds;
          this._updatePointerPosition(t, e, i, s),
            (o || a.inBounds || this.mouseMoveOutside) &&
              (-1 === t &&
                a.inBounds == !o &&
                this._dispatchMouseEvent(
                  this,
                  o ? "mouseleave" : "mouseenter",
                  !1,
                  t,
                  a,
                  e
                ),
              this._dispatchMouseEvent(this, "stagemousemove", !1, t, a, e),
              this._dispatchMouseEvent(a.target, "pressmove", !0, t, a, e)),
            r && r._handlePointerMove(t, e, i, s, null);
        }
      }),
      (e._updatePointerPosition = function (t, e, i, s) {
        var n = this._getElementRect(this.canvas);
        (i -= n.left), (s -= n.top);
        var r = this.canvas.width,
          a = this.canvas.height;
        (i /= (n.right - n.left) / r), (s /= (n.bottom - n.top) / a);
        var o = this._getPointerData(t);
        (o.inBounds = i >= 0 && s >= 0 && r - 1 >= i && a - 1 >= s)
          ? ((o.x = i), (o.y = s))
          : this.mouseMoveOutside &&
            ((o.x = 0 > i ? 0 : i > r - 1 ? r - 1 : i),
            (o.y = 0 > s ? 0 : s > a - 1 ? a - 1 : s)),
          (o.posEvtObj = e),
          (o.rawX = i),
          (o.rawY = s),
          (t === this._primaryPointerID || -1 === t) &&
            ((this.mouseX = o.x),
            (this.mouseY = o.y),
            (this.mouseInBounds = o.inBounds));
      }),
      (e._handleMouseUp = function (t) {
        this._handlePointerUp(-1, t, !1);
      }),
      (e._handlePointerUp = function (t, e, i, s) {
        var n = this._nextStage,
          r = this._getPointerData(t);
        if (!this._prevStage || void 0 !== s) {
          var a = null,
            o = r.target;
          s ||
            (!o && !n) ||
            (a = this._getObjectsUnderPoint(r.x, r.y, null, !0)),
            r.down &&
              (this._dispatchMouseEvent(this, "stagemouseup", !1, t, r, e, a),
              (r.down = !1)),
            a == o && this._dispatchMouseEvent(o, "click", !0, t, r, e),
            this._dispatchMouseEvent(o, "pressup", !0, t, r, e),
            i
              ? (t == this._primaryPointerID && (this._primaryPointerID = null),
                delete this._pointerData[t])
              : (r.target = null),
            n && n._handlePointerUp(t, e, i, s || (a && this));
        }
      }),
      (e._handleMouseDown = function (t) {
        this._handlePointerDown(-1, t, t.pageX, t.pageY);
      }),
      (e._handlePointerDown = function (t, e, i, s, n) {
        this.preventSelection && e.preventDefault(),
          (null == this._primaryPointerID || -1 === t) &&
            (this._primaryPointerID = t),
          null != s && this._updatePointerPosition(t, e, i, s);
        var r = null,
          a = this._nextStage,
          o = this._getPointerData(t);
        n || (r = o.target = this._getObjectsUnderPoint(o.x, o.y, null, !0)),
          o.inBounds &&
            (this._dispatchMouseEvent(this, "stagemousedown", !1, t, o, e, r),
            (o.down = !0)),
          this._dispatchMouseEvent(r, "mousedown", !0, t, o, e),
          a && a._handlePointerDown(t, e, i, s, n || (r && this));
      }),
      (e._testMouseOver = function (t, e, i) {
        if (!this._prevStage || void 0 !== e) {
          var s = this._nextStage;
          if (!this._mouseOverIntervalID)
            return void (s && s._testMouseOver(t, e, i));
          var n = this._getPointerData(-1);
          if (
            n &&
            (t ||
              this.mouseX != this._mouseOverX ||
              this.mouseY != this._mouseOverY ||
              !this.mouseInBounds)
          ) {
            var r,
              a,
              o,
              h = n.posEvtObj,
              c = i || (h && h.target == this.canvas),
              l = null,
              u = -1,
              d = "";
            !e &&
              (t || (this.mouseInBounds && c)) &&
              ((l = this._getObjectsUnderPoint(
                this.mouseX,
                this.mouseY,
                null,
                !0
              )),
              (this._mouseOverX = this.mouseX),
              (this._mouseOverY = this.mouseY));
            var _ = this._mouseOverTarget || [],
              p = _[_.length - 1],
              f = (this._mouseOverTarget = []);
            for (r = l; r; ) f.unshift(r), d || (d = r.cursor), (r = r.parent);
            for (
              this.canvas.style.cursor = d,
                !e && i && (i.canvas.style.cursor = d),
                a = 0,
                o = f.length;
              o > a && f[a] == _[a];
              a++
            )
              u = a;
            for (
              p != l &&
                this._dispatchMouseEvent(p, "mouseout", !0, -1, n, h, l),
                a = _.length - 1;
              a > u;
              a--
            )
              this._dispatchMouseEvent(_[a], "rollout", !1, -1, n, h, l);
            for (a = f.length - 1; a > u; a--)
              this._dispatchMouseEvent(f[a], "rollover", !1, -1, n, h, p);
            p != l && this._dispatchMouseEvent(l, "mouseover", !0, -1, n, h, p),
              s && s._testMouseOver(t, e || (l && this), i || (c && this));
          }
        }
      }),
      (e._handleDoubleClick = function (t, e) {
        var i = null,
          s = this._nextStage,
          n = this._getPointerData(-1);
        e ||
          ((i = this._getObjectsUnderPoint(n.x, n.y, null, !0)),
          this._dispatchMouseEvent(i, "dblclick", !0, -1, n, t)),
          s && s._handleDoubleClick(t, e || (i && this));
      }),
      (e._dispatchMouseEvent = function (t, e, i, s, n, r, a) {
        if (t && (i || t.hasEventListener(e))) {
          var o = new createjs.MouseEvent(
            e,
            i,
            !1,
            n.x,
            n.y,
            r,
            s,
            s === this._primaryPointerID || -1 === s,
            n.rawX,
            n.rawY,
            a
          );
          t.dispatchEvent(o);
        }
      }),
      (createjs.Stage = createjs.promote(t, "Container"));
  })(),
  (this.createjs = this.createjs || {}),
  (function () {
    function t(t) {
      this.DisplayObject_constructor(),
        "string" == typeof t
          ? ((this.image = document.createElement("img")), (this.image.src = t))
          : (this.image = t),
        (this.sourceRect = null);
    }
    var e = createjs.extend(t, createjs.DisplayObject);
    (e.initialize = t),
      (e.isVisible = function () {
        var t = this.image,
          e =
            this.cacheCanvas ||
            (t && (t.naturalWidth || t.getContext || t.readyState >= 2));
        return !!(
          this.visible &&
          this.alpha > 0 &&
          0 != this.scaleX &&
          0 != this.scaleY &&
          e
        );
      }),
      (e.draw = function (t, e) {
        if (this.DisplayObject_draw(t, e) || !this.image) return !0;
        var i = this.image,
          s = this.sourceRect;
        if (s) {
          var n = s.x,
            r = s.y,
            a = n + s.width,
            o = r + s.height,
            h = 0,
            c = 0,
            l = i.width,
            u = i.height;
          0 > n && ((h -= n), (n = 0)),
            a > l && (a = l),
            0 > r && ((c -= r), (r = 0)),
            o > u && (o = u),
            t.drawImage(i, n, r, a - n, o - r, h, c, a - n, o - r);
        } else t.drawImage(i, 0, 0);
        return !0;
      }),
      (e.getBounds = function () {
        var t = this.DisplayObject_getBounds();
        if (t) return t;
        var e = this.image,
          i = this.sourceRect || e,
          s = e && (e.naturalWidth || e.getContext || e.readyState >= 2);
        return s ? this._rectangle.setValues(0, 0, i.width, i.height) : null;
      }),
      (e.clone = function () {
        var e = new t(this.image);
        return (
          this.sourceRect && (e.sourceRect = this.sourceRect.clone()),
          this._cloneProps(e),
          e
        );
      }),
      (e.toString = function () {
        return "[Bitmap (name=" + this.name + ")]";
      }),
      (createjs.Bitmap = createjs.promote(t, "DisplayObject"));
  })(),
  (this.createjs = this.createjs || {}),
  (function () {
    "use strict";
    function t(t, e) {
      this.DisplayObject_constructor(),
        (this.currentFrame = 0),
        (this.currentAnimation = null),
        (this.paused = !0),
        (this.spriteSheet = t),
        (this.currentAnimationFrame = 0),
        (this.framerate = 0),
        (this._animation = null),
        (this._currentFrame = null),
        (this._skipAdvance = !1),
        null != e && this.gotoAndPlay(e);
    }
    var e = createjs.extend(t, createjs.DisplayObject);
    (e.initialize = t),
      (e.isVisible = function () {
        var t = this.cacheCanvas || this.spriteSheet.complete;
        return !!(
          this.visible &&
          this.alpha > 0 &&
          0 != this.scaleX &&
          0 != this.scaleY &&
          t
        );
      }),
      (e.draw = function (t, e) {
        if (this.DisplayObject_draw(t, e)) return !0;
        this._normalizeFrame();
        var i = this.spriteSheet.getFrame(0 | this._currentFrame);
        if (!i) return !1;
        var s = i.rect;
        return (
          s.width &&
            s.height &&
            t.drawImage(
              i.image,
              s.x,
              s.y,
              s.width,
              s.height,
              -i.regX,
              -i.regY,
              s.width,
              s.height
            ),
          !0
        );
      }),
      (e.play = function () {
        this.paused = !1;
      }),
      (e.stop = function () {
        this.paused = !0;
      }),
      (e.gotoAndPlay = function (t) {
        (this.paused = !1), (this._skipAdvance = !0), this._goto(t);
      }),
      (e.gotoAndStop = function (t) {
        (this.paused = !0), this._goto(t);
      }),
      (e.advance = function (t) {
        var e = this.framerate || this.spriteSheet.framerate,
          i = e && null != t ? t / (1e3 / e) : 1;
        this._normalizeFrame(i);
      }),
      (e.getBounds = function () {
        return (
          this.DisplayObject_getBounds() ||
          this.spriteSheet.getFrameBounds(this.currentFrame, this._rectangle)
        );
      }),
      (e.clone = function () {
        return this._cloneProps(new t(this.spriteSheet));
      }),
      (e.toString = function () {
        return "[Sprite (name=" + this.name + ")]";
      }),
      (e._cloneProps = function (t) {
        return (
          this.DisplayObject__cloneProps(t),
          (t.currentFrame = this.currentFrame),
          (t.currentAnimation = this.currentAnimation),
          (t.paused = this.paused),
          (t.currentAnimationFrame = this.currentAnimationFrame),
          (t.framerate = this.framerate),
          (t._animation = this._animation),
          (t._currentFrame = this._currentFrame),
          (t._skipAdvance = this._skipAdvance),
          t
        );
      }),
      (e._tick = function (t) {
        this.paused ||
          (this._skipAdvance || this.advance(t && t.delta),
          (this._skipAdvance = !1)),
          this.DisplayObject__tick(t);
      }),
      (e._normalizeFrame = function (t) {
        t = t || 0;
        var e,
          i = this._animation,
          s = this.paused,
          n = this._currentFrame;
        if (i) {
          var r = i.speed || 1,
            a = this.currentAnimationFrame;
          if (((e = i.frames.length), a + t * r >= e)) {
            var o = i.next;
            if (this._dispatchAnimationEnd(i, n, s, o, e - 1)) return;
            if (o) return this._goto(o, t - (e - a) / r);
            (this.paused = !0), (a = i.frames.length - 1);
          } else a += t * r;
          (this.currentAnimationFrame = a),
            (this._currentFrame = i.frames[0 | a]);
        } else if (
          ((n = this._currentFrame += t),
          (e = this.spriteSheet.getNumFrames()),
          n >= e &&
            e > 0 &&
            !this._dispatchAnimationEnd(i, n, s, e - 1) &&
            (this._currentFrame -= e) >= e)
        )
          return this._normalizeFrame();
        (n = 0 | this._currentFrame),
          this.currentFrame != n &&
            ((this.currentFrame = n), this.dispatchEvent("change"));
      }),
      (e._dispatchAnimationEnd = function (t, e, i, s, n) {
        var r = t ? t.name : null;
        if (this.hasEventListener("animationend")) {
          var a = new createjs.Event("animationend");
          (a.name = r), (a.next = s), this.dispatchEvent(a);
        }
        var o = this._animation != t || this._currentFrame != e;
        return (
          o ||
            i ||
            !this.paused ||
            ((this.currentAnimationFrame = n), (o = !0)),
          o
        );
      }),
      (e._goto = function (t, e) {
        if (((this.currentAnimationFrame = 0), isNaN(t))) {
          var i = this.spriteSheet.getAnimation(t);
          i &&
            ((this._animation = i),
            (this.currentAnimation = t),
            this._normalizeFrame(e));
        } else
          (this.currentAnimation = this._animation = null),
            (this._currentFrame = t),
            this._normalizeFrame();
      }),
      (createjs.Sprite = createjs.promote(t, "DisplayObject"));
  })(),
  (this.createjs = this.createjs || {}),
  (function () {
    "use strict";
    function t(t) {
      this.DisplayObject_constructor(),
        (this.graphics = t ? t : new createjs.Graphics());
    }
    var e = createjs.extend(t, createjs.DisplayObject);
    (e.isVisible = function () {
      var t = this.cacheCanvas || (this.graphics && !this.graphics.isEmpty());
      return !!(
        this.visible &&
        this.alpha > 0 &&
        0 != this.scaleX &&
        0 != this.scaleY &&
        t
      );
    }),
      (e.draw = function (t, e) {
        return (
          !!this.DisplayObject_draw(t, e) || (this.graphics.draw(t, this), !0)
        );
      }),
      (e.clone = function (e) {
        var i = e && this.graphics ? this.graphics.clone() : this.graphics;
        return this._cloneProps(new t(i));
      }),
      (e.toString = function () {
        return "[Shape (name=" + this.name + ")]";
      }),
      (createjs.Shape = createjs.promote(t, "DisplayObject"));
  })(),
  (this.createjs = this.createjs || {}),
  (function () {
    "use strict";
    function t(t, e, i) {
      this.DisplayObject_constructor(),
        (this.text = t),
        (this.font = e),
        (this.color = i),
        (this.textAlign = "left"),
        (this.textBaseline = "top"),
        (this.maxWidth = null),
        (this.outline = 0),
        (this.lineHeight = 0),
        (this.lineWidth = null);
    }
    var e = createjs.extend(t, createjs.DisplayObject),
      i = createjs.createCanvas
        ? createjs.createCanvas()
        : document.createElement("canvas");
    i.getContext &&
      ((t._workingContext = i.getContext("2d")), (i.width = i.height = 1)),
      (t.H_OFFSETS = { start: 0, left: 0, center: -0.5, end: -1, right: -1 }),
      (t.V_OFFSETS = {
        top: 0,
        hanging: -0.01,
        middle: -0.4,
        alphabetic: -0.8,
        ideographic: -0.85,
        bottom: -1,
      }),
      (e.isVisible = function () {
        var t = this.cacheCanvas || (null != this.text && "" !== this.text);
        return !!(
          this.visible &&
          this.alpha > 0 &&
          0 != this.scaleX &&
          0 != this.scaleY &&
          t
        );
      }),
      (e.draw = function (t, e) {
        if (this.DisplayObject_draw(t, e)) return !0;
        var i = this.color || "#000";
        return (
          this.outline
            ? ((t.strokeStyle = i), (t.lineWidth = 1 * this.outline))
            : (t.fillStyle = i),
          this._drawText(this._prepContext(t)),
          !0
        );
      }),
      (e.getMeasuredWidth = function () {
        return this._getMeasuredWidth(this.text);
      }),
      (e.getMeasuredLineHeight = function () {
        return 1.2 * this._getMeasuredWidth("M");
      }),
      (e.getMeasuredHeight = function () {
        return this._drawText(null, {}).height;
      }),
      (e.getBounds = function () {
        var e = this.DisplayObject_getBounds();
        if (e) return e;
        if (null == this.text || "" === this.text) return null;
        var i = this._drawText(null, {}),
          s =
            this.maxWidth && this.maxWidth < i.width ? this.maxWidth : i.width,
          n = s * t.H_OFFSETS[this.textAlign || "left"],
          r = this.lineHeight || this.getMeasuredLineHeight(),
          a = r * t.V_OFFSETS[this.textBaseline || "top"];
        return this._rectangle.setValues(n, a, s, i.height);
      }),
      (e.getMetrics = function () {
        var e = { lines: [] };
        return (
          (e.lineHeight = this.lineHeight || this.getMeasuredLineHeight()),
          (e.vOffset = e.lineHeight * t.V_OFFSETS[this.textBaseline || "top"]),
          this._drawText(null, e, e.lines)
        );
      }),
      (e.clone = function () {
        return this._cloneProps(new t(this.text, this.font, this.color));
      }),
      (e.toString = function () {
        return (
          "[Text (text=" +
          (this.text.length > 20
            ? this.text.substr(0, 17) + "..."
            : this.text) +
          ")]"
        );
      }),
      (e._cloneProps = function (t) {
        return (
          this.DisplayObject__cloneProps(t),
          (t.textAlign = this.textAlign),
          (t.textBaseline = this.textBaseline),
          (t.maxWidth = this.maxWidth),
          (t.outline = this.outline),
          (t.lineHeight = this.lineHeight),
          (t.lineWidth = this.lineWidth),
          t
        );
      }),
      (e._prepContext = function (t) {
        return (
          (t.font = this.font || "10px sans-serif"),
          (t.textAlign = this.textAlign || "left"),
          (t.textBaseline = this.textBaseline || "top"),
          t
        );
      }),
      (e._drawText = function (e, i, s) {
        var n = !!e;
        n || ((e = t._workingContext), e.save(), this._prepContext(e));
        for (
          var r = this.lineHeight || this.getMeasuredLineHeight(),
            a = 0,
            o = 0,
            h = String(this.text).split(/(?:\r\n|\r|\n)/),
            c = 0,
            l = h.length;
          l > c;
          c++
        ) {
          var u = h[c],
            d = null;
          if (
            null != this.lineWidth &&
            (d = e.measureText(u).width) > this.lineWidth
          ) {
            var _ = u.split(/(\s)/);
            (u = _[0]), (d = e.measureText(u).width);
            for (var p = 1, f = _.length; f > p; p += 2) {
              var m = e.measureText(_[p] + _[p + 1]).width;
              d + m > this.lineWidth
                ? (n && this._drawTextLine(e, u, o * r),
                  s && s.push(u),
                  d > a && (a = d),
                  (u = _[p + 1]),
                  (d = e.measureText(u).width),
                  o++)
                : ((u += _[p] + _[p + 1]), (d += m));
            }
          }
          n && this._drawTextLine(e, u, o * r),
            s && s.push(u),
            i && null == d && (d = e.measureText(u).width),
            d > a && (a = d),
            o++;
        }
        return i && ((i.width = a), (i.height = o * r)), n || e.restore(), i;
      }),
      (e._drawTextLine = function (t, e, i) {
        this.outline
          ? t.strokeText(e, 0, i, this.maxWidth || 65535)
          : t.fillText(e, 0, i, this.maxWidth || 65535);
      }),
      (e._getMeasuredWidth = function (e) {
        var i = t._workingContext;
        i.save();
        var s = this._prepContext(i).measureText(e).width;
        return i.restore(), s;
      }),
      (createjs.Text = createjs.promote(t, "DisplayObject"));
  })(),
  (this.createjs = this.createjs || {}),
  (function () {
    "use strict";
    function t(t, e) {
      this.Container_constructor(),
        (this.text = t || ""),
        (this.spriteSheet = e),
        (this.lineHeight = 0),
        (this.letterSpacing = 0),
        (this.spaceWidth = 0),
        (this._oldProps = {
          text: 0,
          spriteSheet: 0,
          lineHeight: 0,
          letterSpacing: 0,
          spaceWidth: 0,
        });
    }
    var e = createjs.extend(t, createjs.Container);
    (t.maxPoolSize = 100),
      (t._spritePool = []),
      (e.draw = function (t, e) {
        this.DisplayObject_draw(t, e) ||
          (this._updateText(), this.Container_draw(t, e));
      }),
      (e.getBounds = function () {
        return this._updateText(), this.Container_getBounds();
      }),
      (e.isVisible = function () {
        var t =
          this.cacheCanvas ||
          (this.spriteSheet && this.spriteSheet.complete && this.text);
        return !!(
          this.visible &&
          this.alpha > 0 &&
          0 !== this.scaleX &&
          0 !== this.scaleY &&
          t
        );
      }),
      (e.clone = function () {
        return this._cloneProps(new t(this.text, this.spriteSheet));
      }),
      (e.addChild =
        e.addChildAt =
        e.removeChild =
        e.removeChildAt =
        e.removeAllChildren =
          function () {}),
      (e._cloneProps = function (t) {
        return (
          this.Container__cloneProps(t),
          (t.lineHeight = this.lineHeight),
          (t.letterSpacing = this.letterSpacing),
          (t.spaceWidth = this.spaceWidth),
          t
        );
      }),
      (e._getFrameIndex = function (t, e) {
        var i,
          s = e.getAnimation(t);
        return (
          s ||
            (t != (i = t.toUpperCase()) ||
              t != (i = t.toLowerCase()) ||
              (i = null),
            i && (s = e.getAnimation(i))),
          s && s.frames[0]
        );
      }),
      (e._getFrame = function (t, e) {
        var i = this._getFrameIndex(t, e);
        return null == i ? i : e.getFrame(i);
      }),
      (e._getLineHeight = function (t) {
        var e =
          this._getFrame("1", t) ||
          this._getFrame("T", t) ||
          this._getFrame("L", t) ||
          t.getFrame(0);
        return e ? e.rect.height : 1;
      }),
      (e._getSpaceWidth = function (t) {
        var e =
          this._getFrame("1", t) ||
          this._getFrame("l", t) ||
          this._getFrame("e", t) ||
          this._getFrame("a", t) ||
          t.getFrame(0);
        return e ? e.rect.width : 1;
      }),
      (e._updateText = function () {
        var e,
          i = 0,
          s = 0,
          n = this._oldProps,
          r = !1,
          a = this.spaceWidth,
          o = this.lineHeight,
          h = this.spriteSheet,
          c = t._spritePool,
          l = this.children,
          u = 0,
          d = l.length;
        for (var _ in n) n[_] != this[_] && ((n[_] = this[_]), (r = !0));
        if (r) {
          var p = !!this._getFrame(" ", h);
          p || a || (a = this._getSpaceWidth(h)),
            o || (o = this._getLineHeight(h));
          for (var f = 0, m = this.text.length; m > f; f++) {
            var g = this.text.charAt(f);
            if (" " != g || p)
              if ("\n" != g && "\r" != g) {
                var v = this._getFrameIndex(g, h);
                null != v &&
                  (d > u
                    ? (e = l[u])
                    : (l.push((e = c.length ? c.pop() : new createjs.Sprite())),
                      (e.parent = this),
                      d++),
                  (e.spriteSheet = h),
                  e.gotoAndStop(v),
                  (e.x = i),
                  (e.y = s),
                  u++,
                  (i += e.getBounds().width + this.letterSpacing));
              } else
                "\r" == g && "\n" == this.text.charAt(f + 1) && f++,
                  (i = 0),
                  (s += o);
            else i += a;
          }
          for (; d > u; ) c.push((e = l.pop())), (e.parent = null), d--;
          c.length > t.maxPoolSize && (c.length = t.maxPoolSize);
        }
      }),
      (createjs.BitmapText = createjs.promote(t, "Container"));
  })(),
  (this.createjs = this.createjs || {}),
  (function () {
    "use strict";
    function t(e, i, s, n) {
      this.Container_constructor(),
        !t.inited && t.init(),
        (this.mode = e || t.INDEPENDENT),
        (this.startPosition = i || 0),
        (this.loop = s),
        (this.currentFrame = 0),
        (this.timeline = new createjs.Timeline(null, n, {
          paused: !0,
          position: i,
          useTicks: !0,
        })),
        (this.paused = !1),
        (this.actionsEnabled = !0),
        (this.autoReset = !0),
        (this.frameBounds = this.frameBounds || null),
        (this.framerate = null),
        (this._synchOffset = 0),
        (this._prevPos = -1),
        (this._prevPosition = 0),
        (this._t = 0),
        (this._managed = {});
    }
    function e() {
      throw "MovieClipPlugin cannot be instantiated.";
    }
    var i = createjs.extend(t, createjs.Container);
    (t.INDEPENDENT = "independent"),
      (t.SINGLE_FRAME = "single"),
      (t.SYNCHED = "synched"),
      (t.inited = !1),
      (t.init = function () {
        t.inited || (e.install(), (t.inited = !0));
      }),
      (i.getLabels = function () {
        return this.timeline.getLabels();
      }),
      (i.getCurrentLabel = function () {
        return this._updateTimeline(), this.timeline.getCurrentLabel();
      }),
      (i.getDuration = function () {
        return this.timeline.duration;
      });
    try {
      Object.defineProperties(i, {
        labels: { get: i.getLabels },
        currentLabel: { get: i.getCurrentLabel },
        totalFrames: { get: i.getDuration },
        duration: { get: i.getDuration },
      });
    } catch (s) {}
    (i.initialize = t),
      (i.isVisible = function () {
        return !!(
          this.visible &&
          this.alpha > 0 &&
          0 != this.scaleX &&
          0 != this.scaleY
        );
      }),
      (i.draw = function (t, e) {
        return (
          !!this.DisplayObject_draw(t, e) ||
          (this._updateTimeline(), this.Container_draw(t, e), !0)
        );
      }),
      (i.play = function () {
        this.paused = !1;
      }),
      (i.stop = function () {
        this.paused = !0;
      }),
      (i.gotoAndPlay = function (t) {
        (this.paused = !1), this._goto(t);
      }),
      (i.gotoAndStop = function (t) {
        (this.paused = !0), this._goto(t);
      }),
      (i.advance = function (e) {
        var i = t.INDEPENDENT;
        if (this.mode == i) {
          for (var s = this, n = s.framerate; (s = s.parent) && null == n; )
            s.mode == i && (n = s._framerate);
          this._framerate = n;
          var r =
              null != n && -1 != n && null != e ? e / (1e3 / n) + this._t : 1,
            a = 0 | r;
          for (this._t = r - a; !this.paused && a--; )
            (this._prevPosition =
              this._prevPos < 0 ? 0 : this._prevPosition + 1),
              this._updateTimeline();
        }
      }),
      (i.clone = function () {
        throw "MovieClip cannot be cloned.";
      }),
      (i.toString = function () {
        return "[MovieClip (name=" + this.name + ")]";
      }),
      (i._tick = function (t) {
        this.advance(t && t.delta), this.Container__tick(t);
      }),
      (i._goto = function (t) {
        var e = this.timeline.resolve(t);
        null != e &&
          (-1 == this._prevPos && (this._prevPos = NaN),
          (this._prevPosition = e),
          (this._t = 0),
          this._updateTimeline());
      }),
      (i._reset = function () {
        (this._prevPos = -1),
          (this._t = this.currentFrame = 0),
          (this.paused = !1);
      }),
      (i._updateTimeline = function () {
        var e = this.timeline,
          i = this.mode != t.INDEPENDENT;
        e.loop = null == this.loop || this.loop;
        var s = i
            ? this.startPosition +
              (this.mode == t.SINGLE_FRAME ? 0 : this._synchOffset)
            : this._prevPos < 0
            ? 0
            : this._prevPosition,
          n = i || !this.actionsEnabled ? createjs.Tween.NONE : null;
        if (
          ((this.currentFrame = e._calcPosition(s)),
          e.setPosition(s, n),
          (this._prevPosition = e._prevPosition),
          this._prevPos != e._prevPos)
        ) {
          this.currentFrame = this._prevPos = e._prevPos;
          for (var r in this._managed) this._managed[r] = 1;
          for (var a = e._tweens, o = 0, h = a.length; h > o; o++) {
            var c = a[o],
              l = c._target;
            if (l != this && !c.passive) {
              var u = c._stepPosition;
              l instanceof createjs.DisplayObject
                ? this._addManagedChild(l, u)
                : this._setState(l.state, u);
            }
          }
          var d = this.children;
          for (o = d.length - 1; o >= 0; o--) {
            var _ = d[o].id;
            1 == this._managed[_] &&
              (this.removeChildAt(o), delete this._managed[_]);
          }
        }
      }),
      (i._setState = function (t, e) {
        if (t)
          for (var i = t.length - 1; i >= 0; i--) {
            var s = t[i],
              n = s.t,
              r = s.p;
            for (var a in r) n[a] = r[a];
            this._addManagedChild(n, e);
          }
      }),
      (i._addManagedChild = function (e, i) {
        e._off ||
          (this.addChildAt(e, 0),
          e instanceof t &&
            ((e._synchOffset = i),
            e.mode == t.INDEPENDENT &&
              e.autoReset &&
              !this._managed[e.id] &&
              e._reset()),
          (this._managed[e.id] = 2));
      }),
      (i._getBounds = function (t, e) {
        var i = this.DisplayObject_getBounds();
        return (
          i ||
            (this._updateTimeline(),
            this.frameBounds &&
              (i = this._rectangle.copy(this.frameBounds[this.currentFrame]))),
          i ? this._transformBounds(i, t, e) : this.Container__getBounds(t, e)
        );
      }),
      (createjs.MovieClip = createjs.promote(t, "Container")),
      (e.priority = 100),
      (e.install = function () {
        createjs.Tween.installPlugin(e, ["startPosition"]);
      }),
      (e.init = function (t, e, i) {
        return i;
      }),
      (e.step = function () {}),
      (e.tween = function (e, i, s, n, r, a, o, h) {
        return e.target instanceof t ? (1 == a ? r[i] : n[i]) : s;
      });
  })(),
  (this.createjs = this.createjs || {}),
  (function () {
    "use strict";
    function t() {
      throw "SpriteSheetUtils cannot be instantiated";
    }
    var e = createjs.createCanvas
      ? createjs.createCanvas()
      : document.createElement("canvas");
    e.getContext &&
      ((t._workingCanvas = e),
      (t._workingContext = e.getContext("2d")),
      (e.width = e.height = 1)),
      (t.addFlippedFrames = function (e, i, s, n) {
        if (i || s || n) {
          var r = 0;
          i && t._flip(e, ++r, !0, !1),
            s && t._flip(e, ++r, !1, !0),
            n && t._flip(e, ++r, !0, !0);
        }
      }),
      (t.extractFrame = function (e, i) {
        isNaN(i) && (i = e.getAnimation(i).frames[0]);
        var s = e.getFrame(i);
        if (!s) return null;
        var n = s.rect,
          r = t._workingCanvas;
        (r.width = n.width),
          (r.height = n.height),
          t._workingContext.drawImage(
            s.image,
            n.x,
            n.y,
            n.width,
            n.height,
            0,
            0,
            n.width,
            n.height
          );
        var a = document.createElement("img");
        return (a.src = r.toDataURL("image/png")), a;
      }),
      (t.mergeAlpha = function (t, e, i) {
        i ||
          (i = createjs.createCanvas
            ? createjs.createCanvas()
            : document.createElement("canvas")),
          (i.width = Math.max(e.width, t.width)),
          (i.height = Math.max(e.height, t.height));
        var s = i.getContext("2d");
        return (
          s.save(),
          s.drawImage(t, 0, 0),
          (s.globalCompositeOperation = "destination-in"),
          s.drawImage(e, 0, 0),
          s.restore(),
          i
        );
      }),
      (t._flip = function (e, i, s, n) {
        for (
          var r = e._images,
            a = t._workingCanvas,
            o = t._workingContext,
            h = r.length / i,
            c = 0;
          h > c;
          c++
        ) {
          var l = r[c];
          (l.__tmp = c),
            o.setTransform(1, 0, 0, 1, 0, 0),
            o.clearRect(0, 0, a.width + 1, a.height + 1),
            (a.width = l.width),
            (a.height = l.height),
            o.setTransform(
              s ? -1 : 1,
              0,
              0,
              n ? -1 : 1,
              s ? l.width : 0,
              n ? l.height : 0
            ),
            o.drawImage(l, 0, 0);
          var u = document.createElement("img");
          (u.src = a.toDataURL("image/png")),
            (u.width = l.width),
            (u.height = l.height),
            r.push(u);
        }
        var d = e._frames,
          _ = d.length / i;
        for (c = 0; _ > c; c++) {
          l = d[c];
          var p = l.rect.clone();
          u = r[l.image.__tmp + h * i];
          var f = { image: u, rect: p, regX: l.regX, regY: l.regY };
          s && ((p.x = u.width - p.x - p.width), (f.regX = p.width - l.regX)),
            n &&
              ((p.y = u.height - p.y - p.height), (f.regY = p.height - l.regY)),
            d.push(f);
        }
        var m = "_" + (s ? "h" : "") + (n ? "v" : ""),
          g = e._animations,
          v = e._data,
          y = g.length / i;
        for (c = 0; y > c; c++) {
          var b = g[c];
          l = v[b];
          var w = { name: b + m, speed: l.speed, next: l.next, frames: [] };
          l.next && (w.next += m), (d = l.frames);
          for (var x = 0, T = d.length; T > x; x++) w.frames.push(d[x] + _ * i);
          (v[w.name] = w), g.push(w.name);
        }
      }),
      (createjs.SpriteSheetUtils = t);
  })(),
  (this.createjs = this.createjs || {}),
  (function () {
    "use strict";
    function t(t) {
      this.EventDispatcher_constructor(),
        (this.maxWidth = 2048),
        (this.maxHeight = 2048),
        (this.spriteSheet = null),
        (this.scale = 1),
        (this.padding = 1),
        (this.timeSlice = 0.3),
        (this.progress = -1),
        (this.framerate = t || 0),
        (this._frames = []),
        (this._animations = {}),
        (this._data = null),
        (this._nextFrameIndex = 0),
        (this._index = 0),
        (this._timerID = null),
        (this._scale = 1);
    }
    var e = createjs.extend(t, createjs.EventDispatcher);
    (t.ERR_DIMENSIONS = "frame dimensions exceed max spritesheet dimensions"),
      (t.ERR_RUNNING = "a build is already running"),
      (e.addFrame = function (e, i, s, n, r) {
        if (this._data) throw t.ERR_RUNNING;
        var a = i || e.bounds || e.nominalBounds;
        return (
          !a && e.getBounds && (a = e.getBounds()),
          a
            ? ((s = s || 1),
              this._frames.push({
                source: e,
                sourceRect: a,
                scale: s,
                funct: n,
                data: r,
                index: this._frames.length,
                height: a.height * s,
              }) - 1)
            : null
        );
      }),
      (e.addAnimation = function (e, i, s, n) {
        if (this._data) throw t.ERR_RUNNING;
        this._animations[e] = { frames: i, next: s, speed: n };
      }),
      (e.addMovieClip = function (e, i, s, n, r, a) {
        if (this._data) throw t.ERR_RUNNING;
        var o = e.frameBounds,
          h = i || e.bounds || e.nominalBounds;
        if ((!h && e.getBounds && (h = e.getBounds()), h || o)) {
          var c,
            l,
            u = this._frames.length,
            d = e.timeline.duration;
          for (c = 0; d > c; c++) {
            var _ = o && o[c] ? o[c] : h;
            this.addFrame(e, _, s, this._setupMovieClipFrame, {
              i: c,
              f: n,
              d: r,
            });
          }
          var p = e.timeline._labels,
            f = [];
          for (var m in p) f.push({ index: p[m], label: m });
          if (f.length)
            for (
              f.sort(function (t, e) {
                return t.index - e.index;
              }),
                c = 0,
                l = f.length;
              l > c;
              c++
            ) {
              for (
                var g = f[c].label,
                  v = u + f[c].index,
                  y = u + (c == l - 1 ? d : f[c + 1].index),
                  b = [],
                  w = v;
                y > w;
                w++
              )
                b.push(w);
              (!a || (g = a(g, e, v, y))) && this.addAnimation(g, b, !0);
            }
        }
      }),
      (e.build = function () {
        if (this._data) throw t.ERR_RUNNING;
        for (this._startBuild(); this._drawNext(); );
        return this._endBuild(), this.spriteSheet;
      }),
      (e.buildAsync = function (e) {
        if (this._data) throw t.ERR_RUNNING;
        (this.timeSlice = e), this._startBuild();
        var i = this;
        this._timerID = setTimeout(function () {
          i._run();
        }, 50 - 50 * Math.max(0.01, Math.min(0.99, this.timeSlice || 0.3)));
      }),
      (e.stopAsync = function () {
        clearTimeout(this._timerID), (this._data = null);
      }),
      (e.clone = function () {
        throw "SpriteSheetBuilder cannot be cloned.";
      }),
      (e.toString = function () {
        return "[SpriteSheetBuilder]";
      }),
      (e._startBuild = function () {
        var e = this.padding || 0;
        (this.progress = 0),
          (this.spriteSheet = null),
          (this._index = 0),
          (this._scale = this.scale);
        var i = [];
        this._data = {
          images: [],
          frames: i,
          framerate: this.framerate,
          animations: this._animations,
        };
        var s = this._frames.slice();
        if (
          (s.sort(function (t, e) {
            return t.height <= e.height ? -1 : 1;
          }),
          s[s.length - 1].height + 2 * e > this.maxHeight)
        )
          throw t.ERR_DIMENSIONS;
        for (var n = 0, r = 0, a = 0; s.length; ) {
          var o = this._fillRow(s, n, a, i, e);
          if ((o.w > r && (r = o.w), (n += o.h), !o.h || !s.length)) {
            var h = createjs.createCanvas
              ? createjs.createCanvas()
              : document.createElement("canvas");
            (h.width = this._getSize(r, this.maxWidth)),
              (h.height = this._getSize(n, this.maxHeight)),
              (this._data.images[a] = h),
              o.h || ((r = n = 0), a++);
          }
        }
      }),
      (e._setupMovieClipFrame = function (t, e) {
        var i = t.actionsEnabled;
        (t.actionsEnabled = !1),
          t.gotoAndStop(e.i),
          (t.actionsEnabled = i),
          e.f && e.f(t, e.d, e.i);
      }),
      (e._getSize = function (t, e) {
        for (var i = 4; Math.pow(2, ++i) < t; );
        return Math.min(e, Math.pow(2, i));
      }),
      (e._fillRow = function (e, i, s, n, r) {
        var a = this.maxWidth,
          o = this.maxHeight;
        i += r;
        for (var h = o - i, c = r, l = 0, u = e.length - 1; u >= 0; u--) {
          var d = e[u],
            _ = this._scale * d.scale,
            p = d.sourceRect,
            f = d.source,
            m = Math.floor(_ * p.x - r),
            g = Math.floor(_ * p.y - r),
            v = Math.ceil(_ * p.height + 2 * r),
            y = Math.ceil(_ * p.width + 2 * r);
          if (y > a) throw t.ERR_DIMENSIONS;
          v > h ||
            c + y > a ||
            ((d.img = s),
            (d.rect = new createjs.Rectangle(c, i, y, v)),
            (l = l || v),
            e.splice(u, 1),
            (n[d.index] = [
              c,
              i,
              y,
              v,
              s,
              Math.round(-m + _ * f.regX - r),
              Math.round(-g + _ * f.regY - r),
            ]),
            (c += y));
        }
        return { w: c, h: l };
      }),
      (e._endBuild = function () {
        (this.spriteSheet = new createjs.SpriteSheet(this._data)),
          (this._data = null),
          (this.progress = 1),
          this.dispatchEvent("complete");
      }),
      (e._run = function () {
        for (
          var t = 50 * Math.max(0.01, Math.min(0.99, this.timeSlice || 0.3)),
            e = new Date().getTime() + t,
            i = !1;
          e > new Date().getTime();

        )
          if (!this._drawNext()) {
            i = !0;
            break;
          }
        if (i) this._endBuild();
        else {
          var s = this;
          this._timerID = setTimeout(function () {
            s._run();
          }, 50 - t);
        }
        var n = (this.progress = this._index / this._frames.length);
        if (this.hasEventListener("progress")) {
          var r = new createjs.Event("progress");
          (r.progress = n), this.dispatchEvent(r);
        }
      }),
      (e._drawNext = function () {
        var t = this._frames[this._index],
          e = t.scale * this._scale,
          i = t.rect,
          s = t.sourceRect,
          n = this._data.images[t.img],
          r = n.getContext("2d");
        return (
          t.funct && t.funct(t.source, t.data),
          r.save(),
          r.beginPath(),
          r.rect(i.x, i.y, i.width, i.height),
          r.clip(),
          r.translate(Math.ceil(i.x - s.x * e), Math.ceil(i.y - s.y * e)),
          r.scale(e, e),
          t.source.draw(r),
          r.restore(),
          ++this._index < this._frames.length
        );
      }),
      (createjs.SpriteSheetBuilder = createjs.promote(t, "EventDispatcher"));
  })(),
  (this.createjs = this.createjs || {}),
  (function () {
    "use strict";
    function t(t) {
      this.DisplayObject_constructor(),
        "string" == typeof t && (t = document.getElementById(t)),
        (this.mouseEnabled = !1);
      var e = t.style;
      (e.position = "absolute"),
        (e.transformOrigin =
          e.WebkitTransformOrigin =
          e.msTransformOrigin =
          e.MozTransformOrigin =
          e.OTransformOrigin =
            "0% 0%"),
        (this.htmlElement = t),
        (this._oldProps = null);
    }
    var e = createjs.extend(t, createjs.DisplayObject);
    (e.isVisible = function () {
      return null != this.htmlElement;
    }),
      (e.draw = function (t, e) {
        return !0;
      }),
      (e.cache = function () {}),
      (e.uncache = function () {}),
      (e.updateCache = function () {}),
      (e.hitTest = function () {}),
      (e.localToGlobal = function () {}),
      (e.globalToLocal = function () {}),
      (e.localToLocal = function () {}),
      (e.clone = function () {
        throw "DOMElement cannot be cloned.";
      }),
      (e.toString = function () {
        return "[DOMElement (name=" + this.name + ")]";
      }),
      (e._tick = function (t) {
        var e = this.getStage();
        e && e.on("drawend", this._handleDrawEnd, this, !0),
          this.DisplayObject__tick(t);
      }),
      (e._handleDrawEnd = function (t) {
        var e = this.htmlElement;
        if (e) {
          var i = e.style,
            s = this.getConcatenatedDisplayProps(this._props),
            n = s.matrix,
            r = s.visible ? "visible" : "hidden";
          if ((r != i.visibility && (i.visibility = r), s.visible)) {
            var a = this._oldProps,
              o = a && a.matrix,
              h = 1e4;
            if (!o || !o.equals(n)) {
              var c =
                "matrix(" +
                ((n.a * h) | 0) / h +
                "," +
                ((n.b * h) | 0) / h +
                "," +
                ((n.c * h) | 0) / h +
                "," +
                ((n.d * h) | 0) / h +
                "," +
                ((n.tx + 0.5) | 0);
              (i.transform =
                i.WebkitTransform =
                i.OTransform =
                i.msTransform =
                  c + "," + ((n.ty + 0.5) | 0) + ")"),
                (i.MozTransform = c + "px," + ((n.ty + 0.5) | 0) + "px)"),
                a || (a = this._oldProps = new createjs.DisplayProps(!0, NaN)),
                a.matrix.copy(n);
            }
            a.alpha != s.alpha &&
              ((i.opacity = "" + ((s.alpha * h) | 0) / h), (a.alpha = s.alpha));
          }
        }
      }),
      (createjs.DOMElement = createjs.promote(t, "DisplayObject"));
  })(),
  (this.createjs = this.createjs || {}),
  (function () {
    "use strict";
    function t() {}
    var e = t.prototype;
    (e.getBounds = function (t) {
      return t;
    }),
      (e.applyFilter = function (t, e, i, s, n, r, a, o) {
        (r = r || t), null == a && (a = e), null == o && (o = i);
        try {
          var h = t.getImageData(e, i, s, n);
        } catch (c) {
          return !1;
        }
        return !!this._applyFilter(h) && (r.putImageData(h, a, o), !0);
      }),
      (e.toString = function () {
        return "[Filter]";
      }),
      (e.clone = function () {
        return new t();
      }),
      (e._applyFilter = function (t) {
        return !0;
      }),
      (createjs.Filter = t);
  })(),
  (this.createjs = this.createjs || {}),
  (function () {
    "use strict";
    function t(t, e, i) {
      (isNaN(t) || 0 > t) && (t = 0),
        (isNaN(e) || 0 > e) && (e = 0),
        (isNaN(i) || 1 > i) && (i = 1),
        (this.blurX = 0 | t),
        (this.blurY = 0 | e),
        (this.quality = 0 | i);
    }
    var e = createjs.extend(t, createjs.Filter);
    (t.MUL_TABLE = [
      1, 171, 205, 293, 57, 373, 79, 137, 241, 27, 391, 357, 41, 19, 283, 265,
      497, 469, 443, 421, 25, 191, 365, 349, 335, 161, 155, 149, 9, 278, 269,
      261, 505, 245, 475, 231, 449, 437, 213, 415, 405, 395, 193, 377, 369, 361,
      353, 345, 169, 331, 325, 319, 313, 307, 301, 37, 145, 285, 281, 69, 271,
      267, 263, 259, 509, 501, 493, 243, 479, 118, 465, 459, 113, 446, 55, 435,
      429, 423, 209, 413, 51, 403, 199, 393, 97, 3, 379, 375, 371, 367, 363,
      359, 355, 351, 347, 43, 85, 337, 333, 165, 327, 323, 5, 317, 157, 311, 77,
      305, 303, 75, 297, 294, 73, 289, 287, 71, 141, 279, 277, 275, 68, 135, 67,
      133, 33, 262, 260, 129, 511, 507, 503, 499, 495, 491, 61, 121, 481, 477,
      237, 235, 467, 232, 115, 457, 227, 451, 7, 445, 221, 439, 218, 433, 215,
      427, 425, 211, 419, 417, 207, 411, 409, 203, 202, 401, 399, 396, 197, 49,
      389, 387, 385, 383, 95, 189, 47, 187, 93, 185, 23, 183, 91, 181, 45, 179,
      89, 177, 11, 175, 87, 173, 345, 343, 341, 339, 337, 21, 167, 83, 331, 329,
      327, 163, 81, 323, 321, 319, 159, 79, 315, 313, 39, 155, 309, 307, 153,
      305, 303, 151, 75, 299, 149, 37, 295, 147, 73, 291, 145, 289, 287, 143,
      285, 71, 141, 281, 35, 279, 139, 69, 275, 137, 273, 17, 271, 135, 269,
      267, 133, 265, 33, 263, 131, 261, 130, 259, 129, 257, 1,
    ]),
      (t.SHG_TABLE = [
        0, 9, 10, 11, 9, 12, 10, 11, 12, 9, 13, 13, 10, 9, 13, 13, 14, 14, 14,
        14, 10, 13, 14, 14, 14, 13, 13, 13, 9, 14, 14, 14, 15, 14, 15, 14, 15,
        15, 14, 15, 15, 15, 14, 15, 15, 15, 15, 15, 14, 15, 15, 15, 15, 15, 15,
        12, 14, 15, 15, 13, 15, 15, 15, 15, 16, 16, 16, 15, 16, 14, 16, 16, 14,
        16, 13, 16, 16, 16, 15, 16, 13, 16, 15, 16, 14, 9, 16, 16, 16, 16, 16,
        16, 16, 16, 16, 13, 14, 16, 16, 15, 16, 16, 10, 16, 15, 16, 14, 16, 16,
        14, 16, 16, 14, 16, 16, 14, 15, 16, 16, 16, 14, 15, 14, 15, 13, 16, 16,
        15, 17, 17, 17, 17, 17, 17, 14, 15, 17, 17, 16, 16, 17, 16, 15, 17, 16,
        17, 11, 17, 16, 17, 16, 17, 16, 17, 17, 16, 17, 17, 16, 17, 17, 16, 16,
        17, 17, 17, 16, 14, 17, 17, 17, 17, 15, 16, 14, 16, 15, 16, 13, 16, 15,
        16, 14, 16, 15, 16, 12, 16, 15, 16, 17, 17, 17, 17, 17, 13, 16, 15, 17,
        17, 17, 16, 15, 17, 17, 17, 16, 15, 17, 17, 14, 16, 17, 17, 16, 17, 17,
        16, 15, 17, 16, 14, 17, 16, 15, 17, 16, 17, 17, 16, 17, 15, 16, 17, 14,
        17, 16, 15, 17, 16, 17, 13, 17, 16, 17, 17, 16, 17, 14, 17, 16, 17, 16,
        17, 16, 17, 9,
      ]),
      (e.getBounds = function (t) {
        var e = 0 | this.blurX,
          i = 0 | this.blurY;
        if (0 >= e && 0 >= i) return t;
        var s = Math.pow(this.quality, 0.2);
        return (t || new createjs.Rectangle()).pad(
          e * s + 1,
          i * s + 1,
          e * s + 1,
          i * s + 1
        );
      }),
      (e.clone = function () {
        return new t(this.blurX, this.blurY, this.quality);
      }),
      (e.toString = function () {
        return "[BlurFilter]";
      }),
      (e._applyFilter = function (e) {
        var i = this.blurX >> 1;
        if (isNaN(i) || 0 > i) return !1;
        var s = this.blurY >> 1;
        if (isNaN(s) || 0 > s) return !1;
        if (0 == i && 0 == s) return !1;
        var n = this.quality;
        (isNaN(n) || 1 > n) && (n = 1),
          (n |= 0),
          n > 3 && (n = 3),
          1 > n && (n = 1);
        var r = e.data,
          a = 0,
          o = 0,
          h = 0,
          c = 0,
          l = 0,
          u = 0,
          d = 0,
          _ = 0,
          p = 0,
          f = 0,
          m = 0,
          g = 0,
          v = 0,
          y = 0,
          b = 0,
          w = (i + i + 1) | 0,
          x = (s + s + 1) | 0,
          T = 0 | e.width,
          S = 0 | e.height,
          P = (T - 1) | 0,
          E = (S - 1) | 0,
          j = (i + 1) | 0,
          A = (s + 1) | 0,
          L = { r: 0, b: 0, g: 0, a: 0 },
          M = L;
        for (h = 1; w > h; h++) M = M.n = { r: 0, b: 0, g: 0, a: 0 };
        M.n = L;
        var R = { r: 0, b: 0, g: 0, a: 0 },
          C = R;
        for (h = 1; x > h; h++) C = C.n = { r: 0, b: 0, g: 0, a: 0 };
        C.n = R;
        for (
          var I = null,
            D = 0 | t.MUL_TABLE[i],
            O = 0 | t.SHG_TABLE[i],
            k = 0 | t.MUL_TABLE[s],
            N = 0 | t.SHG_TABLE[s];
          n-- > 0;

        ) {
          d = u = 0;
          var F = D,
            X = O;
          for (o = S; --o > -1; ) {
            for (
              _ = j * (g = r[0 | u]),
                p = j * (v = r[(u + 1) | 0]),
                f = j * (y = r[(u + 2) | 0]),
                m = j * (b = r[(u + 3) | 0]),
                M = L,
                h = j;
              --h > -1;

            )
              (M.r = g), (M.g = v), (M.b = y), (M.a = b), (M = M.n);
            for (h = 1; j > h; h++)
              (c = (u + ((h > P ? P : h) << 2)) | 0),
                (_ += M.r = r[c]),
                (p += M.g = r[c + 1]),
                (f += M.b = r[c + 2]),
                (m += M.a = r[c + 3]),
                (M = M.n);
            for (I = L, a = 0; T > a; a++)
              (r[u++] = (_ * F) >>> X),
                (r[u++] = (p * F) >>> X),
                (r[u++] = (f * F) >>> X),
                (r[u++] = (m * F) >>> X),
                (c = (d + ((c = a + i + 1) < P ? c : P)) << 2),
                (_ -= I.r - (I.r = r[c])),
                (p -= I.g - (I.g = r[c + 1])),
                (f -= I.b - (I.b = r[c + 2])),
                (m -= I.a - (I.a = r[c + 3])),
                (I = I.n);
            d += T;
          }
          for (F = k, X = N, a = 0; T > a; a++) {
            for (
              u = (a << 2) | 0,
                _ = (A * (g = r[u])) | 0,
                p = (A * (v = r[(u + 1) | 0])) | 0,
                f = (A * (y = r[(u + 2) | 0])) | 0,
                m = (A * (b = r[(u + 3) | 0])) | 0,
                C = R,
                h = 0;
              A > h;
              h++
            )
              (C.r = g), (C.g = v), (C.b = y), (C.a = b), (C = C.n);
            for (l = T, h = 1; s >= h; h++)
              (u = (l + a) << 2),
                (_ += C.r = r[u]),
                (p += C.g = r[u + 1]),
                (f += C.b = r[u + 2]),
                (m += C.a = r[u + 3]),
                (C = C.n),
                E > h && (l += T);
            if (((u = a), (I = R), n > 0))
              for (o = 0; S > o; o++)
                (c = u << 2),
                  (r[c + 3] = b = (m * F) >>> X),
                  b > 0
                    ? ((r[c] = (_ * F) >>> X),
                      (r[c + 1] = (p * F) >>> X),
                      (r[c + 2] = (f * F) >>> X))
                    : (r[c] = r[c + 1] = r[c + 2] = 0),
                  (c = (a + ((c = o + A) < E ? c : E) * T) << 2),
                  (_ -= I.r - (I.r = r[c])),
                  (p -= I.g - (I.g = r[c + 1])),
                  (f -= I.b - (I.b = r[c + 2])),
                  (m -= I.a - (I.a = r[c + 3])),
                  (I = I.n),
                  (u += T);
            else
              for (o = 0; S > o; o++)
                (c = u << 2),
                  (r[c + 3] = b = (m * F) >>> X),
                  b > 0
                    ? ((b = 255 / b),
                      (r[c] = ((_ * F) >>> X) * b),
                      (r[c + 1] = ((p * F) >>> X) * b),
                      (r[c + 2] = ((f * F) >>> X) * b))
                    : (r[c] = r[c + 1] = r[c + 2] = 0),
                  (c = (a + ((c = o + A) < E ? c : E) * T) << 2),
                  (_ -= I.r - (I.r = r[c])),
                  (p -= I.g - (I.g = r[c + 1])),
                  (f -= I.b - (I.b = r[c + 2])),
                  (m -= I.a - (I.a = r[c + 3])),
                  (I = I.n),
                  (u += T);
          }
        }
        return !0;
      }),
      (createjs.BlurFilter = createjs.promote(t, "Filter"));
  })(),
  (this.createjs = this.createjs || {}),
  (function () {
    "use strict";
    function t(t) {
      (this.alphaMap = t), (this._alphaMap = null), (this._mapData = null);
    }
    var e = createjs.extend(t, createjs.Filter);
    (e.clone = function () {
      var e = new t(this.alphaMap);
      return (e._alphaMap = this._alphaMap), (e._mapData = this._mapData), e;
    }),
      (e.toString = function () {
        return "[AlphaMapFilter]";
      }),
      (e._applyFilter = function (t) {
        if (!this.alphaMap) return !0;
        if (!this._prepAlphaMap()) return !1;
        for (
          var e = t.data, i = this._mapData, s = 0, n = e.length;
          n > s;
          s += 4
        )
          e[s + 3] = i[s] || 0;
        return !0;
      }),
      (e._prepAlphaMap = function () {
        if (!this.alphaMap) return !1;
        if (this.alphaMap == this._alphaMap && this._mapData) return !0;
        this._mapData = null;
        var t,
          e = (this._alphaMap = this.alphaMap),
          i = e;
        e instanceof HTMLCanvasElement
          ? (t = i.getContext("2d"))
          : ((i = createjs.createCanvas
              ? createjs.createCanvas()
              : document.createElement("canvas")),
            (i.width = e.width),
            (i.height = e.height),
            (t = i.getContext("2d")),
            t.drawImage(e, 0, 0));
        try {
          var s = t.getImageData(0, 0, e.width, e.height);
        } catch (n) {
          return !1;
        }
        return (this._mapData = s.data), !0;
      }),
      (createjs.AlphaMapFilter = createjs.promote(t, "Filter"));
  })(),
  (this.createjs = this.createjs || {}),
  (function () {
    "use strict";
    function t(t) {
      this.mask = t;
    }
    var e = createjs.extend(t, createjs.Filter);
    (e.applyFilter = function (t, e, i, s, n, r, a, o) {
      return (
        !this.mask ||
        ((r = r || t),
        null == a && (a = e),
        null == o && (o = i),
        r.save(),
        t == r &&
          ((r.globalCompositeOperation = "destination-in"),
          r.drawImage(this.mask, a, o),
          r.restore(),
          !0))
      );
    }),
      (e.clone = function () {
        return new t(this.mask);
      }),
      (e.toString = function () {
        return "[AlphaMaskFilter]";
      }),
      (createjs.AlphaMaskFilter = createjs.promote(t, "Filter"));
  })(),
  (this.createjs = this.createjs || {}),
  (function () {
    "use strict";
    function t(t, e, i, s, n, r, a, o) {
      (this.redMultiplier = null != t ? t : 1),
        (this.greenMultiplier = null != e ? e : 1),
        (this.blueMultiplier = null != i ? i : 1),
        (this.alphaMultiplier = null != s ? s : 1),
        (this.redOffset = n || 0),
        (this.greenOffset = r || 0),
        (this.blueOffset = a || 0),
        (this.alphaOffset = o || 0);
    }
    var e = createjs.extend(t, createjs.Filter);
    (e.toString = function () {
      return "[ColorFilter]";
    }),
      (e.clone = function () {
        return new t(
          this.redMultiplier,
          this.greenMultiplier,
          this.blueMultiplier,
          this.alphaMultiplier,
          this.redOffset,
          this.greenOffset,
          this.blueOffset,
          this.alphaOffset
        );
      }),
      (e._applyFilter = function (t) {
        for (var e = t.data, i = e.length, s = 0; i > s; s += 4)
          (e[s] = e[s] * this.redMultiplier + this.redOffset),
            (e[s + 1] = e[s + 1] * this.greenMultiplier + this.greenOffset),
            (e[s + 2] = e[s + 2] * this.blueMultiplier + this.blueOffset),
            (e[s + 3] = e[s + 3] * this.alphaMultiplier + this.alphaOffset);
        return !0;
      }),
      (createjs.ColorFilter = createjs.promote(t, "Filter"));
  })(),
  (this.createjs = this.createjs || {}),
  (function () {
    "use strict";
    function t(t, e, i, s) {
      this.setColor(t, e, i, s);
    }
    var e = t.prototype;
    (t.DELTA_INDEX = [
      0, 0.01, 0.02, 0.04, 0.05, 0.06, 0.07, 0.08, 0.1, 0.11, 0.12, 0.14, 0.15,
      0.16, 0.17, 0.18, 0.2, 0.21, 0.22, 0.24, 0.25, 0.27, 0.28, 0.3, 0.32,
      0.34, 0.36, 0.38, 0.4, 0.42, 0.44, 0.46, 0.48, 0.5, 0.53, 0.56, 0.59,
      0.62, 0.65, 0.68, 0.71, 0.74, 0.77, 0.8, 0.83, 0.86, 0.89, 0.92, 0.95,
      0.98, 1, 1.06, 1.12, 1.18, 1.24, 1.3, 1.36, 1.42, 1.48, 1.54, 1.6, 1.66,
      1.72, 1.78, 1.84, 1.9, 1.96, 2, 2.12, 2.25, 2.37, 2.5, 2.62, 2.75, 2.87,
      3, 3.2, 3.4, 3.6, 3.8, 4, 4.3, 4.7, 4.9, 5, 5.5, 6, 6.5, 6.8, 7, 7.3, 7.5,
      7.8, 8, 8.4, 8.7, 9, 9.4, 9.6, 9.8, 10,
    ]),
      (t.IDENTITY_MATRIX = [
        1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0,
        1,
      ]),
      (t.LENGTH = t.IDENTITY_MATRIX.length),
      (e.setColor = function (t, e, i, s) {
        return this.reset().adjustColor(t, e, i, s);
      }),
      (e.reset = function () {
        return this.copy(t.IDENTITY_MATRIX);
      }),
      (e.adjustColor = function (t, e, i, s) {
        return (
          this.adjustHue(s),
          this.adjustContrast(e),
          this.adjustBrightness(t),
          this.adjustSaturation(i)
        );
      }),
      (e.adjustBrightness = function (t) {
        return 0 == t || isNaN(t)
          ? this
          : ((t = this._cleanValue(t, 255)),
            this._multiplyMatrix([
              1,
              0,
              0,
              0,
              t,
              0,
              1,
              0,
              0,
              t,
              0,
              0,
              1,
              0,
              t,
              0,
              0,
              0,
              1,
              0,
              0,
              0,
              0,
              0,
              1,
            ]),
            this);
      }),
      (e.adjustContrast = function (e) {
        if (0 == e || isNaN(e)) return this;
        e = this._cleanValue(e, 100);
        var i;
        return (
          0 > e
            ? (i = 127 + (e / 100) * 127)
            : ((i = e % 1),
              (i =
                0 == i
                  ? t.DELTA_INDEX[e]
                  : t.DELTA_INDEX[e << 0] * (1 - i) +
                    t.DELTA_INDEX[(e << 0) + 1] * i),
              (i = 127 * i + 127)),
          this._multiplyMatrix([
            i / 127,
            0,
            0,
            0,
            0.5 * (127 - i),
            0,
            i / 127,
            0,
            0,
            0.5 * (127 - i),
            0,
            0,
            i / 127,
            0,
            0.5 * (127 - i),
            0,
            0,
            0,
            1,
            0,
            0,
            0,
            0,
            0,
            1,
          ]),
          this
        );
      }),
      (e.adjustSaturation = function (t) {
        if (0 == t || isNaN(t)) return this;
        t = this._cleanValue(t, 100);
        var e = 1 + (t > 0 ? (3 * t) / 100 : t / 100),
          i = 0.3086,
          s = 0.6094,
          n = 0.082;
        return (
          this._multiplyMatrix([
            i * (1 - e) + e,
            s * (1 - e),
            n * (1 - e),
            0,
            0,
            i * (1 - e),
            s * (1 - e) + e,
            n * (1 - e),
            0,
            0,
            i * (1 - e),
            s * (1 - e),
            n * (1 - e) + e,
            0,
            0,
            0,
            0,
            0,
            1,
            0,
            0,
            0,
            0,
            0,
            1,
          ]),
          this
        );
      }),
      (e.adjustHue = function (t) {
        if (0 == t || isNaN(t)) return this;
        t = (this._cleanValue(t, 180) / 180) * Math.PI;
        var e = Math.cos(t),
          i = Math.sin(t),
          s = 0.213,
          n = 0.715,
          r = 0.072;
        return (
          this._multiplyMatrix([
            s + e * (1 - s) + i * -s,
            n + e * -n + i * -n,
            r + e * -r + i * (1 - r),
            0,
            0,
            s + e * -s + 0.143 * i,
            n + e * (1 - n) + 0.14 * i,
            r + e * -r + i * -0.283,
            0,
            0,
            s + e * -s + i * -(1 - s),
            n + e * -n + i * n,
            r + e * (1 - r) + i * r,
            0,
            0,
            0,
            0,
            0,
            1,
            0,
            0,
            0,
            0,
            0,
            1,
          ]),
          this
        );
      }),
      (e.concat = function (e) {
        return (
          (e = this._fixMatrix(e)),
          e.length != t.LENGTH ? this : (this._multiplyMatrix(e), this)
        );
      }),
      (e.clone = function () {
        return new t().copy(this);
      }),
      (e.toArray = function () {
        for (var e = [], i = 0, s = t.LENGTH; s > i; i++) e[i] = this[i];
        return e;
      }),
      (e.copy = function (e) {
        for (var i = t.LENGTH, s = 0; i > s; s++) this[s] = e[s];
        return this;
      }),
      (e.toString = function () {
        return "[ColorMatrix]";
      }),
      (e._multiplyMatrix = function (t) {
        var e,
          i,
          s,
          n = [];
        for (e = 0; 5 > e; e++) {
          for (i = 0; 5 > i; i++) n[i] = this[i + 5 * e];
          for (i = 0; 5 > i; i++) {
            var r = 0;
            for (s = 0; 5 > s; s++) r += t[i + 5 * s] * n[s];
            this[i + 5 * e] = r;
          }
        }
      }),
      (e._cleanValue = function (t, e) {
        return Math.min(e, Math.max(-e, t));
      }),
      (e._fixMatrix = function (e) {
        return (
          e instanceof t && (e = e.toArray()),
          e.length < t.LENGTH
            ? (e = e
                .slice(0, e.length)
                .concat(t.IDENTITY_MATRIX.slice(e.length, t.LENGTH)))
            : e.length > t.LENGTH && (e = e.slice(0, t.LENGTH)),
          e
        );
      }),
      (createjs.ColorMatrix = t);
  })(),
  (this.createjs = this.createjs || {}),
  (function () {
    "use strict";
    function t(t) {
      this.matrix = t;
    }
    var e = createjs.extend(t, createjs.Filter);
    (e.toString = function () {
      return "[ColorMatrixFilter]";
    }),
      (e.clone = function () {
        return new t(this.matrix);
      }),
      (e._applyFilter = function (t) {
        for (
          var e,
            i,
            s,
            n,
            r = t.data,
            a = r.length,
            o = this.matrix,
            h = o[0],
            c = o[1],
            l = o[2],
            u = o[3],
            d = o[4],
            _ = o[5],
            p = o[6],
            f = o[7],
            m = o[8],
            g = o[9],
            v = o[10],
            y = o[11],
            b = o[12],
            w = o[13],
            x = o[14],
            T = o[15],
            S = o[16],
            P = o[17],
            E = o[18],
            j = o[19],
            A = 0;
          a > A;
          A += 4
        )
          (e = r[A]),
            (i = r[A + 1]),
            (s = r[A + 2]),
            (n = r[A + 3]),
            (r[A] = e * h + i * c + s * l + n * u + d),
            (r[A + 1] = e * _ + i * p + s * f + n * m + g),
            (r[A + 2] = e * v + i * y + s * b + n * w + x),
            (r[A + 3] = e * T + i * S + s * P + n * E + j);
        return !0;
      }),
      (createjs.ColorMatrixFilter = createjs.promote(t, "Filter"));
  })(),
  (this.createjs = this.createjs || {}),
  (function () {
    "use strict";
    function t() {
      throw "Touch cannot be instantiated";
    }
    (t.isSupported = function () {
      return !!(
        "ontouchstart" in window ||
        (window.navigator.msPointerEnabled &&
          window.navigator.msMaxTouchPoints > 0) ||
        (window.navigator.pointerEnabled && window.navigator.maxTouchPoints > 0)
      );
    }),
      (t.enable = function (e, i, s) {
        return (
          !!(e && e.canvas && t.isSupported()) &&
          (!!e.__touch ||
            ((e.__touch = {
              pointers: {},
              multitouch: !i,
              preventDefault: !s,
              count: 0,
            }),
            "ontouchstart" in window
              ? t._IOS_enable(e)
              : (window.navigator.msPointerEnabled ||
                  window.navigator.pointerEnabled) &&
                t._IE_enable(e),
            !0))
        );
      }),
      (t.disable = function (e) {
        e &&
          ("ontouchstart" in window
            ? t._IOS_disable(e)
            : (window.navigator.msPointerEnabled ||
                window.navigator.pointerEnabled) &&
              t._IE_disable(e),
          delete e.__touch);
      }),
      (t._IOS_enable = function (e) {
        var i = e.canvas,
          s = (e.__touch.f = function (i) {
            t._IOS_handleEvent(e, i);
          });
        i.addEventListener("touchstart", s, !1),
          i.addEventListener("touchmove", s, !1),
          i.addEventListener("touchend", s, !1),
          i.addEventListener("touchcancel", s, !1);
      }),
      (t._IOS_disable = function (t) {
        var e = t.canvas;
        if (e) {
          var i = t.__touch.f;
          e.removeEventListener("touchstart", i, !1),
            e.removeEventListener("touchmove", i, !1),
            e.removeEventListener("touchend", i, !1),
            e.removeEventListener("touchcancel", i, !1);
        }
      }),
      (t._IOS_handleEvent = function (t, e) {
        if (t) {
          t.__touch.preventDefault && e.preventDefault && e.preventDefault();
          for (
            var i = e.changedTouches, s = e.type, n = 0, r = i.length;
            r > n;
            n++
          ) {
            var a = i[n],
              o = a.identifier;
            a.target == t.canvas &&
              ("touchstart" == s
                ? this._handleStart(t, o, e, a.pageX, a.pageY)
                : "touchmove" == s
                ? this._handleMove(t, o, e, a.pageX, a.pageY)
                : ("touchend" == s || "touchcancel" == s) &&
                  this._handleEnd(t, o, e));
          }
        }
      }),
      (t._IE_enable = function (e) {
        var i = e.canvas,
          s = (e.__touch.f = function (i) {
            t._IE_handleEvent(e, i);
          });
        void 0 === window.navigator.pointerEnabled
          ? (i.addEventListener("MSPointerDown", s, !1),
            window.addEventListener("MSPointerMove", s, !1),
            window.addEventListener("MSPointerUp", s, !1),
            window.addEventListener("MSPointerCancel", s, !1),
            e.__touch.preventDefault && (i.style.msTouchAction = "none"))
          : (i.addEventListener("pointerdown", s, !1),
            window.addEventListener("pointermove", s, !1),
            window.addEventListener("pointerup", s, !1),
            window.addEventListener("pointercancel", s, !1),
            e.__touch.preventDefault && (i.style.touchAction = "none")),
          (e.__touch.activeIDs = {});
      }),
      (t._IE_disable = function (t) {
        var e = t.__touch.f;
        void 0 === window.navigator.pointerEnabled
          ? (window.removeEventListener("MSPointerMove", e, !1),
            window.removeEventListener("MSPointerUp", e, !1),
            window.removeEventListener("MSPointerCancel", e, !1),
            t.canvas && t.canvas.removeEventListener("MSPointerDown", e, !1))
          : (window.removeEventListener("pointermove", e, !1),
            window.removeEventListener("pointerup", e, !1),
            window.removeEventListener("pointercancel", e, !1),
            t.canvas && t.canvas.removeEventListener("pointerdown", e, !1));
      }),
      (t._IE_handleEvent = function (t, e) {
        if (t) {
          t.__touch.preventDefault && e.preventDefault && e.preventDefault();
          var i = e.type,
            s = e.pointerId,
            n = t.__touch.activeIDs;
          if ("MSPointerDown" == i || "pointerdown" == i) {
            if (e.srcElement != t.canvas) return;
            (n[s] = !0), this._handleStart(t, s, e, e.pageX, e.pageY);
          } else
            n[s] &&
              ("MSPointerMove" == i || "pointermove" == i
                ? this._handleMove(t, s, e, e.pageX, e.pageY)
                : ("MSPointerUp" == i ||
                    "MSPointerCancel" == i ||
                    "pointerup" == i ||
                    "pointercancel" == i) &&
                  (delete n[s], this._handleEnd(t, s, e)));
        }
      }),
      (t._handleStart = function (t, e, i, s, n) {
        var r = t.__touch;
        if (r.multitouch || !r.count) {
          var a = r.pointers;
          a[e] || ((a[e] = !0), r.count++, t._handlePointerDown(e, i, s, n));
        }
      }),
      (t._handleMove = function (t, e, i, s, n) {
        t.__touch.pointers[e] && t._handlePointerMove(e, i, s, n);
      }),
      (t._handleEnd = function (t, e, i) {
        var s = t.__touch,
          n = s.pointers;
        n[e] && (s.count--, t._handlePointerUp(e, i, !0), delete n[e]);
      }),
      (createjs.Touch = t);
  })(),
  (this.createjs = this.createjs || {}),
  (function () {
    "use strict";
    var t = (createjs.EaselJS = createjs.EaselJS || {});
    (t.version = "0.8.2"), (t.buildDate = "Thu, 26 Nov 2015 20:44:34 GMT");
  })(),
  (this.createjs = this.createjs || {}),
  (function () {
    "use strict";
    var t = (createjs.PreloadJS = createjs.PreloadJS || {});
    (t.version = "0.6.2"), (t.buildDate = "Thu, 26 Nov 2015 20:44:31 GMT");
  })(),
  (this.createjs = this.createjs || {}),
  (function () {
    "use strict";
    createjs.proxy = function (t, e) {
      var i = Array.prototype.slice.call(arguments, 2);
      return function () {
        return t.apply(e, Array.prototype.slice.call(arguments, 0).concat(i));
      };
    };
  })(),
  (this.createjs = this.createjs || {}),
  (function () {
    "use strict";
    function t(t, e, i) {
      this.Event_constructor("error"),
        (this.title = t),
        (this.message = e),
        (this.data = i);
    }
    var e = createjs.extend(t, createjs.Event);
    (e.clone = function () {
      return new createjs.ErrorEvent(this.title, this.message, this.data);
    }),
      (createjs.ErrorEvent = createjs.promote(t, "Event"));
  })(),
  (this.createjs = this.createjs || {}),
  (function (t) {
    "use strict";
    function e(t, e) {
      this.Event_constructor("progress"),
        (this.loaded = t),
        (this.total = null == e ? 1 : e),
        (this.progress = 0 == e ? 0 : this.loaded / this.total);
    }
    var i = createjs.extend(e, createjs.Event);
    (i.clone = function () {
      return new createjs.ProgressEvent(this.loaded, this.total);
    }),
      (createjs.ProgressEvent = createjs.promote(e, "Event"));
  })(window),
  function () {
    function t(e, s) {
      function r(t) {
        if (r[t] !== m) return r[t];
        var e;
        if ("bug-string-char-index" == t) e = "a" != "a"[0];
        else if ("json" == t) e = r("json-stringify") && r("json-parse");
        else {
          var i,
            n = '{"a":[1,true,false,null,"\\u0000\\b\\n\\f\\r\\t"]}';
          if ("json-stringify" == t) {
            var h = s.stringify,
              l = "function" == typeof h && y;
            if (l) {
              (i = function () {
                return 1;
              }).toJSON = i;
              try {
                l =
                  "0" === h(0) &&
                  "0" === h(new a()) &&
                  '""' == h(new o()) &&
                  h(v) === m &&
                  h(m) === m &&
                  h() === m &&
                  "1" === h(i) &&
                  "[1]" == h([i]) &&
                  "[null]" == h([m]) &&
                  "null" == h(null) &&
                  "[null,null,null]" == h([m, v, null]) &&
                  h({ a: [i, !0, !1, null, "\0\b\n\f\r\t"] }) == n &&
                  "1" === h(null, i) &&
                  "[\n 1,\n 2\n]" == h([1, 2], null, 1) &&
                  '"-271821-04-20T00:00:00.000Z"' == h(new c(-864e13)) &&
                  '"+275760-09-13T00:00:00.000Z"' == h(new c(864e13)) &&
                  '"-000001-01-01T00:00:00.000Z"' == h(new c(-621987552e5)) &&
                  '"1969-12-31T23:59:59.999Z"' == h(new c(-1));
              } catch (u) {
                l = !1;
              }
            }
            e = l;
          }
          if ("json-parse" == t) {
            var d = s.parse;
            if ("function" == typeof d)
              try {
                if (0 === d("0") && !d(!1)) {
                  i = d(n);
                  var _ = 5 == i.a.length && 1 === i.a[0];
                  if (_) {
                    try {
                      _ = !d('"\t"');
                    } catch (u) {}
                    if (_)
                      try {
                        _ = 1 !== d("01");
                      } catch (u) {}
                    if (_)
                      try {
                        _ = 1 !== d("1.");
                      } catch (u) {}
                  }
                }
              } catch (u) {
                _ = !1;
              }
            e = _;
          }
        }
        return (r[t] = !!e);
      }
      e || (e = n.Object()), s || (s = n.Object());
      var a = e.Number || n.Number,
        o = e.String || n.String,
        h = e.Object || n.Object,
        c = e.Date || n.Date,
        l = e.SyntaxError || n.SyntaxError,
        u = e.TypeError || n.TypeError,
        d = e.Math || n.Math,
        _ = e.JSON || n.JSON;
      "object" == typeof _ &&
        _ &&
        ((s.stringify = _.stringify), (s.parse = _.parse));
      var p,
        f,
        m,
        g = h.prototype,
        v = g.toString,
        y = new c(-0xc782b5b800cec);
      try {
        y =
          -109252 == y.getUTCFullYear() &&
          0 === y.getUTCMonth() &&
          1 === y.getUTCDate() &&
          10 == y.getUTCHours() &&
          37 == y.getUTCMinutes() &&
          6 == y.getUTCSeconds() &&
          708 == y.getUTCMilliseconds();
      } catch (b) {}
      if (!r("json")) {
        var w = "[object Function]",
          x = "[object Date]",
          T = "[object Number]",
          S = "[object String]",
          P = "[object Array]",
          E = "[object Boolean]",
          j = r("bug-string-char-index");
        if (!y)
          var A = d.floor,
            L = [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334],
            M = function (t, e) {
              return (
                L[e] +
                365 * (t - 1970) +
                A((t - 1969 + (e = +(e > 1))) / 4) -
                A((t - 1901 + e) / 100) +
                A((t - 1601 + e) / 400)
              );
            };
        if (
          ((p = g.hasOwnProperty) ||
            (p = function (t) {
              var e,
                i = {};
              return (
                ((i.__proto__ = null), (i.__proto__ = { toString: 1 }), i)
                  .toString != v
                  ? (p = function (t) {
                      var e = this.__proto__,
                        i = t in ((this.__proto__ = null), this);
                      return (this.__proto__ = e), i;
                    })
                  : ((e = i.constructor),
                    (p = function (t) {
                      var i = (this.constructor || e).prototype;
                      return t in this && !(t in i && this[t] === i[t]);
                    })),
                (i = null),
                p.call(this, t)
              );
            }),
          (f = function (t, e) {
            var s,
              n,
              r,
              a = 0;
            ((s = function () {
              this.valueOf = 0;
            }).prototype.valueOf = 0),
              (n = new s());
            for (r in n) p.call(n, r) && a++;
            return (
              (s = n = null),
              a
                ? (f =
                    2 == a
                      ? function (t, e) {
                          var i,
                            s = {},
                            n = v.call(t) == w;
                          for (i in t)
                            (n && "prototype" == i) ||
                              p.call(s, i) ||
                              !(s[i] = 1) ||
                              !p.call(t, i) ||
                              e(i);
                        }
                      : function (t, e) {
                          var i,
                            s,
                            n = v.call(t) == w;
                          for (i in t)
                            (n && "prototype" == i) ||
                              !p.call(t, i) ||
                              (s = "constructor" === i) ||
                              e(i);
                          (s || p.call(t, (i = "constructor"))) && e(i);
                        })
                : ((n = [
                    "valueOf",
                    "toString",
                    "toLocaleString",
                    "propertyIsEnumerable",
                    "isPrototypeOf",
                    "hasOwnProperty",
                    "constructor",
                  ]),
                  (f = function (t, e) {
                    var s,
                      r,
                      a = v.call(t) == w,
                      o =
                        (!a &&
                          "function" != typeof t.constructor &&
                          i[typeof t.hasOwnProperty] &&
                          t.hasOwnProperty) ||
                        p;
                    for (s in t)
                      (a && "prototype" == s) || !o.call(t, s) || e(s);
                    for (r = n.length; (s = n[--r]); o.call(t, s) && e(s));
                  })),
              f(t, e)
            );
          }),
          !r("json-stringify"))
        ) {
          var R = {
              92: "\\\\",
              34: '\\"',
              8: "\\b",
              12: "\\f",
              10: "\\n",
              13: "\\r",
              9: "\\t",
            },
            C = "000000",
            I = function (t, e) {
              return (C + (e || 0)).slice(-t);
            },
            D = "\\u00",
            O = function (t) {
              for (
                var e = '"',
                  i = 0,
                  s = t.length,
                  n = !j || s > 10,
                  r = n && (j ? t.split("") : t);
                s > i;
                i++
              ) {
                var a = t.charCodeAt(i);
                switch (a) {
                  case 8:
                  case 9:
                  case 10:
                  case 12:
                  case 13:
                  case 34:
                  case 92:
                    e += R[a];
                    break;
                  default:
                    if (32 > a) {
                      e += D + I(2, a.toString(16));
                      break;
                    }
                    e += n ? r[i] : t.charAt(i);
                }
              }
              return e + '"';
            },
            k = function (t, e, i, s, n, r, a) {
              var o, h, c, l, d, _, g, y, b, w, j, L, R, C, D, N;
              try {
                o = e[t];
              } catch (F) {}
              if ("object" == typeof o && o)
                if (((h = v.call(o)), h != x || p.call(o, "toJSON")))
                  "function" == typeof o.toJSON &&
                    ((h != T && h != S && h != P) || p.call(o, "toJSON")) &&
                    (o = o.toJSON(t));
                else if (o > -1 / 0 && 1 / 0 > o) {
                  if (M) {
                    for (
                      d = A(o / 864e5), c = A(d / 365.2425) + 1970 - 1;
                      M(c + 1, 0) <= d;
                      c++
                    );
                    for (l = A((d - M(c, 0)) / 30.42); M(c, l + 1) <= d; l++);
                    (d = 1 + d - M(c, l)),
                      (_ = ((o % 864e5) + 864e5) % 864e5),
                      (g = A(_ / 36e5) % 24),
                      (y = A(_ / 6e4) % 60),
                      (b = A(_ / 1e3) % 60),
                      (w = _ % 1e3);
                  } else
                    (c = o.getUTCFullYear()),
                      (l = o.getUTCMonth()),
                      (d = o.getUTCDate()),
                      (g = o.getUTCHours()),
                      (y = o.getUTCMinutes()),
                      (b = o.getUTCSeconds()),
                      (w = o.getUTCMilliseconds());
                  o =
                    (0 >= c || c >= 1e4
                      ? (0 > c ? "-" : "+") + I(6, 0 > c ? -c : c)
                      : I(4, c)) +
                    "-" +
                    I(2, l + 1) +
                    "-" +
                    I(2, d) +
                    "T" +
                    I(2, g) +
                    ":" +
                    I(2, y) +
                    ":" +
                    I(2, b) +
                    "." +
                    I(3, w) +
                    "Z";
                } else o = null;
              if ((i && (o = i.call(e, t, o)), null === o)) return "null";
              if (((h = v.call(o)), h == E)) return "" + o;
              if (h == T) return o > -1 / 0 && 1 / 0 > o ? "" + o : "null";
              if (h == S) return O("" + o);
              if ("object" == typeof o) {
                for (C = a.length; C--; ) if (a[C] === o) throw u();
                if ((a.push(o), (j = []), (D = r), (r += n), h == P)) {
                  for (R = 0, C = o.length; C > R; R++)
                    (L = k(R, o, i, s, n, r, a)), j.push(L === m ? "null" : L);
                  N = j.length
                    ? n
                      ? "[\n" + r + j.join(",\n" + r) + "\n" + D + "]"
                      : "[" + j.join(",") + "]"
                    : "[]";
                } else
                  f(s || o, function (t) {
                    var e = k(t, o, i, s, n, r, a);
                    e !== m && j.push(O(t) + ":" + (n ? " " : "") + e);
                  }),
                    (N = j.length
                      ? n
                        ? "{\n" + r + j.join(",\n" + r) + "\n" + D + "}"
                        : "{" + j.join(",") + "}"
                      : "{}");
                return a.pop(), N;
              }
            };
          s.stringify = function (t, e, s) {
            var n, r, a, o;
            if (i[typeof e] && e)
              if ((o = v.call(e)) == w) r = e;
              else if (o == P) {
                a = {};
                for (
                  var h, c = 0, l = e.length;
                  l > c;
                  h = e[c++], o = v.call(h), (o == S || o == T) && (a[h] = 1)
                );
              }
            if (s)
              if ((o = v.call(s)) == T) {
                if ((s -= s % 1) > 0)
                  for (n = "", s > 10 && (s = 10); n.length < s; n += " ");
              } else o == S && (n = s.length <= 10 ? s : s.slice(0, 10));
            return k("", ((h = {}), (h[""] = t), h), r, a, n, "", []);
          };
        }
        if (!r("json-parse")) {
          var N,
            F,
            X = o.fromCharCode,
            B = {
              92: "\\",
              34: '"',
              47: "/",
              98: "\b",
              116: "\t",
              110: "\n",
              102: "\f",
              114: "\r",
            },
            H = function () {
              throw ((N = F = null), l());
            },
            U = function () {
              for (var t, e, i, s, n, r = F, a = r.length; a > N; )
                switch ((n = r.charCodeAt(N))) {
                  case 9:
                  case 10:
                  case 13:
                  case 32:
                    N++;
                    break;
                  case 123:
                  case 125:
                  case 91:
                  case 93:
                  case 58:
                  case 44:
                    return (t = j ? r.charAt(N) : r[N]), N++, t;
                  case 34:
                    for (t = "@", N++; a > N; )
                      if (((n = r.charCodeAt(N)), 32 > n)) H();
                      else if (92 == n)
                        switch ((n = r.charCodeAt(++N))) {
                          case 92:
                          case 34:
                          case 47:
                          case 98:
                          case 116:
                          case 110:
                          case 102:
                          case 114:
                            (t += B[n]), N++;
                            break;
                          case 117:
                            for (e = ++N, i = N + 4; i > N; N++)
                              (n = r.charCodeAt(N)),
                                (n >= 48 && 57 >= n) ||
                                  (n >= 97 && 102 >= n) ||
                                  (n >= 65 && 70 >= n) ||
                                  H();
                            t += X("0x" + r.slice(e, N));
                            break;
                          default:
                            H();
                        }
                      else {
                        if (34 == n) break;
                        for (
                          n = r.charCodeAt(N), e = N;
                          n >= 32 && 92 != n && 34 != n;

                        )
                          n = r.charCodeAt(++N);
                        t += r.slice(e, N);
                      }
                    if (34 == r.charCodeAt(N)) return N++, t;
                    H();
                  default:
                    if (
                      ((e = N),
                      45 == n && ((s = !0), (n = r.charCodeAt(++N))),
                      n >= 48 && 57 >= n)
                    ) {
                      for (
                        48 == n &&
                          ((n = r.charCodeAt(N + 1)), n >= 48 && 57 >= n) &&
                          H(),
                          s = !1;
                        a > N && ((n = r.charCodeAt(N)), n >= 48 && 57 >= n);
                        N++
                      );
                      if (46 == r.charCodeAt(N)) {
                        for (
                          i = ++N;
                          a > i && ((n = r.charCodeAt(i)), n >= 48 && 57 >= n);
                          i++
                        );
                        i == N && H(), (N = i);
                      }
                      if (((n = r.charCodeAt(N)), 101 == n || 69 == n)) {
                        for (
                          n = r.charCodeAt(++N),
                            (43 == n || 45 == n) && N++,
                            i = N;
                          a > i && ((n = r.charCodeAt(i)), n >= 48 && 57 >= n);
                          i++
                        );
                        i == N && H(), (N = i);
                      }
                      return +r.slice(e, N);
                    }
                    if ((s && H(), "true" == r.slice(N, N + 4)))
                      return (N += 4), !0;
                    if ("false" == r.slice(N, N + 5)) return (N += 5), !1;
                    if ("null" == r.slice(N, N + 4)) return (N += 4), null;
                    H();
                }
              return "$";
            },
            Y = function (t) {
              var e, i;
              if (("$" == t && H(), "string" == typeof t)) {
                if ("@" == (j ? t.charAt(0) : t[0])) return t.slice(1);
                if ("[" == t) {
                  for (e = []; (t = U()), "]" != t; i || (i = !0))
                    i && ("," == t ? ((t = U()), "]" == t && H()) : H()),
                      "," == t && H(),
                      e.push(Y(t));
                  return e;
                }
                if ("{" == t) {
                  for (e = {}; (t = U()), "}" != t; i || (i = !0))
                    i && ("," == t ? ((t = U()), "}" == t && H()) : H()),
                      ("," == t ||
                        "string" != typeof t ||
                        "@" != (j ? t.charAt(0) : t[0]) ||
                        ":" != U()) &&
                        H(),
                      (e[t.slice(1)] = Y(U()));
                  return e;
                }
                H();
              }
              return t;
            },
            q = function (t, e, i) {
              var s = G(t, e, i);
              s === m ? delete t[e] : (t[e] = s);
            },
            G = function (t, e, i) {
              var s,
                n = t[e];
              if ("object" == typeof n && n)
                if (v.call(n) == P) for (s = n.length; s--; ) q(n, s, i);
                else
                  f(n, function (t) {
                    q(n, t, i);
                  });
              return i.call(t, e, n);
            };
          s.parse = function (t, e) {
            var i, s;
            return (
              (N = 0),
              (F = "" + t),
              (i = Y(U())),
              "$" != U() && H(),
              (N = F = null),
              e && v.call(e) == w ? G(((s = {}), (s[""] = i), s), "", e) : i
            );
          };
        }
      }
      return (s.runInContext = t), s;
    }
    var e = "function" == typeof define && define.amd,
      i = { function: !0, object: !0 },
      s = i[typeof exports] && exports && !exports.nodeType && exports,
      n = (i[typeof window] && window) || this,
      r =
        s &&
        i[typeof module] &&
        module &&
        !module.nodeType &&
        "object" == typeof global &&
        global;
    if (
      (!r || (r.global !== r && r.window !== r && r.self !== r) || (n = r),
      s && !e)
    )
      t(n, s);
    else {
      var a = n.JSON,
        o = n.JSON3,
        h = !1,
        c = t(
          n,
          (n.JSON3 = {
            noConflict: function () {
              return (
                h || ((h = !0), (n.JSON = a), (n.JSON3 = o), (a = o = null)), c
              );
            },
          })
        );
      n.JSON = { parse: c.parse, stringify: c.stringify };
    }
    e &&
      define(function () {
        return c;
      });
  }.call(this),
  (function () {
    var t = {};
    (t.appendToHead = function (e) {
      t.getHead().appendChild(e);
    }),
      (t.getHead = function () {
        return document.head || document.getElementsByTagName("head")[0];
      }),
      (t.getBody = function () {
        return document.body || document.getElementsByTagName("body")[0];
      }),
      (createjs.DomUtils = t);
  })(),
  (function () {
    var t = {};
    (t.parseXML = function (t, e) {
      var i = null;
      try {
        if (window.DOMParser) {
          var s = new DOMParser();
          i = s.parseFromString(t, e);
        }
      } catch (n) {}
      if (!i)
        try {
          (i = new ActiveXObject("Microsoft.XMLDOM")),
            (i.async = !1),
            i.loadXML(t);
        } catch (n) {
          i = null;
        }
      return i;
    }),
      (t.parseJSON = function (t) {
        if (null == t) return null;
        try {
          return JSON.parse(t);
        } catch (e) {
          throw e;
        }
      }),
      (createjs.DataUtils = t);
  })(),
  (this.createjs = this.createjs || {}),
  (function () {
    "use strict";
    function t() {
      (this.src = null),
        (this.type = null),
        (this.id = null),
        (this.maintainOrder = !1),
        (this.callback = null),
        (this.data = null),
        (this.method = createjs.LoadItem.GET),
        (this.values = null),
        (this.headers = null),
        (this.withCredentials = !1),
        (this.mimeType = null),
        (this.crossOrigin = null),
        (this.loadTimeout = i.LOAD_TIMEOUT_DEFAULT);
    }
    var e = (t.prototype = {}),
      i = t;
    (i.LOAD_TIMEOUT_DEFAULT = 8e3),
      (i.create = function (e) {
        if ("string" == typeof e) {
          var s = new t();
          return (s.src = e), s;
        }
        if (e instanceof i) return e;
        if (e instanceof Object && e.src)
          return (
            null == e.loadTimeout && (e.loadTimeout = i.LOAD_TIMEOUT_DEFAULT), e
          );
        throw new Error("Type not recognized.");
      }),
      (e.set = function (t) {
        for (var e in t) this[e] = t[e];
        return this;
      }),
      (createjs.LoadItem = i);
  })(),
  (function () {
    var t = {};
    (t.ABSOLUTE_PATT = /^(?:\w+:)?\/{2}/i),
      (t.RELATIVE_PATT = /^[.\/]*?\//i),
      (t.EXTENSION_PATT = /\/?[^\/]+\.(\w{1,5})$/i),
      (t.parseURI = function (e) {
        var i = { absolute: !1, relative: !1 };
        if (null == e) return i;
        var s = e.indexOf("?");
        s > -1 && (e = e.substr(0, s));
        var n;
        return (
          t.ABSOLUTE_PATT.test(e)
            ? (i.absolute = !0)
            : t.RELATIVE_PATT.test(e) && (i.relative = !0),
          (n = e.match(t.EXTENSION_PATT)) && (i.extension = n[1].toLowerCase()),
          i
        );
      }),
      (t.formatQueryString = function (t, e) {
        if (null == t) throw new Error("You must specify data.");
        var i = [];
        for (var s in t) i.push(s + "=" + escape(t[s]));
        return e && (i = i.concat(e)), i.join("&");
      }),
      (t.buildPath = function (t, e) {
        if (null == e) return t;
        var i = [],
          s = t.indexOf("?");
        if (-1 != s) {
          var n = t.slice(s + 1);
          i = i.concat(n.split("&"));
        }
        return -1 != s
          ? t.slice(0, s) + "?" + this.formatQueryString(e, i)
          : t + "?" + this.formatQueryString(e, i);
      }),
      (t.isCrossDomain = function (t) {
        var e = document.createElement("a");
        e.href = t.src;
        var i = document.createElement("a");
        i.href = location.href;
        var s =
          "" != e.hostname &&
          (e.port != i.port ||
            e.protocol != i.protocol ||
            e.hostname != i.hostname);
        return s;
      }),
      (t.isLocal = function (t) {
        var e = document.createElement("a");
        return (e.href = t.src), "" == e.hostname && "file:" == e.protocol;
      }),
      (t.isBinary = function (t) {
        switch (t) {
          case createjs.AbstractLoader.IMAGE:
          case createjs.AbstractLoader.BINARY:
            return !0;
          default:
            return !1;
        }
      }),
      (t.isImageTag = function (t) {
        return t instanceof HTMLImageElement;
      }),
      (t.isAudioTag = function (t) {
        return !!window.HTMLAudioElement && t instanceof HTMLAudioElement;
      }),
      (t.isVideoTag = function (t) {
        return !!window.HTMLVideoElement && t instanceof HTMLVideoElement;
      }),
      (t.isText = function (t) {
        switch (t) {
          case createjs.AbstractLoader.TEXT:
          case createjs.AbstractLoader.JSON:
          case createjs.AbstractLoader.MANIFEST:
          case createjs.AbstractLoader.XML:
          case createjs.AbstractLoader.CSS:
          case createjs.AbstractLoader.SVG:
          case createjs.AbstractLoader.JAVASCRIPT:
          case createjs.AbstractLoader.SPRITESHEET:
            return !0;
          default:
            return !1;
        }
      }),
      (t.getTypeByExtension = function (t) {
        if (null == t) return createjs.AbstractLoader.TEXT;
        switch (t.toLowerCase()) {
          case "jpeg":
          case "jpg":
          case "gif":
          case "png":
          case "webp":
          case "bmp":
            return createjs.AbstractLoader.IMAGE;
          case "ogg":
          case "mp3":
          case "webm":
            return createjs.AbstractLoader.SOUND;
          case "mp4":
          case "webm":
          case "ts":
            return createjs.AbstractLoader.VIDEO;
          case "json":
            return createjs.AbstractLoader.JSON;
          case "xml":
            return createjs.AbstractLoader.XML;
          case "css":
            return createjs.AbstractLoader.CSS;
          case "js":
            return createjs.AbstractLoader.JAVASCRIPT;
          case "svg":
            return createjs.AbstractLoader.SVG;
          default:
            return createjs.AbstractLoader.TEXT;
        }
      }),
      (createjs.RequestUtils = t);
  })(),
  (this.createjs = this.createjs || {}),
  (function () {
    "use strict";
    function t(t, e, i) {
      this.EventDispatcher_constructor(),
        (this.loaded = !1),
        (this.canceled = !1),
        (this.progress = 0),
        (this.type = i),
        (this.resultFormatter = null),
        t ? (this._item = createjs.LoadItem.create(t)) : (this._item = null),
        (this._preferXHR = e),
        (this._result = null),
        (this._rawResult = null),
        (this._loadedItems = null),
        (this._tagSrcAttribute = null),
        (this._tag = null);
    }
    var e = createjs.extend(t, createjs.EventDispatcher),
      i = t;
    (i.POST = "POST"),
      (i.GET = "GET"),
      (i.BINARY = "binary"),
      (i.CSS = "css"),
      (i.IMAGE = "image"),
      (i.JAVASCRIPT = "javascript"),
      (i.JSON = "json"),
      (i.JSONP = "jsonp"),
      (i.MANIFEST = "manifest"),
      (i.SOUND = "sound"),
      (i.VIDEO = "video"),
      (i.SPRITESHEET = "spritesheet"),
      (i.SVG = "svg"),
      (i.TEXT = "text"),
      (i.XML = "xml"),
      (e.getItem = function () {
        return this._item;
      }),
      (e.getResult = function (t) {
        return t ? this._rawResult : this._result;
      }),
      (e.getTag = function () {
        return this._tag;
      }),
      (e.setTag = function (t) {
        this._tag = t;
      }),
      (e.load = function () {
        this._createRequest(),
          this._request.on("complete", this, this),
          this._request.on("progress", this, this),
          this._request.on("loadStart", this, this),
          this._request.on("abort", this, this),
          this._request.on("timeout", this, this),
          this._request.on("error", this, this);
        var t = new createjs.Event("initialize");
        (t.loader = this._request), this.dispatchEvent(t), this._request.load();
      }),
      (e.cancel = function () {
        (this.canceled = !0), this.destroy();
      }),
      (e.destroy = function () {
        this._request &&
          (this._request.removeAllEventListeners(), this._request.destroy()),
          (this._request = null),
          (this._item = null),
          (this._rawResult = null),
          (this._result = null),
          (this._loadItems = null),
          this.removeAllEventListeners();
      }),
      (e.getLoadedItems = function () {
        return this._loadedItems;
      }),
      (e._createRequest = function () {
        this._preferXHR
          ? (this._request = new createjs.XHRRequest(this._item))
          : (this._request = new createjs.TagRequest(
              this._item,
              this._tag || this._createTag(),
              this._tagSrcAttribute
            ));
      }),
      (e._createTag = function (t) {
        return null;
      }),
      (e._sendLoadStart = function () {
        this._isCanceled() || this.dispatchEvent("loadstart");
      }),
      (e._sendProgress = function (t) {
        if (!this._isCanceled()) {
          var e = null;
          "number" == typeof t
            ? ((this.progress = t),
              (e = new createjs.ProgressEvent(this.progress)))
            : ((e = t),
              (this.progress = t.loaded / t.total),
              (e.progress = this.progress),
              (isNaN(this.progress) || this.progress == 1 / 0) &&
                (this.progress = 0)),
            this.hasEventListener("progress") && this.dispatchEvent(e);
        }
      }),
      (e._sendComplete = function () {
        if (!this._isCanceled()) {
          this.loaded = !0;
          var t = new createjs.Event("complete");
          (t.rawResult = this._rawResult),
            null != this._result && (t.result = this._result),
            this.dispatchEvent(t);
        }
      }),
      (e._sendError = function (t) {
        !this._isCanceled() &&
          this.hasEventListener("error") &&
          (null == t && (t = new createjs.ErrorEvent("PRELOAD_ERROR_EMPTY")),
          this.dispatchEvent(t));
      }),
      (e._isCanceled = function () {
        return !(null != window.createjs && !this.canceled);
      }),
      (e.resultFormatter = null),
      (e.handleEvent = function (t) {
        switch (t.type) {
          case "complete":
            this._rawResult = t.target._response;
            var e = this.resultFormatter && this.resultFormatter(this);
            e instanceof Function
              ? e.call(
                  this,
                  createjs.proxy(this._resultFormatSuccess, this),
                  createjs.proxy(this._resultFormatFailed, this)
                )
              : ((this._result = e || this._rawResult), this._sendComplete());
            break;
          case "progress":
            this._sendProgress(t);
            break;
          case "error":
            this._sendError(t);
            break;
          case "loadstart":
            this._sendLoadStart();
            break;
          case "abort":
          case "timeout":
            this._isCanceled() ||
              this.dispatchEvent(
                new createjs.ErrorEvent(
                  "PRELOAD_" + t.type.toUpperCase() + "_ERROR"
                )
              );
        }
      }),
      (e._resultFormatSuccess = function (t) {
        (this._result = t), this._sendComplete();
      }),
      (e._resultFormatFailed = function (t) {
        this._sendError(t);
      }),
      (e.buildPath = function (t, e) {
        return createjs.RequestUtils.buildPath(t, e);
      }),
      (e.toString = function () {
        return "[PreloadJS AbstractLoader]";
      }),
      (createjs.AbstractLoader = createjs.promote(t, "EventDispatcher"));
  })(),
  (this.createjs = this.createjs || {}),
  (function () {
    "use strict";
    function t(t, e, i) {
      this.AbstractLoader_constructor(t, e, i),
        (this.resultFormatter = this._formatResult),
        (this._tagSrcAttribute = "src"),
        this.on("initialize", this._updateXHR, this);
    }
    var e = createjs.extend(t, createjs.AbstractLoader);
    (e.load = function () {
      this._tag || (this._tag = this._createTag(this._item.src)),
        (this._tag.preload = "auto"),
        this._tag.load(),
        this.AbstractLoader_load();
    }),
      (e._createTag = function () {}),
      (e._createRequest = function () {
        this._preferXHR
          ? (this._request = new createjs.XHRRequest(this._item))
          : (this._request = new createjs.MediaTagRequest(
              this._item,
              this._tag || this._createTag(),
              this._tagSrcAttribute
            ));
      }),
      (e._updateXHR = function (t) {
        t.loader.setResponseType && t.loader.setResponseType("blob");
      }),
      (e._formatResult = function (t) {
        if (
          (this._tag.removeEventListener &&
            this._tag.removeEventListener(
              "canplaythrough",
              this._loadedHandler
            ),
          (this._tag.onstalled = null),
          this._preferXHR)
        ) {
          var e = window.URL || window.webkitURL,
            i = t.getResult(!0);
          t.getTag().src = e.createObjectURL(i);
        }
        return t.getTag();
      }),
      (createjs.AbstractMediaLoader = createjs.promote(t, "AbstractLoader"));
  })(),
  (this.createjs = this.createjs || {}),
  (function () {
    "use strict";
    var t = function (t) {
        this._item = t;
      },
      e = createjs.extend(t, createjs.EventDispatcher);
    (e.load = function () {}),
      (e.destroy = function () {}),
      (e.cancel = function () {}),
      (createjs.AbstractRequest = createjs.promote(t, "EventDispatcher"));
  })(),
  (this.createjs = this.createjs || {}),
  (function () {
    "use strict";
    function t(t, e, i) {
      this.AbstractRequest_constructor(t),
        (this._tag = e),
        (this._tagSrcAttribute = i),
        (this._loadedHandler = createjs.proxy(this._handleTagComplete, this)),
        (this._addedToDOM = !1),
        (this._startTagVisibility = null);
    }
    var e = createjs.extend(t, createjs.AbstractRequest);
    (e.load = function () {
      (this._tag.onload = createjs.proxy(this._handleTagComplete, this)),
        (this._tag.onreadystatechange = createjs.proxy(
          this._handleReadyStateChange,
          this
        )),
        (this._tag.onerror = createjs.proxy(this._handleError, this));
      var t = new createjs.Event("initialize");
      (t.loader = this._tag),
        this.dispatchEvent(t),
        this._hideTag(),
        (this._loadTimeout = setTimeout(
          createjs.proxy(this._handleTimeout, this),
          this._item.loadTimeout
        )),
        (this._tag[this._tagSrcAttribute] = this._item.src),
        null == this._tag.parentNode &&
          (window.document.body.appendChild(this._tag),
          (this._addedToDOM = !0));
    }),
      (e.destroy = function () {
        this._clean(), (this._tag = null), this.AbstractRequest_destroy();
      }),
      (e._handleReadyStateChange = function () {
        clearTimeout(this._loadTimeout);
        var t = this._tag;
        ("loaded" == t.readyState || "complete" == t.readyState) &&
          this._handleTagComplete();
      }),
      (e._handleError = function () {
        this._clean(), this.dispatchEvent("error");
      }),
      (e._handleTagComplete = function () {
        (this._rawResult = this._tag),
          (this._result =
            (this.resultFormatter && this.resultFormatter(this)) ||
            this._rawResult),
          this._clean(),
          this._showTag(),
          this.dispatchEvent("complete");
      }),
      (e._handleTimeout = function () {
        this._clean(), this.dispatchEvent(new createjs.Event("timeout"));
      }),
      (e._clean = function () {
        (this._tag.onload = null),
          (this._tag.onreadystatechange = null),
          (this._tag.onerror = null),
          this._addedToDOM &&
            null != this._tag.parentNode &&
            this._tag.parentNode.removeChild(this._tag),
          clearTimeout(this._loadTimeout);
      }),
      (e._hideTag = function () {
        (this._startTagVisibility = this._tag.style.visibility),
          (this._tag.style.visibility = "hidden");
      }),
      (e._showTag = function () {
        this._tag.style.visibility = this._startTagVisibility;
      }),
      (e._handleStalled = function () {}),
      (createjs.TagRequest = createjs.promote(t, "AbstractRequest"));
  })(),
  (this.createjs = this.createjs || {}),
  (function () {
    "use strict";
    function t(t, e, i) {
      this.AbstractRequest_constructor(t),
        (this._tag = e),
        (this._tagSrcAttribute = i),
        (this._loadedHandler = createjs.proxy(this._handleTagComplete, this));
    }
    var e = createjs.extend(t, createjs.TagRequest);
    (e.load = function () {
      var t = createjs.proxy(this._handleStalled, this);
      this._stalledCallback = t;
      var e = createjs.proxy(this._handleProgress, this);
      (this._handleProgress = e),
        this._tag.addEventListener("stalled", t),
        this._tag.addEventListener("progress", e),
        this._tag.addEventListener &&
          this._tag.addEventListener("canplaythrough", this._loadedHandler, !1),
        this.TagRequest_load();
    }),
      (e._handleReadyStateChange = function () {
        clearTimeout(this._loadTimeout);
        var t = this._tag;
        ("loaded" == t.readyState || "complete" == t.readyState) &&
          this._handleTagComplete();
      }),
      (e._handleStalled = function () {}),
      (e._handleProgress = function (t) {
        if (t && !(t.loaded > 0 && 0 == t.total)) {
          var e = new createjs.ProgressEvent(t.loaded, t.total);
          this.dispatchEvent(e);
        }
      }),
      (e._clean = function () {
        this._tag.removeEventListener &&
          this._tag.removeEventListener("canplaythrough", this._loadedHandler),
          this._tag.removeEventListener("stalled", this._stalledCallback),
          this._tag.removeEventListener("progress", this._progressCallback),
          this.TagRequest__clean();
      }),
      (createjs.MediaTagRequest = createjs.promote(t, "TagRequest"));
  })(),
  (this.createjs = this.createjs || {}),
  (function () {
    "use strict";
    function t(t) {
      this.AbstractRequest_constructor(t),
        (this._request = null),
        (this._loadTimeout = null),
        (this._xhrLevel = 1),
        (this._response = null),
        (this._rawResponse = null),
        (this._canceled = !1),
        (this._handleLoadStartProxy = createjs.proxy(
          this._handleLoadStart,
          this
        )),
        (this._handleProgressProxy = createjs.proxy(
          this._handleProgress,
          this
        )),
        (this._handleAbortProxy = createjs.proxy(this._handleAbort, this)),
        (this._handleErrorProxy = createjs.proxy(this._handleError, this)),
        (this._handleTimeoutProxy = createjs.proxy(this._handleTimeout, this)),
        (this._handleLoadProxy = createjs.proxy(this._handleLoad, this)),
        (this._handleReadyStateChangeProxy = createjs.proxy(
          this._handleReadyStateChange,
          this
        )),
        !this._createXHR(t);
    }
    var e = createjs.extend(t, createjs.AbstractRequest);
    (t.ACTIVEX_VERSIONS = [
      "Msxml2.XMLHTTP.6.0",
      "Msxml2.XMLHTTP.5.0",
      "Msxml2.XMLHTTP.4.0",
      "MSXML2.XMLHTTP.3.0",
      "MSXML2.XMLHTTP",
      "Microsoft.XMLHTTP",
    ]),
      (e.getResult = function (t) {
        return t && this._rawResponse ? this._rawResponse : this._response;
      }),
      (e.cancel = function () {
        (this.canceled = !0), this._clean(), this._request.abort();
      }),
      (e.load = function () {
        if (null == this._request) return void this._handleError();
        null != this._request.addEventListener
          ? (this._request.addEventListener(
              "loadstart",
              this._handleLoadStartProxy,
              !1
            ),
            this._request.addEventListener(
              "progress",
              this._handleProgressProxy,
              !1
            ),
            this._request.addEventListener("abort", this._handleAbortProxy, !1),
            this._request.addEventListener("error", this._handleErrorProxy, !1),
            this._request.addEventListener(
              "timeout",
              this._handleTimeoutProxy,
              !1
            ),
            this._request.addEventListener("load", this._handleLoadProxy, !1),
            this._request.addEventListener(
              "readystatechange",
              this._handleReadyStateChangeProxy,
              !1
            ))
          : ((this._request.onloadstart = this._handleLoadStartProxy),
            (this._request.onprogress = this._handleProgressProxy),
            (this._request.onabort = this._handleAbortProxy),
            (this._request.onerror = this._handleErrorProxy),
            (this._request.ontimeout = this._handleTimeoutProxy),
            (this._request.onload = this._handleLoadProxy),
            (this._request.onreadystatechange =
              this._handleReadyStateChangeProxy)),
          1 == this._xhrLevel &&
            (this._loadTimeout = setTimeout(
              createjs.proxy(this._handleTimeout, this),
              this._item.loadTimeout
            ));
        try {
          this._item.values && this._item.method != createjs.AbstractLoader.GET
            ? this._item.method == createjs.AbstractLoader.POST &&
              this._request.send(
                createjs.RequestUtils.formatQueryString(this._item.values)
              )
            : this._request.send();
        } catch (t) {
          this.dispatchEvent(new createjs.ErrorEvent("XHR_SEND", null, t));
        }
      }),
      (e.setResponseType = function (t) {
        "blob" === t &&
          ((t = window.URL ? "blob" : "arraybuffer"), (this._responseType = t)),
          (this._request.responseType = t);
      }),
      (e.getAllResponseHeaders = function () {
        return this._request.getAllResponseHeaders instanceof Function
          ? this._request.getAllResponseHeaders()
          : null;
      }),
      (e.getResponseHeader = function (t) {
        return this._request.getResponseHeader instanceof Function
          ? this._request.getResponseHeader(t)
          : null;
      }),
      (e._handleProgress = function (t) {
        if (t && !(t.loaded > 0 && 0 == t.total)) {
          var e = new createjs.ProgressEvent(t.loaded, t.total);
          this.dispatchEvent(e);
        }
      }),
      (e._handleLoadStart = function (t) {
        clearTimeout(this._loadTimeout), this.dispatchEvent("loadstart");
      }),
      (e._handleAbort = function (t) {
        this._clean(),
          this.dispatchEvent(new createjs.ErrorEvent("XHR_ABORTED", null, t));
      }),
      (e._handleError = function (t) {
        this._clean(), this.dispatchEvent(new createjs.ErrorEvent(t.message));
      }),
      (e._handleReadyStateChange = function (t) {
        4 == this._request.readyState && this._handleLoad();
      }),
      (e._handleLoad = function (t) {
        if (!this.loaded) {
          this.loaded = !0;
          var e = this._checkError();
          if (e) return void this._handleError(e);
          if (
            ((this._response = this._getResponse()),
            "arraybuffer" === this._responseType)
          )
            try {
              this._response = new Blob([this._response]);
            } catch (i) {
              if (
                ((window.BlobBuilder =
                  window.BlobBuilder ||
                  window.WebKitBlobBuilder ||
                  window.MozBlobBuilder ||
                  window.MSBlobBuilder),
                "TypeError" === i.name && window.BlobBuilder)
              ) {
                var s = new BlobBuilder();
                s.append(this._response), (this._response = s.getBlob());
              }
            }
          this._clean(), this.dispatchEvent(new createjs.Event("complete"));
        }
      }),
      (e._handleTimeout = function (t) {
        this._clean(),
          this.dispatchEvent(
            new createjs.ErrorEvent("PRELOAD_TIMEOUT", null, t)
          );
      }),
      (e._checkError = function () {
        var t = parseInt(this._request.status);
        switch (t) {
          case 404:
          case 0:
            return new Error(t);
        }
        return null;
      }),
      (e._getResponse = function () {
        if (null != this._response) return this._response;
        if (null != this._request.response) return this._request.response;
        try {
          if (null != this._request.responseText)
            return this._request.responseText;
        } catch (t) {}
        try {
          if (null != this._request.responseXML)
            return this._request.responseXML;
        } catch (t) {}
        return null;
      }),
      (e._createXHR = function (t) {
        var e = createjs.RequestUtils.isCrossDomain(t),
          i = {},
          n = null;
        if (window.XMLHttpRequest)
          (n = new XMLHttpRequest()),
            e &&
              void 0 === n.withCredentials &&
              window.XDomainRequest &&
              (n = new XDomainRequest());
        else {
          for (var r = 0, a = s.ACTIVEX_VERSIONS.length; a > r; r++) {
            var o = s.ACTIVEX_VERSIONS[r];
            try {
              n = new ActiveXObject(o);
              break;
            } catch (h) {}
          }
          if (null == n) return !1;
        }
        null == t.mimeType &&
          createjs.RequestUtils.isText(t.type) &&
          (t.mimeType = "text/plain; charset=utf-8"),
          t.mimeType && n.overrideMimeType && n.overrideMimeType(t.mimeType),
          (this._xhrLevel = "string" == typeof n.responseType ? 2 : 1);
        var c = null;
        if (
          ((c =
            t.method == createjs.AbstractLoader.GET
              ? createjs.RequestUtils.buildPath(t.src, t.values)
              : t.src),
          n.open(t.method || createjs.AbstractLoader.GET, c, !0),
          e &&
            n instanceof XMLHttpRequest &&
            1 == this._xhrLevel &&
            (i.Origin = location.origin),
          t.values &&
            t.method == createjs.AbstractLoader.POST &&
            (i["Content-Type"] = "application/x-www-form-urlencoded"),
          e ||
            i["X-Requested-With"] ||
            (i["X-Requested-With"] = "XMLHttpRequest"),
          t.headers)
        )
          for (var l in t.headers) i[l] = t.headers[l];
        for (l in i) n.setRequestHeader(l, i[l]);
        return (
          n instanceof XMLHttpRequest &&
            void 0 !== t.withCredentials &&
            (n.withCredentials = t.withCredentials),
          (this._request = n),
          !0
        );
      }),
      (e._clean = function () {
        clearTimeout(this._loadTimeout),
          null != this._request.removeEventListener
            ? (this._request.removeEventListener(
                "loadstart",
                this._handleLoadStartProxy
              ),
              this._request.removeEventListener(
                "progress",
                this._handleProgressProxy
              ),
              this._request.removeEventListener(
                "abort",
                this._handleAbortProxy
              ),
              this._request.removeEventListener(
                "error",
                this._handleErrorProxy
              ),
              this._request.removeEventListener(
                "timeout",
                this._handleTimeoutProxy
              ),
              this._request.removeEventListener("load", this._handleLoadProxy),
              this._request.removeEventListener(
                "readystatechange",
                this._handleReadyStateChangeProxy
              ))
            : ((this._request.onloadstart = null),
              (this._request.onprogress = null),
              (this._request.onabort = null),
              (this._request.onerror = null),
              (this._request.ontimeout = null),
              (this._request.onload = null),
              (this._request.onreadystatechange = null));
      }),
      (e.toString = function () {
        return "[PreloadJS XHRRequest]";
      }),
      (createjs.XHRRequest = createjs.promote(t, "AbstractRequest"));
  })(),
  (this.createjs = this.createjs || {}),
  (function () {
    "use strict";
    function t(t, e, i) {
      this.AbstractLoader_constructor(),
        (this._plugins = []),
        (this._typeCallbacks = {}),
        (this._extensionCallbacks = {}),
        (this.next = null),
        (this.maintainScriptOrder = !0),
        (this.stopOnError = !1),
        (this._maxConnections = 1),
        (this._availableLoaders = [
          createjs.ImageLoader,
          createjs.JavaScriptLoader,
          createjs.CSSLoader,
          createjs.JSONLoader,
          createjs.JSONPLoader,
          createjs.SoundLoader,
          createjs.ManifestLoader,
          createjs.SpriteSheetLoader,
          createjs.XMLLoader,
          createjs.SVGLoader,
          createjs.BinaryLoader,
          createjs.VideoLoader,
          createjs.TextLoader,
        ]),
        (this._defaultLoaderLength = this._availableLoaders.length),
        this.init(t, e, i);
    }
    var e = createjs.extend(t, createjs.AbstractLoader),
      i = t;
    (e.init = function (t, e, i) {
      (this.useXHR = !0),
        (this.preferXHR = !0),
        (this._preferXHR = !0),
        this.setPreferXHR(t),
        (this._paused = !1),
        (this._basePath = e),
        (this._crossOrigin = i),
        (this._loadStartWasDispatched = !1),
        (this._currentlyLoadingScript = null),
        (this._currentLoads = []),
        (this._loadQueue = []),
        (this._loadQueueBackup = []),
        (this._loadItemsById = {}),
        (this._loadItemsBySrc = {}),
        (this._loadedResults = {}),
        (this._loadedRawResults = {}),
        (this._numItems = 0),
        (this._numItemsLoaded = 0),
        (this._scriptOrder = []),
        (this._loadedScripts = []),
        (this._lastProgress = NaN);
    }),
      (i.loadTimeout = 8e3),
      (i.LOAD_TIMEOUT = 0),
      (i.BINARY = createjs.AbstractLoader.BINARY),
      (i.CSS = createjs.AbstractLoader.CSS),
      (i.IMAGE = createjs.AbstractLoader.IMAGE),
      (i.JAVASCRIPT = createjs.AbstractLoader.JAVASCRIPT),
      (i.JSON = createjs.AbstractLoader.JSON),
      (i.JSONP = createjs.AbstractLoader.JSONP),
      (i.MANIFEST = createjs.AbstractLoader.MANIFEST),
      (i.SOUND = createjs.AbstractLoader.SOUND),
      (i.VIDEO = createjs.AbstractLoader.VIDEO),
      (i.SVG = createjs.AbstractLoader.SVG),
      (i.TEXT = createjs.AbstractLoader.TEXT),
      (i.XML = createjs.AbstractLoader.XML),
      (i.POST = createjs.AbstractLoader.POST),
      (i.GET = createjs.AbstractLoader.GET),
      (e.registerLoader = function (t) {
        if (!t || !t.canLoadItem)
          throw new Error("loader is of an incorrect type.");
        if (-1 != this._availableLoaders.indexOf(t))
          throw new Error("loader already exists.");
        this._availableLoaders.unshift(t);
      }),
      (e.unregisterLoader = function (t) {
        var e = this._availableLoaders.indexOf(t);
        -1 != e &&
          e < this._defaultLoaderLength - 1 &&
          this._availableLoaders.splice(e, 1);
      }),
      (e.setUseXHR = function (t) {
        return this.setPreferXHR(t);
      }),
      (e.setPreferXHR = function (t) {
        return (
          (this.preferXHR = 0 != t && null != window.XMLHttpRequest),
          this.preferXHR
        );
      }),
      (e.removeAll = function () {
        this.remove();
      }),
      (e.remove = function (t) {
        var e = null;
        if (t && !Array.isArray(t)) e = [t];
        else if (t) e = t;
        else if (arguments.length > 0) return;
        var i = !1;
        if (e) {
          for (; e.length; ) {
            var s = e.pop(),
              n = this.getResult(s);
            for (r = this._loadQueue.length - 1; r >= 0; r--)
              if (
                ((a = this._loadQueue[r].getItem()), a.id == s || a.src == s)
              ) {
                this._loadQueue.splice(r, 1)[0].cancel();
                break;
              }
            for (r = this._loadQueueBackup.length - 1; r >= 0; r--)
              if (
                ((a = this._loadQueueBackup[r].getItem()),
                a.id == s || a.src == s)
              ) {
                this._loadQueueBackup.splice(r, 1)[0].cancel();
                break;
              }
            if (n) this._disposeItem(this.getItem(s));
            else
              for (var r = this._currentLoads.length - 1; r >= 0; r--) {
                var a = this._currentLoads[r].getItem();
                if (a.id == s || a.src == s) {
                  this._currentLoads.splice(r, 1)[0].cancel(), (i = !0);
                  break;
                }
              }
          }
          i && this._loadNext();
        } else {
          this.close();
          for (var o in this._loadItemsById)
            this._disposeItem(this._loadItemsById[o]);
          this.init(this.preferXHR, this._basePath);
        }
      }),
      (e.reset = function () {
        this.close();
        for (var t in this._loadItemsById)
          this._disposeItem(this._loadItemsById[t]);
        for (var e = [], i = 0, s = this._loadQueueBackup.length; s > i; i++)
          e.push(this._loadQueueBackup[i].getItem());
        this.loadManifest(e, !1);
      }),
      (e.installPlugin = function (t) {
        if (null != t && null != t.getPreloadHandlers) {
          this._plugins.push(t);
          var e = t.getPreloadHandlers();
          if (((e.scope = t), null != e.types))
            for (var i = 0, s = e.types.length; s > i; i++)
              this._typeCallbacks[e.types[i]] = e;
          if (null != e.extensions)
            for (i = 0, s = e.extensions.length; s > i; i++)
              this._extensionCallbacks[e.extensions[i]] = e;
        }
      }),
      (e.setMaxConnections = function (t) {
        (this._maxConnections = t),
          !this._paused && this._loadQueue.length > 0 && this._loadNext();
      }),
      (e.loadFile = function (t, e, i) {
        if (null == t) {
          var s = new createjs.ErrorEvent("PRELOAD_NO_FILE");
          return void this._sendError(s);
        }
        this._addItem(t, null, i),
          e !== !1 ? this.setPaused(!1) : this.setPaused(!0);
      }),
      (e.loadManifest = function (t, e, s) {
        var n = null,
          r = null;
        if (Array.isArray(t)) {
          if (0 == t.length) {
            var a = new createjs.ErrorEvent("PRELOAD_MANIFEST_EMPTY");
            return void this._sendError(a);
          }
          n = t;
        } else if ("string" == typeof t) n = [{ src: t, type: i.MANIFEST }];
        else {
          if ("object" != typeof t) {
            var a = new createjs.ErrorEvent("PRELOAD_MANIFEST_NULL");
            return void this._sendError(a);
          }
          if (void 0 !== t.src) {
            if (null == t.type) t.type = i.MANIFEST;
            else if (t.type != i.MANIFEST) {
              var a = new createjs.ErrorEvent("PRELOAD_MANIFEST_TYPE");
              this._sendError(a);
            }
            n = [t];
          } else void 0 !== t.manifest && ((n = t.manifest), (r = t.path));
        }
        for (var o = 0, h = n.length; h > o; o++) this._addItem(n[o], r, s);
        e !== !1 ? this.setPaused(!1) : this.setPaused(!0);
      }),
      (e.load = function () {
        this.setPaused(!1);
      }),
      (e.getItem = function (t) {
        return this._loadItemsById[t] || this._loadItemsBySrc[t];
      }),
      (e.getResult = function (t, e) {
        var i = this._loadItemsById[t] || this._loadItemsBySrc[t];
        if (null == i) return null;
        var s = i.id;
        return e && this._loadedRawResults[s]
          ? this._loadedRawResults[s]
          : this._loadedResults[s];
      }),
      (e.getItems = function (t) {
        var e = [];
        for (var i in this._loadItemsById) {
          var s = this._loadItemsById[i],
            n = this.getResult(i);
          (t !== !0 || null != n) &&
            e.push({ item: s, result: n, rawResult: this.getResult(i, !0) });
        }
        return e;
      }),
      (e.setPaused = function (t) {
        (this._paused = t), this._paused || this._loadNext();
      }),
      (e.close = function () {
        for (; this._currentLoads.length; ) this._currentLoads.pop().cancel();
        (this._scriptOrder.length = 0),
          (this._loadedScripts.length = 0),
          (this.loadStartWasDispatched = !1),
          (this._itemCount = 0),
          (this._lastProgress = NaN);
      }),
      (e._addItem = function (t, e, i) {
        var s = this._createLoadItem(t, e, i);
        if (null != s) {
          var n = this._createLoader(s);
          null != n &&
            ("plugins" in n && (n.plugins = this._plugins),
            (s._loader = n),
            this._loadQueue.push(n),
            this._loadQueueBackup.push(n),
            this._numItems++,
            this._updateProgress(),
            ((this.maintainScriptOrder &&
              s.type == createjs.LoadQueue.JAVASCRIPT) ||
              s.maintainOrder === !0) &&
              (this._scriptOrder.push(s), this._loadedScripts.push(null)));
        }
      }),
      (e._createLoadItem = function (t, e, i) {
        var s = createjs.LoadItem.create(t);
        if (null == s) return null;
        var n = "",
          r = i || this._basePath;
        if (s.src instanceof Object) {
          if (!s.type) return null;
          if (e) {
            n = e;
            var a = createjs.RequestUtils.parseURI(e);
            null == r || a.absolute || a.relative || (n = r + n);
          } else null != r && (n = r);
        } else {
          var o = createjs.RequestUtils.parseURI(s.src);
          o.extension && (s.ext = o.extension),
            null == s.type &&
              (s.type = createjs.RequestUtils.getTypeByExtension(s.ext));
          var h = s.src;
          if (!o.absolute && !o.relative)
            if (e) {
              n = e;
              var a = createjs.RequestUtils.parseURI(e);
              (h = e + h), null == r || a.absolute || a.relative || (n = r + n);
            } else null != r && (n = r);
          s.src = n + s.src;
        }
        (s.path = n),
          (void 0 === s.id || null === s.id || "" === s.id) && (s.id = h);
        var c = this._typeCallbacks[s.type] || this._extensionCallbacks[s.ext];
        if (c) {
          var l = c.callback.call(c.scope, s, this);
          if (l === !1) return null;
          l === !0 || (null != l && (s._loader = l)),
            (o = createjs.RequestUtils.parseURI(s.src)),
            null != o.extension && (s.ext = o.extension);
        }
        return (
          (this._loadItemsById[s.id] = s),
          (this._loadItemsBySrc[s.src] = s),
          null == s.crossOrigin && (s.crossOrigin = this._crossOrigin),
          s
        );
      }),
      (e._createLoader = function (t) {
        if (null != t._loader) return t._loader;
        for (
          var e = this.preferXHR, i = 0;
          i < this._availableLoaders.length;
          i++
        ) {
          var s = this._availableLoaders[i];
          if (s && s.canLoadItem(t)) return new s(t, e);
        }
        return null;
      }),
      (e._loadNext = function () {
        if (!this._paused) {
          this._loadStartWasDispatched ||
            (this._sendLoadStart(), (this._loadStartWasDispatched = !0)),
            this._numItems == this._numItemsLoaded
              ? ((this.loaded = !0),
                this._sendComplete(),
                this.next && this.next.load && this.next.load())
              : (this.loaded = !1);
          for (
            var t = 0;
            t < this._loadQueue.length &&
            !(this._currentLoads.length >= this._maxConnections);
            t++
          ) {
            var e = this._loadQueue[t];
            this._canStartLoad(e) &&
              (this._loadQueue.splice(t, 1), t--, this._loadItem(e));
          }
        }
      }),
      (e._loadItem = function (t) {
        t.on("fileload", this._handleFileLoad, this),
          t.on("progress", this._handleProgress, this),
          t.on("complete", this._handleFileComplete, this),
          t.on("error", this._handleError, this),
          t.on("fileerror", this._handleFileError, this),
          this._currentLoads.push(t),
          this._sendFileStart(t.getItem()),
          t.load();
      }),
      (e._handleFileLoad = function (t) {
        (t.target = null), this.dispatchEvent(t);
      }),
      (e._handleFileError = function (t) {
        var e = new createjs.ErrorEvent("FILE_LOAD_ERROR", null, t.item);
        this._sendError(e);
      }),
      (e._handleError = function (t) {
        var e = t.target;
        this._numItemsLoaded++,
          this._finishOrderedItem(e, !0),
          this._updateProgress();
        var i = new createjs.ErrorEvent("FILE_LOAD_ERROR", null, e.getItem());
        this._sendError(i),
          this.stopOnError
            ? this.setPaused(!0)
            : (this._removeLoadItem(e),
              this._cleanLoadItem(e),
              this._loadNext());
      }),
      (e._handleFileComplete = function (t) {
        var e = t.target,
          i = e.getItem(),
          s = e.getResult();
        this._loadedResults[i.id] = s;
        var n = e.getResult(!0);
        null != n && n !== s && (this._loadedRawResults[i.id] = n),
          this._saveLoadedItems(e),
          this._removeLoadItem(e),
          this._finishOrderedItem(e) || this._processFinishedLoad(i, e),
          this._cleanLoadItem(e);
      }),
      (e._saveLoadedItems = function (t) {
        var e = t.getLoadedItems();
        if (null !== e)
          for (var i = 0; i < e.length; i++) {
            var s = e[i].item;
            (this._loadItemsBySrc[s.src] = s),
              (this._loadItemsById[s.id] = s),
              (this._loadedResults[s.id] = e[i].result),
              (this._loadedRawResults[s.id] = e[i].rawResult);
          }
      }),
      (e._finishOrderedItem = function (t, e) {
        var i = t.getItem();
        if (
          (this.maintainScriptOrder &&
            i.type == createjs.LoadQueue.JAVASCRIPT) ||
          i.maintainOrder
        ) {
          t instanceof createjs.JavaScriptLoader &&
            (this._currentlyLoadingScript = !1);
          var s = createjs.indexOf(this._scriptOrder, i);
          return (
            -1 != s &&
            ((this._loadedScripts[s] = e === !0 || i),
            this._checkScriptLoadOrder(),
            !0)
          );
        }
        return !1;
      }),
      (e._checkScriptLoadOrder = function () {
        for (var t = this._loadedScripts.length, e = 0; t > e; e++) {
          var i = this._loadedScripts[e];
          if (null === i) break;
          if (i !== !0) {
            var s = this._loadedResults[i.id];
            i.type == createjs.LoadQueue.JAVASCRIPT &&
              createjs.DomUtils.appendToHead(s);
            var n = i._loader;
            this._processFinishedLoad(i, n), (this._loadedScripts[e] = !0);
          }
        }
      }),
      (e._processFinishedLoad = function (t, e) {
        if (
          (this._numItemsLoaded++,
          !this.maintainScriptOrder && t.type == createjs.LoadQueue.JAVASCRIPT)
        ) {
          var i = e.getTag();
          createjs.DomUtils.appendToHead(i);
        }
        this._updateProgress(), this._sendFileComplete(t, e), this._loadNext();
      }),
      (e._canStartLoad = function (t) {
        if (!this.maintainScriptOrder || t.preferXHR) return !0;
        var e = t.getItem();
        if (e.type != createjs.LoadQueue.JAVASCRIPT) return !0;
        if (this._currentlyLoadingScript) return !1;
        for (var i = this._scriptOrder.indexOf(e), s = 0; i > s; ) {
          var n = this._loadedScripts[s];
          if (null == n) return !1;
          s++;
        }
        return (this._currentlyLoadingScript = !0), !0;
      }),
      (e._removeLoadItem = function (t) {
        for (var e = this._currentLoads.length, i = 0; e > i; i++)
          if (this._currentLoads[i] == t) {
            this._currentLoads.splice(i, 1);
            break;
          }
      }),
      (e._cleanLoadItem = function (t) {
        var e = t.getItem();
        e && delete e._loader;
      }),
      (e._handleProgress = function (t) {
        var e = t.target;
        this._sendFileProgress(e.getItem(), e.progress), this._updateProgress();
      }),
      (e._updateProgress = function () {
        var t = this._numItemsLoaded / this._numItems,
          e = this._numItems - this._numItemsLoaded;
        if (e > 0) {
          for (var i = 0, s = 0, n = this._currentLoads.length; n > s; s++)
            i += this._currentLoads[s].progress;
          t += (i / e) * (e / this._numItems);
        }
        this._lastProgress != t &&
          (this._sendProgress(t), (this._lastProgress = t));
      }),
      (e._disposeItem = function (t) {
        delete this._loadedResults[t.id],
          delete this._loadedRawResults[t.id],
          delete this._loadItemsById[t.id],
          delete this._loadItemsBySrc[t.src];
      }),
      (e._sendFileProgress = function (t, e) {
        if (
          !this._isCanceled() &&
          !this._paused &&
          this.hasEventListener("fileprogress")
        ) {
          var i = new createjs.Event("fileprogress");
          (i.progress = e),
            (i.loaded = e),
            (i.total = 1),
            (i.item = t),
            this.dispatchEvent(i);
        }
      }),
      (e._sendFileComplete = function (t, e) {
        if (!this._isCanceled() && !this._paused) {
          var i = new createjs.Event("fileload");
          (i.loader = e),
            (i.item = t),
            (i.result = this._loadedResults[t.id]),
            (i.rawResult = this._loadedRawResults[t.id]),
            t.completeHandler && t.completeHandler(i),
            this.hasEventListener("fileload") && this.dispatchEvent(i);
        }
      }),
      (e._sendFileStart = function (t) {
        var e = new createjs.Event("filestart");
        (e.item = t),
          this.hasEventListener("filestart") && this.dispatchEvent(e);
      }),
      (e.toString = function () {
        return "[PreloadJS LoadQueue]";
      }),
      (createjs.LoadQueue = createjs.promote(t, "AbstractLoader"));
  })(),
  (this.createjs = this.createjs || {}),
  (function () {
    "use strict";
    function t(t) {
      this.AbstractLoader_constructor(t, !0, createjs.AbstractLoader.TEXT);
    }
    var e = (createjs.extend(t, createjs.AbstractLoader), t);
    (e.canLoadItem = function (t) {
      return t.type == createjs.AbstractLoader.TEXT;
    }),
      (createjs.TextLoader = createjs.promote(t, "AbstractLoader"));
  })(),
  (this.createjs = this.createjs || {}),
  (function () {
    "use strict";
    function t(t) {
      this.AbstractLoader_constructor(t, !0, createjs.AbstractLoader.BINARY),
        this.on("initialize", this._updateXHR, this);
    }
    var e = createjs.extend(t, createjs.AbstractLoader),
      i = t;
    (i.canLoadItem = function (t) {
      return t.type == createjs.AbstractLoader.BINARY;
    }),
      (e._updateXHR = function (t) {
        t.loader.setResponseType("arraybuffer");
      }),
      (createjs.BinaryLoader = createjs.promote(t, "AbstractLoader"));
  })(),
  (this.createjs = this.createjs || {}),
  (function () {
    "use strict";
    function t(t, e) {
      this.AbstractLoader_constructor(t, e, createjs.AbstractLoader.CSS),
        (this.resultFormatter = this._formatResult),
        (this._tagSrcAttribute = "href"),
        e
          ? (this._tag = document.createElement("style"))
          : (this._tag = document.createElement("link")),
        (this._tag.rel = "stylesheet"),
        (this._tag.type = "text/css");
    }
    var e = createjs.extend(t, createjs.AbstractLoader),
      i = t;
    (i.canLoadItem = function (t) {
      return t.type == createjs.AbstractLoader.CSS;
    }),
      (e._formatResult = function (t) {
        if (this._preferXHR) {
          var e = t.getTag();
          if (e.styleSheet) e.styleSheet.cssText = t.getResult(!0);
          else {
            var i = document.createTextNode(t.getResult(!0));
            e.appendChild(i);
          }
        } else e = this._tag;
        return createjs.DomUtils.appendToHead(e), e;
      }),
      (createjs.CSSLoader = createjs.promote(t, "AbstractLoader"));
  })(),
  (this.createjs = this.createjs || {}),
  (function () {
    "use strict";
    function t(t, e) {
      this.AbstractLoader_constructor(t, e, createjs.AbstractLoader.IMAGE),
        (this.resultFormatter = this._formatResult),
        (this._tagSrcAttribute = "src"),
        createjs.RequestUtils.isImageTag(t)
          ? (this._tag = t)
          : createjs.RequestUtils.isImageTag(t.src)
          ? (this._tag = t.src)
          : createjs.RequestUtils.isImageTag(t.tag) && (this._tag = t.tag),
        null != this._tag
          ? (this._preferXHR = !1)
          : (this._tag = document.createElement("img")),
        this.on("initialize", this._updateXHR, this);
    }
    var e = createjs.extend(t, createjs.AbstractLoader),
      i = t;
    (i.canLoadItem = function (t) {
      return t.type == createjs.AbstractLoader.IMAGE;
    }),
      (e.load = function () {
        if ("" != this._tag.src && this._tag.complete)
          return void this._sendComplete();
        var t = this._item.crossOrigin;
        1 == t && (t = "Anonymous"),
          null == t ||
            createjs.RequestUtils.isLocal(this._item.src) ||
            (this._tag.crossOrigin = t),
          this.AbstractLoader_load();
      }),
      (e._updateXHR = function (t) {
        (t.loader.mimeType = "text/plain; charset=x-user-defined-binary"),
          t.loader.setResponseType && t.loader.setResponseType("blob");
      }),
      (e._formatResult = function (t) {
        return this._formatImage;
      }),
      (e._formatImage = function (t, e) {
        var i = this._tag,
          s = window.URL || window.webkitURL;
        if (this._preferXHR)
          if (s) {
            var n = s.createObjectURL(this.getResult(!0));
            (i.src = n),
              i.addEventListener("load", this._cleanUpURL, !1),
              i.addEventListener("error", this._cleanUpURL, !1);
          } else i.src = this._item.src;
        i.complete
          ? t(i)
          : ((i.onload = createjs.proxy(function () {
              t(this._tag);
            }, this)),
            (i.onerror = createjs.proxy(function () {
              e(_this._tag);
            }, this)));
      }),
      (e._cleanUpURL = function (t) {
        var e = window.URL || window.webkitURL;
        e.revokeObjectURL(t.target.src);
      }),
      (createjs.ImageLoader = createjs.promote(t, "AbstractLoader"));
  })(),
  (this.createjs = this.createjs || {}),
  (function () {
    "use strict";
    function t(t, e) {
      this.AbstractLoader_constructor(t, e, createjs.AbstractLoader.JAVASCRIPT),
        (this.resultFormatter = this._formatResult),
        (this._tagSrcAttribute = "src"),
        this.setTag(document.createElement("script"));
    }
    var e = createjs.extend(t, createjs.AbstractLoader),
      i = t;
    (i.canLoadItem = function (t) {
      return t.type == createjs.AbstractLoader.JAVASCRIPT;
    }),
      (e._formatResult = function (t) {
        var e = t.getTag();
        return this._preferXHR && (e.text = t.getResult(!0)), e;
      }),
      (createjs.JavaScriptLoader = createjs.promote(t, "AbstractLoader"));
  })(),
  (this.createjs = this.createjs || {}),
  (function () {
    "use strict";
    function t(t) {
      this.AbstractLoader_constructor(t, !0, createjs.AbstractLoader.JSON),
        (this.resultFormatter = this._formatResult);
    }
    var e = createjs.extend(t, createjs.AbstractLoader),
      i = t;
    (i.canLoadItem = function (t) {
      return t.type == createjs.AbstractLoader.JSON;
    }),
      (e._formatResult = function (t) {
        var e = null;
        try {
          e = createjs.DataUtils.parseJSON(t.getResult(!0));
        } catch (i) {
          var s = new createjs.ErrorEvent("JSON_FORMAT", null, i);
          return this._sendError(s), i;
        }
        return e;
      }),
      (createjs.JSONLoader = createjs.promote(t, "AbstractLoader"));
  })(),
  (this.createjs = this.createjs || {}),
  (function () {
    "use strict";
    function t(t) {
      this.AbstractLoader_constructor(t, !1, createjs.AbstractLoader.JSONP),
        this.setTag(document.createElement("script")),
        (this.getTag().type = "text/javascript");
    }
    var e = createjs.extend(t, createjs.AbstractLoader),
      i = t;
    (i.canLoadItem = function (t) {
      return t.type == createjs.AbstractLoader.JSONP;
    }),
      (e.cancel = function () {
        this.AbstractLoader_cancel(), this._dispose();
      }),
      (e.load = function () {
        if (null == this._item.callback)
          throw new Error("callback is required for loading JSONP requests.");
        if (null != window[this._item.callback])
          throw new Error(
            "JSONP callback '" +
              this._item.callback +
              "' already exists on window. You need to specify a different callback or re-name the current one."
          );
        (window[this._item.callback] = createjs.proxy(this._handleLoad, this)),
          window.document.body.appendChild(this._tag),
          (this._loadTimeout = setTimeout(
            createjs.proxy(this._handleTimeout, this),
            this._item.loadTimeout
          )),
          (this._tag.src = this._item.src);
      }),
      (e._handleLoad = function (t) {
        (this._result = this._rawResult = t),
          this._sendComplete(),
          this._dispose();
      }),
      (e._handleTimeout = function () {
        this._dispose(), this.dispatchEvent(new createjs.ErrorEvent("timeout"));
      }),
      (e._dispose = function () {
        window.document.body.removeChild(this._tag),
          delete window[this._item.callback],
          clearTimeout(this._loadTimeout);
      }),
      (createjs.JSONPLoader = createjs.promote(t, "AbstractLoader"));
  })(),
  (this.createjs = this.createjs || {}),
  (function () {
    "use strict";
    function t(t) {
      this.AbstractLoader_constructor(
        t,
        null,
        createjs.AbstractLoader.MANIFEST
      ),
        (this.plugins = null),
        (this._manifestQueue = null);
    }
    var e = createjs.extend(t, createjs.AbstractLoader),
      i = t;
    (i.MANIFEST_PROGRESS = 0.25),
      (i.canLoadItem = function (t) {
        return t.type == createjs.AbstractLoader.MANIFEST;
      }),
      (e.load = function () {
        this.AbstractLoader_load();
      }),
      (e._createRequest = function () {
        var t = this._item.callback;
        null != t
          ? (this._request = new createjs.JSONPLoader(this._item))
          : (this._request = new createjs.JSONLoader(this._item));
      }),
      (e.handleEvent = function (t) {
        switch (t.type) {
          case "complete":
            return (
              (this._rawResult = t.target.getResult(!0)),
              (this._result = t.target.getResult()),
              this._sendProgress(i.MANIFEST_PROGRESS),
              void this._loadManifest(this._result)
            );
          case "progress":
            return (
              (t.loaded *= i.MANIFEST_PROGRESS),
              (this.progress = t.loaded / t.total),
              (isNaN(this.progress) || this.progress == 1 / 0) &&
                (this.progress = 0),
              void this._sendProgress(t)
            );
        }
        this.AbstractLoader_handleEvent(t);
      }),
      (e.destroy = function () {
        this.AbstractLoader_destroy(), this._manifestQueue.close();
      }),
      (e._loadManifest = function (t) {
        if (t && t.manifest) {
          var e = (this._manifestQueue = new createjs.LoadQueue());
          e.on("fileload", this._handleManifestFileLoad, this),
            e.on("progress", this._handleManifestProgress, this),
            e.on("complete", this._handleManifestComplete, this, !0),
            e.on("error", this._handleManifestError, this, !0);
          for (var i = 0, s = this.plugins.length; s > i; i++)
            e.installPlugin(this.plugins[i]);
          e.loadManifest(t);
        } else this._sendComplete();
      }),
      (e._handleManifestFileLoad = function (t) {
        (t.target = null), this.dispatchEvent(t);
      }),
      (e._handleManifestComplete = function (t) {
        (this._loadedItems = this._manifestQueue.getItems(!0)),
          this._sendComplete();
      }),
      (e._handleManifestProgress = function (t) {
        (this.progress =
          t.progress * (1 - i.MANIFEST_PROGRESS) + i.MANIFEST_PROGRESS),
          this._sendProgress(this.progress);
      }),
      (e._handleManifestError = function (t) {
        var e = new createjs.Event("fileerror");
        (e.item = t.data), this.dispatchEvent(e);
      }),
      (createjs.ManifestLoader = createjs.promote(t, "AbstractLoader"));
  })(),
  (this.createjs = this.createjs || {}),
  (function () {
    "use strict";
    function t(t, e) {
      this.AbstractMediaLoader_constructor(t, e, createjs.AbstractLoader.SOUND),
        createjs.RequestUtils.isAudioTag(t)
          ? (this._tag = t)
          : createjs.RequestUtils.isAudioTag(t.src)
          ? (this._tag = t)
          : createjs.RequestUtils.isAudioTag(t.tag) &&
            (this._tag = createjs.RequestUtils.isAudioTag(t) ? t : t.src),
        null != this._tag && (this._preferXHR = !1);
    }
    var e = createjs.extend(t, createjs.AbstractMediaLoader),
      i = t;
    (i.canLoadItem = function (t) {
      return t.type == createjs.AbstractLoader.SOUND;
    }),
      (e._createTag = function (t) {
        var e = document.createElement("audio");
        return (e.autoplay = !1), (e.preload = "none"), (e.src = t), e;
      }),
      (createjs.SoundLoader = createjs.promote(t, "AbstractMediaLoader"));
  })(),
  (this.createjs = this.createjs || {}),
  (function () {
    "use strict";
    function t(t, e) {
      this.AbstractMediaLoader_constructor(t, e, createjs.AbstractLoader.VIDEO),
        createjs.RequestUtils.isVideoTag(t) ||
        createjs.RequestUtils.isVideoTag(t.src)
          ? (this.setTag(createjs.RequestUtils.isVideoTag(t) ? t : t.src),
            (this._preferXHR = !1))
          : this.setTag(this._createTag());
    }
    var e = createjs.extend(t, createjs.AbstractMediaLoader),
      i = t;
    (e._createTag = function () {
      return document.createElement("video");
    }),
      (i.canLoadItem = function (t) {
        return t.type == createjs.AbstractLoader.VIDEO;
      }),
      (createjs.VideoLoader = createjs.promote(t, "AbstractMediaLoader"));
  })(),
  (this.createjs = this.createjs || {}),
  (function () {
    "use strict";
    function t(t, e) {
      this.AbstractLoader_constructor(
        t,
        e,
        createjs.AbstractLoader.SPRITESHEET
      ),
        (this._manifestQueue = null);
    }
    var e = createjs.extend(t, createjs.AbstractLoader),
      i = t;
    (i.SPRITESHEET_PROGRESS = 0.25),
      (i.canLoadItem = function (t) {
        return t.type == createjs.AbstractLoader.SPRITESHEET;
      }),
      (e.destroy = function () {
        this.AbstractLoader_destroy, this._manifestQueue.close();
      }),
      (e._createRequest = function () {
        var t = this._item.callback;
        null != t
          ? (this._request = new createjs.JSONPLoader(this._item))
          : (this._request = new createjs.JSONLoader(this._item));
      }),
      (e.handleEvent = function (t) {
        switch (t.type) {
          case "complete":
            return (
              (this._rawResult = t.target.getResult(!0)),
              (this._result = t.target.getResult()),
              this._sendProgress(i.SPRITESHEET_PROGRESS),
              void this._loadManifest(this._result)
            );
          case "progress":
            return (
              (t.loaded *= i.SPRITESHEET_PROGRESS),
              (this.progress = t.loaded / t.total),
              (isNaN(this.progress) || this.progress == 1 / 0) &&
                (this.progress = 0),
              void this._sendProgress(t)
            );
        }
        this.AbstractLoader_handleEvent(t);
      }),
      (e._loadManifest = function (t) {
        if (t && t.images) {
          var e = (this._manifestQueue = new createjs.LoadQueue(
            this._preferXHR,
            this._item.path,
            this._item.crossOrigin
          ));
          e.on("complete", this._handleManifestComplete, this, !0),
            e.on("fileload", this._handleManifestFileLoad, this),
            e.on("progress", this._handleManifestProgress, this),
            e.on("error", this._handleManifestError, this, !0),
            e.loadManifest(t.images);
        }
      }),
      (e._handleManifestFileLoad = function (t) {
        var e = t.result;
        if (null != e) {
          var i = this.getResult().images,
            s = i.indexOf(t.item.src);
          i[s] = e;
        }
      }),
      (e._handleManifestComplete = function (t) {
        (this._result = new createjs.SpriteSheet(this._result)),
          (this._loadedItems = this._manifestQueue.getItems(!0)),
          this._sendComplete();
      }),
      (e._handleManifestProgress = function (t) {
        (this.progress =
          t.progress * (1 - i.SPRITESHEET_PROGRESS) + i.SPRITESHEET_PROGRESS),
          this._sendProgress(this.progress);
      }),
      (e._handleManifestError = function (t) {
        var e = new createjs.Event("fileerror");
        (e.item = t.data), this.dispatchEvent(e);
      }),
      (createjs.SpriteSheetLoader = createjs.promote(t, "AbstractLoader"));
  })(),
  (this.createjs = this.createjs || {}),
  (function () {
    "use strict";
    function t(t, e) {
      this.AbstractLoader_constructor(t, e, createjs.AbstractLoader.SVG),
        (this.resultFormatter = this._formatResult),
        (this._tagSrcAttribute = "data"),
        e
          ? this.setTag(document.createElement("svg"))
          : (this.setTag(document.createElement("object")),
            (this.getTag().type = "image/svg+xml"));
    }
    var e = createjs.extend(t, createjs.AbstractLoader),
      i = t;
    (i.canLoadItem = function (t) {
      return t.type == createjs.AbstractLoader.SVG;
    }),
      (e._formatResult = function (t) {
        var e = createjs.DataUtils.parseXML(t.getResult(!0), "text/xml"),
          i = t.getTag();
        return (
          !this._preferXHR &&
            document.body.contains(i) &&
            document.body.removeChild(i),
          null != e.documentElement
            ? (i.appendChild(e.documentElement),
              (i.style.visibility = "visible"),
              i)
            : e
        );
      }),
      (createjs.SVGLoader = createjs.promote(t, "AbstractLoader"));
  })(),
  (this.createjs = this.createjs || {}),
  (function () {
    "use strict";
    function t(t) {
      this.AbstractLoader_constructor(t, !0, createjs.AbstractLoader.XML),
        (this.resultFormatter = this._formatResult);
    }
    var e = createjs.extend(t, createjs.AbstractLoader),
      i = t;
    (i.canLoadItem = function (t) {
      return t.type == createjs.AbstractLoader.XML;
    }),
      (e._formatResult = function (t) {
        return createjs.DataUtils.parseXML(t.getResult(!0), "text/xml");
      }),
      (createjs.XMLLoader = createjs.promote(t, "AbstractLoader"));
  })(),
  (this.createjs = this.createjs || {}),
  (function () {
    var t = (createjs.SoundJS = createjs.SoundJS || {});
    (t.version = "0.6.2"), (t.buildDate = "Thu, 26 Nov 2015 20:44:31 GMT");
  })(),
  (this.createjs = this.createjs || {}),
  (createjs.indexOf = function (t, e) {
    "use strict";
    for (var i = 0, s = t.length; s > i; i++) if (e === t[i]) return i;
    return -1;
  }),
  (this.createjs = this.createjs || {}),
  (function () {
    "use strict";
    createjs.proxy = function (t, e) {
      var i = Array.prototype.slice.call(arguments, 2);
      return function () {
        return t.apply(e, Array.prototype.slice.call(arguments, 0).concat(i));
      };
    };
  })(),
  (this.createjs = this.createjs || {}),
  (function () {
    "use strict";
    function t() {
      throw "BrowserDetect cannot be instantiated";
    }
    var e = (t.agent = window.navigator.userAgent);
    (t.isWindowPhone =
      e.indexOf("IEMobile") > -1 || e.indexOf("Windows Phone") > -1),
      (t.isFirefox = e.indexOf("Firefox") > -1),
      (t.isOpera = null != window.opera),
      (t.isChrome = e.indexOf("Chrome") > -1),
      (t.isIOS =
        (e.indexOf("iPod") > -1 ||
          e.indexOf("iPhone") > -1 ||
          e.indexOf("iPad") > -1) &&
        !t.isWindowPhone),
      (t.isAndroid = e.indexOf("Android") > -1 && !t.isWindowPhone),
      (t.isBlackberry = e.indexOf("Blackberry") > -1),
      (createjs.BrowserDetect = t);
  })(),
  (this.createjs = this.createjs || {}),
  (function () {
    "use strict";
    var t = function () {
        (this.interrupt = null),
          (this.delay = null),
          (this.offset = null),
          (this.loop = null),
          (this.volume = null),
          (this.pan = null),
          (this.startTime = null),
          (this.duration = null);
      },
      e = (t.prototype = {}),
      i = t;
    (i.create = function (t) {
      if (t instanceof i || t instanceof Object) {
        var e = new createjs.PlayPropsConfig();
        return e.set(t), e;
      }
      throw new Error("Type not recognized.");
    }),
      (e.set = function (t) {
        for (var e in t) this[e] = t[e];
        return this;
      }),
      (e.toString = function () {
        return "[PlayPropsConfig]";
      }),
      (createjs.PlayPropsConfig = i);
  })(),
  (this.createjs = this.createjs || {}),
  (function () {
    "use strict";
    function t() {
      throw "Sound cannot be instantiated";
    }
    function e(t, e) {
      this.init(t, e);
    }
    var i = t;
    (i.INTERRUPT_ANY = "any"),
      (i.INTERRUPT_EARLY = "early"),
      (i.INTERRUPT_LATE = "late"),
      (i.INTERRUPT_NONE = "none"),
      (i.PLAY_INITED = "playInited"),
      (i.PLAY_SUCCEEDED = "playSucceeded"),
      (i.PLAY_INTERRUPTED = "playInterrupted"),
      (i.PLAY_FINISHED = "playFinished"),
      (i.PLAY_FAILED = "playFailed"),
      (i.SUPPORTED_EXTENSIONS = [
        "mp3",
        "ogg",
        "opus",
        "mpeg",
        "wav",
        "m4a",
        "mp4",
        "aiff",
        "wma",
        "mid",
      ]),
      (i.EXTENSION_MAP = { m4a: "mp4" }),
      (i.FILE_PATTERN =
        /^(?:(\w+:)\/{2}(\w+(?:\.\w+)*\/?))?([\/.]*?(?:[^?]+)?\/)?((?:[^\/?]+)\.(\w+))(?:\?(\S+)?)?$/),
      (i.defaultInterruptBehavior = i.INTERRUPT_NONE),
      (i.alternateExtensions = []),
      (i.activePlugin = null),
      (i._masterVolume = 1),
      Object.defineProperty(i, "volume", {
        get: function () {
          return this._masterVolume;
        },
        set: function (t) {
          if (null == Number(t)) return !1;
          if (
            ((t = Math.max(0, Math.min(1, t))),
            (i._masterVolume = t),
            !this.activePlugin ||
              !this.activePlugin.setVolume ||
              !this.activePlugin.setVolume(t))
          )
            for (var e = this._instances, s = 0, n = e.length; n > s; s++)
              e[s].setMasterVolume(t);
        },
      }),
      (i._masterMute = !1),
      Object.defineProperty(i, "muted", {
        get: function () {
          return this._masterMute;
        },
        set: function (t) {
          if (null == t) return !1;
          if (
            ((this._masterMute = t),
            !this.activePlugin ||
              !this.activePlugin.setMute ||
              !this.activePlugin.setMute(t))
          )
            for (var e = this._instances, i = 0, s = e.length; s > i; i++)
              e[i].setMasterMute(t);
          return !0;
        },
      }),
      Object.defineProperty(i, "capabilities", {
        get: function () {
          return null == i.activePlugin ? null : i.activePlugin._capabilities;
        },
        set: function (t) {
          return !1;
        },
      }),
      (i._pluginsRegistered = !1),
      (i._lastID = 0),
      (i._instances = []),
      (i._idHash = {}),
      (i._preloadHash = {}),
      (i._defaultPlayPropsHash = {}),
      (i.addEventListener = null),
      (i.removeEventListener = null),
      (i.removeAllEventListeners = null),
      (i.dispatchEvent = null),
      (i.hasEventListener = null),
      (i._listeners = null),
      createjs.EventDispatcher.initialize(i),
      (i.getPreloadHandlers = function () {
        return {
          callback: createjs.proxy(i.initLoad, i),
          types: ["sound"],
          extensions: i.SUPPORTED_EXTENSIONS,
        };
      }),
      (i._handleLoadComplete = function (t) {
        var e = t.target.getItem().src;
        if (i._preloadHash[e])
          for (var s = 0, n = i._preloadHash[e].length; n > s; s++) {
            var r = i._preloadHash[e][s];
            if (((i._preloadHash[e][s] = !0), i.hasEventListener("fileload"))) {
              var t = new createjs.Event("fileload");
              (t.src = r.src),
                (t.id = r.id),
                (t.data = r.data),
                (t.sprite = r.sprite),
                i.dispatchEvent(t);
            }
          }
      }),
      (i._handleLoadError = function (t) {
        var e = t.target.getItem().src;
        if (i._preloadHash[e])
          for (var s = 0, n = i._preloadHash[e].length; n > s; s++) {
            var r = i._preloadHash[e][s];
            if (
              ((i._preloadHash[e][s] = !1), i.hasEventListener("fileerror"))
            ) {
              var t = new createjs.Event("fileerror");
              (t.src = r.src),
                (t.id = r.id),
                (t.data = r.data),
                (t.sprite = r.sprite),
                i.dispatchEvent(t);
            }
          }
      }),
      (i._registerPlugin = function (t) {
        return !!t.isSupported() && ((i.activePlugin = new t()), !0);
      }),
      (i.registerPlugins = function (t) {
        i._pluginsRegistered = !0;
        for (var e = 0, s = t.length; s > e; e++)
          if (i._registerPlugin(t[e])) return !0;
        return !1;
      }),
      (i.initializeDefaultPlugins = function () {
        return (
          null != i.activePlugin ||
          (!i._pluginsRegistered &&
            !!i.registerPlugins([
              createjs.WebAudioPlugin,
              createjs.HTMLAudioPlugin,
            ]))
        );
      }),
      (i.isReady = function () {
        return null != i.activePlugin;
      }),
      (i.getCapabilities = function () {
        return null == i.activePlugin ? null : i.activePlugin._capabilities;
      }),
      (i.getCapability = function (t) {
        return null == i.activePlugin ? null : i.activePlugin._capabilities[t];
      }),
      (i.initLoad = function (t) {
        return i._registerSound(t);
      }),
      (i._registerSound = function (t) {
        if (!i.initializeDefaultPlugins()) return !1;
        var s;
        if (
          (t.src instanceof Object
            ? ((s = i._parseSrc(t.src)), (s.src = t.path + s.src))
            : (s = i._parsePath(t.src)),
          null == s)
        )
          return !1;
        (t.src = s.src), (t.type = "sound");
        var n = t.data,
          r = null;
        if (
          null != n &&
          (isNaN(n.channels)
            ? isNaN(n) || (r = parseInt(n))
            : (r = parseInt(n.channels)),
          n.audioSprite)
        )
          for (var a, o = n.audioSprite.length; o--; )
            (a = n.audioSprite[o]),
              (i._idHash[a.id] = {
                src: t.src,
                startTime: parseInt(a.startTime),
                duration: parseInt(a.duration),
              }),
              a.defaultPlayProps &&
                (i._defaultPlayPropsHash[a.id] =
                  createjs.PlayPropsConfig.create(a.defaultPlayProps));
        null != t.id && (i._idHash[t.id] = { src: t.src });
        var h = i.activePlugin.register(t);
        return (
          e.create(t.src, r),
          null != n && isNaN(n)
            ? (t.data.channels = r || e.maxPerChannel())
            : (t.data = r || e.maxPerChannel()),
          h.type && (t.type = h.type),
          t.defaultPlayProps &&
            (i._defaultPlayPropsHash[t.src] = createjs.PlayPropsConfig.create(
              t.defaultPlayProps
            )),
          h
        );
      }),
      (i.registerSound = function (t, e, s, n, r) {
        var a = { src: t, id: e, data: s, defaultPlayProps: r };
        t instanceof Object && t.src && ((n = e), (a = t)),
          (a = createjs.LoadItem.create(a)),
          (a.path = n),
          null == n || a.src instanceof Object || (a.src = n + t);
        var o = i._registerSound(a);
        if (!o) return !1;
        if (
          (i._preloadHash[a.src] || (i._preloadHash[a.src] = []),
          i._preloadHash[a.src].push(a),
          1 == i._preloadHash[a.src].length)
        )
          o.on("complete", createjs.proxy(this._handleLoadComplete, this)),
            o.on("error", createjs.proxy(this._handleLoadError, this)),
            i.activePlugin.preload(o);
        else if (1 == i._preloadHash[a.src][0]) return !0;
        return a;
      }),
      (i.registerSounds = function (t, e) {
        var i = [];
        t.path && (e ? (e += t.path) : (e = t.path), (t = t.manifest));
        for (var s = 0, n = t.length; n > s; s++)
          i[s] = createjs.Sound.registerSound(
            t[s].src,
            t[s].id,
            t[s].data,
            e,
            t[s].defaultPlayProps
          );
        return i;
      }),
      (i.removeSound = function (t, s) {
        if (null == i.activePlugin) return !1;
        t instanceof Object && t.src && (t = t.src);
        var n;
        if (
          (t instanceof Object
            ? (n = i._parseSrc(t))
            : ((t = i._getSrcById(t).src), (n = i._parsePath(t))),
          null == n)
        )
          return !1;
        (t = n.src), null != s && (t = s + t);
        for (var r in i._idHash) i._idHash[r].src == t && delete i._idHash[r];
        return (
          e.removeSrc(t),
          delete i._preloadHash[t],
          i.activePlugin.removeSound(t),
          !0
        );
      }),
      (i.removeSounds = function (t, e) {
        var i = [];
        t.path && (e ? (e += t.path) : (e = t.path), (t = t.manifest));
        for (var s = 0, n = t.length; n > s; s++)
          i[s] = createjs.Sound.removeSound(t[s].src, e);
        return i;
      }),
      (i.removeAllSounds = function () {
        (i._idHash = {}),
          (i._preloadHash = {}),
          e.removeAll(),
          i.activePlugin && i.activePlugin.removeAllSounds();
      }),
      (i.loadComplete = function (t) {
        if (!i.isReady()) return !1;
        var e = i._parsePath(t);
        return (
          (t = e ? i._getSrcById(e.src).src : i._getSrcById(t).src),
          void 0 != i._preloadHash[t] && 1 == i._preloadHash[t][0]
        );
      }),
      (i._parsePath = function (t) {
        "string" != typeof t && (t = t.toString());
        var e = t.match(i.FILE_PATTERN);
        if (null == e) return !1;
        for (var s = e[4], n = e[5], r = i.capabilities, a = 0; !r[n]; )
          if (
            ((n = i.alternateExtensions[a++]), a > i.alternateExtensions.length)
          )
            return null;
        t = t.replace("." + e[5], "." + n);
        var o = { name: s, src: t, extension: n };
        return o;
      }),
      (i._parseSrc = function (t) {
        var e = { name: void 0, src: void 0, extension: void 0 },
          s = i.capabilities;
        for (var n in t)
          if (t.hasOwnProperty(n) && s[n]) {
            (e.src = t[n]), (e.extension = n);
            break;
          }
        if (!e.src) return !1;
        var r = e.src.lastIndexOf("/");
        return -1 != r ? (e.name = e.src.slice(r + 1)) : (e.name = e.src), e;
      }),
      (i.play = function (t, e, s, n, r, a, o, h, c) {
        var l;
        l =
          e instanceof Object || e instanceof createjs.PlayPropsConfig
            ? createjs.PlayPropsConfig.create(e)
            : createjs.PlayPropsConfig.create({
                interrupt: e,
                delay: s,
                offset: n,
                loop: r,
                volume: a,
                pan: o,
                startTime: h,
                duration: c,
              });
        var u = i.createInstance(t, l.startTime, l.duration),
          d = i._playInstance(u, l);
        return d || u._playFailed(), u;
      }),
      (i.createInstance = function (t, s, n) {
        if (!i.initializeDefaultPlugins())
          return new createjs.DefaultSoundInstance(t, s, n);
        var r = i._defaultPlayPropsHash[t];
        t = i._getSrcById(t);
        var a = i._parsePath(t.src),
          o = null;
        return (
          null != a && null != a.src
            ? (e.create(a.src),
              null == s && (s = t.startTime),
              (o = i.activePlugin.create(a.src, s, n || t.duration)),
              (r = r || i._defaultPlayPropsHash[a.src]),
              r && o.applyPlayProps(r))
            : (o = new createjs.DefaultSoundInstance(t, s, n)),
          (o.uniqueId = i._lastID++),
          o
        );
      }),
      (i.stop = function () {
        for (var t = this._instances, e = t.length; e--; ) t[e].stop();
      }),
      (i.setVolume = function (t) {
        if (null == Number(t)) return !1;
        if (
          ((t = Math.max(0, Math.min(1, t))),
          (i._masterVolume = t),
          !this.activePlugin ||
            !this.activePlugin.setVolume ||
            !this.activePlugin.setVolume(t))
        )
          for (var e = this._instances, s = 0, n = e.length; n > s; s++)
            e[s].setMasterVolume(t);
      }),
      (i.getVolume = function () {
        return this._masterVolume;
      }),
      (i.setMute = function (t) {
        if (null == t) return !1;
        if (
          ((this._masterMute = t),
          !this.activePlugin ||
            !this.activePlugin.setMute ||
            !this.activePlugin.setMute(t))
        )
          for (var e = this._instances, i = 0, s = e.length; s > i; i++)
            e[i].setMasterMute(t);
        return !0;
      }),
      (i.getMute = function () {
        return this._masterMute;
      }),
      (i.setDefaultPlayProps = function (t, e) {
        (t = i._getSrcById(t)),
          (i._defaultPlayPropsHash[i._parsePath(t.src).src] =
            createjs.PlayPropsConfig.create(e));
      }),
      (i.getDefaultPlayProps = function (t) {
        return (
          (t = i._getSrcById(t)),
          i._defaultPlayPropsHash[i._parsePath(t.src).src]
        );
      }),
      (i._playInstance = function (t, e) {
        var s = i._defaultPlayPropsHash[t.src] || {};
        if (
          (null == e.interrupt &&
            (e.interrupt = s.interrupt || i.defaultInterruptBehavior),
          null == e.delay && (e.delay = s.delay || 0),
          null == e.offset && (e.offset = t.getPosition()),
          null == e.loop && (e.loop = t.loop),
          null == e.volume && (e.volume = t.volume),
          null == e.pan && (e.pan = t.pan),
          0 == e.delay)
        ) {
          var n = i._beginPlaying(t, e);
          if (!n) return !1;
        } else {
          var r = setTimeout(function () {
            i._beginPlaying(t, e);
          }, e.delay);
          t.delayTimeoutId = r;
        }
        return this._instances.push(t), !0;
      }),
      (i._beginPlaying = function (t, i) {
        if (!e.add(t, i.interrupt)) return !1;
        var s = t._beginPlaying(i);
        if (!s) {
          var n = createjs.indexOf(this._instances, t);
          return n > -1 && this._instances.splice(n, 1), !1;
        }
        return !0;
      }),
      (i._getSrcById = function (t) {
        return i._idHash[t] || { src: t };
      }),
      (i._playFinished = function (t) {
        e.remove(t);
        var i = createjs.indexOf(this._instances, t);
        i > -1 && this._instances.splice(i, 1);
      }),
      (createjs.Sound = t),
      (e.channels = {}),
      (e.create = function (t, i) {
        var s = e.get(t);
        return null == s && ((e.channels[t] = new e(t, i)), !0);
      }),
      (e.removeSrc = function (t) {
        var i = e.get(t);
        return null != i && (i._removeAll(), delete e.channels[t], !0);
      }),
      (e.removeAll = function () {
        for (var t in e.channels) e.channels[t]._removeAll();
        e.channels = {};
      }),
      (e.add = function (t, i) {
        var s = e.get(t.src);
        return null != s && s._add(t, i);
      }),
      (e.remove = function (t) {
        var i = e.get(t.src);
        return null != i && (i._remove(t), !0);
      }),
      (e.maxPerChannel = function () {
        return s.maxDefault;
      }),
      (e.get = function (t) {
        return e.channels[t];
      });
    var s = e.prototype;
    (s.constructor = e),
      (s.src = null),
      (s.max = null),
      (s.maxDefault = 100),
      (s.length = 0),
      (s.init = function (t, e) {
        (this.src = t),
          (this.max = e || this.maxDefault),
          -1 == this.max && (this.max = this.maxDefault),
          (this._instances = []);
      }),
      (s._get = function (t) {
        return this._instances[t];
      }),
      (s._add = function (t, e) {
        return (
          !!this._getSlot(e, t) && (this._instances.push(t), this.length++, !0)
        );
      }),
      (s._remove = function (t) {
        var e = createjs.indexOf(this._instances, t);
        return -1 != e && (this._instances.splice(e, 1), this.length--, !0);
      }),
      (s._removeAll = function () {
        for (var t = this.length - 1; t >= 0; t--) this._instances[t].stop();
      }),
      (s._getSlot = function (e, i) {
        var s, n;
        if (e != t.INTERRUPT_NONE && ((n = this._get(0)), null == n)) return !0;
        for (var r = 0, a = this.max; a > r; r++) {
          if (((s = this._get(r)), null == s)) return !0;
          if (
            s.playState == t.PLAY_FINISHED ||
            s.playState == t.PLAY_INTERRUPTED ||
            s.playState == t.PLAY_FAILED
          ) {
            n = s;
            break;
          }
          e != t.INTERRUPT_NONE &&
            ((e == t.INTERRUPT_EARLY && s.getPosition() < n.getPosition()) ||
              (e == t.INTERRUPT_LATE && s.getPosition() > n.getPosition())) &&
            (n = s);
        }
        return null != n && (n._interrupt(), this._remove(n), !0);
      }),
      (s.toString = function () {
        return "[Sound SoundChannel]";
      });
  })(),
  (this.createjs = this.createjs || {}),
  (function () {
    "use strict";
    var t = function (t, e, i, s) {
        this.EventDispatcher_constructor(),
          (this.src = t),
          (this.uniqueId = -1),
          (this.playState = null),
          (this.delayTimeoutId = null),
          (this._volume = 1),
          Object.defineProperty(this, "volume", {
            get: this.getVolume,
            set: this.setVolume,
          }),
          (this._pan = 0),
          Object.defineProperty(this, "pan", {
            get: this.getPan,
            set: this.setPan,
          }),
          (this._startTime = Math.max(0, e || 0)),
          Object.defineProperty(this, "startTime", {
            get: this.getStartTime,
            set: this.setStartTime,
          }),
          (this._duration = Math.max(0, i || 0)),
          Object.defineProperty(this, "duration", {
            get: this.getDuration,
            set: this.setDuration,
          }),
          (this._playbackResource = null),
          Object.defineProperty(this, "playbackResource", {
            get: this.getPlaybackResource,
            set: this.setPlaybackResource,
          }),
          s !== !1 && s !== !0 && this.setPlaybackResource(s),
          (this._position = 0),
          Object.defineProperty(this, "position", {
            get: this.getPosition,
            set: this.setPosition,
          }),
          (this._loop = 0),
          Object.defineProperty(this, "loop", {
            get: this.getLoop,
            set: this.setLoop,
          }),
          (this._muted = !1),
          Object.defineProperty(this, "muted", {
            get: this.getMuted,
            set: this.setMuted,
          }),
          (this._paused = !1),
          Object.defineProperty(this, "paused", {
            get: this.getPaused,
            set: this.setPaused,
          });
      },
      e = createjs.extend(t, createjs.EventDispatcher);
    (e.play = function (t, e, i, s, n, r) {
      var a;
      return (
        (a =
          t instanceof Object || t instanceof createjs.PlayPropsConfig
            ? createjs.PlayPropsConfig.create(t)
            : createjs.PlayPropsConfig.create({
                interrupt: t,
                delay: e,
                offset: i,
                loop: s,
                volume: n,
                pan: r,
              })),
        this.playState == createjs.Sound.PLAY_SUCCEEDED
          ? (this.applyPlayProps(a), void (this._paused && this.setPaused(!1)))
          : (this._cleanUp(), createjs.Sound._playInstance(this, a), this)
      );
    }),
      (e.stop = function () {
        return (
          (this._position = 0),
          (this._paused = !1),
          this._handleStop(),
          this._cleanUp(),
          (this.playState = createjs.Sound.PLAY_FINISHED),
          this
        );
      }),
      (e.destroy = function () {
        this._cleanUp(),
          (this.src = null),
          (this.playbackResource = null),
          this.removeAllEventListeners();
      }),
      (e.applyPlayProps = function (t) {
        return (
          null != t.offset && this.setPosition(t.offset),
          null != t.loop && this.setLoop(t.loop),
          null != t.volume && this.setVolume(t.volume),
          null != t.pan && this.setPan(t.pan),
          null != t.startTime &&
            (this.setStartTime(t.startTime), this.setDuration(t.duration)),
          this
        );
      }),
      (e.toString = function () {
        return "[AbstractSoundInstance]";
      }),
      (e.getPaused = function () {
        return this._paused;
      }),
      (e.setPaused = function (t) {
        return (t !== !0 && t !== !1) ||
          this._paused == t ||
          (1 == t && this.playState != createjs.Sound.PLAY_SUCCEEDED)
          ? void 0
          : ((this._paused = t),
            t ? this._pause() : this._resume(),
            clearTimeout(this.delayTimeoutId),
            this);
      }),
      (e.setVolume = function (t) {
        return t == this._volume
          ? this
          : ((this._volume = Math.max(0, Math.min(1, t))),
            this._muted || this._updateVolume(),
            this);
      }),
      (e.getVolume = function () {
        return this._volume;
      }),
      (e.setMuted = function (t) {
        return t === !0 || t === !1
          ? ((this._muted = t), this._updateVolume(), this)
          : void 0;
      }),
      (e.getMuted = function () {
        return this._muted;
      }),
      (e.setPan = function (t) {
        return t == this._pan
          ? this
          : ((this._pan = Math.max(-1, Math.min(1, t))),
            this._updatePan(),
            this);
      }),
      (e.getPan = function () {
        return this._pan;
      }),
      (e.getPosition = function () {
        return (
          this._paused ||
            this.playState != createjs.Sound.PLAY_SUCCEEDED ||
            (this._position = this._calculateCurrentPosition()),
          this._position
        );
      }),
      (e.setPosition = function (t) {
        return (
          (this._position = Math.max(0, t)),
          this.playState == createjs.Sound.PLAY_SUCCEEDED &&
            this._updatePosition(),
          this
        );
      }),
      (e.getStartTime = function () {
        return this._startTime;
      }),
      (e.setStartTime = function (t) {
        return t == this._startTime
          ? this
          : ((this._startTime = Math.max(0, t || 0)),
            this._updateStartTime(),
            this);
      }),
      (e.getDuration = function () {
        return this._duration;
      }),
      (e.setDuration = function (t) {
        return t == this._duration
          ? this
          : ((this._duration = Math.max(0, t || 0)),
            this._updateDuration(),
            this);
      }),
      (e.setPlaybackResource = function (t) {
        return (
          (this._playbackResource = t),
          0 == this._duration && this._setDurationFromSource(),
          this
        );
      }),
      (e.getPlaybackResource = function () {
        return this._playbackResource;
      }),
      (e.getLoop = function () {
        return this._loop;
      }),
      (e.setLoop = function (t) {
        null != this._playbackResource &&
          (0 != this._loop && 0 == t
            ? this._removeLooping(t)
            : 0 == this._loop && 0 != t && this._addLooping(t)),
          (this._loop = t);
      }),
      (e._sendEvent = function (t) {
        var e = new createjs.Event(t);
        this.dispatchEvent(e);
      }),
      (e._cleanUp = function () {
        clearTimeout(this.delayTimeoutId),
          this._handleCleanUp(),
          (this._paused = !1),
          createjs.Sound._playFinished(this);
      }),
      (e._interrupt = function () {
        this._cleanUp(),
          (this.playState = createjs.Sound.PLAY_INTERRUPTED),
          this._sendEvent("interrupted");
      }),
      (e._beginPlaying = function (t) {
        return (
          this.setPosition(t.offset),
          this.setLoop(t.loop),
          this.setVolume(t.volume),
          this.setPan(t.pan),
          null != t.startTime &&
            (this.setStartTime(t.startTime), this.setDuration(t.duration)),
          null != this._playbackResource && this._position < this._duration
            ? ((this._paused = !1),
              this._handleSoundReady(),
              (this.playState = createjs.Sound.PLAY_SUCCEEDED),
              this._sendEvent("succeeded"),
              !0)
            : (this._playFailed(), !1)
        );
      }),
      (e._playFailed = function () {
        this._cleanUp(),
          (this.playState = createjs.Sound.PLAY_FAILED),
          this._sendEvent("failed");
      }),
      (e._handleSoundComplete = function (t) {
        return (
          (this._position = 0),
          0 != this._loop
            ? (this._loop--, this._handleLoop(), void this._sendEvent("loop"))
            : (this._cleanUp(),
              (this.playState = createjs.Sound.PLAY_FINISHED),
              void this._sendEvent("complete"))
        );
      }),
      (e._handleSoundReady = function () {}),
      (e._updateVolume = function () {}),
      (e._updatePan = function () {}),
      (e._updateStartTime = function () {}),
      (e._updateDuration = function () {}),
      (e._setDurationFromSource = function () {}),
      (e._calculateCurrentPosition = function () {}),
      (e._updatePosition = function () {}),
      (e._removeLooping = function (t) {}),
      (e._addLooping = function (t) {}),
      (e._pause = function () {}),
      (e._resume = function () {}),
      (e._handleStop = function () {}),
      (e._handleCleanUp = function () {}),
      (e._handleLoop = function () {}),
      (createjs.AbstractSoundInstance = createjs.promote(t, "EventDispatcher")),
      (createjs.DefaultSoundInstance = createjs.AbstractSoundInstance);
  })(),
  (this.createjs = this.createjs || {}),
  (function () {
    "use strict";
    var t = function () {
        (this._capabilities = null),
          (this._loaders = {}),
          (this._audioSources = {}),
          (this._soundInstances = {}),
          (this._volume = 1),
          this._loaderClass,
          this._soundInstanceClass;
      },
      e = t.prototype;
    (t._capabilities = null),
      (t.isSupported = function () {
        return !0;
      }),
      (e.register = function (t) {
        var e = this._loaders[t.src];
        return e && !e.canceled
          ? this._loaders[t.src]
          : ((this._audioSources[t.src] = !0),
            (this._soundInstances[t.src] = []),
            (e = new this._loaderClass(t)),
            e.on("complete", this._handlePreloadComplete, this),
            (this._loaders[t.src] = e),
            e);
      }),
      (e.preload = function (t) {
        t.on("error", this._handlePreloadError, this), t.load();
      }),
      (e.isPreloadStarted = function (t) {
        return null != this._audioSources[t];
      }),
      (e.isPreloadComplete = function (t) {
        return !(null == this._audioSources[t] || 1 == this._audioSources[t]);
      }),
      (e.removeSound = function (t) {
        if (this._soundInstances[t]) {
          for (var e = this._soundInstances[t].length; e--; ) {
            var i = this._soundInstances[t][e];
            i.destroy();
          }
          delete this._soundInstances[t],
            delete this._audioSources[t],
            this._loaders[t] && this._loaders[t].destroy(),
            delete this._loaders[t];
        }
      }),
      (e.removeAllSounds = function () {
        for (var t in this._audioSources) this.removeSound(t);
      }),
      (e.create = function (t, e, i) {
        this.isPreloadStarted(t) || this.preload(this.register(t));
        var s = new this._soundInstanceClass(t, e, i, this._audioSources[t]);
        return this._soundInstances[t].push(s), s;
      }),
      (e.setVolume = function (t) {
        return (this._volume = t), this._updateVolume(), !0;
      }),
      (e.getVolume = function () {
        return this._volume;
      }),
      (e.setMute = function (t) {
        return this._updateVolume(), !0;
      }),
      (e.toString = function () {
        return "[AbstractPlugin]";
      }),
      (e._handlePreloadComplete = function (t) {
        var e = t.target.getItem().src;
        this._audioSources[e] = t.result;
        for (var i = 0, s = this._soundInstances[e].length; s > i; i++) {
          var n = this._soundInstances[e][i];
          n.setPlaybackResource(this._audioSources[e]);
        }
      }),
      (e._handlePreloadError = function (t) {}),
      (e._updateVolume = function () {}),
      (createjs.AbstractPlugin = t);
  })(),
  (this.createjs = this.createjs || {}),
  (function () {
    "use strict";
    function t(t) {
      this.AbstractLoader_constructor(t, !0, createjs.AbstractLoader.SOUND);
    }
    var e = createjs.extend(t, createjs.AbstractLoader);
    (t.context = null),
      (e.toString = function () {
        return "[WebAudioLoader]";
      }),
      (e._createRequest = function () {
        (this._request = new createjs.XHRRequest(this._item, !1)),
          this._request.setResponseType("arraybuffer");
      }),
      (e._sendComplete = function (e) {
        t.context.decodeAudioData(
          this._rawResult,
          createjs.proxy(this._handleAudioDecoded, this),
          createjs.proxy(this._sendError, this)
        );
      }),
      (e._handleAudioDecoded = function (t) {
        (this._result = t), this.AbstractLoader__sendComplete();
      }),
      (createjs.WebAudioLoader = createjs.promote(t, "AbstractLoader"));
  })(),
  (this.createjs = this.createjs || {}),
  (function () {
    "use strict";
    function t(t, e, s, n) {
      this.AbstractSoundInstance_constructor(t, e, s, n),
        (this.gainNode = i.context.createGain()),
        (this.panNode = i.context.createPanner()),
        (this.panNode.panningModel = i._panningModel),
        this.panNode.connect(this.gainNode),
        this._updatePan(),
        (this.sourceNode = null),
        (this._soundCompleteTimeout = null),
        (this._sourceNodeNext = null),
        (this._playbackStartTime = 0),
        (this._endedHandler = createjs.proxy(this._handleSoundComplete, this));
    }
    var e = createjs.extend(t, createjs.AbstractSoundInstance),
      i = t;
    (i.context = null),
      (i._scratchBuffer = null),
      (i.destinationNode = null),
      (i._panningModel = "equalpower"),
      (e.destroy = function () {
        this.AbstractSoundInstance_destroy(),
          this.panNode.disconnect(0),
          (this.panNode = null),
          this.gainNode.disconnect(0),
          (this.gainNode = null);
      }),
      (e.toString = function () {
        return "[WebAudioSoundInstance]";
      }),
      (e._updatePan = function () {
        this.panNode.setPosition(this._pan, 0, -0.5);
      }),
      (e._removeLooping = function (t) {
        this._sourceNodeNext = this._cleanUpAudioNode(this._sourceNodeNext);
      }),
      (e._addLooping = function (t) {
        this.playState == createjs.Sound.PLAY_SUCCEEDED &&
          (this._sourceNodeNext = this._createAndPlayAudioNode(
            this._playbackStartTime,
            0
          ));
      }),
      (e._setDurationFromSource = function () {
        this._duration = 1e3 * this.playbackResource.duration;
      }),
      (e._handleCleanUp = function () {
        this.sourceNode &&
          this.playState == createjs.Sound.PLAY_SUCCEEDED &&
          ((this.sourceNode = this._cleanUpAudioNode(this.sourceNode)),
          (this._sourceNodeNext = this._cleanUpAudioNode(
            this._sourceNodeNext
          ))),
          0 != this.gainNode.numberOfOutputs && this.gainNode.disconnect(0),
          clearTimeout(this._soundCompleteTimeout),
          (this._playbackStartTime = 0);
      }),
      (e._cleanUpAudioNode = function (t) {
        if (t) {
          t.stop(0), t.disconnect(0);
          try {
            t.buffer = i._scratchBuffer;
          } catch (e) {}
          t = null;
        }
        return t;
      }),
      (e._handleSoundReady = function (t) {
        this.gainNode.connect(i.destinationNode);
        var e = 0.001 * this._duration,
          s = 0.001 * this._position;
        s > e && (s = e),
          (this.sourceNode = this._createAndPlayAudioNode(
            i.context.currentTime - e,
            s
          )),
          (this._playbackStartTime = this.sourceNode.startTime - s),
          (this._soundCompleteTimeout = setTimeout(
            this._endedHandler,
            1e3 * (e - s)
          )),
          0 != this._loop &&
            (this._sourceNodeNext = this._createAndPlayAudioNode(
              this._playbackStartTime,
              0
            ));
      }),
      (e._createAndPlayAudioNode = function (t, e) {
        var s = i.context.createBufferSource();
        (s.buffer = this.playbackResource), s.connect(this.panNode);
        var n = 0.001 * this._duration;
        return (
          (s.startTime = t + n),
          s.start(s.startTime, e + 0.001 * this._startTime, n - e),
          s
        );
      }),
      (e._pause = function () {
        (this._position =
          1e3 * (i.context.currentTime - this._playbackStartTime)),
          (this.sourceNode = this._cleanUpAudioNode(this.sourceNode)),
          (this._sourceNodeNext = this._cleanUpAudioNode(this._sourceNodeNext)),
          0 != this.gainNode.numberOfOutputs && this.gainNode.disconnect(0),
          clearTimeout(this._soundCompleteTimeout);
      }),
      (e._resume = function () {
        this._handleSoundReady();
      }),
      (e._updateVolume = function () {
        var t = this._muted ? 0 : this._volume;
        t != this.gainNode.gain.value && (this.gainNode.gain.value = t);
      }),
      (e._calculateCurrentPosition = function () {
        return 1e3 * (i.context.currentTime - this._playbackStartTime);
      }),
      (e._updatePosition = function () {
        (this.sourceNode = this._cleanUpAudioNode(this.sourceNode)),
          (this._sourceNodeNext = this._cleanUpAudioNode(this._sourceNodeNext)),
          clearTimeout(this._soundCompleteTimeout),
          this._paused || this._handleSoundReady();
      }),
      (e._handleLoop = function () {
        this._cleanUpAudioNode(this.sourceNode),
          (this.sourceNode = this._sourceNodeNext),
          (this._playbackStartTime = this.sourceNode.startTime),
          (this._sourceNodeNext = this._createAndPlayAudioNode(
            this._playbackStartTime,
            0
          )),
          (this._soundCompleteTimeout = setTimeout(
            this._endedHandler,
            this._duration
          ));
      }),
      (e._updateDuration = function () {
        this.playState == createjs.Sound.PLAY_SUCCEEDED &&
          (this._pause(), this._resume());
      }),
      (createjs.WebAudioSoundInstance = createjs.promote(
        t,
        "AbstractSoundInstance"
      ));
  })(),
  (this.createjs = this.createjs || {}),
  (function () {
    "use strict";
    function t() {
      this.AbstractPlugin_constructor(),
        (this._panningModel = i._panningModel),
        (this.context = i.context),
        (this.dynamicsCompressorNode = this.context.createDynamicsCompressor()),
        this.dynamicsCompressorNode.connect(this.context.destination),
        (this.gainNode = this.context.createGain()),
        this.gainNode.connect(this.dynamicsCompressorNode),
        (createjs.WebAudioSoundInstance.destinationNode = this.gainNode),
        (this._capabilities = i._capabilities),
        (this._loaderClass = createjs.WebAudioLoader),
        (this._soundInstanceClass = createjs.WebAudioSoundInstance),
        this._addPropsToClasses();
    }
    var e = createjs.extend(t, createjs.AbstractPlugin),
      i = t;
    (i._capabilities = null),
      (i._panningModel = "equalpower"),
      (i.context = null),
      (i._scratchBuffer = null),
      (i._unlocked = !1),
      (i.isSupported = function () {
        var t =
          createjs.BrowserDetect.isIOS ||
          createjs.BrowserDetect.isAndroid ||
          createjs.BrowserDetect.isBlackberry;
        return (
          !(
            "file:" == location.protocol &&
            !t &&
            !this._isFileXHRSupported()
          ) && (i._generateCapabilities(), null != i.context)
        );
      }),
      (i.playEmptySound = function () {
        if (null != i.context) {
          var t = i.context.createBufferSource();
          (t.buffer = i._scratchBuffer),
            t.connect(i.context.destination),
            t.start(0, 0, 0);
        }
      }),
      (i._isFileXHRSupported = function () {
        var t = !0,
          e = new XMLHttpRequest();
        try {
          e.open("GET", "WebAudioPluginTest.fail", !1);
        } catch (i) {
          return (t = !1);
        }
        (e.onerror = function () {
          t = !1;
        }),
          (e.onload = function () {
            t =
              404 == this.status ||
              200 == this.status ||
              (0 == this.status && "" != this.response);
          });
        try {
          e.send();
        } catch (i) {
          t = !1;
        }
        return t;
      }),
      (i._generateCapabilities = function () {
        if (null == i._capabilities) {
          var t = document.createElement("audio");
          if (null == t.canPlayType) return null;
          if (null == i.context)
            if (window.AudioContext) i.context = new AudioContext();
            else {
              if (!window.webkitAudioContext) return null;
              i.context = new webkitAudioContext();
            }
          null == i._scratchBuffer &&
            (i._scratchBuffer = i.context.createBuffer(1, 1, 22050)),
            i._compatibilitySetUp(),
            "ontouchstart" in window &&
              "running" != i.context.state &&
              (i._unlock(),
              document.addEventListener("mousedown", i._unlock, !0),
              document.addEventListener("touchend", i._unlock, !0)),
            (i._capabilities = { panning: !0, volume: !0, tracks: -1 });
          for (
            var e = createjs.Sound.SUPPORTED_EXTENSIONS,
              s = createjs.Sound.EXTENSION_MAP,
              n = 0,
              r = e.length;
            r > n;
            n++
          ) {
            var a = e[n],
              o = s[a] || a;
            i._capabilities[a] =
              ("no" != t.canPlayType("audio/" + a) &&
                "" != t.canPlayType("audio/" + a)) ||
              ("no" != t.canPlayType("audio/" + o) &&
                "" != t.canPlayType("audio/" + o));
          }
          i.context.destination.numberOfChannels < 2 &&
            (i._capabilities.panning = !1);
        }
      }),
      (i._compatibilitySetUp = function () {
        if (((i._panningModel = "equalpower"), !i.context.createGain)) {
          i.context.createGain = i.context.createGainNode;
          var t = i.context.createBufferSource();
          (t.__proto__.start = t.__proto__.noteGrainOn),
            (t.__proto__.stop = t.__proto__.noteOff),
            (i._panningModel = 0);
        }
      }),
      (i._unlock = function () {
        i._unlocked ||
          (i.playEmptySound(),
          "running" == i.context.state &&
            (document.removeEventListener("mousedown", i._unlock, !0),
            document.removeEventListener("touchend", i._unlock, !0),
            (i._unlocked = !0)));
      }),
      (e.toString = function () {
        return "[WebAudioPlugin]";
      }),
      (e._addPropsToClasses = function () {
        var t = this._soundInstanceClass;
        (t.context = this.context),
          (t._scratchBuffer = i._scratchBuffer),
          (t.destinationNode = this.gainNode),
          (t._panningModel = this._panningModel),
          (this._loaderClass.context = this.context);
      }),
      (e._updateVolume = function () {
        var t = createjs.Sound._masterMute ? 0 : this._volume;
        t != this.gainNode.gain.value && (this.gainNode.gain.value = t);
      }),
      (createjs.WebAudioPlugin = createjs.promote(t, "AbstractPlugin"));
  })(),
  (this.createjs = this.createjs || {}),
  (function () {
    "use strict";
    function t() {
      throw "HTMLAudioTagPool cannot be instantiated";
    }
    function e(t) {
      this._tags = [];
    }
    var i = t;
    (i._tags = {}),
      (i._tagPool = new e()),
      (i._tagUsed = {}),
      (i.get = function (t) {
        var e = i._tags[t];
        return (
          null == e
            ? ((e = i._tags[t] = i._tagPool.get()), (e.src = t))
            : i._tagUsed[t]
            ? ((e = i._tagPool.get()), (e.src = t))
            : (i._tagUsed[t] = !0),
          e
        );
      }),
      (i.set = function (t, e) {
        e == i._tags[t] ? (i._tagUsed[t] = !1) : i._tagPool.set(e);
      }),
      (i.remove = function (t) {
        var e = i._tags[t];
        return (
          null != e &&
          (i._tagPool.set(e), delete i._tags[t], delete i._tagUsed[t], !0)
        );
      }),
      (i.getDuration = function (t) {
        var e = i._tags[t];
        return null != e && e.duration ? 1e3 * e.duration : 0;
      }),
      (createjs.HTMLAudioTagPool = t);
    var s = e.prototype;
    (s.constructor = e),
      (s.get = function () {
        var t;
        return (
          (t = 0 == this._tags.length ? this._createTag() : this._tags.pop()),
          null == t.parentNode && document.body.appendChild(t),
          t
        );
      }),
      (s.set = function (t) {
        var e = createjs.indexOf(this._tags, t);
        -1 == e && ((this._tags.src = null), this._tags.push(t));
      }),
      (s.toString = function () {
        return "[TagPool]";
      }),
      (s._createTag = function () {
        var t = document.createElement("audio");
        return (t.autoplay = !1), (t.preload = "none"), t;
      });
  })(),
  (this.createjs = this.createjs || {}),
  (function () {
    "use strict";
    function t(t, e, i, s) {
      this.AbstractSoundInstance_constructor(t, e, i, s),
        (this._audioSpriteStopTime = null),
        (this._delayTimeoutId = null),
        (this._endedHandler = createjs.proxy(this._handleSoundComplete, this)),
        (this._readyHandler = createjs.proxy(this._handleTagReady, this)),
        (this._stalledHandler = createjs.proxy(this._playFailed, this)),
        (this._audioSpriteEndHandler = createjs.proxy(
          this._handleAudioSpriteLoop,
          this
        )),
        (this._loopHandler = createjs.proxy(this._handleSoundComplete, this)),
        i
          ? (this._audioSpriteStopTime = 0.001 * (e + i))
          : (this._duration = createjs.HTMLAudioTagPool.getDuration(this.src));
    }
    var e = createjs.extend(t, createjs.AbstractSoundInstance);
    (e.setMasterVolume = function (t) {
      this._updateVolume();
    }),
      (e.setMasterMute = function (t) {
        this._updateVolume();
      }),
      (e.toString = function () {
        return "[HTMLAudioSoundInstance]";
      }),
      (e._removeLooping = function () {
        null != this._playbackResource &&
          ((this._playbackResource.loop = !1),
          this._playbackResource.removeEventListener(
            createjs.HTMLAudioPlugin._AUDIO_SEEKED,
            this._loopHandler,
            !1
          ));
      }),
      (e._addLooping = function () {
        null == this._playbackResource ||
          this._audioSpriteStopTime ||
          (this._playbackResource.addEventListener(
            createjs.HTMLAudioPlugin._AUDIO_SEEKED,
            this._loopHandler,
            !1
          ),
          (this._playbackResource.loop = !0));
      }),
      (e._handleCleanUp = function () {
        var t = this._playbackResource;
        if (null != t) {
          t.pause(),
            (t.loop = !1),
            t.removeEventListener(
              createjs.HTMLAudioPlugin._AUDIO_ENDED,
              this._endedHandler,
              !1
            ),
            t.removeEventListener(
              createjs.HTMLAudioPlugin._AUDIO_READY,
              this._readyHandler,
              !1
            ),
            t.removeEventListener(
              createjs.HTMLAudioPlugin._AUDIO_STALLED,
              this._stalledHandler,
              !1
            ),
            t.removeEventListener(
              createjs.HTMLAudioPlugin._AUDIO_SEEKED,
              this._loopHandler,
              !1
            ),
            t.removeEventListener(
              createjs.HTMLAudioPlugin._TIME_UPDATE,
              this._audioSpriteEndHandler,
              !1
            );
          try {
            t.currentTime = this._startTime;
          } catch (e) {}
          createjs.HTMLAudioTagPool.set(this.src, t),
            (this._playbackResource = null);
        }
      }),
      (e._beginPlaying = function (t) {
        return (
          (this._playbackResource = createjs.HTMLAudioTagPool.get(this.src)),
          this.AbstractSoundInstance__beginPlaying(t)
        );
      }),
      (e._handleSoundReady = function (t) {
        if (4 !== this._playbackResource.readyState) {
          var e = this._playbackResource;
          return (
            e.addEventListener(
              createjs.HTMLAudioPlugin._AUDIO_READY,
              this._readyHandler,
              !1
            ),
            e.addEventListener(
              createjs.HTMLAudioPlugin._AUDIO_STALLED,
              this._stalledHandler,
              !1
            ),
            (e.preload = "auto"),
            void e.load()
          );
        }
        this._updateVolume(),
          (this._playbackResource.currentTime =
            0.001 * (this._startTime + this._position)),
          this._audioSpriteStopTime
            ? this._playbackResource.addEventListener(
                createjs.HTMLAudioPlugin._TIME_UPDATE,
                this._audioSpriteEndHandler,
                !1
              )
            : (this._playbackResource.addEventListener(
                createjs.HTMLAudioPlugin._AUDIO_ENDED,
                this._endedHandler,
                !1
              ),
              0 != this._loop &&
                (this._playbackResource.addEventListener(
                  createjs.HTMLAudioPlugin._AUDIO_SEEKED,
                  this._loopHandler,
                  !1
                ),
                (this._playbackResource.loop = !0))),
          this._playbackResource.play();
      }),
      (e._handleTagReady = function (t) {
        this._playbackResource.removeEventListener(
          createjs.HTMLAudioPlugin._AUDIO_READY,
          this._readyHandler,
          !1
        ),
          this._playbackResource.removeEventListener(
            createjs.HTMLAudioPlugin._AUDIO_STALLED,
            this._stalledHandler,
            !1
          ),
          this._handleSoundReady();
      }),
      (e._pause = function () {
        this._playbackResource.pause();
      }),
      (e._resume = function () {
        this._playbackResource.play();
      }),
      (e._updateVolume = function () {
        if (null != this._playbackResource) {
          var t =
            this._muted || createjs.Sound._masterMute
              ? 0
              : this._volume * createjs.Sound._masterVolume;
          t != this._playbackResource.volume &&
            (this._playbackResource.volume = t);
        }
      }),
      (e._calculateCurrentPosition = function () {
        return 1e3 * this._playbackResource.currentTime - this._startTime;
      }),
      (e._updatePosition = function () {
        this._playbackResource.removeEventListener(
          createjs.HTMLAudioPlugin._AUDIO_SEEKED,
          this._loopHandler,
          !1
        ),
          this._playbackResource.addEventListener(
            createjs.HTMLAudioPlugin._AUDIO_SEEKED,
            this._handleSetPositionSeek,
            !1
          );
        try {
          this._playbackResource.currentTime =
            0.001 * (this._position + this._startTime);
        } catch (t) {
          this._handleSetPositionSeek(null);
        }
      }),
      (e._handleSetPositionSeek = function (t) {
        null != this._playbackResource &&
          (this._playbackResource.removeEventListener(
            createjs.HTMLAudioPlugin._AUDIO_SEEKED,
            this._handleSetPositionSeek,
            !1
          ),
          this._playbackResource.addEventListener(
            createjs.HTMLAudioPlugin._AUDIO_SEEKED,
            this._loopHandler,
            !1
          ));
      }),
      (e._handleAudioSpriteLoop = function (t) {
        this._playbackResource.currentTime <= this._audioSpriteStopTime ||
          (this._playbackResource.pause(),
          0 == this._loop
            ? this._handleSoundComplete(null)
            : ((this._position = 0),
              this._loop--,
              (this._playbackResource.currentTime = 0.001 * this._startTime),
              this._paused || this._playbackResource.play(),
              this._sendEvent("loop")));
      }),
      (e._handleLoop = function (t) {
        0 == this._loop &&
          ((this._playbackResource.loop = !1),
          this._playbackResource.removeEventListener(
            createjs.HTMLAudioPlugin._AUDIO_SEEKED,
            this._loopHandler,
            !1
          ));
      }),
      (e._updateStartTime = function () {
        (this._audioSpriteStopTime =
          0.001 * (this._startTime + this._duration)),
          this.playState == createjs.Sound.PLAY_SUCCEEDED &&
            (this._playbackResource.removeEventListener(
              createjs.HTMLAudioPlugin._AUDIO_ENDED,
              this._endedHandler,
              !1
            ),
            this._playbackResource.addEventListener(
              createjs.HTMLAudioPlugin._TIME_UPDATE,
              this._audioSpriteEndHandler,
              !1
            ));
      }),
      (e._updateDuration = function () {
        (this._audioSpriteStopTime =
          0.001 * (this._startTime + this._duration)),
          this.playState == createjs.Sound.PLAY_SUCCEEDED &&
            (this._playbackResource.removeEventListener(
              createjs.HTMLAudioPlugin._AUDIO_ENDED,
              this._endedHandler,
              !1
            ),
            this._playbackResource.addEventListener(
              createjs.HTMLAudioPlugin._TIME_UPDATE,
              this._audioSpriteEndHandler,
              !1
            ));
      }),
      (e._setDurationFromSource = function () {
        (this._duration = createjs.HTMLAudioTagPool.getDuration(this.src)),
          (this._playbackResource = null);
      }),
      (createjs.HTMLAudioSoundInstance = createjs.promote(
        t,
        "AbstractSoundInstance"
      ));
  })(),
  (this.createjs = this.createjs || {}),
  (function () {
    "use strict";
    function t() {
      this.AbstractPlugin_constructor(),
        (this.defaultNumChannels = 2),
        (this._capabilities = i._capabilities),
        (this._loaderClass = createjs.SoundLoader),
        (this._soundInstanceClass = createjs.HTMLAudioSoundInstance);
    }
    var e = createjs.extend(t, createjs.AbstractPlugin),
      i = t;
    (i.MAX_INSTANCES = 30),
      (i._AUDIO_READY = "canplaythrough"),
      (i._AUDIO_ENDED = "ended"),
      (i._AUDIO_SEEKED = "seeked"),
      (i._AUDIO_STALLED = "stalled"),
      (i._TIME_UPDATE = "timeupdate"),
      (i._capabilities = null),
      (i.isSupported = function () {
        return i._generateCapabilities(), null != i._capabilities;
      }),
      (i._generateCapabilities = function () {
        if (null == i._capabilities) {
          var t = document.createElement("audio");
          if (null == t.canPlayType) return null;
          i._capabilities = { panning: !1, volume: !0, tracks: -1 };
          for (
            var e = createjs.Sound.SUPPORTED_EXTENSIONS,
              s = createjs.Sound.EXTENSION_MAP,
              n = 0,
              r = e.length;
            r > n;
            n++
          ) {
            var a = e[n],
              o = s[a] || a;
            i._capabilities[a] =
              ("no" != t.canPlayType("audio/" + a) &&
                "" != t.canPlayType("audio/" + a)) ||
              ("no" != t.canPlayType("audio/" + o) &&
                "" != t.canPlayType("audio/" + o));
          }
        }
      }),
      (e.register = function (t) {
        var e = createjs.HTMLAudioTagPool.get(t.src),
          i = this.AbstractPlugin_register(t);
        return i.setTag(e), i;
      }),
      (e.removeSound = function (t) {
        this.AbstractPlugin_removeSound(t), createjs.HTMLAudioTagPool.remove(t);
      }),
      (e.create = function (t, e, i) {
        var s = this.AbstractPlugin_create(t, e, i);
        return s.setPlaybackResource(null), s;
      }),
      (e.toString = function () {
        return "[HTMLAudioPlugin]";
      }),
      (e.setVolume = e.getVolume = e.setMute = null),
      (createjs.HTMLAudioPlugin = createjs.promote(t, "AbstractPlugin"));
  })(),
  (this.createjs = this.createjs || {}),
  (function () {
    "use strict";
    function t(e, i, s) {
      (this.ignoreGlobalPause = !1),
        (this.loop = !1),
        (this.duration = 0),
        (this.pluginData = s || {}),
        (this.target = e),
        (this.position = null),
        (this.passive = !1),
        (this._paused = !1),
        (this._curQueueProps = {}),
        (this._initQueueProps = {}),
        (this._steps = []),
        (this._actions = []),
        (this._prevPosition = 0),
        (this._stepPosition = 0),
        (this._prevPos = -1),
        (this._target = e),
        (this._useTicks = !1),
        (this._inited = !1),
        (this._registered = !1),
        i &&
          ((this._useTicks = i.useTicks),
          (this.ignoreGlobalPause = i.ignoreGlobalPause),
          (this.loop = i.loop),
          i.onChange && this.addEventListener("change", i.onChange),
          i.override && t.removeTweens(e)),
        i && i.paused
          ? (this._paused = !0)
          : createjs.Tween._register(this, !0),
        i && null != i.position && this.setPosition(i.position, t.NONE);
    }
    var e = createjs.extend(t, createjs.EventDispatcher);
    (t.NONE = 0),
      (t.LOOP = 1),
      (t.REVERSE = 2),
      (t.IGNORE = {}),
      (t._tweens = []),
      (t._plugins = {}),
      (t.get = function (e, i, s, n) {
        return n && t.removeTweens(e), new t(e, i, s);
      }),
      (t.tick = function (e, i) {
        for (var s = t._tweens.slice(), n = s.length - 1; n >= 0; n--) {
          var r = s[n];
          (i && !r.ignoreGlobalPause) ||
            r._paused ||
            r.tick(r._useTicks ? 1 : e);
        }
      }),
      (t.handleEvent = function (t) {
        "tick" == t.type && this.tick(t.delta, t.paused);
      }),
      (t.removeTweens = function (e) {
        if (e.tweenjs_count) {
          for (var i = t._tweens, s = i.length - 1; s >= 0; s--) {
            var n = i[s];
            n._target == e && ((n._paused = !0), i.splice(s, 1));
          }
          e.tweenjs_count = 0;
        }
      }),
      (t.removeAllTweens = function () {
        for (var e = t._tweens, i = 0, s = e.length; s > i; i++) {
          var n = e[i];
          (n._paused = !0), n.target && (n.target.tweenjs_count = 0);
        }
        e.length = 0;
      }),
      (t.hasActiveTweens = function (e) {
        return e
          ? null != e.tweenjs_count && !!e.tweenjs_count
          : t._tweens && !!t._tweens.length;
      }),
      (t.installPlugin = function (e, i) {
        var s = e.priority;
        null == s && (e.priority = s = 0);
        for (var n = 0, r = i.length, a = t._plugins; r > n; n++) {
          var o = i[n];
          if (a[o]) {
            for (
              var h = a[o], c = 0, l = h.length;
              l > c && !(s < h[c].priority);
              c++
            );
            a[o].splice(c, 0, e);
          } else a[o] = [e];
        }
      }),
      (t._register = function (e, i) {
        var s = e._target,
          n = t._tweens;
        if (i && !e._registered)
          s && (s.tweenjs_count = s.tweenjs_count ? s.tweenjs_count + 1 : 1),
            n.push(e),
            !t._inited &&
              createjs.Ticker &&
              (createjs.Ticker.addEventListener("tick", t), (t._inited = !0));
        else if (!i && e._registered) {
          s && s.tweenjs_count--;
          for (var r = n.length; r--; )
            if (n[r] == e) {
              n.splice(r, 1);
              break;
            }
        }
        e._registered = i;
      }),
      (e.wait = function (t, e) {
        if (null == t || 0 >= t) return this;
        var i = this._cloneProps(this._curQueueProps);
        return this._addStep({ d: t, p0: i, e: this._linearEase, p1: i, v: e });
      }),
      (e.to = function (t, e, i) {
        return (
          (isNaN(e) || 0 > e) && (e = 0),
          this._addStep({
            d: e || 0,
            p0: this._cloneProps(this._curQueueProps),
            e: i,
            p1: this._cloneProps(this._appendQueueProps(t)),
          })
        );
      }),
      (e.call = function (t, e, i) {
        return this._addAction({
          f: t,
          p: e ? e : [this],
          o: i ? i : this._target,
        });
      }),
      (e.set = function (t, e) {
        return this._addAction({
          f: this._set,
          o: this,
          p: [t, e ? e : this._target],
        });
      }),
      (e.play = function (t) {
        return t || (t = this), this.call(t.setPaused, [!1], t);
      }),
      (e.pause = function (t) {
        return t || (t = this), this.call(t.setPaused, [!0], t);
      }),
      (e.setPosition = function (t, e) {
        0 > t && (t = 0), null == e && (e = 1);
        var i = t,
          s = !1;
        if (
          (i >= this.duration &&
            (this.loop
              ? (i %= this.duration)
              : ((i = this.duration), (s = !0))),
          i == this._prevPos)
        )
          return s;
        var n = this._prevPos;
        if (
          ((this.position = this._prevPos = i),
          (this._prevPosition = t),
          this._target)
        )
          if (s) this._updateTargetProps(null, 1);
          else if (this._steps.length > 0) {
            for (
              var r = 0, a = this._steps.length;
              a > r && !(this._steps[r].t > i);
              r++
            );
            var o = this._steps[r - 1];
            this._updateTargetProps(o, (this._stepPosition = i - o.t) / o.d);
          }
        return (
          0 != e &&
            this._actions.length > 0 &&
            (this._useTicks
              ? this._runActions(i, i)
              : 1 == e && n > i
              ? (n != this.duration && this._runActions(n, this.duration),
                this._runActions(0, i, !0))
              : this._runActions(n, i)),
          s && this.setPaused(!0),
          this.dispatchEvent("change"),
          s
        );
      }),
      (e.tick = function (t) {
        this._paused || this.setPosition(this._prevPosition + t);
      }),
      (e.setPaused = function (e) {
        return this._paused === !!e
          ? this
          : ((this._paused = !!e), t._register(this, !e), this);
      }),
      (e.w = e.wait),
      (e.t = e.to),
      (e.c = e.call),
      (e.s = e.set),
      (e.toString = function () {
        return "[Tween]";
      }),
      (e.clone = function () {
        throw "Tween can not be cloned.";
      }),
      (e._updateTargetProps = function (e, i) {
        var s, n, r, a, o, h;
        if (e || 1 != i) {
          if (((this.passive = !!e.v), this.passive)) return;
          e.e && (i = e.e(i, 0, 1, 1)), (s = e.p0), (n = e.p1);
        } else (this.passive = !1), (s = n = this._curQueueProps);
        for (var c in this._initQueueProps) {
          null == (a = s[c]) && (s[c] = a = this._initQueueProps[c]),
            null == (o = n[c]) && (n[c] = o = a),
            (r =
              a == o || 0 == i || 1 == i || "number" != typeof a
                ? 1 == i
                  ? o
                  : a
                : a + (o - a) * i);
          var l = !1;
          if ((h = t._plugins[c]))
            for (var u = 0, d = h.length; d > u; u++) {
              var _ = h[u].tween(this, c, r, s, n, i, !!e && s == n, !e);
              _ == t.IGNORE ? (l = !0) : (r = _);
            }
          l || (this._target[c] = r);
        }
      }),
      (e._runActions = function (t, e, i) {
        var s = t,
          n = e,
          r = -1,
          a = this._actions.length,
          o = 1;
        for (
          t > e && ((s = e), (n = t), (r = a), (a = o = -1));
          (r += o) != a;

        ) {
          var h = this._actions[r],
            c = h.t;
          (c == n || (c > s && n > c) || (i && c == t)) && h.f.apply(h.o, h.p);
        }
      }),
      (e._appendQueueProps = function (e) {
        var i, s, n, r, a;
        for (var o in e)
          if (void 0 === this._initQueueProps[o]) {
            if (((s = this._target[o]), (i = t._plugins[o])))
              for (n = 0, r = i.length; r > n; n++) s = i[n].init(this, o, s);
            this._initQueueProps[o] = this._curQueueProps[o] =
              void 0 === s ? null : s;
          } else s = this._curQueueProps[o];
        for (var o in e) {
          if (((s = this._curQueueProps[o]), (i = t._plugins[o])))
            for (a = a || {}, n = 0, r = i.length; r > n; n++)
              i[n].step && i[n].step(this, o, s, e[o], a);
          this._curQueueProps[o] = e[o];
        }
        return a && this._appendQueueProps(a), this._curQueueProps;
      }),
      (e._cloneProps = function (t) {
        var e = {};
        for (var i in t) e[i] = t[i];
        return e;
      }),
      (e._addStep = function (t) {
        return (
          t.d > 0 &&
            (this._steps.push(t),
            (t.t = this.duration),
            (this.duration += t.d)),
          this
        );
      }),
      (e._addAction = function (t) {
        return (t.t = this.duration), this._actions.push(t), this;
      }),
      (e._set = function (t, e) {
        for (var i in t) e[i] = t[i];
      }),
      (createjs.Tween = createjs.promote(t, "EventDispatcher"));
  })(),
  (this.createjs = this.createjs || {}),
  (function () {
    "use strict";
    function t(t, e, i) {
      this.EventDispatcher_constructor(),
        (this.ignoreGlobalPause = !1),
        (this.duration = 0),
        (this.loop = !1),
        (this.position = null),
        (this._paused = !1),
        (this._tweens = []),
        (this._labels = null),
        (this._labelList = null),
        (this._prevPosition = 0),
        (this._prevPos = -1),
        (this._useTicks = !1),
        (this._registered = !1),
        i &&
          ((this._useTicks = i.useTicks),
          (this.loop = i.loop),
          (this.ignoreGlobalPause = i.ignoreGlobalPause),
          i.onChange && this.addEventListener("change", i.onChange)),
        t && this.addTween.apply(this, t),
        this.setLabels(e),
        i && i.paused
          ? (this._paused = !0)
          : createjs.Tween._register(this, !0),
        i &&
          null != i.position &&
          this.setPosition(i.position, createjs.Tween.NONE);
    }
    var e = createjs.extend(t, createjs.EventDispatcher);
    (e.addTween = function (t) {
      var e = arguments.length;
      if (e > 1) {
        for (var i = 0; e > i; i++) this.addTween(arguments[i]);
        return arguments[0];
      }
      return 0 == e
        ? null
        : (this.removeTween(t),
          this._tweens.push(t),
          t.setPaused(!0),
          (t._paused = !1),
          (t._useTicks = this._useTicks),
          t.duration > this.duration && (this.duration = t.duration),
          this._prevPos >= 0 &&
            t.setPosition(this._prevPos, createjs.Tween.NONE),
          t);
    }),
      (e.removeTween = function (t) {
        var e = arguments.length;
        if (e > 1) {
          for (var i = !0, s = 0; e > s; s++)
            i = i && this.removeTween(arguments[s]);
          return i;
        }
        if (0 == e) return !1;
        for (var n = this._tweens, s = n.length; s--; )
          if (n[s] == t)
            return (
              n.splice(s, 1),
              t.duration >= this.duration && this.updateDuration(),
              !0
            );
        return !1;
      }),
      (e.addLabel = function (t, e) {
        this._labels[t] = e;
        var i = this._labelList;
        if (i) {
          for (var s = 0, n = i.length; n > s && !(e < i[s].position); s++);
          i.splice(s, 0, { label: t, position: e });
        }
      }),
      (e.setLabels = function (t) {
        this._labels = t ? t : {};
      }),
      (e.getLabels = function () {
        var t = this._labelList;
        if (!t) {
          t = this._labelList = [];
          var e = this._labels;
          for (var i in e) t.push({ label: i, position: e[i] });
          t.sort(function (t, e) {
            return t.position - e.position;
          });
        }
        return t;
      }),
      (e.getCurrentLabel = function () {
        var t = this.getLabels(),
          e = this.position,
          i = t.length;
        if (i) {
          for (var s = 0; i > s && !(e < t[s].position); s++);
          return 0 == s ? null : t[s - 1].label;
        }
        return null;
      }),
      (e.gotoAndPlay = function (t) {
        this.setPaused(!1), this._goto(t);
      }),
      (e.gotoAndStop = function (t) {
        this.setPaused(!0), this._goto(t);
      }),
      (e.setPosition = function (t, e) {
        var i = this._calcPosition(t),
          s = !this.loop && t >= this.duration;
        if (i == this._prevPos) return s;
        (this._prevPosition = t), (this.position = this._prevPos = i);
        for (var n = 0, r = this._tweens.length; r > n; n++)
          if ((this._tweens[n].setPosition(i, e), i != this._prevPos))
            return !1;
        return s && this.setPaused(!0), this.dispatchEvent("change"), s;
      }),
      (e.setPaused = function (t) {
        (this._paused = !!t), createjs.Tween._register(this, !t);
      }),
      (e.updateDuration = function () {
        this.duration = 0;
        for (var t = 0, e = this._tweens.length; e > t; t++) {
          var i = this._tweens[t];
          i.duration > this.duration && (this.duration = i.duration);
        }
      }),
      (e.tick = function (t) {
        this.setPosition(this._prevPosition + t);
      }),
      (e.resolve = function (t) {
        var e = Number(t);
        return isNaN(e) && (e = this._labels[t]), e;
      }),
      (e.toString = function () {
        return "[Timeline]";
      }),
      (e.clone = function () {
        throw "Timeline can not be cloned.";
      }),
      (e._goto = function (t) {
        var e = this.resolve(t);
        null != e && this.setPosition(e);
      }),
      (e._calcPosition = function (t) {
        return 0 > t
          ? 0
          : t < this.duration
          ? t
          : this.loop
          ? t % this.duration
          : this.duration;
      }),
      (createjs.Timeline = createjs.promote(t, "EventDispatcher"));
  })(),
  (this.createjs = this.createjs || {}),
  (function () {
    "use strict";
    function t() {
      throw "Ease cannot be instantiated.";
    }
    (t.linear = function (t) {
      return t;
    }),
      (t.none = t.linear),
      (t.get = function (t) {
        return (
          -1 > t && (t = -1),
          t > 1 && (t = 1),
          function (e) {
            return 0 == t
              ? e
              : 0 > t
              ? e * (e * -t + 1 + t)
              : e * ((2 - e) * t + (1 - t));
          }
        );
      }),
      (t.getPowIn = function (t) {
        return function (e) {
          return Math.pow(e, t);
        };
      }),
      (t.getPowOut = function (t) {
        return function (e) {
          return 1 - Math.pow(1 - e, t);
        };
      }),
      (t.getPowInOut = function (t) {
        return function (e) {
          return (e *= 2) < 1
            ? 0.5 * Math.pow(e, t)
            : 1 - 0.5 * Math.abs(Math.pow(2 - e, t));
        };
      }),
      (t.quadIn = t.getPowIn(2)),
      (t.quadOut = t.getPowOut(2)),
      (t.quadInOut = t.getPowInOut(2)),
      (t.cubicIn = t.getPowIn(3)),
      (t.cubicOut = t.getPowOut(3)),
      (t.cubicInOut = t.getPowInOut(3)),
      (t.quartIn = t.getPowIn(4)),
      (t.quartOut = t.getPowOut(4)),
      (t.quartInOut = t.getPowInOut(4)),
      (t.quintIn = t.getPowIn(5)),
      (t.quintOut = t.getPowOut(5)),
      (t.quintInOut = t.getPowInOut(5)),
      (t.sineIn = function (t) {
        return 1 - Math.cos((t * Math.PI) / 2);
      }),
      (t.sineOut = function (t) {
        return Math.sin((t * Math.PI) / 2);
      }),
      (t.sineInOut = function (t) {
        return -0.5 * (Math.cos(Math.PI * t) - 1);
      }),
      (t.getBackIn = function (t) {
        return function (e) {
          return e * e * ((t + 1) * e - t);
        };
      }),
      (t.backIn = t.getBackIn(1.7)),
      (t.getBackOut = function (t) {
        return function (e) {
          return --e * e * ((t + 1) * e + t) + 1;
        };
      }),
      (t.backOut = t.getBackOut(1.7)),
      (t.getBackInOut = function (t) {
        return (
          (t *= 1.525),
          function (e) {
            return (e *= 2) < 1
              ? 0.5 * (e * e * ((t + 1) * e - t))
              : 0.5 * ((e -= 2) * e * ((t + 1) * e + t) + 2);
          }
        );
      }),
      (t.backInOut = t.getBackInOut(1.7)),
      (t.circIn = function (t) {
        return -(Math.sqrt(1 - t * t) - 1);
      }),
      (t.circOut = function (t) {
        return Math.sqrt(1 - --t * t);
      }),
      (t.circInOut = function (t) {
        return (t *= 2) < 1
          ? -0.5 * (Math.sqrt(1 - t * t) - 1)
          : 0.5 * (Math.sqrt(1 - (t -= 2) * t) + 1);
      }),
      (t.bounceIn = function (e) {
        return 1 - t.bounceOut(1 - e);
      }),
      (t.bounceOut = function (t) {
        return 1 / 2.75 > t
          ? 7.5625 * t * t
          : 2 / 2.75 > t
          ? 7.5625 * (t -= 1.5 / 2.75) * t + 0.75
          : 2.5 / 2.75 > t
          ? 7.5625 * (t -= 2.25 / 2.75) * t + 0.9375
          : 7.5625 * (t -= 2.625 / 2.75) * t + 0.984375;
      }),
      (t.bounceInOut = function (e) {
        return 0.5 > e
          ? 0.5 * t.bounceIn(2 * e)
          : 0.5 * t.bounceOut(2 * e - 1) + 0.5;
      }),
      (t.getElasticIn = function (t, e) {
        var i = 2 * Math.PI;
        return function (s) {
          if (0 == s || 1 == s) return s;
          var n = (e / i) * Math.asin(1 / t);
          return -(
            t *
            Math.pow(2, 10 * (s -= 1)) *
            Math.sin(((s - n) * i) / e)
          );
        };
      }),
      (t.elasticIn = t.getElasticIn(1, 0.3)),
      (t.getElasticOut = function (t, e) {
        var i = 2 * Math.PI;
        return function (s) {
          if (0 == s || 1 == s) return s;
          var n = (e / i) * Math.asin(1 / t);
          return t * Math.pow(2, -10 * s) * Math.sin(((s - n) * i) / e) + 1;
        };
      }),
      (t.elasticOut = t.getElasticOut(1, 0.3)),
      (t.getElasticInOut = function (t, e) {
        var i = 2 * Math.PI;
        return function (s) {
          var n = (e / i) * Math.asin(1 / t);
          return (s *= 2) < 1
            ? -0.5 *
                (t * Math.pow(2, 10 * (s -= 1)) * Math.sin(((s - n) * i) / e))
            : t *
                Math.pow(2, -10 * (s -= 1)) *
                Math.sin(((s - n) * i) / e) *
                0.5 +
                1;
        };
      }),
      (t.elasticInOut = t.getElasticInOut(1, 0.3 * 1.5)),
      (createjs.Ease = t);
  })(),
  (this.createjs = this.createjs || {}),
  (function () {
    "use strict";
    function t() {
      throw "MotionGuidePlugin cannot be instantiated.";
    }
    (t.priority = 0),
      t._rotOffS,
      t._rotOffE,
      t._rotNormS,
      t._rotNormE,
      (t.install = function () {
        return (
          createjs.Tween.installPlugin(t, ["guide", "x", "y", "rotation"]),
          createjs.Tween.IGNORE
        );
      }),
      (t.init = function (t, e, i) {
        var s = t.target;
        return (
          s.hasOwnProperty("x") || (s.x = 0),
          s.hasOwnProperty("y") || (s.y = 0),
          s.hasOwnProperty("rotation") || (s.rotation = 0),
          "rotation" == e && (t.__needsRot = !0),
          "guide" == e ? null : i
        );
      }),
      (t.step = function (e, i, s, n, r) {
        if (
          ("rotation" == i &&
            ((e.__rotGlobalS = s), (e.__rotGlobalE = n), t.testRotData(e, r)),
          "guide" != i)
        )
          return n;
        var a,
          o = n;
        o.hasOwnProperty("path") || (o.path = []);
        var h = o.path;
        if (
          (o.hasOwnProperty("end") || (o.end = 1),
          o.hasOwnProperty("start") ||
            (o.start =
              s && s.hasOwnProperty("end") && s.path === h ? s.end : 0),
          o.hasOwnProperty("_segments") && o._length)
        )
          return n;
        var c = h.length,
          l = 10;
        if (!(c >= 6 && (c - 2) % 4 == 0))
          throw "invalid 'path' data, please see documentation for valid paths";
        (o._segments = []), (o._length = 0);
        for (var u = 2; c > u; u += 4) {
          for (
            var d,
              _,
              p = h[u - 2],
              f = h[u - 1],
              m = h[u + 0],
              g = h[u + 1],
              v = h[u + 2],
              y = h[u + 3],
              b = p,
              w = f,
              x = 0,
              T = [],
              S = 1;
            l >= S;
            S++
          ) {
            var P = S / l,
              E = 1 - P;
            (d = E * E * p + 2 * E * P * m + P * P * v),
              (_ = E * E * f + 2 * E * P * g + P * P * y),
              (x +=
                T[T.push(Math.sqrt((a = d - b) * a + (a = _ - w) * a)) - 1]),
              (b = d),
              (w = _);
          }
          o._segments.push(x), o._segments.push(T), (o._length += x);
        }
        (a = o.orient), (o.orient = !0);
        var j = {};
        return (
          t.calc(o, o.start, j),
          (e.__rotPathS = Number(j.rotation.toFixed(5))),
          t.calc(o, o.end, j),
          (e.__rotPathE = Number(j.rotation.toFixed(5))),
          (o.orient = !1),
          t.calc(o, o.end, r),
          (o.orient = a),
          o.orient ? ((e.__guideData = o), t.testRotData(e, r), n) : n
        );
      }),
      (t.testRotData = function (t, e) {
        if (void 0 === t.__rotGlobalS || void 0 === t.__rotGlobalE) {
          if (t.__needsRot) return;
          void 0 !== t._curQueueProps.rotation
            ? (t.__rotGlobalS = t.__rotGlobalE = t._curQueueProps.rotation)
            : (t.__rotGlobalS =
                t.__rotGlobalE =
                e.rotation =
                  t.target.rotation || 0);
        }
        if (void 0 !== t.__guideData) {
          var i = t.__guideData,
            s = t.__rotGlobalE - t.__rotGlobalS,
            n = t.__rotPathE - t.__rotPathS,
            r = s - n;
          if ("auto" == i.orient) r > 180 ? (r -= 360) : -180 > r && (r += 360);
          else if ("cw" == i.orient) {
            for (; 0 > r; ) r += 360;
            0 == r && s > 0 && 180 != s && (r += 360);
          } else if ("ccw" == i.orient) {
            for (r = s - (n > 180 ? 360 - n : n); r > 0; ) r -= 360;
            0 == r && 0 > s && -180 != s && (r -= 360);
          }
          (i.rotDelta = r),
            (i.rotOffS = t.__rotGlobalS - t.__rotPathS),
            (t.__rotGlobalS =
              t.__rotGlobalE =
              t.__guideData =
              t.__needsRot =
                void 0);
        }
      }),
      (t.tween = function (e, i, s, n, r, a, o, h) {
        var c = r.guide;
        if (void 0 == c || c === n.guide) return s;
        if (c.lastRatio != a) {
          var l = (c.end - c.start) * (o ? c.end : a) + c.start;
          switch ((t.calc(c, l, e.target), c.orient)) {
            case "cw":
            case "ccw":
            case "auto":
              e.target.rotation += c.rotOffS + c.rotDelta * a;
              break;
            case "fixed":
            default:
              e.target.rotation += c.rotOffS;
          }
          c.lastRatio = a;
        }
        return "rotation" != i || (c.orient && "false" != c.orient)
          ? e.target[i]
          : s;
      }),
      (t.calc = function (t, e, i) {
        if (void 0 == t._segments)
          throw "Missing critical pre-calculated information, please file a bug";
        void 0 == i && (i = { x: 0, y: 0, rotation: 0 });
        for (
          var s = t._segments,
            n = t.path,
            r = t._length * e,
            a = s.length - 2,
            o = 0;
          r > s[o] && a > o;

        )
          (r -= s[o]), (o += 2);
        var h = s[o + 1],
          c = 0;
        for (a = h.length - 1; r > h[c] && a > c; ) (r -= h[c]), c++;
        var l = c / ++a + r / (a * h[c]);
        o = 2 * o + 2;
        var u = 1 - l;
        return (
          (i.x = u * u * n[o - 2] + 2 * u * l * n[o + 0] + l * l * n[o + 2]),
          (i.y = u * u * n[o - 1] + 2 * u * l * n[o + 1] + l * l * n[o + 3]),
          t.orient &&
            (i.rotation =
              57.2957795 *
              Math.atan2(
                (n[o + 1] - n[o - 1]) * u + (n[o + 3] - n[o + 1]) * l,
                (n[o + 0] - n[o - 2]) * u + (n[o + 2] - n[o + 0]) * l
              )),
          i
        );
      }),
      (createjs.MotionGuidePlugin = t);
  })(),
  (this.createjs = this.createjs || {}),
  (function () {
    "use strict";
    var t = (createjs.TweenJS = createjs.TweenJS || {});
    (t.version = "0.6.2"), (t.buildDate = "Thu, 26 Nov 2015 20:44:31 GMT");
  })();
var TWO_PI = 2 * Math.PI,
  images = [],
  imageIndex = 0,
  clicks = 0,
  image,
  imageDepth = getRandomWallDepth(),
  imageWidth = window.innerWidth,
  imageHeight = window.innerHeight,
  raycaster = new THREE.Raycaster(),
  cameraStart = 3.5 * imageHeight,
  CADANCE = 5,
  zooming = !1,
  box,
  boxes = [],
  camera,
  scene,
  renderer,
  group,
  targetRotation = 0,
  targetRotationOnMouseDown = 0,
  mouse = {},
  mouseXOnMouseDown = 0,
  windowHalfX = imageWidth / 2,
  cursor = 0,
  color = getColor(null),
  vertices = [],
  indices = [],
  fragments = [],
  container = document.getElementById("container"),
  clickPosition = [0.5 * imageWidth, 0.5 * imageHeight],
  cameraTimeline = new TimelineMax();
init(),
  animate(),
  triangulate(),
  shatter(),
  (Fragment = function (t, e, i) {
    (this.v0 = t),
      (this.v1 = e),
      (this.v2 = i),
      this.computeBoundingBox(),
      this.computeCentroid(),
      this.createCanvas(),
      this.clip();
  }),
  (Fragment.prototype = {
    computeBoundingBox: function () {
      var t = Math.min(this.v0[0], this.v1[0], this.v2[0]),
        e = Math.max(this.v0[0], this.v1[0], this.v2[0]),
        i = Math.min(this.v0[1], this.v1[1], this.v2[1]),
        s = Math.max(this.v0[1], this.v1[1], this.v2[1]);
      this.box = { x: t, y: i, w: e - t, h: s - i };
    },
    computeCentroid: function () {
      var t = (this.v0[0] + this.v1[0] + this.v2[0]) / 3,
        e = (this.v0[1] + this.v1[1] + this.v2[1]) / 3;
      this.centroid = [t, e];
    },
    createCanvas: function () {
      (this.canvas = document.createElement("canvas")),
        (this.canvas.width = this.box.w),
        (this.canvas.height = this.box.h),
        (this.canvas.style.width = this.box.w + "px"),
        (this.canvas.style.height = this.box.h + "px"),
        (this.canvas.style.left = this.box.x + "px"),
        (this.canvas.style.top = this.box.y + "px"),
        (this.ctx = this.canvas.getContext("2d"));
    },
    clip: function () {
      this.ctx.translate(-this.box.x, -this.box.y),
        this.ctx.beginPath(),
        this.ctx.moveTo(this.v0[0], this.v0[1]),
        this.ctx.lineTo(this.v1[0], this.v1[1]),
        this.ctx.lineTo(this.v2[0], this.v2[1]),
        this.ctx.closePath(),
        this.ctx.clip(),
        this.ctx.drawImage(image, 0, 0);
    },
  });
