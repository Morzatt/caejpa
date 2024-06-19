"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.backup = void 0;
const express_1 = require("express");
const fs_1 = require("fs");
const dbbackup_1 = require("../../middleware/dbbackup");
exports.backup = (0, express_1.Router)();
exports.backup.post("/create", (req, res) => {
    try {
        (0, dbbackup_1.createBackup)(req, res);
    }
    catch (err) {
        throw err;
    }
});
exports.backup.get("/download", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const date = new Date();
        const backupName = `backup_${date.getDate()}${date.getMonth() + 1}${date.getFullYear()}${date.getHours()}${date.getMinutes()}`;
        (0, fs_1.renameSync)("./generated/backup.sql", `./generated/${backupName}.sql`);
        res.download(`./generated/${backupName}.sql`, (err) => {
            if (err) {
                res.status(500).send('Hubo un error al descargar el archivo');
            }
            else {
                console.log('Archivo descargado exitosamente');
            }
        });
    }
    catch (err) {
        console.log(`And error has ocorred while sending the get request on the login ${err}`);
    }
}));
exports.backup.post("/upload", (req, res) => {
    try {
        (0, dbbackup_1.uploadBackup)(req, res);
    }
    catch (err) {
        console.log(`And error has ocorred while sending the get request on the login ${err}`);
    }
});
