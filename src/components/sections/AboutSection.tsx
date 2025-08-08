import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, Database, Brain, BarChart3 } from "lucide-react";

const stats = [
  { label: "Projects Completed", value: "8+", icon: TrendingUp },
  { label: "Data Points Analyzed", value: "10M+", icon: Database },
  { label: "Models Built", value: "2+", icon: Brain },
  { label: "Dashboards Created", value: "10+", icon: BarChart3 },
];

const skills = [
  "Data Analysis & Exploration", "Data Modeling", "Data Manipulation", "Business Intelligence", "Data Visualization", "SQL", "Python" , "Excel", "AI tools"
];

export function AboutSection() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section id="about" className="py-20 relative" ref={ref}>
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
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            About <span className="gradient-text">Me</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto text-balance">
          I’m conquering the 🎮 of life with a dreamy mind that loves 📚 and 🎧, calloused hands from 👨‍💻 and 🏋️‍♂️, and blistered feet from dribbling ⚽ on the pitch.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* About Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <Card className="card-elegant h-full">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold mb-6 text-primary">My Story</h3>
                <div className="space-y-4 text-muted-foreground">
                  <p>
                    With an engineering background and a passion for data, 
                    I’m always looking at things around me through the lens of patterns and stories hidden in the numbers.
                  </p>
                  <p>
                    With over 2 years of experience in data analysis and business intelligence, 
                    I've developed a deep understanding of how data can transform businesses. 
                    What started as a curiosity for patterns and trends has evolved into a career focused on empowering businesses to make smarter decisions through data and AI.
                  </p>
                  <p>
                    When I'm not analyzing data, you'll find me exploring new technologies,
                    building stuff with AI, reading books, or playing sports.
                  </p>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Skills */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <Card className="card-elegant h-full">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold mb-6 text-primary">Core Skills</h3>
                <div className="flex flex-wrap gap-2 mb-8">
                  {skills.map((skill, index) => (
                    <motion.div
                      key={skill}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={inView ? { opacity: 1, scale: 1 } : {}}
                      transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                    >
                      <Badge variant="secondary" className="text-sm py-1 px-3">
                        {skill}
                      </Badge>
                    </motion.div>
                  ))}
                </div>
                
                <h4 className="text-lg font-semibold mb-4">What I Bring</h4>
                <ul className="space-y-3 text-muted-foreground">
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-primary rounded-full mr-3"></div>
                    Advanced statistical analysis and modeling
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-primary rounded-full mr-3"></div>
                    End-to-end data pipeline development
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-primary rounded-full mr-3"></div>
                    Interactive dashboard and visualization creation
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-primary rounded-full mr-3"></div>
                    Business-focused data storytelling
                  </li>
                </ul>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.8 + index * 0.1 }}
            >
              <Card className="card-elegant text-center group hover:scale-105 transition-bounce">
                <CardContent className="p-6">
                  <stat.icon className="h-8 w-8 text-primary mx-auto mb-4 group-hover:animate-bounce" />
                  <div className="text-3xl font-bold text-primary mb-2">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}