"use strict";
// Routes and configuration for the login page of the app
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = void 0;
const express_1 = require("express");
const login_1 = require("../../middleware/login");
const renderPermision_1 = require("../../middleware/renderPermision");
exports.login = (0, express_1.Router)();
exports.login.post("/", (req, res) => {
    res.header('Access-Control-Allow-Origin', req.headers.origin);
    try {
        (0, login_1.login)(req, res);
    }
    catch (err) {
        console.log(`And error has ocorred while sending the post request on the login ${err}`);
    }
});
exports.login.post("/render", (req, res) => {
    res.header('Access-Control-Allow-Origin', req.headers.origin);
    try {
        (0, renderPermision_1.newRenderPermission)(req, res);
    }
    catch (err) {
        console.log("An error has happened when processing the render permission request: ", err);
    }
});
