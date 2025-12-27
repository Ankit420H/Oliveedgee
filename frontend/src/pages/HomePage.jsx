import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import api from '../lib/api';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion'; // eslint-disable-line no-unused-vars

// New Reference Layout Components
import HomeHeroFilter from '../features/home/components/HomeHeroFilter';
import HomeCollectionGrid from '../features/home/components/HomeCollectionGrid';
import HomeQualityFeature from '../features/home/components/HomeQualityFeature';
import HomeCategoryList from '../features/home/components/HomeCategoryList';
import HomeNewsletter from '../features/home/components/HomeNewsletter';
import SkeletonLoader from '../components/ui/SkeletonLoader';

const HomePage = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const { data } = await api.get('/api/products?limit=6');
                setProducts(data.products);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching products:', error);
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    return (
        <div className="bg-clinical-canvas min-h-screen">
            <Helmet>
                <title>Olive Edge | Elemental Armor</title>
                <meta name="description" content="Technical apparel for the modern aesthete. Engineered ecosystems." />
            </Helmet>

            {/* 1. Hero with Filter Widget - Poster Style */}
            <div className="px-container-sm md:px-container-md lg:px-container-lg pt-32 pb-24">
                <HomeHeroFilter />
            </div>

            {/* 2. Collection Grid (3-Col) - "New Arrivals" */}
            <div className="px-container-sm md:px-container-md lg:px-container-lg pb-24">
                <div className="flex items-end justify-between mb-12 border-b border-clinical-ink/10 pb-6">
                    <h2 className="font-display font-black text-6xl md:text-8xl text-clinical-ink uppercase leading-[0.9]">
                        Latest<br /><span className="text-clinical-ink/20">Drops</span>
                    </h2>
                    <Link to="/shop" className="hidden md:flex items-center gap-2 text-xs font-mono uppercase tracking-widest hover:text-accent-bronze transition-colors">
                        View All <span className="text-lg">→</span>
                    </Link>
                </div>

                {loading ? (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[1, 2, 3].map((n) => <SkeletonLoader key={n} className="h-[500px] rounded-2xl" />)}
                    </div>
                ) : (
                    <HomeCollectionGrid products={products} />
                )}
            </div>

            {/* 3. Organic Poster Section - "The Ecosystem" */}
            <section className="px-container-sm md:px-container-md lg:px-container-lg pb-32">
                <div className="relative rounded-3xl overflow-hidden min-h-[80vh] grid grid-cols-1 lg:grid-cols-2">
                    {/* Left: Text & Texture */}
                    <div className="bg-clinical-ink text-clinical-canvas p-12 md:p-24 flex flex-col justify-between relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-accent-bronze opacity-5 blur-[100px] rounded-full pointer-events-none"></div>

                        <div>
                            <span className="font-mono text-accent-bronze text-xs tracking-widest uppercase mb-4 block">The Ecosystem</span>
                            <h2 className="font-display font-black text-5xl md:text-7xl uppercase leading-[0.9] mb-8">
                                Form Follows <br /><span className="text-transparent stroke-text hover:text-accent-bronze transition-colors duration-500 cursor-default" style={{ WebkitTextStroke: '2px #C5A065' }}>Function</span>
                            </h2>
                            <p className="font-sans text-lg text-clinical-canvas/60 max-w-md leading-relaxed">
                                Our garments are engineered for the urban nomad. Modular systems that adapt to your environment, featuring Japanese technical fabrics and Swiss hardware.
                            </p>
                        </div>

                        <div className="mt-12">
                            <Link to="/shop" className="inline-block bg-accent-bronze text-white px-8 py-4 rounded-full font-mono text-xs uppercase font-bold tracking-widest hover:bg-white hover:text-clinical-ink transition-colors">
                                Explore The System
                            </Link>
                        </div>
                    </div>

                    {/* Right: Immersive Image */}
                    <div className="relative h-[50vh] lg:h-auto">
                        <img src="https://images.unsplash.com/photo-1596716027429-79f83652617f?q=80&w=2000&auto=format&fit=crop" alt="Ecosystem" className="absolute inset-0 w-full h-full object-cover" />
                    </div>
                </div>
            </section>

            {/* 4. Featured Collections - "Poster Grid" */}
            <section className="px-container-sm md:px-container-md lg:px-container-lg pb-24">
                <h2 className="font-display font-bold text-3xl mb-12 text-center md:text-left">Curated Series</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
                    {/* Poster 1 */}
                    <div className="relative h-[600px] rounded-3xl overflow-hidden group cursor-pointer">
                        <img src="https://images.unsplash.com/photo-1542281286-9e0a56e2e224?q=80&w=2000&auto=format&fit=crop" alt="Monochrome Edit" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 filter grayscale group-hover:grayscale-0" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-80" />
                        <div className="absolute bottom-0 left-0 p-8 md:p-12 w-full">
                            <span className="text-accent-bronze font-mono text-xs uppercase tracking-widest mb-2 block">Series 001</span>
                            <h3 className="text-5xl md:text-7xl font-display font-black text-white uppercase leading-[0.9] mb-4">Monochrome<br />Edit</h3>
                            <div className="w-12 h-12 rounded-full border border-white/30 flex items-center justify-center text-white group-hover:bg-accent-bronze group-hover:text-white group-hover:border-accent-bronze transition-all">
                                <span className="text-xl">↗</span>
                            </div>
                        </div>
                    </div>
                    {/* Poster 2 */}
                    <div className="relative h-[600px] rounded-3xl overflow-hidden group cursor-pointer">
                        <img src="https://images.unsplash.com/photo-1632125943269-6dc555237748?q=80&w=2000&auto=format&fit=crop" alt="Technical Shells" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 filter grayscale group-hover:grayscale-0" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-80" />
                        <div className="absolute bottom-0 left-0 p-8 md:p-12 w-full">
                            <span className="text-accent-bronze font-mono text-xs uppercase tracking-widest mb-2 block">Series 002</span>
                            <h3 className="text-5xl md:text-7xl font-display font-black text-white uppercase leading-[0.9] mb-4">Technical<br />Shells</h3>
                            <div className="w-12 h-12 rounded-full border border-white/30 flex items-center justify-center text-white group-hover:bg-accent-bronze group-hover:text-white group-hover:border-accent-bronze transition-all">
                                <span className="text-xl">↗</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 5. Shop By Category (System) */}
            <div className="px-container-sm md:px-container-md lg:px-container-lg pb-24">
                <HomeCategoryList />
            </div>

            {/* 6. Newsletter */}
            <HomeNewsletter />

        </div>
    );
};

export default HomePage;
