import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Card, CardContent } from "@/components/ui/card";

const techStack = [
  {
    category: "Data Analysis & Visualization",
    tools: [
      { name: "Python", description: "Primary language for data analysis and ML", logo: "https://raw.githubusercontent.com/devicons/devicon/master/icons/python/python-original.svg" },
      { name: "SQL", description: "Database querying and management", logo: "https://raw.githubusercontent.com/devicons/devicon/master/icons/mysql/mysql-original-wordmark.svg" },
      { name: "Looker", description: "Business intelligence dashboards", logo: "/logos/looker-icon.svg" },
      { name: "Tableau", description: "Interactive data visualization", logo: "https://cdn.worldvectorlogo.com/logos/tableau-software.svg" },
      { name: "Power BI", description: "Interactive data visualization", logo: "https://raw.githubusercontent.com/microsoft/PowerBI-Icons/main/SVG/Desktop.svg" },
      { name: "Excel", description: "Advanced spreadsheet analysis", logo: "https://cdn.worldvectorlogo.com/logos/microsoft-excel-2013.svg" }
    ]
  },
  {
    category: "Machine Learning & AI",
    tools: [
      { name: "Pandas", description: "Data manipulation and analysis", logo: "https://raw.githubusercontent.com/devicons/devicon/master/icons/pandas/pandas-original.svg" },
      { name: "NumPy", description: "Numerical computing library", logo: "https://raw.githubusercontent.com/devicons/devicon/master/icons/numpy/numpy-original.svg" },
      { name: "Cursor", description: "AI code editor", logo: "https://www.cursor.com/assets/images/logo.svg" },
      { name: "ChatGPT", description: "Support for handling repetitive tasks", logo: "https://cdn.worldvectorlogo.com/logos/openai-2.svg" },
      { name: "Claude", description: "Support coding", logo: "/logos/claude-color.svg" },
      { name: "Lovable", description: "Turn ideas into products with AI", logo: "/logos/lovable-logo-icon.svg" }
    ]
  },
  {
    category: "Data Engineering",
    tools: [
      { name: "Docker", description: "Containerization technology", logo: "https://raw.githubusercontent.com/devicons/devicon/master/icons/docker/docker-original.svg" },
      { name: "PostgreSQL", description: "Advanced open source database", logo: "https://raw.githubusercontent.com/devicons/devicon/master/icons/postgresql/postgresql-original.svg" },
    ]
  },
  {
    category: "Cloud & DevOps",
    tools: [
      { name: "Google Cloud", description: "Cloud platform and services", logo: "https://raw.githubusercontent.com/devicons/devicon/master/icons/googlecloud/googlecloud-original.svg" },
      { name: "Git", description: "Version control system", logo: "https://raw.githubusercontent.com/devicons/devicon/master/icons/git/git-original.svg" },
      { name: "Jupyter", description: "Interactive computing environment", logo: "https://raw.githubusercontent.com/devicons/devicon/master/icons/jupyter/jupyter-original.svg" },
      { name: "VS Code", description: "Integrated development environment", logo: "https://raw.githubusercontent.com/devicons/devicon/master/icons/vscode/vscode-original.svg" },
      { name: "Vercel", description: "Hosting website", logo: "https://raw.githubusercontent.com/devicons/devicon/master/icons/vercel/vercel-original.svg" }
    ]
  },
  {
    category: "Productivity",
    tools: [
      { name: "Notion", description: "Personal Project Management", logo: "/logos/notion.svg" },
      { name: "Obsidian", description: "Journaling and Personal Knowledge Management ", logo: "/logos/obsidian.svg" }
    ]
  }
];

export function TechStackSection() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section id="tech-stack" className="py-20 relative" ref={ref}>
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

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Tech <span className="gradient-text">Stack</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            The toolkits    I use every day to work and create.
          </p>
        </motion.div>

        <div className="space-y-12">
          {techStack.map((section, sectionIndex) => (
            <motion.div
              key={section.category}
              initial={{ opacity: 0, y: 50 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: sectionIndex * 0.2 }}
            >
              <h3 className="text-2xl font-semibold mb-6 text-foreground">{section.category}</h3>
              <div className="space-y-3">
                {section.tools.map((tool, toolIndex) => (
                  <motion.div
                    key={tool.name}
                    initial={{ opacity: 0, x: -30 }}
                    animate={inView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.5, delay: (sectionIndex * 0.2) + (toolIndex * 0.1) }}
                  >
                    <Card className="card-elegant hover:shadow-glow transition-all duration-300 group cursor-pointer">
                      <CardContent className="p-4">
                        <div className="flex items-center space-x-4">
                          <div className="w-12 h-12 bg-transparent rounded-lg flex items-center justify-center group-hover:bg-primary/5 transition-colors">
                            <img 
                              src={tool.logo} 
                              alt={`${tool.name} logo`}
                              className="w-8 h-8 object-contain filter-none"
                              style={{ filter: 'none' }}
                              onError={(e) => {
                                // Fallback to text if image fails to load
                                const target = e.currentTarget as HTMLImageElement;
                                const fallback = target.nextElementSibling as HTMLElement;
                                if (target && fallback) {
                                  target.style.display = 'none';
                                  fallback.style.display = 'block';
                                }
                              }}
                            />
                            <span className="text-lg font-semibold text-primary hidden">{tool.name.charAt(0)}</span>
                          </div>
                          <div className="flex-1">
                            <h4 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                              {tool.name}
                            </h4>
                            <p className="text-sm text-muted-foreground">
                              {tool.description}
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// comment