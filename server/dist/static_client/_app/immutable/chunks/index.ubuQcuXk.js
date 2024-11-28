var W = Object.defineProperty;
var J = (t, e, n) => e in t ? W(t, e, { enumerable: !0, configurable: !0, writable: !0, value: n }) : t[e] = n;
var T = (t, e, n) => (J(t, typeof e != "symbol" ? e + "" : e, n), n);
import { n as v, r as w, m as H, b as B, p as K, q as z, f as Q, u as X, v as Y, w as Z, a as I, x as tt, y as et, z as nt } from "./scheduler.CZfksBX7.js";
const O = typeof window < "u";
let it = O ? () => window.performance.now() : () => Date.now(), P = O ? t => requestAnimationFrame(t) : v;
const g = new Set;
function L(t) { g.forEach(e => { e.c(t) || (g.delete(e), e.f()); }), g.size !== 0 && P(L); }
function rt(t) { let e; return g.size === 0 && P(L), { promise: new Promise(n => { g.add(e = { c: t, f: n }); }), abort() { g.delete(e); } }; }
let S = !1;
function st() { S = !0; }
function lt() { S = !1; }
function ot(t, e, n, i) { for (; t < e;) {
    const l = t + (e - t >> 1);
    n(l) <= i ? t = l + 1 : e = l;
} return t; }
function at(t) { if (t.hydrate_init)
    return; t.hydrate_init = !0; let e = t.childNodes; if (t.nodeName === "HEAD") {
    const r = [];
    for (let a = 0; a < e.length; a++) {
        const _ = e[a];
        _.claim_order !== void 0 && r.push(_);
    }
    e = r;
} const n = new Int32Array(e.length + 1), i = new Int32Array(e.length); n[0] = -1; let l = 0; for (let r = 0; r < e.length; r++) {
    const a = e[r].claim_order, _ = (l > 0 && e[n[l]].claim_order <= a ? l + 1 : ot(1, l, h => e[n[h]].claim_order, a)) - 1;
    i[r] = n[_] + 1;
    const c = _ + 1;
    n[c] = r, l = Math.max(c, l);
} const u = [], o = []; let s = e.length - 1; for (let r = n[l] + 1; r != 0; r = i[r - 1]) {
    for (u.push(e[r - 1]); s >= r; s--)
        o.push(e[s]);
    s--;
} for (; s >= 0; s--)
    o.push(e[s]); u.reverse(), o.sort((r, a) => r.claim_order - a.claim_order); for (let r = 0, a = 0; r < o.length; r++) {
    for (; a < u.length && o[r].claim_order >= u[a].claim_order;)
        a++;
    const _ = a < u.length ? u[a] : null;
    t.insertBefore(o[r], _);
} }
function ut(t, e) { t.appendChild(e); }
function k(t) { if (!t)
    return document; const e = t.getRootNode ? t.getRootNode() : t.ownerDocument; return e && e.host ? e : t.ownerDocument; }
function ct(t) { const e = G("style"); return e.textContent = "/* empty */", ft(k(t), e), e.sheet; }
function ft(t, e) { return ut(t.head || t, e), e.sheet; }
function _t(t, e) { if (S) {
    for (at(t), (t.actual_end_child === void 0 || t.actual_end_child !== null && t.actual_end_child.parentNode !== t) && (t.actual_end_child = t.firstChild); t.actual_end_child !== null && t.actual_end_child.claim_order === void 0;)
        t.actual_end_child = t.actual_end_child.nextSibling;
    e !== t.actual_end_child ? (e.claim_order !== void 0 || e.parentNode !== t) && t.insertBefore(e, t.actual_end_child) : t.actual_end_child = e.nextSibling;
}
else
    (e.parentNode !== t || e.nextSibling !== null) && t.appendChild(e); }
function Tt(t, e, n) { S && !n ? _t(t, e) : (e.parentNode !== t || e.nextSibling != n) && t.insertBefore(e, n || null); }
function F(t) { t.parentNode && t.parentNode.removeChild(t); }
function jt(t, e) { for (let n = 0; n < t.length; n += 1)
    t[n] && t[n].d(e); }
function G(t) { return document.createElement(t); }
function q(t) { return document.createTextNode(t); }
function Bt() { return q(" "); }
function Ht() { return q(""); }
function Pt(t, e, n, i) { return t.addEventListener(e, n, i), () => t.removeEventListener(e, n, i); }
function qt(t) { return function (e) { return e.preventDefault(), t.call(this, e); }; }
function zt(t, e, n) { n == null ? t.removeAttribute(e) : t.getAttribute(e) !== n && t.setAttribute(e, n); }
function It(t) { return t.dataset.svelteH; }
function Mt(t) { return t === "" ? null : +t; }
function dt(t) { return Array.from(t.childNodes); }
function ht(t) { t.claim_info === void 0 && (t.claim_info = { last_index: 0, total_claimed: 0 }); }
function U(t, e, n, i, l = !1) { ht(t); const u = (() => { for (let o = t.claim_info.last_index; o < t.length; o++) {
    const s = t[o];
    if (e(s)) {
        const r = n(s);
        return r === void 0 ? t.splice(o, 1) : t[o] = r, l || (t.claim_info.last_index = o), s;
    }
} for (let o = t.claim_info.last_index - 1; o >= 0; o--) {
    const s = t[o];
    if (e(s)) {
        const r = n(s);
        return r === void 0 ? t.splice(o, 1) : t[o] = r, l ? r === void 0 && t.claim_info.last_index-- : t.claim_info.last_index = o, s;
    }
} return i(); })(); return u.claim_order = t.claim_info.total_claimed, t.claim_info.total_claimed += 1, u; }
function mt(t, e, n, i) { return U(t, l => l.nodeName === e, l => { const u = []; for (let o = 0; o < l.attributes.length; o++) {
    const s = l.attributes[o];
    n[s.name] || u.push(s.name);
} u.forEach(o => l.removeAttribute(o)); }, () => i(e)); }
function Ot(t, e, n) { return mt(t, e, n, G); }
function pt(t, e) { return U(t, n => n.nodeType === 3, n => { const i = "" + e; if (n.data.startsWith(i)) {
    if (n.data.length !== i.length)
        return n.splitText(i.length);
}
else
    n.data = i; }, () => q(e), !0); }
function Lt(t) { return pt(t, " "); }
function kt(t, e) { e = "" + e, t.data !== e && (t.data = e); }
function Ft(t, e) { t.value = e ?? ""; }
function Gt(t, e, n, i) { n == null ? t.style.removeProperty(e) : t.style.setProperty(e, n, ""); }
function Ut(t, e, n) { for (let i = 0; i < t.options.length; i += 1) {
    const l = t.options[i];
    if (l.__value === e) {
        l.selected = !0;
        return;
    }
} (!n || e !== void 0) && (t.selectedIndex = -1); }
function Vt(t) { const e = t.querySelector(":checked"); return e && e.__value; }
function $t(t, e, { bubbles: n = !1, cancelable: i = !1 } = {}) { return new CustomEvent(t, { detail: e, bubbles: n, cancelable: i }); }
function Wt(t, e) { const n = []; let i = 0; for (const l of e.childNodes)
    if (l.nodeType === 8) {
        const u = l.textContent.trim();
        u === `HEAD_${t}_END` ? (i -= 1, n.push(l)) : u === `HEAD_${t}_START` && (i += 1, n.push(l));
    }
    else
        i > 0 && n.push(l); return n; }
function Jt(t, e) { return new t(e); }
const E = new Map;
let A = 0;
function yt(t) { let e = 5381, n = t.length; for (; n--;)
    e = (e << 5) - e ^ t.charCodeAt(n); return e >>> 0; }
function gt(t, e) { const n = { stylesheet: ct(e), rules: {} }; return E.set(t, n), n; }
function M(t, e, n, i, l, u, o, s = 0) {
    const r = 16.666 / i;
    let a = `{
`;
    for (let d = 0; d <= 1; d += r) {
        const y = e + (n - e) * u(d);
        a += d * 100 + `%{${o(y, 1 - y)}}
`;
    }
    const _ = a + `100% {${o(n, 1 - n)}}
}`, c = `__svelte_${yt(_)}_${s}`, h = k(t), { stylesheet: $, rules: f } = E.get(h) || gt(h, t);
    f[c] || (f[c] = !0, $.insertRule(`@keyframes ${c} ${_}`, $.cssRules.length));
    const m = t.style.animation || "";
    return t.style.animation = `${m ? `${m}, ` : ""}${c} ${i}ms linear ${l}ms 1 both`, A += 1, c;
}
function xt(t, e) { const n = (t.style.animation || "").split(", "), i = n.filter(e ? u => u.indexOf(e) < 0 : u => u.indexOf("__svelte") === -1), l = n.length - i.length; l && (t.style.animation = i.join(", "), A -= l, A || vt()); }
function vt() { P(() => { A || (E.forEach(t => { const { ownerNode: e } = t.stylesheet; e && F(e); }), E.clear()); }); }
let x;
function wt() { return x || (x = Promise.resolve(), x.then(() => { x = null; })), x; }
function j(t, e, n) { t.dispatchEvent($t(`${e ? "intro" : "outro"}${n}`)); }
const N = new Set;
let p;
function Kt() { p = { r: 0, c: [], p }; }
function Qt() { p.r || w(p.c), p = p.p; }
function bt(t, e) { t && t.i && (N.delete(t), t.i(e)); }
function Xt(t, e, n, i) { if (t && t.o) {
    if (N.has(t))
        return;
    N.add(t), p.c.push(() => { N.delete(t), i && (n && t.d(1), i()); }), t.o(e);
}
else
    i && i(); }
const Nt = { duration: 0 };
function Yt(t, e, n, i) { let u = e(t, n, { direction: "both" }), o = i ? 0 : 1, s = null, r = null, a = null, _; function c() { a && xt(t, a); } function h(f, m) { const d = f.b - o; return m *= Math.abs(d), { a: o, b: f.b, d, duration: m, start: f.start, end: f.start + m, group: f.group }; } function $(f) { const { delay: m = 0, duration: d = 300, easing: y = K, tick: C = v, css: D } = u || Nt, R = { start: it() + m, b: f }; f || (R.group = p, p.r += 1), "inert" in t && (f ? _ !== void 0 && (t.inert = _) : (_ = t.inert, t.inert = !0)), s || r ? r = R : (D && (c(), a = M(t, o, f, d, m, y, D)), f && C(0, 1), s = h(R, d), B(() => j(t, f, "start")), rt(b => { if (r && b > r.start && (s = h(r, d), r = null, j(t, s.b, "start"), D && (c(), a = M(t, o, s.b, s.duration, 0, y, u.css))), s) {
    if (b >= s.end)
        C(o = s.b, 1 - o), j(t, s.b, "end"), r || (s.b ? c() : --s.group.r || w(s.group.c)), s = null;
    else if (b >= s.start) {
        const V = b - s.start;
        o = s.a + s.d * y(V / s.duration), C(o, 1 - o);
    }
} return !!(s || r); })); } return { run(f) { H(u) ? wt().then(() => { u = u({ direction: f ? "in" : "out" }), $(f); }) : $(f); }, end() { c(), s = r = null; } }; }
function Zt(t) { t && t.c(); }
function te(t, e) { t && t.l(e); }
function Et(t, e, n) { const { fragment: i, after_update: l } = t.$$; i && i.m(e, n), B(() => { const u = t.$$.on_mount.map(tt).filter(H); t.$$.on_destroy ? t.$$.on_destroy.push(...u) : w(u), t.$$.on_mount = []; }), l.forEach(B); }
function At(t, e) { const n = t.$$; n.fragment !== null && (Y(n.after_update), w(n.on_destroy), n.fragment && n.fragment.d(e), n.on_destroy = n.fragment = null, n.ctx = []); }
function St(t, e) { t.$$.dirty[0] === -1 && (et.push(t), nt(), t.$$.dirty.fill(0)), t.$$.dirty[e / 31 | 0] |= 1 << e % 31; }
function ee(t, e, n, i, l, u, o = null, s = [-1]) { const r = Z; I(t); const a = t.$$ = { fragment: null, ctx: [], props: u, update: v, not_equal: l, bound: z(), on_mount: [], on_destroy: [], on_disconnect: [], before_update: [], after_update: [], context: new Map(e.context || (r ? r.$$.context : [])), callbacks: z(), dirty: s, skip_bound: !1, root: e.target || r.$$.root }; o && o(a.root); let _ = !1; if (a.ctx = n ? n(t, e.props || {}, (c, h, ...$) => { const f = $.length ? $[0] : h; return a.ctx && l(a.ctx[c], a.ctx[c] = f) && (!a.skip_bound && a.bound[c] && a.bound[c](f), _ && St(t, c)), h; }) : [], a.update(), _ = !0, w(a.before_update), a.fragment = i ? i(a.ctx) : !1, e.target) {
    if (e.hydrate) {
        st();
        const c = dt(e.target);
        a.fragment && a.fragment.l(c), c.forEach(F);
    }
    else
        a.fragment && a.fragment.c();
    e.intro && bt(t.$$.fragment), Et(t, e.target, e.anchor), lt(), Q();
} I(r); }
class ne {
    constructor() { T(this, "$$"); T(this, "$$set"); }
    $destroy() { At(this, 1), this.$destroy = v; }
    $on(e, n) { if (!H(n))
        return v; const i = this.$$.callbacks[e] || (this.$$.callbacks[e] = []); return i.push(n), () => { const l = i.indexOf(n); l !== -1 && i.splice(l, 1); }; }
    $set(e) { this.$$set && !X(e) && (this.$$.skip_bound = !0, this.$$set(e), this.$$.skip_bound = !1); }
}
const Ct = "4";
typeof window < "u" && (window.__svelte || (window.__svelte = { v: new Set })).v.add(Ct);
export { jt as A, Ft as B, Mt as C, Gt as D, Jt as E, Yt as F, Wt as G, qt as H, ne as S, dt as a, pt as b, Ot as c, F as d, G as e, Lt as f, Tt as g, _t as h, ee as i, kt as j, Kt as k, Xt as l, Qt as m, bt as n, Ht as o, It as p, zt as q, Pt as r, Bt as s, q as t, Zt as u, te as v, Et as w, At as x, Vt as y, Ut as z };