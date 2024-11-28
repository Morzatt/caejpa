// Routes and configuration for the register page of the app 
import { Router } from "express";
import { register as registerFunc } from "../../middleware/index.js";
import { sendSecurityQuestions, saveSecurityQuestions, getUserSecurityQuestions, changePassword } from "../../middleware/register.js";
export const register = Router();
register.post("/", (req, res) => {
    console.log(req.body);
    try {
        registerFunc(req, res);
    }
    catch (err) {
        console.log(`And error has ocorred while sending the post request ${err}`);
    }
});
register.get("/securityQuestions", (req, res) => {
    try {
        sendSecurityQuestions(req, res);
    }
    catch (err) {
        console.log(`An error has ocurred while signing up the user => ${err}`);
    }
});
register.post("/securityQuestions", (req, res) => {
    try {
        saveSecurityQuestions(req, res);
    }
    catch (err) {
        console.log(`An error has ocurred while signing up the user => ${err}`);
    }
});
register.post("/getUserSecurityQuestions", (req, res) => {
    try {
        getUserSecurityQuestions(req, res);
    }
    catch (err) {
        console.log(`An error has ocurred while signing up the user => ${err}`);
    }
});
register.post("/passwordRecovery", (req, res) => {
    try {
        changePassword(req, res);
    }
    catch (err) {
        console.log(`An error has ocurred while signing up the user => ${err}`);
    }
});
