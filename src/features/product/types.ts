export interface Review {
    _id: string;
    user: string;
    name: string;
    rating: number;
    comment: string;
    createdAt: string;
}

export interface Product {
    _id: string;
    name: string;
    image: string;
    description: string;
    brand: string;
    category: string;
    price: number;
    countInStock: number;
    rating: number;
    numReviews: number;
    reviews: Review[];
    sizes?: string[]; // Assuming products might have sizes
    createdAt?: string;
    isNew?: boolean;
    // Add other fields as necessary
}

export interface UserReview extends Review {
    productImage: string;
    productName: string;
    productId: string;
}
