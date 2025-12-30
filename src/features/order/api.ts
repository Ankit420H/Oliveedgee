import api from '../../lib/api';
import { Order, OrderAnalytics, PaymentResult } from './types';

export const createOrder = async (order: Partial<Order>): Promise<Order> => {
    const { data } = await api.post('/api/orders', order);
    return data;
};

export const getOrderDetails = async (id: string): Promise<Order> => {
    const { data } = await api.get(`/api/orders/${id}`);
    return data;
};

export const payOrder = async (id: string, paymentResult: PaymentResult): Promise<Order> => {
    const { data } = await api.put(`/api/orders/${id}/pay`, paymentResult);
    return data;
};

export const deliverOrder = async (id: string): Promise<Order> => {
    const { data } = await api.put(`/api/orders/${id}/deliver`);
    return data;
};

export const listMyOrders = async (): Promise<Order[]> => {
    const { data } = await api.get('/api/orders/myorders');
    return data;
};

export const listOrders = async (): Promise<Order[]> => {
    const { data } = await api.get('/api/orders');
    return data;
};

export const getOrderAnalytics = async (): Promise<OrderAnalytics[]> => {
    const { data } = await api.get('/api/orders/analytics');
    return data;
};

export const cancelOrder = async (id: string): Promise<Order> => {
    const { data } = await api.put(`/api/orders/${id}/cancel`);
    return data;
};

export const requestReturn = async (id: string): Promise<Order> => {
    const { data } = await api.put(`/api/orders/${id}/return`);
    return data;
};
