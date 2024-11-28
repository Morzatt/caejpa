// 3
// This file sets the dotenv configuration and imports its values
// then assigns it to an object, asserts the port and host requirement
// and finally exports it as an better formatted object
import dotenv from "dotenv";
import assert from "assert";
dotenv.config();
const { PORT, HOST, HOST_URL, COOKIE_SECRET, DBHOST, DBUSER, DBPWD, DBNAME, DBPORT } = process.env;
const COOKIE_CONFIG = {
    maxAge: 1000 * 60 * 15, // would expire after 15 minutes
    signed: true // Indicates if the cookie should be signed
};
assert(PORT, "PORT is required");
assert(HOST, "HOST is required");
assert(COOKIE_SECRET);
export default {
    port: PORT,
    host: HOST,
    hostURL: HOST_URL,
    cookieSecret: COOKIE_SECRET,
    cookieConfig: COOKIE_CONFIG,
    dbhost: DBHOST,
    dbuser: DBUSER,
    dbpwd: DBPWD,
    dbname: DBNAME,
    dbport: DBPORT
};
