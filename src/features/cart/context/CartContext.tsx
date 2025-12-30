'use client';

import { createContext, useState, useEffect, ReactNode } from 'react';
import { toast } from 'react-toastify';
import { CartItem, ShippingAddress, CartContextType } from '../types';
import { Product } from '../../product/types';
import { getErrorMessage } from '../../../lib/error-utils';

const CartContext = createContext<CartContextType | undefined>(undefined);

interface CartProviderProps {
    children: ReactNode;
}

export const CartProvider = ({ children }: CartProviderProps) => {
    const [cartItems, setCartItems] = useState<CartItem[]>([]);
    const [shippingAddress, setShippingAddress] = useState<ShippingAddress>({});
    const [paymentMethod, setPaymentMethod] = useState<string>('Razorpay');
    const [isInitialized, setIsInitialized] = useState(false);

    // Initialize from LocalStorage
    useEffect(() => {
        const initCart = () => {
            const storedCart = localStorage.getItem('cartItems');
            if (storedCart) {
                try {
                    setCartItems(JSON.parse(storedCart));
                } catch (err: unknown) {
                    console.error('Failed to parse cart items:', getErrorMessage(err));
                }
            }

            const storedAddress = localStorage.getItem('shippingAddress');
            if (storedAddress) {
                try {
                    setShippingAddress(JSON.parse(storedAddress));
                } catch (err: unknown) {
                    console.error('Failed to parse shipping address:', getErrorMessage(err));
                }
            }

            const storedPayment = localStorage.getItem('paymentMethod');
            if (storedPayment) {
                try {
                    setPaymentMethod(JSON.parse(storedPayment));
                } catch (err: unknown) {
                    console.error('Failed to parse payment method:', getErrorMessage(err));
                }
            }
            setIsInitialized(true);
        };
        initCart();
    }, []);

    // Sync updates to LocalStorage
    useEffect(() => {
        if (isInitialized) {
            localStorage.setItem('cartItems', JSON.stringify(cartItems));
        }
    }, [cartItems, isInitialized]);

    useEffect(() => {
        if (isInitialized) {
            localStorage.setItem('shippingAddress', JSON.stringify(shippingAddress));
        }
    }, [shippingAddress, isInitialized]);

    useEffect(() => {
        if (isInitialized) {
            localStorage.setItem('paymentMethod', JSON.stringify(paymentMethod));
        }
    }, [paymentMethod, isInitialized]);

    const addToCart = (product: Product, qty: number, size?: string) => {
        const existItem = cartItems.find((x) => x.product === product._id);
        const currentQty = existItem ? existItem.qty : 0;
        const finalQty = currentQty + qty;

        if (finalQty > product.countInStock) {
            toast.error(`Stock limit reached. Max available: ${product.countInStock}`);
            return;
        }

        const item: CartItem = {
            product: product._id,
            name: product.name,
            image: product.image,
            price: product.price,
            countInStock: product.countInStock,
            qty: finalQty,
            size: size || (product as Product & { size?: string }).size
        };

        let newCartItems;
        if (existItem) {
            newCartItems = cartItems.map((x) =>
                x.product === existItem.product ? item : x
            );
        } else {
            newCartItems = [...cartItems, item];
        }

        setCartItems(newCartItems);
    };

    const removeFromCart = (id: string) => {
        const newCartItems = cartItems.filter((x) => x.product !== id);
        setCartItems(newCartItems);
    };

    const saveShippingAddress = (data: ShippingAddress) => {
        setShippingAddress(data);
    };

    const savePaymentMethod = (data: string) => {
        setPaymentMethod(data);
    };

    const clearCart = () => {
        setCartItems([]);
        localStorage.removeItem('cartItems');
    };

    return (
        <CartContext.Provider value={{
            cartItems,
            addToCart,
            removeFromCart,
            clearCart,
            shippingAddress,
            saveShippingAddress,
            paymentMethod,
            savePaymentMethod
        }}>
            {children}
        </CartContext.Provider>
    );
};

export default CartContext;
