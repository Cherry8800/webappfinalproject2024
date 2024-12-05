const express = require('express');
const router = express.Router();
const { protect, admin } = require('../middleware/authMiddleware');
const { getUserList, addUser, updateUser, addAdminService, getFacilities, deleteUser, getUserById, updateFacility, deleteService, deleteFacility } = require('../controllers/adminController');

// Admin Routes
router.get('/users', protect, admin, getUserList); // Fetch user list
router.get('/users/:id', protect, admin, getUserById); // Fetch user by ID
router.post('/users', protect, admin, addUser); // Add a new user
router.put('/users/:id', protect, admin, updateUser); // Update a user
router.delete('/users/:id', protect, admin, deleteUser); // Delete a user
router.post('/services', protect, admin, addAdminService); // Add facility and services
router.get('/services', protect, admin, getFacilities); // Fetch list of facilities
router.put('/services/:id', protect, admin, updateFacility); // Update a facility and its services
router.delete('/services/:facilityId/services/:serviceId', protect, admin, deleteService); // Delete a service from a facility
router.delete('/services/:id', protect, admin, deleteFacility); // Delete a facility

module.exports = router;

// const express = require('express');
// const router = express.Router();
// const { protect, admin } = require('../middleware/authMiddleware');
// const { getUserList, addUser, updateUser, addAdminService, getFacilities, deleteUser, getUserById, updateFacility, deleteService } = require('../controllers/adminController');

// // Admin Routes
// router.get('/users', protect, admin, getUserList); // Fetch user list
// router.get('/users/:id', protect, admin, getUserById); // Fetch user by ID
// router.post('/users', protect, admin, addUser); // Add a new user
// router.put('/users/:id', protect, admin, updateUser); // Update a user
// router.delete('/users/:id', protect, admin, deleteUser); // Delete a user
// router.post('/services', protect, admin, addAdminService); // Add facility and services
// router.get('/services', protect, admin, getFacilities); // Fetch list of facilities
// router.put('/services/:id', protect, admin, updateFacility); // Update a facility and its services
// router.delete('/services/:facilityId/services/:serviceId', protect, admin, deleteService); // Delete a service from a facility

// module.exports = router;

// const express = require('express');
// const router = express.Router();
// const { protect, admin } = require('../middleware/authMiddleware');
// const { getUserList, addUser, updateUser, addAdminService, getFacilities, deleteUser, getUserById, updateFacility } = require('../controllers/adminController');

// // Admin Routes
// router.get('/users', protect, admin, getUserList); // Fetch user list
// router.get('/users/:id', protect, admin, getUserById); // Fetch user by ID
// router.post('/users', protect, admin, addUser); // Add a new user
// router.put('/users/:id', protect, admin, updateUser); // Update a user
// router.delete('/users/:id', protect, admin, deleteUser); // Delete a user
// router.post('/services', protect, admin, addAdminService); // Add facility and services
// router.get('/services', protect, admin, getFacilities); // Fetch list of facilities
// router.put('/services/:id', protect, admin, updateFacility); // Update a facility and its services

// module.exports = router;

// const express = require('express');
// const router = express.Router();
// const { protect, admin } = require('../middleware/authMiddleware');
// const { getUserList, addUser, updateUser, addAdminService, getFacilities, deleteUser, getUserById } = require('../controllers/adminController');

// // Admin Routes
// router.get('/users', protect, admin, getUserList); // Fetch user list
// router.get('/users/:id', protect, admin, getUserById); // Fetch user by ID
// router.post('/users', protect, admin, addUser); // Add a new user
// router.put('/users/:id', protect, admin, updateUser); // Update a user
// router.delete('/users/:id', protect, admin, deleteUser); // Delete a user
// router.post('/services', protect, admin, addAdminService); // Add facility and services
// router.get('/services', protect, admin, getFacilities); // Fetch list of facilities

// module.exports = router;

