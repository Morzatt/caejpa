"use strict";
// Routes and configuration for the logout page of the app
Object.defineProperty(exports, "__esModule", { value: true });
exports.logout = void 0;
const express_1 = require("express");
const middleware_1 = require("../../middleware");
exports.logout = (0, express_1.Router)();
exports.logout.get("/", (req, res) => {
    try {
        (0, middleware_1.logout)(req, res);
    }
    catch (err) {
        console.log(`And error has ocorred while sending the post request on the logout ${err}`);
    }
});
