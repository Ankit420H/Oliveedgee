import { useRef, useState } from 'react';
import { motion } from 'framer-motion'; // eslint-disable-line no-unused-vars

const MagneticButton = ({ children, className = "", strength = 30, onClick }) => {
    const ref = useRef(null);
    const [position, setPosition] = useState({ x: 0, y: 0 });

    const handleMouseMove = (e) => {
        const { clientX, clientY } = e;
        const { left, top, width, height } = ref.current.getBoundingClientRect();
        const x = clientX - (left + width / 2);
        const y = clientY - (top + height / 2);
        setPosition({ x: x / strength, y: y / strength }); // Divide by strength to dampen
    };

    const handleMouseLeave = () => {
        setPosition({ x: 0, y: 0 });
    };

    const { x, y } = position;

    return (
        <motion.button
            ref={ref}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            onClick={onClick}
            animate={{ x, y }}
            transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
            className={`relative overflow-hidden ${className}`}
        >
            {children}
        </motion.button>
    );
};

export default MagneticButton;
