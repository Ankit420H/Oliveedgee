'use client';

import { motion } from 'framer-motion';

const SkeletonLoader = ({ className = "" }) => {
    return (
        <div className={`relative overflow-hidden bg-clinical-ink/5 rounded-3xl ${className}`}>
            <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                animate={{ x: ['-100%', '100%'] }}
                transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
            />
        </div>
    );
};

export default SkeletonLoader;
