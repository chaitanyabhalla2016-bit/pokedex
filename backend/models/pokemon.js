const mongoose = require('mongoose');
const pokemonSchema = mongoose.Schema({
    pName: {
        type: String,
        required: true,
        trim: true
    },
    pType: {
        type: String,
        required: true,
        trim: true
    }
}, {
    timeStamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    }
});
const Pokemon = mongoose.model('Pokemon', pokemonSchema);
module.exports = Pokemon;