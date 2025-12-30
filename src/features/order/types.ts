import { User } from '../auth/types';
import { Product } from '../product/types';

export interface PaymentResult {
    id: string;
    status: string;
    update_time: string;
    email_address: string;
    razorpay_payment_id?: string;
    razorpay_order_id?: string;
    razorpay_signature?: string;
}

export interface OrderItem {
    name: string;
    qty: number;
    image: string;
    price: number;
    product: string | Product;
    _id?: string;
}

export interface ShippingAddress {
    address: string;
    city: string;
    postalCode: string;
    country: string;
}

export interface Order {
    _id: string;
    user: User;
    orderItems: OrderItem[];
    shippingAddress: ShippingAddress;
    paymentMethod: string;
    paymentResult?: PaymentResult;
    itemsPrice: number;
    taxPrice: number;
    shippingPrice: number;
    totalPrice: number;
    isPaid: boolean;
    paidAt?: string;
    isDelivered: boolean;
    deliveredAt?: string;
    isCancelled?: boolean;
    cancelledAt?: string;
    isReturnRequested?: boolean;
    returnRequestedAt?: string;
    status?: string;
    createdAt: string;
    updatedAt: string;
}

export interface OrderAnalytics {
    _id: string; // date string or similar
    totalSales: number;
}
