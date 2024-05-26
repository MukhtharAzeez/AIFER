const { pricePlans } = require("../utils/price-plans");
const { usageForAllPricePlans } = require("../utils/usage");

const recommend = (readings) => {
    const pricePlanComparisons = usageForAllPricePlans(pricePlans, readings).sort((a, b) => extractCost(a) - extractCost(b))
    // if ("limit" in req.query) {
    //     return pricePlanComparisons.slice(0, req.query.limit);
    // }
    return pricePlanComparisons;
};

const extractCost = (cost) => {
    const [, value] = Object.entries(cost).find( ([key]) => key in pricePlans)
    return value
}

const compare = (readings) => {
    const pricePlanComparisons = usageForAllPricePlans(pricePlans, readings)
    return pricePlanComparisons
};

module.exports = { recommend, compare };
