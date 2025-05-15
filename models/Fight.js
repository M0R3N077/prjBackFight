const mongoose = require('mongoose');

const fightSchema = new mongoose.Schema({
  name: { type: String, required: true },
  location: {
    lat: Number,
    lng: Number
  },
  history: String,
  rules: String,
  image: String,
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Fight', fightSchema);
