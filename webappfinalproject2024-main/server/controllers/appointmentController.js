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

const updateAppointment = async (req, res) => {
  const { appointmentDate } = req.body;

  try {
    const appointment = await Appointment.findById(req.params.appointmentId);
    if (!appointment) {
      return res.status(404).json({ message: 'Appointment not found' });
    }

    appointment.appointmentDate = appointmentDate;
    const updatedAppointment = await appointment.save();
    res.status(200).json(updatedAppointment);
  } catch (error) {
    res.status(400).json({ message: 'Error updating appointment', error });
  }
};

const deleteAppointment = async (req, res) => {
  try {
    const appointment = await Appointment.findById(req.params.appointmentId);
    if (!appointment) {
      return res.status(404).json({ message: 'Appointment not found' });
    }

    // Use findByIdAndDelete to remove the appointment
    await Appointment.findByIdAndDelete(req.params.appointmentId);
    res.status(200).json({ message: 'Appointment deleted' });
  } catch (error) {
    console.error('Error deleting appointment:', error.message);
    res.status(400).json({ message: 'Error deleting appointment', error: error.message });
  }
};



module.exports = { bookAppointment, getAppointments, updateAppointment, deleteAppointment };


module.exports = { bookAppointment, getAppointments, updateAppointment, deleteAppointment };
