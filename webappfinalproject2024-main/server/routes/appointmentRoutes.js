const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const { bookAppointment, getAppointments, updateAppointment, deleteAppointment } = require('../controllers/appointmentController');

router.post('/', protect, bookAppointment);
router.get('/', protect, getAppointments);
router.put('/:appointmentId', protect, updateAppointment);
router.delete('/:appointmentId', protect, deleteAppointment); 

module.exports = router;
