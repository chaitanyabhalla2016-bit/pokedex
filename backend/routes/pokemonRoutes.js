const express = require('express');
// important. We don't use app here, instead we will export routes using express.
const router = express.Router();

const { chooseEmAll, catchPokemon, evolvePokemon, releasePokemon } = require('../controllers/pokemonController');

// show pokemon
router.get('/pokemon', chooseEmAll);
// catch pokemon
router.post('/pokemon', catchPokemon);
// Evolve pokemon
router.put('/pokemon/:id', evolvePokemon);
// Release Pokemon
router.delete('/pokemon/:id', releasePokemon);

module.exports = router;