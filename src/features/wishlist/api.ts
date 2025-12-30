import { WishlistItem } from './types';

/**
 * Placeholder for wishlist persistence if needed in future.
 * Currently the wishlist is handled client-side.
 */
export const syncWishlist = async (wishlist: WishlistItem[]) => {
    // return await api.post('/api/wishlist/sync', { wishlist });
    return Promise.resolve(wishlist);
};
