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
exports.variables = void 0;
const mysqlConnection_1 = require("../mysqlConnection");
function variables() {
    const getVariables = () => __awaiter(this, void 0, void 0, function* () {
        const query = "SELECT * FROM variables";
        try {
            const [variablesFromDB] = yield mysqlConnection_1.pool.query(query);
            const variables = variablesFromDB.map(variable => {
                return {
                    id: variable.id,
                    titulo: variable.titulo,
                    valor: variable.valor
                };
            });
            return variables;
        }
        catch (err) {
            console.log(`An error has ocurred when searching for if there was any user with the same username before: ${err}`);
            throw err;
        }
    });
    const modifyGastosAdministrativos = (valor) => __awaiter(this, void 0, void 0, function* () {
        try {
            const query = "UPDATE variables SET valor = ? WHERE id = 1;";
            const result = yield mysqlConnection_1.pool.query(query, valor);
        }
        catch (err) {
            console.log(`An error has ocurred when selecting the values for the selectUser query: ${err}`);
            throw err;
        }
    });
    const modifyTransferenciaEfectiva = (valor) => __awaiter(this, void 0, void 0, function* () {
        try {
            const query = "UPDATE variables SET valor = ? WHERE id = 2;";
            const result = yield mysqlConnection_1.pool.query(query, valor);
        }
        catch (err) {
            console.log(`An error has ocurred when selecting the values for the selectUser query: ${err}`);
            throw err;
        }
    });
    const modifyPorcentajeIntereses = (valor) => __awaiter(this, void 0, void 0, function* () {
        try {
            const query = "UPDATE variables SET valor = ? WHERE id = 3;";
            const result = yield mysqlConnection_1.pool.query(query, valor);
        }
        catch (err) {
            console.log(`An error has ocurred when selecting the values for the selectUser query: ${err}`);
            throw err;
        }
    });
    return {
        getVariables,
        modifyGastosAdministrativos,
        modifyTransferenciaEfectiva,
        modifyPorcentajeIntereses
    };
}
exports.variables = variables;
