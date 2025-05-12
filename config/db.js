const mongoose = require('mongoose');
require('dotenv').config(); // تحميل .env

const DB = process.env.MONGO_URL;

async function connectToDB() {
  try {
    await mongoose.connect(DB);
    console.log("✅ Connected to MongoDB successfully");
  } catch (err) {
    console.error("❌ Failed to connect to MongoDB", err);
  }
}

module.exports = connectToDB;

// mongoose.connect(DB)
// .then(() => {

//   console.log("✅ Connected to MongoDB successfully")
// }).catch((err) => console.error("❌ Failed to connect to MongoDB", err));