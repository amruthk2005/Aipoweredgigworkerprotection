const express = require("express");
const { createPolicy } = require("../controllers/policyController");

const router = express.Router();

// Dynamic Premium & Policy Creation
router.post("/create", createPolicy);

module.exports = router;
