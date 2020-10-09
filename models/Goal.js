const mongoose = require("mongoose");

const goalSchema = new mongoose.Schema({
  author: String,
  against: String,
  minute: Number,
});

module.exports = goalSchema;
