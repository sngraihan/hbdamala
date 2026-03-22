"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

// Global refs so audio survives unmounts across page transitions
let hornAudio: HTMLAudioElement | null = null;
let bgmAudio: HTMLAudioElement | null = null;
let musicStartedAtLeastOnce = false;
let isGlobalPaused = false;

export const playCelebrationAudio = async () => {
  if (!hornAudio || !bgmAudio) return;
  
  isGlobalPaused = false;
  hornAudio.currentTime = 0;
  bgmAudio.currentTime = 0;
  hornAudio.pause();
  bgmAudio.pause();
  
  try {
    hornAudio.volume = 0.8;
    bgmAudio.volume = 0.5; // cat song is usually loud, keep it balanced
    await hornAudio.play();
    musicStartedAtLeastOnce = true;
    window.dispatchEvent(new Event("music-played"));
    
    hornAudio.onended = () => {
      // Only start bgm if we haven't paused globally
      if (!isGlobalPaused) {
        bgmAudio?.play().catch(() => {});
      }
    };
  } catch (err) {
    console.error("Audio block:", err);
    window.dispatchEvent(new Event("music-paused"));
  }
};

export default function GlobalAudio() {
  const pathname = usePathname();
  const [isPlaying, setIsPlaying] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (!hornAudio && typeof window !== "undefined") {
      hornAudio = new Audio("/music/birthdayhorn.mp3");
      bgmAudio = new Audio("/music/cat song.mp3");
      bgmAudio.loop = true;
    }

    const handlePlayed = () => setIsPlaying(true);
    const handlePaused = () => setIsPlaying(false);

    window.addEventListener("music-played", handlePlayed);
    window.addEventListener("music-paused", handlePaused);

    return () => {
      window.removeEventListener("music-played", handlePlayed);
      window.removeEventListener("music-paused", handlePaused);
    };
  }, []);

  useEffect(() => {
    if (pathname === "/") {
      // When entering the countdown page, reset audio
      if (hornAudio && bgmAudio && musicStartedAtLeastOnce) {
        isGlobalPaused = true;
        hornAudio.pause();
        bgmAudio.pause();
        setIsPlaying(false);
      }
    }
  }, [pathname]);

  const toggleMusic = () => {
    if (!hornAudio || !bgmAudio) return;
    
    if (isPlaying) {
      isGlobalPaused = true;
      hornAudio.pause();
      bgmAudio.pause();
      setIsPlaying(false);
    } else {
      isGlobalPaused = false;
      if (hornAudio.ended || (hornAudio.currentTime === 0 && bgmAudio.currentTime > 0)) {
        bgmAudio.play().catch(e => console.log(e));
      } else {
        hornAudio.play().catch(e => console.log(e));
      }
      setIsPlaying(true);
      musicStartedAtLeastOnce = true;
    }
  };

  if (!mounted) return null;

  return (
    <button
      onClick={toggleMusic}
      title="Toggle Music"
      style={{
        position: "fixed",
        top: "20px",
        right: "20px",
        zIndex: 9999,
        background: "rgba(255, 255, 255, 0.15)",
        backdropFilter: "blur(5px)",
        color: "white",
        border: "1px solid rgba(255, 255, 255, 0.3)",
        cursor: "pointer",
        padding: "8px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "40px",
        height: "40px",
        borderRadius: "50%",
        boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
        transition: "all 0.3s ease"
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "scale(1.1)";
        e.currentTarget.style.background = "rgba(255, 255, 255, 0.25)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "scale(1)";
        e.currentTarget.style.background = "rgba(255, 255, 255, 0.15)";
      }}
    >
      {isPlaying ? (
        <svg fill="currentColor" viewBox="0 0 24 24" width="20" height="20">
          <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/>
        </svg>
      ) : (
        <svg fill="currentColor" viewBox="0 0 24 24" width="20" height="20">
          <path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z"/>
        </svg>
      )}
    </button>
  );
}
