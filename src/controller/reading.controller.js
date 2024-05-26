const meterModel = require("../model/meter.model");
const { recommend, compare } = require("./pricePlan.controller");


const createMeter = async (req, res) => {
    try {
        const meters = await meterModel.find();
        const result = new meterModel({_id: `smart-meter-${meters.length || 0}`});
        await result.save();
        res.status(200).json({ status: "success", data: result, message: "meter created" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ status: "error", data: null, message: error.message });
    }
}

const addReading = async(req, res) => {
    try {
        const { smartMeterId, electricityReadings } = req.body;
        const result = await meterModel.findByIdAndUpdate(
            smartMeterId,
            { $push: { electricityReadings: { $each: electricityReadings } } },
            { new: true }
        );
        if(!result) res.status(404).json({status: "error", data: null, message: "meter not found"});
        else res.status(200).json({status: "success", data: result, message: "readings stored"});
    } catch (error) {
        console.log(error);
        res.status(500).json({status: "error", data: null, message: error.message});
    }
}

const getAMeterReadings = async(req, res) => {
    try {
        const { smartMeterId } = req.params;
        const result = await meterModel.findById(smartMeterId);
        res.status(200).json({status: "success", data: result, message: "readings fetched"});
    } catch (error) {
        console.log(error);
        res.status(500).json({status: "error", data: null, message: error.message});
    }
}

const getRecommendedPricePlan = async(req, res) => {
    try {
        const { smartMeterId } = req.params;
        const readings = await meterModel.findById(smartMeterId);
        const result = recommend(readings.electricityReadings);
        res.status(200).json({status: "success", data: result, message: "price plans sorted by cost"});
    } catch (error) {
        console.log(error);
        res.status(500).json({status: "error", data: null, message: error.message});
    }
}

const pricePlanComparisons = async(req, res) => {
    try {
        const { smartMeterId } = req.params;
        const readings = await meterModel.findById(smartMeterId);
        const result = compare(readings.electricityReadings);
        res.status(200).json({ status: "success", data: { smartMeterId, pricePlanComparisons: result}, message: "price plans sorted by cost" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ status: "error", data: null, message: error.message });
    }
}

module.exports = {
    createMeter,
    addReading,
    getAMeterReadings,
    getRecommendedPricePlan,
    pricePlanComparisons
}