import mysql from "mysql2";
import config from "../config"; 

const connConfig = {
    host: config.dbhost,
    user: config.dbuser,
    password: config.dbpwd,
    database: config.dbname,
    port: 3307 
}

export let pool = mysql.createPool(connConfig).promise();
// export let connection = mysql.createConnection(connConfig)

const pruebaMYSQL = async () => {
    const sql = 'SELECT * FROM usuarios;';
    const [usuarios] = await pool.query(sql)
    // console.log(usuarios)
}

export default pruebaMYSQL



// Query para cambiar el default del porcentaje de intereses

// ALTER TABLE `caejpadb`.`prestamos` 
// CHANGE COLUMN `porcentaje_intereses` `porcentaje_intereses` DECIMAL(5,2) NOT NULL DEFAULT '10.00' ;