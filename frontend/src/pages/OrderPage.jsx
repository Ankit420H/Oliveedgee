import { useState, useEffect, useContext } from 'react';
import { Link, useParams } from 'react-router-dom';
import AuthContext from '../context/AuthContext';
import api from '../lib/api';
import { toast } from 'react-toastify';
import { Helmet } from 'react-helmet-async';
import { loadRazorpayScript } from '../utils/razorpay';
import ConfirmationModal from '../components/ui/ConfirmationModal';

const OrderPage = () => {
    const { id } = useParams();
    const { user } = useContext(AuthContext);

    const [order, setOrder] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isCancelModalOpen, setIsCancelModalOpen] = useState(false);

    useEffect(() => {
        const fetchOrder = async () => {
            try {
                const { data } = await api.get(`/api/orders/${id}`);
                setOrder(data);
                setLoading(false);
            } catch {
                toast.error('Error fetching order');
                setLoading(false);
            }
        };

        if (user) {
            fetchOrder();
        }
    }, [id, user]);

    const handleRazorpayPayment = async () => {
        const res = await loadRazorpayScript();

        if (!res) {
            toast.error('Razorpay SDK failed to load. Are you online?');
            return;
        }

        try {
            // 1. Create Order on Server
            const { data: orderData } = await api.post('/api/payment/create-order', {
                amount: order.totalPrice,
                receipt: order._id,
            });

            // 2. Options for Razorpay Checkout
            const options = {
                key: import.meta.env.VITE_RAZORPAY_KEY_ID, // Enter the Key ID generated from the Dashboard
                amount: orderData.amount,
                currency: orderData.currency,
                name: "Olive Edge",
                description: "Transaction for Order #" + order._id,
                image: "/favicon.svg", // Ensure this exists in public folder
                order_id: orderData.id,
                handler: async function (response) {
                    try {
                        // 3. Verify Payment on Server
                        const verifyRes = await api.post('/api/payment/verify', {
                            razorpay_order_id: response.razorpay_order_id,
                            razorpay_payment_id: response.razorpay_payment_id,
                            razorpay_signature: response.razorpay_signature,
                            orderId: order._id, // Pass our DB Order ID
                        });

                        if (verifyRes.data.status === 'success') {
                            toast.success('Payment Successful!');
                            window.location.reload();
                        }
                    } catch (error) {
                        toast.error('Payment Verification Failed');
                        console.error(error);
                    }
                },
                prefill: {
                    name: user.name,
                    email: user.email,
                    contact: user.phone || '9999999999',
                },
                notes: {
                    address: order.shippingAddress.address,
                },
                theme: {
                    color: "#606C38", // Olive Green (Moss)
                },
            };

            const paymentObject = new window.Razorpay(options);
            paymentObject.open();

        } catch (error) {
            toast.error('Something went wrong during payment initialization');
            console.error(error);
        }
    };




    const confirmCancelHandler = async () => {
        try {
            await api.put(`/api/orders/${id}/cancel`);
            toast.success('Order Cancelled Successfully');
            setIsCancelModalOpen(false);
            window.location.reload();
        } catch (error) {
            toast.error(error.response && error.response.data.message ? error.response.data.message : error.message);
            setIsCancelModalOpen(false);
        }
    };

    const handleRequestReturn = async () => {
        if (window.confirm('Are you sure you want to request a return for this order?')) {
            try {
                await api.put(`/api/orders/${id}/return`);
                toast.success('Return Requested Successfully');
                window.location.reload();
            } catch (error) {
                toast.error(error.response && error.response.data.message ? error.response.data.message : error.message);
            }
        }
    };

    if (loading) return (
        <div className="min-h-screen bg-clinical-canvas flex items-center justify-center">
            <span className="font-sans text-xs uppercase tracking-widest text-clinical-ink/60 animate-pulse">Retrieving Data...</span>
        </div>
    );

    if (!order) return (
        <div className="min-h-screen bg-clinical-canvas flex items-center justify-center">
            <span className="font-sans text-xs uppercase tracking-widest text-red-800">Order Record Not Found</span>
        </div>
    );

    return (
        <div className="min-h-screen bg-clinical-canvas pt-32 pb-40">
            <Helmet>
                <title>{`Receipt #${order._id} | Olive Edge`}</title>
                <meta name="description" content="Acquisition receipt and status." />
            </Helmet>
            <div className="container mx-auto px-container-sm md:px-container-md lg:px-container-lg max-w-5xl">

                {/* Header */}
                <div className="text-center mb-16">
                    <span className="font-sans text-[10px] uppercase tracking-[0.2em] text-clinical-ink/40 mb-4 block">
                        Mission Status: Confirmed
                    </span>
                    <h1 className="font-display font-black text-5xl md:text-7xl lg:text-heading-main text-clinical-ink mb-8 uppercase leading-[0.9]">
                        Acquisition Receipt
                    </h1>
                    <div className="inline-block border border-clinical-ink/20 px-4 py-2 rounded-full">
                        <span className="font-mono text-xs text-clinical-ink">ID: {order._id}</span>
                    </div>
                </div>

                <div className="border border-clinical-ink/10 bg-white/40 backdrop-blur-sm p-8 md:p-12 relative overflow-hidden rounded-3xl">
                    {/* Decorative Watermark */}
                    <div className="absolute top-0 right-0 p-4 opacity-10 pointer-events-none">
                        <svg width="100" height="100" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <circle cx="50" cy="50" r="48" stroke="currentColor" strokeWidth="1" />
                            <path d="M50 20V80" stroke="currentColor" strokeWidth="1" />
                            <path d="M20 50H80" stroke="currentColor" strokeWidth="1" />
                        </svg>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-12">
                        {/* Column 1: Shipping & Status */}
                        <div className="space-y-8">
                            <div>
                                <h3 className="font-sans text-[10px] font-bold uppercase tracking-[0.2em] text-clinical-ink/40 mb-4">Destination</h3>
                                <p className="font-display text-lg text-clinical-ink">
                                    {order.shippingAddress.address}<br />
                                    {order.shippingAddress.city}, {order.shippingAddress.postalCode}<br />
                                    {order.shippingAddress.country}
                                </p>
                            </div>

                            <div>
                                <h3 className="font-sans text-[10px] font-bold uppercase tracking-[0.2em] text-clinical-ink/40 mb-4">Dispatch Status</h3>
                                <div className={`inline-flex items-center gap-2 px-3 py-1 border ${order.isCancelled ? 'border-red-500/30 bg-red-500/10 text-red-500' : order.isDelivered ? 'border-signal-success/30 bg-signal-success/10 text-signal-success' : 'border-accent-bronze/30 bg-accent-bronze/10 text-accent-bronze'} rounded-full`}>
                                    <div className={`w-1.5 h-1.5 rounded-full ${order.isCancelled ? 'bg-red-500' : order.isDelivered ? 'bg-signal-success' : 'bg-accent-bronze animate-pulse'}`}></div>
                                    <span className="font-mono text-[10px] uppercase tracking-widest">
                                        {order.isCancelled ? `Cancelled: ${order.cancelledAt ? order.cancelledAt.substring(0, 10) : ''}` : order.isDelivered ? `Delivered: ${order.deliveredAt.substring(0, 10)}` : 'Pending Delivery'}
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Column 2: Payment & User */}
                        <div className="space-y-8">
                            <div>
                                <h3 className="font-sans text-[10px] font-bold uppercase tracking-[0.2em] text-clinical-ink/40 mb-4">Customer</h3>
                                <p className="font-display text-lg text-clinical-ink">
                                    {order.user.name}<br />
                                    <span className="text-base text-clinical-ink/60">{order.user.email}</span>
                                </p>
                            </div>

                            <div>
                                <h3 className="font-sans text-[10px] font-bold uppercase tracking-[0.2em] text-clinical-ink/40 mb-4">Payment Method</h3>
                                <p className="font-mono text-xs text-clinical-ink mb-2">{order.paymentMethod}</p>
                                <div className={`inline-flex items-center gap-2 px-3 py-1 border ${order.isPaid ? 'border-signal-success/30 bg-signal-success/10 text-signal-success' : 'border-signal-error/30 bg-signal-error/10 text-signal-error'} rounded-full`}>
                                    <div className={`w-1.5 h-1.5 rounded-full ${order.isPaid ? 'bg-signal-success' : 'bg-signal-error'}`}></div>
                                    <span className="font-mono text-[10px] uppercase tracking-widest">
                                        {order.isPaid ? `Settled: ${order.paidAt.substring(0, 10)}` : 'Payment Outstanding'}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Order ltems */}
                    <div className="border-t border-dashed border-clinical-ink/20 pt-8 mb-8">
                        <h3 className="font-sans text-[10px] font-bold uppercase tracking-[0.2em] text-clinical-ink/40 mb-6">Manifest Payload</h3>
                        <ul className="space-y-4">
                            {order.orderItems.map((item, index) => (
                                <li key={index} className="flex items-center justify-between group">
                                    <div className="flex items-center gap-4">
                                        <span className="font-mono text-xs text-clinical-ink/40 w-4">{index + 1}</span>
                                        <Link to={`/product/${item.product}`} className="font-display text-clinical-ink hover:underline decoration-1 underline-offset-4">
                                            {item.name}
                                        </Link>
                                    </div>
                                    <div className="font-mono text-xs text-clinical-ink">
                                        {item.qty} x ₹ {item.price}
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Totals */}
                    <div className="border-t border-black pt-6 flex flex-col items-end">
                        <div className="w-full md:w-1/2 space-y-3 font-mono text-xs text-clinical-ink border-b border-clinical-ink/10 pb-4 mb-4">
                            <div className="flex justify-between">
                                <span className="text-clinical-ink/60">Subtotal</span>
                                <span>₹ {order.itemsPrice}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-clinical-ink/60">Shipping</span>
                                <span>₹ {order.shippingPrice}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-clinical-ink/60">Tax</span>
                                <span>₹ {order.taxPrice}</span>
                            </div>
                        </div>
                        <div className="w-full md:w-1/2 flex justify-between font-display font-medium text-xl text-clinical-ink mb-8">
                            <span>Total</span>
                            <span className="font-mono text-lg font-bold">₹ {order.totalPrice}</span>
                        </div>

                        {/* Pay with Razorpay Button */}
                        {!order.isPaid && !order.isCancelled && order.paymentMethod === 'Razorpay' && (
                            <button
                                onClick={handleRazorpayPayment}
                                className="w-full md:w-1/2 py-4 bg-accent-bronze text-white font-sans text-xs uppercase tracking-[0.2em] font-bold hover:bg-clinical-ink transition-all duration-500 rounded-full shadow-lg"
                            >
                                Pay with Razorpay
                            </button>
                        )}

                        {/* Cancel Order Button */}
                        {!order.isCancelled && !order.isDelivered && (
                            <button
                                onClick={() => setIsCancelModalOpen(true)}
                                className="w-full md:w-1/2 mt-4 py-4 border border-red-500/30 text-red-500/80 hover:text-red-600 hover:border-red-500/60 font-sans text-xs uppercase tracking-[0.2em] font-bold hover:bg-red-500/5 transition-all duration-500 rounded-full"
                            >
                                Cancel Order
                            </button>
                        )}

                        {/* Return Request Button */}
                        {order.isDelivered && !order.isReturnRequested && (
                            <button
                                onClick={handleRequestReturn}
                                className="w-full md:w-1/2 mt-4 py-4 border border-clinical-ink/30 text-clinical-ink/80 hover:text-clinical-ink hover:border-clinical-ink/60 font-sans text-xs uppercase tracking-[0.2em] font-bold hover:bg-clinical-ink/5 transition-all duration-500 rounded-full"
                            >
                                Request Return
                            </button>
                        )}

                        {/* Return Status Badge */}
                        {order.isReturnRequested && (
                            <div className="w-full md:w-1/2 mt-4 py-4 bg-accent-bronze/10 border border-accent-bronze/30 text-accent-bronze font-sans text-xs uppercase tracking-[0.2em] font-bold text-center rounded-full">
                                Return Requested
                            </div>
                        )}
                    </div>

                    {/* Admin Action: Mark As Delivered */}
                    {user && user.isAdmin && order.isPaid && !order.isDelivered && (
                        <div className="mt-8 flex justify-end">
                            <button
                                onClick={async () => {
                                    try {
                                        await api.put(`/api/orders/${order._id}/deliver`);
                                        toast.success('Order status updated to DELIVERED');
                                        // Simple reload to refresh state
                                        window.location.reload();
                                    } catch (err) {
                                        toast.error(err.response?.data?.message || 'Update failed');
                                    }
                                }}
                                className="px-8 py-4 bg-clinical-ink text-white font-mono text-xs uppercase tracking-widest hover:bg-black transition-all rounded-full shadow-lg"
                            >
                                [Admin] Mark As Delivered
                            </button>
                        </div>
                    )}

                    {/* Footer Warning */}
                    <div className="mt-12 text-center">
                        <p className="font-sans text-[9px] uppercase tracking-widest text-clinical-ink/30">
                            This document is an official record of the Olive Edge Network.
                        </p>
                    </div>

                    {/* Confirmation Modal */}
                    <ConfirmationModal
                        isOpen={isCancelModalOpen}
                        onClose={() => setIsCancelModalOpen(false)}
                        onConfirm={confirmCancelHandler}
                        title="Abort Transaction?"
                        message="This action is irreversible. The acquisition request will be terminated immediately."
                    />
                </div>
            </div>
        </div>
    );
};

export default OrderPage;
