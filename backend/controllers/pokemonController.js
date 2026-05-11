const Pokemon = require('../models/pokemon');

// Get Pokemon
const chooseEmAll = async (req, res) => {
    try {
        const allPokemon = await Pokemon.find();
        console.log(allPokemon);
        res.status(200).json(allPokemon);
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
        console.log(error);
        res.status(500).json({ errorMessage: "Something went wrong with Pokedex" });
    }
}

// Evolve Pokemon
const evolvePokemon = async (req, res) => {
    try {
        if (!req.params.id?.trim()) {
            return res.status(400).json({ errorMessage: "Can't evolve a pokemon, if it's id not specified" });
        }
        const { pName, pType } = req.body;
        if (!pName?.trim() || !pType?.trim()) {
            return res.status(400).json({ errorMessage: "Cant't replace existing pokemon with a blank" });
        }
        const evolutionProcess = await
            Pokemon.findByIdAndUpdate(req.params.id,{pName,pType},{returnDocument:"after"});
        if (!evolutionProcess) {
            return res.status(404).json({ errorMessage: "Can't evolve a pokemon, if it wan't caught!!" });
        }
        res.status(201).json({successMessage:"Pokemon Evolved successfully."})
    } catch (error) {
        console.log(error);
        res.status(500).json({ errorMessage: "Something went wrong.Pokemon couldn't evolve" });       
    }
}

// Release Pokemon
const releasePokemon = async (req, res) => {
    try {
        if (!req.params.id?.trim()) {
            return res.status(400).json({ errorMessage: "Can't release a pokemon, if it's id not specified" });
        }
        const pokemonReleased = await Pokemon.findByIdAndDelete(req.params.id);
        if (!pokemonReleased) {
            return res.status(404).json({ errorMessage: "You can't release a pokemon, if it wasn't caught" });
        }
        res.status(200).json({successMessage:"Pokemon released successfully",releasedPokemon:pokemonReleased})

    } catch (error) {
        console.log(error.message);
        res.status(500).json({ errorMessage: "Something went wrong, Pokemon couldn't be released" });
    }
}

module.exports = {
    chooseEmAll,
    catchPokemon,
    evolvePokemon,
    releasePokemon
};