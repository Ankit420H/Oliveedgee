'use client';

import { useState, useEffect, useContext } from 'react';
import { useRouter } from 'next/navigation';
import api from '../../../../lib/api';
import { AuthContext, AuthContextType } from '../../../../features/auth';
import { createProduct } from '../../../../features/product';
import { toast } from 'react-toastify';
import { FaArrowLeft, FaSave } from 'react-icons/fa';

const ProductCreatePage = () => {
    const { user, loading: authLoading } = useContext(AuthContext) as AuthContextType;
    const router = useRouter();

    const [name, setName] = useState('');
    const [price, setPrice] = useState(0);
    const [image, setImage] = useState('');
    const [brand, setBrand] = useState('');
    const [category, setCategory] = useState('');
    const [countInStock, setCountInStock] = useState(0);
    const [description, setDescription] = useState('');
    const [uploading, setUploading] = useState(false);

    // Auth Protection
    useEffect(() => {
        if (!authLoading) {
            if (!user || !user.isAdmin) {
                router.push('/login');
            }
        }
    }, [user, authLoading, router]);

    const uploadFileHandler = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const formData = new FormData();
        formData.append('image', file);
        setUploading(true);

        try {
            const config = {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            };

            const { data } = await api.post('/api/upload', formData, config);
            setImage(data.image);
            setUploading(false);
            toast.success('Image vector uploaded');
        } catch (error) {
            console.error(error);
            setUploading(false);
            toast.error('Upload failed');
        }
    };

    const submitHandler = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const productData = {
                name,
                price,
                image,
                brand,
                category,
                countInStock,
                description,
            };

            await createProduct(productData);
            toast.success('Product Created');
            router.push('/admin/products');
        } catch (error) {
            console.error(error);
            toast.error('Operation Failed');
        }
    };

    if (authLoading || !user || !user.isAdmin) {
        return <div className="min-h-screen pt-32 text-center font-mono text-clinical-ink/40 animate-pulse">Verifying Credentials...</div>;
    }

    return (
        <div className="min-h-screen bg-clinical-canvas text-clinical-ink pt-32 pb-40 font-mono">
            <div className="container mx-auto px-container-sm md:px-container-md lg:px-container-lg max-w-4xl">

                <button
                    onClick={() => router.push('/admin/products')}
                    className="flex items-center gap-2 text-xs uppercase tracking-widest text-clinical-ink/40 hover:text-clinical-ink mb-12 transition-colors"
                >
                    <FaArrowLeft /> Return to Inventory
                </button>

                <div className="border border-clinical-ink/10 bg-white p-12 rounded-3xl shadow-soft">
                    <div className="flex justify-between items-end mb-12 border-b border-clinical-ink/10 pb-6">
                        <div>
                            <span className="block text-[10px] uppercase tracking-[0.3em] text-signal-success mb-2">
                                New Product
                            </span>
                            <h1 className="font-display font-black text-4xl md:text-heading-sub text-clinical-ink uppercase leading-[0.8]">
                                Add Product
                            </h1>
                        </div>
                    </div>

                    <form onSubmit={submitHandler} className="space-y-12">
                        {/* Image Section */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                            <div className="space-y-6">
                                <div className="aesop-input-group">
                                    <input
                                        type="text"
                                        value={image}
                                        onChange={(e) => setImage(e.target.value)}
                                        className="aesop-input"
                                        placeholder="Image URL"
                                        id="image"
                                    />
                                    <label htmlFor="image">Image URL</label>
                                </div>
                                <div className="relative">
                                    <input
                                        type="file"
                                        id="image-file"
                                        onChange={uploadFileHandler}
                                        className="hidden"
                                    />
                                    <label htmlFor="image-file" className="inline-block w-full py-4 px-4 border border-dashed border-clinical-ink/20 text-center text-[10px] uppercase tracking-widest cursor-pointer hover:bg-clinical-canvas hover:border-accent-bronze transition-all rounded-xl text-clinical-ink/60 hover:text-clinical-ink">
                                        {uploading ? 'Uploading...' : 'Click to Upload Asset'}
                                    </label>
                                </div>
                            </div>
                            <div className="w-full h-64 bg-clinical-canvas border border-clinical-ink/10 flex items-center justify-center overflow-hidden rounded-3xl">
                                {image ? (
                                    <img src={image} alt="Preview" className="w-full h-full object-contain mix-blend-multiply" />
                                ) : (
                                    <span className="text-[10px] uppercase tracking-widest text-clinical-ink/20">No Visual Data</span>
                                )}
                            </div>
                        </div>

                        {/* Basic Info */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="aesop-input-group">
                                <input
                                    type="text"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    className="aesop-input"
                                    placeholder="Product Name"
                                    id="name"
                                />
                                <label htmlFor="name">Product Name</label>
                            </div>
                            <div className="aesop-input-group">
                                <input
                                    type="number"
                                    value={price}
                                    onChange={(e) => setPrice(Number(e.target.value))}
                                    className="aesop-input"
                                    placeholder="Price"
                                    id="price"
                                />
                                <label htmlFor="price">Price</label>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            <div className="aesop-input-group">
                                <input
                                    type="text"
                                    value={brand}
                                    onChange={(e) => setBrand(e.target.value)}
                                    className="aesop-input"
                                    placeholder="Brand"
                                    id="brand"
                                />
                                <label htmlFor="brand">Brand</label>
                            </div>
                            <div className="aesop-input-group">
                                <input
                                    type="text"
                                    value={category}
                                    onChange={(e) => setCategory(e.target.value)}
                                    className="aesop-input"
                                    placeholder="Category"
                                    id="category"
                                />
                                <label htmlFor="category">Category</label>
                            </div>
                            <div className="aesop-input-group">
                                <input
                                    type="number"
                                    value={countInStock}
                                    onChange={(e) => setCountInStock(Number(e.target.value))}
                                    className="aesop-input"
                                    placeholder="Stock Count"
                                    id="countInStock"
                                />
                                <label htmlFor="countInStock">Stock Count</label>
                            </div>
                        </div>

                        {/* Description */}
                        <div className="aesop-input-group">
                            <textarea
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                rows={6}
                                className="aesop-input min-h-[150px] py-4"
                                placeholder="Description"
                                id="description"
                            ></textarea>
                            <label htmlFor="description">Description</label>
                        </div>

                        <button
                            type="submit"
                            className="w-full py-5 bg-clinical-ink text-white font-sans text-xs uppercase tracking-[0.2em] font-bold hover:bg-accent-bronze transition-all duration-300 flex items-center justify-center gap-4 rounded-full shadow-soft"
                        >
                            <FaSave /> Save Configuration
                        </button>

                    </form>
                </div>
            </div>
        </div>
    );
};

export default ProductCreatePage;
