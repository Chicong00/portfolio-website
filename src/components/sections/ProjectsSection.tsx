import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink, Github, Database, Code, BarChart3, ChevronDown, ChevronRight, FileText, FileCode } from "lucide-react";
import { useState, useEffect } from "react";
import { getProjectFile } from "@/lib/projectFiles";

const projectCategories = [
  {
    id: "sql",
    title: "SQL Projects",
    icon: Database,
    description: "Data analysis and database management projects using SQL",
    projects: [
      {
        id: "cyclistic",
        title: "Cyclistic Bike Share Analysis",
        description: "Cyclistic is a fictional bike-share company in Chicago. The goal of this project is to analyze the bike usage data to understand how different types of users (casual vs. annual members) use the service and to provide insights for marketing strategies.",
        image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=500&h=300&fit=crop",
        technologies: ["MySQL", "Excel", "Tableau", "Data Visualization", "Data Analysis"],
        githubUrl: "https://github.com/Chicong00/cyclistic-bike-share-analysis",
        liveUrl: "https://medium.com/@your-username/cyclistic-bike-share-analysis",
        files: [
          { name: "README.md", type: "markdown", path: "sql/cyclistic/README.md" },
          { name: "cleaning.sql", type: "sql", path: "sql/cyclistic/cleaning.sql" },
          { name: "querying.sql", type: "sql", path: "sql/cyclistic/querying.sql" },
          { name: "viz_query.sql", type: "sql", path: "sql/cyclistic/viz_query.sql" }
        ]
      },
      {
        id: "nashville",
        title: "Data Cleaning - Nashville Housing",
        description: "Cleaned and transformed Nashville housing data for analysis, focusing on data integrity and consistency. This project's goal was to go through the important steps of data cleaning and transformation, including removing duplicates, handling missing values, and ensuring data types are correct.",
        image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=500&h=300&fit=crop",
        technologies: ["MySQL", "Data Cleaning", "Data Transformation"],
        githubUrl: "https://github.com/Chicong00/nashville-housing-cleaning",
        liveUrl: "#",
        files: [
          { name: "README.md", type: "markdown", path: "sql/nashville/README.md" },
          { name: "nashville.sql", type: "sql", path: "sql/nashville/nashville.sql" }
        ]
      },
      {
        id: "covid19",
        title: "Covid-19 Exploratory Data Analysis",
        description: "Exploratory data analysis of COVID-19 dataset to understand patterns and trends in the pandemic data, including case counts, mortality rates, and vaccination progress across different regions.",
        image: "https://images.unsplash.com/photo-1584036561566-baf8f5f1b144?w=500&h=300&fit=crop",
        technologies: ["MySQL", "Data Analysis", "SQL"],
        githubUrl: "https://github.com/Chicong00/covid19-analysis",
        liveUrl: "#",
        files: [
          { name: "README.md", type: "markdown", path: "sql/covid19/README.md" },
          { name: "covid19.sql", type: "sql", path: "sql/covid19/covid19.sql" }
        ]
      }
    ]
  },
  {
    id: "python",
    title: "Python Projects",
    icon: Code,
    description: "Data analysis and automation projects using Python",
    projects: [
      {
        id: "crypto",
        title: "Automating Crypto Data using CoinGecko API",
        description: "Automated cryptocurrency data collection and analysis using CoinGecko API for real-time market insights and price tracking across multiple cryptocurrencies.",
        image: "https://images.unsplash.com/photo-1621761191319-c6fb62004040?w=500&h=300&fit=crop",
        technologies: ["Python", "API", "Pandas", "Data Analysis"],
        githubUrl: "https://github.com/Chicong00/crypto-automation",
        liveUrl: "#",
        files: [
          { name: "README.md", type: "markdown", path: "python/crypto/README.md" },
          { name: "crypto.py", type: "python", path: "python/crypto/crypto.py" }
        ]
      },
      {
        id: "movie",
        title: "Movie Correlation Analysis",
        description: "Analysis of movie industry data to identify correlations between various factors and box office success, including budget, genre, release timing, and audience ratings.",
        image: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=500&h=300&fit=crop",
        technologies: ["Python", "Pandas", "Matplotlib", "Correlation Analysis"],
        githubUrl: "https://github.com/Chicong00/movie-correlation",
        liveUrl: "#",
        files: [
          { name: "README.md", type: "markdown", path: "python/movie/README.md" },
          { name: "correlation.py", type: "python", path: "python/movie/correlation.py" }
        ]
      },
      {
        id: "amazon",
        title: "Amazon Web Scraping",
        description: "Web scraping project to collect product data from Amazon for market analysis, including price tracking, product reviews, and competitive analysis.",
        image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=500&h=300&fit=crop",
        technologies: ["Python", "BeautifulSoup", "Selenium", "Web Scraping"],
        githubUrl: "https://github.com/Chicong00/amazon-scraping",
        liveUrl: "#",
        files: [
          { name: "README.md", type: "markdown", path: "python/amazon/README.md" },
          { name: "amazon.py", type: "python", path: "python/amazon/amazon.py" }
        ]
      }
    ]
  },
  {
    id: "visualization",
    title: "Visualization Projects",
    icon: BarChart3,
    description: "Data visualization and business intelligence projects",
    projects: [
      {
        id: "churn",
        title: "Customer Churn Prediction Model",
        description: "Machine learning model to predict customer churn with 92% accuracy, helping reduce customer attrition by 15% through proactive retention strategies.",
        image: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=500&h=300&fit=crop",
        technologies: ["Power BI", "SQL", "Machine Learning"],
        githubUrl: "https://github.com/Chicong00/customer-churn-prediction",
        liveUrl: "#",
        files: [
          { name: "README.md", type: "markdown", path: "visualization/churn/README.md" },
          { name: "data_analysis.sql", type: "sql", path: "visualization/churn/data_analysis.sql" }
        ]
      },
      {
        id: "sales",
        title: "Sales Dashboard",
        description: "Comprehensive sales analytics dashboard providing insights into performance metrics, trends, and KPI tracking for business decision making.",
        image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=500&h=300&fit=crop",
        technologies: ["Power BI", "DAX", "Data Modeling"],
        githubUrl: "https://github.com/Chicong00/sales-dashboard",
        liveUrl: "#",
        files: [
          { name: "README.md", type: "markdown", path: "visualization/sales/README.md" }
        ]
      },
      {
        id: "financial",
        title: "Financial Analytics Dashboard",
        description: "Real-time financial analytics dashboard for monitoring key performance indicators and market trends with interactive visualizations.",
        image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=500&h=300&fit=crop",
        technologies: ["Tableau", "SQL", "Financial Analysis"],
        githubUrl: "https://github.com/Chicong00/financial-analytics",
        liveUrl: "#",
        files: [
          { name: "README.md", type: "markdown", path: "visualization/financial/README.md" }
        ]
      }
    ]
  }
];

export function ProjectsSection() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  const [activeCategory, setActiveCategory] = useState("sql");
  const [selectedProject, setSelectedProject] = useState("cyclistic");
  const [expandedProjects, setExpandedProjects] = useState<Set<string>>(new Set(["cyclistic"]));
  const [selectedFile, setSelectedFile] = useState<string | null>(null);
  const [fileContent, setFileContent] = useState<string>("");

  const currentCategory = projectCategories.find(cat => cat.id === activeCategory);
  const selectedProjectData = currentCategory?.projects.find(proj => proj.id === selectedProject);

  const toggleProject = (projectId: string) => {
    const newExpanded = new Set(expandedProjects);
    if (newExpanded.has(projectId)) {
      newExpanded.delete(projectId);
    } else {
      newExpanded.add(projectId);
    }
    setExpandedProjects(newExpanded);
  };

  const getFileIcon = (fileType: string) => {
    switch (fileType) {
      case "markdown":
        return <FileText className="h-4 w-4 text-blue-400" />;
      case "sql":
        return <Database className="h-4 w-4 text-green-400" />;
      case "python":
        return <Code className="h-4 w-4 text-yellow-400" />;
      case "powerbi":
        return <BarChart3 className="h-4 w-4 text-purple-400" />;
      case "tableau":
        return <BarChart3 className="h-4 w-4 text-orange-400" />;
      default:
        return <FileCode className="h-4 w-4 text-gray-400" />;
    }
  };

  // Load file content when selected file changes
  useEffect(() => {
    if (selectedFile && selectedProjectData) {
      const file = selectedProjectData.files.find(f => f.name === selectedFile);
      if (file) {
        getProjectFile(file.path)
          .then(content => setFileContent(content))
          .catch(error => {
            console.error('Error loading file:', error);
            setFileContent(`# Error loading file: ${selectedFile}\n\nFile not found or could not be loaded.`);
          });
      }
    } else {
      setFileContent("");
    }
  }, [selectedFile, selectedProjectData]);

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

        {/* Category Navigation */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex justify-center gap-6 mb-12"
        >
          {projectCategories.map((category) => {
            const IconComponent = category.icon;
            return (
              <Button
                key={category.id}
                variant={activeCategory === category.id ? "default" : "outline"}
                onClick={() => {
                  setActiveCategory(category.id);
                  setSelectedProject(category.projects[0].id);
                  setExpandedProjects(new Set([category.projects[0].id]));
                  setSelectedFile(null);
                }}
                className={`flex items-center gap-3 px-6 py-3 rounded-full transition-all duration-300 hover:scale-105 ${
                  activeCategory === category.id 
                    ? 'bg-primary text-primary-foreground shadow-lg' 
                    : 'bg-card/50 border-border text-muted-foreground hover:bg-primary/10 hover:border-primary/50'
                }`}
              >
                <IconComponent className="h-5 w-5" />
                <span className="font-medium">{category.title}</span>
              </Button>
            );
          })}
        </motion.div>

        {/* Projects Layout - Seamless Connection */}
        {currentCategory && (
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex bg-card/20 rounded-lg overflow-hidden border border-border/50 h-[600px]"
          >
            {/* Project Navigation Sidebar */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="w-80 bg-card/50 border-r border-border/50 p-4"
            >
              <div className="mb-4">
                <h3 className="text-lg font-semibold text-primary mb-2">{currentCategory.title}</h3>
                <p className="text-sm text-muted-foreground">{currentCategory.description}</p>
              </div>
              
              <div className="space-y-1">
                {currentCategory.projects.map((project) => {
                  const isExpanded = expandedProjects.has(project.id);
                  const isSelected = selectedProject === project.id;
                  
                  return (
                    <div key={project.id} className="space-y-1">
                      {/* Project Folder */}
                      <button
                        onClick={() => {
                          setSelectedProject(project.id);
                          toggleProject(project.id);
                          setSelectedFile(null);
                        }}
                        className={`w-full text-left p-3 rounded-md transition-all duration-200 flex items-center gap-2 ${
                          isSelected
                            ? 'bg-primary/20 text-primary border-l-2 border-primary'
                            : 'text-muted-foreground hover:bg-primary/10 hover:text-primary'
                        }`}
                      >
                        {isExpanded ? (
                          <ChevronDown className="h-4 w-4" />
                        ) : (
                          <ChevronRight className="h-4 w-4" />
                        )}
                        <span className="text-sm font-medium">{project.title}</span>
                      </button>
                      
                      {/* Project Files */}
                      {isExpanded && (
                        <div className="ml-6 space-y-1">
                          {project.files.map((file) => (
                            <button
                              key={file.name}
                              onClick={() => setSelectedFile(file.name)}
                              className={`w-full text-left p-2 rounded-md transition-all duration-200 flex items-center gap-2 text-xs ${
                                selectedFile === file.name
                                  ? 'bg-primary/10 text-primary'
                                  : 'text-muted-foreground hover:bg-primary/5 hover:text-primary'
                              }`}
                            >
                              {getFileIcon(file.type)}
                              <span>{file.name}</span>
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </motion.div>

            {/* Content Area */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="flex-1 bg-background flex flex-col"
            >
              {selectedProjectData && (
                <div className="h-full flex flex-col">
                  {/* Project Header */}
                  <div className="p-6 border-b border-border/50 flex-shrink-0">
                    <h2 className="text-2xl font-bold text-primary mb-2">
                      {selectedProjectData.title}
                    </h2>
                    <p className="text-muted-foreground mb-4">
                      {selectedProjectData.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {selectedProjectData.technologies.map((tech) => (
                        <Badge key={tech} variant="outline" className="text-xs">
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* File Content or Project Overview */}
                  <div className="flex-1 p-6 min-h-0">
                    {selectedFile ? (
                      <div className="space-y-4 h-full flex flex-col">
                        <div className="flex items-center justify-between flex-shrink-0">
                          <h3 className="text-lg font-semibold">{selectedFile}</h3>
                          <div className="flex gap-2">
                            <Button asChild variant="outline" size="sm">
                              <a
                                href={selectedProjectData.githubUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                <Github className="mr-2 h-4 w-4" />
                                View on GitHub
                              </a>
                            </Button>
                          </div>
                        </div>
                        <div className="bg-muted/20 rounded-lg border border-border/50 flex-1 overflow-hidden">
                          <div className="h-full overflow-y-auto p-4 file-content-scroll">
                            <pre className="text-sm text-muted-foreground whitespace-pre-wrap break-words file-content">
                              <code className="block">{fileContent}</code>
                            </pre>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-6">
                        <div className="relative h-48 rounded-lg overflow-hidden">
                          <img
                            src={selectedProjectData.image}
                            alt={selectedProjectData.title}
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute inset-0 bg-black/30"></div>
                        </div>
                        
                        <div className="space-y-4">
                          <div>
                            <h4 className="font-semibold text-sm text-muted-foreground mb-2">Project Files:</h4>
                            <div className="flex flex-wrap gap-2">
                              {selectedProjectData.files.map((file) => (
                                <Badge 
                                  key={file.name} 
                                  variant="secondary" 
                                  className="text-xs cursor-pointer hover:bg-primary/20"
                                  onClick={() => setSelectedFile(file.name)}
                                >
                                  {file.name}
                                </Badge>
                              ))}
                            </div>
                          </div>
                          
                          <div className="flex gap-3">
                            <Button asChild variant="outline" className="flex-1">
                              <a
                                href={selectedProjectData.githubUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                <Github className="mr-2 h-4 w-4" />
                                View Code
                              </a>
                            </Button>
                            <Button asChild className="flex-1" disabled={!selectedProjectData.liveUrl || selectedProjectData.liveUrl === "#"}>
                              <a
                                href={selectedProjectData.liveUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                <ExternalLink className="mr-2 h-4 w-4" />
                                Live Demo
                              </a>
                            </Button>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}

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