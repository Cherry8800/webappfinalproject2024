const User = require('../models/User');
const Facility = require('../models/Facility'); // Create a model for Facility

// Fetch list of users
const getUserList = async (req, res) => {
  try {
    const users = await User.find().select('name email');
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Add a facility and services
const addAdminService = async (req, res) => {
  const { facilityName, services } = req.body;
  try {
    const facility = await Facility.create({ name: facilityName, services });
    res.status(201).json(facility);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Fetch list of facilities
const getFacilities = async (req, res) => {
  try {
    const facilities = await Facility.find();
    res.json(facilities);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { getUserList, addAdminService, getFacilities };