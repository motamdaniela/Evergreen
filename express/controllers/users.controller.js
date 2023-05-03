const db = require("../models");
const User = db.users;

exports.findAll = async (req, res) => {

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

exports.findOne = async (req, res) => {
    let userId = req.query.id;
    let condition = id ? {id: new RegExp(id, '1')} : {};
  
    try {
      let data = await User.find(condition)
  
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


exports.findAdmins = async (req, res) => {
  
    try {
      let data = await User.find({ type: 'admin'})
  
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

  exports.findUsers = async (req, res) => {
  
    try {
      let data = await User.find({ type: 'user'})
  
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