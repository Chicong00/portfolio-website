"use client";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrambleTextPlugin } from "gsap/ScrambleTextPlugin";
import SplitType from "split-type";
import { ArrowDown } from "lucide-react";
import "@/flowfest-text.css";

gsap.registerPlugin(ScrambleTextPlugin);

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
  // === LINE 1: typing + cursor blink ===
  if (line1Ref.current && line2Ref.current && line3Ref.current) {
    const l1 = line1Ref.current;
    const l2 = line2Ref.current;
    const l3 = line3Ref.current;

  // Hide line 2, 3 until line 1 finished typing
  gsap.set([l2, l3], { autoAlpha: 0 });

  // CSS cho cursor blink
  if (!document.getElementById("typing-cursor-style")) {
    const style = document.createElement("style");
    style.id = "typing-cursor-style";
    style.textContent = `
      @keyframes blinkCursor { 0%,49%{opacity:1} 50%,100%{opacity:0} }
      .typing-cursor{ display:inline-block; margin-left:2px; animation:blinkCursor .9s step-end infinite; color:#F4D1A6; }
    `;
    document.head.appendChild(style);
  }

  // Cursor element
  const cursor = document.createElement("span");
  cursor.className = "typing-cursor";
  cursor.textContent = "🛸";
  const addCursor = () => { if (!cursor.parentNode) l1.appendChild(cursor); };
  const removeCursor = () => { if (cursor.parentNode) cursor.remove(); };

  const wait = (s: number) => new Promise<void>((r) => gsap.delayedCall(s, r));

  // Typing each character (do not remove the text before)
  const typeAppend = (html: string, speed = 55) =>
    new Promise<void>((resolve) => {
      addCursor();
      let i = 0;
      const src = html;
      const step = () => {
        if (i >= src.length) {
          resolve();
          return;
        }
        if (src[i] === "<") {
          const j = src.indexOf(">", i);
          const tag = src.slice(i, j + 1);
          cursor.insertAdjacentHTML("beforebegin", tag);
          i = j + 1;
          requestAnimationFrame(step);
          return;
        }
        cursor.insertAdjacentText("beforebegin", src[i]);
        i++;
        setTimeout(step, speed);
      };
      step();
    });

  (async () => {
    // Phase 1: Hi there!
    l1.innerHTML = "";
    await typeAppend("Hi there!", 55);
    await wait(0.2);

    // Phase 2:" I'm Cong"
    await typeAppend(` I'm <span style="color:#3B5E51">Cong</span>`, 55);
    await wait(0.2);

    // Phase 3: remove cursor after typing full line
    removeCursor();

    // allow line 2 & 3 appear
    gsap.set([l2, l3], { autoAlpha: 1 });
  })();
}

// === END LINE 1 block ===

    // Line 2 bounce words
    const split2 = new SplitType(line2Ref.current!, { types: "words" });
    gsap.from(split2.words, {
      opacity: 0,
      y: 50,
      scale: 0.5,
      rotation: -5,
      ease: "elastic.out(1, 0.4)",
      stagger: 0.07,
      duration: 2.2,
      delay: 2
    });

    // Line 3 scramble text animation
    if (line3Ref.current) {
      // 1. Keep the final HTML with colors for later
      const finalHTML = line3Ref.current.innerHTML;

      // 2. Remove inital content for hidden purpose when animation starts
      line3Ref.current.innerHTML = '&nbsp;'; // Use non-breaking space to keep the height

      // 3. Run animation
      gsap.to(line3Ref.current, {
        duration: 2,
        scrambleText: {
          text: "Let me cook data into insights", 
          chars: "lowerCase",
          revealDelay: 0.5,
          tweenLength: false
        },
        // 4. After scramble fnished, recover the final HTML with colors
        onComplete: () => {
          if (line3Ref.current) {
            line3Ref.current.innerHTML = finalHTML;
          }
        },
        delay: 3 // Start animation after 3 seconds
      });
    }
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
          <span style={{ color: "#3B5E51" }}>insights</span>
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