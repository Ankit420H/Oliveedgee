// API Configuration Constants
export const API_CONFIG = {
    BASE_URL: import.meta.env.VITE_API_URL || import.meta.env.VITE_API_BASE_URL || 'http://localhost:5001',
    TIMEOUT: 15000,
};

// Local Storage Keys
export const STORAGE_KEYS = {
    USER_INFO: 'userInfo',
    CART_ITEMS: 'cartItems',
    SHIPPING_ADDRESS: 'shippingAddress',
    PAYMENT_METHOD: 'paymentMethod',
};

// API Endpoints
export const ENDPOINTS = {
    // Auth
    LOGIN: '/api/users/login',
    REGISTER: '/api/users/register',
    PROFILE: '/api/users/profile',

    // Products
    PRODUCTS: '/api/products',
    PRODUCT_BY_ID: (id) => `/api/products/${id}`,

    // Orders
    ORDERS: '/api/orders',
    ORDER_BY_ID: (id) => `/api/orders/${id}`,
    MY_ORDERS: '/api/orders/myorders',

    // Upload
    UPLOAD: '/api/upload',
};

// Pagination Defaults
export const PAGINATION = {
    DEFAULT_PAGE_SIZE: 12,
    PRODUCTS_PER_PAGE: 12,
    MAX_PAGE_SIZE: 100,
};

// Error Messages
export const ERROR_MESSAGES = {
    NETWORK_ERROR: 'Network error. Please check your connection.',
    UNAUTHORIZED: 'Please login to continue.',
    FORBIDDEN: 'You do not have permission to access this resource.',
    NOT_FOUND: 'The requested resource was not found.',
    SERVER_ERROR: 'Something went wrong on our end. Please try again later.',
    VALIDATION_ERROR: 'Please check your input and try again.',
    TIMEOUT: 'Request timed out. Please try again.',
};

// Product Sizes
export const PRODUCT_SIZES = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];

// Default Images
export const DEFAULT_IMAGES = {
    PRODUCT_PLACEHOLDER: '/images/oe1.jpg',
    USER_AVATAR: '/images/avatar-placeholder.png', // Keeping default or using a generic if available
};

// Checkout Steps
export const CHECKOUT_STEPS = {
    SHIPPING: 'shipping',
    PAYMENT: 'payment',
    PLACE_ORDER: 'placeorder',
};

// Toast Configuration
export const TOAST_CONFIG = {
    position: 'bottom-right',
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    theme: 'light',
};
