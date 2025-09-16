import React, { useState, useRef } from "react";
import { Upload, Image, FileText, Shield, BookOpen, ChevronDown, ChevronUp } from "lucide-react";
import TruthLensHeader from "@/components/TruthLensHeader";
import TruthLensFooter from "@/components/TruthLensFooter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";

const ImageResults = () => {
  const [activeTab, setActiveTab] = useState("file");
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [showResults, setShowResults] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const [expandedCard, setExpandedCard] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const handleFile = (file: File) => {
    if (file.type.match(/^image\/(png|jpg|jpeg)$/)) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setUploadedImage(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleFactCheck = () => {
    if (uploadedImage) {
      setShowResults(true);
    }
  };

  const toggleCard = (cardId: string) => {
    setExpandedCard(expandedCard === cardId ? null : cardId);
  };

  const renderFileUpload = () => (
    <div className="w-full">
      <div
        className={`w-full p-8 border-2 border-dashed rounded-lg text-center transition-all cursor-pointer ${
          dragActive
            ? "border-primary bg-primary/5"
            : "border-input hover:border-primary/50 hover:bg-primary/5"
        }`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
      >
        <Upload className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
        <p className="text-foreground font-medium mb-2">Upload image for analysis</p>
        <p className="text-sm text-muted-foreground mb-4">
          Drag & drop your image here, or click to browse
        </p>
        <p className="text-xs text-muted-foreground">
          Supports PNG, JPG, JPEG files
        </p>
        <input
          ref={fileInputRef}
          type="file"
          accept=".png,.jpg,.jpeg"
          onChange={handleFileInput}
          className="hidden"
        />
      </div>
      
      {uploadedImage && (
        <div className="mt-6">
          <h4 className="text-sm font-medium text-foreground mb-3">Preview:</h4>
          <div className="relative rounded-lg overflow-hidden border border-input">
            <img
              src={uploadedImage}
              alt="Uploaded for analysis"
              className="w-full h-48 object-cover"
            />
          </div>
        </div>
      )}
    </div>
  );

  const renderInputField = () => {
    switch (activeTab) {
      case "text":
        return (
          <textarea
            placeholder="Enter suspicious message, news article, or claim…"
            className="w-full min-h-[120px] p-4 border border-input rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-ring bg-background"
          />
        );
      case "url":
        return (
          <input
            type="url"
            placeholder="Paste URL of article, post, or content to verify…"
            className="w-full p-4 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-ring bg-background"
          />
        );
      case "file":
        return renderFileUpload();
      default:
        return null;
    }
  };

  const ResultCard = ({ 
    id, 
    icon: Icon, 
    title, 
    content, 
    isEmpty = false 
  }: { 
    id: string;
    icon: React.ElementType;
    title: string;
    content: string;
    isEmpty?: boolean;
  }) => (
    <Card className="mb-4">
      <Collapsible open={expandedCard === id} onOpenChange={() => toggleCard(id)}>
        <CollapsibleTrigger asChild>
          <CardHeader className="cursor-pointer hover:bg-secondary/50 transition-colors">
            <CardTitle className="flex items-center justify-between text-lg">
              <div className="flex items-center gap-3">
                <Icon className="h-5 w-5 text-primary" />
                {title}
              </div>
              {expandedCard === id ? (
                <ChevronUp className="h-4 w-4 text-muted-foreground" />
              ) : (
                <ChevronDown className="h-4 w-4 text-muted-foreground" />
              )}
            </CardTitle>
          </CardHeader>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <CardContent className="pt-0">
            {isEmpty ? (
              <p className="text-muted-foreground italic">Awaiting analysis...</p>
            ) : (
              <p className="text-foreground leading-relaxed">{content}</p>
            )}
          </CardContent>
        </CollapsibleContent>
      </Collapsible>
    </Card>
  );

  return (
    <div className="min-h-screen flex flex-col">
      <TruthLensHeader />
      
      <main className="flex-1 py-8">
        <div className="container mx-auto px-4 lg:px-6">
          {/* Upload Section */}
          <div className="max-w-2xl mx-auto mb-12">
            <Card className="shadow-lg">
              <CardContent className="p-6">
                <h1 className="text-2xl font-bold text-foreground mb-6 text-center">
                  Image Fact-Check
                </h1>
                
                {/* Tabs */}
                <div className="flex bg-secondary rounded-lg p-1 mb-6">
                  <button
                    onClick={() => setActiveTab("text")}
                    className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all ${
                      activeTab === "text"
                        ? "bg-primary text-primary-foreground shadow-sm"
                        : "text-secondary-foreground hover:bg-secondary/80"
                    }`}
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
                  >
                    File
                  </button>
                </div>

                {/* Input Field */}
                <div className="mb-6">
                  {renderInputField()}
                </div>

                {/* Action Button */}
                <div className="text-center">
                  <Button
                    size="lg"
                    onClick={handleFactCheck}
                    disabled={activeTab === "file" && !uploadedImage}
                    className="bg-primary hover:bg-primary-hover text-primary-foreground"
                  >
                    Start Fact-Checking
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Results Section */}
          {showResults && (
            <div className="max-w-4xl mx-auto">
              <h2 className="text-2xl font-bold text-foreground mb-6 text-center">
                Analysis Results
              </h2>
              
              <div className="space-y-4">
                <ResultCard
                  id="forensic"
                  icon={Shield}
                  title="Forensic Analysis"
                  content=""
                  isEmpty={true}
                />
                
                <ResultCard
                  id="text-extracted"
                  icon={FileText}
                  title="Text Extracted"
                  content=""
                  isEmpty={true}
                />
                
                <ResultCard
                  id="fact-check"
                  icon={Image}
                  title="Fact-Check Results"
                  content=""
                  isEmpty={true}
                />
                
                <ResultCard
                  id="education"
                  icon={BookOpen}
                  title="Education / Explanation"
                  content=""
                  isEmpty={true}
                />
              </div>
            </div>
          )}
        </div>
      </main>
      
      <TruthLensFooter />
    </div>
  );
};

export default ImageResults;