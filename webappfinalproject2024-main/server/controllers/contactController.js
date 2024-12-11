// server/controllers/contactFormController.js
const ContactForm = require('../models/ContactForm');

// Handle form submission
exports.submitContactForm = async (req, res) => {
  try {
    const { name, email, message } = req.body;

    // Validate input
    if (!name || !email || !message) {
      return res.status(400).json({ error: 'All fields are required.' });
    }

    // Save form to database
    const newForm = new ContactForm({
      user: req.user._id, // Assumes user info is added to req by authentication middleware
      name,
      email,
      message,
    });

    await newForm.save();
    res.status(201).json({ message: 'Form submitted successfully.' });
  } catch (error) {
    res.status(500).json({ error: 'Server error.' });
  }
};

// Get all contact forms (admin only)
exports.getAllContactForms = async (req, res) => {
  try {
    const forms = await ContactForm.find().populate('user', 'name email'); // Populate user details
    res.status(200).json(forms);
  } catch (error) {
    res.status(500).json({ error: 'Server error.' });
  }
};

// Delete a specific contact form (admin only)
exports.deleteContactForm = async (req, res) => {
  try {
    const { id } = req.params;

    const form = await ContactForm.findById(id);
    if (!form) {
        return res.status(404).json({ error: 'Form not found.' });
    }

    await form.remove();
    res.status(200).json({ message: 'Form deleted successfully.' });
  } catch (error) {
    res.status(500).json({ error: 'Server error.' });
  }
};