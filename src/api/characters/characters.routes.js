const express = require("express");
const Character = require("./characters.model");
const router = express.Router();

router.get("/", async(req, res) => {
    try{
        const allCharacters = await Character.find();
        return res.status(200).json("TODO OK");
    }catch(err){
        return res.status(500).json("Error en el servidor", err);
    }
});

router.get("/:id", async (req, res) => {
    try{
        const id = req.params.id;
        const characterToFind = await Character.findById(id);
        console.log(characterToFind);
        return res.status(200).json(characterToFind);
    }catch(err){
        return res.status(500).json("No se encontró el personaje", err);
    }
});

router.post("/create", async(req, res) =>{
    try {
      const character = req.body;  
      const newCharacter = new Character(req.body);
      const created = await newCharacter.save();
      console.log(character);
      return res.status(201).json("Personaje creado");
    } catch (err) {
        return res.status(500).json("Error al crear el personaje", err);
    }
});

module.exports = router;