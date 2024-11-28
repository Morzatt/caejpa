import{s as Oe,d as Re,r as Ze,e as Ge}from"../chunks/scheduler.CZfksBX7.js";import{S as $e,i as Ke,e as l,s as v,t as Y,c as r,a as S,f as h,p as k,d as b,b as J,q as t,g as We,h as e,r as oe,n as ce,l as Ne,m as Ye,j as De,u as Je,v as Qe,w as Xe,x as et,k as tt}from"../chunks/index.ubuQcuXk.js";import{S as st}from"../chunks/ServerMessage.CEzSWrnO.js";import{b as Ee}from"../chunks/index.B9cNcTi_.js";import{d as at}from"../chunks/delete_24dp_FILL0_wght400_GRAD0_opsz24.D6Xvlgzq.js";import{d as lt}from"../chunks/database_24dp_FILL0_wght400_GRAD0_opsz24.DMWiEBra.js";const rt="data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20height='24px'%20viewBox='0%20-960%20960%20960'%20width='24px'%20fill='%23000000'%3e%3cpath%20d='M440-200h80v-167l64%2064%2056-57-160-160-160%20160%2057%2056%2063-63v167ZM240-80q-33%200-56.5-23.5T160-160v-640q0-33%2023.5-56.5T240-880h320l240%20240v480q0%2033-23.5%2056.5T720-80H240Zm280-520v-200H240v640h480v-440H520ZM240-800v200-200%20640-640Z'/%3e%3c/svg%3e";function Fe(o){let i,c;return i=new st({props:{messageFromTheServer:o[2],serverStatus:o[0],messagePosition:"right-10 top-20",position:"fixed"}}),{c(){Je(i.$$.fragment)},l(s){Qe(i.$$.fragment,s)},m(s,p){Xe(i,s,p),c=!0},p(s,p){const D={};p&4&&(D.messageFromTheServer=s[2]),p&1&&(D.serverStatus=s[0]),i.$set(D)},i(s){c||(ce(i.$$.fragment,s),c=!0)},o(s){Ne(i.$$.fragment,s),c=!1},d(s){et(i,s)}}}function it(o){let i,c,s,p,D="Administrar Copias de Seguridad",N,T,f,w="Crear Copia de Seguridad",Q,x,ae=`Realice un respaldo de toda la información almacenada en la aplicación. Esto incluye: usuarios, <br/>
                registros y configuraciones.`,X,a,d='<span class="inner bg-white">Generar Respaldo</span>',g,n,C,xe="Restaurar Copia de Seguridad",de,V,ze=`Al realizar una restauración de copia de seguridad, se perderán todos los datos actualmente <br/> 
                registrados, incluyendo usuarios y registros, y se reemplazarán por los almacenados en la copia <br/>
                 de seguridad.`,ue,fe,me,B,Le="Se recomienda realizar una copia de seguridad de los datos actuales para evitar perdidas permanentes de informacion.",pe,F,O,H,z,je=`<img class="size-16" src="${rt}" alt=""/> <h3 class="font-poppins font-bold">Haga click y seleccione el archivo de respaldo correspondiente.</h3> <div class="tooltip scale-0 right-[-110%] top-[0%] group-hover:scale-100 svelte-1i20mpo"><div class="tooltipInner svelte-1i20mpo"><p><b class="text-red-600">Precaución:</b>
                                        Asegurese de seleccionar la copia de seguridad correcta al momento de subir el archivo.</p></div></div>`,ve,E,he,y,P,qe,ge,I,A,_e,ee=(o[4].fileName?o[4].fileName:"")+"",le,be,U,Te,te=(o[4].fileSize?o[4].fileSize:"")+"",re,we,R,Me,se=(o[4].lastModified?o[4].lastModified:"")+"",ie,Se,L,Pe=`<img class="w-8 filter group-hover:invert" src="${at}" alt=""/>`,ne,Ce,j,Ae='<span class="inner bg-white">Restaurar</span>',q,ye,Ue,u=o[1]&&Fe(o);return{c(){i=l("main"),u&&u.c(),c=v(),s=l("div"),p=l("h1"),p.textContent=D,N=v(),T=l("div"),f=l("h2"),f.textContent=w,Q=v(),x=l("p"),x.innerHTML=ae,X=v(),a=l("button"),a.innerHTML=d,g=v(),n=l("div"),C=l("h2"),C.textContent=xe,de=v(),V=l("p"),V.innerHTML=ze,ue=v(),fe=l("br"),me=v(),B=l("p"),B.textContent=Le,pe=v(),F=l("div"),O=l("div"),H=l("div"),z=l("label"),z.innerHTML=je,ve=v(),E=l("input"),he=v(),y=l("div"),P=l("img"),ge=v(),I=l("div"),A=l("p"),_e=Y("Nombre: "),le=Y(ee),be=v(),U=l("p"),Te=Y("Tramaño: "),re=Y(te),we=v(),R=l("p"),Me=Y("Ultima Modificación: "),ie=Y(se),Se=v(),L=l("button"),L.innerHTML=Pe,Ce=v(),j=l("button"),j.innerHTML=Ae,this.h()},l(m){i=r(m,"MAIN",{class:!0});var _=S(i);u&&u.l(_),c=h(_),s=r(_,"DIV",{class:!0});var Z=S(s);p=r(Z,"H1",{class:!0,"data-svelte-h":!0}),k(p)!=="svelte-1jbzcne"&&(p.textContent=D),N=h(Z),T=r(Z,"DIV",{class:!0});var G=S(T);f=r(G,"H2",{class:!0,"data-svelte-h":!0}),k(f)!=="svelte-1irne7e"&&(f.textContent=w),Q=h(G),x=r(G,"P",{"data-svelte-h":!0}),k(x)!=="svelte-tje1mo"&&(x.innerHTML=ae),X=h(G),a=r(G,"BUTTON",{class:!0,"data-svelte-h":!0}),k(a)!=="svelte-1tb181q"&&(a.innerHTML=d),G.forEach(b),g=h(Z),n=r(Z,"DIV",{class:!0});var M=S(n);C=r(M,"H2",{class:!0,"data-svelte-h":!0}),k(C)!=="svelte-xh1c6k"&&(C.textContent=xe),de=h(M),V=r(M,"P",{"data-svelte-h":!0}),k(V)!=="svelte-14hqemp"&&(V.innerHTML=ze),ue=h(M),fe=r(M,"BR",{}),me=h(M),B=r(M,"P",{"data-svelte-h":!0}),k(B)!=="svelte-19ygq53"&&(B.textContent=Le),pe=h(M),F=r(M,"DIV",{class:!0});var Ve=S(F);O=r(Ve,"DIV",{class:!0});var Be=S(O);H=r(Be,"DIV",{class:!0});var $=S(H);z=r($,"LABEL",{class:!0,for:!0,"data-svelte-h":!0}),k(z)!=="svelte-19j9f6o"&&(z.innerHTML=je),ve=h($),E=r($,"INPUT",{id:!0,type:!0,name:!0,class:!0}),he=h($),y=r($,"DIV",{class:!0});var K=S(y);P=r(K,"IMG",{class:!0,src:!0,alt:!0}),ge=h(K),I=r(K,"DIV",{class:!0});var W=S(I);A=r(W,"P",{class:!0});var He=S(A);_e=J(He,"Nombre: "),le=J(He,ee),He.forEach(b),be=h(W),U=r(W,"P",{class:!0});var Ie=S(U);Te=J(Ie,"Tramaño: "),re=J(Ie,te),Ie.forEach(b),we=h(W),R=r(W,"P",{});var ke=S(R);Me=J(ke,"Ultima Modificación: "),ie=J(ke,se),ke.forEach(b),W.forEach(b),Se=h(K),L=r(K,"BUTTON",{class:!0,"data-svelte-h":!0}),k(L)!=="svelte-sm2jwn"&&(L.innerHTML=Pe),K.forEach(b),$.forEach(b),Be.forEach(b),Ve.forEach(b),Ce=h(M),j=r(M,"BUTTON",{class:!0,"data-svelte-h":!0}),k(j)!=="svelte-by1l9i"&&(j.innerHTML=Ae),M.forEach(b),Z.forEach(b),_.forEach(b),this.h()},h(){t(p,"class","sectionTitle svelte-1i20mpo"),t(f,"class","svelte-1i20mpo"),t(a,"class","submit-form-button mt-8 mr-4"),t(T,"class","w-full border-t pt-4 mt-4 "),t(C,"class","svelte-1i20mpo"),t(z,"class","group svelte-1i20mpo"),t(z,"for","fileInput"),t(E,"id","fileInput"),t(E,"type","file"),t(E,"name","backup_upload"),t(E,"class","svelte-1i20mpo"),t(P,"class","size-10 mt-2 mr-3 bg-slate-200 rounded-md"),Re(P.src,qe=lt)||t(P,"src",qe),t(P,"alt",""),t(A,"class","font-poppins font-bold text-md"),t(U,"class","text-sm"),t(I,"class","w-full overflow-scroll"),t(L,"class","size-fit group flex items-center justify-center rounded-md transition-all duration-300 ease-linear hover:bg-red-600 active:bg-red-50"),t(y,"class",ne="w-full mt-8 p-2 flex items-start justify-start border-2 border-slate-600 rounded-md transition-all transform duration-300 origin-top "+(o[4].fileName?"scale-100":"scale-0 fixed")),t(H,"class","w-full"),t(O,"class","w-3/4"),t(F,"class","w-2/4 mt-8"),t(j,"class","submit-form-button mt-8"),t(n,"class","w-full border-t pt-4 mt-4"),t(s,"class","section svelte-1i20mpo"),t(i,"class","w-full relative")},m(m,_){We(m,i,_),u&&u.m(i,null),e(i,c),e(i,s),e(s,p),e(s,N),e(s,T),e(T,f),e(T,Q),e(T,x),e(T,X),e(T,a),e(s,g),e(s,n),e(n,C),e(n,de),e(n,V),e(n,ue),e(n,fe),e(n,me),e(n,B),e(n,pe),e(n,F),e(F,O),e(O,H),e(H,z),e(H,ve),e(H,E),o[9](E),e(H,he),e(H,y),e(y,P),e(y,ge),e(y,I),e(I,A),e(A,_e),e(A,le),e(I,be),e(I,U),e(U,Te),e(U,re),e(I,we),e(I,R),e(R,Me),e(R,ie),e(y,Se),e(y,L),e(n,Ce),e(n,j),q=!0,ye||(Ue=[oe(a,"click",o[5]),oe(E,"input",o[6]),oe(L,"click",o[7]),oe(j,"click",o[8])],ye=!0)},p(m,[_]){m[1]?u?(u.p(m,_),_&2&&ce(u,1)):(u=Fe(m),u.c(),ce(u,1),u.m(i,c)):u&&(tt(),Ne(u,1,1,()=>{u=null}),Ye()),(!q||_&16)&&ee!==(ee=(m[4].fileName?m[4].fileName:"")+"")&&De(le,ee),(!q||_&16)&&te!==(te=(m[4].fileSize?m[4].fileSize:"")+"")&&De(re,te),(!q||_&16)&&se!==(se=(m[4].lastModified?m[4].lastModified:"")+"")&&De(ie,se),(!q||_&16&&ne!==(ne="w-full mt-8 p-2 flex items-start justify-start border-2 border-slate-600 rounded-md transition-all transform duration-300 origin-top "+(m[4].fileName?"scale-100":"scale-0 fixed")))&&t(y,"class",ne)},i(m){q||(ce(u),q=!0)},o(m){Ne(u),q=!1},d(m){m&&b(i),u&&u.d(),o[9](null),ye=!1,Ze(Ue)}}}function nt(o,i,c){let s=400,p=!1,D="";function N(a,d){c(2,D=a),c(0,s=d),c(1,p=!0),setTimeout(()=>{c(1,p=!1)},5e3)}async function T(){try{let a=await fetch(`${Ee}/backup/create`,{method:"POST",headers:{"Content-Type":"application/json",Accept:"application/json"},credentials:"include"});const d=await a.json();a.status===200&&setTimeout(()=>{const g=document.createElement("a");g.href=`${Ee}/backup/download`,g.download="backup.sql",g.click()},1e3),N(d.message,a.status)}catch(a){console.log(a)}}let f,w={fileName:"",fileSize:"",lastModified:""};function Q(){c(4,w.fileName=f.files[0].name,w),c(4,w.fileSize=`${(f.files[0].size/1e3).toFixed(3)} KB`,w);function a(d){const g=String(d.getDate()).padStart(2,"0"),n=String(d.getMonth()+1).padStart(2,"0"),C=d.getFullYear().toString().substr(-2);return`${g}/${n}/${C}`}c(4,w.lastModified=a(f.files[0].lastModifiedDate),w)}function x(){const d=Array.from(f.files).filter((n,C)=>C!==0),g=new DataTransfer;d.forEach(n=>g.items.add(n)),c(3,f.files=g.files,f),c(4,w.fileName="",w),console.log(f.files)}async function ae(){const a=new FormData;a.append("backup_upload",f.files[0]);try{let d=await fetch(`${Ee}/backup/upload`,{method:"POST",credentials:"include",body:a});const g=await d.json();d.status,N(g.message,d.status)}catch(d){console.log(d)}}function X(a){Ge[a?"unshift":"push"](()=>{f=a,c(3,f)})}return[s,p,D,f,w,T,Q,x,ae,X]}class pt extends $e{constructor(i){super(),Ke(this,i,nt,it,Oe,{})}}export{pt as component};
