require('dotenv').config();
const MONGO_URI = process.env.POKELOCATION;
const ALTERNATE_MONGO_URI = process.env.POKECOMPASSLOCATION
const PORT = process.env.POKEPORT;
const express = require('express');
const mongoose = require('mongoose');
const pokemonRoutes = require('./routes/pokemonRoutes');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect(MONGO_URI).then(() => {
    console.log("MongoDB connected");
}).catch((error) => {
    mongoose.connect(ALTERNATE_MONGO_URI).then(() => {
        console.log("MongoDB connected");
    }).catch((error) => {
        console.log("Compass also failed.",error);
    });
    console.log(error);
});

app.use(pokemonRoutes);

app.listen(PORT, () => console.log(`Server listening on ${PORT}`));
