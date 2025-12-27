import { useState } from 'react';
import { FaPlus, FaMinus } from 'react-icons/fa';

const categories = [
    { title: 'Outerwear', count: '12', image: 'https://images.unsplash.com/photo-1632125943269-6dc555237748?q=80&w=800&auto=format&fit=crop' },
    { title: 'Tops', count: '24', image: 'https://images.unsplash.com/photo-1596716027429-79f83652617f?q=80&w=800&auto=format&fit=crop' },
    { title: 'Bottoms', count: '18', image: 'https://images.unsplash.com/photo-1455849318743-b2233052fcff?q=80&w=800&auto=format&fit=crop' },
    { title: 'Footwear', count: '08', image: 'https://images.unsplash.com/photo-1542281286-9e0a56e2e224?q=80&w=800&auto=format&fit=crop' },
    { title: 'Accessories', count: '15', image: 'https://images.unsplash.com/photo-1491553895911-0055eca6402d?q=80&w=800&auto=format&fit=crop' },
];

const HomeCategoryList = () => {
    const [hoveredCategory, setHoveredCategory] = useState(null);

    return (
        <section className="py-24 bg-clinical-canvas">
            <div className="container mx-auto px-6 max-w-6xl">
                {/* Header */}
                <div className="flex items-end justify-between mb-16 px-4">
                    <h2 className="font-display font-bold text-4xl text-clinical-ink">
                        Shop By Category
                    </h2>
                </div>

                {/* The List Interaction */}
                <div className="flex flex-col border-t border-clinical-border" onMouseLeave={() => setHoveredCategory(null)}>
                    {categories.map((cat, index) => (
                        <div
                            key={index}
                            className="group relative flex flex-col md:flex-row md:items-center justify-between py-8 border-b border-clinical-border cursor-pointer hover:bg-white/50 transition-colors px-6"
                            onMouseEnter={() => setHoveredCategory(index)}
                        >
                            <div className="flex items-center gap-12 z-10">
                                <span className="font-mono text-xs text-gray-400 opacity-60">0{index + 1}</span>
                                <h3 className="font-display text-3xl md:text-5xl font-medium text-clinical-ink group-hover:translate-x-4 transition-transform duration-500 ease-out">
                                    {cat.title}
                                </h3>
                            </div>

                            <div className="flex items-center gap-4 mt-6 md:mt-0 opacity-0 md:opacity-100 transition-opacity z-10">
                                <span className="font-sans text-xs font-bold uppercase tracking-widest text-clinical-ink/40 group-hover:text-clinical-ink transition-colors">
                                    {cat.count} Artifacts
                                </span>
                                <div className="w-10 h-10 rounded-full border border-clinical-border flex items-center justify-center group-hover:bg-clinical-ink group-hover:border-clinical-ink group-hover:text-white transition-all duration-300">
                                    <FaPlus size={10} />
                                </div>
                            </div>

                            <div
                                className={`absolute right-32 top-1/2 -translate-y-1/2 w-[300px] h-[200px] pointer-events-none transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] z-20 hidden md:block ${hoveredCategory === index ? 'opacity-100 rotate-0 scale-100' : 'opacity-0 rotate-6 scale-90'}`}
                            >
                                <img
                                    src={cat.image}
                                    alt={cat.title}
                                    className="w-full h-full object-cover rounded-3xl shadow-2xl grayscale-[20%] group-hover:grayscale-0 transition-all"
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default HomeCategoryList;
