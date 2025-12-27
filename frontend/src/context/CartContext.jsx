import { createContext, useState } from 'react';
import { toast } from 'react-toastify';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState(() => {
        const stored = localStorage.getItem('cartItems');
        return stored ? JSON.parse(stored) : [];
    });

    const [shippingAddress, setShippingAddress] = useState(() => {
        const stored = localStorage.getItem('shippingAddress');
        return stored ? JSON.parse(stored) : {};
    });

    const [paymentMethod, setPaymentMethod] = useState('Razorpay');

    const addToCart = (product, qty) => {
        const existItem = cartItems.find((x) => x.product === product._id);
        const currentQty = existItem ? existItem.qty : 0;
        const finalQty = currentQty + qty;

        if (finalQty > product.countInStock) {
            toast.error(`Stock limit reached. Max available: ${product.countInStock}`);
            return;
        }

        const item = {
            product: product._id,
            name: product.name,
            image: product.image,
            price: product.price,
            countInStock: product.countInStock,
            qty: finalQty,
            size: product.size // Ensure size is preserved if passed in product object
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
        localStorage.setItem('cartItems', JSON.stringify(newCartItems));
    };

    const removeFromCart = (id) => {
        const newCartItems = cartItems.filter((x) => x.product !== id);
        setCartItems(newCartItems);
        localStorage.setItem('cartItems', JSON.stringify(newCartItems));
    };

    const saveShippingAddress = (data) => {
        setShippingAddress(data);
        localStorage.setItem('shippingAddress', JSON.stringify(data));
    };

    const savePaymentMethod = (data) => {
        setPaymentMethod(data);
        localStorage.setItem('paymentMethod', JSON.stringify(data));
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
