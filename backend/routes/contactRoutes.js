import express from 'express';
const router = express.Router();
import asyncHandler from 'express-async-handler';

// @desc    Submit contact form
// @route   POST /api/contact
// @access  Public
const submitContactForm = asyncHandler(async (req, res) => {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
        res.status(400);
        throw new Error('Please provide all required fields');
    }

    // Log the contact form submission
    console.log('Contact Form Submission:', { name, email, message, timestamp: new Date() });

    // In a real application, you would:
    // 1. Save to database
    // 2. Send email notification to admin
    // 3. Send confirmation email to user

    res.status(201).json({
        message: 'Contact form submitted successfully. We will get back to you soon!'
    });
});

router.post('/', submitContactForm);

export default router;
