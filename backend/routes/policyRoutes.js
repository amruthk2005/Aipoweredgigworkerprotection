const express = require("express");
const { createPolicy, getAllPolicies } = require("../controllers/policyController");

const router = express.Router();

// Dynamic Premium & Policy Creation
router.post("/create", createPolicy);
router.get("/all", getAllPolicies);

module.exports = router;
