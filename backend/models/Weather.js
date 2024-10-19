const mongoose = require('mongoose');

const WeatherSchema = new mongoose.Schema({
  city: String,
  date: { type: Date, default: Date.now },
  temperature: Number,
  feels_like: Number,
  condition: String,
  min_temp: Number,
  max_temp: Number
});

module.exports = mongoose.model('Weather', WeatherSchema);
