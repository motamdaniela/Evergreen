const db = require("../models");
const Mission = db.missions;
// const Comment = db.comments;
// Create and Save a new Comment into a certain tutorial:
// use comment.save() to create a new comment document
// use Tutorial.findByIdAndUpdate() (with the $push operator) to include the new comment
// reference in the tutorial document
exports.findAll = async (req, res) => {
  let title = req.query.title;

  let condition = title ? { title: new RegExp(title, "i") } : {};

  try {
    let data = await Mission.find(condition)
      .select("title description published")
      .exec();

    return res.status(200).json({
      success: true,
      missions: data,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      msg: err.message || "Some error occurred",
    });
  }
};

// const missions = require("../models/missions.model");
// const users = require("../models/users.model");

// // Display list of all missions
// exports.findAll = (req, res) => {
//   res.json(missions);
// };

// // Display only 1 mission
// exports.findOne = (req, res) => {
//   res.json(missions.find((mission) => mission.id == req.params.missionID));
// };

// // receive badge
// exports.addBadge = (req, res) => {
//   missions.forEach((mission) => {
//     if (mission.id == req.params.missionID) {
//       users.forEach((user) => {
//         if (user.id == req.params.userID) {
//           if (!user.rewards.find((badge) => badge == mission.reward)) {
//             user.rewards.push(mission.reward);
//             res.json(user);
//           } else {
//             res.json("you already have this badge");
//           }
//         }
//       });
//     }
//   });
// };
