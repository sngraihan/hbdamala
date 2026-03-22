"use client";

import { useEffect, useState } from "react";
import confetti from "canvas-confetti";
import Link from "next/link";

export default function BirthdayPopup() {
  const [mounted, setMounted] = useState(false);
  const [emojis, setEmojis] = useState<{ id: number; left: number; animationDuration: number; type: string }[]>([]);

  useEffect(() => {
    setMounted(true);

    // Initial massive colorful burst
    const end = Date.now() + 1500;
    const colors = ["#ff0a54", "#ff477e", "#ff85a1", "#fbb1bd", "#f9bec7", "#c8b6d8", "#8a6aa8", "#4facfe", "#f9d423"];

    (function frame() {
      confetti({
        particleCount: 5,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: colors,
        zIndex: 0,
      });
      confetti({
        particleCount: 5,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: colors,
        zIndex: 0,
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    })();

    // Continuous smooth snowfall effect (increased volume, optimized physics)
    // We run it less frequently but with slightly more particles per tick, 
    // and rely on gravity/drift to spread them out naturally without lagging.
    const snowInterval = setInterval(() => {
      // Regular confetti dots/squares
      confetti({
        particleCount: 5,
        angle: 90,
        spread: 360,     // Full spread
        origin: { y: -0.1, x: Math.random() }, // Random X position at the top
        colors: colors,
        startVelocity: 5,  // Slower start
        gravity: 0.8,      // Slower fall
        drift: Math.random() - 0.5, // Slight horizontal wind
        ticks: 400,        // Stay on screen longer
        shapes: ['circle', 'square'],
        scalar: Math.random() * 0.4 + 0.6, // Slightly varied sizes
        zIndex: 0,
        disableForReducedMotion: true, // Accessibility/performance fallback
      });
    }, 150);

    // Emoji snowfall generation
    let emojiIdCounter = 0;
    const emojiInterval = setInterval(() => {
      const emojiTypes = ['😘', '🥳', '🎉', '😺', '✨', '🎂', '❤️', '🍰', '🧸', '🎀'];
      const newEmoji = {
        id: emojiIdCounter++,
        left: Math.random() * 100, // Random X position 0-100%
        animationDuration: Math.random() * 5 + 5, // 5-10 seconds
        type: emojiTypes[Math.floor(Math.random() * emojiTypes.length)]
      };

      setEmojis((curr) => {
        // Keep only the most recent 30 emojis to prevent DOM bloat
        const updated = [...curr, newEmoji];
        return updated.length > 30 ? updated.slice(updated.length - 30) : updated;
      });
    }, 600); // Spawn an emoji every 0.8s

    return () => {
      clearInterval(snowInterval);
      clearInterval(emojiInterval);
    };
  }, []);

  if (!mounted) return null;

  return (
    <>


      {/* Pure CSS Emoji Snow */}
      <div style={{ position: "fixed", top: 0, left: 0, width: "100%", height: "100%", pointerEvents: "none", overflow: "hidden", zIndex: 0 }}>
        {emojis.map((emoji) => (
          <div
            key={emoji.id}
            style={{
              position: "absolute",
              left: `${emoji.left}%`,
              top: "-50px",
              fontSize: "clamp(1.5rem, 3vw, 2.5rem)", // Responsive sizing
              animation: `emojiFall ${emoji.animationDuration}s linear forwards, emojiSway 3s ease-in-out infinite alternate`,
            }}
          >
            {emoji.type}
          </div>
        ))}
      </div>

      <style jsx global>{`
        @keyframes fadeInUp {
          0% {
            opacity: 0;
            transform: translateY(30px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes emojiFall {
          to {
            transform: translateY(110vh);
          }
        }
        @keyframes emojiSway {
          from {
            margin-left: -20px;
          }
          to {
            margin-left: 20px;
          }
        }
      `}</style>
    </>
  );
}
