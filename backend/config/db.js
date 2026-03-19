const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        const uri = process.env.MONGO_URI || process.env.MONGODB_URI;
        await mongoose.connect(uri);
        console.log("MongoDB database connection established successfully ✅");
    } catch (err) {
        console.error("MongoDB database connection error:", err.message);
        process.exit(1);
    }
};

module.exports = connectDB;
