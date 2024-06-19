"use strict";
// 3
// This file sets the dotenv configuration and imports its values
// then assigns it to an object, asserts the port and host requirement
// and finally exports it as an better formatted object
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const assert_1 = __importDefault(require("assert"));
dotenv_1.default.config();
const { PORT, HOST, HOST_URL, COOKIE_SECRET, DBHOST, DBUSER, DBPWD, DBNAME, DBPORT } = process.env;
const COOKIE_CONFIG = {
    maxAge: 1000 * 60 * 15,
    signed: true // Indicates if the cookie should be signed
};
(0, assert_1.default)(PORT, "PORT is required");
(0, assert_1.default)(HOST, "HOST is required");
(0, assert_1.default)(COOKIE_SECRET);
exports.default = {
    port: PORT,
    host: HOST,
    hostURL: HOST_URL,
    cookieSecret: COOKIE_SECRET,
    cookieConfig: COOKIE_CONFIG,
    dbhost: DBHOST,
    dbuser: DBUSER,
    dbpwd: DBPWD,
    dbname: DBNAME,
    dbport: DBPORT
};
