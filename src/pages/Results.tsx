import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import { 
  AlertTriangle, 
  CheckCircle, 
  XCircle, 
  Clock, 
  Eye, 
  FileText, 
  Download, 
  Flag, 
  Share2, 
  ArrowLeft,
  Shield,
  Search,
  Brain,
  History,
  Image,
  Zap,
  MoreHorizontal
} from "lucide-react";
import TruthLensHeader from "@/components/TruthLensHeader";
import TruthLensFooter from "@/components/TruthLensFooter";

const Results = () => {
  const navigate = useNavigate();
  const [viewMode, setViewMode] = useState<'summary' | 'full'>('full');
  const [streamingStep, setStreamingStep] = useState(0);
  const [isStreaming, setIsStreaming] = useState(true);
  const [expandedCards, setExpandedCards] = useState<string[]>([]);

  // Mock data - comprehensive analysis result
  const mockData = {
    content: "Breaking: Government announces new tax policy affecting middle-class families. The new policy will reportedly increase income tax rates by 15% for families earning between ₹5-10 lakhs annually, effective from next fiscal year. This comes amid growing concerns about fiscal deficit and public spending.",
    
    risk: {
      level: "Medium",
      color: "amber",
      score: 72,
      confidence: 87,
      verdict: "Partially Misleading"
    },
    
    sources: [
      { name: "Government Official Website", credibility: "High", verified: true, status: "verified", url: "gov.in/policy" },
      { name: "Economic Times", credibility: "High", verified: true, status: "verified", url: "economictimes.com" },
      { name: "Local News Portal", credibility: "Medium", verified: true, status: "caution", url: "localnews.com" },
      { name: "WhatsApp Forward", credibility: "Low", verified: false, status: "false", url: null },
      { name: "Anonymous Blog", credibility: "Low", verified: false, status: "false", url: "random-blog.com" }
    ],
    
    languageIssues: [
      { type: "Sensational Language", severity: "Medium", description: "Uses emotionally charged words", examples: ["Breaking", "Shocking"] },
      { type: "Vague Attribution", severity: "High", description: "No specific source attribution", examples: ["Sources say", "Reports suggest"] },
      { type: "Urgency Markers", severity: "Low", description: "Creates false urgency", examples: ["Immediate", "Emergency"] }
    ],
    
    factChecks: [
      { claim: "Tax rate increase of 15%", status: "Partially True", details: "Official documents show 12% increase, not 15%" },
      { claim: "Affects ₹5-10 lakh bracket", status: "False", details: "Policy affects ₹7-12 lakh bracket" },
      { claim: "Effective next fiscal year", status: "True", details: "Confirmed in gazette notification" }
    ],
    
    recommendations: [
      "Cross-reference with official government press releases and gazette notifications",
      "Check multiple credible news sources for consistent reporting", 
      "Verify specific numbers and percentages from authoritative sources",
      "Be cautious of sensational language and urgent framing",
      "Look for official statements from relevant ministries"
    ]
  };

  const cardConfigs = [
    { id: 'risk', title: 'Risk Assessment', icon: AlertTriangle, color: 'text-amber-600' },
    { id: 'sources', title: 'Source Verification', icon: Shield, color: 'text-blue-600' },
    { id: 'language', title: 'Language Analysis', icon: Search, color: 'text-purple-600' },
    { id: 'facts', title: 'Fact Verification', icon: CheckCircle, color: 'text-green-600' },
    { id: 'recommendations', title: 'Recommendations', icon: Brain, color: 'text-indigo-600' },
    { id: 'context', title: 'Historical Context', icon: History, color: 'text-gray-600' },
    { id: 'forensics', title: 'Image Forensics', icon: Image, color: 'text-pink-600' },
    { id: 'narrative', title: 'AI Narrative Analysis', icon: Zap, color: 'text-orange-600' }
  ];

  // Streaming simulation
  useEffect(() => {
    if (viewMode === 'full' && isStreaming) {
      const timer = setInterval(() => {
        setStreamingStep(prev => {
          if (prev < cardConfigs.length) {
            return prev + 1;
          } else {
            setIsStreaming(false);
            setExpandedCards(cardConfigs.slice(0, 5).map(c => c.id)); // Auto-expand first 5 cards
            clearInterval(timer);
            return prev;
          }
        });
      }, 600);
      return () => clearInterval(timer);
    }
  }, [viewMode, isStreaming]);

  const getRiskColor = (level: string) => {
    switch (level.toLowerCase()) {
      case 'high': return { bg: 'bg-red-50', border: 'border-red-200', text: 'text-red-700' };
      case 'medium': return { bg: 'bg-amber-50', border: 'border-amber-200', text: 'text-amber-700' };
      case 'low': return { bg: 'bg-green-50', border: 'border-green-200', text: 'text-green-700' };
      default: return { bg: 'bg-gray-50', border: 'border-gray-200', text: 'text-gray-700' };
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'verified': return <CheckCircle className="w-4 h-4 text-green-600" />;
      case 'caution': return <AlertTriangle className="w-4 h-4 text-amber-600" />;
      case 'false': return <XCircle className="w-4 h-4 text-red-600" />;
      default: return <Clock className="w-4 h-4 text-gray-600" />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <TruthLensHeader />
      <main className="flex-1">
        {/* Header Section */}
        <section className="bg-gradient-to-br from-truthlens-primary via-truthlens-primary/90 to-truthlens-secondary border-b border-border">
          <div className="container mx-auto px-4 lg:px-6">
            <div className="flex items-center justify-between py-6">
              <div className="flex items-center gap-4">
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => navigate('/')} 
                  className="text-white/90 hover:text-white hover:bg-white/10"
                >
                  <ArrowLeft className="w-4 h-4 mr-1" />
                  Back
                </Button>
                <div>
                  <h1 className="text-2xl font-bold text-white">Analysis Results</h1>
                  <p className="text-white/80 text-sm">AI-powered misinformation detection complete</p>
                </div>
              </div>
              
              {/* View Toggle */}
              <div className="flex gap-2 bg-white/10 rounded-lg p-1">
                <Button
                  size="sm"
                  variant={viewMode === 'summary' ? 'default' : 'ghost'}
                  onClick={() => setViewMode('summary')}
                  className={viewMode === 'summary' ? 'bg-white text-truthlens-primary hover:bg-white/90' : 'text-white/90 hover:bg-white/10'}
                >
                  <Eye className="w-4 h-4 mr-1" />
                  Quick Summary
                </Button>
                <Button
                  size="sm"
                  variant={viewMode === 'full' ? 'default' : 'ghost'}
                  onClick={() => {
                    setViewMode('full');
                    setIsStreaming(true);
                    setStreamingStep(0);
                  }}
                  className={viewMode === 'full' ? 'bg-white text-truthlens-primary hover:bg-white/90' : 'text-white/90 hover:bg-white/10'}
                >
                  <FileText className="w-4 h-4 mr-1" />
                  Full Analysis
                </Button>
              </div>
            </div>
          </div>
        </section>

        <div className="container mx-auto px-4 lg:px-6 py-8">
          <div className="max-w-4xl mx-auto space-y-6">
            
            {/* Quick Summary View */}
            {viewMode === 'summary' && (
              <div className="space-y-6">
                {/* Main Verdict Card */}
                <Card className="border-l-4 border-l-amber-500">
                  <CardContent className="pt-6">
                    <div className="flex items-center justify-between mb-6">
                      <div>
                        <h3 className="text-lg font-semibold mb-2">Final Verdict</h3>
                        <p className="text-2xl font-bold text-amber-600">{mockData.risk.verdict}</p>
                      </div>
                      <Badge variant="outline" className={`${getRiskColor(mockData.risk.level).bg} ${getRiskColor(mockData.risk.level).border} ${getRiskColor(mockData.risk.level).text} px-4 py-2 text-sm font-semibold`}>
                        {mockData.risk.level} Risk
                      </Badge>
                    </div>
                    
                    <div className="grid md:grid-cols-2 gap-6 mb-6">
                      <div>
                        <h4 className="font-semibold mb-2">Credibility Score</h4>
                        <Progress value={mockData.risk.score} className="h-3 mb-2" />
                        <span className="font-bold text-lg">{mockData.risk.score}%</span>
                      </div>
                      <div>
                        <h4 className="font-semibold mb-2">Analysis Confidence</h4>
                        <Progress value={mockData.risk.confidence} className="h-3 mb-2" />
                        <span className="font-bold text-lg">{mockData.risk.confidence}%</span>
                      </div>
                    </div>

                    <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                      <h4 className="font-semibold text-amber-800 mb-2">Key Recommendation</h4>
                      <p className="text-amber-700">{mockData.recommendations[0]}</p>
                    </div>
                  </CardContent>
                </Card>

                {/* Quick Stats */}
                <div className="grid md:grid-cols-3 gap-4">
                  <Card>
                    <CardContent className="pt-6 text-center">
                      <div className="text-2xl font-bold text-green-600">{mockData.sources.filter(s => s.credibility === 'High').length}</div>
                      <div className="text-sm text-muted-foreground">High Credibility Sources</div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="pt-6 text-center">
                      <div className="text-2xl font-bold text-red-600">{mockData.languageIssues.filter(p => p.severity === 'High').length}</div>
                      <div className="text-sm text-muted-foreground">Critical Issues Found</div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="pt-6 text-center">
                      <div className="text-2xl font-bold text-blue-600">{mockData.factChecks.length}</div>
                      <div className="text-sm text-muted-foreground">Claims Fact-Checked</div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            )}

            {/* Full Analysis View */}
            {viewMode === 'full' && (
              <div className="space-y-6">
                {/* Analyzed Content */}
                <Card>
                  <CardHeader>
                    <CardTitle>Analyzed Content</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="bg-secondary/10 rounded-lg p-4 border-l-4 border-l-blue-500">
                      <p className="text-muted-foreground italic leading-relaxed">
                        "{mockData.content}"
                      </p>
                    </div>
                  </CardContent>
                </Card>

                {/* Modular Analysis Cards */}
                <div className="space-y-4">
                  {cardConfigs.map((config, index) => {
                    const isVisible = streamingStep > index;
                    const isExpanded = expandedCards.includes(config.id);
                    
                    if (!isVisible) return null;

                    return (
                      <Card key={config.id} className="border rounded-lg overflow-hidden">
                        <div 
                          className="px-6 py-4 cursor-pointer hover:bg-secondary/5 transition-colors"
                          onClick={() => {
                            if (isExpanded) {
                              setExpandedCards(prev => prev.filter(id => id !== config.id));
                            } else {
                              setExpandedCards(prev => [...prev, config.id]);
                            }
                          }}
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <config.icon className={`w-5 h-5 ${config.color}`} />
                              <h3 className="text-lg font-semibold">{config.title}</h3>
                              {isStreaming && streamingStep === index + 1 && (
                                <div className="flex space-x-1">
                                  <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"></div>
                                  <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                                  <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                                </div>
                              )}
                            </div>
                            <Button variant="ghost" size="sm">
                              {isExpanded ? "Collapse" : "Expand"}
                            </Button>
                          </div>
                        </div>
                        
                        {isExpanded && (
                          <div className="px-6 pb-6 border-t bg-secondary/2">
                            {config.id === 'risk' && (
                              <div className="pt-4 space-y-4">
                                <div className="grid md:grid-cols-2 gap-6">
                                  <div>
                                    <h4 className="font-semibold mb-3">Credibility Score</h4>
                                    <Progress value={mockData.risk.score} className="h-4 mb-2" />
                                    <div className="flex justify-between text-sm">
                                      <span className="text-muted-foreground">Low</span>
                                      <span className="font-bold text-lg">{mockData.risk.score}%</span>
                                      <span className="text-muted-foreground">High</span>
                                    </div>
                                  </div>
                                  <div>
                                    <h4 className="font-semibold mb-3">Analysis Confidence</h4>
                                    <Progress value={mockData.risk.confidence} className="h-4 mb-2" />
                                    <div className="flex justify-between text-sm">
                                      <span className="text-muted-foreground">Low</span>
                                      <span className="font-bold text-lg">{mockData.risk.confidence}%</span>
                                      <span className="text-muted-foreground">High</span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            )}

                            {config.id === 'sources' && (
                              <div className="pt-4 space-y-3">
                                {mockData.sources.map((source, idx) => (
                                  <div key={idx} className="flex items-center justify-between p-4 bg-background rounded-lg border">
                                    <div className="flex items-center gap-3">
                                      {getStatusIcon(source.status)}
                                      <div>
                                        <div className="font-medium">{source.name}</div>
                                        {source.url && <div className="text-xs text-muted-foreground">{source.url}</div>}
                                      </div>
                                    </div>
                                    <Badge variant="outline" className={
                                      source.credibility === 'High' ? 'bg-green-50 text-green-700 border-green-200' :
                                      source.credibility === 'Medium' ? 'bg-amber-50 text-amber-700 border-amber-200' :
                                      'bg-red-50 text-red-700 border-red-200'
                                    }>
                                      {source.credibility}
                                    </Badge>
                                  </div>
                                ))}
                              </div>
                            )}

                            {config.id === 'language' && (
                              <div className="pt-4 space-y-4">
                                {mockData.languageIssues.map((issue, idx) => (
                                  <div key={idx} className="p-4 border rounded-lg">
                                    <div className="flex items-start justify-between mb-3">
                                      <div className="flex-1">
                                        <h4 className="font-medium">{issue.type}</h4>
                                        <p className="text-sm text-muted-foreground mt-1">{issue.description}</p>
                                      </div>
                                      <Badge variant="outline" className={
                                        issue.severity === 'High' ? 'bg-red-50 text-red-700 border-red-200' :
                                        issue.severity === 'Medium' ? 'bg-amber-50 text-amber-700 border-amber-200' :
                                        'bg-green-50 text-green-700 border-green-200'
                                      }>
                                        {issue.severity}
                                      </Badge>
                                    </div>
                                    <div className="flex flex-wrap gap-2">
                                      {issue.examples.map((example, i) => (
                                        <span key={i} className="px-2 py-1 bg-secondary/20 rounded text-xs font-mono">
                                          "{example}"
                                        </span>
                                      ))}
                                    </div>
                                  </div>
                                ))}
                              </div>
                            )}

                            {config.id === 'facts' && (
                              <div className="pt-4 space-y-3">
                                {mockData.factChecks.map((fact, idx) => (
                                  <div key={idx} className="p-4 border rounded-lg">
                                    <div className="flex items-start justify-between mb-2">
                                      <h4 className="font-medium flex-1">"{fact.claim}"</h4>
                                      <Badge variant="outline" className={
                                        fact.status === 'True' ? 'bg-green-50 text-green-700 border-green-200' :
                                        fact.status === 'Partially True' ? 'bg-amber-50 text-amber-700 border-amber-200' :
                                        'bg-red-50 text-red-700 border-red-200'
                                      }>
                                        {fact.status}
                                      </Badge>
                                    </div>
                                    <p className="text-sm text-muted-foreground">{fact.details}</p>
                                  </div>
                                ))}
                              </div>
                            )}

                            {config.id === 'recommendations' && (
                              <div className="pt-4">
                                <ol className="space-y-3">
                                  {mockData.recommendations.map((rec, idx) => (
                                    <li key={idx} className="flex gap-3">
                                      <span className="flex-shrink-0 w-6 h-6 bg-blue-100 text-blue-700 rounded-full flex items-center justify-center text-sm font-medium">
                                        {idx + 1}
                                      </span>
                                      <p className="text-sm">{rec}</p>
                                    </li>
                                  ))}
                                </ol>
                              </div>
                            )}

                            {(config.id === 'context' || config.id === 'forensics' || config.id === 'narrative') && (
                              <div className="pt-4">
                                <div className="flex items-center justify-center py-8 text-center">
                                  <div>
                                    <MoreHorizontal className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
                                    <p className="text-muted-foreground">Coming Soon</p>
                                    <p className="text-xs text-muted-foreground mt-1">This analysis module is under development</p>
                                  </div>
                                </div>
                              </div>
                            )}
                          </div>
                        )}
                      </Card>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200">
              <CardContent className="pt-6">
                <div className="grid md:grid-cols-4 gap-4">
                  <Button 
                    onClick={() => navigate('/')} 
                    className="bg-blue-600 hover:bg-blue-700 text-white"
                  >
                    Analyze Another
                  </Button>
                  <Button variant="outline" className="border-amber-200 text-amber-700 hover:bg-amber-50">
                    <Flag className="w-4 h-4 mr-2" />
                    Flag for Authority
                  </Button>
                  <Button variant="outline" className="border-green-200 text-green-700 hover:bg-green-50">
                    <Download className="w-4 h-4 mr-2" />
                    Download Report
                  </Button>
                  <Button variant="outline" className="border-purple-200 text-purple-700 hover:bg-purple-50">
                    <Share2 className="w-4 h-4 mr-2" />
                    Share Results
                  </Button>
                </div>
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