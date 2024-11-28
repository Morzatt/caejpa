// Creates the main route of the application, and imports all the routes to then exports it as an object to be
// received in the main server.ts file
import { register } from "./register/index.js";
import { login } from "./login/index.js";       
import { logout } from "./logout/index.js";     
import { prestamos } from "./prestamos/index.js";
import { variables } from "./variables/index.js";
import { backup } from "./backup/index.js";     
import { afiliados } from "./afiliados/index.js";
import { retiros } from "./retiros/index.js";   
import { usuarios } from "./usuarios/index.js"; 

export { register, login, logout, prestamos, variables, backup, afiliados, retiros, usuarios };
