const express = require("express");
const app = express();
const host = process.env.HOST || "127.0.0.1";
const port = process.env.PORT || 5000;
app.use(express.json());

app.get("/", function (req, res) {
  res.status(200).json({ message: "home" });
});

app.use("/activities", require("./routes/activities.routes.js"));
// app.use("/missions", require("./routes/missions.routes.js"));

app.all("*", function (req, res) {
  res.status(404).json({ message: "WHAT???" });
});
app.listen(port, host, () =>
  console.log(`App listening at http://${host}:${port}/`)
);
