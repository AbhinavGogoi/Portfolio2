import React, { useRef, useState, useEffect } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import Preloader from './components/Preloader';
import CustomCursor from './components/CustomCursor';
import Navbar from './components/Navbar';
import Hero from './sections/Hero';
import Projects from './sections/Projects';
import Skills from './sections/Skills';
import Journey from './sections/Journey';
import Contact from './sections/Contact';
import Footer from './components/Footer';

gsap.registerPlugin(ScrollTrigger);

function App() {
  const mainRef = useRef();
  const [bootComplete, setBootComplete] = useState(false);

  // Force Scroll to Top on Refresh
  useEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
    window.scrollTo(0, 0);
  }, []);

  useGSAP(() => {
    if (!bootComplete) return;

    // THE FIX: We ONLY target panels with the 'slide-panel' class.
    // We intentionally exclude Journey so we don't double-pin it.
    const slidePanels = gsap.utils.toArray('.slide-panel');

    slidePanels.forEach((section) => {
      ScrollTrigger.create({
        trigger: section,
        start: "top top",
        pin: true,
        pinSpacing: false, // Creates the cinematic slide-over effect
      });
    });

    ScrollTrigger.refresh();

  }, { scope: mainRef, dependencies: [bootComplete] });

  return (
    <main
      ref={mainRef}
      className={`bg-[#030303] font-sans relative ${!bootComplete ? 'h-screen overflow-hidden' : 'min-h-screen overflow-x-hidden'
        }`}
    >
      {/* AMBIENT NOISE OVERLAY */}
      <div
        className="fixed inset-0 z-[9999] pointer-events-none opacity-[0.04] mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />
      {/* PRELOADER */}
      {!bootComplete && (
        <Preloader onComplete={() => setBootComplete(true)} />
      )}

      {/* FLOATING UI */}
      <CustomCursor />
      <Navbar />

      {/* 
        =======================================================
        GSAP SLIDING PANELS (Only these first 3 slide over each other) 
        =======================================================
      */}
      <div className="panel slide-panel relative z-10"><Hero /></div>
      <div className="panel slide-panel relative z-20 shadow-[0_-20px_50px_rgba(0,0,0,0.8)]"><Projects /></div>
      <div className="panel slide-panel relative z-30 shadow-[0_-20px_50px_rgba(0,0,0,0.8)]"><Skills /></div>

      {/* 
        =======================================================
        STANDARD PANELS 
        Journey has its own internal animations, so it flows naturally.
        Contact & Footer follow behind it.
        =======================================================
      */}
      <div className="panel relative z-40 shadow-[0_-20px_50px_rgba(0,0,0,0.8)]"><Journey /></div>

      <div className="panel relative z-50 shadow-[0_-20px_50px_rgba(0,0,0,0.8)] bg-[#030303]">
        <Contact />
        <Footer />
      </div>

    </main>
  );
}

export default App;