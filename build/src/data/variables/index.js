import { pool } from "../mysqlConnection.js";
export function variables() {
    const getVariables = async () => {
        const query = "SELECT * FROM variables";
        try {
            const [variablesFromDB] = await pool.query(query);
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
    };
    const modifyGastosAdministrativos = async (valor) => {
        try {
            const query = "UPDATE variables SET valor = ? WHERE id = 1;";
            const result = await pool.query(query, valor);
        }
        catch (err) {
            console.log(`An error has ocurred when selecting the values for the selectUser query: ${err}`);
            throw err;
        }
    };
    const modifyTransferenciaEfectiva = async (valor) => {
        try {
            const query = "UPDATE variables SET valor = ? WHERE id = 2;";
            const result = await pool.query(query, valor);
        }
        catch (err) {
            console.log(`An error has ocurred when selecting the values for the selectUser query: ${err}`);
            throw err;
        }
    };
    const modifyPorcentajeIntereses = async (valor) => {
        try {
            const query = "UPDATE variables SET valor = ? WHERE id = 3;";
            const result = await pool.query(query, valor);
        }
        catch (err) {
            console.log(`An error has ocurred when selecting the values for the selectUser query: ${err}`);
            throw err;
        }
    };
    return {
        getVariables,
        modifyGastosAdministrativos,
        modifyTransferenciaEfectiva,
        modifyPorcentajeIntereses
    };
}
