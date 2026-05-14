require('dotenv').config();
const MONGO_URI = process.env.MONGO_URI;
const ALTERNATE_MONGO_URI = process.env.POKECOMPASSLOCATION
const PORT = process.env.PORT || 5000;
const express = require('express');
const mongoose = require('mongoose');
const pokemonRoutes = require('./routes/pokemonRoutes');
const cors = require('cors');
const app = express();

app.use(cors({
    origin: [
        "http://localhost:5000",
        "http://127.0.0.1:5500",
        "https://cbhallamudi.com"
    ]
}));
app.use(express.json());

mongoose.connect(MONGO_URI).then(() => {
    console.log("MongoDB connected");
}).catch((error) => {
    console.log(error);
});

app.use(pokemonRoutes);

app.listen(PORT, () => console.log(`Server listening on ${PORT}`));
