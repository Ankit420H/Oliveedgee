'use client';

import { createContext, useState, useEffect, ReactNode } from 'react';
import { loginUser, registerUser } from '../api';
import { User, AuthContextType } from '../types';
import { getErrorMessage } from '../../../lib/error-utils';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
    children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const initAuth = async () => {
            // Force async to avoid synchronous setState lint warning
            await Promise.resolve();
            const userInfo = localStorage.getItem('userInfo');
            if (userInfo) {
                try {
                    setUser(JSON.parse(userInfo));
                } catch (err: unknown) {
                    console.error('Failed to parse user info from localStorage:', getErrorMessage(err));
                    localStorage.removeItem('userInfo');
                }
            }
            setLoading(false);
        };
        initAuth();
    }, []);

    const login = async (email: string, password: string) => {
        try {
            const data = await loginUser(email, password);
            setUser(data);
            localStorage.setItem('userInfo', JSON.stringify(data));
            return data;
        } catch (err: unknown) {
            throw getErrorMessage(err);
        }
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('userInfo');
    };

    const register = async (name: string, email: string, password: string) => {
        try {
            const data = await registerUser(name, email, password);
            setUser(data);
            localStorage.setItem('userInfo', JSON.stringify(data));
        } catch (err: unknown) {
            throw getErrorMessage(err);
        }
    };

    const updateProfile = (updatedUser: User) => {
        setUser(updatedUser);
        localStorage.setItem('userInfo', JSON.stringify(updatedUser));
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, register, updateProfile, loading }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;
