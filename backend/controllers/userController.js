import asyncHandler from 'express-async-handler';
import generateToken from '../utils/generateToken.js';
import User from '../models/userModel.js';
import Product from '../models/productModel.js';

// @desc    Auth user & get token
// @route   POST /api/users/login
// @access  Public
const authUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    // Allow login with email OR username (req.body.email can contain username)
    const user = await User.findOne({
        $or: [
            { email: email },
            { username: email }
        ]
    });

    if (user && (await user.matchPassword(password))) {
        res.json({
            _id: user._id,
            name: user.name,
            username: user.username,
            email: user.email,
            isAdmin: user.isAdmin,
            token: generateToken(user._id),
        });
    } else {
        res.status(401);
        throw new Error('Invalid email/username or password');
    }
});

// @desc    Register a new user
// @route   POST /api/users
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body;

    const userExists = await User.findOne({ email });

    if (userExists) {
        res.status(400);
        throw new Error('User already exists');
    }

    const user = await User.create({
        name,
        email,
        password,
    });

    if (user) {
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token: generateToken(user._id),
        });
    } else {
        res.status(400);
        throw new Error('Invalid user data');
    }
});

// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private
const getUserProfile = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);

    if (user) {
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
        });
    } else {
        res.status(404);
        throw new Error('User not found');
    }
});

// @desc    Update user profile
// @route   PUT /api/users/profile
// @access  Private
const updateUserProfile = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);

    if (user) {
        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email;
        if (req.body.password) {
            user.password = req.body.password;
        }

        const updatedUser = await user.save();

        res.json({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            isAdmin: updatedUser.isAdmin,
            token: generateToken(updatedUser._id),
        });
    } else {
        res.status(404);
        throw new Error('User not found');
    }
});

// @desc    Update user addresses
// @route   PUT /api/users/profile/address
// @access  Private
const updateUserAddresses = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);

    if (user) {
        if (req.body.addresses) {
            user.addresses = req.body.addresses;
        }

        const updatedUser = await user.save();

        res.json({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            isAdmin: updatedUser.isAdmin,
            addresses: updatedUser.addresses,
            token: generateToken(updatedUser._id),
        });
    } else {
        res.status(404);
        throw new Error('User not found');
    }
});

// @desc    Get user reviews
// @route   GET /api/users/reviews
// @access  Private
const getUserReviews = asyncHandler(async (req, res) => {
    // Find all products that have a review by this user
    const products = await Product.find({ 'reviews.user': req.user._id });

    // Reduce to a flat list of user's reviews
    const userReviews = products.reduce((acc, product) => {
        const productReviews = product.reviews.filter(
            (review) => review.user.toString() === req.user._id.toString()
        );

        const reviewWithProductData = productReviews.map((review) => ({
            _id: review._id,
            rating: review.rating,
            comment: review.comment,
            createdAt: review.createdAt,
            productId: product._id,
            productName: product.name,
            productImage: product.image,
        }));

        return [...acc, ...reviewWithProductData];
    }, []);

    res.json(userReviews);
});

// @desc    Get all users
// @route   GET /api/users
// @access  Private/Admin
const getUsers = asyncHandler(async (req, res) => {
    const users = await User.find({});
    res.json(users);
});

// @desc    Delete user
// @route   DELETE /api/users/:id
// @access  Private/Admin
const deleteUser = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);

    if (user) {
        await user.deleteOne();
        res.json({ message: 'User removed' });
    } else {
        res.status(404);
        throw new Error('User not found');
    }
});

// @desc    Get user by ID
// @route   GET /api/users/:id
// @access  Private/Admin
const getUserById = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id).select('-password');

    if (user) {
        res.json(user);
    } else {
        res.status(404);
        throw new Error('User not found');
    }
});

// @desc    Update user
// @route   PUT /api/users/:id
// @access  Private/Admin
const updateUser = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);

    if (user) {
        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email;
        user.isAdmin = req.body.isAdmin !== undefined ? req.body.isAdmin : user.isAdmin;

        const updatedUser = await user.save();

        res.json({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            isAdmin: updatedUser.isAdmin,
        });
    } else {
        res.status(404);
        throw new Error('User not found');
    }
});

import { sendWelcomeEmail } from '../utils/emailService.js';

// @desc    Send OTP to phone (Phone-only flow)
// @route   POST /api/users/send-otp
// @access  Public
const sendOtp = asyncHandler(async (req, res) => {
    const { phone } = req.body;

    if (!phone) {
        res.status(400);
        throw new Error('Please provide a phone number');
    }

    // Generate a 6-digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    // Check if user exists by phone
    let user = await User.findOne({ phone });

    if (!user) {
        // Create a new user with placeholder details
        user = await User.create({
            name: 'New Recruit', // Placeholder name
            email: `${phone}@oliveedge.com`, // Placeholder email
            phone,
            password: 'otp-login-placeholder',
            otp
        });
    } else {
        // Update existing user with new OTP
        user.otp = otp;
        await user.save();
    }

    // Simulate sending SMS
    // In production, this would call an external SMS API

    res.status(200).json({ message: 'OTP sent successfully', phone });
});

// @desc    Verify OTP and Login
// @route   POST /api/users/verify-otp
// @access  Public
const verifyOtp = asyncHandler(async (req, res) => {
    const { phone, otp } = req.body;

    const user = await User.findOne({ phone });

    if (user && user.otp === otp) {
        // Clear OTP after successful login
        user.otp = undefined;
        await user.save();

        // Send Welcome Email if it's a new user (optional, or every time)
        // await sendWelcomeEmail(user.email, user.name);

        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            phone: user.phone,
            isAdmin: user.isAdmin,
            token: generateToken(user._id),
        });
    } else {
        res.status(401);
        throw new Error('Invalid OTP');
    }
});

export {
    authUser,
    registerUser,
    getUserProfile,
    updateUserProfile,
    updateUserAddresses,
    getUsers,
    deleteUser,
    getUserById,
    updateUser,
    sendOtp,
    verifyOtp,
    getUserReviews,
};
