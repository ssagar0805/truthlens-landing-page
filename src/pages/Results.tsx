import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Progress } from "@/components/ui/progress";
import { useNavigate } from "react-router-dom";
import { ChevronDown, Download, Flag, Share2, AlertTriangle, CheckCircle, XCircle, Clock, Eye, FileText } from "lucide-react";
import TruthLensHeader from "@/components/TruthLensHeader";
import TruthLensFooter from "@/components/TruthLensFooter";

const Results = () => {
  const navigate = useNavigate();
  const [viewMode, setViewMode] = useState<'summary' | 'full'>('summary');
  const [streamingComplete, setStreamingComplete] = useState(false);
  const [visibleSections, setVisibleSections] = useState<string[]>([]);

  // Enhanced mock analysis result data
  const analysisResult = {
    content: "Breaking: Government announces new tax policy affecting middle-class families. The new policy will reportedly increase income tax rates by 15% for families earning between ₹5-10 lakhs annually, effective from next fiscal year. This comes amid growing concerns about fiscal deficit and public spending.",
    riskLevel: "Medium",
    riskColor: "bg-amber-500/10 text-amber-600 border-amber-200",
    credibilityScore: 72,
    confidenceScore: 87,
    verdict: "Partially Misleading",
    
    sources: [
      { name: "Government Official Website", credibility: "High", verified: true, icon: "✅", url: "gov.in/policy" },
      { name: "Economic Times", credibility: "High", verified: true, icon: "✅", url: "economictimes.com" },
      { name: "Local News Portal", credibility: "Medium", verified: true, icon: "⚠️", url: "localnews.com" },
      { name: "WhatsApp Forward", credibility: "Low", verified: false, icon: "❌", url: null },
      { name: "Anonymous Blog", credibility: "Low", verified: false, icon: "❌", url: "random-blog.com" }
    ],
    
    languagePatterns: [
      { type: "Sensational Language", severity: "Medium", description: "Uses emotionally charged words like 'breaking' and 'shocking'", examples: ["Breaking", "Reportedly", "Amid growing concerns"] },
      { type: "Urgency Markers", severity: "Low", description: "Creates false sense of urgency", examples: ["Effective immediately", "Emergency measure"] },
      { type: "Vague Attribution", severity: "High", description: "No specific source attribution for key claims", examples: ["Sources say", "Reports suggest"] }
    ],
    
    factChecks: [
      { claim: "Tax rate increase of 15%", status: "Partially True", details: "Official documents show 12% increase, not 15%" },
      { claim: "Affects families earning ₹5-10 lakhs", status: "False", details: "Policy affects ₹7-12 lakh bracket according to finance ministry" },
      { claim: "Effective from next fiscal year", status: "True", details: "Confirmed in official gazette notification" }
    ],
    
    recommendations: [
      "Cross-reference with official government press releases and gazette notifications",
      "Check multiple credible news sources for consistent reporting",
      "Verify specific numbers and percentages from authoritative sources",
      "Be cautious of sensational language and urgent framing",
      "Look for official statements from relevant ministries"
    ],

    historicalContext: {
      similarCases: 3,
      lastSimilar: "2 months ago",
      pattern: "Tax policy misinformation typically spreads during budget season"
    }
  };

  const streamingSections = ['risk', 'sources', 'language', 'facts', 'recommendations', 'context'];

  // Simulate streaming effect
  useEffect(() => {
    const timer = setInterval(() => {
      setVisibleSections(prev => {
        if (prev.length < streamingSections.length) {
          return [...prev, streamingSections[prev.length]];
        } else {
          setStreamingComplete(true);
          clearInterval(timer);
          return prev;
        }
      });
    }, 800);

    return () => clearInterval(timer);
  }, []);

  const getRiskBadgeStyle = (level: string) => {
    switch (level.toLowerCase()) {
      case 'high': return 'bg-red-500/10 text-red-600 border-red-200';
      case 'medium': return 'bg-amber-500/10 text-amber-600 border-amber-200';
      case 'low': return 'bg-green-500/10 text-green-600 border-green-200';
      default: return 'bg-gray-500/10 text-gray-600 border-gray-200';
    }
  };

  const getCredibilityIcon = (credibility: string) => {
    switch (credibility.toLowerCase()) {
      case 'high': return <CheckCircle className="w-4 h-4 text-green-600" />;
      case 'medium': return <AlertTriangle className="w-4 h-4 text-amber-600" />;
      case 'low': return <XCircle className="w-4 h-4 text-red-600" />;
      default: return <Clock className="w-4 h-4 text-gray-600" />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <TruthLensHeader />
      <main className="flex-1">
        {/* Header */}
        <section className="bg-gradient-to-br from-truthlens-primary via-truthlens-primary/90 to-truthlens-secondary border-b border-border">
          <div className="container mx-auto px-4 lg:px-6">
            <div className="flex items-center justify-between py-6">
              <div className="flex items-center gap-4">
                <Button variant="ghost" size="sm" onClick={() => navigate(-1)} className="text-white/90 hover:text-white hover:bg-white/10">
                  ← Back
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
                  onClick={() => setViewMode('full')}
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
                {/* Verdict Card */}
                <Card className="border-l-4 border-l-amber-500">
                  <CardContent className="pt-6">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <h3 className="text-lg font-semibold text-card-foreground">Final Verdict</h3>
                        <p className="text-2xl font-bold text-amber-600 mt-1">{analysisResult.verdict}</p>
                      </div>
                      <div className={`px-4 py-2 rounded-full text-sm font-semibold border ${getRiskBadgeStyle(analysisResult.riskLevel)}`}>
                        {analysisResult.riskLevel} Risk
                      </div>
                    </div>
                    
                    <div className="grid md:grid-cols-2 gap-6 mb-6">
                      <div>
                        <h4 className="font-semibold text-card-foreground mb-2">Credibility Score</h4>
                        <Progress value={analysisResult.credibilityScore} className="h-3 mb-2" />
                        <span className="font-bold text-lg">{analysisResult.credibilityScore}%</span>
                      </div>
                      <div>
                        <h4 className="font-semibold text-card-foreground mb-2">Analysis Confidence</h4>
                        <Progress value={analysisResult.confidenceScore} className="h-3 mb-2" />
                        <span className="font-bold text-lg">{analysisResult.confidenceScore}%</span>
                      </div>
                    </div>

                    <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                      <h4 className="font-semibold text-amber-800 mb-2">Key Recommendation</h4>
                      <p className="text-amber-700">{analysisResult.recommendations[0]}</p>
                    </div>
                  </CardContent>
                </Card>

                {/* Quick Stats */}
                <div className="grid md:grid-cols-3 gap-4">
                  <Card>
                    <CardContent className="pt-6 text-center">
                      <div className="text-2xl font-bold text-green-600">{analysisResult.sources.filter(s => s.credibility === 'High').length}</div>
                      <div className="text-sm text-muted-foreground">High Credibility Sources</div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="pt-6 text-center">
                      <div className="text-2xl font-bold text-red-600">{analysisResult.languagePatterns?.filter(p => p.severity === 'High').length || 0}</div>
                      <div className="text-sm text-muted-foreground">Critical Issues Found</div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="pt-6 text-center">
                      <div className="text-2xl font-bold text-blue-600">{analysisResult.factChecks?.length || 0}</div>
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
                    <div className="bg-secondary/10 rounded-lg p-4">
                      <p className="text-muted-foreground italic leading-relaxed">
                        "{analysisResult.content}"
                      </p>
                    </div>
                  </CardContent>
                </Card>

                {/* Analysis Sections with Streaming Effect */}
                <Accordion type="multiple" defaultValue={streamingComplete ? ["risk", "sources", "language"] : visibleSections} className="space-y-4">
                  
                  {/* Risk Assessment */}
                  {visibleSections.includes('risk') && (
                    <AccordionItem value="risk" className="border rounded-lg">
                      <Card>
                        <AccordionTrigger className="px-6 py-4 hover:no-underline">
                          <CardTitle className="flex items-center gap-3">
                            <AlertTriangle className="w-5 h-5 text-amber-600" />
                            Risk Assessment
                            <div className={`px-3 py-1 rounded-full text-sm font-semibold border ${getRiskBadgeStyle(analysisResult.riskLevel)}`}>
                              {analysisResult.riskLevel} Risk
                            </div>
                          </CardTitle>
                        </AccordionTrigger>
                        <AccordionContent>
                          <CardContent>
                            <div className="grid md:grid-cols-2 gap-6">
                              <div>
                                <h4 className="font-semibold text-card-foreground mb-3">Credibility Score</h4>
                                <Progress value={analysisResult.credibilityScore} className="h-4 mb-2" />
                                <div className="flex justify-between text-sm">
                                  <span className="text-muted-foreground">Low</span>
                                  <span className="font-bold text-lg">{analysisResult.credibilityScore}%</span>
                                  <span className="text-muted-foreground">High</span>
                                </div>
                              </div>
                              <div>
                                <h4 className="font-semibold text-card-foreground mb-3">Analysis Confidence</h4>
                                <Progress value={analysisResult.confidenceScore} className="h-4 mb-2" />
                                <div className="flex justify-between text-sm">
                                  <span className="text-muted-foreground">Low</span>
                                  <span className="font-bold text-lg">{analysisResult.confidenceScore}%</span>
                                  <span className="text-muted-foreground">High</span>
                                </div>
                              </div>
                            </div>
                          </CardContent>
                        </AccordionContent>
                      </Card>
                    </AccordionItem>
                  )}

                  {/* Source Verification */}
                  {visibleSections.includes('sources') && (
                    <AccordionItem value="sources" className="border rounded-lg">
                      <Card>
                        <AccordionTrigger className="px-6 py-4 hover:no-underline">
                          <CardTitle className="flex items-center gap-3">
                            <CheckCircle className="w-5 h-5 text-green-600" />
                            Source Verification
                            <span className="text-sm bg-secondary/20 px-2 py-1 rounded">
                              {analysisResult.sources.length} sources analyzed
                            </span>
                          </CardTitle>
                        </AccordionTrigger>
                        <AccordionContent>
                          <CardContent>
                            <div className="space-y-3">
                              {analysisResult.sources.map((source, index) => (
                                <div key={index} className="flex items-center justify-between p-4 bg-secondary/5 rounded-lg border">
                                  <div className="flex items-center gap-3">
                                    {getCredibilityIcon(source.credibility)}
                                    <div>
                                      <span className="font-medium text-card-foreground">{source.name}</span>
                                      {source.url && (
                                        <div className="text-xs text-muted-foreground mt-1">{source.url}</div>
                                      )}
                                    </div>
                                  </div>
                                  <div className={`px-3 py-1 rounded-full text-sm font-medium ${
                                    source.credibility === 'High' ? 'bg-green-500/10 text-green-600' :
                                    source.credibility === 'Medium' ? 'bg-amber-500/10 text-amber-600' :
                                    'bg-red-500/10 text-red-600'
                                  }`}>
                                    {source.credibility} Credibility
                                  </div>
                                </div>
                              ))}
                            </div>
                          </CardContent>
                        </AccordionContent>
                      </Card>
                    </AccordionItem>
                  )}

                  {/* Language Pattern Analysis */}
                  {visibleSections.includes('language') && (
                    <AccordionItem value="language" className="border rounded-lg">
                      <Card>
                        <AccordionTrigger className="px-6 py-4 hover:no-underline">
                          <CardTitle className="flex items-center gap-3">
                            <Eye className="w-5 h-5 text-blue-600" />
                            Language Pattern Analysis
                            <span className="text-sm bg-red-500/10 text-red-600 px-2 py-1 rounded">
                              {analysisResult.languagePatterns?.filter(p => p.severity === 'High').length || 0} critical issues
                            </span>
                          </CardTitle>
                        </AccordionTrigger>
                        <AccordionContent>
                          <CardContent>
                            <div className="space-y-4">
                              {analysisResult.languagePatterns?.map((pattern, index) => (
                                <div key={index} className="p-4 border rounded-lg">
                                  <div className="flex items-start justify-between mb-3">
                                    <div>
                                      <h4 className="font-medium text-card-foreground">{pattern.type}</h4>
                                      <p className="text-sm text-muted-foreground mt-1">{pattern.description}</p>
                                    </div>
                                    <div className={`px-2 py-1 rounded text-xs font-medium ${
                                      pattern.severity === 'High' ? 'bg-red-500/10 text-red-600' :
                                      pattern.severity === 'Medium' ? 'bg-amber-500/10 text-amber-600' : 
                                      'bg-green-500/10 text-green-600'
                                    }`}>
                                      {pattern.severity}
                                    </div>
                                  </div>
                                  {pattern.examples && (
                                    <div className="mt-3">
                                      <div className="text-xs text-muted-foreground mb-2">Examples found:</div>
                                      <div className="flex flex-wrap gap-2">
                                        {pattern.examples.map((example, i) => (
                                          <span key={i} className="bg-red-50 text-red-700 px-2 py-1 rounded text-xs">
                                            "{example}"
                                          </span>
                                        ))}
                                      </div>
                                    </div>
                                  )}
                                </div>
                              ))}
                            </div>
                          </CardContent>
                        </AccordionContent>
                      </Card>
                    </AccordionItem>
                  )}

                  {/* Fact Checks */}
                  {visibleSections.includes('facts') && (
                    <AccordionItem value="facts" className="border rounded-lg">
                      <Card>
                        <AccordionTrigger className="px-6 py-4 hover:no-underline">
                          <CardTitle className="flex items-center gap-3">
                            <FileText className="w-5 h-5 text-purple-600" />
                            Fact Check Results
                          </CardTitle>
                        </AccordionTrigger>
                        <AccordionContent>
                          <CardContent>
                            <div className="space-y-4">
                              {analysisResult.factChecks?.map((check, index) => (
                                <div key={index} className="p-4 border rounded-lg">
                                  <div className="flex items-start justify-between mb-2">
                                    <h4 className="font-medium text-card-foreground">"{check.claim}"</h4>
                                    <div className={`px-3 py-1 rounded-full text-sm font-medium ${
                                      check.status === 'True' ? 'bg-green-500/10 text-green-600' :
                                      check.status === 'Partially True' ? 'bg-amber-500/10 text-amber-600' :
                                      'bg-red-500/10 text-red-600'
                                    }`}>
                                      {check.status}
                                    </div>
                                  </div>
                                  <p className="text-sm text-muted-foreground">{check.details}</p>
                                </div>
                              ))}
                            </div>
                          </CardContent>
                        </AccordionContent>
                      </Card>
                    </AccordionItem>
                  )}

                  {/* Recommendations */}
                  {visibleSections.includes('recommendations') && (
                    <AccordionItem value="recommendations" className="border rounded-lg">
                      <Card>
                        <AccordionTrigger className="px-6 py-4 hover:no-underline">
                          <CardTitle className="flex items-center gap-3">
                            <CheckCircle className="w-5 h-5 text-green-600" />
                            Expert Recommendations
                          </CardTitle>
                        </AccordionTrigger>
                        <AccordionContent>
                          <CardContent>
                            <div className="space-y-3">
                              {analysisResult.recommendations.map((recommendation, index) => (
                                <div key={index} className="flex items-start gap-3 p-3 bg-green-50 border border-green-200 rounded-lg">
                                  <div className="w-6 h-6 bg-green-600 text-white rounded-full flex items-center justify-center text-sm font-bold mt-0.5 flex-shrink-0">
                                    {index + 1}
                                  </div>
                                  <p className="text-green-800">{recommendation}</p>
                                </div>
                              ))}
                            </div>
                          </CardContent>
                        </AccordionContent>
                      </Card>
                    </AccordionItem>
                  )}

                  {/* Historical Context */}
                  {visibleSections.includes('context') && (
                    <AccordionItem value="context" className="border rounded-lg">
                      <Card>
                        <AccordionTrigger className="px-6 py-4 hover:no-underline">
                          <CardTitle className="flex items-center gap-3">
                            <Clock className="w-5 h-5 text-indigo-600" />
                            Historical Context
                          </CardTitle>
                        </AccordionTrigger>
                        <AccordionContent>
                          <CardContent>
                            <div className="grid md:grid-cols-3 gap-4">
                              <div className="text-center p-4 bg-indigo-50 rounded-lg">
                                <div className="text-2xl font-bold text-indigo-600">{analysisResult.historicalContext?.similarCases}</div>
                                <div className="text-sm text-indigo-700">Similar Cases Found</div>
                              </div>
                              <div className="text-center p-4 bg-indigo-50 rounded-lg">
                                <div className="text-lg font-bold text-indigo-600">{analysisResult.historicalContext?.lastSimilar}</div>
                                <div className="text-sm text-indigo-700">Last Similar Case</div>
                              </div>
                              <div className="col-span-full md:col-span-1 p-4 bg-indigo-50 rounded-lg">
                                <div className="text-sm text-indigo-700 font-medium">Pattern Analysis</div>
                                <div className="text-indigo-800 mt-1">{analysisResult.historicalContext?.pattern}</div>
                              </div>
                            </div>
                          </CardContent>
                        </AccordionContent>
                      </Card>
                    </AccordionItem>
                  )}

                  {/* Future Placeholder Cards */}
                  <AccordionItem value="placeholder1" className="border rounded-lg opacity-50">
                    <Card>
                      <AccordionTrigger className="px-6 py-4 hover:no-underline">
                        <CardTitle className="flex items-center gap-3 text-muted-foreground">
                          <div className="w-5 h-5 bg-gray-300 rounded" />
                          Image Forensics Analysis
                          <span className="text-xs bg-gray-100 px-2 py-1 rounded">Coming Soon</span>
                        </CardTitle>
                      </AccordionTrigger>
                    </Card>
                  </AccordionItem>

                  <AccordionItem value="placeholder2" className="border rounded-lg opacity-50">
                    <Card>
                      <AccordionTrigger className="px-6 py-4 hover:no-underline">
                        <CardTitle className="flex items-center gap-3 text-muted-foreground">
                          <div className="w-5 h-5 bg-gray-300 rounded" />
                          AI Narrative Detection
                          <span className="text-xs bg-gray-100 px-2 py-1 rounded">Coming Soon</span>
                        </CardTitle>
                      </AccordionTrigger>
                    </Card>
                  </AccordionItem>

                </Accordion>
              </div>
            )}

            {/* Action Buttons */}
            <Card>
              <CardContent className="pt-6">
                <div className="flex flex-col space-y-4">
                  <h3 className="text-lg font-semibold text-card-foreground text-center">Take Action</h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    <Button size="lg" onClick={() => navigate("/")} className="flex items-center gap-2">
                      <FileText className="w-4 h-4" />
                      Analyze Another
                    </Button>
                    <Button size="lg" variant="outline" className="flex items-center gap-2">
                      <Flag className="w-4 h-4" />
                      Flag for Authority
                    </Button>
                    <Button size="lg" variant="outline" className="flex items-center gap-2">
                      <Download className="w-4 h-4" />
                      Download Report
                    </Button>
                    <Button size="lg" variant="outline" className="flex items-center gap-2">
                      <Share2 className="w-4 h-4" />
                      Share Results
                    </Button>
                  </div>
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