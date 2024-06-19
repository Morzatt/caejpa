import { Request, Response } from "express";
import { login as loginModel} from "../data/login";

import { UserSession } from "../data/types";

export async function login(req: Request, res: Response) {
    const { username, password }: { username: string, password: string } = req.body
    const session: UserSession = req.session;

    // Check if there's an user with the provided username stored in the database
    const DBUser = await loginModel().checkUsername(username)

    if (DBUser !== null) {          // If there's an user, proceed with the login
        try {
            // Check if the usernames and passwords coincide. 
            const auth = await loginModel().authUser(username, password)
            
            // If indeed both username and password coincide:
            if (auth) {
                const user = await loginModel().getUser(username)
                if (user[0].role === "Por Asignar") {
                    return res.status(400).send({
                        message: "El usuario necesita la aprobación y asignación de rol por parte del Administrador para acceder a la aplicación."
                    })
                }
                if (user[0].estado !== "Bloqueado") {
                    session.userInfo = user[0]
                    return res.status(200).send({
                        message: "Inicio de Sesión Exitoso",
                        err: null
                    })
                } else {
                    return res.status(400).send({
                        message: "El usuario no puede iniciar sesión porque su acceso ha sido bloqueado por el Administrador."
                    })
                }
            } else {
                console.log("Something went wrong: User cannot be logged")
                res.status(400).send({
                    message: "Los datos proporcionados no son correctos; verifique e intente nuevamente",
                    err: null
                })
            }

        } catch (err) {
            console.log(`There was an error when login the user: ${err}`)

            res.status(400).send({
                message: "Ha ocurrido un error al iniciar sesión, intente nuevamente",
                err: err
            })

            throw err
        }
    } else {
        console.log("No user found")

        res.status(400).send({
            message: "El usuario especificado no existe, verifique e intente de nuevo",
            err: null 
        })
    } 
}

