const express = require("express");
const { checkAndTriggerClaims, getAllClaims } = require("../controllers/claimController");

const router = express.Router();

// Real-time Parametric Trigger Monitor
router.get("/trigger", checkAndTriggerClaims);
router.get("/all", getAllClaims);

module.exports = router;
