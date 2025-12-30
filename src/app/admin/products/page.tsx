'use client';

import { useState, useEffect, useCallback, useContext } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { AuthContext, AuthContextType } from '../../../features/auth';
import { Product, fetchProducts as getProducts, deleteProduct as purgeProduct } from '../../../features/product';
import { FaEdit, FaTrash, FaPlus } from 'react-icons/fa';
import { toast } from 'react-toastify';
import AlertModal from '../../../components/ui/AlertModal';

const AdminProductListPage = () => {
    const { user, loading: authLoading } = useContext(AuthContext) as AuthContextType;
    const router = useRouter();

    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);

    // Modal State - Reusing AlertModal logic if needed, or simple confirm
    // The original used window.confirm, let's upgrade it to AlertModal if possible without too much boilerplate, 
    // or stick to window.confirm for speed if user preferred standardizing. 
    // User asked to standardize notification modals. So I SHOULD usage AlertModal.
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [productToDelete, setProductToDelete] = useState<string | null>(null);

    // Auth Protection
    useEffect(() => {
        if (!authLoading) {
            if (!user || !user.isAdmin) {
                router.push('/login');
            }
        }
    }, [user, authLoading, router]);


    const fetchProductsList = useCallback(async () => {
        try {
            const data = await getProducts(1000);
            setProducts(data.products || data);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching products:', error);
            toast.error('Failed to load products');
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        const syncProductsList = async () => {
            if (user && user.isAdmin) {
                await fetchProductsList();
            }
        };
        syncProductsList();
    }, [user, fetchProductsList]);

    const confirmDeleteHandler = (id: string) => {
        setProductToDelete(id);
        setIsDeleteModalOpen(true);
    };

    const executeDelete = async () => {
        if (!productToDelete) return;

        try {
            await purgeProduct(productToDelete);
            toast.success('Product deleted.');
            fetchProductsList();
            setIsDeleteModalOpen(false);
            setProductToDelete(null);
        } catch (error) {
            console.error('Error deleting product:', error);
            toast.error('Deletion failed.');
            setIsDeleteModalOpen(false);
        }
    };

    if (authLoading || !user || !user.isAdmin) {
        return <div className="min-h-screen pt-20 md:pt-32 text-center font-mono text-clinical-ink/40 animate-pulse">Verifying Credentials...</div>;
    }

    return (
        <div className="min-h-screen pt-20 md:pt-32 pb-40 font-mono text-clinical-ink bg-clinical-canvas">

            <div className="container mx-auto px-container-sm md:px-container-md lg:px-container-lg max-w-7xl">
                <div className="flex justify-between items-end mb-12">
                    <div>
                        <span className="text-[10px] uppercase tracking-[0.2em] text-clinical-ink/40 block mb-2">
                            Admin Protocol
                        </span>
                        <h1 className="font-display font-black text-5xl uppercase leading-[0.9]">
                            Inventory Control
                        </h1>
                    </div>
                    <Link
                        href="/admin/product/new"
                        className="px-6 py-3 bg-clinical-ink text-white text-xs uppercase tracking-widest hover:bg-accent-bronze transition-colors flex items-center gap-3 rounded-full shadow-soft"
                    >
                        <FaPlus size={10} /> Add Product
                    </Link>
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
                                            <Link
                                                href={`/admin/product/${product._id}/edit`}
                                                className="text-clinical-ink/40 hover:text-accent-bronze transition-colors inline-block"
                                                title="Edit"
                                            >
                                                <FaEdit />
                                            </Link>
                                            <button
                                                onClick={() => confirmDeleteHandler(product._id)}
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

            <AlertModal
                isOpen={isDeleteModalOpen}
                onClose={() => setIsDeleteModalOpen(false)}
                title="Confirm Asset Deletion"
                message="This action creates a permanent data gap. Recovering this asset will be impossible."
                type="error"
                actionLabel="Execute Purge"
                onAction={executeDelete}
            />
        </div>
    );
};

export default AdminProductListPage;
