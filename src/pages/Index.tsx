import { Navigation } from "@/components/Navigation";
import { HeroSection } from "@/components/sections/HeroSection";
import { AboutSection } from "@/components/sections/AboutSection";
import { ProjectsSection } from "@/components/sections/ProjectsSection";
import { ExperienceSection } from "@/components/sections/ExperienceSection";
import { DataJourneySection } from "@/components/sections/DataJourneySection";
import { TechStackSection } from "@/components/sections/TechStackSection";
import { ContactSection } from "@/components/sections/ContactSection";
import { GalaxyBackground } from "@/components/GalaxyBackground";

const Index = () => {
  return (
    <div className="min-h-screen bg-background relative">
      <GalaxyBackground />
      <Navigation />
      <main>
        <HeroSection />
        <AboutSection />
        <ProjectsSection />
        <ExperienceSection />
        <DataJourneySection />
        <TechStackSection />
        <ContactSection />
      </main>
      
      {/* Footer */}
      <footer className="bg-card border-t border-border py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-muted-foreground">
              © Data Analyst Portfolio. Built with React, TypeScript, and Tailwind CSS.
            </p>
            <p className="text-sm text-muted-foreground mt-2">
              Turning data into insights, one analysis at a time.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
