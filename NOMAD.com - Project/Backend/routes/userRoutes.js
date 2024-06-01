const express = require('express');
const router = express.Router();
const passport = require('passport');
const userController = require('../controllers/userController');

// User registration, expects a subscription plan to be chosen during registration
router.post('/register', userController.register);

// User login
router.post('/login', userController.login);

// Update user profile
router.put('/update', passport.authenticate('jwt', { session: false }), userController.updateProfile);

// Reset password
router.post('/reset-password', userController.resetPassword);

// User logout
router.get('/logout', userController.logout);

// Delete user profile
router.delete('/delete', passport.authenticate('jwt', { session: false }), userController.deleteProfile);

module.exports = router;
