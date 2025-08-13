import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { GraduationCap, Briefcase, Award, TrendingUp } from "lucide-react";
import { useEffect, useRef } from "react";

const journeyItems = [
  {
    type: "education",
    title: "Masters at TMU",
    organization: "Toronto Metropolitan University",
    period: "Sep 2022 - Dec 2023",
    description: "Enrolled in an Innovation and Entrepreneurship degree in an attempt to explore new fields and gain a broader perspective on business and technology.",
    icon: GraduationCap,
    color: "bg-primary"
  },
  {
    type: "experience",
    title: "Exposure to Data in Startup Environments",
    organization: "Various Startups",
    period: "Sep 2022 - Jan 2024",
    description: "During my time at TMU, I worked at 3 different startups where I gained initial exposure to huge amounts of data during market research, which introduced me to the power of data analytics in decision making.",
    icon: TrendingUp,
    color: "bg-primary"
  }
];

export function DataJourneySection() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const parent = canvas.parentElement;
    if (!parent) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let particles: { x: number; y: number; r: number; dx: number; dy: number; color: string }[] = [];
    const colors = ["#3B5E51", "#F4D1A6"];

    const resizeCanvas = () => {
        canvas.width = parent.offsetWidth;
        canvas.height = parent.offsetHeight;
        particles = [];
        for (let i = 0; i < 40; i++) {
            particles.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                r: Math.random() * 2 + 1,
                dx: (Math.random() - 0.5) * 0.4,
                dy: (Math.random() - 0.5) * 0.4,
                color: colors[Math.floor(Math.random() * colors.length)]
            });
        }
    };

    let animationFrameId: number;
    const animateParticles = () => {
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
      animationFrameId = window.requestAnimationFrame(animateParticles);
    };

    resizeCanvas();
    animateParticles();
    
    window.addEventListener('resize', resizeCanvas);

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.cancelAnimationFrame(animationFrameId);
    }
  }, []);

  return (
    <section id="data-journey" className="py-20 relative" ref={ref}>
      {/* Animated Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#0f172a] via-[#1a2a23] to-[#0f172a] animate-gradient-shift"></div>
      {/* Particle Layer */}
      <canvas ref={canvasRef} className="absolute inset-0 z-0" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold gradient-text mb-4">
            My Journey to Data & AI Automation
          </h2>
          <div className="w-96 h-1 bg-primary mx-auto"></div>
        </motion.div>

        <div className="relative max-w-6xl mx-auto">
          {/* Center Timeline line */}
          <div className="absolute left-1/2 transform -translate-x-0.5 top-0 bottom-0 w-1 bg-primary"></div>
          
          <div className="space-y-16">
            {journeyItems.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                className={`relative flex items-center ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}
              >
                {/* Timeline dot */}
                <div className={`absolute left-1/2 transform -translate-x-1/2 w-8 h-8 rounded-full border-4 border-background ${item.color} z-10 flex items-center justify-center`}>
                  <item.icon className="w-4 h-4 text-background" />
                </div>
                
                {/* Content */}
                <div className={`w-5/12 ${index % 2 === 0 ? 'pr-8 text-right' : 'pl-8 text-left'}`}>
                  <Card className="card-elegant hover:shadow-glow transition-all duration-300">
                    <CardContent className="p-6">
                      <div className={`mb-4 ${index % 2 === 0 ? 'text-right' : 'text-left'}`}>
                        <h3 className="text-xl font-bold text-primary">{item.title}</h3>
                        <p className="text-sm text-muted-foreground font-medium">{item.period}</p>
                      </div>
                      
                      <p className="text-muted-foreground leading-relaxed mb-4">
                        {item.description}
                      </p>
                      
                      {item.type === 'experience' && (
                        <button className="text-primary hover:text-primary-glow transition-colors duration-200 text-sm font-medium">
                          View Experience →
                        </button>
                      )}
                    </CardContent>
                  </Card>
                </div>
                
                {/* Empty space for the other side */}
                <div className="w-5/12"></div>
              </motion.div>
            ))}
          </div>
        </div>
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