const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const Subscription = require('../models/subscriptionModel');

// Registers a new user and creates an initial subscription based on the selected plan
exports.register = async (req, res) => {
    const { firstName, lastName, username, email, password, confirmPassword, subscriptionType } = req.body;
    if (!firstName || !lastName || !username || !email || !password) {
        return res.status(400).json({ message: "All fields are required" });
    }
    if (password !== confirmPassword) {
        return res.status(400).json({ message: "Passwords do not match" });
    }

    try {
        let user = await User.findOne({ username });
        if (user) {
            return res.status(400).json({ message: "Username already exists" });
        }

        user = new User({
            firstName,
            lastName,
            username,
            email,
            password,
            subscriptionType
        });

        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);

        await user.save();

        const subscription = new Subscription({
            user: user._id,
            type: subscriptionType,
            startDate: new Date(),
            endDate: new Date(new Date().setDate(new Date().getDate() + (subscriptionType === 'free-trial' ? 21 : subscriptionType === '1-year' ? 365 : 730)))
        });

        await subscription.save();

        const payload = { user: { id: user.id } };
        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.status(201).json({
            message: "User registered successfully",
            token
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ message: "Server error" });
    }
};

// Authenticates a user and returns a JWT for accessing protected routes
exports.login = async (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) {
        return res.status(400).json({ message: "Username and password are required" });
    }

    try {
        let user = await User.findOne({ username });
        if (!user) {
            return res.status(400).json({ message: "Invalid Credentials" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid Credentials" });
        }

        const payload = { user: { id: user.id } };
        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.json({ token });
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server error");
    }
};

// Updates user profile information
exports.updateProfile = async (req, res) => {
    const { firstName, lastName, email } = req.body;
    try {
        const updates = { firstName, lastName, email };
        const user = await User.findByIdAndUpdate(req.user.id, updates, { new: true });

        res.json(user);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server error");
    }
};

// Allows a user to reset their password
exports.resetPassword = async (req, res) => {
    const { email, newPassword } = req.body;
    try {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(newPassword, salt);

        const user = await User.findOneAndUpdate({ email }, { password: hashedPassword }, { new: true });
        res.json({ message: 'Password reset successfully' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server error");
    }
};

// Logs out a user (mostly handled client-side by removing the stored token)
exports.logout = (req, res) => {
    res.json({ message: "User logged out successfully" });
};

// Deletes a user's profile from the database
exports.deleteProfile = async (req, res) => {
    try {
        await User.findByIdAndRemove(req.user.id);
        res.json({ message: "User deleted successfully" });
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server error");
    }
};
