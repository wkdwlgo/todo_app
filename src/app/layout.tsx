"use client";

import "./globals.css";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { metadata } from "@/metadata";


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  
  // 로고 클릭시 / 페이지로 이동
  return (
    <html>
      <body>
        
        <header className="py-2 pl-3">
          <Link href="/">
            <Image
              src={isMobile ? "/Size=Small.svg" : "/Size=Large.svg"}
              width={isMobile ? 71 : 151}
              height={isMobile ? 40 : 40}
              alt="logo"
            />
          </Link>
        </header>
        <hr />
        {children}
      </body>
    </html>
  );
}
