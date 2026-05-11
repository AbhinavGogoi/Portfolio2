import React, { useRef, useState, useEffect } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion, AnimatePresence } from 'framer-motion';

gsap.registerPlugin(ScrollTrigger);

const milestones = [
    {
        date: "2022-2026",
        event: "INIT_CORE",
        title: "Degree Trajectory",
        location: "KIIT University",
        details: "Building the kernel of my career: B.Tech in CS. Optimized for algorithmic efficiency and system-level architectures.",
        status: "RUNNING",
        color: "#00FFE0",
        metrics: { cpu: "42%", mem: "1.2GB" }
    },
    {
        date: "2025-2026",
        event: "EXEC_LEAD",
        title: "President",
        location: "Kraftovity (Art Society)",
        details: "Orchestrating creative throughput for 200+ nodes. Scaling community engagement through strategic design leadership.",
        status: "ACTIVE",
        color: "#A855F7",
        metrics: { cpu: "88%", mem: "4.5GB" }
    },
    {
        date: "SUMMER_24",
        event: "INTEL_APPR",
        title: "Summer Apprenticeship",
        location: "Intel Unnati Program",
        details: "Architected social-impact solutions. Leveraged Intel-toolkits to map data-driven strategies to real-world problems.",
        status: "STABLE",
        color: "#27C93F",
        metrics: { cpu: "15%", mem: "2.1GB" }
    },
    {
        date: "SUMMER_25",
        event: "AI_DEPLOY",
        title: "Summer Internship",
        location: "NIELIT",
        details: "Engineered a predictive Task Management system. Integrated Google Calendar API for real-time lifecycle synchronization.",
        status: "STABLE",
        color: "#FACC15",
        metrics: { cpu: "34%", mem: "3.8GB" }
    }
];

const Journey = () => {
    const containerRef = useRef();
    const terminalRef = useRef();
    const sidebarRef = useRef();
    const bodyRef = useRef();
    const [visibleCount, setVisibleCount] = useState(0);
    const [isEnded, setIsEnded] = useState(false);

    useGSAP(() => {
        // ==========================================
        // 1. ENTRANCE ANIMATION (Scrubbed)
        // ==========================================
        gsap.fromTo([sidebarRef.current, terminalRef.current],
            { y: 100, opacity: 0, scale: 0.9 },
            {
                y: 0,
                opacity: 1,
                scale: 1,
                stagger: 0.1,
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top 95%",
                    end: "top 20%",
                    scrub: 1
                }
            }
        );

        // ==========================================
        // 2. INTERNAL TERMINAL SCROLL (Pinned)
        // ==========================================
        ScrollTrigger.create({
            trigger: containerRef.current,
            start: "top top",
            end: "+=3500",
            pin: true,
            scrub: 0.5,
            onUpdate: (self) => {
                const totalSteps = milestones.length + 1;
                const progressStep = Math.floor(self.progress * totalSteps);
                setVisibleCount(progressStep);
                setIsEnded(self.progress > 0.95);
            }
        });

        // ==========================================
        // 3. EXIT ANIMATION (Scrubbed)
        // ==========================================
        gsap.fromTo([sidebarRef.current, terminalRef.current],
            { y: 0, opacity: 1, scale: 1 },
            {
                y: -100,
                opacity: 0,
                scale: 0.9,
                immediateRender: false,
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "bottom 80%",
                    end: "bottom 20%",
                    scrub: 1
                }
            }
        );

    }, { scope: containerRef });

    useEffect(() => {
        if (bodyRef.current) {
            bodyRef.current.scrollTo({ top: bodyRef.current.scrollHeight, behavior: 'smooth' });
        }
    }, [visibleCount]);

    return (
        <section id="journey" ref={containerRef} className="relative w-full h-screen bg-background overflow-hidden flex items-center justify-center [perspective:2000px]">

            {/* AMBIENT GLOW */}
            <div className="absolute inset-0 -z-10 pointer-events-none transition-all duration-1000"
                style={{
                    background: isEnded
                        ? 'radial-gradient(circle at 50% 50%, rgba(255, 95, 86, 0.05) 0%, transparent 70%)'
                        : visibleCount > 0
                            ? `radial-gradient(circle at 50% 50%, ${milestones[Math.min(visibleCount - 1, milestones.length - 1)].color}08 0%, transparent 70%)`
                            : ''
                }}>
                <div className={`absolute top-1/4 left-1/4 w-[600px] h-[600px] blur-[150px] rounded-full animate-pulse transition-colors duration-1000 ${isEnded ? 'bg-red-500/10' : 'bg-accentCyan/5'}`} />
            </div>

            <div className="w-full max-w-[100rem] px-6 md:px-16 flex flex-col lg:flex-row gap-12 items-center lg:items-start justify-center">

                {/* SIDEBAR DASHBOARD */}
                <div ref={sidebarRef} className="hidden xl:flex flex-col gap-8 w-64 pt-20">
                    <div className="space-y-4">
                        <h2 className="text-5xl font-bold text-white tracking-tighter italic leading-none">THE<br /><span className="text-accentCyan">CHRONICLES</span></h2>
                        <div className="h-[2px] w-full bg-gradient-to-r from-accentCyan to-transparent opacity-30" />
                    </div>

                    <div className="space-y-6 font-mono">
                        <div className="space-y-2">
                            <span className="text-[10px] text-gray-600 uppercase font-black">System Status</span>
                            <div className={`text-xs flex items-center gap-2 transition-colors duration-500 ${isEnded ? 'text-red-500' : 'text-green-500'}`}>
                                <span className={`w-1.5 h-1.5 rounded-full ${isEnded ? 'bg-red-500' : 'bg-green-500 animate-ping'}`} />
                                {isEnded ? 'HALTED_END' : 'STABLE_FETCHING'}
                            </div>
                        </div>
                        <div className="space-y-2">
                            <span className="text-[10px] text-gray-600 uppercase font-black">Process_Load</span>
                            <div className="flex gap-1 h-2">
                                {[...Array(10)].map((_, i) => (
                                    <div key={i} className={`flex-1 rounded-sm transition-all duration-500 ${i < (visibleCount * 2.5) ? 'bg-accentCyan' : 'bg-white/5'}`} />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* THE TERMINAL */}
                <div ref={terminalRef} className={`relative w-full max-w-5xl bg-[#030303]/95 backdrop-blur-2xl border rounded-[2rem] overflow-hidden shadow-[0_60px_120px_-20px_rgba(0,0,0,1)] transition-colors duration-1000 ${isEnded ? 'border-red-500/20 shadow-red-500/5' : 'border-white/10'}`}>

                    {/* Retro Scanline Layer */}
                    <div className="absolute inset-0 opacity-[0.04] pointer-events-none z-30 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.3)_50%)] bg-[length:100%_3px]" />

                    {/* Window Controls */}
                    <div className="bg-white/[0.03] border-b border-white/10 px-8 py-6 flex items-center justify-between relative z-40">
                        <div className="flex gap-4">
                            <div className={`w-3 h-3 rounded-full ${isEnded ? 'bg-red-500 animate-pulse shadow-[0_0_10px_#ef4444]' : 'bg-[#FF5F56]'}`} />
                            <div className="w-3 h-3 rounded-full bg-[#FFBD2E]" />
                            <div className="w-3 h-3 rounded-full bg-[#27C93F]" />
                        </div>
                        <div className="font-mono text-[10px] text-gray-500 tracking-[0.4em] uppercase font-black">
                            {isEnded ? 'PROCESS_SHUTDOWN' : 'SYSTEM_UPLINK'} — v2.0.4
                        </div>
                    </div>

                    {/* Viewport */}
                    <div ref={bodyRef} className="p-8 md:p-16 h-[55vh] overflow-y-auto scrollbar-hide shadow-[inset_0_30px_60px_rgba(0,0,0,0.6)]">
                        <div className="flex gap-4 mb-14 items-center font-mono">
                            <span className="text-green-500 font-bold">➜</span>
                            <span className="text-accentCyan font-bold">~</span>
                            <span className="text-white/80 bg-white/5 border border-white/10 px-3 py-1 rounded">sudo execute --journey</span>
                        </div>

                        <div className="space-y-24">
                            {milestones.map((item, index) => (
                                <AnimatePresence key={index}>
                                    {visibleCount > index && (
                                        <motion.div
                                            initial={{ opacity: 0, x: -30, filter: "blur(12px)" }}
                                            animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                                            className="flex flex-col md:flex-row gap-8 md:gap-16 group"
                                        >
                                            <div className="flex flex-row md:flex-col items-center md:items-end md:pt-3 min-w-[140px] font-mono border-r border-white/5 md:pr-10">
                                                <span className="text-gray-600 text-[10px] font-black tracking-widest">{item.date}</span>
                                                <div className="hidden md:block w-full h-[1px] bg-gradient-to-r from-transparent to-white/10 mt-4 group-hover:to-accentCyan/50 transition-all duration-700" />
                                            </div>

                                            <div className="flex-1 space-y-4">
                                                <div className="flex items-center gap-4">
                                                    <span style={{ color: item.color }} className="font-mono font-black text-xs tracking-tighter">[{item.event}]</span>
                                                    <h3 className="text-white font-bold text-3xl md:text-4xl tracking-tighter transition-transform duration-500 group-hover:translate-x-2">
                                                        {item.title}
                                                    </h3>
                                                </div>
                                                <p className="text-gray-400 text-lg leading-relaxed font-light max-w-4xl border-l-2 border-white/5 pl-8 group-hover:border-accentCyan/40 transition-colors italic">
                                                    "{item.details}"
                                                </p>
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            ))}

                            {/* END OF JOURNEY SEQUENCE */}
                            <AnimatePresence>
                                {isEnded && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className="pt-20 pb-10 flex flex-col items-center text-center space-y-8"
                                    >
                                        <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-red-500/50 to-transparent" />
                                        <div className="space-y-4">
                                            <span className="text-red-500 font-mono text-xs font-black tracking-[0.5em] uppercase">[ Terminated ]</span>
                                            <h4 className="text-5xl md:text-7xl font-bold text-white tracking-tighter">End of <span className="italic">Journey.</span></h4>
                                        </div>
                                        <div className="flex gap-4">
                                            <div className="px-6 py-2 border border-red-500/30 rounded-full bg-red-500/5 text-red-500 font-mono text-[10px] font-bold">SESSION_CLOSED</div>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>

                            {/* BLINKING PROMPT */}
                            {!isEnded && (
                                <div className="flex items-center gap-4 pt-10 pb-32 font-mono">
                                    <span className="text-green-500 font-bold">➜</span>
                                    <span className="text-accentCyan font-bold">~</span>
                                    <motion.div
                                        animate={{ opacity: [1, 0, 1] }}
                                        transition={{ repeat: Infinity, duration: 0.8, ease: "steps(1)" }}
                                        className="w-3.5 h-7 bg-accentCyan shadow-[0_0_20px_#00FFE0]"
                                    />
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* FADES */}
            <div className="absolute top-0 left-0 w-full h-40 bg-gradient-to-b from-background to-transparent z-40 pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-full h-64 bg-gradient-to-t from-background to-transparent z-40 pointer-events-none" />

        </section>
    );
};

export default Journey;