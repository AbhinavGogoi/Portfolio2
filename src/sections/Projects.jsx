import React, { useState, useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion } from 'framer-motion';

gsap.registerPlugin(ScrollTrigger);

const projects = [
    {
        title: "Financial Fraud Detection",
        category: "AI & Data Science",
        description: "Engineered a real-time detection system utilizing dynamic graphs and network science metrics like PageRank and degree centrality to identify fraudulent ring patterns.",
        tech: ["Python", "NetworkX", "Graph ML"],
        link: "https://github.com/yourusername",
        image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=1000"
    },
    {
        title: "AI Resume Builder",
        category: "Full-Stack SaaS",
        description: "Developed a MERN stack platform featuring live HTML previews and intelligent API endpoints to generate ATS-optimized professional resumes.",
        tech: ["React", "Node.js", "MongoDB"],
        link: "https://github.com/yourusername",
        image: "https://images.unsplash.com/photo-1586281380349-632531db7ed4?auto=format&fit=crop&q=80&w=1000"
    },
    {
        title: "Voice-to-Text App",
        category: "Desktop Utility",
        description: "High-performance Tauri v2 desktop application utilizing a Rust backend and Deepgram API for real-time system audio capture and text injection.",
        tech: ["Tauri", "Rust", "Deepgram"],
        link: "https://github.com/yourusername",
        image: "https://images.unsplash.com/photo-1589254065878-42c9da997008?auto=format&fit=crop&q=80&w=1000"
    },
    {
        title: "Heart Attack Detection",
        category: "Machine Learning",
        description: "Predictive model utilizing clinical features and XGBoost to detect early heart attack signals across 6-hour and 24-hour time windows.",
        tech: ["Python", "XGBoost", "Data Science"],
        link: "https://github.com/yourusername",
        image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=1000"
    }
];

const Projects = () => {
    const [activeIndex, setActiveIndex] = useState(0);
    const [isExpanded, setIsExpanded] = useState(false);
    const containerRef = useRef();

    // Swipe State Detection
    const [touchStartX, setTouchStartX] = useState(null);
    const [touchStartY, setTouchStartY] = useState(null);
    const [touchEndX, setTouchEndX] = useState(null);
    const [touchEndY, setTouchEndY] = useState(null);

    const handleNext = () => setActiveIndex((prev) => (prev + 1) % projects.length);
    const handlePrev = () => setActiveIndex((prev) => (prev - 1 + projects.length) % projects.length);

    // ==========================================
    // MOBILE SWIPE LOGIC
    // ==========================================
    const onTouchStart = (e) => {
        setTouchEndX(null);
        setTouchEndY(null);
        setTouchStartX(e.targetTouches[0].clientX);
        setTouchStartY(e.targetTouches[0].clientY);
    };

    const onTouchMove = (e) => {
        setTouchEndX(e.targetTouches[0].clientX);
        setTouchEndY(e.targetTouches[0].clientY);
    };

    const onTouchEnd = () => {
        if (!touchStartX || !touchEndX) return;
        const distanceX = touchStartX - touchEndX;
        const distanceY = touchStartY - touchEndY;

        // If the user scrolled vertically more than horizontally, ignore it (it's a scroll, not a swipe)
        if (Math.abs(distanceY) > Math.abs(distanceX)) return;

        // Swipe threshold of 40px
        if (distanceX > 40) { // Swiped Left
            if (isExpanded) setIsExpanded(false);
            handleNext();
        } else if (distanceX < -40) { // Swiped Right
            if (isExpanded) setIsExpanded(false);
            handlePrev();
        }
    };

    // ==========================================
    // GSAP ANIMATIONS
    // ==========================================
    useGSAP(() => {
        let mm = gsap.matchMedia();

        mm.add({
            isDesktop: "(min-width: 1024px)",
            isMobile: "(max-width: 1023px)"
        }, (context) => {
            let { isDesktop } = context.conditions;

            // ENTRANCE ANIMATION
            const xOffset = isDesktop ? 250 : 100;
            gsap.fromTo(".left-text-block",
                { x: -xOffset, y: 100, opacity: 0 },
                { x: 0, y: 0, opacity: 1, scrollTrigger: { trigger: containerRef.current, start: "top 80%", end: "top 25%", scrub: 1 } }
            );
            gsap.fromTo(".right-carousel-block",
                { x: xOffset, y: -100, opacity: 0 },
                { x: 0, y: 0, opacity: 1, scrollTrigger: { trigger: containerRef.current, start: "top 80%", end: "top 25%", scrub: 1 } }
            );

            // CAROUSEL STACKING
            projects.forEach((_, i) => {
                const element = `#card-${i}`;
                const r = (i - activeIndex + projects.length) % projects.length;

                if (isExpanded) {
                    if (r === 0) {
                        gsap.to(element, {
                            x: isDesktop ? -50 : 0,
                            y: 0,
                            width: "100%",
                            height: isDesktop ? "650px" : "75vh", // Uses Viewport Height on mobile to prevent clipping
                            scale: 1, zIndex: 100, opacity: 1, filter: 'blur(0px)',
                            duration: 0.8, ease: "expo.out"
                        });
                    } else {
                        gsap.to(element, { opacity: 0, duration: 0.4 });
                    }
                } else {
                    // DIAGONAL STACK FIX: Mobile now stacks diagonally so the cards are clearly visible
                    const config = isDesktop ? [
                        { x: 0, y: 0, scale: 1, opacity: 1, blur: 0, z: 50 },
                        { x: 80, y: 0, scale: 0.9, opacity: 0.5, blur: 5, z: 40 },
                        { x: 160, y: 0, scale: 0.8, opacity: 0.2, blur: 10, z: 30 }
                    ] : [
                        { x: 0, y: 0, scale: 1, opacity: 1, blur: 0, z: 50 },
                        { x: 20, y: 30, scale: 0.9, opacity: 0.8, blur: 2, z: 40 }, // Lighter blur and opacity
                        { x: 40, y: 60, scale: 0.8, opacity: 0.5, blur: 4, z: 30 }
                    ];

                    const state = config[r] || { x: isDesktop ? 350 : 0, y: isDesktop ? 0 : 100, scale: 1.1, opacity: 0, blur: 15, z: 10 };

                    gsap.to(element, {
                        x: state.x, y: state.y,
                        width: isDesktop ? "500px" : "90vw",
                        height: isDesktop ? "450px" : "400px",
                        scale: state.scale, opacity: state.opacity,
                        filter: `blur(${state.blur}px)`, zIndex: state.z,
                        duration: 0.8, ease: "power3.out"
                    });
                }
            });

            gsap.to(".left-text-block", {
                scale: isExpanded ? 0.85 : 1,
                opacity: isExpanded ? 0.3 : 1,
                duration: 0.7, ease: "expo.out"
            });

        });

        return () => mm.revert();
    }, { dependencies: [activeIndex, isExpanded], scope: containerRef });

    return (
        <section id="projects" ref={containerRef} className="relative w-full min-h-screen overflow-hidden bg-background flex flex-col justify-center py-24 lg:py-0">

            {/* BACKGROUND ELEMENTS */}
            <div className="absolute top-0 left-0 w-full h-48 bg-gradient-to-b from-background to-transparent z-10 pointer-events-none" />
            <div className="absolute inset-0 -z-10 pointer-events-none opacity-20 md:opacity-40">
                <motion.div style={{ willChange: "transform", transform: "translateZ(0)" }} animate={{ x: [0, -180, 120, 0], y: [0, -120, 160, 0], scale: [1, 1.3, 0.85, 1], borderRadius: ["50%", "40% 60% 70% 30%", "60% 40% 30% 70%", "50%"] }} transition={{ duration: 11, repeat: Infinity, ease: "linear" }} className="absolute bottom-10 right-1/4 w-[300px] md:w-[550px] h-[300px] md:h-[550px] bg-[#00FF66] mix-blend-screen filter blur-[70px] md:blur-[90px]" />
                <motion.div style={{ willChange: "transform", transform: "translateZ(0)" }} animate={{ x: [0, 150, -100, 0], y: [0, 80, -140, 0], scale: [1, 1.1, 0.9, 1], borderRadius: ["50%", "30% 70% 50% 50%", "70% 30% 50% 50%", "50%"] }} transition={{ duration: 9, repeat: Infinity, ease: "linear" }} className="absolute top-20 left-1/4 w-[250px] md:w-[450px] h-[250px] md:h-[450px] bg-[#FF0055] mix-blend-screen filter blur-[70px] md:blur-[90px]" />
            </div>
            <div className="absolute inset-0 z-0 pointer-events-none bg-noise opacity-[0.03] mix-blend-overlay" />

            <div className="relative z-20 px-6 md:px-12 max-w-[90rem] mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">

                {/* LEFT TEXT */}
                <div className="left-text-block text-white origin-left mt-10 lg:mt-0">
                    <h2 className="text-4xl sm:text-5xl lg:text-7xl font-light leading-[1.1] mb-6 lg:mb-8">
                        I am Abhinav, <br className="hidden lg:block" />
                        I build <span className="font-serif italic text-[#00FFE0] font-semibold">intelligent</span> <br />
                        yet highly functional & visually <br className="hidden lg:block" />
                        pleasing systems for <br className="hidden lg:block" />
                        the modern web.
                    </h2>
                    <div className="flex flex-wrap gap-4 lg:gap-6 text-[10px] lg:text-sm font-semibold uppercase tracking-widest text-gray-500 mt-8 lg:mt-14">
                        <span>Web & Mobile</span>
                        <span className="hidden sm:inline">/</span>
                        <span>AI Models</span>
                        <span className="hidden sm:inline">/</span>
                        <span>Architecture</span>
                    </div>
                </div>

                {/* RIGHT CAROUSEL (WITH TOUCH EVENTS) */}
                <div
                    className="right-carousel-block relative h-[500px] md:h-[550px] lg:h-[650px] w-full flex flex-col items-center justify-center lg:justify-start mt-4 lg:mt-0"
                    onTouchStart={onTouchStart}
                    onTouchMove={onTouchMove}
                    onTouchEnd={onTouchEnd}
                >
                    <div className="relative w-full h-full flex justify-center lg:justify-start mt-8 lg:mt-0">
                        {projects.map((project, i) => {
                            const r = (i - activeIndex + projects.length) % projects.length;
                            const activeExpanded = isExpanded && r === 0;

                            return (
                                <div
                                    key={i} id={`card-${i}`}
                                    className={`absolute bg-[#050505] isolate border border-white/10 rounded-[2rem] p-6 lg:p-10 shadow-2xl flex flex-col justify-between cursor-pointer group ${activeExpanded ? 'overflow-y-auto' : 'overflow-hidden'}`}
                                    onClick={() => r === 0 && !isExpanded && setIsExpanded(true)}
                                >
                                    <div className="z-10 relative">
                                        <span className="text-[#00FFE0] text-xs lg:text-sm font-bold uppercase tracking-widest mb-3 lg:mb-4 block">{project.category}</span>
                                        <h3 className={`font-bold text-white transition-all duration-500 ${activeExpanded ? 'text-3xl md:text-4xl lg:text-5xl mb-4 lg:mb-6' : 'text-2xl md:text-3xl lg:text-4xl'}`}>
                                            {project.title}
                                        </h3>

                                        <div className={`transition-all duration-700 ${activeExpanded ? 'opacity-100 mt-4 lg:mt-8' : 'opacity-0 h-0 overflow-hidden'}`}>
                                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-12 items-start pb-6">
                                                <div>
                                                    <p className="text-gray-400 text-sm lg:text-lg leading-relaxed mb-6 lg:mb-8">{project.description}</p>
                                                    <div className="flex flex-wrap gap-2 lg:gap-3 mb-6 lg:mb-10">
                                                        {project.tech.map((t, idx) => (
                                                            <span key={idx} className="bg-white/10 text-white px-3 lg:px-4 py-1 rounded-full text-[10px] lg:text-xs font-medium">{t}</span>
                                                        ))}
                                                    </div>
                                                    <a href={project.link} target="_blank" rel="noopener noreferrer" className="bg-[#00FFE0] text-black px-6 lg:px-8 py-3 rounded-full font-bold uppercase text-[10px] tracking-widest hover:bg-white transition-colors inline-block">
                                                        View Source Code
                                                    </a>
                                                </div>

                                                <motion.div
                                                    initial={{ opacity: 0, x: 30 }}
                                                    animate={activeExpanded ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
                                                    transition={{ delay: 0.5, duration: 0.6 }}
                                                    className="relative w-full h-[180px] lg:h-[300px] rounded-xl lg:rounded-2xl overflow-hidden border border-white/10 shadow-2xl mt-4 lg:mt-0"
                                                >
                                                    <img src={project.image} alt={project.title} className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700" />
                                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                                                </motion.div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className={`flex justify-between items-end z-10 relative pointer-events-none transition-opacity duration-300 ${isExpanded ? 'opacity-0 hidden' : 'opacity-100'}`}>
                                        <div className="flex flex-wrap gap-2 lg:gap-3">
                                            {project.tech.slice(0, 2).map((tech, idx) => (
                                                <span key={idx} className="bg-white/5 text-gray-300 text-[9px] lg:text-[10px] px-3 py-2 rounded-full font-medium uppercase tracking-widest">{tech}</span>
                                            ))}
                                        </div>
                                        <div className="w-10 h-10 lg:w-12 lg:h-12 rounded-full border border-white/20 flex flex-shrink-0 items-center justify-center text-white group-hover:border-[#00FFE0] group-hover:text-[#00FFE0] transition-all">→</div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    {/* MOBILE SWIPE INDICATOR */}
                    {!isExpanded && (
                        <div className="lg:hidden flex items-center justify-center gap-4 mt-8 text-gray-500 font-mono text-[10px] uppercase tracking-widest animate-pulse">
                            <span>← Swipe →</span>
                            <div className="w-1 h-1 rounded-full bg-gray-500" />
                            <span>Tap to Expand</span>
                        </div>
                    )}

                    {/* DESKTOP NEXT BUTTON (Hidden on Mobile) */}
                    <div className="hidden lg:block absolute -bottom-12 left-10 z-[110]">
                        <button
                            onClick={() => isExpanded ? setIsExpanded(false) : handleNext()}
                            className="text-white font-bold tracking-widest uppercase text-base inline-flex items-center justify-center gap-3 hover:text-[#00FFE0] transition-colors bg-[#030303]/80 px-6 py-2 rounded-full backdrop-blur-md border border-white/10"
                        >
                            {isExpanded ? <><span className="text-xl">←</span> Back</> : <>Next Project <span className="text-xl">→</span></>}
                        </button>
                    </div>

                    {/* MOBILE BACK BUTTON (Visible only when expanded) */}
                    {isExpanded && (
                        <div className="lg:hidden mt-6 z-[110]">
                            <button
                                onClick={() => setIsExpanded(false)}
                                className="text-white font-bold tracking-widest uppercase text-xs inline-flex items-center justify-center gap-2 border border-white/20 px-6 py-3 rounded-full hover:bg-white/5 transition-colors"
                            >
                                <span className="text-lg">←</span> Close Project
                            </button>
                        </div>
                    )}

                </div>
            </div>

            <div className="absolute bottom-0 left-0 w-full h-64 bg-gradient-to-t from-[#030303] to-transparent z-10 pointer-events-none"></div>
        </section>
    );
};

export default Projects;