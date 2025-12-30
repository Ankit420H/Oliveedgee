'use client';

import { useState, useContext } from 'react';
import { FaStar, FaRegStar, FaUserCircle } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { AuthContext, AuthContextType } from '../../auth';
import api from '../../../lib/api';
import { toast } from 'react-toastify';
import { Product, Review } from '../types';
import { getErrorMessage } from '../../../lib/error-utils';

interface RatingProps {
    value: number;
    text?: string;
}

const Rating = ({ value, text }: RatingProps) => {
    return (
        <div className="flex items-center gap-2">
            <div className="flex text-accent-bronze">
                {[1, 2, 3, 4, 5].map((index) => (
                    <span key={index}>
                        {value >= index ? (
                            <FaStar size={12} />
                        ) : value >= index - 0.5 ? (
                            <FaStar size={12} className="opacity-50" />
                        ) : (
                            <FaRegStar size={12} className="text-clinical-ink/20" />
                        )}
                    </span>
                ))}
            </div>
            {text && <span className="font-mono text-[10px] uppercase">{text}</span>}
        </div>
    );
};

interface ReviewListProps {
    product: Product;
    refreshProduct?: () => void;
}

const ReviewList = ({ product, refreshProduct = () => { } }: ReviewListProps) => {
    const { user } = useContext(AuthContext) as AuthContextType;
    const [rating, setRating] = useState(5);
    const [comment, setComment] = useState('');
    const [loading, setLoading] = useState(false);

    const submitHandler = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            await api.post(`/api/products/${product._id}/reviews`, {
                rating,
                comment,
            });
            toast.success('Field Report Submitted Successfully');
            setRating(5);
            setComment('');
            refreshProduct();
        } catch (err: unknown) {
            toast.error(getErrorMessage(err));
        }
        setLoading(false);
    };

    return (
        <div className="bg-white border border-clinical-ink/10 rounded-3xl p-8 lg:p-12 mb-12">
            <div className="flex items-center justify-between mb-8">
                <h3 className="font-display font-black text-3xl uppercase leading-none text-clinical-ink">
                    Field Reports
                </h3>
                <div className="text-right">
                    <div className="font-mono text-xs uppercase opacity-50 mb-1">Overall Rating</div>
                    <Rating value={product.rating} text={`${product.numReviews} Reports`} />
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                <div className="space-y-8 max-h-[500px] overflow-y-auto pr-4 scrollbar-hide">
                    {(product.reviews || []).length === 0 && (
                        <div className="p-6 border border-dashed border-clinical-ink/20 rounded-xl text-center font-mono text-xs text-clinical-ink/50 uppercase tracking-widest">
                            No Field Reports Filed Yet.
                        </div>
                    )}
                    {(product.reviews || []).map((review: Review) => (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            key={review._id}
                            className="bg-clinical-canvas p-6 rounded-2xl relative"
                        >
                            <div className="flex items-start justify-between mb-4">
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-full bg-clinical-ink/10 flex items-center justify-center">
                                        <FaUserCircle className="text-clinical-ink/50" />
                                    </div>
                                    <div>
                                        <div className="font-sans font-bold text-sm text-clinical-ink">{review.name}</div>
                                        <div className="font-mono text-[10px] text-clinical-ink/40">
                                            {new Date(review.createdAt).toLocaleDateString()}
                                        </div>
                                    </div>
                                </div>
                                <Rating value={review.rating} />
                            </div>
                            <p className="font-sans text-sm text-clinical-ink/80 leading-relaxed">
                                {review.comment}
                            </p>
                        </motion.div>
                    ))}
                </div>

                <div className="lg:border-l border-clinical-ink/10 lg:pl-12">
                    <h4 className="font-mono text-xs font-bold uppercase tracking-widest mb-6 border-b border-clinical-ink/10 pb-4">
                        Submit New Report
                    </h4>
                    {user ? (
                        <form onSubmit={submitHandler} className="space-y-6">
                            <div>
                                <label className="block font-sans text-xs font-bold text-clinical-ink mb-2">
                                    Tactical Assessment (Rating)
                                </label>
                                <div className="flex gap-4">
                                    {[1, 2, 3, 4, 5].map((r) => (
                                        <button
                                            key={r}
                                            type="button"
                                            onClick={() => setRating(r)}
                                            className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${rating >= r ? 'bg-accent-bronze text-white' : 'bg-clinical-ink/5 text-clinical-ink/30 hover:bg-clinical-ink/10'
                                                }`}
                                        >
                                            <FaStar size={12} />
                                        </button>
                                    ))}
                                </div>
                            </div>
                            <div>
                                <label className="block font-sans text-xs font-bold text-clinical-ink mb-2">
                                    Operational Debrief (Comment)
                                </label>
                                <textarea
                                    rows={4}
                                    value={comment}
                                    onChange={(e) => setComment(e.target.value)}
                                    className="w-full bg-clinical-canvas border-none rounded-xl p-4 font-mono text-sm focus:ring-1 focus:ring-accent-bronze placeholder:text-clinical-ink/30"
                                    placeholder="Enter detailed observations..."
                                ></textarea>
                            </div>
                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full py-4 bg-clinical-ink text-white font-mono text-xs uppercase tracking-[0.2em] font-bold hover:bg-accent-bronze transition-colors duration-300 rounded-full"
                            >
                                {loading ? 'Transmitting...' : 'Submit Report'}
                            </button>
                        </form>
                    ) : (
                        <div className="p-8 bg-clinical-canvas rounded-2xl text-center">
                            <p className="font-display text-lg text-clinical-ink/50 mb-4">
                                Clearance Required
                            </p>
                            <p className="font-sans text-sm text-clinical-ink/70 mb-6">
                                You must be logged in to submit a field report.
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ReviewList;
