import React, { useRef, useState } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion, AnimatePresence } from 'framer-motion';
import Spline from '@splinetool/react-spline';

gsap.registerPlugin(ScrollTrigger);

const skillsData = [
    {
        id: 'dev',
        category: 'Development',
        title: 'Full-Stack & MERN',
        icon: '</>',
        glow: 'from-accentCyan/20 to-transparent',
        borderGlow: 'border-accentCyan/50',
        textGlow: 'text-accentCyan',
        desc: 'Building scalable web architectures using React, Node.js, and modern state management. Focused on high-performance interactive interfaces.',
        tech: ['React', 'MERN', 'Tailwind', 'GraphQL']
    },
    {
        id: 'ai',
        category: 'Data Science',
        title: 'Artificial Intelligence',
        icon: '🧠',
        glow: 'from-accentYellow/20 to-transparent',
        borderGlow: 'border-accentYellow/50',
        textGlow: 'text-accentYellow',
        desc: 'Deep learning and predictive modeling utilizing Python and robust XGBoost frameworks for real-world applications.',
        tech: ['Python', 'XGBoost', 'Data Modeling']
    },
    {
        id: 'arch',
        category: 'System Arch',
        title: 'Rust & Tauri Environments',
        icon: '⚡',
        glow: 'from-purple-500/20 to-transparent',
        borderGlow: 'border-purple-500/50',
        textGlow: 'text-purple-400',
        desc: 'Architecting high-performance desktop applications and secure low-level systems.',
        tech: ['Rust', 'Tauri', 'System Design']
    },
    {
        id: 'lead',
        category: 'Leadership',
        title: 'Creative Direction',
        icon: '✦',
        glow: 'from-emerald-500/20 to-transparent',
        borderGlow: 'border-emerald-500/50',
        textGlow: 'text-emerald-400',
        desc: 'Managing large-scale creative initiatives, directing college societies, and leading teams to successful project execution.',
        tech: ['Team Management', 'Strategy', 'Design']
    }
];

const Skills = () => {
    const containerRef = useRef();
    // Default open the first key
    const [activeKey, setActiveKey] = useState('dev');

    useGSAP(() => {
        // ENTRANCE ANIMATION
        gsap.fromTo(".left-exhibit",
            { x: -250, opacity: 0 },
            { x: 0, opacity: 1, scrollTrigger: { trigger: containerRef.current, start: "top 85%", end: "top 30%", scrub: 1 } }
        );

        // Slide in the "Chassis" and stagger the "Keys"
        gsap.fromTo(".keyboard-chassis",
            { x: 200, opacity: 0 },
            { x: 0, opacity: 1, scrollTrigger: { trigger: containerRef.current, start: "top 85%", end: "top 30%", scrub: 1 } }
        );

        gsap.fromTo(".mech-key",
            { y: 50, opacity: 0 },
            { y: 0, opacity: 1, stagger: 0.15, scrollTrigger: { trigger: containerRef.current, start: "top 70%", end: "top 30%", scrub: 1 } }
        );

        // EXIT ANIMATION
        gsap.fromTo(".left-exhibit",
            { x: 0, opacity: 1 },
            { x: -250, opacity: 0, immediateRender: false, scrollTrigger: { trigger: containerRef.current, start: "bottom 75%", end: "bottom 20%", scrub: 1 } }
        );

        gsap.fromTo(".keyboard-chassis",
            { x: 0, opacity: 1 },
            { x: 200, opacity: 0, immediateRender: false, scrollTrigger: { trigger: containerRef.current, start: "bottom 75%", end: "bottom 20%", scrub: 1 } }
        );

    }, { scope: containerRef });

    return (
        <section id="skills" ref={containerRef} className="relative py-24 lg:py-32 bg-background overflow-x-hidden overflow-y-visible min-h-screen flex items-center">

            {/* GLOBAL AMBIENT BACKGROUND */}
            <div className="absolute inset-0 -z-10 pointer-events-none opacity-20">
                <motion.div style={{ willChange: "transform", transform: "translateZ(0)" }} animate={{ x: [0, -180, 120, 0], y: [0, -120, 160, 0], scale: [1, 1.3, 0.85, 1], borderRadius: ["50%", "40% 60% 70% 30%", "60% 40% 30% 70%", "50%"] }} transition={{ duration: 11, repeat: Infinity, ease: "linear" }} className="absolute bottom-10 right-1/4 w-[550px] h-[550px] bg-[#00FF66] mix-blend-screen filter blur-[120px]" />
                <motion.div style={{ willChange: "transform", transform: "translateZ(0)" }} animate={{ x: [0, 150, -100, 0], y: [0, 80, -140, 0], scale: [1, 1.1, 0.9, 1], borderRadius: ["50%", "30% 70% 50% 50%", "70% 30% 50% 50%", "50%"] }} transition={{ duration: 9, repeat: Infinity, ease: "linear" }} className="absolute top-20 left-1/4 w-[450px] h-[450px] bg-[#FF0055] mix-blend-screen filter blur-[120px]" />
            </div>

            <div className="max-w-[110rem] mx-auto px-4 sm:px-8 md:px-12 lg:px-16 relative z-20 w-full">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 xl:gap-32 items-center">

                    {/* LEFT COLUMN: Large Transparent Header & Floating Spline */}
                    <div className="left-exhibit relative w-full h-full flex flex-col justify-start mt-10 lg:mt-0">
                        <div className="absolute inset-0 z-0 pointer-events-none opacity-80">
                            <div className="absolute top-0 left-0 w-[400px] h-[400px] bg-purple-600/40 blur-[100px] rounded-full mix-blend-screen" />
                            <div className="absolute bottom-0 left-10 w-[350px] h-[350px] bg-red-600/50 blur-[100px] rounded-full mix-blend-screen" />
                            <div className="absolute top-1/4 right-0 w-[450px] h-[450px] bg-[#00FF66]/30 blur-[100px] rounded-full mix-blend-screen" />
                        </div>

                        <div className="relative z-30 pt-10 lg:pt-0 pointer-events-none">
                            <h2 className="text-6xl md:text-7xl lg:text-[5.5rem] font-bold text-white tracking-tighter leading-[1.1]">
                                Technical <br className="hidden lg:block" />
                                <span className="text-accentCyan italic font-serif font-light tracking-normal">Arsenal</span>
                            </h2>
                        </div>

                        <div className="spline-container w-[115%] -ml-[7.5%] h-[500px] md:h-[600px] lg:h-[750px] relative z-20 flex items-center justify-center cursor-grab active:cursor-grabbing -mt-4 lg:-mt-8">
                            <Spline scene="https://prod.spline.design/NFjdxIjwnAyqrHor/scene.splinecode" style={{ width: '100%', height: '100%' }} />
                        </div>
                    </div>

                    {/* RIGHT COLUMN: The Interactive Mechanical Macro-Pad */}
                    <div className="keyboard-chassis relative z-20 mt-4 lg:mt-0 p-4 md:p-8 bg-[#0a0a0a] rounded-[2.5rem] border-t border-white/10 border-b border-black shadow-[0_20px_50px_rgba(0,0,0,0.8),inset_0_2px_0_rgba(255,255,255,0.05)]">

                        {/* Chassis Inner Plate */}
                        <div className="bg-[#050505] rounded-[1.5rem] p-4 md:p-6 shadow-[inset_0_5px_20px_rgba(0,0,0,1)] flex flex-col gap-6">

                            {skillsData.map((skill) => {
                                const isActive = activeKey === skill.id;

                                return (
                                    <div
                                        key={skill.id}
                                        onClick={() => setActiveKey(isActive ? null : skill.id)}
                                        className={`mech-key relative w-full rounded-2xl cursor-pointer transition-all duration-300 ease-out select-none
                                            ${isActive
                                                ? 'translate-y-[6px] shadow-[0_2px_0_#000,0_5px_10px_rgba(0,0,0,0.8)]'
                                                : 'translate-y-0 shadow-[0_8px_0_#000,0_15px_20px_rgba(0,0,0,0.6)] hover:translate-y-[2px] hover:shadow-[0_6px_0_#000,0_10px_15px_rgba(0,0,0,0.6)]'
                                            }
                                        `}
                                    >
                                        {/* Keycap Top Surface */}
                                        <div className={`relative overflow-hidden bg-[#151515] rounded-xl border-t border-white/10 border-l border-white/5 transition-colors duration-500
                                            ${isActive ? `border-t-[1px] ${skill.borderGlow} bg-[#111]` : 'hover:bg-[#1a1a1a]'}
                                        `}>

                                            {/* RGB Underglow Effect (Visible when active) */}
                                            <div className={`absolute inset-0 bg-gradient-to-b ${skill.glow} transition-opacity duration-500 ${isActive ? 'opacity-100' : 'opacity-0'}`} />

                                            {/* Keycap Content */}
                                            <div className="relative z-10 p-6">

                                                {/* Header Row (Always Visible) */}
                                                <div className="flex items-center justify-between">
                                                    <div className="flex items-center gap-4">
                                                        <div className={`text-2xl transition-colors duration-500 ${isActive ? skill.textGlow : 'text-gray-500'}`}>
                                                            {skill.icon}
                                                        </div>
                                                        <div>
                                                            <span className="text-[10px] uppercase tracking-widest text-gray-500 font-bold block mb-1">{skill.category}</span>
                                                            <h3 className={`text-xl md:text-2xl font-bold transition-colors duration-500 ${isActive ? 'text-white' : 'text-gray-300'}`}>
                                                                {skill.title}
                                                            </h3>
                                                        </div>
                                                    </div>

                                                    {/* Key Switch Indicator */}
                                                    <div className="hidden md:flex w-6 h-6 rounded-full border border-white/10 items-center justify-center bg-black/50">
                                                        <div className={`w-2 h-2 rounded-full transition-all duration-300 ${isActive ? `bg-current shadow-[0_0_10px_currentColor] ${skill.textGlow}` : 'bg-gray-700'}`} />
                                                    </div>
                                                </div>

                                                {/* Expanding Description Area */}
                                                <AnimatePresence>
                                                    {isActive && (
                                                        <motion.div
                                                            initial={{ height: 0, opacity: 0 }}
                                                            animate={{ height: 'auto', opacity: 1 }}
                                                            exit={{ height: 0, opacity: 0 }}
                                                            transition={{ duration: 0.4, ease: [0.25, 1, 0.5, 1] }}
                                                            className="overflow-hidden"
                                                        >
                                                            <div className="pt-6 border-t border-white/10 mt-6">
                                                                <p className="text-gray-300 text-sm leading-relaxed mb-6">
                                                                    {skill.desc}
                                                                </p>
                                                                <div className="flex flex-wrap gap-2">
                                                                    {skill.tech.map((t) => (
                                                                        <span key={t} className="px-3 py-1 bg-black/50 border border-white/10 rounded-md text-xs text-gray-300 font-mono shadow-[inset_0_1px_0_rgba(255,255,255,0.1)]">
                                                                            {t}
                                                                        </span>
                                                                    ))}
                                                                </div>
                                                            </div>
                                                        </motion.div>
                                                    )}
                                                </AnimatePresence>

                                            </div>
                                        </div>
                                    </div>
                                );
                            })}

                        </div>
                    </div>

                </div>
            </div>

            {/* SEAMLESS TRANSITIONS */}
            <div className="absolute top-0 left-0 w-full h-48 bg-gradient-to-b from-background to-transparent z-30 pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 w-full h-64 bg-gradient-to-t from-background to-transparent z-30 pointer-events-none"></div>

        </section>
    );
};

export default Skills;