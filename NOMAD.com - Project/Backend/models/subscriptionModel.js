const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define the Subscription Schema
const SubscriptionSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    type: {
        type: String,
        enum: ['Free Trial', '1 Year', '2 Year'],
        required: true
    },
    startDate: {
        type: Date,
        required: true
    },
    endDate: {
        type: Date,
        required: true
    }
}, { timestamps: true });

module.exports = mongoose.model('Subscription', SubscriptionSchema);
