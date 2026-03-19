const express = require("express");
const { checkAndTriggerClaims } = require("../controllers/claimController");

const router = express.Router();

// Real-time Parametric Trigger Monitor
router.get("/trigger", checkAndTriggerClaims);

module.exports = router;
