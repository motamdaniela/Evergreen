const activities = require("../models/activities.model");

// exports.bodyValidator =
//   ("/:id",
//   (req, res, next) => {
//     console.log("bodyValidator");
//     console.log("Request Type:", req.method);

//     next();
//   });
// Display list of all activities
exports.findAll = (req, res) => {
  res.json(activities);
};
// Display only 1 activity
exports.findOne = (req, res) => {
  res.json(activities.find((activity) => activity.id == req.params.id));
};

// exports.update = (req, res) => {};
