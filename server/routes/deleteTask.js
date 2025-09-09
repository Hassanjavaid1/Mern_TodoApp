const route = require("express").Router();
const { User, dbConnection } = require("../config/database");

route.delete("/:id", async (req, res) => {
  const id = req?.params?.id;
  dbConnection();
  try {
    //console.log(id);
    await User.deleteOne({ _id: id });
    // console.log(id);
    return res.json({ message: "Success" });
  } catch (err) {
    console.log(err);
    return res.json(err);
  }
});

module.exports = route;
