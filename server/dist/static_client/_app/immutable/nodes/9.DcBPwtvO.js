import { s as c, d as o, n as i } from "../chunks/scheduler.CZfksBX7.js";
import { S as m, i as u, e as f, c as d, a as h, d as l, q as s, g as _ } from "../chunks/index.ubuQcuXk.js";
const p = "" + new URL("../assets/MANUAL.BtAaD0dm.pdf", import.meta.url).href;
function A(n) { let e, t; return { c() { e = f("iframe"), this.h(); }, l(a) { e = d(a, "IFRAME", { src: !0, title: !0, class: !0, frameborder: !0 }), h(e).forEach(l), this.h(); }, h() { o(e.src, t = p) || s(e, "src", t), s(e, "title", "Manual de Usuario"), s(e, "class", "w-full h-full"), s(e, "frameborder", "0"); }, m(a, r) { _(a, e, r); }, p: i, i, o: i, d(a) { a && l(e); } }; }
function g(n, e, t) { let { data: a } = e; return n.$$set = r => { "data" in r && t(0, a = r.data); }, [a]; }
class M extends m {
    constructor(e) { super(), u(this, e, g, A, c, { data: 0 }); }
}
export { M as component };
