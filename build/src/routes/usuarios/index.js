import { Router } from "express";
import { editUser, getUsers, deleteUser, blockUser, unlockUser } from "../../middleware/usuarios.js";
export const usuarios = Router();
usuarios.get("/:id", (req, res) => {
    try {
        getUsers(req, res);
    }
    catch (err) {
        console.log(`An error has ocurred with the GET /prestamos/variables route`);
    }
});
usuarios.patch("/:id", (req, res) => {
    try {
        editUser(req, res);
    }
    catch (err) {
        console.log(`An error has ocurred with the GET /prestamos/variables route`);
    }
});
usuarios.delete("/:id", (req, res) => {
    try {
        deleteUser(req, res);
    }
    catch (err) {
        console.log(`An error has ocurred with the GET /prestamos/variables route`);
    }
});
usuarios.get("/block/:id", (req, res) => {
    try {
        blockUser(req, res);
    }
    catch (err) {
        console.log(`An error has ocurred with the GET /prestamos/variables route`);
    }
});
usuarios.get("/unlock/:id", (req, res) => {
    try {
        unlockUser(req, res);
    }
    catch (err) {
        console.log(`An error has ocurred with the GET /prestamos/variables route`);
    }
});
