import { FaArrowRight } from 'react-icons/fa';

const HomeHeroFilter = () => {
    return (
        <div className="relative w-full flex flex-col items-center">
            {/* Main Floating Image Container - Poster Style */}
            <div className="relative w-full h-[85vh] min-h-[600px] rounded-poster overflow-hidden shadow-soft group">

                <div className="absolute inset-0 w-full h-full">
                    {/* Dynamic Scale Effect */}
                    <img
                        src="/images/hero2.jpg"
                        alt="Hero"
                        className="w-full h-full object-cover transition-transform duration-[1.5s] ease-out group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-black/10" />
                </div>

                {/* Hero Text */}
                <div className="absolute top-1/4 left-0 right-0 text-center z-10 px-4">
                    <h1 className="font-display font-black text-6xl md:text-heading-main text-white uppercase leading-[0.9] drop-shadow-sm">
                        Engineered For<br />The Modern <span className="text-accent-bronze">Man</span>
                    </h1>
                </div>

                {/* Floating Filter Bar - Overlapping the bottom edge */}
                <div className="absolute bottom-8 left-4 right-4 md:left-1/2 md:right-auto md:-translate-x-1/2 md:bottom-12 w-auto min-w-[300px] md:min-w-[800px] bg-white rounded-full shadow-soft p-2 flex flex-col md:flex-row gap-2 items-stretch z-20">

                    {/* Filter Integration */}
                    <div className="flex-1 grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-gray-100">
                        {/* Material */}
                        <div className="px-6 py-3 flex flex-col justify-center">
                            <label className="text-[10px] uppercase font-bold text-gray-400 tracking-widest mb-1">Category</label>
                            <select className="bg-transparent font-sans font-bold text-clinical-ink text-sm outline-none cursor-pointer appearance-none w-full hover:text-accent-bronze transition-colors">
                                <option>Apparel</option>
                                <option>Footwear</option>
                                <option>Accessories</option>
                            </select>
                        </div>

                        {/* Price Range */}
                        <div className="px-6 py-3 flex flex-col justify-center">
                            <label className="text-[10px] uppercase font-bold text-gray-400 tracking-widest mb-1">Size</label>
                            <select className="bg-transparent font-sans font-bold text-clinical-ink text-sm outline-none cursor-pointer appearance-none w-full hover:text-accent-bronze transition-colors">
                                <option>Small</option>
                                <option>Medium</option>
                                <option>Large</option>
                                <option>X-Large</option>
                            </select>
                        </div>

                        {/* Year/Style */}
                        <div className="px-6 py-3 flex flex-col justify-center">
                            <label className="text-[10px] uppercase font-bold text-gray-400 tracking-widest mb-1">Fit</label>
                            <select className="bg-transparent font-sans font-bold text-clinical-ink text-sm outline-none cursor-pointer appearance-none w-full hover:text-accent-bronze transition-colors">
                                <option>Regular</option>
                                <option>Relaxed</option>
                                <option>Slim</option>
                            </select>
                        </div>
                    </div>

                    {/* Search Button */}
                    <button className="bg-clinical-ink text-white rounded-full px-8 py-4 flex items-center justify-center gap-2 hover:bg-accent-bronze hover:text-white transition-all duration-300 min-w-[140px]">
                        <span className="font-sans font-bold text-xs uppercase tracking-widest">Search</span>
                        <FaArrowRight size={12} />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default HomeHeroFilter;
