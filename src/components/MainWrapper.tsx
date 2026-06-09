'use client';

import { useRef, useEffect } from "react";
import { ViewCanvas } from "./ViewCanvas";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function MainWrapper({ children }: { children: React.ReactNode }) {
  const mainRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    ScrollTrigger.normalizeScroll(true);
  }, []);

  return (
    <main ref={mainRef}>
      {children}
      <ViewCanvas eventSource={mainRef} />
    </main>
  );
}
