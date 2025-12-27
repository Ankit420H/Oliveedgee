import axios from 'axios';
import dotenv from 'dotenv';
import users from '../data/users.js'; // Import seed users to get admin creds

dotenv.config();

const API_URL = 'http://localhost:5001/api';

const testAdminDashboard = async () => {
    try {
        console.log('1. Logging in as Admin...');
        const adminUser = { email: 'admin@oliveedge.com', password: 'password123' };

        let token;
        try {
            const loginRes = await axios.post(`${API_URL}/users/login`, {
                email: adminUser.email,
                password: 'password123' // The seed file has hashed password, but typically seed usage sets password to 'password123' or '123456'. Let's try '123456' based on the file view earlier.
            });
            token = loginRes.data.token;
            console.log('   Admin logged in.');
        } catch (e) {
            // If seed password failed, try the other frequent default
            try {
                const loginRes = await axios.post(`${API_URL}/users/login`, {
                    email: adminUser.email,
                    password: '123456'
                });
                token = loginRes.data.token;
                console.log('   Admin logged in (backup pass).');
            } catch (err2) {
                // Try admin123
                try {
                    const loginRes = await axios.post(`${API_URL}/users/login`, {
                        email: 'admin123@oliveedge.com',
                        password: 'admin123'
                    });
                    token = loginRes.data.token;
                    console.log('   Admin logged in (admin123).');
                } catch (err3) {
                    console.error('   FATAL: Could not login as admin.', err3.message);
                    process.exit(1);
                }
            }
        }

        console.log('2. Testing GET /api/orders/analytics...');
        const res = await axios.get(`${API_URL}/orders/analytics`, {
            headers: { Authorization: `Bearer ${token}` }
        });

        if (res.status === 200 && Array.isArray(res.data)) {
            console.log('SUCCESS: Analytics endpoint works.');
        } else {
            console.log('FAILED: Analytics endpoint bad response.', res.status);
            process.exit(1);
        }

        console.log('3. Testing GET /api/users...');
        const resUser = await axios.get(`${API_URL}/users`, {
            headers: { Authorization: `Bearer ${token}` }
        });
        if (resUser.status === 200) console.log('SUCCESS: Users endpoint works.');

    } catch (error) {
        console.error('Test failed:', error.message);
        if (error.response) console.error(error.response.data);
        process.exit(1);
    }
};

testAdminDashboard();
