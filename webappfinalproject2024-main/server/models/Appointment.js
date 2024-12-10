const mongoose = require('mongoose');

const AppointmentSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  facilityName: { type: String, required: true },
  serviceName: { type: String, required: true },
  appointmentDate: { type: Date, required: true },
  waitTime: { type: Number, required: true },
});

module.exports = mongoose.model('Appointment', AppointmentSchema);