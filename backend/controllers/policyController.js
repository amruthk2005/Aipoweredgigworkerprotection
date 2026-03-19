const Policy = require("../models/Policy");
const User = require("../models/User");
const { calculatePremium } = require("../services/riskService");

// @desc    Dynamic Weekly Premium Calculation & Policy Creation
// @route   POST /api/policies/create
const createPolicy = async (req, res) => {
  try {
    const { userId } = req.body;
    const user = await User.findById(userId);

    // AI logic for dynamic premium
    const premium = calculatePremium(user.riskScore);

    const policy = await Policy.create({
      userId,
      weeklyPremium: premium,
      coverageAmount: 500, // Fixed payout limit per week for Phase 1
      startDate: new Date(),
      endDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // Coverage for 7 days
      isActive: true
    });

    res.status(201).json(policy);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = { createPolicy };
