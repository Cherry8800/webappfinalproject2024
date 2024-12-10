const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const { registerUser, loginUser, getUserProfile, updateUserProfile, getAppointments, getFacilities, signup } = require('../controllers/userController');

// User Routes
router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/signup', signup);
router.get('/profile', protect, getUserProfile);
router.put('/profile', protect, updateUserProfile);
router.get('/appointments', protect, getAppointments);
router.get('/facilities', protect, getFacilities);

module.exports = router;