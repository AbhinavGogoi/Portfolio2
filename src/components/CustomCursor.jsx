import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

const CustomCursor = () => {
    // Hardware-accelerated motion values (bypasses React re-renders for performance)
    const cursorX = useMotionValue(-100);
    const cursorY = useMotionValue(-100);

    // Spring physics for a smooth, trailing "ghost" effect
    const springConfig = { damping: 25, stiffness: 400, mass: 0.5 };
    const cursorXSpring = useSpring(cursorX, springConfig);
    const cursorYSpring = useSpring(cursorY, springConfig);

    const [isHovering, setIsHovering] = useState(false);
    const [isClicking, setIsClicking] = useState(false);

    useEffect(() => {
        const moveCursor = (e) => {
            // Offset by 16px to perfectly center the 32px circle on the mouse pointer
            cursorX.set(e.clientX - 16);
            cursorY.set(e.clientY - 16);

            // High-performance hover detection (checks what the mouse is over without heavy event listeners)
            const target = e.target;
            if (target.closest('a, button, input, [role="button"]')) {
                setIsHovering(true);
            } else {
                setIsHovering(false);
            }
        };

        const handleMouseDown = () => setIsClicking(true);
        const handleMouseUp = () => setIsClicking(false);

        window.addEventListener('mousemove', moveCursor);
        window.addEventListener('mousedown', handleMouseDown);
        window.addEventListener('mouseup', handleMouseUp);

        return () => {
            window.removeEventListener('mousemove', moveCursor);
            window.removeEventListener('mousedown', handleMouseDown);
            window.removeEventListener('mouseup', handleMouseUp);
        };
    }, [cursorX, cursorY]);

    return (
        <motion.div
            className="fixed top-0 left-0 w-8 h-8 pointer-events-none z-[9999] hidden md:flex items-center justify-center rounded-full border border-[#00FFE0]/40 shadow-[0_0_10px_rgba(0,255,224,0.1)] transition-colors duration-300"
            style={{
                x: cursorXSpring,
                y: cursorYSpring,
                // Expands on hover, shrinks on click
                scale: isClicking ? 0.7 : isHovering ? 1.5 : 1,
                backgroundColor: isHovering ? 'rgba(0, 255, 224, 0.1)' : 'transparent',
            }}
        >
            {/* The Center Actuator Dot */}
            <div className={`w-1.5 h-1.5 bg-[#00FFE0] rounded-full shadow-[0_0_5px_#00FFE0] transition-opacity duration-300 ${isHovering ? 'opacity-0' : 'opacity-100'}`} />
        </motion.div>
    );
};

export default CustomCursor;