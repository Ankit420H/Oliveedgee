import { createContext, useState } from 'react';
import api from '../lib/api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(() => {
        const userInfo = localStorage.getItem('userInfo');
        return userInfo ? JSON.parse(userInfo) : null;
    });


    const login = async (email, password) => {
        try {
            const { data } = await api.post('/api/users/login', {
                email,
                password,
            });
            setUser(data);
            localStorage.setItem('userInfo', JSON.stringify(data));
            return data;
        } catch (error) {
            throw error.response && error.response.data.message
                ? error.response.data.message
                : error.message;
        }
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('userInfo');
    };

    const register = async (name, email, password) => {
        try {
            const { data } = await api.post('/api/users', {
                name,
                email,
                password,
            });
            setUser(data);
            localStorage.setItem('userInfo', JSON.stringify(data));
            return data;
        } catch (error) {
            throw error.response && error.response.data.message
                ? error.response.data.message
                : error.message;
        }
    };

    const updateProfile = (updatedUser) => {
        setUser(updatedUser);
        localStorage.setItem('userInfo', JSON.stringify(updatedUser));
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, register, updateProfile }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;
