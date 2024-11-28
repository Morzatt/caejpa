import { s as Le, r as dt, n as b, b as Se } from "../chunks/scheduler.CZfksBX7.js";
import { S as Lt, i as St, e as d, s as E, t as pe, o as V, c as f, a as z, f as w, p as T, b as ve, d as _, q as u, g as C, h as i, r as Z, n as Je, l as ct, m as At, u as Bt, v as Rt, w as Ft, x as Wt, k as Gt, y as Ve, z as re, A as Ke, B as Y, j as Jt } from "../chunks/index.ubuQcuXk.js";
import { h as je, u as Ae } from "../chunks/await_block.COLDvt4L.js";
import { e as we } from "../chunks/each.D6YF6ztN.js";
import { b as Me } from "../chunks/index.B9cNcTi_.js";
import { S as Kt } from "../chunks/ServerMessage.CEzSWrnO.js";
function xt(s, e, l) { const t = s.slice(); return t[35] = e[l], t; }
function Ut(s, e, l) { const t = s.slice(); return t[35] = e[l], t; }
function zt(s, e, l) { const t = s.slice(); return t[35] = e[l], t; }
function Nt(s, e, l) { const t = s.slice(); return t[35] = e[l], t; }
function It(s) { let e, l; return e = new Kt({ props: { messageFromTheServer: s[2], messagePosition: "top-20 right-10", serverStatus: s[0], position: "fixed" } }), { c() { Bt(e.$$.fragment); }, l(t) { Rt(e.$$.fragment, t); }, m(t, o) { Ft(e, t, o), l = !0; }, p(t, o) { const n = {}; o[0] & 4 && (n.messageFromTheServer = t[2]), o[0] & 1 && (n.serverStatus = t[0]), e.$set(n); }, i(t) { l || (Je(e.$$.fragment, t), l = !0); }, o(t) { ct(e.$$.fragment, t), l = !1; }, d(t) { Wt(e, t); } }; }
function Qt(s) { return { c: b, l: b, m: b, p: b, d: b }; }
function Xt(s) { let e; function l(n, a) { return n[34] !== null ? Zt : Yt; } let o = l(s)(s); return { c() { o.c(), e = V(); }, l(n) { o.l(n), e = V(); }, m(n, a) { o.m(n, a), C(n, e, a); }, p(n, a) { o.p(n, a); }, d(n) { n && _(e), o.d(n); } }; }
function Yt(s) { let e, l = "No ha sido creado ningún Usuario."; return { c() { e = d("h1"), e.textContent = l, this.h(); }, l(t) { e = f(t, "H1", { class: !0, "data-svelte-h": !0 }), T(e) !== "svelte-17vcd52" && (e.textContent = l), this.h(); }, h() { u(e, "class", "font-poppins font-bold text-xl"); }, m(t, o) { C(t, e, o); }, p: b, d(t) { t && _(e); } }; }
function Zt(s) { let e, l, t, o, n, a, c = we(s[34]), r = []; for (let m = 0; m < c.length; m += 1)
    r[m] = qt(Nt(s, c, m)); let v = { ctx: s, current: null, token: null, hasCatch: !1, pending: tl, then: el, catch: $t, value: 42 }; return je(o = s[15](s[6]), v), { c() { e = d("select"); for (let m = 0; m < r.length; m += 1)
        r[m].c(); l = E(), t = V(), v.block.c(), this.h(); }, l(m) { e = f(m, "SELECT", { name: !0, id: !0, class: !0 }); var x = z(e); for (let p = 0; p < r.length; p += 1)
        r[p].l(x); x.forEach(_), l = w(m), t = V(), v.block.l(m), this.h(); }, h() { u(e, "name", ""), u(e, "id", ""), e.required = !0, u(e, "class", "svelte-1rt1t1z"), s[6] === void 0 && Se(() => s[20].call(e)); }, m(m, x) { C(m, e, x); for (let p = 0; p < r.length; p += 1)
        r[p] && r[p].m(e, null); re(e, s[6], !0), C(m, l, x), C(m, t, x), v.block.m(m, v.anchor = x), v.mount = () => t.parentNode, v.anchor = t, n || (a = Z(e, "change", s[20]), n = !0); }, p(m, x) { if (s = m, x[0] & 16384) {
        c = we(s[34]);
        let p;
        for (p = 0; p < c.length; p += 1) {
            const I = Nt(s, c, p);
            r[p] ? r[p].p(I, x) : (r[p] = qt(I), r[p].c(), r[p].m(e, null));
        }
        for (; p < r.length; p += 1)
            r[p].d(1);
        r.length = c.length;
    } x[0] & 16448 && re(e, s[6]), v.ctx = s, x[0] & 64 && o !== (o = s[15](s[6])) && je(o, v) || Ae(v, s, x); }, d(m) { m && (_(e), _(l), _(t)), Ke(r, m), v.block.d(m), v.token = null, v = null, n = !1, a(); } }; }
function qt(s) { let e, l = "Seleccione un usuario para modificar", t, o = s[35].username + "", n; return { c() { e = d("option"), e.textContent = l, t = d("option"), n = pe(o), this.h(); }, l(a) { e = f(a, "OPTION", { "data-svelte-h": !0 }), T(e) !== "svelte-19bsjs5" && (e.textContent = l), t = f(a, "OPTION", {}); var c = z(t); n = ve(c, o), c.forEach(_), this.h(); }, h() { e.__value = null, Y(e, e.__value), e.selected = !0, t.__value = s[35].id, Y(t, t.__value); }, m(a, c) { C(a, e, c), C(a, t, c), i(t, n); }, p: b, d(a) { a && (_(e), _(t)); } }; }
function $t(s) { return { c: b, l: b, m: b, p: b, d: b }; }
function el(s) { var D; let e, l, t = "Nuevo Nombre", o, n, a, c, r, v, m = "Nuevo Apellido", x, p, I, M, q, H, $ = "Nuevo Nombre de Usuario", W, U, G, J, N, A, xe = "Nuevo Rol de Usuario", ie, y, B, le = ((D = s[42]) == null ? void 0 : D.role) + "", K, Q, me = "Auditor", L, be = "Editor", R, ke, ue; return { c() { e = d("div"), l = d("p"), l.textContent = t, o = E(), n = d("input"), c = E(), r = d("div"), v = d("p"), v.textContent = m, x = E(), p = d("input"), M = E(), q = d("div"), H = d("p"), H.textContent = $, W = E(), U = d("input"), J = E(), N = d("div"), A = d("p"), A.textContent = xe, ie = E(), y = d("select"), B = d("option"), K = pe(le), Q = d("option"), Q.textContent = me, L = d("option"), L.textContent = be, this.h(); }, l(h) { e = f(h, "DIV", { class: !0 }); var k = z(e); l = f(k, "P", { "data-svelte-h": !0 }), T(l) !== "svelte-1f7hwuk" && (l.textContent = t), o = w(k), n = f(k, "INPUT", { type: !0, name: !0, placeholder: !0, class: !0 }), k.forEach(_), c = w(h), r = f(h, "DIV", { class: !0 }); var S = z(r); v = f(S, "P", { "data-svelte-h": !0 }), T(v) !== "svelte-pz2c3h" && (v.textContent = m), x = w(S), p = f(S, "INPUT", { type: !0, name: !0, placeholder: !0, class: !0 }), S.forEach(_), M = w(h), q = f(h, "DIV", { class: !0 }); var ee = z(q); H = f(ee, "P", { "data-svelte-h": !0 }), T(H) !== "svelte-1i6n2sz" && (H.textContent = $), W = w(ee), U = f(ee, "INPUT", { type: !0, name: !0, placeholder: !0, class: !0 }), ee.forEach(_), J = w(h), N = f(h, "DIV", { class: !0 }); var ne = z(N); A = f(ne, "P", { "data-svelte-h": !0 }), T(A) !== "svelte-3dezzz" && (A.textContent = xe), ie = w(ne), y = f(ne, "SELECT", { placeholder: !0, class: !0 }); var j = z(y); B = f(j, "OPTION", { class: !0 }); var te = z(B); K = ve(te, le), te.forEach(_), Q = f(j, "OPTION", { "data-svelte-h": !0 }), T(Q) !== "svelte-1bzrz92" && (Q.textContent = me), L = f(j, "OPTION", { "data-svelte-h": !0 }), T(L) !== "svelte-1k7bpsu" && (L.textContent = be), j.forEach(_), ne.forEach(_), this.h(); }, h() { var h, k, S, ee; u(n, "type", "text"), u(n, "name", "nombre"), u(n, "placeholder", a = (h = s[42]) == null ? void 0 : h.nombre), n.required = !0, u(n, "class", "svelte-1rt1t1z"), u(e, "class", "mt-2"), u(p, "type", "text"), u(p, "name", "nombre"), u(p, "placeholder", I = (k = s[42]) == null ? void 0 : k.apellido), p.required = !0, u(p, "class", "svelte-1rt1t1z"), u(r, "class", "mt-2"), u(U, "type", "text"), u(U, "name", "nombre"), u(U, "placeholder", G = (S = s[42]) == null ? void 0 : S.username), U.required = !0, u(U, "class", "svelte-1rt1t1z"), u(q, "class", "mt-2"), B.__value = "", Y(B, B.__value), B.disabled = !0, B.selected = !0, u(B, "class", "text-gay-300"), Q.__value = "Auditor", Y(Q, Q.__value), L.__value = "Editor", Y(L, L.__value), u(y, "placeholder", R = (ee = s[42]) == null ? void 0 : ee.role), u(y, "class", "svelte-1rt1t1z"), s[10] === void 0 && Se(() => s[24].call(y)), u(N, "class", "mt-2"); }, m(h, k) { C(h, e, k), i(e, l), i(e, o), i(e, n), Y(n, s[7]), C(h, c, k), C(h, r, k), i(r, v), i(r, x), i(r, p), Y(p, s[8]), C(h, M, k), C(h, q, k), i(q, H), i(q, W), i(q, U), Y(U, s[9]), C(h, J, k), C(h, N, k), i(N, A), i(N, ie), i(N, y), i(y, B), i(B, K), i(y, Q), i(y, L), re(y, s[10], !0), ke || (ue = [Z(n, "input", s[21]), Z(p, "input", s[22]), Z(U, "input", s[23]), Z(y, "change", s[24])], ke = !0); }, p(h, k) { var S, ee, ne, j, te; k[0] & 16448 && a !== (a = (S = h[42]) == null ? void 0 : S.nombre) && u(n, "placeholder", a), k[0] & 128 && n.value !== h[7] && Y(n, h[7]), k[0] & 16448 && I !== (I = (ee = h[42]) == null ? void 0 : ee.apellido) && u(p, "placeholder", I), k[0] & 256 && p.value !== h[8] && Y(p, h[8]), k[0] & 16448 && G !== (G = (ne = h[42]) == null ? void 0 : ne.username) && u(U, "placeholder", G), k[0] & 512 && U.value !== h[9] && Y(U, h[9]), k[0] & 64 && le !== (le = ((j = h[42]) == null ? void 0 : j.role) + "") && Jt(K, le), k[0] & 16448 && R !== (R = (te = h[42]) == null ? void 0 : te.role) && u(y, "placeholder", R), k[0] & 1024 && re(y, h[10]); }, d(h) { h && (_(e), _(c), _(r), _(M), _(q), _(J), _(N)), ke = !1, dt(ue); } }; }
function tl(s) { return { c: b, l: b, m: b, p: b, d: b }; }
function ll(s) { let e, l = "Cargando Usuarios..."; return { c() { e = d("h1"), e.textContent = l, this.h(); }, l(t) { e = f(t, "H1", { class: !0, "data-svelte-h": !0 }), T(e) !== "svelte-105zjbq" && (e.textContent = l), this.h(); }, h() { u(e, "class", "font-poppins font-bold text-xl animate-pulse"); }, m(t, o) { C(t, e, o); }, p: b, d(t) { t && _(e); } }; }
function Ht(s) { let e, l = { ctx: s, current: null, token: null, hasCatch: !1, pending: ll, then: Xt, catch: Qt, value: 34 }; return je(s[14](), l), { c() { e = V(), l.block.c(); }, l(t) { e = V(), l.block.l(t); }, m(t, o) { C(t, e, o), l.block.m(t, l.anchor = o), l.mount = () => e.parentNode, l.anchor = e; }, p(t, o) { s = t, Ae(l, s, o); }, d(t) { t && _(e), l.block.d(t), l.token = null, l = null; } }; }
function nl(s) { return { c: b, l: b, m: b, p: b, d: b }; }
function sl(s) { let e; function l(n, a) { return n[34] !== null ? al : ol; } let o = l(s)(s); return { c() { o.c(), e = V(); }, l(n) { o.l(n), e = V(); }, m(n, a) { o.m(n, a), C(n, e, a); }, p(n, a) { o.p(n, a); }, d(n) { n && _(e), o.d(n); } }; }
function ol(s) { let e, l = "No ha sido creado ningún Usuario."; return { c() { e = d("h1"), e.textContent = l, this.h(); }, l(t) { e = f(t, "H1", { class: !0, "data-svelte-h": !0 }), T(e) !== "svelte-17vcd52" && (e.textContent = l), this.h(); }, h() { u(e, "class", "font-poppins font-bold text-xl"); }, m(t, o) { C(t, e, o); }, p: b, d(t) { t && _(e); } }; }
function al(s) { let e, l, t, o = we(s[34]), n = []; for (let a = 0; a < o.length; a += 1)
    n[a] = yt(zt(s, o, a)); return { c() { e = d("select"); for (let a = 0; a < n.length; a += 1)
        n[a].c(); this.h(); }, l(a) { e = f(a, "SELECT", { name: !0, id: !0, class: !0 }); var c = z(e); for (let r = 0; r < n.length; r += 1)
        n[r].l(c); c.forEach(_), this.h(); }, h() { u(e, "name", ""), u(e, "id", ""), e.required = !0, u(e, "class", "svelte-1rt1t1z"), s[5] === void 0 && Se(() => s[26].call(e)); }, m(a, c) { C(a, e, c); for (let r = 0; r < n.length; r += 1)
        n[r] && n[r].m(e, null); re(e, s[5], !0), l || (t = Z(e, "change", s[26]), l = !0); }, p(a, c) { if (c[0] & 16384) {
        o = we(a[34]);
        let r;
        for (r = 0; r < o.length; r += 1) {
            const v = zt(a, o, r);
            n[r] ? n[r].p(v, c) : (n[r] = yt(v), n[r].c(), n[r].m(e, null));
        }
        for (; r < n.length; r += 1)
            n[r].d(1);
        n.length = o.length;
    } c[0] & 16416 && re(e, a[5]); }, d(a) { a && _(e), Ke(n, a), l = !1, t(); } }; }
function yt(s) { let e, l = s[35].username + "", t; return { c() { e = d("option"), t = pe(l), this.h(); }, l(o) { e = f(o, "OPTION", {}); var n = z(e); t = ve(n, l), n.forEach(_), this.h(); }, h() { e.__value = s[35].id, Y(e, e.__value); }, m(o, n) { C(o, e, n), i(e, t); }, p: b, d(o) { o && _(e); } }; }
function rl(s) { let e, l = "Cargando Usuarios..."; return { c() { e = d("h1"), e.textContent = l, this.h(); }, l(t) { e = f(t, "H1", { class: !0, "data-svelte-h": !0 }), T(e) !== "svelte-105zjbq" && (e.textContent = l), this.h(); }, h() { u(e, "class", "font-poppins font-bold text-xl animate-pulse"); }, m(t, o) { C(t, e, o); }, p: b, d(t) { t && _(e); } }; }
function Dt(s) { let e, l = { ctx: s, current: null, token: null, hasCatch: !1, pending: rl, then: sl, catch: nl, value: 34 }; return je(s[14](), l), { c() { e = V(), l.block.c(); }, l(t) { e = V(), l.block.l(t); }, m(t, o) { C(t, e, o), l.block.m(t, l.anchor = o), l.mount = () => e.parentNode, l.anchor = e; }, p(t, o) { s = t, Ae(l, s, o); }, d(t) { t && _(e), l.block.d(t), l.token = null, l = null; } }; }
function il(s) { return { c: b, l: b, m: b, p: b, d: b }; }
function ul(s) { let e; function l(n, a) { return n[34] !== null ? dl : cl; } let o = l(s)(s); return { c() { o.c(), e = V(); }, l(n) { o.l(n), e = V(); }, m(n, a) { o.m(n, a), C(n, e, a); }, p(n, a) { o.p(n, a); }, d(n) { n && _(e), o.d(n); } }; }
function cl(s) { let e, l = "No ha sido creado ningún Usuario."; return { c() { e = d("h1"), e.textContent = l, this.h(); }, l(t) { e = f(t, "H1", { class: !0, "data-svelte-h": !0 }), T(e) !== "svelte-17vcd52" && (e.textContent = l), this.h(); }, h() { u(e, "class", "font-poppins font-bold text-xl"); }, m(t, o) { C(t, e, o); }, p: b, d(t) { t && _(e); } }; }
function dl(s) { let e, l, t, o = we(s[34]), n = []; for (let a = 0; a < o.length; a += 1)
    n[a] = Pt(Ut(s, o, a)); return { c() { e = d("select"); for (let a = 0; a < n.length; a += 1)
        n[a].c(); this.h(); }, l(a) { e = f(a, "SELECT", { name: !0, id: !0, class: !0 }); var c = z(e); for (let r = 0; r < n.length; r += 1)
        n[r].l(c); c.forEach(_), this.h(); }, h() { u(e, "name", ""), u(e, "id", ""), e.required = !0, u(e, "class", "svelte-1rt1t1z"), s[4] === void 0 && Se(() => s[28].call(e)); }, m(a, c) { C(a, e, c); for (let r = 0; r < n.length; r += 1)
        n[r] && n[r].m(e, null); re(e, s[4], !0), l || (t = Z(e, "change", s[28]), l = !0); }, p(a, c) { if (c[0] & 16384) {
        o = we(a[34]);
        let r;
        for (r = 0; r < o.length; r += 1) {
            const v = Ut(a, o, r);
            n[r] ? n[r].p(v, c) : (n[r] = Pt(v), n[r].c(), n[r].m(e, null));
        }
        for (; r < n.length; r += 1)
            n[r].d(1);
        n.length = o.length;
    } c[0] & 16400 && re(e, a[4]); }, d(a) { a && _(e), Ke(n, a), l = !1, t(); } }; }
function Pt(s) { let e, l = s[35].username + "", t; return { c() { e = d("option"), t = pe(l), this.h(); }, l(o) { e = f(o, "OPTION", {}); var n = z(e); t = ve(n, l), n.forEach(_), this.h(); }, h() { e.__value = s[35].id, Y(e, e.__value); }, m(o, n) { C(o, e, n), i(e, t); }, p: b, d(o) { o && _(e); } }; }
function fl(s) { let e, l = "Cargando Usuarios..."; return { c() { e = d("h1"), e.textContent = l, this.h(); }, l(t) { e = f(t, "H1", { class: !0, "data-svelte-h": !0 }), T(e) !== "svelte-105zjbq" && (e.textContent = l), this.h(); }, h() { u(e, "class", "font-poppins font-bold text-xl animate-pulse"); }, m(t, o) { C(t, e, o); }, p: b, d(t) { t && _(e); } }; }
function Mt(s) { let e, l = { ctx: s, current: null, token: null, hasCatch: !1, pending: fl, then: ul, catch: il, value: 34 }; return je(s[14](), l), { c() { e = V(), l.block.c(); }, l(t) { e = V(), l.block.l(t); }, m(t, o) { C(t, e, o), l.block.m(t, l.anchor = o), l.mount = () => e.parentNode, l.anchor = e; }, p(t, o) { s = t, Ae(l, s, o); }, d(t) { t && _(e), l.block.d(t), l.token = null, l = null; } }; }
function _l(s) { return { c: b, l: b, m: b, p: b, d: b }; }
function hl(s) { let e; function l(n, a) { return n[34] !== null ? vl : pl; } let o = l(s)(s); return { c() { o.c(), e = V(); }, l(n) { o.l(n), e = V(); }, m(n, a) { o.m(n, a), C(n, e, a); }, p(n, a) { o.p(n, a); }, d(n) { n && _(e), o.d(n); } }; }
function pl(s) { let e, l = "No ha sido creado ningún Usuario."; return { c() { e = d("h1"), e.textContent = l, this.h(); }, l(t) { e = f(t, "H1", { class: !0, "data-svelte-h": !0 }), T(e) !== "svelte-17vcd52" && (e.textContent = l), this.h(); }, h() { u(e, "class", "font-poppins font-bold text-xl"); }, m(t, o) { C(t, e, o); }, p: b, d(t) { t && _(e); } }; }
function vl(s) { let e, l, t, o = we(s[34]), n = []; for (let a = 0; a < o.length; a += 1)
    n[a] = jt(xt(s, o, a)); return { c() { e = d("select"); for (let a = 0; a < n.length; a += 1)
        n[a].c(); this.h(); }, l(a) { e = f(a, "SELECT", { name: !0, id: !0, class: !0 }); var c = z(e); for (let r = 0; r < n.length; r += 1)
        n[r].l(c); c.forEach(_), this.h(); }, h() { u(e, "name", ""), u(e, "id", ""), e.required = !0, u(e, "class", "svelte-1rt1t1z"), s[3] === void 0 && Se(() => s[30].call(e)); }, m(a, c) { C(a, e, c); for (let r = 0; r < n.length; r += 1)
        n[r] && n[r].m(e, null); re(e, s[3], !0), l || (t = Z(e, "change", s[30]), l = !0); }, p(a, c) { if (c[0] & 16384) {
        o = we(a[34]);
        let r;
        for (r = 0; r < o.length; r += 1) {
            const v = xt(a, o, r);
            n[r] ? n[r].p(v, c) : (n[r] = jt(v), n[r].c(), n[r].m(e, null));
        }
        for (; r < n.length; r += 1)
            n[r].d(1);
        n.length = o.length;
    } c[0] & 16392 && re(e, a[3]); }, d(a) { a && _(e), Ke(n, a), l = !1, t(); } }; }
function jt(s) { let e, l = s[35].username + "", t; return { c() { e = d("option"), t = pe(l), this.h(); }, l(o) { e = f(o, "OPTION", {}); var n = z(e); t = ve(n, l), n.forEach(_), this.h(); }, h() { e.__value = s[35].id, Y(e, e.__value); }, m(o, n) { C(o, e, n), i(e, t); }, p: b, d(o) { o && _(e); } }; }
function ml(s) { let e, l = "Cargando Usuarios..."; return { c() { e = d("h1"), e.textContent = l, this.h(); }, l(t) { e = f(t, "H1", { class: !0, "data-svelte-h": !0 }), T(e) !== "svelte-105zjbq" && (e.textContent = l), this.h(); }, h() { u(e, "class", "font-poppins font-bold text-xl animate-pulse"); }, m(t, o) { C(t, e, o); }, p: b, d(t) { t && _(e); } }; }
function Ot(s) { let e, l = { ctx: s, current: null, token: null, hasCatch: !1, pending: ml, then: hl, catch: _l, value: 34 }; return je(s[14](), l), { c() { e = V(), l.block.c(); }, l(t) { e = V(), l.block.l(t); }, m(t, o) { C(t, e, o), l.block.m(t, l.anchor = o), l.mount = () => e.parentNode, l.anchor = e; }, p(t, o) { s = t, Ae(l, s, o); }, d(t) { t && _(e), l.block.d(t), l.token = null, l = null; } }; }
function Vt(s) { let e, l, t, o = "¡Precaucion! Eliminar Usuario", n, a, c = "¿Está seguro de que desea eliminar éste Usuario? Una vez eliminado, la información es <b>irrecuperable.</b>", r, v, m, x = "Regresar", p, I, M = "Eliminar", q, H; return { c() { e = d("div"), l = d("div"), t = d("h1"), t.textContent = o, n = E(), a = d("p"), a.innerHTML = c, r = E(), v = d("div"), m = d("button"), m.textContent = x, p = E(), I = d("button"), I.textContent = M, this.h(); }, l($) { e = f($, "DIV", { class: !0 }); var W = z(e); l = f(W, "DIV", { class: !0 }); var U = z(l); t = f(U, "H1", { class: !0, "data-svelte-h": !0 }), T(t) !== "svelte-14380ly" && (t.textContent = o), n = w(U), a = f(U, "P", { "data-svelte-h": !0 }), T(a) !== "svelte-1a6o48v" && (a.innerHTML = c), r = w(U), v = f(U, "DIV", { class: !0 }); var G = z(v); m = f(G, "BUTTON", { class: !0, "data-svelte-h": !0 }), T(m) !== "svelte-1l641iw" && (m.textContent = x), p = w(G), I = f(G, "BUTTON", { class: !0, "data-svelte-h": !0 }), T(I) !== "svelte-itg74x" && (I.textContent = M), G.forEach(_), U.forEach(_), W.forEach(_), this.h(); }, h() { u(t, "class", "text-red-500 text-xl font-poppins font-bold"), u(m, "class", "border-2 border-black px-4 py-1 rounded-md font-poppins hover:bg-black hover:text-white active:bg-gray-700 transition-all duration-200 ease-linear"), u(I, "class", "px-4 py-1 bg-red-600 border-2 border-red-600 text-white font-poppins rounded-md hover:bg-red-500 active:bg-red-700 transition-all duration-200 ease-linear"), u(v, "class", "flex items-center justify-end gap-6 border-t-2 border-slate-500 pt-3"), u(l, "class", "size-full"), u(e, "class", "fixed top-[50%] max-w-[40%] translate-y-[-50%] translate-x-[50%] border-2 rounded-md bg-white p-3"); }, m($, W) { C($, e, W), i(e, l), i(l, t), i(l, n), i(l, a), i(l, r), i(l, v), i(v, m), i(v, p), i(v, I), q || (H = [Z(m, "click", s[32]), Z(I, "click", s[33])], q = !0); }, p: b, d($) { $ && _(e), q = !1, dt(H); } }; }
function bl(s) {
    let e, l, t, o, n = "Administrar Usuarios", a, c, r, v = "Modificar Usuario", m, x, p = "Seleccione un usuario para modificar sus datos. De sólo especificarse un campo, los demás se mantendrán iguales.", I, M, q, H, $ = s[12], W, U, G = '<span class="inner w-full svelte-1rt1t1z">Modificar</span>', J, N, A, xe = "Bloquear Usuario", ie, y, B = "Al bloquear un usuario, impedirá su acceso a la aplicación y a las funcionalidad internas de la misma mediante el bloqueo de inicio de sesion.", le, K, Q = `<b>Nota:</b> Bloquear a un usuario no eliminará sus datos ni sus registros, sólo impedirá su acceso a la aplicación. <br/>
            En caso de querer eliminar completamente los datos del usuario, dirigirse al apartado de <b class="text-red-600">Eliminar Usuario</b>`, me, L, be, R, ke = s[12], ue, D, h = '<div class="tooltipInner svelte-1rt1t1z"><p><b class="text-red-600">Precaución: </b>El usuario que elija será bloqueado de manera indefinida.</p></div>', k, S, ee = '<span class="inner w-full svelte-1rt1t1z">Bloquear</span>', ne, j, te, ft = "Desbloquear Usuario", Qe, He, _t = "Al desbloquear un usuario, habilitará nuevamente el acceso del mismo a las funiconalidades de la aplicación.", Xe, Ue, Ye, ze, ht = s[12], Ze, Ce, pt = '<span class="inner w-full svelte-1rt1t1z">Desbloquear</span>', $e, X, Ne, vt = "Eliminar Usuario", et, ye, mt = "Al eliminar un usuario, será eliminada toda su información junto a su acceso a las funcionalidades del sistema.", tt, De, bt = "No serán eliminados los prestamos registrados por el usuario eliminado, ni su información asociada.", lt, Ie, nt, ce, kt = s[12], Be, qe, Ct = '<div class="tooltipInner svelte-1rt1t1z"><p><b class="text-red-600">Precaución: </b>El usuario que elija será eliminado permanentemente del registro.</p></div>', st, ge, gt = '<span class="inner w-full svelte-1rt1t1z">Eliminar</span>', Re, Fe, Pe, Oe, ot, Tt, O = s[1] && It(s), de = Ht(s), fe = Dt(s), _e = Mt(s), he = Ot(s), F = s[11] && Vt(s);
    return { c() {
            e = d("main"), O && O.c(), l = E(), t = d("div"), o = d("h1"), o.textContent = n, a = E(), c = d("div"), r = d("h2"), r.textContent = v, m = E(), x = d("p"), x.textContent = p, I = E(), M = d("div"), q = pe(`Usuario a Modificar:\r
                `), H = d("div"), de.c(), W = E(), U = d("button"), U.innerHTML = G, J = E(), N = d("div"), A = d("h2"), A.textContent = xe, ie = E(), y = d("p"), y.textContent = B, le = E(), K = d("p"), K.innerHTML = Q, me = E(), L = d("div"), be = pe(`Usuario a bloquear:\r
\r
                `), R = d("div"), fe.c(), ue = E(), D = d("div"), D.innerHTML = h, k = E(), S = d("button"), S.innerHTML = ee, ne = E(), j = d("div"), te = d("h2"), te.textContent = ft, Qe = E(), He = d("p"), He.textContent = _t, Xe = E(), Ue = d("div"), Ye = pe(`Usuario a Desbloquear:\r
\r
                `), ze = d("div"), _e.c(), Ze = E(), Ce = d("button"), Ce.innerHTML = pt, $e = E(), X = d("div"), Ne = d("h2"), Ne.textContent = vt, et = E(), ye = d("p"), ye.textContent = mt, tt = E(), De = d("p"), De.textContent = bt, lt = E(), Ie = d("div"), nt = pe(`Usuario a Eliminar:\r
\r
                `), ce = d("div"), he.c(), Be = E(), qe = d("div"), qe.innerHTML = Ct, st = E(), ge = d("button"), ge.innerHTML = gt, Fe = E(), F && F.c(), Pe = V(), this.h();
        }, l(g) {
            e = f(g, "MAIN", { class: !0 });
            var P = z(e);
            O && O.l(P), l = w(P), t = f(P, "DIV", { class: !0 });
            var se = z(t);
            o = f(se, "H1", { class: !0, "data-svelte-h": !0 }), T(o) !== "svelte-l6m9p9" && (o.textContent = n), a = w(se), c = f(se, "DIV", { class: !0 });
            var Te = z(c);
            r = f(Te, "H2", { class: !0, "data-svelte-h": !0 }), T(r) !== "svelte-l47bda" && (r.textContent = v), m = w(Te), x = f(Te, "P", { "data-svelte-h": !0 }), T(x) !== "svelte-9kgxn6" && (x.textContent = p), I = w(Te), M = f(Te, "DIV", { class: !0 });
            var at = z(M);
            q = ve(at, `Usuario a Modificar:\r
                `), H = f(at, "DIV", { class: !0 });
            var Et = z(H);
            de.l(Et), Et.forEach(_), at.forEach(_), W = w(Te), U = f(Te, "BUTTON", { class: !0, "data-svelte-h": !0 }), T(U) !== "svelte-b8m356" && (U.innerHTML = G), Te.forEach(_), J = w(se), N = f(se, "DIV", { class: !0 });
            var oe = z(N);
            A = f(oe, "H2", { class: !0, "data-svelte-h": !0 }), T(A) !== "svelte-603gnx" && (A.textContent = xe), ie = w(oe), y = f(oe, "P", { "data-svelte-h": !0 }), T(y) !== "svelte-198ecue" && (y.textContent = B), le = w(oe), K = f(oe, "P", { class: !0, "data-svelte-h": !0 }), T(K) !== "svelte-mpd9qh" && (K.innerHTML = Q), me = w(oe), L = f(oe, "DIV", { class: !0 });
            var rt = z(L);
            be = ve(rt, `Usuario a bloquear:\r
\r
                `), R = f(rt, "DIV", { class: !0 });
            var We = z(R);
            fe.l(We), ue = w(We), D = f(We, "DIV", { class: !0, "data-svelte-h": !0 }), T(D) !== "svelte-k57ijo" && (D.innerHTML = h), We.forEach(_), rt.forEach(_), k = w(oe), S = f(oe, "BUTTON", { class: !0, "data-svelte-h": !0 }), T(S) !== "svelte-1l9u8wz" && (S.innerHTML = ee), oe.forEach(_), ne = w(se), j = f(se, "DIV", { class: !0 });
            var Ee = z(j);
            te = f(Ee, "H2", { class: !0, "data-svelte-h": !0 }), T(te) !== "svelte-xu0l3z" && (te.textContent = ft), Qe = w(Ee), He = f(Ee, "P", { "data-svelte-h": !0 }), T(He) !== "svelte-1bzmmsm" && (He.textContent = _t), Xe = w(Ee), Ue = f(Ee, "DIV", { class: !0 });
            var it = z(Ue);
            Ye = ve(it, `Usuario a Desbloquear:\r
\r
                `), ze = f(it, "DIV", { class: !0 });
            var wt = z(ze);
            _e.l(wt), wt.forEach(_), it.forEach(_), Ze = w(Ee), Ce = f(Ee, "BUTTON", { class: !0, "data-svelte-h": !0 }), T(Ce) !== "svelte-ijajet" && (Ce.innerHTML = pt), Ee.forEach(_), $e = w(se), X = f(se, "DIV", { class: !0 });
            var ae = z(X);
            Ne = f(ae, "H2", { class: !0, "data-svelte-h": !0 }), T(Ne) !== "svelte-p6vv64" && (Ne.textContent = vt), et = w(ae), ye = f(ae, "P", { "data-svelte-h": !0 }), T(ye) !== "svelte-1jjdrin" && (ye.textContent = mt), tt = w(ae), De = f(ae, "P", { "data-svelte-h": !0 }), T(De) !== "svelte-oisi9n" && (De.textContent = bt), lt = w(ae), Ie = f(ae, "DIV", { class: !0 });
            var ut = z(Ie);
            nt = ve(ut, `Usuario a Eliminar:\r
\r
                `), ce = f(ut, "DIV", { class: !0 });
            var Ge = z(ce);
            he.l(Ge), Be = w(Ge), qe = f(Ge, "DIV", { class: !0, "data-svelte-h": !0 }), T(qe) !== "svelte-c6iq9w" && (qe.innerHTML = Ct), Ge.forEach(_), ut.forEach(_), st = w(ae), ge = f(ae, "BUTTON", { class: !0, "data-svelte-h": !0 }), T(ge) !== "svelte-123ook7" && (ge.innerHTML = gt), ae.forEach(_), se.forEach(_), P.forEach(_), Fe = w(g), F && F.l(g), Pe = V(), this.h();
        }, h() { u(o, "class", "sectionTitle svelte-1rt1t1z"), u(r, "class", "svelte-1rt1t1z"), u(H, "class", "w-2/4"), u(M, "class", "w-2/4 mt-8"), u(U, "class", "submit-form-button svelte-1rt1t1z"), u(c, "class", "w-full border-t pt-4 mt-4"), u(A, "class", "svelte-1rt1t1z"), u(K, "class", "text-sm"), u(D, "class", "tooltip scale-0 right-[-110%] top-[0%] group-hover:scale-100 svelte-1rt1t1z"), u(R, "class", "w-2/4 group relative"), u(L, "class", "w-2/4 mt-8"), u(S, "class", "submit-form-button svelte-1rt1t1z"), u(N, "class", "w-full border-t pt-4 mt-4"), u(te, "class", "svelte-1rt1t1z"), u(ze, "class", "w-2/4 group relative"), u(Ue, "class", "w-2/4 mt-8"), u(Ce, "class", "submit-form-button svelte-1rt1t1z"), u(j, "class", "w-full border-t pt-4 mt-4"), u(Ne, "class", "text-red-800 svelte-1rt1t1z"), u(qe, "class", "tooltip scale-0 right-[-110%] top-[0%] group-hover:scale-100 svelte-1rt1t1z"), u(ce, "class", "w-2/4 group relative"), u(Ie, "class", "w-2/4 mt-8"), u(ge, "class", "submit-form-button svelte-1rt1t1z"), u(X, "class", "w-full border-t pt-4 mt-4"), u(t, "class", "section svelte-1rt1t1z"), u(e, "class", Re = "w-full relative transition-all duration-300 ease-linear " + (s[11] ? "blur-md" : "")); }, m(g, P) { C(g, e, P), O && O.m(e, null), i(e, l), i(e, t), i(t, o), i(t, a), i(t, c), i(c, r), i(c, m), i(c, x), i(c, I), i(c, M), i(M, q), i(M, H), de.m(H, null), i(c, W), i(c, U), i(t, J), i(t, N), i(N, A), i(N, ie), i(N, y), i(N, le), i(N, K), i(N, me), i(N, L), i(L, be), i(L, R), fe.m(R, null), i(R, ue), i(R, D), i(N, k), i(N, S), i(t, ne), i(t, j), i(j, te), i(j, Qe), i(j, He), i(j, Xe), i(j, Ue), i(Ue, Ye), i(Ue, ze), _e.m(ze, null), i(j, Ze), i(j, Ce), i(t, $e), i(t, X), i(X, Ne), i(X, et), i(X, ye), i(X, tt), i(X, De), i(X, lt), i(X, Ie), i(Ie, nt), i(Ie, ce), he.m(ce, null), i(ce, Be), i(ce, qe), i(X, st), i(X, ge), C(g, Fe, P), F && F.m(g, P), C(g, Pe, P), Oe = !0, ot || (Tt = [Z(U, "click", s[25]), Z(S, "click", s[27]), Z(Ce, "click", s[29]), Z(ge, "click", s[31])], ot = !0); }, p(g, P) { g[1] ? O ? (O.p(g, P), P[0] & 2 && Je(O, 1)) : (O = It(g), O.c(), Je(O, 1), O.m(e, l)) : O && (Gt(), ct(O, 1, 1, () => { O = null; }), At()), P[0] & 4096 && Le($, $ = g[12]) ? (de.d(1), de = Ht(g), de.c(), de.m(H, null)) : de.p(g, P), P[0] & 4096 && Le(ke, ke = g[12]) ? (fe.d(1), fe = Dt(g), fe.c(), fe.m(R, ue)) : fe.p(g, P), P[0] & 4096 && Le(ht, ht = g[12]) ? (_e.d(1), _e = Mt(g), _e.c(), _e.m(ze, null)) : _e.p(g, P), P[0] & 4096 && Le(kt, kt = g[12]) ? (he.d(1), he = Ot(g), he.c(), he.m(ce, Be)) : he.p(g, P), (!Oe || P[0] & 2048 && Re !== (Re = "w-full relative transition-all duration-300 ease-linear " + (g[11] ? "blur-md" : ""))) && u(e, "class", Re), g[11] ? F ? F.p(g, P) : (F = Vt(g), F.c(), F.m(Pe.parentNode, Pe)) : F && (F.d(1), F = null); }, i(g) { Oe || (Je(O), Oe = !0); }, o(g) { ct(O), Oe = !1; }, d(g) { g && (_(e), _(Fe), _(Pe)), O && O.d(), de.d(g), fe.d(g), _e.d(g), he.d(g), F && F.d(g), ot = !1, dt(Tt); } };
}
function kl(s, e, l) { let t, o = 400, n = !1, a = ""; function c(D, h) { l(2, a = D), l(0, o = h), l(1, n = !0), setTimeout(() => { l(1, n = !1); }, 5e3); } let r = "", v = "", m = "", x = "", p = "", I = "", M = "", q = ""; async function H() { return await (await fetch(`${Me}/usuarios/*`)).json(); } async function $(D) { return await (await fetch(`${Me}/usuarios/${D}`)).json(); } async function W(D) { const h = await fetch(`${Me}/usuarios/block/${D}`), k = await h.json(); h.status === 200 ? (c(k.message, h.status), l(12, t++, t)) : c(k.message, h.status); } async function U(D) { const h = await fetch(`${Me}/usuarios/unlock/${D}`), k = await h.json(); h.status === 200 ? (c(k.message, h.status), l(12, t++, t)) : c(k.message, h.status); } async function G(D) { const h = await fetch(`${Me}/usuarios/${D}?nombre=${p}&apellido=${I}&username=${M}&role=${q}`, { method: "PATCH", headers: { "Content-Type": "application/json" } }), k = await h.json(); h.status === 200 ? (c(k.message, h.status), l(12, t++, t), l(7, p = ""), l(8, I = ""), l(9, M = ""), l(10, q = "")) : c(k.message, h.status); } let J = !1; async function N(D = r) { const h = await fetch(`${Me}/usuarios/${D}`, { method: "delete" }), k = await h.json(); h.status === 200 ? (c(k.message, h.status), l(12, t++, t), l(11, J = !1)) : c(k.message, h.status); } function A() { x = Ve(this), l(6, x), l(14, H); } function xe() { p = this.value, l(7, p); } function ie() { I = this.value, l(8, I); } function y() { M = this.value, l(9, M); } function B() { q = Ve(this), l(10, q); } const le = () => G(x); function K() { m = Ve(this), l(5, m), l(14, H); } const Q = () => W(m); function me() { v = Ve(this), l(4, v), l(14, H); } const L = () => U(v); function be() { r = Ve(this), l(3, r), l(14, H); } const R = () => { r === "" ? c("No se ha seleccionado ningún usuario para eliminar", 400) : l(11, J = !J); }, ke = () => { l(11, J = !J); }, ue = () => N(r); return l(12, t = 0), [o, n, a, r, v, m, x, p, I, M, q, J, t, c, H, $, W, U, G, N, A, xe, ie, y, B, le, K, Q, me, L, be, R, ke, ue]; }
class Ul extends Lt {
    constructor(e) { super(), St(this, e, kl, bl, Le, {}, null, [-1, -1]); }
}
export { Ul as component };