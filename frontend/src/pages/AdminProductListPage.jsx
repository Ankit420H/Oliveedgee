import { useState, useEffect, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../lib/api';
import { FaEdit, FaTrash, FaPlus, FaBox } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { Helmet } from 'react-helmet-async';

const AdminProductListPage = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    const fetchProducts = useCallback(async () => {
        try {
            const { data } = await api.get('/api/products?limit=1000');
            setProducts(data.products || data);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching products:', error);
            toast.error('Failed to load products');
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        // eslint-disable-next-line
        fetchProducts();
    }, [fetchProducts]);

    const deleteHandler = async (id) => {
        if (window.confirm('CONFIRM DELETION: This action is irreversible.')) {
            try {
                await api.delete(`/api/products/${id}`);
                toast.success('Product deleted.');
                fetchProducts();
            } catch (error) {
                console.error('Error deleting product:', error);
                toast.error('Deletion failed.');
            }
        }
    };

    const createProductHandler = () => {
        navigate('/admin/product/new');
    };

    return (
        <div className="font-mono text-clinical-ink">
            <Helmet>
                <title>Inventory | Command Center</title>
            </Helmet>

            <div className="flex justify-between items-end mb-12">
                <div>
                    <span className="text-[10px] uppercase tracking-[0.2em] text-clinical-ink/40 block mb-2">
                        Admin Protocol
                    </span>
                    <h1 className="font-display font-black text-5xl uppercase leading-[0.9]">
                        Inventory Control
                    </h1>
                </div>
                <button
                    onClick={createProductHandler}
                    className="px-6 py-3 bg-clinical-ink text-white text-xs uppercase tracking-widest hover:bg-accent-bronze transition-colors flex items-center gap-3 rounded-full shadow-soft"
                >
                    <FaPlus size={10} /> Add Product
                </button>
            </div>

            {loading ? (
                <div className="mt-8 text-center font-mono text-xs text-clinical-ink/40 animate-pulse">
                    Synchronizing Database...
                </div>
            ) : (
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
                                    <td className="p-6 font-mono text-clinical-ink/70">₹ {product.price}</td>
                                    <td className="p-6 text-clinical-ink/50">{product.category}</td>
                                    <td className="p-6 text-clinical-ink/50">{product.brand}</td>
                                    <td className="p-6 text-right space-x-4">
                                        <button
                                            onClick={() => navigate(`/admin/product/${product._id}/edit`)}
                                            className="text-clinical-ink/40 hover:text-accent-bronze transition-colors"
                                            title="Edit"
                                        >
                                            <FaEdit />
                                        </button>
                                        <button
                                            onClick={() => deleteHandler(product._id)}
                                            className="text-clinical-ink/40 hover:text-signal-error transition-colors"
                                            title="Delete"
                                        >
                                            <FaTrash />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    {products.length === 0 && (
                        <div className="py-20 text-center text-clinical-ink/40 text-xs uppercase tracking-widest">
                            No products found in inventory.
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default AdminProductListPage;
