require("dotenv").config();
const express = require("express");
const route = express();
const cors = require("cors");

//Routes
const addTask = require("./routes/addTask");
const deleteTask = require("./routes/deleteTask");
const updateTask = require("./routes/updateTask");
const { dbConnection, User } = require("./config/database");

route.use(express.json());
route.use(cors());

route.get("/", async (req, res) => {
  dbConnection();
  try {
    let data = await User.find({}, { title: 1 }).sort({ _id: -1 });
    console.log(data);
    return res.json({ data });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Internal server error", err });
  }
});

//Routes
route.use("/api", addTask);
route.use("/", deleteTask);
route.use("/", updateTask);

//Server Port
// route.listen(process.env.PORT, () =>
//   console.log("Server running on port: " + process.env.PORT)
// );

module.exports = route;
