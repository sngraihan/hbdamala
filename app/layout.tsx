import type { Metadata } from "next";
import "./globals.css";
import ClickSpark from "./components/ClickSpark";

import GlobalAudio from "./components/GlobalAudio";

export const metadata: Metadata = {
  title: "Happy Birthday Amala! 🎂",
  description: "Selamat Ulang Tahun ke-21, Amala! 🎉",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <body>
        <GlobalAudio />
        <ClickSpark
          sparkColor="#ff85a1"
          sparkSize={12}
          sparkRadius={20}
          sparkCount={12}
          duration={600}
        >
          {children}
        </ClickSpark>
      </body>
    </html>
  );
}
