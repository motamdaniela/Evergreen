const express = require("express");
const router = express.Router();

const missionsController = require("../controllers/missions.controller");
router.route("/").get(missionsController.findAll);
router.route("/:missionID").get(missionsController.findOne);

router.route("/:missionID/users/:userID").put(missionsController.addBadge);

router.all("*", (req, res) => {
  res.status(404).json({ message: "what???" });
});

module.exports = router;
