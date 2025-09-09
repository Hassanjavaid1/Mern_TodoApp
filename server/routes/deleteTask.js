const route = require("express").Router();
const { User, dbConnection } = require("../config/database");

route.delete("/:id", async (req, res) => {
  const id = req?.params?.id;
  try {
   await dbConnection();
    //console.log(id);
    await User.deleteOne({ _id: id });
    // console.log(id);
    return res.json({ message: "Success" });
  } catch (err) {
    console.log(err);
    return res.json({"Error in DeleteTask":err});
  }
});

module.exports = route;
