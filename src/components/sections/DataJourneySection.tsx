import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { GraduationCap, Briefcase, Award, TrendingUp } from "lucide-react";

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

  return (
    <section id="data-journey" className="py-20 relative" ref={ref}>
      {/* Organic Background */}
      <div className="absolute inset-0 organic-bg">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="flowing-shapes" />
        ))}
        <div 
          className="absolute top-1/4 left-1/4 w-32 h-32 bg-primary/5 blur-3xl animate-float" 
          style={{ 
            borderRadius: "60% 40% 70% 30% / 50% 60% 40% 50%",
          }}
        ></div>
        <div 
          className="absolute bottom-1/3 right-1/3 w-48 h-48 bg-accent/8 blur-2xl animate-float" 
          style={{ 
            borderRadius: "40% 60% 30% 70% / 60% 30% 70% 40%",
            animationDelay: "-2s" 
          }}
        ></div>
      </div>
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
    </section>
  );
}