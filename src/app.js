const express = require("express");
require('dotenv').config()

const app = express();
require("./config/db")(app)
app.use(express.json());


app.get("/readings/read/:smartMeterId", (req, res) => {

});

app.post("/readings/store", (req, res) => {
    
});

app.get("/price-plans/recommend/:smartMeterId", (req, res) => {

});

app.get("/price-plans/compare-all/:smartMeterId", (req, res) => {

});

