import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../lib/api';
import { FaTimes } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { Helmet } from 'react-helmet-async';

const OrderListPage = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const { data } = await api.get('/api/orders');
                setOrders(data);
                setLoading(false);
            } catch {
                toast.error('Failed to load order logs.');
                setLoading(false);
            }
        };

        fetchOrders();
    }, []);

    return (
        <div className="min-h-screen bg-clinical-canvas text-clinical-ink pt-32 pb-40 font-mono">
            <Helmet>
                <title>Transactions | Command Center</title>
            </Helmet>
            <div className="container mx-auto px-container-sm md:px-container-md lg:px-container-lg max-w-7xl">

                <div className="mb-12">
                    <span className="font-sans text-[10px] uppercase tracking-[0.2em] text-clinical-ink/40 mb-2 block">
                        Admin Protocol
                    </span>
                    <h1 className="font-display font-black text-5xl md:text-heading-sub uppercase leading-[0.9]">Global Transactions</h1>
                </div>

                <div className="overflow-x-auto border border-clinical-ink/10 bg-white rounded-3xl shadow-soft">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="border-b border-clinical-ink/10 text-[10px] uppercase tracking-widest text-clinical-ink/40">
                                <th className="p-6 font-normal">Order ID</th>
                                <th className="p-6 font-normal">User</th>
                                <th className="p-6 font-normal">Date</th>
                                <th className="p-6 font-normal">Total</th>
                                <th className="p-6 font-normal">Paid</th>
                                <th className="p-6 font-normal">Delivered</th>
                                <th className="p-6 font-normal text-right">Details</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-clinical-ink/5 text-[11px] uppercase tracking-wide">
                            {orders.map((order) => (
                                <tr key={order._id} className="group hover:bg-clinical-canvas/50 transition-colors">
                                    <td className="p-6 text-clinical-ink/30 font-mono">{order._id.substring(20, 24)}...</td>
                                    <td className="p-6 font-bold text-clinical-ink">{order.user && order.user.name}</td>
                                    <td className="p-6 text-clinical-ink/70">{order.createdAt.substring(0, 10)}</td>
                                    <td className="p-6 font-mono text-clinical-ink">₹ {order.totalPrice}</td>

                                    <td className="p-6">
                                        {order.isPaid ? (
                                            <span className="text-signal-success">{order.paidAt.substring(0, 10)}</span>
                                        ) : (
                                            <FaTimes className="text-signal-error" />
                                        )}
                                    </td>

                                    <td className="p-6">
                                        {order.isDelivered ? (
                                            <span className="text-signal-success">{order.deliveredAt.substring(0, 10)}</span>
                                        ) : (
                                            <FaTimes className="text-clinical-ink/20" />
                                        )}
                                    </td>

                                    <td className="p-6 text-right">
                                        <Link to={`/admin/order/${order._id}`} className="px-4 py-2 bg-clinical-ink/5 hover:bg-clinical-ink hover:text-white rounded-full transition-colors text-[10px] font-bold">
                                            VIEW
                                        </Link>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {loading && (
                    <div className="mt-8 text-center font-mono text-xs text-clinical-ink/40 animate-pulse">
                        Synchronizing Database...
                    </div>
                )}
            </div>
        </div>
    );
};

export default OrderListPage;
