import React from 'react';
import { motion } from 'framer-motion';

const Footer = () => {

    // Smooth scroll back to top
    const handleReturnToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    return (
        <footer className="relative bg-[#030303] border-t border-white/5 pt-12 pb-8 px-6 overflow-hidden isolate z-50">

            {/* Subtle Top Glow */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-[1px] bg-gradient-to-r from-transparent via-[#00FFE0]/20 to-transparent" />

            <div className="w-full max-w-[90rem] mx-auto flex flex-col md:flex-row items-center justify-between gap-6">

                {/* LEFT: System Halt Message */}
                <div className="flex items-center gap-3">
                    <span className="text-[#00FFE0] font-mono text-sm">&gt;</span>
                    <p className="font-mono text-[10px] md:text-xs text-gray-500 uppercase tracking-[0.3em]">
                        SYSTEM_HALTED_2026
                    </p>
                    {/* The Blinking Caret */}
                    <motion.div
                        animate={{ opacity: [1, 0] }}
                        transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
                        className="w-2 md:w-2.5 h-4 bg-[#00FFE0] shadow-[0_0_8px_#00FFE0]"
                    />
                </div>

                {/* CENTER / RIGHT: Copyright & Telemetry */}
                <div className="font-mono text-[8px] md:text-[9px] text-gray-600 uppercase tracking-[0.4em] text-center md:text-right flex flex-col md:flex-row items-center gap-4 md:gap-8">
                    <span>{"// ALL_RIGHTS_RESERVED_ABHINAV_GOGOI/"}</span >
                    <span className="hidden md:inline text-white/10">|</span>
                    <span>ENCRYPTION: AES-256</span>
                </div>

                {/* RIGHT: Return to Top Command */}
                <button
                    onClick={handleReturnToTop}
                    className="group relative flex items-center gap-2 mt-4 md:mt-0"
                >
                    <span className="font-mono text-[9px] uppercase tracking-widest text-gray-500 group-hover:text-[#00FFE0] transition-colors duration-300">
                        [ EXECUTE: RETURN_TO_BASE ]
                    </span>
                    <motion.div
                        className="text-[#00FFE0] opacity-0 group-hover:opacity-100 transition-opacity"
                        animate={{ y: [0, -3, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                    >
                        ↑
                    </motion.div>
                </button>

            </div>

            {/* Background ambient CRT lines */}
            <div className="absolute inset-0 pointer-events-none opacity-[0.02] bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%)] bg-[length:100%_4px] -z-10" />
        </footer>
    );
};

export default Footer;