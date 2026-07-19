import { render, screen } from '@testing-library/react';
import Header from '@/components/layout/Header';
import { AuthContext } from '@/features/auth';
import { CartContext } from '@/features/cart';
import { WishlistContext } from '@/features/wishlist';

// Mock the dependencies and hooks
const mockAuth = { user: null, logout: jest.fn(), login: jest.fn(), register: jest.fn(), checkAuth: jest.fn(), token: null };
const mockCart = { cartItems: [], addToCart: jest.fn(), removeFromCart: jest.fn(), updateQuantity: jest.fn(), clearCart: jest.fn(), isCartOpen: false, setIsCartOpen: jest.fn() };
const mockWishlist = { wishlist: [], addToWishlist: jest.fn(), removeFromWishlist: jest.fn(), isInWishlist: jest.fn() };

describe('Header Component', () => {
  it('renders the top bar and logo', () => {
    render(
      <AuthContext.Provider value={mockAuth}>
        <CartContext.Provider value={mockCart}>
          <WishlistContext.Provider value={mockWishlist}>
            <Header />
          </WishlistContext.Provider>
        </CartContext.Provider>
      </AuthContext.Provider>
    );

    expect(screen.getByText(/Global Shipping/i)).toBeInTheDocument();
  });
});
