// Routes and configuration for the login page of the app
import { Router } from "express";
import { login as loginFunc } from "../../middleware/login.js";
import { newRenderPermission } from "../../middleware/renderPermision.js";
export const login = Router();
login.post("/", (req, res) => {
    res.header('Access-Control-Allow-Origin', req.headers.origin);
    try {
        loginFunc(req, res);
    }
    catch (err) {
        console.log(`And error has ocorred while sending the post request on the login ${err}`);
    }
});
login.post("/render", (req, res) => {
    res.header('Access-Control-Allow-Origin', req.headers.origin);
    try {
        newRenderPermission(req, res);
    }
    catch (err) {
        console.log("An error has happened when processing the render permission request: ", err);
    }
});
