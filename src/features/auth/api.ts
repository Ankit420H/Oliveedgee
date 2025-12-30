import api from '../../lib/api';
import { User } from './types';

export const loginUser = async (email: string, password: string): Promise<User> => {
    const { data } = await api.post('/api/users/login', { email, password });
    return data;
};

export const registerUser = async (name: string, email: string, password: string): Promise<User> => {
    const { data } = await api.post('/api/users', { name, email, password });
    return data;
};

export const getUserProfile = async (): Promise<User> => {
    const { data } = await api.get('/api/users/profile');
    return data;
};

export const updateUserProfile = async (userData: Partial<User>): Promise<User> => {
    const { data } = await api.put('/api/users/profile', userData);
    return data;
};
