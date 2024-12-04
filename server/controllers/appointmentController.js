const Appointment = require('../models/Appointment');

const bookAppointment = async (req, res) => {
  const { facilityName, serviceName, appointmentDate, waitTime } = req.body;

  const appointment = new Appointment({
    userId: req.user._id,
    facilityName,
    serviceName,
    appointmentDate,
    waitTime,
  });

  try {
    const savedAppointment = await appointment.save();
    res.status(201).json(savedAppointment);
  } catch (error) {
    res.status(400).json({ message: 'Error booking appointment', error });
  }
};

const getAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find({ userId: req.user._id });
    res.status(200).json(appointments);
  } catch (error) {
    res.status(400).json({ message: 'Error fetching appointments', error });
  }
};

module.exports = { bookAppointment, getAppointments };