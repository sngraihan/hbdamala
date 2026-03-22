"use client";

import { useEffect, useState } from "react";
import CurvedLoop from "./CurvedLoop";

const DigitBox = ({ digit, size = "normal" }: { digit: string; size?: "normal" | "large" }) => {
  const [animating, setAnimating] = useState(false);
  const [renderedDigit, setRenderedDigit] = useState(digit);
  
  useEffect(() => {
    if (digit !== renderedDigit) {
      setAnimating(true);
      const timer1 = setTimeout(() => setRenderedDigit(digit), 40);
      const timer2 = setTimeout(() => setAnimating(false), 80);
      return () => { clearTimeout(timer1); clearTimeout(timer2); };
    }
  }, [digit, renderedDigit]);

  const width = size === "large" ? "80px" : "50px";
  const height = size === "large" ? "110px" : "70px";
  const fontSize = size === "large" ? "4.5rem" : "2.5rem";

  return (
    <div style={{
      display: 'inline-flex',
      justifyContent: 'center',
      alignItems: 'center',
      width,
      height,
      backgroundColor: '#272935',
      color: '#fff',
      borderRadius: '8px',
      margin: '0 4px',
      position: 'relative',
      perspective: '1000px',
      boxShadow: '0 4px 10px rgba(0,0,0,0.2)',
      overflow: 'hidden'
    }}>
      <div style={{ 
        position: 'absolute', 
        width: '100%', 
        height: '2px', 
        backgroundColor: 'rgba(0,0,0,0.6)', 
        top: '50%', 
        transform: 'translateY(-50%)', 
        zIndex: 10 
      }} />
      <span style={{ 
        position: 'relative', 
        zIndex: 5, 
        fontFamily: "'Inter', sans-serif",
        fontWeight: 700,
        fontSize,
        lineHeight: 1,
        display: 'inline-block',
        animation: animating ? 'dateChange 0.15s ease-out' : 'none',
      }}>
        {renderedDigit}
      </span>
    </div>
  );
};


interface CountdownProps {
  onFinish: () => void;
}

const START_DATE = new Date("2005-03-23");
const END_DATE = new Date("2026-03-23");

// We want to complete the animation in about 4 seconds (4000ms).
const ANIMATION_DURATION_MS = 2000;
const TIME_DIFF_MS = END_DATE.getTime() - START_DATE.getTime();

export default function Countdown({ onFinish }: CountdownProps) {
  const [currentDate, setCurrentDate] = useState<Date>(START_DATE);
  const [isFinished, setIsFinished] = useState(false);

  useEffect(() => {
    let animationFrameId: number;
    let startTime: number | null = null;
    let isDone = false;

    // Check if we already reached the end date to prevent restarting
    if (currentDate.getTime() >= END_DATE.getTime()) {
      return;
    }

    const animate = (timestamp: number) => {
      if (isDone) return; // Prevent any further ticks

      if (!startTime) startTime = timestamp;
      const progress = timestamp - startTime;

      // Calculate how much time should have passed in our rapid simulation
      const elapsedSimulationTime = (progress / ANIMATION_DURATION_MS) * TIME_DIFF_MS;
      let nextDate = new Date(START_DATE.getTime() + elapsedSimulationTime);

      if (nextDate >= END_DATE || progress >= ANIMATION_DURATION_MS) {
        nextDate = END_DATE;
        setCurrentDate(nextDate);
        setIsFinished(true);
        isDone = true;
        onFinish();
        return; // strictly stop animation
      }

      setCurrentDate(nextDate);
      animationFrameId = requestAnimationFrame(animate);
    };

    // Initial small delay for dramatic effect
    const timeout = setTimeout(() => {
      animationFrameId = requestAnimationFrame(animate);
    }, 500);

    return () => {
      clearTimeout(timeout);
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
    };
    // Safe to ignore currentDate in deps since we only use it for the initial guard check
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [onFinish]);

  // Calculate simulated age
  const simulatedAge = currentDate.getFullYear() - START_DATE.getFullYear();

  return (
    <div 
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        padding: "1rem",
        fontFamily: "'Inter', sans-serif",
        position: "relative",
      zIndex: 10
      }}
    >
      <style>{`
        @keyframes dateChange {
          0% { transform: translateY(-30px); opacity: 0; }
          100% { transform: translateY(0); opacity: 1; }
        }
      `}</style>

      {/* Top Title (Changes upon finish) */}
      {isFinished ? (
        <div style={{ position: 'relative', zIndex: 20, width: '100%', marginBottom: '1px' }}>
          <CurvedLoop 
            marqueeText=" SELAMAT ULANG TAHUN ACII!!    " 
            speed={3.5}
            direction="left"
            curveAmount={-200}
          />
        </div>
      ) : (
        <h2
          style={{
            fontFamily: "'Playfair Display', serif",
            fontStyle: "italic",
            color: "var(--color-text-primary)",
            fontSize: "1.5rem",
            fontWeight: 500,
            marginBottom: "2rem",
            transition: "all 0.5s ease",
            textAlign: "center",
            position: "relative",
            zIndex: 20
          }}
        >
          Counting every moment...
        </h2>
      )}

      {/* Main Single Card */}
      <div
        style={{
          background: "var(--color-card-bg)",
          borderRadius: "20px",
          padding: "3rem 4rem",
          boxShadow: "0 10px 40px var(--color-card-shadow)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          minWidth: "320px",
          border: "1px solid rgba(0,0,0,0.02)",
        }}
      >
        {/* Date Display */}
        <div style={{ display: "flex", alignItems: "center", gap: "1rem", flexWrap: "wrap", justifyContent: "center" }}>
          <div
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "3rem",
              fontWeight: 700,
              color: "#272935",
              lineHeight: 1.1,
              letterSpacing: "-0.02em",
            }}
          >
            23 Maret
          </div>
          <div style={{ display: "flex" }}>
            {currentDate.getFullYear().toString().split('').map((char, i) => (
              <DigitBox key={`year-${char}-${i}`} digit={char} />
            ))}
          </div>
        </div>

        {/* Divider Line */}
        <div 
          style={{
            width: "60%",
            height: "1px",
            background: "linear-gradient(90deg, transparent, var(--color-text-secondary), transparent)",
            opacity: 0.3,
            margin: "2rem 0 1.5rem"
          }}
        />

        {/* Age Label */}
        <span
          style={{
            fontSize: "0.75rem",
            color: "#272935",
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            fontWeight: 600,
            marginBottom: "0.5rem"
          }}
        >
          Umur Kamu
        </span>

        {/* Age Number */}
        <div
          style={{
            fontSize: "5.5rem",
            fontWeight: 700,
            color: "#c25959",
            lineHeight: 1,
            marginBottom: "0.5rem"
          }}
        >
          {simulatedAge}
        </div>

        <span
          style={{
            fontSize: "0.875rem",
            color: "#272935",
            fontWeight: 600,
            opacity: 0.9
          }}
        >
          Tahun
        </span>
      </div>
    </div>
  );
}
