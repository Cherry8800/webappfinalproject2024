// server/routes/contactFormRoutes.js
const express = require('express');
const router = express.Router();
const { submitContactForm, getAllContactForms, deleteContactForm } = require('../controllers/contactFormController');
const { protect, admin } = require('../middleware/authMiddleware');

// Route for users to submit a contact form
router.post('/submit', protect, submitContactForm);

// Route for admin to get all submitted forms
router.get('/', protect, admin, getAllContactForms);

// Route for admin to delete a form by ID
router.delete('/:id', protect, admin, deleteContactForm);

module.exports = router;
