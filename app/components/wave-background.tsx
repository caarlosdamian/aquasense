"use client";

import { useEffect, useRef } from "react";
import { useTheme } from "@/app/components/theme-provider";

/**
 * WaveBackground
 * Fixed full-screen background layer matching the Lovable reference design:
 * - Clear light blue base (slate-100 / blue-50 tint)
 * - Large soft blurred blob circles that float with scroll parallax
 * - 3 depth layers at different scroll rates for parallax depth
 */
export default function WaveBackground() {
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";
  const slowRef  = useRef<HTMLDivElement>(null);
  const midRef   = useRef<HTMLDivElement>(null);
  const fastRef  = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      if (slowRef.current) slowRef.current.style.transform  = `translateY(${y * 0.06}px)`;
      if (midRef.current)  midRef.current.style.transform   = `translateY(${y * 0.12}px)`;
      if (fastRef.current) fastRef.current.style.transform  = `translateY(${y * 0.20}px)`;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
    >
      {/* ── Clear blue base gradient — matches Lovable bg-slate-100/blue-50 ── */}
      <div className="absolute inset-0" style={{ background: isDark ? "linear-gradient(160deg, #0f172a 0%, #1e293b 100%)" : "linear-gradient(160deg, #dbeafe 0%, #e0f2fe 40%, #f0f9ff 70%, #eff6ff 100%)" }} />

      {/* ── Slow parallax blobs — largest, most subtle ── */}
      <div ref={slowRef} className="absolute inset-0" style={{ willChange: "transform" }}>
        {/* Top-left large blob */}
        <div className="absolute -top-32 -left-32 h-[500px] w-[500px] rounded-full blur-3xl"
          style={{ background: isDark ? "rgba(30, 58, 138, 0.4)" : "rgba(147, 197, 253, 0.35)" }} />
        {/* Bottom-right large blob */}
        <div className="absolute -bottom-24 -right-24 h-[420px] w-[420px] rounded-full blur-3xl"
          style={{ background: isDark ? "rgba(15, 23, 42, 0.4)" : "rgba(103, 232, 249, 0.25)" }} />
        {/* Center-right medium blob */}
        <div className="absolute top-1/3 right-1/4 h-[280px] w-[280px] rounded-full blur-3xl"
          style={{ background: isDark ? "rgba(56, 189, 248, 0.1)" : "rgba(186, 230, 253, 0.3)" }} />
      </div>

      {/* ── Mid parallax blobs ── */}
      <div ref={midRef} className="absolute inset-0" style={{ willChange: "transform" }}>
        <div className="absolute top-1/4 left-1/3 h-[200px] w-[200px] rounded-full blur-2xl"
          style={{ background: isDark ? "rgba(30, 64, 175, 0.3)" : "rgba(125, 211, 252, 0.2)" }} />
        <div className="absolute bottom-1/3 left-1/4 h-[160px] w-[160px] rounded-full blur-2xl"
          style={{ background: isDark ? "rgba(17, 24, 39, 0.3)" : "rgba(147, 197, 253, 0.22)" }} />
        <div className="absolute top-2/3 right-1/3 h-[120px] w-[120px] rounded-full blur-2xl"
          style={{ background: isDark ? "rgba(59, 130, 246, 0.2)" : "rgba(186, 230, 253, 0.28)" }} />
      </div>

      {/* ── Fast parallax bubbles — smallest, most visible ── */}
      <div ref={fastRef} className="absolute inset-0" style={{ willChange: "transform" }}>
        <Bubble size={80}  x="5%"  y="68%" opacity={isDark ? 0.1 : 0.22} dur="9s"  delay="0s"  />
        <Bubble size={48}  x="15%" y="52%" opacity={isDark ? 0.1 : 0.2}  dur="11s" delay="2s"  />
        <Bubble size={32}  x="28%" y="78%" opacity={isDark ? 0.1 : 0.25} dur="7s"  delay="0.5s"/>
        <Bubble size={20}  x="42%" y="60%" opacity={isDark ? 0.1 : 0.22} dur="5s"  delay="1.2s"/>
        <Bubble size={56}  x="55%" y="82%" opacity={isDark ? 0.1 : 0.18} dur="8s"  delay="1.8s"/>
        <Bubble size={24}  x="70%" y="55%" opacity={isDark ? 0.1 : 0.2}  dur="6s"  delay="0.8s"/>
        <Bubble size={40}  x="82%" y="70%" opacity={isDark ? 0.1 : 0.18} dur="10s" delay="3s"  />
        <Bubble size={16}  x="90%" y="45%" opacity={isDark ? 0.1 : 0.22} dur="4.5s" delay="0.3s"/>
        <Bubble size={12}  x="35%" y="35%" opacity={isDark ? 0.1 : 0.2}  dur="6.5s" delay="1.5s"/>
        <Bubble size={28}  x="60%" y="30%" opacity={isDark ? 0.1 : 0.15} dur="7.5s" delay="2.5s"/>
        <Bubble size={10}  x="75%" y="85%" opacity={isDark ? 0.1 : 0.25} dur="4s"  delay="0.6s"/>
        <Bubble size={18}  x="8%"  y="30%" opacity={isDark ? 0.1 : 0.2}  dur="8.5s" delay="1s" />
      </div>
    </div>
  );
}

function Bubble({ size, x, y, opacity, dur, delay }: {
  size: number; x: string; y: string; opacity: number; dur: string; delay: string;
}) {
  return (
    <span
      className="bubble absolute"
      style={{
        width: size,
        height: size,
        left: x,
        top: y,
        bottom: "auto",
        opacity,
        "--duration": dur,
        "--delay": delay,
      } as React.CSSProperties}
    />
  );
}
