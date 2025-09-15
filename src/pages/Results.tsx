import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { useNavigate } from "react-router-dom";
import { 
  ArrowLeft,
  Eye,
  FileText,
  AlertTriangle,
  Shield,
  Search,
  CheckCircle,
  Brain,
  History,
  Image,
  Zap,
  Clock,
  Download,
  Flag,
  Share2,
  XCircle,
  Loader2
} from "lucide-react";
import TruthLensHeader from "@/components/TruthLensHeader";
import TruthLensFooter from "@/components/TruthLensFooter";

// TypeScript interfaces for expected data structures
interface RiskAssessment {
  level: 'High' | 'Medium' | 'Low';
  score: number;
  confidence: number;
  verdict: string;
}

interface FactCheckSource {
  name: string;
  credibility: 'High' | 'Medium' | 'Low';
  status: 'verified' | 'caution' | 'false' | 'pending';
  url?: string;
}

interface LanguageIssue {
  type: string;
  severity: 'High' | 'Medium' | 'Low';
  description: string;
  examples?: string[];
}

interface AnalysisData {
  content?: string;
  risk?: RiskAssessment;
  sources?: FactCheckSource[];
  languageIssues?: LanguageIssue[];
  recommendations?: string[];
  historicalContext?: string;
  imageForensics?: string;
  aiNarrative?: string;
}

const Results = () => {
  const navigate = useNavigate();
  const [viewMode, setViewMode] = useState<'summary' | 'full'>('summary');
  const [isStreaming, setIsStreaming] = useState(false);
  const [streamingCardId, setStreamingCardId] = useState<string | null>(null);
  const [analysisData, setAnalysisData] = useState<AnalysisData>({});
  const [expandedCards, setExpandedCards] = useState<string[]>([]);

  // Card configurations for modular layout
  const cardConfigs = [
    {
      id: 'risk',
      title: 'Risk Assessment',
      icon: AlertTriangle,
      description: 'Overall credibility and risk analysis'
    },
    {
      id: 'sources',
      title: 'Fact-Check Sources',
      icon: Shield,
      description: 'Source verification and credibility scores'
    },
    {
      id: 'language',
      title: 'Content Analysis',
      icon: Search,
      description: 'Language patterns and potential issues'
    },
    {
      id: 'recommendations',
      title: 'Recommendations',
      icon: Brain,
      description: 'Suggested actions and next steps'
    },
    {
      id: 'context',
      title: 'Historical Context',
      icon: History,
      description: 'Related historical claims and patterns'
    },
    {
      id: 'forensics',
      title: 'Image Forensics',
      icon: Image,
      description: 'Visual content authenticity analysis'
    },
    {
      id: 'narrative',
      title: 'AI Narrative Analysis',
      icon: Zap,
      description: 'AI-generated content detection'
    }
  ];

  // Streaming simulation effect
  useEffect(() => {
    if (isStreaming && Object.keys(analysisData).length > 0) {
      const streamOrder = ['risk', 'sources', 'language', 'recommendations'];
      let currentIndex = 0;

      const streamInterval = setInterval(() => {
        if (currentIndex < streamOrder.length) {
          setStreamingCardId(streamOrder[currentIndex]);
          setExpandedCards(prev => [...prev, streamOrder[currentIndex]]);
          currentIndex++;
        } else {
          setIsStreaming(false);
          setStreamingCardId(null);
          clearInterval(streamInterval);
        }
      }, 1200);

      return () => clearInterval(streamInterval);
    }
  }, [isStreaming, analysisData]);

  // Loading animation component
  const LoadingAnimation = () => (
    <div className="flex items-center gap-2 text-muted-foreground">
      <Loader2 className="w-4 h-4 animate-spin" />
      <span className="text-sm">Processing analysis...</span>
      <div className="flex gap-1">
        <div className="w-1 h-1 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
        <div className="w-1 h-1 bg-primary rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
        <div className="w-1 h-1 bg-primary rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
      </div>
    </div>
  );

  // Empty state component for each card
  const EmptyCardContent = ({ cardId }: { cardId: string }) => {
    const isCurrentlyStreaming = streamingCardId === cardId;
    
    const emptyMessages = {
      risk: "Analyzing risk factors and credibility indicators...",
      sources: "Searching fact-check databases and verifying sources...",
      language: "Examining content for linguistic patterns and issues...",
      recommendations: "Generating actionable recommendations...",
      context: "Coming Soon - Historical context analysis",
      forensics: "Coming Soon - Image forensics capabilities",
      narrative: "Coming Soon - AI narrative detection"
    };

    return (
      <div className="py-8 text-center">
        {isCurrentlyStreaming ? (
          <LoadingAnimation />
        ) : (
          <div className="text-muted-foreground">
            <Clock className="w-8 h-8 mx-auto mb-3 opacity-50" />
            <p className="text-sm mb-1">{emptyMessages[cardId as keyof typeof emptyMessages]}</p>
            {cardId === 'context' || cardId === 'forensics' || cardId === 'narrative' ? (
              <p className="text-xs opacity-75">This module will be available in future updates</p>
            ) : (
              <p className="text-xs opacity-75">Connect backend to see analysis results</p>
            )}
          </div>
        )}
      </div>
    );
  };

  // Risk level styling helper
  const getRiskStyling = (level?: string) => {
    switch (level?.toLowerCase()) {
      case 'high':
        return { 
          bg: 'bg-red-50 dark:bg-red-950/20', 
          border: 'border-red-200 dark:border-red-800', 
          text: 'text-red-700 dark:text-red-400' 
        };
      case 'medium':
        return { 
          bg: 'bg-amber-50 dark:bg-amber-950/20', 
          border: 'border-amber-200 dark:border-amber-800', 
          text: 'text-amber-700 dark:text-amber-400' 
        };
      case 'low':
        return { 
          bg: 'bg-green-50 dark:bg-green-950/20', 
          border: 'border-green-200 dark:border-green-800', 
          text: 'text-green-700 dark:text-green-400' 
        };
      default:
        return { 
          bg: 'bg-muted/50', 
          border: 'border-border', 
          text: 'text-muted-foreground' 
        };
    }
  };

  // Render card content based on type and data availability
  const renderCardContent = (cardId: string) => {
    switch (cardId) {
      case 'risk':
        if (!analysisData.risk) return <EmptyCardContent cardId={cardId} />;
        const riskStyling = getRiskStyling(analysisData.risk.level);
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-lg font-semibold mb-1">Risk Assessment</h4>
                <p className="text-sm text-muted-foreground">{analysisData.risk.verdict}</p>
              </div>
              <Badge className={`${riskStyling.bg} ${riskStyling.border} ${riskStyling.text} px-3 py-1`}>
                {analysisData.risk.level} Risk
              </Badge>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm font-medium">Credibility Score</span>
                  <span className="text-sm font-bold">{analysisData.risk.score}%</span>
                </div>
                <Progress value={analysisData.risk.score} className="h-2" />
              </div>
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm font-medium">Analysis Confidence</span>
                  <span className="text-sm font-bold">{analysisData.risk.confidence}%</span>
                </div>
                <Progress value={analysisData.risk.confidence} className="h-2" />
              </div>
            </div>
          </div>
        );

      case 'sources':
        if (!analysisData.sources?.length) return <EmptyCardContent cardId={cardId} />;
        return (
          <div className="space-y-3">
            {analysisData.sources.map((source, idx) => (
              <div key={idx} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                <div className="flex items-center gap-3">
                  {source.status === 'verified' && <CheckCircle className="w-4 h-4 text-green-600" />}
                  {source.status === 'caution' && <AlertTriangle className="w-4 h-4 text-amber-600" />}
                  {source.status === 'false' && <XCircle className="w-4 h-4 text-red-600" />}
                  {source.status === 'pending' && <Clock className="w-4 h-4 text-muted-foreground" />}
                  <div>
                    <div className="font-medium text-sm">{source.name}</div>
                    {source.url && <div className="text-xs text-muted-foreground truncate max-w-48">{source.url}</div>}
                  </div>
                </div>
                <Badge variant="outline" className={
                  source.credibility === 'High' ? 'border-green-200 text-green-700 bg-green-50' :
                  source.credibility === 'Medium' ? 'border-amber-200 text-amber-700 bg-amber-50' :
                  'border-red-200 text-red-700 bg-red-50'
                }>
                  {source.credibility}
                </Badge>
              </div>
            ))}
          </div>
        );

      case 'language':
        if (!analysisData.languageIssues?.length) return <EmptyCardContent cardId={cardId} />;
        return (
          <div className="space-y-4">
            {analysisData.languageIssues.map((issue, idx) => (
              <div key={idx} className="p-4 border rounded-lg">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1">
                    <h5 className="font-medium">{issue.type}</h5>
                    <p className="text-sm text-muted-foreground mt-1">{issue.description}</p>
                  </div>
                  <Badge variant="outline" className={
                    issue.severity === 'High' ? 'border-red-200 text-red-700 bg-red-50' :
                    issue.severity === 'Medium' ? 'border-amber-200 text-amber-700 bg-amber-50' :
                    'border-green-200 text-green-700 bg-green-50'
                  }>
                    {issue.severity}
                  </Badge>
                </div>
                {issue.examples && issue.examples.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-3">
                    {issue.examples.map((example, i) => (
                      <span key={i} className="px-2 py-1 bg-muted/50 rounded text-xs">
                        "{example}"
                      </span>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        );

      case 'recommendations':
        if (!analysisData.recommendations?.length) return <EmptyCardContent cardId={cardId} />;
        return (
          <div className="space-y-3">
            {analysisData.recommendations.map((rec, idx) => (
              <div key={idx} className="flex gap-3 p-3 bg-blue-50/50 dark:bg-blue-950/20 rounded-lg border border-blue-100 dark:border-blue-800">
                <div className="w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">
                  {idx + 1}
                </div>
                <p className="text-sm leading-relaxed">{rec}</p>
              </div>
            ))}
          </div>
        );

      default:
        return <EmptyCardContent cardId={cardId} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <TruthLensHeader />
      
      <main className="flex-1">
        {/* Header Section */}
        <section className="bg-gradient-to-br from-primary via-primary/90 to-primary/80 border-b border-border">
          <div className="container mx-auto px-4 lg:px-6">
            <div className="flex items-center justify-between py-6">
              <div className="flex items-center gap-4">
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => navigate('/')} 
                  className="text-white/90 hover:text-white hover:bg-white/10 transition-colors"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back
                </Button>
                <div>
                  <h1 className="text-2xl font-bold text-white">Analysis Results</h1>
                  <div className="flex items-center gap-2 mt-1">
                    <div className="flex items-center gap-1">
                      {Object.keys(analysisData).length > 0 ? (
                        <>
                          <CheckCircle className="w-4 h-4 text-green-300" />
                          <span className="text-white/80 text-sm">Analysis Complete</span>
                        </>
                      ) : (
                        <>
                          <Clock className="w-4 h-4 text-white/60" />
                          <span className="text-white/80 text-sm">Awaiting Data...</span>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              
              {/* View Toggle */}
              <div className="flex gap-1 bg-white/10 rounded-lg p-1">
                <Button
                  size="sm"
                  variant={viewMode === 'summary' ? 'default' : 'ghost'}
                  onClick={() => setViewMode('summary')}
                  className={
                    viewMode === 'summary' 
                      ? 'bg-white text-primary hover:bg-white/90' 
                      : 'text-white/90 hover:bg-white/10'
                  }
                >
                  <Eye className="w-4 h-4 mr-1" />
                  Quick Summary
                </Button>
                <Button
                  size="sm"
                  variant={viewMode === 'full' ? 'default' : 'ghost'}
                  onClick={() => {
                    setViewMode('full');
                    if (Object.keys(analysisData).length > 0) {
                      setIsStreaming(true);
                      setExpandedCards([]);
                    }
                  }}
                  className={
                    viewMode === 'full' 
                      ? 'bg-white text-primary hover:bg-white/90' 
                      : 'text-white/90 hover:bg-white/10'
                  }
                >
                  <FileText className="w-4 h-4 mr-1" />
                  Full Analysis
                </Button>
              </div>
            </div>
          </div>
        </section>

        <div className="container mx-auto px-4 lg:px-6 py-8">
          <div className="max-w-4xl mx-auto">
            
            {/* Quick Summary View */}
            {viewMode === 'summary' && (
              <div className="space-y-6">
                {Object.keys(analysisData).length > 0 ? (
                  <Card className="border-l-4 border-l-primary">
                    <CardContent className="pt-6">
                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <h3 className="font-semibold mb-4">Quick Summary</h3>
                          {analysisData.risk && (
                            <div className="space-y-3">
                              <div className="flex justify-between items-center">
                                <span className="text-sm">Risk Level:</span>
                                <Badge className={`${getRiskStyling(analysisData.risk.level).bg} ${getRiskStyling(analysisData.risk.level).text}`}>
                                  {analysisData.risk.level}
                                </Badge>
                              </div>
                              <div>
                                <div className="flex justify-between mb-1">
                                  <span className="text-xs">Credibility</span>
                                  <span className="text-xs font-bold">{analysisData.risk.score}%</span>
                                </div>
                                <Progress value={analysisData.risk.score} className="h-2" />
                              </div>
                            </div>
                          )}
                        </div>
                        <div>
                          <h4 className="font-semibold mb-2">Key Recommendation</h4>
                          <p className="text-sm text-muted-foreground p-3 bg-muted/30 rounded-lg">
                            {analysisData.recommendations?.[0] || "Complete analysis to see recommendations"}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ) : (
                  <Card>
                    <CardContent className="pt-6">
                      <div className="text-center py-12">
                        <LoadingAnimation />
                        <p className="text-sm text-muted-foreground mt-4">
                          Connect your backend to see analysis summary
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>
            )}

            {/* Full Analysis View */}
            {viewMode === 'full' && (
              <div className="space-y-6">
                <Accordion type="multiple" value={expandedCards} onValueChange={setExpandedCards}>
                  {cardConfigs.map((config) => {
                    const IconComponent = config.icon;
                    return (
                      <AccordionItem key={config.id} value={config.id}>
                        <Card>
                          <AccordionTrigger className="px-6 py-4 hover:no-underline">
                            <div className="flex items-center gap-3">
                              <IconComponent className="w-5 h-5 text-primary" />
                              <div className="text-left">
                                <div className="font-semibold">{config.title}</div>
                                <div className="text-sm text-muted-foreground">{config.description}</div>
                              </div>
                            </div>
                          </AccordionTrigger>
                          <AccordionContent>
                            <div className="px-6 pb-4">
                              {renderCardContent(config.id)}
                            </div>
                          </AccordionContent>
                        </Card>
                      </AccordionItem>
                    );
                  })}
                </Accordion>
              </div>
            )}

            {/* Actions Section */}
            <Card className="mt-12">
              <CardHeader>
                <CardTitle className="text-center">Actions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  <Button 
                    onClick={() => navigate('/')} 
                    variant="default"
                    className="w-full"
                  >
                    <Search className="w-4 h-4 mr-2" />
                    Analyze Another
                  </Button>
                  <Button variant="outline" className="w-full" disabled>
                    <Flag className="w-4 h-4 mr-2" />
                    Flag for Authority
                  </Button>
                  <Button variant="outline" className="w-full" disabled>
                    <Download className="w-4 h-4 mr-2" />
                    Download Report
                  </Button>
                  <Button variant="outline" className="w-full" disabled>
                    <Share2 className="w-4 h-4 mr-2" />
                    Share Results
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground text-center mt-4">
                  Additional actions will be enabled once backend integration is complete
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      <TruthLensFooter />
    </div>
  );
};

export default Results;