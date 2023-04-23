const activities = require("../models/activities.model");

exports.bodyValidator =
  ("/:activityID",
  (req, res, next) => {
    console.log("bodyValidator");
    console.log("Request Type:", req.method);

    next();
  });

// Display list of all activities
exports.findAll = (req, res) => {
  res.json(activities);
};

// Display list of all activities of a theme
exports.filter = (req, res) => {
  let acts = [];
  activities.forEach((activity) => {
    if (activity.idTheme == req.params.themeID) {
      acts.push(activity);
    }
  });
  res.json(acts);
};

// Display only 1 activity
exports.findOne = (req, res) => {
  res.json(activities.find((activity) => activity.id == req.params.activityID));
};

// subscribe / unsubscribe activity
// user id 0 doesn't work
exports.subscribe = (req, res) => {
  activities.forEach((activity) => {
    if (activity.id == req.params.activityID) {
      if (activity.users.find((user) => user == +req.params.userID)) {
        activity.users.splice(activity.users.indexOf(+req.params.userID), 1);
        res.json(activity);
      } else {
        activity.users.push(+req.params.userID);
        res.json(activity);
      }
    }
  });
};
