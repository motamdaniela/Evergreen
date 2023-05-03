const db = require("../models");
const Activity = db.activities;

// ? gets all activities
exports.findAll = async (req, res) => {
  try {
    let data = await Activity.find({});

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

// ? get one activity by id
exports.findOne = async (req, res) => {
  try {
    const activity = await Activity.findById(req.params.activityID);
    if (activity === null)
      return res.status(404).json({
        success: false,
        msg: `Cannot find any activity with ID ${req.params.activityID}`,
      });
    return res.json({ success: true, activity: activity });
  } catch (err) {
    if (err.name === "CastError") {
      return res.status(400).json({
        success: false,
        msg: "id parameter is not a valid object id",
      });
    }
    return res.status(500).json({
      success: false,
      msg: `error retrieving activity with ID ${req.params.activityID}`,
    });
  }
};

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
