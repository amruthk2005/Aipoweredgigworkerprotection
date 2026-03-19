const User = require("../models/User");

// @desc    Onboarding for delivery partners
// @route   POST /api/users/register
const registerUser = async (req, res) => {
  try {
    const { name, phone, city, zone } = req.body;
    const user = await User.create({ 
      name, 
      phone, 
      city, 
      zone 
    });
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = { registerUser };
