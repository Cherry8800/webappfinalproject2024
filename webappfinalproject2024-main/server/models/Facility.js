const mongoose = require('mongoose');

const ServiceSchema = new mongoose.Schema({
  name: { type: String, required: true },
  waitTime: { type: Number, required: true }, // in minutes
});

const FacilitySchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  services: [ServiceSchema],
});

module.exports = mongoose.model('Facility', FacilitySchema);
