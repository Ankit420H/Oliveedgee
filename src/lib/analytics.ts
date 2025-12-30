// E-commerce event tracking for Google Analytics 4

declare global {
    interface Window {
        gtag: (command: string, eventName: string, eventParams?: Record<string, string | number | boolean | undefined | object>) => void;
    }
}

export const trackEvent = (eventName: string, eventParams: Record<string, string | number | boolean | undefined | object> = {}) => {
    if (typeof window !== 'undefined' && window.gtag) {
        window.gtag('event', eventName, eventParams);
    }
};

// Product view tracking
export const trackProductView = (product: {
    id: string;
    name: string;
    price: number;
    category?: string;
    brand?: string;
}) => {
    trackEvent('view_item', {
        currency: 'INR',
        value: product.price,
        items: [{
            item_id: product.id,
            item_name: product.name,
            item_category: product.category,
            item_brand: product.brand,
            price: product.price,
        }]
    });
};

// Add to cart tracking
export const trackAddToCart = (product: {
    id: string;
    name: string;
    price: number;
    quantity: number;
    category?: string;
    brand?: string;
}) => {
    trackEvent('add_to_cart', {
        currency: 'INR',
        value: product.price * product.quantity,
        items: [{
            item_id: product.id,
            item_name: product.name,
            item_category: product.category,
            item_brand: product.brand,
            price: product.price,
            quantity: product.quantity,
        }]
    });
};

// Remove from cart tracking
export const trackRemoveFromCart = (product: {
    id: string;
    name: string;
    price: number;
    quantity: number;
}) => {
    trackEvent('remove_from_cart', {
        currency: 'INR',
        value: product.price * product.quantity,
        items: [{
            item_id: product.id,
            item_name: product.name,
            price: product.price,
            quantity: product.quantity,
        }]
    });
};

// Begin checkout tracking
export const trackBeginCheckout = (
    items: Array<{
        id: string;
        name: string;
        price: number;
        quantity: number;
    }>,
    totalValue: number
) => {
    trackEvent('begin_checkout', {
        currency: 'INR',
        value: totalValue,
        items: items.map(item => ({
            item_id: item.id,
            item_name: item.name,
            price: item.price,
            quantity: item.quantity,
        }))
    });
};

// Purchase tracking
export const trackPurchase = (
    transactionId: string,
    items: Array<{
        id: string;
        name: string;
        price: number;
        quantity: number;
        category?: string;
        brand?: string;
    }>,
    totalValue: number,
    tax: number = 0,
    shipping: number = 0
) => {
    trackEvent('purchase', {
        transaction_id: transactionId,
        currency: 'INR',
        value: totalValue,
        tax: tax,
        shipping: shipping,
        items: items.map(item => ({
            item_id: item.id,
            item_name: item.name,
            item_category: item.category,
            item_brand: item.brand,
            price: item.price,
            quantity: item.quantity,
        }))
    });
};

// Search tracking
export const trackSearch = (searchTerm: string) => {
    trackEvent('search', {
        search_term: searchTerm,
    });
};

// Add to wishlist tracking
export const trackAddToWishlist = (product: {
    id: string;
    name: string;
    price: number;
    category?: string;
}) => {
    trackEvent('add_to_wishlist', {
        currency: 'INR',
        value: product.price,
        items: [{
            item_id: product.id,
            item_name: product.name,
            item_category: product.category,
            price: product.price,
        }]
    });
};

// Sign up tracking
export const trackSignUp = (method: string = 'email') => {
    trackEvent('sign_up', {
        method: method,
    });
};

// Login tracking
export const trackLogin = (method: string = 'email') => {
    trackEvent('login', {
        method: method,
    });
};

// Share tracking
export const trackShare = (contentType: string, itemId: string) => {
    trackEvent('share', {
        content_type: contentType,
        item_id: itemId,
    });
};
