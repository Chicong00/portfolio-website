import { useEffect, useRef } from "react";
import { gsap } from "gsap";

export function GalaxyBackground() {
  const particlesRef = useRef([]);

  useEffect(() => {
    particlesRef.current.forEach((particle, index) => {
      gsap.to(particle, {
        y: "random(-50, 50)",
        x: "random(-50, 50)",
        opacity: "random(0.5, 1)",
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: "power1.inOut",
        delay: index * 0.5,
      });
    });
  }, []);

  return (
    <div className="floating-blobs-bg">
      {/* Soft Floating Blobs with beige and green colors */}
      {[...Array(6)].map((_, i) => (
        <div
          key={i}
          ref={(el) => (particlesRef.current[i] = el)}
          className="floating-blob"
          style={{
            width: "50px",
            height: "50px",
            backgroundColor: i % 2 === 0 ? "#3B5E51" : "#F4D1A6",
            borderRadius: "50%",
            position: "absolute",
          }}
        />
      ))}
    </div>
  );
}