"use client";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import SplitType from "split-type";
import { ArrowDown } from "lucide-react";
import "@/flowfest-text.css";

export function HeroSection() {
  const line1Ref = useRef<HTMLHeadingElement>(null);
  const line2Ref = useRef<HTMLParagraphElement>(null);
  const line3Ref = useRef<HTMLParagraphElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const scrollToAbout = () => {
    document.getElementById("about")?.scrollIntoView({ behavior: "smooth" });
  };

  // Background: gradient shifting + particle
  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles: { x: number; y: number; r: number; dx: number; dy: number; color: string }[] = [];
    const colors = ["#3B5E51", "#F4D1A6"];

    for (let i = 0; i < 60; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        r: Math.random() * 2 + 1,
        dx: (Math.random() - 0.5) * 0.4,
        dy: (Math.random() - 0.5) * 0.4,
        color: colors[Math.floor(Math.random() * colors.length)]
      });
    }

    function animateParticles() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((p) => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.fill();

        p.x += p.dx;
        p.y += p.dy;
        if (p.x < 0 || p.x > canvas.width) p.dx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.dy *= -1;
      });

      requestAnimationFrame(animateParticles);
    }
    animateParticles();
  }, []);

  // Text animations
  useEffect(() => {
    // Line 1 sequence
    const tl1 = gsap.timeline();
    tl1.set(line1Ref.current, { textContent: "Hi there!" })
      .to(line1Ref.current, { textContent: "I'm Cong", duration: 0.6, ease: "power2.inOut", delay: 0.4 })
      .to(line1Ref.current, { textContent: "Hi there! I'm Cong", duration: 0.8, ease: "power2.inOut", delay: 0.3 });

    // Line 2 bounce words
    const split2 = new SplitType(line2Ref.current!, { types: "words" });
    gsap.from(split2.words, {
      opacity: 0,
      y: 50,
      scale: 0.5,
      rotation: -5,
      ease: "elastic.out(1, 0.4)",
      stagger: 0.07,
      duration: 1.2,
      delay: 2
    });

    // Line 3 fade tagline
    gsap.from(line3Ref.current, {
      opacity: 0,
      scale: 0.9,
      y: 20,
      duration: 1,
      ease: "power3.out",
      delay: 3
    });
  }, []);

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center text-center overflow-hidden">
      {/* Animated Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#0f172a] via-[#1a2a23] to-[#0f172a] animate-gradient-shift"></div>

      {/* Particle Layer */}
      <canvas ref={canvasRef} className="absolute inset-0 z-0" />

      {/* Text */}
      <div className="relative z-10 px-4">
        <h1
          ref={line1Ref}
          className="flowfest-text text-5xl md:text-6xl lg:text-7xl mb-4"
        >
          <span style={{ color: "#F4D1A6" }}>Hi there!</span>{" "}
          <span style={{ color: "#3B5E51" }}>I'm Cong</span>
        </h1>
        <p
          ref={line2Ref}
          className="flowfest-text text-2xl md:text-3xl mb-4"
        >
          <span style={{ color: "#F4D1A6" }}>I'm a</span>{" "}
          <span style={{ color: "#3B5E51" }}>Data Analyst & Engineer</span>
        </p>
        <p
          ref={line3Ref}
          className="flowfest-text text-xl md:text-2xl"
        >
          <span style={{ color: "#F4D1A6" }}>Let me cook data into</span>{" "}
          <span style={{ color: "#3B5E51" }}>insights</span>.
        </p>
      </div>

      {/* Scroll Arrow */}
      <div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 cursor-pointer animate-bounce z-10"
        onClick={scrollToAbout}
      >
        <ArrowDown className="h-6 w-6 text-[#F4D1A6] hover:text-[#3B5E51] transition-colors" />
      </div>

      <style jsx global>{`
        @keyframes gradient-shift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .animate-gradient-shift {
          background-size: 200% 200%;
          animation: gradient-shift 12s ease infinite;
        }
      `}</style>
    </section>
  );
}
