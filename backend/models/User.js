const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: [true, 'Please add a name'] 
  },
  email: { 
    type: String, 
    required: [true, 'Please add an email'],
    unique: true,
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      'Please add a valid email'
    ]
  },
  password: { 
    type: String, 
    required: [true, 'Please add a password'],
    minlength: 6,
    select: false 
  },
  phone: { 
    type: String, 
    required: [true, 'Please add a phone number'] 
  },
  city: { 
    type: String, 
    required: [true, 'Please specify city'] 
  },
  zone: { 
    type: String, 
    required: [true, 'Please specify delivery zone'] 
  },
  role: { 
    type: String, 
    enum: ['partner', 'agent'], 
    default: 'partner' 
  },
  riskScore: {
    type: Number,
    default: 15
  }
}, { timestamps: true });

// Password Hashing Middleware
userSchema.pre("save", async function(next) {
  if (!this.isModified("password")) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

// Match user entered password to hashed password in database
userSchema.methods.matchPassword = async function(enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model("User", userSchema);
