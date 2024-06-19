"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// 2
// This file creates the server, imports the routes and any other needed import such as middleware or similar files
// and sets and config them all, then exports it to the main
// index.ts file
const config_1 = __importDefault(require("./config"));
const express_1 = __importDefault(require("express"));
const routes_1 = require("./routes"); //Routes import
const cors_1 = __importDefault(require("cors"));
const express_session_1 = __importDefault(require("express-session"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const express_fileupload_1 = __importDefault(require("express-fileupload"));
const app = (0, express_1.default)();
const mainPage = routes_1.router;
app.use((0, cookie_parser_1.default)());
app.use((0, cors_1.default)({
    origin: true,
    credentials: true
}));
app.use(express_1.default.json());
app.use((0, express_session_1.default)({
    secret: config_1.default.cookieSecret,
    resave: true,
    saveUninitialized: true,
    cookie: {
        maxAge: 1000 * 60 * 60 * 60,
    }
}));
app.use((0, express_fileupload_1.default)());
app.use(express_1.default.static('public'));
app.use("/", mainPage);
app.use("/register", routes_1.register);
app.use("/login", routes_1.login);
app.use("/logout", routes_1.logout);
app.use("/prestamos", routes_1.prestamos);
app.use("/variables", routes_1.variables);
app.use("/backup", routes_1.backup);
app.use("/afiliados", routes_1.afiliados);
app.use("/usuarios", routes_1.usuarios);
app.use("/retiros", routes_1.retiros);
exports.default = app;
