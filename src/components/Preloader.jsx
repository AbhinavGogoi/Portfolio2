import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const bootLogs = [
    "INITIATING_CORE_SYSTEMS...",
    "MOUNTING_VIRTUAL_FILESYSTEM...",
    "FETCHING_USER_PROFILE: ABHINAV...",
    "BYPASSING_FIREWALL_PROTOCOLS...",
    "ESTABLISHING_SECURE_UPLINK...",
    "LOADING_ASSETS_V2.4...",
    "WELCOME_ABHINAV_OS"
];

const Preloader = ({ onComplete }) => {
    const [progress, setProgress] = useState(0);
    const [currentLog, setCurrentLog] = useState(0);
    const [isBooted, setIsBooted] = useState(false);

    useEffect(() => {
        // 1. Rapid-fire terminal logs
        const logInterval = setInterval(() => {
            setCurrentLog((prev) => {
                if (prev < bootLogs.length - 1) return prev + 1;
                clearInterval(logInterval);
                return prev;
            });
        }, 300);

        // 2. Randomized progress percentage
        const progressInterval = setInterval(() => {
            setProgress((prev) => {
                const jump = Math.floor(Math.random() * 15) + 1;
                const nextProgress = prev + jump;

                if (nextProgress >= 100) {
                    clearInterval(progressInterval);

                    // Trigger the "Split" animation after a brief pause at 100%
                    setTimeout(() => setIsBooted(true), 600);

                    // Tell App.js to remove this component completely
                    setTimeout(() => onComplete(), 1800);
                    return 100;
                }
                return nextProgress;
            });
        }, 150);

        return () => {
            clearInterval(logInterval);
            clearInterval(progressInterval);
        };
    }, [onComplete]);

    return (
        <AnimatePresence>
            {!isBooted && (
                <motion.div className="fixed inset-0 z-[9999] flex font-mono pointer-events-none overflow-hidden">

                    {/* LEFT HEAVY DOOR */}
                    <motion.div
                        initial={{ x: 0 }}
                        exit={{ x: "-100%" }}
                        transition={{ duration: 1.2, ease: [0.76, 0, 0.24, 1] }} // Cinematic acceleration
                        className="w-1/2 h-full bg-[#050505] border-r border-[#00FFE0]/20"
                    />

                    {/* RIGHT HEAVY DOOR */}
                    <motion.div
                        initial={{ x: 0 }}
                        exit={{ x: "100%" }}
                        transition={{ duration: 1.2, ease: [0.76, 0, 0.24, 1] }}
                        className="w-1/2 h-full bg-[#050505]"
                    />

                    {/* TERMINAL OVERLAY (Fades out right before the doors split) */}
                    <motion.div
                        exit={{ opacity: 0, scale: 0.95, filter: "blur(10px)" }}
                        transition={{ duration: 0.4 }}
                        className="absolute inset-0 flex flex-col items-center justify-center z-10"
                    >
                        <div className="w-full max-w-lg px-8">

                            {/* Header / Loading Counter */}
                            <div className="flex justify-between items-end mb-6 pb-4 border-b border-white/10">
                                <div className="text-5xl md:text-7xl font-black text-[#00FFE0]">
                                    {progress}<span className="text-2xl text-gray-500">%</span>
                                </div>
                                <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.4em] text-gray-500">
                                    <div className="w-2 h-2 bg-[#00FFE0] rounded-full animate-pulse" />
                                    System_Boot
                                </div>
                            </div>

                            {/* Dynamic Log Feed */}
                            <div className="h-32 flex flex-col justify-end space-y-2 overflow-hidden mask-image-fade">
                                {bootLogs.slice(0, currentLog + 1).map((log, i) => (
                                    <motion.div
                                        key={i}
                                        initial={{ opacity: 0, x: -10 }}
                                        animate={{ opacity: i === currentLog ? 1 : 0.4, x: 0 }}
                                        className={`text-xs md:text-sm tracking-wider flex gap-3 ${i === currentLog ? 'text-[#00FFE0]' : 'text-gray-500'}`}
                                    >
                                        <span>&gt;</span>
                                        <span>{log}</span>
                                    </motion.div>
                                ))}
                            </div>

                            {/* CRT Scanline effect overlaid purely on the text box */}
                            <div className="absolute inset-0 pointer-events-none opacity-10 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%)] bg-[length:100%_4px]" />
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default Preloader;