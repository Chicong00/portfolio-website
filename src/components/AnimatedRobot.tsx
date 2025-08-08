import { motion } from "framer-motion";

export function AnimatedRobot() {
  return (
    <div className="relative w-full h-auto flex items-center justify-center">
      <motion.svg
        width="400"
        height="400"
        viewBox="0 0 400 400"
        className="w-full h-auto"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        {/* Monitor Stand Base */}
        <rect x="180" y="180" width="40" height="8" fill="hsl(var(--card))" rx="4" />
        <rect x="190" y="170" width="20" height="20" fill="hsl(var(--card))" rx="2" />
        
        {/* Monitor */}
        <motion.rect
          x="100"
          y="60"
          width="200"
          height="120"
          fill="hsl(var(--card))"
          stroke="hsl(var(--primary))"
          strokeWidth="2"
          rx="8"
          animate={{ scale: [1, 1.005, 1] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        />
        
        {/* Screen Display */}
        <rect x="110" y="70" width="180" height="100" fill="hsl(215 25% 8%)" rx="4" />
        
        {/* Terminal Header */}
        <rect x="115" y="75" width="170" height="15" fill="hsl(var(--muted))" rx="2" />
        <circle cx="125" cy="82" r="2" fill="hsl(var(--destructive))" />
        <circle cx="135" cy="82" r="2" fill="hsl(var(--warning))" />
        <circle cx="145" cy="82" r="2" fill="hsl(var(--success))" />
        
        {/* Code Output Lines */}
        <motion.rect
          x="120" y="100" width="80" height="2" fill="hsl(var(--primary))"
          animate={{ width: [80, 100, 80] }}
          transition={{ duration: 2, repeat: Infinity, delay: 0 }}
        />
        <motion.rect
          x="120" y="110" width="60" height="2" fill="hsl(var(--primary-glow))"
          animate={{ width: [60, 90, 60] }}
          transition={{ duration: 2.5, repeat: Infinity, delay: 0.3 }}
        />
        <motion.rect
          x="120" y="120" width="100" height="2" fill="hsl(var(--primary))"
          animate={{ width: [100, 120, 100] }}
          transition={{ duration: 2, repeat: Infinity, delay: 0.6 }}
        />
        <motion.rect
          x="120" y="130" width="70" height="2" fill="hsl(var(--primary-glow))"
          animate={{ width: [70, 95, 70] }}
          transition={{ duration: 2.5, repeat: Infinity, delay: 0.9 }}
        />
        <motion.rect
          x="120" y="140" width="90" height="2" fill="hsl(var(--primary))"
          animate={{ width: [90, 110, 90] }}
          transition={{ duration: 2, repeat: Infinity, delay: 1.2 }}
        />
        <motion.rect
          x="120" y="150" width="50" height="2" fill="hsl(var(--primary-glow))"
          animate={{ width: [50, 80, 50] }}
          transition={{ duration: 2.5, repeat: Infinity, delay: 1.5 }}
        />
        
        {/* Terminal Cursor */}
        <motion.rect
          x="170"
          y="158"
          width="1.5"
          height="8"
          fill="hsl(var(--primary))"
          animate={{ opacity: [1, 0, 1] }}
          transition={{ duration: 1, repeat: Infinity }}
        />
        
        {/* Separate Keyboard */}
        <motion.rect
          x="120"
          y="280"
          width="160"
          height="40"
          fill="hsl(var(--card))"
          stroke="hsl(var(--primary))"
          strokeWidth="2"
          rx="6"
          animate={{ scale: [1, 1.005, 1] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        />
        
        {/* Keyboard Keys */}
        <rect x="130" y="290" width="140" height="20" fill="hsl(var(--muted))" rx="3" />
        
        {/* Individual Keys */}
        <motion.rect x="140" y="295" width="8" height="8" fill="hsl(var(--card))" rx="1"
          animate={{ scale: [1, 0.95, 1] }}
          transition={{ duration: 1.5, repeat: Infinity, delay: 0 }}
        />
        <motion.rect x="155" y="295" width="8" height="8" fill="hsl(var(--card))" rx="1"
          animate={{ scale: [1, 0.95, 1] }}
          transition={{ duration: 1.5, repeat: Infinity, delay: 0.3 }}
        />
        <motion.rect x="170" y="295" width="8" height="8" fill="hsl(var(--card))" rx="1"
          animate={{ scale: [1, 0.95, 1] }}
          transition={{ duration: 1.5, repeat: Infinity, delay: 0.6 }}
        />
        <motion.rect x="185" y="295" width="8" height="8" fill="hsl(var(--card))" rx="1"
          animate={{ scale: [1, 0.95, 1] }}
          transition={{ duration: 1.5, repeat: Infinity, delay: 0.9 }}
        />
        
        {/* Robot Head - positioned below monitor */}
        <motion.circle
          cx="200"
          cy="220"
          r="20"
          fill="hsl(var(--card))"
          stroke="hsl(var(--primary))"
          strokeWidth="2"
          animate={{ y: [0, -1, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        />
        
        {/* Robot Eyes - looking up at screen */}
        <motion.circle
          cx="193"
          cy="215"
          r="2.5"
          fill="hsl(var(--primary))"
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 1.5, repeat: Infinity, delay: 0 }}
        />
        <motion.circle
          cx="207"
          cy="215"
          r="2.5"
          fill="hsl(var(--primary))"
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 1.5, repeat: Infinity, delay: 0.1 }}
        />
        
        {/* Robot Body */}
        <rect x="185" y="240" width="30" height="35" fill="hsl(var(--card))" stroke="hsl(var(--primary))" strokeWidth="2" rx="6" />
        
        {/* Robot Arms extending to keyboard */}
        <motion.path
          d="M 185 250 Q 160 260 150 285"
          stroke="hsl(var(--primary))"
          strokeWidth="3"
          fill="none"
          strokeLinecap="round"
          animate={{ 
            d: ["M 185 250 Q 160 260 150 285", "M 185 250 Q 160 265 145 290", "M 185 250 Q 160 260 150 285"]
          }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.path
          d="M 215 250 Q 240 260 250 285"
          stroke="hsl(var(--primary))"
          strokeWidth="3"
          fill="none"
          strokeLinecap="round"
          animate={{ 
            d: ["M 215 250 Q 240 260 250 285", "M 215 250 Q 240 265 255 290", "M 215 250 Q 240 260 250 285"]
          }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut", delay: 0.3 }}
        />
        
        {/* Robot Hands on keyboard */}
        <motion.circle
          cx="150"
          cy="285"
          r="4"
          fill="hsl(var(--card))"
          stroke="hsl(var(--primary))"
          strokeWidth="1.5"
          animate={{ 
            y: [0, 3, 0],
            scale: [1, 0.9, 1]
          }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.circle
          cx="250"
          cy="285"
          r="4"
          fill="hsl(var(--card))"
          stroke="hsl(var(--primary))"
          strokeWidth="1.5"
          animate={{ 
            y: [0, 3, 0],
            scale: [1, 0.9, 1]
          }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut", delay: 0.3 }}
        />
        
        {/* Connection lines from robot to screen */}
        <motion.path
          d="M 200 200 L 200 180"
          stroke="hsl(var(--primary) / 0.3)"
          strokeWidth="2"
          strokeDasharray="5,5"
          animate={{ strokeDashoffset: [0, -10] }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        />
        
        {/* Floating Code Particles */}
        <motion.circle
          cx="320"
          cy="90"
          r="2"
          fill="hsl(var(--primary) / 0.6)"
          animate={{ 
            y: [0, -15, 0],
            opacity: [0.6, 1, 0.6],
            x: [0, -5, 0]
          }}
          transition={{ duration: 4, repeat: Infinity, delay: 0 }}
        />
        <motion.circle
          cx="80"
          cy="110"
          r="1.5"
          fill="hsl(var(--primary-glow) / 0.8)"
          animate={{ 
            y: [0, -12, 0],
            opacity: [0.8, 1, 0.8],
            x: [0, 3, 0]
          }}
          transition={{ duration: 3.5, repeat: Infinity, delay: 1 }}
        />
        <motion.circle
          cx="340"
          cy="130"
          r="1"
          fill="hsl(var(--primary) / 0.4)"
          animate={{ 
            y: [0, -8, 0],
            opacity: [0.4, 0.8, 0.4],
            x: [0, 2, 0]
          }}
          transition={{ duration: 5, repeat: Infinity, delay: 2 }}
        />
      </motion.svg>
    </div>
  );
}