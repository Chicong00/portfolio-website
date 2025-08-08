import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Download, ArrowDown } from "lucide-react";
import { AnimatedRobot } from "@/components/AnimatedRobot";

export function HeroSection() {
  const scrollToAbout = () => {
    document.getElementById("about")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="min-h-screen flex items-center justify-center hero-gradient relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary/10 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-float" style={{ animationDelay: "-3s" }}></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-center lg:text-left"
          >
            <motion.h1 
              className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Hi there! I'm{" "}
              <span className="gradient-text">Cong</span>
              <span className="text-primary">.</span>
            </motion.h1>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="mb-8"
            >
              <p className="text-xl md:text-2xl text-muted-foreground mb-4">
                I'm a <span className="text-primary font-semibold">Data Analyst & Engineer</span>
              </p>
              <p className="text-xl md:text-2xl text-muted-foreground">
                let me cook data into insights.
              </p>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="text-lg text-muted-foreground mb-8 max-w-2xl text-balance"
            >
              I'm a problem solver at heart who loves discovering patterns in data, 
              building automated solutions, and creating visualizations that tell 
              compelling stories. Whether it's optimizing processes, predicting trends, 
              or uncovering hidden insights, I enjoy crafting data-driven solutions 
              that make a real impact.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.0 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Button size="lg" className="group transition-bounce hover:scale-105">
                <Download className="mr-2 h-5 w-5 group-hover:animate-bounce" />
                View Resume
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                onClick={scrollToAbout}
                className="transition-bounce hover:scale-105"
              >
                Learn More
              </Button>
            </motion.div>
          </motion.div>

          {/* Animated Robot */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="relative"
          >
            <div className="relative z-10">
              <AnimatedRobot />
            </div>
            
            {/* Floating Elements */}
            <motion.div
              animate={{ y: [-10, 10, -10] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -top-8 -right-8 w-16 h-16 bg-primary/20 rounded-full blur-xl"
            ></motion.div>
            <motion.div
              animate={{ y: [10, -10, 10] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              className="absolute -bottom-8 -left-8 w-24 h-24 bg-primary/15 rounded-full blur-xl"
            ></motion.div>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1.2 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="cursor-pointer"
          onClick={scrollToAbout}
        >
          <ArrowDown className="h-6 w-6 text-muted-foreground hover:text-primary transition-smooth" />
        </motion.div>
      </motion.div>
    </section>
  );
}