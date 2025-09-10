import { useState } from "react";
import { Button } from "@/components/ui/button";

const HeroSection = () => {
  const [activeTab, setActiveTab] = useState("text");

  const renderInputField = () => {
    switch (activeTab) {
      case "text":
        return (
          <textarea
            id="tl-input-text"
            placeholder="Enter suspicious message, news article, or claim…"
            className="w-full min-h-[120px] p-4 border border-input rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-ring bg-background"
          />
        );
      case "url":
        return (
          <input
            id="tl-input-url"
            type="url"
            placeholder="Paste URL of article, post, or content to verify…"
            className="w-full p-4 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-ring bg-background"
          />
        );
      case "file":
        return (
          <div id="tl-input-file" className="w-full p-8 border-2 border-dashed border-input rounded-lg text-center">
            <p className="text-muted-foreground">Upload image or document for analysis</p>
            <p className="text-sm text-muted-foreground mt-2">Drag & drop or click to browse</p>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <section className="relative py-20 lg:py-24 overflow-hidden">
      {/* Gradient Background */}
      <div 
        className="absolute inset-0 bg-gradient-to-br from-truthlens-primary to-truthlens-secondary"
        style={{
          background: "var(--truthlens-gradient)"
        }}
      />
      
      <div className="relative z-10 container mx-auto px-4 lg:px-6">
        <div className="max-w-4xl mx-auto text-center text-white">
          {/* Main Headlines */}
          <div className="mb-8">
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-4 leading-tight">
              Detect. Verify. Report.
            </h1>
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-semibold mb-6 text-orange-200">
              Empower India against misinformation
            </h2>
            <p className="text-lg md:text-xl text-blue-100 mb-8">
              AI-powered fact-checking for every Indian citizen
            </p>
          </div>

          {/* Stats Row */}
          <div className="flex flex-col md:flex-row justify-center gap-8 md:gap-16 mb-12">
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold">10K+</div>
              <div className="text-sm md:text-base text-blue-200">Content Analyzed</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold">95%</div>
              <div className="text-sm md:text-base text-blue-200">Accuracy Rate</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold">24/7</div>
              <div className="text-sm md:text-base text-blue-200">AI Monitoring</div>
            </div>
          </div>

          {/* Input Card */}
          <div className="max-w-2xl mx-auto bg-card rounded-xl shadow-lg p-6">
            <h3 className="text-xl font-semibold text-card-foreground mb-4">Start Your Fact-Check</h3>
            
            {/* Tabs */}
            <div className="flex bg-secondary rounded-lg p-1 mb-4">
              <button
                onClick={() => setActiveTab("text")}
                className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all ${
                  activeTab === "text"
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : "text-secondary-foreground hover:bg-secondary/80"
                }`}
                aria-selected={activeTab === "text"}
              >
                Text
              </button>
              <button
                onClick={() => setActiveTab("url")}
                className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all ${
                  activeTab === "url"
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : "text-secondary-foreground hover:bg-secondary/80"
                }`}
                aria-selected={activeTab === "url"}
              >
                URL
              </button>
              <button
                onClick={() => setActiveTab("file")}
                className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all ${
                  activeTab === "file"
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : "text-secondary-foreground hover:bg-secondary/80"
                }`}
                aria-selected={activeTab === "file"}
              >
                File
              </button>
            </div>

            {/* Input Field */}
            <div className="mb-6">
              {renderInputField()}
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button size="lg" className="bg-primary hover:bg-primary-hover text-primary-foreground">
                Start Fact-Checking
              </Button>
              <Button variant="outline" size="lg" className="border-2 border-card-foreground/20 text-card-foreground hover:bg-card-foreground hover:text-card">
                Learn More
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;