'use client';

export default function StoresPage() {
    const locations = [
        {
            city: 'Mumbai',
            address: 'Linking Road, Bandra West',
            hours: '11:00 AM - 9:00 PM',
            phone: '+91 22 XXXX XXXX'
        },
        {
            city: 'Delhi',
            address: 'Connaught Place, Central Delhi',
            hours: '11:00 AM - 9:00 PM',
            phone: '+91 11 XXXX XXXX'
        },
        {
            city: 'Bangalore',
            address: 'Indiranagar, 100 Feet Road',
            hours: '11:00 AM - 9:00 PM',
            phone: '+91 80 XXXX XXXX'
        }
    ];

    return (
        <div className="bg-clinical-canvas min-h-screen pt-20 md:pt-32 pb-40">
            <div className="container mx-auto px-container-sm md:px-container-md lg:px-container-lg max-w-5xl">
                <div className="mb-24 text-center">
                    <span className="font-sans text-[10px] uppercase tracking-[0.3em] text-clinical-ink/40 mb-6 block">
                        Visit Us
                    </span>
                    <h1 className="font-display font-black text-6xl md:text-8xl text-clinical-ink leading-none uppercase">
                        Store Locations
                    </h1>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                    {locations.map((location, index) => (
                        <div key={index} className="border border-clinical-ink/10 rounded-3xl p-8 bg-white hover:shadow-lg transition-shadow">
                            <h2 className="font-display font-bold text-2xl text-clinical-ink mb-6">{location.city}</h2>
                            <div className="space-y-4 text-clinical-ink/70 text-sm">
                                <div>
                                    <p className="font-sans font-bold text-xs uppercase tracking-wide mb-1 text-clinical-ink">Address</p>
                                    <p>{location.address}</p>
                                </div>
                                <div>
                                    <p className="font-sans font-bold text-xs uppercase tracking-wide mb-1 text-clinical-ink">Hours</p>
                                    <p>{location.hours}</p>
                                </div>
                                <div>
                                    <p className="font-sans font-bold text-xs uppercase tracking-wide mb-1 text-clinical-ink">Phone</p>
                                    <p>{location.phone}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-24 p-12 bg-clinical-ink text-white rounded-3xl text-center">
                    <h2 className="font-display font-bold text-3xl mb-4">Can't Visit?</h2>
                    <p className="text-white/70 mb-6">Shop our full collection online with free shipping on all orders.</p>
                    <a
                        href="/shop"
                        className="inline-block px-12 py-4 bg-white text-clinical-ink font-sans text-xs uppercase tracking-widest rounded-full hover:bg-accent-bronze hover:text-white transition-colors"
                    >
                        Shop Online
                    </a>
                </div>
            </div>
        </div>
    );
}
