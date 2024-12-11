const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const path = require('path');

dotenv.config();
console.log('MONGO_URI:', process.env.MONGO_URI); //verify the MONGO_URI
console.log('JWT_SECRET:', process.env.JWT_SECRET); //verify the JWT_SECRET

const app = express();
app.use(express.json());

// Configure CORS
app.use(cors({
  origin: ['http://localhost:3000', 'https://queuecare.netlify.app'],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));

// Handle CORS preflight requests
app.options('*', cors());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.error(err));

// Routes
app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/admin', require('./routes/adminRoutes'));
app.use('/api/appointments', require('./routes/appointmentRoutes'));

// Serve static files from the React app
app.use(express.static(path.join(__dirname, '../client/build')));

// The "catchall" handler: for any request that doesn't match one above, send back React's index.html file.
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build', 'index.html'));
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

// const express = require('express');
// const mongoose = require('mongoose');
// const dotenv = require('dotenv');
// const cors = require('cors');

// dotenv.config();
// console.log('MONGO_URI:', process.env.MONGO_URI); //verify the MONGO_URI
// console.log('JWT_SECRET:', process.env.JWT_SECRET); //verify the JWT_SECRET

// const app = express();
// app.use(express.json());
// app.use(cors());

// // Connect to MongoDB
// mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
//   .then(() => console.log("MongoDB connected"))
//   .catch(err => console.error(err));

// // Routes
// app.use('/api/users', require('./routes/userRoutes'));
// app.use('/api/admin', require('./routes/adminRoutes'));
// app.use('/api/appointments', require('./routes/appointmentRoutes'));

// // Error handling middleware
// app.use((err, req, res, next) => {
//   console.error(err.stack);
//   res.status(500).send('Something broke!');
// });

// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));