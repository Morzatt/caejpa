"use strict";
// Creates the main route of the application, and imports all the routes to then exports it as an object to be
// received in the main server.ts file
Object.defineProperty(exports, "__esModule", { value: true });
exports.usuarios = exports.retiros = exports.afiliados = exports.backup = exports.variables = exports.prestamos = exports.logout = exports.login = exports.register = exports.router = void 0;
const express_1 = require("express");
const register_1 = require("./register");
Object.defineProperty(exports, "register", { enumerable: true, get: function () { return register_1.register; } });
const login_1 = require("./login");
Object.defineProperty(exports, "login", { enumerable: true, get: function () { return login_1.login; } });
const logout_1 = require("./logout");
Object.defineProperty(exports, "logout", { enumerable: true, get: function () { return logout_1.logout; } });
const prestamos_1 = require("./prestamos");
Object.defineProperty(exports, "prestamos", { enumerable: true, get: function () { return prestamos_1.prestamos; } });
const variables_1 = require("./variables");
Object.defineProperty(exports, "variables", { enumerable: true, get: function () { return variables_1.variables; } });
const backup_1 = require("./backup");
Object.defineProperty(exports, "backup", { enumerable: true, get: function () { return backup_1.backup; } });
const afiliados_1 = require("./afiliados");
Object.defineProperty(exports, "afiliados", { enumerable: true, get: function () { return afiliados_1.afiliados; } });
const retiros_1 = require("./retiros");
Object.defineProperty(exports, "retiros", { enumerable: true, get: function () { return retiros_1.retiros; } });
const usuarios_1 = require("./usuarios");
Object.defineProperty(exports, "usuarios", { enumerable: true, get: function () { return usuarios_1.usuarios; } });
const router = (0, express_1.Router)();
exports.router = router;
router.get("/", (req, res) => {
    res.send({ m: "22222" });
});
