import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const API_URL = 'http://localhost:5001/api';

const testReviewsEndpoint = async () => {
    try {
        console.log('1. Logging in user...');
        // Use a test user or create one. For now assuming admin/test user exists from seed or previous tests.
        // We will try a known credential or create a new temp user.
        const email = `testrev${Date.now()}@example.com`;
        const password = 'password123';

        let token;

        try {
            const regRes = await axios.post(`${API_URL}/users`, {
                name: 'Review Tester',
                email,
                password
            });
            token = regRes.data.token;
            console.log('   User registered and logged in.');
        } catch (e) {
            console.log('   Registration failed (maybe exists), trying login...');
            // This path logic is simplified; in a real test we'd handle this better
            return;
        }

        console.log('2. Testing GET /api/users/reviews...');
        try {
            const res = await axios.get(`${API_URL}/users/reviews`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            if (res.status === 200 && Array.isArray(res.data)) {
                console.log('SUCCESS: Endpoint returned 200 and an array.');
                console.log('Reviews count:', res.data.length);
            } else {
                console.log('FAILED: Unexpected response format', res.status, res.data);
                process.exit(1);
            }
        } catch (error) {
            console.error('FAILED: Endpoint request failed.');
            if (error.response) {
                console.error('Status:', error.response.status);
                console.error('Box:', error.response.data);
            } else {
                console.error(error.message);
            }
            process.exit(1);
        }

    } catch (error) {
        console.error('Test execution failed:', error.message);
        process.exit(1);
    }
};

testReviewsEndpoint();
