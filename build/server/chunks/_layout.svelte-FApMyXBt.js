import { c as create_ssr_component, e as escape, v as validate_component, a as add_attribute, o as onDestroy, b as each, i as is_promise, n as noop } from './ssr-DKmz5wdr.js';
import { w as writable } from './index-kQbgaC9c.js';

let base = "http://localhost:2606";

const cantidadIcon = "data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20height='24px'%20viewBox='0%20-960%20960%20960'%20width='24px'%20fill='%23000000'%3e%3cpath%20d='M560-440q-50%200-85-35t-35-85q0-50%2035-85t85-35q50%200%2085%2035t35%2085q0%2050-35%2085t-85%2035ZM280-320q-33%200-56.5-23.5T200-400v-320q0-33%2023.5-56.5T280-800h560q33%200%2056.5%2023.5T920-720v320q0%2033-23.5%2056.5T840-320H280Zm80-80h400q0-33%2023.5-56.5T840-480v-160q-33%200-56.5-23.5T760-720H360q0%2033-23.5%2056.5T280-640v160q33%200%2056.5%2023.5T360-400Zm440%20240H120q-33%200-56.5-23.5T40-240v-440h80v440h680v80ZM280-400v-320%20320Z'/%3e%3c/svg%3e";
const porcentajeIcon = "data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20height='24px'%20viewBox='0%20-960%20960%20960'%20width='24px'%20fill='%23000000'%3e%3cpath%20d='M200-200v-560%20560Zm0%2080q-33%200-56.5-23.5T120-200v-560q0-33%2023.5-56.5T200-840h560q33%200%2056.5%2023.5T840-760v100h-80v-100H200v560h560v-100h80v100q0%2033-23.5%2056.5T760-120H200Zm320-160q-33%200-56.5-23.5T440-360v-240q0-33%2023.5-56.5T520-680h280q33%200%2056.5%2023.5T880-600v240q0%2033-23.5%2056.5T800-280H520Zm280-80v-240H520v240h280Zm-160-60q25%200%2042.5-17.5T700-480q0-25-17.5-42.5T640-540q-25%200-42.5%2017.5T580-480q0%2025%2017.5%2042.5T640-420Z'/%3e%3c/svg%3e";

const servicioIcon = "data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20height='24px'%20viewBox='0%20-960%20960%20960'%20width='24px'%20fill='%23000000'%3e%3cpath%20d='M200-280v-280h80v280h-80Zm240%200v-280h80v280h-80ZM80-120v-80h800v80H80Zm600-160v-280h80v280h-80ZM80-640v-80l400-200%20400%20200v80H80Zm178-80h444-444Zm0%200h444L480-830%20258-720Z'/%3e%3c/svg%3e";
const quincenalIcon = "data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20height='24px'%20viewBox='0%20-960%20960%20960'%20width='24px'%20fill='%23000000'%3e%3cpath%20d='M640-520q17%200%2028.5-11.5T680-560q0-17-11.5-28.5T640-600q-17%200-28.5%2011.5T600-560q0%2017%2011.5%2028.5T640-520Zm-320-80h200v-80H320v80ZM180-120q-34-114-67-227.5T80-580q0-92%2064-156t156-64h200q29-38%2070.5-59t89.5-21q25%200%2042.5%2017.5T720-820q0%206-1.5%2012t-3.5%2011q-4%2011-7.5%2022.5T702-751l91%2091h87v279l-113%2037-67%20224H480v-80h-80v80H180Zm60-80h80v-80h240v80h80l62-206%2098-33v-141h-40L620-720q0-20%202.5-38.5T630-796q-29%208-51%2027.5T547-720H300q-58%200-99%2041t-41%2099q0%2098%2027%20191.5T240-200Zm240-298Z'/%3e%3c/svg%3e";
const montoIcon = "data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20height='24px'%20viewBox='0%20-960%20960%20960'%20width='24px'%20fill='%23000000'%3e%3cpath%20d='M441-120v-86q-53-12-91.5-46T293-348l74-30q15%2048%2044.5%2073t77.5%2025q41%200%2069.5-18.5T587-356q0-35-22-55.5T463-458q-86-27-118-64.5T313-614q0-65%2042-101t86-41v-84h80v84q50%208%2082.5%2036.5T651-650l-74%2032q-12-32-34-48t-60-16q-44%200-67%2019.5T393-614q0%2033%2030%2052t104%2040q69%2020%20104.5%2063.5T667-358q0%2071-42%20108t-104%2046v84h-80Z'/%3e%3c/svg%3e";
const afiliadoIcon = "data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20height='24'%20viewBox='0%20-960%20960%20960'%20width='24'%3e%3cpath%20d='M234-276q51-39%20114-61.5T480-360q69%200%20132%2022.5T726-276q35-41%2054.5-93T800-480q0-133-93.5-226.5T480-800q-133%200-226.5%2093.5T160-480q0%2059%2019.5%20111t54.5%2093Zm246-164q-59%200-99.5-40.5T340-580q0-59%2040.5-99.5T480-720q59%200%2099.5%2040.5T620-580q0%2059-40.5%2099.5T480-440Zm0%20360q-83%200-156-31.5T197-197q-54-54-85.5-127T80-480q0-83%2031.5-156T197-763q54-54%20127-85.5T480-880q83%200%20156%2031.5T763-763q54%2054%2085.5%20127T880-480q0%2083-31.5%20156T763-197q-54%2054-127%2085.5T480-80Zm0-80q53%200%20100-15.5t86-44.5q-39-29-86-44.5T480-280q-53%200-100%2015.5T294-220q39%2029%2086%2044.5T480-160Zm0-360q26%200%2043-17t17-43q0-26-17-43t-43-17q-26%200-43%2017t-17%2043q0%2026%2017%2043t43%2017Zm0-60Zm0%20360Z'/%3e%3c/svg%3e";

const reingresosIcon = "data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20height='24px'%20viewBox='0%20-960%20960%20960'%20width='24px'%20fill='%23000000'%3e%3cpath%20d='M0-240v-63q0-43%2044-70t116-27q13%200%2025%20.5t23%202.5q-14%2021-21%2044t-7%2048v65H0Zm240%200v-65q0-32%2017.5-58.5T307-410q32-20%2076.5-30t96.5-10q53%200%2097.5%2010t76.5%2030q32%2020%2049%2046.5t17%2058.5v65H240Zm540%200v-65q0-26-6.5-49T754-397q11-2%2022.5-2.5t23.5-.5q72%200%20116%2026.5t44%2070.5v63H780Zm-455-80h311q-10-20-55.5-35T480-370q-55%200-100.5%2015T325-320ZM160-440q-33%200-56.5-23.5T80-520q0-34%2023.5-57t56.5-23q34%200%2057%2023t23%2057q0%2033-23%2056.5T160-440Zm640%200q-33%200-56.5-23.5T720-520q0-34%2023.5-57t56.5-23q34%200%2057%2023t23%2057q0%2033-23%2056.5T800-440Zm-320-40q-50%200-85-35t-35-85q0-51%2035-85.5t85-34.5q51%200%2085.5%2034.5T600-600q0%2050-34.5%2085T480-480Zm0-80q17%200%2028.5-11.5T520-600q0-17-11.5-28.5T480-640q-17%200-28.5%2011.5T440-600q0%2017%2011.5%2028.5T480-560Zm1%20240Zm-1-280Z'/%3e%3c/svg%3e";

const databaseIcon = "data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20height='24px'%20viewBox='0%20-960%20960%20960'%20width='24px'%20fill='%23000000'%3e%3cpath%20d='M480-120q-151%200-255.5-46.5T120-280v-400q0-66%20105.5-113T480-840q149%200%20254.5%2047T840-680v400q0%2067-104.5%20113.5T480-120Zm0-479q89%200%20179-25.5T760-679q-11-29-100.5-55T480-760q-91%200-178.5%2025.5T200-679q14%2030%20101.5%2055T480-599Zm0%20199q42%200%2081-4t74.5-11.5q35.5-7.5%2067-18.5t57.5-25v-120q-26%2014-57.5%2025t-67%2018.5Q600-528%20561-524t-81%204q-42%200-82-4t-75.5-11.5Q287-543%20256-554t-56-25v120q25%2014%2056%2025t66.5%2018.5Q358-408%20398-404t82%204Zm0%20200q46%200%2093.5-7t87.5-18.5q40-11.5%2067-26t32-29.5v-98q-26%2014-57.5%2025t-67%2018.5Q600-328%20561-324t-81%204q-42%200-82-4t-75.5-11.5Q287-343%20256-354t-56-25v99q5%2015%2031.5%2029t66.5%2025.5q40%2011.5%2088%2018.5t94%207Z'/%3e%3c/svg%3e";

const css$3 = {
  code: ".tooltip.svelte-4oypsg.svelte-4oypsg{display:inline-block;height:-moz-fit-content;height:fit-content;width:100%;max-width:15rem;border-radius:0.375rem;border-width:2px;--tw-border-opacity:1;border-color:rgb(0 0 0 / var(--tw-border-opacity));--tw-text-opacity:1;color:rgb(255 255 255 / var(--tw-text-opacity));transition-property:all;transition-timing-function:cubic-bezier(0.4, 0, 0.2, 1);transition-duration:200ms;background-color:#e5e5f7;background-size:10px 10px;background-image:repeating-linear-gradient(45deg, #000000 0, #000000 1px, #e5e5f7 0, #e5e5f7 50%)\n}.tooltip.svelte-4oypsg .tooltipInner.svelte-4oypsg{display:inline-block;height:-moz-fit-content;height:fit-content;width:100%;transform:translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));border-radius:0.375rem;border-width:2px;--tw-border-opacity:1;border-color:rgb(0 0 0 / var(--tw-border-opacity));--tw-bg-opacity:1;background-color:rgb(255 255 255 / var(--tw-bg-opacity));padding:0.25rem;--tw-text-opacity:1;color:rgb(0 0 0 / var(--tw-text-opacity));-webkit-user-select:none;-moz-user-select:none;user-select:none;transform:translate3d(-0.4em, -0.4em, 0);transition:transform 240ms cubic-bezier(0.175, 0.885, 0.320, 1.275);transition-delay:220ms\n}",
  map: null
};
const Tooltip1 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { textBody } = $$props;
  let { messagePosition } = $$props;
  let { origin } = $$props;
  let { position = void 0 } = $$props;
  if ($$props.textBody === void 0 && $$bindings.textBody && textBody !== void 0)
    $$bindings.textBody(textBody);
  if ($$props.messagePosition === void 0 && $$bindings.messagePosition && messagePosition !== void 0)
    $$bindings.messagePosition(messagePosition);
  if ($$props.origin === void 0 && $$bindings.origin && origin !== void 0)
    $$bindings.origin(origin);
  if ($$props.position === void 0 && $$bindings.position && position !== void 0)
    $$bindings.position(position);
  $$result.css.add(css$3);
  return `<div class="${"tooltip scale-0 " + escape(messagePosition, true) + " " + escape(origin, true) + " " + escape(position ? position : "absolute", true) + " group-hover:scale-100 svelte-4oypsg"}"><div class="tooltipInner svelte-4oypsg">${escape(textBody)}</div> </div>`;
});

async function setPermission() {
  const res = await fetch(`${base}/login/render`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    }
  });
  return res;
}
let userInfo = writable(null);
const getUser = async () => {
  const response = await setPermission();
  const userData = await response.json();
  userInfo.set(userData);
};
getUser();
const userIcon = "data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20height='24'%20viewBox='0%20-960%20960%20960'%20width='24'%3e%3cpath%20d='M234-276q51-39%20114-61.5T480-360q69%200%20132%2022.5T726-276q35-41%2054.5-93T800-480q0-133-93.5-226.5T480-800q-133%200-226.5%2093.5T160-480q0%2059%2019.5%20111t54.5%2093Zm246-164q-59%200-99.5-40.5T340-580q0-59%2040.5-99.5T480-720q59%200%2099.5%2040.5T620-580q0%2059-40.5%2099.5T480-440Zm0%20360q-83%200-156-31.5T197-197q-54-54-85.5-127T80-480q0-83%2031.5-156T197-763q54-54%20127-85.5T480-880q83%200%20156%2031.5T763-763q54%2054%2085.5%20127T880-480q0%2083-31.5%20156T763-197q-54%2054-127%2085.5T480-80Zm0-80q53%200%20100-15.5t86-44.5q-39-29-86-44.5T480-280q-53%200-100%2015.5T294-220q39%2029%2086%2044.5T480-160Zm0-360q26%200%2043-17t17-43q0-26-17-43t-43-17q-26%200-43%2017t-17%2043q0%2026%2017%2043t43%2017Zm0-60Zm0%20360Z'/%3e%3c/svg%3e";
const expandIcon = "data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20height='24'%20viewBox='0%20-960%20960%20960'%20width='24'%3e%3cpath%20d='M480-345%20240-585l56-56%20184%20184%20184-184%2056%2056-240%20240Z'/%3e%3c/svg%3e";
const homeIcon = "data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20height='24'%20viewBox='0%20-960%20960%20960'%20width='24'%3e%3cpath%20d='M240-200h120v-240h240v240h120v-360L480-740%20240-560v360Zm-80%2080v-480l320-240%20320%20240v480H520v-240h-80v240H160Zm320-350Z'/%3e%3c/svg%3e";
const usersIcon = "data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20height='24px'%20viewBox='0%20-960%20960%20960'%20width='24px'%20fill='%23000000'%3e%3cpath%20d='M160-40v-80h640v80H160Zm0-800v-80h640v80H160Zm320%20400q50%200%2085-35t35-85q0-50-35-85t-85-35q-50%200-85%2035t-35%2085q0%2050%2035%2085t85%2035ZM160-160q-33%200-56.5-23.5T80-240v-480q0-33%2023.5-56.5T160-800h640q33%200%2056.5%2023.5T880-720v480q0%2033-23.5%2056.5T800-160H160Zm70-80q45-56%20109-88t141-32q77%200%20141%2032t109%2088h70v-480H160v480h70Zm118%200h264q-29-20-62.5-30T480-280q-36%200-69.5%2010T348-240Zm132-280q-17%200-28.5-11.5T440-560q0-17%2011.5-28.5T480-600q17%200%2028.5%2011.5T520-560q0%2017-11.5%2028.5T480-520Zm0%2040Z'/%3e%3c/svg%3e";
let sidebarSections = [
  {
    sectionName: "Prestamos",
    access: ["Administrador", "Auditor", "Editor"],
    routes: [
      {
        routeName: "Nuevo Prestamo",
        path: "/prestamo",
        routeLogo: cantidadIcon,
        access: ["Administrador", "Auditor", "Editor"]
      },
      {
        routeName: "Modificar Montos",
        path: "/manage/variables",
        routeLogo: servicioIcon,
        access: ["Administrador", "Auditor", "Editor"]
      },
      {
        routeName: "Administrar Prestamos",
        path: "/reports/prestamos",
        routeLogo: quincenalIcon,
        access: ["Administrador", "Auditor", "Editor"]
      }
    ]
  },
  {
    sectionName: "Retiros",
    access: ["Administrador", "Auditor", "Editor"],
    routes: [
      {
        routeName: "Nuevo Retiro",
        path: "/retiro",
        routeLogo: porcentajeIcon,
        access: ["Administrador", "Auditor", "Editor"]
      },
      {
        routeName: "Administrar Retiros",
        path: "/reports/retiro",
        routeLogo: montoIcon,
        access: ["Administrador", "Auditor", "Editor"]
      },
      {
        routeName: "Reingresos",
        path: "/manage/reingresos",
        routeLogo: reingresosIcon,
        access: ["Administrador", "Auditor"]
      }
    ]
  },
  {
    sectionName: "Usuarios",
    access: ["Administrador"],
    routes: [
      {
        routeName: "Administrar Usuarios",
        path: "/manage/usuarios",
        routeLogo: usersIcon,
        access: ["Administrador"]
      }
    ]
  },
  {
    sectionName: "Respaldo y Seguridad",
    access: ["Administrador"],
    routes: [
      {
        routeName: "Administrar Copias de Seguridad",
        path: "/manage/backup",
        routeLogo: databaseIcon,
        access: ["Administrador"]
      }
    ]
  }
];
const css$2 = {
  code: ".svelte-12azsxi.svelte-12azsxi{font-family:Poppins, sans-serif\n}.side-parent-container.svelte-12azsxi.svelte-12azsxi{position:fixed;display:flex;height:100vh;width:280px;align-items:center;justify-content:center;overflow:auto;border-top-right-radius:0.125rem;border-bottom-right-radius:0.125rem;border-right-width:1px;--tw-bg-opacity:1;background-color:rgb(249 250 251 / var(--tw-bg-opacity));padding:0.5rem;--tw-shadow:0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1);--tw-shadow-colored:0 20px 25px -5px var(--tw-shadow-color), 0 8px 10px -6px var(--tw-shadow-color);box-shadow:var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow)\n}.side-child-container.svelte-12azsxi.svelte-12azsxi{display:flex;height:100%;width:100%;align-items:flex-start;justify-content:flex-start\n}li.svelte-12azsxi.svelte-12azsxi{width:100%\n}.toggle-menu li.svelte-12azsxi a.svelte-12azsxi{display:flex;width:100%;cursor:pointer;align-items:center;justify-content:flex-start;border-bottom-width:1px;padding:0.25rem;transition-property:all;transition-timing-function:cubic-bezier(0.4, 0, 0.2, 1);transition-duration:100ms\n}.toggle-menu li.svelte-12azsxi a.svelte-12azsxi:hover{border-radius:0.125rem;--tw-bg-opacity:1;background-color:rgb(55 65 81 / var(--tw-bg-opacity))\n}.toggle-menu li.svelte-12azsxi a.svelte-12azsxi:active{--tw-bg-opacity:1;background-color:rgb(75 85 99 / var(--tw-bg-opacity))\n}.sidebarA.svelte-12azsxi.svelte-12azsxi{display:flex;width:100%;cursor:pointer;align-items:center;justify-content:center;border-radius:0.375rem;border-bottom-width:1px;padding:0.25rem;padding-top:0.5rem;padding-bottom:0.5rem;transition-property:all;transition-timing-function:cubic-bezier(0.4, 0, 0.2, 1);transition-duration:200ms;transition-timing-function:cubic-bezier(0, 0, 0.2, 1)\n}.sidebarA.svelte-12azsxi.svelte-12azsxi:hover{--tw-scale-x:1.05;--tw-scale-y:1.05;transform:translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));border-radius:0.375rem;--tw-bg-opacity:1;background-color:rgb(0 0 0 / var(--tw-bg-opacity));font-weight:700;--tw-text-opacity:1;color:rgb(255 255 255 / var(--tw-text-opacity));--tw-shadow:0 25px 50px -12px rgb(0 0 0 / 0.25);--tw-shadow-colored:0 25px 50px -12px var(--tw-shadow-color);box-shadow:var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);transition-property:all;transition-timing-function:cubic-bezier(0.4, 0, 0.2, 1);transition-duration:200ms;transition-timing-function:linear\n}.sidebarA.svelte-12azsxi.svelte-12azsxi:active{--tw-bg-opacity:1;background-color:rgb(107 114 128 / var(--tw-bg-opacity))\n}.sidebarA.svelte-12azsxi span.svelte-12azsxi{display:flex;width:80%;align-items:center;justify-content:flex-start\n}.sidebarA.svelte-12azsxi span img.svelte-12azsxi{margin-left:0.5rem;margin-right:0.5rem;width:1.25rem;height:1.25rem\n}",
  map: null
};
const Sidebar = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let toggleMenuState;
  let userNombre = "Nombre";
  let userApellido = "Apellido";
  let role;
  let unsubscribe = userInfo.subscribe((info) => {
    if (info) {
      info.id;
      userNombre = info.nombre;
      userApellido = info.apellido;
      info.username;
      role = info.role;
    }
  });
  const filteredSections = sidebarSections.filter((section) => {
    section.routes = section.routes.filter((route) => {
      return route.access.includes(role);
    });
    return section.access.includes(role);
  });
  onDestroy(() => unsubscribe());
  $$result.css.add(css$2);
  toggleMenuState = false;
  return `<div class="side-parent-container svelte-12azsxi"><div class="side-child-container svelte-12azsxi"><ul class="w-[100%] flex flex-col justify-center items-center svelte-12azsxi"><li class="svelte-12azsxi"><div class="w-[100%] relative bg-black flex justify-around items-center p-1 hover:bg-gray-900 rounded-lg transition-all duration-100 cursor-pointer group svelte-12azsxi"><div class="w-[80%] flex p-2 px-4 rounded-md justify-around items-center svelte-12azsxi"><img class="mr-2 size-9 filter invert svelte-12azsxi"${add_attribute("src", userIcon, 0)} alt=""> <span class="w-[80%] svelte-12azsxi"><p class="text-md font-semibold text-white svelte-12azsxi">${escape(`${userNombre} ${userApellido}`)}</p> <p class="text-sm text-white svelte-12azsxi">${escape(`${role}`)}</p></span></div> <button class="w-[10%] hover:rounded-md hover:bg-white transition-all duration-100 svelte-12azsxi" data-svelte-h="svelte-152nl92"><img class="flex items-center justify-center filter invert hover:filter-none svelte-12azsxi"${add_attribute("src", expandIcon, 0)} alt=""></button> ${toggleMenuState ? `<div class="absolute top-10 right-0 bg-gray-950 rounded-md p-2 text-slate-50 text-sm svelte-12azsxi"><ul class="toggle-menu svelte-12azsxi"><li class="svelte-12azsxi"><button class="w-[100%] p-1 border-b flex justify-start items-center transition-all duration-100 cursor-pointer hover:bg-slate-700 hover:rounded-sm active:bg-slate-600 svelte-12azsxi" data-svelte-h="svelte-8zsb6z">Cerrar Sesión</button></li></ul></div>` : ``}</div></li> <li class="mt-7 svelte-12azsxi" data-svelte-h="svelte-11xlpiv"><a href="/" class="sidebarA group svelte-12azsxi"><span class="svelte-12azsxi"><img class="group-hover:invert filter svelte-12azsxi"${add_attribute("src", homeIcon, 0)} alt=""> <p class="svelte-12azsxi">Inicio</p></span></a></li> ${each(filteredSections, (sections) => {
    return `<h2 class="text-lg mt-8 font-bold w-full text-center border-b-2 border-slate-600 border-dotted svelte-12azsxi">${escape(sections.sectionName)}</h2> ${each(sections.routes, (routes) => {
      return `<li class="my-[2px] svelte-12azsxi"><a${add_attribute("href", routes.path, 0)} class="sidebarA group svelte-12azsxi"><span class="svelte-12azsxi"><img class="filter group-hover:invert svelte-12azsxi"${add_attribute("src", routes.routeLogo, 0)} alt=""> <p class="svelte-12azsxi">${escape(routes.routeName)}</p> </span></a> </li>`;
    })}`;
  })}</ul></div> </div>`;
});
const pwdIcon = "data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20height='24'%20viewBox='0%20-960%20960%20960'%20width='24'%3e%3cpath%20d='M80-200v-80h800v80H80Zm46-242-52-30%2034-60H40v-60h68l-34-58%2052-30%2034%2058%2034-58%2052%2030-34%2058h68v60h-68l34%2060-52%2030-34-60-34%2060Zm320%200-52-30%2034-60h-68v-60h68l-34-58%2052-30%2034%2058%2034-58%2052%2030-34%2058h68v60h-68l34%2060-52%2030-34-60-34%2060Zm320%200-52-30%2034-60h-68v-60h68l-34-58%2052-30%2034%2058%2034-58%2052%2030-34%2058h68v60h-68l34%2060-52%2030-34-60-34%2060Z'/%3e%3c/svg%3e";
const css$1 = {
  code: "span.svelte-17tcijw.svelte-17tcijw{position:relative;display:flex;align-items:center;justify-content:center;border-radius:0.375rem\n}span.svelte-17tcijw img.svelte-17tcijw{position:absolute;right:0.75rem;width:2rem;height:2rem\n}input.svelte-17tcijw.svelte-17tcijw{width:100%;border-radius:0.375rem;border-width:2px;--tw-border-opacity:1;border-color:rgb(71 85 105 / var(--tw-border-opacity));padding-left:1rem;padding-right:1rem;padding-top:0.5rem;padding-bottom:0.5rem\n}",
  map: null
};
const PwdRecoveryTab = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let username;
  let pregunta1 = "";
  let pregunta2 = "";
  let newPwd = "";
  let pwdInput;
  async function getQuestions(username2) {
    const request = await fetch(`${base}/register/getUserSecurityQuestions`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({ username: username2 })
    });
    const response = await request.json();
    return response;
  }
  $$result.css.add(css$1);
  username = "";
  return `<main class="rounded-md"><h1 class="text-4xl text-center font-poppins font-bold" data-svelte-h="svelte-oun8a6">Recuperar Contraseña</h1> <div class="w-full flex flex-col items-center mt-4 relative">${``} <div class="w-2/4 p-2 relative"><p data-svelte-h="svelte-bbzrn2">Nombre de Usuario:</p> <input type="text" class="svelte-17tcijw"${add_attribute("value", username, 0)}></div> ${function(__value) {
    if (is_promise(__value)) {
      __value.then(null, noop);
      return ``;
    }
    return function(preguntas) {
      return ` <div class="w-full"><div class="flex p-2"><div class="w-[50%] px-2 "><h1 class="text-xl" data-svelte-h="svelte-inwdd7">Información Del Usuario</h1> <span class="mt-[2.99rem] w-full relative group svelte-17tcijw"><p class="absolute top-[-2rem] w-full" data-svelte-h="svelte-1iykxo">Nueva Contraseña</p> <input type="password" class="svelte-17tcijw"${add_attribute("this", pwdInput, 0)}${add_attribute("value", newPwd, 0)}> <img class="absolute right-4 top-[50%] translate-y-[-50%] size-9 hover:cursor-pointer svelte-17tcijw"${add_attribute("src", pwdIcon, 0)} alt=""> ${validate_component(Tooltip1, "Tooltip1").$$render(
        $$result,
        {
          textBody: "Presione el icono para mostrar contraseña",
          messagePosition: "right-0 top-[-4.5rem]",
          origin: "origin-bottom"
        },
        {},
        {}
      )}</span></div> <div class="w-[50%] px-2"><h1 class="text-xl" data-svelte-h="svelte-1jwebjt">Preguntas de Seguridad</h1> <div class="py-4"><p class="mb-2">${escape(preguntas[0].pregunta1)}</p> <input type="text" class="svelte-17tcijw"${add_attribute("value", pregunta1, 0)}></div> <div class="mt-2 w-full relative"><p class="mb-2">${escape(preguntas[0].pregunta2)}</p> <input type="text" class="svelte-17tcijw"${add_attribute("value", pregunta2, 0)}></div></div></div></div> <button class="mt-4 border py-2 px-12 bg-blue-700 text-white rounded-md transition-all ease-linear duration-300 transform hover:bg-blue-400 active:bg-blue-800" data-svelte-h="svelte-1l6kv3o">Aceptar</button> `;
    }(__value);
  }(getQuestions(username))}</div> </main>`;
});
const officeCubicleImage = "/_app/immutable/assets/Good%20team-bro.DDsL-p9U.svg";
const homeFromWorkImage = "/_app/immutable/assets/Telework-bro.BrfUb7CI.svg";
const pwdRecoveryIcon = "data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20height='24'%20viewBox='0%20-960%20960%20960'%20width='24'%3e%3cpath%20d='M520-120q-74%200-138.5-27.5T268-223l57-57q38%2037%2088%2058.5T520-200q116%200%20198-82t82-198q0-116-82-198t-198-82q-116%200-198%2082t-82%20198v7l73-73%2057%2056-170%20170L30-490l57-56%2073%2074v-8q0-75%2028.5-140.5t77-114q48.5-48.5%20114-77T520-840q75%200%20140.5%2028.5t114%2077q48.5%2048.5%2077%20114T880-480q0%20150-105%20255T520-120Zm-80-200q-17%200-28.5-11.5T400-360v-120q0-17%2011.5-28.5T440-520v-40q0-33%2023.5-56.5T520-640q33%200%2056.5%2023.5T600-560v40q17%200%2028.5%2011.5T640-480v120q0%2017-11.5%2028.5T600-320H440Zm40-200h80v-40q0-17-11.5-28.5T520-600q-17%200-28.5%2011.5T480-560v40Z'/%3e%3c/svg%3e";
const logoGobernacion = "/_app/immutable/assets/logoGobernacion.IoXVV7Zd.png";
const css = {
  code: ".app-container.svelte-1nvmq.svelte-1nvmq{position:relative;left:280px;max-height:-moz-fit-content;max-height:fit-content;padding-left:1.75rem;padding-right:1.75rem;padding-top:1.75rem;padding-bottom:1.75rem;width:calc(100% - 280px)}form.svelte-1nvmq span.svelte-1nvmq{position:relative;display:flex;align-items:center;justify-content:center;border-radius:0.375rem;border-width:1px;--tw-border-opacity:1;border-color:rgb(51 65 85 / var(--tw-border-opacity))}form.svelte-1nvmq span img.svelte-1nvmq{position:absolute;right:0.75rem;width:2rem;height:2rem}form.svelte-1nvmq span input.svelte-1nvmq{width:100%;border-radius:0.375rem;border-width:1px;--tw-border-opacity:1;border-color:rgb(71 85 105 / var(--tw-border-opacity));padding-left:1rem;padding-right:1rem;padding-top:0.5rem;padding-bottom:0.5rem}.bttn.svelte-1nvmq.svelte-1nvmq{--tw-text-opacity:1;color:rgb(0 0 0 / var(--tw-text-opacity));text-decoration:none;transition:0.3s ease all}.bttn.svelte-1nvmq.svelte-1nvmq:hover{color:#fff}.bttn.svelte-1nvmq.svelte-1nvmq:focus{color:#fff}.bttn.svelte-1nvmq.svelte-1nvmq{position:relative;margin-top:1rem;display:inline-block;width:-moz-fit-content;width:fit-content;border-radius:0.375rem;border-width:2px;--tw-border-opacity:1;border-color:rgb(0 0 0 / var(--tw-border-opacity));padding-left:2rem;padding-right:2rem;padding-top:0.25rem;padding-bottom:0.25rem;text-align:center;font-size:1.125rem;line-height:1.75rem;font-weight:700;box-shadow:0 2px 10px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.1)}.bttn.svelte-1nvmq.svelte-1nvmq:before{transition:0.5s all ease;position:absolute;top:0;left:50%;right:50%;bottom:0;opacity:0;content:'';background-color:black;z-index:-2}.bttn.svelte-1nvmq.svelte-1nvmq:hover:before{transition:0.5s all ease;left:0;right:0;opacity:1}.bttn.svelte-1nvmq.svelte-1nvmq:focus:before{transition:0.5s all ease;left:0;right:0;opacity:1}",
  map: null
};
const Layout = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let logged = false;
  userInfo.subscribe((info) => {
    if (info) {
      logged = true;
    }
  });
  let pwdInput;
  let password = "";
  let username = "";
  $$result.css.add(css);
  return ` ${$$result.head += `<!-- HEAD_svelte-dzkw89_START -->${$$result.title = `<title>Sistema de Administracion de Prestamos y Transacciones de la Caja de Ahorro de Empleados, Jubilados, Pensionados y Personal Administrativo del Estado Bolivar </title>`, ""}<!-- HEAD_svelte-dzkw89_END -->`, ""}  ${logged ? `${validate_component(Sidebar, "SideBar").$$render($$result, {}, {}, {})} <main class="flex w-screen h-screen"><div class="app-container svelte-1nvmq">${slots.default ? slots.default({}) : ``}</div></main>` : `<div class="w-[8.6%] h-[100vh] absolute" data-svelte-h="svelte-17mrt8h"><div><img class="transform scale-125"${add_attribute("src", logoGobernacion, 0)} alt=""> </div></div> <main class="w-full h-fit flex items-center justify-center fixed left-[50%] top-[50%] transform translate-x-[-50%] translate-y-[-50%]"> <div class="p-4 w-[85%] duration-700 rounded-lg"> <div class="w-full flex border-2 border-slate-300 rounded-md transition-all duration-300 transform"> <div class="${"relative min-h-[85vh] p-2 w-[50%] bg-gray-50 shadow-lg transition-all duration-700 " + escape("translate-x-[100%]", true)}"><div class="${"w-1/5 flex item-center justify-left relative group " + escape("", true)}"><button data-svelte-h="svelte-15m2wxp"><img class="size-12"${add_attribute("src", pwdRecoveryIcon, 0)} alt=""></button> ${validate_component(Tooltip1, "Tooltip1").$$render(
    $$result,
    {
      textBody: "Recuperar Contraseña",
      messagePosition: "top-14 left-6",
      origin: "origin-top-left"
    },
    {},
    {}
  )}</div> <div class="${"transition-all duration-700 " + escape(
    "scale-100 origin-bottom",
    true
  )}"><div class="${"transition-all ease-linear duration-300 " + escape("text-center mt-2", true)}"><h1 class="p-3 text-4xl font-poppins font-bold text-slate-800">${escape("Iniciar Sesión")}</h1> <p class="px-3">${escape(
    "Acceda con su usuario y contraseña para comenzar a utilizar la aplicación."
  )}</p></div> <form class="p-1 py-4 mt-6 w-[100%] flex flex-col justify-start items-center gap-3 svelte-1nvmq">${`  <span class="mt-4 w-[80%] svelte-1nvmq"><input class="w-[100%] svelte-1nvmq" type="text" placeholder="Nombre de Usuario"${add_attribute("value", username, 0)}> <img${add_attribute("src", afiliadoIcon, 0)} alt="" class="svelte-1nvmq"></span>   <span class="mt-4 w-[80%] group relative svelte-1nvmq"><input type="password" class="w-[100%] svelte-1nvmq" placeholder="Contraseña"${add_attribute("this", pwdInput, 0)}${add_attribute("value", password, 0)}> <img class="hover:cursor-pointer svelte-1nvmq"${add_attribute("src", pwdIcon, 0)} alt=""> ${validate_component(Tooltip1, "Tooltip1").$$render(
    $$result,
    {
      textBody: "Presione el icono para mostrar su contraseña",
      messagePosition: "top-[-200%] right-0",
      origin: "origin-right"
    },
    {},
    {}
  )}</span>  `}  <div class="flexo svelte-1nvmq"><button class="bttn svelte-1nvmq" type="submit">${escape("Acceder")}</button></div> </form></div>  <div class="${"transition-all duration-700 " + escape(
    "scale-0 origin-bottom absolute",
    true
  )}">${validate_component(PwdRecoveryTab, "PwdRecoveryTab").$$render($$result, {}, {}, {})}</div> </div> <div class="${"absolute top-0 min-h-[85vh] bg-blue-900 flex flex-col items-center justify-center w-[50%] rounded-lg scale-[1.01] duration-700 " + escape("", true)}"><button class="size-full group"><img class="${"size-[100%] absolute top-0 transition-all duration-1000 " + escape("translate-x-[1%]", true) + " " + escape("origin-left", true)}"${add_attribute("src", homeFromWorkImage, 0)} alt=""> <img class="${"size-[100%] absolute top-0 transition-all duration-1000 " + escape("scale-0", true) + " " + escape("origin-left", true)}"${add_attribute("src", officeCubicleImage, 0)} alt=""> ${validate_component(Tooltip1, "Tooltip1").$$render(
    $$result,
    {
      textBody: "Presione la imagen para cambiar la modalidad",
      messagePosition: "top-4 right-4",
      origin: "origin-top"
    },
    {},
    {}
  )}</button> ${``}</div></div></div>  ${``}</main>`}`;
});

export { Layout as default };
//# sourceMappingURL=_layout.svelte-FApMyXBt.js.map
