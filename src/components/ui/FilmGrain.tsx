import { } from 'react';

const FilmGrain = () => {
    return (
        <div className="pointer-events-none fixed inset-0 z-[9999] h-full w-full opacity-[0.05] mix-blend-multiply overflow-hidden">
            <svg className="h-full w-full">
                <filter id="noise">
                    <feTurbulence
                        type="fractalNoise"
                        baseFrequency="0.8"
                        numOctaves="3"
                        stitchTiles="stitch"
                    />
                </filter>
                <rect width="100%" height="100%" filter="url(#noise)" />
            </svg>
        </div>
    );
};

export default FilmGrain;
