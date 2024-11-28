// 2
// This file creates the server, imports the routes and any other needed import such as middleware or similar files
// and sets and config them all, then exports it to the main
// index.ts file
import config from "./config.js";
import express from "express";
import { login, register, logout, prestamos, variables, backup, afiliados, retiros, usuarios } from "./routes/index.js"; //Routes import
import cors from "cors";
import session from "express-session";
import cookieParser from "cookie-parser";
import fileUpload from "express-fileupload";
const app = express();
app.use(cookieParser());
app.use(cors({
    origin: true,
    credentials: true
}));
app.use(express.json());
app.use(session({
    secret: config.cookieSecret,
    resave: true,
    saveUninitialized: true,
    cookie: {
        maxAge: 1000 * 60 * 60 * 60,
    }
}));
app.use(fileUpload());
app.use("/register", register);
app.use("/login", login);
app.use("/logout", logout);
app.use("/prestamos", prestamos);
app.use("/variables", variables);
app.use("/backup", backup);
app.use("/afiliados", afiliados);
app.use("/usuarios", usuarios);
app.use("/retiros", retiros);
export default app;
