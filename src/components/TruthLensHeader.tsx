import { useState } from "react";
import { Button } from "@/components/ui/button";
import magnifyingGlassIcon from "@/assets/magnifying-glass.png";

const TruthLensHeader = () => {
  const [activeSection, setActiveSection] = useState("home");

  const scrollToSection = (sectionId: string) => {
    setActiveSection(sectionId);
    if (sectionId === "home") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-4 lg:px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <img 
              src={magnifyingGlassIcon} 
              alt="TruthLens Logo"
              className="h-8 w-8"
            />
            <span className="text-xl font-bold text-foreground">TruthLens</span>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <button
              onClick={() => scrollToSection("home")}
              className={`text-sm font-medium transition-colors hover:text-primary ${
                activeSection === "home" ? "text-primary border-b-2 border-primary pb-1" : "text-muted-foreground"
              }`}
            >
              Home
            </button>
            <button
              onClick={() => scrollToSection("trends")}
              className={`text-sm font-medium transition-colors hover:text-primary ${
                activeSection === "trends" ? "text-primary border-b-2 border-primary pb-1" : "text-muted-foreground"
              }`}
            >
              Archive
            </button>
            <button
              onClick={() => scrollToSection("education")}
              className={`text-sm font-medium transition-colors hover:text-primary ${
                activeSection === "education" ? "text-primary border-b-2 border-primary pb-1" : "text-muted-foreground"
              }`}
            >
              Learn
            </button>
            <button
              onClick={() => scrollToSection("authority")}
              className={`text-sm font-medium transition-colors hover:text-primary ${
                activeSection === "authority" ? "text-primary border-b-2 border-primary pb-1" : "text-muted-foreground"
              }`}
            >
              Authority
            </button>
            
            {/* Language Chip */}
            <div className="px-3 py-1 bg-secondary text-secondary-foreground rounded-full text-sm font-medium">
              हिं
            </div>
          </nav>

          {/* Mobile Menu Button */}
          <Button variant="outline" size="sm" className="md:hidden">
            Menu
          </Button>
        </div>
      </div>
    </header>
  );
};

export default TruthLensHeader;