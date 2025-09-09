const route = require("express").Router();
const { User, dbConnection } = require("../config/database");

route.put("/:id", async (req, res) => {
  const id = req?.params?.id;
  const title = req?.body?.inputToUpdate;

  try {
    //Connection Check...
    await dbConnection();
    let update = await User.updateOne({ _id: id }, { $set: { title: title } });
    console.log(update);
    return res.json({ message: "Success" });
  } catch (err) {
    console.log(err);
    return res.json({ "error in updateTask": err });
  }
});

module.exports = route;
