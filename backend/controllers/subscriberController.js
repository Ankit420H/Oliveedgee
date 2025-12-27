import asyncHandler from 'express-async-handler';
import Subscriber from '../models/subscriberModel.js';

// @desc    Subscribe to newsletter
// @route   POST /api/subscribers
// @access  Public
const subscribeUser = asyncHandler(async (req, res) => {
    const { email } = req.body;

    const subscriberExists = await Subscriber.findOne({ email });

    if (subscriberExists) {
        res.status(400);
        throw new Error('Comms ID already registered');
    }

    const subscriber = await Subscriber.create({
        email,
    });

    if (subscriber) {
        res.status(201).json({
            _id: subscriber._id,
            email: subscriber.email,
            message: 'Uplink Established'
        });
    } else {
        res.status(400);
        throw new Error('Invalid Comms ID data');
    }
});

export { subscribeUser };
