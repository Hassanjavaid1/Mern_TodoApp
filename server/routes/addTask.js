const route = require("express").Router();
const mongoose = require("mongoose");
const { dbConnection, User } = require("../config/database");

route.post("/", async (req, res) => {
  const userValue = req?.body?.value;

  try {
    //Checking DB Connection
    await dbConnection();
    //Create
    await User.create({ title: userValue });
    console.log(userValue);
    return res.status(201).json({ message: { status: "Success" } });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: { status: "Error in addTask", desc: err } });
  }
});

module.exports = route;
