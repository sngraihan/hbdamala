"use client";

import { useState } from "react";
import Countdown from "./components/Countdown";
import BirthdayPopup from "./components/BirthdayPopup";
import Link from "next/link";
import { playCelebrationAudio } from "./components/GlobalAudio";

export default function Home() {
  const [showPopup, setShowPopup] = useState(false);

  const handleFinish = () => {
    setShowPopup(true);
    playCelebrationAudio();
  };

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
