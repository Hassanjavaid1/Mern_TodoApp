const mongoose = require("mongoose");

//Connection
async function dbConnection() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("MongoDB connected successfully.");
  } catch (err) {
    console.log("ERROR:", err);
  }
}

//Schema
const todoSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
});

//Model
const User = mongoose.models.todos || mongoose.model("todos", todoSchema);

module.exports = { dbConnection, User };
