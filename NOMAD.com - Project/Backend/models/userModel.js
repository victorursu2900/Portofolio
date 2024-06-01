const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Check if the model is already compiled
const User = mongoose.models.User || mongoose.model('User', new Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    subscriptionType: {
        type: String,
        enum: ['Free Trial', '1 Year', '2 Year'],
        required: true
    }
}, { timestamps: true }));

module.exports = User;
