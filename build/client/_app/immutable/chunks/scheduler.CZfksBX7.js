function m(){}const B=t=>t;function w(t,n){for(const e in n)t[e]=n[e];return t}function C(t){return!!t&&(typeof t=="object"||typeof t=="function")&&typeof t.then=="function"}function E(t){return t()}function F(){return Object.create(null)}function j(t){t.forEach(E)}function q(t){return typeof t=="function"}function P(t,n){return t!=t?n==n:t!==n||t&&typeof t=="object"||typeof t=="function"}let l;function S(t,n){return t===n?!0:(l||(l=document.createElement("a")),l.href=n,t===l.href)}function U(t){return Object.keys(t).length===0}function O(t,...n){if(t==null){for(const o of n)o(void 0);return m}const e=t.subscribe(...n);return e.unsubscribe?()=>e.unsubscribe():e}function G(t,n,e){t.$$.on_destroy.push(O(n,e))}function H(t,n,e,o){if(t){const r=k(t,n,e,o);return t[0](r)}}function k(t,n,e,o){return t[1]&&o?w(e.ctx.slice(),t[1](o(n))):e.ctx}function I(t,n,e,o){if(t[2]&&o){const r=t[2](o(e));if(n.dirty===void 0)return r;if(typeof r=="object"){const a=[],_=Math.max(n.dirty.length,r.length);for(let u=0;u<_;u+=1)a[u]=n.dirty[u]|r[u];return a}return n.dirty|r}return n.dirty}function J(t,n,e,o,r,a){if(r){const _=k(n,e,o,a);t.p(_,r)}}function K(t){if(t.ctx.length>32){const n=[],e=t.ctx.length/32;for(let o=0;o<e;o++)n[o]=-1;return n}return-1}function L(t){return t??""}function N(t){return t&&q(t.destroy)?t.destroy:m}let f;function d(t){f=t}function b(){if(!f)throw new Error("Function called outside component initialization");return f}function Q(t){b().$$.on_mount.push(t)}function R(t){b().$$.after_update.push(t)}function T(t){b().$$.on_destroy.push(t)}function V(t,n){const e=t.$$.callbacks[n.type];e&&e.slice().forEach(o=>o.call(this,n))}const i=[],y=[];let s=[];const g=[],x=Promise.resolve();let p=!1;function z(){p||(p=!0,x.then(M))}function W(){return z(),x}function D(t){s.push(t)}const h=new Set;let c=0;function M(){if(c!==0)return;const t=f;do{try{for(;c<i.length;){const n=i[c];c++,d(n),A(n.$$)}}catch(n){throw i.length=0,c=0,n}for(d(null),i.length=0,c=0;y.length;)y.pop()();for(let n=0;n<s.length;n+=1){const e=s[n];h.has(e)||(h.add(e),e())}s.length=0}while(i.length);for(;g.length;)g.pop()();p=!1,h.clear(),d(t)}function A(t){if(t.fragment!==null){t.update(),j(t.before_update);const n=t.dirty;t.dirty=[-1],t.fragment&&t.fragment.p(t.ctx,n),t.after_update.forEach(D)}}function X(t){const n=[],e=[];s.forEach(o=>t.indexOf(o)===-1?n.push(o):e.push(o)),e.forEach(o=>o()),s=n}export{N as A,H as B,J as C,K as D,I as E,d as a,D as b,G as c,S as d,y as e,M as f,b as g,R as h,C as i,L as j,T as k,V as l,q as m,m as n,Q as o,B as p,F as q,j as r,P as s,W as t,U as u,X as v,f as w,E as x,i as y,z};
