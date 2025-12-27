import { useState, useEffect, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../lib/api';
// import AuthContext from '../context/AuthContext';
import { FaBox, FaUsers, FaClipboardList, FaChartLine, FaSignOutAlt, FaPlus, FaEdit, FaTrash, FaCube } from 'react-icons/fa';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { toast } from 'react-toastify';
import AlertModal from '../components/ui/AlertModal';

const AdminDashboard = () => {
    const [products, setProducts] = useState([]);

    // const { user, logout } = useContext(AuthContext); // Removed unused
    const navigate = useNavigate();

    const [stats, setStats] = useState({
        products: 0,
        users: 0,
        orders: 0
    });
    const [analytics, setAnalytics] = useState([]);

    // Modal State
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [productToDelete, setProductToDelete] = useState(null);
    // const [loading, setLoading] = useState(true); // Removed unused

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch basic lists for counts
                const { data: productsData } = await api.get('/api/products?limit=1000');
                const { data: usersData } = await api.get('/api/users');
                const { data: ordersData } = await api.get('/api/orders');

                // Fetch Analytics
                const { data: analyticsData } = await api.get('/api/orders/analytics');

                setStats({
                    products: productsData.products ? productsData.products.length : productsData.length,
                    users: usersData.length,
                    orders: ordersData.length
                });
                setAnalytics(analyticsData);
                // setLoading(false);
            } catch (error) {
                console.error('Error fetching admin stats:', error);
                // setLoading(false);
            }
        };

        fetchData();
    }, []);

    const fetchProducts = useCallback(async () => {
        try {
            const { data } = await api.get('/api/products?limit=50');
            setProducts(data.products || data);
        } catch (error) {
            console.error('Error fetching products:', error);
            toast.error('Failed to load products');
        }
    }, []);

    useEffect(() => {
        const load = async () => {
            await fetchProducts();
        };
        load();
    }, [fetchProducts]);

    const confirmDeleteHandler = (id) => {
        setProductToDelete(id);
        setIsDeleteModalOpen(true);
    };

    const executeDelete = async () => {
        if (!productToDelete) return;

        try {
            await api.delete(`/api/products/${productToDelete}`);
            // toast.success('Product deleted from database.'); // Replaced by Modal or just UI update? keeping toast for simplicity alongside modal closing? 
            // Actually user asked for popup alerts. Let's rely on the auto-refresh and maybe a success modal? 
            // For deletion, usually the removal is enough feedback or a toast.
            // But I'll stick to 'standardize'. 
            // The AlertModal is for the WARNING.
            toast.success('Product Purged.'); // Keep toast for success, Modal for Warning.
            fetchProducts();
            setIsDeleteModalOpen(false);
            setProductToDelete(null);
        } catch (error) {
            console.error('Error deleting product:', error);
            toast.error('Deletion failed.');
            setIsDeleteModalOpen(false);
        }
    };

    const createProductHandler = () => {
        navigate('/admin/product/new');
    };

    return (
        <div className="min-h-screen pt-12 pb-20 font-mono selection:bg-accent-bronze selection:text-white">
            <div className="container mx-auto px-6 max-w-7xl">

                {/* Dashboard Header */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 border-b border-clinical-ink/10 pb-8 gap-8">
                    <div>
                        <h1 className="font-display font-black text-6xl md:text-heading-main text-clinical-ink uppercase leading-[0.9]">Dashboard</h1>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
                    {/* STATS CARDS */}
                    <div className="bg-clinical-canvas p-8 rounded-3xl border border-clinical-ink/10 flex flex-col justify-between hover:shadow-lg transition-shadow">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="font-mono text-xs uppercase tracking-[0.2em] text-clinical-ink/40">Total Orders</h3>
                            <FaClipboardList className="text-clinical-ink/20 text-2xl" />
                        </div>
                        <p className="font-display font-black text-6xl text-clinical-ink">{stats.orders}</p>
                    </div>

                    <div className="bg-clinical-canvas p-8 rounded-3xl border border-clinical-ink/10 flex flex-col justify-between hover:shadow-lg transition-shadow">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="font-mono text-xs uppercase tracking-[0.2em] text-clinical-ink/40">Total Users</h3>
                            <FaUsers className="text-clinical-ink/20 text-2xl" />
                        </div>
                        <p className="font-display font-black text-6xl text-clinical-ink">{stats.users}</p>
                    </div>

                    <div className="bg-clinical-canvas p-8 rounded-3xl border border-clinical-ink/10 flex flex-col justify-between hover:shadow-lg transition-shadow">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="font-mono text-xs uppercase tracking-[0.2em] text-clinical-ink/40">Total Products</h3>
                            <FaBox className="text-clinical-ink/20 text-2xl" />
                        </div>
                        <p className="font-display font-black text-6xl text-clinical-ink">{stats.products}</p>
                    </div>
                </div>

                {/* ANALYTICS CHART */}
                <div className="mb-16">
                    <div className="flex items-center justify-between mb-8">
                        <h2 className="font-display font-black text-3xl text-clinical-ink flex items-center gap-4">
                            <FaChartLine className="text-accent-bronze" size={24} />
                            Revenue Trajectory
                        </h2>
                    </div>
                    <div className="bg-white p-8 rounded-3xl border border-clinical-ink/10 shadow-sm h-[400px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={analytics}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                                <XAxis dataKey="_id" stroke="#4b5563" fontSize={12} tickMargin={10} />
                                <YAxis stroke="#4b5563" fontSize={12} />
                                <Tooltip
                                    contentStyle={{ backgroundColor: '#191919', border: 'none', borderRadius: '8px', color: '#f3f4f6' }}
                                    itemStyle={{ color: '#d1cdc7' }}
                                />
                                <Line type="monotone" dataKey="totalSales" name="Revenue" stroke="#D18D47" strokeWidth={3} dot={{ r: 4, fill: '#D18D47' }} activeDot={{ r: 8 }} />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Sub-Header / Actions */}
                <div className="flex justify-between items-center mb-8">
                    <h2 className="text-sm uppercase tracking-widest text-clinical-ink/60">Product List <span className="text-clinical-ink/40">[{products.length}]</span></h2>
                    <button
                        onClick={createProductHandler}
                        className="py-2 px-4 border border-clinical-ink/20 text-[10px] uppercase tracking-widest hover:bg-clinical-ink hover:text-white transition-all rounded-3xl"
                    >
                        + Add New Product
                    </button>
                </div>

                {/* Data Table */}
                <div className="overflow-x-auto border border-clinical-ink/10 bg-white rounded-3xl shadow-soft">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="border-b border-clinical-ink/10 text-[10px] uppercase tracking-widest text-clinical-ink/40">
                                <th className="p-6 font-normal">ID</th>
                                <th className="p-6 font-normal">Image</th>
                                <th className="p-6 font-normal">Name</th>
                                <th className="p-6 font-normal">Price</th>
                                <th className="p-6 font-normal">Category</th>
                                <th className="p-6 font-normal">Brand</th>
                                <th className="p-6 font-normal text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-clinical-ink/5 text-[11px] uppercase tracking-wide">
                            {products.map((product) => (
                                <tr key={product._id} className="group hover:bg-clinical-canvas/50 transition-colors">
                                    <td className="p-6 text-clinical-ink/30 font-mono">{product._id.substring(20, 24)}...</td>
                                    <td className="p-6">
                                        <div className="w-12 h-12 bg-clinical-canvas border border-clinical-ink/10 overflow-hidden rounded-xl">
                                            <img src={product.image} alt={product.name} className="w-full h-full object-cover mix-blend-multiply opacity-90 group-hover:opacity-100 transition-opacity" />
                                        </div>
                                    </td>
                                    <td className="p-6 font-bold text-clinical-ink">{product.name}</td>
                                    <td className="p-6 font-mono text-clinical-ink/70">Rs. {product.price}</td>
                                    <td className="p-6 text-clinical-ink/50">{product.category}</td>
                                    <td className="p-6 text-clinical-ink/50">{product.brand}</td>
                                    <td className="p-6 text-right space-x-4">
                                        <button
                                            onClick={() => navigate(`/admin/product/${product._id}/edit`)}
                                            className="text-clinical-ink/40 hover:text-accent-bronze transition-colors"
                                        >
                                            <FaEdit />
                                        </button>
                                        <button
                                            onClick={() => confirmDeleteHandler(product._id)}
                                            className="text-clinical-ink/40 hover:text-signal-error transition-colors"
                                        >
                                            <FaTrash />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {products.length === 0 && (
                    <div className="py-32 text-center border-x border-b border-clinical-ink/10 text-clinical-ink/20 uppercase tracking-widest text-xs">
                        No products found.
                    </div>
                )}
            </div>

            {/* Delete Confirmation Modal */}
            <AlertModal
                isOpen={isDeleteModalOpen}
                onClose={() => setIsDeleteModalOpen(false)}
                title="Confirm Asset Deletion"
                message="This action creates a permanent data gap. Recovering this asset will be impossible."
                type="danger"
                actionLabel="Execute Purge"
                onAction={executeDelete}
            />
        </div>
    );
};

export default AdminDashboard;
