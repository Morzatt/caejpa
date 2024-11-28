// Routes and configuration for the logout page of the app
import { Router } from "express";
import { logout as logoutFunc } from "../../middleware";
export const logout = Router();
logout.get("/", (req, res) => {
    try {
        logoutFunc(req, res);
    }
    catch (err) {
        console.log(`And error has ocorred while sending the post request on the logout ${err}`);
    }
});
