(function() {
    function ha() {
        return function() {}
    }

    function ja(Y) {
        return function(Z) {
            this[Y] = Z
        }
    }

    function Fa(Y) {
        return function() {
            return this[Y]
        }
    }

    function La(Y) {
        return function() {
            return Y
        }
    }
    (function() {
        var Y = function() {
                var b;
                (function() {
                    var c = !1,
                        e = /var xyz/.test(ha()) ? /\b_super\b/ : /.*/;
                    b = ha();
                    b.extend = function(a) {
                        function f() {
                            !c && this.init && this.init.apply(this, arguments)
                        }
                        var b = this.prototype;
                        c = !0;
                        var g = new this;
                        c = !1;
                        for (var h in a) g[h] = "function" == typeof a[h] && "function" == typeof b[h] && e.test(a[h]) ? function(a, c) {
                            return function() {
                                var f = this.p;
                                this.p = b[a];
                                var e = c.apply(this, arguments);
                                this.p = f;
                                return e
                            }
                        }(h, a[h]) : a[h];
                        f.prototype = g;
                        f.extend = arguments.callee;
                        return f
                    }
                })();
                return b
            }(),
            Z =
            function() {
                function b(c, b, a, f) {
                    this.H = c;
                    this.J = b;
                    this.I = a;
                    this.G = f
                }
                b.prototype.qj = function() {
                    return "rgba(" + (255 * this.H >> 0) + "," + (255 * this.J >> 0) + "," + (255 * this.I >> 0) + "," + this.G.toFixed(2) + ")"
                };
                b.prototype.Lk = function(c) {
                    return this.H === c.H && this.J === c.J && this.I === c.I && this.G === c.G
                };
                b.prototype.copy = function() {
                    return new b(this.H, this.J, this.I, this.G)
                };
                b.prototype.qa = function(c) {
                    this.H = c.H;
                    this.J = c.J;
                    this.I = c.I;
                    this.G = c.G
                };
                b.prototype.add = function(c) {
                    this.H += c.H;
                    this.J += c.J;
                    this.I += c.I;
                    this.G += c.G
                };
                b.prototype.multiply =
                    function(c) {
                        this.H *= c;
                        this.J *= c;
                        this.I *= c;
                        this.G *= c
                    };
                b.Mb = new b(0, 0, 0, 0);
                b.pb = new b(1, 1, 1, 1);
                b.red = new b(1, 0, 0, 1);
                b.blue = new b(0, 0, 1, 1);
                b.green = new b(0, 1, 0, 1);
                b.bE = new b(0, 0, 0, 1);
                b.Cw = b.pb;
                b.Vl = {
                    rk: "rgba(255,255,255,1)",
                    XD: "rgba(0,0,0,0)"
                };
                return b
            }(),
            Q = function() {
                return {
                    h: 0,
                    rb: 1,
                    $b: 2,
                    ah: 4,
                    Qb: 8,
                    eh: 16,
                    Mg: 32,
                    T: 18,
                    parse: function(b) {
                        var c = this.h;
                        0 < b.indexOf("LEFT") ? c = this.rb : 0 < b.indexOf("HCENTER") || "CENTER" === b ? c = this.$b : 0 < b.indexOf("RIGHT") && (c = this.ah);
                        0 < b.indexOf("TOP") ? c |= this.Qb : 0 < b.indexOf("VCENTER") ||
                            "CENTER" === b ? c |= this.eh : 0 < b.indexOf("BOTTOM") && (c |= this.Mg);
                        return c
                    }
                }
            }(),
            O = function() {
                function b(c, b) {
                    this.x = c;
                    this.y = b
                }
                b.prototype.add = function(c) {
                    this.x += c.x;
                    this.y += c.y
                };
                b.prototype.eb = function(c) {
                    this.x -= c.x;
                    this.y -= c.y
                };
                b.prototype.multiply = function(c) {
                    this.x *= c;
                    this.y *= c
                };
                b.prototype.Lo = function(c) {
                    this.x /= c;
                    this.y /= c
                };
                b.prototype.Ja = function(c) {
                    var b = this.x - c.x;
                    c = this.y - c.y;
                    return Math.sqrt(b * b + c * c)
                };
                b.prototype.Oc = function() {
                    return Math.sqrt(this.x * this.x + this.y * this.y)
                };
                b.prototype.pp = function() {
                    return 0 ===
                        this.x && 0 === this.y
                };
                b.prototype.Lk = function(c) {
                    return this.x === c.x && this.y === c.y
                };
                b.prototype.normalize = function() {
                    this.multiply(1 / this.Oc())
                };
                b.prototype.b = function() {
                    return Math.atan(this.y / this.x)
                };
                b.prototype.Eh = function() {
                    return Math.atan2(this.y, this.x)
                };
                b.prototype.copy = function() {
                    return new b(this.x, this.y)
                };
                b.prototype.qa = function(c) {
                    this.x = c.x;
                    this.y = c.y
                };
                b.prototype.round = function() {
                    this.x = Math.round(this.x);
                    this.y = Math.round(this.y)
                };
                b.prototype.rotate = function(c) {
                    var b = Math.cos(c);
                    c =
                        Math.sin(c);
                    var a = this.x * c + this.y * b;
                    this.x = this.x * b - this.y * c;
                    this.y = a
                };
                b.prototype.pa = function(c, b, a) {
                    this.x -= b;
                    this.y -= a;
                    this.rotate(c);
                    this.x += b;
                    this.y += a
                };
                b.prototype.toString = function() {
                    return "[" + this.x + ", " + this.y + "]"
                };
                b.Ta = function() {
                    return new b(0, 0)
                };
                b.uF = new b(0, 0);
                b.Yi = function() {
                    return new b(2147483647, 2147483647)
                };
                b.DC = b.Yi();
                b.add = function(c, e) {
                    return new b(c.x + e.x, c.y + e.y)
                };
                b.eb = function(c, e) {
                    return new b(c.x - e.x, c.y - e.y)
                };
                b.multiply = function(c, e) {
                    return new b(c.x * e, c.y * e)
                };
                b.Lo = function(c,
                    e) {
                    return new b(c.x / e, c.y / e)
                };
                b.Ja = function(c, b, a, f) {
                    c -= a;
                    b -= f;
                    return Math.sqrt(c * c + b * b)
                };
                b.Uu = function(c) {
                    return new b(-c.y, c.x)
                };
                b.aB = function(c) {
                    return new b(c.y, -c.x)
                };
                b.normalize = function(c) {
                    return this.multiply(c, 1 / c.Oc())
                };
                b.OE = function(c) {
                    return new b(-c.x, -c.y)
                };
                b.Lx = Array(64);
                b.Mx = Array(64);
                b.ky = function(c, e) {
                    var a = new b(0, 0);
                    b.zv(c, e, a);
                    return a
                };
                b.zv = function(c, e, a) {
                    var f = c.length;
                    if (1 >= f) a.x = a.y = 0;
                    else {
                        for (var d = b.Lx, g = b.Mx, h = 1 - e, l = 0; l < f; l++) {
                            var n = c[l];
                            d[l] = n.x;
                            g[l] = n.y
                        }
                        for (c = f - 1; 0 <
                            c; f--, c--)
                            for (l = 0, n = 1; l < c; l++, n++) d[l] = d[l] * h + d[n] * e, g[l] = g[l] * h + g[n] * e;
                        a.x = d[0];
                        a.y = g[0]
                    }
                };
                b.Vy = function(c) {
                    return new b(Math.cos(c), Math.sin(c))
                };
                return b
            }(),
            K = {
                fd: 5,
                km: 0.15,
                h: -1,
                Ng: 1E-6,
                sk: 1,
                ix: 80,
                UC: 0.15,
                JD: 10,
                Kj: -2,
                Yg: 2147483647
            },
            aa = function(b) {
                return {
                    jb: function(c) {
                        this.sj(document.getElementById(c))
                    },
                    sj: function(c) {
                        this.element = this.id = c;
                        this.context = this.element.getContext("2d");
                        this.$B(b.Cw)
                    },
                    $B: function(c) {
                        c = c.qj();
                        this.context.fillStyle = c;
                        this.context.strokeStyle = c
                    },
                    oF: function(c) {
                        this.context.fillStyle =
                            c;
                        this.context.strokeStyle = c
                    },
                    Uy: function(c, b) {
                        var a = this.context,
                            f = c[0];
                        a.fillStyle = b;
                        a.beginPath();
                        a.moveTo(f.x, f.y);
                        for (var d = 1, g = c.length; d < g; d += 2) f = c[d], a.lineTo(f.x, f.y);
                        for (d = c.length - 2; 0 <= d; d -= 2) f = c[d], a.lineTo(f.x, f.y);
                        a.fill()
                    }
                }
            }(Z),
            wa = {
                jk: "ACTION_SET_VISIBLE",
                nn: "ACTION_SET_TOUCHABLE",
                pn: "ACTION_SET_UPDATEABLE",
                ik: "ACTION_SET_DRAWQUAD",
                an: "ACTION_PLAY_TIMELINE",
                bs: "ACTION_PAUSE_TIMELINE",
                vx: "ACTION_STOP_TIMELINE",
                Tw: "ACTION_JUMP_TO_TIMELINE_FRAME"
            },
            Ma = function() {
                function b(c, a, f) {
                    this.ht =
                        c;
                    this.it = a;
                    this.ii = f
                }

                function c(c, a) {
                    this.Ox = c;
                    this.data = a
                }
                c.create = function(e, a, f, d) {
                    return new c(e, new b(a, f, d))
                };
                return c
            }(),
            Na = {
                te: 0,
                Ef: 1,
                Df: 2,
                kf: 3,
                Kd: 4,
                ZC: 5
            },
            qa = function(b, c, e, a) {
                function f() {
                    this.a = b.Ta();
                    this.scale = b.Ta();
                    this.Va = 0;
                    this.color = c.pb.copy();
                    this.Gf = []
                }

                function d(a, c, f, b) {
                    this.Yc = a;
                    this.Bj = c;
                    this.Rh = f;
                    this.value = b
                }
                f.prototype.copy = function() {
                    var a = new f;
                    a.a = this.a.copy();
                    a.scale = this.scale.copy();
                    a.Va = this.Va;
                    a.color = this.color.copy();
                    a.Gf = this.Gf.slice(0);
                    return a
                };
                d.prototype.copy =
                    function() {
                        return new d(this.Yc, this.Bj, this.Rh, this.value.copy())
                    };
                d.F = {
                    LINEAR: 0,
                    ID: 1,
                    Ld: 2,
                    Ob: 3
                };
                d.Ap = function() {
                    return new d(0, a.te, d.F.LINEAR, new f)
                };
                d.Ra = function(c, b, l, e) {
                    var r = new f;
                    r.a.x = c;
                    r.a.y = b;
                    return new d(e, a.te, l, r)
                };
                d.gl = function(c, b, l, e) {
                    var r = new f;
                    r.scale.x = c;
                    r.scale.y = b;
                    return new d(e, a.Ef, l, r)
                };
                d.Se = function(c, b, l) {
                    var e = new f;
                    e.Va = c;
                    return new d(l, a.Df, b, e)
                };
                d.za = function(c, b, l) {
                    var e = new f;
                    e.color = c;
                    return new d(l, a.kf, b, e)
                };
                d.Vi = function(c, b) {
                    var e = new f;
                    e.Gf = c;
                    return new d(b,
                        a.Kd, d.F.LINEAR, e)
                };
                d.gA = function(c, b) {
                    var l = new f,
                        n = e.create(c, b, 0, 0);
                    l.Gf = [n];
                    return new d(0.04, a.Kd, d.F.LINEAR, l)
                };
                return d
            }(O, Z, Ma, Na),
            vb = function(b, c, e, a) {
                return b.extend({
                    init: function(b, d) {
                        this.type = d;
                        this.state = 0;
                        this.zl = !1;
                        this.Ie = this.startTime = 0;
                        this.ja = [];
                        this.zb = b;
                        this.ca = a.h;
                        this.Ce = c.Ap();
                        this.si = c.Ap();
                        this.Ai = c.Ap();
                        this.ob = this.Fa = 0;
                        d === e.Kd && (this.Nx = [])
                    },
                    pd: function() {
                        this.state = 0
                    },
                    D: function(a) {
                        this.Il(a, this.ja.length)
                    },
                    Il: function(a, c) {
                        this.ja[c] = a;
                        this.type === e.Kd && this.Nx.push(a.value.Gf)
                    },
                    Vo: function(a) {
                        for (var c = 0, b = 0; b <= a; b++) c += this.ja[b].Yc;
                        return c
                    },
                    MC: function() {
                        this.startTime = this.Vo(0);
                        this.Ie = this.Vo(this.ja.length - 1)
                    },
                    sw: function(c) {
                        0 === this.state ? this.zb.Gd ? this.zb.time + c < this.startTime || this.zb.time > this.Ie || (1 < this.ja.length ? (this.state = 1, this.ca = this.ja.length - 1, this.ob = this.Ie - this.zb.time, this.ca--, this.xh(this.ja[this.ca + 1], this.ja[this.ca].Yc)) : this.xh(this.ja[0], 0)) : this.zb.time - c > this.Ie || this.zb.time < this.startTime || (1 < this.ja.length ? (this.state = 1, this.ca = 0, this.ob =
                            this.zb.time - this.startTime, this.ca++, this.xh(this.ja[this.ca - 1], this.ja[this.ca].Yc)) : this.xh(this.ja[0], 0)) : (this.Fa -= c, this.Fa <= a.Ng && (this.zb.Zi && this.zb.Zi(this.zb, this.ja[this.ca], this.ca), this.ob = -this.Fa, this.ca === this.ja.length - 1 ? (this.Lh(this.ja[this.ca]), this.state = 0) : 0 === this.ca ? (this.Lh(this.ja[this.ca]), this.state = 0) : this.zb.Gd ? (this.ca--, c = this.ja[this.ca + 1], this.xh(c, c.Yc)) : (this.ca++, this.xh(this.ja[this.ca - 1], this.ja[this.ca].Yc))))
                    },
                    ww: function(b) {
                        var d = this.zb,
                            g;
                        if (0 === this.state) d.time >=
                            this.startTime && d.time <= this.Ie && (this.state = 1, d.Gd ? (this.ca = this.ja.length - 1, this.ob = this.Ie - d.time, this.ca--, g = this.ja[this.ca + 1], this.Vk(g, this.ja[this.ca], g.Yc)) : (this.ca = 0, this.ob = d.time - this.startTime, this.ca++, g = this.ja[this.ca], this.Vk(this.ja[this.ca - 1], g, g.Yc)));
                        else {
                            this.Fa -= b;
                            g = this.ja[this.ca];
                            if (g.Rh === c.F.Ld || g.Rh === c.F.Ob) switch (this.type) {
                                case e.te:
                                    var h = this.si.value.a;
                                    g = h.x * b;
                                    var h = h.y * b,
                                        l = this.Ce.value.a,
                                        n = l.x,
                                        r = l.y;
                                    l.x += g;
                                    l.y += h;
                                    d.element.x += (n + g / 2) * b;
                                    d.element.y += (r + h / 2) * b;
                                    break;
                                case e.Ef:
                                    h = this.si.value.scale;
                                    g = h.x * b;
                                    h = h.y * b;
                                    l = this.Ce.value.scale;
                                    n = l.x;
                                    r = l.y;
                                    l.x += g;
                                    l.y += h;
                                    d.element.Y += (n + g / 2) * b;
                                    d.element.da += (r + h / 2) * b;
                                    break;
                                case e.Df:
                                    g = this.si.value.Va * b;
                                    h = this.Ce.value.Va;
                                    this.Ce.value.Va += g;
                                    d.element.rotation += (h + g / 2) * b;
                                    break;
                                case e.kf:
                                    var m = this.Ce.value.color;
                                    g = m.H;
                                    var h = m.J,
                                        l = m.I,
                                        n = m.G,
                                        p = this.si.value.color,
                                        r = p.H * b,
                                        C = p.J * b,
                                        x = p.I * b,
                                        p = p.G * b;
                                    m.H += 2 * r;
                                    m.J += 2 * C;
                                    m.I += 2 * x;
                                    m.G += 2 * p;
                                    m = d.element.color;
                                    m.H += (g + r / 2) * b;
                                    m.J += (h + C / 2) * b;
                                    m.I += (l + x / 2) * b;
                                    m.G += (n + p / 2) * b
                            } else if (g.Rh ===
                                c.F.LINEAR) switch (g = d.element, h = this.Ce.value, this.type) {
                                case e.te:
                                    g.x += h.a.x * b;
                                    g.y += h.a.y * b;
                                    break;
                                case e.Ef:
                                    g.Y += h.scale.x * b;
                                    g.da += h.scale.y * b;
                                    break;
                                case e.Df:
                                    g.Va += h.Va * b;
                                    break;
                                case e.kf:
                                    g.color.H += h.color.H * b, g.color.J += h.color.J * b, g.color.I += h.color.I * b, g.color.G += h.color.G * b
                            }
                            this.Fa <= a.Ng && (d.Zi && d.Zi(d, this.ja[this.ca], this.ca), this.ob = -this.Fa, this.ca === this.ja.length - 1 ? (this.Lh(this.ja[this.ca]), this.state = 0) : 0 === this.ca ? (this.Lh(this.ja[this.ca]), this.state = 0) : d.Gd ? (this.ca--, g = this.ja[this.ca +
                                1], this.Vk(g, this.ja[this.ca], g.Yc)) : (this.ca++, g = this.ja[this.ca], this.Vk(this.ja[this.ca - 1], g, g.Yc)))
                        }
                    },
                    xh: function(a, c) {
                        this.Fa = c;
                        this.Lh(a);
                        0 < this.ob && (this.sw(this.ob), this.ob = 0)
                    },
                    Lh: function(a) {
                        switch (this.type) {
                            case e.te:
                                var c = this.zb.element;
                                a = a.value.a;
                                if (this.zl) {
                                    var b = this.Ai.value.a;
                                    c.x = b.x + a.x;
                                    c.y = b.y + a.y
                                } else c.x = a.x, c.y = a.y;
                                break;
                            case e.Ef:
                                a = a.value.scale;
                                c = this.zb.element;
                                this.zl ? (b = this.Ai.value.scale, c.Y = b.x + a.x, c.da = b.y + a.y) : (c.Y = a.x, c.da = a.y);
                                break;
                            case e.Df:
                                this.zb.element.rotation =
                                    this.zl ? this.Ai.value.Va + a.value.Va : a.value.Va;
                                break;
                            case e.kf:
                                c = this.zb.element.color;
                                a = a.value.color;
                                this.zl ? (b = this.Ai.value.color, c.H = b.H + a.H, c.J = b.J + a.J, c.I = b.I + a.I, c.G = b.G + a.G) : c.qa(a);
                                break;
                            case e.Kd:
                                for (c = a.value.Gf, a = 0, b = c.length; a < b; a++) {
                                    var h = c[a];
                                    h.Ox.du(h.data)
                                }
                        }
                    },
                    LB: function(a) {
                        a = a.value;
                        var c = this.zb.element;
                        switch (this.type) {
                            case e.te:
                                a.a.x = c.x;
                                a.a.y = c.y;
                                break;
                            case e.Ef:
                                a.scale.x = c.Y;
                                a.scale.y = c.da;
                                break;
                            case e.Df:
                                a.Va = c.rotation;
                                break;
                            case e.kf:
                                a.color.qa(c.color)
                        }
                    },
                    Vk: function(a,
                        b, g) {
                        this.Fa = g;
                        this.LB(this.Ai);
                        this.Lh(a);
                        g = this.Ce.value;
                        var h = this.si.value;
                        switch (this.type) {
                            case e.te:
                                var l = g.a,
                                    n = b.value.a;
                                a = a.value.a;
                                l.x = (n.x - a.x) / this.Fa;
                                l.y = (n.y - a.y) / this.Fa;
                                break;
                            case e.Ef:
                                l = g.scale;
                                n = b.value.scale;
                                a = a.value.scale;
                                l.x = (n.x - a.x) / this.Fa;
                                l.y = (n.y - a.y) / this.Fa;
                                break;
                            case e.Df:
                                g.Va = (b.value.Va - a.value.Va) / this.Fa;
                                break;
                            case e.kf:
                                l = g.color, n = b.value.color, a = a.value.color, l.H = (n.H - a.H) / this.Fa, l.J = (n.J - a.J) / this.Fa, l.I = (n.I - a.I) / this.Fa, l.G = (n.G - a.G) / this.Fa
                        }
                        a = b.Rh === c.F.Ld;
                        b = b.Rh == c.F.Ob;
                        if (a || b) switch (this.type) {
                            case e.te:
                                l = g.a;
                                b = h.a;
                                l.multiply(2);
                                b.x = l.x / this.Fa;
                                b.y = l.y / this.Fa;
                                a ? (l.x = 0, l.y = 0) : b.multiply(-1);
                                break;
                            case e.Ef:
                                l = g.scale;
                                b = h.scale;
                                l.multiply(2);
                                b.x = l.x / this.Fa;
                                b.y = l.y / this.Fa;
                                a ? (l.x = 0, l.y = 0) : b.multiply(-1);
                                break;
                            case e.Df:
                                g.Va *= 2;
                                h.Va = g.Va / this.Fa;
                                a ? g.Va = 0 : h.Va *= -1;
                                break;
                            case e.kf:
                                l = g.color, b = h.color, l.multiply(2), b.H = l.H / this.Fa, b.J = l.J / this.Fa, b.I = l.I / this.Fa, b.G = l.G / this.Fa, a ? l.multiply(0) : b.multiply(-1)
                        }
                        0 < this.ob && (this.ww(this.ob), this.ob = 0)
                    }
                })
            }(Y,
                qa, Na, K),
            la = function(b, c, e, a) {
                var f = b.extend({
                    init: function() {
                        this.length = this.time = 0;
                        this.mg = a.h;
                        this.state = f.Z.fi;
                        this.fl = f.ga.$a;
                        this.Zc = [];
                        this.Zi = this.cb = null;
                        this.Gd = !1;
                        this.element = null
                    },
                    D: function(a) {
                        var c = this.Zc[a.Bj];
                        this.Il(a, null == c ? 0 : c.ja.length)
                    },
                    Il: function(a, b) {
                        var f = this.Zc[a.Bj];
                        f || (this.Zc[a.Bj] = f = new c(this, a.Bj));
                        f.Il(a, b)
                    },
                    au: function(a) {
                        return this.Zc[a]
                    },
                    play: function() {
                        if (this.state !== f.Z.ei) {
                            this.time = 0;
                            this.Gd = !1;
                            for (var a = this.length = 0, c = this.Zc.length; a < c; a++) {
                                var b =
                                    this.Zc[a];
                                b && (b.MC(), b.Ie > this.length && (this.length = b.Ie))
                            }
                        }
                        this.state = f.Z.ds;
                        this.update(0)
                    },
                    pause: function() {
                        this.state = f.Z.ei
                    },
                    mu: function(a, c) {
                        this.state === f.Z.fi && (this.state = f.Z.ei);
                        this.update(this.Zc[a].Vo(c) - this.time)
                    },
                    stop: function() {
                        this.state = f.Z.fi;
                        this.vy()
                    },
                    vy: function() {
                        for (var a = 0, c = this.Zc.length; a < c; a++) {
                            var b = this.Zc[a];
                            b && b.pd()
                        }
                    },
                    update: function(c) {
                        if (this.state === f.Z.ds) {
                            this.time = this.Gd ? this.time - c : this.time + c;
                            for (var b = 0, h = this.Zc.length; b < h; b++) {
                                var l = this.Zc[b];
                                null !=
                                    l && (l.type === e.Kd ? l.sw(c) : l.ww(c))
                            }
                            switch (this.fl) {
                                case f.ga.cs:
                                    !1 === this.Gd && this.time >= this.length - a.Ng ? (this.time = Math.max(0, this.length - (this.time - this.length)), this.Gd = !0) : this.Gd && this.time <= a.Ng && (0 < this.mg && (this.mg--, 0 === this.mg && (this.stop(), this.cb && this.cb(this))), this.time = Math.min(-this.time, this.length), this.Gd = !1);
                                    break;
                                case f.ga.Cb:
                                    this.time >= this.length - a.Ng && (0 < this.mg && (this.mg--, 0 === this.mg && (this.stop(), this.cb && this.cb(this))), this.time = Math.min(this.time - this.length, this.length));
                                    break;
                                case f.ga.$a:
                                    this.time >= this.length - a.Ng && (this.stop(), this.cb && this.cb(this))
                            }
                        }
                    }
                });
                f.ga = {
                    $a: 0,
                    Cb: 1,
                    cs: 2
                };
                f.Z = {
                    fi: 0,
                    ds: 1,
                    ei: 2
                };
                return f
            }(Y, vb, Na, K),
            ia = function() {
                return {
                    kE: 6.283185307179586,
                    bc: function(b) {
                        return 0.017453292519943295 * b
                    },
                    Qh: function(b) {
                        return 57.29577951308232 * b
                    }
                }
            }(),
            da = function(b, c, e, a, f, d, g, h) {
                return b.extend({
                    init: function() {
                        this.parent = null;
                        this.Dj = this.fc = this.visible = !0;
                        this.name = null;
                        this.Kh = this.fe = this.rotation = this.height = this.width = this.fa = this.ea = this.y = this.x = 0;
                        this.da =
                            this.Y = 1;
                        this.color = c.pb.copy();
                        this.pw = this.ow = 0;
                        this.anchor = e.Qb | e.rb;
                        this.oa = e.h;
                        this.ej = this.Xe = !0;
                        this.pl = !1;
                        this.children = [];
                        this.ff = [];
                        this.nh = a.h;
                        this.wb = null
                    },
                    mi: function() {
                        var a = this.oa,
                            c = this.parent,
                            b = this.anchor;
                        a !== e.h ? (a & e.rb ? this.ea = c.ea + this.x : a & e.$b ? this.ea = c.ea + this.x + c.width / 2 : a & e.ah && (this.ea = c.ea + this.x + c.width), a & e.Qb ? this.fa = c.fa + this.y : a & e.eh ? this.fa = c.fa + this.y + c.height / 2 : a & e.Mg && (this.fa = c.fa + this.y + c.height)) : (this.ea = this.x, this.fa = this.y);
                        b & e.Qb || (b & e.eh ? this.fa -= this.height /
                            2 : b & e.Mg && (this.fa -= this.height));
                        b & e.rb || (b & e.$b ? this.ea -= this.width / 2 : b & e.ah && (this.ea -= this.width))
                    },
                    Cc: function() {
                        this.mi();
                        var a = 0 !== this.Y && 0 !== this.da && (1 !== this.Y || 1 !== this.da),
                            c = 0 !== this.rotation,
                            b = 0 !== this.ow || 0 !== this.pw,
                            d = f.context;
                        d.save();
                        if (a || c) {
                            var e = this.ea + this.width / 2 + this.fe,
                                g = this.fa + this.height / 2 + this.Kh,
                                x = 0 !== e || 0 !== g;
                            x && d.translate(e, g);
                            c && d.rotate(h.bc(this.rotation));
                            a && d.scale(this.Y, this.da);
                            x && d.translate(-e, -g)
                        }
                        b && d.translate(this.ow, this.pw);
                        this.vl = d.globalAlpha;
                        1 !==
                            this.color.G && this.color.G !== this.vl && (d.globalAlpha = this.color.G)
                    },
                    B: function() {
                        this.Cc();
                        this.Bc()
                    },
                    qh: function() {
                        var a = f.context;
                        a.strokeStyle = "red";
                        a.strokeRect(this.ea, this.fa, this.width, this.height)
                    },
                    Bc: function() {
                        var a = f.context,
                            c = 1 !== this.color.G && this.color.G !== this.vl;
                        if (this.oE) {
                            var b = this.ea + (this.width >> 1) + this.fe,
                                d = this.fa + (this.height >> 1) + this.Kh;
                            a.save();
                            a.lineWidth = 5;
                            a.strokeStyle = "#ff0000";
                            a.beginPath();
                            a.moveTo(b, d);
                            a.lineTo(b, d - 100);
                            a.closePath();
                            a.stroke();
                            a.restore()
                        }
                        this.Xe ?
                            !this.ej && c && (f.context.globalAlpha = this.vl) : (this.iu && this.qh(), a.restore(), this.ej && c && (f.context.globalAlpha = this.color.G));
                        for (var b = this.children, d = b.length, e = 0; e < d; e++) {
                            var g = b[e];
                            g.visible && g.B()
                        }
                        this.Xe ? (this.iu && this.qh(), a.restore()) : this.ej && c && (f.context.globalAlpha = this.vl)
                    },
                    update: function(a) {
                        for (var c = this.children, b = c.length, f = 0; f < b; f++) {
                            var d = c[f];
                            d.Dj && d.update(a)
                        }
                        this.wb && this.wb.update(a)
                    },
                    ez: function(a) {
                        for (var c = this.children, b = c.length, f = 0; f < b; f++) {
                            var d = c[f];
                            if (d.name === a) return d;
                            d = d.ez(a);
                            if (null !== d) return d
                        }
                        return null
                    },
                    nF: function() {
                        this.mi();
                        for (var a = this.ea, c = this.fa, b = this.ea + this.width, f = this.fa + this.height, d = this.children, e = d.length, g = 0; g < e; g++) {
                            var h = d[g];
                            h.mi();
                            h.ea < a && (a = h.ea);
                            h.fa < c && (c = h.fa);
                            var s = h.ea + h.width,
                                h = h.fa + h.height;
                            s > b && (b = s);
                            h > f && (f = h)
                        }
                        this.width = b - a;
                        this.height = f - c
                    },
                    du: function(a) {
                        switch (a.ht) {
                            case d.jk:
                                this.visible = 0 !== a.ii;
                                break;
                            case d.pn:
                                this.Dj = 0 !== a.ii;
                                break;
                            case d.nn:
                                this.fc = 0 !== a.ii;
                                break;
                            case d.an:
                                this.S(a.ii);
                                break;
                            case d.bs:
                                this.TA();
                                break;
                            case d.vx:
                                this.Xv();
                                break;
                            case d.Tw:
                                this.wb.mu(a.it, a.ii);
                                break;
                            default:
                                return !1
                        }
                        return !0
                    },
                    U: function(a) {
                        this.children.push(a);
                        a.parent = this;
                        return this.children.length - 1
                    },
                    ve: function(a, c) {
                        this.children[c] = a;
                        a.parent = this
                    },
                    lv: function(a) {
                        this.children.splice(a, 1).parent = null
                    },
                    kv: function() {
                        this.children = []
                    },
                    removeChild: function(a) {
                        for (var c = this.children, b = c.length, f = 0; f < b; f++)
                            if (a === c[f]) {
                                this.lv(f);
                                break
                            }
                    },
                    kb: function(a) {
                        return this.children[a]
                    },
                    fE: function() {
                        return this.children.length
                    },
                    getChildren: Fa("children"),
                    mt: function(a) {
                        var c = this.ff.length;
                        this.Rb(a, c);
                        return c
                    },
                    Rb: function(a, c) {
                        a.element = this;
                        this.ff[c] = a
                    },
                    iB: function(a) {
                        this.nh === a && this.Xv();
                        a < this.ff.length && this.ff.splice(a, 1)
                    },
                    S: function(a) {
                        this.wb && this.wb.state !== g.Z.fi && this.wb.stop();
                        this.nh = a;
                        this.wb = this.ff[a];
                        this.wb.play()
                    },
                    TA: function() {
                        this.wb.pause()
                    },
                    Xv: function() {
                        this.wb.stop();
                        this.wb = null;
                        this.nh = a.h
                    },
                    yc: function(a) {
                        return this.ff[a]
                    },
                    ml: function(a, c) {
                        for (var b = !1, f = this.children.length - 1; 0 <= f; f--) {
                            var d =
                                this.children[f];
                            if (d && d.fc && d.ml(a, c) && !1 === b && (b = !0, !this.pl)) break
                        }
                        return b
                    },
                    nl: function(a, c) {
                        for (var b = !1, f = this.children.length - 1; 0 <= f; f--) {
                            var d = this.children[f];
                            if (d && d.fc && d.nl(a, c) && !1 === b && (b = !0, !this.pl)) break
                        }
                        return b
                    },
                    Lp: function(a, c) {
                        for (var b = !1, f = this.children.length - 1; 0 <= f; f--) {
                            var d = this.children[f];
                            if (d && d.fc && d.Lp(a, c) && !1 === b && (b = !0, !this.pl)) break
                        }
                        return b
                    },
                    Lu: function(a, c) {
                        for (var b = !1, f = this.children.length - 1; 0 <= f; f--) {
                            var d = this.children[f];
                            if (d && d.fc && d.Lu(a, c) && !1 === b &&
                                (b = !0, !this.pl)) break
                        }
                        return b
                    },
                    setEnabled: function(a) {
                        this.Dj = this.fc = this.visible = a
                    },
                    isEnabled: function() {
                        return this.visible && this.fc && this.Dj
                    },
                    show: function() {
                        for (var a = this.children, c = a.length, b = 0; b < c; b++) {
                            var f = a[b];
                            f.visible && f.show()
                        }
                    },
                    hide: function() {
                        for (var a = this.children, c = a.length, b = 0; b < c; b++) {
                            var f = a[b];
                            f.visible && f.hide()
                        }
                    }
                })
            }(Y, Z, Q, K, aa, wa, la, ia),
            R = function(b) {
                function c(a, c, b, f) {
                    this.x = a;
                    this.y = c;
                    this.O = b;
                    this.V = f
                }

                function e(c, b, e, r, m) {
                    return (m.x < c ? a : 0) + (m.x > e ? f : 0) + (m.y < b ? d : 0) + (m.y >
                        r ? g : 0)
                }
                c.copy = function(a) {
                    return new c(a.x, a.y, a.O, a.V)
                };
                c.ge = function(a, b) {
                    return new c(a.x * b, a.y * b, a.O * b, a.V * b)
                };
                c.lj = function(a, c, b, f, d, e, g, x) {
                    return !(a > g || b < d || c > x || f < e)
                };
                c.jv = function(a, b, f, d, e, g, C, x) {
                    a = new c(e - a, g - b, C, x);
                    0 > a.x && (a.O += a.x, a.x = 0);
                    a.x + a.O > f && (a.O = f - a.x);
                    0 > a.y && (a.V += a.y, a.y = 0);
                    a.y + a.V > d && (a.V = d - a.y);
                    return a
                };
                c.Kb = function(a, c, b, f, d, e) {
                    return a >= b && a < b + d && c >= f && c < f + e
                };
                var a = 1,
                    f = 2,
                    d = 4,
                    g = 8;
                c.ae = function(c, l, n, r, m, p, C, x) {
                    var z, s, G = new b(c, l),
                        k = new b(n, r),
                        D;
                    C = m + C;
                    var u = p + x;
                    x = e(m, p,
                        C, u, G);
                    for (z = e(m, p, C, u, k); x || z;) {
                        if (x & z) return !1;
                        x ? (s = x, D = G) : (s = z, D = k);
                        s & a ? (D.y += (l - r) * (m - D.x) / (c - n), D.x = m) : s & f && (D.y += (l - r) * (C - D.x) / (c - n), D.x = C);
                        s & d ? (D.x += (c - n) * (p - D.y) / (l - r), D.y = p) : s & g && (D.x += (c - n) * (u - D.y) / (l - r), D.y = u);
                        s == x ? x = e(m, p, C, u, G) : z = e(m, p, C, u, k)
                    }
                    return !0
                };
                return c
            }(O),
            Oa = function(b, c, e, a) {
                return b.extend({
                    init: function(a) {
                        this.p();
                        this.L = a;
                        this.ll = e.h;
                        this.Dg = [];
                        this.gf = [];
                        this.hh = []
                    },
                    Ya: function(a, c, b, e) {
                        this.Dg[a] = c;
                        this.gf[a] = b;
                        this.hh[a] = null != e ? e : 1
                    },
                    hB: function(a) {
                        this.Dg.splice(a,
                            1);
                        this.gf.splice(a, 1);
                        this.hh.splice(a, 1)
                    },
                    hl: function(c, b, e, h) {
                        this.Dg[h] = a.copy(this.L.d[c]);
                        var l = this.L.j[c];
                        c = this.L.d[c];
                        this.gf[h] = new a(b + l.x, e + l.y, c.O, c.V);
                        this.hh[h] = 1
                    },
                    Nt: function(a) {
                        a > this.Dg.length && (a = this.Dg.length);
                        for (var b = c.context, e = 0; e < a; e++) {
                            var h = this.Dg[e],
                                l = this.gf[e],
                                n = this.hh[e],
                                r = b.globalAlpha,
                                m = Math.ceil(h.O),
                                p = Math.ceil(h.V);
                            if (0 !== m && 0 !== p) {
                                if (null == n) n = 1;
                                else if (0 >= n) continue;
                                else 1 > n && (b.globalAlpha = n);
                                var C = this.Jh && this.Jh.length > e;
                                if (C) {
                                    var x = this.Jh[e],
                                        z = this.El[e],
                                        s = 0 !== z.x || 0 !== z.y;
                                    0 !== x && (s && b.translate(z.x, z.y), b.rotate(x), s && b.translate(-z.x, -z.y))
                                }
                                var G, k, D;
                                this.Ka ? (G = Math.round(l.x / this.Ka) * this.Ka, k = Math.round(l.y / this.Ka) * this.Ka, D = Math.round(l.O / this.Ka) * this.Ka, l = Math.round(l.V / this.Ka) * this.Ka) : (G = Math.round(l.x), k = Math.round(l.y), D = Math.ceil(l.O), l = Math.ceil(l.V));
                                b.drawImage(this.L.Vb, h.x, h.y, m, p, G, k, D, l);
                                C && 0 !== x && (s && b.translate(z.x, z.y), b.rotate(-x), s && b.translate(-z.x, -z.y));
                                1 !== n && (b.globalAlpha = r)
                            }
                        }
                    },
                    B: function() {
                        this.Cc();
                        if (0 !== this.color.G) {
                            var a =
                                c.context,
                                b = 0 !== this.ea || 0 !== this.fa;
                            b && a.translate(this.ea, this.fa);
                            this.Nt(this.ll === e.h ? this.Dg.length : this.ll);
                            b && a.translate(-this.ea, -this.fa)
                        }
                        this.Bc()
                    }
                })
            }(da, aa, K, R),
            q = {
                nD: 0,
                qD: 1,
                lD: 2,
                uD: 3,
                Og: 4,
                Yh: 5,
                zD: 6,
                ha: 7,
                UD: 8,
                tn: 9,
                sn: 10,
                rn: 11,
                kk: 12,
                Bn: 13,
                lk: 14,
                mk: 15,
                nk: 16,
                zs: 17,
                Jn: 18,
                As: 19,
                Bs: 20,
                Cs: 21,
                Kn: 22,
                Qn: 23,
                Ds: 24,
                Es: 25,
                Nd: 26,
                Hn: 27,
                xs: 28,
                ys: 29,
                In: 30,
                Nn: 31,
                On: 32,
                Pn: 33,
                Sn: 34,
                Tn: 35,
                yn: 36,
                zn: 37,
                wn: 38,
                qn: 39,
                rD: 40,
                sD: 41,
                DD: 42,
                tD: 43,
                AD: 44,
                yD: 45,
                BD: 46,
                wD: 47,
                xD: 48,
                vD: 49,
                oD: 50,
                qc: 51,
                ci: 52,
                mD: 53,
                CD: 54,
                ED: 55,
                nm: 56,
                pD: 57,
                FD: 58,
                Im: 59,
                ai: 60,
                xm: 61,
                Zj: 62,
                Hm: 63,
                Xj: 64,
                ym: 65,
                zm: 66,
                ed: 67,
                Vj: 68,
                Gm: 69,
                Fm: 70,
                Em: 71,
                Rg: 73,
                Yj: 74,
                qf: 75,
                $j: 76,
                Pm: 77,
                Sg: 78,
                vm: 79,
                wm: 80,
                rc: 81,
                Ln: 82,
                Mn: 83,
                un: 84,
                bh: 85,
                An: 105,
                xn: 106,
                px: 107,
                um: 108,
                ak: 111,
                Bm: 112,
                Cm: 113,
                Dm: 114,
                bi: 115,
                Wj: 116,
                Am: 117,
                ok: 118,
                pk: 119,
                Uj: 120,
                xr: 121,
                yr: 122,
                zr: 123,
                Ar: 124,
                Br: 125,
                Cr: 126,
                Dr: 127,
                Er: 128,
                Fr: 129,
                Gr: 130,
                Hr: 131,
                Ir: 132,
                Jr: 133,
                Kr: 134,
                tm: 135,
                Lr: 136,
                Mr: 137,
                Nr: 138,
                Or: 139,
                Pr: 140,
                Qr: 141,
                Rr: 142,
                Sr: 143,
                Jm: 144,
                Km: 145,
                Lm: 146,
                Mm: 147,
                Nm: 148,
                Om: 149,
                Qg: 150,
                nf: 151,
                of: 152,
                me: 153,
                Tg: 154,
                rf: 155,
                sf: 156,
                ne: 157,
                Ug: 158,
                tf: 159,
                uf: 160,
                oe: 161,
                Vg: 162,
                vf: 163,
                wf: 164,
                pe: 165,
                Wg: 166,
                xf: 167,
                yf: 168,
                qe: 169,
                Xg: 170,
                zf: 171,
                Af: 172,
                re: 173,
                vn: 174,
                Dn: 175,
                Fn: 176,
                En: 177,
                Gn: 178,
                Rn: 179,
                ck: 180,
                pc: 72,
                pf: 181,
                $h: 182,
                Cn: 183,
                PD: 183
            },
            wb = [{
                id: q.Og,
                nd: -1,
                Ac: -42,
                lc: 20,
                Kf: "!\"#$%&'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_`abcdefghijklmnopqrstuvwxyz{|}~\u00a9\u00c0\u00e0\u00c2\u00e2\u00c6\u00e6\u00c7\u00e7\u00c8\u00e8\u00c9\u00e9\u00ca\u00ea\u00cb\u00eb\u00ce\u00ee\u00cf\u00ef\u00d4\u00f4\u0152\u0153\u00d9\u00f9\u00db\u00fb\u00dc\u00fc\u00ab\u00bb\u20ac\u00c4\u00e4\u00c9\u00e9\u00d6\u00f6\u00dc\u00fc\u00df\u201e\u201c\u201d\u00b0\u0410\u0411\u0412\u0413\u0414\u0415\u0401\u0416\u0417\u0418\u0419\u041a\u041b\u041c\u041d\u041e\u041f\u0420\u0421\u0422\u0423\u0424\u0425\u0426\u0427\u0428\u0429\u042a\u042b\u042c\u042d\u042e\u042f\u0430\u0431\u0432\u0433\u0434\u0435\u0451\u0436\u0437\u0438\u0439\u043a\u043b\u043c\u043d\u043e\u043f\u0440\u0441\u0442\u0443\u0444\u0445\u0446\u0447\u0448\u0449\u044a\u044b\u044c\u044d\u044e\u044f",
                jg: {},
                d: [4, 4, 33, 156, 41, 4, 38, 156, 83, 4, 61, 156, 148, 4, 41, 156, 193, 4, 73, 156, 270, 4, 38, 156, 312, 4, 19, 156, 335, 4, 44, 156, 383, 4, 41, 156, 428, 4, 54, 156, 486, 4, 43, 156, 533, 4, 22, 156, 559, 4, 46, 156, 609, 4, 23, 156, 636, 4, 51, 156, 691, 4, 54, 156, 749, 4, 23, 156, 776, 4, 53, 156, 833, 4, 44, 156, 881, 4, 48, 156, 933, 4, 51, 156, 4, 164, 49, 156, 57, 164, 52, 156, 113, 164, 55, 156, 172, 164, 41, 156, 217, 164, 24, 156, 245, 164, 24, 156, 273, 164, 59, 156, 336, 164, 36, 156, 376, 164, 51, 156, 431, 164, 44, 156, 479, 164, 62, 156, 545, 164, 51, 156, 600, 164, 51, 156, 655, 164, 58, 156, 717, 164, 48, 156, 769,
                    164, 46, 156, 819, 164, 45, 156, 868, 164, 50, 156, 922, 164, 49, 156, 975, 164, 24, 156, 4, 324, 45, 156, 53, 324, 45, 156, 102, 324, 54, 156, 160, 324, 73, 156, 237, 324, 43, 156, 284, 324, 63, 156, 351, 324, 59, 156, 414, 324, 54, 156, 472, 324, 51, 156, 527, 324, 57, 156, 588, 324, 56, 156, 648, 324, 59, 156, 711, 324, 52, 156, 767, 324, 74, 156, 845, 324, 63, 156, 912, 324, 47, 156, 4, 484, 67, 156, 75, 484, 65, 156, 144, 484, 54, 156, 202, 484, 56, 156, 262, 484, 40, 156, 306, 484, 74, 156, 384, 484, 24, 156, 412, 484, 45, 156, 461, 484, 51, 156, 516, 484, 49, 156, 569, 484, 48, 156, 621, 484, 43, 156, 668, 484, 47, 156, 719,
                    484, 42, 156, 765, 484, 43, 156, 812, 484, 25, 156, 841, 484, 39, 156, 884, 484, 50, 156, 938, 484, 22, 156, 4, 644, 69, 156, 77, 644, 40, 156, 121, 644, 37, 156, 162, 644, 45, 156, 211, 644, 63, 156, 278, 644, 43, 156, 325, 644, 44, 156, 373, 644, 52, 156, 429, 644, 46, 156, 479, 644, 54, 156, 537, 644, 73, 156, 614, 644, 59, 156, 677, 644, 54, 156, 735, 644, 58, 156, 797, 644, 57, 156, 858, 644, 25, 156, 887, 644, 42, 156, 933, 644, 49, 156, 4, 804, 75, 156, 83, 804, 51, 156, 138, 804, 44, 156, 186, 804, 51, 156, 241, 804, 47, 156, 292, 804, 83, 156, 379, 804, 62, 156, 445, 804, 54, 156, 503, 804, 43, 156, 550, 804, 45, 156, 599,
                    804, 45, 156, 648, 804, 45, 156, 697, 804, 45, 156, 746, 804, 45, 156, 795, 804, 45, 156, 844, 804, 45, 156, 893, 804, 45, 156, 942, 804, 41, 156, 4, 964, 41, 156, 49, 964, 33, 156, 86, 964, 34, 156, 124, 964, 63, 156, 191, 964, 48, 156, 243, 964, 82, 156, 329, 964, 61, 156, 394, 964, 53, 156, 451, 964, 44, 156, 499, 964, 53, 156, 556, 964, 43, 156, 603, 964, 53, 156, 660, 964, 43, 156, 707, 964, 53, 156, 764, 964, 59, 156, 827, 964, 65, 156, 896, 964, 51, 156, 951, 964, 44, 156, 4, 1124, 45, 156, 53, 1124, 45, 156, 102, 1124, 63, 156, 169, 1124, 48, 156, 221, 1124, 53, 156, 278, 1124, 43, 156, 325, 1124, 53, 156, 382, 1124, 43,
                    156, 429, 1124, 43, 156, 476, 1124, 43, 156, 523, 1124, 40, 156, 567, 1124, 65, 156, 636, 1124, 47, 156, 687, 1124, 50, 156, 741, 1124, 49, 156, 794, 1124, 64, 156, 862, 1124, 46, 156, 912, 1124, 46, 156, 4, 1284, 73, 156, 81, 1284, 46, 156, 131, 1284, 54, 156, 189, 1284, 54, 156, 247, 1284, 62, 156, 313, 1284, 62, 156, 379, 1284, 64, 156, 447, 1284, 52, 156, 503, 1284, 59, 156, 566, 1284, 53, 156, 623, 1284, 48, 156, 675, 1284, 49, 156, 728, 1284, 59, 156, 791, 1284, 55, 156, 850, 1284, 59, 156, 913, 1284, 55, 156, 4, 1444, 58, 156, 66, 1444, 49, 156, 119, 1444, 72, 156, 195, 1444, 83, 156, 282, 1444, 62, 156, 348, 1444,
                    58, 156, 410, 1444, 50, 156, 464, 1444, 48, 156, 516, 1444, 67, 156, 587, 1444, 51, 156, 642, 1444, 44, 156, 690, 1444, 41, 156, 735, 1444, 39, 156, 778, 1444, 37, 156, 819, 1444, 41, 156, 864, 1444, 40, 156, 908, 1444, 40, 156, 952, 1444, 61, 156, 4, 1604, 38, 156, 46, 1604, 43, 156, 93, 1604, 43, 156, 140, 1604, 44, 156, 188, 1604, 45, 156, 237, 1604, 62, 156, 303, 1604, 42, 156, 349, 1604, 40, 156, 393, 1604, 49, 156, 446, 1604, 46, 156, 496, 1604, 38, 156, 538, 1604, 69, 156, 611, 1604, 42, 156, 657, 1604, 61, 156, 722, 1604, 43, 156, 769, 1604, 45, 156, 818, 1604, 40, 156, 862, 1604, 63, 156, 929, 1604, 65, 156, 4,
                    1764, 51, 156, 59, 1764, 51, 156, 114, 1764, 40, 156, 158, 1764, 39, 156, 201, 1764, 60, 156, 265, 1764, 40, 156, 309, 1764, 112, 156
                ]
            }, {
                id: q.Yh,
                nd: 2,
                Ac: -90,
                lc: 15,
                Kf: "!\"#$%&'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_`abcdefghijklmnopqrstuvwxyz{|}~\u00a9\u00c0\u00e0\u00c2\u00e2\u00c6\u00e6\u00c7\u00e7\u00c8\u00e8\u00c9\u00e9\u00ca\u00ea\u00cb\u00eb\u00ce\u00ee\u00cf\u00ef\u00d4\u00f4\u0152\u0153\u00d9\u00f9\u00db\u00fb\u00dc\u00fc\u00ab\u00bb\u20ac\u00c4\u00e4\u00c9\u00e9\u00d6\u00f6\u00dc\u00fc\u00df\u201e\u201c\u201d\u00b0\u0410\u0411\u0412\u0413\u0414\u0415\u0401\u0416\u0417\u0418\u0419\u041a\u041b\u041c\u041d\u041e\u041f\u0420\u0421\u0422\u0423\u0424\u0425\u0426\u0427\u0428\u0429\u042a\u042b\u042c\u042d\u042e\u042f\u0430\u0431\u0432\u0433\u0434\u0435\u0451\u0436\u0437\u0438\u0439\u043a\u043b\u043c\u043d\u043e\u043f\u0440\u0441\u0442\u0443\u0444\u0445\u0446\u0447\u0448\u0449\u044a\u044b\u044c\u044d\u044e\u044f",
                jg: {},
                d: [4, 4, 16, 156, 24, 4, 19, 156, 47, 4, 35, 156, 86, 4, 21, 156, 111, 4, 43, 156, 158, 4, 19, 156, 181, 4, 7, 156, 192, 4, 24, 156, 220, 4, 23, 156, 247, 4, 30, 156, 281, 4, 24, 156, 309, 4, 9, 156, 322, 4, 25, 156, 351, 4, 10, 156, 365, 4, 28, 156, 397, 4, 31, 156, 432, 4, 10, 156, 446, 4, 29, 156, 479, 4, 24, 156, 507, 4, 26, 156, 537, 4, 29, 156, 570, 4, 28, 156, 602, 4, 29, 156, 635, 4, 31, 156, 670, 4, 21, 156, 695, 4, 10, 156, 709, 4, 10, 156, 723, 4, 33, 156, 760, 4, 19, 156, 783, 4, 28, 156, 815, 4, 24, 156, 843, 4, 36, 156, 883, 4, 28, 156, 915, 4, 28, 156, 947, 4, 32, 156, 983, 4, 27, 156, 4, 164, 25, 156, 33, 164, 24, 156, 61, 164,
                    28, 156, 93, 164, 28, 156, 125, 164, 10, 156, 139, 164, 25, 156, 168, 164, 24, 156, 196, 164, 31, 156, 231, 164, 43, 156, 278, 164, 24, 156, 306, 164, 37, 156, 347, 164, 34, 156, 385, 164, 30, 156, 419, 164, 29, 156, 452, 164, 32, 156, 488, 164, 31, 156, 523, 164, 34, 156, 561, 164, 29, 156, 594, 164, 43, 156, 641, 164, 36, 156, 681, 164, 26, 156, 711, 164, 39, 156, 754, 164, 38, 156, 796, 164, 30, 156, 830, 164, 32, 156, 866, 164, 22, 156, 892, 164, 44, 156, 940, 164, 11, 156, 955, 164, 25, 156, 984, 164, 29, 156, 4, 324, 27, 156, 35, 324, 26, 156, 65, 324, 24, 156, 93, 324, 26, 156, 123, 324, 23, 156, 150, 324, 24, 156, 178, 324,
                    11, 156, 193, 324, 20, 156, 217, 324, 28, 156, 249, 324, 9, 156, 262, 324, 41, 156, 307, 324, 21, 156, 332, 324, 20, 156, 356, 324, 25, 156, 385, 324, 36, 156, 425, 324, 22, 156, 451, 324, 24, 156, 479, 324, 29, 156, 512, 324, 26, 156, 542, 324, 31, 156, 577, 324, 43, 156, 624, 324, 34, 156, 662, 324, 30, 156, 696, 324, 33, 156, 733, 324, 32, 156, 769, 324, 12, 156, 785, 324, 22, 156, 811, 324, 27, 156, 842, 324, 45, 156, 891, 324, 29, 156, 924, 324, 24, 156, 952, 324, 29, 156, 985, 324, 26, 156, 4, 484, 49, 156, 57, 484, 36, 156, 97, 484, 30, 156, 131, 484, 23, 156, 158, 484, 24, 156, 186, 484, 24, 156, 214, 484, 24, 156, 242,
                    484, 24, 156, 270, 484, 24, 156, 298, 484, 24, 156, 326, 484, 24, 156, 354, 484, 24, 156, 382, 484, 22, 156, 408, 484, 22, 156, 434, 484, 17, 156, 455, 484, 17, 156, 476, 484, 36, 156, 516, 484, 27, 156, 547, 484, 50, 156, 601, 484, 35, 156, 640, 484, 29, 156, 673, 484, 24, 156, 701, 484, 29, 156, 734, 484, 23, 156, 761, 484, 29, 156, 794, 484, 23, 156, 821, 484, 30, 156, 855, 484, 34, 156, 893, 484, 37, 156, 934, 484, 29, 156, 967, 484, 24, 156, 995, 484, 24, 156, 4, 644, 24, 156, 32, 644, 36, 156, 72, 644, 27, 156, 103, 644, 29, 156, 136, 644, 23, 156, 163, 644, 30, 156, 197, 644, 23, 156, 224, 644, 23, 156, 251, 644, 23, 156,
                    278, 644, 22, 156, 304, 644, 38, 156, 346, 644, 26, 156, 376, 644, 28, 156, 408, 644, 28, 156, 440, 644, 38, 156, 482, 644, 25, 156, 511, 644, 25, 156, 540, 644, 44, 156, 588, 644, 26, 156, 618, 644, 30, 156, 652, 644, 30, 156, 686, 644, 37, 156, 727, 644, 36, 156, 767, 644, 37, 156, 808, 644, 29, 156, 841, 644, 34, 156, 879, 644, 30, 156, 913, 644, 28, 156, 945, 644, 27, 156, 976, 644, 34, 156, 4, 804, 31, 156, 39, 804, 34, 156, 77, 804, 31, 156, 112, 804, 33, 156, 149, 804, 28, 156, 181, 804, 43, 156, 228, 804, 51, 156, 283, 804, 36, 156, 323, 804, 33, 156, 360, 804, 28, 156, 392, 804, 27, 156, 423, 804, 40, 156, 467, 804, 29,
                    156, 500, 804, 24, 156, 528, 804, 22, 156, 554, 804, 20, 156, 578, 804, 19, 156, 601, 804, 22, 156, 627, 804, 21, 156, 652, 804, 21, 156, 677, 804, 36, 156, 717, 804, 20, 156, 741, 804, 24, 156, 769, 804, 24, 156, 797, 804, 24, 156, 825, 804, 25, 156, 854, 804, 35, 156, 893, 804, 24, 156, 921, 804, 22, 156, 947, 804, 28, 156, 979, 804, 26, 156, 4, 964, 20, 156, 28, 964, 41, 156, 73, 964, 23, 156, 100, 964, 36, 156, 140, 964, 24, 156, 168, 964, 25, 156, 197, 964, 22, 156, 223, 964, 37, 156, 264, 964, 38, 156, 306, 964, 30, 156, 340, 964, 29, 156, 373, 964, 22, 156, 399, 964, 21, 156, 424, 964, 35, 156, 463, 964, 22, 156, 489, 964,
                    112, 156
                ]
            }, {
                id: q.qc,
                r: 393,
                q: 418,
                d: [2, 2, 218, 226, 224, 2, 151, 151, 2, 232, 157, 158, 224, 157, 98, 62, 326, 157, 48, 45, 379, 2, 49, 59, 432, 2, 55, 57, 379, 65, 53, 63, 163, 232, 146, 147, 2, 394, 153, 163, 2, 561, 153, 166, 2, 731, 156, 169, 2, 904, 163, 175, 169, 904, 159, 175, 159, 394, 159, 159, 313, 232, 150, 150, 322, 394, 144, 150, 159, 561, 138, 146, 2, 1083, 302, 303, 301, 561, 107, 158, 412, 561, 96, 157, 2, 1390, 252, 268, 2, 1662, 278, 305, 2, 1971, 371, 397, 2, 2372, 385, 396, 2, 2772, 377, 386],
                j: [103, 130, 122, 133, 119, 131, 145, 176, 168, 182, 171, 177, 168, 182, 160, 176, 119, 128, 115, 115, 115, 112,
                    115, 112, 115, 112, 119, 115, 122, 134, 131, 143, 137, 143, 140, 147, 47, 56, 143, 133, 155, 133, 69, 83, 50, 37, 6, -2, 0, -5, 8, 2
                ]
            }, {
                id: 52,
                r: 552,
                q: 552,
                d: [0, 0, 88, 85, 0, 85, 46, 152, 46, 85, 106, 149, 0, 237, 78, 162, 78, 237, 93, 155, 0, 399, 88, 158, 152, 85, 46, 152, 88, 399, 144, 145, 0, 557, 138, 141, 0, 698, 145, 145, 0, 843, 146, 141, 0, 984, 161, 140, 0, 1124, 130, 155],
                j: [235, 190, 256, 121, 226, 124, 240, 111, 233, 118, 235, 115, 256, 121, 213, 220, 219, 232, 212, 220, 211, 232, 203, 178, 211, 273]
            }, {
                id: 56,
                nd: 2,
                Ac: 2,
                lc: 10,
                Kf: "0123456789",
                jg: {},
                d: [5, 5, 49, 156, 59, 5, 16, 156, 80, 5, 48, 156, 133,
                    5, 38, 156, 176, 5, 41, 156, 222, 5, 45, 156, 272, 5, 43, 156, 320, 5, 47, 156, 372, 5, 49, 156, 426, 5, 35, 156
                ]
            }, {
                id: 59,
                r: 552,
                q: 552,
                d: [0, 0, 246, 268, 0, 268, 334, 370, 246, 0, 205, 231, 0, 638, 308, 353, 0, 991, 387, 461, 0, 1452, 324, 399, 0, 1851, 335, 328, 0, 2179, 296, 266, 0, 2445, 240, 230, 296, 2179, 207, 217, 308, 638, 204, 205, 240, 2445, 200, 194, 308, 843, 195, 133],
                j: [145, 116, 76, 38, 166, 132, 113, 56, 75, -2, 113, 34, 87, 82, 102, 114, 128, 124, 148, 130, 149, 134, 151, 138, 153, 141]
            }, {
                id: 60,
                r: 250,
                q: 250,
                d: [0, 0, 139, 170, 139, 0, 142, 169, 281, 0, 148, 163, 429, 0, 155, 155, 584, 0, 163, 148, 747,
                    0, 169, 142, 584, 148, 171, 139, 584, 287, 169, 141, 755, 148, 165, 145, 755, 293, 159, 151, 429, 155, 153, 159, 281, 163, 147, 164, 139, 169, 141, 169, 0, 170, 139, 170
                ],
                j: [55, 40, 54, 41, 51, 44, 47, 48, 43, 51, 40, 54, 39, 56, 40, 55, 42, 53, 46, 50, 48, 46, 51, 44, 54, 41, 55, 40]
            }, {
                id: 61,
                r: 449,
                q: 446,
                d: [0, 0, 308, 285, 0, 285, 302, 282, 0, 567, 297, 281, 0, 848, 296, 277, 0, 1125, 293, 274, 0, 1399, 293, 273, 0, 1672, 295, 271, 0, 1943, 297, 269, 0, 2212, 239, 226, 239, 2212, 241, 223, 0, 2438, 244, 221, 244, 2438, 249, 219],
                j: [83, 82, 87, 84, 90, 86, 91, 90, 93, 94, 92, 99, 90, 104, 88, 111, 101, 119, 97, 128, 92, 138,
                    86, 148
                ]
            }, {
                id: 62,
                r: 275,
                q: 275,
                d: [0, 0, 140, 144, 0, 144, 42, 37],
                j: [69, 62, 117, 119]
            }, {
                id: 63,
                r: 833,
                q: 250,
                d: [0, 0, 566, 93],
                j: [133, 76]
            }, {
                id: 64,
                r: 250,
                q: 250,
                d: [0, 0, 155, 154, 0, 154, 181, 210, 0, 364, 185, 180, 0, 544, 183, 178],
                j: [47, 50, 32, 36, 35, 40, 35, 40]
            }, {
                id: 65,
                r: 275,
                q: 275,
                d: [0, 0, 125, 126, 0, 126, 37, 35],
                j: [78, 76, 122, 121]
            }, {
                id: 66,
                r: 275,
                q: 275,
                d: [0, 0, 125, 126, 0, 126, 37, 35],
                j: [75, 76, 119, 121]
            }, {
                id: 67,
                r: 552,
                q: 552,
                d: [2, 2, 234, 221, 240, 2, 77, 76, 240, 82, 70, 76, 321, 2, 64, 76, 321, 82, 58, 76, 389, 2, 51, 76, 389, 82, 46, 76, 444, 2, 40, 77, 444, 83, 34, 77, 488, 2, 28,
                    78, 488, 84, 28, 78, 520, 2, 35, 77, 559, 2, 42, 77, 605, 2, 48, 77, 657, 2, 56, 77, 717, 2, 63, 77, 784, 2, 69, 77, 857, 2, 76, 77, 857, 83, 83, 78, 2, 227, 175, 175, 181, 227, 175, 175, 360, 227, 175, 175, 539, 227, 175, 175, 718, 227, 175, 175, 2, 406, 175, 175, 181, 406, 175, 175, 360, 406, 175, 175, 539, 406, 175, 175, 718, 406, 175, 175, 2, 585, 175, 175, 181, 585, 175, 175, 360, 585, 175, 175, 539, 585, 175, 175, 718, 585, 175, 175, 2, 764, 175, 175, 181, 764, 175, 175, 360, 764, 175, 175, 539, 764, 175, 175, 718, 764, 175, 175, 2, 943, 175, 175, 181, 943, 175, 175, 360, 943, 175, 175, 539, 943, 175, 175, 718, 943, 175, 175,
                    2, 1122, 175, 175, 2, 1301, 175, 175, 2, 1480, 175, 175, 2, 1659, 175, 175, 2, 1838, 175, 175, 181, 1122, 175, 175, 360, 1122, 175, 175, 539, 1122, 175, 175, 718, 1122, 175, 175, 181, 1301, 175, 175, 181, 1480, 175, 175, 181, 1659, 175, 175, 360, 1301, 229, 231, 593, 1301, 229, 231, 360, 1536, 490, 492
                ],
                j: [156, 156, 233, 231, 236, 231, 239, 231, 242, 231, 246, 231, 248, 231, 251, 231, 254, 231, 257, 231, 257, 231, 253, 231, 250, 231, 247, 231, 243, 231, 240, 231, 237, 231, 234, 231, 230, 230, 184, 184, 184, 184, 184, 184, 184, 184, 184, 184, 184, 184, 184, 184, 184, 184, 184, 184, 184, 184, 184, 184, 184, 184, 184,
                    184, 184, 184, 184, 184, 184, 184, 184, 184, 184, 184, 184, 184, 184, 184, 184, 184, 184, 184, 184, 184, 184, 184, 184, 184, 184, 184, 184, 184, 184, 184, 184, 184, 184, 184, 184, 184, 184, 184, 184, 184, 184, 184, 184, 184, 184, 184, 184, 184, 155, 159, 155, 159, 27, 21
                ]
            }, {
                id: q.Vj,
                r: 100,
                q: 100,
                d: [0, 0, 84, 85, 84, 0, 58, 85, 142, 0, 32, 85, 174, 0, 12, 85, 186, 0, 28, 85, 214, 0, 44, 85, 258, 0, 60, 85, 318, 0, 70, 85, 388, 0, 78, 85, 466, 0, 84, 85, 550, 0, 84, 85],
                j: [6, 5, 19, 5, 32, 5, 42, 5, 34, 5, 26, 5, 18, 5, 13, 5, 9, 5, 6, 5, 6, 5]
            }, {
                id: 69,
                r: 833,
                q: 250,
                d: [0, 0, 453, 93],
                j: [191, 76]
            }, {
                id: 70,
                r: 833,
                q: 250,
                d: [0, 0,
                    333, 93
                ],
                j: [251, 79]
            }, {
                id: 71,
                r: 833,
                q: 250,
                d: [0, 0, 212, 93],
                j: [310, 79]
            }, {
                id: 72,
                r: 640,
                q: 640,
                d: [0, 0, 291, 302, 291, 0, 363, 409, 654, 0, 383, 309, 1037, 0, 314, 335, 1351, 0, 326, 334, 1677, 0, 374, 330, 291, 409, 405, 492, 2051, 0, 350, 334, 0, 302, 201, 207, 0, 509, 201, 206, 0, 715, 201, 207, 0, 922, 201, 207, 0, 1129, 201, 206, 0, 1335, 201, 210, 0, 1545, 201, 213, 0, 1758, 201, 215, 0, 1973, 201, 219, 0, 2192, 201, 222, 0, 2414, 201, 223, 0, 2637, 201, 222, 0, 2859, 201, 224, 0, 3083, 201, 224, 0, 3307, 201, 224, 0, 3531, 201, 221, 0, 3752, 201, 218, 2401, 0, 201, 214, 2602, 0, 201, 211, 2803, 0, 222, 196, 2803,
                    196, 210, 201, 3025, 0, 203, 209, 3228, 0, 197, 214, 3425, 0, 193, 217, 3618, 0, 194, 219, 3812, 0, 197, 210, 291, 901, 200, 202, 3812, 210, 204, 197, 291, 1103, 208, 199, 291, 1302, 212, 202, 291, 1504, 214, 205, 291, 1709, 216, 206, 291, 1915, 204, 226, 291, 2141, 203, 213, 495, 1915, 201, 210, 494, 2141, 201, 208, 291, 2354, 201, 203, 3025, 209, 201, 200, 491, 901, 201, 200, 492, 2354, 201, 200, 291, 2557, 201, 200, 291, 2757, 201, 207, 291, 2964, 201, 216, 492, 2557, 204, 194, 291, 3180, 221, 171, 291, 3351, 249, 197, 291, 3548, 225, 201, 291, 3749, 205, 205, 492, 2964, 202, 213, 696, 409, 201, 222, 897, 409, 201,
                    222, 1098, 409, 205, 221, 1303, 409, 229, 213, 1532, 409, 243, 205, 0, 3970, 153, 86, 654, 309, 140, 89, 1775, 409, 212, 196, 1987, 409, 208, 209, 496, 3749, 197, 233, 696, 631, 186, 247, 882, 631, 181, 245, 1063, 631, 186, 243, 1249, 631, 194, 234, 1443, 631, 199, 230, 2195, 409, 199, 221, 1642, 631, 199, 223, 1841, 631, 199, 226, 2040, 631, 199, 228, 2239, 631, 199, 230, 2438, 631, 199, 230, 2637, 631, 199, 230, 2836, 631, 195, 234, 3031, 631, 190, 238, 3221, 631, 194, 231, 2394, 409, 201, 217, 2595, 409, 207, 209, 2802, 409, 218, 202, 3020, 409, 211, 206, 3231, 409, 206, 210, 3437, 409, 210, 213, 3647, 409, 215,
                    218, 3415, 631, 220, 223, 3862, 409, 224, 216, 3635, 631, 219, 212, 492, 2757, 195, 205, 3854, 631, 195, 207, 696, 878, 195, 210, 891, 878, 217, 214, 891, 1092, 225, 215, 891, 1307, 219, 215, 696, 1088, 195, 215, 696, 1303, 195, 215, 696, 1518, 195, 215, 891, 1522, 217, 215, 891, 1737, 225, 215, 891, 1952, 223, 218, 891, 2170, 219, 222, 891, 2392, 215, 224, 891, 2616, 216, 216, 1108, 878, 210, 206, 1318, 878, 218, 202, 1536, 878, 205, 190, 1741, 878, 203, 194, 1944, 878, 202, 206, 2146, 878, 203, 214, 891, 2832, 204, 217, 891, 3049, 204, 216, 2349, 878, 204, 213, 2553, 878, 205, 204, 2758, 878, 205, 192, 2401, 214,
                    201, 195, 2963, 878, 201, 206, 3164, 878, 204, 212, 3368, 878, 205, 214, 891, 3265, 207, 215, 891, 3480, 208, 216, 3573, 878, 205, 205, 3778, 878, 226, 202, 891, 3696, 212, 204, 696, 1733, 195, 210, 696, 1943, 189, 213, 696, 2156, 190, 218, 696, 2374, 193, 222, 1116, 1092, 198, 213, 1314, 1092, 203, 210, 1517, 1092, 207, 202, 1724, 1092, 211, 204, 1935, 1092, 214, 207, 2149, 1092, 216, 211, 2365, 1092, 216, 212, 2581, 1092, 216, 212, 2797, 1092, 216, 212, 3013, 1092, 216, 212, 3229, 1092, 216, 212, 3445, 1092, 216, 212, 3661, 1092, 216, 212, 3877, 1092, 216, 212, 1116, 1305, 216, 212, 1116, 1517, 212, 216, 1116,
                    1733, 206, 222, 1116, 1955, 202, 225, 1116, 2180, 205, 222, 1116, 2402, 210, 213, 1116, 2615, 212, 208, 1116, 2823, 198, 223, 1116, 3046, 196, 232, 696, 2596, 195, 236, 1116, 3278, 198, 236, 1116, 3514, 206, 238, 1116, 3752, 211, 226, 1332, 1305, 217, 207, 891, 3900, 213, 195, 1549, 1305, 212, 179, 1761, 1305, 221, 178, 1982, 1305, 221, 181, 2203, 1305, 215, 180, 2418, 1305, 212, 179, 2630, 1305, 221, 177, 2851, 1305, 221, 180, 3072, 1305, 215, 180, 3287, 1305, 212, 179, 3499, 1305, 221, 177, 3720, 1305, 221, 180, 1332, 1512, 215, 180, 1332, 1692, 212, 179, 1547, 1512, 216, 176, 1332, 1871, 213, 175, 696,
                    2832, 194, 205, 696, 3037, 188, 236, 696, 3273, 194, 233, 1332, 2046, 210, 202, 1332, 2248, 204, 194, 1332, 2442, 202, 204
                ],
                j: [173, 274, 137, 156, 133, 207, 152, 237, 154, 244, 134, 240, 107, 104, 148, 242, 220, 227, 220, 227, 220, 227, 220, 227, 220, 227, 220, 224, 220, 221, 220, 218, 220, 215, 220, 212, 220, 211, 220, 211, 220, 210, 220, 210, 220, 210, 220, 213, 220, 216, 220, 220, 220, 223, 211, 238, 216, 233, 220, 225, 223, 220, 225, 217, 224, 215, 223, 224, 221, 232, 219, 237, 217, 235, 215, 232, 214, 229, 213, 228, 217, 208, 218, 221, 219, 224, 219, 226, 219, 231, 219, 234, 219, 234, 219, 234, 219, 234, 219,
                    226, 219, 218, 218, 240, 210, 263, 192, 237, 204, 233, 217, 229, 220, 221, 220, 212, 220, 212, 217, 212, 202, 221, 195, 229, 240, 264, 249, 265, 215, 238, 217, 225, 223, 201, 228, 187, 231, 189, 228, 191, 223, 200, 220, 204, 220, 213, 220, 211, 220, 208, 220, 206, 220, 204, 220, 204, 220, 204, 222, 200, 225, 196, 223, 203, 220, 217, 216, 225, 211, 232, 216, 228, 218, 224, 212, 221, 208, 216, 205, 211, 202, 218, 208, 222, 232, 229, 232, 227, 232, 224, 210, 220, 202, 219, 208, 219, 232, 219, 232, 219, 232, 219, 210, 219, 202, 219, 202, 216, 205, 212, 207, 210, 208, 218, 217, 228, 211, 232, 216, 244, 218, 240, 219, 227, 220,
                    219, 220, 216, 220, 217, 220, 221, 218, 230, 216, 242, 220, 239, 220, 228, 217, 222, 216, 220, 214, 219, 213, 218, 216, 229, 207, 232, 214, 230, 224, 224, 227, 221, 226, 216, 225, 212, 222, 220, 219, 224, 218, 231, 216, 229, 214, 226, 213, 222, 213, 221, 213, 221, 213, 221, 213, 221, 213, 221, 213, 221, 213, 221, 213, 221, 213, 221, 215, 217, 218, 211, 220, 208, 218, 212, 216, 221, 215, 226, 222, 210, 223, 201, 223, 197, 222, 197, 219, 195, 216, 206, 211, 225, 213, 238, 213, 254, 207, 255, 207, 252, 210, 253, 213, 254, 207, 256, 207, 253, 210, 253, 213, 254, 207, 256, 207, 253, 210, 253, 213, 254, 211, 257, 214, 258, 227,
                    227, 230, 195, 226, 199, 215, 232, 218, 239, 220, 230
                ]
            }, {
                id: 73,
                r: 275,
                q: 275,
                d: [0, 0, 137, 139, 137, 0, 105, 100, 0, 139, 235, 235, 0, 374, 240, 246],
                j: [65, 70, 84, 86, 18, 19, 13, 14]
            }, {
                id: 74,
                r: 833,
                q: 250,
                d: [0, 0, 507, 85, 0, 85, 507, 100, 0, 185, 507, 100, 0, 285, 507, 97, 0, 382, 507, 92],
                j: [163, 82, 163, 73, 163, 71, 163, 70, 163, 75]
            }, {
                id: 75,
                r: 276,
                q: 276,
                d: [0, 0, 84, 128, 84, 0, 68, 109, 152, 0, 50, 109, 0, 128, 140, 121, 0, 249, 148, 147]
            }, {
                id: 76,
                r: 761,
                q: 761,
                d: [0, 0, 220, 239, 0, 239, 206, 290, 0, 529, 205, 290, 0, 819, 220, 246, 0, 1065, 237, 219, 0, 1284, 226, 231, 220, 0, 18, 17, 238, 0, 11, 11, 206,
                    239, 38, 39
                ],
                j: [271, 262, 286, 232, 287, 232, 271, 249, 262, 272, 268, 266, 382, 376, 385, 379, 372, 365]
            }, {
                id: 77,
                r: 998,
                q: 1058,
                d: [3, 3, 148, 12, 3, 21, 39, 187, 48, 21, 182, 150, 236, 21, 144, 130, 3, 214, 244, 233, 253, 214, 159, 143, 157, 3, 49, 9, 386, 21, 89, 84, 3, 453, 102, 148, 3, 607, 260, 315],
                j: [585, 767, 160, 241, 412, 548, 307, 397, 184, 663, 530, 224, 676, 540, 540, 425, 351, 211, 684, 200]
            }, {
                id: 78,
                r: 431,
                q: 431,
                d: [0, 0, 294, 335, 294, 0, 297, 336, 0, 335, 291, 252, 591, 0, 307, 293, 0, 587, 276, 224],
                j: [53, 6, 51, 3, 55, 78, 47, 57, 63, 98]
            }, {
                id: 79,
                r: 833,
                q: 250,
                d: [0, 0, 194, 127, 0, 127, 201, 103,
                    0, 230, 204, 96, 0, 326, 193, 142, 0, 468, 194, 111
                ],
                j: [319, 69, 316, 81, 314, 87, 319, 55, 319, 77]
            }, {
                id: 80,
                r: 833,
                q: 250,
                d: [0, 0, 302, 123, 302, 0, 319, 99, 621, 0, 322, 95, 302, 99, 292, 136, 0, 123, 302, 111],
                j: [268, 70, 260, 85, 258, 87, 273, 58, 268, 77]
            }, {
                id: 108,
                d: [0, 0, 198, 194, 0, 194, 198, 194, 0, 388, 198, 194]
            }, {
                id: 111,
                d: [0, 0, 202, 81],
                j: [316, 87],
                r: 833,
                q: 250
            }, {
                id: 112,
                d: [0, 0, 319, 83],
                j: [260, 87],
                r: 833,
                q: 250
            }, {
                id: 113,
                d: [0, 0, 444, 86],
                j: [195, 81],
                r: 833,
                q: 250
            }, {
                id: 114,
                d: [0, 0, 559, 89],
                j: [137, 77],
                r: 833,
                q: 250
            }, {
                id: 115,
                d: [0, 0, 101, 102, 0, 102, 101, 102, 0, 204, 101, 102,
                    0, 306, 101, 102
                ],
                j: [219, 29, 218, 29, 219, 29, 219, 29],
                r: 534,
                q: 160
            }, {
                id: 116,
                r: 275,
                q: 275,
                d: [0, 0, 4, 4, 2, 2, 89, 116, 95, 2, 177, 37, 276, 2, 187, 77, 95, 43, 87, 61],
                j: [143, 196, 93, 75, 50, 84, 45, 39, 95, 35]
            }, {
                id: 117,
                r: 25,
                q: 25,
                d: [0, 0, 25, 25]
            }, {
                id: q.Uj,
                d: [0, 0, 291, 302, 0, 302, 363, 409, 363, 302, 383, 309, 0, 711, 405, 492, 405, 711, 374, 330, 0, 1203, 350, 334, 0, 1537, 314, 335, 350, 1203, 326, 334, 291, 0, 339, 288, 630, 0, 275, 162, 350, 1537, 372, 317],
                j: [173, 274, 137, 156, 133, 207, 107, 104, 134, 240, 148, 242, 152, 237, 154, 244, 145, 259, 181, 392, 123, 236],
                r: 640,
                q: 640
            }, {
                id: q.rc,
                d: [1, 1, 1064, 1064, 1067, 1, 532, 495, 1601, 1, 145, 286, 1601, 289, 38, 38, 1748, 1, 204, 174, 1748, 177, 183, 154],
                j: [55, 154, 55, 686, 442, 543, 568, 667, 484, 1083, 493, 1093],
                r: 1174,
                q: 1498
            }, {
                id: q.pc,
                R: 1,
                d: [1, 1, 201, 207, 1, 210, 201, 205, 1, 417, 201, 206, 1, 625, 201, 207, 1, 834, 201, 207, 1, 1043, 201, 211, 1, 1256, 201, 214, 1, 1472, 201, 218, 1, 1692, 201, 220, 204, 1, 201, 222, 204, 225, 201, 224, 204, 451, 201, 224, 204, 677, 201, 225, 204, 904, 201, 226, 204, 1132, 201, 226, 407, 1, 201, 221, 610, 1, 201, 217, 813, 1, 201, 213, 1016, 1, 201, 210, 407, 225, 204, 225, 1219, 1, 203, 213, 1424, 1, 201, 210,
                    1627, 1, 201, 207, 1830, 1, 201, 203, 204, 1360, 201, 200, 204, 1562, 201, 200, 204, 1764, 201, 200, 613, 225, 201, 200, 816, 225, 201, 208, 1019, 225, 201, 216, 1222, 225, 204, 193, 1428, 225, 221, 171, 1651, 225, 249, 196, 407, 452, 225, 197, 407, 651, 205, 204, 407, 857, 201, 216, 407, 1075, 202, 222, 407, 1299, 202, 225, 407, 1526, 205, 224, 407, 1752, 223, 213, 634, 452, 242, 203, 1, 1914, 153, 86, 1902, 225, 140, 89, 878, 452, 218, 201, 634, 657, 211, 205, 634, 864, 205, 210, 634, 1076, 211, 214, 847, 657, 214, 217, 847, 876, 220, 223, 1063, 657, 224, 216, 1289, 657, 219, 212, 634, 1292, 195, 206, 634, 1500, 195,
                    207, 634, 1709, 195, 211, 1510, 657, 217, 214, 1729, 657, 225, 215, 847, 1101, 219, 215, 847, 1318, 195, 215, 847, 1535, 195, 215, 847, 1752, 195, 215, 1069, 876, 217, 215, 1288, 876, 225, 215, 1069, 1093, 224, 219, 1069, 1314, 219, 222, 1069, 1538, 215, 225, 1069, 1765, 215, 217, 1515, 876, 210, 205, 1098, 452, 218, 201, 1318, 452, 206, 193, 1526, 452, 201, 195, 1727, 876, 201, 206, 1295, 1093, 204, 212, 1295, 1307, 206, 214, 1503, 1307, 208, 215, 1503, 1524, 208, 216, 1501, 1093, 206, 205, 1729, 452, 206, 191, 1709, 1093, 204, 194, 1295, 1523, 202, 206, 1295, 1731, 202, 214, 1503, 1742, 203, 217, 1713, 1524,
                    204, 216, 1713, 1307, 204, 212, 1713, 1742, 204, 204
                ],
                j: [220, 227, 220, 228, 220, 228, 220, 227, 220, 227, 220, 223, 220, 220, 220, 216, 220, 214, 220, 212, 220, 210, 220, 210, 220, 209, 220, 208, 220, 208, 220, 213, 220, 217, 220, 221, 220, 224, 217, 209, 218, 221, 219, 224, 219, 227, 219, 231, 219, 234, 219, 234, 219, 234, 219, 234, 219, 226, 219, 218, 218, 241, 210, 263, 191, 238, 203, 237, 216, 230, 220, 218, 219, 212, 219, 209, 216, 210, 204, 221, 195, 231, 240, 264, 249, 265, 210, 232, 216, 228, 218, 223, 211, 220, 208, 216, 204, 211, 201, 218, 207, 222, 231, 228, 231, 227, 231, 223, 209, 220, 201, 219, 207, 219,
                    231, 219, 231, 219, 231, 219, 209, 219, 201, 219, 201, 215, 204, 212, 207, 209, 208, 217, 216, 228, 210, 232, 215, 240, 220, 238, 220, 227, 217, 221, 215, 219, 213, 218, 213, 217, 215, 228, 215, 242, 217, 239, 219, 226, 220, 218, 220, 215, 220, 216, 219, 220, 218, 229
                ],
                r: 640,
                q: 640
            }, {
                id: q.pf,
                R: 1,
                d: [1, 1, 213, 196, 1, 199, 207, 209, 1, 410, 197, 232, 1, 644, 186, 246, 1, 892, 181, 246, 1, 1140, 186, 244, 1, 1386, 195, 232, 1, 1620, 200, 229, 210, 199, 200, 219, 210, 420, 200, 221, 210, 643, 200, 224, 210, 869, 200, 227, 210, 1098, 200, 229, 210, 1329, 200, 229, 210, 1560, 200, 229, 210, 1791, 195, 234, 412, 199, 190,
                    238, 604, 199, 194, 230, 800, 199, 202, 215, 1004, 199, 207, 207, 1213, 199, 225, 202, 1440, 199, 213, 205, 1655, 199, 195, 209, 1852, 199, 189, 213, 412, 439, 190, 217, 604, 439, 193, 221, 799, 439, 198, 213, 999, 439, 203, 208, 1204, 439, 207, 202, 1413, 439, 211, 204, 1626, 439, 215, 207, 604, 662, 216, 210, 604, 874, 216, 211, 604, 1087, 216, 211, 604, 1300, 216, 211, 604, 1513, 216, 211, 604, 1726, 216, 211, 822, 662, 216, 211, 1040, 662, 216, 211, 1258, 662, 216, 211, 1476, 662, 216, 211, 822, 875, 212, 215, 822, 1092, 205, 222, 822, 1316, 202, 225, 822, 1543, 205, 220, 1694, 662, 210, 211, 1036, 875, 213, 207,
                    1843, 439, 201, 207, 822, 1765, 198, 222, 1036, 1084, 195, 232, 1036, 1318, 195, 235, 1233, 1084, 199, 236, 1233, 1322, 206, 238, 1434, 1084, 211, 226, 1251, 875, 217, 207, 216, 1, 213, 195, 431, 1, 212, 179, 645, 1, 221, 178, 868, 1, 221, 180, 1091, 1, 215, 180, 1308, 1, 212, 179, 1522, 1, 221, 177, 1745, 1, 221, 180, 1470, 875, 215, 180, 1687, 875, 212, 179, 1647, 1084, 221, 177, 1441, 1322, 221, 180, 1664, 1322, 215, 180, 1441, 1504, 212, 179, 1655, 1504, 216, 176, 1655, 1682, 213, 174, 1036, 1555, 193, 204, 412, 658, 188, 237, 1036, 1761, 194, 233, 1441, 1685, 210, 202, 1, 1851, 205, 194, 1233, 1562, 202, 204
                ],
                j: [214, 238, 217, 225, 222, 202, 228, 188, 230, 188, 227, 190, 222, 202, 219, 205, 219, 215, 219, 213, 219, 210, 219, 207, 219, 205, 219, 205, 219, 205, 222, 200, 225, 196, 223, 204, 219, 219, 216, 227, 207, 232, 213, 229, 223, 224, 226, 221, 226, 216, 224, 212, 221, 220, 219, 225, 217, 231, 215, 229, 213, 226, 213, 223, 213, 222, 213, 222, 213, 222, 213, 222, 213, 222, 213, 222, 213, 222, 213, 222, 213, 222, 215, 218, 218, 211, 219, 208, 218, 213, 215, 222, 214, 226, 219, 227, 221, 211, 223, 201, 222, 198, 220, 197, 218, 195, 215, 206, 210, 225, 212, 238, 212, 254, 206, 255, 206, 253, 209, 253, 212, 254, 206, 256, 206,
                    253, 209, 253, 212, 254, 206, 256, 206, 253, 209, 253, 212, 254, 210, 257, 213, 259, 226, 228, 229, 195, 225, 199, 214, 232, 217, 240, 219, 230
                ],
                r: 640,
                q: 640
            }, {
                id: q.$h,
                R: 1,
                d: [1, 1, 222, 196, 1, 199, 209, 201, 1, 402, 203, 209, 1, 613, 197, 215, 1, 830, 193, 218, 1, 1050, 194, 219, 200, 613, 197, 210, 206, 402, 201, 202, 212, 199, 204, 198, 196, 830, 208, 200, 197, 1050, 212, 204, 1, 1271, 215, 207, 1, 1480, 216, 208],
                j: [211, 238, 216, 233, 219, 225, 222, 219, 224, 216, 224, 215, 222, 224, 220, 232, 219, 236, 217, 235, 215, 231, 213, 228, 213, 227],
                r: 640,
                q: 640
            }, {
                id: q.xr,
                R: 1.25,
                Ga: !0,
                d: [0, 0, 2048, 1152],
                j: [0, 0],
                r: 2048,
                q: 2305
            }, {
                id: q.yr,
                R: 1.25,
                Ga: !0,
                d: [0, 0, 2048, 708],
                j: [0, 896],
                r: 2048,
                q: 2305
            }, {
                id: q.zr,
                R: 1.25,
                Ga: !0,
                d: [0, 0, 2048, 1152],
                j: [0, 0],
                r: 2048,
                q: 2304
            }, {
                id: q.Ar,
                R: 1.25,
                Ga: !0,
                d: [0, 0, 2048, 874],
                j: [0, 835],
                r: 2048,
                q: 2304
            }, {
                id: q.Br,
                R: 1.25,
                Ga: !0,
                d: [0, 0, 2048, 1152],
                j: [0, 0],
                r: 2048,
                q: 2304
            }, {
                id: q.Cr,
                R: 1.25,
                Ga: !0,
                d: [0, 0, 2048, 1052],
                j: [0, 756],
                r: 2048,
                q: 2304
            }, {
                id: q.Dr,
                R: 1.25,
                Ga: !0,
                d: [0, 0, 2048, 1152],
                j: [0, 0],
                r: 2048,
                q: 2304
            }, {
                id: q.Er,
                R: 1.25,
                Ga: !0,
                d: [0, 0, 2048, 1072],
                j: [0, 768],
                r: 2048,
                q: 2304
            }, {
                id: q.Fr,
                R: 1.25,
                Ga: !0,
                d: [0, 0, 2048,
                    1152
                ],
                j: [0, 0],
                r: 2048,
                q: 2304
            }, {
                id: q.Gr,
                R: 1.25,
                Ga: !0,
                d: [0, 0, 2048, 1124],
                j: [0, 624],
                r: 2048,
                q: 2304
            }, {
                id: q.Hr,
                R: 1.25,
                Ga: !0,
                d: [0, 0, 2048, 1152],
                j: [0, 0],
                r: 2048,
                q: 1866
            }, {
                id: q.Ir,
                R: 1.25,
                Ga: !0,
                d: [0, 0, 2048, 948],
                j: [0, 760],
                r: 2048,
                q: 1866
            }, {
                id: q.Jr,
                R: 1.25,
                Ga: !0,
                d: [0, 0, 2048, 1152],
                j: [0, 0],
                r: 2048,
                q: 2304
            }, {
                id: q.Kr,
                R: 1.25,
                Ga: !0,
                d: [0, 0, 2048, 886],
                j: [0, 881],
                r: 2048,
                q: 2304
            }, {
                id: q.tm,
                R: 1.25,
                Ga: !0,
                d: [0, 0, 2048, 1152, 0, 0, 4, 3],
                j: [0, 0, 1028.5, 581],
                r: 2048,
                q: 2304
            }, {
                id: q.Lr,
                R: 1.25,
                Ga: !0,
                d: [0, 0, 2048, 642, 0, 0, 4, 3],
                j: [0, 889, 1028.5, 581],
                r: 2048,
                q: 2304
            }, {
                id: q.Mr,
                R: 1.25,
                Ga: !0,
                d: [0, 0, 2048, 1152],
                j: [0, 0],
                r: 2048,
                q: 2304
            }, {
                id: q.Nr,
                R: 1.25,
                Ga: !0,
                d: [0, 0, 2048, 858],
                j: [0, 780],
                r: 2048,
                q: 1638
            }, {
                id: q.Or,
                R: 1.25,
                Ga: !0,
                d: [0, 0, 2048, 1152],
                j: [0, 0],
                r: 2048,
                q: 2304
            }, {
                id: q.Pr,
                R: 1.25,
                Ga: !0,
                d: [0, 0, 2048, 887],
                j: [0, 792],
                r: 2048,
                q: 2304
            }, {
                id: q.Qr,
                R: 1.25,
                Ga: !0,
                d: [0, 0, 2048, 1153],
                j: [0, -1],
                r: 2048,
                q: 2304
            }, {
                id: q.Rr,
                R: 1.25,
                Ga: !0,
                d: [0, 0, 2048, 980],
                j: [0, 802],
                r: 2048,
                q: 2304
            }, {
                id: q.Sr,
                R: 1.25,
                Ga: !0,
                d: [0, 0, 2048, 1152],
                j: [0, 0],
                r: 2048,
                q: 1866
            }, {
                id: q.Jm,
                R: 1.25,
                Ga: !0,
                d: [0, 0, 2048, 1152],
                j: [0, 0],
                r: 2048,
                q: 1866
            }, {
                id: q.Km,
                R: 1.25,
                Ga: !0,
                d: [0, 0, 2048, 1152],
                j: [0, 0],
                r: 2048,
                q: 1866
            }, {
                id: q.Lm,
                R: 1.25,
                Ga: !0,
                d: [0, 0, 2048, 1152],
                j: [0, 0],
                r: 2048,
                q: 1866
            }, {
                id: q.Mm,
                R: 1.25,
                Ga: !0,
                d: [0, 0, 2048, 1152],
                j: [0, 0],
                r: 2048,
                q: 1866
            }, {
                id: q.Nm,
                R: 1.25,
                Ga: !0,
                d: [0, 0, 2048, 1152],
                j: [0, 0],
                r: 2048,
                q: 1866
            }, {
                id: q.Om,
                R: 1.25,
                Ga: !0,
                d: [0, 0, 2048, 1152],
                j: [0, 0],
                r: 2048,
                q: 1866
            }].concat([{
                    id: q.ck,
                    R: 1.5,
                    d: [0, 0, 241, 298, 0, 298, 216, 194, 0, 492, 197, 241, 0, 733, 221, 205, 0, 938, 238, 190, 0, 1128, 234, 187],
                    j: [86, 85, 101, 178, 105, 137, 106, 152, 92, 165, 90, 170],
                    r: 410,
                    q: 410
                },
                {
                    id: q.Qg,
                    R: 0.6,
                    d: [0, 0, 372, 324, 0, 324, 357, 328, 0, 652, 323, 354, 0, 1006, 306, 377, 0, 1383, 316, 375, 0, 1758, 335, 362, 0, 2120, 355, 348, 357, 324, 367, 342, 724, 324, 365, 341, 1089, 324, 363, 341, 1452, 324, 362, 342, 1814, 324, 361, 342, 2175, 324, 361, 342, 2536, 324, 361, 342, 2897, 324, 361, 342, 3258, 324, 361, 342, 3619, 324, 361, 342, 357, 666, 361, 342, 357, 1008, 361, 342, 357, 1350, 361, 342, 357, 1692, 361, 342, 0, 2468, 341, 351, 0, 2819, 330, 366, 0, 3185, 325, 376, 0, 3561, 331, 359, 357, 2034, 359, 339, 718, 666, 371, 334, 1089, 666, 371, 332, 357, 2373, 318, 359, 357, 2732, 314, 390, 357,
                        3122, 314, 403, 357, 3525, 320, 399, 718, 1E3, 332, 388, 1050, 1E3, 360, 372, 1410, 1E3, 376, 371, 1786, 1E3, 379, 367, 2165, 1E3, 383, 360, 2548, 1E3, 393, 355, 2941, 1E3, 389, 357, 3330, 1E3, 384, 364, 3714, 1E3, 381, 362, 1050, 1372, 394, 354, 1050, 1726, 390, 356, 1050, 2082, 384, 364, 1050, 2446, 381, 362, 1050, 2808, 394, 354, 1050, 3162, 390, 356, 1050, 3518, 383, 364, 1444, 1372, 381, 362, 1825, 1372, 399, 348, 2224, 1372, 390, 353, 1444, 1734, 343, 379, 1444, 2113, 337, 382, 718, 1388, 325, 373, 372, 0, 358, 323, 730, 0, 362, 318, 1460, 666, 366, 327
                    ],
                    j: [224, 267, 233, 263, 252, 237, 260, 214, 254, 216,
                        244, 229, 234, 243, 228, 249, 229, 250, 230, 250, 230, 249, 231, 249, 231, 249, 231, 249, 231, 249, 231, 249, 231, 249, 231, 249, 231, 249, 231, 249, 231, 249, 243, 240, 248, 225, 250, 215, 247, 232, 231, 252, 225, 257, 225, 259, 255, 232, 257, 200, 256, 187, 253, 191, 249, 201, 246, 216, 238, 217, 241, 223, 241, 230, 230, 235, 231, 233, 235, 226, 241, 228, 230, 236, 231, 234, 235, 226, 241, 228, 230, 236, 231, 234, 236, 226, 241, 228, 237, 242, 242, 237, 263, 209, 267, 205, 261, 215, 222, 268, 223, 273, 224, 264
                    ],
                    r: 820,
                    q: 820
                }, {
                    id: q.nf,
                    R: 0.6,
                    d: [0, 0, 370, 332, 0, 332, 370, 335, 0, 667, 367, 339, 0, 1006, 363, 344,
                        0, 1350, 359, 349, 0, 1699, 354, 354, 0, 2053, 349, 358, 0, 2411, 345, 360, 0, 2771, 343, 361, 0, 3132, 342, 360, 0, 3492, 343, 361, 370, 332, 346, 362, 716, 332, 349, 362, 1065, 332, 353, 362, 1418, 332, 356, 355, 1774, 332, 361, 348, 2135, 332, 364, 342, 2499, 332, 367, 337, 2866, 332, 369, 333, 370, 0, 399, 323, 769, 0, 373, 322, 370, 694, 361, 367, 731, 694, 381, 408, 731, 1102, 400, 413, 1112, 694, 410, 406, 1522, 694, 420, 396, 1942, 694, 409, 389, 2351, 694, 367, 386, 370, 1061, 355, 384, 2718, 694, 363, 384, 3081, 694, 402, 385, 3483, 694, 416, 385, 1131, 1102, 403, 385, 731, 1515, 369, 385, 731, 1900, 362, 385,
                        731, 2285, 368, 385, 1534, 1102, 403, 385, 1131, 1487, 417, 386, 1131, 1873, 417, 391, 1131, 2264, 414, 394, 731, 2670, 396, 410, 731, 3080, 384, 388, 1142, 0, 385, 330, 1527, 0, 401, 323, 1928, 0, 375, 322, 3235, 332, 370, 334, 3605, 332, 360, 344, 370, 1445, 360, 353, 731, 3468, 364, 358, 1937, 1102, 365, 352, 2302, 1102, 364, 347, 2303, 0, 365, 332, 2668, 0, 375, 322, 2666, 1102, 369, 338, 370, 1798, 359, 349, 3035, 1102, 364, 359, 3399, 1102, 367, 364, 1131, 2658, 367, 356, 1131, 3014, 363, 346, 1131, 3360, 365, 334
                    ],
                    j: [225, 259, 225, 256, 227, 252, 229, 247, 231, 242, 234, 237, 237, 233, 239, 231, 240, 230,
                        240, 231, 240, 230, 238, 229, 236, 229, 234, 229, 232, 236, 230, 243, 228, 249, 226, 254, 226, 258, 206, 267, 229, 268, 240, 223, 233, 182, 232, 177, 227, 185, 220, 195, 229, 202, 263, 205, 270, 207, 265, 207, 229, 206, 216, 206, 229, 206, 263, 206, 270, 206, 264, 206, 229, 206, 216, 205, 217, 200, 222, 197, 228, 180, 228, 203, 223, 260, 206, 267, 223, 269, 231, 257, 244, 247, 246, 238, 244, 233, 241, 239, 240, 244, 236, 259, 223, 269, 219, 253, 215, 241, 212, 231, 211, 225, 212, 233, 215, 244, 219, 257
                    ],
                    r: 820,
                    q: 820
                }, {
                    id: q.of,
                    R: 0.6,
                    d: [0, 0, 372, 315, 0, 315, 344, 322, 0, 637, 326, 336, 0, 973, 316, 359, 316, 973,
                        311, 352, 627, 973, 317, 352, 944, 973, 330, 337, 326, 637, 335, 327, 661, 637, 337, 328, 998, 637, 342, 329, 1340, 637, 347, 330, 1687, 637, 351, 332, 1274, 973, 353, 334, 344, 315, 400, 321, 1627, 973, 366, 328, 0, 1332, 329, 349, 0, 1681, 323, 370, 0, 2051, 323, 375, 0, 2426, 323, 371, 323, 1681, 328, 360, 329, 1332, 358, 341, 687, 1332, 389, 326, 372, 0, 340, 315, 1076, 1332, 333, 336, 0, 2797, 316, 373, 0, 3170, 299, 415, 0, 3585, 290, 432, 323, 2051, 298, 414, 621, 2051, 315, 394, 936, 2051, 333, 382, 1269, 2051, 330, 386, 1599, 2051, 327, 389, 323, 2465, 324, 393, 323, 2858, 324, 393, 323, 3251, 324, 393, 323,
                        3644, 324, 393, 647, 2465, 324, 393, 971, 2465, 325, 389, 1296, 2465, 323, 383, 1619, 2465, 327, 377, 651, 1681, 344, 351, 1409, 1332, 340, 341
                    ],
                    j: [221, 276, 237, 269, 250, 255, 255, 232, 258, 239, 252, 239, 244, 254, 240, 264, 241, 264, 239, 263, 237, 262, 235, 260, 234, 258, 206, 270, 226, 263, 246, 242, 252, 221, 251, 216, 251, 220, 247, 231, 227, 250, 212, 265, 243, 276, 247, 255, 255, 218, 264, 176, 269, 159, 264, 177, 254, 197, 245, 209, 246, 205, 247, 202, 249, 198, 249, 198, 249, 198, 249, 198, 249, 198, 249, 202, 250, 208, 247, 214, 237, 240, 238, 250],
                    r: 820,
                    q: 820
                }, {
                    id: q.me,
                    R: 0.6,
                    d: [0, 0, 379, 362,
                        379, 0, 359, 342, 738, 0, 349, 337, 1087, 0, 359, 333, 1446, 0, 373, 326, 0, 362, 384, 321, 0, 683, 379, 321, 0, 1004, 375, 321, 0, 1325, 373, 321, 0, 1646, 367, 334, 384, 362, 359, 347, 743, 362, 386, 311, 1129, 362, 407, 284, 1536, 362, 244, 138, 1819, 0, 223, 143
                    ],
                    j: [217, 229, 226, 249, 230, 254, 225, 258, 219, 265, 215, 270, 217, 270, 219, 270, 220, 270, 224, 257, 229, 244, 216, 280, 204, 307, 284, 318, 298, 320],
                    r: 820,
                    q: 820
                }, {
                    id: q.Tg,
                    R: 0.6,
                    d: [0, 0, 455, 384, 0, 384, 449, 408, 0, 792, 418, 457, 0, 1249, 413, 525, 0, 1774, 398, 534, 0, 2308, 403, 521, 0, 2829, 404, 507, 0, 3336, 417, 496, 449, 384, 425, 492, 874,
                        384, 432, 488, 874, 872, 430, 492, 874, 1364, 428, 495, 449, 876, 425, 499, 449, 1375, 425, 505, 449, 1880, 425, 512, 449, 2392, 425, 516, 449, 2908, 425, 508, 449, 3416, 425, 498, 874, 1859, 425, 494, 874, 2353, 425, 494, 874, 2847, 425, 494, 1306, 384, 426, 488, 874, 3341, 415, 490, 1304, 872, 404, 533, 1708, 872, 408, 505, 1732, 384, 401, 467, 2133, 384, 440, 431, 2573, 384, 401, 467, 2116, 872, 377, 516, 1304, 1405, 362, 546, 1304, 1951, 345, 556, 1304, 2507, 344, 546, 2493, 872, 366, 521, 2859, 872, 388, 517, 3247, 872, 399, 516, 3646, 872, 403, 500, 2974, 384, 414, 480, 3388, 384, 429, 472, 1666, 1405, 429,
                        479, 1666, 1884, 426, 485, 1666, 2369, 426, 489, 2092, 1884, 435, 486, 2527, 1884, 429, 481, 1666, 2858, 426, 482, 1666, 3340, 426, 486, 2092, 2370, 435, 487, 2956, 1884, 429, 486, 3385, 1884, 425, 484, 2092, 2857, 426, 485, 2095, 1405, 433, 446, 2528, 1405, 427, 431, 1304, 3053, 358, 512, 2092, 3342, 346, 550, 2527, 2370, 364, 536, 2955, 1405, 433, 447, 3388, 1405, 420, 460, 2891, 2370, 409, 463
                    ],
                    j: [213, 207, 204, 183, 208, 134, 210, 66, 217, 57, 222, 70, 230, 84, 221, 95, 217, 99, 213, 103, 213, 99, 213, 96, 213, 92, 213, 94, 213, 96, 213, 97, 213, 97, 213, 97, 213, 97, 213, 97, 213, 97, 213, 103, 219, 101, 218,
                        58, 219, 86, 236, 124, 211, 161, 234, 124, 233, 74, 233, 44, 245, 34, 253, 43, 249, 68, 245, 71, 237, 71, 240, 89, 240, 110, 229, 118, 230, 125, 234, 117, 240, 110, 229, 119, 230, 126, 234, 120, 240, 114, 229, 118, 230, 121, 235, 118, 240, 115, 236, 147, 242, 164, 262, 76, 251, 37, 243, 52, 207, 146, 217, 131, 226, 128
                    ],
                    r: 820,
                    q: 820
                }, {
                    id: q.rf,
                    R: 0.6,
                    d: [0, 0, 401, 466, 401, 0, 403, 466, 401, 466, 405, 467, 401, 933, 405, 470, 401, 1403, 404, 475, 0, 466, 396, 481, 0, 947, 388, 487, 0, 1434, 381, 492, 0, 1926, 375, 494, 0, 2420, 371, 495, 0, 2915, 370, 495, 0, 3410, 370, 496, 401, 1878, 370, 493, 401, 2371, 372, 489, 401,
                        2860, 374, 485, 401, 3345, 381, 479, 806, 466, 387, 473, 1193, 466, 394, 469, 1587, 466, 398, 467, 804, 0, 436, 398, 1240, 0, 446, 442, 806, 939, 420, 523, 806, 1462, 413, 548, 1226, 939, 424, 521, 1650, 939, 440, 506, 2090, 939, 458, 490, 2548, 939, 459, 480, 806, 2010, 416, 477, 806, 2487, 412, 481, 806, 2968, 408, 486, 3007, 939, 444, 491, 3451, 939, 458, 495, 1226, 1460, 449, 493, 806, 3454, 410, 492, 1226, 1953, 410, 490, 1226, 2443, 410, 489, 1226, 2932, 445, 489, 1675, 1460, 461, 484, 1675, 1944, 456, 490, 1226, 3421, 449, 495, 1675, 2434, 439, 500, 1985, 466, 430, 473, 1686, 0, 413, 408, 2099, 0, 436, 398,
                        2415, 466, 418, 470, 2535, 0, 417, 462, 2952, 0, 415, 456, 3367, 0, 396, 463, 2136, 1460, 389, 478, 2525, 1460, 387, 475, 2833, 466, 387, 472, 3220, 466, 388, 470, 3608, 466, 418, 470, 2912, 1460, 420, 466, 3332, 1460, 420, 462, 1675, 2934, 411, 475, 1675, 3409, 408, 487, 2131, 1944, 399, 486, 2530, 1944, 395, 483, 2925, 1944, 397, 476
                    ],
                    j: [235, 125, 235, 124, 235, 123, 236, 120, 237, 115, 241, 109, 245, 103, 248, 98, 251, 96, 252, 95, 252, 94, 252, 94, 252, 97, 251, 101, 250, 105, 246, 111, 243, 117, 239, 121, 236, 123, 216, 192, 208, 148, 231, 67, 237, 42, 232, 69, 227, 85, 222, 101, 231, 111, 270, 114, 270, 110,
                        270, 105, 235, 100, 222, 96, 231, 98, 270, 99, 270, 101, 270, 102, 235, 102, 222, 107, 222, 101, 226, 96, 231, 90, 232, 117, 246, 182, 216, 192, 220, 130, 223, 135, 226, 137, 241, 128, 243, 113, 241, 116, 239, 119, 244, 124, 220, 130, 213, 130, 207, 130, 206, 115, 198, 102, 201, 103, 211, 107, 225, 117
                    ],
                    r: 820,
                    q: 820
                }, {
                    id: q.sf,
                    R: 0.6,
                    d: [0, 0, 425, 352, 0, 352, 410, 396, 0, 748, 365, 455, 0, 1203, 339, 503, 0, 1706, 354, 492, 0, 2198, 383, 470, 410, 352, 411, 447, 0, 2668, 395, 434, 0, 3102, 384, 440, 0, 3542, 385, 445, 410, 799, 387, 448, 821, 352, 388, 447, 1209, 352, 388, 446, 1597, 352, 388, 444, 1985, 352, 388, 443,
                        797, 799, 447, 467, 797, 1266, 426, 461, 797, 1727, 399, 454, 797, 2181, 396, 448, 797, 2629, 407, 469, 797, 3098, 396, 475, 797, 3573, 405, 471, 1244, 799, 429, 475, 1673, 799, 445, 465, 425, 0, 426, 337, 2373, 352, 420, 397, 410, 1247, 378, 508, 410, 1755, 336, 578, 410, 2333, 332, 559, 410, 2892, 356, 528, 1244, 1274, 392, 499, 410, 3420, 382, 483, 1244, 1773, 370, 490, 1244, 2263, 371, 495, 1244, 2758, 372, 499, 1244, 3257, 376, 498, 1636, 1274, 376, 496, 2012, 1274, 376, 495, 2388, 1274, 376, 493, 2764, 1274, 373, 485, 2118, 799, 375, 471, 2493, 799, 361, 467, 2793, 352, 372, 431, 3165, 352, 412, 415
                    ],
                    j: [227,
                        254, 228, 214, 244, 140, 255, 98, 247, 109, 236, 131, 227, 154, 237, 167, 237, 161, 237, 156, 237, 153, 237, 154, 237, 155, 237, 157, 237, 158, 186, 124, 206, 130, 236, 137, 244, 145, 239, 129, 244, 124, 230, 120, 203, 116, 189, 126, 226, 254, 218, 194, 231, 83, 258, 21, 269, 34, 262, 63, 245, 92, 249, 108, 251, 101, 251, 96, 251, 92, 249, 93, 249, 95, 249, 96, 249, 98, 254, 106, 252, 120, 257, 124, 249, 160, 239, 176
                    ],
                    r: 820,
                    q: 820
                }, {
                    id: q.ne,
                    R: 0.6,
                    d: [0, 0, 431, 401, 0, 401, 406, 420, 0, 821, 385, 426, 0, 1247, 400, 427, 406, 401, 421, 422, 827, 401, 437, 419, 1264, 401, 432, 417, 406, 823, 427, 415, 406, 1238, 421,
                        413, 833, 823, 406, 429, 833, 1252, 382, 439, 1239, 823, 445, 428, 431, 0, 472, 374, 903, 0, 244, 138, 903, 138, 223, 143
                    ],
                    j: [205, 190, 217, 171, 231, 166, 223, 165, 213, 170, 206, 173, 208, 175, 209, 177, 211, 179, 218, 162, 236, 153, 196, 164, 190, 217, 284, 318, 298, 320],
                    r: 820,
                    q: 820
                }, {
                    id: q.Ug,
                    R: 0.6,
                    d: [0, 0, 434, 356, 0, 356, 418, 377, 0, 733, 382, 422, 0, 1155, 368, 430, 0, 1585, 375, 432, 0, 2017, 393, 428, 0, 2445, 411, 422, 418, 356, 420, 423, 0, 2867, 416, 423, 0, 3290, 410, 423, 838, 356, 406, 423, 1244, 356, 406, 423, 1650, 356, 406, 423, 2056, 356, 406, 423, 2462, 356, 406, 423, 2868, 356, 406, 423,
                        3274, 356, 406, 423, 3680, 356, 406, 423, 418, 779, 406, 423, 418, 1202, 406, 423, 418, 1625, 406, 423, 418, 2048, 399, 427, 418, 2475, 380, 441, 418, 2916, 371, 445, 418, 3361, 387, 436, 824, 779, 401, 399, 1225, 779, 417, 385, 1642, 779, 405, 395, 824, 1178, 374, 432, 824, 1610, 361, 449, 824, 2059, 364, 449, 824, 2508, 362, 447, 824, 2955, 373, 432, 1198, 1178, 394, 412, 1592, 1178, 406, 400, 2047, 779, 393, 396, 2440, 779, 393, 393, 2833, 779, 396, 389, 3229, 779, 397, 390, 3626, 779, 394, 393, 1998, 1178, 394, 393, 2392, 1178, 396, 389, 2788, 1178, 396, 390, 3184, 1178, 394, 393, 3578, 1178, 394, 393, 1198,
                        1590, 394, 389, 1592, 1590, 396, 390, 1198, 1979, 394, 393, 1198, 2372, 394, 393, 0, 3713, 391, 378, 1198, 2765, 384, 374, 1198, 3139, 379, 421, 824, 3387, 360, 438, 1198, 3560, 379, 431, 1988, 1590, 439, 377, 2427, 1590, 425, 387, 2852, 1590, 415, 390
                    ],
                    j: [188, 235, 196, 214, 214, 169, 221, 161, 218, 159, 210, 163, 201, 169, 197, 168, 199, 168, 202, 168, 204, 168, 204, 168, 204, 168, 204, 168, 204, 168, 204, 168, 204, 168, 204, 168, 204, 168, 204, 168, 204, 168, 207, 164, 216, 150, 221, 146, 215, 155, 207, 192, 199, 206, 204, 196, 219, 159, 225, 141, 223, 141, 222, 143, 220, 157, 216, 176, 222, 188, 225, 194, 227,
                        197, 228, 201, 227, 200, 230, 197, 230, 197, 228, 201, 228, 200, 230, 197, 230, 197, 230, 201, 228, 200, 230, 197, 230, 197, 237, 212, 242, 216, 245, 167, 242, 149, 230, 157, 190, 214, 196, 204, 200, 201
                    ],
                    r: 820,
                    q: 820
                }, {
                    id: q.tf,
                    R: 0.6,
                    d: [0, 0, 404, 395, 404, 0, 405, 395, 0, 395, 405, 397, 0, 792, 404, 401, 0, 1193, 400, 406, 0, 1599, 396, 411, 0, 2010, 391, 416, 0, 2426, 388, 420, 0, 2846, 385, 422, 0, 3268, 385, 422, 405, 395, 384, 422, 789, 395, 385, 421, 1174, 395, 386, 418, 1560, 395, 388, 414, 1948, 395, 392, 409, 0, 3690, 396, 404, 2340, 395, 400, 400, 2740, 395, 403, 397, 3143, 395, 404, 396, 809, 0, 445, 363,
                        1254, 0, 429, 383, 789, 816, 390, 433, 789, 1249, 390, 452, 1179, 816, 396, 449, 1575, 816, 406, 440, 1981, 816, 415, 430, 2396, 816, 411, 425, 2807, 816, 407, 424, 3214, 816, 404, 424, 3618, 816, 400, 424, 1179, 1265, 407, 424, 1586, 1265, 418, 424, 1179, 1689, 407, 424, 1179, 2113, 394, 424, 1179, 2537, 394, 424, 1179, 2961, 394, 424, 1179, 3385, 403, 424, 1586, 1689, 416, 425, 1586, 2114, 412, 435, 1586, 2549, 405, 443, 1586, 2992, 396, 452, 1586, 3444, 396, 437, 1683, 0, 427, 387, 2110, 0, 445, 363, 2555, 0, 422, 386, 3547, 395, 414, 397, 2004, 1265, 410, 407, 2414, 1265, 407, 416, 2821, 1265, 406, 423, 3227,
                        1265, 409, 419, 3636, 1265, 420, 408, 2002, 1689, 421, 397, 2977, 0, 422, 386, 3399, 0, 416, 395, 2002, 2086, 409, 403, 2002, 2489, 409, 411, 2002, 2900, 408, 416, 2411, 2086, 411, 414, 2822, 2086, 418, 405, 2423, 1689, 420, 396
                    ],
                    j: [205, 196, 204, 196, 204, 194, 205, 190, 207, 185, 209, 180, 212, 175, 214, 171, 216, 169, 216, 169, 216, 169, 215, 170, 214, 173, 213, 177, 211, 182, 209, 187, 207, 191, 205, 194, 204, 195, 190, 227, 205, 207, 239, 157, 237, 138, 232, 141, 227, 151, 222, 161, 229, 166, 234, 167, 239, 167, 244, 167, 235, 167, 222, 167, 231, 167, 244, 167, 244, 167, 244, 167, 235, 167, 222, 166, 222, 156,
                        226, 148, 231, 138, 232, 153, 205, 203, 190, 227, 196, 205, 206, 194, 213, 184, 218, 175, 220, 168, 214, 172, 202, 183, 199, 194, 196, 205, 193, 196, 191, 187, 188, 179, 187, 173, 190, 175, 192, 185, 194, 195
                    ],
                    r: 820,
                    q: 820
                }, {
                    id: q.uf,
                    R: 0.6,
                    d: [0, 0, 437, 339, 0, 339, 420, 361, 0, 700, 374, 406, 0, 1106, 352, 415, 0, 1521, 361, 414, 0, 1935, 381, 412, 0, 2347, 401, 409, 0, 2756, 412, 408, 0, 3164, 408, 408, 0, 3572, 405, 408, 420, 339, 401, 408, 821, 339, 401, 408, 1222, 339, 401, 408, 1623, 339, 408, 394, 2031, 339, 406, 403, 420, 747, 404, 412, 420, 1159, 389, 422, 420, 1581, 376, 431, 420, 2012, 377, 424, 420, 2436,
                        377, 416, 2437, 339, 387, 408, 2824, 339, 398, 401, 3222, 339, 426, 348, 3648, 339, 408, 380, 420, 2852, 372, 441, 420, 3293, 348, 462, 824, 747, 346, 459, 1170, 747, 359, 445, 1529, 747, 372, 431, 1901, 747, 377, 426, 2278, 747, 375, 426, 2653, 747, 373, 426, 3026, 747, 371, 426, 3397, 747, 371, 426, 1170, 1192, 371, 426, 1170, 1618, 371, 426, 1170, 2044, 371, 426, 1170, 2470, 365, 435, 1170, 2905, 358, 444, 1541, 1192, 372, 432, 1913, 1192, 404, 393, 2317, 1192, 416, 376
                    ],
                    j: [193, 252, 201, 230, 224, 185, 236, 176, 231, 177, 220, 179, 209, 183, 202, 184, 204, 184, 205, 184, 207, 184, 207, 184, 207, 184, 205,
                        197, 206, 188, 208, 179, 215, 169, 221, 160, 221, 167, 221, 175, 216, 183, 210, 190, 191, 243, 203, 211, 219, 150, 234, 129, 236, 132, 229, 146, 222, 160, 219, 165, 220, 165, 221, 165, 222, 165, 222, 165, 222, 165, 222, 165, 222, 165, 225, 156, 229, 147, 222, 159, 206, 198, 200, 215
                    ],
                    r: 820,
                    q: 820
                }, {
                    id: q.oe,
                    R: 0.6,
                    d: [0, 0, 427, 388, 427, 0, 426, 373, 853, 0, 413, 384, 1266, 0, 420, 380, 0, 388, 432, 371, 432, 388, 439, 366, 871, 388, 439, 366, 1310, 388, 439, 366, 432, 754, 439, 366, 0, 759, 417, 381, 0, 1140, 396, 396, 0, 1536, 403, 384, 432, 1120, 403, 365, 1686, 0, 244, 138, 1686, 138, 223, 143],
                    j: [191, 203, 197,
                        218, 202, 207, 199, 211, 193, 220, 191, 225, 191, 225, 191, 225, 191, 225, 201, 210, 211, 195, 209, 207, 208, 226, 284, 318, 298, 320
                    ],
                    r: 820,
                    q: 820
                }, {
                    id: q.Vg,
                    R: 0.6,
                    d: [0, 0, 483, 406, 0, 406, 477, 426, 0, 832, 444, 464, 0, 1296, 429, 482, 0, 1778, 431, 476, 0, 2254, 444, 460, 0, 2714, 456, 444, 0, 3158, 458, 437, 0, 3595, 458, 437, 477, 406, 458, 437, 935, 406, 458, 437, 1393, 406, 458, 437, 1851, 406, 458, 437, 477, 843, 458, 440, 477, 1283, 458, 445, 477, 1728, 458, 451, 477, 2179, 458, 455, 477, 2634, 458, 451, 2309, 406, 458, 437, 2767, 406, 458, 437, 3225, 406, 458, 437, 477, 3085, 456, 447, 477, 3532, 444,
                        468, 935, 843, 442, 477, 1377, 843, 450, 462, 1827, 843, 480, 423, 483, 0, 483, 406, 2307, 843, 474, 417, 2781, 843, 454, 454, 3235, 843, 452, 472, 935, 1320, 453, 474, 935, 1794, 453, 470, 1388, 1320, 470, 452, 1858, 1320, 499, 424, 2357, 1320, 516, 411, 2873, 1320, 516, 408, 3389, 1320, 512, 409, 1388, 1772, 507, 409, 1388, 2181, 504, 411, 1895, 1772, 508, 411, 2403, 1772, 508, 410, 1388, 2592, 504, 409, 1388, 3001, 505, 411, 2911, 1772, 508, 411, 3419, 1772, 508, 410, 1388, 3412, 504, 409, 1895, 2183, 505, 411, 2400, 2183, 508, 411, 2908, 2183, 508, 410, 966, 0, 511, 393, 1477, 0, 505, 389, 1895, 2594, 468,
                        443, 935, 2264, 451, 462, 935, 2726, 444, 451, 1982, 0, 507, 394, 1895, 3037, 489, 408, 1895, 3445, 474, 413
                    ],
                    j: [169, 186, 172, 166, 189, 127, 197, 109, 196, 115, 189, 131, 182, 147, 181, 154, 181, 154, 181, 154, 181, 154, 181, 154, 181, 154, 181, 154, 181, 154, 181, 154, 181, 154, 181, 154, 181, 154, 181, 154, 181, 154, 183, 144, 190, 123, 191, 114, 186, 129, 170, 168, 169, 186, 173, 174, 183, 137, 184, 118, 183, 116, 183, 120, 176, 137, 193, 164, 183, 177, 177, 182, 174, 181, 182, 181, 186, 179, 180, 179, 180, 180, 186, 181, 185, 179, 180, 179, 180, 180, 186, 181, 185, 179, 180, 179, 180, 180, 189, 197, 193, 201,
                        200, 145, 212, 125, 214, 137, 156, 197, 165, 183, 173, 178
                    ],
                    r: 820,
                    q: 820
                }, {
                    id: q.vf,
                    R: 0.6,
                    d: [0, 0, 472, 416, 472, 0, 474, 415, 0, 416, 473, 417, 0, 833, 471, 420, 0, 1253, 467, 424, 0, 1677, 463, 429, 0, 2106, 459, 433, 0, 2539, 456, 435, 0, 2974, 456, 436, 0, 3410, 457, 436, 473, 416, 456, 437, 929, 416, 457, 436, 1386, 416, 458, 434, 1844, 416, 461, 431, 2305, 416, 465, 427, 2770, 416, 469, 422, 3239, 416, 473, 419, 473, 853, 474, 417, 946, 0, 474, 416, 1420, 0, 492, 391, 1912, 0, 484, 410, 947, 853, 477, 458, 947, 1311, 484, 474, 1431, 1311, 485, 470, 1916, 1311, 492, 461, 1424, 853, 499, 452, 1923, 853, 498, 450,
                        2421, 853, 498, 448, 2919, 853, 499, 448, 3418, 853, 499, 448, 2408, 1311, 499, 448, 2907, 1311, 499, 448, 3406, 1311, 499, 448, 1431, 1781, 499, 448, 1431, 2229, 499, 448, 1431, 2677, 499, 448, 1431, 3125, 499, 448, 1431, 3573, 499, 449, 1930, 1781, 488, 458, 947, 1785, 478, 465, 473, 1270, 469, 474, 473, 1744, 468, 462, 947, 2250, 482, 417, 2396, 0, 492, 391, 2888, 0, 477, 409, 473, 2206, 470, 420, 473, 2626, 462, 430, 473, 3056, 453, 439, 473, 3495, 447, 446, 947, 2667, 446, 443, 947, 3110, 456, 432, 947, 3542, 467, 420, 3365, 0, 477, 409, 2418, 1781, 467, 419, 2885, 1781, 457, 427, 3342, 1781, 447, 436, 1930,
                        2239, 439, 442, 1930, 2681, 433, 440, 2369, 2239, 449, 429, 2818, 2239, 464, 420
                    ],
                    j: [175, 175, 174, 176, 175, 174, 177, 171, 179, 167, 182, 162, 184, 158, 186, 156, 186, 155, 186, 155, 186, 154, 185, 155, 184, 157, 182, 160, 180, 164, 177, 169, 175, 172, 174, 174, 174, 175, 159, 200, 176, 181, 195, 133, 201, 117, 204, 121, 202, 130, 201, 139, 205, 143, 205, 144, 204, 144, 204, 144, 204, 144, 204, 144, 204, 144, 204, 144, 204, 144, 204, 144, 204, 144, 204, 143, 209, 134, 213, 126, 216, 117, 209, 129, 181, 175, 159, 200, 171, 183, 184, 172, 197, 162, 210, 153, 219, 146, 215, 149, 201, 160, 186, 172, 171, 183, 166, 173,
                        162, 164, 158, 155, 156, 148, 159, 151, 162, 162, 166, 172
                    ],
                    r: 820,
                    q: 820
                }, {
                    id: q.wf,
                    R: 0.6,
                    d: [0, 0, 474, 386, 0, 386, 483, 408, 0, 794, 453, 462, 0, 1256, 444, 482, 0, 1738, 442, 490, 0, 2228, 452, 482, 0, 2710, 461, 472, 0, 3182, 473, 466, 483, 386, 473, 466, 956, 386, 473, 466, 1429, 386, 473, 466, 1902, 386, 473, 466, 2375, 386, 473, 466, 0, 3648, 482, 411, 2848, 386, 481, 421, 3329, 386, 474, 446, 483, 852, 455, 455, 483, 1307, 448, 459, 938, 852, 456, 452, 1394, 852, 461, 441, 1855, 852, 470, 428, 2325, 852, 473, 418, 2798, 852, 485, 388, 3283, 852, 485, 417, 483, 1766, 448, 471, 483, 2237, 429, 512, 483, 2749,
                        432, 504, 483, 3253, 449, 484, 938, 1304, 463, 463, 1401, 1304, 467, 454, 1401, 1758, 467, 459, 1401, 2217, 467, 463, 1401, 2680, 467, 465, 1401, 3145, 467, 465, 1401, 3610, 467, 465, 1868, 1758, 467, 465, 1868, 2223, 467, 466, 938, 1767, 457, 475, 938, 2242, 446, 485, 938, 2727, 450, 465, 1868, 1304, 477, 417, 474, 0, 504, 385
                    ],
                    j: [176, 205, 171, 183, 186, 136, 191, 118, 192, 121, 186, 134, 181, 147, 174, 156, 174, 156, 174, 156, 174, 156, 174, 156, 174, 156, 172, 180, 173, 170, 177, 145, 187, 136, 190, 132, 186, 139, 183, 150, 179, 163, 177, 173, 171, 203, 170, 174, 188, 120, 197, 79, 196, 87, 187, 107, 180, 128,
                        178, 137, 178, 132, 178, 128, 178, 126, 178, 126, 178, 126, 178, 126, 178, 125, 183, 116, 189, 106, 187, 126, 173, 174, 159, 206
                    ],
                    r: 820,
                    q: 820
                }, {
                    id: q.pe,
                    R: 0.6,
                    d: [0, 0, 474, 406, 0, 406, 451, 422, 0, 828, 449, 426, 451, 406, 458, 420, 449, 828, 473, 411, 474, 0, 483, 405, 0, 1254, 481, 405, 481, 1254, 478, 405, 0, 1659, 477, 405, 477, 1659, 477, 405, 0, 2064, 477, 405, 477, 2064, 478, 405, 0, 2469, 473, 419, 0, 2888, 469, 432, 473, 2469, 487, 411, 469, 2888, 500, 385, 0, 3320, 244, 138, 0, 3458, 223, 143],
                    j: [174, 185, 184, 169, 180, 165, 175, 171, 168, 180, 165, 186, 167, 186, 170, 186, 171, 186, 171, 186, 171, 186,
                        170, 186, 174, 172, 177, 159, 165, 180, 152, 206, 284, 318, 298, 320
                    ],
                    r: 820,
                    q: 820
                }, {
                    id: q.Wg,
                    R: 0.6,
                    d: [0, 0, 381, 392, 0, 392, 374, 404, 0, 796, 356, 433, 0, 1229, 348, 466, 0, 1695, 352, 473, 0, 2168, 355, 447, 0, 2615, 364, 418, 0, 3033, 372, 410, 381, 0, 382, 407, 381, 407, 391, 411, 772, 407, 394, 410, 772, 817, 395, 417, 772, 1234, 395, 425, 772, 1659, 395, 430, 772, 2089, 395, 434, 772, 2523, 395, 439, 772, 2962, 395, 435, 772, 3397, 395, 430, 1167, 817, 395, 427, 1562, 817, 395, 418, 1957, 817, 395, 411, 381, 818, 386, 426, 0, 3443, 359, 434, 381, 1244, 348, 466, 381, 1710, 356, 451, 381, 2161, 374, 420, 763,
                        0, 381, 392, 381, 2581, 379, 419, 381, 3E3, 378, 417, 381, 3417, 374, 430, 1167, 1244, 370, 460, 1167, 1704, 369, 477, 1167, 2181, 369, 477, 1167, 2658, 370, 470, 1537, 1244, 374, 454, 1911, 1244, 394, 430, 2352, 817, 404, 424, 2756, 817, 407, 422, 2305, 1244, 410, 433, 2715, 1244, 408, 433, 3123, 1244, 406, 429, 3163, 817, 408, 423, 3571, 817, 408, 419, 3529, 1244, 409, 419, 1537, 1698, 408, 422, 1537, 2120, 406, 424, 1537, 2544, 404, 423, 1537, 2967, 405, 421, 1537, 3388, 406, 421, 1945, 1698, 410, 422, 1945, 2120, 408, 423, 1945, 2543, 406, 439, 1945, 2982, 396, 441, 1945, 3423, 372, 430, 2355, 1698, 376,
                        419, 2731, 1698, 379, 418, 2353, 2120, 379, 430
                    ],
                    j: [295, 339, 298, 326, 308, 292, 312, 259, 310, 252, 309, 278, 304, 307, 300, 318, 295, 322, 290, 319, 288, 321, 288, 314, 288, 306, 288, 301, 288, 297, 288, 292, 288, 296, 288, 301, 288, 304, 288, 313, 288, 320, 292, 303, 306, 291, 312, 259, 308, 274, 298, 310, 295, 339, 297, 312, 297, 314, 300, 301, 302, 271, 302, 254, 303, 254, 304, 261, 304, 277, 306, 301, 306, 307, 306, 309, 304, 298, 304, 298, 304, 302, 304, 308, 304, 312, 304, 312, 306, 309, 306, 307, 306, 308, 306, 310, 306, 310, 306, 309, 306, 308, 306, 292, 306, 290, 304, 301, 300, 312, 297, 313, 297, 301],
                    r: 984,
                    q: 984
                }, {
                    id: q.xf,
                    R: 0.6,
                    d: [0, 0, 379, 446, 0, 446, 379, 437, 379, 0, 380, 430, 759, 0, 381, 424, 1140, 0, 381, 419, 1521, 0, 380, 421, 0, 883, 379, 425, 0, 1308, 377, 434, 0, 1742, 377, 441, 0, 2183, 374, 448, 0, 2631, 372, 453, 0, 3084, 371, 457, 0, 3541, 371, 466, 379, 430, 371, 471, 750, 430, 372, 472, 1122, 430, 374, 470, 1496, 430, 374, 464, 1870, 430, 377, 455, 1901, 0, 379, 419, 2280, 0, 375, 428, 379, 901, 365, 456, 379, 1357, 354, 461, 379, 1818, 348, 456, 379, 2274, 356, 449, 2655, 0, 371, 430, 3026, 0, 365, 422, 3391, 0, 360, 420, 379, 2723, 360, 419, 379, 3142, 360, 417, 379, 3559, 366, 414, 2247, 430,
                        377, 413, 2624, 430, 365, 414, 2989, 430, 360, 418, 3349, 430, 360, 419, 3709, 430, 360, 418, 750, 902, 365, 416, 1115, 902, 377, 412, 750, 1318, 359, 419, 750, 1737, 352, 433, 750, 2170, 348, 449, 750, 2619, 354, 452, 1115, 1314, 366, 436, 1481, 1314, 379, 419, 1860, 1314, 381, 419, 2241, 1314, 383, 417, 1492, 902, 389, 406, 1881, 902, 399, 398, 2280, 902, 396, 397, 2676, 902, 390, 404, 750, 3071, 358, 426, 750, 3497, 334, 444, 1115, 1750, 310, 453, 1115, 2203, 312, 458, 1115, 2661, 319, 453, 1115, 3114, 329, 442, 1115, 3556, 335, 431, 3751, 0, 337, 425, 1481, 1733, 338, 420, 2624, 1314, 337, 416, 3066, 902,
                        334, 410, 3400, 902, 331, 410, 3731, 902, 331, 404, 2961, 1314, 331, 399, 3292, 1314, 331, 398, 3623, 1314, 331, 404, 1481, 2153, 331, 409, 1481, 2562, 332, 410, 1481, 2972, 336, 402, 1481, 3374, 338, 402, 1819, 1733, 338, 405, 1819, 2138, 337, 408, 2157, 1733, 337, 404, 2494, 1733, 335, 399, 2829, 1733, 336, 389, 3165, 1733, 337, 386, 3502, 1733, 337, 376, 1819, 2546, 336, 373, 2156, 2138, 338, 379, 2494, 2138, 341, 407, 2494, 2545, 339, 436, 2833, 2545, 372, 452, 3205, 2545, 368, 452, 3573, 2545, 374, 439, 2833, 2997, 380, 427, 3213, 2997, 381, 419
                    ],
                    j: [296, 285, 296, 294, 295, 301, 295, 307, 295, 312, 295,
                        310, 296, 306, 297, 297, 297, 290, 298, 283, 300, 278, 300, 274, 300, 265, 300, 260, 300, 259, 298, 261, 298, 267, 297, 276, 297, 312, 300, 303, 309, 276, 320, 271, 324, 278, 318, 285, 307, 304, 315, 310, 320, 312, 320, 313, 320, 315, 314, 318, 303, 319, 315, 318, 320, 314, 320, 313, 320, 314, 315, 316, 303, 320, 319, 315, 322, 301, 324, 285, 320, 280, 309, 295, 297, 312, 295, 312, 294, 314, 291, 325, 283, 332, 286, 333, 300, 326, 320, 303, 330, 282, 332, 273, 332, 268, 332, 273, 333, 286, 333, 297, 333, 304, 333, 309, 332, 313, 326, 316, 310, 316, 297, 325, 292, 332, 291, 333, 292, 327, 298, 320, 314, 315, 327, 324, 332,
                        327, 333, 324, 333, 321, 331, 324, 325, 327, 318, 336, 316, 339, 315, 349, 316, 352, 314, 346, 312, 318, 308, 289, 302, 279, 301, 279, 298, 292, 295, 304, 295, 312
                    ],
                    r: 984,
                    q: 984
                }, {
                    id: q.yf,
                    R: 0.6,
                    d: [0, 0, 381, 392, 0, 392, 374, 404, 0, 796, 356, 433, 0, 1229, 348, 466, 0, 1695, 352, 478, 0, 2173, 355, 464, 0, 2637, 364, 446, 0, 3083, 372, 437, 381, 0, 382, 434, 381, 434, 391, 435, 772, 434, 394, 439, 772, 873, 395, 440, 772, 1313, 395, 440, 772, 1753, 395, 440, 772, 2193, 395, 440, 763, 0, 382, 419, 0, 3520, 380, 423, 1145, 0, 377, 434, 381, 869, 372, 446, 381, 1315, 371, 457, 381, 1772, 372, 453, 381, 2225, 374, 442,
                        1522, 0, 379, 429, 1901, 0, 380, 422, 2281, 0, 382, 419, 2663, 0, 380, 427, 381, 2667, 377, 452, 381, 3119, 372, 481, 381, 3600, 371, 490, 772, 2633, 372, 482, 772, 3115, 374, 475, 772, 3590, 379, 461, 3043, 0, 380, 404, 3423, 0, 415, 389, 1166, 434, 450, 397, 1616, 434, 377, 418, 1167, 873, 372, 440, 1167, 1313, 371, 457, 1538, 1313, 372, 453, 1910, 1313, 374, 442, 1993, 434, 379, 429, 2372, 434, 380, 422, 2752, 434, 382, 419, 3134, 434, 380, 423, 3514, 434, 377, 434, 2284, 1313, 372, 446, 1167, 1770, 371, 457, 2656, 1313, 372, 453, 3028, 1313, 374, 442, 1539, 873, 379, 429, 1918, 873, 380, 422, 2298, 873, 381,
                        392, 2679, 873, 374, 405, 3053, 873, 356, 434, 1167, 2227, 348, 479, 1167, 2706, 352, 493, 1167, 3199, 359, 467, 3409, 873, 370, 428, 3402, 1313, 380, 415, 1538, 1766, 382, 418, 1538, 2184, 382, 429, 1538, 2613, 382, 439, 1538, 3052, 382, 442, 1538, 3494, 382, 441, 1920, 1766, 382, 436, 2302, 1766, 382, 434, 1920, 2202, 366, 444, 1920, 2646, 348, 454, 1920, 3100, 356, 446, 2684, 1766, 374, 423, 3058, 1766, 381, 411
                    ],
                    j: [295, 339, 298, 326, 308, 292, 312, 259, 310, 247, 309, 261, 304, 279, 300, 291, 295, 295, 290, 295, 288, 292, 288, 291, 288, 291, 288, 291, 288, 291, 295, 312, 295, 308, 297, 297, 300, 285, 300,
                        274, 300, 278, 298, 289, 296, 302, 295, 309, 294, 312, 295, 304, 297, 279, 300, 250, 300, 241, 300, 249, 298, 256, 296, 270, 295, 327, 295, 342, 278, 334, 297, 313, 300, 291, 300, 274, 300, 278, 298, 289, 296, 302, 295, 309, 294, 312, 295, 308, 297, 297, 300, 285, 300, 274, 300, 278, 298, 289, 296, 302, 295, 309, 295, 339, 298, 325, 308, 291, 312, 246, 310, 232, 307, 259, 301, 301, 296, 315, 295, 313, 295, 302, 295, 292, 295, 289, 295, 290, 295, 295, 295, 297, 303, 284, 312, 271, 308, 279, 298, 307, 295, 320
                    ],
                    r: 984,
                    q: 984
                }, {
                    id: q.qe,
                    R: 0.6,
                    d: [0, 0, 381, 419, 0, 419, 377, 423, 0, 842, 371, 430, 377, 419, 374, 421, 381,
                        0, 379, 393, 760, 0, 381, 380, 1141, 0, 381, 381, 1522, 0, 381, 386, 751, 419, 381, 388, 1132, 419, 381, 388, 1513, 419, 381, 388, 371, 842, 381, 388, 752, 842, 381, 388, 1133, 842, 381, 388, 1514, 842, 381, 388, 0, 1272, 381, 379, 381, 1272, 381, 369, 0, 1651, 379, 388, 0, 2039, 374, 424, 0, 2463, 371, 437, 374, 2039, 377, 441, 751, 2039, 381, 434, 1132, 2039, 381, 411, 1513, 2039, 381, 416, 374, 2480, 381, 419, 762, 1272, 213, 92, 762, 1364, 205, 98, 762, 1462, 190, 107, 975, 1272, 177, 109, 975, 1381, 173, 109, 975, 1490, 168, 116, 1152, 1272, 168, 117, 1320, 1272, 169, 109, 1489, 1272, 171, 101, 1489, 1373, 170,
                        100
                    ],
                    j: [295, 312, 297, 308, 300, 301, 298, 310, 296, 338, 295, 351, 295, 350, 295, 345, 295, 343, 295, 343, 295, 343, 295, 343, 295, 343, 295, 343, 295, 343, 295, 352, 295, 362, 296, 343, 298, 307, 300, 294, 297, 290, 295, 297, 295, 320, 295, 315, 295, 312, 380, 396, 385, 392, 392, 385, 396, 380, 399, 375, 404, 368, 404, 363, 404, 364, 403, 366, 403, 366],
                    r: 984,
                    q: 984
                }, {
                    id: q.Xg,
                    R: 0.6,
                    d: [0, 0, 422, 354, 0, 354, 398, 369, 0, 723, 354, 402, 0, 1125, 327, 411, 0, 1536, 335, 408, 0, 1944, 351, 400, 0, 2344, 368, 391, 0, 2735, 376, 388, 0, 3123, 376, 388, 0, 3511, 376, 388, 398, 354, 376, 388, 774, 354, 376, 388, 1150,
                        354, 376, 388, 1526, 354, 376, 388, 1902, 354, 376, 388, 2278, 354, 376, 388, 2654, 354, 376, 388, 3030, 354, 376, 388, 3406, 354, 376, 388, 398, 742, 376, 388, 398, 1130, 376, 388, 398, 1518, 367, 390, 398, 1908, 346, 402, 398, 2310, 337, 405, 398, 2715, 354, 399, 398, 3114, 374, 383, 774, 742, 398, 373, 398, 3497, 373, 381, 774, 1115, 336, 407, 774, 1522, 315, 416, 774, 1938, 313, 430, 774, 2368, 324, 430, 1110, 1115, 360, 411, 1110, 1526, 358, 381, 1470, 1115, 378, 375, 1848, 1115, 376, 374, 1172, 742, 372, 373, 1544, 742, 382, 367, 1926, 742, 379, 367, 2305, 742, 377, 372, 2682, 742, 373, 373, 3055, 742, 382,
                        367, 3437, 742, 379, 367, 2224, 1115, 377, 372, 2601, 1115, 373, 373, 2974, 1115, 382, 367, 3356, 1115, 379, 367, 1470, 1490, 376, 372, 1470, 1862, 372, 373, 1846, 1490, 392, 363, 2238, 1490, 395, 362, 1110, 1907, 345, 396, 1110, 2303, 341, 411, 774, 2798, 333, 397, 422, 0, 384, 340, 2633, 1490, 378, 362, 1470, 2235, 373, 377
                    ],
                    j: [205, 237, 217, 222, 238, 189, 252, 180, 248, 183, 240, 191, 231, 200, 226, 203, 226, 203, 226, 203, 226, 203, 226, 203, 226, 203, 226, 203, 226, 203, 226, 203, 226, 203, 226, 203, 226, 203, 226, 203, 226, 203, 231, 201, 242, 189, 247, 186, 239, 192, 227, 208, 214, 218, 226, 210, 244, 183,
                        255, 174, 256, 160, 253, 160, 249, 178, 246, 207, 238, 213, 240, 216, 241, 217, 230, 223, 231, 223, 235, 218, 240, 217, 230, 223, 231, 223, 235, 218, 240, 217, 230, 223, 231, 223, 236, 218, 241, 217, 237, 227, 242, 228, 253, 192, 245, 176, 244, 191, 228, 251, 227, 229, 226, 214
                    ],
                    r: 820,
                    q: 820
                }, {
                    id: q.zf,
                    R: 0.6,
                    d: [0, 0, 373, 381, 0, 381, 372, 382, 0, 763, 371, 385, 0, 1148, 368, 388, 0, 1536, 365, 393, 0, 1929, 361, 398, 0, 2327, 358, 403, 0, 2730, 356, 406, 0, 3136, 354, 409, 0, 3545, 354, 409, 373, 0, 355, 408, 728, 0, 357, 406, 1085, 0, 359, 403, 1444, 0, 362, 399, 1806, 0, 364, 395, 2170, 0, 368, 390, 2538, 0, 370, 387,
                        2908, 0, 371, 384, 3279, 0, 373, 382, 3652, 0, 414, 361, 373, 408, 400, 370, 373, 778, 364, 405, 373, 1183, 368, 437, 373, 1620, 376, 434, 373, 2054, 387, 430, 373, 2484, 393, 417, 373, 2901, 386, 414, 373, 3315, 380, 414, 773, 408, 381, 414, 1154, 408, 382, 414, 1536, 408, 383, 414, 1919, 408, 393, 414, 2312, 408, 384, 414, 2696, 408, 383, 414, 3079, 408, 383, 414, 3462, 408, 383, 414, 773, 822, 383, 414, 1156, 822, 393, 414, 1156, 1236, 392, 419, 1156, 1655, 387, 428, 773, 1236, 378, 437, 773, 1673, 368, 417, 1549, 822, 397, 378, 1946, 822, 414, 361, 773, 2090, 383, 368, 773, 2458, 383, 378, 773, 2836, 382, 387,
                        773, 3223, 382, 396, 773, 3619, 381, 402, 2360, 822, 382, 399, 2742, 822, 382, 389, 3124, 822, 383, 378, 3507, 822, 383, 368, 1156, 2083, 385, 376, 1156, 2459, 386, 383, 1156, 2842, 387, 391, 1156, 3233, 387, 395, 1156, 3628, 387, 392, 1548, 1236, 386, 384, 1934, 1236, 385, 376
                    ],
                    j: [226, 210, 227, 209, 228, 206, 229, 203, 231, 198, 233, 193, 235, 188, 236, 185, 238, 182, 237, 182, 236, 183, 235, 185, 234, 188, 232, 192, 231, 196, 229, 201, 228, 204, 227, 207, 226, 209, 202, 229, 213, 220, 237, 185, 237, 153, 232, 156, 227, 161, 222, 174, 231, 177, 240, 177, 237, 177, 234, 177, 232, 177, 222, 177, 231, 177, 232, 177,
                        232, 177, 232, 177, 232, 177, 222, 177, 222, 172, 226, 163, 231, 153, 232, 174, 214, 212, 202, 229, 220, 223, 223, 213, 226, 204, 228, 195, 230, 189, 228, 192, 226, 202, 223, 213, 220, 223, 218, 215, 217, 207, 215, 199, 214, 194, 215, 197, 217, 206, 218, 214
                    ],
                    r: 820,
                    q: 820
                }, {
                    id: q.Af,
                    R: 0.6,
                    d: [0, 0, 417, 346, 0, 346, 397, 360, 0, 706, 349, 390, 0, 1096, 323, 404, 0, 1500, 337, 400, 417, 0, 362, 390, 779, 0, 376, 380, 1155, 0, 381, 376, 1155, 376, 377, 378, 779, 380, 373, 378, 779, 758, 373, 378, 779, 1136, 373, 378, 779, 1514, 373, 378, 1536, 0, 400, 370, 1155, 754, 379, 382, 1155, 1136, 369, 394, 417, 390, 360, 406,
                        417, 796, 351, 418, 417, 1214, 362, 408, 1155, 1530, 375, 398, 1536, 370, 379, 389, 1536, 759, 389, 379, 1936, 0, 413, 347, 1536, 1138, 396, 365, 417, 1622, 350, 400, 1536, 1503, 319, 457, 1936, 347, 329, 458, 1936, 805, 344, 443, 1936, 1248, 360, 426, 2349, 0, 366, 420, 2349, 420, 363, 422, 2349, 842, 361, 423, 2349, 1265, 360, 424, 2712, 420, 358, 424, 3070, 420, 356, 424, 3426, 420, 356, 424, 2712, 844, 356, 424, 2712, 1268, 342, 430, 3068, 844, 327, 434, 3395, 844, 341, 421, 2715, 0, 374, 381, 1936, 1674, 384, 371
                    ],
                    j: [206, 245, 216, 231, 239, 201, 253, 187, 246, 191, 233, 201, 225, 211, 222, 216, 224, 214,
                        226, 214, 226, 214, 226, 214, 226, 214, 206, 221, 225, 209, 232, 197, 239, 185, 246, 173, 229, 183, 214, 193, 216, 202, 212, 212, 208, 244, 216, 226, 239, 191, 255, 134, 250, 133, 242, 148, 233, 165, 229, 171, 231, 169, 232, 168, 232, 167, 233, 167, 234, 167, 234, 167, 234, 167, 242, 161, 250, 157, 242, 170, 225, 210, 220, 220
                    ],
                    r: 820,
                    q: 820
                }, {
                    id: q.re,
                    R: 0.6,
                    d: [0, 0, 389, 367, 389, 0, 390, 352, 779, 0, 379, 362, 1158, 0, 384, 358, 1542, 0, 395, 350, 0, 367, 402, 345, 0, 712, 402, 345, 0, 1057, 402, 345, 0, 1402, 402, 345, 402, 367, 388, 359, 402, 726, 374, 373, 790, 367, 398, 353, 1188, 367, 408, 356, 0, 1747, 244, 138,
                        0, 1885, 223, 143
                    ],
                    j: [215, 224, 214, 239, 218, 229, 216, 233, 211, 241, 209, 246, 209, 246, 209, 246, 209, 246, 216, 232, 224, 218, 214, 238, 209, 235, 284, 318, 298, 320],
                    r: 820,
                    q: 820
                }
            ]),
            gb = {
                s: 0,
                W: 1,
                Pj: 2,
                TD: 3
            },
            Pa = function(b, c, e) {
                var a = [];
                a[e.Og] = new b("big_font.png", c.Pj);
                a[e.Yh] = new b("small_font.png", c.Pj);
                a[e.nm] = new b("font_numbers_big.png", c.Pj);
                a[e.ha] = new b("tap", c.W);
                a[e.tn] = new b("button", c.W);
                a[e.sn] = new b("bubble_break", c.W);
                a[e.rn] = new b("bubble", c.W);
                a[e.kk] = new b("candy_break", c.W);
                a[e.Bn] = new b("monster_chewing",
                    c.W);
                a[e.Cn] = new b("monster_chewing", c.W);
                a[e.lk] = new b("monster_close", c.W);
                a[e.mk] = new b("monster_open", c.W);
                a[e.nk] = new b("monster_sad", c.W);
                a[e.zs] = new b("ring", c.W);
                a[e.Jn] = new b("rope_bleak_1", c.W);
                a[e.As] = new b("rope_bleak_2", c.W);
                a[e.Bs] = new b("rope_bleak_3", c.W);
                a[e.Cs] = new b("rope_bleak_4", c.W);
                a[e.Kn] = new b("rope_get", c.W);
                a[e.Qn] = new b("star_1", c.W);
                a[e.Ds] = new b("star_2", c.W);
                a[e.Es] = new b("star_3", c.W);
                a[e.Nd] = new b("electric", c.W);
                a[e.Hn] = new b("pump_1", c.W);
                a[e.xs] = new b("pump_2",
                    c.W);
                a[e.ys] = new b("pump_3", c.W);
                a[e.In] = new b("pump_4", c.W);
                a[e.Nn] = new b("spider_activate", c.W);
                a[e.On] = new b("spider_fall", c.W);
                a[e.Pn] = new b("spider_win", c.W);
                a[e.Sn] = new b("wheel", c.W);
                a[e.Tn] = new b("win", c.W);
                a[e.yn] = new b("gravity_off", c.W);
                a[e.zn] = new b("gravity_on", c.W);
                a[e.wn] = new b("candy_link", c.W);
                a[e.qn] = new b("bouncer", c.W);
                a[e.qc] = new b("obj_candy_01.png", c.s);
                a[e.ci] = new b("obj_spider.png", c.s);
                a[e.Im] = new b("obj_star_disappear.png", c.s);
                a[e.ai] = new b("obj_bubble_flight.png", c.s);
                a[e.xm] = new b("obj_bubble_pop.png", c.s);
                a[e.Zj] = new b("obj_hook_auto.png", c.s);
                a[e.Hm] = new b("obj_spikes_04.png", c.s);
                a[e.Xj] = new b("obj_bubble_attached.png", c.s);
                a[e.ym] = new b("obj_hook_01.png", c.s);
                a[e.zm] = new b("obj_hook_02.png", c.s);
                a[e.ed] = new b("obj_star_idle.png", c.s);
                a[e.Vj] = new b("hud_star.png", c.s);
                a[e.Gm] = new b("obj_spikes_03.png", c.s);
                a[e.Fm] = new b("obj_spikes_02.png", c.s);
                a[e.Em] = new b("obj_spikes_01.png", c.s);
                a[e.pc] = new b("char_animations.png", c.s);
                a[e.pf] = new b("char_animations2.png",
                    c.s);
                a[e.$h] = new b("char_animations3.png", c.s);
                a[e.Rg] = new b("obj_hook_regulated.png", c.s);
                a[e.Yj] = new b("obj_electrodes.png", c.s);
                a[e.qf] = new b("obj_hook_movable.png", c.s);
                a[e.$j] = new b("obj_pump.png", c.s);
                a[e.Pm] = new b("tutorial_signs.png", c.s);
                a[e.Sg] = new b("obj_hat.png", c.s);
                a[e.vm] = new b("obj_bouncer_01.png", c.s);
                a[e.wm] = new b("obj_bouncer_02.png", c.s);
                a[e.An] = new b("menu_music", c.W);
                a[e.xn] = new b("game_music", c.W);
                a[e.px] = new b("game_music2", c.W);
                a[e.um] = new b("obj_drawing_hidden.png", c.s);
                a[e.ak] = new b("obj_rotatable_spikes_01.png", c.s);
                a[e.Bm] = new b("obj_rotatable_spikes_02.png", c.s);
                a[e.Cm] = new b("obj_rotatable_spikes_03.png", c.s);
                a[e.Dm] = new b("obj_rotatable_spikes_04.png", c.s);
                a[e.bi] = new b("obj_rotatable_spikes_button.png", c.s);
                a[e.Wj] = new b("obj_bee_hd.png", c.s);
                a[e.Am] = new b("obj_pollen_hd.png", c.s);
                a[e.ok] = new b("spike_rotate_in", c.W);
                a[e.pk] = new b("spike_rotate_out", c.W);
                a[e.Uj] = new b("char_supports.png", c.s);
                a[e.rc] = new b("obj_vinil.png", c.s);
                a[e.Ln] = new b("scratch_in", c.W);
                a[e.Mn] = new b("scratch_out", c.W);
                a[e.un] = new b("buzz", c.W);
                a[e.bh] = new b("teleport", c.W);
                a[e.xr] = new b("bgr_01_p1.jpg", c.s);
                a[e.yr] = new b("bgr_01_p2.jpg", c.s);
                a[e.zr] = new b("bgr_02_p1.jpg", c.s);
                a[e.Ar] = new b("bgr_02_p2.jpg", c.s);
                a[e.Br] = new b("bgr_03_p1.jpg", c.s);
                a[e.Cr] = new b("bgr_03_p2.jpg", c.s);
                a[e.Dr] = new b("bgr_04_p1.jpg", c.s);
                a[e.Er] = new b("bgr_04_p2.jpg", c.s);
                a[e.Fr] = new b("bgr_05_p1.jpg", c.s);
                a[e.Gr] = new b("bgr_05_p2.jpg", c.s);
                a[e.Hr] = new b("bgr_06_p1.jpg", c.s);
                a[e.Ir] = new b("bgr_06_p2.jpg",
                    c.s);
                a[e.Jr] = new b("bgr_07_p1.jpg", c.s);
                a[e.Kr] = new b("bgr_07_p2.jpg", c.s);
                a[e.tm] = new b("bgr_08_p1.png", c.s);
                a[e.Lr] = new b("bgr_08_p2.png", c.s);
                a[e.Mr] = new b("bgr_09_p1.jpg", c.s);
                a[e.Nr] = new b("bgr_09_p2.jpg", c.s);
                a[e.Or] = new b("bgr_10_p1.jpg", c.s);
                a[e.Pr] = new b("bgr_10_p2.jpg", c.s);
                a[e.Qr] = new b("bgr_11_p1.jpg", c.s);
                a[e.Rr] = new b("bgr_11_p2.jpg", c.s);
                a[e.Sr] = new b("bgr_ie.jpg", c.s);
                a[e.Jm] = new b("bgr_time1.jpg", c.s);
                a[e.Km] = new b("bgr_time2.jpg", c.s);
                a[e.Lm] = new b("bgr_time3.jpg", c.s);
                a[e.Mm] = new b("bgr_time4.jpg",
                    c.s);
                a[e.Nm] = new b("bgr_time5.jpg", c.s);
                a[e.Om] = new b("bgr_time6.jpg", c.s);
                a[e.Qg] = new b("Caesar_animations_1_hd.png", c.s);
                a[e.nf] = new b("Caesar_animations_2_hd.png", c.s);
                a[e.of] = new b("Caesar_animations_3_hd.png", c.s);
                a[e.me] = new b("Caesar_animations_4_hd.png", c.s);
                a[e.Tg] = new b("Painter_animations_1_hd.png", c.s);
                a[e.rf] = new b("Painter_animations_2_hd.png", c.s);
                a[e.sf] = new b("Painter_animations_3_hd.png", c.s);
                a[e.ne] = new b("Painter_animations_4_hd.png", c.s);
                a[e.Ug] = new b("Pharaoh_animations_1_hd.png",
                    c.s);
                a[e.tf] = new b("Pharaoh_animations_2_hd.png", c.s);
                a[e.uf] = new b("Pharaoh_animations_3_hd.png", c.s);
                a[e.oe] = new b("Pharaoh_animations_4_hd.png", c.s);
                a[e.Vg] = new b("Pirate_animations_1_hd.png", c.s);
                a[e.vf] = new b("Pirate_animations_2_hd.png", c.s);
                a[e.wf] = new b("Pirate_animations_3_hd.png", c.s);
                a[e.pe] = new b("Pirate_animations_4_hd.png", c.s);
                a[e.Wg] = new b("Prehistoric_animations_1_hd.png", c.s);
                a[e.xf] = new b("Prehistoric_animations_2_hd.png", c.s);
                a[e.yf] = new b("Prehistoric_animations_3_hd.png", c.s);
                a[e.qe] = new b("Prehistoric_animations_4_hd.png", c.s);
                a[e.Xg] = new b("Viking_animations_1_hd.png", c.s);
                a[e.zf] = new b("Viking_animations_2_hd.png", c.s);
                a[e.Af] = new b("Viking_animations_3_hd.png", c.s);
                a[e.re] = new b("Viking_animations_4_hd.png", c.s);
                a[e.vn] = new b("candy_hit", c.W);
                a[e.Dn] = new b("prehistoric_monster_chewing", c.W);
                a[e.En] = new b("prehistoric_monster_close", c.W);
                a[e.Fn] = new b("prehistoric_monster_open", c.W);
                a[e.Gn] = new b("prehistoric_monster_sad", c.W);
                a[e.Rn] = new b("time_menu", c.W);
                a[e.ck] =
                    new b("time-stands.png", c.s);
                return a
            }(function() {
                return function(b, c) {
                    this.path = b;
                    this.type = c
                }
            }(), gb, q),
            xb = function(b, c) {
                function e(a, b) {
                    return Math.round(1E4 * a * b) / 1E4
                }
                return {
                    AB: function(a, b) {
                        var c, g, h;
                        g = 0;
                        for (h = a.length; g < h; g++) c = a[g], c = c.R || 1, this.zB(a[g], e(b, c))
                    },
                    zB: function(a, b) {
                        a.nd && (a.nd = e(a.nd, b));
                        a.Ac && (a.Ac = e(a.Ac, b));
                        a.lc && (a.lc = e(a.lc, b));
                        a.r && (a.r = Math.ceil(e(a.r, b)));
                        a.q && (a.q = Math.ceil(e(a.q, b)));
                        a.d && (a.Qu = this.PA(a.d), a.d = this.yB(a.Qu, b));
                        a.we = 0;
                        a.we = 0;
                        a.j && (a.Pu = this.OA(a.j), this.xB(a,
                            b))
                    },
                    PA: function(a) {
                        for (var b = 0, d = a.length, e = []; b < d;) {
                            var h = new c(a[b++], a[b++], a[b++], a[b++]);
                            e.push(h)
                        }
                        return e
                    },
                    yB: function(a, b) {
                        var d = [],
                            g = 0,
                            h = 0,
                            l = 0,
                            n = a.length,
                            r = Math.ceil(Math.sqrt(n)),
                            m = 0,
                            p, C;
                        for (C = 0; C < n; C++) p = a[C], m = (m + 1) % r, 1 === m && (g += l + 2, h = 2, l = 0), p = new c(g, h, e(p.O, b), e(p.V, b)), d.push(p), h += Math.ceil(p.V) + 2, l = Math.max(l, Math.ceil(p.O));
                        return d
                    },
                    OA: function(a) {
                        for (var c = 0, d = a.length, e = []; c < d;) {
                            var h = new b(a[c++], a[c++]);
                            e.push(h)
                        }
                        return e
                    },
                    xB: function(a, c) {
                        var d = [],
                            g = a.Pu,
                            h = [],
                            l, n, r, m;
                        r = 0;
                        for (m = g.length; r < m; r++) l = g[r].copy(), l.x = e(l.x, c), l.y = e(l.y, c), n = new b(0, 0), d.push(n), h.push(l);
                        a.j = h;
                        a.oA = d;
                        delete a.Pu
                    }
                }
            }(O, R),
            xa = function(b) {
                var c = {};
                c.WD = [b.An, b.tn, b.ha];
                c.Gx = [b.Rn, b.tn, b.ha];
                c.zx = [b.pc, b.pf, b.$h, b.ym, b.zm, b.Zj, b.qc, b.vm, b.wm, b.Xj, b.ai, b.xm, b.$j, b.ci, b.Em, b.Fm, b.Gm, b.Hm, b.ed, b.Im, b.Vj, b.Pm, b.um, b.Uj];
                c.Ex = [b.Sg, b.qf, b.ak, b.Bm, b.Cm, b.Dm, b.bi];
                c.Fx = [b.Cn, b.ok, b.pk, b.bh, b.vn, b.Dn, b.Fn, b.En, b.Gn];
                c.hD = [b.qf, b.Rg, b.Yj, b.Sg, b.ak, b.Bm, b.Cm, b.Dm, b.bi, b.Wj, b.Am, b.rc];
                c.$C = [b.Sg, b.qf,
                    b.Yj
                ];
                c.aD = [b.bh, b.Nd];
                c.yx = [b.Yh, b.Og, b.nm];
                c.Ax = [b.xn, b.qn, b.rn, b.sn, b.kk, b.wn, b.Bn, b.lk, b.mk, b.nk, b.Hn, b.xs, b.ys, b.In, b.Jn, b.As, b.Bs, b.Cs, b.Kn, b.Nn, b.On, b.Pn, b.Qn, b.Ds, b.Es, b.Tn];
                c.iD = [b.Nd, b.yn, b.zn, b.zs, b.Sn, b.ok, b.pk, b.Ln, b.Mn, b.un, b.bh];
                c.Bx = "bBtn_bgd.png box_lock.png box_nav_menu.png box_omnom.png boxcutter.png boxmore_bgd.png buttonsprite.png fb.png fBtn_bgd.png flags.png fun-omnom.png gamecomplete.jpg lBtn_bgd.png level_bgd.png level_bgd_small.png leveltape.png leveltape_left.png leveltape_right.png mBtn_bgd.png menu_result_en.png menu_result_fr.png menu_result_gr.png menu_result_ru.png menubg.jpg options_stars_bgd.png options_stars_bgd_small.png perfect_mark.png ph_logo.png result_line.png sBtn_bgd.png shadow.png star_result.png star_result_small.png startbg.jpg taperoll.png".split(" ");
                c.cD = ["drawing-bg.png"];
                c.MD = "android.png box.png comic.png facebook.png footer_dot.png footer_finger.png full_version_bg.png full_version_text.png game_bg.png ipad.png iphone.png more_close.png more_text.png more_wallpaper.png more_window_bg.png more.png papercraft.png privacy.png shop.png terms.png twitter.png video_bg.png youtube.png zepto.png zeptologo.png".split(" ");
                return c
            }(q),
            ma = {
                Ym: "NORMAL",
                Qw: "IEPINNED",
                Zr: "MORECOMING",
                fs: "PURCHASE",
                Od: "TIME"
            },
            sa = function() {
                var b = {
                    Xh: 0,
                    Qj: 1,
                    Mj: 2,
                    hk: 3,
                    Sm: 4,
                    no: 5,
                    Rm: 6,
                    mm: 7,
                    Qm: 8,
                    Xm: 9,
                    Kq: 10,
                    Xt: function(c) {
                        switch (c) {
                            case "de":
                                return b.Mj;
                            case "fr":
                                return b.Qj;
                            case "ru":
                                return b.hk;
                            case "en":
                            case "en_GB":
                            case "en_US":
                                return b.Xh;
                            case "ko":
                                return b.Sm;
                            case "zh":
                                return b.no;
                            case "ja":
                                return b.Rm;
                            case "es":
                                return b.mm;
                            case "it":
                                return b.Qm;
                            case "nl":
                                return b.Xm;
                            case "br":
                                return b.Kq
                        }
                        if (3 <= c.length) switch (c.substr(0, 3)) {
                            case "de-":
                                return b.Mj;
                            case "fr-":
                                return b.Qj;
                            case "ru-":
                                return b.hk;
                            case "en-":
                                return b.Xh;
                            case "ko-":
                                return b.Sm;
                            case "zh-":
                                return b.no;
                            case "ja-":
                                return b.Rm;
                            case "es-":
                                return b.mm;
                            case "it-":
                                return b.Qm;
                            case "nl-":
                                return b.Xm;
                            case "br-":
                                return b.Kq
                        }
                        return null
                    },
                    wC: function(c) {
                        switch (c) {
                            case b.Mj:
                                return "de";
                            case b.Qj:
                                return "fr";
                            case b.hk:
                                return "ru";
                            case b.Sm:
                                return "ko";
                            case b.no:
                                return "zh";
                            case b.Rm:
                                return "ja";
                            case b.mm:
                                return "es";
                            case b.Qm:
                                return "it";
                            case b.Xm:
                                return "nl";
                            default:
                                return "en"
                        }
                    }
                };
                return b
            }(),
            U = {
                Ql: "http://www.cuttherope.net/#ctr-tt",
                nt: new Date(2013, 2, 4),
                zy: !0,
                Ay: !0,
                Ty: !1,
                dC: "time-",
                eC: 4,
                Iz: "menuBackground",
                vo: [{
                    A: "",
                    u: "",
                    t: "",
                    v: ""
                }, {
                    A: "",
                    u: "",
                    t: "",
                    v: ""
                }, {
                    A: "",
                    u: "",
                    t: "",
                    v: ""
                }, {
                    A: "",
                    u: "",
                    t: "",
                    v: ""
                }, {
                    A: "",
                    u: "",
                    t: "",
                    v: ""
                }, {
                    A: "",
                    u: "",
                    t: "",
                    v: ""
                }],
                gy: [9240, 7453, 3646, 7305, 5093, 3829],
                hy: [Date.now(), Date.now(), Date.now(), Date.now(), Date.now(), Date.now()],
                qp: [sa.Xh],
                wy: sa.Xh,
                ut: "pirate.png painter.png viking.png greece.png egypt.png dinosaurs.png".split(" "),
                fy: "time/boxes/",
                st: [],
                uo: [],
                iy: [ma.Od, ma.Od, ma.Od, ma.Od, ma.Od, ma.Od],
                FC: [0, 12, 24, 36, 48, 56],
                vC: q.ck,
                uC: -8,
                supports: [4, 0, 2, 1, 3, 5],
                fC: [!1, !1, !1, !1, !1, !1],
                iA: q.Rn,
                zu: xa.Gx,
                Yt: xa.Ax.concat(xa.Fx),
                hA: xa.Bx,
                fA: ["loader-bg.jpg", "loader-logo.png"],
                Qy: "time/",
                Ry: ["menu_bgr.jpg", "menu_logo.png"],
                $y: xa.zx.concat(xa.Ex).concat([q.ck, q.Qg, q.nf, q.of, q.me, q.Tg, q.rf, q.sf, q.ne, q.Ug, q.tf, q.uf, q.oe, q.Vg, q.vf, q.wf, q.pe, q.Wg, q.xf, q.yf, q.qe, q.Xg, q.zf, q.Af, q.re]),
                jh: [{
                    Re: [{
                        settings: [{
                            name: 0,
                            width: 640,
                            height: 480,
                            Ca: 32
                        }, {
                            name: 1,
                            P: 1,
                            M: !1,
                            ka: 1
                        }],
                        Da: [{
                            name: 2,
                            x: 277,
                            y: 390
                        }, {
                            name: 52,
                            x: 275,
                            y: 194
                        }, {
                            name: 3,
                            x: 276,
                            y: 336,
                            timeout: -1
                        }, {
                            name: 3,
                            x: 397,
                            y: 332,
                            timeout: -1
                        }, {
                            name: 3,
                            x: 375,
                            y: 334,
                            timeout: -1
                        }, {
                            name: 121,
                            x: 385,
                            y: 390
                        }, {
                            name: 122,
                            x: 385,
                            y: 197
                        }, {
                            name: 100,
                            x: 276,
                            y: 66,
                            length: 110,
                            g: !1,
                            l: !1,
                            f: -1,
                            i: -1,
                            m: !1,
                            k: 0,
                            c: !1,
                            o: "L",
                            n: !1
                        }, {
                            name: 100,
                            x: 387,
                            y: 65,
                            length: 110,
                            g: !1,
                            l: !1,
                            f: -2,
                            i: -1,
                            m: !1,
                            k: 0,
                            c: !1,
                            o: "L",
                            n: !1
                        }, {
                            name: 4,
                            x: 47,
                            y: 95,
                            locale: "en",
                            text: "Slide across to cut the rope",
                            width: 130
                        }, {
                            name: 4,
                            x: 466,
                            y: 299,
                            locale: "en",
                            text: "Deliver candy\n to both Om Noms",
                            width: 140
                        }, {
                            name: 5,
                            x: 254,
                            y: 141,
                            locale: "en",
                            C: 100,
                            K: 100
                        }, {
                            name: 5,
                            x: 306,
                            y: 141,
                            locale: "en",
                            C: 100,
                            K: 100
                        }, {
                            name: 5,
                            x: 357,
                            y: 141,
                            locale: "en",
                            C: 100,
                            K: 100
                        }, {
                            name: 14,
                            x: 260,
                            y: 171,
                            locale: "en",
                            C: 100,
                            K: 100,
                            P: 2
                        }, {
                            name: 5,
                            x: 410,
                            y: 141,
                            locale: "en",
                            C: 100,
                            K: 100
                        }, {
                            name: 8,
                            x: 461,
                            y: 385,
                            locale: "en",
                            C: 100,
                            K: 100
                        }],
                        v: [{
                            name: 14,
                            x: 260,
                            y: 171,
                            locale: "ru",
                            C: 100,
                            K: 100,
                            P: 2
                        }, {
                            name: 5,
                            x: 255,
                            y: 141,
                            locale: "ru",
                            C: 100,
                            K: 100
                        }, {
                            name: 5,
                            x: 307,
                            y: 141,
                            locale: "ru",
                            C: 100,
                            K: 100
                        }, {
                            name: 5,
                            x: 359,
                            y: 141,
                            locale: "ru",
                            C: 100,
                            K: 100
                        }, {
                            name: 5,
                            x: 411,
                            y: 141,
                            locale: "ru",
                            C: 100,
                            K: 100
                        }, {
                            name: 4,
                            x: 37,
                            y: 87,
                            locale: "ru",
                            text: "\u041f\u0440\u043e\u0432\u0435\u0434\u0438\u0442\u0435 \u0438\u043b\u0438 \u043d\u0430\u0436\u043c\u0438\u0442\u0435 \u043a\u0443\u0440\u0441\u043e\u0440\u043e\u043c, \u0447\u0442\u043e\u0431\u044b \u043f\u0435\u0440\u0435\u0440\u0435\u0437\u0430\u0442\u044c \u0432\u0435\u0440\u0435\u0432\u043a\u0443",
                            width: 180
                        }, {
                            name: 8,
                            x: 461,
                            y: 385,
                            locale: "ru",
                            C: 100,
                            K: 100
                        }, {
                            name: 4,
                            x: 472,
                            y: 280,
                            locale: "ru",
                            text: "\u0414\u043e\u0441\u0442\u0430\u0432\u044c\u0442\u0435 \u043b\u0435\u0434\u0435\u043d\u0435\u0446 \u0410\u043c \u041d\u044f\u043c\u0443",
                            width: 80
                        }],
                        u: [{
                            name: 14,
                            x: 249,
                            y: 184,
                            locale: "fr",
                            C: 100,
                            K: 100,
                            P: 2
                        }, {
                            name: 5,
                            x: 266,
                            y: 159,
                            locale: "fr",
                            C: 100,
                            K: 100
                        }, {
                            name: 5,
                            x: 214,
                            y: 159,
                            locale: "fr",
                            C: 100,
                            K: 100
                        }, {
                            name: 5,
                            x: 318,
                            y: 159,
                            locale: "fr",
                            C: 100,
                            K: 100
                        }, {
                            name: 5,
                            x: 370,
                            y: 159,
                            locale: "fr",
                            C: 100,
                            K: 100
                        }, {
                            name: 5,
                            x: 422,
                            y: 159,
                            locale: "fr",
                            C: 100,
                            K: 100
                        }, {
                            name: 4,
                            x: 52,
                            y: 108,
                            locale: "fr",
                            text: "Clique ou fais glisser pour couper la corde",
                            width: 130
                        }, {
                            name: 8,
                            x: 461,
                            y: 385,
                            locale: "fr",
                            b: 0,
                            C: 100,
                            K: 100
                        }, {
                            name: 4,
                            x: 458,
                            y: 299,
                            locale: "fr",
                            text: "Donne un bonbon \u00e0 Om Nom",
                            width: 120
                        }],
                        t: [{
                            name: 14,
                            x: 250,
                            y: 186,
                            locale: "de",
                            C: 100,
                            K: 100,
                            P: 2
                        }, {
                            name: 5,
                            x: 266,
                            y: 159,
                            locale: "de",
                            C: 100,
                            K: 100
                        }, {
                            name: 5,
                            x: 214,
                            y: 159,
                            locale: "de",
                            C: 100,
                            K: 100
                        }, {
                            name: 5,
                            x: 318,
                            y: 159,
                            locale: "de",
                            C: 100,
                            K: 100
                        }, {
                            name: 5,
                            x: 370,
                            y: 159,
                            locale: "de",
                            C: 100,
                            K: 100
                        }, {
                            name: 5,
                            x: 422,
                            y: 159,
                            locale: "de",
                            C: 100,
                            K: 100
                        }, {
                            name: 4,
                            x: 26,
                            y: 105,
                            locale: "de",
                            text: "Klicke oder ziehe, um das Seil zu schneiden",
                            width: 160
                        }, {
                            name: 8,
                            x: 462,
                            y: 385,
                            locale: "de",
                            b: 0,
                            C: 100,
                            K: 100
                        }, {
                            name: 4,
                            x: 444,
                            y: 297,
                            locale: "de",
                            text: "Versorg Om Nom mit Bonbons",
                            width: 160
                        }]
                    }, {
                        settings: [{
                            name: 0,
                            width: 640,
                            height: 480,
                            Ca: 32
                        }, {
                            name: 1,
                            P: 1,
                            M: !1,
                            ka: 1
                        }],
                        Da: [{
                            name: 2,
                            x: 321,
                            y: 373
                        }, {
                            name: 3,
                            x: 322,
                            y: 314,
                            timeout: -1
                        }, {
                            name: 3,
                            x: 181,
                            y: 177,
                            timeout: -1
                        }, {
                            name: 3,
                            x: 452,
                            y: 232,
                            timeout: -1
                        }, {
                            name: 121,
                            x: 545,
                            y: 177
                        }, {
                            name: 122,
                            x: 374,
                            y: 242
                        }, {
                            name: 100,
                            x: 376,
                            y: 69,
                            length: 140,
                            g: !1,
                            l: !1,
                            f: -2,
                            i: -1,
                            m: !1,
                            k: 0,
                            c: !1,
                            o: "L",
                            n: !1
                        }, {
                            name: 100,
                            x: 323,
                            y: 69,
                            length: 140,
                            g: !1,
                            l: !1,
                            f: -1,
                            i: -1,
                            m: !1,
                            k: 0,
                            c: !1,
                            o: "L",
                            n: !1
                        }, {
                            name: 52,
                            x: 146,
                            y: 108
                        }, {
                            name: 100,
                            x: 67,
                            y: 66,
                            length: 60,
                            g: !1,
                            l: !1,
                            f: -1,
                            i: -1,
                            m: !1,
                            k: 0,
                            c: !1,
                            o: "L",
                            n: !1
                        }]
                    }, {
                        settings: [{
                            name: 0,
                            width: 640,
                            height: 480,
                            Ca: 32
                        }, {
                            name: 1,
                            P: 1,
                            M: !1,
                            ka: 1
                        }],
                        Da: [{
                            name: 2,
                            x: 423,
                            y: 388
                        }, {
                            name: 52,
                            x: 428,
                            y: 160
                        }, {
                            name: 3,
                            x: 99,
                            y: 348,
                            timeout: -1
                        }, {
                            name: 3,
                            x: 99,
                            y: 253,
                            timeout: -1
                        }, {
                            name: 3,
                            x: 559,
                            y: 252,
                            timeout: -1
                        }, {
                            name: 121,
                            x: 223,
                            y: 388
                        }, {
                            name: 122,
                            x: 215,
                            y: 163
                        }, {
                            name: 100,
                            x: 94,
                            y: 102,
                            length: 100,
                            g: !1,
                            l: !1,
                            f: -2,
                            i: -1,
                            m: !1,
                            k: 0,
                            c: !1,
                            o: "L",
                            n: !1
                        }, {
                            name: 100,
                            x: 421,
                            y: 260,
                            length: 100,
                            g: !1,
                            l: !1,
                            f: -1,
                            i: -1,
                            m: !1,
                            k: 0,
                            c: !1,
                            o: "L",
                            n: !1
                        }, {
                            name: 100,
                            x: 322,
                            y: 102,
                            length: 100,
                            g: !1,
                            l: !1,
                            f: -2,
                            i: -1,
                            m: !1,
                            k: 0,
                            c: !1,
                            o: "L",
                            n: !1
                        }, {
                            name: 100,
                            x: 549,
                            y: 102,
                            length: 100,
                            g: !1,
                            l: !1,
                            f: -1,
                            i: -1,
                            m: !1,
                            k: 0,
                            c: !1,
                            o: "L",
                            n: !1
                        }, {
                            name: 100,
                            x: 322,
                            y: 102,
                            length: 100,
                            g: !1,
                            l: !1,
                            f: -1,
                            i: -1,
                            m: !1,
                            k: 0,
                            c: !1,
                            o: "L",
                            n: !1
                        }, {
                            name: 100,
                            x: 223,
                            y: 262,
                            length: 100,
                            g: !1,
                            l: !1,
                            f: -2,
                            i: -1,
                            m: !1,
                            k: 0,
                            c: !1,
                            o: "L",
                            n: !1
                        }]
                    }, {
                        settings: [{
                                name: 0,
                                width: 640,
                                height: 480,
                                Ca: 32
                            },
                            {
                                name: 1,
                                P: 1,
                                M: !1,
                                ka: 1
                            }
                        ],
                        Da: [{
                            name: 2,
                            x: 463,
                            y: 415
                        }, {
                            name: 3,
                            x: 417,
                            y: 162,
                            timeout: -1
                        }, {
                            name: 3,
                            x: 185,
                            y: 89,
                            timeout: -1
                        }, {
                            name: 3,
                            x: 468,
                            y: 325,
                            timeout: -1
                        }, {
                            name: 121,
                            x: 183,
                            y: 146
                        }, {
                            name: 122,
                            x: 279,
                            y: 143
                        }, {
                            name: 100,
                            x: 283,
                            y: 36,
                            length: 60,
                            g: !1,
                            l: !1,
                            f: -2,
                            i: -1,
                            m: !1,
                            k: 0,
                            c: !1,
                            o: "L",
                            n: !1
                        }, {
                            name: 100,
                            x: 331,
                            y: 261,
                            length: 100,
                            g: !1,
                            l: !1,
                            f: -1,
                            i: -1,
                            m: !1,
                            k: 0,
                            c: !1,
                            o: "L",
                            n: !1
                        }, {
                            name: 52,
                            x: 329,
                            y: 391
                        }, {
                            name: 55,
                            x: 247,
                            y: 397,
                            b: 0
                        }, {
                            name: 4,
                            x: 45,
                            y: 263,
                            locale: "en",
                            text: "Click the air cushion to blow object",
                            width: 180
                        }, {
                            name: 8,
                            x: 230,
                            y: 335,
                            locale: "en",
                            b: 270,
                            C: 100,
                            K: 100
                        }],
                        v: [{
                            name: 8,
                            x: 229,
                            y: 334,
                            locale: "ru",
                            b: 270,
                            C: 100,
                            K: 100
                        }, {
                            name: 4,
                            x: 25,
                            y: 282,
                            locale: "ru",
                            text: "\u041d\u0430\u0436\u043c\u0438\u0442\u0435 \u043d\u0430 \u043f\u043e\u0434\u0443\u0448\u043a\u0443 \u0447\u0442\u043e\u0431\u044b \u043f\u043e\u0434\u0443\u0442\u044c \u043d\u0430 \u043b\u0435\u0434\u0435\u043d\u0435\u0446",
                            width: 180
                        }],
                        u: [{
                            name: 8,
                            x: 230,
                            y: 334,
                            locale: "fr",
                            b: 270,
                            C: 100,
                            K: 100
                        }, {
                            name: 4,
                            x: 32,
                            y: 260,
                            locale: "fr",
                            text: "Clique le coussin d'air pour souffler sur les objets",
                            width: 180
                        }],
                        t: [{
                            name: 8,
                            x: 229,
                            y: 334,
                            locale: "de",
                            b: 270,
                            C: 100,
                            K: 100
                        }, {
                            name: 4,
                            x: 61,
                            y: 240,
                            locale: "de",
                            text: "Klicke auf das Luftkissen, um auf den Gegenstand zu blasen",
                            width: 230
                        }]
                    }, {
                        settings: [{
                            name: 0,
                            width: 640,
                            height: 480,
                            Ca: 32
                        }, {
                            name: 1,
                            P: 1,
                            M: !1,
                            ka: 1
                        }],
                        Da: [{
                            name: 2,
                            x: 137,
                            y: 296
                        }, {
                            name: 3,
                            x: 355,
                            y: 366,
                            timeout: -1
                        }, {
                            name: 3,
                            x: 197,
                            y: 251,
                            timeout: 7
                        }, {
                            name: 3,
                            x: 195,
                            y: 319,
                            timeout: -1
                        }, {
                            name: 121,
                            x: 138,
                            y: 200
                        }, {
                            name: 122,
                            x: 293,
                            y: 229
                        }, {
                            name: 100,
                            x: 289,
                            y: 76,
                            length: 155,
                            g: !1,
                            l: !1,
                            f: -2,
                            i: -1,
                            m: !1,
                            k: 0,
                            c: !1,
                            o: "L",
                            n: !1
                        }, {
                            name: 100,
                            x: 421,
                            y: 76,
                            length: 80,
                            g: !1,
                            l: !1,
                            f: -1,
                            i: -1,
                            m: !1,
                            k: 0,
                            c: !1,
                            o: "L",
                            n: !1
                        }, {
                            name: 52,
                            x: 418,
                            y: 181
                        }, {
                            name: 55,
                            x: 490,
                            y: 281,
                            b: 180
                        }, {
                            name: 100,
                            x: 355,
                            y: 76,
                            length: 160,
                            g: !1,
                            l: !1,
                            f: -1,
                            i: -1,
                            m: !1,
                            k: 0,
                            c: !1,
                            o: "L",
                            n: !1
                        }, {
                            name: 100,
                            x: 290,
                            y: 75,
                            length: 240,
                            g: !1,
                            l: !1,
                            f: -1,
                            i: -1,
                            m: !1,
                            k: 0,
                            c: !1,
                            o: "L",
                            n: !1
                        }, {
                            name: 55,
                            x: 490,
                            y: 360,
                            b: 180
                        }]
                    }]
                }, {
                    Re: [{
                        settings: [{
                            name: 0,
                            width: 640,
                            height: 480,
                            Ca: 32
                        }, {
                            name: 1,
                            P: 1,
                            M: !1,
                            ka: 1
                        }],
                        Da: [{
                                name: 2,
                                x: 129,
                                y: 376
                            }, {
                                name: 52,
                                x: 268,
                                y: 204
                            }, {
                                name: 3,
                                x: 513,
                                y: 177,
                                timeout: -1
                            }, {
                                name: 3,
                                x: 127,
                                y: 182,
                                timeout: -1
                            }, {
                                name: 3,
                                x: 128,
                                y: 150,
                                timeout: -1
                            },
                            {
                                name: 100,
                                x: 128,
                                y: 226,
                                length: 130,
                                g: !1,
                                l: !1,
                                f: -1,
                                i: -1,
                                m: !1,
                                k: 0,
                                c: !1,
                                o: "L",
                                n: !1
                            }, {
                                name: 100,
                                x: 322,
                                y: 48,
                                length: 130,
                                g: !1,
                                l: !1,
                                f: -1,
                                i: -1,
                                m: !1,
                                k: 0,
                                c: !1,
                                o: "L",
                                n: !1
                            }, {
                                name: 54,
                                x: 269,
                                y: 313
                            }, {
                                name: 4,
                                x: 225,
                                y: 81,
                                locale: "en",
                                text: "Click to pop the bubble",
                                width: 200,
                                P: 5
                            }, {
                                name: 4,
                                x: 258,
                                y: 389,
                                locale: "en",
                                text: "The bubble will lift the candy up",
                                width: 140
                            }, {
                                name: 9,
                                x: 130,
                                y: 59,
                                locale: "en",
                                C: 100,
                                K: 100,
                                P: 5
                            }, {
                                name: 100,
                                x: 322,
                                y: 48,
                                length: 130,
                                g: !1,
                                l: !1,
                                f: -2,
                                i: -1,
                                m: !1,
                                k: 0,
                                c: !1,
                                o: "L",
                                n: !1
                            }, {
                                name: 100,
                                x: 515,
                                y: 228,
                                length: 130,
                                g: !1,
                                l: !1,
                                f: -2,
                                i: -1,
                                m: !1,
                                k: 0,
                                c: !1,
                                o: "L",
                                n: !1
                            }, {
                                name: 54,
                                x: 378,
                                y: 313
                            }, {
                                name: 121,
                                x: 513,
                                y: 376
                            }, {
                                name: 122,
                                x: 379,
                                y: 206
                            }, {
                                name: 9,
                                x: 512,
                                y: 60,
                                locale: "en",
                                C: 100,
                                K: 100,
                                P: 5
                            }, {
                                name: 13,
                                x: 325,
                                y: 372,
                                locale: "en",
                                C: 100,
                                K: 100
                            }
                        ],
                        v: [{
                            name: 4,
                            x: 214,
                            y: 80,
                            locale: "ru",
                            text: "\u041d\u0430\u0436\u043c\u0438\u0442\u0435 \u0447\u0442\u043e\u0431\u044b \u043b\u043e\u043f\u043d\u0443\u0442\u044c \u043f\u0443\u0437\u044b\u0440\u044c",
                            width: 220,
                            P: 5
                        }, {
                            name: 4,
                            x: 258,
                            y: 389,
                            locale: "ru",
                            text: "\u041f\u0443\u0437\u044b\u0440\u044c \u043f\u043e\u0434\u044b\u043c\u0435\u0442 \u043b\u0435\u0434\u0435\u043d\u0435\u0446 \u0432\u0432\u0435\u0440\u0445",
                            width: 140
                        }, {
                            name: 9,
                            x: 130,
                            y: 59,
                            locale: "ru",
                            C: 100,
                            K: 100,
                            P: 5
                        }, {
                            name: 9,
                            x: 512,
                            y: 60,
                            locale: "ru",
                            C: 100,
                            K: 100,
                            P: 5
                        }, {
                            name: 13,
                            x: 325,
                            y: 372,
                            locale: "ru",
                            C: 100,
                            K: 100
                        }],
                        u: [{
                            name: 4,
                            x: 212,
                            y: 80,
                            locale: "fr",
                            text: "Clique pour \u00e9clater la bulle",
                            width: 220,
                            P: 5
                        }, {
                            name: 4,
                            x: 258,
                            y: 389,
                            locale: "fr",
                            text: "La bulle fera monter le bonbon",
                            width: 140
                        }, {
                            name: 9,
                            x: 130,
                            y: 59,
                            locale: "fr",
                            C: 100,
                            K: 100,
                            P: 5
                        }, {
                            name: 9,
                            x: 512,
                            y: 60,
                            locale: "fr",
                            C: 100,
                            K: 100,
                            P: 5
                        }, {
                            name: 13,
                            x: 325,
                            y: 372,
                            locale: "fr",
                            C: 100,
                            K: 100
                        }],
                        t: [{
                            name: 4,
                            x: 225,
                            y: 81,
                            locale: "de",
                            text: "Klicke, um die Seifenblase platzen zu lassen",
                            width: 200,
                            P: 5
                        }, {
                            name: 4,
                            x: 258,
                            y: 389,
                            locale: "de",
                            text: "Die Seifenblase l\u00e4sst den Bonbon schweben",
                            width: 140
                        }, {
                            name: 9,
                            x: 130,
                            y: 59,
                            locale: "de",
                            C: 100,
                            K: 100,
                            P: 5
                        }, {
                            name: 9,
                            x: 512,
                            y: 60,
                            locale: "de",
                            C: 100,
                            K: 100,
                            P: 5
                        }, {
                            name: 13,
                            x: 325,
                            y: 372,
                            locale: "de",
                            C: 100,
                            K: 100
                        }]
                    }, {
                        settings: [{
                            name: 0,
                            width: 640,
                            height: 480,
                            Ca: 32
                        }, {
                            name: 1,
                            P: 1,
                            M: !1,
                            ka: 1
                        }],
                        Da: [{
                            name: 2,
                            x: 224,
                            y: 396
                        }, {
                            name: 52,
                            x: 229,
                            y: 86
                        }, {
                            name: 3,
                            x: 238,
                            y: 342,
                            timeout: -1
                        }, {
                            name: 3,
                            x: 224,
                            y: 158,
                            timeout: 2
                        }, {
                            name: 3,
                            x: 210,
                            y: 342,
                            timeout: -1
                        }, {
                            name: 121,
                            x: 486,
                            y: 190
                        }, {
                            name: 122,
                            x: 484,
                            y: 245
                        }, {
                            name: 100,
                            x: 354,
                            y: 196,
                            length: 100,
                            g: !1,
                            l: !1,
                            f: -2,
                            i: -1,
                            m: !1,
                            k: 0,
                            c: !1,
                            o: "L",
                            n: !1
                        }, {
                            name: 54,
                            x: 227,
                            y: 85
                        }, {
                            name: 100,
                            x: 225,
                            y: 196,
                            length: 60,
                            g: !1,
                            l: !1,
                            f: -1,
                            i: -1,
                            m: !1,
                            k: 0,
                            c: !1,
                            o: "L",
                            n: !1
                        }]
                    }, {
                        settings: [{
                            name: 0,
                            width: 640,
                            height: 480,
                            Ca: 32
                        }, {
                            name: 1,
                            P: 1,
                            M: !1,
                            ka: 1
                        }],
                        Da: [{
                            name: 52,
                            x: 221,
                            y: 279
                        }, {
                            name: 100,
                            x: 126,
                            y: 208,
                            length: 90,
                            g: !1,
                            l: !1,
                            f: -1,
                            i: -1,
                            m: !1,
                            k: 0,
                            c: !1,
                            o: "L",
                            n: !1
                        }, {
                            name: 100,
                            x: 319,
                            y: 208,
                            length: 90,
                            g: !1,
                            l: !1,
                            f: -1,
                            i: -1,
                            m: !1,
                            k: 0,
                            c: !1,
                            o: "L",
                            n: !1
                        }, {
                            name: 100,
                            x: 121,
                            y: 343,
                            length: 90,
                            g: !1,
                            l: !1,
                            f: -1,
                            i: -1,
                            m: !1,
                            k: 0,
                            c: !1,
                            o: "L",
                            n: !1
                        }, {
                            name: 100,
                            x: 319,
                            y: 337,
                            length: 90,
                            g: !1,
                            l: !1,
                            f: -1,
                            i: -1,
                            m: !1,
                            k: 0,
                            c: !1,
                            o: "L",
                            n: !1
                        }, {
                            name: 100,
                            x: 321,
                            y: 28,
                            length: 80,
                            g: !1,
                            l: !1,
                            f: -2,
                            i: -1,
                            m: !1,
                            k: 0,
                            c: !1,
                            o: "L",
                            n: !1
                        }, {
                            name: 100,
                            x: 499,
                            y: 30,
                            length: 80,
                            g: !1,
                            l: !1,
                            f: -2,
                            i: -1,
                            m: !1,
                            k: 0,
                            c: !1,
                            o: "L",
                            n: !1
                        }, {
                            name: 100,
                            x: 321,
                            y: 150,
                            length: 80,
                            g: !1,
                            l: !1,
                            f: -2,
                            i: -1,
                            m: !1,
                            k: 0,
                            c: !1,
                            o: "L",
                            n: !1
                        }, {
                            name: 100,
                            x: 500,
                            y: 152,
                            length: 80,
                            g: !1,
                            l: !1,
                            f: -2,
                            i: -1,
                            m: !1,
                            k: 0,
                            c: !1,
                            o: "L",
                            n: !1
                        }, {
                            name: 122,
                            x: 412,
                            y: 95
                        }, {
                            name: 2,
                            x: 228,
                            y: 84
                        }, {
                            name: 121,
                            x: 315,
                            y: 82
                        }, {
                            name: 54,
                            x: 219,
                            y: 412
                        }, {
                            name: 3,
                            x: 412,
                            y: 211,
                            timeout: -1
                        }, {
                            name: 3,
                            x: 320,
                            y: 268,
                            timeout: -1
                        }, {
                            name: 3,
                            x: 319,
                            y: 450,
                            timeout: -1
                        }, {
                            name: 54,
                            x: 220,
                            y: 215
                        }]
                    }, {
                        settings: [{
                            name: 0,
                            width: 640,
                            height: 480,
                            Ca: 32
                        }, {
                            name: 1,
                            P: 1,
                            M: !1,
                            ka: 1
                        }],
                        Da: [{
                            name: 2,
                            x: 543,
                            y: 90
                        }, {
                            name: 121,
                            x: 543,
                            y: 360
                        }, {
                            name: 100,
                            x: 118,
                            y: 404,
                            length: 60,
                            g: !1,
                            l: !1,
                            f: -1,
                            i: -1,
                            m: !1,
                            k: 0,
                            c: !1,
                            o: "L",
                            n: !1
                        }, {
                            name: 54,
                            x: 119,
                            y: 304
                        }, {
                            name: 52,
                            x: 120,
                            y: 306
                        }, {
                            name: 122,
                            x: 221,
                            y: 307
                        }, {
                            name: 100,
                            x: 224,
                            y: 404,
                            length: 60,
                            g: !1,
                            l: !1,
                            f: -2,
                            i: -1,
                            m: !1,
                            k: 0,
                            c: !1,
                            o: "L",
                            n: !1
                        }, {
                            name: 54,
                            x: 221,
                            y: 305
                        }, {
                            name: 55,
                            x: 73,
                            y: 95,
                            b: 60
                        }, {
                            name: 55,
                            x: 186,
                            y: 92,
                            b: 60
                        }, {
                            name: 55,
                            x: 302,
                            y: 92,
                            b: 60
                        }, {
                            name: 3,
                            x: 311,
                            y: 173,
                            path: "0,180",
                            C: 50,
                            timeout: -1
                        }, {
                            name: 3,
                            x: 385,
                            y: 345,
                            path: "0,-180",
                            C: 15,
                            timeout: -1
                        }, {
                            name: 3,
                            x: 457,
                            y: 173,
                            path: "0,180",
                            C: 30,
                            timeout: -1
                        }, {
                            name: 55,
                            x: 410,
                            y: 92,
                            b: 60
                        }]
                    }, {
                        settings: [{
                            name: 0,
                            width: 640,
                            height: 480,
                            Ca: 32
                        }, {
                            name: 1,
                            P: 1,
                            M: !1,
                            ka: 1
                        }],
                        Da: [{
                            name: 2,
                            x: 377,
                            y: 75
                        }, {
                            name: 121,
                            x: 282,
                            y: 75
                        }, {
                            name: 52,
                            x: 140,
                            y: 254
                        }, {
                            name: 122,
                            x: 516,
                            y: 210
                        }, {
                            name: 100,
                            x: 399,
                            y: 233,
                            length: 100,
                            g: !1,
                            l: !1,
                            f: -2,
                            i: -1,
                            m: !1,
                            k: 0,
                            c: !1,
                            o: "L",
                            n: !1
                        }, {
                            name: 100,
                            x: 621,
                            y: 235,
                            length: 100,
                            g: !1,
                            l: !1,
                            f: -2,
                            i: -1,
                            m: !1,
                            k: 0,
                            c: !1,
                            o: "L",
                            n: !1
                        }, {
                            name: 100,
                            x: 230,
                            y: 316,
                            length: 120,
                            g: !1,
                            l: !1,
                            f: -1,
                            i: -1,
                            m: !1,
                            k: 0,
                            c: !1,
                            o: "L",
                            n: !1
                        }, {
                            name: 54,
                            x: 514,
                            y: 209
                        }, {
                            name: 100,
                            x: 47,
                            y: 29,
                            length: 250,
                            g: !1,
                            l: !1,
                            f: -1,
                            i: -1,
                            m: !1,
                            k: 0,
                            c: !1,
                            o: "L",
                            n: !1
                        }, {
                            name: 54,
                            x: 330,
                            y: 419
                        }, {
                            name: 100,
                            x: 515,
                            y: 443,
                            length: 200,
                            g: !1,
                            l: !1,
                            f: -2,
                            i: -1,
                            m: !1,
                            k: 0,
                            c: !1,
                            o: "L",
                            n: !1
                        }, {
                            name: 3,
                            x: 515,
                            y: 137,
                            timeout: -1
                        }, {
                            name: 54,
                            x: 331,
                            y: 348
                        }, {
                            name: 3,
                            x: 332,
                            y: 420,
                            timeout: -1
                        }, {
                            name: 3,
                            x: 65,
                            y: 364,
                            timeout: -1
                        }, {
                            name: 100,
                            x: 228,
                            y: 28,
                            length: 250,
                            g: !1,
                            l: !1,
                            f: -1,
                            i: -1,
                            m: !1,
                            k: 0,
                            c: !1,
                            o: "L",
                            n: !1
                        }, {
                            name: 60,
                            x: 329,
                            y: 89,
                            b: 90,
                            size: 4,
                            qb: !1
                        }, {
                            name: 57,
                            x: 329,
                            y: 209,
                            b: 90,
                            size: 1,
                            qb: !1
                        }]
                    }]
                }, {
                    Re: [{
                        settings: [{
                            name: 0,
                            width: 640,
                            height: 480,
                            Ca: 32
                        }, {
                            name: 1,
                            P: 1,
                            M: !1,
                            ka: 1
                        }],
                        Da: [{
                            name: 2,
                            x: 566,
                            y: 337
                        }, {
                            name: 121,
                            x: 97,
                            y: 341
                        }, {
                            name: 122,
                            x: 268,
                            y: 223
                        }, {
                            name: 100,
                            x: 269,
                            y: 102,
                            length: 100,
                            g: !1,
                            l: !1,
                            f: -2,
                            i: -1,
                            m: !1,
                            k: 0,
                            c: !1,
                            o: "R",
                            n: !1
                        }, {
                            name: 100,
                            x: 375,
                            y: 104,
                            length: 100,
                            g: !1,
                            l: !1,
                            f: -1,
                            i: -1,
                            m: !1,
                            k: 0,
                            c: !1,
                            o: "L",
                            n: !1
                        }, {
                            name: 52,
                            x: 373,
                            y: 228
                        }, {
                            name: 82,
                            x: 165,
                            y: 418,
                            b: 0,
                            size: 2
                        }, {
                            name: 82,
                            x: 274,
                            y: 418,
                            b: 0,
                            size: 2
                        }, {
                            name: 82,
                            x: 494,
                            y: 418,
                            b: 0,
                            size: 2
                        }, {
                            name: 82,
                            x: 491,
                            y: 344,
                            b: 90,
                            size: 2,
                            path: "-300,0",
                            C: 45
                        }, {
                            name: 82,
                            x: 387,
                            y: 418,
                            b: 0,
                            size: 2
                        }, {
                            name: 3,
                            x: 446,
                            y: 352,
                            timeout: -1
                        }, {
                            name: 3,
                            x: 319,
                            y: 351,
                            timeout: -1
                        }, {
                            name: 3,
                            x: 208,
                            y: 353,
                            timeout: -1
                        }, {
                            name: 4,
                            x: 44,
                            y: 133,
                            locale: "en",
                            text: "Candy will bounce away from this platform",
                            width: 160
                        }, {
                            name: 13,
                            x: 117,
                            y: 116,
                            locale: "en",
                            C: 100,
                            K: 100
                        }, {
                            name: 81,
                            x: 82,
                            y: 408,
                            b: 20,
                            size: 1
                        }, {
                            name: 81,
                            x: 579,
                            y: 408,
                            b: -20,
                            size: 1
                        }],
                        v: [{
                            name: 4,
                            x: 44,
                            y: 133,
                            locale: "ru",
                            text: "\u041b\u0435\u0434\u0435\u043d\u0435\u0446 \u043e\u0442\u0441\u043a\u0430\u043a\u0438\u0432\u0430\u0435\u0442 \u043e\u0442 \u0442\u0430\u043a\u0438\u0445 \u043f\u043b\u0430\u0442\u0444\u043e\u0440\u043c",
                            width: 160
                        }, {
                            name: 13,
                            x: 117,
                            y: 116,
                            locale: "ru",
                            C: 100,
                            K: 100
                        }],
                        t: [{
                            name: 4,
                            x: 44,
                            y: 133,
                            locale: "de",
                            text: "Von dieser Plattform prallt der Bonbon ab",
                            width: 160
                        }, {
                            name: 13,
                            x: 117,
                            y: 116,
                            locale: "de",
                            C: 100,
                            K: 100
                        }],
                        u: [{
                            name: 4,
                            x: 44,
                            y: 133,
                            locale: "fr",
                            text: "Le bonbon rebondira hors de cette plateforme",
                            width: 160
                        }, {
                            name: 13,
                            x: 117,
                            y: 116,
                            locale: "fr",
                            C: 100,
                            K: 100
                        }]
                    }, {
                        settings: [{
                            name: 0,
                            width: 640,
                            height: 480,
                            Ca: 32
                        }, {
                            name: 1,
                            P: 1,
                            M: !1,
                            ka: 1
                        }],
                        Da: [{
                            name: 52,
                            x: 515,
                            y: 183
                        }, {
                            name: 82,
                            x: 274,
                            y: 368,
                            b: 0,
                            size: 2
                        }, {
                            name: 122,
                            x: 276,
                            y: 121
                        }, {
                            name: 100,
                            x: 540,
                            y: 66,
                            length: 100,
                            g: !1,
                            l: !1,
                            f: -1,
                            i: -1,
                            m: !1,
                            k: 0,
                            c: !1,
                            o: "L",
                            n: !1
                        }, {
                            name: 2,
                            x: 120,
                            y: 422
                        }, {
                            name: 121,
                            x: 551,
                            y: 390
                        }, {
                            name: 100,
                            x: 386,
                            y: 184,
                            length: 100,
                            g: !1,
                            l: !1,
                            f: -1,
                            i: -1,
                            m: !1,
                            k: 0,
                            c: !1,
                            o: "L",
                            n: !1
                        }, {
                            name: 82,
                            x: 434,
                            y: 442,
                            b: 0,
                            size: 2
                        }, {
                            name: 3,
                            x: 174,
                            y: 277,
                            timeout: -1
                        }, {
                            name: 3,
                            x: 517,
                            y: 245,
                            timeout: -1
                        }, {
                            name: 3,
                            x: 434,
                            y: 391,
                            timeout: -1
                        }, {
                            name: 82,
                            x: 277,
                            y: 61,
                            b: 180,
                            size: 2
                        }, {
                            name: 54,
                            x: 278,
                            y: 120
                        }, {
                            name: 100,
                            x: 115,
                            y: 277,
                            length: 100,
                            g: !1,
                            l: !1,
                            f: 60,
                            i: -1,
                            m: !1,
                            k: 0,
                            c: !1,
                            o: "L",
                            n: !1
                        }]
                    }, {
                        settings: [{
                                name: 0,
                                width: 640,
                                height: 480,
                                Ca: 32
                            },
                            {
                                name: 1,
                                P: 1,
                                M: !1,
                                ka: 1
                            }
                        ],
                        Da: [{
                            name: 52,
                            x: 146,
                            y: 271
                        }, {
                            name: 3,
                            x: 333,
                            y: 234,
                            timeout: -1
                        }, {
                            name: 2,
                            x: 578,
                            y: 295
                        }, {
                            name: 121,
                            x: 52,
                            y: 287
                        }, {
                            name: 122,
                            x: 275,
                            y: 273
                        }, {
                            name: 3,
                            x: 578,
                            y: 243,
                            timeout: -1
                        }, {
                            name: 82,
                            x: 144,
                            y: 344,
                            b: 0,
                            size: 2
                        }, {
                            name: 3,
                            x: 537,
                            y: 90,
                            timeout: -1
                        }, {
                            name: 54,
                            x: 480,
                            y: 276
                        }, {
                            name: 55,
                            x: 145,
                            y: 400,
                            b: 270
                        }, {
                            name: 100,
                            x: 225,
                            y: 160,
                            length: 100,
                            g: !1,
                            l: !1,
                            f: 80,
                            i: -1,
                            m: !1,
                            k: 0,
                            c: !1,
                            o: "L",
                            n: !1
                        }, {
                            name: 100,
                            x: 452,
                            y: 162,
                            length: 100,
                            g: !1,
                            l: !1,
                            f: 80,
                            i: -1,
                            m: !1,
                            k: 0,
                            c: !1,
                            o: "L",
                            n: !1
                        }, {
                            name: 81,
                            x: 287,
                            y: 344,
                            b: 0,
                            size: 1
                        }, {
                            name: 81,
                            x: 226,
                            y: 335,
                            b: -20,
                            size: 1
                        }, {
                            name: 82,
                            x: 371,
                            y: 344,
                            b: 0,
                            size: 2
                        }, {
                            name: 82,
                            x: 474,
                            y: 344,
                            b: 0,
                            size: 2
                        }, {
                            name: 58,
                            x: 539,
                            y: 50,
                            b: 0,
                            size: 2,
                            qb: !1
                        }]
                    }, {
                        settings: [{
                            name: 0,
                            width: 640,
                            height: 480,
                            Ca: 32
                        }, {
                            name: 1,
                            P: 1,
                            M: !1,
                            ka: 1
                        }],
                        Da: [{
                            name: 52,
                            x: 249,
                            y: 269
                        }, {
                            name: 100,
                            x: 154,
                            y: 198,
                            length: 90,
                            g: !1,
                            l: !1,
                            f: -1,
                            i: -1,
                            m: !1,
                            k: 0,
                            c: !1,
                            o: "L",
                            n: !1
                        }, {
                            name: 100,
                            x: 345,
                            y: 198,
                            length: 90,
                            g: !1,
                            l: !1,
                            f: -1,
                            i: -1,
                            m: !1,
                            k: 0,
                            c: !1,
                            o: "L",
                            n: !1
                        }, {
                            name: 100,
                            x: 538,
                            y: 199,
                            length: 90,
                            g: !1,
                            l: !1,
                            f: -2,
                            i: -1,
                            m: !1,
                            k: 0,
                            c: !1,
                            o: "L",
                            n: !1
                        }, {
                            name: 100,
                            x: 344,
                            y: 197,
                            length: 90,
                            g: !1,
                            l: !1,
                            f: -2,
                            i: -1,
                            m: !1,
                            k: 0,
                            c: !1,
                            o: "L",
                            n: !1
                        }, {
                            name: 122,
                            x: 444,
                            y: 263
                        }, {
                            name: 2,
                            x: 129,
                            y: 416
                        }, {
                            name: 121,
                            x: 123,
                            y: 53
                        }, {
                            name: 54,
                            x: 341,
                            y: 440
                        }, {
                            name: 3,
                            x: 124,
                            y: 197,
                            timeout: -1
                        }, {
                            name: 3,
                            x: 344,
                            y: 268,
                            timeout: -1
                        }, {
                            name: 3,
                            x: 343,
                            y: 376,
                            timeout: -1
                        }, {
                            name: 82,
                            x: 210,
                            y: 100,
                            b: 15,
                            size: 2
                        }, {
                            name: 82,
                            x: 300,
                            y: 105,
                            b: 15,
                            size: 2
                        }, {
                            name: 82,
                            x: 390,
                            y: 110,
                            b: 15,
                            size: 2
                        }, {
                            name: 82,
                            x: 480,
                            y: 115,
                            b: 15,
                            size: 2
                        }, {
                            name: 82,
                            x: 570,
                            y: 120,
                            b: 15,
                            size: 2
                        }, {
                            name: 54,
                            x: 538,
                            y: 314
                        }]
                    }, {
                        settings: [{
                            name: 0,
                            width: 640,
                            height: 480,
                            Ca: 32
                        }, {
                            name: 1,
                            P: 1,
                            M: !1,
                            ka: 1
                        }],
                        Da: [{
                            name: 52,
                            x: 199,
                            y: 79
                        }, {
                            name: 122,
                            x: 51,
                            y: 116
                        }, {
                            name: 121,
                            x: 585,
                            y: 360
                        }, {
                            name: 2,
                            x: 55,
                            y: 363
                        }, {
                            name: 3,
                            x: 476,
                            y: 368,
                            timeout: -1
                        }, {
                            name: 3,
                            x: 639,
                            y: 294,
                            timeout: -1
                        }, {
                            name: 3,
                            x: 170,
                            y: 369,
                            timeout: -1
                        }, {
                            name: 82,
                            x: 64,
                            y: 23,
                            b: 0,
                            size: 2,
                            path: "320,0",
                            C: 40
                        }, {
                            name: 82,
                            x: 2,
                            y: 70,
                            b: 90,
                            size: 2,
                            path: "320,0",
                            C: 40
                        }, {
                            name: 82,
                            x: 124,
                            y: 73,
                            b: 90,
                            size: 2,
                            path: "320,0",
                            C: 40
                        }, {
                            name: 54,
                            x: 195,
                            y: 77
                        }, {
                            name: 54,
                            x: 52,
                            y: 116
                        }, {
                            name: 82,
                            x: 474,
                            y: 295,
                            b: 0,
                            size: 2,
                            path: "0,150",
                            C: 30
                        }, {
                            name: 55,
                            x: 381,
                            y: 366,
                            b: 0
                        }, {
                            name: 82,
                            x: 170,
                            y: 296,
                            b: 0,
                            size: 2,
                            path: "0,150",
                            C: 30
                        }, {
                            name: 55,
                            x: 259,
                            y: 371,
                            b: 180
                        }, {
                            name: 82,
                            x: 185,
                            y: 27,
                            b: 0,
                            size: 2,
                            path: "320,0",
                            C: 40
                        }, {
                            name: 82,
                            x: 245,
                            y: 77,
                            b: 90,
                            size: 2,
                            path: "320,0",
                            C: 40
                        }, {
                            name: 100,
                            x: 57,
                            y: 270,
                            length: -1,
                            g: !1,
                            l: !1,
                            f: 60,
                            i: -1,
                            m: !1,
                            k: 0,
                            c: !1,
                            o: "L",
                            n: !1
                        }, {
                            name: 100,
                            x: 585,
                            y: 265,
                            length: -1,
                            g: !1,
                            l: !1,
                            f: 60,
                            i: -1,
                            m: !1,
                            k: 0,
                            c: !1,
                            o: "L",
                            n: !1
                        }]
                    }]
                }, {
                    Re: [{
                        settings: [{
                            name: 0,
                            width: 640,
                            height: 480,
                            Ca: 32
                        }, {
                            name: 1,
                            P: 1,
                            M: !1,
                            ka: 1
                        }],
                        Da: [{
                            name: 2,
                            x: 225,
                            y: 381
                        }, {
                            name: 52,
                            x: 92,
                            y: 190
                        }, {
                            name: 3,
                            x: 98,
                            y: 317,
                            timeout: -1
                        }, {
                            name: 3,
                            x: 448,
                            y: 317,
                            path: "-250,0",
                            C: 60,
                            timeout: -1
                        }, {
                            name: 3,
                            x: 547,
                            y: 317,
                            timeout: -1
                        }, {
                            name: 121,
                            x: 417,
                            y: 379
                        }, {
                            name: 122,
                            x: 546,
                            y: 190
                        }, {
                            name: 100,
                            x: 96,
                            y: 81,
                            length: 90,
                            g: !1,
                            l: !1,
                            f: -1,
                            i: -1,
                            m: !1,
                            k: 0,
                            c: !1,
                            o: "L",
                            n: !1
                        }, {
                            name: 100,
                            x: 549,
                            y: 81,
                            length: 90,
                            g: !1,
                            l: !1,
                            f: -2,
                            i: -1,
                            m: !1,
                            k: 0,
                            c: !1,
                            o: "L",
                            n: !1
                        }, {
                            name: 56,
                            x: 98,
                            y: 377,
                            group: 0,
                            b: -90
                        }, {
                            name: 56,
                            x: 221,
                            y: 94,
                            group: 0,
                            b: 90
                        }, {
                            name: 56,
                            x: 549,
                            y: 376,
                            group: 1,
                            b: -90
                        }, {
                            name: 56,
                            x: 417,
                            y: 95,
                            group: 1,
                            b: 90
                        }, {
                            name: 4,
                            x: 239,
                            y: 156,
                            locale: "en",
                            text: "Drop the candy into the magic hat and it will fall out from the other one",
                            width: 160
                        }, {
                            name: 13,
                            x: 317,
                            y: 143,
                            locale: "en",
                            C: 100,
                            K: 100
                        }],
                        u: [{
                            name: 4,
                            x: 239,
                            y: 156,
                            locale: "fr",
                            text: "D\u00e9pose le bonbon dans le chapeau magique et il tombera de l'autre chapeau",
                            width: 160
                        }, {
                            name: 13,
                            x: 317,
                            y: 143,
                            locale: "fr",
                            C: 100,
                            K: 100
                        }],
                        t: [{
                            name: 4,
                            x: 239,
                            y: 156,
                            locale: "de",
                            text: "Wirf den Bonbon in den magischen Hut und er kommt aus einem anderen wieder raus",
                            width: 160
                        }, {
                            name: 13,
                            x: 317,
                            y: 143,
                            locale: "de",
                            C: 100,
                            K: 100
                        }],
                        v: [{
                            name: 4,
                            x: 239,
                            y: 156,
                            locale: "ru",
                            text: "\u041a\u0438\u043d\u044c\u0442\u0435 \u043a\u043e\u043d\u0444\u0435\u0442\u0443 \u0432 \u043e\u0434\u043d\u0443 \u0438\u0437 \u0432\u043e\u043b\u0448\u0435\u0431\u043d\u044b\u0445 \u0448\u043b\u044f\u043f, \u0438 \u043e\u043d\u0430 \u0432\u044b\u043b\u0435\u0442\u0438\u0442 \u0438\u0437 \u0434\u0440\u0443\u0433\u043e\u0439",
                            width: 160
                        }, {
                            name: 13,
                            x: 317,
                            y: 143,
                            locale: "ru",
                            C: 100,
                            K: 100
                        }]
                    }, {
                        settings: [{
                            name: 0,
                            width: 640,
                            height: 480,
                            Ca: 32
                        }, {
                            name: 1,
                            P: 1,
                            M: !1,
                            ka: 1
                        }],
                        Da: [{
                            name: 2,
                            x: 61,
                            y: 83
                        }, {
                            name: 121,
                            x: 61,
                            y: 327
                        }, {
                            name: 100,
                            x: 158,
                            y: 95,
                            length: 100,
                            g: !1,
                            l: !1,
                            f: -1,
                            i: -1,
                            m: !1,
                            k: 0,
                            c: !1,
                            o: "L",
                            n: !1
                        }, {
                            name: 100,
                            x: 418,
                            y: 96,
                            length: 100,
                            g: !1,
                            l: !1,
                            f: -1,
                            i: -1,
                            m: !1,
                            k: 0,
                            c: !1,
                            o: "L",
                            n: !1
                        }, {
                            name: 100,
                            x: 226,
                            y: 216,
                            length: 100,
                            g: !1,
                            l: !1,
                            f: -1,
                            i: -1,
                            m: !1,
                            k: 0,
                            c: !1,
                            o: "L",
                            n: !1
                        }, {
                            name: 100,
                            x: 358,
                            y: 216,
                            length: 100,
                            g: !1,
                            l: !1,
                            f: -1,
                            i: -1,
                            m: !1,
                            k: 0,
                            c: !1,
                            o: "L",
                            n: !1
                        }, {
                            name: 52,
                            x: 289,
                            y: 128
                        }, {
                            name: 122,
                            x: 264,
                            y: 333
                        }, {
                            name: 82,
                            x: 267,
                            y: 395,
                            b: 0,
                            size: 2
                        }, {
                            name: 82,
                            x: 385,
                            y: 395,
                            b: 0,
                            size: 2
                        }, {
                            name: 82,
                            x: 502,
                            y: 393,
                            b: 0,
                            size: 2
                        }, {
                            name: 54,
                            x: 501,
                            y: 332
                        }, {
                            name: 56,
                            x: 498,
                            y: 111,
                            group: 0,
                            b: 90
                        }, {
                            name: 56,
                            x: 62,
                            y: 228,
                            group: 0,
                            b: 270
                        }, {
                            name: 82,
                            x: 157,
                            y: 396,
                            b: 0,
                            size: 2
                        }, {
                            name: 3,
                            x: 501,
                            y: 179,
                            timeout: -1
                        }, {
                            name: 3,
                            x: 64,
                            y: 172,
                            timeout: -1
                        }, {
                            name: 3,
                            x: 145,
                            y: 336,
                            timeout: -1
                        }]
                    }, {
                        settings: [{
                            name: 0,
                            width: 640,
                            height: 480,
                            Ca: 32
                        }, {
                            name: 1,
                            P: 1,
                            M: !1,
                            ka: 1
                        }],
                        Da: [{
                            name: 52,
                            x: 149,
                            y: 251
                        }, {
                            name: 122,
                            x: 530,
                            y: 223
                        }, {
                            name: 2,
                            x: 137,
                            y: 398
                        }, {
                            name: 121,
                            x: 446,
                            y: 397
                        }, {
                            name: 54,
                            x: 149,
                            y: 248
                        }, {
                            name: 82,
                            x: 147,
                            y: 190,
                            b: 180,
                            size: 2
                        }, {
                            name: 100,
                            x: 394,
                            y: 96,
                            length: 60,
                            g: !1,
                            l: !1,
                            f: 70,
                            i: -1,
                            m: !1,
                            k: 0,
                            c: !1,
                            o: "L",
                            n: !1
                        }, {
                            name: 3,
                            x: 319,
                            y: 300,
                            timeout: -1
                        }, {
                            name: 3,
                            x: 308,
                            y: 47,
                            timeout: -1
                        }, {
                            name: 100,
                            x: 531,
                            y: 93,
                            length: 100,
                            g: !1,
                            l: !1,
                            f: -2,
                            i: -1,
                            m: !1,
                            k: 0,
                            c: !1,
                            o: "L",
                            n: !1
                        }, {
                            name: 56,
                            x: 530,
                            y: 390,
                            group: 0,
                            b: 270
                        }, {
                            name: 56,
                            x: 74,
                            y: 239,
                            group: 0,
                            b: 0
                        }, {
                            name: 54,
                            x: 529,
                            y: 306
                        }, {
                            name: 3,
                            x: 530,
                            y: 40,
                            timeout: 6
                        }]
                    }, {
                        settings: [{
                            name: 0,
                            width: 640,
                            height: 480,
                            Ca: 32
                        }, {
                            name: 1,
                            P: 1,
                            M: !1,
                            ka: 1
                        }],
                        Da: [{
                                name: 2,
                                x: 425,
                                y: 372
                            },
                            {
                                name: 121,
                                x: 220,
                                y: 373
                            }, {
                                name: 122,
                                x: 512,
                                y: 183
                            }, {
                                name: 52,
                                x: 131,
                                y: 191
                            }, {
                                name: 100,
                                x: 137,
                                y: 103,
                                length: 50,
                                g: !1,
                                l: !1,
                                f: -1,
                                i: -1,
                                m: !1,
                                k: 0,
                                c: !1,
                                o: "L",
                                n: !1
                            }, {
                                name: 56,
                                x: 132,
                                y: 370,
                                group: 0,
                                b: 270
                            }, {
                                name: 56,
                                x: 227,
                                y: 166,
                                group: 0,
                                b: 30
                            }, {
                                name: 56,
                                x: 511,
                                y: 372,
                                group: 1,
                                b: 270
                            }, {
                                name: 56,
                                x: 414,
                                y: 164,
                                group: 1,
                                b: 150
                            }, {
                                name: 100,
                                x: 511,
                                y: 107,
                                length: 50,
                                g: !1,
                                l: !1,
                                f: -2,
                                i: -1,
                                m: !1,
                                k: 0,
                                c: !1,
                                o: "L",
                                n: !1
                            }, {
                                name: 54,
                                x: 218,
                                y: 261
                            }, {
                                name: 3,
                                x: 415,
                                y: 264,
                                timeout: -1
                            }, {
                                name: 3,
                                x: 220,
                                y: 261,
                                timeout: -1
                            }, {
                                name: 3,
                                x: 321,
                                y: 140,
                                path: "0,200",
                                C: 50,
                                timeout: -1
                            },
                            {
                                name: 54,
                                x: 413,
                                y: 263
                            }, {
                                name: 82,
                                x: 511,
                                y: 107,
                                b: 0,
                                size: 2
                            }, {
                                name: 82,
                                x: 136,
                                y: 102,
                                b: 0,
                                size: 2
                            }
                        ]
                    }, {
                        settings: [{
                            name: 0,
                            width: 640,
                            height: 480,
                            Ca: 32
                        }, {
                            name: 1,
                            P: 1,
                            M: !1,
                            ka: 1
                        }],
                        Da: [{
                            name: 2,
                            x: 130,
                            y: 158
                        }, {
                            name: 121,
                            x: 52,
                            y: 385
                        }, {
                            name: 122,
                            x: 78,
                            y: 164
                        }, {
                            name: 52,
                            x: 408,
                            y: 245
                        }, {
                            name: 3,
                            x: 538,
                            y: 403,
                            timeout: -1
                        }, {
                            name: 3,
                            x: 539,
                            y: 49,
                            timeout: -1
                        }, {
                            name: 3,
                            x: 280,
                            y: 335,
                            timeout: -1
                        }, {
                            name: 54,
                            x: 538,
                            y: 337
                        }, {
                            name: 56,
                            x: 28,
                            y: 171,
                            group: 0,
                            b: 0
                        }, {
                            name: 56,
                            x: 273,
                            y: 292,
                            group: 0,
                            b: 90
                        }, {
                            name: 100,
                            x: 538,
                            y: 175,
                            length: 110,
                            g: !1,
                            l: !1,
                            f: -1,
                            i: -1,
                            m: !1,
                            k: 0,
                            c: !1,
                            o: "L",
                            n: !1
                        }, {
                            name: 100,
                            x: 408,
                            y: 342,
                            length: 110,
                            g: !1,
                            l: !1,
                            f: -1,
                            i: -1,
                            m: !1,
                            k: 0,
                            c: !1,
                            o: "L",
                            n: !1
                        }, {
                            name: 56,
                            x: 281,
                            y: 380,
                            group: 1,
                            b: 270
                        }, {
                            name: 56,
                            x: 535,
                            y: 131,
                            group: 1,
                            b: 90
                        }, {
                            name: 100,
                            x: 281,
                            y: 168,
                            length: 110,
                            g: !1,
                            l: !1,
                            f: -1,
                            i: -1,
                            m: !1,
                            k: 0,
                            c: !1,
                            o: "L",
                            n: !1
                        }, {
                            name: 54,
                            x: 536,
                            y: 400
                        }, {
                            name: 100,
                            x: 81,
                            y: 25,
                            length: 100,
                            g: !1,
                            l: !1,
                            f: -2,
                            i: -1,
                            m: !1,
                            k: 0,
                            c: !1,
                            o: "L",
                            n: !1
                        }]
                    }]
                }, {
                    Re: [{
                        settings: [{
                            name: 0,
                            width: 640,
                            height: 480,
                            Ca: 32
                        }, {
                            name: 1,
                            P: 1,
                            M: !1,
                            ka: 1
                        }],
                        Da: [{
                                name: 2,
                                x: 313,
                                y: 395
                            }, {
                                name: 3,
                                x: 346,
                                y: 135,
                                timeout: -1
                            }, {
                                name: 3,
                                x: 539,
                                y: 134,
                                timeout: -1
                            },
                            {
                                name: 3,
                                x: 440,
                                y: 40,
                                timeout: -1
                            }, {
                                name: 121,
                                x: 534,
                                y: 286
                            }, {
                                name: 122,
                                x: 439,
                                y: 227
                            }, {
                                name: 100,
                                x: 442,
                                y: 133,
                                length: 60,
                                g: !1,
                                l: !1,
                                f: -2,
                                i: -1,
                                m: !1,
                                k: 0,
                                c: !1,
                                o: "L",
                                n: !1
                            }, {
                                name: 52,
                                x: 263,
                                y: 297
                            }, {
                                name: 100,
                                x: 211,
                                y: 222,
                                length: 50,
                                g: !1,
                                l: !1,
                                f: -1,
                                i: 170,
                                m: !1,
                                k: 170,
                                c: !1,
                                o: "L",
                                n: !1
                            }, {
                                name: 100,
                                x: 315,
                                y: 223,
                                length: 50,
                                g: !1,
                                l: !1,
                                f: -1,
                                i: -1,
                                m: !1,
                                k: 0,
                                c: !1,
                                o: "L",
                                n: !1
                            }, {
                                name: 4,
                                x: 58,
                                y: 64,
                                locale: "en",
                                text: "Some rope hooks can be moved with the cursor",
                                width: 150
                            }, {
                                name: 8,
                                x: 210,
                                y: 169,
                                locale: "en",
                                b: 300,
                                C: 100,
                                K: 100
                            }
                        ],
                        v: [{
                            name: 4,
                            x: 76,
                            y: 64,
                            locale: "ru",
                            text: "\u0422\u0430\u043a\u0438\u0435 \u043a\u0440\u0435\u043f\u0435\u0436\u0438 \u043c\u043e\u0436\u043d\u043e \u0434\u0432\u0438\u0433\u0430\u0442\u044c \u043a\u0443\u0440\u0441\u043e\u0440\u043e\u043c",
                            width: 150
                        }, {
                            name: 8,
                            x: 210,
                            y: 169,
                            locale: "ru",
                            b: 300,
                            C: 100,
                            K: 100
                        }],
                        u: [{
                            name: 4,
                            x: 58,
                            y: 64,
                            locale: "fr",
                            text: "Tu peux d\u00e9placer certains crochets de corde avec le courseur",
                            width: 150
                        }, {
                            name: 8,
                            x: 210,
                            y: 169,
                            locale: "fr",
                            b: 300,
                            C: 100,
                            K: 100
                        }],
                        t: [{
                            name: 4,
                            x: 65,
                            y: 64,
                            locale: "de",
                            text: "Einige Seilhaken kannst du mit dem Kursor verschieben",
                            width: 150
                        }, {
                            name: 8,
                            x: 210,
                            y: 169,
                            locale: "de",
                            b: 300,
                            C: 100,
                            K: 100
                        }]
                    }, {
                        settings: [{
                            name: 0,
                            width: 640,
                            height: 480,
                            Ca: 32
                        }, {
                            name: 1,
                            P: 1,
                            M: !1,
                            ka: 1
                        }],
                        Da: [{
                            name: 52,
                            x: 322,
                            y: 241
                        }, {
                            name: 100,
                            x: 591,
                            y: 293,
                            length: 100,
                            g: !1,
                            l: !1,
                            f: 60,
                            i: 200,
                            m: !1,
                            k: 200,
                            c: !1,
                            o: "L",
                            n: !1
                        }, {
                            name: 100,
                            x: 327,
                            y: 110,
                            length: 100,
                            g: !1,
                            l: !1,
                            f: -1,
                            i: 100,
                            m: !0,
                            k: 0,
                            c: !1,
                            o: "L",
                            n: !1
                        }, {
                            name: 122,
                            x: 165,
                            y: 211
                        }, {
                            name: 2,
                            x: 326,
                            y: 436
                        }, {
                            name: 121,
                            x: 60,
                            y: 101
                        }, {
                            name: 100,
                            x: 35,
                            y: 353,
                            length: 100,
                            g: !1,
                            l: !1,
                            f: 40,
                            i: 300,
                            m: !1,
                            k: 0,
                            c: !1,
                            o: "L",
                            n: !1
                        }, {
                            name: 3,
                            x: 58,
                            y: 157,
                            timeout: -1
                        }, {
                            name: 3,
                            x: 170,
                            y: 312,
                            timeout: -1
                        }, {
                            name: 3,
                            x: 419,
                            y: 36,
                            timeout: -1
                        }, {
                            name: 100,
                            x: 171,
                            y: 107,
                            length: 60,
                            g: !1,
                            l: !1,
                            f: -2,
                            i: -1,
                            m: !1,
                            k: 0,
                            c: !1,
                            o: "L",
                            n: !1
                        }]
                    }, {
                        settings: [{
                            name: 0,
                            width: 640,
                            height: 480,
                            Ca: 32
                        }, {
                            name: 1,
                            P: 1,
                            M: !1,
                            ka: 1
                        }],
                        Da: [{
                            name: 82,
                            x: 322,
                            y: 430,
                            b: 90,
                            size: 2
                        }, {
                            name: 100,
                            x: 327,
                            y: 229,
                            length: 170,
                            g: !1,
                            l: !1,
                            f: -1,
                            i: -1,
                            m: !1,
                            k: 0,
                            c: !1,
                            o: "L",
                            n: !1
                        }, {
                            name: 100,
                            x: 189,
                            y: 230,
                            length: 100,
                            g: !1,
                            l: !1,
                            f: -1,
                            i: 200,
                            m: !1,
                            k: 200,
                            c: !1,
                            o: "L",
                            n: !1
                        }, {
                            name: 52,
                            x: 184,
                            y: 377
                        }, {
                            name: 122,
                            x: 453,
                            y: 368
                        }, {
                            name: 121,
                            x: 272,
                            y: 127
                        }, {
                            name: 54,
                            x: 244,
                            y: 417
                        }, {
                            name: 2,
                            x: 369,
                            y: 127
                        }, {
                            name: 54,
                            x: 399,
                            y: 416
                        }, {
                            name: 55,
                            x: 135,
                            y: 96,
                            b: 0
                        }, {
                            name: 3,
                            x: 320,
                            y: 71,
                            timeout: -1
                        }, {
                            name: 3,
                            x: 431,
                            y: 89,
                            timeout: -1
                        }, {
                            name: 3,
                            x: 208,
                            y: 91,
                            timeout: -1
                        }, {
                            name: 100,
                            x: 461,
                            y: 231,
                            length: 100,
                            g: !1,
                            l: !1,
                            f: -2,
                            i: 200,
                            m: !1,
                            k: 0,
                            c: !1,
                            o: "L",
                            n: !1
                        }, {
                            name: 100,
                            x: 326,
                            y: 229,
                            length: 170,
                            g: !1,
                            l: !1,
                            f: -2,
                            i: -1,
                            m: !1,
                            k: 0,
                            c: !1,
                            o: "L",
                            n: !1
                        }, {
                            name: 55,
                            x: 499,
                            y: 90,
                            b: 180
                        }]
                    }, {
                        settings: [{
                            name: 0,
                            width: 640,
                            height: 480,
                            Ca: 32
                        }, {
                            name: 1,
                            P: 1,
                            M: !1,
                            ka: 1
                        }],
                        Da: [{
                            name: 52,
                            x: 395,
                            y: 233
                        }, {
                            name: 100,
                            x: 402,
                            y: 102,
                            length: 100,
                            g: !1,
                            l: !1,
                            f: -1,
                            i: -1,
                            m: !1,
                            k: 0,
                            c: !1,
                            o: "L",
                            n: !1
                        }, {
                            name: 100,
                            x: 288,
                            y: 285,
                            length: 100,
                            g: !1,
                            l: !1,
                            f: -1,
                            i: -1,
                            m: !1,
                            k: 0,
                            c: !1,
                            o: "L",
                            n: !1
                        }, {
                            name: 100,
                            x: 521,
                            y: 281,
                            length: 100,
                            g: !1,
                            l: !1,
                            f: -1,
                            i: -1,
                            m: !1,
                            k: 0,
                            c: !1,
                            o: "L",
                            n: !1
                        }, {
                            name: 122,
                            x: 155,
                            y: 302
                        }, {
                            name: 100,
                            x: 24,
                            y: 311,
                            length: 100,
                            g: !1,
                            l: !1,
                            f: -2,
                            i: -1,
                            m: !1,
                            k: 0,
                            c: !1,
                            o: "L",
                            n: !1
                        }, {
                            name: 121,
                            x: 162,
                            y: 52
                        }, {
                            name: 2,
                            x: 577,
                            y: 383
                        }, {
                            name: 3,
                            x: 518,
                            y: 390,
                            timeout: -1
                        }, {
                            name: 54,
                            x: 110,
                            y: 266
                        }, {
                            name: 100,
                            x: 167,
                            y: 178,
                            length: 100,
                            g: !1,
                            l: !1,
                            f: -2,
                            i: -1,
                            m: !1,
                            k: 0,
                            c: !1,
                            o: "L",
                            n: !1
                        }, {
                            name: 100,
                            x: 161,
                            y: 452,
                            length: 100,
                            g: !1,
                            l: !1,
                            f: -2,
                            i: -1,
                            m: !1,
                            k: 0,
                            c: !1,
                            o: "L",
                            n: !1
                        }, {
                            name: 3,
                            x: 288,
                            y: 72,
                            timeout: -1
                        }, {
                            name: 3,
                            x: 22,
                            y: 164,
                            timeout: -1
                        }, {
                            name: 54,
                            x: 285,
                            y: 209
                        }, {
                            name: 82,
                            x: 405,
                            y: 444,
                            b: 0,
                            size: 2
                        }, {
                            name: 82,
                            x: 502,
                            y: 444,
                            b: 0,
                            size: 2
                        }]
                    }, {
                        settings: [{
                            name: 0,
                            width: 640,
                            height: 480,
                            Ca: 32
                        }, {
                            name: 1,
                            P: 1,
                            M: !1,
                            ka: 1
                        }],
                        Da: [{
                            name: 2,
                            x: 334,
                            y: 69
                        }, {
                            name: 121,
                            x: 598,
                            y: 419
                        }, {
                            name: 122,
                            x: 102,
                            y: 193
                        }, {
                            name: 52,
                            x: 283,
                            y: 197
                        }, {
                            name: 100,
                            x: 228,
                            y: 62,
                            length: 110,
                            g: !1,
                            l: !1,
                            f: -1,
                            i: -1,
                            m: !1,
                            k: 0,
                            c: !1,
                            o: "L",
                            n: !1
                        }, {
                            name: 100,
                            x: 415,
                            y: 195,
                            length: 50,
                            g: !1,
                            l: !1,
                            f: -1,
                            i: 100,
                            m: !1,
                            k: 0,
                            c: !1,
                            o: "L",
                            n: !1
                        }, {
                            name: 100,
                            x: 222,
                            y: 325,
                            length: 110,
                            g: !1,
                            l: !1,
                            f: -1,
                            i: -1,
                            m: !1,
                            k: 0,
                            c: !1,
                            o: "L",
                            n: !1
                        }, {
                            name: 100,
                            x: 105,
                            y: 58,
                            length: 100,
                            g: !1,
                            l: !1,
                            f: -2,
                            i: -1,
                            m: !1,
                            k: 0,
                            c: !1,
                            o: "L",
                            n: !1
                        }, {
                            name: 56,
                            x: 27,
                            y: 198,
                            group: 0,
                            b: 0
                        }, {
                            name: 56,
                            x: 207,
                            y: 193,
                            group: 1,
                            b: 180
                        }, {
                            name: 56,
                            x: 595,
                            y: 98,
                            group: 1,
                            b: 90
                        }, {
                            name: 56,
                            x: 27,
                            y: 415,
                            group: 0,
                            b: 0
                        }, {
                            name: 3,
                            x: 108,
                            y: 315,
                            timeout: -1
                        }, {
                            name: 54,
                            x: 105,
                            y: 316
                        }, {
                            name: 54,
                            x: 597,
                            y: 258
                        }, {
                            name: 3,
                            x: 600,
                            y: 362,
                            timeout: -1
                        }, {
                            name: 3,
                            x: 330,
                            y: 329,
                            timeout: -1
                        }]
                    }]
                }, {
                    Re: [{
                        settings: [{
                            name: 0,
                            width: 640,
                            height: 480,
                            Ca: 32
                        }, {
                            name: 1,
                            P: 1,
                            M: !1,
                            ka: 1
                        }],
                        Da: [{
                                name: 2,
                                x: 508,
                                y: 362
                            }, {
                                name: 52,
                                x: 131,
                                y: 131
                            }, {
                                name: 3,
                                x: 171,
                                y: 373,
                                timeout: -1
                            }, {
                                name: 100,
                                x: 134,
                                y: 56,
                                length: 50,
                                g: !1,
                                l: !1,
                                f: -1,
                                i: -1,
                                m: !1,
                                k: 0,
                                c: !1,
                                o: "L",
                                n: !1
                            }, {
                                name: 121,
                                x: 508,
                                y: 267
                            }, {
                                name: 122,
                                x: 170,
                                y: 293
                            }, {
                                name: 100,
                                x: 172,
                                y: 214,
                                length: 50,
                                g: !1,
                                l: !1,
                                f: -2,
                                i: -1,
                                m: !1,
                                k: 0,
                                c: !1,
                                o: "L",
                                n: !1
                            }, {
                                name: 3,
                                x: 129,
                                y: 211,
                                timeout: -1
                            }, {
                                name: 3,
                                x: 506,
                                y: 189,
                                timeout: -1
                            }, {
                                name: 100,
                                x: 323,
                                y: 55,
                                length: 190,
                                g: !1,
                                l: !1,
                                f: -1,
                                i: -1,
                                m: !1,
                                k: 0,
                                c: !1,
                                o: "L",
                                n: !1
                            }, {
                                name: 100,
                                x: 324,
                                y: 213,
                                length: 180,
                                g: !1,
                                l: !1,
                                f: -2,
                                i: -1,
                                m: !1,
                                k: 0,
                                c: !1,
                                o: "L",
                                n: !1
                            },
                            {
                                name: 4,
                                x: 198,
                                y: 346,
                                locale: "en",
                                text: "Turn the blades with this button",
                                width: 150
                            }, {
                                name: 8,
                                x: 340,
                                y: 343,
                                locale: "en",
                                b: 180,
                                C: 100,
                                K: 100
                            }, {
                                name: 60,
                                x: 385,
                                y: 325,
                                b: 90,
                                size: 4,
                                qb: 1
                            }
                        ],
                        v: [{
                            name: 4,
                            x: 212,
                            y: 349,
                            locale: "ru",
                            text: "\u0427\u0442\u043e\u0431\u044b \u043f\u043e\u0432\u0435\u0440\u043d\u0443\u0442\u044c \u043f\u0438\u043b\u0443, \u043d\u0430\u0436\u043c\u0438\u0442\u0435 \u043a\u043d\u043e\u043f\u043a\u0443",
                            width: 150
                        }, {
                            name: 8,
                            x: 340,
                            y: 343,
                            locale: "ru",
                            b: 180,
                            C: 100,
                            K: 100
                        }],
                        t: [{
                            name: 4,
                            x: 214,
                            y: 349,
                            locale: "de",
                            text: "Drehe die S\u00e4gebl\u00e4tter mit diesem Schaltfeld",
                            width: 150
                        }, {
                            name: 8,
                            x: 340,
                            y: 343,
                            locale: "de",
                            b: 180,
                            C: 100,
                            K: 100
                        }],
                        u: [{
                            name: 4,
                            x: 210,
                            y: 346,
                            locale: "fr",
                            text: "Faites tourner les lames avec ce bouton",
                            width: 150
                        }, {
                            name: 8,
                            x: 340,
                            y: 343,
                            locale: "fr",
                            b: 180,
                            C: 100,
                            K: 100
                        }]
                    }, {
                        settings: [{
                            name: 0,
                            width: 640,
                            height: 480,
                            Ca: 32
                        }, {
                            name: 1,
                            P: 1,
                            M: !1,
                            ka: 1
                        }],
                        Da: [{
                            name: 52,
                            x: 532,
                            y: 72
                        }, {
                            name: 2,
                            x: 179,
                            y: 407
                        }, {
                            name: 121,
                            x: 299,
                            y: 404
                        }, {
                            name: 122,
                            x: 288,
                            y: 276
                        }, {
                            name: 82,
                            x: 392,
                            y: 346,
                            b: 0,
                            size: 2
                        }, {
                            name: 82,
                            x: 524,
                            y: 346,
                            b: 0,
                            size: 2
                        }, {
                            name: 55,
                            x: 597,
                            y: 293,
                            b: 180
                        }, {
                            name: 100,
                            x: 531,
                            y: 173,
                            length: 70,
                            g: !1,
                            l: !1,
                            f: -1,
                            i: -1,
                            m: !1,
                            k: 0,
                            c: !1,
                            o: "L",
                            n: !1
                        }, {
                            name: 54,
                            x: 530,
                            y: 67
                        }, {
                            name: 60,
                            x: 461,
                            y: 221,
                            b: 90,
                            size: 4,
                            qb: 1
                        }, {
                            name: 54,
                            x: 174,
                            y: 205
                        }, {
                            name: 3,
                            x: 397,
                            y: 185,
                            timeout: -1
                        }, {
                            name: 3,
                            x: 529,
                            y: 286,
                            timeout: -1
                        }, {
                            name: 3,
                            x: 180,
                            y: 299,
                            timeout: -1
                        }, {
                            name: 100,
                            x: 290,
                            y: 135,
                            length: 100,
                            g: !1,
                            l: !1,
                            f: -2,
                            i: -1,
                            m: !1,
                            k: 0,
                            c: !1,
                            o: "L",
                            n: !1
                        }, {
                            name: 58,
                            x: 179,
                            y: 34,
                            b: 0,
                            size: 2,
                            qb: !1
                        }]
                    }, {
                        settings: [{
                            name: 0,
                            width: 640,
                            height: 480,
                            Ca: 32
                        }, {
                            name: 1,
                            P: 1,
                            M: !1,
                            ka: 1
                        }],
                        Da: [{
                            name: 52,
                            x: 453,
                            y: 137
                        }, {
                            name: 100,
                            x: 356,
                            y: 136,
                            length: 60,
                            g: !1,
                            l: !1,
                            f: -1,
                            i: -1,
                            m: !1,
                            k: 0,
                            c: !1,
                            o: "L",
                            n: !1
                        }, {
                            name: 2,
                            x: 266,
                            y: 422
                        }, {
                            name: 60,
                            x: 313,
                            y: 297,
                            b: 0,
                            size: 4,
                            qb: 1
                        }, {
                            name: 100,
                            x: 375,
                            y: 444,
                            length: 68,
                            g: !1,
                            l: !1,
                            f: -2,
                            i: -1,
                            m: !1,
                            k: 0,
                            c: !1,
                            o: "L",
                            n: !1
                        }, {
                            name: 54,
                            x: 377,
                            y: 339
                        }, {
                            name: 121,
                            x: 379,
                            y: 46
                        }, {
                            name: 3,
                            x: 269,
                            y: 360,
                            timeout: -1
                        }, {
                            name: 3,
                            x: 250,
                            y: 66,
                            timeout: -1
                        }, {
                            name: 122,
                            x: 376,
                            y: 342
                        }, {
                            name: 3,
                            x: 281,
                            y: 65,
                            timeout: -1
                        }, {
                            name: 55,
                            x: 373,
                            y: 238,
                            b: 90
                        }, {
                            name: 100,
                            x: 455,
                            y: 44,
                            length: 60,
                            g: !1,
                            l: !1,
                            f: -1,
                            i: -1,
                            m: !1,
                            k: 0,
                            c: !1,
                            o: "L",
                            n: !1
                        }, {
                            name: 100,
                            x: 544,
                            y: 139,
                            length: 60,
                            g: !1,
                            l: !1,
                            f: -1,
                            i: -1,
                            m: !1,
                            k: 0,
                            c: !1,
                            o: "L",
                            n: !1
                        }, {
                            name: 54,
                            x: 267,
                            y: 234
                        }, {
                            name: 81,
                            x: 263,
                            y: 25,
                            b: 0,
                            size: 1
                        }]
                    }, {
                        settings: [{
                            name: 0,
                            width: 640,
                            height: 480,
                            Ca: 32
                        }, {
                            name: 1,
                            M: !1,
                            ka: 1
                        }],
                        Da: [{
                            name: 122,
                            x: 203,
                            y: 336
                        }, {
                            name: 54,
                            x: 204,
                            y: 332
                        }, {
                            name: 52,
                            x: 429,
                            y: 329
                        }, {
                            name: 54,
                            x: 431,
                            y: 330
                        }, {
                            name: 100,
                            x: 214,
                            y: 460,
                            length: 100,
                            g: !1,
                            l: !1,
                            f: -2,
                            i: -1,
                            m: !1,
                            k: 0,
                            c: !1,
                            o: "L",
                            n: !1
                        }, {
                            name: 100,
                            x: 437,
                            y: 461,
                            length: 100,
                            g: !1,
                            l: !1,
                            f: -1,
                            i: -1,
                            m: !1,
                            k: 0,
                            c: !1,
                            o: "L",
                            n: !1
                        }, {
                            name: 60,
                            x: 252,
                            y: 276,
                            b: 90,
                            size: 4,
                            qb: 1
                        }, {
                            name: 60,
                            x: 384,
                            y: 277,
                            b: 90,
                            size: 4,
                            qb: 2
                        }, {
                            name: 60,
                            x: 156,
                            y: 115,
                            b: 0,
                            size: 4,
                            qb: 2
                        }, {
                            name: 60,
                            x: 484,
                            y: 115,
                            b: 0,
                            size: 4,
                            qb: 1
                        }, {
                            name: 2,
                            x: 211,
                            y: 52
                        }, {
                            name: 121,
                            x: 435,
                            y: 52
                        }, {
                            name: 3,
                            x: 436,
                            y: 236,
                            timeout: -1
                        }, {
                            name: 3,
                            x: 204,
                            y: 156,
                            timeout: -1
                        }, {
                            name: 3,
                            x: 437,
                            y: 156,
                            timeout: -1
                        }]
                    }, {
                        settings: [{
                            name: 0,
                            width: 640,
                            height: 480,
                            Ca: 32
                        }, {
                            name: 1,
                            P: 1,
                            M: !1,
                            ka: 1
                        }],
                        Da: [{
                                name: 52,
                                x: 419,
                                y: 187
                            }, {
                                name: 122,
                                x: 267,
                                y: 36
                            }, {
                                name: 100,
                                x: 273,
                                y: 191,
                                length: 120,
                                g: !1,
                                l: !1,
                                f: -1,
                                i: -1,
                                m: !1,
                                k: 0,
                                c: !1,
                                o: "L",
                                n: !1
                            }, {
                                name: 100,
                                x: 273,
                                y: 191,
                                length: 120,
                                g: !1,
                                l: !1,
                                f: -2,
                                i: -1,
                                m: !1,
                                k: 0,
                                c: !1,
                                o: "L",
                                n: !1
                            }, {
                                name: 2,
                                x: 191,
                                y: 416
                            },
                            {
                                name: 121,
                                x: 420,
                                y: 418
                            }, {
                                name: 100,
                                x: 421,
                                y: 34,
                                length: 120,
                                g: !1,
                                l: !1,
                                f: -1,
                                i: -1,
                                m: !1,
                                k: 0,
                                c: !1,
                                o: "L",
                                n: !1
                            }, {
                                name: 54,
                                x: 268,
                                y: 36
                            }, {
                                name: 100,
                                x: 421,
                                y: 34,
                                length: 120,
                                g: !1,
                                l: !1,
                                f: -2,
                                i: -1,
                                m: !1,
                                k: 0,
                                c: !1,
                                o: "L",
                                n: !1
                            }, {
                                name: 3,
                                x: 419,
                                y: 353,
                                timeout: -1
                            }, {
                                name: 3,
                                x: 191,
                                y: 355,
                                timeout: -1
                            }, {
                                name: 3,
                                x: 272,
                                y: 236,
                                timeout: -1
                            }, {
                                name: 59,
                                x: 304,
                                y: 276,
                                b: 0,
                                size: 3,
                                qb: 1
                            }, {
                                name: 59,
                                x: 488,
                                y: 274,
                                b: 90,
                                size: 3,
                                qb: 1
                            }, {
                                name: 58,
                                x: 346,
                                y: 115,
                                b: -40,
                                size: 2,
                                qb: !1
                            }
                        ]
                    }]
                }],
                qu: [q.Jm, q.Km, q.Lm, q.Mm, q.Nm, q.Om],
                ru: [],
                Ny: []
            },
            V = function() {
                var b = {},
                    c = [];
                b.subscribe =
                    function(b, a) {
                        c.push({
                            name: b,
                            ni: a
                        });
                        return [b, a]
                    };
                b.unsubscribe = function(b, a) {
                    var f, d;
                    for (f = c.length; 0 <= f; f--) d = c[f], d.name === b && d.ni === a && c.splice(f, 1)
                };
                b.ra = function(b) {
                    var a = [],
                        f = Array.prototype.slice.call(arguments, 1),
                        d, g;
                    if (0 < c.length) {
                        d = 0;
                        for (g = c.length; d < g; d++) c[d].name === b && a.push(c[d].ni);
                        d = 0;
                        for (g = a.length; d < g; d++) a[d].apply(this, f)
                    }
                };
                b.w = {
                    Tm: 0,
                    $w: 1,
                    as: 2,
                    jr: 3,
                    Cx: 4,
                    Zq: 5,
                    $q: 6,
                    Mw: 7,
                    ar: 8,
                    br: 9,
                    cr: 10,
                    dr: 11,
                    Pb: 12,
                    Ms: 13,
                    Wr: 14,
                    wx: 15,
                    xx: 16,
                    nr: 17,
                    ir: 18,
                    gi: 19,
                    Hw: 20,
                    Gw: 21,
                    Hq: 22,
                    ln: 23,
                    gs: 24,
                    VC: 25,
                    Jx: 26,
                    bo: 27,
                    co: 28,
                    et: 29,
                    mo: 30,
                    Ls: 31,
                    ft: 32,
                    mx: 33,
                    mn: 34,
                    em: 35
                };
                return b
            }(),
            Ba = function(b, c) {
                function e() {
                    d = !0;
                    for (var a = 0, b = g.length; a < b; a++) g[a]()
                }
                var a = b.dC || "",
                    f = a;
                c.subscribe(c.w.ft, function(b) {
                    f = b ? b + "-" + a : a
                });
                var d = !1,
                    g = [],
                    h = !1,
                    l = null;
                try {
                    h = !!window.localStorage, l = {
                        getItem: function(a) {
                            return localStorage.getItem(a)
                        },
                        setItem: function(a, b) {
                            return localStorage.setItem(a, b)
                        },
                        removeItem: function(a) {
                            return localStorage.removeItem(a)
                        }
                    }
                } catch (n) {}
                if (!h && void 0 !== typeof chrome && chrome.storage && chrome.storage.local) {
                    var h = !0,
                        r = {};
                    chrome.storage.local.get(null, function(a) {
                        r = a;
                        e()
                    });
                    l = {
                        getItem: function(a) {
                            return r[a]
                        },
                        setItem: function(a, b) {
                            r[a] = b;
                            var c = {};
                            c[a] = b;
                            chrome.storage.local.set(c)
                        },
                        removeItem: function(a) {
                            r[a] = null;
                            chrome.storage.local.remove(a)
                        }
                    }
                } else e();
                return {
                    yo: h,
                    $i: function(a) {
                        d ? a() : g.push(a)
                    },
                    get: function(a) {
                        d || console.log("setting not ready: " + a);
                        return h ? l.getItem(f + a) : null
                    },
                    set: function(a, b) {
                        h && (null == b ? l.removeItem(f + a) : l.setItem(f + a, b.toString()))
                    },
                    remove: function(a) {
                        h && l.removeItem(f + a)
                    },
                    Ok: function(a,
                        b) {
                        var c = this.get(a);
                        return null == c ? b : "true" === c
                    },
                    Ei: function(a, b) {
                        var c = this.get(a);
                        return null == c ? b : parseInt(c, 10)
                    }
                }
            }(U, V),
            ta = function(b) {
                return new function() {
                    function c(a) {
                        return 0 <= window.location.href.toLowerCase().indexOf(a.toLowerCase())
                    }
                    var e = function() {
                        var a = {},
                            b = (location.search.substring(1) || "").split("&"),
                            c, e, h;
                        c = 0;
                        for (e = b.length; c < e; c++) h = b[c].split("="), 1 < h.length && (a[decodeURIComponent(h[0].replace(/\+/g, " "))] = decodeURIComponent(h[1].replace(/\+/g, " ")));
                        return a
                    }();
                    b && b.nt && Date.now() <
                        b.nt && (this.Sh = c("unlockAllBoxes=true"));
                    this.lang = e.lang;
                    this.Lv = c("boxBackgrounds=true");
                    this.gC = c("showFrameRate=true");
                    this.Wy = c("html5audio=true");
                    this.oq = c("showVersion=true")
                }
            }(U),
            ra = function(b, c, e, a) {
                return {
                    yo: b.yo,
                    Nv: !0,
                    By: !0,
                    Wt: c.gC,
                    oq: c.oq,
                    Ol: !0,
                    Wo: function() {
                        return b.Ok("music", !0)
                    },
                    Jl: function(a) {
                        b.set("music", a)
                    },
                    Xo: function() {
                        return b.Ok("sound", !0)
                    },
                    Ll: function(a) {
                        b.set("sound", a)
                    },
                    Uo: function() {
                        return b.Ok("clickToCut", !1)
                    },
                    DB: function(a) {
                        b.set("clickToCut", a)
                    },
                    Fi: function() {
                        if (c.lang) return e.Xt(c.lang);
                        var f = b.Ei("language", null);
                        null == f && (f = a.fz(), null == f && (f = e.Xh));
                        return f
                    },
                    MB: function(a) {
                        b.set("language", a)
                    },
                    xE: function() {
                        return b.Ok("isHD", null)
                    },
                    KB: function(a) {
                        b.set("isHD", a)
                    },
                    clear: function() {
                        b.remove("isHD")
                    }
                }
            }(Ba, ta, sa, function(b, c) {
                return {
                    fz: function() {
                        return c.wy
                    }
                }
            }(sa, U), V),
            yb = {
                Bb: 2560,
                fb: 1440,
                Nb: 1,
                Q: 3,
                gb: 0,
                Oa: 105,
                er: 10,
                fr: 6,
                im: 60,
                dk: 3,
                $n: 42,
                Wm: 200,
                Zm: 400,
                $m: -400,
                Zn: new R(22, 20, 30, 30),
                Yn: new R(70, 64, 82, 82),
                fo: new R(264, 350, 108, 2),
                eo: new R(192, 278, 108, 2),
                ho: new R(238, 288, 114, 2),
                jo: 275,
                ko: 550,
                dm: 85,
                cm: 60,
                Fj: 60,
                Gj: 150,
                bm: new R(48, 48, 152, 152),
                Nq: -35,
                Mq: 14,
                ao: 15,
                am: 40,
                gk: 624,
                gn: new R(300, 300, 175, 175),
                kn: 2500,
                jn: 30,
                hn: 100,
                hm: 300,
                Qq: 1400,
                gm: new R(142, 157, 112, 104),
                Lj: new R(155, 176, 88, 76),
                tr: 1,
                dd: 110,
                Tj: 5.625,
                qm: 1400,
                pm: 1650,
                om: 142,
                Sj: 74,
                mf: 65,
                Xn: 117,
                Un: 270,
                qk: 140,
                Vn: 15,
                Ff: 40,
                Wn: -16,
                cn: 44,
                bn: 4,
                ue: 90,
                sm: 100,
                dn: 800,
                en: 400,
                Um: 1E3,
                Vm: 300,
                fm: 5500,
                Jj: 14,
                jm: 12,
                fk: 1.4
            },
            J = function(b, c, e) {
                $(function() {
                    $("#optionHd").hide();
                    $("#optionSd").hide()
                });
                c(e);
                e.Az = !0;
                return e
            }(ra, function(b, c) {
                function e(a,
                    c) {
                    var d = c.Nb;
                    c.Oa = a.Oa * d;
                    c.dk = a.dk * d;
                    c.$n = a.$n * d;
                    c.Wm = a.Wm * d;
                    c.$m = a.$m * d;
                    c.Zm = a.Zm * d;
                    c.im = a.im * d;
                    c.fo = b.ge(a.fo, d);
                    c.eo = b.ge(a.eo, d);
                    c.ho = b.ge(a.ho, d);
                    c.jo = a.jo * d;
                    c.ko = a.ko * d;
                    c.dm = a.dm * d;
                    c.Fj = a.Fj * d;
                    c.Gj = a.Gj * d;
                    c.bm = b.ge(a.bm, d);
                    c.cm = a.cm * d;
                    c.ao = a.ao * d;
                    c.Yn = b.ge(a.Yn, d);
                    c.Zn = b.ge(a.Zn, d);
                    c.am = a.am * d;
                    c.gk = c.gk || a.gk * d;
                    c.gn = b.ge(a.gn, d);
                    c.kn = a.kn * d;
                    c.jn = a.jn * d;
                    c.hn = a.hn * d;
                    c.gm = b.ge(a.gm, d);
                    c.Lj = b.ge(a.Lj, d);
                    c.hm = a.hm * d;
                    c.Qq = a.Qq * d;
                    c.sm = a.sm * d;
                    c.dn = a.dn * d;
                    c.en = a.en * d;
                    c.Um = a.Um * d;
                    c.Vm = a.Vm * d;
                    c.fm = a.fm *
                        d;
                    c.Jj = a.Jj * d;
                    c.Tj = a.Tj * d;
                    c.qm = a.qm * d;
                    c.dd = a.dd * d;
                    c.pm = a.pm * d;
                    c.om = a.om * d;
                    c.Sj = a.Sj * d;
                    c.mf = a.mf * d;
                    c.Xn = a.Xn * d;
                    c.cn = a.cn * d;
                    c.bn = a.bn * d;
                    c.ue = a.ue * d;
                    c.Un = a.Un * d;
                    c.qk = a.qk * d;
                    c.Vn = a.Vn * d;
                    c.Ff = a.Ff * d;
                    c.Wn = a.Wn * d;
                    c.jm = a.jm * d;
                    c.e = function(a) {
                        return Math.round(a * c.Ix)
                    }
                }
                return function(a) {
                    e(c, a)
                }
            }(R, yb), {
                gt: 1024,
                Bb: 1024,
                fb: 576,
                Nb: 0.4,
                Ix: 1,
                ib: 1,
                dh: 1024,
                Hx: 576,
                Hj: 3,
                er: 3.5,
                fr: 2,
                Q: 1.2,
                gb: 0,
                tr: 0.8,
                Nq: -17,
                Mq: 20,
                Iw: 336,
                fk: 0.925
            }),
            ea = function() {
                return {
                    debug: ha(),
                    alert: ha()
                }
            }(),
            ca = function(b, c, e, a, f, d, g, h) {
                var l = b.extend({
                    init: function() {
                        this.p()
                    },
                    Pe: function(a) {
                        this.L = a;
                        this.Bl = !1;
                        0 < this.L.d.length ? this.Ya(0) : this.GB()
                    },
                    rd: function(a) {
                        var c = e[a].L;
                        c || h.debug("Image not loaded: " + e[a].path);
                        return c
                    },
                    sa: function(a) {
                        this.rv = a;
                        this.Pe(this.rd(a))
                    },
                    Ya: function(a) {
                        this.xg = a;
                        this.Bl || (a = this.L.d[a], this.width = a.O, this.height = a.V)
                    },
                    GB: function() {
                        this.xg = f.h;
                        this.width = this.L.Ji;
                        this.height = this.L.Ii
                    },
                    ya: function() {
                        this.L.zd.x !== d.DC.x && (this.Bl = !0, this.width = this.L.zd.x, this.height = this.L.zd.y)
                    },
                    B: function() {
                        this.Cc();
                        if (0 !== this.color.G && this.L)
                            if (this.xg ===
                                f.h) {
                                var c = Math.round(this.ea),
                                    b = Math.round(this.fa);
                                a.context.drawImage(this.L.Vb, c, b)
                            } else this.Jy(this.xg);
                        this.Bc()
                    },
                    Jy: function(c) {
                        var b = this.L.d[c],
                            d = b.O,
                            e = b.V,
                            f = this.ea,
                            g = this.fa;
                        this.Bl && (c = this.L.j[c]) && (f += c.x, g += c.y, d += this.L.we, e += this.L.gh);
                        this.Ck ? (d = Math.round(d / this.Ck) * this.Ck, e = Math.round(e / this.Ck) * this.Ck) : (d = Math.ceil(d), e = Math.ceil(e));
                        this.Ka ? (f = Math.round(f / this.Ka) * this.Ka, g = Math.round(g / this.Ka) * this.Ka) : (f = Math.round(f), g = Math.round(g));
                        0 === b.x || 0 === b.y ? a.context.drawImage(this.L.Vb,
                            b.x, b.y, d, e, f, g, d, e) : (d += 2, e += 2, a.context.drawImage(this.L.Vb, b.x - 1, b.y - 1, d, e, f - 1, g - 1, d, e))
                    },
                    Ly: function(c, b, d, e, g) {
                        var l = a.context,
                            h = 0,
                            s = 0,
                            G, k, D, u, F;
                        c === f.h ? (c = this.L.Ji, G = this.L.Ii) : (G = this.L.d[c], h = G.x, s = G.y, c = G.O, G = G.V);
                        var A = Math.floor(c),
                            E = Math.floor(G);
                        for (k = 0; k < g;) {
                            for (D = 0; D < e;) u = e - D, u > c && (u = c), u = Math.ceil(u), F = g - k, F > G && (F = G), F = Math.ceil(F), l.drawImage(this.L.Vb, h, s, u, F, b + D, d + k, u, F), D += A;
                            k += E
                        }
                    },
                    rl: function(a, b) {
                        if (this.xg === f.h) return c.Kb(a, b, this.ea, this.fa, this.L.width, this.L.height);
                        var e =
                            this.L.d[this.xg],
                            d = this.ea,
                            g = this.fa;
                        if (this.Bl) var l = this.L.j[this.xg],
                            d = d + l.x,
                            g = g + l.y;
                        return c.Kb(a, b, d, g, e.O, e.V)
                    },
                    du: function(a) {
                        if (this.p(a)) return !0;
                        if (a.ht === g.ik) this.Ya(a.it);
                        else return !1;
                        return !0
                    },
                    IB: function(a, c) {
                        var b = this.rd(a).j[c];
                        this.x = b.x;
                        this.y = b.y
                    },
                    hF: function(a, c) {
                        var b = this.rd(a),
                            d = b.d[c],
                            b = b.j[c];
                        this.x = b.x + d.O / 2;
                        this.y = b.y + d.V / 2
                    }
                });
                l.create = function(a, c) {
                    var b = new l;
                    b.sa(a);
                    null != c && b.Ya(c);
                    return b
                };
                return l
            }(da, R, Pa, aa, K, O, wa, ea),
            zb = function(b, c, e, a) {
                return b.extend({
                    init: function() {
                        this.p();
                        this.Kf = "";
                        this.lc = this.Ac = this.nd = 0;
                        this.jg = null
                    },
                    yz: function(a, c, b) {
                        this.Kf = a;
                        this.Pe(c);
                        this.jg = b
                    },
                    SB: function(a, c, b) {
                        this.nd = a;
                        this.Ac = c;
                        this.lc = b
                    },
                    Pk: function(c) {
                        var b = this.Kf.indexOf(c);
                        if (0 <= b) return b;
                        a.alert("Char not found in font:" + c);
                        return this.Kf.indexOf(".")
                    },
                    nE: function(a, b, e) {
                        a = this.L.d[a];
                        var h = Math.ceil(a.O),
                            l = Math.ceil(a.V);
                        c.context.drawImage(this.L.Vb, a.x, a.y, h, l, b, e, h, l)
                    },
                    Zv: function(a) {
                        for (var c = 0, b = a.length, e = 0, l = 0; l < b; l++)
                            if (e = this.vh(a, l), " " === a[l]) c += this.lc + e;
                            else var n =
                                this.Pk(a[l]),
                                c = c + (this.L.d[n].O + e);
                        return Math.ceil(c - e)
                    },
                    Ro: function() {
                        return this.L.d[0].V
                    },
                    vh: function(a, c) {
                        if (c === a.length - 1) return 0;
                        if (!this.jg) return this.nd;
                        var b = this.jg[a[c] + a[c + 1]];
                        return null != b ? b : this.nd
                    }
                })
            }(ca, aa, K, ea),
            Ua = function() {
                return function(b, c, e, a) {
                    e = b + e;
                    a = c + a;
                    this.gw = b;
                    this.hw = c;
                    this.lw = e;
                    this.mw = c;
                    this.pt = b;
                    this.qt = a;
                    this.wt = e;
                    this.xt = a
                }
            }(),
            Va = function(b) {
                function c(c) {
                    this.Vb = c;
                    this.d = [];
                    this.j = [];
                    this.zd = b.Yi();
                    var a = $(c);
                    this.Ji = c.width || a.width();
                    this.Ii = c.height || a.height();
                    this.gh = this.we = 0
                }
                c.prototype.Ux = function(c) {
                    this.d.push(c);
                    this.j.push(new b(0, 0))
                };
                c.prototype.RB = function(c, a, b) {
                    c = this.j[c];
                    c.x = a;
                    c.y = b
                };
                return c
            }(O, Ua),
            Qa = function(b, c, e, a, f, d, g, h, l, n) {
                return {
                    init: function() {
                        e.AB(b, f.Nb);
                        for (var a = 0, d = b.length; a < d; a++) {
                            var g = b[a];
                            delete g.Qu;
                            delete g.oA;
                            c[g.id].info = g
                        }
                    },
                    DA: function(b, e) {
                        var f = c[b];
                        switch (f.type) {
                            case a.s:
                                f.L = new g(e);
                                this.Gv(f);
                                break;
                            case a.Pj:
                                f.L = new g(e);
                                this.Gv(f);
                                var l = new d,
                                    h = f.info;
                                l.yz(h.Kf, f.L, h.jg);
                                l.SB(h.nd, h.Ac, h.lc);
                                f.font = l
                        }
                    },
                    Gv: function(a) {
                        var c =
                            a.L,
                            b = c.Ji,
                            e = c.Ii;
                        a = a.info;
                        var d = a.d,
                            f = a.j;
                        c.zd = h.Yi();
                        if (d) {
                            c.we = a.we ? a.we : 0;
                            c.gh = a.gh ? a.gh : 0;
                            for (var g = 0, n = d.length; g < n; g++) {
                                var k = d[g],
                                    k = new l(k.x, k.y, k.O, k.V);
                                k.O + c.we > b && (k.O = b - c.we);
                                k.V + c.gh > e && (k.V = e - c.gh);
                                c.Ux(k)
                            }
                            if (f)
                                for (b = f.length, g = 0; g < b; g++) e = f[g], c.RB(g, e.x, e.y);
                            a.r && a.q && (c.zd.x = a.r, c.zd.y = a.q)
                        }
                    },
                    rd: function(a) {
                        a = c[a];
                        if (a.L) return a.L;
                        n.debug("Image not yet loaded:" + a.path);
                        return null
                    },
                    Zt: function(a) {
                        a = c[a];
                        if (a.font) return a.font;
                        n.debug("Font not yet loaded:" + a.path);
                        return null
                    }
                }
            }(wb,
                Pa, xb, gb, J, zb, Va, O, R, ea),
            ba = function(b) {
                return {
                    rh: function(c, b, a) {
                        return Math.max(Math.min(c, a), b)
                    },
                    Fl: function(c, b) {
                        return 0 > c === 0 > b
                    },
                    lb: function(c, b) {
                        return Math.floor(Math.random() * (b - c + 1) + c)
                    },
                    bB: function() {
                        return 0.5 < Math.random()
                    },
                    yb: function() {
                        return 2 * Math.random() - 1
                    },
                    xu: function(c, e, a, f) {
                        return c >= e && c >= a && c >= f ? c : e >= c && e >= a && e >= f ? e : a >= e && a >= c && a >= f ? a : f >= e && f >= a && f >= c ? f : b.h
                    },
                    Au: function(c, e, a, f) {
                        return c <= e && c <= a && c <= f ? c : e <= c && e <= a && e <= f ? e : a <= e && a <= c && a <= f ? a : f <= e && f <= a && f <= c ? f : b.h
                    },
                    Kz: function(c,
                        b, a, f, d, g, h, l) {
                        var n, r;
                        n = d - c + h - a;
                        r = g - b + l - f;
                        c = a - c;
                        b = f - b;
                        d = h - d;
                        l -= g;
                        g = d * r - l * n;
                        n = c * r - b * n;
                        r = Math.abs(b * d - l * c);
                        return Math.abs(g) <= r && Math.abs(n) <= r
                    },
                    eF: function(c, b) {
                        var a = Math.pow(10, b);
                        return Math.round(c * a) / a
                    },
                    xv: function(c) {
                        return Math.round(100 * c) / 100
                    }
                }
            }(K),
            fa = function(b, c, e, a, f, d, g, h, l) {
                function n(a, c) {
                    this.Ph = a;
                    this.width = c
                }
                var r = b.extend({
                    init: function(b) {
                        this.p();
                        this.font = b;
                        this.Ke = [];
                        this.height = this.width = c.h;
                        this.align = e.rb;
                        this.ti = new a(b.L);
                        this.SC = !1;
                        this.maxHeight = c.h
                    },
                    Iv: function(a,
                        b) {
                        this.Ph = a;
                        this.Wh = null == b || b === c.h ? Math.ceil(this.font.Zv(a)) : Math.ceil(b);
                        this.Ph && (this.Yy(), this.JC())
                    },
                    JC: function() {
                        for (var a = 0, b = 0, d = this.font.Ro(), f = 0, g = this.font.vh("..", 0), l = this.maxHeight === c.h ? this.Ke.length : Math.min(this.Ke.length, this.maxHeight / d + this.font.Ac), h = l !== this.Ke.length, k = 0; k < l; k++) {
                            for (var a = this.Ke[k], n = a.Ph, r = n.length, a = this.align !== e.rb ? this.align === e.$b || this.align === e.T ? (this.Wh - a.width) / 2 : this.Wh - a.width : 0, F = 0; F < r; F++) {
                                if (" " === n[F]) a += this.font.lc + this.font.vh(n,
                                    F);
                                else {
                                    var A = this.font.Pk(n[F]),
                                        E = this.font.L.d[A].O;
                                    this.ti.hl(A, Math.round(a), Math.round(b), f++);
                                    a += E + this.font.vh(n, F)
                                }
                                if (h && k === l - 1 && (A = this.font.Pk("."), E = this.font.L.d[A].O, F === r - 1 || F === r - 2 && a + 3 * (E + g) + this.font.lc > this.Wh)) {
                                    this.ti.hl(A, Math.round(a), Math.round(b), f++);
                                    a += E + g;
                                    this.ti.hl(A, Math.round(a), Math.round(b), f++);
                                    a += E + g;
                                    this.ti.hl(A, Math.round(a), Math.round(b), f++);
                                    a += E + g;
                                    break
                                }
                            }
                            b += d + this.font.Ac
                        }
                        1 >= this.Ke.length ? (this.height = this.font.Ro(), this.width = a) : (this.height = (this.font.Ro() +
                            this.font.Ac) * this.Ke.length - this.font.Ac, this.width = this.Wh);
                        this.maxHeight !== c.h && (this.height = Math.min(this.height, this.maxHeight))
                    },
                    B: function() {
                        this.Cc();
                        if (0 !== this.color.G) {
                            var a = this.Ph.length,
                                c = f.context;
                            0 < a && (c.translate(this.ea, this.fa), this.ti.Nt(a), c.translate(-this.ea, -this.fa))
                        }
                        this.Bc()
                    },
                    Yy: function() {
                        for (var a = [], c = this.Ph, b = c.length, d = 0, e = 0, f = 0, g = 0, k = 0, h = 0, r = 0; r < b;) {
                            var F = c[r++];
                            if (" " == F || "\n" == F) h += f, k = r - 1, f = 0, e = r, " " == F && (e--, f = this.font.lc + this.font.vh(c, r - 1));
                            else var A = this.font.Pk(F),
                                f = f + (this.font.L.d[A].O + this.font.vh(c, r - 1));
                            A = l.xv(h + f) > this.Wh;
                            this.SC && A && k == g && (h += f, k = r, f = 0, e = r);
                            if (l.xv(h + f) > this.Wh && k != g || "\n" == F) {
                                a[d++] = g;
                                for (a[d++] = k; e < b && " " == c[e];) e++, f -= this.font.lc;
                                k = g = e;
                                h = 0
                            }
                        }
                        0 != f && (a[d++] = g, a[d++] = r);
                        c = d >> 1;
                        this.Ke = [];
                        for (b = 0; b < c; b++) d = this.Ph.substring(a[b << 1], a[(b << 1) + 1]), e = this.font.Zv(d), this.Ke.push(new n(d, e))
                    },
                    gE: function(a) {
                        var b = Xml.ay(a, "font"),
                            b = g.Zt(b),
                            b = new r(b);
                        a.hasAttribute("align") && (b.align = e.parse(Xml.attr(a, "align")));
                        if (a.hasAttribute("string")) {
                            var d =
                                Xml.ay("string"),
                                d = g.yE(d),
                                f = a.hasAttribute("width") ? Xml.$x(a, "width") : c.h;
                            b.Iv(d, f)
                        }
                        a.hasAttribute("height") && (b.maxHeight = Xml.$x(a, "height"));
                        return b
                    }
                });
                r.Ak = function(a) {
                    var c = a.img;
                    !c && a.Ki && (c = document.getElementById(a.Ki));
                    !c && a.Rc && (c = $(a.Rc)[0]);
                    if (!c && a.Hb) {
                        var c = $("#" + a.Hb),
                            b = c.find("img");
                        0 === b.length && (b = $("<img>").prependTo(c));
                        c = b[0]
                    }
                    c || (c = new Image);
                    var d = a.Nk,
                        l = a.width,
                        n = a.Jc,
                        G = null != a.alpha ? a.alpha : 1,
                        b = a.ua ? h.ib : a.scale || 1,
                        k = a.text.toString(),
                        D = f.element;
                    f.sj(document.createElement("canvas"));
                    d = g.Zt(d);
                    d = new r(d);
                    d.x = Math.ceil(24 * h.Nb / 2);
                    d.y = 0;
                    d.align = n || e.rb;
                    d.Iv(k, l);
                    var n = f.element,
                        k = f.context,
                        u = (l || Math.ceil(d.width)) + Math.ceil(2 * d.x),
                        l = Math.ceil(d.height);
                    n.width = u;
                    n.height = l;
                    var F = k.globalAlpha;
                    G !== F && (k.globalAlpha = G);
                    d.B();
                    c.src = n.toDataURL("image/png");
                    G !== F && (k.globalAlpha = F);
                    D && f.sj(D);
                    G = u * b;
                    b *= l;
                    a = a.vp;
                    var A;
                    a && G > a && (a /= G, A = Math.round((1 - a) * b / 2), G *= a, b *= a);
                    b = $(c).width(G).height(b);
                    A && b.css("padding-top", A);
                    return c
                };
                r.wc = function(a) {
                    a.Nk = d.Yh;
                    return r.Ak(a)
                };
                r.ia = function(a) {
                    a.Nk =
                        d.Og;
                    return r.Ak(a)
                };
                r.Lt = function(a) {
                    a.Nk = d.nm;
                    r.Ak(a)
                };
                return r
            }(da, K, Q, Oa, aa, q, Qa, J, ba),
            B = {
                jx: 0,
                se: 1,
                fD: 2,
                VD: 3,
                gD: 4,
                lx: 5,
                kD: 6,
                TC: 7,
                Yq: 8,
                dx: 9,
                cx: 10,
                sx: 11,
                rx: 12,
                ms: 13,
                Vw: 14,
                Ww: 15,
                Xw: 16,
                Yw: 17,
                Uw: 18,
                Od: 19,
                ux: 20,
                Ow: 21,
                WC: 22,
                SD: 23,
                Kx: 24,
                gx: 25,
                Cb: 26,
                NEXT: 27,
                vb: 28,
                LOADING: 29,
                Dx: 30,
                hx: 31,
                YD: 32,
                Tq: 33,
                Uq: 34,
                Vq: 35,
                rr: 36,
                jD: 37,
                Dw: 38,
                Lw: 39,
                ox: 40,
                Zw: 41,
                ax: 42,
                Ur: 43,
                $r: 44,
                os: 45,
                ps: 46,
                qs: 47,
                or: 48,
                gr: 49,
                Wq: 50,
                rs: 51,
                pr: 52,
                ts: 53,
                us: 54,
                ss: 55,
                Tr: 56,
                ls: 57,
                ks: 58,
                js: 59,
                mr: 60,
                ws: 61,
                vs: 62,
                Xq: 63,
                bx: 64,
                qx: 65,
                Bf: 66,
                jf: 67,
                Ew: 68,
                lo: 69,
                ex: 70,
                Gq: 71,
                Ij: 72,
                nx: 200,
                kx: 201
            },
            ga = function(b, c, e, a, f) {
                function d(a) {
                    switch (c.Fi()) {
                        case e.Qj:
                            return a.u || a.A;
                        case e.Mj:
                            return a.t || a.A;
                        case e.hk:
                            return a.v || a.A;
                        default:
                            return a.A
                    }
                }
                return {
                    vo: function(a, c) {
                        var e = d(b.vo[a]);
                        e && c && (e = a + 1 + ". " + e);
                        return e
                    },
                    X: function(c) {
                        var b, e, n = a.length;
                        for (e = 0; e < n; e++)
                            if (b = a[e], b.id === c) return d(b);
                        f.debug("Missing menu string for id: " + c);
                        return ""
                    },
                    mz: d,
                    wE: function() {
                        return c.Fi()
                    }
                }
            }(U, ra, sa, [{
                    id: 0,
                    A: "Play",
                    u: "Jouer",
                    t: "Spielen",
                    v: "\u0418\u0433\u0440\u0430\u0442\u044c"
                },
                {
                    id: 1,
                    A: "Options",
                    u: "Options",
                    t: "Optionen",
                    v: "\u041d\u0430\u0441\u0442\u0440\u043e\u0439\u043a\u0438"
                }, {
                    id: 2,
                    A: "Extras",
                    u: "",
                    t: "Extras",
                    v: "\u0415\u0449\u0435 \u043a\u043e\u0435 \u0447\u0442\u043e"
                }, {
                    id: 3,
                    A: "Bonus mode",
                    u: "",
                    t: "Bonusmodus",
                    v: "\u0411\u043e\u043d\u0443\u0441 \u0440\u0435\u0436\u0438\u043c"
                }, {
                    id: 4,
                    A: "Full version",
                    u: "Version compl\u00e8te",
                    t: "Vollversion",
                    v: "\u041f\u043e\u043b\u043d\u0430\u044f \u0432\u0435\u0440\u0441\u0438\u044f"
                }, {
                    id: 5,
                    A: "Reset game",
                    u: "R\u00e9initialiser",
                    t: "Neu starten",
                    v: "\u0421\u0431\u0440\u043e\u0441 \u043f\u0440\u043e\u0433\u0440\u0435\u0441\u0441\u0430"
                }, {
                    id: 6,
                    A: "Help",
                    u: "",
                    t: "Hilfe",
                    v: "\u041f\u043e\u043c\u043e\u0449\u044c"
                }, {
                    id: 7,
                    A: "About",
                    u: "\u00c0 propos",
                    t: "\u00dcber",
                    v: "\u041e\u0431 \u0438\u0433\u0440\u0435"
                }, {
                    id: 8,
                    A: "Credits",
                    u: "Cr\u00e9dits",
                    t: "Mitwirkende",
                    v: "\u0410\u0432\u0442\u043e\u0440\u044b"
                }, {
                    id: 9,
                    A: "Music on",
                    u: "Musique oui",
                    t: "Musik an",
                    v: "\u041c\u0443\u0437\u044b\u043a\u0430 \u0432\u043a\u043b."
                }, {
                    id: 10,
                    A: "Music off",
                    u: "Musique non",
                    t: "Musik aus ",
                    v: "\u041c\u0443\u0437\u044b\u043a\u0430 \u0432\u044b\u043a\u043b."
                }, {
                    id: 11,
                    A: "Sounds on",
                    u: "Sons oui",
                    t: "Ger\u00e4usche an",
                    v: "\u0417\u0432\u0443\u043a\u0438 \u0432\u043a\u043b."
                }, {
                    id: 12,
                    A: "Sounds off",
                    u: "Sons non",
                    t: "Ger\u00e4usche aus",
                    v: "\u0417\u0432\u0443\u043a\u0438 \u0432\u044b\u043a\u043b."
                }, {
                    id: B.ms,
                    A: "Are you sure you want to reset your progress?",
                    u: "Voulez-vous vraiment r\u00e9initialiser votre progression?",
                    t: "M\u00f6chtest du deinen Fortschritt wirklich zur\u00fccksetzen?",
                    v: "\u0423\u0432\u0435\u0440\u0435\u043d\u044b \u0447\u0442\u043e \u0445\u043e\u0442\u0438\u0442\u0435 \u0441\u0431\u0440\u043e\u0441\u0438\u0442\u044c \u0438\u0433\u0440\u043e\u0432\u043e\u0439 \u043f\u0440\u043e\u0433\u0440\u0435\u0441\u0441?"
                },
                {
                    id: 14,
                    A: "Passable!",
                    u: "Passable!",
                    t: "Passabel!",
                    v: "\u0423\u0440\u043e\u0432\u0435\u043d\u044c \u043f\u0440\u043e\u0439\u0434\u0435\u043d!"
                }, {
                    id: 15,
                    A: "Good!",
                    u: "Bien!",
                    t: "Gut!",
                    v: "\u0425\u043e\u0440\u043e\u0448\u043e!"
                }, {
                    id: 16,
                    A: "Great!",
                    u: "Super!",
                    t: "Prima!",
                    v: "\u041e\u0442\u043b\u0438\u0447\u043d\u043e!"
                }, {
                    id: 17,
                    A: "Excellent!",
                    u: "Formidable!",
                    t: "Hervorragend!",
                    v: "\u0421\u0443\u043f\u0435\u0440!"
                }, {
                    id: 18,
                    A: "Level",
                    u: "Niveau",
                    t: "Level",
                    v: "\u0423\u0440\u043e\u0432\u0435\u043d\u044c"
                }, {
                    id: 19,
                    A: "Time",
                    u: "Temps",
                    t: "Zeit",
                    v: "\u0412\u0440\u0435\u043c\u044f"
                }, {
                    id: 20,
                    A: "Star Bonus",
                    u: "Bonus \u00e9toile",
                    t: "Sternenbonus",
                    v: "\u0411\u043e\u043d\u0443\u0441 \u0437\u0430 \u0437\u0432\u0435\u0437\u0434\u044b"
                }, {
                    id: 21,
                    A: "Your Final Score",
                    u: "Votre score final",
                    t: "Dein Endpunktestand",
                    v: "\u0418\u0442\u043e\u0433\u043e\u0432\u044b\u0435 \u043e\u0447\u043a\u0438"
                }, {
                    id: 22,
                    A: "Best Score",
                    u: "Meilleur score",
                    t: "Beste punktzahl",
                    v: "\u041b\u0443\u0447\u0448\u0438\u0439 \u0440\u0435\u0437\u0443\u043b\u044c\u0442\u0430\u0442"
                },
                {
                    id: 23,
                    A: "Score",
                    u: "Score",
                    t: "Punktzahl",
                    v: "\u041e\u0447\u043a\u0438"
                }, {
                    id: 24,
                    A: "Yes",
                    u: "Oui",
                    t: "Ja",
                    v: "\u0414\u0430"
                }, {
                    id: 25,
                    A: "No",
                    u: "Non",
                    t: "Nein",
                    v: "\u041d\u0435\u0442"
                }, {
                    id: 26,
                    A: "Replay",
                    u: "Rejouer",
                    t: "Wieder",
                    v: "\u0415\u0449\u0435 \u0440\u0430\u0437"
                }, {
                    id: 27,
                    A: "Next",
                    u: "Suivant",
                    t: "Weiter",
                    v: "\u0412\u043f\u0435\u0440\u0435\u0434"
                }, {
                    id: 28,
                    A: "Menu",
                    u: "Menu",
                    t: "Men\u00fc",
                    v: "\u041c\u0435\u043d\u044e"
                }, {
                    id: 29,
                    A: "Loading...",
                    u: "Chargement...",
                    t: "Laden...",
                    v: "\u0417\u0430\u0433\u0440\u0443\u0437\u043a\u0430..."
                },
                {
                    id: 30,
                    A: "Total: %d",
                    u: "Total: %d",
                    t: "Gesamt: %d",
                    v: "\u0412\u0441\u0435\u0433\u043e: %d"
                }, {
                    id: 31,
                    A: "Ok",
                    u: "OK",
                    t: "Ok",
                    v: "Ok"
                }, {
                    id: 32,
                    A: "Collect %d stars to unlock this level pack",
                    u: "Recueillez %d \u00e9toiles pour d\u00e9verrouiller ce pack de niveaux",
                    t: "Sammle %d Sterne, um dieses Levelpaket freizuschalten",
                    v: "\u0421\u043e\u0431\u0435\u0440\u0438\u0442\u0435 %d \u0437\u0432\u0435\u0437\u0434 \u0447\u0442\u043e\u0431\u044b \u043e\u0442\u043a\u0440\u044b\u0442\u044c \u043a\u043e\u0440\u043e\u0431\u043a\u0443"
                },
                {
                    id: B.Tq,
                    A: "You are missing",
                    u: "Il vous en manque",
                    t: "Dir fehlen",
                    v: "\u0412\u0430\u043c \u043d\u0435\u0445\u0432\u0430\u0442\u0430\u0435\u0442 \u0432\u0441\u0435\u0433\u043e"
                }, {
                    id: B.Uq,
                    A: "to unlock this box",
                    u: "pour d\u00e9verrouiller bo\u00eete",
                    t: "um dieses Box freizuschalten",
                    v: "\u0447\u0442\u043e\u0431\u044b \u043e\u0442\u043a\u0440\u044b\u0442\u044c \u043a\u043e\u0440\u043e\u0431\u043a\u0443"
                }, {
                    id: B.Vq,
                    A: "Get more stars from the earlier levels",
                    u: "Recueillez plus d'\u00e9toiles dans les niveaux pr\u00e9c\u00e9dents",
                    t: "Gewinne mehr Sterne in den niedrigeren Leveln",
                    v: "\u0421\u043e\u0431\u0435\u0440\u0438\u0442\u0435 \u0431\u043e\u043b\u044c\u0448\u0435 \u0437\u0432\u0435\u0437\u0434 \u0432 \u043f\u0440\u0435\u0434\u044b\u0434\u0443\u0449\u0438\u0445 \u0443\u0440\u043e\u0432\u043d\u044f\u0445"
                }, {
                    id: 37,
                    A: "Check back for the new levels coming with the updates",
                    u: "Revenez pour d\u00e9couvrir de nouveaux niveaux avec les mises \u00e0 jour",
                    t: "Komm bald wieder, neue Level kommen mit den Updates",
                    v: "\u041d\u043e\u0432\u044b\u0435 \u0443\u0440\u043e\u0432\u043d\u0438 \u0431\u0443\u0434\u0443\u0442 \u0434\u043e\u0431\u0430\u0432\u043b\u044f\u0442\u044c\u0441\u044f \u0441 \u0430\u043f\u0434\u0435\u0439\u0442\u0430\u043c\u0438"
                },
                {
                    id: B.Dw,
                    A: "achievement gained!",
                    u: "r\u00e9alisation d\u00e9verrouill\u00e9e!",
                    t: "Erfolg geschafft!",
                    v: "\u043e\u0442\u043a\u0440\u044b\u0442\u043e!"
                }, {
                    id: 39,
                    A: "Continue",
                    u: "Continuer",
                    t: "Weiter",
                    v: "\u041f\u0440\u043e\u0434\u043e\u043b\u0436\u0438\u0442\u044c"
                }, {
                    id: 40,
                    A: "Skip level",
                    u: "Passer",
                    t: "\u00dcberspringen",
                    v: "\u041f\u0440\u043e\u043f\u0443\u0441\u0442\u0438\u0442\u044c"
                }, {
                    id: 41,
                    A: "Level select",
                    u: "Choisir niveau",
                    t: "Levelauswahl",
                    v: "\u0412\u044b\u0431\u043e\u0440 \u0443\u0440\u043e\u0432\u043d\u044f"
                },
                {
                    id: 42,
                    A: "Main menu",
                    u: "Menu principal",
                    t: "Hauptmen\u00fc",
                    v: "\u0413\u043b\u0430\u0432\u043d\u043e\u0435 \u043c\u0435\u043d\u044e"
                }, {
                    id: B.Tr,
                    A: "Language",
                    v: "\u042f\u0437\u044b\u043a",
                    u: "Langue",
                    t: "Sprache"
                }, {
                    id: B.gr,
                    A: "Drag to Cut",
                    u: "Glisser",
                    t: "Ziehe: Schneide",
                    v: "\u041f\u0435\u0440\u0435\u0442\u0430\u0441\u043a\u0438\u0432\u0430\u043d\u0438\u0435\u043c"
                }, {
                    id: B.Wq,
                    A: "Click to Cut",
                    u: "Cliquer",
                    t: "Klicke: Schneide",
                    v: "\u0429\u0435\u043b\u0447\u043a\u043e\u043c"
                }, {
                    id: B.Ur,
                    A: "Let's Play",
                    u: "C'est parti",
                    t: "Lass uns spielen",
                    v: "\u0414\u0430\u0432\u0430\u0439\u0442\u0435 \u043f\u043e\u0438\u0433\u0440\u0430\u0435\u043c"
                }, {
                    id: B.$r,
                    A: "More Cut the Rope fun!",
                    u: "Toujours plus de Cut the Rope !",
                    t: "Mehr Cut the Rope Spa\u00df!",
                    v: "\u0415\u0449\u0435 \u0431\u043e\u043b\u044c\u0448\u0435 \u0432\u0435\u0441\u0435\u043b\u044c\u044f \u0432 \u0438\u0433\u0440\u0435 Cut the Rope!"
                }, {
                    id: B.qs,
                    A: "Share...",
                    u: "Partager...",
                    t: "Teilen...",
                    v: "\u041f\u043e\u0434\u0435\u043b\u0438\u0442\u044c\u0441\u044f..."
                }, {
                    id: B.os,
                    A: "Share",
                    u: "Partager",
                    t: "Teilen",
                    v: "\u041f\u043e\u0434\u0435\u043b\u0438\u0442\u044c\u0441\u044f"
                }, {
                    id: B.Xq,
                    A: "Congratulations!",
                    u: "F\u00e9licitations!",
                    t: "Gratulation!",
                    v: "\u041f\u043e\u0437\u0434\u0440\u0430\u0432\u043b\u044f\u0435\u043c!"
                }, {
                    id: B.rr,
                    A: "You completed the game with %d stars!",
                    u: "Tu as termin\u00e9 le jeu avec %d \u00e9toiles !",
                    t: "Du hast das Spiel mit %d Sternen beendet!",
                    v: "\u0412\u044b \u0437\u0430\u0432\u0435\u0440\u0448\u0438\u043b\u0438 \u0438\u0433\u0440\u0443 \u0441\u043e \u0441\u043b\u0435\u0434\u0443\u044e\u0449\u0438\u043c \u043a\u043e\u043b\u0438\u0447\u0435\u0441\u0442\u0432\u043e\u043c \u0437\u0432\u0435\u0437\u0434: %d!"
                },
                {
                    id: B.ps,
                    A: "I just found one of Om Nom's secret drawings!",
                    u: "Je viens juste de trouver un des dessins secrets de Om Nom !",
                    t: "Ich habe gerade eine geheime Om-Nom-Zeichnung entdeckt!",
                    v: "\u041c\u043d\u043e\u044e \u0442\u043e\u043b\u044c\u043a\u043e \u0447\u0442\u043e \u0431\u044b\u043b \u043e\u0431\u043d\u0430\u0440\u0443\u0436\u0435\u043d \u043e\u0434\u0438\u043d \u0438\u0437 \u0442\u0430\u0439\u043d\u044b\u0445 \u0440\u0438\u0441\u0443\u043d\u043a\u043e\u0432 \u0410\u043c \u041d\u044f\u043c\u0430!"
                },
                {
                    id: B.or,
                    A: "You found a drawing!",
                    u: "Tu as trouv\u00e9 un dessin !",
                    t: "Du hast die Zeichnung gefunden!",
                    v: "\u0412\u044b \u043e\u0431\u043d\u0430\u0440\u0443\u0436\u0438\u043b\u0438 \u0440\u0438\u0441\u0443\u043d\u043e\u043a!"
                }, {
                    id: B.rs,
                    A: "Show Me",
                    u: "Montre-moi",
                    t: "Zeig es mir",
                    v: "\u041f\u043e\u043a\u0430\u0437\u0430\u0442\u044c \u043c\u043d\u0435"
                }, {
                    id: B.pr,
                    A: "Free Download",
                    u: "T\u00e9l\u00e9chargement gratuit",
                    t: "Kostenloser Download",
                    v: "\u0411\u0435\u0441\u043f\u043b\u0430\u0442\u043d\u0430\u044f \u0437\u0430\u0433\u0440\u0443\u0437\u043a\u0430"
                },
                {
                    id: B.ts,
                    A: "Cut the Rope is a fun game where you feed candy to the curiously cute green monster Om-nom.",
                    u: "Cut the Rope est un jeu amusant dans lequel tu dois nourrir Om Nom, un curieux petit monstre.",
                    t: "Cut the Rope ist ein lustiges Spiel, wobei du dem kuriosem, niedlichem Monster Om-nom S\u00fc\u00dfigkeiten f\u00fctterst.",
                    v: "Cut the Rope   \u044d\u0442\u043e \u0432\u0435\u0441\u0435\u043b\u0430\u044f \u0438\u0433\u0440\u0430, \u0432 \u043a\u043e\u0442\u043e\u0440\u043e\u0439 \u0432\u044b \u043a\u043e\u0440\u043c\u0438\u0442\u0435 \u0441\u043b\u0430\u0434\u043e\u0441\u0442\u044f\u043c\u0438 \u043b\u044e\u0431\u043e\u043f\u044b\u0442\u043d\u043e\u0433\u043e \u0438 \u043c\u0438\u043b\u043e\u0433\u043e \u043c\u043e\u043d\u0441\u0442\u0440\u0430 \u043f\u043e \u0438\u043c\u0435\u043d\u0438 \u0410\u043c \u041d\u044f\u043c."
                },
                {
                    id: B.us,
                    A: "Om Nom is Om Line - Cut the Rope for the Web",
                    u: "Om Nom est om ligne - Cut the Rope version web",
                    t: "Om Nom ist Om Line - Cut the Rope f\u00fcr das Internet",
                    v: "\u0410\u043c \u041d\u044f\u043c \u0432 \u0410\u043c \u041b\u0430\u0439\u043d\u0435 \u2013 \u0432\u0435\u0431-\u0432\u0435\u0440\u0441\u0438\u044f \u0438\u0433\u0440\u044b Cut the Rope"
                }, {
                    id: B.ss,
                    A: 'Play the HTML5 version of "Cut the Rope"!',
                    u: "Joue \u00e0 Cut the Rope dans sa version HTML5 !",
                    t: 'Spiele die HTML5 Version von "Cut the Rope"!',
                    v: "\u0418\u0433\u0440\u0430\u0439\u0442\u0435 \u0432 HTML5-\u0432\u0435\u0440\u0441\u0438\u044e \u0438\u0433\u0440\u044b Cut the Rope!"
                }, {
                    id: B.ls,
                    A: 'Hold the "yes" button for 3 seconds to reset.',
                    u: 'Maintenir le doigt sur "Oui" pendant 3 secondes pour r\u00e9initialiser.',
                    t: 'Halte zum Neustarten 3 Sekunden lang "Ja" gedr\u00fcckt.',
                    v: '\u0423\u0434\u0435\u0440\u0436\u0438\u0432\u0430\u0439\u0442\u0435 "\u0414\u0430" \u0432 \u0442\u0435\u0447\u0435\u043d\u0438\u0435 3 \u0441\u0435\u043a\u0443\u043d\u0434 \u0434\u043b\u044f \u0441\u0431\u0440\u043e\u0441\u0430 \u043f\u0440\u043e\u0433\u0440\u0435\u0441\u0441\u0430.'
                },
                {
                    id: B.mr,
                    A: "everything off",
                    u: "tout couper",
                    t: "alles aus",
                    v: "\u0432\u0441\u0435 \u043e\u0442\u043a\u043b\u044e\u0447\u0435\u043d\u043e"
                }, {
                    id: B.ks,
                    A: "reload the game in SD",
                    u: "recharger le jeu en SD",
                    t: "Spiel in SD neu laden",
                    v: "\u043f\u0435\u0440\u0435\u0437\u0430\u0433\u0440\u0443\u0437\u0438\u0442\u044c \u0438\u0433\u0440\u0443 \u0432 SD"
                }, {
                    id: B.js,
                    A: "reload the game in HD",
                    u: "recharger le jeu en HD",
                    t: "Spiel in HD neu laden",
                    v: "\u043f\u0435\u0440\u0435\u0437\u0430\u0433\u0440\u0443\u0437\u0438\u0442\u044c \u0438\u0433\u0440\u0443 \u0432 HD"
                },
                {
                    id: B.ws,
                    A: "A Little Too Slow...",
                    u: "Un peu trop lent",
                    t: "Etwas zu langsam...",
                    v: "\u041a\u0430\u043a-\u0442\u043e \u043d\u0435 \u043e\u0447\u0435\u043d\u044c \u0431\u044b\u0441\u0442\u0440\u043e..."
                }, {
                    id: B.vs,
                    A: "Om Nom is sad because your computer is running slow. We'll do our best, but there may be some slow-downs.",
                    u: "Om Nom est triste. Votre ordinateur est tr\u00e8s lent. Nous ferons notre mieux, mais il est possible que le jeu ralentisse.",
                    t: "Om Nom ist traurig, weil dein Computer so langsam ist. Wir geben unser Bestes, aber es kann trotzdem zu Verz\u00f6gerungen kommen.",
                    v: '\u0410\u043c \u041d\u044f\u043c \u043e\u043f\u0435\u0447\u0430\u043b\u0435\u043d: \u0443 \u0432\u0430\u0441 \u0441\u043b\u0438\u0448\u043a\u043e\u043c \u043c\u0435\u0434\u043b\u0435\u043d\u043d\u044b\u0439 \u043a\u043e\u043c\u043f\u044c\u044e\u0442\u0435\u0440. \u041c\u044b, \u043a\u043e\u043d\u0435\u0447\u043d\u043e, \u043f\u043e\u0441\u0442\u0430\u0440\u0430\u0435\u043c\u0441\u044f, \u043d\u043e \u0438\u0433\u0440\u0430 \u0443 \u0432\u0430\u0441 \u043c\u043e\u0436\u0435\u0442 "\u043f\u0440\u0438\u0442\u043e\u0440\u043c\u0430\u0436\u0438\u0432\u0430\u0442\u044c".'
                },
                {
                    id: B.bx,
                    A: "Music",
                    u: "Musique",
                    t: "Musik",
                    v: "\u041c\u0443\u0437\u044b\u043a\u0430"
                }, {
                    id: B.qx,
                    A: "Sounds",
                    u: "Sons oui",
                    t: "Ger\u00e4usche",
                    v: "\u0417\u0432\u0443\u043a\u0438"
                }, {
                    id: B.Bf,
                    A: "Leaderboards",
                    u: "Classements",
                    t: "Bestenlisten",
                    v: "\u0422\u0430\u0431\u043b\u0438\u0446\u0430 \u0440\u0435\u043a\u043e\u0440\u0434\u043e\u0432"
                }, {
                    id: B.jf,
                    A: "Achievements",
                    u: "Succ\u00e8s",
                    t: "Erfolge",
                    v: "\u0414\u043e\u0441\u0442\u0438\u0436\u0435\u043d\u0438\u044f"
                }, {
                    id: B.Ew,
                    A: "Achievement unlocked!",
                    u: "Succ\u00e8s d\u00e9bloqu\u00e9 !",
                    t: "Erfolg freigeschaltet!",
                    v: "\u041d\u043e\u0432\u043e\u0435 \u0434\u043e\u0441\u0442\u0438\u0436\u0435\u043d\u0438\u0435!"
                }, {
                    id: B.lo,
                    A: "Get MANY MORE\n levels in the full version",
                    u: "De NOMBREUX autres niveaux\n sont disponibles dans la version compl\u00e8te!",
                    t: "In der Vollversion gibt\n es noch VIEL MEHR Level!",
                    v: "\u041f\u043e\u043b\u0443\u0447\u0438\u0442\u0435 \u041d\u0410\u041c\u041d\u041e\u0413\u041e \u0411\u041e\u041b\u042c\u0428\u0415\n \u0443\u0440\u043e\u0432\u043d\u0435\u0439 \u0432 \u043f\u043e\u043b\u043d\u043e\u0439 \u0432\u0435\u0440\u0441\u0438\u0438!"
                },
                {
                    id: B.ex,
                    A: "Name",
                    u: "Nom",
                    t: "Name",
                    v: "\u0418\u043c\u044f"
                }, {
                    id: B.Gq,
                    A: "{0} & {1}",
                    u: "{0} et {1}",
                    t: "{0} und {1}",
                    v: "{0} \u0438 {1}"
                }, {
                    id: B.Ij,
                    A: "Buy Full Game",
                    u: "Acheter le jeu complet",
                    t: "Vollversion kaufen",
                    v: "\u041a\u0443\u043f\u0438\u0442\u044c \u043f\u043e\u043b\u043d\u0443\u044e \u0432\u0435\u0440\u0441\u0438\u044e"
                }, {
                    id: B.nx,
                    A: "Settings",
                    u: "Param\u00e8tres",
                    t: "Einstellungen",
                    v: "\u041d\u0430\u0441\u0442\u0440\u043e\u0439\u043a\u0438"
                }, {
                    id: B.kx,
                    A: "Privacy",
                    u: "Vie priv\u00e9e",
                    t: "Datenschutz",
                    v: "\u041a\u043e\u043d\u0444\u0438\u0434\u0435\u043d\u0446\u0438\u0430\u043b\u044c\u043d\u043e\u0441\u0442\u044c"
                }
            ], ea),
            S = function(b, c, e, a, f, d) {
                var g = {
                        A: "I just finished playing Cut the Rope on the web with %d (out of %d possible) stars!",
                        u: "",
                        t: "",
                        v: ""
                    },
                    h = {
                        dD: !0,
                        eD: !1,
                        ZD: !1,
                        fp: "images/",
                        Hh: "images/" + c.dh + "/",
                        $c: "images/" + c.dh + "/ui/",
                        tt: "images/" + c.dh + "/" + (d.fy || "ui/"),
                        by: "audio/",
                        cz: function() {
                            return soundManager.useHTML5Audio ? Modernizr.audio.m4a ? ".m4a" : Modernizr.audio.ogg ? ".ogg" : null : ".m4a"
                        },
                        Aw: "video/",
                        cu: function() {
                            return Modernizr.video.h264 ? ".mp4" : Modernizr.video.webm ? ".webm" : null
                        },
                        gz: function() {
                            var a = window.location;
                            return a.protocol + "//" + a.host + "/images/" + c.dh + "/ui/"
                        },
                        lz: function() {
                            var a = window.location;
                            return a.protocol + "//" + a.host + "/images/scores/"
                        },
                        YB: function(a, c) {
                            a.click(c)
                        },
                        QB: function(a, c) {
                            a.click(c)
                        },
                        NC: function(a, c) {
                            a.toggleClass("disabled", !c)
                        },
                        LC: function(a, c) {
                            a.toggleClass("disabled", !c)
                        },
                        xC: function(a) {
                            $("#langBtn").toggle(a)
                        },
                        NB: function(a) {
                            $("#langBtn").click(function() {
                                a(null)
                            })
                        },
                        KC: function() {
                            h.Ev($("#langBtn"), e.X(a.Tr) + ":");
                            $("#flag").offset()
                        },
                        EB: function(a) {
                            $("#cutBtn").click(a)
                        },
                        IC: function(d) {
                            var g = 400 * c.Nb,
                                h = 0.8 * c.ib,
                                m = f.$b;
                            b.wc({
                                text: e.X(a.gr),
                                width: g,
                                Ki: "dragText",
                                scale: h,
                                Jc: m
                            });
                            b.wc({
                                text: e.X(a.Wq),
                                width: g,
                                Ki: "cutText",
                                scale: h,
                                Jc: m
                            });
                            $("#cutBtn").toggleClass("disabled", !d)
                        },
                        XB: function(a, c) {
                            h.Ev(a, c)
                        },
                        Ev: function(a, c) {
                            b.ia({
                                text: c,
                                img: a.find("img")[0],
                                ua: !0
                            })
                        },
                        hz: function(a, c) {
                            return e.mz(g).replace("%d", a).replace("%d", c)
                        },
                        yu: function() {
                            var a = Modernizr.canvas &&
                                Modernizr.audio && Modernizr.video && Modernizr.rgba && Modernizr.opacity && Modernizr.fontface && Modernizr.csstransforms && Modernizr.hq;
                            a || (Modernizr.load({
                                load: "css!css/nosupport.css?RELEASE_TAG"
                            }), $(function() {
                                $("#yt-video").remove()
                            }), _gaq.push(["_trackEvent", "Upgrade", "View"]));
                            return a
                        }
                    };
                return h
            }(fa, J, ga, B, Q, U),
            Wa = {
                mA: !0
            },
            hb = function(b, c) {
                function e(b, d) {
                    var e = a.getSoundById("s" + b);
                    if (e) try {
                        d.call(this, e)
                    } catch (f) {
                        c.debug("Sound exception:" + f)
                    } else c.debug("No sound loaded:" + b)
                }
                var a = window.soundManager,
                    f = !1,
                    d = [];
                a.audioFormats.mp3.required = !1;
                a.setup({
                    useHTML5Audio: !0,
                    preferFlash: !1,
                    url: "/sm2/",
                    flashVersion: 9,
                    useHighPerformance: !0,
                    debugMode: !0,
                    flashLoadTimeout: 500,
                    ontimeout: function() {
                        a.useHTML5Audio = !0;
                        a.preferFlash = !1;
                        a.reboot()
                    },
                    onready: function() {
                        f = !0;
                        for (var a = 0, c = d.length; a < c; a++) d[a]()
                    }
                });
                return {
                    PC: function() {
                        return a.useGlobalHTML5Audio
                    },
                    $i: function(a) {
                        f ? a() : d.push(a)
                    },
                    play: function(a, c) {
                        e(a, function(a) {
                            var b = null;
                            c && (b = {}, b.onfinish = c);
                            a.play(b)
                        })
                    },
                    bl: function(a) {
                        var c = !1;
                        e(a, function(a) {
                            c =
                                1 === a.playState && !a.paused
                        });
                        return c
                    },
                    Dz: function(a) {
                        var c = !0;
                        e(a, function(a) {
                            c = a.paused
                        });
                        return c
                    },
                    pause: function(a) {
                        e(a, function(a) {
                            a.pause()
                        })
                    },
                    stop: function(a) {
                        e(a, function(a) {
                            a.stop()
                        })
                    },
                    cC: function(a, c) {
                        e(a, function(a) {
                            a.volume = c
                        })
                    }
                }
            }(S, ea),
            ua = function() {
                return new function() {
                    this.Bp = function(b, c, e) {
                        return c * b / e + 0
                    };
                    this.Py = function() {
                        return 0.05 * Math.sin(t / 100 * (Math.PI / 2)) + 0
                    };
                    this.Pt = function(b, c, e, a) {
                        return e * ((b = b / a - 1) * b * b + 1) + c
                    };
                    this.xi = function(b, c, e, a) {
                        return 1 > (b /= a / 2) ? e / 2 * b * b * b + c : e /
                            2 * ((b -= 2) * b * b + 2) + c
                    };
                    this.Rf = function(b, c, e, a) {
                        return b == a ? c + e : e * (-Math.pow(2, -10 * b / a) + 1) + c
                    };
                    this.Ek = function(b, c, e) {
                        return 0 == b ? 0 : b == e ? 0 + c : 1 > (b /= e / 2) ? c / 2 * Math.pow(2, 10 * (b - 1)) + 0 : c / 2 * (-Math.pow(2, -10 * --b) + 2) + 0
                    };
                    this.No = function(b, c, e, a) {
                        var f = 1.5;
                        void 0 == f && (f = 1.70158);
                        return e * ((b = b / a - 1) * b * ((f + 1) * b + f) + 1) + c
                    };
                    this.Dk = function(b, c, e, a) {
                        void 0 == a && (a = 1.70158);
                        return 1 > (b /= e / 2) ? c / 2 * b * b * (((a *= 1.525) + 1) * b - a) + 0 : c / 2 * ((b -= 2) * b * (((a *= 1.525) + 1) * b + a) + 2) + 0
                    };
                    this.Ot = function(b, c, e, a) {
                        return 1 > (b /= a / 2) ? e / 2 * b * b + c :
                            -e / 2 * (--b * (b - 2) - 1) + c
                    }
                }
            }(),
            ib = function(b, c, e, a) {
                return new function() {
                    function f() {
                        function a() {
                            var d = Date.now() - f;
                            if (null == l) h = r, l = 0;
                            else if (r > n) {
                                var g = 100 / (100 - h) * (r - n);
                                0 > g && (g = 0);
                                l += g
                            }
                            l < n && (l += 0.3);
                            n = r;
                            99 < l && (l = 99);
                            c.save();
                            c.setTransform(1, 0, 0, 1, 0, 0);
                            c.clearRect(0, 0, x.width, x.height);
                            c.restore();
                            for (g = 0; g < p.length; g++) {
                                var u = p[g];
                                u.Bh ? (u.y.offset = 250, u.x.offset = e / 2 - (u.img.width + u.x.Hd) / 2) : d < u.delay ? (u.y.offset = -1E4, u.y.kd = d) : (d - u.y.kd >= u.y.duration && (u.y.kd = d, u.$e = 0.5 + 0.5 * Math.random(), u.x.offset =
                                    Math.random() * (e - u.x.Hd * (1 / u.$e))), u.y.offset = k + 2 * u.img.height - b.Bp(d - u.y.kd, 1, u.y.duration) * (k + 2 * u.img.height) - u.img.height);
                                d - u.x.kd >= u.x.duration && (u.x.kd = d, u.x.oh && (u.x.sh = !u.x.sh));
                                u.x.val = b.Ot(d - u.x.kd, u.x.Le, u.x.Hd - u.x.Le, u.x.duration);
                                u.x.abs = u.x.offset + (u.x.sh ? u.x.Hd - u.x.val : u.x.val);
                                u.x.abs > e - u.img.width * u.$e && (u.x.abs = e - u.img.width * u.$e);
                                u.Bh ? (d - u.y.kd >= u.y.duration && (u.y.kd = d, u.y.oh && (u.y.sh = !u.y.sh)), u.y.val = b.Ot(d - u.y.kd, u.y.Le, u.y.Hd - u.y.Le, u.y.duration)) : u.y.val = 0;
                                u.y.abs = u.y.offset +
                                    (u.y.sh ? u.y.Hd - u.y.val : u.y.val);
                                if (u.Bh) {
                                    var D = Math.floor(Math.round(l) / 10) % 10,
                                        s = Math.round(l) % 10;
                                    c.drawImage(G, 100 * D, 0, 100, 100, u.x.abs + 65, u.y.abs + 75, 100, 100);
                                    c.drawImage(G, 100 * s, 0, 100, 100, u.x.abs + 105, u.y.abs + 75, 100, 100);
                                    c.drawImage(G, 1E3, 0, 100, 100, u.x.abs + 145, u.y.abs + 75, 100, 100)
                                }
                                c.save();
                                u.Bh ? c.drawImage(u.img, u.x.abs, u.y.abs) : (c.scale(u.$e, u.$e), c.drawImage(u.img, u.x.abs * (1 / u.$e), u.y.abs * (1 / u.$e)));
                                c.restore()
                            }
                            m && window.requestAnimationFrame(a)
                        }
                        m = !0;
                        g();
                        var c = x.getContext("2d"),
                            k = x.height,
                            e = x.width,
                            f = Date.now(),
                            l = null,
                            h = null,
                            n = -1,
                            p = [new d(!0), new d(!1, 0, 3E3, 5E3, 300), new d(!1, 300, 5E3, 6E3, 400), new d(!1, 2E3, 2E3, 4E3, 200), new d(!1, 3200, 3E3, 5E3, 300)];
                        window.requestAnimationFrame(a)
                    }

                    function d(a, c, b, k, d) {
                        function e() {
                            this.duration = this.Hd = this.Le = this.kd = this.val = this.abs = 0;
                            this.sh = this.oh = !1;
                            this.offset = 0
                        }
                        this.y = new e;
                        this.x = new e;
                        this.Bh = a;
                        this.delay = c;
                        this.img = this.Bh ? z : s;
                        this.$e = 0.5 + 0.5 * Math.random();
                        this.Bh ? (this.x.Le = 0, this.x.Hd = 150, this.x.duration = 2800, this.x.oh = !0, this.y.Le = 0, this.y.Hd = 60,
                            this.y.duration = 1300, this.y.oh = !0) : (this.x.Le = 0, this.x.Hd = d, this.x.duration = b, this.x.oh = !0, this.y.Le = 0, this.y.Hd = 1, this.y.duration = k, this.y.oh = !1)
                    }

                    function g() {
                        !n && C && x && (x.width = C.offsetWidth, x.height = C.offsetHeight)
                    }

                    function h() {
                        k && D && u && ($(window).on("resize", g), p = setTimeout(function() {
                            n || ($("#loaderWindow").fadeIn(), $("#loaderLogo").fadeIn(200), f());
                            p = null
                        }, 1E3))
                    }
                    this.Vb = this.sound = 0;
                    var l = this,
                        n = !1,
                        r = 0,
                        m = !1,
                        p = null,
                        C, x, z, s, G, k = !1,
                        D = !1,
                        u = !1;
                    this.init = function(b) {
                        var d = new PxLoader({
                            PE: 3E4
                        });
                        e.mA ||
                            d.addImage("images/page/tilebg.jpg");
                        var f, g, l;
                        if (f = c.fA)
                            for (g = 0, l = f.length; g < l; g++) d.addImage("images/page/" + f[g]);
                        if (f = e.ME)
                            for (g = 0, l = f.length; g < l; g++) d.addImage(a.Hh + f[g]);
                        z = d.addImage("images/page/loader-bubble.png");
                        s = d.addImage("images/page/loader-smallbubble.png");
                        G = d.addImage("images/page/loader-numbers.png");
                        d.addCompletionListener(function() {
                            k = !0;
                            h();
                            b && b()
                        });
                        d.start()
                    };
                    this.jb = function() {
                        C = document.getElementById("loaderCanvasHost");
                        x = document.getElementById("loaderCanvas");
                        D = !0;
                        h()
                    };
                    this.nA =
                        function() {
                            m = !1;
                            n = !0;
                            r = 100
                        };
                    this.Iu = function(a, c) {
                        "sound" === c ? (r = a + l.Vb, l.sound = a) : (r = a + l.sound, l.Vb = a)
                    };
                    this.show = function() {
                        u = !0;
                        h()
                    };
                    this.hide = function() {
                        function a() {
                            $("#loaderWindow").hide()
                        }
                        p && (clearTimeout(p), p = null);
                        if (m) {
                            m = !1;
                            if (D) {
                                var c = x.getContext("2d");
                                c.save();
                                c.setTransform(1, 0, 0, 1, 0, 0);
                                c.clearRect(0, 0, x.width, x.height);
                                c.restore()
                            }
                            $("#loaderWindow").fadeOut(500, a)
                        } else a();
                        $(window).off("resize", g)
                    }
                }
            }(ua, U, Wa, S),
            Ab = function(b, c, e, a, f) {
                function d() {
                    if (h && l) {
                        var d = {};
                        d.noProgressTimeout =
                            a.PC() ? 300 : 3E4;
                        var d = new PxLoader(d),
                            r = b.by,
                            m = b.cz(),
                            p, C, x, z;
                        p = 0;
                        for (C = c.zu.length; p < C; p++) x = c.zu[p], z = r + e[x].path + m, d.addSound("s" + x, z, "MENU");
                        p = 0;
                        for (C = c.Yt.length; p < C; p++) x = c.Yt[p], z = r + e[x].path + m, d.addSound("s" + x, z);
                        d.addCompletionListener(function() {
                            for (var a = 0, c = g.length; a < c; a++) g[a]()
                        });
                        d.addProgressListener(function(a) {
                            a = 50 * (a.completedCount / a.totalCount);
                            f && f.Iu(a, "sound")
                        });
                        d.start()
                    }
                }
                var g = [],
                    h = !1,
                    l = !1;
                a.$i(function() {
                    l = !0;
                    d()
                });
                return {
                    start: function() {
                        h = !0;
                        d()
                    },
                    BA: function(a) {
                        g.push(a)
                    }
                }
            }(S,
                U, Pa, hb, ib),
            Bb = function(b, c, e, a, f, d, g, h, l) {
                function n() {
                    function d(a, c, e) {
                        if (a)
                            for (c = c || b.$c, e = e || "MENU", k = 0, D = a.length; k < D; k++) a[k] && (u = c + a[k], p.addImage(u, e))
                    }

                    function n(a, c) {
                        var b, k, d;
                        b = 0;
                        for (k = a.length; b < k; b++) {
                            d = a[b];
                            var e = new PxLoaderImage(C + f[d].path, c);
                            e.rv = d;
                            p.add(e)
                        }
                    }
                    var p = new PxLoader({
                            noProgressTimeout: 3E4
                        }),
                        C = b.fp + a.Bb + "/game/",
                        k, D, u, F = ["PASSWORD", "EDITION", "FONT", "MENU"].concat(["GAME"]);
                    n(l.yx, "FONT");
                    n(c.$y, "GAME");
                    n(c.qu, "GAME");
                    n(c.ru, "GAME");
                    p.addProgressListener(function(a) {
                        h.DA(a.resource.rv,
                            a.resource.img)
                    }, ["FONT", "GAME"]);
                    d(e.UE, b.fp + (e.TE || ""), "PASSWORD");
                    d(e.WE, b.Hh + (e.VE || ""), "PASSWORD");
                    d(e.RE, b.fp + "page/");
                    d(e.SE, b.Hh + "page/");
                    d(c.hA);
                    d(c.ut, b.tt);
                    d(c.st);
                    d(c.uo);
                    d(c.Ny);
                    d(c.Ry, b.Hh + (c.Qy || ""), "EDITION");
                    p.addProgressListener(function(a) {
                        var c = 50 * (a.completedCount / a.totalCount);
                        g && g.Iu(c, "image");
                        a.completedCount === a.totalCount && (m = !0, r())
                    }, F);
                    p.start(F)
                }

                function r() {
                    m && p && (g && (g.nA(), g.hide()), C && setTimeout(C, 0), r = ha())
                }
                var m = !1,
                    p = !1,
                    C = null;
                return {
                    init: function() {
                        function a() {
                            n();
                            d.BA(function() {
                                p = !0;
                                r()
                            });
                            d.start()
                        }
                        h.init();
                        g ? g.init(a) : a()
                    },
                    jb: function() {
                        g && (g.jb(), g.show())
                    },
                    dq: function(a) {
                        C = a;
                        r()
                    }
                }
            }(S, U, Wa, J, Pa, Ab, ib, Qa, xa),
            Cb = function(b, c) {
                function e(a) {
                    g && (a += "-" + g);
                    return a
                }

                function a(a) {
                    if (!h) return null;
                    var c = [];
                    a = (h.get(e(a)) || "").split(",");
                    var b = a.length,
                        d, f;
                    for (d = 0; d < b; d++) d < a.length ? (f = parseInt(a[d], 16), isNaN(f) && (f = null)) : f = null, c.push(f);
                    return c
                }

                function f(c, b) {
                    if (!h) return null;
                    var d = a(c);
                    return d.length > b ? d[b] : null
                }

                function d(c, b, d) {
                    if (h) {
                        var f = a(c);
                        if (f[b] !==
                            d && (f[b] = d, h))
                            if (c = e(c), f) {
                                b = [];
                                d = f.length;
                                var g, C;
                                for (g = 0; g < d; g++) C = f[g], null == C ? b.push("") : b.push(C.toString(16));
                                h.set(c, b.join(","))
                            } else h.remove(c)
                    }
                }
                var g = "";
                c.subscribe(c.w.ft, function(a) {
                    g = a
                });
                var h = null;
                c.subscribe(c.w.mx, function(a) {
                    h = a ? {
                        set: a.set,
                        get: a.get,
                        remove: a.remove
                    } : null;
                    c.ra(c.w.mn)
                });
                return {
                    Qk: function(a, c) {
                        return f("scores-" + a, c)
                    },
                    jq: function(a, c, b) {
                        d("scores-" + a, c, b)
                    },
                    Yf: function(a, c) {
                        return f("stars-" + a, c)
                    },
                    af: function(a, c, b) {
                        d("stars-" + a, c, b)
                    },
                    uE: function(a) {
                        return f("achievements",
                            a)
                    },
                    fF: function(a, c) {
                        d("achievements", a, c)
                    }
                }
            }(U, V),
            va = function(b, c, e, a, f, d, g, h, l, n) {
                function r(a, c, b, k) {
                    this.Tc = a;
                    this.pj = c;
                    this.zg = b || [];
                    this.Lb = k || []
                }

                function m(c, b) {
                    var k = n.Yf(c, b),
                        d = a.Ei(G + (1E3 * b + c ^ D), null),
                        d = null == d ? null : (d ^ D) - b - 1E3 * c;
                    return -1 === d || null === d ? k : null == k ? d : Math.max(k, d)
                }

                function p(c, b, k) {
                    a.set(G + (1E3 * b + c ^ D), (null == k ? -1 : k) + 1E3 * c + b ^ D);
                    n.af(c, b, k)
                }

                function C(c, b) {
                    var k = n.Qk(c, b) || 0,
                        d = a.Ei(z(c, b), null);
                    return Math.max(k, null == d ? 0 : (d ^ D) - c - 1E3 * b)
                }

                function x(c, b, k) {
                    a.set(z(c, b), k + 1E3 * b +
                        c ^ D);
                    n.jq(c, b, k)
                }

                function z(a, c) {
                    var b = s + (1E3 * a + c ^ D);
                    return b === k ? b + "_" : b
                }
                var s = String.fromCharCode(98, 112),
                    G = String.fromCharCode(98, 115),
                    k = s + String.fromCharCode(50, 51, 57, 48),
                    D = null;
                a.$i(function() {
                    D = a.Ei(k, null);
                    null == D && (D = e.lb(1E3, 1E4), a.set(k, D))
                });
                var u = new function() {
                    var a = [];
                    this.load = function() {
                        a = [];
                        var c, d;
                        c = 0;
                        for (len = f.jh.length; c < len; c++) {
                            d = a;
                            for (var e = c, g = c, l = null !== m(g, 0), h = f.jh[g].Re.length, n = f.FC[g], D = [], z = [], s = void 0, s = 0; s < h; s++) {
                                if (!l) {
                                    var G = g,
                                        q = s;
                                    p(G, q, 0 === q ? 0 : null);
                                    x(G, q, 0)
                                }
                                D.push(C(g,
                                    s));
                                z.push(m(g, s))
                            }
                            d[e] = new r(h, n, D, z);
                            if (b.hE === c + 1)
                                for (d = f.jh[c].Re.length, len = d - 1, d = 0; d < len; d++) u.af(c, d, 3, !0)
                        }
                        k && u.Cj()
                    };
                    c.subscribe(c.w.bo, this.load);
                    c.subscribe(c.w.co, this.load);
                    c.subscribe(c.w.mn, this.load);
                    var k = !1;
                    c.subscribe(c.w.Hq, function() {
                        k = !0
                    });
                    this.nz = function() {
                        return D
                    };
                    this.Tc = function(c) {
                        c = a[c];
                        return null != c ? c.Tc : null
                    };
                    this.pj = function(c) {
                        c = a[c];
                        return null != c ? c.pj : 0
                    };
                    this.oo = function(c) {
                        c = a[c];
                        if (null != c) {
                            for (var b = 0, k = 0; k < c.Tc; k++) var d = c.Lb[k],
                                b = b + (null == d ? 0 : d);
                            return b
                        }
                        return 0
                    };
                    this.Gg = function() {
                        for (var c = 0, b = 0; b < a.length; b++) c += u.oo(b);
                        return c
                    };
                    this.bv = function(c) {
                        c = a[c];
                        return null != c ? 3 * c.Tc : 0
                    };
                    this.zh = function(c) {
                        return 0 == c || b.Sh || null != a[c] && u.Gg() >= u.pj(c) ? !1 : !0
                    };
                    this.Cz = function(c, k) {
                        var d = a[c];
                        return b.Sh ? !0 : null != d ? null != d.Lb[k] : !1
                    };
                    this.jq = function(b, k, d, e) {
                        var f = a[b];
                        if (null != f) {
                            e ? f.zg[k] = d : (e = C(b, k), f.zg[k] = Math.max(d, e));
                            x(b, k, f.zg[k]);
                            k = f.zg.length;
                            for (e = d = 0; e < k; e++) d += f.zg[e];
                            c.ra(c.w.Jx, b, d)
                        }
                    };
                    this.Qk = function(c, b) {
                        var k = a[c];
                        return null != k ? k.zg[b] : null
                    };
                    this.af = function(b, k, d, e) {
                        var f = this.Gg(),
                            g = a[b];
                        if (null != g) {
                            var l = m(b, k);
                            g.Lb[k] = null == l || e ? d : Math.max(d, l);
                            p(b, k, g.Lb[k])
                        }
                        b = this.Gg();
                        b !== f && c.ra(c.w.Cx, b)
                    };
                    this.Yf = function(c, b) {
                        var k = a[c];
                        return null != k ? k.Lb[b] : null
                    };
                    this.jB = function() {
                        var c = a.length,
                            b, k, d, e;
                        for (b = 0; b < c; b++)
                            for (k = a[b], e = k.Tc, d = 0; d < e; d++) {
                                var f = b,
                                    g = d;
                                p(f, g, 0 === g ? 0 : null);
                                x(f, g, 0);
                                k.Lb[d] = m(b, d);
                                k.zg[d] = C(b, d)
                            }
                        this.Cj()
                    };
                    this.Cj = function() {
                        var a = g.X(l.Dx).replace("%d", u.Gg());
                        d.ia({
                            text: a,
                            Rc: "#boxScore img",
                            ua: !0
                        })
                    };
                    c.subscribe(c.w.Pb,
                        this.Cj)
                };
                return u
            }(ta, V, ba, Ba, U, fa, ga, sa, B, Cb),
            Ga = function(b, c, e, a, f, d, g, h, l, n, r) {
                var m;
                $(function() {
                    m = $("#boxUpgradePlate").hide()
                });
                g.subscribe(g.w.gi, function(a) {
                    a && m && m.fadeOut(200)
                });
                g.subscribe(g.w.Pb, function() {
                    e.ia({
                        text: h.X(r.Ij),
                        Hb: "boxUpgradePlate",
                        scale: 0.6 * a.ib
                    })
                });
                var p = f.tt || f.$c;
                return b.extend({
                    init: function(c, b, d, n, m) {
                        this.index = c;
                        this.ig = n;
                        this.ug = this.visible = !0;
                        this.wk = 0;
                        this.opacity = 1;
                        this.type = m;
                        b && (this.li = new Image, this.li.src = p + b);
                        var k = this.ew = new Image,
                            r = this.jy = a.e(350),
                            u = this.vt = a.e(20),
                            F = this;
                        this.fw = !1;
                        this.pv = function() {
                            e.ia({
                                text: h.vo(c, F.hp),
                                img: k,
                                width: (r - 2 * u) / a.ib,
                                Jc: l.$b,
                                ua: !0
                            });
                            F.fw = !0
                        };
                        g.subscribe(g.w.Pb, this.pv);
                        this.Cd = e.ia({
                            text: d,
                            ua: !0
                        });
                        this.Ju = new Image;
                        this.Ju.src = f.$c + "box_omnom.png";
                        this.vu = new Image;
                        this.vu.src = f.$c + "box_lock.png";
                        this.Cg = new Image;
                        this.Cg.src = f.$c + "star_result_small.png";
                        this.Tu = new Image;
                        this.Tu.src = f.$c + "perfect_mark.png";
                        this.hp = !0
                    },
                    Pi: La(!0),
                    jp: La(!0),
                    Ni: La(!0),
                    B: function(a, c) {
                        var b = a.globalAlpha;
                        this.opacity !== b && (a.globalAlpha =
                            this.opacity);
                        this.ov(a, c);
                        this.opacity !== b && (a.globalAlpha = b)
                    },
                    ov: function(c, b) {
                        var d = this.jp();
                        d && (c.fillStyle = "rgb(45,45,53)", c.fillRect(a.e(130), a.e(200), a.e(140), a.e(100)), null != b && c.drawImage(this.Ju, b + a.e(4), a.e(215)));
                        this.li && c.drawImage(this.li, a.e(25), a.e(0));
                        if (d) {
                            if (this.ig) {
                                var d = $(this.Cd).width() || this.Cd.width,
                                    e = $(this.Cd).height() || this.Cd.height,
                                    f = this.Cg.width || $(this.Cg).width(),
                                    k = a.e(-6),
                                    f = d + k + f,
                                    f = (a.e(125) - f) / 2,
                                    f = a.e(140) + f;
                                c.scale(1.015, 1);
                                c.drawImage(this.vu, a.e(23), a.e(155));
                                c.scale(1 / 1.015, 1);
                                this.ug && (c.drawImage(this.Cd, f, a.e(220), d, e), c.drawImage(this.Cg, f + d + k, a.e(225)))
                            }
                            n.oo(this.index) === n.bv(this.index) && c.drawImage(this.Tu, a.e(260), a.e(250))
                        }
                        this.fw || this.pv();
                        e = $(this.ew);
                        d = e.width();
                        e = e.height();
                        k = Math.floor(a.e(25) + this.vt + (this.jy - 2 * this.vt - d) / 2);
                        f = a.e(70);
                        c.drawImage(this.ew, k, f, d, e)
                    },
                    rt: function(b) {
                        if (b) {
                            this.wk = Date.now();
                            var d = a.e(1024),
                                e = a.e(576),
                                f = this,
                                g = function() {
                                    t = Date.now() - f.wk;
                                    var k, l;
                                    100 > t ? (k = c.Py(), l = 1 - k, k = 1 + k) : 300 > t ? (k = c.xi(t - 100, 0, 0.11, 200),
                                        l = 0.95 + k, k = 1.05 - k) : 600 > t && (k = c.Pt(t - 300, 0, 0.05, 300), l = 1.06 - k, k = 0.94 + k);
                                    l = (d - d * l) / 2;
                                    k = (e - e * k) / 2;
                                    var h = (d - 2 * l) / d,
                                        n = (e - 2 * k) / e;
                                    isNaN(h) || isNaN(n) || (b.save(), b.setTransform(1, 0, 0, 1, 0, 0), b.clearRect(a.e(312), a.e(100), a.e(400), a.e(460)), b.restore(), b.save(), b.scale(h, n), b.translate(l, k), b.translate(a.e(312), a.e(130)), f.B(b, a.e(140)), b.restore());
                                    600 < t ? f.wk = 0 : window.requestAnimationFrame(g)
                                };
                            g()
                        }
                    },
                    zt: function() {
                        this.wk = 0
                    },
                    aj: function() {
                        this.ug || m.toggleClass("purchaseBox", this.Ez || !1).fadeIn()
                    },
                    cj: function() {
                        m &&
                            m.fadeOut(200)
                    }
                })
            }(Y, ua, fa, J, S, ma, V, ga, Q, va, B, U),
            Ra = {},
            Db = function(b, c, e, a, f, d, g, h, l, n, r) {
                return b.extend({
                    init: function(c, b, d, h, n) {
                        this.p(c, b, d, h, n);
                        this.sg = -1;
                        this.tg = null;
                        var r = this;
                        $(document).ready(function() {
                            $("#showMeBtn").click(function() {
                                l.FA && l.FA();
                                r.hC()
                            });
                            var c = $("#installieBtn"),
                                b = getIE9DownloadUrl();
                            b ? (c.on("click", function() {
                                l.wA && l.wA();
                                window.location.href = b
                            }), f.subscribe(f.w.Pb, function() {
                                g.ia({
                                    text: e.X(a.pr),
                                    img: c.find("img")[0],
                                    ua: !0
                                })
                            })) : c.hide()
                        })
                    },
                    Pi: function() {
                        return 0 !==
                            this.sg
                    },
                    wz: function() {
                        var b = function() {
                                var a = -1,
                                    c = ("Microsoft Internet Explorer" == navigator.appName || "MSAppHost/1.0" == navigator.appName ? /MSIE ([0-9]?[0-9]{1,}[.0-9]{0,})/ : /Trident\/.*rv:([0-9]{1,}[.0-9]{0,})/).exec(navigator.userAgent);
                                null != c && 1 < c.length && (a = parseInt(c[1], 10));
                                return a
                            }(),
                            d = function() {
                                try {
                                    var a = navigator.userAgent,
                                        c = -1 != a.indexOf("Windows NT"),
                                        b = c ? parseInt(a[a.indexOf("Windows NT") + 11]) : -1;
                                    if (c && 6 <= b) return !0
                                } catch (d) {}
                                return !1
                            }();
                        if (9 <= b || c.Xy) {
                            b = h.Nw || "true" == r.get("msIsSiteModeActivated");
                            d = !0 === h.Nw;
                            if (!d) try {
                                window.external.msIsSiteMode() && (d = !0)
                            } catch (n) {}
                            b || d || c.Xy ? (this.opacity = this.sg = 1, this.tg = null, b || (r.set("msIsSiteModeActivated", "true"), l.GA && l.GA())) : (this.sg = 3, this.opacity = 0.35, this.tg = "pinPrompt", f.subscribe(f.w.Pb, function() {
                                g.ia({
                                    text: e.X(a.rs),
                                    Rc: "#showMeBtn img",
                                    ua: !0
                                })
                            }))
                        } else d ? (this.sg = 2, this.opacity = 0.35, this.tg = "iePrompt") : (this.sg = 0, this.opacity = 0.35, this.tg = null);
                        return 0 == this.sg || -1 == this.sg ? !1 : !0
                    },
                    aj: function() {
                        null != this.tg && ($("#pinningContent").stop(!0, !0).delay(100).fadeIn(800), $("#" + this.tg).show())
                    },
                    cj: function() {
                        null != this.tg && $("#pinningContent").stop(!0, !0).fadeOut(300)
                    },
                    hC: function() {
                        var a = $("#pinCursor"),
                            c = $("#pinOmNom"),
                            b = $("#pinChairShadow"),
                            d = $("#showMeBtn"),
                            e = $("#pinTaskBar");
                        d.fadeOut().delay(5500).fadeIn(1E3);
                        b.delay(500).fadeOut().delay(6E3).fadeIn(300);
                        a.delay(500).fadeIn().delay(2250).animate({
                            left: n.e(200)
                        }, 500, "easeInOutCirc").fadeOut().animate({
                            top: n.e(65),
                            left: n.e(45),
                            scale: "1.0"
                        }, 0);
                        c.delay(500).fadeIn().delay(1E3).animate({
                            top: n.e(305),
                            left: n.e(165)
                        }, 1E3, "easeInOutBack").delay(1500).animate({
                            scale: "0.65"
                        }, 200).delay(1500).fadeOut(1E3).animate({
                            top: n.e(115),
                            left: n.e(-49),
                            scale: "1.0"
                        }, 50).fadeIn(500);
                        e.delay(500).fadeIn().delay(5E3).fadeOut(1E3)
                    }
                })
            }(Ga, ta, ga, B, V, U, fa, S, Ra, J, Ba),
            Eb = function(b, c, e, a, f, d, g) {
                var h, l;
                $(function() {
                    h = $("#boxUpgradePrompt").hide();
                    l = $("#boxUpgradeButton").hide().click(function() {
                        c.ra(c.w.ln)
                    })
                });
                c.subscribe(c.w.Pb, function() {
                    a.ia({
                        text: e.X(f.lo),
                        Hb: "boxUpgradePrompt",
                        width: d.e(650),
                        Jc: g.T,
                        ua: !0
                    });
                    a.ia({
                        text: e.X(f.Ij),
                        Hb: "boxUpgradeButton",
                        scale: 0.6 * d.ib
                    })
                });
                var n = !1;
                c.subscribe(c.w.gi, function(a) {
                    n = a
                });
                return b.extend({
                    init: function(a, c, b, d, e) {
                        this.p(a, c, b, d, e);
                        this.hp = this.ug = !1;
                        this.Ez = !0;
                        this.visible = !n
                    },
                    Pi: La(!1),
                    jp: La(!1),
                    aj: function() {
                        h.fadeIn();
                        l.fadeIn()
                    },
                    cj: function() {
                        h.fadeOut();
                        l.fadeOut(200)
                    }
                })
            }(Ga, V, ga, fa, B, J, Q),
            Fb = function(b) {
                return b.extend({
                    init: function(c, b, a, f, d) {
                        this.p(c, b, a, f, d);
                        this.hp = !1
                    },
                    Pi: La(!1),
                    jp: La(!1),
                    Ni: La(!1)
                })
            }(Ga),
            jb = function(b, c, e, a, f, d, g, h, l, n, r, m, p, C, x) {
                function z(a) {
                    return k &&
                        Date.now() >= s[a] ? !1 : x.Ei(D + (G[a] ^ u), 0) !== (G[a] - 1E3 ^ u) && !m.Sh
                }
                var s = p.hy,
                    G = p.gy,
                    k = !1,
                    D = String.fromCharCode(98, 107),
                    u = n.nz(),
                    F = null;
                $(document).ready(function() {
                    F = $("#boxEnterCodeButton").hide()
                });
                var A = null,
                    E = null,
                    I = null,
                    q = null,
                    T = "January February March April May June July August September October November December".split(" ");
                b = c.extend({
                    init: function(a, c, b, k, d) {
                        this.p(a, c, b, k, d);
                        this.wu = new Image;
                        this.wu.src = this.li.src.replace(".png", "_locked.png");
                        this.Yk = z(a) && p.qE;
                        this.cl = !0 !== m.Sh && Date.now() <
                            s[a];
                        this.Pf = null
                    },
                    Ni: function() {
                        return !this.cl && !this.Yk
                    },
                    aj: function() {
                        !this.cl && this.Yk && F.fadeIn()
                    },
                    cj: function() {
                        F.hide()
                    },
                    ov: function(c) {
                        c.drawImage(this.ig || this.cl || this.Yk ? this.wu : this.li, a.e(25), a.e(0));
                        if (this.cl) {
                            A || (A = new Image, e.ia({
                                text: "Available starting from",
                                img: A,
                                Jc: l.$b,
                                width: a.e(250)
                            }));
                            A.complete && c.drawImage(A, a.e(100), a.e(120), 0.8 * A.width * a.ib, 0.8 * A.height * a.ib);
                            if (!this.Pf) {
                                this.Pf = new Image;
                                var b = new Date(s[this.index]);
                                e.ia({
                                    text: T[b.getMonth()] + " " + b.getDate(),
                                    img: this.Pf,
                                    width: a.e(200),
                                    Jc: l.$b
                                })
                            }
                            this.Pf.complete && c.drawImage(this.Pf, a.e(77), a.e(195), 1.2 * this.Pf.width * a.ib, 1.2 * this.Pf.height * a.ib)
                        } else if (this.Yk) q || (q = new Image, e.ia({
                            text: "Visit Burger King to get an\n unlock code!",
                            img: q,
                            Jc: l.$b,
                            width: a.e(280)
                        }), e.ia({
                            text: "Enter Code",
                            Hb: "boxEnterCodeButton",
                            ua: !0
                        })), q.complete && c.drawImage(q, a.e(50), a.e(90));
                        else if (this.ig) {
                            E || (E = new Image, e.ia({
                                text: "Collect",
                                img: E,
                                ua: !0
                            }));
                            E.complete && c.drawImage(E, a.e(143), a.e(108));
                            var b = 1.2 * ($(this.Cd).width() || this.Cd.width),
                                k = 1.2 * ($(this.Cd).height() || this.Cd.height),
                                d = this.Cg.width || $(this.Cg).width(),
                                f = a.e(-4),
                                f = b + f + d,
                                f = (a.e(125) - f) / 2,
                                f = a.e(140) + f;
                            c.drawImage(this.Cg, f, a.e(160));
                            c.drawImage(this.Cd, f + d, a.e(150), b, k);
                            I || (I = new Image, e.ia({
                                text: "to unlock",
                                img: I,
                                ua: !0
                            }));
                            I.complete && c.drawImage(I, a.e(130), a.e(204))
                        }
                    }
                });
                b.EC = function() {
                    var a = Date.now(),
                        c = s.length,
                        b, d, e;
                    k = !0;
                    for (b = 0; b < c; b++) d = s[b], a >= d && (d = D + (G[b] ^ u), e = G[b] - 1E3 ^ u, x.set(d, e))
                };
                b.ku = z;
                return b
            }(Y, Ga, fa, J, S, ma, V, ga, Q, va, B, ta, U, ba, Ba),
            ya = {
                vb: 0,
                ad: 1,
                Md: 2,
                Pg: 3,
                Rj: 4,
                Vr: 5,
                Zh: 6,
                se: 7,
                Yq: 8,
                Bf: 9,
                jf: 10,
                Cf: 11
            },
            Ha = function() {
                return function(b, c, e, a) {
                    this.id = b;
                    this.Fh = c;
                    this.ih = e;
                    this.jC = a
                }
            }(),
            Xa = function() {
                function b(c) {
                    this.Oo = c.element;
                    this.Gi = c.Gi;
                    var b = this;
                    this.Uv = function(a) {
                        a = a.originalEvent;
                        b.Wp(a);
                        return c.Jp ? b.Yl(a, c.Jp) : !1
                    };
                    this.Eu = function(a) {
                        a = a.originalEvent;
                        b.Wp(a);
                        return c.Gp ? b.Yl(a, c.Gp) : !1
                    };
                    this.Qt = function(a) {
                        a = a.originalEvent;
                        b.Wp(a);
                        return c.Dp ? b.Yl(a, c.Dp) : !1
                    };
                    this.Su = function(a) {
                        a = a.originalEvent;
                        return c.Hp ? b.Yl(a, c.Hp) : !1
                    }
                }
                b.prototype.Yl =
                    function(c, b) {
                        var a = 0,
                            f = 0;
                        c || (c = window.event);
                        if (c.changedTouches && 0 < c.changedTouches.length) a = c.changedTouches[0].pageX, f = c.changedTouches[0].pageY;
                        else if (c.targetTouches && 0 < c.targetTouches.length) a = c.targetTouches[0].pageX, f = c.targetTouches[0].pageY;
                        else if (c.pageX || c.pageY) a = c.pageX, f = c.pageY;
                        else if (c.clientX || c.clientY) a = c.clientX + document.body.scrollLeft + document.documentElement.scrollLeft, f = c.clientY + document.body.scrollTop + document.documentElement.scrollTop;
                        var d = $(this.Oo).offset(),
                            g = this.Gi ?
                            this.Gi() : 1,
                            a = Math.round((a - d.left) / g),
                            f = Math.round((f - d.top) / g);
                        return b(a, f)
                    };
                b.prototype.Wp = function(c) {
                    c.preventManipulation ? c.preventManipulation() : c.preventDefault()
                };
                b.prototype.hd = function() {
                    $(this.Oo).on(b.sq, this.Uv).on(b.Du, this.Eu).on(b.Po, this.Qt).on(b.Ru, this.Su)
                };
                b.prototype.pd = function() {
                    $(this.Oo).off(b.sq, this.Uv).off(b.Du, this.Eu).off(b.Po, this.Qt).off(b.Ru, this.Su)
                };
                b.$l = window.navigator.pointerEnabled;
                b.Zl = window.navigator.msPointerEnabled;
                b.tF = "undefined" !== typeof Modernizr &&
                    Modernizr.touch;
                b.sq = b.$l ? "pointerdown" : b.Zl ? "MSPointerDown" : "touchstart mousedown";
                b.Du = b.$l ? "pointermove" : b.Zl ? "MSPointerMove" : "touchmove mousemove";
                b.Po = b.$l ? "pointerup" : b.Zl ? "MSPointerUp" : "touchend mouseup";
                b.Ru = b.$l ? "pointerout" : b.Zl ? "MSPointerOut" : "mouseout";
                return b
            }(),
            Ya = function(b, c) {
                b.jb = function() {
                    this.HB();
                    this.Gu = c.dh;
                    this.Fu = c.Hx;
                    this.cy()
                };
                b.bu = La(1);
                return b
            }(function() {
                return new function() {
                    this.Eq = null;
                    this.zoom = 1;
                    this.transformOrigin = "top left";
                    this.HB = function() {
                        this.Eq = $("#gameContainer")
                    };
                    this.HC = function(b) {
                        b = b || {};
                        var c = "scale(" + this.zoom + ")",
                            e = ["ms", "o", "webkit", "moz"],
                            a = this.transformOrigin,
                            f, d, g;
                        1 === this.zoom && (c = a = "");
                        f = 0;
                        for (d = e.length; f < d; f++) g = "-" + e[f] + "-transform", b[g] = c, b[g + "-origin"] = a;
                        this.Eq.css(b)
                    };
                    this.dz = function() {
                        return this.dE || this.zoom || 1
                    };
                    this.bu = function() {
                        return this.zoom || 1
                    };
                    this.cy = function() {
                        var b = this;
                        $(window).resize(function() {
                            b.resize()
                        });
                        this.resize()
                    };
                    this.Fu = this.Gu = 0;
                    this.resize = function(b) {
                        $(window);
                        var c = window.innerWidth,
                            e = window.innerHeight,
                            a = this.Gu,
                            f = this.Fu;
                        b || (this.zoom = Math.min(c / a, e / f));
                        b = Math.round((c - a * this.zoom) / 2);
                        e = Math.round((e - f * this.zoom) / 2);
                        this.HC({
                            "margin-top": e,
                            "margin-left": b
                        })
                    }
                }
            }(), J),
            oa = function(b, c, e, a, f) {
                var d = {
                    vk: !1,
                    bf: !0,
                    qg: !0,
                    de: null,
                    N: function(a) {
                        this.bf && !f.bl(a) && f.play(a)
                    },
                    UA: function(a) {
                        this.bf && f.bl(a) && f.pause(a)
                    },
                    nB: function(a) {
                        this.bf && f.Dz(a) && f.play(a)
                    },
                    Yu: function(a) {
                        var c = this;
                        this.bf && !f.bl(a) && f.play(a, function() {
                            !c.vk && c.bf && c.Yu(a)
                        })
                    },
                    uq: function(a) {
                        f.stop(a)
                    },
                    gj: function(a) {
                        this.de && this.de !==
                            a && this.sC(a);
                        var c = this;
                        this.qg && !f.bl(a) && (this.de = a, f.cC(a, 70), f.play(a, function() {
                            !c.vk && c.qg && c.gj(a)
                        }))
                    },
                    SA: function() {
                        this.vk = !0;
                        this.fj();
                        this.UA(a.Nd)
                    },
                    fj: function() {
                        this.de && f.pause(this.de)
                    },
                    mB: function() {
                        this.vk = !1;
                        this.bq();
                        this.nB(a.Nd)
                    },
                    bq: function() {
                        this.de && this.gj(this.de)
                    },
                    sC: function() {
                        this.de && f.stop(this.de)
                    },
                    Jl: function(a) {
                        this.qg = a;
                        b.Jl(a);
                        this.qg ? this.bq() : this.fj()
                    },
                    Ll: function(a) {
                        this.bf = a;
                        b.Ll(a)
                    }
                };
                c.$i(function() {
                    d.bf = b.Xo();
                    d.qg = b.Wo()
                });
                return d
            }(ra, Ba, ea, q, hb),
            Za = function(b,
                c, e) {
                var a = b.extend({
                    init: function(b) {
                        this.Of = a.Z.di;
                        this.Id = [];
                        this.children = [];
                        this.Rp = this.Ic = this.sb = c.h;
                        this.parent = b;
                        this.Ti = c.h;
                        this.Bi = this.So = this.hi = this.frames = this.Ko = 0;
                        this.Kc = 1 / 60;
                        this.ql = [this.Kc, this.Kc, this.Kc, this.Kc, this.Kc]
                    },
                    hd: function() {
                        this.Of = a.Z.Fq;
                        e.ra(e.w.Zq, this)
                    },
                    pd: function() {
                        e.ra(e.w.$q, this)
                    },
                    Gt: function() {
                        this.Of = a.Z.di;
                        this.sb !== c.h && this.$o();
                        e.ra(e.w.bD, this);
                        this.parent.Ku(this.parent.Ic)
                    },
                    pause: function() {
                        this.Of = a.Z.ei;
                        e.ra(e.w.ar, this);
                        this.sb != c.h && (this.Rp =
                            this.sb, this.$o())
                    },
                    rw: function() {
                        this.Of = a.Z.Fq;
                        this.Ic !== c.h && (this.Ic = c.h);
                        e.ra(e.w.br, this);
                        this.Rp !== c.h && this.Pv(this.Rp)
                    },
                    update: function() {
                        if (this.sb !== c.h)
                            for (var a = this.po(), b = Math.min(3, Math.floor(this.Bi)), e = 0; e < b; e++) a.update(0.016), this.Bi -= 1
                    },
                    kB: function() {
                        this.Ti = c.h
                    },
                    yt: function(a) {
                        this.Ko = this.Ti !== c.h ? (a - this.Ti) / 1E3 : 0;
                        this.Ti = a;
                        this.Bi += this.Bt(this.Ko) / 0.016
                    },
                    Bt: function(a) {
                        return 0.016 > a ? 0.016 : 0.05 < a ? 0.05 : a
                    },
                    ly: function() {
                        this.frames++;
                        this.hi += this.Ko;
                        if (1 < this.hi) {
                            this.So =
                                this.frames / this.hi;
                            this.hi = this.frames = 0;
                            this.ql.shift();
                            this.ql.push(this.Bt(1 / this.So));
                            for (var a = this.Kc = 0, c = this.ql.length; a < c; a++) this.Kc += this.ql[a];
                            this.Kc /= c
                        }
                    },
                    Wx: function(a, c) {
                        this.Id[c] = a
                    },
                    yy: function(a) {
                        this.Id[a] = null
                    },
                    $o: function() {
                        var a = this.Id[this.sb];
                        a && (e.ra(e.w.cr, a), a.hide(), this.sb = c.h)
                    },
                    Pv: function(a) {
                        this.sb != c.h && this.$o();
                        this.sb = a;
                        a = this.Id[a];
                        e.ra(e.w.dr, a);
                        a.show()
                    },
                    po: function() {
                        return this.Id[this.sb]
                    },
                    Zf: function(a) {
                        return this.Id[a]
                    },
                    ve: function(a, c) {
                        this.children[c] =
                            a
                    },
                    xy: function(a) {
                        this.children[a] = null;
                        this.Ic === a && (this.Ic = c.h)
                    },
                    Ft: function() {
                        if (this.Ic !== c.h) {
                            var a = this.children[this.Ic];
                            a && a.pd();
                            this.Ic = c.h
                        }
                    },
                    Px: function(a) {
                        this.Ic !== c.h && this.Ft();
                        this.pause();
                        this.Ic = a;
                        this.children[a].hd()
                    },
                    Ku: function() {
                        this.rw()
                    },
                    $D: function() {
                        return this.children[this.Ic]
                    },
                    kb: function(a) {
                        return this.children[a]
                    },
                    kl: function(a, b) {
                        return this.sb === c.h ? !1 : this.Id[this.sb].ml(a, b)
                    },
                    Dh: function(a, b) {
                        return this.sb === c.h ? !1 : this.Id[this.sb].nl(a, b)
                    },
                    Bu: function(a, b) {
                        return this.sb ===
                            c.h ? !1 : this.Id[this.sb].Lp(a, b)
                    },
                    Cu: La(!1),
                    vi: function(a, b) {
                        return this.sb === c.h ? !1 : this.Id[this.sb].Lu(a, b)
                    }
                });
                a.Z = {
                    di: 0,
                    Fq: 1,
                    ei: 2
                };
                return a
            }(Y, K, V),
            Gb = function(b, c, e, a, f, d, g, h, l) {
                return b.extend({
                    init: function(c) {
                        this.p(c);
                        this.Wl = !1;
                        this.na = null;
                        this.nw = this.Bw = a.h;
                        this.wl = null;
                        this.transitionDelay = 0.3;
                        this.ph = this.Jo = !1;
                        g.subscribe(g.w.Zq, $.proxy(this.pA, this));
                        g.subscribe(g.w.$q, $.proxy(this.rA, this));
                        g.subscribe(g.w.Mw, $.proxy(this.qA, this));
                        g.subscribe(g.w.ar, $.proxy(this.sA, this));
                        g.subscribe(g.w.br,
                            $.proxy(this.tA, this));
                        g.subscribe(g.w.cr, $.proxy(this.uA, this));
                        g.subscribe(g.w.dr, $.proxy(this.vA, this))
                    },
                    KA: function(c) {
                        if (!this.Wl && null !== this.na && (this.na.yt(c), this.nw === a.h && this.na.update(), this.Jo && (this.Jo = !1, this.na.Gt()), this.na.sb !== a.h)) {
                            (c = this.na.po()) && c.B();
                            this.na.ly();
                            if (f.Wt) {
                                var b = this.na.So.toFixed(0);
                                0 < b && (c = h.context, c.font = "20px Arial", c.fillStyle = l.Vl.rk, c.fillText(b + " fps", 10, d.fb - 10))
                            }
                            f.oq && (c = h.context, c.font = "20px Arial", c.fillStyle = l.Vl.rk, c.fillText("7-24-2019", d.Bb -
                                c.measureText("7-24-2019").width - 10, d.fb - 10))
                        }
                    },
                    Qx: function() {
                        var a = d.tE || 1;
                        this.yd || (this.yd = new c({
                            element: h.element,
                            Jp: $.proxy(this.kl, this),
                            Gp: $.proxy(this.jA, this),
                            Dp: $.proxy(this.Dh, this),
                            Hp: $.proxy(this.kA, this),
                            Gi: function() {
                                return e.dz() * a
                            }
                        }));
                        this.yd.hd()
                    },
                    uy: function() {
                        this.yd && this.yd.pd()
                    },
                    hd: function() {
                        function a() {
                            c.KA(Date.now());
                            c.Wv || b(a)
                        }
                        this.p();
                        this.Qx();
                        var c = this,
                            b = window.requestAnimationFrame;
                        this.Wv = !1;
                        a()
                    },
                    pd: function() {
                        this.p();
                        this.Wv = !0;
                        this.uy()
                    },
                    Av: function(a) {
                        this.na =
                            a;
                        this.na.EE = 1 / 60
                    },
                    vE: Fa("na"),
                    pA: function(a) {
                        this.Av(a)
                    },
                    qA: function() {
                        this.na = null
                    },
                    sA: function() {
                        this.na = null
                    },
                    tA: function(a) {
                        this.Av(a)
                    },
                    rA: function() {
                        this.Jo = !0
                    },
                    vA: function() {
                        if (this.Bw !== a.h && null != this.wl) {
                            this.na.yt();
                            this.nw = this.na.Ti + this.transitionDelay;
                            var c = this.na.po();
                            c && c.B()
                        }
                    },
                    uA: function(c) {
                        this.wl = c;
                        this.Bw !== a.h && null != this.wl && this.wl.B()
                    },
                    JE: Fa("Wl"),
                    rF: function() {
                        this.Wl = !0
                    },
                    cF: function() {
                        this.na && this.na.kB();
                        this.Wl = !1
                    },
                    kl: function(a, c) {
                        return this.na && this.na != this ? (this.ph = !0, this.na.kl(a, c)) : !1
                    },
                    jA: function(a, c) {
                        return this.na && this.na != this ? (this.ph && this.na.Bu(a, c), this.na.Cu(a, c)) : !1
                    },
                    Dh: function(a, c) {
                        if (this.na && this.na != this) {
                            var b = this.na.Dh(a, c);
                            this.ph = !1;
                            return b
                        }
                        return !1
                    },
                    kA: function(a, c) {
                        if (this.na && this.na != this && this.ph) {
                            var b = this.na.Dh(a, c);
                            this.ph = !1;
                            return b
                        }
                        return !1
                    },
                    vi: function(a, c) {
                        return this.na && this.na != this ? (this.na.Dh(a, c), this.ph = !1, this.na.vi(a, c)) : !1
                    }
                })
            }(Za, Xa, Ya, K, ra, J, V, aa, Z),
            za = function(b, c, e, a, f, d, g, h) {
                return b.extend({
                    init: function() {
                        this.p()
                    },
                    tc: function(a, c, b, d) {
                        var e = this.ff.length;
                        this.nb(e, a, c, b, d);
                        return e
                    },
                    Rx: function(a, c, b, d) {
                        this.Hf(this.ff.length, a, c, b, d)
                    },
                    Hf: function(a, c, b, d, e) {
                        this.uk(a, c, b, d, e[0], h.h, e)
                    },
                    nb: function(a, c, b, d, e, f) {
                        this.uk(a, c, b, e - d + 1, d, e, f)
                    },
                    uk: function(c, b, e, h, p, C, x) {
                        C = new a;
                        var z = [f.create(this, d.ik, p, 0)];
                        C.D(g.Vi(z, 0));
                        for (var s = 1; s < h; s++) x ? p = x[s] : p++, z = [f.create(this, d.ik, p, 0)], C.D(g.Vi(z, b)), s == h - 1 && e === a.Z.Cb && C.D(g.Vi(z, b));
                        e && (C.fl = e);
                        this.Rb(C, c)
                    },
                    FB: function(a, c, b) {
                        this.yc(b).au(e.Kd).ja[c].Yc = a
                    },
                    Kl: function(a,
                        c) {
                        this.yv(d.bs, this, 0, 0, a, c)
                    },
                    yv: function(a, c, b, d, g, h) {
                        g = this.yc(h).au(e.Kd).ja[g];
                        a = f.create(c, a, b, d);
                        g.value.Gf.push(a)
                    },
                    he: function(a, c, b) {
                        c = this.yc(c);
                        a = [f.create(this, d.an, 0, a)];
                        b = g.Vi(a, b);
                        c.D(b)
                    },
                    Fz: function(a) {
                        this.wb.mu(e.Kd, a)
                    }
                })
            }(ca, Ua, Na, la, Ma, wa, qa, K),
            pa = function(b, c, e) {
                b = b.extend({
                    init: function(a, c, b) {
                        this.RA = a;
                        this.K = b || 0;
                        this.path = [];
                        if (0 < a)
                            for (this.C = Array(a), b = 0; b < a; b++) this.C[b] = c || 0;
                        this.a = new e(0, 0);
                        this.b = 0;
                        this.reverse = this.paused = !1;
                        this.ob = 0
                    },
                    PB: function(a) {
                        for (var c = 0, b =
                                this.RA; c < b; c++) this.C[c] = a
                    },
                    Fv: function(a, c) {
                        if ("R" === a[0]) {
                            var b = parseInt(a.substr(2), 10),
                                g = b / 2,
                                h = 2 * Math.PI / g,
                                l = 0;
                            "C" !== a[1] && (h = -h);
                            for (var n = 0; n < g; ++n) this.fh(new e(c.x + b * Math.cos(l), c.y + b * Math.sin(l))), l += h
                        } else
                            for (this.fh(c.copy()), "," === a[a.length - 1] && (a = a.substr(0, a.length - 1)), b = a.split(","), g = b.length, n = 0; n < g; n += 2) h = new e(c.x + parseFloat(b[n]), c.y + parseFloat(b[n + 1])), this.fh(h)
                    },
                    fh: function(a) {
                        this.path.push(a)
                    },
                    start: function() {
                        0 < this.path.length && (this.a.qa(this.path[0]), this.Xc = 1, this.xo())
                    },
                    pause: function() {
                        this.paused = !0
                    },
                    rw: function() {
                        this.paused = !1
                    },
                    mF: ja("K"),
                    KE: function(a) {
                        this.Xc = a;
                        this.a.qa(this.path[a]);
                        this.xo()
                    },
                    xo: function() {
                        this.offset = e.eb(this.path[this.Xc], this.a);
                        this.offset.normalize();
                        this.offset.multiply(this.C[this.Xc])
                    },
                    kF: function(a, c) {
                        this.C[c] = a
                    },
                    jF: ja("reverse"),
                    update: function(a) {
                        if (!this.paused) {
                            if (0 < this.path.length) {
                                var b = this.path[this.Xc],
                                    d = !1;
                                if (this.a.Lk(b)) d = !0;
                                else {
                                    var g = a;
                                    0 !== this.ob && (g += this.ob, this.ob = 0);
                                    this.a.add(e.multiply(this.offset, g));
                                    c.Fl(this.offset.x,
                                        b.x - this.a.x) && c.Fl(this.offset.y, b.y - this.a.y) || (this.ob = e.eb(this.a, b).Oc(), this.ob /= this.offset.Oc(), this.a.qa(b), d = !0)
                                }
                                d && (this.reverse ? (this.Xc--, 0 > this.Xc && (this.Xc = this.path.length - 1)) : (this.Xc++, this.Xc >= this.path.length && (this.Xc = 0)), this.xo())
                            }
                            0 !== this.K && (this.b += this.K * a)
                        }
                    }
                });
                b.Ve = function(a, c, b, e) {
                    c !== a && (c > a ? (a += b * e, a > c && (a = c)) : (a -= b * e, a < c && (a = c)));
                    return a
                };
                b.xd = function(a, c, b, e) {
                    var h = !1;
                    c !== a && (c > a ? (a += b * e, a > c && (a = c)) : (a -= b * e, a < c && (a = c)), c === a && (h = !0));
                    return {
                        value: a,
                        Bd: h
                    }
                };
                b.Yr =
                    100;
                return b
            }(Y, ba, O),
            Ca = function(b, c, e, a, f, d, g, h) {
                b = b.extend({
                    init: function() {
                        this.p();
                        this.iu = !1
                    },
                    Pe: function(c) {
                        this.p(c);
                        this.ba = new e(0, 0, this.width, this.height);
                        this.Xp = new a(this.ba.x, this.ba.y, this.ba.width, this.ba.height);
                        this.anchor = f.T;
                        this.iw = this.Dl = !1
                    },
                    gF: function() {
                        var c = this.L.j[0],
                            b = this.L.d[0];
                        this.ba = new e(Math.round(c.x), Math.round(c.y), b.width, b.height);
                        this.Xp = new a(this.ba.x, this.ba.y, this.ba.width, this.ba.height)
                    },
                    rg: function(a) {
                        this.rotation = a.b || 0;
                        var b = a.path;
                        if (b) {
                            var e =
                                c.Yr;
                            "R" === b[0] && (e = Math.round(parseInt(b.substr(2), 10) / 2 + 1));
                            a = new c(e, a.C, a.K);
                            a.b = this.rotation;
                            a.Fv(b, new d(this.x, this.y));
                            this.gq(a);
                            a.start()
                        }
                    },
                    gq: function(a) {
                        this.Sa = a;
                        this.Ka = 1E-4
                    },
                    update: function(a) {
                        this.p(a);
                        this.iw || (this.mi(), this.iw = !0);
                        this.Sa && (this.Sa.update(a), this.x = this.Sa.a.x, this.y = this.Sa.a.y, this.Dl ? this.sB(this.Sa.b) : this.rotation = this.Sa.b)
                    },
                    sB: function(a) {
                        this.Dl || (this.Dl = !0);
                        this.rotation = a;
                        var c = this.ba,
                            b = new d(c.x, c.y),
                            e = new d(c.x + c.O, c.y),
                            f = new d(e.x, c.y + c.V),
                            c = new d(c.x,
                                f.y);
                        a = g.bc(a);
                        var h = this.width / 2 + this.fe,
                            x = this.height / 2 + this.Kh;
                        b.pa(a, h, x);
                        e.pa(a, h, x);
                        f.pa(a, h, x);
                        b.pa(a, h, x);
                        a = this.Xp;
                        a.gw = b.x;
                        a.hw = b.y;
                        a.lw = e.x;
                        a.mw = e.y;
                        a.wt = f.x;
                        a.xt = f.y;
                        a.pt = c.x;
                        a.qt = c.y
                    },
                    qh: function() {
                        var a = h.context,
                            c = this.ea,
                            b = this.fa,
                            d = this.ba,
                            e = this.Xp;
                        a.strokeStyle = "red";
                        a.lineWidth = 2;
                        this.Dl ? (a.beginPath(), a.moveTo(c + e.gw, b + e.hw), a.lineTo(c + e.lw, b + e.mw), a.lineTo(c + e.wt, b + e.xt), a.lineTo(c + e.pt, b + e.qt), a.stroke(), a.closePath()) : a.strokeRect(c + d.x, b + d.y, d.O, d.V)
                    },
                    Sp: function(a, c) {
                        var b =
                            this.ba;
                        return e.Kb(a, c, this.ea + b.x, this.fa + b.y, b.O, b.V)
                    },
                    cB: function(a, c, b, d) {
                        var f = this.ea + this.ba.x,
                            g = this.fa + this.ba.y;
                        return e.lj(a, c, b, d, f, g, f + this.ba.O, g + this.ba.V)
                    }
                });
                b.yh = function(a, c) {
                    var b = a.ea + a.ba.x,
                        d = a.fa + a.ba.y,
                        f = c.ea + c.ba.x,
                        g = c.fa + c.ba.y;
                    return e.lj(b, d, b + a.ba.O, d + a.ba.V, f, g, f + c.ba.O, g + c.ba.V)
                };
                return b
            }(za, pa, R, Ua, Q, O, ia, aa, Z),
            Hb = function(b, c, e) {
                return c.extend({
                    init: function(a, c, b) {
                        this.p(a, c, b)
                    },
                    TB: function(a, c, d) {
                        var g, h, l, n;
                        h = b.dk;
                        if ("R" === a[0]) {
                            g = "C" === a[1];
                            a = parseInt(a.substr(2),
                                10);
                            n = Math.round(3 * a / 2);
                            var r = 2 * Math.PI / n,
                                m = 0;
                            a *= h;
                            g || (r = -r);
                            for (g = 0; g < n; g++) h = c + a * Math.cos(m), l = d + a * Math.sin(m), this.fh(new e(h, l)), m += r
                        } else
                            for (this.fh(new e(c, d)), "," === a[a.length - 1] && (a = a.substr(0, a.length - 1)), r = a.split(","), m = r.length, g = 0; g < m; g += 2) a = r[g], n = r[g + 1], this.fh(new e(c + a * h, d + n * h))
                    }
                })
            }(J, pa, O),
            Da = function(b, c, e, a) {
                return b.extend({
                    init: function() {
                        this.p()
                    },
                    rg: function(b) {
                        this.rotation = b.b || 0;
                        var d = b.path,
                            g = e.dk;
                        if (d) {
                            var h = a.Yr;
                            "R" === d[0] && (h = Math.round(3 * parseInt(d.substr(2), 10) / 2 +
                                1));
                            b = new c(h, b.C * g, b.K);
                            b.b = this.rotation;
                            b.TB(d, this.x, this.y);
                            this.gq(b);
                            b.start()
                        }
                    }
                })
            }(Ca, Hb, J, pa),
            Ib = function(b, c, e, a, f, d, g, h) {
                return b.extend({
                    init: function(b, f, r, m) {
                        this.p();
                        this.Sv = this.b = 0;
                        this.Ba = c.Ta();
                        this.Ha = c.Ta();
                        this.va = c.Ta();
                        this.wa = c.Ta();
                        var p = d.h;
                        1 === r ? p = g.vm : 2 === r && (p = g.wm);
                        this.sa(p);
                        this.rotation = m;
                        this.x = b;
                        this.y = f;
                        this.Zb();
                        b = this.tc(0.04, h.ga.$a, 0, 4);
                        this.yc(b).D(e.gA(this, a.ik))
                    },
                    Zb: function() {
                        this.Ba.x = this.x - this.width / 2;
                        this.Ha.x = this.x + this.width / 2;
                        this.Ba.y = this.Ha.y =
                            this.y - 5;
                        this.va.x = this.Ba.x;
                        this.wa.x = this.Ha.x;
                        this.va.y = this.wa.y = this.y + 5;
                        this.b = f.bc(this.rotation);
                        this.Ba.pa(this.b, this.x, this.y);
                        this.Ha.pa(this.b, this.x, this.y);
                        this.va.pa(this.b, this.x, this.y);
                        this.wa.pa(this.b, this.x, this.y)
                    },
                    update: function(a) {
                        this.p(a);
                        this.Sa && this.Zb()
                    }
                })
            }(Da, O, qa, wa, ia, K, q, la),
            Jb = function(b) {
                return b.extend({
                    init: function() {
                        this.p();
                        this.Dq = this.Up = !1
                    },
                    B: function() {
                        this.Dq ? (this.Cc(), this.Bc()) : this.p()
                    }
                })
            }(Ca),
            kb = function(b, c, e, a, f) {
                return b.extend({
                    init: function(c,
                        b) {
                        this.p(c);
                        this.gp = b;
                        this.Wa = new a(b);
                        this.width = f.Bb;
                        this.height = f.fb
                    },
                    Li: function(a) {
                        var b = this.gp,
                            b = b.d[e.lb(0, b.d.length - 1)],
                            f = new c(0, 0, 0, 0);
                        this.Wa.Ya(this.cc.length, b, f, 1);
                        this.p(a);
                        a.width = b.O * a.size;
                        a.height = b.V * a.size
                    },
                    zq: function(a, b) {
                        this.Wa.gf[b] = new c(a.a.x - a.width / 2, a.a.y - a.height / 2, a.width, a.height);
                        this.Wa.hh[b] = a.color.G;
                        this.Et[b] = a.color
                    },
                    aq: function(a) {
                        this.Wa.hB(a);
                        this.p(a)
                    },
                    B: function() {
                        this.Cc();
                        this.Wa.B();
                        this.Bc()
                    }
                })
            }(function(b, c, e, a, f, d, g) {
                function h(a, c, b) {
                    this.x =
                        a;
                    this.y = c;
                    this.size = b
                }

                function l() {
                    this.df = new b(0, 0);
                    this.a = new b(0, 0);
                    this.dir = new b(0, 0);
                    this.uj = this.jj = 0;
                    this.color = new c(0, 0, 0, 0);
                    this.Ee = new c(0, 0, 0, 0);
                    this.height = this.width = this.b = this.Ht = this.zc = this.size = 0
                }
                return e.extend({
                    init: function(a) {
                        this.p();
                        this.width = d.Bb;
                        this.height = d.fb;
                        this.wq = a;
                        this.cc = [];
                        this.active = !1;
                        this.yi = this.duration = 0;
                        this.sd = new b(0, 0);
                        this.ul = new b(0, 0);
                        this.su = this.zc = this.Rv = this.size = this.hv = this.jj = this.aw = this.uj = this.Tv = this.speed = this.qo = this.b = 0;
                        this.Ec =
                            new c(0, 0, 0, 0);
                        this.cf = new c(0, 0, 0, 0);
                        this.xc = new c(0, 0, 0, 0);
                        this.He = new c(0, 0, 0, 0);
                        this.Sf = this.Hk = 0;
                        this.L = null;
                        this.gf = [];
                        this.Et = [];
                        this.ee = 0;
                        this.cb = null
                    },
                    lt: function() {
                        if (this.cc.length == this.wq) return !1;
                        var a = new l;
                        this.Li(a);
                        this.cc.push(a);
                        return !0
                    },
                    Li: function(d) {
                        d.a.x = this.x + this.ul.x * a.yb();
                        d.a.y = this.y + this.ul.y * a.yb();
                        d.df.qa(d.a);
                        var e = g.bc(this.b + this.qo * a.yb()),
                            e = new b(Math.cos(e), Math.sin(e));
                        e.multiply(this.speed + this.Tv * a.yb());
                        d.dir = e;
                        d.jj = this.jj + this.hv * a.yb();
                        d.uj = this.uj +
                            this.aw * a.yb();
                        d.zc = this.zc + this.su * a.yb();
                        var e = new c(this.Ec.H + this.cf.H * a.yb(), this.Ec.J + this.cf.J * a.yb(), this.Ec.I + this.cf.I * a.yb(), this.Ec.G + this.cf.G * a.yb()),
                            f = new c(this.xc.H + this.He.H * a.yb(), this.xc.J + this.He.J * a.yb(), this.xc.I + this.He.I * a.yb(), this.xc.G + this.He.G * a.yb());
                        d.color = e;
                        d.Ee.H = (f.H - e.H) / d.zc;
                        d.Ee.J = (f.J - e.J) / d.zc;
                        d.Ee.I = (f.I - e.I) / d.zc;
                        d.Ee.G = (f.G - e.G) / d.zc;
                        d.size = this.size + this.Rv * a.yb()
                    },
                    update: function(a) {
                        this.p(a);
                        if (this.cb && 0 === this.cc.length && !this.active) this.cb(this);
                        else {
                            if (this.active &&
                                this.Hk) {
                                var c = 1 / this.Hk;
                                for (this.Sf += a; this.cc.length < this.wq && this.Sf > c;) this.lt(), this.Sf -= c;
                                this.yi += a; - 1 !== this.duration && this.duration < this.yi && this.tC()
                            }
                            for (this.ee = 0; this.ee < this.cc.length;) c = this.cc[this.ee], 0 < c.zc ? (this.xw(c, a), c.color.H += c.Ee.H * a, c.color.J += c.Ee.J * a, c.color.I += c.Ee.I * a, c.color.G += c.Ee.G * a, c.zc -= a, this.zq(c, this.ee, a), this.ee++) : this.aq(this.ee)
                        }
                    },
                    xw: function(a, c) {
                        var d, e;
                        a.a.x || a.a.y ? (d = a.a.copy(), d.normalize()) : d = new b(0, 0);
                        e = d.copy();
                        d.multiply(a.jj);
                        var f = e.x;
                        e.x = -e.y;
                        e.y = f;
                        e.multiply(a.uj);
                        d = b.add(d, e);
                        d.add(this.sd);
                        d.multiply(c);
                        a.dir.add(d);
                        d.qa(a.dir);
                        d.multiply(c);
                        a.a.add(d)
                    },
                    zq: function(a) {
                        this.gf[this.ee] = new h(a.a.x, a.a.y, a.size);
                        this.Et[this.ee] = a.color
                    },
                    aq: function(a) {
                        this.cc.splice(a, 1)
                    },
                    tq: function(a) {
                        this.cc = [];
                        for (var c = 0; c < a; c++) this.lt();
                        this.active = !0
                    },
                    tC: function() {
                        this.active = !1;
                        this.yi = this.duration;
                        this.Sf = 0
                    },
                    aF: function() {
                        this.Sf = this.yi = 0
                    },
                    B: function() {
                        this.Cc();
                        if (0 !== this.color.G)
                            for (var a = f.context, c = this.L.Vb, b = 0, d = this.ee; b < d; b++) {
                                var e =
                                    this.cc[b];
                                a.drawImage(c, Math.round(e.x), Math.round(e.y))
                            }
                        this.Bc()
                    },
                    GE: function() {
                        return this.cc.length === this.wq
                    }
                })
            }(O, Z, da, ba, aa, J, ia), R, ba, Oa, J),
            Kb = function(b, c, e, a) {
                return b.extend({
                    init: function(a, c) {
                        this.p(a, c);
                        this.duration = 2;
                        this.sd.x = 0;
                        this.sd.y = 500;
                        this.b = -90;
                        this.qo = 50;
                        this.speed = 150;
                        this.Tv = 70;
                        this.jj = 0;
                        this.hv = 1;
                        this.uj = 0;
                        this.aw = 1;
                        this.ul.x = 0;
                        this.ul.y = 0;
                        this.zc = 2;
                        this.su = 0;
                        this.size = 1;
                        this.Rv = 0;
                        this.Hk = 100;
                        this.Ec.H = 1;
                        this.Ec.J = 1;
                        this.Ec.I = 1;
                        this.Ec.G = 1;
                        this.cf.H = 0;
                        this.cf.J = 0;
                        this.cf.I =
                            0;
                        this.cf.G = 0;
                        this.xc.H = 1;
                        this.xc.J = 1;
                        this.xc.I = 1;
                        this.xc.G = 1;
                        this.He.H = 0;
                        this.He.J = 0;
                        this.He.I = 0;
                        this.K = this.He.G = 0;
                        this.qB = 600
                    },
                    Li: function(c) {
                        this.p(c);
                        var b = this.gp.d[e.lb(3, 7)],
                            g = new a(0, 0, 0, 0);
                        this.Wa.Ya(this.cc.length, b, g);
                        c.width = b.O * this.size;
                        c.height = b.V * this.size
                    }
                })
            }(function(b, c, e, a) {
                return b.extend({
                    init: function(a, c) {
                        this.p(a, c);
                        this.Wa.Jh = [];
                        this.Wa.El = []
                    },
                    Li: function(b) {
                        this.p(b);
                        b.b = 0;
                        b.Ht = c.bc(this.K + this.qB * e.yb());
                        b = this.cc.length;
                        this.Wa.Jh[b] = 0;
                        this.Wa.El[b] = new a(0, 0)
                    },
                    dF: function(a,
                        c, b, e, l) {
                        a.x -= e;
                        a.y -= l;
                        var n = a.x * b + a.y * c;
                        a.x = a.x * c - a.y * b + e;
                        a.y = n + l
                    },
                    zq: function(a, c, b) {
                        this.p(a, c, b);
                        a.b += a.Ht * b;
                        this.Wa.Jh[c] = a.b;
                        this.Wa.El[c].qa(a.a)
                    },
                    aq: function(a) {
                        this.Wa.Jh.splice(a, 1);
                        this.Wa.El.splice(a, 1);
                        this.p(a)
                    }
                })
            }(kb, ia, ba, O), J, ba, R),
            Lb = function(b, c, e) {
                return b.extend({
                    init: function(a, b) {
                        this.p();
                        this.sa(c.um);
                        this.Ya(a);
                        this.Oy = b;
                        this.Xe = !1
                    },
                    lq: function() {
                        e.ra(e.w.jr, this.Oy)
                    }
                })
            }(Ca, q, V),
            Mb = function() {
                return function(b, c, e, a, f) {
                    this.start = b;
                    this.end = c;
                    this.color = f
                }
            }(),
            Nb = function(b,
                c, e) {
                return b.extend({
                    init: function() {
                        this.Zp = 1;
                        this.Ea = []
                    },
                    kt: function(a, c) {
                        this.Ea.splice(c, 0, a)
                    },
                    jt: function(a) {
                        this.Ea.push(a)
                    },
                    log: function() {
                        e.debug("Constraint System Log:");
                        for (var a = 0, c = this.Ea.length; a < c; a++) {
                            var b = this.Ea[a];
                            e.debug("-- Point: " + b.av());
                            for (var g = 0, h = b.ac.length; g < h; g++) {
                                var l = b.ac[g];
                                e.debug("---- Constraint: " + l.Mc.av() + " len: " + l.Dd)
                            }
                        }
                    },
                    gB: function(a) {
                        this.Ea.splice(a, 1)
                    },
                    update: function(a) {
                        for (var c = this.Ea, b = c.length, e = this.Zp, h = 0; h < b; h++) c[h].update(a);
                        for (h = 0; h <
                            e; h++)
                            for (a = 0; a < b; a++) c[a].Gl()
                    }
                })
            }(Y, O, ea),
            $a = {
                Oj: 0,
                ek: 1,
                LD: 2
            },
            ab = function(b, c) {
                var e = 9.8 * c.ix,
                    a = {
                        kr: e,
                        od: new b(0, e),
                        toggle: function() {
                            a.od.y = -a.od.y
                        },
                        pp: function() {
                            return 0 === a.od.y && 0 === a.od.x
                        },
                        lu: function() {
                            return a.od.y === a.kr && 0 === a.od.x
                        },
                        reset: function() {
                            a.od.x = 0;
                            a.od.y = e
                        }
                    };
                return a
            }(O, K),
            Ob = function(b, c, e, a) {
                return b.extend({
                    init: function() {
                        this.Kt = !1;
                        this.Wc(1);
                        this.sv()
                    },
                    Wc: function(a) {
                        this.RC = a;
                        this.Mi = 1 / a;
                        this.sd = new e(0, c.kr * a)
                    },
                    sv: function() {
                        var a = e.Ta;
                        this.mc = a();
                        this.G = a();
                        this.a =
                            a();
                        this.jc = a();
                        this.ie = a()
                    },
                    sF: function(a, c) {
                        var b = (a / c >> 0) + 1;
                        0 != b && (a /= b);
                        for (var e = 0; e < b; e++) this.update(a)
                    },
                    update: function(b) {
                        this.ie = e.Ta();
                        this.Kt || (a.pp() ? this.ie.add(this.sd) : this.ie.add(e.multiply(a.od, this.RC)));
                        b /= c.sk;
                        this.ie.multiply(this.Mi);
                        this.G = e.multiply(this.ie, b);
                        this.mc.add(this.G);
                        this.jc = e.multiply(this.mc, b);
                        this.a.add(this.jc)
                    },
                    ji: function(a, b) {
                        if (!a.pp()) {
                            var g = e.multiply(a, b / c.sk);
                            this.a.add(g)
                        }
                    }
                })
            }(Y, K, O, ab),
            lb = function(b, c, e, a, f) {
                function d(a, c, b) {
                    this.Mc = a;
                    this.Dd =
                        c;
                    this.type = b
                }
                return c.extend({
                    init: function() {
                        this.ma = new e(a.Yg, a.Yg);
                        this.Vc = new e(a.h, a.h);
                        this.ac = [];
                        this.ie = e.Ta();
                        this.p()
                    },
                    sv: function() {
                        this.p();
                        this.ma.x = a.Yg;
                        this.ma.y = a.Yg;
                        this.mv()
                    },
                    mv: function() {
                        this.ac = []
                    },
                    If: function(a, c, b) {
                        this.ac.push(new d(a, c, b))
                    },
                    $E: function(a) {
                        for (var c = this.ac, b = c.length, d = 0; d < b; d++)
                            if (c[d].Mc === a) {
                                c.splice(d, 1);
                                break
                            }
                    },
                    dB: function(a) {
                        this.ac.splice(a, 1)
                    },
                    eE: function(a, c) {
                        for (var b = this.ac, d = b.length, e = 0; e < d; e++) {
                            var f = b[e];
                            if (f.Mc === a) {
                                f.Mc = c;
                                break
                            }
                        }
                    },
                    sz: function(a) {
                        for (var c =
                                this.ac, b = c.length, d = 0; d < b; d++)
                            if (c[d].Mc === a) return !0;
                        return !1
                    },
                    yk: function(a, c) {
                        for (var b = this.ac, d = b.length, e = 0; e < d; e++) {
                            var f = b[e];
                            if (f.Mc === a) {
                                f.Dd = c;
                                break
                            }
                        }
                    },
                    At: function(a, c, b) {
                        for (var d = this.ac, e = d.length, f = 0; f < e; f++) {
                            var p = d[f];
                            if (p.Mc === a) {
                                p.Mc = c;
                                p.Dd = b;
                                break
                            }
                        }
                    },
                    Dd: function(c) {
                        for (var b = this.ac, d = b.length, e = 0; e < d; e++) {
                            var f = b[e];
                            if (f.Mc === c) return f.Dd
                        }
                        return a.h
                    },
                    update: function(c) {
                        var b = this.ie,
                            d = f.od;
                        this.Kt ? (b.x = 0, b.y = 0) : 0 !== d.y || 0 !== d.x ? (b.x = d.x, b.y = d.y) : (b.x = this.sd.x * this.Mi, b.y = this.sd.y *
                            this.Mi);
                        b = c / a.sk * c / a.sk;
                        this.G.x = this.ie.x * b;
                        this.G.y = this.ie.y * b;
                        this.ma.x === a.Yg && (this.ma.x = this.a.x, this.ma.y = this.a.y);
                        this.jc.x = this.a.x - this.ma.x + this.G.x;
                        this.jc.y = this.a.y - this.ma.y + this.G.y;
                        0 < c && (c = 1 / c, this.mc.x = this.jc.x * c, this.mc.y = this.jc.y * c);
                        this.ma.x = this.a.x;
                        this.ma.y = this.a.y;
                        this.a.x += this.jc.x;
                        this.a.y += this.jc.y
                    },
                    Gl: function() {
                        var a = this.Vc,
                            c = this.a,
                            b = this.Mi,
                            d, e, f, p;
                        if (-1 !== a.x) c.x = a.x, c.y = a.y;
                        else
                            for (var a = this.ac, C = a.length, x = 0; x < C; x++) {
                                var z = a[x],
                                    s = z.Mc,
                                    G = s.a;
                                d = G.x - c.x;
                                e = G.y - c.y;
                                0 === d && 0 === e && (e = d = 1);
                                var k = Math.sqrt(d * d + e * e),
                                    D = z.Dd,
                                    z = z.type;
                                if (1 === z) {
                                    if (k <= D) continue
                                } else if (2 === z && k >= D) continue;
                                z = -1 === s.Vc.x;
                                s = s.Mi;
                                k = (k - D) / ((1 < k ? k : 1) * (b + s));
                                z && (f = d, p = e);
                                D = b * k;
                                d *= D;
                                e *= D;
                                c.x += d;
                                c.y += e;
                                z && (d = s * k, G.x -= f * d, G.y -= p * d)
                            }
                    },
                    ZE: function(a) {
                        this.update(a)
                    },
                    av: function() {
                        return this.a.x.toFixed(2) + ", " + this.a.y.toFixed(2)
                    }
                })
            }($a, Ob, O, K, ab),
            mb = function(b, c, e, a, f, d, g, h, l) {
                var n = new h(0, 0, 0, 1),
                    r = new h(0, 0, 0, 1),
                    m = new h(0, 0, 0, 1),
                    p = new h(0, 0, 0, 1),
                    C = new h(0, 0, 0, 1);
                b = b.extend({
                    init: function(b,
                        g, h, l, k, m, u) {
                        this.p();
                        this.$p = 0;
                        this.Zp = 30;
                        this.lineWidth = e.er;
                        this.width = e.fr;
                        this.Fb = a.h;
                        this.De = 0;
                        this.highlighted = !1;
                        this.Oa = e.Oa;
                        this.ab = null != b ? b : new c;
                        null != l ? this.tb = l : (this.tb = new c, this.tb.Wc(1));
                        this.ab.Wc(0.02);
                        this.ab.a.x = g;
                        this.ab.a.y = h;
                        this.tb.a.x = k;
                        this.tb.a.y = m;
                        this.jt(this.ab);
                        this.jt(this.tb);
                        this.tb.If(this.ab, this.Oa, f.Oj);
                        b = d.eb(this.tb.a, this.ab.a);
                        g = Math.round(u / this.Oa + 2);
                        b.Lo(g);
                        this.wv(u, b);
                        this.th = !1;
                        this.Sc = a.h;
                        this.Fy = this.fu = this.kh = !1;
                        this.Bk = [];
                        this.Hj = e.Hj
                    },
                    Oc: function() {
                        var a =
                            0,
                            c = this.Ea,
                            b = c.length;
                        if (0 < b)
                            for (var d = c[0].a, k = 1; k < b; k++) var e = c[k],
                                a = a + d.Ja(e.a),
                                d = e.a;
                        return a
                    },
                    wv: function(a, b) {
                        null == b && (b = d.Ta());
                        for (var e = this.Ea, g = e[e.length - 2], k = this.tb, h = k.Dd(g), l = null; 0 < a;) a >= this.Oa ? (g = e[e.length - 2], l = new c, l.Wc(0.02), l.a = d.add(g.a, b), this.kt(l, this.Ea.length - 1), k.At(g, l, h), l.If(g, this.Oa, f.Oj), a -= this.Oa) : (l = a + h, l > this.Oa ? (a = this.Oa, h = l - this.Oa) : (g = e[e.length - 2], k.yk(g, l), a = 0))
                    },
                    oB: function(a) {
                        for (var c = this.Ea, b = c.length, d = this.tb, k = d.Dd(c[b - 2]), e; 0 < a;)
                            if (a >= this.Oa) {
                                var g =
                                    b - 2,
                                    h = c[b - 3];
                                e = c[g];
                                d.At(e, h, k);
                                this.gB(g);
                                b--;
                                a -= this.Oa
                            } else g = k - a, 1 > g ? (a = this.Oa, k = this.Oa + g + 1) : (e = c[b - 2], d.yk(e, g), a = 0);
                        c = (b - 1) * (this.Oa + 3);
                        d = d.ac;
                        b = d.length;
                        for (k = 0; k < b; k++) e = d[k], e.type === f.ek && (e.Dd = c);
                        return a
                    },
                    pF: function() {
                        for (var c = this.Ea, b = c.length, d = 0; d < b; d++) {
                            var e = c[d];
                            this.ab.Vc.x != a.h && (e != this.tb && e.Wc(0.5), 0 < d && e.If(this.ab, d * (this.Oa + 3), f.ek))
                        }
                    },
                    update: function(a) {
                        0 < this.De && (this.De = l.Ve(this.De, 0, 1, a), 1.95 > this.De && this.th && this.nv(this.Fb));
                        var c = this.Ea,
                            b = c.length,
                            d = this.Zp,
                            k = this.tb,
                            e, f;
                        for (e = 0; e < b; e++) f = c[e], f !== k && f.update(a);
                        for (e = 0; e < d; e++)
                            for (a = 0; a < b; a++) c[a].Gl()
                    },
                    nv: function(a) {
                        this.th = !1;
                        var b = this.Ea,
                            d = b[a],
                            e = b[a + 1];
                        if (e)
                            for (var k = e.ac, g = k.length, h = 0; h < g; h++) {
                                if (k[h].Mc === d) {
                                    e.dB(h);
                                    k = new c;
                                    k.Wc(1E-5);
                                    k.a.qa(e.a);
                                    k.ma.qa(e.ma);
                                    this.kt(k, a + 1);
                                    k.If(d, this.Oa, f.Oj);
                                    break
                                }
                            } else d.mv();
                        a = 0;
                        for (d = b.length; a < d; a++) e = b[a], e != this.tb && e.Wc(1E-5)
                    },
                    fq: function(a) {
                        this.Fb = a;
                        this.De = 2;
                        this.th = !0;
                        this.highlighted = !1
                    },
                    B: function() {
                        var c = this.Ea,
                            b = c.length,
                            d = g.context,
                            e, k,
                            f;
                        d.lineJoin = "round";
                        d.lineWidth = this.lineWidth;
                        if (this.Fb === a.h) {
                            k = Array(b);
                            for (e = 0; e < b; e++) k[e] = c[e].a;
                            this.Mo(k)
                        } else {
                            var h = [],
                                l = [],
                                m = !1;
                            for (e = 0; e < b; e++) {
                                k = c[e];
                                var p = !0;
                                0 < e && (f = c[e - 1], k.sz(f) || (p = !1));
                                k.Vc.x !== a.h || p || (m = !0);
                                m ? l.push(k.a) : h[e] = k.a
                            }
                            0 < h.length && this.Mo(h);
                            0 < l.length && !this.fu && this.Mo(l)
                        }
                        d.lineWidth = 1
                    },
                    Mo: function(c) {
                        var b = c.length,
                            e = this.Hj,
                            f = this.Bk;
                        if (!(2 > b)) {
                            var k = this.Fb === a.h || this.th ? 1 : this.De / 1.95;
                            if (!(0 >= k)) {
                                var l = c[0],
                                    u = c[1],
                                    F = l.x - u.x,
                                    u = l.y - u.y,
                                    F = Math.sqrt(F * F + u * u);
                                this.$p =
                                    F <= this.Oa + 0.3 ? 0 : F <= this.Oa + 1 ? 1 : F < this.Oa + 4 ? 2 : 3;
                                if (!(3 > b)) {
                                    n.H = 0;
                                    n.J = 0;
                                    n.I = 0;
                                    n.G = k;
                                    r.H = 0.475;
                                    r.J = 0.305;
                                    r.I = 0.185;
                                    r.G = k;
                                    m.H = 0.19;
                                    m.J = 0.122;
                                    m.I = 0.074;
                                    m.G = k;
                                    p.H = 152 / 225;
                                    p.J = 0.44;
                                    p.I = 62 / 225;
                                    p.G = k;
                                    C.H = 0.304;
                                    C.J = 0.198;
                                    C.I = 0.124;
                                    C.G = k;
                                    this.highlighted && (r.H *= 3, r.J *= 3, r.I *= 3, p.H *= 3, p.J *= 3, p.I *= 3, m.H *= 3, m.J *= 3, m.I *= 3, C.H *= 3, C.J *= 3, C.I *= 3);
                                    F > this.Oa + 7 && !this.Fy && (F = 2 * (F / this.Oa), m.H *= F, C.H *= F);
                                    var F = !1,
                                        b = (b - 1) * e,
                                        A = b - 1,
                                        e = (r.H - m.H) / A,
                                        u = (r.J - m.J) / A,
                                        E = (r.I - m.I) / A,
                                        I = (p.H - C.H) / A,
                                        q = (p.J - C.J) / A,
                                        A = (p.I - C.I) / A,
                                        T = this.Hj -
                                        1,
                                        H = T - 1,
                                        L = g.context,
                                        w = L.globalAlpha;
                                    w !== k && (L.globalAlpha = k);
                                    var v = f[0];
                                    v ? (v.x = l.x, v.y = l.y) : f[0] = l.copy();
                                    for (var B, l = 1; l <= b; l++)
                                        if (v = l / b, (B = f[l]) || (B = f[l] = new d(0, 0)), d.zv(c, v, B), v = (l - 1) % T, v === H || l === b) {
                                            L.beginPath();
                                            B = this.th ? h.Vl.rk : F ? m.qj() : C.qj();
                                            L.strokeStyle = B;
                                            B = l - v - 1;
                                            var X = f[B++];
                                            for (L.moveTo(X.x, X.y); B <= l; B++) X = f[B], L.lineTo(X.x, X.y);
                                            L.stroke();
                                            F = !F;
                                            v += 1;
                                            m.H += e * v;
                                            m.J += u * v;
                                            m.I += E * v;
                                            C.H += I * v;
                                            C.J += q * v;
                                            C.I += A * v
                                        }
                                    w !== k && (L.globalAlpha = w)
                                }
                            }
                        }
                    }
                });
                b.Jw = 30;
                return b
            }(Nb, lb, J, K, $a, O, aa, Z, pa, ea),
            Ia = function(b) {
                return {
                    uu: null,
                    Uc: 0,
                    lg: 0,
                    qF: !1,
                    Vz: function(c, e) {
                        this.Uc = c - 1;
                        this.lg = e - 1;
                        this.uu = b.jh[this.Uc].Re[this.lg]
                    }
                }
            }(U),
            nb = function(b, c, e) {
                return b.extend({
                    init: function() {
                        this.p()
                    },
                    Pe: function(a) {
                        this.p(a);
                        this.Fd = [];
                        this.j = [];
                        this.align = e.T
                    },
                    aC: function(a, c, b) {
                        this.Fd[0] = a;
                        this.Fd[1] = c;
                        this.Fd[2] = b;
                        a = this.L.d[a].V;
                        c = this.L.d[c].V;
                        b = this.L.d[b].V;
                        this.height = a >= c && a >= b ? a : c >= a && c >= b ? c : b;
                        this.j[0] = Math.floor((this.height - a) / 2);
                        this.j[1] = Math.floor((this.height - c) / 2);
                        this.j[2] = Math.floor((this.height - b) / 2)
                    },
                    B: function() {
                        this.Cc();
                        var a = this.L.d[this.Fd[0]],
                            b = this.L.d[this.Fd[1]],
                            e = this.L.d[this.Fd[2]],
                            g = this.width - (Math.floor(a.O) + Math.floor(e.O)),
                            h = c.context,
                            l = Math.round(this.ea),
                            n = Math.round(this.fa),
                            r = Math.ceil(a.O),
                            m = Math.ceil(a.V),
                            p = Math.ceil(e.O),
                            C = Math.ceil(e.V);
                        0 <= g ? (h.drawImage(this.L.Vb, a.x, a.y, r, m, l, n + this.j[0], r, m), this.Ly(this.Fd[1], l + r, n + this.j[1], g, b.V), h.drawImage(this.L.Vb, e.x, e.y, p, C, l + r + g, n + this.j[2], p, C)) : (a = a.copy(), b = e.copy(), a.O = Math.min(a.O, this.width / 2), b.O = Math.min(b.O, this.width - a.O), b.x += e.O - b.O,
                            h.drawImage(this.L.Vb, a.x, a.y, a.O, a.V, l, n + this.j[0], a.O, a.V), h.drawImage(this.L.Vb, b.x, b.y, b.O, b.V, l + a.O, n + this.j[2], b.O, b.V));
                        this.Bc()
                    },
                    iz: function() {
                        var a = c.element;
                        c.sj(document.createElement("canvas"));
                        var b = c.element,
                            e = Math.ceil(this.width),
                            g = Math.ceil(this.height);
                        b.width = e;
                        b.height = g;
                        this.B();
                        var b = b.toDataURL("image/png"),
                            h = new Image;
                        h.src = b;
                        $(h).width(e).height(g);
                        a && c.sj(a);
                        return h
                    }
                })
            }(ca, aa, Q),
            Pb = function(b, c, e, a, f) {
                return b.extend({
                    init: function(b) {
                        this.p();
                        var g = new c;
                        g.sa(a.qf);
                        g.aC(0,
                            2, 1);
                        g.width = b + e.om;
                        b = g.iz();
                        this.Pe(new f(b))
                    }
                })
            }(ca, nb, J, q, Va),
            Qb = function(b, c, e, a, f, d, g, h, l, n, r, m, p, C, x, z, s, q, k) {
                return b.extend({
                    init: function() {
                        this.p();
                        this.ta = null;
                        this.g = this.Gz = this.Xk = this.oz = this.l = !1;
                        this.Vh = h.h;
                        this.dl = d.Ta();
                        this.i = 0;
                        this.m = !1;
                        this.k = 0;
                        this.Me = this.$f = this.Ib = null;
                        this.il = this.jl = this.pg = 0;
                        this.Mh = this.Pc = !1;
                        this.c = null;
                        this.Bg = 0;
                        this.pu = this.Bq = this.Ml = !1;
                        this.kg = 0;
                        this.Hi = this.el = !1;
                        this.f = this.kj = 0
                    },
                    kz: function(a, b, k) {
                        a = d.eb(a, k);
                        b = d.eb(b, k).Eh() - a.Eh();
                        return c.Qh(b)
                    },
                    rz: function(a, c) {
                        this.dl.x = a;
                        this.dl.y = c
                    },
                    qz: function(c) {
                        a.N(f.Sn);
                        var b = new d(this.x, this.y),
                            b = this.kz(this.dl, c, b);
                        180 < b ? b -= 360 : -180 > b && (b += 360);
                        this.oc.rotation += b;
                        this.Uh.rotation += b;
                        this.Th.rotation += b;
                        b = 0 < b ? Math.min(Math.max(1, b), l.Tj) : Math.max(Math.min(-1, b), -l.Tj);
                        this.ta && (0 < b ? this.ta.Oc() < l.pm && this.ta.wv(b) : 0 !== b && 3 < this.ta.Ea.length && this.ta.oB(-b), this.Bq = !0);
                        this.dl.qa(c)
                    },
                    update: function(a) {
                        this.p(a);
                        if (this.pu && this.ta) {
                            var c = this.ta.ab;
                            c.a.x = this.x;
                            c.a.y = this.y;
                            c.Vc.qa(c.a);
                            this.el ?
                                (c = g.xd(this.kg, 200, 30, a), this.kg = c.value, c.Bd && (this.el = !1)) : (c = g.xd(this.kg, 130, 30, a), this.kg = c.value, c.Bd && (this.el = !0));
                            this.Sa.PB(this.kg)
                        }
                        this.Hi && (this.kj -= 1.5 * a, 0 >= this.kj && (this.f = h.h, this.Hi = !1));
                        if (this.Db) {
                            var c = d.eb(this.Sa.path[this.Sa.Xc], this.Sa.a),
                                b = 0;
                            15 < Math.abs(c.x) && (b = 0 < c.x ? 10 : -10);
                            this.Db.rotation = g.Ve(this.Db.rotation, b, 60, a)
                        }
                        this.g && this.Bq && this.ta && (a = 0.7 * this.ta.Oc(), this.oc.Y = 0 === a ? this.oc.da = 0 : this.oc.da = Math.max(0, Math.min(1.2, 1 - a / l.qm)))
                    },
                    OC: function(b) {
                        this.Pc && this.Ml &&
                            (this.Ml = !1, this.Mh = !0, a.N(f.Nn), this.c.S(0));
                        if (this.Pc && this.Mh) {
                            0 !== this.c.nh && (this.Bg += b * l.Xn);
                            var k = 0;
                            b = !1;
                            if (this.ta)
                                for (var e = this.ta.Bk, g = l.Oa, m = 0, p = e.length; m < p; m++) {
                                    var n = e[m],
                                        r = e[m + 1],
                                        x = Math.max(2 * g / 3, n.Ja(r));
                                    if (this.Bg >= k && (this.Bg < k + x || m > p - 3)) {
                                        k = this.Bg - k;
                                        r = d.eb(r, n);
                                        r.multiply(k / x);
                                        this.c.x = n.x + r.x;
                                        this.c.y = n.y + r.y;
                                        m > p - 3 && (b = !0);
                                        0 !== this.c.nh && (this.c.rotation = c.Qh(r.Eh()) + 270);
                                        break
                                    } else k += x
                                }
                            b && (this.Bg = h.h)
                        }
                    },
                    Gy: function() {
                        if (!this.Xk && !this.l) {
                            if (this.nu && this.Gz && this.ta) {
                                var a =
                                    this.ta.ab.a;
                                this.x = a.x;
                                this.y = a.y
                            }
                            this.Cc();
                            0 < this.i ? this.Ib.B() : this.back.B();
                            if (this.f !== h.h || this.Hi) a = new x(0.2, 0.5, 0.9, this.kj), this.Mt(this.x, this.y, this.f !== h.h ? this.f : this.dv, a)
                        }
                    },
                    Mt: function(a, c, b, k) {
                        if (!(0 > b)) {
                            var e = C.context,
                                d = 2 * Math.PI,
                                f = Math.max(16, Math.round(b / (2 * l.Nb)));
                            0 !== f % 2 && f++;
                            e.lineWidth = 2;
                            e.strokeStyle = k.qj();
                            k = d / f;
                            for (var g = 0; g < f; g++)
                                if (0 === g % 2) {
                                    var h = g / f * d;
                                    e.beginPath();
                                    e.arc(a, c, b, h, h + k, !1);
                                    e.stroke();
                                    e.closePath()
                                }
                        }
                    },
                    qh: function() {
                        this.g && this.Mt(this.x, this.y, l.dd, x.red)
                    },
                    B: function() {
                        if (!this.Xk) {
                            var a = this.ta;
                            this.g && (this.Th.visible = this.Vh !== h.h, this.Uh.visible = this.Vh === h.h, this.Ej.B());
                            this.l && (this.BE.B(), this.oz || this.AE.B());
                            a && a.B();
                            0 >= this.i ? this.qd.B() : this.pg != h.h ? this.$f.B() : this.Me.B();
                            this.g && this.oc.B();
                            this.Bc()
                        }
                    },
                    Ky: function() {
                        this.c.B()
                    },
                    mE: function() {
                        this.CE.B()
                    },
                    Hv: function(a) {
                        this.ta = a;
                        this.dv = this.f;
                        this.f = h.h;
                        this.Pc && (this.Ml = !0)
                    },
                    iF: function() {
                        this.el = this.pu = !0;
                        this.kg = 130;
                        var a = new g(100, this.kg, 0);
                        a.Fv("RC30", new d(this.x, this.y));
                        this.gq(a);
                        a.start()
                    },
                    UB: function(a) {
                        this.dv = this.f;
                        this.f = a;
                        a === h.h || a === h.Kj ? (a = s.lb(f.ym, f.zm), this.back = p.create(a, 0), this.back.ya(), this.back.anchor = this.back.oa = m.T, this.qd = p.create(a, 1), this.qd.anchor = this.qd.oa = m.T, this.U(this.back), this.U(this.qd), this.back.visible = !1, this.qd.visible = !1) : (this.back = p.create(f.Zj, 0), this.back.ya(), this.back.anchor = this.back.oa = m.T, this.qd = p.create(f.Zj, 1), this.qd.anchor = this.qd.oa = m.T, this.U(this.back), this.U(this.qd), this.back.visible = !1, this.qd.visible = !1, this.kj =
                            l.tr, this.Hi = !1);
                        this.g && (this.Ej = p.create(f.Rg, 0), this.Ej.anchor = this.Ej.oa = m.T, this.U(this.Ej), this.Ej.visible = !1, this.oc = p.create(f.Rg, 1), this.oc.Xe = !1, this.Th = p.create(f.Rg, 2), this.Th.anchor = this.Th.oa = m.T, this.oc.U(this.Th), this.Uh = p.create(f.Rg, 3), this.Uh.anchor = this.Uh.oa = this.oc.anchor = this.oc.oa = m.T, this.oc.U(this.Uh), this.U(this.oc), this.Bq = this.oc.visible = !1)
                    },
                    OB: function(a, c, b) {
                        this.i = a;
                        this.m = c;
                        this.k = b;
                        0 < this.i && (this.Ib = new k(a), this.Ib.fe = -Math.round(this.Ib.width / 2) + l.Sj, this.Ib.x = -l.Sj, this.$f = p.create(f.qf, 3), this.$f.visible = !1, this.$f.anchor = this.$f.oa = m.T, this.U(this.$f), this.Me = p.create(f.qf, 4), this.Me.visible = !1, this.Me.anchor = this.Me.oa = m.T, this.U(this.Me), this.Me.U(this.Ib), this.m ? (this.Ib.rotation = 90, this.Ib.y = -this.k, this.jl = this.y - this.k, this.il = this.y + (this.i - this.k), this.Me.rotation = 90, this.$f.rotation = 90) : (this.jl = this.x - this.k, this.il = this.x + (this.i - this.k), this.Ib.x += -this.k), this.Ib.anchor = m.eh | m.rb, this.Ib.x += this.x, this.Ib.y += this.y, this.Ib.visible = !1);
                        this.pg =
                            h.h
                    },
                    BB: function() {
                        this.Db = p.create(f.Wj, 1);
                        this.Db.ya();
                        this.Db.oa = m.T;
                        var a = new r;
                        a.sa(f.Wj);
                        a.oa = a.anchor = m.Qb | m.rb;
                        a.ya();
                        a.tc(0.03, z.ga.cs, 2, 4);
                        a.S(0);
                        a.Fz(s.lb(0, 2));
                        this.Db.U(a);
                        a = this.Db.L.j[0];
                        this.Db.x = -a.x;
                        this.Db.y = -a.y;
                        this.Db.fe = a.x - this.Db.width / 2;
                        this.Db.Kh = a.y - this.Db.width / 2;
                        this.Db.Y = this.Db.da = 1 / 1.3;
                        this.U(this.Db)
                    },
                    ZB: function(a) {
                        this.Pc = a;
                        this.Mh = this.Ml = !1;
                        this.c = new r;
                        this.c.sa(f.ci);
                        this.c.ya();
                        this.c.anchor = m.T;
                        this.c.x = this.x;
                        this.c.y = this.y;
                        this.c.visible = !1;
                        this.c.nb(0,
                            0.05, z.ga.$a, 0, 6);
                        this.c.FB(0.4, 5, 0);
                        this.c.nb(1, 0.1, z.ga.Cb, 7, 10);
                        this.c.he(1, 0, 0.05);
                        this.U(this.c)
                    },
                    It: function() {
                        this.ta = null
                    }
                })
            }(Da, ia, mb, oa, q, O, pa, K, J, Ia, za, Q, ca, aa, Z, la, ba, nb, Pb),
            Rb = function(b, c, e) {
                return b.extend({
                    init: function() {
                        this.p();
                        this.b = 0;
                        this.Ba = c.Ta();
                        this.Ha = c.Ta();
                        this.touch = this.Aj = 0
                    },
                    Zb: function() {
                        var a = this.ba.O / 2;
                        this.Ba.x = this.x - a;
                        this.Ha.x = this.x + a;
                        this.Ba.y = this.Ha.y = this.y;
                        this.b = e.bc(this.rotation);
                        this.Ba.pa(this.b, this.x, this.y);
                        this.Ha.pa(this.b, this.x, this.y)
                    }
                })
            }(Ca,
                O, ia),
            Sb = function(b, c, e, a, f) {
                return b.extend({
                    init: function(a, b, e) {
                        this.p(a, b);
                        this.b = e;
                        this.qo = 10;
                        this.speed = c.kn;
                        this.zc = 0.6;
                        this.size = c.jn;
                        this.Hk = 100;
                        this.Ec.H = 1;
                        this.Ec.J = 1;
                        this.Ec.I = 1;
                        this.Ec.G = 0.6;
                        this.xc.H = 1;
                        this.xc.J = 1;
                        this.xc.I = 1;
                        this.xc.G = 0
                    },
                    Li: function(c) {
                        this.p(c);
                        var b = this.gp.d[f.lb(6, 8)],
                            e = new a(0, 0, 0, 0);
                        this.Wa.Ya(this.cc.length, b, e, 1);
                        b = this.size;
                        c.width = b;
                        c.height = b
                    },
                    xw: function(a, c) {
                        a.dir.multiply(0.9);
                        var b = e.multiply(a.dir, c);
                        b.add(this.sd);
                        a.a.add(b)
                    }
                })
            }(kb, J, O, R, ba),
            Tb = function(b,
                c, e, a, f, d, g, h, l) {
                var n = b.extend({
                    init: function() {
                        this.p();
                        this.b = this.group = 0;
                        this.Ba = new g(0, 0);
                        this.Ha = new g(0, 0);
                        this.va = new g(0, 0);
                        this.wa = new g(0, 0);
                        this.Uk = 0
                    },
                    mh: function() {
                        this.xb = new c;
                        this.xb.sa(e.Sg);
                        this.xb.anchor = a.Mg | a.$b;
                        this.xb.oa = a.Qb | a.$b;
                        this.xb.y = d.Un;
                        this.xb.x = 0;
                        this.xb.Hf(0, 0.05, f.ga.$a, 4, [n.$g.bk, n.$g.bk + 1, n.$g.bk + 2, n.$g.bk + 2]);
                        this.xb.ya();
                        this.xb.visible = !1;
                        this.U(this.xb)
                    },
                    Zb: function() {
                        this.Ba.x = this.x - d.qk / 2;
                        this.Ha.x = this.x + d.qk / 2;
                        this.Ba.y = this.Ha.y = this.y;
                        this.va.x = this.Ba.x;
                        this.wa.x = this.Ha.x;
                        this.va.y = this.wa.y = this.y + d.Vn;
                        this.b = l.bc(this.rotation);
                        this.Ba.pa(this.b, this.x, this.y);
                        this.Ha.pa(this.b, this.x, this.y);
                        this.va.pa(this.b, this.x, this.y);
                        this.wa.pa(this.b, this.x, this.y)
                    },
                    B: function() {
                        var a = this.xb.wb;
                        a && a.state === f.Z.fi && (this.xb.visible = !1);
                        this.p()
                    },
                    qh: ha(),
                    update: function(a) {
                        this.p(a);
                        this.Sa && this.Zb()
                    }
                });
                n.$g = {
                    Rw: 0,
                    Sw: 1,
                    bk: 2,
                    HD: 3,
                    GD: 4
                };
                n.Z = {
                    hs: 0,
                    Ps: 1,
                    IDLE: 2
                };
                n.Pw = 0.8;
                return n
            }(Da, za, q, Q, la, J, O, pa, ia, aa),
            ob = function(b, c, e, a, f) {
                var d = b.extend({
                    init: function(c) {
                        this.p();
                        this.wo = c;
                        this.state = d.Z.Pd;
                        this.jw = this.yq = this.kw = this.xq = 0;
                        this.Jb = null;
                        this.uh = new e(a.h, a.h, a.h, a.h)
                    },
                    Wk: function(a, c) {
                        a.oa = c.oa = f.Qb | f.rb;
                        this.ve(a, d.Z.Pd);
                        this.ve(c, d.Z.lf);
                        this.rj(d.Z.Pd)
                    },
                    FE: function(a, b) {
                        var e = new c;
                        e.Pe(a);
                        var d = new c;
                        d.Pe(b);
                        this.Wk(e, d)
                    },
                    rE: ja("uh"),
                    tj: function(a, c, b, e) {
                        this.xq = a;
                        this.kw = c;
                        this.yq = b;
                        this.jw = e
                    },
                    rj: function(a) {
                        this.state = a;
                        var c = this.kb(d.Z.lf);
                        this.kb(d.Z.Pd).setEnabled(a === d.Z.Pd);
                        c.setEnabled(a === d.Z.lf)
                    },
                    hg: function(c, b, d) {
                        d = d ? 0 : 15;
                        return this.uh.O !==
                            a.h ? e.Kb(c, b, this.ea + this.uh.x - d, this.fa + this.uh.y - d, this.uh.O + 2 * d, this.uh.V + 2 * d) : e.Kb(c, b, this.ea - this.xq - d, this.fa - this.yq - d, this.width + (this.xq + this.kw) + 2 * d, this.height + (this.yq + this.jw) + 2 * d)
                    },
                    ml: function(a, c) {
                        this.p(a, c);
                        return this.state === d.Z.Pd && this.hg(a, c, !0) ? (this.rj(d.Z.lf), !0) : !1
                    },
                    nl: function(a, c) {
                        this.p(a, c);
                        return this.state === d.Z.lf && (this.rj(d.Z.Pd), this.hg(a, c, !1)) ? (this.Jb && this.Jb(this.wo), !0) : !1
                    },
                    Lp: function(a, c) {
                        this.p(a, c);
                        if (this.state === d.Z.lf) {
                            if (this.hg(a, c, !1)) return !0;
                            this.rj(d.Z.Pd)
                        }
                        return !1
                    },
                    ve: function(a, c) {
                        this.p(a, c);
                        a.oa = f.Qb | f.rb;
                        c === d.Z.lf && (this.width = a.width, this.height = a.height, this.rj(d.Z.Pd))
                    }
                });
                d.Z = {
                    Pd: 0,
                    lf: 1
                };
                return d
            }(da, ca, R, K, Q),
            Ub = function(b, c, e, a, f, d, g, h, l, n, r, m, p, C) {
                return b.extend({
                    init: function(c, b, g, h, k) {
                        this.p();
                        var m;
                        if (k !== d.h) m = e.ak + g - 1;
                        else switch (g) {
                            case 1:
                                m = e.Em;
                                break;
                            case 2:
                                m = e.Fm;
                                break;
                            case 3:
                                m = e.Gm;
                                break;
                            case 4:
                                m = e.Hm;
                                break;
                            case 5:
                                m = e.Yj
                        }
                        this.sa(m);
                        if (0 < k) {
                            this.ya();
                            m = 0 + 2 * (k - 1);
                            var p = 1 + 2 * (k - 1),
                                C = l.create(e.bi, m),
                                p = l.create(e.bi,
                                    p);
                            C.ya();
                            p.ya();
                            this.dc = new n(0);
                            this.dc.Wk(C, p);
                            this.dc.Jb = $.proxy(this.Jb, this);
                            this.dc.anchor = this.dc.oa = r.T;
                            this.U(this.dc);
                            p = C.L;
                            C = p.j[m];
                            m = p.d[m];
                            m = new a(m.O, m.V);
                            p = new a(p.zd.x, p.zd.y);
                            p.eb(m);
                            p.eb(C);
                            this.dc.tj(-C.x + m.x / 2, -p.x + m.x / 2, -C.y + m.y / 2, -p.y + m.y / 2)
                        }
                        this.Sl = this.ej = !1;
                        this.MA = this.rotation = h;
                        this.Ba = a.Ta();
                        this.Ha = a.Ta();
                        this.va = a.Ta();
                        this.wa = a.Ta();
                        this.zi = !1;
                        this.Cp = this.Kp = this.ip = 0;
                        this.Gk = !1;
                        this.Nc = 0;
                        this.x = c;
                        this.y = b;
                        this.bC(k);
                        this.Zb();
                        5 === g && (this.nb(0, 0.05, f.ga.Cb, 0, 0),
                            this.nb(1, 0.05, f.ga.Cb, 1, 4), this.ya());
                        this.Xl = d.h
                    },
                    Zb: function() {
                        var a = this.zi ? this.width - 400 * C.Nb : this.L.d[this.xg].O,
                            a = a / 2;
                        this.Ba.x = this.x - a;
                        this.Ha.x = this.x + a;
                        this.Ba.y = this.Ha.y = this.y - 5;
                        this.va.x = this.Ba.x;
                        this.wa.x = this.Ha.x;
                        this.va.y = this.wa.y = this.y + 5;
                        this.b = g.bc(this.rotation);
                        this.Ba.pa(this.b, this.x, this.y);
                        this.Ha.pa(this.b, this.x, this.y);
                        this.va.pa(this.b, this.x, this.y);
                        this.wa.pa(this.b, this.x, this.y)
                    },
                    CC: function() {
                        this.Gk = !0;
                        this.S(1);
                        this.Nc = this.Kp;
                        c.Yu(e.Nd)
                    },
                    qw: function() {
                        this.Gk = !1;
                        this.S(0);
                        this.Nc = this.Cp;
                        c.uq(e.Nd)
                    },
                    update: function(a) {
                        this.p(a);
                        (this.Sa || this.Kv) && this.Zb();
                        this.zi && (this.Gk ? (this.Nc = h.Ve(this.Nc, 0, 1, a), 0 === this.Nc && this.qw()) : (this.Nc = h.Ve(this.Nc, 0, 1, a), 0 === this.Nc && this.CC()))
                    },
                    bC: ja("qb"),
                    zE: Fa("qb"),
                    rB: function() {
                        this.Sl = !this.Sl;
                        this.iB(2);
                        var a = this.MA + (this.Sl ? 90 : 0),
                            c = new f;
                        c.D(m.Se(this.rotation, m.F.LINEAR, 0));
                        c.D(m.Se(a, m.F.Ob, 0.3 * (Math.abs(a - this.rotation) / 90)));
                        c.cb = $.proxy(this.vq, this);
                        this.Rb(c, 2);
                        this.S(2);
                        this.Kv = !0;
                        this.dc.Y = -this.dc.Y
                    },
                    vq: function() {
                        this.Zb();
                        this.Kv = !1
                    },
                    Jb: function(a) {
                        0 === a && (this.Mu && this.Mu(this.qb), this.Sl ? c.N(e.ok) : c.N(e.pk))
                    },
                    qh: function() {
                        var a = p.context;
                        a.beginPath();
                        a.strokeStyle = "red";
                        a.moveTo(this.Ba.x, this.Ba.y);
                        a.lineTo(this.Ha.x, this.Ha.y);
                        a.lineTo(this.wa.x, this.wa.y);
                        a.lineTo(this.va.x, this.va.y);
                        a.lineTo(this.Ba.x, this.Ba.y);
                        a.closePath();
                        a.stroke()
                    }
                })
            }(Da, oa, q, O, la, K, ia, pa, ca, ob, Q, qa, aa, J),
            Vb = function(b, c, e, a, f, d, g, h, l, n, r) {
                return b.extend({
                    init: function() {
                        this.p();
                        this.timeout = this.time = 0;
                        this.Fc =
                            null;
                        this.Ka = 1E-4
                    },
                    mh: function() {
                        var b;
                        0 < this.timeout && (this.Fc = new c, this.Fc.sa(e.ed), this.Fc.anchor = this.Fc.oa = a.T, this.Fc.nb(0, this.timeout / 37, f.ga.$a, 19, 55), this.Fc.S(0), this.time = this.timeout, this.Fc.visible = !1, this.U(this.Fc), b = new f, b.D(d.za(g.pb.copy(), d.F.LINEAR, 0)), b.D(d.za(g.Mb.copy(), d.F.LINEAR, 0.5)), this.Fc.Rb(b, 1), b = new f, b.D(d.gl(1, 1, d.F.LINEAR, 0)), b.D(d.gl(0, 0, d.F.LINEAR, 0.25)), b.D(d.za(g.pb.copy(), d.F.LINEAR, 0)), b.D(d.za(g.Mb.copy(), d.F.LINEAR, 0.25)), this.Rb(b, 1));
                        this.ba = h.copy(r.Zn);
                        b = new f;
                        b.D(d.Ra(this.x, this.y, d.F.Ld, 0));
                        b.D(d.Ra(this.x, this.y - 3, d.F.Ob, 0.5));
                        b.D(d.Ra(this.x, this.y, d.F.Ld, 0.5));
                        b.D(d.Ra(this.x, this.y + 3, d.F.Ob, 0.5));
                        b.D(d.Ra(this.x, this.y, d.F.Ld, 0.5));
                        b.fl = f.ga.Cb;
                        this.Rb(b, 0);
                        this.S(0);
                        b.update(l.lb(0, 20) / 10);
                        b = new c;
                        b.sa(e.ed);
                        b.ya();
                        b.tc(0.05, f.ga.Cb, 1, 18);
                        b.S(0);
                        b.yc(0).update(l.lb(0, 20) / 10);
                        b.anchor = b.oa = a.T;
                        b.Ka = 1E-4;
                        this.U(b)
                    },
                    update: function(a) {
                        0 < this.timeout && 0 < this.time && (this.time = n.Ve(this.time, 0, 1, a));
                        this.p(a)
                    },
                    B: function() {
                        this.Fc && this.Fc.B();
                        this.p()
                    }
                })
            }(Da, za, q, Q, la, qa, Z, R, ba, pa, J),
            pb = function(b, c, e) {
                return b.extend({
                    init: function() {
                        this.p()
                    },
                    kq: function(a, b, d, g) {
                        a = c.Ak({
                            Nk: a,
                            text: b,
                            width: d,
                            Jc: g
                        });
                        this.Pe(new e(a))
                    }
                })
            }(ca, fa, Va),
            Wb = function(b) {
                return b.extend({
                    init: function() {
                        this.p();
                        this.P = 0
                    }
                })
            }(pb),
            Xb = function(b, c, e, a) {
                var f = b.extend({
                    init: function(a, b) {
                        this.speed = a;
                        this.type = b;
                        this.a = c.Ta();
                        this.target = c.Ta();
                        this.offset = c.Ta()
                    },
                    moveTo: function(a, b, e) {
                        this.target.x = a;
                        this.target.y = b;
                        e ? this.a.qa(this.target) : this.type === f.gd.Nj ? (this.offset =
                            c.eb(this.target, this.a), this.offset.multiply(this.speed)) : this.type === f.gd.Zg && (this.offset = c.eb(this.target, this.a), this.offset.normalize(), this.offset.multiply(this.speed))
                    },
                    update: function(b) {
                        this.a.Lk(this.target) || (this.a.add(c.multiply(this.offset, b)), this.a.round(), a.Fl(this.offset.x, this.target.x - this.a.x) && a.Fl(this.offset.y, this.target.y - this.a.y) || this.a.qa(this.target))
                    },
                    Zx: function() {
                        0 === this.a.x && 0 === this.a.y || e.context.translate(-this.a.x, -this.a.y)
                    },
                    ny: function() {
                        0 === this.a.x && 0 ===
                            this.a.y || e.context.translate(this.a.x, this.a.y)
                    }
                });
                f.gd = {
                    Zg: 0,
                    Nj: 1
                };
                return f
            }(Y, O, aa, ba),
            Yb = function() {
                function b(c, b, a, f) {
                    this.object = c;
                    this.ni = b;
                    this.param = a;
                    this.delay = f
                }
                b.prototype.Cy = function() {
                    this.ni.apply(this.object, this.param)
                };
                return {
                    Fe: [],
                    uc: function(c, e, a, f) {
                        this.Fe.push(new b(c, e, a, f))
                    },
                    zo: function() {
                        this.Fe = []
                    },
                    cE: function(c, b, a) {
                        for (var f = 0, d = this.Fe.length; f < d; f--) {
                            var g = this.Fe[f];
                            if (g.object === c && g.ni === b && g.param === a) {
                                this.Fe.splice(f, 1);
                                break
                            }
                        }
                    },
                    update: function(c) {
                        for (var b =
                                this.Fe.slice(0), a = 0, f = b.length; a < f; a++) {
                            var d = b[a],
                                g = this.Fe.indexOf(d);
                            0 > g || (d.delay -= c, 0 >= d.delay && (this.Fe.splice(g, 1), d.Cy()))
                        }
                    }
                }
            }(),
            Zb = function() {
                var b = {
                    Xr: 0,
                    qr: 1,
                    Ns: 2,
                    Ks: 3,
                    ct: 4,
                    io: 5,
                    Qs: 6,
                    Rs: 7,
                    Ss: 8,
                    Ts: 9,
                    Us: 10,
                    Vs: 11,
                    Ws: 12,
                    Xs: 13,
                    Ys: 14,
                    Zs: 15,
                    $s: 16,
                    at: 17,
                    bt: 18,
                    Rq: 50,
                    Sq: 51,
                    Oq: 52,
                    ur: 53,
                    Lq: 54,
                    es: 55,
                    Fs: 56,
                    Gs: 57,
                    Hs: 58,
                    Is: 59,
                    Js: 60,
                    tx: 61,
                    lm: 80,
                    Iq: 81,
                    Jq: 82,
                    sr: 100,
                    rm: 101,
                    vr: 102,
                    wr: 103,
                    ns: 120,
                    Os: 121,
                    Pq: 122,
                    sE: function(c) {
                        switch (c) {
                            case "map":
                                return b.Xr;
                            case "gameDesign":
                                return b.qr;
                            case "target":
                                return b.Ns;
                            case "target2":
                                return b.Os;
                            case "star":
                                return b.Ks;
                            case "tutorialText":
                                return b.ct;
                            case "tutorial01":
                                return b.io;
                            case "tutorial02":
                                return b.Qs;
                            case "tutorial03":
                                return b.Rs;
                            case "tutorial04":
                                return b.Ss;
                            case "tutorial05":
                                return b.Ts;
                            case "tutorial06":
                                return b.Us;
                            case "tutorial07":
                                return b.Vs;
                            case "tutorial08":
                                return b.Ws;
                            case "tutorial09":
                                return b.Xs;
                            case "tutorial10":
                                return b.Ys;
                            case "tutorial11":
                                return b.Zs;
                            case "tutorial12":
                                return b.$s;
                            case "tutorial13":
                                return b.at;
                            case "tutorial14":
                                return b.bt;
                            case "candyL":
                                return b.Rq;
                            case "candyR":
                                return b.Sq;
                            case "candy":
                                return b.Oq;
                            case "candy2":
                                return b.Pq;
                            case "gravitySwitch":
                                return b.ur;
                            case "bubble":
                                return b.Lq;
                            case "pump":
                                return b.es;
                            case "sock":
                                return b.Fs;
                            case "spike1":
                                return b.Gs;
                            case "spike2":
                                return b.Hs;
                            case "spike3":
                                return b.Is;
                            case "spike4":
                                return b.Js;
                            case "spikesSwitch":
                                return b.tx;
                            case "electro":
                                return b.lm;
                            case "bouncer1":
                                return b.Iq;
                            case "bouncer2":
                                return b.Jq;
                            case "grab":
                                return b.sr;
                            case "hidden01":
                                return b.rm;
                            case "hidden02":
                                return b.vr;
                            case "hidden03":
                                return b.wr;
                            case "rotatedCircle":
                                return b.ns;
                            default:
                                return alert("Unknown map item:" + c), null
                        }
                    }
                };
                return b
            }(),
            $b = function(b) {
                return b.extend({
                    init: function() {
                        this.p();
                        this.mj = []
                    },
                    update: function(c) {
                        for (var b = 0, a = this.mj.length; b < a; b++) this.removeChild(this.mj[b]);
                        this.mj = [];
                        this.p(c)
                    },
                    vq: function(c) {
                        this.mj.push(c.element)
                    },
                    ef: function() {
                        var c = this;
                        return function(b) {
                            c.vq(b)
                        }
                    },
                    QA: function(c) {
                        this.mj.push(c)
                    },
                    Pp: function() {
                        var c = this;
                        return function(b) {
                            c.QA(b)
                        }
                    }
                })
            }(da),
            qb = function(b,
                c, e, a, f, d, g) {
                function h(a, c) {
                    this.My = a;
                    this.fv = c
                }
                var l = b.extend({
                    init: function(c, b) {
                        this.p();
                        this.rows = c;
                        this.Nf = b;
                        this.pi = a.Bb;
                        this.oi = a.fb;
                        this.Op = 1;
                        this.Ud = [];
                        this.Fd = [];
                        this.sp = [];
                        for (var e = 0; e < b; e++)
                            for (var g = this.sp[e] = [], h = 0; h < c; h++) g[h] = f.h;
                        this.nj = this.oj = l.sc.NONE;
                        this.QC = this.tz = !1;
                        this.iv = d.lb(1E3, 2E3)
                    },
                    Vx: function(a, b) {
                        if (b === f.h) this.Fg = a.Ji, this.Eg = a.Ii;
                        else {
                            var e = a.d[b];
                            this.Fg = e.O;
                            this.Eg = e.V
                        }
                        this.Aq();
                        for (var e = f.h, d = 0, g = this.Ud.length; d < g; d++)
                            if (this.Ud[d].L === a) {
                                e = d;
                                break
                            }
                        e ===
                            f.h && (d = new c(a), e = this.Ud.length, this.Ud.push(d));
                        this.Fd.push(new h(e, b))
                    },
                    Aq: function() {
                        this.tp = 2 + Math.floor(this.pi / (this.Fg + 1));
                        this.up = 2 + Math.floor(this.oi / (this.Eg + 1));
                        this.oj === l.sc.NONE && (this.up = Math.min(this.up, this.rows));
                        this.nj === l.sc.NONE && (this.tp = Math.min(this.tp, this.Nf));
                        this.width = this.yj = this.Nf * this.Fg;
                        this.height = this.xj = this.rows * this.Eg
                    },
                    fill: function(a, c, b, e, d) {
                        var f = c;
                        for (c += e; f < c; f++) {
                            e = a;
                            for (var g = a + b; e < g; e++) this.sp[f][e] = d
                        }
                    },
                    lF: ja("Op"),
                    VB: function(a) {
                        this.nj = a;
                        this.Aq()
                    },
                    WB: function(a) {
                        this.oj = a;
                        this.Aq()
                    },
                    yw: function(a) {
                        var c = Math.round(a.x / this.Op),
                            b = Math.round(a.y / this.Op),
                            d = this.x,
                            h = this.y,
                            x, z, s;
                        this.oj !== l.sc.NONE && (h -= b, x = Math.floor(h) % this.xj, h = 0 > h ? x + b : x - this.xj + b);
                        this.nj !== l.sc.NONE && (d -= c, x = Math.floor(d) % this.yj, d = 0 > d ? x + c : x - this.yj + c);
                        if (e.lj(c, b, c + this.pi, b + this.oi, d, h, d + this.yj, h + this.xj)) {
                            x = e.jv(d, h, this.yj, this.xj, c, b, this.pi, this.oi);
                            x = new g(Math.max(0, x.x), Math.max(0, x.y));
                            x = new g(Math.floor(Math.floor(x.x) / this.Fg), Math.floor(Math.floor(x.y) / this.Eg));
                            var h = h + x.y * this.Eg,
                                q = new g(d + x.x * this.Fg, h),
                                d = 0;
                            for (z = this.Ud.length; d < z; d++) this.Ud[d].ll = 0;
                            z = x.x + this.tp - 1;
                            var k = x.y + this.up - 1;
                            this.oj === l.sc.NONE && (k = Math.min(this.rows - 1, k));
                            this.nj === l.sc.NONE && (z = Math.min(this.Nf - 1, z));
                            for (d = x.x; d <= z; d++) {
                                q.y = h;
                                for (var D = x.y; D <= k && !(q.y >= b + this.oi); D++) {
                                    var u = e.jv(c, b, this.pi, this.oi, q.x, q.y, this.Fg, this.Eg),
                                        F = new e(c - q.x + u.x, b - q.y + u.y, u.O, u.V),
                                        A = Math.round(d),
                                        E = Math.round(D);
                                    this.oj === l.sc.lr && (q.y < y ? E = 0 : q.y >= this.y + this.xj && (E = this.rows - 1));
                                    this.nj === l.sc.lr &&
                                        (q.x < this.x ? A = 0 : q.x >= this.x + this.yj && (A = this.Nf - 1));
                                    this.tz && (s = Math.sin(q.x) * this.iv, A = Math.abs(Math.floor(s) % this.Nf));
                                    this.QC && (s = Math.sin(q.y) * this.iv, E = Math.abs(Math.floor(s) % this.rows));
                                    A >= this.Nf && (A %= this.Nf);
                                    E >= this.rows && (E %= this.rows);
                                    s = this.sp[A][E];
                                    0 <= s && (A = this.Fd[s], s = this.Ud[A.My], E = s.L, A.fv !== f.h && (A = E.d[A.fv], F.x += A.x, F.y += A.y), u = new e(a.x + u.x, a.y + u.y, u.O, u.V), s.Ya(s.ll++, F, u));
                                    q.y += this.Eg
                                }
                                q.x += this.Fg;
                                if (q.x >= c + this.pi) break
                            }
                        }
                    },
                    B: function() {
                        this.Cc();
                        for (var a = 0, c = this.Ud.length; a <
                            c; a++) this.Ud[a].B();
                        this.Bc()
                    }
                });
                l.sc = {
                    NONE: 0,
                    Fw: 1,
                    lr: 2
                };
                return l
            }(da, Oa, R, J, K, ba, O),
            ac = function(b, c) {
                return b.extend({
                    init: function(b, a) {
                        this.p(b, a);
                        this.ou = c.Yi()
                    },
                    yw: function(c) {
                        this.ou.Lk(c) || (this.p(c), this.ou.qa(c))
                    },
                    B: function() {
                        this.p()
                    }
                })
            }(qb, O),
            bc = function(b, c, e) {
                return b.extend({
                    init: function(a, b, d, g, h) {
                        this.p();
                        this.wo = h;
                        this.va = new c(0);
                        this.va.Wk(a, b);
                        this.wa = new c(1);
                        this.wa.Wk(d, g);
                        this.va.oa = this.wa.oa = e.Qb | e.rb;
                        this.width = this.va.width;
                        this.height = this.va.height;
                        this.ve(this.va,
                            0);
                        this.ve(this.wa, 1);
                        this.wa.setEnabled(!1);
                        this.va.Jb = $.proxy(this.Jb, this);
                        this.wa.Jb = $.proxy(this.Jb, this)
                    },
                    Jb: function(a) {
                        switch (a) {
                            case 0:
                            case 1:
                                this.toggle()
                        }
                        this.Jb && this.Jb(this.wo)
                    },
                    tj: function(a, c, b, e) {
                        this.va.tj(a, c, b, e);
                        this.wa.tj(a, c, b, e)
                    },
                    toggle: function() {
                        this.va.setEnabled(!this.va.isEnabled());
                        this.wa.setEnabled(!this.wa.isEnabled())
                    },
                    np: function() {
                        return this.wa.isEnabled()
                    }
                })
            }(da, ob, Q),
            cc = function(b, c, e) {
                var a = c.extend({
                    init: function() {
                        var c = b.create(e.ed, 56),
                            d = b.create(e.ed, 56),
                            g = b.create(e.ed, 57),
                            h = b.create(e.ed, 57);
                        this.p(c, d, g, h, a.hr);
                        this.tj(10, 10, 10, 10)
                    }
                });
                a.hr = 0;
                return a
            }(ca, bc, q),
            dc = function(b, c, e, a, f) {
                var d = b.extend({
                    init: function(b, h) {
                        this.p();
                        this.sa(f.ed);
                        this.Ya(58);
                        this.anchor = a.T;
                        var l = new c;
                        l.D(e.Se(0, e.F.LINEAR, 0));
                        l.D(e.Se(180, e.F.Ob, 0.3));
                        this.Rb(l, d.tk.dt);
                        l = new c;
                        l.D(e.Se(180, e.F.LINEAR, 0));
                        l.D(e.Se(0, e.F.Ob, 0.3));
                        this.Rb(l, d.tk.Ym);
                        this.IB(f.tm, 1);
                        this.x += b;
                        this.y += h
                    }
                });
                d.tk = {
                    Ym: 0,
                    dt: 1
                };
                return d
            }(ca, la, qa, Q, q),
            ec = function(b, c, e, a, f, d, g, h, l, n) {
                function r() {
                    this.y =
                        this.x = this.NA = 0;
                    this.Ik = this.rq = this.alpha = this.Kk = this.Ul = this.da = this.Jk = this.Tl = this.Y = 1
                }
                return b.extend({
                    init: function() {
                        this.p();
                        var a = d.rd(e.Am);
                        this.gv = a.Ji;
                        this.ev = a.Ii;
                        this.Wa = new f(a);
                        this.Wa.Ka = 0.1;
                        this.tl = []
                    },
                    Tx: function(a, c) {
                        var b, e, d = [0.3, 0.3, 0.5, 0.5, 0.6],
                            d = b = d[h.lb(0, d.length - 1)];
                        h.bB() ? b *= 1 + h.lb(0, 1) / 10 : d *= 1 + h.lb(0, 1) / 10;
                        b *= 1;
                        e = 1 * d;
                        var f = this.gv * b,
                            g = this.ev * e,
                            k = Math.min(1 - b, 1 - e),
                            l = Math.random(),
                            d = new r;
                        d.NA = c;
                        d.x = a.x;
                        d.y = a.y;
                        d.Tl = k + b;
                        d.Ul = k + e;
                        d.Y = d.Tl * l;
                        d.da = d.Ul * l;
                        d.Jk = b;
                        d.Kk = e;
                        d.Ik = 0.3;
                        d.rq = 1;
                        d.alpha = 0.7 * l + 0.3;
                        b = this.Wa.L.d[0];
                        f = new n(a.x - f / 2, a.y - g / 2, f, g);
                        this.Wa.Ya(this.tl.length, b, f, d.alpha);
                        this.tl.push(d)
                    },
                    Ut: function(a, b, e) {
                        var d = l.cn,
                            f = e.Sa.path[a];
                        b = c.eb(e.Sa.path[b], f);
                        e = Math.floor(b.Oc() / d);
                        var g = l.bn,
                            n, k;
                        b.normalize();
                        for (n = 0; n <= e; n++) k = c.add(f, c.multiply(b, n * d)), k.x += h.lb(-g, g), k.y += h.lb(-g, g), this.Tx(k, a)
                    },
                    update: function(a) {
                        this.p(a);
                        this.Wa.update(a);
                        var b = this.tl.length,
                            c, e, d, f;
                        for (c = 0; c < b; c++) e = this.tl[c], d = g.xd(e.Y, e.Jk, 1, a), e.Y = d.value, d.Bd && (d = e.Tl, e.Tl =
                            e.Jk, e.Jk = d), d = g.xd(e.da, e.Kk, 1, a), e.da = d.value, d.Bd && (d = e.Ul, e.Ul = e.Kk, e.Kk = d), d = this.gv * e.Y, f = this.ev * e.da, this.Wa.gf[c] = new n(e.x - d / 2, e.y - f / 2, d, f), d = g.xd(e.alpha, e.Ik, 1, a), e.alpha = d.value, d.Bd && (d = e.rq, e.rq = e.Ik, e.Ik = d), this.Wa.hh[c] = e.alpha
                    },
                    B: function() {
                        this.Cc();
                        this.Wa.B();
                        this.Bc()
                    }
                })
            }(da, O, q, ca, Oa, Qa, pa, ba, J, R),
            fc = function(b, c, e, a, f, d, g, h, l) {
                var n = 7 * d.Q,
                    r = 3 * d.Q,
                    m = 22.5 * d.Q,
                    p = 0.03 * d.Q,
                    C = e.extend({
                        init: function() {
                            this.p();
                            this.sa(a.rc);
                            this.Ya(G)
                        }
                    }),
                    x = b.extend({
                        init: function() {
                            this.p();
                            this.Lc = [];
                            this.Td = [];
                            this.pq = c.h;
                            this.Ui = g.Yi();
                            this.ke = new C;
                            this.ke.anchor = f.ah | f.eh;
                            this.ke.Y = 1;
                            this.ke.oa = f.T;
                            this.ke.fe = this.ke.width / 2 + 0.5;
                            this.ke.Ka = 0.001;
                            this.Jd = new C;
                            this.Jd.Y = -1;
                            this.Jd.anchor = f.ah | f.eh;
                            this.Jd.oa = f.T;
                            this.Jd.fe = this.Jd.width / 2 - 0.5;
                            this.Jd.Ka = 0.001;
                            this.Jd.x = -1;
                            this.Jg = e.create(a.rc, k);
                            this.Jg.anchor = f.T;
                            this.gc = e.create(a.rc, s);
                            this.gc.anchor = f.Qb | f.ah;
                            this.hf = e.create(a.rc, s);
                            this.hf.Y = -1;
                            this.hf.anchor = f.Qb | f.rb;
                            this.ub = e.create(a.rc, u);
                            this.ub.anchor = f.T;
                            this.ub.rotation =
                                90;
                            this.nc = e.create(a.rc, u);
                            this.nc.anchor = f.T;
                            this.nc.rotation = -90;
                            this.Gc = e.create(a.rc, D);
                            this.Gc.anchor = this.ub.anchor;
                            this.Gc.rotation = this.ub.rotation;
                            this.Gc.visible = !1;
                            this.Hc = e.create(a.rc, D);
                            this.Hc.anchor = this.nc.anchor;
                            this.Hc.rotation = this.nc.rotation;
                            this.Hc.visible = !1;
                            this.Ig = e.create(a.rc, q);
                            this.Ig.anchor = f.T;
                            this.ej = !1;
                            this.U(this.ke);
                            this.U(this.Jd);
                            this.U(this.Gc);
                            this.U(this.Hc);
                            this.U(this.ub);
                            this.U(this.nc)
                        },
                        setSize: function(a) {
                            this.size = a;
                            var b = this.size / 167;
                            this.gc.Y = this.gc.da =
                                this.hf.da = b;
                            this.hf.Y = -b;
                            this.Ig.Y = this.Ig.da = b;
                            a = 0.4 <= b ? b : 0.4;
                            this.ke.Y = this.ke.da = this.Jd.da = a;
                            this.Jd.Y = -a;
                            b = 0.75 <= b ? b : 0.75;
                            this.ub.Y = this.ub.da = this.nc.Y = this.nc.da = b;
                            this.Gc.Y = this.Gc.da = this.Hc.Y = this.Hc.da = b;
                            this.Jg.Y = 1 - 0.5 * (1 - a);
                            this.Jg.da = this.Jg.Y;
                            this.Yb = this.gc.width * this.gc.Y;
                            this.GC()
                        },
                        eu: function() {
                            return !this.ub.visible
                        },
                        Bv: function(a) {
                            this.ub.visible = !a
                        },
                        HE: function() {
                            return this.Gc.visible
                        },
                        Cv: function(a) {
                            this.Gc.visible = a
                        },
                        IE: function() {
                            return this.Hc.visible
                        },
                        Dv: function(a) {
                            this.Hc.visible =
                                a
                        },
                        qy: function() {
                            var a = this.Td.length,
                                b, c;
                            for (b = 0; b < a; b++)
                                if (c = this.Td[b], c != this && this.ry(c)) return !0;
                            return !1
                        },
                        B: function() {
                            var a = l.context;
                            if (this.Hc.visible || this.Gc.visible) {
                                var b = (r + d.Q) * this.ub.Y,
                                    c = this.Yb + Math.floor(b / 2);
                                a.beginPath();
                                a.lineWidth = b;
                                a.arc(this.x, this.y, c, 0, 2 * Math.PI, !1);
                                a.stroke()
                            }
                            this.gc.color = this.color;
                            this.hf.color = this.color;
                            this.ub.color = this.color;
                            this.nc.color = this.color;
                            this.Ig.color = this.color;
                            this.Ig.B();
                            var b = this.Td.length,
                                k, e = this.Td.indexOf(this),
                                f = a.globalAlpha;
                            0.2 !== f && (a.globalAlpha = 0.2);
                            for (c = 0; c < b; c++) k = this.Td[c], k != this && k.qy() && this.Td.indexOf(k) < e && this.Hy(this.x, this.y, this.Yb, k.x, k.y, k.Yb, 0.5 * n * k.gc.Y);
                            0.2 !== f && (a.globalAlpha = f);
                            this.gc.B();
                            this.hf.B();
                            this.p();
                            this.Jg.B()
                        },
                        Hy: function(a, b, c, k, e, d, f) {
                            var h = g.Ja(a, b, k, e);
                            h >= c + d || c >= h + d || (c = Math.acos((h - (c * c - d * d + h * h) / (2 * h)) / d), h = (new g(a - k, b - e)).b(), b = h - c, c = h + c, k > a && (b += Math.PI, c += Math.PI), a = l.context, a.beginPath(), a.lineWidth = f, a.arc(k, e, d, b, c, !1), a.stroke())
                        },
                        GC: function() {
                            this.Ig.x = this.Jg.x =
                                this.x;
                            this.Ig.y = this.Jg.y = this.y;
                            var a = this.gc.width / 2 * (1 - this.gc.Y),
                                b = this.gc.height / 2 * (1 - this.gc.da),
                                c = this.Yb - (m - p * this.size) + (1 - this.ub.Y) * (this.ub.width / 2);
                            this.gc.x = this.x + a;
                            this.hf.x = this.x - a;
                            this.gc.y = this.hf.y = this.y - b;
                            this.ub.x = this.x - c;
                            this.nc.x = this.x + c;
                            this.ub.y = this.nc.y = this.y;
                            this.Gc.x = this.ub.x;
                            this.Gc.y = this.ub.y;
                            this.Hc.x = this.nc.x;
                            this.Hc.y = this.nc.y
                        },
                        ry: function(a) {
                            if (this.x === a.x && this.y === a.y && this.size === a.size) return !1;
                            var b = this.Lc.length,
                                c;
                            for (c = 0; c < b; c++)
                                if (0 <= a.Lc.indexOf(this.Lc[c])) return !0;
                            return !1
                        },
                        copy: function(a) {
                            var b = new x;
                            b.vF = a;
                            b.x = this.x;
                            b.y = this.y;
                            b.rotation = this.rotation;
                            b.Td = this.Td;
                            b.Lc = this.Lc;
                            b.dj = c.h;
                            a = this.size * d.Q;
                            var k = h.bc(b.rotation);
                            b.wh = new g(b.x - a, b.y);
                            b.td = new g(b.x + a, b.y);
                            b.wh.pa(k, b.x, b.y);
                            b.td.pa(k, b.x, b.y);
                            b.setSize(this.size);
                            b.Bv(this.eu());
                            b.ub.visible = !1;
                            b.nc.visible = !1;
                            return b
                        }
                    }),
                    q = 0,
                    s = 1,
                    G = 2,
                    k = 3,
                    D = 4,
                    u = 5;
                return x
            }(da, K, ca, q, Q, J, O, ia, aa),
            Aa = function(b, c, e, a, f, d, g, h, l, n, r, m, p, C, x, q) {
                return b.extend({
                    init: function() {
                        this.p();
                        this.anchor = g.T;
                        this.Zo = 10;
                        this.$d = 0;
                        this.cp = 1;
                        this.dp = 2;
                        this.Qo = 3;
                        this.xl = 4;
                        this.St = 5;
                        this.Cq = 6;
                        this.zp = 7;
                        this.wp = 8;
                        this.Eo = 9;
                        this.ba = h.copy(n.eo);
                        this.Qc = !1;
                        this.Fo = q.Cn
                    },
                    Xu: function() {
                        this.Qc || this.S(this.Xd, this.Zo)
                    },
                    VA: function() {
                        this.Qc || this.S(this.Yd, this.cp)
                    },
                    WA: function() {
                        this.Qc || this.S(this.Zd, this.dp)
                    },
                    $u: function() {
                        this.Qc || this.S(this.ce, this.zp)
                    },
                    Zu: function() {
                        this.Qc || this.S(this.be, this.wp)
                    },
                    Wu: function() {
                        this.Qc || this.S(this.Je, this.St)
                    },
                    ZA: function() {
                        this.Qc || (this.S(this.le, this.Cq), this.Qc = !0)
                    },
                    XE: function() {
                        this.Qc ||
                            this.S(this.Sd, this.Eo)
                    },
                    Vu: function() {
                        this.Qc || this.S(this.Wd, this.Qo)
                    },
                    YE: function() {
                        this.Qc || this.S(this.Ad, this.xl)
                    },
                    ju: function() {
                        var a = this.Sb[this.Ub];
                        return a.isEnabled() && a.nh === this.$d
                    },
                    mh: function(b, e, k, f) {
                        var h, l, p;
                        l = 0;
                        for (p = this.Ze.length; l < p; l++) h = this.Sx(this.Ze[l]), h.Ka = 1E-4;
                        this.nb(this.Xd, this.Zo, 0.05, d.ga.$a, this.cg, this.bg);
                        this.nb(this.Ub, this.$d, 0.05, d.ga.Cb, this.gg, this.fg);
                        this.nb(this.Yd, this.cp, 0.05, d.ga.Cb, this.eg, this.dg);
                        h = [];
                        var E = this.Ne - this.ud + 1;
                        l = this.ud;
                        for (p = l +
                            E; l < p; l++) h.push(l);
                        l = this.ud;
                        for (p = l + E; l < p; l++) h.push(l);
                        this.Hf(this.Zd, this.dp, 0.05, d.ga.$a, 2 * (this.Ne - this.ud + 1), h);
                        this.nb(this.Wd, this.Qo, 0.05, d.ga.$a, this.Uf, this.Tf);
                        this.nb(this.Ad, this.xl, 0.05, d.ga.$a, this.wg, this.vg);
                        this.nb(this.Je, this.St, 0.05, d.ga.$a, this.Wf, this.Vf);
                        this.nb(this.le, this.Cq, 0.05, d.ga.$a, this.Lg, this.Kg);
                        this.nb(this.ce, this.zp, 0.05, d.ga.$a, this.Ue, this.Te);
                        this.nb(this.be, this.wp, 0.05, d.ga.$a, this.og, this.ng);
                        this.nb(this.Sd, this.Eo, 0.05, d.ga.Cb, this.Mf, this.Lf);
                        this.he(this.Sd,
                            this.Eo, this.le, this.Cq, 0.05);
                        this.he(this.Ad, this.xl, this.be, this.wp, 0.05);
                        this.he(this.Ub, this.$d, this.Xd, this.Zo, 0.05);
                        this.he(this.Ub, this.$d, this.Yd, this.cp, 0.05);
                        this.he(this.Ub, this.$d, this.Zd, this.dp, 0.05);
                        this.he(this.Ub, this.$d, this.Wd, this.Qo, 0.05);
                        this.he(this.Ub, this.$d, this.Ad, this.xl, 0.05);
                        this.ep = C.lb(5, 20);
                        this.Sb[this.Ub].yc(this.$d).Zi = $.proxy(this.zA, this);
                        this.S(this.Ub, this.$d);
                        this.Kl(this.ce, this.Te - this.Ue, this.zp);
                        this.blink = new c;
                        this.blink.sa(this.Jf);
                        this.blink.oa = g.Qb |
                            g.rb;
                        this.blink.visible = !1;
                        this.blink.Hf(0, 0.05, d.ga.$a, 4, [this.ye, this.xe, this.ye, this.xe]);
                        this.blink.yv(a.jk, this.blink, 0, 0, 2, 0);
                        this.blink.ya();
                        this.U(this.blink);
                        this.to = 3;
                        l = r.supports[m.Uc];
                        this.support = x.create(r.vC || q.Uj);
                        this.support.Ya(l);
                        this.support.ya();
                        this.support.anchor = g.T;
                        l = b.y;
                        this.x = b.x * e + k;
                        this.y = l * e + f;
                        this.support.x = this.x + Math.round((r.uC || 0) * n.Nb);
                        this.support.y = this.y + Math.round((this.$v || 0) * n.Nb)
                    },
                    $v: 0,
                    zA: function(a, b, c) {
                        1 === c && (this.tw(), this.ep--, 0 === this.ep && (1 === C.lb(0,
                            1) ? this.VA() : this.WA(), this.ep = C.lb(5, 20)))
                    },
                    tw: function() {
                        this.to--;
                        0 === this.to && (this.blink.visible = !0, this.blink.S(0), this.to = 3)
                    },
                    B: function() {
                        this.support.B();
                        this.p()
                    }
                })
            }(function(b, c, e, a, f, d) {
                return b.extend({
                    init: function() {
                        this.p();
                        this.Sb = {}
                    },
                    Sx: function(a) {
                        var b = new c;
                        b.sa(a);
                        b.oa = b.anchor = d.Qb | d.rb;
                        b.ya();
                        this.width = b.L.zd.x;
                        this.height = b.L.zd.y;
                        this.Sb[a] = b;
                        this.U(b);
                        b.setEnabled(!1);
                        return b
                    },
                    Kl: function(a, b, c) {
                        this.Sb[a].Kl(b, c)
                    },
                    tc: function(a, b, c, e, d) {
                        return this.Sb[a].tc(b, c, e, d)
                    },
                    Hf: function(a, b, c, e, d, f) {
                        this.Sb[a].Hf(b, c, e, d, f)
                    },
                    nb: function(a, b, c, e, d, f, p) {
                        this.Sb[a].nb(b, c, e, d, f, p)
                    },
                    uk: function(a, b, c, e, d, f) {
                        this.Sb[a].uk(b, c, e, d, f)
                    },
                    he: function(b, c, d, n, r) {
                        d = this.Sb[d];
                        b = this.Sb[b];
                        n = d.yc(n);
                        c = [e.create(b, a.an, 0, c)];
                        d !== b && (c.push(e.create(b, a.pn, 1, 1)), c.push(e.create(b, a.jk, 1, 1)), c.push(e.create(b, a.nn, 1, 1)), c.push(e.create(d, a.pn, 0, 0)), c.push(e.create(d, a.jk, 0, 0)), c.push(e.create(d, a.nn, 0, 0)));
                        r = f.Vi(c, r);
                        n.D(r)
                    },
                    S: function(a, b) {
                        for (var c in this.Sb) c !== a && this.Sb[c].setEnabled(!1);
                        c = this.Sb[a];
                        c.setEnabled(!0);
                        c.S(b)
                    },
                    rl: function(a, b) {
                        var c, e;
                        for (e in this.Sb)
                            if ((c = this.Sb[e]) && c.isEnabled()) return c.rl(a, b);
                        return !1
                    }
                })
            }(Ca, za, Ma, wa, qa, Q, Z, ea), za, Ma, wa, qa, la, Q, R, Z, J, U, Ia, ea, ba, ca, q),
            rb = function(b, c, e, a) {
                return b.extend({
                    init: function() {
                        this.p();
                        this.ba = e.copy(a.fo);
                        this.Fo = c.Bn;
                        this.Ze = [c.pc, c.pf, c.$h];
                        this.Xd = c.pf;
                        this.cg = 47;
                        this.bg = 76;
                        this.Ub = c.pc;
                        this.gg = 0;
                        this.fg = 18;
                        this.Yd = c.pc;
                        this.eg = 43;
                        this.dg = 67;
                        this.Zd = c.pc;
                        this.ud = 68;
                        this.Ne = 83;
                        this.Wd = c.pf;
                        this.Uf = 0;
                        this.Tf = 19;
                        this.Ad = c.pf;
                        this.wg = 20;
                        this.vg = 46;
                        this.Je = c.$h;
                        this.Wf = 0;
                        this.Vf = 12;
                        this.le = c.pc;
                        this.Lg = 28;
                        this.Kg = 31;
                        this.ce = c.pc;
                        this.Ue = 19;
                        this.Te = 27;
                        this.be = c.pc;
                        this.og = 28;
                        this.ng = 31;
                        this.Sd = c.pc;
                        this.Mf = 32;
                        this.Lf = 40;
                        this.Jf = c.pc;
                        this.ye = 41;
                        this.xe = 42
                    },
                    B: function() {
                        this.p()
                    }
                })
            }(Aa, q, R, J),
            gc = function(b, c) {
                return b.extend({
                    init: function() {
                        this.p();
                        this.Ze = [c.Vg, c.vf, c.wf, c.pe];
                        this.Xd = c.Vg;
                        this.cg = 27;
                        this.bg = 56;
                        this.Ub = c.vf;
                        this.gg = 0;
                        this.fg = 18;
                        this.Yd = c.vf;
                        this.eg = 19;
                        this.dg = 43;
                        this.Zd = c.vf;
                        this.ud = 44;
                        this.Ne =
                            59;
                        this.Wd = c.wf;
                        this.Uf = 22;
                        this.Tf = 41;
                        this.Ad = c.Vg;
                        this.wg = 0;
                        this.vg = 26;
                        this.Je = c.wf;
                        this.Wf = 0;
                        this.Vf = 12;
                        this.le = c.pe;
                        this.Lg = 12;
                        this.Kg = 15;
                        this.ce = c.pe;
                        this.Ue = 0;
                        this.Te = 11;
                        this.be = c.pe;
                        this.og = 12;
                        this.ng = 15;
                        this.Sd = c.wf;
                        this.Mf = 13;
                        this.Lf = 21;
                        this.Jf = c.pe;
                        this.ye = 16;
                        this.xe = 17
                    },
                    B: function() {
                        this.p()
                    }
                })
            }(Aa, q),
            hc = function(b, c) {
                return b.extend({
                    init: function() {
                        this.p();
                        this.Ze = [c.Tg, c.rf, c.sf, c.ne];
                        this.Xd = c.Tg;
                        this.cg = 27;
                        this.bg = 56;
                        this.Ub = c.rf;
                        this.gg = 0;
                        this.fg = 18;
                        this.Yd = c.rf;
                        this.eg = 19;
                        this.dg =
                            43;
                        this.Zd = c.rf;
                        this.ud = 44;
                        this.Ne = 59;
                        this.Wd = c.sf;
                        this.Uf = 24;
                        this.Tf = 43;
                        this.Ad = c.Tg;
                        this.wg = 0;
                        this.vg = 26;
                        this.Je = c.sf;
                        this.Wf = 0;
                        this.Vf = 14;
                        this.le = c.ne;
                        this.Lg = 9;
                        this.Kg = 12;
                        this.ce = c.ne;
                        this.Ue = 0;
                        this.Te = 8;
                        this.be = c.ne;
                        this.og = 9;
                        this.ng = 12;
                        this.Sd = c.sf;
                        this.Mf = 15;
                        this.Lf = 23;
                        this.Jf = c.ne;
                        this.ye = 13;
                        this.xe = 14
                    }
                })
            }(Aa, q),
            ic = function(b, c) {
                return b.extend({
                    init: function() {
                        this.p();
                        this.Ze = [c.Xg, c.zf, c.Af, c.re];
                        this.Xd = c.Xg;
                        this.cg = 27;
                        this.bg = 56;
                        this.Ub = c.zf;
                        this.gg = 0;
                        this.fg = 18;
                        this.Yd = c.zf;
                        this.eg =
                            19;
                        this.dg = 43;
                        this.Zd = c.zf;
                        this.ud = 44;
                        this.Ne = 59;
                        this.Wd = c.Af;
                        this.Uf = 22;
                        this.Tf = 41;
                        this.Ad = c.Xg;
                        this.wg = 0;
                        this.vg = 26;
                        this.Je = c.Af;
                        this.Wf = 0;
                        this.Vf = 12;
                        this.le = c.re;
                        this.Lg = 9;
                        this.Kg = 12;
                        this.ce = c.re;
                        this.Ue = 0;
                        this.Te = 8;
                        this.be = c.re;
                        this.og = 9;
                        this.ng = 12;
                        this.Sd = c.Af;
                        this.Mf = 13;
                        this.Lf = 21;
                        this.Jf = c.re;
                        this.ye = 13;
                        this.xe = 14
                    }
                })
            }(Aa, q),
            jc = function(b, c) {
                return b.extend({
                    init: function() {
                        this.p();
                        this.Ze = [c.Qg, c.nf, c.of, c.me];
                        this.Xd = c.Qg;
                        this.cg = 27;
                        this.bg = 56;
                        this.Ub = c.nf;
                        this.gg = 0;
                        this.fg = 18;
                        this.Yd = c.nf;
                        this.eg = 19;
                        this.dg = 43;
                        this.Zd = c.nf;
                        this.ud = 44;
                        this.Ne = 59;
                        this.Wd = c.of;
                        this.Uf = 22;
                        this.Tf = 41;
                        this.Ad = c.Qg;
                        this.wg = 0;
                        this.vg = 26;
                        this.Je = c.of;
                        this.Wf = 0;
                        this.Vf = 12;
                        this.le = c.me;
                        this.Lg = 9;
                        this.Kg = 12;
                        this.ce = c.me;
                        this.Ue = 0;
                        this.Te = 8;
                        this.be = c.me;
                        this.og = 9;
                        this.ng = 12;
                        this.Sd = c.of;
                        this.Mf = 13;
                        this.Lf = 21;
                        this.Jf = c.me;
                        this.ye = 13;
                        this.xe = 14
                    }
                })
            }(Aa, q),
            kc = function(b, c) {
                return b.extend({
                    init: function() {
                        this.p();
                        this.Ze = [c.Ug, c.tf, c.uf, c.oe];
                        this.Xd = c.Ug;
                        this.cg = 27;
                        this.bg = 56;
                        this.Ub = c.tf;
                        this.gg = 0;
                        this.fg = 18;
                        this.Yd =
                            c.tf;
                        this.eg = 19;
                        this.dg = 43;
                        this.Zd = c.tf;
                        this.ud = 44;
                        this.Ne = 59;
                        this.Wd = c.uf;
                        this.Uf = 22;
                        this.Tf = 41;
                        this.Ad = c.Ug;
                        this.wg = 0;
                        this.vg = 26;
                        this.Je = c.uf;
                        this.Wf = 0;
                        this.Vf = 12;
                        this.le = c.oe;
                        this.Lg = 9;
                        this.Kg = 12;
                        this.ce = c.oe;
                        this.Ue = 0;
                        this.Te = 8;
                        this.be = c.oe;
                        this.og = 9;
                        this.ng = 12;
                        this.Sd = c.uf;
                        this.Mf = 13;
                        this.Lf = 21;
                        this.Jf = c.oe;
                        this.ye = 13;
                        this.xe = 14
                    }
                })
            }(Aa, q),
            lc = function(b, c, e, a) {
                return b.extend({
                    init: function() {
                        this.p();
                        this.ba = e.copy(a.ho);
                        this.Fo = c.Dn;
                        this.Ze = [c.Wg, c.xf, c.yf, c.qe];
                        this.Xd = c.Wg;
                        this.cg = 27;
                        this.bg =
                            56;
                        this.Ub = c.xf;
                        this.gg = 0;
                        this.fg = 17;
                        this.Yd = c.xf;
                        this.eg = 18;
                        this.dg = 42;
                        this.Zd = c.xf;
                        this.ud = 43;
                        this.Ne = 84;
                        this.Wd = c.yf;
                        this.Uf = 51;
                        this.Tf = 70;
                        this.Ad = c.Wg;
                        this.wg = 0;
                        this.vg = 26;
                        this.Je = c.yf;
                        this.Wf = 0;
                        this.Vf = 14;
                        this.le = c.qe;
                        this.Lg = 15;
                        this.Kg = 24;
                        this.ce = c.qe;
                        this.Ue = 0;
                        this.Te = 14;
                        this.be = c.qe;
                        this.og = 15;
                        this.ng = 24;
                        this.Sd = c.yf;
                        this.Mf = 15;
                        this.Lf = 50;
                        this.Jf = c.qe;
                        this.ye = 25;
                        this.xe = 34
                    },
                    $v: 28,
                    tw: ha()
                })
            }(Aa, q, R, J),
            pc = function(b, c, e, a, f, d, g, h, l, n, r, m, p, q, x, z, s, G, k, D, u, F, A, E, I, na, T, H, L, w, v, B, X, J, W, Ja, O, M,
                U, R, V, K, P, N, Q, S, Ac, sb, Sa, Ka, aa, Y, ba, Z, Ea, mc, nc, oc) {
                return k.extend({
                    init: function() {
                        this.p();
                        this.Gb = z;
                        this.Ed = this.hu = I.h;
                        this.Qa = new G;
                        this.Qa.visible = !1;
                        this.U(this.Qa);
                        this.Oh = new G;
                        this.Oh.visible = !1;
                        this.U(this.Oh);
                        this.$ = new x(v.Jj, x.gd.Nj);
                        this.Nh = 0;
                        this.bp = [];
                        for (var a = 0; 3 > a; a++) {
                            var b = this.bp[a] = new na;
                            b.sa(E.Vj);
                            b.ya();
                            b.tc(0.05, T.ga.$a, 0, 10);
                            b.Kl(10, 0);
                            b.x = b.width * a;
                            b.y = 0;
                            this.U(b)
                        }
                        this.Rl = H.Ta();
                        this.Mk = [];
                        for (a = 0; a < I.fd; a++) this.Mk[a] = [];
                        this.Go = F.Uo();
                        this.Q = v.Q;
                        this.gb = v.gb;
                        this.mb =
                            0;
                        this.Vd = [];
                        this.Si = this.Ri = this.Qi = 0;
                        this.Bo = !1;
                        this.op = 5 === X.Uc;
                        this.wi = Array(I.fd);
                        this.df = Array(I.fd);
                        this.Vp = Array(I.fd);
                        for (a = 0; a < I.fd; a++) this.wi[a] = !1, this.df[a] = H.Ta(), this.Vp[a] = H.Ta()
                    },
                    sl: function(a) {
                        var b = v.$m;
                        return a.a.y > this.vd + v.Zm || a.a.y < b
                    },
                    bF: function() {
                        this.hide();
                        this.show()
                    },
                    Ol: function() {
                        this.target.Xu();
                        this.Ab.Xu()
                    },
                    Jv: function(a) {
                        var b = F.Fi();
                        return aa.Xt(a.locale) !== b ? !0 : !1
                    },
                    gu: function(a, b, c, k, e) {
                        a.sa(E.qc);
                        a.Ya(0);
                        a.ya();
                        a.anchor = W.T;
                        a.ba = P.copy(v.gm);
                        a.Xe = !1;
                        a.Y = a.da =
                            0.71;
                        a.Ka = 1E-4;
                        b.sa(E.qc);
                        b.Ya(1);
                        b.ya();
                        b.anchor = b.oa = W.T;
                        a.U(b);
                        b.Y = b.da = 0.71;
                        b.Ka = 1E-4;
                        c.sa(E.qc);
                        c.Ya(2);
                        c.ya();
                        c.anchor = c.oa = W.T;
                        a.U(c);
                        c.Y = c.da = 0.71;
                        c.Ka = 1E-4;
                        k.sa(E.qc);
                        k.ya();
                        k.nb(0, 0.07, T.ga.$a, 8, 17);
                        k.Hf(1, 0.3, T.ga.$a, 2, [18, 18]);
                        b = k.yc(1);
                        b.D(w.za(L.pb.copy(), w.F.LINEAR, 0));
                        b.D(w.za(L.Mb.copy(), w.F.LINEAR, 0.2));
                        k.visible = !1;
                        k.anchor = k.oa = W.T;
                        k.Y = k.da = 0.71;
                        a.U(k);
                        k.Ka = 1E-4;
                        e.sa(E.ai);
                        e.x = a.x;
                        e.y = a.y;
                        e.oa = e.anchor = W.T;
                        e.tc(0.05, T.ga.Cb, 0, 12);
                        e.S(0);
                        a.U(e);
                        e.visible = !1;
                        e.Ka = 1E-4
                    },
                    show: function() {
                        this.Qa.kv();
                        this.Oh.kv();
                        this.Gb.zo();
                        var a = J.ru[X.Uc];
                        this.ot = u.rd(J.qu[X.Uc]);
                        this.Np = a ? u.rd(a) : this.ot;
                        this.back = new D(1, 1);
                        this.back.VB(Ja.sc.NONE);
                        this.back.WB(Ja.sc.Fw);
                        this.back.Vx(this.ot, 0);
                        this.back.fill(0, 0, 1, 1, 0);
                        this.Pa = null;
                        this.Yo = I.h;
                        this.M = 2;
                        this.We = 0;
                        this.wj = this.vj = null;
                        A.uq(E.Nd);
                        this.Ia = [];
                        this.yl = [];
                        this.ec = [];
                        this.Lb = [];
                        this.bubbles = [];
                        this.kc = [];
                        this.vv = [];
                        this.Ag = [];
                        this.je = [];
                        this.Hg = [];
                        this.Ge = [];
                        this.ki = [];
                        this.Ua = [];
                        this.Ye = null;
                        this.aa = new O;
                        this.aa.Wc(1);
                        this.xa = new O;
                        this.xa.Wc(1);
                        this.la = new O;
                        this.la.Wc(1);
                        this.Aa = new O;
                        this.Aa.Wc(1);
                        this.La = new M;
                        this.Ae = new M;
                        this.Co = new M;
                        this.qi = new na;
                        this.xk = new na;
                        this.gu(this.La, this.Ae, this.Co, this.qi, this.xk);
                        this.Eb = new M;
                        this.Be = new M;
                        this.Do = new M;
                        this.ri = new na;
                        this.Ao = new na;
                        this.gu(this.Eb, this.Be, this.Do, this.ri, this.Ao);
                        for (a = 0; 3 > a; a++) {
                            var b = this.bp[a];
                            b.wb && b.wb.stop();
                            b.Ya(0)
                        }
                        this.Wz(X.uu);
                        2 !== this.M && (this.ld = new na, this.ld.sa(E.ai), this.ld.oa = this.ld.anchor = W.T, this.ld.tc(0.05, T.ga.Cb, 0, 12), this.ld.S(0), this.Ma.U(this.ld),
                            this.ld.visible = !1, this.ld.Ka = 1E-4, this.md = new na, this.md.sa(E.ai), this.md.oa = this.md.anchor = W.T, this.md.tc(0.05, T.ga.Cb, 0, 12), this.md.S(0), this.Na.U(this.md), this.md.visible = !1, this.md.Ka = 1E-4);
                        for (var b = this.Ua.length, c, a = 0; a < b; a++) c = this.Ua[a], c.dj = I.h, c.Td = this.Ua;
                        this.rC();
                        this.Nh = 0;
                        this.vc = this.ic = this.Qd = this.hc = null;
                        this.yp = this.xp = !1;
                        this.Xa = 2 !== this.M;
                        this.Xb = this.Wb = this.hb = !1;
                        this.Hl = this.time = 0;
                        this.ag = !0;
                        Sa.reset();
                        this.Cl = this.cq = this.Qf = 0;
                        this.Gb.uc(this, this.Dy, null, 1);
                        this.Gb.uc(this,
                            this.Ey, null, 1);
                        a = new R;
                        a.kq(E.Og, X.Uc + 1 + " - " + (X.lg + 1));
                        a.anchor = W.Mg | W.rb;
                        a.x = 37 * v.Nb;
                        a.y = v.fb + 25 * v.Nb;
                        b = new R;
                        b.kq(E.Og, Y.X(ba.Uw));
                        b.anchor = W.Mg | W.rb;
                        b.oa = W.Qb | W.rb;
                        b.y = 80 * v.Nb;
                        b.fe -= b.width / 2;
                        b.Y = b.da = 0.7;
                        a.U(b);
                        b = new T;
                        b.D(w.za(L.Mb.copy(), w.F.LINEAR, 0));
                        b.D(w.za(L.Mb.copy(), w.F.LINEAR, 0.5));
                        b.D(w.za(L.pb.copy(), w.F.LINEAR, 0.5));
                        b.D(w.za(L.pb.copy(), w.F.LINEAR, 1));
                        b.D(w.za(L.Mb.copy(), w.F.LINEAR, 0.5));
                        a.Rb(b, 0);
                        a.S(0);
                        b.cb = this.Oh.ef();
                        this.Oh.U(a);
                        this.Go && this.tv()
                    },
                    rC: function() {
                        var a = v.Bb,
                            b = v.fb;
                        if (this.wd > a || this.vd > b) {
                            this.Oe = !0;
                            this.Tt = !1;
                            this.$.type = x.gd.Zg;
                            this.$.speed = 10;
                            var c, k, e = 2 !== this.M ? this.la : this.aa;
                            this.wd > a ? (c = e.a.x > this.wd / 2 ? 0 : this.wd - a, k = 0) : e.a.y > this.vd / 2 ? k = c = 0 : (c = 0, k = this.vd - b);
                            var d = e.a.y - b / 2,
                                a = p.rh(e.a.x - a / 2, 0, this.wd - a),
                                b = p.rh(d, 0, this.vd - b);
                            this.$.moveTo(c, k, !0);
                            this.hu = this.$.a.Ja(new H(a, b))
                        } else this.Oe = !1, this.$.moveTo(0, 0, !0)
                    },
                    Dy: function() {
                        this.qi.S(0)
                    },
                    Ey: function() {
                        this.ri.S(0)
                    },
                    Wz: function(a) {
                        function b(a, c) {
                            for (var e = 0, d = a.length; e < d; e++)
                                for (var f =
                                        a[e], g = f.length, bb = 0; bb < g; bb++) c.call(k, f[bb])
                        }
                        var c = [],
                            k = this,
                            e;
                        for (e in a) a.hasOwnProperty(e) && c.push(a[e]);
                        b(c, function(a) {
                            switch (a.name) {
                                case s.Xr:
                                    this.Xz(a);
                                    break;
                                case s.qr:
                                    this.Rz(a);
                                    break;
                                case s.Rq:
                                    this.Pz(a);
                                    break;
                                case s.Sq:
                                    this.Qz(a);
                                    break;
                                case s.Oq:
                                    this.Nz(a);
                                    break;
                                case s.Pq:
                                    this.Oz(a)
                            }
                        });
                        b(c, function(a) {
                            switch (a.name) {
                                case s.ur:
                                    this.Tz(a);
                                    break;
                                case s.Ks:
                                    this.cA(a);
                                    break;
                                case s.ct:
                                    this.eA(a);
                                    break;
                                case s.io:
                                case s.Qs:
                                case s.Rs:
                                case s.Ss:
                                case s.Ts:
                                case s.Us:
                                case s.Vs:
                                case s.Ws:
                                case s.Xs:
                                case s.Ys:
                                case s.Zs:
                                case s.$s:
                                case s.at:
                                case s.bt:
                                    this.dA(a);
                                    break;
                                case s.Lq:
                                    this.Mz(a);
                                    break;
                                case s.es:
                                    this.Zz(a);
                                    break;
                                case s.Fs:
                                    this.aA(a);
                                    break;
                                case s.Gs:
                                case s.Hs:
                                case s.Is:
                                case s.Js:
                                case s.lm:
                                    this.bA(a);
                                    break;
                                case s.ns:
                                    this.$z(a);
                                    break;
                                case s.Iq:
                                case s.Jq:
                                    this.Lz(a);
                                    break;
                                case s.sr:
                                    this.Sz(a);
                                    break;
                                case s.Ns:
                                    this.target = new nc;
                                    this.target.mh(a, this.Q, this.mb, this.gb);
                                    this.Rd = !1;
                                    F.Ol && (this.Gb.uc(this, this.Ol, null, 2), F.Ol = !1);
                                    break;
                                case s.Os:
                                    this.Ab = new oc.sy;
                                    this.Ab.mh(a, this.Q, this.mb, this.gb);
                                    this.ze = !1;
                                    break;
                                case s.rm:
                                case s.vr:
                                case s.wr:
                                    this.Uz(a)
                            }
                        })
                    },
                    Xz: function(a) {
                        this.wd = a.width;
                        this.vd = a.height;
                        this.mb = (v.Bb - this.wd * this.Q) / 2;
                        this.wd *= this.Q;
                        this.vd *= this.Q;
                        J.fC[X.Uc] && (this.wd > v.Bb && this.Vd.push(new Ka(v.Bb, 0)), this.vd > v.fb && this.Vd.push(new Ka(0, v.fb)), this.Vd.push(new Ka(0, 0)))
                    },
                    Rz: function(a) {
                        this.P = a.P || 0;
                        this.ka = a.ka;
                        this.lA = a.lA;
                        this.M = a.M ? 0 : 2;
                        this.ka *= v.fk
                    },
                    Sz: function(a) {
                        var b = a.x * this.Q + this.mb,
                            c = a.y * this.Q + this.gb,
                            k = a.length * this.Q,
                            e = a.f,
                            f = a.g,
                            g = a.nu,
                            l = a.Xk,
                            h = a.i * this.Q || -1,
                            p = a.m,
                            m = a.k * this.Q || 0,
                            u = a.c,
                            n = "L" === a.o,
                            r = a.n,
                            A = a.l,
                            v = new d;
                        v.x = b;
                        v.y = c;
                        v.g = f;
                        v.l = A;
                        v.nu = g;
                        v.Xk = l;
                        v.ZB(u);
                        v.rg(a);
                        if (v.Sa && (v.BB(), !r)) {
                            a = "R" === a.path[0];
                            this.Ye || (this.Ye = new Z);
                            f = 0;
                            for (g = v.Sa.path.length - 1; f < g; f++) a && 0 !== f % 3 || this.Ye.Ut(f, f + 1, v);
                            2 < v.Sa.path.length && this.Ye.Ut(0, v.Sa.path.length - 1, v)
                        }
                        e !== I.h && e !== I.Kj && (e *= this.Q);
                        a = null;
                        e !== I.h || A ? e === I.Kj && (a = this.xa) : a = 2 !== this.M ? n ? this.la : this.Aa : this.aa;
                        a && (b = new V(null, b, c, a, a.a.x, a.a.y, k), b.ab.Vc.qa(b.ab.a), v.Hv(b));
                        v.UB(e);
                        v.OB(h, p, m);
                        this.Ia.push(v)
                    },
                    Pz: function(a) {
                        this.la.a.x = a.x * this.Q + this.mb;
                        this.la.a.y = a.y * this.Q + this.gb;
                        this.Ma = new M;
                        this.Ma.sa(E.qc);
                        this.Ma.Ya(19);
                        this.Ma.Y = this.Ma.da = 0.71;
                        this.Ma.Xe = !1;
                        this.Ma.ya();
                        this.Ma.anchor = W.T;
                        this.Ma.x = this.la.a.x;
                        this.Ma.y = this.la.a.y;
                        this.Ma.ba = P.copy(v.Lj)
                    },
                    Qz: function(a) {
                        this.Aa.a.x = a.x * this.Q + this.mb;
                        this.Aa.a.y = a.y * this.Q + this.gb;
                        this.Na = new M;
                        this.Na.sa(E.qc);
                        this.Na.Ya(20);
                        this.Na.Y = this.Na.da = 0.71;
                        this.Na.Xe = !1;
                        this.Na.ya();
                        this.Na.anchor = W.T;
                        this.Na.x = this.Aa.a.x;
                        this.Na.y = this.Aa.a.y;
                        this.Na.ba = P.copy(v.Lj)
                    },
                    Nz: function(a) {
                        this.aa.a.x =
                            a.x * this.Q + this.mb;
                        this.aa.a.y = a.y * this.Q + this.gb
                    },
                    Oz: function(a) {
                        this.xa.a.x = a.x * this.Q + this.mb;
                        this.xa.a.y = a.y * this.Q + this.gb
                    },
                    Tz: function(a) {
                        this.Pa = new sb;
                        this.Pa.Jb = $.proxy(this.Jb, this);
                        this.Pa.visible = !1;
                        this.Pa.fc = !1;
                        this.U(this.Pa);
                        this.Pa.x = a.x * this.Q + this.mb;
                        this.Pa.y = a.y * this.Q + this.gb;
                        this.Pa.anchor = W.T
                    },
                    cA: function(a) {
                        var b = new r;
                        b.sa(E.ed);
                        b.x = a.x * this.Q + this.mb;
                        b.y = a.y * this.Q + this.gb;
                        b.timeout = a.timeout;
                        b.mh();
                        b.ba = P.copy(v.Yn);
                        b.rg(a);
                        b.update(0);
                        this.Lb.push(b)
                    },
                    eA: function(a) {
                        if (!this.Jv(a))
                            if (null ==
                                a.text || "" === a.text) Ea.debug("Missing tutorial text");
                            else {
                                var b = new m;
                                b.x = a.x * this.Q + this.mb;
                                b.y = a.y * this.Q + this.gb;
                                b.P = a.P || 0;
                                b.align = W.$b;
                                b.kq(E.Yh, a.text, Math.ceil(a.width * this.Q), W.$b);
                                b.color = L.Mb.copy();
                                a = new T;
                                var c = 0 === X.Uc && 0 === X.lg;
                                a.D(w.za(L.Mb.copy(), w.F.LINEAR, 0));
                                a.D(w.za(L.pb.copy(), w.F.LINEAR, 1));
                                a.D(w.za(L.pb.copy(), w.F.LINEAR, c ? 10 : 5));
                                a.D(w.za(L.Mb.copy(), w.F.LINEAR, 0.5));
                                b.Rb(a, 0);
                                0 === b.P && b.S(0);
                                this.Hg.push(b)
                            }
                    },
                    dA: function(a) {
                        if (!this.Jv(a)) {
                            var b = a.name - s.io,
                                c = new U;
                            c.sa(E.Pm);
                            c.Ya(b);
                            c.color = L.Mb.copy();
                            c.x = a.x * this.Q + this.mb;
                            c.y = a.y * this.Q + this.gb;
                            c.rotation = a.b || 0;
                            c.P = a.P || 0;
                            c.rg(a);
                            a = new T;
                            a.D(w.za(L.Mb.copy(), w.F.LINEAR, 0));
                            a.D(w.za(L.pb.copy(), w.F.LINEAR, 1));
                            0 === X.Uc && 0 === X.lg ? a.D(w.za(L.pb.copy(), w.F.LINEAR, 10)) : a.D(w.za(L.pb.copy(), w.F.LINEAR, 5.2));
                            a.D(w.za(L.Mb.copy(), w.F.LINEAR, 0.5));
                            c.Rb(a, 0);
                            0 === c.P ? c.S(0) : 2 === c.P && (a = new T, a.D(w.za(L.Mb.copy(), w.F.LINEAR, 0)), a.D(w.za(L.pb.copy(), w.F.LINEAR, 0.5)), a.D(w.za(L.pb.copy(), w.F.LINEAR, 1)), a.D(w.za(L.pb.copy(), w.F.LINEAR,
                                1.1)), a.D(w.za(L.Mb.copy(), w.F.LINEAR, 0.5)), a.D(w.Ra(c.x, c.y, w.F.LINEAR, 0)), a.D(w.Ra(c.x, c.y, w.F.LINEAR, 0.5)), a.D(w.Ra(c.x, c.y, w.F.LINEAR, 1)), a.D(w.Ra(c.x + v.jo, c.y, w.F.LINEAR, 0.5)), a.D(w.Ra(c.x + v.ko, c.y, w.F.LINEAR, 0.5)), a.mg = 2, a.fl = T.ga.Cb, c.Rb(a, 1), c.S(1));
                            this.je.push(c)
                        }
                    },
                    Uz: function(b) {
                        var c = b.name - s.rm,
                            k = b.pE - 1;
                        J.zy || (c = new a(c, k), c.x = b.x * this.Q + this.mb, c.y = b.y * this.Q + this.gb, c.rotation = b.b || 0, this.Ge.push(c))
                    },
                    Mz: function(a) {
                        var b = p.lb(1, 3),
                            k = new c;
                        k.sa(E.Xj);
                        k.Ya(b);
                        k.ya();
                        k.ba = P.copy(v.bm);
                        k.x = a.x * this.Q + this.mb;
                        k.y = a.y * this.Q + this.gb;
                        k.anchor = W.T;
                        k.Up = !1;
                        a = new Q;
                        a.sa(E.Xj);
                        a.Ya(0);
                        a.ya();
                        a.oa = a.anchor = W.T;
                        k.U(a);
                        this.bubbles.push(k)
                    },
                    Zz: function(a) {
                        var b = new g;
                        b.sa(E.$j);
                        b.ya();
                        b.Rx(0.05, T.ga.$a, 4, [1, 2, 3, 0]);
                        b.ba = P.copy(v.gn);
                        b.x = a.x * this.Q + this.mb;
                        b.y = a.y * this.Q + this.gb;
                        b.rotation = a.b + 90;
                        b.Zb();
                        b.anchor = W.T;
                        this.kc.push(b)
                    },
                    aA: function(a) {
                        var b = new l;
                        b.sa(E.Sg);
                        b.Y = b.da = 0.7;
                        b.mh();
                        b.ya();
                        b.x = a.x * this.Q + this.mb;
                        b.y = a.y * this.Q + this.gb;
                        b.group = a.group;
                        b.anchor = W.Qb | W.$b;
                        b.Kh -= b.height /
                            2 - 25;
                        b.Ya(0 === b.group ? l.$g.Rw : l.$g.Sw);
                        b.state = l.Z.IDLE;
                        b.rg(a);
                        b.rotation += 90;
                        b.Sa && (b.Sa.b += 90);
                        b.Zb();
                        this.Ag.push(b)
                    },
                    bA: function(a) {
                        var b = !1 === a.qb ? I.h : a.qb || I.h,
                            c = new n(a.x * this.Q + this.mb, a.y * this.Q + this.gb, a.size, parseFloat(a.b) || 0, b);
                        c.rg(a);
                        b && (c.Mu = $.proxy(this.pB, this));
                        a.name === s.lm ? (c.zi = !0, c.ip = a.ip, c.Kp = a.Kp, c.Cp = a.Cp, c.Nc = 0, c.qw(), c.Nc += c.ip, c.Zb()) : c.zi = !1;
                        this.ec.push(c)
                    },
                    $z: function(a) {
                        var b = a.x * this.Q + this.mb,
                            c = a.y * this.Q + this.gb,
                            k = a.size,
                            e = parseFloat(a.DE) || 0,
                            d = K.bc(e);
                        a = a.QE;
                        var f = new mc;
                        f.anchor = W.T;
                        f.x = b;
                        f.y = c;
                        f.rotation = e;
                        f.wh = new H(f.x - k * this.Q, f.y);
                        f.td = new H(f.x + k * this.Q, f.y);
                        f.wh.pa(d, f.x, f.y);
                        f.td.pa(d, f.x, f.y);
                        f.setSize(k);
                        f.Bv(a);
                        this.Ua.push(f)
                    },
                    Lz: function(a) {
                        var c = new b(a.x * this.Q + this.mb, a.y * this.Q + this.gb, a.size, a.b);
                        c.rg(a);
                        this.ki.push(c)
                    },
                    EA: function(a) {
                        a.element.fB = !0
                    },
                    update: function(a) {
                        function b(c) {
                            c.ji(new H(-c.mc.x / J, -c.mc.y / J + N), a)
                        }

                        function c(a, b) {
                            return P.ae(a.Ba.x, a.Ba.y, a.Ha.x, a.Ha.y, b.a.x - B, b.a.y - B, X, X) || P.ae(a.va.x, a.va.y, a.wa.x, a.wa.y, b.a.x -
                                B, b.a.y - B, X, X)
                        }

                        function k(a, b) {
                            return P.ae(a.Ba.x, a.Ba.y, a.Ha.x, a.Ha.y, b.a.x - L, b.a.y - L, Ea, Ea) || P.ae(a.va.x, a.va.y, a.wa.x, a.wa.y, b.a.x - L, b.a.y - L, Ea, Ea)
                        }
                        var d, f;
                        d = 0;
                        for (f = this.Ge.length; d < f; d++) this.Ge[d].update(a);
                        this.p(a);
                        this.Gb.update(a);
                        this.Ye && this.Ye.update(a);
                        for (d = 0; d < I.fd; d++)
                            for (var g = this.Mk[d], h = g.length, m = 0; m < h;) {
                                var n = g[m];
                                f = q.xd(n.color.G, 0, 10, a);
                                n.color.G = f.value;
                                f.Bd ? (g.splice(m, 1), h--) : m++
                            }
                        d = 0;
                        for (f = this.Vd.length; d < f; d++) this.Vd[d].update(a);
                        this.Cl = q.Ve(this.Cl, 0, 1, a);
                        d = v.Bb;
                        g = v.fb;
                        h = 2 != this.M ? this.la : this.aa;
                        f = h.a.y - g / 2;
                        d = p.rh(h.a.x - d / 2, 0, this.wd - d);
                        g = p.rh(f, 0, this.vd - g);
                        this.$.moveTo(d, g, !1);
                        this.Zy && this.$.type === x.gd.Nj || this.$.update(a);
                        if (this.$.type === x.gd.Zg) {
                            f = v.sm;
                            var h = v.dn,
                                m = v.en,
                                n = v.Um,
                                r = v.Vm,
                                s = this.$.a.Ja(new H(d, g));
                            s < f && (this.Oe = !1);
                            this.Tt ? this.$.speed < v.fm && (this.$.speed *= 1.5) : s > this.hu / 2 ? (this.$.speed += a * h, this.$.speed = Math.min(n, this.$.speed)) : (this.$.speed -= a * m, this.$.speed = Math.max(r, this.$.speed));
                            1 > Math.abs(this.$.a.x - d) && 1 > Math.abs(this.$.a.y -
                                g) && (this.$.type = x.gd.Nj, this.$.speed = v.Jj)
                        } else this.time += a;
                        g = this.Ia.length;
                        if (0 < g) {
                            r = n = m = f = !1;
                            for (d = 0; d < g; d++) {
                                var w = this.Ia[d];
                                w.update(a);
                                h = w.ta;
                                w.Sa && h && (h.ab.a.x = w.x, h.ab.a.y = w.y, h.ab.Vc.qa(h.ab.a));
                                if (h) {
                                    if (h.Fb !== I.h && 0 === h.De) {
                                        w.It();
                                        continue
                                    }
                                    h.update(a * this.ka);
                                    if (w.Pc && (this.$.type == x.gd.Zg && this.Oe || w.OC(a), w.Bg === I.h)) {
                                        this.pC(w);
                                        break
                                    }
                                }
                                if (!w.ta && w.f !== I.h && w.f !== I.Kj) {
                                    var D = v.$n,
                                        s = function(a) {
                                            (new H(w.x, w.y)).Ja(a.a) <= w.f + D && (a = new V(null, w.x, w.y, a, a.a.x, a.a.y, w.f + D), a.ab.Vc.qa(a.ab.a),
                                                w.Hi = !0, w.Hv(a), A.N(E.Kn), w.Sa && A.N(E.un))
                                        };
                                    2 !== this.M ? (this.Wb || s(this.la), this.Xb || null != w.ta || s(this.Aa)) : (this.Xa || s(this.aa), this.hb || s(this.xa))
                                }
                                if (h) {
                                    var z = h.ab,
                                        s = h.Ea[h.Ea.length - 1],
                                        z = H.eb(z.a, s.a),
                                        F = !1;
                                    f || (2 !== this.M ? s !== this.la || this.Wb || m ? s !== this.Aa || this.Xb || n || (F = !0) : F = !0 : s !== this.aa || this.Xa || f ? s !== this.xa || this.hb || r || (F = !0) : F = !0);
                                    0 !== h.$p && h.Fb === I.h && F ? (z = K.Qh(z.Eh()), 2 !== this.M ? (F = s === this.la ? this.Ma : this.Na, h.kh || (h.Sc = F.rotation - z), s === this.la ? (this.Ri = z + h.Sc - F.rotation, m = !0) :
                                        (this.Si = z + h.Sc - F.rotation, n = !0), F.rotation = z + h.Sc) : s === this.aa ? (h.kh || (h.Sc = this.Ae.rotation - z), this.Qi = z + h.Sc - this.Ae.rotation, this.Ae.rotation = z + h.Sc, f = !0) : s === this.xa && (h.kh || (h.Sc = this.Be.rotation - z), this.rp = z + h.Sc - this.Be.rotation, this.Be.rotation = z + h.Sc, r = !0), h.kh = !0) : h.kh = !1
                                }
                            }
                            2 !== this.M ? (m || this.Wb || (this.Ma.rotation += Math.min(5, this.Ri), this.Ri *= 0.98), n || this.Xb || (this.Na.rotation += Math.min(5, this.Si), this.Si *= 0.98)) : (f || this.Xa || (this.Ae.rotation += Math.min(5, this.Qi), this.Qi *= 0.98), f || this.hb ||
                                (this.Be.rotation += Math.min(5, this.rp), this.rp *= 0.98))
                        }
                        this.Xa || (this.La.update(a), this.aa.update(a * this.ka));
                        this.hb || (this.Eb.update(a), this.xa.update(a * this.ka));
                        if (2 !== this.M) {
                            d = a * this.ka;
                            this.Ma.update(a);
                            this.la.update(d);
                            this.Na.update(a);
                            this.Aa.update(d);
                            if (1 === this.M)
                                for (d = 0; d < V.Jw; d++) this.la.Gl(), this.Aa.Gl();
                            if (0 < this.We)
                                if (f = q.xd(this.We, 0, 200, a), this.We = f.value, f.Bd) {
                                    A.N(E.wn);
                                    this.M = 2;
                                    this.Xa = !1;
                                    this.Xb = this.Wb = !0;
                                    if (this.ic || this.vc) this.hc = this.ic ? this.ic : this.vc, this.xk.visible = !0;
                                    this.Si = this.Ri = this.Qi = 0;
                                    this.aa.a.x = this.la.a.x;
                                    this.aa.a.y = this.la.a.y;
                                    this.La.x = this.aa.a.x;
                                    this.La.y = this.aa.a.y;
                                    this.La.mi();
                                    d = H.eb(this.la.a, this.la.ma);
                                    f = H.eb(this.Aa.a, this.Aa.ma);
                                    d = new H((d.x + f.x) / 2, (d.y + f.y) / 2);
                                    this.aa.ma.qa(this.aa.a);
                                    this.aa.ma.eb(d);
                                    d = 0;
                                    for (f = this.Ia.length; d < f; d++) w = this.Ia[d], !(h = w.ta) || h.Fb === h.Ea.length - 3 || h.tb !== this.la && h.tb !== this.Aa || (z = h.Ea[h.Ea.length - 2], m = h.tb.Dd(z), this.aa.If(z, m, S.Oj), h.tb = this.aa, h.Ea[h.Ea.length - 1] = this.aa, h.Sc = 0, h.kh = !1);
                                    d = new na;
                                    d.sa(E.qc);
                                    d.ya();
                                    d.x = this.La.x;
                                    d.y = this.La.y;
                                    d.anchor = W.T;
                                    z = d.tc(0.05, T.ga.$a, 21, 25);
                                    d.yc(z).cb = this.Qa.ef();
                                    d.S(0);
                                    this.Qa.U(d)
                                } else this.la.yk(this.Aa, this.We), this.Aa.yk(this.la, this.We);
                            this.Wb || this.Xb || 0 !== this.M || !M.yh(this.Ma, this.Na) || (this.M = 1, this.We = this.la.a.Ja(this.Aa.a), this.la.If(this.Aa, this.We, S.ek), this.Aa.If(this.la, this.We, S.ek))
                        }
                        this.Xa || this.hb || (d = this.aa.a.Ja(this.xa.a), d <= 1.8 * (this.La.ba.O / 2) ? (this.pz(this.aa, this.xa, a), this.Bo || (A.N(E.vn), this.Bo = !0)) : this.Bo = !1, this.Hz =
                            d);
                        this.target.update(a);
                        this.Ab && this.Ab.update(a);
                        if (this.$.type !== x.gd.Zg || !this.Oe)
                            for (d = 0, f = this.Lb.length; d < f; d++)
                                if (m = this.Lb[d], m.update(a), 0 < m.timeout && 0 === m.time) {
                                    m.yc(1).cb = this.Qa.ef();
                                    this.Qa.U(m);
                                    this.Lb.splice(d, 1);
                                    m.Fc.S(1);
                                    m.S(1);
                                    break
                                } else if (h = !1, n = this.qi, 2 !== this.M ? h = M.yh(this.Ma, m) && !this.Wb || M.yh(this.Na, m) && !this.Xb : (h = M.yh(this.La, m) && !this.Xa, h || !M.yh(this.Eb, m) || this.hb || (h = !0, n = this.ri)), h) {
                            n.S(1);
                            this.Nh++;
                            this.bp[this.Nh - 1].S(0);
                            f = new na;
                            f.sa(E.Im);
                            f.ya();
                            f.x = m.x;
                            f.y =
                                m.y;
                            f.anchor = W.T;
                            h = f.tc(0.05, T.ga.$a, 0, 12);
                            f.yc(h).cb = this.Qa.ef();
                            f.S(0);
                            this.Qa.U(f);
                            this.Lb.splice(d, 1);
                            A.N(E.Qn + this.Nh - 1);
                            this.target.ju() && this.target.Vu();
                            this.Ab.ju() && this.Ab.Vu();
                            break
                        }
                        d = 0;
                        for (f = this.bubbles.length; d < f; d++) {
                            h = this.bubbles[d];
                            h.update(a);
                            if (!h.Up)
                                if (2 != this.M) {
                                    if (!this.Wb && this.$k(h, this.Ma, this.ic, this.ld)) {
                                        this.ic = h;
                                        break
                                    }
                                    if (!this.Xb && this.$k(h, this.Na, this.vc, this.md)) {
                                        this.vc = h;
                                        break
                                    }
                                } else {
                                    if (!this.Xa && this.$k(h, this.La, this.hc, this.xk)) {
                                        this.hc = h;
                                        break
                                    }
                                    if (!this.hb &&
                                        this.$k(h, this.Eb, this.Qd, this.Ao)) {
                                        this.Qd = h;
                                        break
                                    }
                                }
                            if (!h.Dq)
                                for (r = this.Ua.length, n = 0; n < r; n++) m = this.Ua[n], H.Ja(h.x, h.y, m.x, m.y) < m.Yb && (h.Dq = !0)
                        }
                        d = 0;
                        for (f = this.Hg.length; d < f; d++) h = this.Hg[d], h.update(a);
                        d = 0;
                        for (f = this.je.length; d < f; d++) h = this.je[d], h.update(a);
                        r = -1;
                        d = 0;
                        for (f = this.Ua.length; d < f; d++) {
                            m = this.Ua[d];
                            for (n = 0; n < g; n++) w = this.Ia[n], h = m.Lc.indexOf(w), s = H.Ja(w.x, w.y, m.x, m.y), s <= m.Yb + 5 * this.Q ? 0 > h && m.Lc.push(w) : 0 <= h && m.Lc.splice(w, 1);
                            z = this.bubbles.length;
                            for (n = 0; n < z; n++) h = this.bubbles[n], s =
                                H.Ja(h.x, h.y, m.x, m.y), F = m.Lc.indexOf(h), s <= m.Yb + 10 * this.Q ? 0 > F && m.Lc.push(h) : 0 <= F && m.Lc.splice(h, 1);
                            m.fB && (r = d);
                            m.update(a)
                        }
                        0 <= r && this.Ua.splice(r, 1);
                        d = 0;
                        for (f = this.vv.length; d < f; d++) g = this.vv[d], g.update(a);
                        d = 0;
                        for (f = this.Ag.length; d < f; d++) {
                            m = this.Ag[d];
                            m.update(a);
                            g = q.xd(m.Uk, 0, 1, a);
                            m.Uk = g.value;
                            g.Bd && (m.state = l.Z.IDLE);
                            n = m.rotation;
                            m.rotation = 0;
                            m.Zb();
                            g = this.aa.jc.copy();
                            h = this.xa.jc.copy();
                            g.rotate(K.bc(-n));
                            h.rotate(K.bc(-n));
                            m.rotation = n;
                            m.Zb();
                            var n = this.aa.a.x - v.Ff,
                                r = this.aa.a.y - v.Ff,
                                s = this.xa.a.x -
                                v.Ff,
                                z = this.xa.a.y - v.Ff,
                                G = F = 2 * v.Ff;
                            if (0 <= g.y && (P.ae(m.Ba.x, m.Ba.y, m.Ha.x, m.Ha.y, n, r, F, G) || P.ae(m.va.x, m.va.y, m.wa.x, m.wa.y, n, r, F, G))) {
                                if (m.state === l.Z.IDLE) {
                                    for (n = 0; n < f; n++)
                                        if (d = this.Ag[n], d !== m && d.group === m.group) {
                                            m.state = l.Z.hs;
                                            d.state = l.Z.Ps;
                                            this.yg(this.aa);
                                            this.vB = 0.9 * this.aa.mc.Oc() * v.fk;
                                            this.vj = d;
                                            m.xb.S(0);
                                            m.xb.visible = !0;
                                            A.N(E.bh);
                                            this.Gb.uc(this, this.cw, null, 0.1);
                                            break
                                        }
                                    break
                                }
                            } else if (0 <= h.y && (P.ae(m.Ba.x, m.Ba.y, m.Ha.x, m.Ha.y, s, z, F, G) || P.ae(m.va.x, m.va.y, m.wa.x, m.wa.y, s, z, F, G))) {
                                if (m.state ===
                                    l.Z.IDLE) {
                                    for (n = 0; n < f; n++)
                                        if (d = this.Ag[n], d !== m && d.group === m.group) {
                                            m.state = l.Z.hs;
                                            d.state = l.Z.Ps;
                                            this.yg(this.xa);
                                            this.wB = 0.9 * this.xa.mc.Oc() * v.fk;
                                            this.wj = d;
                                            m.xb.S(0);
                                            m.xb.visible = !0;
                                            A.N(E.bh);
                                            this.Gb.uc(this, this.cw, null, 0.1);
                                            break
                                        }
                                    break
                                }
                            } else m.state !== l.Z.IDLE && 0 === m.Uk && (m.Uk = l.Pw)
                        }
                        d = 0;
                        for (f = this.kc.length; d < f; d++) h = this.kc[d], h.update(a), g = q.xd(h.Aj, 0, 1, a), h.Aj = g.value, g.Bd && this.LA(h, a);
                        d = 0;
                        for (f = this.yl.length; d < f; d++) g = this.yl[d], g.update(a), this.Fb(g, null, null, !1);
                        var L = v.ao,
                            Ea = 2 * L;
                        d = 0;
                        for (f = this.ec.length; d < f; d++)
                            if (m = this.ec[d], m.update(a), !m.zi || m.Gk) {
                                g = n = h = !1;
                                2 !== this.M ? (h = !this.Wb && k(m, this.la)) ? g = !0 : h = !this.Xb && k(m, this.Aa) : (h = !this.Xa && k(m, this.aa), n = !this.hb && k(m, this.xa));
                                if (h) {
                                    2 !== this.M ? g ? this.ic && this.ij(!0) : this.vc && this.ij(!1) : this.hc && this.ij(!1);
                                    d = u.rd(E.qc);
                                    h = new e(5, d);
                                    this.Pa && !this.ag && (h.sd.y = -500, h.b = 90);
                                    h.cb = this.Qa.Pp();
                                    2 != this.M ? g ? (h.x = this.Ma.x, h.y = this.Ma.y, this.Wb = !0) : (h.x = this.Na.x, h.y = this.Na.y, this.Xb = !0) : (h.x = this.La.x, h.y = this.La.y, this.Xa = !0);
                                    h.tq(5);
                                    this.Qa.U(h);
                                    A.N(E.kk);
                                    this.yg(this.aa);
                                    0 !== this.Ed && this.Gb.uc(this, this.Di, null, 0.3);
                                    return
                                }
                                if (n) {
                                    this.Qd && this.Tp(!1);
                                    d = u.rd(E.qc);
                                    h = new e(5, d);
                                    this.Pa && !this.ag && (h.sd.y = -500, h.b = 90);
                                    h.cb = this.Qa.Pp();
                                    h.x = this.Eb.x;
                                    h.y = this.Eb.y;
                                    this.hb = !0;
                                    h.tq(5);
                                    this.Qa.U(h);
                                    A.N(E.kk);
                                    this.yg(this.xa);
                                    0 !== this.Ed && this.Gb.uc(this, this.Di, null, 0.3);
                                    return
                                }
                            }
                        var B = v.am,
                            X = 2 * B;
                        d = 0;
                        for (f = this.ki.length; d < f; d++) m = this.ki[d], m.update(a), g = n = h = !1, 2 !== this.M ? (h = !this.Wb && c(m, this.la)) ? g = !0 : h = !this.Xb && c(m, this.Aa) : (h = !this.Xa && c(m, this.aa), n = !this.hb && c(m, this.xa)), h ? 2 !== this.M ? g ? this.Rk(m, this.la, a) : this.Rk(m, this.Aa, a) : this.Rk(m, this.aa, a) : n ? this.Rk(m, this.xa, a) : m.Sv = !1;
                        var N = v.Nq * (this.Pa && !this.ag ? -1 : 1),
                            J = v.Mq;
                        0 === this.M && (this.ic && b(this.la), this.vc && b(this.Aa));
                        if (1 === this.M) {
                            if (this.ic || this.vc) b(this.la), b(this.Aa)
                        } else this.hc && b(this.aa), this.Qd && b(this.xa);
                        if (!this.Xa || !this.hb)
                            if (this.Rd || (this.xp ? 0 < this.Wi && (this.Wi = q.Ve(this.Wi, 0, 1, a), 0 >= this.Wi && (d = new H(this.target.x, this.target.y), this.Nl(d) ?
                                    this.Wi = 1 : (this.xp = !1, this.target.Zu(), A.N(E.lk)))) : (d = new H(this.target.x, this.target.y), this.Nl(d) && (this.xp = !0, this.target.$u(), A.N(E.mk), this.Wi = 1))), this.ze || (this.yp ? 0 < this.Xi && (this.Xi = q.Ve(this.Xi, 0, 1, a), 0 >= this.Xi && (d = new H(this.Ab.x, this.Ab.y), this.Nl(d) ? this.Xi = 1 : (this.yp = !1, this.Ab.Zu(), d = this.op ? E.En : E.lk, A.N(d)))) : (d = new H(this.Ab.x, this.Ab.y), this.Nl(d) && (this.yp = !0, this.Ab.$u(), d = this.op ? E.Fn : E.mk, A.N(d), this.Xi = 1))), 0 !== this.Ed) {
                                this.Xa || (!this.Rd && this.Fk(this.La, this.Ae, this.Co,
                                    this.hc, this.target, this.aa) && (this.Xa = this.Rd = !0), !this.ze && this.Fk(this.La, this.Ae, this.Co, this.hc, this.Ab, this.aa) && (this.Xa = this.ze = !0));
                                this.hb || (!this.Rd && this.Fk(this.Eb, this.Be, this.Do, this.Qd, this.target, this.xa) && (this.hb = this.Rd = !0), !this.ze && this.Fk(this.Eb, this.Be, this.Do, this.Qd, this.Ab, this.xa) && (this.hb = this.ze = !0));
                                if (this.Rd && this.ze) {
                                    this.bz();
                                    return
                                }
                                if (this.Xa && this.hb && (!this.Rd || !this.ze)) {
                                    this.Di();
                                    return
                                }
                            }
                        d = 2 === this.M && this.sl(this.aa) && !this.Xa;
                        g = 2 === this.M && this.sl(this.xa) &&
                            !this.hb;
                        f = 2 !== this.M && this.sl(this.la) && !this.Wb;
                        h = 2 !== this.M && this.sl(this.Aa) && !this.Xb;
                        if (d || f || h || g)
                            if (d && (this.Xa = !0), g && (this.hb = !0), f && (this.Wb = !0), h && (this.Xb = !0), 0 !== this.Ed) {
                                if (2 != this.M && this.Wb && this.Xb) return;
                                this.Di();
                                return
                            }
                        if (0 !== this.P && 1 === this.P && (d = v.hm, !this.Xa && null != this.hc && this.La.y < d || !this.hb && null != this.Qd && this.Eb.y < d)) {
                            d = this.P = 0;
                            for (f = this.Hg.length; d < f; d++) h = this.Hg[d], 5 === h.P && h.S(0);
                            d = 0;
                            for (f = this.je.length; d < f; d++) h = this.je[d], 5 === h.P && h.S(0)
                        }
                        if (this.Go && !this.Oe &&
                            (this.tv(), d = new H(0, 0), g = H.add(this.Rl, this.$.a), h = (d = this.$t(d, g.x, g.y)) ? d.ta : null)) {
                            n = !1;
                            this.Pa && this.Pa.kb(this.Pa.np() ? 1 : 0).hg(g.x, g.y, !0) && (n = !0);
                            if (this.hc || 2 != this.M && (this.ic || this.vc))
                                for (d = 0, f = this.bubbles.length; d < f; d++) {
                                    m = this.bubbles[d];
                                    m = v.cm;
                                    r = 2 * m;
                                    if (this.hc && P.Kb(g.x, g.y, this.aa.a.x - m, this.aa.a.y - m, r, r)) {
                                        n = !0;
                                        break
                                    }
                                    if (this.ic && P.Kb(g.x, g.y, this.la.a.x - m, this.la.a.y - m, r, r)) {
                                        n = !0;
                                        break
                                    }
                                    if (this.vc && P.Kb(g.x, g.y, this.Aa.a.x - m, this.Aa.a.y - m, r, r)) {
                                        n = !0;
                                        break
                                    }
                                }
                            d = 0;
                            for (f = this.ec.length; d <
                                f; d++) m = this.ec[d], m.dc && m.dc.hg(g.x, g.y, !0) && (n = !0);
                            d = 0;
                            for (f = this.kc.length; d < f; d++)
                                if (this.kc[d].Sp(g.x, g.y)) {
                                    n = !0;
                                    break
                                }
                            d = 0;
                            for (f = this.Ua.length; d < f; d++) {
                                m = this.Ua[d];
                                if (m.Gc.visible || m.Hc.visible) {
                                    n = !0;
                                    break
                                }
                                if (H.Ja(g.x, g.y, m.td.x, m.td.y) <= v.ue || H.Ja(g.x, g.y, m.td.x, m.td.y) <= v.ue) {
                                    n = !0;
                                    break
                                }
                            }
                            d = 0;
                            for (f = this.Ia.length; d < f; d++) {
                                w = this.Ia[d];
                                if (w.g && P.Kb(g.x, g.y, w.x - v.dd, w.y - v.dd, 2 * v.dd, 2 * v.dd)) {
                                    n = !0;
                                    break
                                }
                                if (0 < w.i && (P.Kb(g.x, g.y, w.x - v.mf, w.y - v.mf, 2 * v.mf, 2 * v.mf) || w.pg !== I.h)) {
                                    n = !0;
                                    break
                                }
                            }
                            n || (h.highlighted = !0)
                        }
                        f = q.xd(this.Qf, 0, 1, a);
                        this.Qf = f.value;
                        f.Bd && (0 === this.Ed ? (this.Ed = 1, this.hide(), this.show(), this.Qf = I.km) : this.Ed = I.h)
                    },
                    Nl: function(a) {
                        var b = v.Wm;
                        return !this.Xa && this.aa.a.Ja(a) < b || !this.hb && this.xa.a.Ja(a) < b ? !0 : !1
                    },
                    $k: function(a, b, c, k) {
                        var d = v.dm,
                            e = 2 * d;
                        return P.Kb(b.x, b.y, a.x - d, a.y - d, e, e) ? (c && this.hj(a.x, a.y), k.visible = !0, A.N(E.rn), a.Up = !0, a.lv(0), !0) : !1
                    },
                    Fk: function(a, b, c, k, d, e) {
                        return M.yh(a, d) ? (d.ZA(), A.N(d.Fo), k && (a === this.Eb ? this.Tp() : this.ij(!1)), this.yg(e), a.Xe = !0, b.Y = b.da = 1, c.Y = c.da =
                            1, b = new T, b.D(w.Ra(a.x, a.y, w.F.LINEAR, 0)), b.D(w.Ra(d.x, d.y + 10, w.F.LINEAR, 0.1)), b.D(w.gl(0.71, 0.71, w.F.LINEAR, 0)), b.D(w.gl(0, 0, w.F.LINEAR, 0.1)), b.D(w.za(L.pb.copy(), w.F.LINEAR, 0)), b.D(w.za(L.Mb.copy(), w.F.LINEAR, 0.1)), a.Rb(b, 0), a.S(0), b.cb = this.Qa.ef(), this.Qa.U(a), !0) : !1
                    },
                    cw: function() {
                        this.vj && (this.dw(this.aa, this.vj, this.vB), this.vj = null);
                        this.wj && (this.dw(this.xa, this.wj, this.wB), this.wj = null)
                    },
                    dw: function(a, b, c) {
                        b.xb.S(0);
                        b.xb.visible = !0;
                        var k = new H(0, v.Wn);
                        k.rotate(K.bc(b.rotation));
                        a.a.x = b.x;
                        a.a.y = b.y;
                        a.a.add(k);
                        a.ma.qa(a.a);
                        a.mc.x = 0;
                        a.mc.y = -1;
                        a.mc.rotate(K.bc(b.rotation));
                        a.mc.multiply(c);
                        a.jc.qa(a.mc);
                        a.jc.Lo(60);
                        a.ma.qa(a.a);
                        a.ma.eb(a.jc)
                    },
                    Xx: function() {
                        this.Ed = 0;
                        this.Qf = I.km
                    },
                    zz: function() {
                        return 0 === this.Ed
                    },
                    yg: function(a) {
                        for (var b = 0, c = this.Ia.length; b < c; b++) {
                            var k = this.Ia[b],
                                d = k.ta;
                            d && d.tb === a && (d.Fb === I.h ? d.fq(d.Ea.length - 2) : d.fu = !0, k.Pc && k.Mh && this.qq(k))
                        }
                    },
                    my: function() {
                        this.zj = 100 * Math.max(0, 30 - this.time);
                        this.zj /= 10;
                        this.zj *= 10;
                        this.qC = 1E3 * this.Nh;
                        this.Hl = Math.ceil(this.zj +
                            this.qC)
                    },
                    bz: function() {
                        this.Gb.zo();
                        this.my();
                        this.yg(this.aa);
                        this.yg(this.xa);
                        var a = this;
                        F.Nv && this.Gb.uc(this, function() {
                            B.ra(B.w.Tm, {
                                Lb: a.Nh,
                                time: a.time,
                                Hl: a.Hl,
                                Vt: 1 / a.Ci.Kc
                            })
                        }, null, 1);
                        this.Gb.uc(this, function() {
                            A.uq(E.Nd)
                        }, null, 1.5);
                        this.Gb.uc(this, function() {
                            this.Ci.Fp.call(this.Ci)
                        }, null, 1.8)
                    },
                    Di: function() {
                        this.az || (this.az = !0, this.Gb.zo(), this.Rd || (this.target.Wu(), A.N(E.nk)), this.ze || (this.Ab.Wu(), A.N(this.op ? E.Gn : E.nk)), this.Gb.uc(this, function() {
                                this.Ci.AA.call(this.Ci);
                                B.ra(B.w.$w, {
                                    time: this.time
                                })
                            },
                            null, 1))
                    },
                    B: function() {
                        var a = N.context;
                        a.setTransform(1, 0, 0, 1, 0, 0);
                        a.clearRect(0, 0, v.Bb, v.fb);
                        this.Cc();
                        this.$.Zx();
                        this.back.yw(this.$.a);
                        this.back.B();
                        var b, c;
                        this.vd > v.fb && (c = this.Np.j[0].y, b = this.Np.d[0], a.drawImage(this.Np.Vb, b.x, b.y + 2, b.O, b.V - 4, 0, c + 2, b.O, b.V - 4));
                        a = 0;
                        for (b = this.Ge.length; a < b; a++) this.Ge[a].B();
                        a = 0;
                        for (b = this.Vd.length; a < b; a++) this.Vd[a].B();
                        this.Ye && this.Ye.B();
                        this.Pa && this.Pa.B();
                        this.target.B();
                        this.Ab && this.Ab.B();
                        a = 0;
                        for (b = this.Hg.length; a < b; a++) this.Hg[a].B();
                        a = 0;
                        for (b =
                            this.je.length; a < b; a++) c = this.je[a], 2 !== c.P && c.B();
                        a = 0;
                        for (b = this.yl.length; a < b; a++) this.yl[a].B();
                        a = 0;
                        for (b = this.Ua.length; a < b; a++) this.Ua[a].B();
                        a = 0;
                        for (b = this.bubbles.length; a < b; a++) this.bubbles[a].B();
                        a = 0;
                        for (b = this.kc.length; a < b; a++) this.kc[a].B();
                        a = 0;
                        for (b = this.ec.length; a < b; a++) this.ec[a].B();
                        a = 0;
                        for (b = this.ki.length; a < b; a++) this.ki[a].B();
                        a = 0;
                        for (b = this.Ag.length; a < b; a++) c = this.Ag[a], c.y -= 25, c.B(), c.y += 25;
                        c = this.Ia;
                        a = 0;
                        for (b = c.length; a < b; a++) c[a].Gy();
                        for (a = 0; a < b; a++) c[a].B();
                        a = 0;
                        for (b = this.Lb.length; a <
                            b; a++) this.Lb[a].B();
                        this.Xa || this.vj || (this.La.x = this.aa.a.x, this.La.y = this.aa.a.y, this.La.B(), null != this.qi.wb && this.qi.B());
                        this.hb || this.wj || (this.Eb.x = this.xa.a.x, this.Eb.y = this.xa.a.y, this.Eb.B(), null != this.ri.wb && this.ri.B());
                        2 !== this.M && (this.Wb || (this.Ma.x = this.la.a.x, this.Ma.y = this.la.a.y, this.Ma.B()), this.Xb || (this.Na.x = this.Aa.a.x, this.Na.y = this.Aa.a.y, this.Na.B()));
                        a = 0;
                        for (b = c.length; a < b; a++) {
                            var k = c[a];
                            k.Pc && k.Ky()
                        }
                        this.Qa.B();
                        this.Iy();
                        this.$.ny();
                        this.Oh.B();
                        a = 0;
                        for (b = this.je.length; a <
                            b; a++) c = this.je[a], 2 === c.P && c.B();
                        this.Bc()
                    },
                    Iy: function() {
                        for (var a = v.jm, b = 0; b < I.fd; b++) {
                            var c = this.Mk[b],
                                k = c.length;
                            if (0 < k) {
                                for (var d = 1, e = null, f = [], g = 0, h = 0; h < k; h++) e = c[h], 0 === h && (f[g++] = e.start), f[g++] = e.end;
                                h = null;
                                k *= 2;
                                c = [];
                                e = 1 / k;
                                for (g = 0;;) {
                                    1 < g && (g = 1);
                                    h = H.ky(f, g);
                                    c.push(h);
                                    if (1 === g) break;
                                    g += e
                                }
                                f = a / k;
                                e = [];
                                h = 0;
                                for (g = k - 1; h < g; h++) {
                                    var l = d,
                                        m = h === k - 1 ? 1 : d + f,
                                        n = c[h],
                                        p = c[h + 1],
                                        u = H.eb(p, n);
                                    u.normalize();
                                    var r = H.aB(u),
                                        u = H.Uu(u),
                                        s = H.add(n, H.multiply(r, l)),
                                        l = H.add(n, H.multiply(u, l));
                                    e.push(l);
                                    e.push(s);
                                    r = H.add(p,
                                        H.multiply(r, m));
                                    m = H.add(p, H.multiply(u, m));
                                    e.push(m);
                                    e.push(r);
                                    d += f
                                }
                                N.Uy(e, L.Vl.rk)
                            }
                        }
                    },
                    Tk: function(a, b, c, k) {
                        var d = v.gk;
                        if (c.cB(a.x - d, a.y - d, a.x + d, a.y + d)) {
                            var e = new H(0, 0),
                                f = new H(0, 0),
                                g = new H(c.x, c.y);
                            e.x = a.x - a.ba.O / 2;
                            f.x = a.x + a.ba.O / 2;
                            e.y = f.y = a.y;
                            0 != a.b && g.pa(-a.b, a.x, a.y);
                            g.y < e.y && P.lj(g.x - c.ba.O / 2, g.y - c.ba.V / 2, g.x + c.ba.O / 2, g.y + c.ba.V / 2, e.x, e.y - d, f.x, f.y) && (c = new H(0, -(2 * d * (d - (e.y - g.y)) / d)), c.rotate(a.b), b.ji(c, k))
                        }
                    },
                    pz: function(a, b, c) {
                        var k = Math.abs(a.a.x - b.a.x),
                            d = Math.abs(a.a.y - b.a.y);
                        if (a.a.Ja(b.a) <
                            this.Hz) {
                            var e = 0 == k ? 70 : 5E3 / k,
                                f = 0 == d ? 70 : 5E3 / d,
                                e = 62.5,
                                f = 75,
                                d = (a.ma.x - a.a.x) * e,
                                k = (a.ma.y - a.a.y) * f,
                                e = (b.ma.x - b.a.x) * e,
                                g = (b.ma.y - b.a.y) * f,
                                f = new H(d - e, k - g),
                                d = new H(e - d, g - k);
                            a.ji(f, c);
                            b.ji(d, c)
                        }
                    },
                    Rk: function(a, b, c) {
                        if (!a.Sv) {
                            var k = H.eb(b.ma, b.a),
                                d = b.ma.copy();
                            d.pa(-a.b, a.x, a.y);
                            d = d.y < a.y ? -1 : 1;
                            k = Math.max(40 * k.Oc(), v.Iw) * d;
                            d = H.Uu(H.Vy(a.b));
                            d.multiply(k);
                            b.a.pa(-a.b, a.x, a.y);
                            b.ma.pa(-a.b, a.x, a.y);
                            b.ma.y = b.a.y;
                            b.a.pa(a.b, a.x, a.y);
                            b.ma.pa(a.b, a.x, a.y);
                            b.ji(d, c);
                            a.S(0);
                            A.N(E.qn)
                        }
                    },
                    LA: function(a, b) {
                        a.S(0);
                        A.N(p.lb(E.Hn,
                            E.In));
                        var c = u.rd(E.$j),
                            c = new h(5, c, K.Qh(a.b) - 90);
                        c.cb = this.Qa.Pp();
                        var k = new H(a.x + v.hn, a.y);
                        k.pa(a.b - Math.PI / 2, a.x, a.y);
                        c.x = k.x;
                        c.y = k.y;
                        c.tq(5);
                        this.Qa.U(c);
                        this.Xa || this.Tk(a, this.aa, this.La, b);
                        this.hb || this.Tk(a, this.xa, this.Eb, b);
                        2 !== this.M && (this.Wb || this.Tk(a, this.la, this.Ma, b), this.Xb || this.Tk(a, this.Aa, this.Na, b))
                    },
                    Fb: function(a, b, c, k) {
                        for (var d = 0, e = 0, f = this.Ia.length; e < f; e++) {
                            var g = this.Ia[e],
                                h = g.ta;
                            if (h && h.Fb === I.h)
                                for (var l = v.dd, m = 2 * l, n = 0, u = h.Ea.length - 1; n < u; n++) {
                                    var r = h.Ea[n],
                                        s = h.Ea[n +
                                            1],
                                        w = !1;
                                    a ? r.ma.x !== I.Yg && (w = P.lj(p.Au(r.a.x, r.ma.x, s.a.x, s.ma.x), p.Au(r.a.y, r.ma.y, s.a.y, s.ma.y), p.xu(r.a.x, r.ma.x, s.a.x, s.ma.x), p.xu(r.a.y, r.ma.y, s.a.y, s.ma.y), a.ea, a.fa, a.ea + a.width, a.fa + a.height)) : w = g.g && P.ae(b.x, b.y, c.x, c.y, g.x - l, g.y - l, m, m) ? !1 : p.Kz(b.x, b.y, c.x, c.y, r.a.x, r.a.y, s.a.x, s.a.y);
                                    if (w) return d++, g.Pc && g.Mh && this.qq(g), A.N(E.Jn + h.$p), h.fq(n), k && (h.De = 0, h.nv(n)), d
                                }
                        }
                        return d
                    },
                    qq: function(a) {
                        A.N(E.On);
                        a.Pc = !1;
                        var b = Q.create(E.ci, 11);
                        b.ya();
                        var c = new T;
                        this.Pa && !this.ag ? (c.D(w.Ra(a.c.x, a.c.y,
                            w.F.Ob, 0)), c.D(w.Ra(a.c.x, a.c.y + 50, w.F.Ob, 0.3)), c.D(w.Ra(a.c.x, a.c.y - v.fb, w.F.Ld, 1))) : (c.D(w.Ra(a.c.x, a.c.y, w.F.Ob, 0)), c.D(w.Ra(a.c.x, a.c.y - 50, w.F.Ob, 0.3)), c.D(w.Ra(a.c.x, a.c.y + v.fb, w.F.Ld, 1)));
                        c.D(w.Se(0, 0, 0));
                        c.D(w.Se(p.lb(-120, 120), 0, 1));
                        b.Rb(c, 0);
                        b.S(0);
                        b.x = a.c.x;
                        b.y = a.c.y;
                        b.anchor = W.T;
                        c.cb = this.Qa.ef();
                        this.Qa.U(b)
                    },
                    pC: function(a) {
                        A.N(E.Pn);
                        for (var b = 0, c = this.Ia.length; b < c; b++) {
                            var k = this.Ia[b],
                                d = k.ta;
                            d && d.tb === this.aa && (d.Fb !== I.h ? k.It() : (d.fq(d.Ea.length - 2), d.th = !1), k.Pc && k.Mh && a !== k && this.qq(k))
                        }
                        a.Pc = !1;
                        this.Xa = !0;
                        b = Q.create(E.ci, 12);
                        b.ya();
                        this.La.anchor = this.La.oa = W.T;
                        this.La.x = 0;
                        this.La.y = -5;
                        b.U(this.La);
                        c = new T;
                        this.Pa && !this.ag ? (c.D(w.Ra(a.c.x, a.c.y - 10, w.F.Ob, 0)), c.D(w.Ra(a.c.x, a.c.y + 70, w.F.Ob, 0.3)), c.D(w.Ra(a.c.x, a.c.y - v.fb, w.F.Ld, 1))) : (c.D(w.Ra(a.c.x, a.c.y - 10, w.F.Ob, 0)), c.D(w.Ra(a.c.x, a.c.y - 70, w.F.Ob, 0.3)), c.D(w.Ra(a.c.x, a.c.y + v.fb, w.F.Ld, 1)));
                        b.Rb(c, 0);
                        b.S(0);
                        b.x = a.c.x;
                        b.y = a.c.y - 10;
                        b.anchor = W.T;
                        c.cb = this.Qa.ef();
                        this.Qa.U(b);
                        0 !== this.Ed && this.Gb.uc(this, this.Di, null, 2)
                    },
                    ij: function(a) {
                        2 !==
                            this.M ? a ? (this.ic = null, this.ld.visible = !1, this.hj(this.Ma.x, this.Ma.y)) : (this.vc = null, this.md.visible = !1, this.hj(this.Na.x, this.Na.y)) : (this.hc = null, this.xk.visible = !1, this.hj(this.La.x, this.La.y))
                    },
                    Tp: function() {
                        this.Qd = null;
                        this.Ao.visible = !1;
                        this.hj(this.Eb.x, this.Eb.y)
                    },
                    hj: function(a, b) {
                        A.N(E.sn);
                        var c = new na;
                        c.sa(E.xm);
                        c.ya();
                        c.x = a;
                        c.y = b;
                        c.anchor = W.T;
                        var k = c.tc(0.05, T.ga.$a, 0, 11);
                        c.yc(k).cb = this.Qa.ef();
                        c.S(0);
                        this.Qa.U(c)
                    },
                    Sk: function(a, b, c) {
                        return P.Kb(b + this.$.a.x, c + this.$.a.y, a.a.x - v.Fj,
                            a.a.y - v.Fj, v.Gj, v.Gj) ? (a === this.xa ? this.Tp() : this.ij(a === this.la), !0) : !1
                    },
                    tv: function() {
                        for (var a = 0, b = this.Ia.length; a < b; a++) {
                            var c = this.Ia[a].ta;
                            c && c.Fb === I.h && (c.highlighted = !1)
                        }
                    },
                    $t: function(a, b, c) {
                        var k = v.im,
                            d = null,
                            e = k;
                        b = new H(b, c);
                        c = 0;
                        for (var f = this.Ia.length; c < f; c++) {
                            var g = this.Ia[c],
                                h = g.ta;
                            if (h)
                                for (var l = 0, m = h.Bk.length; l < m; l++) {
                                    var n = h.Bk[l],
                                        p = n.Ja(b);
                                    p < k && p < e && (e = p, d = g, a.qa(n))
                                }
                        }
                        return d
                    },
                    jz: function(a, b) {
                        var c = null,
                            k = Number.MAX_VALUE,
                            d = a.copy(),
                            e = b.ta;
                        if (!e || e.Fb !== I.h) return null;
                        for (var f =
                                v.dd, g = 2 * f, h = 0, l = e.Ea.length - 1; h < l; h++) {
                            var m = e.Ea[h],
                                n = m.a.Ja(d);
                            n < k && (!b.g || P.Kb(m.a.x, m.a.y, b.x - f, b.y - f, g, g)) && (k = n, c = e, a.qa(m.a))
                        }
                        return c
                    },
                    yC: function(a, b, c) {
                        if (this.Oe) return this.$.type === x.gd.Zg && (this.Tt = !0), !0;
                        if (c >= I.fd) return !0;
                        this.ol = !1;
                        if (this.Pa && this.Pa.kb(this.Pa.np() ? 1 : 0).hg(a + this.$.a.x, b + this.$.a.y, !0)) return this.Yo = c, !0;
                        if (this.hc && this.Sk(this.aa, a, b) || this.Qd && this.Sk(this.xa, a, b) || 2 !== this.M && (this.ic && this.Sk(this.la, a, b) || this.vc && this.Sk(this.Aa, a, b))) return !0;
                        var k = new H(a,
                            b);
                        this.wi[c] || (this.wi[c] = !0, this.df[c].qa(k), this.Vp[c].qa(k));
                        var d, e, f = this.$.a,
                            k = a + f.x,
                            f = b + f.y;
                        d = 0;
                        for (e = this.ec.length; d < e; d++) {
                            var g = this.ec[d];
                            if (g.dc && g.Xl === I.h && g.dc.ml(k, f)) return g.Xl = c, !0
                        }
                        d = 0;
                        for (e = this.kc.length; d < e; d++)
                            if (g = this.kc[d], g.Sp(k, f)) return g.Aj = 0.05, g.touch = c, !0;
                        var g = null,
                            h = !1,
                            l = !1;
                        d = 0;
                        for (e = this.Ua.length; d < e; d++) {
                            var m = this.Ua[d],
                                n = H.Ja(k, f, m.wh.x, m.wh.y),
                                p = H.Ja(k, f, m.td.x, m.td.y);
                            if (n < v.ue && !m.eu() || p < v.ue) {
                                for (d += 1; d < e; d++) {
                                    var g = this.Ua[d],
                                        u = H.Ja(g.x, g.y, m.x, m.y);
                                    u + g.Yb <= m.Yb && (h = !0);
                                    u <= m.Yb + g.Yb && (l = !0)
                                }
                                m.Ui.x = k;
                                m.Ui.y = f;
                                m.dj = c;
                                n < v.ue && m.Cv(!0);
                                p < v.ue && m.Dv(!0);
                                g = m;
                                break
                            }
                        }
                        e = this.Ua.indexOf(g);
                        e != this.Ua.length - 1 && l && !h && (d = new T, d.D(w.za(L.Mb.copy(), w.F.LINEAR, 0)), d.D(w.za(L.pb.copy(), w.F.LINEAR, 0.2)), h = new T, h.D(w.za(L.pb.copy(), w.F.LINEAR, 0.2)), h.cb = $.proxy(this.EA, this), l = g.copy(), l.mt(h), l.S(0), g.mt(d), g.S(0), this.Ua[e] = l, this.Ua.push(g));
                        h = v.dd;
                        l = 2 * h;
                        m = v.mf;
                        n = 2 * m;
                        d = 0;
                        for (e = this.Ia.length; d < e; d++)
                            if (g = this.Ia[d], g.g && P.Kb(k, f, g.x - h, g.y - h, l, l) && (g.rz(k,
                                    f), g.Vh = c), 0 < g.i && P.Kb(k, f, g.x - m, g.y - m, n, n)) return g.pg = c, !0;
                        this.Go && (c = H.Ta(), (k = (g = this.$t(c, k, f)) ? g.ta : null) && k.highlighted && this.jz(c, g) && this.Fb(null, c, c, !1));
                        !this.Rd && this.target.rl(a, b) && (this.ol = !0);
                        return !0
                    },
                    vi: La(!0),
                    BC: function(a, b, c) {
                        if (this.Oe) return !0;
                        this.wi[c] = !1;
                        if (this.ol && this.target.rl(a, b)) return this.ol = !1, B.ra(B.w.as), !0;
                        this.ol = !1;
                        var k, d;
                        k = this.$.a;
                        var e = a + k.x,
                            f = b + k.y;
                        k = 0;
                        for (d = this.Ge.length; k < d; k++) {
                            var g = this.Ge[k];
                            if (g.Sp(e, f)) {
                                g.lq();
                                this.Ge.splice(k, 1);
                                break
                            }
                        }
                        this.Pa &&
                            this.Yo === c && (this.Pa.kb(this.Pa.np() ? 1 : 0).hg(a + this.$.a.x, b + this.$.a.y, !0) && (this.Pa.toggle(), this.Jb(sb.hr)), this.Yo = I.h);
                        k = 0;
                        for (d = this.ec.length; k < d; k++)
                            if (e = this.ec[k], e.dc && e.Xl === c && (e.Xl = I.h, e.dc.nl(a + this.$.a.x, b + this.$.a.y))) return !0;
                        k = 0;
                        for (d = this.Ua.length; k < d; k++) a = this.Ua[k], a.dj === c && (a.dj = I.h, a.pq = I.h, a.Cv(!1), a.Dv(!1));
                        k = 0;
                        for (d = this.Ia.length; k < d; k++) a = this.Ia[k], a.g && a.Vh === c && (a.Vh = I.h), 0 < a.i && a.pg === c && (a.pg = I.h);
                        return !0
                    },
                    AC: function(a, b, c) {
                        if (this.Oe || c >= I.fd) return !0;
                        var k =
                            new H(a, b),
                            d, e;
                        if (10 < this.df[c].Ja(k))
                            for (d = 0, e = this.kc.length; d < e; d++) {
                                var g = this.kc[d];
                                g.touch === c && 0 !== g.Aj && (g.Aj = 0)
                            }
                        this.Rl.qa(k);
                        a = new H(a + this.$.a.x, b + this.$.a.y);
                        d = 0;
                        for (e = this.Ua.length; d < e; d++)
                            if (b = this.Ua[d], b.dj === c) {
                                c = new H(b.x, b.y);
                                c.Ja(a) < b.Yb / 10 && b.Ui.qa(a);
                                d = H.eb(b.Ui, c);
                                k = H.eb(a, c).Eh() - d.Eh();
                                k > Math.PI ? k -= 2 * Math.PI : k < -Math.PI && (k += 2 * Math.PI);
                                b.wh.pa(k, b.x, b.y);
                                b.td.pa(k, b.x, b.y);
                                b.rotation += K.Qh(k);
                                d = 0 < k ? E.Ln : E.Mn;
                                0.07 > Math.abs(k) && (d = I.h);
                                b.pq != d && d != I.h && (A.N(d), b.pq = d);
                                d = 0;
                                for (e =
                                    this.Ia.length; d < e; d++) {
                                    var g = this.Ia[d],
                                        h = new H(g.x, g.y);
                                    h.Ja(c) <= b.Yb + 5 * this.Q && (h.pa(k, b.x, b.y), g.x = h.x, g.y = h.y, g.ta && (g.ta.ab.a.qa(h), g.ta.ab.Vc.qa(h)))
                                }
                                d = 0;
                                for (e = this.kc.length; d < e; d++) g = this.kc[d], h = new H(g.x, g.y), h.Ja(c) <= b.Yb + 5 * this.Q && (h.pa(k, b.x, b.y), g.x = h.x, g.y = h.y, g.rotation += K.Qh(k), g.Zb());
                                d = 0;
                                for (e = this.bubbles.length; d < e; d++) g = this.bubbles[d], h = new H(g.x, g.y), h.Ja(c) <= b.Yb + 10 * this.Q && g !== this.hc && g !== this.vc && g !== this.ic && (h.pa(k, b.x, b.y), g.x = h.x, g.y = h.y);
                                P.Kb(this.target.x, this.target.y,
                                    b.x - b.size, b.y - b.size, 2 * b.size, 2 * b.size) && (h = new H(this.target.x, this.target.y), h.pa(k, b.x, b.y), this.target.x = h.x, this.target.y = h.y);
                                b.Ui.qa(a);
                                return !0
                            }
                        d = 0;
                        for (e = this.Ia.length; d < e; d++)
                            if (b = this.Ia[d]) {
                                if (b.g && b.Vh === c) return b.qz(a), !0;
                                if (0 < b.i && b.pg === c) return b.m ? b.y = p.rh(a.y, b.jl, b.il) : b.x = p.rh(a.x, b.jl, b.il), b.ta && (d = b.ta.ab, d.a.x = d.Vc.x = b.x, d.a.y = d.Vc.y = b.y), !0
                            }
                        if (this.wi[c]) {
                            d = new f(H.add(this.df[c], this.$.a), H.add(k, this.$.a), 5, 5, L.Cw.copy());
                            a = this.Mk[c];
                            b = 0;
                            a.push(d);
                            d = 0;
                            for (e = a.length; d <
                                e; d++) g = a[d], b += this.Fb(null, g.start, g.end, !1);
                            0 < b && (this.Zy = !1, this.cq = 0 < this.cq && 0 < this.Cl ? this.cq + b : b, this.Cl = 0.1);
                            this.Vp[c].qa(this.df[c]);
                            this.df[c].qa(k)
                        }
                        return !0
                    },
                    zC: function(a, b, c) {
                        if (c > I.fd) return !1;
                        this.Rl.x = a;
                        this.Rl.y = b;
                        return !0
                    },
                    Jb: function() {
                        Sa.toggle();
                        this.ag = Sa.lu();
                        A.N(this.ag ? E.yn : E.zn);
                        for (var a = 0, b = this.Vd.length; a < b; a++) {
                            var c = this.Vd[a];
                            Sa.lu() ? c.S(Ka.tk.Ym) : c.S(Ka.tk.dt)
                        }
                    },
                    pB: function(a) {
                        for (var b = 0, c = this.ec.length; b < c; b++) this.ec[b].qb === a && this.ec[b].rB()
                    }
                })
            }(Ib, Jb, Kb,
                Lb, Mb, Qb, Rb, Sb, Tb, Ub, Vb, Wb, ba, pa, Xb, Yb, Zb, $b, da, ac, Qa, ra, oa, q, K, za, la, O, Z, qa, J, V, Ia, U, Q, qb, lb, Ca, Da, pb, mb, ia, R, aa, ca, $a, wa, cc, ab, dc, sa, ga, B, ec, ea, fc, rb,
                function(b, c, e, a, f, d, g, h) {
                    return {
                        sy: function() {
                            switch (b.Uc + 1) {
                                case 1:
                                    return new e;
                                case 2:
                                    return new a;
                                case 3:
                                    return new f;
                                case 4:
                                    return new d;
                                case 5:
                                    return new g;
                                case 6:
                                    return new h;
                                default:
                                    return new c
                            }
                        }
                    }
                }(Ia, rb, gc, hc, ic, jc, kc, lc)),
            qc = function(b, c, e, a, f) {
                var d = b.extend({
                    init: function() {
                        this.p()
                    },
                    B: function() {
                        for (var b = this.children, h = b.length, l = 0; l <
                            h; l++) {
                            var n = b[l];
                            n.visible && n.B()
                        }
                        h = this.kb(d.bd.cd);
                        0 < h.Qf && (b = h.Qf / f.km, h.zz() && (b = 1 - b), h = a.context, b = new e(1, 1, 1, b), h.fillStyle = b.qj(), h.fillRect(0, 0, c.Bb, c.fb))
                    },
                    show: function() {
                        this.p();
                        var a = this.kb(d.bd.cd);
                        a.Yx && a.Xx()
                    }
                });
                d.bd = {
                    cd: 0,
                    ND: 1,
                    QD: 2,
                    KD: 3,
                    OD: 4,
                    RD: 5
                };
                return d
            }(function(b, c) {
                return b.extend({
                    init: function() {
                        this.p();
                        this.width = c.Bb;
                        this.height = c.fb
                    }
                })
            }(da, J), J, Z, aa, K),
            rc = function(b, c, e, a, f) {
                return b.extend({
                    init: function(a) {
                        this.p(a);
                        this.ro = !1
                    },
                    hd: function() {
                        this.p();
                        a.gj(f.xn);
                        this.ty();
                        this.vz();
                        this.Pv(0)
                    },
                    ty: function() {
                        var a = new e,
                            b = new c;
                        b.Ci = this;
                        b.Yx = this.ro;
                        this.ro = !1;
                        a.ve(b, e.bd.cd);
                        this.Wx(a, 0)
                    },
                    vz: function() {
                        this.iq(!1);
                        this.Jz()
                    },
                    Jz: function() {
                        this.lp = !1
                    },
                    LE: function() {
                        this.lp = !1
                    },
                    Fp: function() {
                        a.N(f.Tn);
                        this.pd()
                    },
                    AA: function() {
                        this.Al()
                    },
                    iq: function(b) {
                        this.lp = b;
                        var c = this.Zf(0);
                        c && (c = c.kb(e.bd.cd)) && (c.fc = !b, c.Dj = !b, b ? a.SA() : a.mB())
                    },
                    Gh: function() {
                        var a = this.Zf(0);
                        a && (a = a.kb(e.bd.cd)) && (a.Qf = 0, this.iq(!0))
                    },
                    Ih: function() {
                        this.iq(!1)
                    },
                    Al: function() {
                        this.yy(0);
                        this.ro = !0;
                        this.hd()
                    },
                    kl: function(a, b) {
                        if (this.p(a, b)) return !0;
                        var c = this.Zf(0);
                        return c && (c = c.kb(e.bd.cd)) && c.fc ? (c.yC(a, b, 0), !0) : !1
                    },
                    Bu: function(a, b) {
                        if (this.p(a, b)) return !0;
                        var c = this.Zf(0);
                        return c && (c = c.kb(e.bd.cd)) && c.fc ? (c.zC(a, b, 0), !0) : !1
                    },
                    Cu: function(a, b) {
                        if (this.p(a, b)) return !0;
                        var c = this.Zf(0);
                        return c && (c = c.kb(e.bd.cd)) && c.fc ? (c.AC(a, b, 0), !0) : !1
                    },
                    Dh: function(a, b) {
                        if (this.p(a, b)) return !0;
                        var c = this.Zf(0);
                        return c && (c = c.kb(e.bd.cd)) && c.fc ? (c.BC(a, b, 0), !0) : !1
                    },
                    vi: function(a, b) {
                        if (this.p(a, b)) return !0;
                        var c = this.Zf(0);
                        return c && (c = c.kb(e.bd.cd)) && c.fc ? (c.vi(a, b, 0), !0) : !1
                    }
                })
            }(Za, pc, qc, oa, q, K),
            cb = function(b, c, e, a, f) {
                return new(c.extend({
                    init: function(a) {
                        this.p(a)
                    },
                    Vv: function(a, c) {
                        f.Vz(a, c);
                        this.Of === b.Z.di && this.hd();
                        var h = this.kb(3);
                        h && h.Gt();
                        h = new e(this);
                        this.ve(h, 3);
                        this.Px(3)
                    },
                    Gh: function() {
                        var a = this.kb(3);
                        a && a.Gh()
                    },
                    Ih: function() {
                        var a = this.kb(3);
                        a && a.Ih()
                    },
                    Al: function() {
                        var a = this.kb(3);
                        a && a.Al()
                    },
                    Yv: function() {
                        this.Ft()
                    },
                    Bz: function() {
                        if (this.Of === b.Z.di) return !1;
                        var a = this.kb(3);
                        return !a ||
                            a.Of === b.Z.di || a.lp ? !1 : !0
                    },
                    Ku: function(a) {
                        this.p(a);
                        3 == a && this.xy(3)
                    }
                }))
            }(Za, Gb, rc, U, Ia),
            db = function(b, c, e, a, f, d, g, h, l, n, r, m, p, q, x) {
                function z() {
                    h.ra(h.w.ln);
                    s.lh()
                }
                var s = {
                    Pl: function(a) {
                        b.Gh();
                        $(".popupOuterFrame").hide();
                        $(".popupInnerFrame").hide();
                        $("#popupWindow").fadeIn(500, function() {
                            $("#" + a).show();
                            $(".popupOuterFrame").fadeIn(500)
                        })
                    },
                    lh: function() {
                        l.N(n.ha);
                        $("#popupWindow").fadeOut(500, function() {
                            b.Ih()
                        })
                    },
                    Ov: function() {
                        l.N(n.ha);
                        s.Pl("payDialog")
                    },
                    kC: function() {
                        var b = $("#slowComputer");
                        b.children("img").remove();
                        var c = $(m.ia({
                                text: r.X(p.ws),
                                Jc: x.T,
                                width: 1200 * a.Nb,
                                scale: 1.25 * a.ib
                            })),
                            d = $(m.ia({
                                text: r.X(p.vs),
                                width: 1200 * a.Nb,
                                scale: 0.8 * a.ib
                            }));
                        d.css("margin-left", a.e(30));
                        b.append(c).append(d);
                        m.ia({
                            text: r.X(p.Ur),
                            Rc: "#slowComputerBtn img",
                            scale: 0.8 * a.ib
                        });
                        s.Pl("slowComputer")
                    }
                };
                h.subscribe(h.w.Pb, function() {
                    m.ia({
                        text: r.X(p.lo),
                        Hb: "payMessage",
                        width: a.e(650),
                        Jc: x.T,
                        scale: 0.8 * a.ib
                    });
                    m.ia({
                        text: r.X(p.Ij),
                        Hb: "payBtn",
                        scale: 0.6 * a.ib
                    })
                });
                $(function() {
                    $("#payImg").click(z);
                    $("#payBtn").click(z);
                    $("#payClose").click(s.lh);
                    $("#slowComputerBtn").click(s.lh);
                    $("#missingOkBtn").click(s.lh);
                    $("#resetNoBtn").click(s.lh)
                });
                return s
            }(cb, ya, Ha, J, S, va, Ta, V, oa, q, ga, fa, B, U, Q),
            tb = function(b, c, e, a, f, d, g, h, l, n, r, m, p, q, x) {
                function z(a) {
                    if (a === B) {
                        a = I[a];
                        var b = a.index;
                        a.Ni() && (n.N(r.ha), !1 === a.ug ? l.ra(l.w.ln) : h.zh(b) ? (p.ia({
                                text: m.X(q.Tq),
                                Hb: "missingLine1",
                                ua: !0
                            }), p.ia({
                                text: h.pj(b) - h.Gg(),
                                Hb: "missingCount",
                                ua: !0
                            }), p.ia({
                                text: m.X(q.Uq),
                                Hb: "missingLine2",
                                ua: !0
                            }), p.wc({
                                text: m.X(q.Vq),
                                Hb: "missingLine3",
                                ua: !0
                            }),
                            p.ia({
                                text: m.X(q.hx),
                                Hb: "missingOkBtn",
                                ua: !0
                            }), n.N(r.ha), x.Pl("missingStars")) : J.JA(b))
                    }
                }

                function s(a) {
                    T = a;
                    ka.setTransform(1, 0, 0, 1, 0, 0);
                    ka.clearRect(0, 0, X.width, X.height);
                    var b = w + a,
                        c = f.e(130);
                    ka.translate(b, c);
                    for (var k = 0, d = 0; d < I.length; d++) {
                        var e = null,
                            g = a + k,
                            h = I[d];
                        h.visible && (g > f.e(-100) && g < f.e(100) && (e = -1 * (w + a) - k + f.e(452)), ka.translate(k, 0), h.B(ka, e), ka.translate(-k, 0), k += L)
                    }
                    ka.translate(-b, -c)
                }

                function G(a) {
                    function b() {
                        if (M) {
                            var a = Date.now() - U;
                            T = e.Rf(a, O, R - O, c);
                            s(T);
                            5 > Math.abs(T - R) && (H = !0);
                            a >=
                                c ? (v != I[B] && (v = I[B], v.rt(ka)), v && v.aj && v.aj(), M = !1) : window.requestAnimationFrame(b)
                        }
                    }
                    0 > a && (a = 0);
                    a > I.length - 1 && (a = I.length - 1);
                    var c = a == B ? 0 : 550;
                    v && v != I[a] && v.cj && v.cj();
                    B = a;
                    l.ra(l.w.Ls, I[B].index);
                    O = T;
                    R = -1 * L * a;
                    U = Date.now();
                    M = !0;
                    b();
                    W.find("div").toggleClass("boxNavDisabled", 0 >= a);
                    Ja.find("div").toggleClass("boxNavDisabled", a >= I.length - 1)
                }

                function k() {
                    M = !1;
                    null != v && v.zt()
                }

                function D(a, b) {
                    if (H && null != v && v.Ni()) {
                        var c = document.getElementById("gameArea").getBoundingClientRect().width,
                            k = document.getElementById("gameArea").getBoundingClientRect().height;
                        if (a > c / 3 && a < c * (2 / 3) && b > k / 3 && b < k * (2 / 3)) return !0
                    }
                    return !1
                }

                function u(a) {
                    k();
                    S = a;
                    N = T;
                    V = !0
                }

                function F(a, b) {
                    V ? (k(), Q = a - S, 5 < Math.abs(Q) && (H = !1, s(N + Q))) : $(X).toggleClass("ctrPointer", D(a, b))
                }

                function A(a, b) {
                    if (V)
                        if (k(), Q = a - S, Math.abs(Q) > L / 2) {
                            P = T;
                            var c = Math.round(-1 * P / L);
                            G(c)
                        } else 5 < Math.abs(Q) ? (c = f.e(30), G(Q > c ? B - 1 : Q < -1 * c ? B + 1 : B)) : (c = I[B], c.Ni() && (c.ig || G(B), D(a, b) && z(B)));
                    V = !1
                }

                function E(a, b) {
                    A(a, b)
                }
                var I = [],
                    B = 0,
                    T = 0,
                    H = !0,
                    L = f.e(600),
                    w = f.e(312),
                    v = null,
                    J = null,
                    X, ka, W, Ja, K = new c(b.ad, "boxPanel", "menuBackground", !0);
                $(function() {
                    X = document.getElementById("boxCanvas");
                    ka = X.getContext("2d");
                    X.width = f.e(1024);
                    X.height = f.e(576);
                    W = $("#boxNavBack").click($.proxy(function() {
                        0 < B && (G(B - 1), n.N(r.ha))
                    }, this));
                    Ja = $("#boxNavForward").click($.proxy(function() {
                        B < I.length - 1 && (G(B + 1), n.N(r.ha))
                    }, this));
                    $("#boxUpgradePlate").click(function() {
                        z(B)
                    })
                });
                l.subscribe(l.w.mo, function(a) {
                    I = a;
                    K.Yp()
                });
                K.init = function(a) {
                    J = a
                };
                K.bj = function() {
                    this.hd()
                };
                K.Ep = function() {
                    this.pd()
                };
                K.oC = function() {
                    G(B + 1)
                };
                K.nC = function() {
                    G(0)
                };
                K.dy = function() {
                    null !=
                        v && null != ka && (v.zt(), v.rt(ka))
                };
                var M = !1,
                    O, R, U, V = !1,
                    P = 0,
                    N = 0,
                    Q = 0,
                    S = null;
                K.yd = null;
                K.hd = function() {
                    this.yd || (this.yd = new a({
                        element: X,
                        Jp: $.proxy(u, this),
                        Gp: $.proxy(F, this),
                        Dp: $.proxy(A, this),
                        Hp: $.proxy(E, this),
                        Gi: function() {
                            return d.bu()
                        }
                    }));
                    this.yd.hd()
                };
                K.pd = function() {
                    this.yd && this.yd.pd()
                };
                K.Yp = function() {
                    G(B)
                };
                return K
            }(ya, Ha, ua, Xa, J, Ya, S, va, V, oa, q, ga, fa, B, db),
            Ta = function(b, c, e, a, f, d, g, h, l, n, r) {
                var m = new function() {
                    function p() {
                        if (s) {
                            x.bb = 0;
                            x.Tb = 1;
                            var k = d.ut,
                                f = d.iy,
                                g, m, p, r, I;
                            z = [];
                            g = 0;
                            for (m = f.length; g <
                                m; g++) {
                                p = f[g];
                                r = a.pj(g);
                                I = a.zh(g);
                                switch (p) {
                                    case e.Qw:
                                        p = new c(g, k[g], r, I, p);
                                        p.wz() || (p = null);
                                        break;
                                    case e.fs:
                                        p = new h(g, k[g], r, I, p);
                                        break;
                                    case e.Zr:
                                        p = new l(g, k[g], r, I, p);
                                        break;
                                    case e.Od:
                                        p = new n(g, k[g], r, I, p);
                                        break;
                                    default:
                                        p = new b(g, k[g], r, I, p)
                                }
                                p && z.push(p)
                            }
                            q()
                        }
                    }

                    function q() {
                        var a = [],
                            b, c, d;
                        b = 0;
                        for (d = z.length; b < d; b++) c = z[b], c.index = b, c.visible && a.push(c);
                        f.ra(f.w.mo, a)
                    }
                    var x = this,
                        z = [];
                    f.subscribe(f.w.Ls, function(a) {
                        m.bb = a;
                        m.Tb = 1
                    });
                    var s = !1;
                    this.jd = function() {
                        s = !0;
                        p()
                    };
                    x.bb = 0;
                    x.Tb = 1;
                    var G = !1;
                    f.subscribe(f.w.gi,
                        function(a) {
                            G = a
                        });
                    this.al = function() {
                        return a.zh(this.bb) || a.Tc(this.bb) <= this.Tb ? !1 : G || !d.Ch ? !0 : !d.Ch(this.bb, this.Tb)
                    };
                    f.subscribe(f.w.bo, p);
                    f.subscribe(f.w.co, p);
                    f.subscribe(f.w.mn, p);
                    f.subscribe(f.w.em, p);
                    this.qv = function() {
                        for (var a = 0, b = 0, c = z.length; b < c; b++) z[b].Pi() && a++;
                        return a
                    };
                    this.$A = function() {
                        for (var b = 0, c = z.length, d = 0; d < c; d++) z[d].Pi() && (b += a.bv(d));
                        return b
                    };
                    this.lB = function() {
                        r.nC();
                        p();
                        r.Yp()
                    };
                    this.uw = function() {
                        var b = z.length,
                            c = !1,
                            d, e;
                        for (d = 1; d < b; d++) e = z[d], !a.zh(d) && e.ug && e.ig &&
                            (e.ig = !1, c = !0, a.af(d, 0, 0));
                        c && r.Yp()
                    };
                    f.subscribe(f.w.gi, function(b) {
                        b = b || !0 === g.Sh;
                        var c = d.Ch || La(!1),
                            f, h, l;
                        f = 1;
                        for (h = z.length; f < h; f++) switch (l = z[f], l.type) {
                            case e.fs:
                                l.visible = !b;
                                break;
                            case e.Zr:
                                l.visible = b;
                                break;
                            default:
                                l.ug = b || !c(f, 0), l.ig = !l.ug || a.zh(f)
                        }
                        q()
                    })
                };
                return m
            }(Ga, Db, ma, va, V, U, ta, Eb, Fb, jb, tb),
            eb = function(b, c, e) {
                var a = new Image,
                    f = new Image,
                    d = c.e(522),
                    g = c.e(640);
                a.src = e.Hh + "time/left_door.png";
                f.src = e.Hh + "time/right_door.png";
                b.Rt = !0;
                b.jd = ha();
                b.Dc = function(c, e) {
                    var n = b.canvas,
                        r = n.getContext("2d"),
                        m = e || 0;
                    r.save();
                    r.setTransform(1, 0, 0, 1, 0, 0);
                    r.clearRect(0, 0, n.width, n.height);
                    r.restore();
                    r.drawImage(a, d * (1 - m) - d, 0);
                    r.drawImage(f, n.width - g * (1 - m), 0)
                };
                b.Ct = b.Ou = function(a) {
                    a()
                };
                b.nq = function() {
                    $("#doorGradient").fadeIn()
                };
                b.ap = function() {
                    $("#doorGradient").fadeOut()
                };
                return b
            }(function(b, c, e, a, f) {
                var d = [],
                    g = new Image,
                    h = new Image,
                    l = {};
                $(function() {
                    l.canvas = document.getElementById("levelCanvas");
                    l.canvas.width = b.e(1024);
                    l.canvas.height = b.e(576)
                });
                l.Rt = !1;
                l.jd = function() {
                    for (var a = 0, b = c.uo.length; a <
                        b; a++) {
                        var f = new Image;
                        f.src = e.$c + c.uo[a];
                        d[a] = f
                    }
                    g.src = e.$c + "leveltape_left.png";
                    h.src = e.$c + "leveltape_right.png"
                };
                l.Dc = function(c, e) {
                    var f = l.canvas,
                        p = f.getContext("2d"),
                        q = d[a.bb],
                        x = f.width / 2,
                        z = x - x * (1 - (e || 0));
                    p.save();
                    p.setTransform(1, 0, 0, 1, 0, 0);
                    p.clearRect(0, 0, f.width, f.height);
                    p.restore();
                    p.drawImage(q, -1 * z, 0);
                    c && p.drawImage(g, x - b.e(26) - z, b.e(10));
                    p.save();
                    p.translate(f.width, 0);
                    p.scale(-1, 1);
                    p.drawImage(q, -1 * z, 0);
                    p.restore();
                    c && p.drawImage(h, x + z, b.e(10))
                };
                l.Mp = function(a, b, c) {
                    function d() {
                        var c =
                            q(Date.now() - g, 0, 1, h);
                        1 > c ? (l.Dc(a, e ? 1 - c : c, s), window.requestAnimationFrame(d)) : (l.Dc(a, e ? 0 : 1, s), e ? $("#levelPanel").show() : $("#levelPanel").hide(), null != b && b())
                    }
                    var e = null != c ? c : !1,
                        g = Date.now(),
                        h = 750,
                        s = l.canvas.getContext("2d"),
                        q = c ? f.Pt : f.xi;
                    window.requestAnimationFrame(d)
                };
                l.oy = function(a) {
                    l.Mp(!1, a, !0)
                };
                l.Ct = function(a) {
                    var c = $("#tapeRoll"),
                        d = $("#levelTape");
                    $("#levelResults").fadeOut(400);
                    c.css("top", b.e(-14));
                    c.delay(400).fadeIn(200, function() {
                        function e() {
                            var b = Date.now() - h,
                                D = f.xi(b, s, g - s, G);
                            c.css("top",
                                f.xi(b, q, g - q, G));
                            d.css("height", D);
                            b < G ? window.requestAnimationFrame(e) : (d.hide(), l.Dc(!0), c.fadeOut(400, function() {
                                setTimeout(a, 200)
                            }))
                        }
                        var g = b.e(470);
                        b.e(553);
                        var h = Date.now(),
                            q = parseInt(c.css("top"), 10),
                            s = b.e(63),
                            G = 1E3;
                        d.css("height", s);
                        d.show();
                        window.requestAnimationFrame(e)
                    })
                };
                l.Ou = function(a) {
                    l.Dc(!0, 0);
                    l.ap();
                    var c = $("#boxCutter");
                    c.css("top", b.e(281));
                    c.delay(200).fadeIn(200, function() {
                        function d() {
                            var b = Date.now() - g;
                            c.css("top", f.xi(b, h, e - h, l));
                            b < l ? window.requestAnimationFrame(d) : c.fadeOut(300,
                                a)
                        }
                        var e = b.e(-255),
                            g = Date.now(),
                            h = parseInt(c.css("top"), 10),
                            l = 1E3;
                        window.requestAnimationFrame(d)
                    })
                };
                l.nq = ha();
                l.ap = ha();
                return l
            }(J, U, S, Ta, ua, V), J, S),
            sc = function(b, c, e, a, f, d, g, h, l, n, r, m, p, q, x, z) {
                function s() {
                    var a = parseInt($(this).data("level"), 10);
                    if (f.Cz(d.bb, a)) k.IA(a + 1, z.Rt);
                    else if (D ? 0 : p.Ch && p.Ch(d.bb, a)) x.Ov();
                    else return;
                    h.N(l.ha)
                }

                function G() {
                    var a = d.bb,
                        b = f.Tc(a),
                        c, k, e, g, h;
                    for (e = 0; e < b; e++)
                        if (c = $("#option" + (e + 1))) e < b ? (c.show(), g = D ? !1 : p.Ch ? p.Ch(d.bb, e) : !1, k = f.Yf(a, e), null === k && !g && 0 < e && (h =
                            f.Qk(a, e - 1), 0 < h && (f.af(a, e, 0), k = 0)), null != k ? (k = $("<div class='txt'/>").append($(r.ia({
                            text: e + 1,
                            ua: !0
                        }))).append($("<div>").addClass("stars" + k)), c.removeClass("locked purchase").addClass("open ctrPointer").empty().append(k)) : c.removeClass("open").addClass("locked").toggleClass("purchase ctrPointer", g).empty()) : c.hide();
                    a = f.oo(d.bb) + "/" + 3 * f.Tc(d.bb);
                    r.ia({
                        text: a,
                        Rc: "#levelScore img",
                        ua: !0
                    });
                    d.uw();
                    f.Cj()
                }
                b = new c(b.Md, "levelPanel", p.Iz || "levelBackground", !0);
                var k = null;
                b.init = function(a) {
                    function b(a,
                        c, k) {
                        $("<div/>").attr("id", "option" + (a + 1)).data("level", a).addClass("option locked ctrPointer " + p).css({
                            left: q + (k || 0),
                            top: v
                        }).click(s).appendTo(g);
                        q += c;
                        q > l && (q = h, v += c)
                    }
                    k = a;
                    var c = f.Tc(d.bb),
                        g = $("#levelOptions"),
                        h = 0;
                    a = 0;
                    var l = e.e(420),
                        m = e.e(153),
                        p = "",
                        n = 3,
                        r = c % 3;
                    9 < c && 12 >= c ? (h = -80, a = 10, n = 4, l = e.e(500), m = e.e(153)) : 12 < c && (h = -30, a = -40, m = e.e(101), p = "option-small", n = 5, r = c % 5);
                    var v = a,
                        q = h;
                    a = 0;
                    for (var x = c - r; a < x; a++) b(a, m);
                    0 < r && function(a) {
                        for (var k = (n - r) * m / 2; a < c; a++) b(a, m, k)
                    }(a)
                };
                b.bj = function() {
                    G();
                    $("#levelScore").delay(200).fadeIn(700);
                    $("#levelBack").delay(200).fadeIn(700);
                    $("#levelOptions").delay(200).fadeIn(700);
                    $("#levelResults").delay(200).fadeOut(700)
                };
                var D = !1;
                g.subscribe(g.w.gi, function(a) {
                    D = a;
                    G()
                });
                g.subscribe(g.w.mo, function() {
                    G()
                });
                return b
            }(ya, Ha, J, S, va, Ta, V, oa, q, ga, fa, B, U, Q, db, eb),
            tc = function(b, c, e, a, f, d, g, h, l, n, r) {
                var m = new c(b.Cf, "codePanel", "levelBackground", !1),
                    p = null,
                    q = null,
                    x = null,
                    z = null;
                m.kp = function() {
                    return l.Ty ? g.ku(0) && !n.Sh : !1
                };
                $(function() {
                    function b(a) {
                        p.html(a);
                        p.width(f + 1);
                        p.width(f)
                    }

                    function c() {
                        e ? (h = !h, b(h ? "Validating code . . ." : ""), setTimeout(c, h ? 600 : 250)) : h = !1
                    }

                    function k(c) {
                        e = !1;
                        q.attr("disabled", !1);
                        if (c) {
                            b("Code Accepted!");
                            c = !0;
                            var k, d;
                            k = 0;
                            for (d = l.jh.length; k < d; k++)
                                if (!g.ku(k)) {
                                    c = !1;
                                    break
                                }
                            g.EC();
                            z.delay(3E3).show(0);
                            a.ra(a.w.em, c)
                        } else b("Sorry, that code is not valid or <br/> has already been redeemed.")
                    }

                    function d() {
                        if (!e) {
                            var a = l.jh.length,
                                f = q.val() || "",
                                g = 0 < f.length ? parseInt(f[0], 10) || 0 : 0,
                                h = parseInt(f, 10),
                                f = h.toString().length === f.length;
                            isNaN(h) || !f || 0 > h || 1 > g || g > a ? b("Oops, that is not a valid code!") :
                                (q.attr("disabled", !0), e = !0, c())
                        }
                    }
                    p = $("#codeMessage");
                    q = $("#codeText");
                    x = $("#codeOkButton");
                    z = $("#codeBack").toggle(!m.kp());
                    var e = !1,
                        f = r.e(540),
                        h = !1;
                    q.keyup(function(a) {
                        13 == a.which ? d() : b("")
                    });
                    x.click(function() {
                        d()
                    })
                });
                m.init = ha();
                m.bj = function() {
                    p.text("");
                    q.val("").focus();
                    h.Dc(!1, 0);
                    h.nq()
                };
                m.Ep = function() {
                    h.ap()
                };
                return m
            }(ya, Ha, ua, V, oa, fa, jb, eb, U, ta, J),
            ub = function(b, c, e, a, f, d, g, h, l, n) {
                var r = new function() {
                    function l() {
                        function a() {
                            if (F) {
                                var e = Date.now();
                                A += 0.1 * (e - k) / 25 * H;
                                k = e;
                                b.setTransform(1, 0, 0, 1, 0, 0);
                                b.clearRect(0, 0, E.width, E.height);
                                1 > J && (J += 0.025, J = Math.min(J, 1), b.globalAlpha = J);
                                b.save();
                                b.translate(0.5 * I.width, 0.5 * I.height);
                                b.translate(d.e(-300), d.e(-510));
                                b.rotate(A * Math.PI / 180);
                                b.translate(0.5 * -I.width, 0.5 * -I.height);
                                b.drawImage(I, 0, 0);
                                b.restore();
                                c(a)
                            }
                        }
                        var b = E.getContext("2d"),
                            c = window.requestAnimationFrame,
                            k = Date.now();
                        F = !0;
                        a()
                    }

                    function p() {
                        if (!T) {
                            if (null != E) {
                                var a = E.getContext("2d");
                                a.save();
                                a.setTransform(1, 0, 0, 1, 0, 0);
                                a.clearRect(0, 0, E.width, E.height);
                                a.restore()
                            }
                            J = 0;
                            T = !0;
                            $("#shadowPanel").show();
                            F || l()
                        }
                    }
                    var r = this,
                        q = [];
                    this.Ip = null;
                    this.jb = function() {
                        D = $("#fadeToBlack");
                        E = document.getElementById("shadowCanvas");
                        E.width = d.e(1024);
                        E.height = d.e(576)
                    };
                    this.jd = function(a) {
                        I = new Image;
                        I.src = g.$c + "shadow.png";
                        if (a)
                            for (var b = 0, c = q.length; b < c; b++) a(q[b].id)
                    };
                    var z = this.Xf = function(a) {
                        for (var b = 0; b < q.length; b++)
                            if (q[b].id ==
                                a) return q[b];
                        return null
                    };
                    q.push(new c(b.vb, "menuPanel", "startBackground", !0));
                    q.push(e);
                    q.push(a);
                    q.push(new c(b.Pg, null, "levelBackground", !1));
                    q.push(new c(b.Rj, null, null, !1));
                    q.push(new c(b.Vr, null, null, !1));
                    q.push(new c(b.Zh, "gameCompletePanel", "menuBackground", !0));
                    q.push(new c(b.se, "optionsPanel", "menuBackground", !0));
                    q.push(new c(b.Yq, null, null, !1));
                    q.push(new c(b.Bf, "leaderboardPanel", "menuBackground", !0));
                    q.push(new c(b.jf, "achievementsPanel", "menuBackground", !0));
                    q.push(f);
                    this.zk = b.vb;
                    this.Za = function(a, b) {
                        r.zk = a;
                        var c = z(a),
                            k = null == b ? !1 : b;
                        c.jC ? p() : (F = T = !1, $("#shadowPanel").hide());
                        setTimeout(function() {
                            c.ih && $("#" + c.ih).show();
                            c.Fh && $("#" + c.Fh).show();
                            for (var b = 0; b < q.length; b++) {
                                var d = q[b];
                                null != d.Fh && d.Fh != c.Fh && $("#" + d.Fh).hide();
                                null != d.ih && d.ih != c.ih && $("#" + d.ih).hide()
                            }
                            null != r.Ip && r.Ip(a);
                            k || r.uB()
                        }, k ? 0 : s + B);
                        k || r.tB()
                    };
                    var s = 100,
                        B = 50,
                        k = 1,
                        D, u = !1;
                    this.tB = function() {
                        function a() {
                            var c = Date.now() - b;
                            D.css("opacity", h.Bp(c, k, s));
                            c < s ? window.requestAnimationFrame(a) : D.css("opacity",
                                k)
                        }
                        u = !0;
                        var b = Date.now();
                        D.css("opacity", 0);
                        D.css("display", "block");
                        window.requestAnimationFrame(a)
                    };
                    this.uB = function() {
                        function a() {
                            var c = Date.now() - b;
                            D.css("opacity", k - h.Bp(c, k, s));
                            c < s ? window.requestAnimationFrame(a) : (D.css("opacity", 0), D.css("display", "none"), u = !1)
                        }
                        if (u) {
                            var b = Date.now();
                            window.requestAnimationFrame(a)
                        }
                    };
                    var F = !1,
                        A = 15,
                        E = null,
                        I = null,
                        J = 1,
                        T = !1,
                        H = n.eC || 1
                };
                l.subscribe(l.w.em, function(a) {
                    var c = a ? b.vb : b.ad;
                    setTimeout(function() {
                        r.Za(c)
                    }, 1E3)
                });
                return r
            }(ya, Ha, tb, sc, tc, J, S, ua, V, U),
            fb =
            function(b, c, e, a, f, d) {
                return new function() {
                    this.Ql = c.Ql;
                    this.so = "278847552173744";
                    var g = window.location.host || "";
                    0 <= g.indexOf("thinkpixellab") ? this.so = "239041062884795" : 0 <= g.indexOf(".dev") && (this.so = "261043477350153");
                    var h = this;
                    f.subscribe(f.w.Pb, function() {
                        h.Qv = e.X(a.ts);
                        h.mC = e.X(a.us);
                        h.lC = [{
                            name: e.X(a.ss),
                            link: c.Ql
                        }]
                    });
                    this.uz = function() {
                        var a = {};
                        a.appId = h.so;
                        a.status = !0;
                        a.cookie = !0;
                        a.xfbml = !0;
                        FB.init(a);
                        FB.Event.subscribe("edge.create", function() {
                            d.xA && d.xA()
                        })
                    };
                    this.cv = function(a, c, d, e) {
                        if (b.jE) f.ra(f.w.wx,
                            a, c, d);
                        else {
                            var g = {
                                method: "feed"
                            };
                            g.name = h.mC;
                            g.caption = a;
                            g.description = c;
                            g.link = h.Ql;
                            g.picture = d;
                            g.actions = h.lC;
                            FB.ui(g, e)
                        }
                    };
                    this.xz = function(a) {
                        a.events.bind("tweet", function() {
                            d.HA && d.HA()
                        })
                    }
                }
            }(S, U, ga, B, V, Ra),
            uc = function(b, c, e, a, f, d, g, h, l, n) {
                return new function() {
                    function f(a, b, c, d, e, g, h) {
                        a.save();
                        a.setTransform(1, 0, 0, 1, 0, 0);
                        a.clearRect(0, 0, a.canvas.width, a.canvas.height);
                        a.restore();
                        a.save();
                        a.translate(d, e);
                        a.scale(b, c);
                        a.save();
                        a.beginPath();
                        a.moveTo(116.1, 38.3);
                        a.bezierCurveTo(117.2, 37.9, 118.2,
                            37.4, 119, 36.8);
                        a.lineTo(119.5, 35.6);
                        a.lineTo(123.3, 21.1);
                        a.bezierCurveTo(124.5, 18.2, 126.8, 14.6, 130.1, 10.3);
                        a.bezierCurveTo(129.9, 15.3, 133.6, 18.2, 141.3, 19);
                        a.bezierCurveTo(138.9, 19.1, 136.7, 19.9, 134.8, 21.5);
                        a.bezierCurveTo(132.4, 23.5, 130.7, 25.2, 129.7, 26.8);
                        a.bezierCurveTo(128.9, 28.3, 127.9, 30.7, 126.7, 33.8);
                        a.lineTo(126.4, 36.8);
                        a.lineTo(126.7, 37.7);
                        a.lineTo(128.6, 38.7);
                        a.bezierCurveTo(124.4, 37.5, 120.2, 37.4, 116.1, 38.3);
                        a.closePath();
                        a.moveTo(241.8, 203.6);
                        a.bezierCurveTo(241.6, 202.9, 241.1, 202.2, 240.5, 201.5);
                        a.lineTo(214.2, 185.6);
                        a.bezierCurveTo(212.8, 190, 210.9, 194.2, 208.4, 198.1);
                        a.lineTo(208.3, 198);
                        a.lineTo(209.4, 192.8);
                        a.lineTo(211, 183.6);
                        a.lineTo(211.2, 182.6);
                        a.lineTo(212.8, 173.3);
                        a.bezierCurveTo(212.3, 176, 211.3, 179, 210, 182.1);
                        a.bezierCurveTo(209.9, 182.4, 209.8, 182.6, 209.7, 182.8);
                        a.bezierCurveTo(208.6, 185.2, 207.3, 187.8, 205.8, 190.5);
                        a.bezierCurveTo(203.4, 194.6, 200.9, 197.9, 198.1, 200.4);
                        a.bezierCurveTo(198.7, 201.8, 199, 203.2, 199.2, 204.7);
                        a.bezierCurveTo(199.2, 204.8, 199.2, 204.9, 199.2, 205);
                        a.bezierCurveTo(199.5,
                            207.9, 199.6, 209.6, 199.7, 210.2);
                        a.bezierCurveTo(200, 211.2, 200.1, 212, 200.2, 212.5);
                        a.lineTo(199.6, 207.8);
                        a.bezierCurveTo(201.8, 213.8, 203.3, 218.7, 204, 222.5);
                        a.bezierCurveTo(205.3, 222.4, 206.5, 222.4, 207.7, 222.3);
                        a.bezierCurveTo(213.4, 222, 218.9, 221.9, 224.3, 222.1);
                        a.bezierCurveTo(227.5, 222.5, 230.1, 222.1, 232.3, 221.1);
                        a.bezierCurveTo(232.8, 220.7, 233.4, 220.2, 233.9, 219.6);
                        a.bezierCurveTo(235.2, 218.1, 236.5, 216.5, 237.8, 215);
                        a.bezierCurveTo(239.1, 213.3, 240.1, 211.5, 240.9, 209.6);
                        a.bezierCurveTo(241.8, 207.4, 242.1,
                            205.4, 241.8, 203.6);
                        a.closePath();
                        a.moveTo(148.8, 222.8);
                        a.bezierCurveTo(139.8, 224.7, 129.5, 225.7, 117.8, 225.9);
                        a.bezierCurveTo(109.6, 226, 101.7, 225.5, 94.3, 224.3);
                        a.bezierCurveTo(94.3, 224.9, 94.4, 225.6, 94.4, 226.2);
                        a.bezierCurveTo(94.4, 228.1, 94.3, 230, 94, 232);
                        a.lineTo(93.8, 233);
                        a.bezierCurveTo(103.6, 234.6, 113.4, 235.1, 123.2, 234.4);
                        a.bezierCurveTo(132.2, 234.4, 141, 233.2, 149.5, 231);
                        a.bezierCurveTo(149.4, 230.6, 149.4, 230.3, 149.4, 230);
                        a.bezierCurveTo(149, 227.6, 148.9, 225.2, 148.8, 222.8);
                        a.closePath();
                        a.moveTo(196.6,
                            153.6);
                        a.lineTo(194.5, 152.6);
                        a.bezierCurveTo(194.1, 152.8, 193.8, 153, 193.4, 153.2);
                        a.bezierCurveTo(192.6, 153.8, 191.7, 154.5, 191, 155.2);
                        a.lineTo(190.2, 155.8);
                        a.bezierCurveTo(186.6, 158.8, 183.8, 160.7, 182, 161.5);
                        a.bezierCurveTo(182, 162.2, 181.4, 164, 180.2, 166.7);
                        a.bezierCurveTo(183.2, 164.8, 186.2, 162.7, 189.3, 160.6);
                        a.bezierCurveTo(192.6, 158.2, 195.6, 155.9, 198.4, 153.8);
                        a.bezierCurveTo(197.6, 153.8, 197, 153.7, 196.6, 153.6);
                        a.closePath();
                        a.moveTo(121.1, 189);
                        a.bezierCurveTo(128, 188.9, 134.8, 188, 141.7, 186);
                        a.bezierCurveTo(141.3,
                            185.9, 141, 185.7, 140.7, 185.6);
                        a.bezierCurveTo(136.2, 183.2, 133, 181.8, 131.3, 181.4);
                        a.bezierCurveTo(128.8, 181.8, 125.7, 181.8, 121.9, 181.4);
                        a.bezierCurveTo(118.1, 181, 114, 180.5, 109.4, 179.7);
                        a.lineTo(109.3, 179.7);
                        a.bezierCurveTo(108.3, 180.9, 106.5, 182.5, 103.8, 184.6);
                        a.bezierCurveTo(103.6, 184.7, 103.4, 184.9, 103.2, 185);
                        a.lineTo(102.1, 185.9);
                        a.lineTo(102.9, 186.1);
                        a.bezierCurveTo(110.1, 188.1, 116.2, 189, 121.1, 189);
                        a.closePath();
                        a.moveTo(63.1, 164.7);
                        a.lineTo(50.7, 157.9);
                        a.lineTo(45.8, 159.6);
                        a.lineTo(46.2, 159.9);
                        a.bezierCurveTo(46.3,
                            160, 46.4, 160.1, 46.5, 160.2);
                        a.bezierCurveTo(52, 164, 57.9, 167.5, 64.4, 170.9);
                        a.lineTo(65.5, 171.5);
                        a.lineTo(65.2, 170.7);
                        a.bezierCurveTo(64, 168, 63.4, 166, 63.1, 164.7);
                        a.closePath();
                        a.moveTo(36.5, 191.7);
                        a.bezierCurveTo(35.2, 189.5, 34, 187.3, 33, 185);
                        a.lineTo(33.1, 185.9);
                        a.lineTo(34, 192.4);
                        a.lineTo(31.3, 189.4);
                        a.bezierCurveTo(30.8, 188, 27.8, 189.3, 22.4, 193.3);
                        a.bezierCurveTo(16.9, 197.2, 13.7, 199.6, 12.7, 200.6);
                        a.bezierCurveTo(11.6, 201.6, 10.2, 202.9, 8.4, 204.6);
                        a.bezierCurveTo(6.7, 206.1, 5.4, 207.3, 4.5, 208.2);
                        a.bezierCurveTo(3.6,
                            209, 3.2, 210.1, 3.3, 211.5);
                        a.bezierCurveTo(3.5, 212.9, 4, 214.8, 4.8, 217.3);
                        a.bezierCurveTo(5.6, 219.7, 6.5, 221.8, 7.4, 223.5);
                        a.bezierCurveTo(8.3, 225.2, 9.8, 226.4, 11.9, 227.1);
                        a.bezierCurveTo(13.9, 227.7, 15.9, 227.9, 17.8, 227.7);
                        a.bezierCurveTo(19.7, 227.5, 21.3, 227.4, 22.6, 227.4);
                        a.bezierCurveTo(24.5, 227.3, 26.4, 227.2, 28.4, 227.2);
                        a.bezierCurveTo(30.2, 227.2, 32, 227.2, 33.8, 227.2);
                        a.bezierCurveTo(35.8, 227.2, 37.7, 227.2, 39.7, 227.2);
                        a.bezierCurveTo(41.2, 227.3, 42.9, 227.4, 44.5, 227.6);
                        a.bezierCurveTo(44.5, 225.9, 44.5, 223.5,
                            44.6, 220.3);
                        a.lineTo(44.6, 213.4);
                        a.lineTo(44.7, 207.6);
                        a.lineTo(45.1, 204.8);
                        a.lineTo(45.4, 203);
                        a.bezierCurveTo(45.4, 202.9, 45.4, 202.8, 45.5, 202.6);
                        a.bezierCurveTo(43.8, 201.2, 42.3, 199.7, 40.9, 198.1);
                        a.bezierCurveTo(39.3, 196, 37.9, 193.8, 36.5, 191.7);
                        a.closePath();
                        a.fillStyle = "rgb(100, 150, 40)";
                        a.fill();
                        a.beginPath();
                        a.moveTo(212.6, 151.5);
                        a.bezierCurveTo(213.3, 158.8, 213.4, 166.1, 212.8, 173.3);
                        a.bezierCurveTo(212.3, 176, 211.3, 179, 210, 182.2);
                        a.bezierCurveTo(209.9, 182.4, 209.8, 182.6, 209.7, 182.8);
                        a.bezierCurveTo(208.6,
                            185.3, 207.3, 187.8, 205.8, 190.5);
                        a.bezierCurveTo(203.4, 194.7, 200.9, 198, 198.1, 200.5);
                        a.bezierCurveTo(198.7, 201.8, 199, 203.3, 199.2, 204.7);
                        a.bezierCurveTo(199.2, 204.8, 199.2, 204.9, 199.2, 205.1);
                        a.bezierCurveTo(199.5, 207.9, 199.6, 209.7, 199.7, 210.2);
                        a.bezierCurveTo(199.9, 214.2, 200, 218.2, 199.9, 222.4);
                        a.bezierCurveTo(199.9, 222.5, 199.9, 222.7, 199.9, 222.9);
                        a.bezierCurveTo(199.9, 225, 199.7, 227, 199.4, 228.8);
                        a.bezierCurveTo(199.1, 230.5, 198.7, 232, 198.3, 233.5);
                        a.lineTo(196.7, 235.2);
                        a.bezierCurveTo(196.6, 235.3, 196.5, 235.4,
                            196.3, 235.5);
                        a.bezierCurveTo(195.2, 236.4, 193.3, 237.6, 190.7, 239.2);
                        a.bezierCurveTo(188.1, 240.8, 184.5, 241.7, 179.9, 242.1);
                        a.bezierCurveTo(175.3, 242.4, 172, 242.5, 169.8, 242.3);
                        a.bezierCurveTo(167.8, 242.2, 165.5, 241.7, 162.9, 240.8);
                        a.bezierCurveTo(160.4, 240, 158, 238, 155.6, 234.8);
                        a.bezierCurveTo(155.4, 234.6, 155.3, 234.4, 155.1, 234.2);
                        a.bezierCurveTo(154.3, 233, 153.5, 231.6, 152.8, 230.1);
                        a.bezierCurveTo(151.9, 227.9, 151.2, 225.3, 150.7, 222.4);
                        a.bezierCurveTo(150.7, 222.2, 150.6, 222.1, 150.6, 221.9);
                        a.bezierCurveTo(149.7,
                            216.4, 149.3, 213.1, 149.2, 212);
                        a.bezierCurveTo(148.8, 215.6, 148.6, 219.2, 148.8, 222.8);
                        a.bezierCurveTo(139.8, 224.7, 129.5, 225.7, 117.8, 225.9);
                        a.bezierCurveTo(109.6, 226, 101.7, 225.5, 94.3, 224.3);
                        a.bezierCurveTo(94.2, 220.8, 94, 217.1, 93.8, 213.5);
                        a.bezierCurveTo(93.8, 214.9, 93.7, 216, 93.6, 216.6);
                        a.bezierCurveTo(93.5, 217.2, 93.5, 217.7, 93.4, 218.1);
                        a.bezierCurveTo(93.4, 218.5, 93.2, 219.4, 92.8, 220.9);
                        a.bezierCurveTo(92.6, 222, 92.3, 223, 92, 224);
                        a.bezierCurveTo(91.9, 224.3, 91.8, 224.6, 91.7, 224.8);
                        a.bezierCurveTo(91.3, 226, 90.8,
                            227.2, 90.2, 228.3);
                        a.bezierCurveTo(89.9, 229, 89.5, 229.7, 89.2, 230.4);
                        a.bezierCurveTo(88.8, 230.9, 88.4, 231.4, 88, 231.9);
                        a.bezierCurveTo(87.5, 232.6, 86.9, 233.2, 86.2, 233.7);
                        a.bezierCurveTo(85.8, 234.1, 85.4, 234.5, 84.9, 234.9);
                        a.bezierCurveTo(83.9, 235.6, 82.8, 236.2, 81.6, 236.7);
                        a.bezierCurveTo(80.2, 237.3, 78.7, 237.8, 77.1, 238.2);
                        a.bezierCurveTo(74.1, 238.8, 71, 239.1, 67.8, 239.1);
                        a.bezierCurveTo(60.2, 239.2, 53.4, 237.3, 47.4, 233.3);
                        a.bezierCurveTo(45.9, 232.5, 45, 231.7, 44.9, 230.9);
                        a.lineTo(44.6, 229.2);
                        a.bezierCurveTo(44.6,
                            228.8, 44.5, 228.3, 44.5, 227.6);
                        a.bezierCurveTo(44.5, 226, 44.5, 223.5, 44.6, 220.3);
                        a.lineTo(44.6, 213.4);
                        a.lineTo(44.7, 207.6);
                        a.lineTo(45.1, 204.9);
                        a.lineTo(45.4, 203);
                        a.bezierCurveTo(45.4, 202.9, 45.4, 202.8, 45.5, 202.7);
                        a.bezierCurveTo(43.8, 201.2, 42.3, 199.7, 40.9, 198.2);
                        a.bezierCurveTo(39.3, 196, 37.9, 193.9, 36.5, 191.7);
                        a.bezierCurveTo(35.2, 189.6, 34, 187.4, 33, 185.1);
                        a.lineTo(32.7, 183.5);
                        a.bezierCurveTo(31.8, 176.3, 31, 168.9, 30.3, 161.3);
                        a.bezierCurveTo(30.3, 161, 30.3, 160.7, 30.2, 160.4);
                        a.bezierCurveTo(34.5, 162, 39, 162.1,
                            43.8, 160.4);
                        a.bezierCurveTo(44.4, 160.2, 45.1, 159.9, 45.8, 159.6);
                        a.lineTo(46.2, 159.9);
                        a.bezierCurveTo(46.3, 160, 46.4, 160.1, 46.5, 160.2);
                        a.bezierCurveTo(52, 164, 57.9, 167.6, 64.4, 170.9);
                        a.lineTo(65.5, 171.5);
                        a.bezierCurveTo(66.9, 174.7, 68.3, 177.8, 69.8, 180.9);
                        a.bezierCurveTo(71.4, 184.1, 73.4, 187, 76, 189.7);
                        a.bezierCurveTo(78.5, 192.3, 81.7, 193.4, 85.5, 193.1);
                        a.bezierCurveTo(89.2, 192.6, 92.8, 191.5, 96.3, 189.7);
                        a.bezierCurveTo(98.5, 188.7, 100.4, 187.4, 102.1, 185.9);
                        a.lineTo(102.9, 186.2);
                        a.bezierCurveTo(110.1, 188.1, 116.2,
                            189.1, 121.1, 189.1);
                        a.bezierCurveTo(128, 189, 134.8, 188, 141.7, 186.1);
                        a.bezierCurveTo(142.1, 186.3, 142.6, 186.5, 143, 186.7);
                        a.bezierCurveTo(143.5, 186.9, 144, 187.1, 144.5, 187.3);
                        a.bezierCurveTo(147.1, 188.4, 149.8, 189.4, 152.5, 190.3);
                        a.bezierCurveTo(155.3, 191.3, 158.2, 191.8, 161.2, 191.8);
                        a.bezierCurveTo(164.2, 191.8, 166.7, 190.7, 168.6, 188.6);
                        a.bezierCurveTo(170, 187.2, 171.1, 185.7, 172, 184.1);
                        a.bezierCurveTo(173.4, 181.7, 174.7, 179.2, 175.9, 176.6);
                        a.bezierCurveTo(177.1, 174, 178.3, 171.4, 179.4, 168.8);
                        a.bezierCurveTo(179.7,
                            168, 180, 167.4, 180.2, 166.8);
                        a.bezierCurveTo(183.2, 164.8, 186.2, 162.8, 189.3, 160.6);
                        a.bezierCurveTo(192.6, 158.2, 195.6, 156, 198.4, 153.8);
                        a.bezierCurveTo(199.3, 153.8, 200.6, 153.8, 202.1, 153.6);
                        a.bezierCurveTo(204.6, 153.5, 207, 153.1, 209.4, 152.5);
                        a.bezierCurveTo(210.5, 152.2, 211.6, 151.8, 212.6, 151.4);
                        a.bezierCurveTo(212.6, 151.4, 212.6, 151.4, 212.6, 151.5);
                        a.closePath();
                        a.moveTo(124.3, 61);
                        a.bezierCurveTo(124.5, 61.3, 124.8, 61.6, 125, 61.9);
                        a.bezierCurveTo(133.4, 55.3, 142.8, 50.4, 153.1, 47.4);
                        a.bezierCurveTo(149.8, 46, 146.3,
                            44.6, 142.9, 43.3);
                        a.bezierCurveTo(139.9, 42.5, 137.6, 41.7, 135.8, 41.1);
                        a.bezierCurveTo(134.1, 40.4, 132.7, 40, 131.6, 39.8);
                        a.bezierCurveTo(130.5, 39.6, 129.5, 39.2, 128.6, 38.8);
                        a.bezierCurveTo(124.4, 37.6, 120.2, 37.4, 116.1, 38.4);
                        a.bezierCurveTo(115.7, 38.5, 115.2, 38.6, 114.8, 38.7);
                        a.bezierCurveTo(114.6, 38.8, 114.2, 38.9, 113.7, 39);
                        a.lineTo(106, 40.5);
                        a.bezierCurveTo(102.5, 41.1, 99.2, 41.9, 95.9, 42.8);
                        a.bezierCurveTo(106.9, 45.7, 116.3, 51.7, 124.3, 61);
                        a.closePath();
                        a.moveTo(141.3, 19);
                        a.lineTo(143.4, 19);
                        a.lineTo(144.6, 19.1);
                        a.bezierCurveTo(147.1, 19.4, 148.8, 19.2, 149.7, 18.6);
                        a.bezierCurveTo(151.7, 17.6, 152.9, 16, 153.3, 13.7);
                        a.bezierCurveTo(153.7, 12.1, 153.7, 10.4, 153.5, 8.6);
                        a.bezierCurveTo(152.9, 5.3, 150.9, 3.4, 147.6, 3.1);
                        a.bezierCurveTo(141, 2.4, 135.2, 4.8, 130.1, 10.3);
                        a.bezierCurveTo(129.9, 15.3, 133.6, 18.2, 141.3, 19);
                        a.closePath();
                        a.moveTo(221, 104);
                        a.bezierCurveTo(220.8, 103.3, 220.5, 102.6, 220.2, 101.9);
                        a.bezierCurveTo(219.3, 99.7, 218.2, 97.5, 216.9, 95.4);
                        a.bezierCurveTo(213.3, 89.7, 209.2, 84.5, 204.4, 79.7);
                        a.bezierCurveTo(205.4, 83, 205.9,
                            86.5, 205.9, 90.2);
                        a.bezierCurveTo(205.8, 91.2, 205.8, 92.2, 205.7, 93.2);
                        a.bezierCurveTo(205.5, 95.7, 205.1, 98.2, 204.6, 100.6);
                        a.bezierCurveTo(204.9, 102.3, 205.3, 104.3, 205.7, 106.6);
                        a.lineTo(205.7, 106.6);
                        a.bezierCurveTo(205.2, 104.4, 204.9, 102.5, 204.6, 101);
                        a.bezierCurveTo(204.2, 103, 203.6, 104.9, 203, 106.9);
                        a.lineTo(202.9, 106.9);
                        a.bezierCurveTo(200.6, 113.5, 197.1, 119.7, 192.3, 125.5);
                        a.bezierCurveTo(188.4, 130, 183.6, 133.5, 177.8, 135.9);
                        a.bezierCurveTo(169.7, 139.6, 161.7, 140.9, 153.7, 139.7);
                        a.bezierCurveTo(147.7, 138.6, 142.2,
                            136.2, 137.2, 132.7);
                        a.bezierCurveTo(131.7, 128.8, 126.4, 125, 121.3, 121.5);
                        a.lineTo(120.9, 121.3);
                        a.lineTo(120.6, 121.5);
                        a.bezierCurveTo(113.9, 128, 106.4, 133.2, 98, 137.3);
                        a.bezierCurveTo(83.7, 144, 70, 142.9, 56.8, 134);
                        a.bezierCurveTo(50.6, 130, 45.8, 125.2, 42.5, 119.7);
                        a.bezierCurveTo(38.6, 113.5, 36.7, 106.4, 36.6, 98.3);
                        a.bezierCurveTo(36.6, 93.4, 37.1, 88.7, 38.2, 84.1);
                        a.bezierCurveTo(37.7, 84.8, 37.1, 85.5, 36.6, 86.2);
                        a.bezierCurveTo(29.8, 95.7, 24.4, 105.8, 20.3, 116.5);
                        a.bezierCurveTo(20.4, 116.4, 20.4, 117, 20.3, 118.2);
                        a.bezierCurveTo(20.2,
                            119.7, 20.7, 121.1, 21.6, 122.5);
                        a.bezierCurveTo(22.2, 123.4, 23.3, 125, 25, 127.3);
                        a.lineTo(26.2, 129.3);
                        a.bezierCurveTo(26.3, 129.4, 26.4, 129.6, 26.5, 129.7);
                        a.bezierCurveTo(27.9, 131.7, 29.4, 133.7, 31.1, 135.6);
                        a.bezierCurveTo(34, 138.9, 37.4, 142, 41.1, 144.9);
                        a.bezierCurveTo(44.1, 147.2, 47.2, 149.4, 50.5, 151.6);
                        a.bezierCurveTo(52.5, 152.9, 54.7, 154.4, 57, 155.8);
                        a.bezierCurveTo(60.8, 158.3, 65.2, 160.8, 70.1, 163.1);
                        a.bezierCurveTo(71, 163.6, 72, 164, 72.9, 164.4);
                        a.bezierCurveTo(79.8, 167.5, 86.9, 170.1, 94.1, 172.2);
                        a.bezierCurveTo(101.5,
                            174.4, 109, 175.9, 116.7, 176.5);
                        a.bezierCurveTo(122.5, 177.2, 128.4, 177.1, 134.5, 176.3);
                        a.bezierCurveTo(141.6, 175.3, 147.4, 174, 152, 172.4);
                        a.bezierCurveTo(156.6, 170.7, 159.7, 169.4, 161.4, 168.4);
                        a.lineTo(181.4, 156.2);
                        a.bezierCurveTo(187.7, 152, 192.6, 148.2, 195.9, 144.6);
                        a.lineTo(202.9, 136.6);
                        a.lineTo(209.8, 126.7);
                        a.lineTo(211.7, 124);
                        a.lineTo(214.9, 119.9);
                        a.lineTo(216.7, 117.5);
                        a.bezierCurveTo(217.8, 116.3, 218.7, 115.1, 219.4, 114);
                        a.bezierCurveTo(219.8, 113.5, 220.1, 113, 220.3, 112.5);
                        a.bezierCurveTo(220.8, 111.5, 221.1,
                            110.5, 221.3, 109.4);
                        a.bezierCurveTo(221.5, 108.5, 221.6, 107.6, 221.6, 106.7);
                        a.bezierCurveTo(221.6, 105.8, 221.4, 104.9, 221, 104);
                        a.closePath();
                        a.fillStyle = "rgb(153, 205, 0)";
                        a.fill();
                        a.beginPath();
                        a.moveTo(245.5, 203.6);
                        a.bezierCurveTo(245.4, 202.9, 245.3, 202.4, 245.2, 202);
                        a.bezierCurveTo(244.7, 200.9, 244.1, 200.1, 243.5, 199.7);
                        a.bezierCurveTo(242.9, 199.2, 241.2, 198.1, 238.5, 196.2);
                        a.bezierCurveTo(238, 195.9, 237.5, 195.5, 237, 195.2);
                        a.bezierCurveTo(234.3, 193.5, 230.8, 191.6, 226.3, 189.3);
                        a.bezierCurveTo(223, 187.4, 219.4,
                            185.7, 215.7, 184.2);
                        a.lineTo(214.7, 183.8);
                        a.bezierCurveTo(216, 179.3, 216.8, 174.4, 217, 169.3);
                        a.bezierCurveTo(217.3, 162.5, 217.5, 155.7, 217.3, 148.8);
                        a.bezierCurveTo(217.5, 148.7, 217.7, 148.6, 217.9, 148.5);
                        a.bezierCurveTo(220.1, 147, 221.6, 145.1, 222.5, 142.8);
                        a.bezierCurveTo(223.5, 140.2, 224.2, 137.4, 224.6, 134.6);
                        a.bezierCurveTo(224.9, 132.2, 225, 129.8, 225.1, 127.3);
                        a.bezierCurveTo(225.1, 124.8, 225.1, 122.4, 224.8, 119.9);
                        a.bezierCurveTo(224.8, 119.4, 224.7, 119, 224.6, 118.6);
                        a.lineTo(224.5, 115.9);
                        a.bezierCurveTo(225.1, 114.1,
                            225.4, 111.8, 225.6, 108.9);
                        a.bezierCurveTo(225.7, 107.4, 225.5, 105.8, 224.9, 104.3);
                        a.bezierCurveTo(220.3, 91.4, 212.2, 80.3, 200.6, 71);
                        a.bezierCurveTo(195.8, 62.6, 189, 55.8, 180.1, 50.6);
                        a.bezierCurveTo(172.6, 46.4, 165.2, 45, 157.9, 46.2);
                        a.bezierCurveTo(155.1, 45, 152.3, 43.9, 149.4, 42.8);
                        a.bezierCurveTo(148.1, 42.3, 146.8, 41.9, 145.5, 41.4);
                        a.bezierCurveTo(143.2, 40.6, 140.8, 39.9, 138.4, 39.2);
                        a.bezierCurveTo(136.1, 38.4, 133.8, 37.6, 131.6, 36.7);
                        a.bezierCurveTo(131.1, 36.6, 130.8, 36.3, 130.4, 36);
                        a.bezierCurveTo(130.1, 35.6, 129.9,
                            35.3, 129.8, 35);
                        a.bezierCurveTo(129.8, 34.3, 129.9, 33.8, 130.1, 33.5);
                        a.bezierCurveTo(130.9, 31.6, 132.7, 30, 135.7, 29);
                        a.bezierCurveTo(137.8, 27.6, 140.6, 26.5, 144, 25.5);
                        a.bezierCurveTo(152.1, 23, 156.6, 19.2, 157.4, 13.9);
                        a.bezierCurveTo(158.5, 7.2, 155.6, 2.8, 148.7, 0.7);
                        a.bezierCurveTo(141.1, -1.7, 133.2, 2, 125, 11.9);
                        a.bezierCurveTo(121.9, 15.6, 120.1, 19, 119.4, 22.1);
                        a.lineTo(118.6, 25.4);
                        a.bezierCurveTo(118.2, 30, 117.2, 33, 115.7, 34.5);
                        a.bezierCurveTo(114.8, 35.3, 113.3, 36, 111.2, 36.6);
                        a.bezierCurveTo(104.1, 37.5, 97.2, 39.2, 90.6,
                            41.6);
                        a.bezierCurveTo(89.4, 41.4, 88.3, 41.3, 87.1, 41.1);
                        a.bezierCurveTo(71.9, 41.6, 59.7, 47.8, 50.4, 59.6);
                        a.bezierCurveTo(46, 64.9, 42.7, 70.6, 40.4, 76.7);
                        a.bezierCurveTo(39.8, 77.4, 39.2, 78.1, 38.5, 78.8);
                        a.bezierCurveTo(29.4, 89.5, 22.3, 101, 17.2, 113.3);
                        a.bezierCurveTo(16.8, 114.3, 16.4, 115.3, 16.1, 116.3);
                        a.bezierCurveTo(15.8, 117, 15.6, 117.6, 15.5, 118.3);
                        a.bezierCurveTo(15.4, 118.7, 15.3, 119.1, 15.3, 119.5);
                        a.bezierCurveTo(15.2, 120.4, 15.1, 121.2, 15.2, 122.1);
                        a.bezierCurveTo(15.5, 124.5, 16.4, 127.1, 18, 129.6);
                        a.bezierCurveTo(18.5,
                            132, 18.6, 134.2, 18.3, 136);
                        a.bezierCurveTo(17.4, 144.5, 19.9, 151.6, 25.9, 157.5);
                        a.bezierCurveTo(25.9, 159.4, 26, 161.4, 26.1, 163.4);
                        a.bezierCurveTo(26.4, 169.1, 27.2, 175.1, 28.4, 181.4);
                        a.bezierCurveTo(28.7, 182.6, 28.9, 183.7, 29.2, 184.9);
                        a.bezierCurveTo(29.1, 184.9, 29, 185, 28.9, 185);
                        a.bezierCurveTo(25.6, 186.9, 22.7, 188.6, 20.2, 190.1);
                        a.bezierCurveTo(17.8, 191.7, 15.6, 193.1, 13.8, 194.4);
                        a.bezierCurveTo(12.5, 195.5, 11.1, 196.7, 9.6, 197.9);
                        a.bezierCurveTo(7.9, 199, 6.3, 200.4, 4.9, 201.9);
                        a.bezierCurveTo(3.7, 203, 2.7, 204.1, 1.7, 205);
                        a.bezierCurveTo(0.7, 206, 0.2, 207.4, 0, 209.2);
                        a.bezierCurveTo(-0.1, 211, 0, 212.5, 0.2, 213.8);
                        a.bezierCurveTo(0.4, 215, 0.9, 217, 1.5, 219.7);
                        a.bezierCurveTo(2.1, 222.4, 3, 224.6, 4, 226.5);
                        a.bezierCurveTo(5.1, 228.3, 6.7, 229.7, 9, 230.6);
                        a.bezierCurveTo(9.6, 230.8, 10.3, 231, 11.1, 231.2);
                        a.bezierCurveTo(14.9, 231.1, 18.6, 231.1, 22.4, 231.2);
                        a.bezierCurveTo(24.2, 231.3, 26, 231.5, 27.8, 231.7);
                        a.bezierCurveTo(29.4, 231.8, 31, 232, 32.7, 232.2);
                        a.bezierCurveTo(34.1, 232.3, 35.6, 232.5, 37.1, 232.6);
                        a.bezierCurveTo(38.4, 232.7, 39.8, 232.8, 41.2,
                            232.9);
                        a.bezierCurveTo(41.5, 232.9, 41.8, 233, 42.1, 233);
                        a.lineTo(42.2, 233.2);
                        a.bezierCurveTo(42.4, 233.8, 42.8, 234.4, 43.1, 234.8);
                        a.bezierCurveTo(48.8, 238.6, 55, 240.9, 61.6, 241.5);
                        a.bezierCurveTo(68.7, 242.6, 75.6, 242.3, 82.4, 240.5);
                        a.bezierCurveTo(82.5, 240.5, 82.5, 240.5, 82.6, 240.5);
                        a.bezierCurveTo(84, 240.2, 85.4, 239.9, 86.7, 239.6);
                        a.bezierCurveTo(88.1, 239.3, 89.3, 238.9, 90.4, 238.4);
                        a.bezierCurveTo(90.9, 238.1, 91.4, 237.8, 91.8, 237.3);
                        a.bezierCurveTo(104.5, 241.2, 118.7, 242, 134.5, 239.7);
                        a.bezierCurveTo(139.8, 238.9, 145.2,
                            237.5, 150.9, 235.6);
                        a.bezierCurveTo(151.5, 237, 152.2, 238.2, 153.1, 239.5);
                        a.bezierCurveTo(153.8, 240.1, 154.6, 240.7, 155.6, 241.3);
                        a.bezierCurveTo(156.9, 242.2, 158.4, 242.9, 160.2, 243.5);
                        a.bezierCurveTo(161.9, 243.8, 163.7, 244.1, 165.5, 244.5);
                        a.bezierCurveTo(171.9, 244.8, 178, 244.7, 183.5, 244.1);
                        a.bezierCurveTo(188, 243.7, 192.3, 242.6, 196.2, 240.7);
                        a.bezierCurveTo(197, 240.3, 197.6, 239.9, 198.3, 239.5);
                        a.bezierCurveTo(200, 238.4, 201.4, 237.4, 202.3, 236.5);
                        a.bezierCurveTo(203.2, 235.6, 203.9, 233.1, 204.5, 229.2);
                        a.bezierCurveTo(204.5,
                            229, 204.6, 228.7, 204.6, 228.3);
                        a.lineTo(223.4, 226.8);
                        a.bezierCurveTo(225.5, 226.6, 227.6, 226.4, 229.8, 226.3);
                        a.bezierCurveTo(232, 226.2, 233.8, 225.5, 235.2, 224.1);
                        a.bezierCurveTo(237, 222.5, 238.5, 220.8, 239.4, 219.1);
                        a.bezierCurveTo(240.4, 217.5, 241.3, 215.9, 242.2, 214.4);
                        a.bezierCurveTo(243, 212.9, 243.6, 211.6, 244.1, 210.5);
                        a.bezierCurveTo(244.6, 209.4, 244.9, 208.1, 245.2, 206.7);
                        a.bezierCurveTo(245.4, 205.2, 245.5, 204.2, 245.5, 203.6);
                        a.closePath();
                        a.moveTo(219.9, 140.2);
                        a.bezierCurveTo(219.5, 141.6, 218.8, 143, 218, 144.5);
                        a.bezierCurveTo(217.8, 144.9, 217.6, 145.2, 217.3, 145.6);
                        a.bezierCurveTo(216.7, 146.3, 215.9, 146.9, 214.9, 147.4);
                        a.bezierCurveTo(214.1, 147.8, 213.2, 148.2, 212.3, 148.4);
                        a.bezierCurveTo(210.2, 149.1, 208, 149.5, 205.6, 149.5);
                        a.bezierCurveTo(204.5, 149.5, 203.4, 149.4, 202.3, 149.3);
                        a.bezierCurveTo(200.6, 148.9, 199.7, 148, 199.8, 146.7);
                        a.lineTo(200.7, 145.2);
                        a.bezierCurveTo(201.3, 144.3, 201.8, 143.4, 202.4, 142.5);
                        a.bezierCurveTo(202.7, 141.9, 203, 141.3, 203.4, 140.8);
                        a.bezierCurveTo(203.8, 140, 204.2, 139.2, 204.7, 138.5);
                        a.bezierCurveTo(205.3,
                            137.7, 205.9, 136.8, 206.5, 136);
                        a.bezierCurveTo(206.9, 135.5, 207.3, 135, 207.6, 134.5);
                        a.bezierCurveTo(208.3, 133.7, 209, 132.8, 209.7, 132);
                        a.bezierCurveTo(209.9, 131.7, 210.2, 131.4, 210.5, 131);
                        a.bezierCurveTo(211, 130.4, 211.5, 129.9, 212.1, 129.3);
                        a.bezierCurveTo(212.6, 128.8, 213.1, 128.3, 213.6, 127.8);
                        a.bezierCurveTo(214.1, 127.4, 214.6, 127, 215.1, 126.6);
                        a.bezierCurveTo(215.3, 126.4, 215.5, 126.3, 215.6, 126.2);
                        a.bezierCurveTo(216.8, 125.4, 217.9, 124.8, 219, 124.5);
                        a.lineTo(219.3, 125.4);
                        a.bezierCurveTo(220, 127.9, 220.5, 130.6, 220.8,
                            133.3);
                        a.bezierCurveTo(221, 135.7, 220.8, 138, 219.9, 140.2);
                        a.closePath();
                        a.moveTo(106, 40.4);
                        a.lineTo(113.7, 38.9);
                        a.bezierCurveTo(114.2, 38.8, 114.6, 38.7, 114.8, 38.6);
                        a.bezierCurveTo(115.2, 38.6, 115.7, 38.4, 116.1, 38.3);
                        a.bezierCurveTo(117.2, 37.9, 118.2, 37.4, 119, 36.8);
                        a.lineTo(119.5, 35.6);
                        a.lineTo(123.3, 21.1);
                        a.bezierCurveTo(124.5, 18.2, 126.8, 14.6, 130.1, 10.3);
                        a.bezierCurveTo(135.2, 4.8, 141, 2.4, 147.6, 3.1);
                        a.bezierCurveTo(150.9, 3.4, 152.9, 5.2, 153.5, 8.5);
                        a.bezierCurveTo(153.7, 10.3, 153.7, 12, 153.3, 13.7);
                        a.bezierCurveTo(152.9,
                            15.9, 151.7, 17.6, 149.7, 18.6);
                        a.bezierCurveTo(148.8, 19.2, 147.1, 19.4, 144.6, 19.1);
                        a.lineTo(143.4, 19);
                        a.lineTo(141.3, 19);
                        a.bezierCurveTo(138.9, 19.1, 136.7, 19.9, 134.8, 21.5);
                        a.bezierCurveTo(132.4, 23.5, 130.7, 25.2, 129.7, 26.8);
                        a.bezierCurveTo(128.9, 28.3, 127.9, 30.7, 126.7, 33.8);
                        a.lineTo(126.4, 36.8);
                        a.lineTo(126.7, 37.7);
                        a.lineTo(128.6, 38.7);
                        a.bezierCurveTo(129.5, 39.2, 130.5, 39.5, 131.6, 39.8);
                        a.bezierCurveTo(132.7, 40, 134.1, 40.4, 135.8, 41);
                        a.bezierCurveTo(137.6, 41.7, 139.9, 42.4, 142.9, 43.3);
                        a.bezierCurveTo(146.3, 44.6,
                            149.8, 46, 153.1, 47.4);
                        a.bezierCurveTo(142.8, 50.4, 133.4, 55.2, 125, 61.8);
                        a.bezierCurveTo(124.8, 61.6, 124.5, 61.3, 124.3, 61);
                        a.bezierCurveTo(116.3, 51.7, 106.9, 45.6, 95.9, 42.7);
                        a.bezierCurveTo(99.2, 41.9, 102.5, 41.1, 106, 40.4);
                        a.closePath();
                        a.moveTo(41.7, 90.1);
                        a.bezierCurveTo(42.4, 84.8, 43.6, 79.9, 45.5, 75.3);
                        a.bezierCurveTo(46.5, 72.7, 47.7, 70.1, 49.2, 67.7);
                        a.bezierCurveTo(52.7, 61.9, 57.3, 56.8, 63, 52.3);
                        a.bezierCurveTo(70.4, 46.7, 77.8, 43.8, 85.3, 43.7);
                        a.bezierCurveTo(87.3, 43.6, 89.3, 43.8, 91.3, 44.1);
                        a.bezierCurveTo(95.6,
                            44.9, 100, 46.5, 104.4, 49.1);
                        a.bezierCurveTo(111.9, 53.4, 117.3, 59.5, 120.8, 67.4);
                        a.lineTo(124.2, 73.8);
                        a.lineTo(124.6, 73.8);
                        a.bezierCurveTo(124.7, 73.5, 124.9, 73.2, 125, 72.9);
                        a.bezierCurveTo(126.3, 71.1, 127.5, 69.4, 128.6, 67.7);
                        a.bezierCurveTo(136, 57.6, 146.1, 51.7, 158.7, 50.1);
                        a.bezierCurveTo(158.9, 50.1, 159.1, 50.1, 159.2, 50.1);
                        a.bezierCurveTo(162.5, 50.1, 165.7, 50.5, 168.8, 51.2);
                        a.bezierCurveTo(176.5, 53, 183.4, 56.7, 189.4, 62.4);
                        a.bezierCurveTo(190, 63, 190.6, 63.5, 191.1, 64.1);
                        a.bezierCurveTo(193.9, 67, 196.1, 70.1, 197.8, 73.5);
                        a.bezierCurveTo(201.1, 79.7, 202.5, 86.8, 202.2, 94.7);
                        a.bezierCurveTo(202, 99, 201.3, 103.2, 199.9, 107.1);
                        a.bezierCurveTo(197.5, 114.2, 193.1, 120.7, 186.7, 126.4);
                        a.bezierCurveTo(177.6, 134.4, 168.3, 137.9, 158.5, 137);
                        a.bezierCurveTo(153.1, 136.4, 149.4, 135.6, 147.3, 134.6);
                        a.bezierCurveTo(137.6, 129.8, 130.4, 122.6, 125.6, 113);
                        a.bezierCurveTo(124.9, 111.7, 124.3, 110.4, 123.8, 109);
                        a.bezierCurveTo(123.3, 107.9, 122.9, 106.7, 122.6, 105.5);
                        a.bezierCurveTo(121.9, 106.9, 121.2, 108.3, 120.5, 109.6);
                        a.bezierCurveTo(119.7, 111, 118.8, 112.4,
                            118, 113.7);
                        a.bezierCurveTo(110.3, 125.2, 100.6, 132.5, 88.9, 135.6);
                        a.bezierCurveTo(75.9, 139.1, 64.3, 136.3, 54.2, 127.3);
                        a.bezierCurveTo(51.5, 124.9, 49.2, 122.2, 47.4, 119.3);
                        a.bezierCurveTo(42.2, 111.4, 40.4, 101.7, 41.7, 90.1);
                        a.closePath();
                        a.moveTo(20.3, 118.2);
                        a.bezierCurveTo(20.4, 117, 20.4, 116.4, 20.3, 116.5);
                        a.bezierCurveTo(24.4, 105.8, 29.8, 95.7, 36.6, 86.2);
                        a.bezierCurveTo(37.1, 85.5, 37.7, 84.8, 38.2, 84.1);
                        a.bezierCurveTo(37.1, 88.6, 36.6, 93.4, 36.6, 98.3);
                        a.bezierCurveTo(36.7, 106.3, 38.6, 113.5, 42.5, 119.7);
                        a.bezierCurveTo(45.8,
                            125.2, 50.6, 129.9, 56.8, 134);
                        a.bezierCurveTo(70, 142.9, 83.7, 143.9, 98, 137.2);
                        a.bezierCurveTo(106.4, 133.2, 113.9, 127.9, 120.6, 121.5);
                        a.lineTo(120.9, 121.3);
                        a.lineTo(121.3, 121.5);
                        a.bezierCurveTo(126.4, 125, 131.7, 128.7, 137.2, 132.7);
                        a.bezierCurveTo(142.2, 136.2, 147.7, 138.6, 153.7, 139.7);
                        a.bezierCurveTo(161.7, 140.8, 169.7, 139.6, 177.8, 135.9);
                        a.bezierCurveTo(183.6, 133.5, 188.4, 130, 192.3, 125.5);
                        a.bezierCurveTo(197.1, 119.7, 200.6, 113.5, 202.9, 106.8);
                        a.bezierCurveTo(203.6, 104.8, 204.2, 102.7, 204.6, 100.6);
                        a.bezierCurveTo(205.1,
                            98.2, 205.5, 95.7, 205.7, 93.2);
                        a.bezierCurveTo(205.8, 92.2, 205.8, 91.1, 205.9, 90.2);
                        a.bezierCurveTo(205.9, 86.5, 205.4, 83, 204.4, 79.6);
                        a.bezierCurveTo(209.2, 84.5, 213.3, 89.7, 216.9, 95.4);
                        a.bezierCurveTo(218.2, 97.5, 219.3, 99.6, 220.2, 101.8);
                        a.bezierCurveTo(220.5, 102.5, 220.8, 103.3, 221, 104);
                        a.bezierCurveTo(221.4, 104.9, 221.6, 105.7, 221.6, 106.6);
                        a.bezierCurveTo(221.6, 107.6, 221.5, 108.5, 221.3, 109.4);
                        a.bezierCurveTo(221.1, 110.4, 220.8, 111.5, 220.3, 112.5);
                        a.bezierCurveTo(220.1, 113, 219.8, 113.5, 219.4, 114);
                        a.bezierCurveTo(218.7,
                            115.1, 217.8, 116.3, 216.7, 117.4);
                        a.lineTo(214.9, 119.9);
                        a.lineTo(211.7, 124);
                        a.lineTo(209.8, 126.7);
                        a.lineTo(202.9, 136.6);
                        a.lineTo(195.9, 144.6);
                        a.bezierCurveTo(192.6, 148.2, 187.7, 152, 181.4, 156.2);
                        a.lineTo(161.4, 168.4);
                        a.bezierCurveTo(159.7, 169.4, 156.6, 170.7, 152, 172.3);
                        a.bezierCurveTo(147.4, 173.9, 141.6, 175.3, 134.5, 176.2);
                        a.bezierCurveTo(128.4, 177.1, 122.5, 177.2, 116.7, 176.5);
                        a.bezierCurveTo(109, 175.8, 101.5, 174.4, 94.1, 172.2);
                        a.bezierCurveTo(86.9, 170, 79.8, 167.4, 72.9, 164.4);
                        a.bezierCurveTo(72, 164, 71, 163.5, 70.1,
                            163.1);
                        a.bezierCurveTo(65.2, 160.7, 60.8, 158.3, 57, 155.8);
                        a.bezierCurveTo(54.7, 154.3, 52.5, 152.9, 50.5, 151.5);
                        a.bezierCurveTo(47.2, 149.4, 44.1, 147.1, 41.1, 144.8);
                        a.bezierCurveTo(37.4, 142, 34, 138.9, 31.1, 135.5);
                        a.bezierCurveTo(29.4, 133.7, 27.9, 131.7, 26.5, 129.7);
                        a.bezierCurveTo(26.4, 129.5, 26.3, 129.4, 26.2, 129.3);
                        a.lineTo(25, 127.3);
                        a.bezierCurveTo(23.3, 125, 22.2, 123.4, 21.6, 122.5);
                        a.bezierCurveTo(20.7, 121.1, 20.2, 119.7, 20.3, 118.2);
                        a.closePath();
                        a.moveTo(177.9, 163.2);
                        a.lineTo(174.9, 169.8);
                        a.lineTo(174.7, 170.3);
                        a.lineTo(174.4,
                            170.9);
                        a.bezierCurveTo(174, 172.1, 173.5, 173.3, 173.1, 174.5);
                        a.bezierCurveTo(172.2, 177.2, 171.1, 179.7, 169.6, 182.2);
                        a.bezierCurveTo(168.3, 184.5, 166.3, 186.1, 163.6, 187.2);
                        a.bezierCurveTo(160.6, 188.4, 157.5, 188.5, 154.4, 187.3);
                        a.bezierCurveTo(151.9, 186.4, 149.5, 185.5, 147.2, 184.7);
                        a.lineTo(146.7, 184.5);
                        a.lineTo(146.3, 184.3);
                        a.lineTo(140.9, 182.4);
                        a.bezierCurveTo(142.8, 182.1, 145, 181.4, 147.5, 180.4);
                        a.bezierCurveTo(148.2, 180, 148.9, 179.7, 149.6, 179.4);
                        a.bezierCurveTo(152.5, 178, 155.3, 176.5, 158.1, 174.8);
                        a.bezierCurveTo(161.2,
                            172.9, 164.4, 171.1, 167.5, 169.3);
                        a.bezierCurveTo(170.7, 167.7, 173.7, 165.9, 176.8, 163.9);
                        a.bezierCurveTo(177.2, 163.7, 177.6, 163.5, 177.9, 163.2);
                        a.closePath();
                        a.moveTo(101.1, 181.4);
                        a.lineTo(97.1, 184.2);
                        a.lineTo(96.8, 184.3);
                        a.lineTo(96.3, 184.7);
                        a.bezierCurveTo(93.2, 186.5, 90.2, 187.9, 87.1, 188.9);
                        a.bezierCurveTo(83.9, 189.9, 81.1, 189.2, 78.6, 186.6);
                        a.bezierCurveTo(76, 184.1, 74, 181.3, 72.5, 178.3);
                        a.bezierCurveTo(71.3, 175.7, 70.1, 172.9, 69, 170.1);
                        a.lineTo(68, 167.8);
                        a.bezierCurveTo(67.8, 167.3, 67.7, 166.8, 67.5, 166.3);
                        a.bezierCurveTo(69.1,
                            167.1, 70.7, 167.9, 72.4, 168.8);
                        a.bezierCurveTo(74.1, 169.6, 75.9, 170.5, 77.9, 171.4);
                        a.bezierCurveTo(79.9, 172.3, 83.2, 173.8, 87.9, 175.9);
                        a.bezierCurveTo(92.5, 177.9, 95.7, 179.3, 97.5, 180);
                        a.bezierCurveTo(99.2, 180.7, 100.4, 181.2, 101.1, 181.4);
                        a.closePath();
                        a.moveTo(25.8, 151.1);
                        a.bezierCurveTo(23.2, 147.7, 22, 143.6, 22.3, 139);
                        a.bezierCurveTo(22.3, 139, 22.3, 139, 22.3, 139);
                        a.lineTo(22.4, 135.1);
                        a.bezierCurveTo(22.5, 134.4, 22.9, 134.4, 23.6, 134.9);
                        a.bezierCurveTo(24.4, 135.4, 25.2, 136, 26, 136.6);
                        a.bezierCurveTo(27.6, 137.8, 29.1,
                            139, 30.7, 140.2);
                        a.bezierCurveTo(34.1, 142.9, 37.3, 145.8, 40.4, 148.8);
                        a.bezierCurveTo(42.4, 150.6, 44.1, 152.6, 45.6, 154.7);
                        a.bezierCurveTo(45.8, 155.3, 45.9, 155.7, 45.7, 156);
                        a.lineTo(45.5, 156.1);
                        a.bezierCurveTo(40.5, 158.4, 35.6, 158.3, 30.9, 155.9);
                        a.bezierCurveTo(30.6, 155.7, 30.3, 155.6, 30, 155.4);
                        a.bezierCurveTo(30, 155.3, 29.9, 155.3, 29.9, 155.3);
                        a.bezierCurveTo(28.3, 154, 26.9, 152.6, 25.8, 151.1);
                        a.closePath();
                        a.moveTo(240.9, 209.6);
                        a.bezierCurveTo(240.1, 211.5, 239.1, 213.3, 237.8, 215);
                        a.bezierCurveTo(236.5, 216.5, 235.2, 218.1,
                            233.9, 219.6);
                        a.bezierCurveTo(233.4, 220.2, 232.8, 220.7, 232.3, 221.1);
                        a.bezierCurveTo(230.1, 222.1, 227.5, 222.5, 224.3, 222.1);
                        a.bezierCurveTo(218.9, 221.9, 213.4, 222, 207.7, 222.3);
                        a.bezierCurveTo(206.5, 222.4, 205.3, 222.4, 204, 222.5);
                        a.bezierCurveTo(203.3, 218.7, 201.8, 213.8, 199.6, 207.8);
                        a.lineTo(200.2, 212.5);
                        a.bezierCurveTo(200.1, 212, 200, 211.2, 199.7, 210.2);
                        a.bezierCurveTo(199.9, 214.1, 200, 218.2, 199.9, 222.3);
                        a.bezierCurveTo(199.9, 222.5, 199.9, 222.7, 199.9, 222.9);
                        a.bezierCurveTo(199.9, 225, 199.7, 226.9, 199.4, 228.8);
                        a.bezierCurveTo(199.1,
                            230.4, 198.7, 232, 198.3, 233.5);
                        a.lineTo(196.7, 235.1);
                        a.bezierCurveTo(196.6, 235.2, 196.5, 235.4, 196.3, 235.5);
                        a.bezierCurveTo(195.2, 236.4, 193.3, 237.6, 190.7, 239.1);
                        a.bezierCurveTo(188.1, 240.7, 184.5, 241.7, 179.9, 242.1);
                        a.bezierCurveTo(175.3, 242.4, 172, 242.5, 169.8, 242.3);
                        a.bezierCurveTo(167.8, 242.1, 165.5, 241.6, 162.9, 240.8);
                        a.bezierCurveTo(160.4, 239.9, 158, 237.9, 155.6, 234.8);
                        a.bezierCurveTo(155.4, 234.6, 155.3, 234.4, 155.1, 234.2);
                        a.bezierCurveTo(154.3, 233, 153.5, 231.6, 152.8, 230);
                        a.bezierCurveTo(151.9, 227.8, 151.2,
                            225.3, 150.7, 222.4);
                        a.bezierCurveTo(150.7, 222.2, 150.6, 222.1, 150.6, 221.9);
                        a.bezierCurveTo(149.7, 216.4, 149.3, 213.1, 149.2, 212);
                        a.bezierCurveTo(148.8, 215.6, 148.6, 219.2, 148.8, 222.8);
                        a.bezierCurveTo(148.9, 225.2, 149, 227.6, 149.4, 230);
                        a.bezierCurveTo(149.4, 230.3, 149.4, 230.6, 149.5, 231);
                        a.bezierCurveTo(141, 233.2, 132.2, 234.4, 123.2, 234.4);
                        a.bezierCurveTo(113.4, 235.1, 103.6, 234.6, 93.8, 233);
                        a.lineTo(94, 232);
                        a.bezierCurveTo(94.3, 230, 94.4, 228.1, 94.4, 226.2);
                        a.bezierCurveTo(94.4, 225.6, 94.3, 224.9, 94.3, 224.3);
                        a.bezierCurveTo(94.2,
                            220.7, 94, 217.1, 93.8, 213.5);
                        a.bezierCurveTo(93.8, 214.9, 93.7, 215.9, 93.6, 216.6);
                        a.bezierCurveTo(93.5, 217.2, 93.5, 217.7, 93.4, 218.1);
                        a.bezierCurveTo(93.4, 218.5, 93.2, 219.4, 92.8, 220.9);
                        a.bezierCurveTo(92.6, 222, 92.3, 223, 92, 223.9);
                        a.bezierCurveTo(91.9, 224.2, 91.8, 224.5, 91.7, 224.8);
                        a.bezierCurveTo(91.3, 226, 90.8, 227.1, 90.2, 228.3);
                        a.bezierCurveTo(89.9, 229, 89.5, 229.7, 89.2, 230.4);
                        a.bezierCurveTo(88.8, 230.9, 88.4, 231.4, 88, 231.9);
                        a.bezierCurveTo(87.5, 232.5, 86.9, 233.1, 86.2, 233.7);
                        a.bezierCurveTo(85.8, 234.1, 85.4, 234.5,
                            84.9, 234.8);
                        a.bezierCurveTo(83.9, 235.6, 82.8, 236.2, 81.6, 236.7);
                        a.bezierCurveTo(80.2, 237.3, 78.7, 237.7, 77.1, 238.1);
                        a.bezierCurveTo(74.1, 238.7, 71, 239, 67.8, 239);
                        a.bezierCurveTo(60.3, 239.1, 53.6, 237.3, 47.7, 233.5);
                        a.bezierCurveTo(47.6, 233.4, 47.5, 233.4, 47.4, 233.3);
                        a.bezierCurveTo(45.9, 232.5, 45, 231.7, 44.9, 230.9);
                        a.lineTo(44.6, 229.2);
                        a.bezierCurveTo(44.6, 228.8, 44.5, 228.2, 44.5, 227.6);
                        a.bezierCurveTo(44.5, 225.9, 44.5, 223.5, 44.6, 220.3);
                        a.lineTo(44.6, 213.4);
                        a.lineTo(44.7, 207.6);
                        a.lineTo(43.7, 213);
                        a.lineTo(42.4, 220.3);
                        a.bezierCurveTo(41.9, 223.1, 41.7, 225.4, 41.6, 227.4);
                        a.bezierCurveTo(41, 227.3, 40.3, 227.3, 39.7, 227.2);
                        a.bezierCurveTo(37.7, 227.2, 35.8, 227.2, 33.8, 227.2);
                        a.bezierCurveTo(32, 227.2, 30.2, 227.2, 28.4, 227.2);
                        a.bezierCurveTo(26.4, 227.2, 24.5, 227.3, 22.6, 227.4);
                        a.bezierCurveTo(21.3, 227.4, 19.7, 227.5, 17.8, 227.7);
                        a.bezierCurveTo(15.9, 227.9, 13.9, 227.7, 11.9, 227.1);
                        a.bezierCurveTo(9.8, 226.4, 8.3, 225.2, 7.4, 223.5);
                        a.bezierCurveTo(6.5, 221.8, 5.6, 219.7, 4.8, 217.3);
                        a.bezierCurveTo(4, 214.8, 3.5, 212.9, 3.3, 211.5);
                        a.bezierCurveTo(3.2,
                            210.1, 3.6, 209, 4.5, 208.2);
                        a.bezierCurveTo(5.4, 207.3, 6.7, 206.1, 8.4, 204.6);
                        a.bezierCurveTo(10.2, 202.9, 11.6, 201.6, 12.7, 200.6);
                        a.bezierCurveTo(13.7, 199.6, 16.9, 197.2, 22.4, 193.3);
                        a.bezierCurveTo(26.1, 190.5, 28.7, 189.1, 30.1, 188.9);
                        a.bezierCurveTo(31.2, 193, 32.3, 197, 33.7, 201);
                        a.bezierCurveTo(34.2, 202.8, 35, 204.4, 36, 205.9);
                        a.lineTo(33.3, 187.7);
                        a.lineTo(33.1, 185.9);
                        a.lineTo(32.9, 184.7);
                        a.lineTo(32.7, 183.4);
                        a.bezierCurveTo(31.8, 176.3, 31, 168.9, 30.3, 161.3);
                        a.bezierCurveTo(30.3, 161, 30.3, 160.7, 30.2, 160.3);
                        a.bezierCurveTo(34.5,
                            162, 39, 162, 43.8, 160.4);
                        a.bezierCurveTo(44.4, 160.1, 45.1, 159.9, 45.8, 159.6);
                        a.lineTo(50.7, 157.9);
                        a.lineTo(63.1, 164.7);
                        a.bezierCurveTo(63.4, 166, 64, 168, 65.2, 170.7);
                        a.lineTo(65.5, 171.5);
                        a.bezierCurveTo(66.9, 174.7, 68.3, 177.8, 69.8, 180.9);
                        a.bezierCurveTo(71.4, 184.1, 73.4, 187, 76, 189.6);
                        a.bezierCurveTo(78.5, 192.2, 81.7, 193.4, 85.5, 193.1);
                        a.bezierCurveTo(89.2, 192.6, 92.8, 191.5, 96.3, 189.7);
                        a.bezierCurveTo(98.5, 188.6, 100.4, 187.4, 102.1, 185.9);
                        a.lineTo(103.2, 185);
                        a.bezierCurveTo(103.4, 184.9, 103.6, 184.7, 103.8, 184.6);
                        a.bezierCurveTo(106.5, 182.5, 108.3, 180.9, 109.3, 179.7);
                        a.lineTo(109.4, 179.7);
                        a.bezierCurveTo(114, 180.5, 118.1, 181, 121.9, 181.4);
                        a.bezierCurveTo(125.7, 181.8, 128.8, 181.8, 131.3, 181.4);
                        a.bezierCurveTo(133, 181.8, 136.2, 183.2, 140.7, 185.6);
                        a.bezierCurveTo(141, 185.7, 141.3, 185.9, 141.7, 186);
                        a.bezierCurveTo(142.1, 186.3, 142.6, 186.5, 143, 186.7);
                        a.bezierCurveTo(143.5, 186.9, 144, 187.1, 144.5, 187.3);
                        a.bezierCurveTo(147.1, 188.4, 149.8, 189.4, 152.5, 190.3);
                        a.bezierCurveTo(155.3, 191.3, 158.2, 191.7, 161.2, 191.7);
                        a.bezierCurveTo(164.2,
                            191.7, 166.7, 190.7, 168.6, 188.6);
                        a.bezierCurveTo(170, 187.2, 171.1, 185.6, 172, 184.1);
                        a.bezierCurveTo(173.4, 181.6, 174.7, 179.1, 175.9, 176.6);
                        a.bezierCurveTo(177.1, 174, 178.3, 171.4, 179.4, 168.7);
                        a.bezierCurveTo(179.7, 168, 180, 167.3, 180.2, 166.7);
                        a.bezierCurveTo(181.4, 164, 182, 162.2, 182, 161.5);
                        a.bezierCurveTo(183.8, 160.7, 186.6, 158.8, 190.2, 155.8);
                        a.lineTo(191, 155.2);
                        a.bezierCurveTo(191.7, 154.5, 192.6, 153.8, 193.4, 153.2);
                        a.bezierCurveTo(193.8, 153, 194.1, 152.8, 194.5, 152.6);
                        a.lineTo(196.6, 153.6);
                        a.bezierCurveTo(197, 153.7,
                            197.6, 153.8, 198.4, 153.8);
                        a.bezierCurveTo(199.3, 153.8, 200.6, 153.7, 202.1, 153.6);
                        a.bezierCurveTo(204.6, 153.5, 207, 153.1, 209.4, 152.5);
                        a.bezierCurveTo(210.5, 152.1, 211.6, 151.8, 212.6, 151.3);
                        a.bezierCurveTo(212.6, 151.4, 212.6, 151.4, 212.6, 151.4);
                        a.bezierCurveTo(213.3, 158.8, 213.4, 166.1, 212.8, 173.3);
                        a.lineTo(211.2, 182.6);
                        a.lineTo(211, 183.6);
                        a.lineTo(209.4, 192.8);
                        a.lineTo(208.3, 198);
                        a.lineTo(208.4, 198.1);
                        a.bezierCurveTo(210.9, 194.2, 212.8, 190, 214.2, 185.6);
                        a.lineTo(240.5, 201.5);
                        a.bezierCurveTo(241.1, 202.2, 241.6,
                            202.9, 241.8, 203.6);
                        a.bezierCurveTo(242.1, 205.4, 241.8, 207.4, 240.9, 209.6);
                        a.closePath();
                        a.fillStyle = "rgb(35, 44, 30)";
                        a.fill();
                        a.beginPath();
                        a.moveTo(219.9, 140.2);
                        a.bezierCurveTo(219.5, 141.6, 218.8, 143, 218, 144.5);
                        a.bezierCurveTo(217.8, 144.9, 217.6, 145.2, 217.3, 145.6);
                        a.bezierCurveTo(216.7, 146.3, 215.9, 146.9, 214.9, 147.4);
                        a.bezierCurveTo(214.1, 147.8, 213.2, 148.2, 212.3, 148.4);
                        a.bezierCurveTo(210.2, 149.1, 208, 149.5, 205.6, 149.5);
                        a.bezierCurveTo(204.5, 149.5, 203.4, 149.4, 202.3, 149.3);
                        a.bezierCurveTo(200.6, 148.9,
                            199.7, 148, 199.8, 146.7);
                        a.lineTo(200.7, 145.2);
                        a.bezierCurveTo(201.3, 144.3, 201.8, 143.4, 202.4, 142.5);
                        a.bezierCurveTo(202.7, 141.9, 203, 141.3, 203.4, 140.8);
                        a.bezierCurveTo(203.8, 140, 204.2, 139.2, 204.7, 138.5);
                        a.bezierCurveTo(205.3, 137.7, 205.9, 136.8, 206.5, 136);
                        a.bezierCurveTo(206.9, 135.5, 207.3, 135, 207.6, 134.5);
                        a.bezierCurveTo(208.3, 133.7, 209, 132.8, 209.7, 132);
                        a.bezierCurveTo(209.9, 131.7, 210.2, 131.4, 210.5, 131);
                        a.bezierCurveTo(211, 130.4, 211.5, 129.9, 212.1, 129.3);
                        a.bezierCurveTo(212.6, 128.8, 213.1, 128.3, 213.6, 127.8);
                        a.bezierCurveTo(214.1, 127.4, 214.6, 127, 215.1, 126.6);
                        a.bezierCurveTo(215.3, 126.4, 215.5, 126.3, 215.6, 126.2);
                        a.bezierCurveTo(216.8, 125.4, 217.9, 124.8, 219, 124.5);
                        a.lineTo(219.3, 125.4);
                        a.bezierCurveTo(220, 127.9, 220.5, 130.6, 220.8, 133.3);
                        a.bezierCurveTo(221, 135.7, 220.8, 138, 219.9, 140.2);
                        a.closePath();
                        a.moveTo(40.4, 148.8);
                        a.bezierCurveTo(37.3, 145.8, 34.1, 142.9, 30.7, 140.2);
                        a.bezierCurveTo(29.1, 139, 27.6, 137.8, 26, 136.6);
                        a.bezierCurveTo(25.2, 136, 24.4, 135.4, 23.6, 134.9);
                        a.bezierCurveTo(22.9, 134.4, 22.5, 134.4, 22.4, 135.1);
                        a.lineTo(22.3, 139);
                        a.bezierCurveTo(22.3, 139, 22.3, 139, 22.3, 139);
                        a.bezierCurveTo(22, 143.6, 23.2, 147.7, 25.8, 151.1);
                        a.bezierCurveTo(26.9, 152.6, 28.3, 154, 29.9, 155.3);
                        a.bezierCurveTo(29.9, 155.3, 30, 155.3, 30, 155.4);
                        a.bezierCurveTo(30.3, 155.6, 30.6, 155.7, 30.9, 155.9);
                        a.bezierCurveTo(35.6, 158.3, 40.5, 158.4, 45.5, 156.1);
                        a.lineTo(45.7, 156);
                        a.bezierCurveTo(45.9, 155.7, 45.8, 155.3, 45.6, 154.7);
                        a.bezierCurveTo(44.1, 152.6, 42.4, 150.6, 40.4, 148.8);
                        a.closePath();
                        a.moveTo(87.9, 175.9);
                        a.bezierCurveTo(83.2, 173.8, 79.9, 172.3, 77.9,
                            171.4);
                        a.bezierCurveTo(75.9, 170.5, 74.1, 169.6, 72.4, 168.8);
                        a.bezierCurveTo(70.7, 167.9, 69.1, 167.1, 67.5, 166.3);
                        a.bezierCurveTo(67.7, 166.8, 67.8, 167.3, 68, 167.8);
                        a.lineTo(69, 170.1);
                        a.bezierCurveTo(70.1, 172.9, 71.3, 175.7, 72.5, 178.3);
                        a.bezierCurveTo(74, 181.3, 76, 184.1, 78.6, 186.6);
                        a.bezierCurveTo(81.1, 189.2, 83.9, 189.9, 87.1, 188.9);
                        a.bezierCurveTo(90.2, 187.9, 93.2, 186.5, 96.3, 184.7);
                        a.lineTo(96.8, 184.3);
                        a.lineTo(97.1, 184.2);
                        a.lineTo(101.1, 181.4);
                        a.bezierCurveTo(100.4, 181.2, 99.2, 180.7, 97.5, 180);
                        a.bezierCurveTo(95.7,
                            179.3, 92.5, 177.9, 87.9, 175.9);
                        a.closePath();
                        a.moveTo(167.5, 169.3);
                        a.bezierCurveTo(164.4, 171.1, 161.2, 172.9, 158.1, 174.8);
                        a.bezierCurveTo(155.3, 176.5, 152.5, 178, 149.6, 179.4);
                        a.bezierCurveTo(148.9, 179.7, 148.2, 180, 147.5, 180.4);
                        a.bezierCurveTo(145, 181.4, 142.8, 182.1, 140.9, 182.4);
                        a.lineTo(146.3, 184.3);
                        a.lineTo(146.7, 184.5);
                        a.lineTo(147.2, 184.7);
                        a.bezierCurveTo(149.5, 185.5, 151.9, 186.4, 154.4, 187.3);
                        a.bezierCurveTo(157.5, 188.5, 160.6, 188.4, 163.6, 187.2);
                        a.bezierCurveTo(166.3, 186.1, 168.3, 184.5, 169.6, 182.2);
                        a.bezierCurveTo(171.1,
                            179.7, 172.2, 177.2, 173.1, 174.5);
                        a.bezierCurveTo(173.5, 173.3, 174, 172.1, 174.4, 170.9);
                        a.lineTo(174.7, 170.3);
                        a.lineTo(174.9, 169.8);
                        a.lineTo(177.9, 163.2);
                        a.bezierCurveTo(177.6, 163.5, 177.2, 163.7, 176.8, 163.9);
                        a.bezierCurveTo(173.7, 165.9, 170.7, 167.7, 167.5, 169.3);
                        a.closePath();
                        a.moveTo(202.2, 94.7);
                        a.bezierCurveTo(202.5, 86.8, 201.1, 79.7, 197.8, 73.5);
                        a.bezierCurveTo(196.1, 70.1, 193.9, 67, 191.1, 64.1);
                        a.bezierCurveTo(190.6, 63.5, 190, 63, 189.4, 62.4);
                        a.bezierCurveTo(183.4, 56.7, 176.5, 53, 168.8, 51.2);
                        a.bezierCurveTo(165.7,
                            50.5, 162.5, 50.1, 159.2, 50.1);
                        a.bezierCurveTo(159.1, 50.1, 158.9, 50.1, 158.7, 50.1);
                        a.bezierCurveTo(146.1, 51.7, 136, 57.6, 128.6, 67.7);
                        a.bezierCurveTo(127.5, 69.4, 126.3, 71.1, 125, 72.9);
                        a.bezierCurveTo(124.9, 73.2, 124.7, 73.5, 124.6, 73.8);
                        a.lineTo(124.4, 74.2);
                        a.lineTo(124.2, 73.8);
                        a.lineTo(120.8, 67.4);
                        a.bezierCurveTo(117.3, 59.5, 111.9, 53.4, 104.4, 49.1);
                        a.bezierCurveTo(100, 46.5, 95.6, 44.9, 91.3, 44.1);
                        a.bezierCurveTo(89.3, 43.8, 87.3, 43.6, 85.3, 43.7);
                        a.bezierCurveTo(77.8, 43.8, 70.4, 46.7, 63, 52.3);
                        a.bezierCurveTo(57.3, 56.8,
                            52.7, 61.9, 49.2, 67.7);
                        a.bezierCurveTo(47.7, 70.1, 46.5, 72.7, 45.5, 75.3);
                        a.bezierCurveTo(43.6, 79.9, 42.4, 84.8, 41.7, 90.1);
                        a.bezierCurveTo(40.4, 101.7, 42.2, 111.4, 47.4, 119.3);
                        a.bezierCurveTo(49.2, 122.2, 51.5, 124.9, 54.2, 127.3);
                        a.bezierCurveTo(64.3, 136.3, 75.9, 139.1, 88.9, 135.6);
                        a.bezierCurveTo(100.6, 132.5, 110.3, 125.2, 118, 113.7);
                        a.bezierCurveTo(118.8, 112.4, 119.7, 111, 120.5, 109.6);
                        a.bezierCurveTo(121.2, 108.3, 121.9, 106.9, 122.6, 105.5);
                        a.bezierCurveTo(122.9, 106.7, 123.3, 107.9, 123.8, 109);
                        a.bezierCurveTo(124.3, 110.4, 124.9,
                            111.7, 125.6, 113);
                        a.bezierCurveTo(130.4, 122.6, 137.6, 129.8, 147.3, 134.6);
                        a.bezierCurveTo(149.4, 135.6, 153.1, 136.4, 158.5, 137);
                        a.bezierCurveTo(168.3, 137.9, 177.6, 134.4, 186.7, 126.4);
                        a.bezierCurveTo(193.1, 120.7, 197.5, 114.2, 199.9, 107.1);
                        a.bezierCurveTo(201.3, 103.2, 202, 99, 202.2, 94.7);
                        a.closePath();
                        a.fillStyle = "rgb(255, 255, 255)";
                        a.fill();
                        a.save();
                        a.translate(g, 0);
                        a.beginPath();
                        a.moveTo(101.3, 71.1);
                        a.bezierCurveTo(101, 71.1, 100.7, 71.2, 100.5, 71.3);
                        a.bezierCurveTo(100.5, 71.3, 100.5, 71.3, 100.5, 71.3);
                        a.bezierCurveTo(102.7,
                            72.9, 103.8, 75.8, 104, 79.9);
                        a.bezierCurveTo(104.1, 84.2, 100.5, 86.1, 93, 85.6);
                        a.bezierCurveTo(91, 85.5, 89.2, 85.4, 87.8, 85.3);
                        a.bezierCurveTo(87.7, 86.6, 87.6, 87.9, 87.6, 89.3);
                        a.bezierCurveTo(87.8, 91.8, 88.6, 94.3, 89.9, 96.7);
                        a.bezierCurveTo(91.9, 101.5, 95.2, 103.9, 99.8, 103.9);
                        a.bezierCurveTo(107.4, 103.7, 112.3, 98, 114.7, 86.8);
                        a.bezierCurveTo(114.7, 74.4, 110.2, 69.2, 101.3, 71.1);
                        a.closePath();
                        a.fillStyle = "rgb(0, 0, 0)";
                        a.fill();
                        a.restore();
                        a.save();
                        a.translate(h, 0);
                        a.beginPath();
                        a.moveTo(150.4, 74.1);
                        a.bezierCurveTo(147.9,
                            71.7, 145.3, 70.5, 142.4, 70.5);
                        a.bezierCurveTo(141.5, 70.5, 140.5, 70.7, 139.6, 71);
                        a.bezierCurveTo(140.1, 71.3, 140.6, 71.6, 141.1, 72);
                        a.bezierCurveTo(143.3, 73.6, 144.5, 76.5, 144.6, 80.6);
                        a.bezierCurveTo(144.8, 84.9, 141.1, 86.8, 133.7, 86.3);
                        a.bezierCurveTo(132.1, 86.2, 130.8, 86.2, 129.6, 86.1);
                        a.bezierCurveTo(129.6, 86.2, 129.6, 86.2, 129.6, 86.3);
                        a.bezierCurveTo(129.6, 89.1, 130.2, 91.7, 131.5, 94.1);
                        a.bezierCurveTo(134.1, 99, 138.3, 101.5, 144, 101.5);
                        a.bezierCurveTo(146.8, 101.7, 149.7, 99.7, 152.5, 95.6);
                        a.bezierCurveTo(154.5, 91.6, 155.5,
                            88.9, 155.5, 87.5);
                        a.bezierCurveTo(155.5, 81.9, 153.8, 77.5, 150.4, 74.1);
                        a.closePath();
                        a.fillStyle = "rgb(0, 0, 0)";
                        a.fill();
                        a.restore();
                        a.restore();
                        a.restore()
                    }

                    function m(a) {
                        function b() {
                            var q = Date.now() - e;
                            q < s ? g = 0 - d.No(q, 0, 100, s) : q < w ? q > s + 100 && (n = m = -1 * d.Rf(q - (s + 100), 0, 10, w - (s + 100))) : q < v ? n = m = -10 + d.Ek(q - w, 20, v - w) : q < x ? q > v + 100 && (n = m = 10 - d.Ek(q - (v + 100), 10, x - (v + 100))) : q < z || q < B && (l = d.Rf(q - z, p, 50, B - z));
                            q > s && q < v && (G = d.Dk(q - s, 0.02, v - s, 6));
                            q > v && q < z && (G = 0.02 - d.Dk(q - v, 0.02, z - v, 2));
                            var C = 0 + h,
                                J = 75 + l + g;
                            c.save();
                            c.rotate(30 *
                                Math.PI / 180);
                            f(c, 0.32, 0.32 + G, C, J, m, n);
                            c.restore();
                            q < B ? window.requestAnimationFrame(b) : a()
                        }
                        var c = q.getContext("2d"),
                            e = Date.now(),
                            g = 0.1,
                            h = 0,
                            l = 0,
                            m = 0,
                            n = 0,
                            p = h,
                            s = 600,
                            w = 400 + s,
                            v = 600 + w,
                            x = 700 + v,
                            z = 500 + x,
                            B = 800 + z,
                            G = 0;
                        window.requestAnimationFrame(b)
                    }

                    function p() {
                        $("#dpic").removeClass();
                        $("#dframe").animate({
                            top: a.e(50),
                            scale: 0.2
                        }, 350, "easeInExpo");
                        $("#dmsg").animate({
                            top: a.e(50),
                            scale: 0.2
                        }, 350, "easeInExpo");
                        $("#dshareBtn").fadeTo(200, 0);
                        $("#d").delay(200).fadeOut(200, function() {
                            h.Ih();
                            s = null;
                            $("#gameBtnTray").show()
                        })
                    }
                    var q, x, z = a.e(2.2);
                    this.jb = function() {
                        x = document.getElementById("e");
                        x.width = a.e(1024);
                        x.height = a.e(576);
                        if (q = document.getElementById("moreCanvas")) q.width = 51, q.height = 51;
                        $("#dshareBtn").click(function() {
                            c.cv(l.X(n.ps), c.Qv, e.gz() + "drawing" + s + ".jpg", function() {
                                p();
                                return !0
                            });
                            return !1
                        });
                        $("#d").click(function() {
                            p()
                        });
                        $("#moreLink").mouseenter(function() {
                            B || (B = !0, m(function() {
                                B = !1
                            }))
                        }).click(function() {
                            Analytics.aE("SMG_MRTINX_CTR_SITE_BehindtheScenes")
                        })
                    };
                    this.jd = function() {
                        g.subscribe(g.w.Pb, function() {
                            b.ia({
                                text: l.X(n.or),
                                Ki: "dmsg",
                                ua: !0
                            });
                            b.ia({
                                text: l.X(n.os),
                                Rc: "#dshareBtn img",
                                ua: !0
                            })
                        });
                        g.subscribe(g.w.as, this.iC);
                        g.subscribe(g.w.jr, this.lq)
                    };
                    var s = null;
                    this.lq = function(b) {
                        s = b + 1;
                        h.Gh();
                        $("#gameBtnTray").hide();
                        $("#dpic").addClass("drawing" + s);
                        $("#dframe").animate({
                            top: a.e(100),
                            scale: 0.35
                        }, 0);
                        $("#dframe").fadeTo(0, 0);
                        $("#dmsg").animate({
                            top: a.e(60),
                            scale: 0.5
                        }, 0);
                        $("#dmsg").fadeTo(0, 0);
                        $("#dshareBtn").fadeTo(0, 0);
                        $("#d").fadeIn(100, function() {
                            $("#dframe").fadeTo(0, 1);
                            $("#dmsg").fadeTo(0, 1);
                            $("#dframe").animate({
                                top: 0,
                                scale: 1
                            }, 350, "easeOutBack");
                            $("#dmsg").animate({
                                top: 0,
                                scale: 1
                            }, 350, "easeOutBack");
                            $("#dshareBtn").delay(600).fadeTo(200, 1)
                        })
                    };
                    var B = !1;
                    this.iC = function() {
                        var b = x.getContext("2d");
                        h.Gh();
                        $("#e").fadeIn(function() {
                            function c() {
                                var M = Date.now() - e;
                                M < v ? (g = d.No(M, s, z, v), l = d.No(M, x, z, v)) : M < C ? M > v + 100 && (q = p = -1 * d.Rf(M - (v + 100), 0, a.e(10), C - (v + 100))) : M < B ? q = p = a.e(-10) + d.Ek(M - C, a.e(20), B - C) : M < G ? M > B + 100 && (q = p = a.e(10) - d.Ek(M - (B + 100), a.e(10), G - (B + 100))) : !(M < J) && M < K && (n = d.Rf(M - J, w, a.e(300), K - J), g = a.e(z) - d.Rf(M - J, 0,
                                    a.e(2), v), l = a.e(z) - d.Rf(M - J, 0, a.e(2), v));
                                M > v && M < B && (O = d.Dk(M - v, 0.1, B - v, 6));
                                M > B && M < J && (O = 0.1 - d.Dk(M - B, 0.1, J - B, 2));
                                M < K ? window.requestAnimationFrame(c) : ($("#e").fadeOut(), h.Ih());
                                var M = m + (a.e(500) - g / z * a.e(200)),
                                    Q = n + (a.e(600) - l / z * a.e(400));
                                f(b, g, l + O, M, Q, p, q)
                            }
                            var e = Date.now(),
                                g = 0.1,
                                l = 0.1,
                                m = 0,
                                n = 0,
                                p = 0,
                                q = 0,
                                s = g,
                                x = l,
                                w = m,
                                v = 600,
                                C = 400 + v,
                                B = 600 + C,
                                G = 700 + B,
                                J = 500 + G,
                                K = 800 + J,
                                O = 0;
                            window.requestAnimationFrame(c)
                        })
                    }
                }
            }(fa, fb, S, J, Ra, ua, V, cb, ga, B),
            vc = function() {
                for (var b = ["ms", "moz", "webkit", "o"], c = 0; c < b.length && !window.requestAnimationFrame; c++) window.requestAnimationFrame =
                    window[b[c] + "RequestAnimationFrame"];
                if (!window.requestAnimationFrame) {
                    var e = 1E3 / 60,
                        a = 0;
                    window.requestAnimationFrame = function(b) {
                        var c = Date.now(),
                            g = Math.max(0, e - (c - a));
                        window.setTimeout(function() {
                            b(Date.now())
                        }, g);
                        a = c + g
                    }
                }
                return window.requestAnimationFrame
            }(),
            wc = function(b, c, e, a, f, d, g, h, l) {
                function n() {
                    var a = document.getElementById("vid");
                    if (!a) {
                        try {
                            a = document.createElement("video")
                        } catch (b) {
                            return null
                        }
                        a.id = "vid";
                        a.className = "ctrPointer";
                        $("#video").append(a)
                    }
                    return a
                }
                var r = null,
                    m = {
                        tu: function() {
                            if (0 ===
                                (l.Yf(0, 0) || 0)) {
                                var a = n(),
                                    b = c.gt,
                                    d = e.cu(),
                                    f = e.Aw;
                                if (null != a && null != d) try {
                                    a.src = f + "intro_" + b + d, a.load()
                                } catch (g) {}
                            }
                        },
                        eB: function() {
                            0 < (l.Yf(0, 0) || 0) && $("#vid").remove()
                        },
                        XA: function(a) {
                            var b = l.Yf(0, 0) || 0,
                                c = document.getElementById("vid");
                            r = a;
                            if (0 === b && c && (a = c.readyState, 2 === a || 3 === a || 4 === a)) {
                                g.fj();
                                $(c).fadeIn(300, function() {
                                    c.play()
                                });
                                c.addEventListener("ended", m.Io);
                                c.addEventListener("mousedown", m.Io);
                                return
                            }
                            m.Io()
                        },
                        Io: function() {
                            var a = document.getElementById("vid");
                            $(a).fadeOut(500, function() {
                                a.pause();
                                a.currentTime = 0
                            });
                            r && r()
                        },
                        Yz: function() {
                            var a = n(),
                                b = c.gt,
                                d = e.cu(),
                                f = e.Aw;
                            if (null != a && null != d) try {
                                a.src = f + "outro_" + b + d, a.load()
                            } catch (g) {}
                        },
                        YA: function() {
                            var b = document.getElementById("vid");
                            if (b) {
                                var c = b.readyState;
                                2 === c || 3 === c || 4 === c ? (g.fj(), g.qg || (b.volume = 0), $(b).fadeIn(300, function() {
                                    b.play()
                                }), b.addEventListener("ended", m.Dt), b.addEventListener("mousedown", m.Dt)) : ($(b).remove(), f.Za(a.Zh, !1))
                            }
                        },
                        Dt: function() {
                            f.Za(a.Zh, !0);
                            var b = $("#vid");
                            b.fadeOut(500, function() {
                                b[0].pause();
                                b[0].currentTime =
                                    0;
                                b.remove()
                            })
                        },
                        jb: function() {
                            this.tu()
                        }
                    };
                h.subscribe(h.w.Wr, function() {
                    m.tu()
                });
                return m
            }(U, J, S, ya, ub, ra, oa, V, va),
            xc = function(b, c, e, a, f, d, g, h, l, n, r, m, p, q, x, z, s, B, k, D, u, F, A, E, I, J, K, H, L) {
                var w = b.iA || p.An,
                    v = new function() {
                        function q() {
                            $("#levelMenu").hide()
                        }

                        function x() {
                            s.Gh();
                            $("#levelMenu").show()
                        }

                        function C() {
                            f.bb >= f.qv() - 1 ? (J.hide(), B.YA()) : (N.mp = !0, g.Za(b.Jt ? d.vb : d.ad, !1))
                        }

                        function D() {
                            if (f.bb !== f.qv() - 1) return !1;
                            var b = a.Tc(f.bb);
                            return f.Tb !== b ? !1 : !0
                        }

                        function O() {
                            $("#resultScore").text(ga[da]);
                            da++;
                            da < fa.length && (da < ia ? setTimeout(function() {
                                O()
                            }, 10) : setTimeout(function() {
                                O()
                            }, 167))
                        }

                        function Q() {
                            N.Qe = !0;
                            null != Z && clearTimeout(Z);
                            Z = setTimeout(function() {
                                N.Qe = !1;
                                Z = null
                            }, 1E3)
                        }

                        function M(b) {
                            var e = g.Xf(b);
                            b == d.vb || b == d.ad || b == d.se ? J.fadeOut(300) : b !== d.Md && J.show();
                            b !== d.Rj && q();
                            b !== d.vb && b !== d.Md || m.gj(w);
                            var h = g.Xf(d.ad);
                            b == d.ad ? (f.uw(), a.Cj(), h.bj(), N.mp ? (N.mp = !1, setTimeout(function() {
                                    $("#levelResults").hide();
                                    h.oC();
                                    f.al() || L.Ov()
                                }, 800)) : (clearTimeout(ba), ba = setTimeout(function() {
                                    h.dy()
                                }, 300))) :
                                h.Ep();
                            var n = g.Xf(d.Cf);
                            n && (b === d.Cf ? n.bj() : n.Ep());
                            b == d.Md ? (H.Dc(!0, 0), e.bj()) : b == d.Pg ? S(!1) : b === d.Zh ? ($("#levelResults").hide(), J.JB(), b = u.X(A.rr).replace("%d", a.Gg()), l.ia({
                                text: b,
                                Rc: "#finalScore img",
                                scale: 0.8 * c.ib
                            }), $("#congrats").empty().append(l.ia({
                                text: u.X(A.Xq),
                                scale: 1.2 * c.ib
                            })), l.ia({
                                text: u.X(A.qs),
                                Rc: "#finalShareBtn img",
                                scale: 0.8 * c.ib,
                                vp: c.e(130)
                            }), l.ia({
                                text: u.X(A.$r),
                                Rc: "#finalFunBtn img",
                                scale: 0.8 * c.ib,
                                vp: c.e(310)
                            })) : b == d.se ? k.ra(k.w.Ms) : b == d.jf ? k.ra(k.w.et) : b == d.Bf && k.ra(k.w.et)
                        }

                        function V(h) {
                            if (h == d.vb) {
                                $("#playBtn").click(function() {
                                    m.N(p.ha);
                                    K.CA && K.CA();
                                    B.XA(function() {
                                        0 === (a.Yf(0, 0) || 0) ? N.Hu(0, 0) : g.Za(b.Jt ? d.Md : d.ad, !1)
                                    })
                                });
                                $("#optionsBtn").click(function() {
                                    m.N(p.ha);
                                    e.iE ? k.ra(k.w.xx) : g.Za(d.se)
                                });
                                $("#achievementsBtn").click(function() {
                                    Y && (m.N(p.ha), g.Za(d.jf))
                                }).toggleClass("disabled", !Y);
                                $("#leaderboardsBtn").click(function() {
                                    Y && (m.N(p.ha), g.Za(d.Bf))
                                }).toggleClass("disabled", !Y);
                                var w = null;
                                $("#resetYesBtn").on(n.sq, function() {
                                    m.N(p.ha);
                                    w = setTimeout(function() {
                                        L.lh();
                                        w = null;
                                        r.clear();
                                        a.jB();
                                        f.lB();
                                        k.ra(k.w.Wr)
                                    }, 3E3)
                                }).on(n.Po, function() {
                                    null != w && clearTimeout(w)
                                });
                                S(!1);
                                $("#optionSound").click(function() {
                                    S(!0, "optionMsg")
                                });
                                N.zw ? ($("#optionHd").addClass("activeResolution"), $("#optionSd").addClass("inActiveResolution"), $("#optionSd").addClass("ctrPointer"), $("#optionSd").hover(function() {
                                    U("optionMsg", u.X(A.ks), 4E3)
                                }, function() {
                                    $("#optionMsg").stop(!0, !0).fadeOut(500)
                                }), h = "optionSd") : ($("#optionSd").addClass("activeResolution"), $("#optionHd").addClass("inActiveResolution"),
                                    $("#optionHd").addClass("ctrPointer"), $("#optionHd").hover(function() {
                                        U("optionMsg", u.X(A.js), 4E3)
                                    }, function() {
                                        $("#optionMsg").stop(!0, !0).fadeOut(500)
                                    }), h = "optionHd");
                                $("#" + h).click(function() {
                                    r.KB(!N.zw);
                                    window.location.reload()
                                });
                                k.subscribe(k.w.Pb, function() {
                                    P("#playBtn img", A.jx);
                                    P("#optionsBtn img", A.se);
                                    P("#resetYesBtn img", A.Kx);
                                    P("#resetNoBtn img", A.gx);
                                    l.ia({
                                        text: u.X(A.Bf),
                                        Hb: "leaderboardsBtn",
                                        scale: 0.8 * c.ib
                                    });
                                    l.ia({
                                        text: u.X(A.jf),
                                        Hb: "achievementsBtn",
                                        scale: 0.8 * c.ib
                                    })
                                })
                            } else if (h == d.ad) $("#boxBack").click(function() {
                                m.N(p.ha);
                                g.Za(d.vb)
                            }), h = g.Xf(h), h.init(v);
                            else if (h == d.Cf) $("#boxEnterCodeButton").click(function() {
                                m.N(p.ha);
                                g.Za(d.Cf)
                            }), $("#codeBack").click(function() {
                                m.N(p.ha);
                                g.Za(d.ad)
                            }), h = g.Xf(h), h.init(v);
                            else if (h == d.Md) $("#levelBack").click(function() {
                                m.N(p.ha);
                                g.Za(b.Jt ? d.vb : d.ad)
                            }), H.Dc(!0, 0), h = g.Xf(h), h.init(v);
                            else if (h == d.Pg) $("#gameRestartBtn").click(function() {
                                N.Qe || (m.N(p.ha), ca(f.Tb, !0, !0))
                            }), $("#gameMenuBtn").click(function() {
                                N.Qe || (m.N(p.ha), x())
                            });
                            else if (h == d.Rj) $("#continueBtn").click(function() {
                                m.N(p.ha);
                                q();
                                s.Ih()
                            }), $("#skipBtn").click(function() {
                                m.N(p.ha);
                                q();
                                $("#gameBtnTray").hide();
                                f.al() ? (a.af(f.bb, f.Tb, 0), ca(f.Tb + 1, !1)) : C()
                            }), $("#selectBtn").click(function() {
                                m.N(p.ha);
                                q();
                                s.Yv();
                                "function" === typeof showAds && showAds();
                                a.zh(f.bb) || (N.Ah = !0, N.Oi = !1, N.Ho())
                            }), $("#menuBtn").click(function() {
                                m.N(p.ha);
                                q();
                                s.Yv();
                                N.Ah = !0;
                                N.Oi = !0;
                                N.Ho()
                            }), S(!1), $("#gameSound").click(function() {
                                S(!0, "gameMsg")
                            }), k.subscribe(k.w.Pb, function() {
                                P("#continueBtn img", A.Lw);
                                P("#skipBtn img", A.ox);
                                P("#selectBtn img", A.Zw);
                                P("#menuBtn img", A.ax)
                            });
                            else if (h == d.Vr) $("#nextBtn").click(function() {
                                N.Qe || (Q(), m.N(p.ha), f.al() ? ca(f.Tb + 1, !1) : C())
                            }), $("#replayBtn").click(function() {
                                N.Qe || (Q(), m.N(p.ha), ca(f.Tb, !1))
                            }), $("#lrMenuBtn").click(function() {
                                N.Qe || (Q(), m.N(p.ha), N.Ah = !0, N.Oi = !1, N.bw())
                            }), k.subscribe(k.w.Pb, function() {
                                P("#nextBtn img", A.NEXT);
                                P("#replayBtn img", A.Cb);
                                P("#lrMenuBtn img", A.vb);
                                l.wc({
                                    text: u.X(A.Ow),
                                    Ki: "resultTickerMessage",
                                    ua: !0
                                })
                            });
                            else if (h == d.Zh) $("#gameCompleteBack").click(function() {
                                m.N(p.ha);
                                g.Za(d.vb);
                                J.hide()
                            }), $("#finalShareBtn").click(function() {
                                var b = a.Gg();
                                I.cv(e.hz(b, f.$A()), I.Qv, e.lz() + "score" + b + ".png", La(!0))
                            });
                            else if (h == d.se) {
                                var z = e.NC,
                                    D = $("#soundBtn");
                                e.YB(D, function() {
                                    var a = !r.Xo();
                                    m.Ll(a);
                                    m.N(p.ha);
                                    z(D, a);
                                    S(!1);
                                    S(!1)
                                });
                                var M = e.LC,
                                    O = $("#musicBtn");
                                e.QB(O, function() {
                                    m.N(p.ha);
                                    var a = !r.Wo();
                                    m.Jl(a);
                                    M(O, a);
                                    S(!1);
                                    S(!1)
                                });
                                var R = e.KC;
                                e.NB(function(a) {
                                    m.N(p.ha);
                                    null == a && (a = b.qp.indexOf(r.Fi()), a = b.qp[(a + 1) % b.qp.length]);
                                    r.MB(a);
                                    k.ra(k.w.Pb)
                                });
                                var W = e.IC;
                                e.EB(function() {
                                    m.N(p.ha);
                                    var a = !r.Uo();
                                    r.DB(a);
                                    W(a)
                                });
                                var Z = $("#resetBtn").click(function() {
                                    var a = l.ia({
                                            text: u.X(A.ms),
                                            Jc: E.T,
                                            width: 1250 * c.Nb,
                                            ua: !0
                                        }),
                                        b = l.wc({
                                            text: u.X(A.ls),
                                            ua: !0,
                                            vp: c.e(550)
                                        });
                                    $("#resetText").empty().append($(a));
                                    $("#resetHoldYes").empty().append($(b));
                                    m.N(p.ha);
                                    L.Pl("resetGame")
                                });
                                $("#optionsBack").click(function() {
                                    m.N(p.ha);
                                    g.Za(d.vb)
                                });
                                e.xC(!b.Ay);
                                h = function() {
                                    P("#optionsTitle img", A.se);
                                    z(D, r.Xo());
                                    M(O, r.Wo());
                                    R();
                                    W(r.Uo());
                                    e.XB(Z, u.X(A.lx));
                                    var a = r.Fi();
                                    $("#lang").removeClass("lang-en lang-de lang-ru lang-fr").addClass("lang-" +
                                        F.wC(a))
                                };
                                k.subscribe(k.w.Pb, h);
                                k.subscribe(k.w.Ms, h)
                            } else h === d.Bf ? $("#leaderboardBack").click(function() {
                                m.N(p.ha);
                                g.Za(d.vb)
                            }) : h === d.jf && $("#achievementsBack").click(function() {
                                m.N(p.ha);
                                g.Za(d.vb)
                            })
                        }

                        function R() {
                            $("#achievementsBtn").toggleClass("disabled", !Y);
                            $("#leaderboardsBtn").toggleClass("disabled", !Y)
                        }

                        function U(a, b, c) {
                            if (void 0 != a) {
                                c = c || 500;
                                a = $("#" + a);
                                var d = a.find("img");
                                0 === d.length && (d = $("<img/>").appendTo(a));
                                l.wc({
                                    text: b,
                                    img: d[0],
                                    ua: !0,
                                    alpha: 0.6
                                });
                                a.stop(!0, !0).fadeIn(500).delay(c).fadeOut(750)
                            }
                        }

                        function S(a, b) {
                            var c, d = m.bf,
                                e = m.qg;
                            a && (d && e ? (d = !0, e = !1) : e = d || e ? d = !1 : d = !0, m.Ll(d), m.Jl(e));
                            c = d && !e ? "effectsOnly" : d || e ? "allSound" : "noSound";
                            $("#optionSound").removeClass("effectsOnly noSound allSound").addClass(c);
                            $("#gameSound").removeClass("effectsOnly noSound allSound").addClass(c);
                            e || d ? (c = e ? A.dx : A.cx, d = d ? A.sx : A.rx, d = u.X(A.Gq).replace("{0}", u.X(c).toLowerCase()).replace("{1}", u.X(d).toLowerCase())) : d = u.X(A.mr);
                            U(b, d)
                        }

                        function P(a, b) {
                            l.ia({
                                text: u.X(b),
                                Rc: a,
                                ua: !0
                            })
                        }
                        var N = this;
                        this.zw = c.Az;
                        this.Qe =
                            this.Zk = this.mp = this.Oi = this.Ah = !1;
                        var aa = z.NE || 30,
                            Y = !1;
                        k.subscribe(k.w.bo, function() {
                            Y = !0;
                            R()
                        });
                        k.subscribe(k.w.co, function() {
                            Y = !1;
                            R()
                        });
                        var ba = null,
                            Z = null,
                            ca = this.IA = function(a, b, c) {
                                function e() {
                                    J.fadeIn(650, 100);
                                    f.Tb = a;
                                    D() && B.Yz();
                                    c ? s.Al() : (g.Za(d.Pg, !b), setTimeout(function() {
                                        N.Nu()
                                    }, 200))
                                }
                                "function" === typeof showAds ? showAds(e) : e()
                            };
                        this.bw = function() {
                            N.Oi && (J.fadeOut(800, 400), m.gj(w));
                            H.Ct(function() {
                                N.Zk = !1;
                                N.Oi ? g.Za(d.vb, !1) : (H.Dc(!0, 0), g.Za(d.Md, !0))
                            })
                        };
                        this.Nu = function() {
                            var a = g.zk == d.Md ?
                                400 : 0;
                            $("#levelScore").fadeOut();
                            $("#levelBack").fadeOut();
                            $("#levelOptions").fadeOut(a, function() {
                                N.Zk ? ($("#levelResults").fadeOut(800), setTimeout(function() {
                                    s.Vv(f.bb + 1, f.Tb);
                                    H.Mp(!1, function() {
                                        N.Mv()
                                    })
                                }, 400)) : H.Ou(function() {
                                    N.Zk = !0;
                                    s.Vv(f.bb + 1, f.Tb);
                                    H.Mp(!0, function() {
                                        N.Mv()
                                    })
                                })
                            })
                        };
                        this.Ho = function() {
                            N.py();
                            setTimeout(function() {
                                N.Ah || $("#levelResults").delay(750).fadeIn(250);
                                H.oy(function() {
                                    N.Ah ? N.bw() : (H.nq(), setTimeout(function() {
                                        O()
                                    }, 250))
                                })
                            }, 250)
                        };
                        this.Mv = function() {
                            $("#levelBackground").hide();
                            z.Lv && b.Sy && $("#bg").show();
                            $("#gameBtnTray").fadeIn()
                        };
                        this.py = function() {
                            H.Dc(!1, 1);
                            Q();
                            $("#levelBackground").show();
                            z.Lv && b.Sy && $("#bg").hide();
                            $("#gameBtnTray").fadeOut()
                        };
                        var fa = [],
                            ga = [],
                            da = 0,
                            ia = 0;
                        this.Fp = function(b) {
                            function c(a, b, d) {
                                function e() {
                                    var c = Date.now(),
                                        r = (c - m) / k;
                                    m = c;
                                    p += Math.round(b * r);
                                    h -= a * r;
                                    0 >= h ? (h = 0, p = f, s.fadeOut(400), q.fadeOut(400, d)) : n(e);
                                    l.wc({
                                        text: g(h),
                                        img: q[0],
                                        ua: !0
                                    });
                                    l.Lt({
                                        text: p,
                                        Hb: "resultScore",
                                        ua: !0
                                    })
                                }
                                var f = p + b,
                                    h = a,
                                    k = Math.max(1E3, 2E3 - 50 * a),
                                    m = Date.now(),
                                    n = window.requestAnimationFrame;
                                e()
                            }

                            function d(a, b) {
                                function c() {
                                    var d = Date.now(),
                                        h = Math.min(Math.round(a * (d - f) / 1E3), e);
                                    f = d;
                                    e -= h;
                                    p += h;
                                    0 >= e ? (e = 0, p = a, s.fadeOut(400), q.fadeOut(400, b)) : g(c);
                                    l.wc({
                                        text: e,
                                        img: q[0],
                                        ua: !0
                                    });
                                    l.Lt({
                                        text: p,
                                        Hb: "resultScore",
                                        ua: !0
                                    })
                                }
                                var e = a,
                                    f = Date.now(),
                                    g = window.requestAnimationFrame;
                                c()
                            }

                            function g(a) {
                                var b = Math.floor(a / 60);
                                a = Math.round(a % 60);
                                return b + ":" + (10 > a ? "0" + a : a)
                            }
                            var h = b.Lb,
                                k = b.Hl,
                                m = b.time,
                                n, p = 0,
                                r = 1E3 * h;
                            Math.round((k - 1E3 * h) / m);
                            switch (h) {
                                case 3:
                                    $("#resultStar1").removeClass("starEmpty").addClass("star");
                                    $("#resultStar2").removeClass("starEmpty").addClass("star");
                                    $("#resultStar3").removeClass("starEmpty").addClass("star");
                                    n = u.X(A.Yw);
                                    break;
                                case 2:
                                    $("#resultStar1").removeClass("starEmpty").addClass("star");
                                    $("#resultStar2").removeClass("starEmpty").addClass("star");
                                    $("#resultStar3").removeClass("star").addClass("starEmpty");
                                    n = u.X(A.Xw);
                                    break;
                                case 1:
                                    $("#resultStar1").removeClass("starEmpty").addClass("star");
                                    $("#resultStar2").removeClass("star").addClass("starEmpty");
                                    $("#resultStar3").removeClass("star").addClass("starEmpty");
                                    n = u.X(A.Ww);
                                    break;
                                default:
                                    $("#resultStar1").removeClass("star").addClass("starEmpty"), $("#resultStar2").removeClass("star").addClass("starEmpty"), $("#resultStar3").removeClass("star").addClass("starEmpty"), n = u.X(A.Vw)
                            }
                            l.ia({
                                text: n,
                                Rc: "#resultStatus img",
                                ua: !0
                            });
                            var q = $("#resultTickerValue").hide(),
                                s = $("#resultTickerLabel").hide(),
                                v = $("#resultScore").empty().hide(),
                                w = $("#resultImproved").hide(),
                                z = $("#resultTickerMessage").hide();
                            l.wc({
                                text: u.X(A.ux),
                                img: s[0],
                                ua: !0
                            });
                            l.wc({
                                text: r,
                                img: q[0],
                                ua: !0
                            });
                            $("#resultScore img").remove();
                            setTimeout(function() {
                                s.fadeIn(300);
                                q.fadeIn(300);
                                v.fadeIn(300, function() {
                                    d(r, function() {
                                        l.wc({
                                            text: u.X(A.Od),
                                            img: s[0],
                                            ua: !0
                                        });
                                        s.fadeIn(300);
                                        l.wc({
                                            text: g(Math.ceil(m)),
                                            img: q[0],
                                            ua: !0
                                        });
                                        q.fadeIn(300, function() {
                                            c(Math.ceil(m), k - p, function() {
                                                z.fadeIn(300);
                                                null != C && 0 < C && k > C && w.animate({
                                                    scale: 2.5,
                                                    opacity: 0
                                                }, 0, function() {
                                                    w.css("display", "block");
                                                    w.animate({
                                                        scale: 1,
                                                        opacity: 1
                                                    }, 600, "easeInCubic")
                                                })
                                            })
                                        })
                                    })
                                })
                            }, 1E3);
                            n = f.bb;
                            var x = f.Tb,
                                C = a.Qk(n, x - 1);
                            a.jq(n, x - 1, k);
                            a.af(n, x - 1, h);
                            a.Tc(n) > x && f.al() && a.af(n, x, 0);
                            N.Ah = !1;
                            N.Ho();
                            0 === n && 1 === x && (K.yA && K.yA(b.Vt), b.Vt < aa && !e.lE && setTimeout(function() {
                                L.kC()
                            }, 3E3), B.eB())
                        };
                        var ea = !0;
                        this.vw = function() {
                            $(window).width() < c.e(1024) + 120 && ea ? ($("#moreLink").fadeOut(function() {
                                ea = !1
                            }), $("#zenbox_tab").fadeOut()) : $(window).width() > c.e(1024) + 120 && !ea && ($("#moreLink").fadeIn(function() {
                                ea = !0
                            }), $("#zenbox_tab").fadeIn())
                        };
                        this.To = !0;
                        this.Qp = function() {
                            g.zk === d.Pg && s.Bz() && !N.Qe ? x() : m.fj()
                        };
                        this.uv = function() {
                            g.zk !== d.Rj && N.To && m.bq()
                        };
                        this.init = function() {
                            a.load();
                            g.Ip = M
                        };
                        this.jb =
                            function() {
                                B.jb();
                                h.jb();
                                g.jb();
                                J.jb();
                                $(window).blur(N.Qp);
                                $(window).focus(N.uv);
                                $(window).resize(function() {
                                    N.vw()
                                })
                            };
                        this.jd = function() {
                            k.subscribe(k.w.Tm, this.Fp);
                            H.jd();
                            h.jd();
                            g.jd(V);
                            f.jd();
                            k.ra(k.w.Pb);
                            if (null != z.ey && null != z.lg) this.Hu(z.ey - 1, z.lg - 1);
                            else if (r.Nv) {
                                var a = g.Xf(d.Cf);
                                a && a.kp && a.kp() ? (H.Dc(!0, 0), g.Za(d.Cf, !0)) : g.Za(d.vb, !0)
                            }
                            var b = this;
                            k.subscribe(k.w.gs, function() {
                                b.Qp()
                            });
                            k.subscribe(k.w.nr, function() {
                                b.To = !0;
                                b.uv()
                            });
                            k.subscribe(k.w.ir, function() {
                                b.To = !1;
                                b.Qp()
                            })
                        };
                        this.Hu = function(a,
                            b) {
                            g.Za(d.Pg, !0);
                            f.bb = a;
                            f.Tb = b + 1;
                            this.Nu()
                        };
                        this.JA = function(a) {
                            N.Zk = !1;
                            H.Dc(!0, 0);
                            g.Za(d.Md);
                            J.CB(a)
                        }
                    };
                return v
            }(U, J, S, va, Ta, ya, ub, uc, fa, Xa, ra, oa, q, vc, ua, ta, cb, wc, V, ma, ga, sa, B, Q, fb, function(b, c) {
                var e = null;
                return {
                    jb: function() {
                        e = $("#gameBorder")
                    },
                    CB: function(a) {
                        a = (a = c.st[a]) ? b.$c + a : "";
                        e.removeClass("gameComplete").css("background-image", "url(" + a + ")")
                    },
                    JB: function() {
                        e.css("background-image", "").addClass("gameComplete")
                    },
                    hide: function() {
                        e.hide()
                    },
                    show: function() {
                        e.show()
                    },
                    fadeIn: function(a, b) {
                        e.delay(b ||
                            0).fadeIn(a)
                    },
                    fadeOut: function(a, b) {
                        e.delay(b || 0).fadeOut(a)
                    }
                }
            }(S, U), Ra, eb, db),
            yc = function(b, c, e, a, f, d, g, h, l, n) {
                return {
                    init: function() {
                        b.init();
                        d.$i(function() {
                            e.init();
                            h.ra(h.w.Hw)
                        })
                    },
                    jb: function() {
                        f.By && "undefined" != typeof document.body.onselectstart && (document.body.onselectstart = La(!1));
                        $(".ctrCursor").on("mousedown mouseup", function() {
                            $(this).toggleClass("ctrCursorActive")
                        });
                        $("body").addClass("ui-" + c.dh);
                        a.jb("c");
                        a.element.width = c.Bb;
                        a.element.height = c.fb;
                        c.YC || (c.Kw ? $(a.element).width(c.Kw).height(c.XC) :
                            $(a.element).width(c.Bb).height(c.fb));
                        g.jb && g.jb();
                        b.jb();
                        e.jb();
                        h.ra(h.w.Gw)
                    },
                    dq: function() {
                        b.dq(function() {
                            e.jd();
                            h.ra(h.w.Hq);
                            $(".hideBeforeLoad").fadeIn(500);
                            e.vw();
                            $("#gameFooterSocial").css("top", 0);
                            if (!f.yo && n.yu()) {
                                $("#lsDomain").text(location.protocol + "//" + location.host);
                                $("#lsChromeInfoLink").show(0 <= navigator.userAgent.indexOf("Chrome"));
                                var a = $("#lsWarning").fadeIn(100);
                                $("#lsOkButton").on("click", function() {
                                    a.fadeOut()
                                })
                            }
                        })
                    }
                }
            }(Bb, J, xc, aa, ra, Ba, Ya, V, Wa, S),
            zc = function(b, c, e, a, f) {
                b("forceHTML5Audio",
                    c.Wy);
                window.showFpsCounter = function() {
                    a.Wt = !0
                };
                b("initFB", e.uz);
                b("initTwitter", e.xz);
                b("onLevelWon", function(a) {
                    f.subscribe(f.w.Tm, function() {
                        a()
                    })
                });
                b("pauseGame", function() {
                    f.ra(f.w.gs)
                });
                b("enable", function() {
                    f.ra(f.w.nr)
                });
                b("disable", function() {
                    f.ra(f.w.ir)
                });
                return window.ZeptoLab
            }(function() {
                return function(b, c) {
                    var e = window.ZeptoLab;
                    null == e && (e = window.ZeptoLab = {});
                    var a = e.ctr;
                    null == a && (a = e.ctr = {});
                    a[b] = c
                }
            }(), ta, fb, ra, V);
        (function(b, c) {
            c.yu() && (b.init(), $(document).ready(function() {
                b.jb();
                b.dq()
            }))
        })(yc, S, zc)
    })();
})();