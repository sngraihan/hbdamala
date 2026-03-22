"use client";

import DomeGallery from "../components/DomeGallery";
import Link from "next/link";
import "../components/DomeGallery.css";
import React from "react";

export default function MemoriesPage() {
  return (
    <main
      style={{
        width: "100%",
        minHeight: "100vh",
        background: "transparent",
        position: "relative",
        overflow: "hidden", 
        overscrollBehavior: "none"
      }}
    >
      {/* Back Button */}
      <div style={{ position: "absolute", top: "2rem", left: "2rem", zIndex: 50 }}>
        <Link href="/envelope">
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
      <div style={{ position: "absolute", top: "50%", right: "2rem", transform: "translateY(-50%)", zIndex: 50 }}>
        <Link href="/journey">
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

      <div style={{ padding: "3rem 2rem 0", textAlign: "center", position: "relative", zIndex: 10 }}>
        <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: "2.5rem", color: "var(--color-text-primary)", marginBottom: "0.5rem" }}>
          Our Memories
        </h1>

      </div>

      {/* Dome Gallery Container */}
      {/* 
        Dome Gallery uses touch-action: none and covers the screen nicely.
        We'll constrain it to an area so the title remains visible, but it also
        works beautifully taking up the whole screen.
       */}
      <div style={{ height: "calc(100vh - 120px)", width: "100%", position: "relative", zIndex: 1, marginTop: "-2rem" }}>
        <DomeGallery grayscale={false} overlayBlurColor="transparent" />
      </div>
    </main>
  );
}
