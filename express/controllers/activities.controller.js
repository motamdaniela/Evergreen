const db = require("../models");
const Activity = db.activities;
// const Comment = db.comments;
// Create and Save a new Comment into a certain tutorial:
// use comment.save() to create a new comment document
// use Tutorial.findByIdAndUpdate() (with the $push operator) to include the new comment
// reference in the tutorial document
exports.findAll = async (req, res) => {
  let title = req.query.title;

  let condition = title ? { title: new RegExp(title, "i") } : {};

  try {
    let data = await Activity.find(condition)
      .select("title description published")
      .exec();

    return res.status(200).json({
      success: true,
      activities: data,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      msg: err.message || "Some error occurred",
    });
  }
};
// Find a single Tutorial with an id: use Model.findById(), and including its comments
// exports.findOne = async (req, res) => {
//   try {
//     const tutorial = await Tutorial.findById(req.params.idT)
//       .populate("comments")
//       .exec();

//     if (tutorial === null)
//       return res.status(404).json({
//         success: false,
//         msg: `Cannot find any tutorial with ID ${req.params.idT}`,
//       });
//     return res.json({ success: true, tutorial: tutorial });
//   } catch (err) {
//     if (err.name === "CastError") {
//       return res.status(400).json({
//         success: false,
//         msg: "id parameter is not a valid object id",
//       });
//     }
//     return res.status(500).json({
//       success: false,
//       msg: `error retrieving tutorial with ID ${req.params.tutorialID}`,
//     });
//   }
// };

// const activities = require("../models/activities.model");

// exports.bodyValidator =
//   ("/:activityID",
//   (req, res, next) => {
//     console.log("bodyValidator");
//     console.log("Request Type:", req.method);

//     next();
//   });

// // Display list of all activities
// exports.findAll = (req, res) => {
//   res.json(activities);
// };

// // Display list of all activities of a theme
// exports.filter = (req, res) => {
//   let acts = [];
//   activities.forEach((activity) => {
//     if (activity.idTheme == req.params.themeID) {
//       acts.push(activity);
//     }
//   });
//   res.json(acts);
// };

// // Display only 1 activity
// exports.findOne = (req, res) => {
//   res.json(activities.find((activity) => activity.id == req.params.activityID));
// };

// // subscribe / unsubscribe activity
// // user id 0 doesn't work
// exports.subscribe = (req, res) => {
//   activities.forEach((activity) => {
//     if (activity.id == req.params.activityID) {
//       if (activity.users.find((user) => user == +req.params.userID)) {
//         activity.users.splice(activity.users.indexOf(+req.params.userID), 1);
//         res.json(activity);
//       } else {
//         activity.users.push(+req.params.userID);
//         res.json(activity);
//       }
//     }
//   });
// };
