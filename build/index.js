// 1
// This file starts the server, configurate it with its proper port and hostname (if needed), and
// catches any possible error into a try-catch block inside the startServer function
import app from "./src/server.js";
import config from "./src/config.js";
import { handler } from "./handler.js"

const startServer = () => {
    try {
        app.use(handler)
        app.listen(config.port, () => {
            console.log(`Server is running at http://${config.host}:${config.port}`);
        });
    }
    catch (err) {
        console.log("Server failed to start: ", err);
    }
};
startServer();
