const Policy = require("../models/Policy");
const User = require("../models/User");
const { calculateRiskForWorker, calculatePremium } = require("../services/riskService");

// @desc    Dynamic Weekly Premium Calculation & Policy Creation
// @route   POST /api/policies/create
const createPolicy = async (req, res) => {
  try {
    const { userId } = req.body;
    const user = await User.findById(userId);

    // AI logic for predictive risk and dynamic premium
    const currentRiskScore = calculateRiskForWorker(user.zone); 
    const premium = calculatePremium(currentRiskScore);

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

// @desc    Get all policies (Insurance Agent view)
// @route   GET /api/policies/all
const getAllPolicies = async (req, res) => {
  try {
    const policies = await Policy.find().populate("userId", "name zone");
    res.json(policies);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get policies for a specific user
// @route   GET /api/policies/user/:userId
const getUserPolicies = async (req, res) => {
  try {
    const policies = await Policy.find({ userId: req.params.userId });
    res.json(policies);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { createPolicy, getAllPolicies, getUserPolicies };
