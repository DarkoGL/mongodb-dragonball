const mongoose = require("mongoose");

// Ruta de la base de datos. Esta es local, podría ser la ruta de mongo atlas
const DB_URL = "mongodb://localhost:27017/dragon-ball";

if (!DB_URL) throw new Error("No se encuentra la URL a la base de datos");

const connectDb = async () => {
  try {
    const db = await mongoose.connect(DB_URL);
    const { name, host } = db.connection;
    console.log(`Conectado con éxito a la db ${name} en ${host}`);
  } catch (err) {
    console.log("Error conectando a la db", err);
  }
};

module.exports = { connectDb, DB_URL };
