// Creates the main route of the application, and imports all the routes to then exports it as an object to be
// received in the main server.ts file

import { Request, Response, Router, NextFunction } from "express"
import { register } from "./register";
import { login } from "./login";
import { logout } from "./logout";
import { prestamos } from "./prestamos";
import { variables } from "./variables"
import { backup } from "./backup";
import { afiliados } from "./afiliados";
import { retiros } from "./retiros"
import { usuarios } from "./usuarios";

const router = Router();

router.get("/", (req: Request, res: Response) => {
    res.send({m: "22222"})
})

export {
    router,
    register,
    login,
    logout,
    prestamos,
    variables,
    backup, 
    afiliados,
    retiros, usuarios
}