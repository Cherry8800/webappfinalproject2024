const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const { 
  registerUser, 
  loginUser, 
  getUserProfile, 
  updateUserProfile, 
  getAppointments, 
  getFacilities, 
  signup 
} = require('../controllers/userController');

// User Routes
router.post('/register', registerUser); // Register a new user
router.post('/login', loginUser); // User login
router.post('/signup', signup); // Alternative registration
router.get('/profile', protect, getUserProfile); // Fetch user profile
router.put('/profile', protect, updateUserProfile); // Update user profile
router.get('/appointments', protect, getAppointments); // Get user appointments
router.get('/facilities', protect, getFacilities); // Fetch facilities

module.exports = router;
