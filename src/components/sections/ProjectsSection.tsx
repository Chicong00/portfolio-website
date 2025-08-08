import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink, Github } from "lucide-react";

const projects = [
  {
    title: "Sales Performance Dashboard",
    description: "Comprehensive analytics dashboard for tracking sales metrics, customer behavior, and revenue trends using Python, SQL, and Tableau.",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=500&h=300&fit=crop",
    technologies: ["Python", "SQL", "Tableau", "Pandas"],
    githubUrl: "#",
    liveUrl: "#",
    category: "Business Intelligence"
  },
  {
    title: "Customer Churn Prediction Model",
    description: "Machine learning model to predict customer churn with 92% accuracy, helping reduce customer attrition by 15%.",
    image: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=500&h=300&fit=crop",
    technologies: ["Python", "Scikit-learn", "XGBoost", "Feature Engineering"],
    githubUrl: "#",
    liveUrl: "#",
    category: "Machine Learning"
  },
  {
    title: "Real-time Data Pipeline",
    description: "Automated ETL pipeline processing 1M+ daily transactions, reducing data processing time by 60%.",
    image: "https://images.unsplash.com/photo-1518186285589-2f7649de83e0?w=500&h=300&fit=crop",
    technologies: ["Apache Airflow", "Python", "PostgreSQL", "Docker"],
    githubUrl: "#",
    liveUrl: "#",
    category: "Data Engineering"
  },
  {
    title: "Financial Market Analysis",
    description: "Comprehensive analysis of stock market trends and volatility patterns using statistical methods and time series analysis.",
    image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=500&h=300&fit=crop",
    technologies: ["R", "Python", "Time Series", "Statistical Analysis"],
    githubUrl: "#",
    liveUrl: "#",
    category: "Financial Analysis"
  }
];

export function ProjectsSection() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section id="projects" className="py-20 relative" ref={ref}>
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
            Featured <span className="gradient-text">Projects</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto text-balance">
            A showcase of my data analysis and engineering projects that demonstrate 
            my ability to solve complex problems and deliver impactful solutions.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 50 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: index * 0.2 }}
            >
              <Card className="card-elegant group hover:scale-105 transition-bounce overflow-hidden h-full">
                <div className="relative overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                  <div className="absolute top-4 left-4">
                    <Badge variant="secondary" className="bg-background/80 backdrop-blur-sm">
                      {project.category}
                    </Badge>
                  </div>
                </div>
                
                <CardHeader>
                  <CardTitle className="text-xl group-hover:text-primary transition-smooth">
                    {project.title}
                  </CardTitle>
                </CardHeader>
                
                <CardContent className="flex flex-col flex-grow">
                  <p className="text-muted-foreground mb-4 flex-grow">
                    {project.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.technologies.map((tech) => (
                      <Badge key={tech} variant="outline" className="text-xs">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                  
                  <div className="flex gap-3 mt-auto">
                    <Button variant="outline" size="sm" className="flex-1">
                      <Github className="mr-2 h-4 w-4" />
                      Code
                    </Button>
                    <Button size="sm" className="flex-1">
                      <ExternalLink className="mr-2 h-4 w-4" />
                      Demo
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="text-center mt-12"
        >
          <Button variant="outline" size="lg" className="transition-bounce hover:scale-105">
            View All Projects
          </Button>
        </motion.div>
      </div>
    </section>
  );
}