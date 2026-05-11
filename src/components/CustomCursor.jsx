import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

const CustomCursor = () => {
    const cursorRef = useRef(null);
    const ringRef = useRef(null);
    const [isPressed, setIsPressed] = useState(false);

    useEffect(() => {
        const cursor = cursorRef.current;
        const ring = ringRef.current;

        const moveCursor = (e) => {
            const { clientX: x, clientY: y } = e;

            // 1. The Actuator (Center Dot) - High speed
            gsap.to(cursor, {
                x,
                y,
                duration: 0.1,
                ease: 'power2.out',
            });

            // 2. The Keycap Housing (Outer Square) - Slight lag for weight
            gsap.to(ring, {
                x,
                y,
                duration: 0.25,
                ease: 'power3.out',
            });
        };

        const handleMouseDown = () => {
            setIsPressed(true);
            // Visual Bottom-Out
            gsap.to(ring, {
                scale: 0.88,
                backgroundColor: "rgba(0, 255, 224, 0.05)",
                duration: 0.1,
                ease: "power2.in"
            });
        };

        const handleMouseUp = () => {
            setIsPressed(false);
            // Mechanical Recoil/Spring
            gsap.to(ring, {
                scale: 1,
                backgroundColor: "transparent",
                duration: 0.4,
                ease: "back.out(4)" // High overshoot for that snappy reset
            });
        };

        const handleHoverEnter = () => {
            gsap.to(ring, {
                width: 65,
                height: 65,
                borderColor: "rgba(0, 255, 224, 0.6)",
                duration: 0.3,
                ease: "power2.out"
            });
        };

        const handleHoverLeave = () => {
            gsap.to(ring, {
                width: 45,
                height: 45,
                borderColor: "rgba(255, 255, 255, 0.2)",
                duration: 0.3,
                ease: "power2.in"
            });
        };

        window.addEventListener('mousemove', moveCursor);
        window.addEventListener('mousedown', handleMouseDown);
        window.addEventListener('mouseup', handleMouseUp);

        // Targeted haptics for interactive areas
        const interactiveTargets = document.querySelectorAll('button, a, .bento-box, .mech-key, .detail-card, .fly-card');
        interactiveTargets.forEach(el => {
            el.addEventListener('mouseenter', handleHoverEnter);
            el.addEventListener('mouseleave', handleHoverLeave);
        });

        return () => {
            window.removeEventListener('mousemove', moveCursor);
            window.removeEventListener('mousedown', handleMouseDown);
            window.removeEventListener('mouseup', handleMouseUp);
            interactiveTargets.forEach(el => {
                el.removeEventListener('mouseenter', handleHoverEnter);
                el.removeEventListener('mouseleave', handleHoverLeave);
            });
        };
    }, []);

    return (
        <div className="fixed top-0 left-0 w-full h-full pointer-events-none z-[9999] isolate">

            {/* 1. THE KEYCAP HOUSING (Rounded Square profile) */}
            <div
                ref={ringRef}
                className={`fixed top-0 left-0 w-[45px] h-[45px] border-2 rounded-xl -translate-x-1/2 -translate-y-1/2 transition-shadow duration-100 flex items-center justify-center overflow-hidden
                    ${isPressed
                        ? 'border-accentCyan shadow-[inset_0_4px_10px_rgba(0,0,0,0.9)]'
                        : 'border-white/20 shadow-[0_8px_0_rgba(0,0,0,0.5),0_15px_30px_rgba(0,0,0,0.3)]'
                    }
                `}
                style={{ willChange: 'transform, width, height, scale' }}
            >
                {/* 3. THE STEM CROSSHAIR (Etched look) */}
                <div className={`relative w-full h-full opacity-10 transition-opacity duration-300 ${isPressed ? 'opacity-40' : ''}`}>
                    <div className="absolute top-1/2 left-0 w-full h-[1px] bg-white" />
                    <div className="absolute left-1/2 top-0 h-full w-[1px] bg-white" />
                </div>

                {/* 4. INTERNAL GLOW ON PRESS */}
                <div className={`absolute inset-0 bg-accentCyan/10 opacity-0 transition-opacity duration-200 ${isPressed ? 'opacity-100' : ''}`} />
            </div>

            {/* 5. THE ACTUATOR CORE (Center Dot) */}
            <div
                ref={cursorRef}
                className="fixed top-0 left-0 w-2 h-2 bg-white rounded-full -translate-x-1/2 -translate-y-1/2 shadow-[0_0_12px_#fff] z-50"
            />

            {/* 6. TELEMETRY DISPLAY (Aesthetic Detail) */}
            <div className="fixed bottom-12 right-12 font-mono text-[9px] uppercase tracking-[0.4em] text-white/20 flex flex-col items-end gap-1.5 select-none">
                <div className="flex items-center gap-3">
                    <span className="text-gray-600">Switch_Model:</span>
                    <span className="text-accentCyan font-bold">Custom_Linear_v4</span>
                </div>
                <div className="flex items-center gap-3">
                    <span className="text-gray-600">Force_Feedback:</span>
                    <span className={isPressed ? 'text-green-500' : 'text-gray-500'}>
                        {isPressed ? '55G_ACTUATED' : '00G_NULL'}
                    </span>
                </div>
            </div>
        </div>
    );
};

export default CustomCursor;