const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const { registerUser, loginUser, getUserProfile, updateUserProfile, getAppointments, getFacilities } = require('../controllers/userController');

// User Routes
router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/profile', protect, getUserProfile);
router.put('/profile', protect, updateUserProfile);
router.get('/appointments', protect, getAppointments);
router.get('/facilities', protect, getFacilities); // Protected route to fetch facilities and services

module.exports = router;

// const express = require('express');
// const router = express.Router();
// const { registerUser, loginUser, getUserProfile, getAppointments } = require('../controllers/userController');
// const { protect } = require('../middleware/authMiddleware');

// router.post('/signup', registerUser);
// router.post('/login', loginUser);
// router.get('/profile', protect, getUserProfile);
// router.get('/appointments', protect, getAppointments);

// module.exports = router;