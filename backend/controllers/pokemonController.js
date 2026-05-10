const Pokemon = require('../models/pokemon');

// Get Pokemon
const chooseEmAll = async (req, res) => {
    try {
        const allPokemon = await Pokemon.find();
        res.status(200).json(allPokemon);
        console.json(allPokemon);
    } catch (error) {
        res.status(500).json({ errorMessage: "Something went wrong." });
    }
}

// Catch Pokemon
const catchPokemon = async (req, res) => {
    try {
        const { pName, pType } = req.body;
        if (!pName?.trim() || !pType?.trim()) {
            return res.status(400).json({ errorMessage: "Nice try, but can't catch an empty Pokemon😂" });
        }
        const newPokemon = await Pokemon.create({
            pName,
            pType
        });
        if (newPokemon) {
            res.status(201).json({ successMessage: "We caught the new Pokemon.", pokemonCaught: newPokemon });
        }
    } catch (error) {
        res.status(500).json({ errorMessage: "Something went wrong with Pokedex" });
    }
}

// Evolve Pokemon
const evolvePokemon = async (req, res) => {
    try {
        const { pName, pType } = req.body;
        if (!pName?.trim() || !pType?.trim()) {
            return res.status(400).json({ errorMessage: "Cant't replace existing pokemon with a blank" });
        }
        const evolutionProcess = await
            Pokemon.findByIdAndUpdate(req.params.id);
        if(!evolutionProcess){}
    } catch (error) {
        
    }
}