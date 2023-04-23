const missions = require("../models/missions.model");
const users = require("../models/users.model");

// Display list of all missions
exports.findAll = (req, res) => {
  res.json(missions);
};

// Display only 1 mission
exports.findOne = (req, res) => {
  res.json(missions.find((mission) => mission.id == req.params.missionID));
};

// receive badge
exports.addBadge = (req, res) => {
  missions.forEach((mission) => {
    if (mission.id == req.params.missionID) {
      users.forEach((user) => {
        if (user.id == req.params.userID) {
          if (!user.rewards.find((badge) => badge == mission.reward)) {
            user.rewards.push(mission.reward);
            res.json(user);
          } else {
            res.json("you already have this badge");
          }
        }
      });
    }
  });
};
