"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import ScrollFloat from "../components/ScrollFloat";

// Anda bisa mengedit data ini sesuai dengan cerita perjalanan Anda
const timelineData = [
  {
    date: "10 November 2023",
    title: "Kenalan",
    description: "waktu itu ada tugas kelompok bikin game matkul ddp dan kita jadi sekelompok bareng jaki wkwkwk",
    image: "/images/memories/kenalan.jpg"
  },
  {
    date: "10 April 2024",
    title: "Awal Mula",
    description: "kita mulai ngobrol ngobrolin tentang kucing dan pake pp yang sama wkwkwkkw pdkt gituu ngobrolin lagu, kpop, kucing, bola semuanya dibahas demi obrolannya idup terus ",
    image: "/images/memories/awal mula.jpg"
  },
  {
    date: "1 Agustus 2024",
    title: "Ghosting",
    description: "kamu mulai ghostingin aku, aku ngirim 4 foto ke kamu hari itu tapi reaksi kamu ga kaya biasanya, padahal waktu itu aku baru aja beli raket baru demi bisa main bultang sama kamu eh tapi malah ga kepake :(((",
    image: "/images/memories/ghosting.jpg"
  },
  {
    date: "13 Agustus 2024",
    title: "Kasuh",
    description: "ternyata kita jadi partner kasuh dan mulai deket lagi perlahan waktu itu aku seneng banget bisa sama kamu walaupun kamu abis ghostingin aku",
    image: "/images/memories/kasuh.jpg"
  },
  {
    date: "20 Oktober 2024",
    title: "Es Krim",
    description: "aku ngasih eskrim ke kamu pas bazar css dan itu masih malu maluu heheh, trus kita difoto fotoin sama elen wkwkwkkw",
    image: "/images/memories/eskrim.jpg"
  },
  {
    date: "7 November 2024",
    title: "First Date",
    description: "date pertama kitaa ke cooler city masih pake baju himakom bener bener masih sekaku itu aseli, mana itu cuma pesen satu menu terus buka buka laptop sambil ngerjain tugas",
    image: "/images/memories/first date.jpg"
  },
  {
    date: "27 Desember 2024",
    title: "Bioskop Date",
    description: "bioskop date pertama kitaa wkwkkw Waktu itu nonton miracle in cell masih aku inget pulangnya kita makan mbok jum truss beli kebab pas nganterin kamu pulang",
    image: "/images/memories/bioskop date.jpg"
  },
  {
    date: "23 Maret 2025",
    title: "Ulang Tahun",
    description: "ini pertama kali aku ngasih hadiah ulang tahun ke kamuu, hadiahnya boneka lotso wkwkwk aku beliin karena warna ungu dan aku ngira kamu bakal suka, trus fotonya disepil sama temen kamu karena katanya kamu seneng banget",
    image: "/images/memories/ulang tahun.jpg"
  },
  {
    date: "27 April 2025",
    title: "Studlap",
    description: "kita ikut studlap dari kampus dan banyak kejadian sedih dan menyenangkan yang terjadi, kita sempet foto foto di bromo, pantai bali, jogja banyakk",
    image: "/images/memories/studlap.jpg"
  },
  {
    date: "8 Juni 2025",
    title: "Roblox ",
    description: "pertama kali kita main bareng di roblox naik gunung wkwkwkkw lucu bangett seru juga, kamu masih pake avatar awal lucu bangett",
    image: "/images/memories/roblox.jpg"
  },
  {
    date: "25 Juni 2025 00:16",
    title: "Jadian",
    description: "kita akhirnya jadian yeyyyyyyy karena kamu tiba tiba nyuruh aku nembak kamuu dan jadinya begitu deh hehehehe kejadiannya begitu cepat ya bung mana tengah malem lagi",
    image: "💖"
  },
  {
    date: "2 Juli 2025",
    title: "Mbeach",
    description: "kita jalan jalan bareng ke pantai mbeach sama temen temen, trus juga kita boncengan dari awal sampe akhir mwehehe :3, trus pas pulang kamu ngambek karena aku dituduh ga excited padahal aku excited banget ",
    image: "/images/memories/mbeach.jpg"
  },
  {
    date: "15 Desember 2025",
    title: "Kerja Praktik",
    description: "kita mulai ldr-an selama sebulanan :((((( karena kp sempet video callan beberapa kali, terus waktuitu juga pulang kp kita ke gacoan bareng karena pengen keteemu terus cerita cerita tentang kp",
    image: "/images/memories/kerja praktik.jpg"
  },
  {
    date: "9 Maret 2026",
    title: "Seminar KP",
    description: "kamu seminar kp yeyyy kamu keren banget pas seminar bener bener lancar banget ngomongnya happy semprotulesyen banget inimah, ditunggu seminar sempronya ya kak",
    image: "/images/memories/seminar kp.jpg"
  }
];

export default function JourneyPage() {
  const [mounted, setMounted] = useState(false);
  const [openItems, setOpenItems] = useState<Record<number, boolean>>({});

  useEffect(() => {
    setMounted(true);
  }, []);

  const toggleItem = (index: number) => {
    setOpenItems(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  if (!mounted) return null;

  return (
    <main
      style={{
        width: "100%",
        minHeight: "100vh",
        background: "transparent",
        position: "relative",
        overflowX: "hidden", 
        color: "var(--color-text-primary)",
        fontFamily: "'Inter', sans-serif"
      }}
    >
      {/* Back Button */}
      <div style={{ position: "fixed", top: "2rem", left: "2rem", zIndex: 50 }}>
        <Link href="/memories">
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

      {/* Loop to Start Button */}
      <div style={{ position: "fixed", top: "50%", right: "2rem", transform: "translateY(-50%)", zIndex: 50 }}>
        <Link href="/">
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

      <div style={{ padding: "5rem 2rem 2rem", textAlign: "center", position: "relative", zIndex: 10 }}>
        <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: "3rem", marginBottom: "0.5rem" }}>
          Our Journey
        </h1>
        <p style={{ maxWidth: "600px", margin: "0 auto", opacity: 0.8, fontSize: "1.1rem" }}>
          Setiap langkah yang kita lalui bersama adalah memori berharga.
        </p>
      </div>

      {/* Timeline Section */}
      <div className="timeline-container">
        {timelineData.map((item, index) => {
          const isLeft = index % 2 === 0;
          return (
            <div key={index} className={`timeline-item ${isLeft ? 'left' : 'right'}`}>
              <div className="timeline-dot"></div>
              
              <div className="timeline-content">
                <div className="timeline-header">
                  <span className="timeline-date">
                    <ScrollFloat text={item.date} delay={0} />
                  </span>
                  <h2 className="timeline-title">
                    <ScrollFloat text={item.title} delay={0.1} />
                  </h2>
                </div>
                
                <div className="timeline-body">
                  <div className="timeline-text">
                    <ScrollFloat text={item.description} delay={0.2} />
                    
                    {/* Tombol Lihat Memori */}
                    {!openItems[index] && (
                      <div style={{ marginTop: "1rem" }}>
                        <button 
                          onClick={() => toggleItem(index)}
                          className="view-memory-btn"
                        >
                          Lihat Memori
                        </button>
                      </div>
                    )}
                  </div>
                  
                  {/* Gambar atau Emoji yang tersembunyi (Kertas Polaroid) */}
                  <div className={`memory-paper ${openItems[index] ? 'open' : ''} ${isLeft ? 'left' : 'right'}`}>
                    <div className="timeline-image-wrapper">
                      {item.image.length <= 2 ? (
                        <div className="timeline-emoji">{item.image}</div>
                      ) : (
                        <img src={item.image} alt={item.title} className="timeline-image" />
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div style={{ padding: "0 2rem 4rem", textAlign: "center", position: "relative", zIndex: 10 }}>
        <p style={{ maxWidth: "600px", margin: "0 auto", opacity: 0.8, fontSize: "1.1rem", fontStyle: "italic" }}>
          maaf kalau ada yang kelupaan hehe, semoga kita kedepannya bisa banyak lagi bikin lebih banyak memori lagi ❤️
        </p>
      </div>

      <style jsx global>{`
        .timeline-container {
          position: relative;
          max-width: 1000px;
          margin: 0 auto;
          padding: 3rem 0 6rem 0;
        }

        /* The vertical center line */
        .timeline-container::after {
          content: '';
          position: absolute;
          width: 4px;
          background: linear-gradient(to bottom, transparent, var(--color-text-primary), transparent);
          opacity: 0.15;
          top: 0;
          bottom: 0;
          left: 50%;
          margin-left: -2px;
        }

        .timeline-item {
          padding: 20px 50px 80px 50px;
          position: relative;
          background-color: transparent;
          width: 50%;
        }
        
        .timeline-item.left {
          left: 0;
        }
        
        .timeline-item.right {
          left: 50%;
        }

        /* The circular dots */
        .timeline-dot {
          position: absolute;
          width: 24px;
          height: 24px;
          right: -12px;
          background-color: var(--color-background);
          border: 4px solid var(--color-text-primary);
          top: 40px;
          border-radius: 50%;
          z-index: 1;
          box-shadow: 0 0 10px rgba(0,0,0,0.1);
          transition: all 0.3s ease;
        }
        .timeline-item:hover .timeline-dot {
          transform: scale(1.2);
          background-color: var(--color-text-primary);
        }
        
        .timeline-item.right .timeline-dot {
          left: -12px;
        }

        .timeline-content {
          padding: 0 1rem;
          background: transparent;
          transition: transform 0.3s ease;
        }

        .timeline-item:hover .timeline-content {
          transform: translateY(-3px);
        }

        .timeline-date {
          font-size: 0.85rem;
          font-weight: 600;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          opacity: 0.7;
          display: block;
          margin-bottom: 0.5rem;
        }

        .timeline-title {
          font-family: 'Playfair Display', serif;
          font-size: 1.8rem;
          margin-bottom: 1.5rem;
          line-height: 1.2;
        }

        .timeline-body {
          position: relative;
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        .timeline-text {
          font-size: 1rem;
          line-height: 1.7;
          opacity: 0.9;
          position: relative;
          z-index: 2;
        }
        
        .view-memory-btn {
          background: rgba(255, 255, 255, 0.15);
          border: 1px solid rgba(255, 255, 255, 0.3);
          padding: 8px 20px;
          border-radius: 20px;
          color: var(--color-text-primary);
          font-family: 'Inter', sans-serif;
          font-size: 0.85rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          backdrop-filter: blur(5px);
          -webkit-backdrop-filter: blur(5px);
          margin-top: 0.5rem;
        }
        
        .view-memory-btn:hover {
          background: rgba(255, 255, 255, 0.25);
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(0,0,0,0.1);
        }

        /* Styling Kertas Memori (Polaroid) */
        .memory-paper {
          width: 260px;
          max-width: 100%;
          background: rgba(255, 255, 255, 0.1);
          border-radius: 12px;
          border: 1px solid rgba(255, 255, 255, 0.3);
          box-shadow: 0 15px 35px rgba(0,0,0,0.2);
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
          z-index: 10;
          opacity: 0;
          pointer-events: none;
          transition: all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1);
          margin-top: 0;
          margin-bottom: 0;
          /* Hidden State */
          max-height: 0;
          padding: 0 15px;
          border-width: 0;
          overflow: hidden;
          transform: scale(0.8) translateY(-20px);
        }

        .timeline-item.left .memory-paper {
          transform-origin: top left;
        }
        
        .timeline-item.right .memory-paper {
          transform-origin: top right;
          margin-left: auto; /* Push it to the right if wanted? Or keep left aligned. Leave as is */
        }

        .timeline-item.left .memory-paper.open {
          max-height: 500px;
          opacity: 1;
          pointer-events: auto;
          margin-top: 1.5rem;
          padding: 15px;
          border-width: 1px;
          transform: scale(1) translateY(0) rotate(-3deg);
        }
        
        .timeline-item.right .memory-paper.open {
          max-height: 500px;
          opacity: 1;
          pointer-events: auto;
          margin-top: 1.5rem;
          padding: 15px;
          border-width: 1px;
          transform: scale(1) translateY(0) rotate(3deg);
        }

        .timeline-image-wrapper {
          width: 100%;
          border-radius: 8px;
          overflow: hidden;
          background: transparent;
          display: flex;
          align-items: center;
          justify-content: center;
          aspect-ratio: 4 / 4;
        }

        .timeline-emoji {
          font-size: 4rem;
          filter: drop-shadow(0 4px 12px rgba(0,0,0,0.1));
          animation: floatEmoji 3s ease-in-out infinite alternate;
        }

        .timeline-image {
          width: 100%;
          height: 100%;
          border-radius: 8px;
          object-fit: cover;
        }

        @keyframes floatEmoji {
          0% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-10px) rotate(2deg); }
          100% { transform: translateY(0px) rotate(-2deg); }
        }

        /* Mobile responsiveness */
        @media screen and (max-width: 768px) {
          .timeline-container::after {
            left: 35px;
          }
          .timeline-item {
            width: 100%;
            padding: 20px 20px 60px 80px;
          }
          .timeline-item.right {
            left: 0%;
          }
          .timeline-item.left .timeline-dot,
          .timeline-item.right .timeline-dot {
            left: 23px;
          }
          
          /* Penyesuaian Kertas Memori di Mobile */
          .timeline-item.left .memory-paper,
          .timeline-item.right .memory-paper {
            margin-left: 0;
            transform-origin: top left;
          }
          
          .timeline-item.left .memory-paper.open,
          .timeline-item.right .memory-paper.open {
            transform: scale(1) translateY(0) rotate(2deg);
          }
        }
      `}</style>
    </main>
  );
}
