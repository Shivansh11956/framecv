const mongoose = require("mongoose");

const buildSchema = new mongoose.Schema({
  buildId: {
    type: String,
    unique: true
  },
  portfolioData: {
    type: Object,
    required: true
  }
});

module.exports = mongoose.model("Build", buildSchema);
