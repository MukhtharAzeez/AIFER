const express = require("express");
const { readings } = require("./readings/readings");
const { readingsData } = require("./readings/readings.data");
const { createMeter, addReading, getAMeterReadings, getRecommendedPricePlan, pricePlanComparisons } = require("./controller/reading.controller");
const { recommend, compare } = require("./controller/pricePlan.controller");
const { getReadings, setReadings } = readings(readingsData);


require('dotenv').config()

const app = express();
require("./config/db")(app)
app.use(express.json());

app.post("/create-meter", createMeter);

app.get("/readings/read/:smartMeterId", getAMeterReadings);

app.post("/readings/store", addReading);

app.get("/price-plans/recommend/:smartMeterId", getRecommendedPricePlan);

app.get("/price-plans/compare-all/:smartMeterId", pricePlanComparisons);