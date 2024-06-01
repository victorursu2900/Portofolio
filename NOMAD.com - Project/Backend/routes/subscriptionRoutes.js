const express = require('express');
const router = express.Router();
const passport = require('passport');
const subscriptionController = require('../controllers/subscriptionController');

// Subscribe to a plan
router.post('/subscribe', passport.authenticate('jwt', { session: false }), subscriptionController.subscribe);

// Update subscription plan
router.put('/update', passport.authenticate('jwt', { session: false }), subscriptionController.updateSubscription);

// Cancel subscription
router.delete('/cancel', passport.authenticate('jwt', { session: false }), subscriptionController.cancelSubscription);

module.exports = router;
