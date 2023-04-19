const express = require("express");
const router = express.Router();

const activitiesController = require("../controllers/activities.controller");
router.route("/").get(activitiesController.findAll);
router.route("/:id").get(activitiesController.findOne);
//   .put(activitiesController.bodyValidator, activitiesController.update);

router.all("*", (req, res) => {
  res.status(404).json({ message: "what???" });
});

module.exports = router;
