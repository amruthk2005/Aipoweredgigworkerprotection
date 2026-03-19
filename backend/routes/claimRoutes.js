const express = require("express");
const { checkAndTriggerClaims, getAllClaims, getUserClaims } = require("../controllers/claimController");

const router = express.Router();

// Claim Routes
router.get("/trigger", checkAndTriggerClaims);
router.get("/all", getAllClaims);
router.get("/user/:userId", getUserClaims);

module.exports = router;
