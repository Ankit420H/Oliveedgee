import React, { useContext } from 'react';
import WishlistContext from '../context/WishlistContext';
import Meta from '../components/Meta';
import WishlistGrid from '../components/ui/WishlistGrid';

const WishlistPage = () => {
    const { wishlist } = useContext(WishlistContext);

    return (
        <div className="bg-clinical-canvas min-h-screen text-clinical-ink pt-32 pb-24">
            <Meta title="Tactical Reserve | Olive Edge" description="Your saved equipment list." />
            <div className="container mx-auto px-6 md:px-12">
                <div className="mb-12">
                    <span className="font-sans text-xs font-bold uppercase tracking-widest text-clinical-ink/60 mb-4 block">
                        Personnel Logistics
                    </span>
                    <h1 className="font-display font-black text-6xl md:text-heading-main mb-8 uppercase leading-[0.9]">
                        Tactical Reserve
                    </h1>
                </div>

                <WishlistGrid items={wishlist} />
            </div>
        </div>
    );
};

export default WishlistPage;
