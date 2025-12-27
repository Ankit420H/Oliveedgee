import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../lib/api';
import { toast } from 'react-toastify';
import AlertModal from '../components/ui/AlertModal';
import { FaTruck, FaBox, FaUser, FaEnvelope, FaMapMarkerAlt, FaCheck, FaTimes } from 'react-icons/fa';

const AdminOrderPage = () => {
    const { id } = useParams();
    const [order, setOrder] = useState(null);
    const [loading, setLoading] = useState(true);

    // Modal States
    const [isDeliverModalOpen, setIsDeliverModalOpen] = useState(false);
    const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);

    const fetchOrder = async () => {
        try {
            const { data } = await api.get(`/api/orders/${id}`);
            setOrder(data);
            setLoading(false);
        } catch (error) {
            toast.error(error.response?.data?.message || 'Failed to load order');
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchOrder();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id]); // fetchOrder is stable or we suppress

    const confirmDeliverHandler = () => {
        setIsDeliverModalOpen(true);
    };

    const executeDeliver = async () => {
        try {
            await api.put(`/api/orders/${id}/deliver`);
            // toast.success('Order marked as delivered');
            setIsDeliverModalOpen(false);
            setIsSuccessModalOpen(true);
            fetchOrder();
        } catch (error) {
            toast.error(error.response?.data?.message || 'Update failed');
            setIsDeliverModalOpen(false);
        }
    };

    if (loading) return <div className="text-center py-20 font-mono text-xs animate-pulse">Loading Order Data...</div>;
    if (!order) return <div className="text-center py-20 font-mono text-xs text-red-500">Order Not Found</div>;

    return (
        <div className="font-mono text-clinical-ink">
            <div className="flex justify-between items-center mb-10 border-b border-clinical-ink/10 pb-6">
                <div>
                    <span className="text-[10px] uppercase tracking-[0.2em] text-clinical-ink/40 block mb-2">Order Detail</span>
                    <h1 className="text-3xl font-bold uppercase tracking-widest">Order #{order._id.substring(0, 8)}</h1>
                </div>
                <div className="text-right">
                    <p className="text-xs uppercase tracking-widest text-clinical-ink/60">Placed On</p>
                    <p className="font-bold">{order.createdAt.substring(0, 10)}</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                {/* Left Column: Details */}
                <div className="lg:col-span-2 space-y-10">
                    {/* Items */}
                    <div className="bg-white p-8 rounded-3xl border border-clinical-ink/10 shadow-soft">
                        <h2 className="text-sm font-bold uppercase tracking-widest mb-6 flex items-center gap-3">
                            <FaBox className="text-accent-bronze" /> Order Items
                        </h2>
                        <div className="space-y-4">
                            {order.orderItems.map((item, index) => (
                                <div key={index} className="flex items-center gap-6 py-4 border-b border-clinical-ink/5 last:border-0">
                                    <div className="w-12 h-12 bg-clinical-canvas rounded-lg overflow-hidden shrink-0">
                                        <img src={item.image} alt={item.name} className="w-full h-full object-cover mix-blend-multiply" />
                                    </div>
                                    <div className="flex-1">
                                        <p className="font-bold text-sm">{item.name}</p>
                                        <p className="text-[10px] text-clinical-ink/50 uppercase">Qty: {item.qty} | Price: ₹{item.price}</p>
                                    </div>
                                    <div className="font-bold text-sm">₹{item.qty * item.price}</div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Shipping & Payment Info */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="bg-white p-8 rounded-3xl border border-clinical-ink/10 shadow-soft">
                            <h2 className="text-sm font-bold uppercase tracking-widest mb-6 flex items-center gap-3">
                                <FaMapMarkerAlt className="text-accent-bronze" /> Shipping
                            </h2>
                            <p className="text-sm font-bold mb-1">{order.user?.name}</p>
                            <a href={`mailto:${order.user?.email}`} className="text-xs text-clinical-ink/60 hover:text-accent-bronze block mb-4">{order.user?.email}</a>

                            <p className="text-sm leading-relaxed text-clinical-ink/80">
                                {order.shippingAddress.address},<br />
                                {order.shippingAddress.city}, {order.shippingAddress.postalCode}<br />
                                {order.shippingAddress.country}
                            </p>

                            <div className={`mt-6 p-4 rounded-xl border flex items-center gap-3 text-xs font-bold uppercase tracking-wider ${order.isDelivered ? 'bg-signal-success/10 border-signal-success text-signal-success' : 'bg-signal-error/10 border-signal-error text-signal-error'}`}>
                                {order.isDelivered ? (
                                    <><FaCheck /> Delivered on {order.deliveredAt.substring(0, 10)}</>
                                ) : (
                                    <><FaTimes /> Not Delivered</>
                                )}
                            </div>
                        </div>

                        <div className="bg-white p-8 rounded-3xl border border-clinical-ink/10 shadow-soft">
                            <h2 className="text-sm font-bold uppercase tracking-widest mb-6 flex items-center gap-3">
                                <FaEnvelope className="text-accent-bronze" /> Payment
                            </h2>
                            <p className="text-xs uppercase tracking-widest text-clinical-ink/60 mb-1">Method</p>
                            <p className="text-sm font-bold mb-4">{order.paymentMethod}</p>

                            <div className={`mt-6 p-4 rounded-xl border flex items-center gap-3 text-xs font-bold uppercase tracking-wider ${order.isPaid ? 'bg-signal-success/10 border-signal-success text-signal-success' : 'bg-signal-error/10 border-signal-error text-signal-error'}`}>
                                {order.isPaid ? (
                                    <><FaCheck /> Paid on {order.paidAt.substring(0, 10)}</>
                                ) : (
                                    <><FaTimes /> Not Paid</>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Column: Actions */}
                <div className="space-y-8">
                    <div className="bg-white p-8 rounded-3xl border border-clinical-ink/10 shadow-soft sticky top-8">
                        <h2 className="text-sm font-bold uppercase tracking-widest mb-6">Order Summary</h2>

                        <div className="space-y-3 text-xs mb-8 border-b border-clinical-ink/10 pb-8">
                            <div className="flex justify-between">
                                <span className="text-clinical-ink/60">Items</span>
                                <span>₹{order.itemsPrice}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-clinical-ink/60">Shipping</span>
                                <span>₹{order.shippingPrice}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-clinical-ink/60">Tax</span>
                                <span>₹{order.taxPrice}</span>
                            </div>
                            <div className="flex justify-between text-sm font-bold pt-2">
                                <span>Total</span>
                                <span>₹{order.totalPrice}</span>
                            </div>
                        </div>

                        {loading && <div className="text-center text-xs animate-pulse">Updating...</div>}

                        {!order.isDelivered && (
                            <button
                                onClick={confirmDeliverHandler}
                                className="w-full py-4 bg-clinical-ink text-white text-xs font-bold uppercase tracking-[0.2em] hover:bg-black transition-all rounded-xl flex items-center justify-center gap-3 mb-4"
                            >
                                <FaTruck /> Mark Delivered
                            </button>
                        )}

                        <div className="text-center">
                            <Link to="/admin/orders" className="text-[10px] uppercase tracking-widest text-clinical-ink/40 hover:text-clinical-ink transition-colors">
                                ← Back to Orders
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
            {/* Confirmation Modal */}
            <AlertModal
                isOpen={isDeliverModalOpen}
                onClose={() => setIsDeliverModalOpen(false)}
                title="Confirm Delivery Status"
                message="This will mark the order as delivered and trigger a notification email to the customer."
                type="warning"
                actionLabel="Confirm Delivery"
                onAction={executeDeliver}
            />

            {/* Success Modal */}
            <AlertModal
                isOpen={isSuccessModalOpen}
                onClose={() => setIsSuccessModalOpen(false)}
                title="Order Updated"
                message="Order status successfully changed to Delivered."
                type="success"
                actionLabel="Close"
            />
        </div>
    );
};

export default AdminOrderPage;
