"use strict";
// 1
// This file starts the server, configurate it with its proper port and hostname (if needed), and
// catches any possible error into a try-catch block inside the startServer function
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = __importDefault(require("./src/server"));
const config_1 = __importDefault(require("./src/config"));
const startServer = () => {
    try {
        server_1.default.listen(config_1.default.port, () => {
            console.log(`Server is running at http://${config_1.default.host}:${config_1.default.port}`);
        });
    }
    catch (err) {
        console.log("Server failed to start: ", err);
    }
};
startServer();
