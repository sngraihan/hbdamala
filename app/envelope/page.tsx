"use client";

import { useState, useEffect, useRef } from "react";
import { DotLottiePlayer } from "@dotlottie/react-player";
import Link from "next/link";
import '@dotlottie/react-player/dist/index.css'; // Sometimes needed for proper sizing depending on version

export default function EnvelopePage() {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const playerRef = useRef<any>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (isOpen) {
      // Pause animation after opening so it stays static
      const timer = setTimeout(() => {
        if (playerRef.current && typeof playerRef.current.pause === 'function') {
          playerRef.current.pause();
        } else if (playerRef.current && playerRef.current.getLottie) {
          const lottieInstance = playerRef.current.getLottie();
          if (lottieInstance && typeof lottieInstance.pause === 'function') {
             lottieInstance.pause();
          }
        }
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  const handleOpen = () => {
    if (!isOpen) {
      setIsOpen(true);
    }
  };

  if (!mounted) return null;

  return (
    <main
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        width: "100%",
        overflow: "hidden",
        position: "relative",
      }}
    >
      {/* Back Button */}
      <div style={{ position: "absolute", top: "2rem", left: "2rem", zIndex: 50 }}>
        <Link href="/">
          <button
            style={{
              padding: "0.8rem",
              fontSize: "1.5rem",
              fontWeight: 600,
              color: "var(--color-text-primary)",
              background: "transparent",
              border: "none",
              cursor: "pointer",
              transition: "all 0.3s ease",
              fontFamily: "'Inter', sans-serif",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateX(-3px)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateX(0)";
            }}
          >
            &lt;
          </button>
        </Link>
      </div>

      {/* Next Page Button */}
      <div style={{ 
        position: "absolute", 
        top: "50%", 
        right: "2rem", 
        transform: "translateY(-50%)", 
        zIndex: 50,
        opacity: isOpen ? 1 : 0,
        pointerEvents: isOpen ? "auto" : "none",
        transition: "opacity 1s ease 1.5s" 
      }}>
        <Link href="/memories">
          <button
            style={{
              padding: "0.8rem",
              fontSize: "2rem",
              fontWeight: 300,
              color: "var(--color-text-primary)",
              background: "transparent",
              border: "none",
              cursor: "pointer",
              transition: "all 0.3s ease",
              fontFamily: "'Inter', sans-serif",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateX(5px)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateX(0)";
            }}
          >
            &gt;
          </button>
        </Link>
      </div>

      {/* Main Container */}
      <div
        style={{
          position: "relative",
          width: "100%",
          maxWidth: "600px",
          height: "600px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {/* The Sliding Letter */}
        <img
          src="/images/envelopebackground.png"
          alt="Surat"
          style={{
            position: "absolute",
            bottom: "50%",
            left: "50%",
            width: "95%",
            maxWidth: "550px",
            height: "auto",
            transform: `translate(-50%, ${isOpen ? "15%" : "40%"})`, // Slides up out of envelope when open
            opacity: isOpen ? 1 : 0,
            zIndex: 1, // Behind the envelope graphic
            transition: "all 1.5s cubic-bezier(0.4, 0, 0.2, 1)",
            pointerEvents: isOpen ? "auto" : "none",
          }}
        />

        {/* The Lottie Envelope */}
        <div
          onClick={handleOpen}
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            width: "100%",
            height: "100%",
            transform: `translate(-50%, -50%) ${isOpen ? "translateY(25%) scale(0.8)" : "translateY(0) scale(1)"}`, // Pushes down and shrinks slightly when opened to make room for the letter
            zIndex: 10, // In front of the letter
            transition: "all 1.5s cubic-bezier(0.4, 0, 0.2, 1)",
            cursor: isOpen ? "default" : "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {/* Lottie Container needs to be constrained so it doesn't blow up */}
          <div style={{ width: "80%", height: "80%", maxWidth: "400px", display: "flex", justifyContent: "center", alignItems: "center", position: "relative" }}>
             {!isOpen ? (
               <DotLottiePlayer
                  key="closed"
                  src="/Love Letter.lottie"
                  loop={false}
                  autoplay={false}
                  hover={true}
                  renderer="svg"
               />
             ) : (
               <DotLottiePlayer
                  ref={playerRef}
                  key="open"
                  src="/Love Letter.lottie"
                  loop={false}
                  autoplay={true}
                  renderer="svg"
               />
             )}
          </div>
        </div>



      </div>
      
      <style jsx global>{`
        @keyframes pulse {
          0%, 100% { opacity: 0.5; }
          50% { opacity: 0.9; }
        }
      `}</style>
    </main>
  );
}
