const mongoose = require("mongoose");

const claimSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  policyId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Policy",
    required: true
  },
  triggerType: { 
    type: String, 
    required: true,
    enum: ['RAIN', 'HEAT', 'POLLUTION', 'CURFEW']
  },
  payoutAmount: { type: Number, required: true },
  status: {
    type: String,
    enum: ['PENDING', 'APPROVED', 'REJECTED', 'PAID'],
    default: "APPROVED"
  },
  isFraud: {
    type: Boolean,
    default: false
  }
}, { timestamps: true });

module.exports = mongoose.model("Claim", claimSchema);
