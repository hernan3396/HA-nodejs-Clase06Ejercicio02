const mongoose = require("mongoose");
const goalSchema = require("./Goal.js");

const teamSchema = new mongoose.Schema({
  code: String,
  name: String,
  flag: String,
  goals: [goalSchema],
});

const Team = mongoose.model("Team", teamSchema);

module.exports = Team;
