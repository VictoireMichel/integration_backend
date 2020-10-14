const express = require("express");
const dotenv = require('dotenv').config();
const app = express();
const seq = require("./config/config");
const modelPlants = require("./models/modelPlants");
const routePlants = require("./routes/routePlants");
const routeFilter = require("./routes/routeFilter");
app.use("/plants", routePlants);
/* simple test pour avoir un rendu sur le '/' lors du déploiement sur Heroku */
const PORT = process.env.PORT || '3000';
app.get('/', (req,res) => {
    res.send('Hello there is a change');
});
app.use("/filter", routeFilter);

app.listen(PORT);
