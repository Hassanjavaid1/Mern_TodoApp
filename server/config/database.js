const mongoose = require("mongoose");

//Connection
function dbConnection() {
  mongoose
    .connect(process.env.MONGODB_URI)
    .then(() => {
      console.log("MongoDB connected successfully.");
    })
    .catch((err) => {
      console.log(err);
    });
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
