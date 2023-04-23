const express = require("express");
const router = express.Router();

const activitiesController = require("../controllers/activities.controller");
router.route("/").get(activitiesController.findAll);
router.route("/:activityID").get(activitiesController.findOne);

router
  .route("/:activityID/users/:userID")
  .put(activitiesController.bodyValidator, activitiesController.subscribe);

router.route("/themes/:themeID").get(activitiesController.filter);
//   .put(activitiesController.bodyValidator, activitiesController.update);

router.all("*", (req, res) => {
  res.status(404).json({ message: "what???" });
});

module.exports = router;
