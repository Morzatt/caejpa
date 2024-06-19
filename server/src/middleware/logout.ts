// Server's side logic for the log out function of the app
import { Request, Response } from "express";

export const logout = (req:Request, res:Response) => {
    req.session.destroy(err => {
        if (err) {
            console.log(`Error => Failed to destroy the session during logout: ${err}`)
            return res.redirect("/")
        }
        console.log("Cerrada la sesion correctamente")
        res.redirect("/")
    })
}      