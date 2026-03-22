"use client";

import React, { useEffect, useRef, useState } from "react";

interface ScrollFloatProps {
  text: string;
  className?: string;
  delay?: number;
}

export default function ScrollFloat({ text, className = "", delay = 0 }: ScrollFloatProps) {
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Start empty to prevent hydration mismatch, but here we can just set visible if we want.
    // the observer is safer.
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }
    return () => observer.disconnect();
  }, []);

  const words = text.split(" ");

  return (
    <div
      ref={containerRef}
      className={`scroll-float-container ${className}`}
      style={{
        display: "inline-block",
        lineHeight: 1.5,
      }}
    >
      {words.map((word, index) => (
        <span
          key={index}
          style={{
            display: "inline-block",
            transform: isVisible ? "translateY(0) rotateX(0deg)" : "translateY(25px) rotateX(-20deg)",
            opacity: isVisible ? 1 : 0,
            transition: `opacity 0.7s cubic-bezier(0.16, 1, 0.3, 1) ${delay + index * 0.04}s, transform 0.7s cubic-bezier(0.16, 1, 0.3, 1) ${delay + index * 0.04}s`,
            transformOrigin: "bottom center",
            willChange: "transform, opacity",
            whiteSpace: "pre-wrap",
          }}
        >
          {word}{" "}
        </span>
      ))}
    </div>
  );
}
