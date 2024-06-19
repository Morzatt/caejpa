// Routes and configuration for the register page of the app 

import { Request, Response, Router } from "express"
import { register as registerFunc} from "../../middleware";
import { sendSecurityQuestions, saveSecurityQuestions, getUserSecurityQuestions, changePassword } from "../../middleware/register";
export const register = Router();

register.post("/",
    (req: Request, res: Response) => {
        console.log(req.body)
        try {
            registerFunc(req, res)
        } catch (err) {
            console.log(`And error has ocorred while sending the post request ${err}`)
        }
    }
)

register.get("/securityQuestions", 
    (req: Request, res: Response) => {
        try {
           sendSecurityQuestions(req, res); 
        } catch (err) {
            console.log(`An error has ocurred while signing up the user => ${err}`)
        }
    }
)

register.post("/securityQuestions", 
    (req: Request, res: Response) => {
        try {
           saveSecurityQuestions(req, res) 
        } catch (err) {
            console.log(`An error has ocurred while signing up the user => ${err}`)
        }
    }
)

register.post("/getUserSecurityQuestions", 
    (req: Request, res: Response) => {
        try {
           getUserSecurityQuestions(req, res);
        } catch (err) {
            console.log(`An error has ocurred while signing up the user => ${err}`)
        }
    }
)

register.post("/passwordRecovery", 
    (req: Request, res: Response) => {
        try {
            changePassword(req, res)
        } catch (err) {
            console.log(`An error has ocurred while signing up the user => ${err}`)
        }
    }
)