const { mongoose } = require("mongoose");
const Character = require("../../api/characters/characters.model");
const { DB_URL } = require("../database/db");

const characters = [
  {
    name: "Goku",
    race: "saiyan",
    universe: 7,
    transform: true,
    genre: "male",
  },
  {
    name: "Piccolo",
    race: "namekian",
    universe: 7,
    transform: true,
    genre: "namekian",
  },
  {
    name: "Cabba",
    race: "saiyan",
    universe: 6,
    transform: true,
    genre: "male",
  },
  {
    name: "Kale",
    race: "saiyan",
    universe: 6,
    transform: true,
    genre: "female",
  },
  {
    name: "A18",
    race: "android",
    universe: 7,
    transform: false,
    genre: "female",
  },
  {
    name: "Krillin",
    race: "human",
    universe: 7,
    transform: false,
    genre: "male",
  },
  {
    name: "Jiren",
    race: "unknown",
    universe: 11,
    transform: false,
    genre: "male",
  },
  {
    name: "Zen-oh",
    race: "unknown",
    universe: 0,
    transform: false,
    genre: "genderless",
  },
];

/*
 *1. Conectaremos la db
 *2. Haremos una búsqueda para ver si tenemos personajes
 *   2.1 si NO tenemos personajes -> Escribimos los personajes del seed
 *   2.2 si SI tenemos personajes -> Borramos la colección (DROP)
 *3. Escribir los personajes del array characters
 *4. Informaremos que hemos escrito los personajes
 *5. Desconectaremos de la base de datos.
 */
console.log(DB_URL);
mongoose.connect(DB_URL)
  .then(async () => {
    const allCharacters = await Character.find().lean();
    if (!allCharacters.length) {
      console.log("No se encuentran personajes");
    } else {
      console.log(`Encontrados ${allCharacters.length} personajes`);
      await Character.collection.drop();
      console.log("Colección eliminada correctamente");
    }
  })
  .catch((err) => console.log("Error eliminando la colección -->", err))
  .then(async () =>{
    await Character.insertMany(characters);
    console.log("Nuevos personajes añadidos con éxito");
  })
  .catch((err) => console.log("Error añadiendo los personajes", err))
  .finally(() => mongoose.disconnect());
