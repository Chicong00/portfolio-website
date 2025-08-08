import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";

const experiences = [
  {
    id: "CLT",
    company: "CyberLogitec",
    location: "Ho Chi Minh City, Viet Nam",
    roles: [
      {
        title: "Business Intelligence Developer",
        period: "Apr 2023 - Now",
        description: "Led strategic initiatives and cross-functional teams to deliver data-driven solutions.",
        achievements: [
          "Conducted 20+ qualitative interviews to understand user needs and extract user pain points, translated insights into prioritized features and aligned product development with real market demand",
          "Secured $13K in grant funding by winning both Stage 1 and Stage 2 of the Norman Esch Awards (1 of 11 teams selected from 300 applicants in 2023), validating the venture's market potential and business model"
        ]
      }
    ]
  },
  {
    id: "AIA",
    company: "AIA",
    location: "Ho Chi Minh City, Viet Nam",
    roles: [
      {
        title: "Premier Financial Advisor",
        period: "Jan 2024 - Now",
        description: "Consulting and providing appropriate insurance solutions based on the financial and health needs of customers.",
        achievements: [
          "Provided 20+ protection solutions for 20+ customers and famalies",
          "Contributed 200M+ VND revenue for team",
          "Leveraged technology knowledge to improve the advisor process to customers with AI"
        ]
      }
    ]
  },
  {
    id: "solarengineering",
    company: "Genergy",
    location: "Ho Chi Minh City, Viet Nam",
    roles: [
      {
        title: "Solar Engineer",
        period: "Mar 2022 - Apr 2022", 
        description: "Analyzed clinical data and supported research initiatives.",
        achievements: [
          "Processed and analyzed clinical trial data for 5+ research studies",
          "Improved data collection efficiency by 40% through automation",
          "Collaborated with medical researchers on statistical analysis"
        ]
      }
    ]
  }
];

export function ExperienceSection() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [selectedCompany, setSelectedCompany] = useState("CLT");
  const selectedExperience = experiences.find(exp => exp.id === selectedCompany);

  return (
    <section id="experience" className="py-20 relative" ref={ref}>
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
            Experience
          </h2>
          <div className="w-32 h-1 bg-primary mx-auto"></div>
        </motion.div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Company Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="lg:w-1/4"
          >
            <div className="space-y-2">
              {experiences.map((experience) => (
                <button
                  key={experience.id}
                  onClick={() => setSelectedCompany(experience.id)}
                  className={`w-full text-left p-4 rounded-lg transition-all duration-300 border-l-4 ${
                    selectedCompany === experience.id
                      ? 'bg-primary/20 border-primary text-primary'
                      : 'bg-card/50 border-border text-muted-foreground hover:bg-primary/10 hover:border-primary/50'
                  }`}
                >
                  <div className="font-medium">{experience.company}</div>
                  <div className="text-sm opacity-75">{experience.location}</div>
                </button>
              ))}
            </div>
          </motion.div>

          {/* Experience Details */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="lg:w-3/4"
          >
            {selectedExperience && (
              <div className="space-y-6">
                {selectedExperience.roles.map((role, index) => (
                  <Card key={index} className="card-elegant">
                    <CardContent className="p-6">
                      <div className="mb-4">
                        <h3 className="text-2xl font-bold text-foreground">
                          {role.title} @ <span className="text-primary">{selectedExperience.company}</span>
                        </h3>
                        <p className="text-muted-foreground font-medium">{role.period}</p>
                      </div>
                      
                      <div className="space-y-4">
                        {role.achievements.map((achievement, i) => (
                          <div key={i} className="flex items-start gap-3">
                            <span className="text-primary mt-2 text-lg">▶</span>
                            <p className="text-muted-foreground leading-relaxed">{achievement}</p>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}