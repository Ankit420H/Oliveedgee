import { Product } from '../product/types';

export interface WishlistItem extends Partial<Product> {
    _id: string;
    name: string;
    price: number;
    image: string;
    countInStock: number;
}

export interface WishlistContextType {
    wishlist: WishlistItem[];
    addToWishlist: (product: WishlistItem) => void;
    removeFromWishlist: (productId: string) => void;
    isInWishlist: (productId: string) => boolean;
}
