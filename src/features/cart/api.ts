import { CartItem } from './types';

/**
 * Placeholder for cart persistence if needed in future.
 * Currently the cart is handled client-side.
 */
export const syncCart = async (cartItems: CartItem[]) => {
    // return await api.post('/api/cart/sync', { cartItems });
    return Promise.resolve(cartItems);
};
