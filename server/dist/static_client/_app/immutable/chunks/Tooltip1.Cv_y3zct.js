import { s as u, n as c } from "./scheduler.CZfksBX7.js";
import { S as v, i as _, e as f, t as y, c as g, a as h, b as B, d as r, q as d, g as P, h as m, j as b } from "./index.ubuQcuXk.js";
function I(a) { let e, s, n, l; return { c() { e = f("div"), s = f("div"), n = y(a[0]), this.h(); }, l(t) { e = g(t, "DIV", { class: !0 }); var o = h(e); s = g(o, "DIV", { class: !0 }); var i = h(s); n = B(i, a[0]), i.forEach(r), o.forEach(r), this.h(); }, h() { d(s, "class", "tooltipInner svelte-4oypsg"), d(e, "class", l = "tooltip scale-0 " + a[1] + " " + a[2] + " " + (a[3] ? a[3] : "absolute") + " group-hover:scale-100 svelte-4oypsg"); }, m(t, o) { P(t, e, o), m(e, s), m(s, n); }, p(t, [o]) { o & 1 && b(n, t[0]), o & 14 && l !== (l = "tooltip scale-0 " + t[1] + " " + t[2] + " " + (t[3] ? t[3] : "absolute") + " group-hover:scale-100 svelte-4oypsg") && d(e, "class", l); }, i: c, o: c, d(t) { t && r(e); } }; }
function p(a, e, s) { let { textBody: n } = e, { messagePosition: l } = e, { origin: t } = e, { position: o = void 0 } = e; return a.$$set = i => { "textBody" in i && s(0, n = i.textBody), "messagePosition" in i && s(1, l = i.messagePosition), "origin" in i && s(2, t = i.origin), "position" in i && s(3, o = i.position); }, [n, l, t, o]; }
class E extends v {
    constructor(e) { super(), _(this, e, p, I, u, { textBody: 0, messagePosition: 1, origin: 2, position: 3 }); }
}
export { E as T };
