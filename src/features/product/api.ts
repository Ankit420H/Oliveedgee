import api from '../../lib/api';
import { Product } from './types';

export const fetchProducts = async (limit = 12, page = 1) => {
    const { data } = await api.get(`/api/products?limit=${limit}&page=${page}`);
    return data;
};

export const fetchProductById = async (id: string): Promise<Product> => {
    const { data } = await api.get(`/api/products/${id}`);
    return data;
};

export const fetchRelatedProducts = async (id: string): Promise<Product[]> => {
    const { data } = await api.get(`/api/products/${id}/related`);
    return data;
};

export const createReview = async (productId: string, rating: number, comment: string) => {
    const { data } = await api.post(`/api/products/${productId}/reviews`, { rating, comment });
    return data;
};

export const deleteProduct = async (id: string) => {
    const { data } = await api.delete(`/api/products/${id}`);
    return data;
};

export const createProduct = async (productData: Partial<Product>) => {
    const { data } = await api.post('/api/products', productData);
    return data;
};

export const updateProduct = async (id: string, productData: Partial<Product>) => {
    const { data } = await api.put(`/api/products/${id}`, productData);
    return data;
};
