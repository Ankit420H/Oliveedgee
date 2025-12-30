import { Product } from '../product/types';

export interface CartItem {
    product: string;
    name: string;
    image: string;
    price: number;
    countInStock: number;
    qty: number;
    size?: string;
}

export interface ShippingAddress {
    address?: string;
    city?: string;
    postalCode?: string;
    country?: string;
}

export interface CartContextType {
    cartItems: CartItem[];
    addToCart: (product: Product, qty: number, size?: string) => void;
    removeFromCart: (id: string) => void;
    clearCart: () => void;
    shippingAddress: ShippingAddress;
    saveShippingAddress: (data: ShippingAddress) => void;
    paymentMethod: string;
    savePaymentMethod: (data: string) => void;
}
