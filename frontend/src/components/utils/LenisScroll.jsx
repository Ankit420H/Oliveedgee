import { useEffect } from 'react';
import Lenis from 'lenis';

const LenisScroll = () => {
    useEffect(() => {
        const lenis = new Lenis({
            duration: 2.8, // Heavy, viscous feel (matches Damping 0.08 approx)
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            direction: 'vertical',
            gestureDirection: 'vertical',
            smooth: true,
            smoothTouch: false,
            touchMultiplier: 2,
        });

        function raf(time) {
            lenis.raf(time);
            requestAnimationFrame(raf);
        }

        requestAnimationFrame(raf);

        return () => {
            lenis.destroy();
        };
    }, []);

    return null; // Logic only
};

export default LenisScroll;
