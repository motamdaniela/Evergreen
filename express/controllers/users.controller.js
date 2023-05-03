const db = require("../models");
const User = db.users;

exports.findAll = async (req, res) => {
  // let title = req.query.title;

  try {
    let data = await User.find({})

    return res.status(200).json({
      success: true,
      users: data,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      msg: err.message || "Some error occurred",
    });
  }
};