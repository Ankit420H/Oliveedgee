import ProductCard from '../../product/components/ProductCard';
import Link from 'next/link';
import { Product } from '../../product/types';

interface HomeCollectionGridProps {
    products: Product[];
}

const HomeCollectionGrid = ({ products }: HomeCollectionGridProps) => {
    // Limit to 6 items for the grid
    const displayProducts = products.slice(0, 6);

    return (
        <section className="py-24 bg-clinical-canvas">
            <div className="container mx-auto px-6">

                {/* Header */}
                <div className="flex items-end justify-between mb-16">
                    <div>
                        <h2 className="font-display font-bold text-4xl md:text-5xl text-clinical-ink mb-2">
                            Our Collections
                        </h2>
                    </div>

                    <Link href="/shop" className="hidden md:flex items-center justify-center w-24 h-24 rounded-full border border-clinical-ink/20 hover:border-black transition-colors group">
                        <span className="font-sans text-[10px] font-bold uppercase tracking-widest group-hover:scale-105 transition-transform">View All</span>
                    </Link>
                </div>

                {/* Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-16 gap-x-8">
                    {displayProducts.map((product) => (
                        <ProductCard key={product._id} product={product} />
                    ))}
                </div>

                {/* Mobile View All */}
                <div className="flex md:hidden justify-center mt-12">
                    <Link href="/shop" className="px-8 py-3 rounded-full border border-clinical-ink/20 font-sans text-xs font-bold uppercase tracking-widest">
                        View All
                    </Link>
                </div>

            </div>
        </section>
    );
};

export default HomeCollectionGrid;
