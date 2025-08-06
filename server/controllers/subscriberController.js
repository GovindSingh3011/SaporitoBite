const Subscriber = require('../models/Subscriber');

exports.getSubscribers = async (req, res) => {
    try {
        const subscribers = await Subscriber.find({}, '-__v -createdAt -updatedAt');
        res.json({ success: true, subscribers });
    } catch (err) {
        res.status(500).json({ success: false, message: 'Server error', error: err.message });
    }
};

exports.addSubscriber = async (req, res) => {
    const { name, email } = req.body;
    if (!name || !email) {
        return res.status(400).json({ success: false, message: 'Name and email are required.' });
    }
    try {
        const existing = await Subscriber.findOne({ email });
        if (existing) {
            return res.status(409).json({ success: false, message: 'Email already subscribed.' });
        }
        const subscriber = await Subscriber.create({ name, email });
        res.status(201).json({ success: true, subscriber });
    } catch (err) {
        res.status(500).json({ success: false, message: 'Server error', error: err.message });
    }
};

exports.deleteSubscriber = async (req, res) => {
    const { email } = req.body;
    if (!email) {
        return res.status(400).json({ success: false, message: 'Email is required.' });
    }
    try {
        const deleted = await Subscriber.findOneAndDelete({ email });
        if (!deleted) {
            return res.status(404).json({ success: false, message: 'Subscriber not found.' });
        }
        res.json({ success: true, message: 'Subscriber deleted.' });
    } catch (err) {
        res.status(500).json({ success: false, message: 'Server error', error: err.message });
    }
};
