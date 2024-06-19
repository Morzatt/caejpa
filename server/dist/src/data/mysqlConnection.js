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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.pool = void 0;
const mysql2_1 = __importDefault(require("mysql2"));
const config_1 = __importDefault(require("../config"));
const connConfig = {
    host: config_1.default.dbhost,
    user: config_1.default.dbuser,
    password: config_1.default.dbpwd,
    database: config_1.default.dbname,
    port: 3307
};
exports.pool = mysql2_1.default.createPool(connConfig).promise();
// export let connection = mysql.createConnection(connConfig)
const pruebaMYSQL = () => __awaiter(void 0, void 0, void 0, function* () {
    const sql = 'SELECT * FROM usuarios;';
    const [usuarios] = yield exports.pool.query(sql);
    // console.log(usuarios)
});
exports.default = pruebaMYSQL;
// Query para cambiar el default del porcentaje de intereses
// ALTER TABLE `caejpadb`.`prestamos` 
// CHANGE COLUMN `porcentaje_intereses` `porcentaje_intereses` DECIMAL(5,2) NOT NULL DEFAULT '10.00' ;
