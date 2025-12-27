import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from '../models/userModel.js';
import connectDB from '../config/db.js';

dotenv.config();
connectDB();

const ensureAdmin = async () => {
    try {
        const email = 'admin@oliveedge.com';
        const password = 'password123';

        let user = await User.findOne({ email });

        if (user) {
            user.password = password;
            user.isAdmin = true;
            await user.save();
            console.log('Admin user updated:', email);
        } else {
            user = await User.create({
                name: 'System Admin',
                email,
                password,
                isAdmin: true
            });
            console.log('Admin user created:', email);
        }

        console.log('Credentials:');
        console.log('Email:', email);
        console.log('Password:', password);
        process.exit();
    } catch (error) {
        console.error('Error:', error);
        process.exit(1);
    }
};

ensureAdmin();
