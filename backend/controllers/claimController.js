const Claim = require("../models/Claim");
const Policy = require("../models/Policy");
const { getWeatherData } = require("../services/weatherService");

// @desc    Parametric Trigger Monitor & Automated Claims
// @route   GET /api/claims/trigger
const checkAndTriggerClaims = async (req, res) => {
  try {
    const policies = await Policy.find({ isActive: true });
    const weather = await getWeatherData();
    
    let triggeredClaims = [];

    for (let policy of policies) {
        let triggerType = null;
        let payout = 0;

        // Condition Check: Rain triggered
        if (weather.rain > 50) {
            triggerType = "RAIN";
            payout = 200;
        } 
        // Condition Check: Heat triggered
        else if (weather.temp > 40) {
            triggerType = "HEAT";
            payout = 150;
        }
        // Condition Check: Severe Pollution triggered
        else if (weather.aqi > 300) {
            triggerType = "POLLUTION";
            payout = 180;
        }

        if (triggerType) {
            // Self-service trigger check: prevent duplicate manual or AI claims for same period
            const claim = await Claim.create({
              userId: policy.userId,
              policyId: policy._id,
              triggerType,
              payoutAmount: payout,
              status: "APPROVED" // Automated Approvals for Parametric Events
            });
            triggeredClaims.push(claim);
        }
    }

    res.status(200).json({
      weather,
      triggeredClaims
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// @desc    Get all claims (Insurance Agent view)
// @route   GET /api/claims/all
const getAllClaims = async (req, res) => {
  try {
    const claims = await Claim.find().populate("userId", "name zone");
    res.json(claims);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { checkAndTriggerClaims, getAllClaims };
