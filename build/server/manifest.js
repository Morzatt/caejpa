const manifest = (() => {
function __memo(fn) {
	let value;
	return () => value ??= (value = fn());
}

return {
	appDir: "_app",
	appPath: "_app",
	assets: new Set(["favicon.png","logoGobernacion.png","logonuevo.png"]),
	mimeTypes: {".png":"image/png"},
	_: {
		client: {"start":"_app/immutable/entry/start.C47FwY7p.js","app":"_app/immutable/entry/app.CGgwj-yR.js","imports":["_app/immutable/entry/start.C47FwY7p.js","_app/immutable/chunks/entry.D-2JlSkr.js","_app/immutable/chunks/scheduler.CZfksBX7.js","_app/immutable/chunks/index.Mluhpxhn.js","_app/immutable/entry/app.CGgwj-yR.js","_app/immutable/chunks/scheduler.CZfksBX7.js","_app/immutable/chunks/index.ubuQcuXk.js"],"stylesheets":[],"fonts":[],"uses_env_dynamic_public":false},
		nodes: [
			__memo(() => import('./chunks/0-BdMQMMKA.js')),
			__memo(() => import('./chunks/1-BbTdUNGO.js'))
		],
		routes: [
			
		],
		matchers: async () => {
			
			return {  };
		},
		server_assets: {}
	}
}
})();

const prerendered = new Set(["/","/manage/backup","/manage/reingresos","/manage/usuarios","/manage/variables","/manual","/prestamo","/reports/prestamos","/reports/retiro","/retiro"]);

const base = "";

export { base, manifest, prerendered };
//# sourceMappingURL=manifest.js.map
