const Subscription = require('../models/subscriptionModel');

// Subscribes a user to a new plan
exports.subscribe = async (req, res) => {
    const { type } = req.body;  // Expect 'free-trial', '1-year', or '2-year'
    try {
        const subscription = new Subscription({
            user: req.user.id,
            type,
            startDate: new Date(),
            endDate: new Date(new Date().setDate(new Date().getDate() + (type === 'free-trial' ? 21 : type === '1-year' ? 365 : 730)))
        });

        await subscription.save();
        res.status(201).json({ message: 'Subscription added successfully' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server error");
    }
};

// Updates an existing subscription plan
exports.updateSubscription = async (req, res) => {
    const { type } = req.body;
    try {
        const subscription = await Subscription.findOneAndUpdate({ user: req.user.id }, {
            type,
            startDate: new Date(),
            endDate: new Date(new Date().setDate(new Date().getDate() + (type === '1-year' ? 365 : 730)))
        }, { new: true });

        res.json(subscription);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server error");
    }
};

// Cancels an existing subscription
exports.cancelSubscription = async (req, res) => {
    try {
        await Subscription.findOneAndDelete({ user: req.user.id });
        res.json({ message: 'Subscription cancelled successfully' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server error");
    }
};
