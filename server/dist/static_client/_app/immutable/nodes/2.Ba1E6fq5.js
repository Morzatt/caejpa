import { s as g, n as f, c as v } from "../chunks/scheduler.CZfksBX7.js";
import { S as b, i as $, e as x, t as m, c as E, a as S, b as p, d as h, g as j, h as c, j as d } from "../chunks/index.ubuQcuXk.js";
import { p as q } from "../chunks/stores.bCoFjJk4.js";
function y(n) { var u; let e, s = n[0].status + "", r, o, i = ((u = n[0].error) == null ? void 0 : u.message) + "", l; return { c() { e = x("h1"), r = m(s), o = m(": "), l = m(i); }, l(a) { e = E(a, "H1", {}); var t = S(e); r = p(t, s), o = p(t, ": "), l = p(t, i), t.forEach(h); }, m(a, t) { j(a, e, t), c(e, r), c(e, o), c(e, l); }, p(a, [t]) { var _; t & 1 && s !== (s = a[0].status + "") && d(r, s), t & 1 && i !== (i = ((_ = a[0].error) == null ? void 0 : _.message) + "") && d(l, i); }, i: f, o: f, d(a) { a && h(e); } }; }
function C(n, e, s) { let r; return v(n, q, o => s(0, r = o)), [r]; }
class z extends b {
    constructor(e) { super(), $(this, e, C, y, g, {}); }
}
export { z as component };
