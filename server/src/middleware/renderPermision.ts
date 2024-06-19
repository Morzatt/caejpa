// Utilities to supply a permission to visualize the content of the pages in the client only if the user's logged.

import { Request, Response } from "express";
import { UserSession } from "../data/types";

export async function newRenderPermission(req: Request, res: Response) {
    const session: UserSession = req.session;

    if (session.userInfo){
        res.status(200).send(session.userInfo)
    } else {
        res.status(400).send("No hay permiso")
    }
}