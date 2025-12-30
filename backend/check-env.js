import dotenv from 'dotenv';
import colors from 'colors';
import fs from 'fs';
import path from 'path';

// Load .env from root
const envPath = path.resolve(process.cwd(), '.env');
if (fs.existsSync(envPath)) {
    dotenv.config({ path: envPath });
    console.log(`Loaded .env from ${envPath}`.green);
} else {
    console.log('No .env file found in root!'.red);
}

const requiredVars = [
    'NODE_ENV',
    'PORT',
    'MONGODB_URI',
    'JWT_SECRET',
    'PAYPAL_CLIENT_ID', // Optional, but good to check
    'RAZORPAY_KEY_ID',
    'RAZORPAY_KEY_SECRET',
    'CLOUDINARY_CLOUD_NAME',
    'CLOUDINARY_API_KEY',
    'CLOUDINARY_API_SECRET',
    'EMAIL_HOST',
    'EMAIL_PORT',
    'EMAIL_USER',
    'EMAIL_PASS',
    'BACKEND_URL'
];

console.log('\nChecking Environment Variables...'.cyan.bold);

let missing = [];

requiredVars.forEach(key => {
    if (!process.env[key]) {
        console.log(`❌ ${key} is MISSING`.red);
        missing.push(key);
    } else {
        // Obfuscate secret values
        const value = process.env[key];
        const display = key.includes('KEY') || key.includes('SECRET') || key.includes('PASS') || key.includes('URI')
            ? `${value.substring(0, 4)}...${value.substring(value.length - 4)}`
            : value;

        console.log(`✅ ${key}: ${display}`.green);
    }
});

console.log('\n-----------------------------------');
if (missing.length > 0) {
    console.log(`⚠️  ${missing.length} Missing Variables. App may not function correctly.`.yellow.bold);
    process.exit(1);
} else {
    console.log('🚀 All checked variables are present! Ready for launch.'.green.bold);
    process.exit(0);
}
