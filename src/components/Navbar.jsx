import React, { useState, useRef } from 'react';
import { motion, useScroll, useMotionValueEvent, useSpring, useMotionValue, AnimatePresence } from 'framer-motion';

// ==========================================
// ADVANCED MAGNETIC PHYSICS
// ==========================================
const MagneticItem = ({ children, onMouseEnter, onMouseLeave }) => {
    const ref = useRef(null);
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const springConfig = { damping: 15, stiffness: 200, mass: 0.1 };
    const springX = useSpring(x, springConfig);
    const springY = useSpring(y, springConfig);

    const handleMouseMove = (e) => {
        const { clientX, clientY } = e;
        const { height, width, left, top } = ref.current.getBoundingClientRect();
        const middleX = clientX - (left + width / 2);
        const middleY = clientY - (top + height / 2);
        x.set(middleX * 0.4);
        y.set(middleY * 0.4);
    };

    const handleMouseLeave = () => {
        x.set(0); y.set(0);
        if (onMouseLeave) onMouseLeave();
    };

    return (
        <motion.div
            ref={ref}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            onMouseEnter={onMouseEnter}
            style={{ x: springX, y: springY }}
            className="relative px-6 py-3 cursor-pointer z-20 flex items-center justify-center"
        >
            {children}
        </motion.div>
    );
};

// ==========================================
// THE RESPONSIVE NAVBAR
// ==========================================
const Navbar = () => {
    const { scrollY } = useScroll();
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [hoveredIndex, setHoveredIndex] = useState(null);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false); // Mobile Menu State
    const lastYRef = useRef(0);

    // Optimized Scroll Logic
    useMotionValueEvent(scrollY, "change", (latest) => {
        const difference = latest - lastYRef.current;
        const isScrollingDown = difference > 0;

        // Don't collapse if the mobile menu is open
        if (latest > 150 && isScrollingDown && difference > 5 && !isMobileMenuOpen) {
            setIsCollapsed(true);
            setHoveredIndex(null);
        } else if (!isScrollingDown && difference < -5) {
            setIsCollapsed(false);
        }
        lastYRef.current = latest;
    });

    const navLinks = [
        { name: 'WORK', href: '#projects' },
        { name: 'STACK', href: '#skills' },
        { name: 'CHRONICLES', href: '#journey' },
        { name: 'CONTACT', href: '#contact' },
    ];

    return (
        <>
            {/* MAIN DESKTOP / MOBILE HEADER */}
            <div className="fixed top-4 md:top-6 left-0 right-0 z-[5000] flex justify-center pointer-events-none px-4">
                <motion.header
                    initial={false}
                    animate={{
                        width: isCollapsed ? "60px" : "100%",
                        maxWidth: isCollapsed ? "60px" : "600px",
                        height: "64px",
                    }}
                    transition={{ type: "spring", stiffness: 250, damping: 25, mass: 0.5 }}
                    className="relative bg-[#050505]/80 backdrop-blur-2xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] pointer-events-auto flex items-center overflow-hidden border border-white/5 rounded-full"
                    onMouseEnter={() => isCollapsed && setIsCollapsed(false)}
                >

                    {/* ROTATING ENERGY BORDER */}
                    <div className="absolute inset-[-50%] -z-10 animate-[spin_4s_linear_infinite]"
                        style={{ background: 'conic-gradient(from 0deg, transparent 70%, #00FFE0 100%)' }} />
                    <div className="absolute inset-[1px] bg-[#050505]/95 rounded-full -z-10 backdrop-blur-3xl" />

                    {/* EXPANDED HUD STATE */}
                    <motion.div
                        animate={{
                            opacity: isCollapsed ? 0 : 1,
                            filter: isCollapsed ? "blur(5px)" : "blur(0px)"
                        }}
                        transition={{ duration: 0.2 }}
                        className={`absolute inset-0 flex items-center justify-between md:justify-start px-4 w-full ${isCollapsed ? 'pointer-events-none' : ''}`}
                    >
                        {/* Logo Node */}
                        <div className="flex items-center gap-3 px-2 md:px-4 mr-2 min-w-max">
                            <div className="w-2 h-2 bg-[#00FFE0] rounded-full shadow-[0_0_8px_#00FFE0] animate-pulse" />
                            <span className="font-black text-white tracking-tighter text-lg">AG<span className="text-[#00FFE0]">.</span></span>
                        </div>

                        <div className="w-[1px] h-6 bg-white/10 hidden md:block" />

                        {/* Desktop Links */}
                        <nav className="hidden md:flex items-center relative w-full justify-around">
                            {navLinks.map((link, i) => (
                                <MagneticItem
                                    key={link.name}
                                    onMouseEnter={() => setHoveredIndex(i)}
                                    onMouseLeave={() => setHoveredIndex(null)}
                                >
                                    <a href={link.href} className={`font-mono text-[10px] uppercase tracking-[0.2em] transition-colors duration-300 relative z-20 ${hoveredIndex === i ? 'text-[#00FFE0]' : 'text-gray-400'}`}>
                                        {link.name}
                                    </a>

                                    {hoveredIndex === i && !isCollapsed && (
                                        <motion.div
                                            layoutId="target-lock"
                                            transition={{ type: "spring", stiffness: 300, damping: 25 }}
                                            className="absolute inset-0 border border-[#00FFE0]/30 bg-[#00FFE0]/5 rounded-full z-10 flex items-center justify-between px-2"
                                        >
                                            <div className="w-1 h-3 border-l-2 border-t-2 border-b-2 border-[#00FFE0] rounded-l-sm" />
                                            <div className="w-1 h-3 border-r-2 border-t-2 border-b-2 border-[#00FFE0] rounded-r-sm" />
                                        </motion.div>
                                    )}
                                </MagneticItem>
                            ))}
                        </nav>

                        {/* Mobile Menu Button */}
                        <button
                            className="md:hidden flex items-center justify-center px-4 py-2 text-[#00FFE0] font-mono text-[10px] uppercase tracking-widest border border-[#00FFE0]/30 rounded-full"
                            onClick={() => setIsMobileMenuOpen(true)}
                        >
                            MENU
                        </button>
                    </motion.div>

                    {/* DORMANT NODE STATE (Tiny Orb) */}
                    <motion.div
                        animate={{
                            opacity: isCollapsed ? 1 : 0,
                            scale: isCollapsed ? 1 : 0.5
                        }}
                        transition={{ duration: 0.2 }}
                        className={`absolute inset-0 flex items-center justify-center ${!isCollapsed ? 'pointer-events-none' : ''}`}
                    >
                        <div className="w-3 h-3 rounded-full bg-[#00FFE0] shadow-[0_0_15px_#00FFE0] animate-pulse" />
                    </motion.div>

                </motion.header>
            </div>

            {/* FULL SCREEN MOBILE OVERLAY */}
            <div id="mobile-menu-safe-zone" className="absolute top-0 left-0 w-0 h-0">
                <AnimatePresence>
                    {isMobileMenuOpen && (
                        <motion.div
                            initial={{ opacity: 0, y: "-100%" }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: "-100%" }}
                            transition={{ type: "spring", damping: 25, stiffness: 200 }}
                            className="fixed inset-0 z-[6000] bg-[#030303]/95 backdrop-blur-3xl flex flex-col items-center justify-center pointer-events-auto"
                        >
                            {/* Mobile Close Button */}
                            <button
                                className="absolute top-8 right-8 w-12 h-12 flex items-center justify-center text-white/50 hover:text-[#00FFE0] transition-colors"
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                            </button>

                            {/* Mobile Nav Links */}
                            <div className="flex flex-col items-center gap-8">
                                <span className="text-[10px] text-gray-500 font-mono uppercase tracking-[0.4em] mb-4">Select_Destination</span>
                                {navLinks.map((link, i) => (
                                    <motion.a
                                        key={link.name}
                                        href={link.href}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.1 * i }}
                                        onClick={() => setIsMobileMenuOpen(false)}
                                        className="text-4xl font-black text-white uppercase tracking-tighter hover:text-[#00FFE0] transition-colors"
                                    >
                                        {link.name}
                                    </motion.a>
                                ))}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </>
    );
};

export default Navbar;