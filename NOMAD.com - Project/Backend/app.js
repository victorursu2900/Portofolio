const dotenv = require('dotenv');
// Load environment variables from .env file
const result = dotenv.config();

if (result.error) {
    console.error('Error loading .env file:', result.error);
} else {
    console.log('Loaded .env file:', result.parsed);
}

console.log("JWT Secret:", process.env.JWT_SECRET);  // Add this line to check if JWT_SECRET is loaded

const express = require('express');
require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const passport = require('passport');

// Import database configuration and connect
const connectDB = require('./config/database');
connectDB();

// Initialize Express application
const app = express();

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
app.use(helmet());

// Import models
require('./models/userModel');  // Ensures UserModel is loaded into Mongoose before being used
require('./models/subscriptionModel');  // Similar for other models as needed

// Passport Config - Make sure this comes after your model imports
require('./config/passport')(passport);
app.use(passport.initialize());

// Import routes
const usersRoutes = require('./routes/userRoutes');
const subscriptionRoutes = require('./routes/subscriptionRoutes');

// Use Routes
app.use('/api/users', usersRoutes);
app.use('/api/subscriptions', subscriptionRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

// Server setup
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
