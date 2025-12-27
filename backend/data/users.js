import bcrypt from 'bcryptjs';

const users = [
    {
        name: 'Admin User',
        email: 'admin@example.com',
        password: bcrypt.hashSync('123456', 10),
        isAdmin: true,
    },
    {
        name: 'Avinash Admin',
        username: 'admin123',
        email: 'admin123@oliveedge.com',
        password: bcrypt.hashSync('admin123', 10),
        isAdmin: true,
    },
    {
        name: 'John Doe',
        email: 'john@example.com',
        password: 'password123',
        isAdmin: false,
    },
    {
        name: 'Jane Doe',
        email: 'jane@example.com',
        password: 'password123',
        isAdmin: false,
    },
];

export default users;
