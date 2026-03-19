const express = require("express");
const { createPolicy, getAllPolicies, getUserPolicies } = require("../controllers/policyController");

const router = express.Router();

// Policy Routes
router.post("/create", createPolicy);
router.get("/all", getAllPolicies);
router.get("/user/:userId", getUserPolicies);

module.exports = router;
