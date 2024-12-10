const bcrypt = require('bcryptjs');
const User = require('../models/User');
const Facility = require('../models/Facility'); // Create a model for Facility

// Fetch list of users
const getUserList = async (req, res) => {
  try {
    const users = await User.find().select('name email role');
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Add a new user with hashed password
const addUser = async (req, res) => {
  const { name, email, password, role } = req.body;

  try {
    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create a new user with the hashed password and role
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      role, // Include the role
    });

    // Save the user to the database
    await newUser.save();

    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Update user details
const updateUser = async (req, res) => {
  const { name, email, role } = req.body;

  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    user.name = name || user.name;
    user.email = email || user.email;
    user.role = role || user.role;

    await user.save();

    res.json(user);
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

// Update a facility and its services
const updateFacility = async (req, res) => {
  const { name, services } = req.body;
  try {
    const facility = await Facility.findById(req.params.id);
    if (!facility) {
      return res.status(404).json({ message: 'Facility not found' });
    }

    facility.name = name || facility.name;
    facility.services = services || facility.services;

    await facility.save();

    res.json(facility);
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

// Delete a user
const deleteUser = async (req, res) => {
  try {
    console.log('Deleting user with ID:', req.params.id); // Log the user ID
    const user = await User.findById(req.params.id);
    if (!user) {
      console.log('User not found');
      return res.status(404).json({ message: 'User not found' });
    }
    await user.deleteOne(); 
    console.log('User removed successfully');
    res.json({ message: 'User removed' });
  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Fetch user by ID
const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('name email role');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Delete a service from a facility
const deleteService = async (req, res) => {
  const { facilityId, serviceId } = req.params;
  try {
    const facility = await Facility.findById(facilityId);
    if (!facility) {
      return res.status(404).json({ message: 'Facility not found' });
    }

    facility.services = facility.services.filter(service => service._id.toString() !== serviceId);
    await facility.save();

    res.json({ message: 'Service deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Delete a facility
const deleteFacility = async (req, res) => {
  try {
    const facility = await Facility.findById(req.params.id);
    if (!facility) {
      return res.status(404).json({ message: 'Facility not found' });
    }
    await facility.deleteOne();
    res.json({ message: 'Facility deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { getUserList, addUser, updateUser, addAdminService, updateFacility, getFacilities, deleteUser, getUserById, deleteService, deleteFacility };
