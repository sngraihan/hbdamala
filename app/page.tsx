"use client";

import { useState } from "react";
import Countdown from "./components/Countdown";
import BirthdayPopup from "./components/BirthdayPopup";
import Link from "next/link";
import { playCelebrationAudio } from "./components/GlobalAudio";

export default function Home() {
  const [hasStarted, setHasStarted] = useState(false);
  const [showPopup, setShowPopup] = useState(false);

  const handleFinish = () => {
    setShowPopup(true);
    playCelebrationAudio();
  };

  if (!hasStarted) {
    return (
      <main 
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "100vh",
          width: "100%",
          overflow: "hidden"
        }}
      >
        <button
          onClick={() => setHasStarted(true)}
          style={{
            padding: "1rem 2.5rem",
            fontSize: "1.3rem",
            fontFamily: "'Playfair Display', serif",
            borderRadius: "50px",
            border: "1px solid rgba(0,0,0,0.05)",
            background: "var(--color-card-bg)",
            color: "var(--color-text-primary)",
            cursor: "pointer",
            boxShadow: "0 8px 32px var(--color-card-shadow)",
            transition: "all 0.3s ease",
            zIndex: 10
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "translateY(-3px)";
            e.currentTarget.style.boxShadow = "0 12px 40px rgba(0,0,0,0.15)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "translateY(0)";
            e.currentTarget.style.boxShadow = "0 8px 32px var(--color-card-shadow)";
          }}
        >
          Klik jika kamu adalah amala
        </button>
      </main>
    );
  }

  return (
    <main 
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        width: "100%",
        overflow: "hidden"
      }}
    >
      {/* Background styling is handled in globals.css */}
      
      {/* Next Page Button */}
      {showPopup && (
        <div style={{ position: "absolute", top: "50%", right: "2rem", transform: "translateY(-50%)", zIndex: 50 }}>
          <Link href="/envelope">
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
      )}
      
      {/* Countdown View */}
      <Countdown onFinish={handleFinish} />

      {/* Conditional Popup View */}
      {showPopup && <BirthdayPopup />}
    </main>
  );
}
