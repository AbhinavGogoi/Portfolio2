import React from 'react';
import Spline from '@splinetool/react-spline';
import { motion, useScroll, useTransform } from 'framer-motion';

const Hero = () => {
    // Track the vertical scroll position
    const { scrollY } = useScroll();

    // TEXT ANIMATIONS: Map scroll position to X-axis movement
    // Reduced the mobile travel distance slightly so it feels smooth, not erratic
    const leftTextX = useTransform(scrollY, [0, 400], [0, -150]);
    const rightTextX = useTransform(scrollY, [0, 400], [0, 150]);

    // Fade text out gracefully before the Projects section
    const textOpacity = useTransform(scrollY, [0, 300], [1, 0]);

    // ORB COLOR ANIMATIONS
    const orb1Color = useTransform(scrollY, [0, 500], ['#00FFE0', '#FF1493']);
    const orb2Color = useTransform(scrollY, [0, 500], ['#2563EB', '#39FF14']);

    return (
        <section className="relative w-full h-[100svh] flex flex-col items-center justify-center overflow-hidden bg-[#030303]">

            {/* ========================================== */}
            {/* ANIMATED BACKGROUND ORBS                   */}
            {/* ========================================== */}
            <motion.div
                style={{ backgroundColor: orb1Color }}
                className="absolute top-1/4 left-0 md:left-1/4 w-64 h-64 md:w-96 md:h-96 rounded-full mix-blend-screen filter blur-[100px] md:blur-[120px] opacity-20 md:opacity-30 animate-pulse"
            />
            <motion.div
                style={{ backgroundColor: orb2Color }}
                className="absolute bottom-1/4 right-0 md:right-1/4 w-64 h-64 md:w-96 md:h-96 rounded-full mix-blend-screen filter blur-[100px] md:blur-[120px] opacity-20 md:opacity-30"
            />

            {/* ========================================== */}
            {/* SPLINE 3D INTEGRATION                      */}
            {/* ========================================== */}
            <div
                className="absolute inset-0 z-0 flex items-center justify-center opacity-60 md:opacity-80 pointer-events-none md:pointer-events-auto"
                onWheelCapture={(e) => e.stopPropagation()}
            >
                {/* 
                   MOBILE FIX: pointer-events-none on mobile ensures users can actually scroll 
                   past the section without getting their thumb trapped by the 3D canvas.
                   It turns back on for desktop (md:pointer-events-auto) so mouse users can play with it.
                */}
                <Spline scene="https://prod.spline.design/SdhiVq8JLO0P8JWd/scene.splinecode" />
            </div>

            {/* ========================================== */}
            {/* MAIN TYPOGRAPHY (SCROLL CONTROLLED)        */}
            {/* ========================================== */}
            <motion.div
                style={{ opacity: textOpacity }}
                className="z-10 text-center leading-[1.1] mt-10 md:mt-20 pointer-events-none flex flex-col items-center px-4"
            >
                {/* Fluid Typography: Scales perfectly from mobile to desktop using vw */}
                <h1 className="text-[12vw] sm:text-[9vw] md:text-8xl lg:text-[9rem] font-black tracking-tighter flex flex-col items-center text-white uppercase">

                    {/* Top Line: Slides Left */}
                    <motion.span style={{ x: leftTextX }} className="block">
                        Full-Stack
                    </motion.span>

                    {/* Bottom Line: Slides Right */}
                    <motion.span style={{ x: rightTextX }} className="block mt-1 md:mt-2 flex flex-col md:flex-row items-center">
                        <span className="font-serif italic font-semibold text-[#00FFE0] text-[10vw] sm:text-[8vw] md:text-7xl lg:text-8xl md:pr-6 lowercase md:uppercase">
                            AI & Web
                        </span>
                        <span>Engineer</span>
                    </motion.span>
                </h1>

                <p className="mt-8 text-gray-400 max-w-xs md:max-w-lg mx-auto text-[11px] md:text-sm font-mono tracking-widest uppercase">
                    Architecting robust MERN platforms, high-performance Tauri desktop applications, and intelligent Python-driven systems.
                </p>
            </motion.div>

        </section>
    );
};

export default Hero;