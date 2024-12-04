const express = require('express');
const router = express.Router();
const { protect, admin } = require('../middleware/authMiddleware');
const { getUserList, addAdminService, getFacilities } = require('../controllers/adminController');

// Admin Routes
router.get('/users', protect, admin, getUserList); // Fetch user list
router.post('/services', protect, admin, addAdminService); // Add facility and services
router.get('/services', protect, admin, getFacilities); // Fetch list of facilities

module.exports = router;