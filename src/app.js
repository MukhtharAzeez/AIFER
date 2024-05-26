const express = require("express");
const {
  createMeter,
  getAllMeters,
  addReading,
  getAMeterReadings,
  getRecommendedPricePlan,
  pricePlanComparisons,
  getPricingPlans,
} = require("./controller/reading.controller");
require("dotenv").config();

const app = express();

require("./config/db")(app);

app.use(require('cors')())

app.use(express.json());

app.post("/create-meter", createMeter);

app.get("/get-all-meters", getAllMeters);

app.get("/readings/read/:smartMeterId", getAMeterReadings);

app.post("/readings/store", addReading);

app.get("/get-pricing-plans", getPricingPlans);

app.get("/price-plans/recommend/:smartMeterId", getRecommendedPricePlan);

app.get("/price-plans/compare-all/:smartMeterId", pricePlanComparisons);
