const express = require("express");
const db = require("./src/utils/database/db");
const indexRoutes = require("./src/api/index/index.routes");
const characterRoutes = require("./src/api/characters/characters.routes");

db.connectDb();

const server = express();
const PORT = 3000;

server.use(express.json());

server.use("/", indexRoutes);
server.use("/characters", characterRoutes);

server.listen(PORT, () => {
    console.log(`Servidor a todo gas en http://localhost${PORT}`);
});