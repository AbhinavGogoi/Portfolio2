import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion, AnimatePresence } from 'framer-motion';

gsap.registerPlugin(ScrollTrigger);

// ==========================================
// TYPEWRITER HOOK 
// ==========================================
const useTypewriter = (text, speed = 35, backSpeed = 15, pause = 4000) => {
    const [displayedText, setDisplayedText] = useState('');
    const [isDeleting, setIsDeleting] = useState(false);

    useEffect(() => {
        let timer;
        if (!isDeleting && displayedText !== text) {
            timer = setTimeout(() => setDisplayedText(text.slice(0, displayedText.length + 1)), speed);
        } else if (!isDeleting && displayedText === text) {
            timer = setTimeout(() => setIsDeleting(true), pause);
        } else if (isDeleting && displayedText !== '') {
            timer = setTimeout(() => setDisplayedText(text.slice(0, displayedText.length - 1)), backSpeed);
        } else if (isDeleting && displayedText === '') {
            setIsDeleting(false);
        }
        return () => clearTimeout(timer);
    }, [displayedText, isDeleting, text, speed, backSpeed, pause]);

    return displayedText;
};

const Contact = () => {
    const containerRef = useRef();
    const inputRef = useRef();

    // Form & Terminal State
    const [step, setStep] = useState(0);
    const [inputValue, setInputValue] = useState('');
    const [history, setHistory] = useState([]);
    const [formData, setFormData] = useState({ name: '', email: '', message: '' });
    const [isSent, setIsSent] = useState(false);

    // Data for the Left Side HUD
    const rawInfoData = `> SYSTEM_INIT_FETCH...
> ALIAS: Abhinav Gogoi
> ROLE: Full-Stack Engineer
> BASE: KIIT University
> GITHUB: /abhinav
> LINK: /in/abhinavgogoi
> STATUS: AWAITING_CMD`;

    const typedInfo = useTypewriter(rawInfoData, 40, 15, 6000);

    const formSteps = [
        { key: 'name', prompt: 'root@uplink:~$ enter_identity --name' },
        { key: 'email', prompt: 'root@uplink:~$ enter_frequency --email' },
        { key: 'message', prompt: 'root@uplink:~$ input_payload --message' },
        { key: 'confirm', prompt: 'root@uplink:~$ [ Type "send" to transmit ]' }
    ];

    useGSAP(() => {
        gsap.fromTo(".terminal-grid",
            { y: 100, opacity: 0 },
            {
                y: 0,
                opacity: 1,
                duration: 1.2,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top 80%",
                    // 2. NEW: Only focus the terminal when they actually scroll to this section
                    onEnter: () => {
                        if (inputRef.current && step === 0) {
                            inputRef.current.focus({ preventScroll: true });
                        }
                    }
                }
            }
        );
    }, { scope: containerRef });

    const handleKeyDown = async (e) => {
        if (e.key === 'Enter' && inputValue.trim() !== '') {
            e.preventDefault();

            const currentStepData = formSteps[step];
            const newHistory = [...history, { prompt: currentStepData.prompt, input: inputValue }];

            setHistory(newHistory);

            if (step < 3) {
                setFormData({ ...formData, [currentStepData.key]: inputValue });
                setStep(step + 1);
                setInputValue('');
            } else if (step === 3 && inputValue.trim().toLowerCase() === 'send') {
                setInputValue('');
                triggerCrazyAnimation();
                await sendEmailToGmail();
            } else {
                setHistory([...newHistory, { prompt: 'ERR: Unknown command. Type "send" to transmit.', input: '' }]);
                setInputValue('');
            }
        }
    };

    // Auto-focus input
    useEffect(() => {
        if (!isSent && inputRef.current && step > 0) {
            inputRef.current.focus();
        }
    }, [step, isSent]);

    const sendEmailToGmail = async () => {
        // Web3Forms or Formspree integration goes here
        console.log("Transmission Data Ready:", formData);
    };

    const triggerCrazyAnimation = () => {
        const tl = gsap.timeline({ onComplete: () => setIsSent(true) });

        tl.to(".interactive-term", { x: -8, duration: 0.05, yoyo: true, repeat: 8 })
            .to(".term-content", { opacity: 0, duration: 0.1 })
            .to(".interactive-term", { borderColor: "#00FFE0", boxShadow: "inset 0 0 50px rgba(0,255,224,0.2)", duration: 0.2 })
            .to(".interactive-term", { borderColor: "rgba(255,255,255,0.05)", boxShadow: "none", duration: 0.5, ease: "power4.out" });
    };

    return (
        <section id="contact" ref={containerRef} className="relative min-h-screen bg-[#030303] flex flex-col items-center justify-center py-32 px-6 overflow-hidden isolate">

            {/* AMBIENT GRID */}
            <div className="absolute inset-0 opacity-[0.02] pointer-events-none -z-10"
                style={{ backgroundImage: `linear-gradient(to right, #00FFE0 1px, transparent 1px), linear-gradient(to bottom, #00FFE0 1px, transparent 1px)`, backgroundSize: '40px 40px' }} />

            <div className="w-full max-w-7xl relative z-10">

                <div className="mb-16 text-center md:text-left">
                    <h2 className="text-5xl md:text-7xl font-black text-white tracking-tighter uppercase leading-none">
                        Initiate <span className="text-[#00FFE0] italic font-serif">Contact</span>
                    </h2>
                    <p className="mt-4 font-mono text-[10px] text-gray-500 uppercase tracking-[0.4em]">Secure Command Line Interface v2.4</p>
                </div>

                <div className="terminal-grid grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">

                    {/* ========================================== */}
                    {/* LEFT SIDE: AUTO-TYPING HUD NODE */}
                    {/* ========================================== */}
                    <div className="relative bg-[#0A0A0A]/80 backdrop-blur-xl border border-white/5 rounded-[2rem] p-8 shadow-[0_20px_50px_rgba(0,0,0,0.5)] h-[450px] flex items-center justify-center overflow-hidden group">

                        {/* Top Gradient Accent */}
                        <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-[#00FFE0] to-transparent opacity-30" />

                        {/* CRT Scanline Overlay */}
                        <div className="absolute inset-0 opacity-10 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%)] bg-[length:100%_4px]" />

                        {/* Status Badge */}
                        <div className="absolute top-8 right-8 flex items-center gap-3 bg-white/5 border border-white/10 rounded-full px-4 py-1.5">
                            <span className="text-[8px] font-mono font-bold text-gray-400 uppercase tracking-widest">Node_Live</span>
                            <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse shadow-[0_0_8px_#22c55e]" />
                        </div>

                        {/* Centered HUD Brackets & Text */}
                        <div className="relative w-full max-w-sm p-8 flex items-center justify-center">
                            {/* Target Brackets */}
                            <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-white/10 group-hover:border-[#00FFE0]/50 transition-colors" />
                            <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-white/10 group-hover:border-[#00FFE0]/50 transition-colors" />
                            <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-white/10 group-hover:border-[#00FFE0]/50 transition-colors" />
                            <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-white/10 group-hover:border-[#00FFE0]/50 transition-colors" />

                            {/* Soft Glow behind text */}
                            <div className="absolute inset-0 bg-[#00FFE0]/5 blur-[40px] rounded-full" />

                            <pre className="relative z-10 font-mono text-[13px] md:text-sm text-[#00FFE0] whitespace-pre-wrap leading-loose drop-shadow-[0_0_8px_rgba(0,255,224,0.4)] w-full">
                                {typedInfo}
                                <span className="w-2 h-4 inline-block bg-[#00FFE0] animate-pulse ml-1 align-middle opacity-80" />
                            </pre>
                        </div>
                    </div>

                    {/* ========================================== */}
                    {/* RIGHT SIDE: INTERACTIVE TERMINAL */}
                    {/* ========================================== */}
                    <div className="interactive-term relative bg-[#050505]/90 backdrop-blur-xl border border-white/5 rounded-[2rem] p-8 md:p-10 shadow-[0_30px_80px_rgba(0,0,0,0.8)] h-[450px] flex flex-col overflow-hidden cursor-text" onClick={() => inputRef.current?.focus()}>

                        {/* Terminal Controls */}
                        <div className="flex items-center gap-3 mb-8 pb-4 border-b border-white/5">
                            <div className="w-2.5 h-2.5 rounded-full bg-[#FF5F56] opacity-50" />
                            <div className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E] opacity-50" />
                            <div className="w-2.5 h-2.5 rounded-full bg-[#27C93F] opacity-50" />
                            <span className="ml-4 font-mono text-[9px] text-gray-600 uppercase tracking-[0.3em]">bash — session_01</span>
                        </div>

                        <AnimatePresence mode="wait">
                            {!isSent ? (
                                <motion.div
                                    key="terminal"
                                    exit={{ opacity: 0, scale: 0.98 }}
                                    className="term-content flex-1 overflow-y-auto scrollbar-hide flex flex-col font-mono text-sm"
                                >
                                    {/* History Log */}
                                    {history.map((item, i) => (
                                        <div key={i} className="mb-6 opacity-60">
                                            <div className="text-gray-500 mb-1">{item.prompt}</div>
                                            <div className="text-white ml-4">&gt; {item.input}</div>
                                        </div>
                                    ))}

                                    {/* Active Prompt Line */}
                                    {step < 4 && (
                                        <div className="mt-auto relative group">
                                            <div className="text-[#00FFE0] mb-2 text-[12px] uppercase tracking-wider">{formSteps[step].prompt}</div>
                                            <div className="flex items-center bg-white/[0.02] border border-white/5 rounded-lg p-3 group-focus-within:border-[#00FFE0]/30 group-focus-within:bg-[#00FFE0]/5 transition-colors">
                                                <span className="text-[#00FFE0] mr-3 font-bold">&gt;</span>

                                                {/* Hidden Native Input */}
                                                <input
                                                    ref={inputRef}
                                                    type="text"
                                                    value={inputValue}
                                                    onChange={(e) => setInputValue(e.target.value)}
                                                    onKeyDown={handleKeyDown}
                                                    className="absolute opacity-0 w-0 h-0"
                                                    autoComplete="off"
                                                />

                                                {/* Custom Displayed Input */}
                                                <div className="flex items-center flex-1 overflow-hidden">
                                                    <span className="text-white whitespace-pre">{inputValue}</span>
                                                    <div className="w-2 h-4 bg-[#00FFE0] animate-[pulse_1s_ease-in-out_Infinity] ml-1 shadow-[0_0_8px_#00FFE0]" />
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </motion.div>
                            ) : (
                                /* ========================================== */
                                /* SUCCESS OVERLAY */
                                /* ========================================== */
                                <motion.div
                                    key="success"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="absolute inset-0 flex flex-col items-center justify-center text-center p-8 z-30 bg-[#050505]/95 backdrop-blur-md"
                                >
                                    <div className="w-16 h-16 rounded-full border border-[#00FFE0]/30 flex items-center justify-center mb-6 relative isolate">
                                        <div className="absolute inset-0 bg-[#00FFE0]/10 rounded-full animate-ping -z-10" />
                                        <span className="text-[#00FFE0] text-2xl">✓</span>
                                    </div>

                                    <h3 className="text-3xl font-black text-white tracking-tighter uppercase mb-4 drop-shadow-[0_0_15px_rgba(0,255,224,0.3)]">
                                        PAYLOAD <span className="text-[#00FFE0]">DELIVERED</span>
                                    </h3>

                                    <div className="font-mono text-[9px] text-gray-400 uppercase tracking-[0.4em] mb-10 space-y-2">
                                        <p>&gt; UPLINK ENCRYPTED</p>
                                        <p className="text-green-400">&gt; DATA ROUTED SECURELY</p>
                                        <p>&gt; CONNECTION CLOSED</p>
                                    </div>

                                    <button
                                        onClick={() => {
                                            setIsSent(false);
                                            setStep(0);
                                            setHistory([]);
                                            setFormData({ name: '', email: '', message: '' });
                                        }}
                                        className="px-6 py-2.5 border border-white/10 hover:border-[#00FFE0] hover:bg-[#00FFE0]/5 rounded-md font-mono text-[10px] text-gray-400 hover:text-white transition-all uppercase tracking-widest"
                                    >
                                        [ Restart Terminal ]
                                    </button>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Contact;