import { i as b, g as p, a, f as m } from "./scheduler.CZfksBX7.js";
import { k as g, l as v, m as x, n as w } from "./index.ubuQcuXk.js";
function j(e, t) { const h = t.token = {}; function c(r, s, k, d) { if (t.token !== h)
    return; t.resolved = d; let u = t.ctx; k !== void 0 && (u = u.slice(), u[k] = d); const l = r && (t.current = r)(u); let o = !1; t.block && (t.blocks ? t.blocks.forEach((n, _) => { _ !== s && n && (g(), v(n, 1, 1, () => { t.blocks[_] === n && (t.blocks[_] = null); }), x()); }) : t.block.d(1), l.c(), w(l, 1), l.m(t.mount(), t.anchor), o = !0), t.block = l, t.blocks && (t.blocks[s] = l), o && m(); } if (b(e)) {
    const r = p();
    if (e.then(s => { a(r), c(t.then, 1, t.value, s), a(null); }, s => { if (a(r), c(t.catch, 2, t.error, s), a(null), !t.hasCatch)
        throw s; }), t.current !== t.pending)
        return c(t.pending, 0), !0;
}
else {
    if (t.current !== t.then)
        return c(t.then, 1, t.value, e), !0;
    t.resolved = e;
} }
function q(e, t, h) { const c = t.slice(), { resolved: r } = e; e.current === e.then && (c[e.value] = r), e.current === e.catch && (c[e.error] = r), e.block.p(c, h); }
export { j as h, q as u };
