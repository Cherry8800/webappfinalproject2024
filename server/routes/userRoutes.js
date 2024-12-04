const express = require('express');
const router = express.Router();
const { registerUser, loginUser, getUserProfile, getAppointments } = require('../controllers/userController');
const { protect } = require('../middleware/authMiddleware');

router.post('/signup', registerUser);
router.post('/login', loginUser);
router.get('/profile', protect, getUserProfile);
router.get('/appointments', protect, getAppointments);

module.exports = router;