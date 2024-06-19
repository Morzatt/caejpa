"use strict";
// Routes and configuration for the register page of the app 
Object.defineProperty(exports, "__esModule", { value: true });
exports.register = void 0;
const express_1 = require("express");
const middleware_1 = require("../../middleware");
const register_1 = require("../../middleware/register");
exports.register = (0, express_1.Router)();
exports.register.post("/", (req, res) => {
    console.log(req.body);
    try {
        (0, middleware_1.register)(req, res);
    }
    catch (err) {
        console.log(`And error has ocorred while sending the post request ${err}`);
    }
});
exports.register.get("/securityQuestions", (req, res) => {
    try {
        (0, register_1.sendSecurityQuestions)(req, res);
    }
    catch (err) {
        console.log(`An error has ocurred while signing up the user => ${err}`);
    }
});
exports.register.post("/securityQuestions", (req, res) => {
    try {
        (0, register_1.saveSecurityQuestions)(req, res);
    }
    catch (err) {
        console.log(`An error has ocurred while signing up the user => ${err}`);
    }
});
exports.register.post("/getUserSecurityQuestions", (req, res) => {
    try {
        (0, register_1.getUserSecurityQuestions)(req, res);
    }
    catch (err) {
        console.log(`An error has ocurred while signing up the user => ${err}`);
    }
});
exports.register.post("/passwordRecovery", (req, res) => {
    try {
        (0, register_1.changePassword)(req, res);
    }
    catch (err) {
        console.log(`An error has ocurred while signing up the user => ${err}`);
    }
});
