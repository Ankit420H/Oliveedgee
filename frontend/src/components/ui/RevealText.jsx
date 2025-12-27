import React from 'react';
import { motion } from 'framer-motion';

const RevealText = ({
    text,
    className = "",
    delay = 0,
    stagger = 0.05,
    tag = "div"
}) => {
    const words = text.split(" ");

    // Parent container: coordinates the stagger
    const container = {
        hidden: { opacity: 1 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: stagger,
                delayChildren: delay
            }
        }
    };

    // Child item: The actual animation
    const child = {
        hidden: { y: "100%", rotate: 2, opacity: 0 },
        visible: {
            y: "0%",
            rotate: 0,
            opacity: 1,
            transition: {
                duration: 0.8,
                ease: [0.16, 1, 0.3, 1] // Kinetic Bezier
            }
        }
    };

    const Tag = motion[tag];

    return (
        <Tag
            className={`flex flex-wrap overflow-hidden ${className}`}
            variants={container}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-10%" }}
        >
            {words.map((word, idx) => (
                <span key={idx} className="relative overflow-hidden inline-block mr-[0.2em] py-1">
                    <motion.span
                        variants={child}
                        className="inline-block"
                    >
                        {word}
                    </motion.span>
                </span>
            ))}
        </Tag>
    );
};

export default RevealText;
