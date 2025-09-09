const mongoose = require("mongoose");

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function dbConnection() {
  if (cached.conn) return cached.conn;
  if (!cached.promise) {
    cached.promise = mongoose.connect(process.env.MONGODB_URI, {
      bufferCommands: false,
      maxPoolSize: 10,
      serverSelectionTimeoutMS: 10000
    }).then((mongoose) => {
      mongoose.connection.on("connected", () => console.log("MongoDB connected."));
      mongoose.connection.on("error", (err) => console.error("MongoDB connection error:", err));
      mongoose.connection.on("disconnected", () => console.warn("MongoDB disconnected."));
      return mongoose;
    });
  }
  cached.conn = await cached.promise;
  return cached.conn;
}

// Schema and model
const todoSchema = new mongoose.Schema({
  title: { type: String, required: true },
});
const User = mongoose.models.todos || mongoose.model("todos", todoSchema);

module.exports = { dbConnection, User };
