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
  ChevronDown,
  ChevronUp
} from "lucide-react";
import TruthLensHeader from "@/components/TruthLensHeader";
import TruthLensFooter from "@/components/TruthLensFooter";

interface AnalysisData {
  content?: string;
  risk?: {
    level: string;
    score: number;
    confidence: number;
    verdict: string;
  };
  sources?: Array<{
    name: string;
    credibility: string;
    verified: boolean;
    status: string;
    url?: string;
  }>;
  languageIssues?: Array<{
    type: string;
    severity: string;
    description: string;
    examples?: string[];
  }>;
  factChecks?: Array<{
    claim: string;
    status: string;
    details: string;
  }>;
  recommendations?: string[];
  historicalContext?: string;
  imageForensics?: string;
  aiNarrative?: string;
}

const Results = () => {
  const navigate = useNavigate();
  const [viewMode, setViewMode] = useState<'summary' | 'full'>('full');
  const [isStreaming, setIsStreaming] = useState(false);
  const [streamingStep, setStreamingStep] = useState(0);
  const [expandedCards, setExpandedCards] = useState<string[]>([]);
  const [analysisData, setAnalysisData] = useState<AnalysisData>({});
  const [isLoading, setIsLoading] = useState(false);

  const cardConfigs = [
    { id: 'risk', title: 'Risk Assessment', icon: AlertTriangle, color: 'text-amber-600', hasData: !!analysisData.risk },
    { id: 'sources', title: 'Source Verification', icon: Shield, color: 'text-blue-600', hasData: !!analysisData.sources?.length },
    { id: 'language', title: 'Language Analysis', icon: Search, color: 'text-purple-600', hasData: !!analysisData.languageIssues?.length },
    { id: 'facts', title: 'Fact Verification', icon: CheckCircle, color: 'text-green-600', hasData: !!analysisData.factChecks?.length },
    { id: 'recommendations', title: 'Recommendations', icon: Brain, color: 'text-indigo-600', hasData: !!analysisData.recommendations?.length },
    { id: 'context', title: 'Historical Context', icon: History, color: 'text-gray-600', hasData: !!analysisData.historicalContext },
    { id: 'forensics', title: 'Image Forensics', icon: Image, color: 'text-pink-600', hasData: !!analysisData.imageForensics },
    { id: 'narrative', title: 'AI Narrative Analysis', icon: Zap, color: 'text-orange-600', hasData: !!analysisData.aiNarrative }
  ];

  const availableCards = cardConfigs.filter(card => card.hasData || ['risk', 'sources', 'language', 'facts', 'recommendations'].includes(card.id));

  // Streaming simulation when data is received
  useEffect(() => {
    if (isStreaming && analysisData && Object.keys(analysisData).length > 0) {
      const timer = setInterval(() => {
        setStreamingStep(prev => {
          if (prev < availableCards.length) {
            return prev + 1;
          } else {
            setIsStreaming(false);
            setExpandedCards(availableCards.slice(0, 3).map(c => c.id)); // Auto-expand first 3 cards
            clearInterval(timer);
            return prev;
          }
        });
      }, 800);
      return () => clearInterval(timer);
    }
  }, [isStreaming, analysisData, availableCards.length]);

  const toggleCard = (cardId: string) => {
    setExpandedCards(prev => 
      prev.includes(cardId) 
        ? prev.filter(id => id !== cardId)
        : [...prev, cardId]
    );
  };

  const getRiskColor = (level?: string) => {
    switch (level?.toLowerCase()) {
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

  const renderEmptyState = () => (
    <div className="text-center py-12">
      <div className="flex justify-center mb-4">
        <div className="flex space-x-1">
          <div className="w-3 h-3 bg-primary/60 rounded-full animate-bounce"></div>
          <div className="w-3 h-3 bg-primary/60 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
          <div className="w-3 h-3 bg-primary/60 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
        </div>
      </div>
      <h3 className="text-lg font-semibold text-muted-foreground mb-2">Awaiting Analysis...</h3>
      <p className="text-sm text-muted-foreground">
        Connect to backend to see analysis results here
      </p>
    </div>
  );

  const renderCardContent = (cardId: string) => {
    switch (cardId) {
      case 'risk':
        if (!analysisData.risk) return renderEmptyState();
        return (
          <div className="pt-4 space-y-4">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold mb-3">Credibility Score</h4>
                <Progress value={analysisData.risk.score} className="h-4 mb-2" />
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Low</span>
                  <span className="font-bold text-lg">{analysisData.risk.score}%</span>
                  <span className="text-muted-foreground">High</span>
                </div>
              </div>
              <div>
                <h4 className="font-semibold mb-3">Analysis Confidence</h4>
                <Progress value={analysisData.risk.confidence} className="h-4 mb-2" />
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Low</span>
                  <span className="font-bold text-lg">{analysisData.risk.confidence}%</span>
                  <span className="text-muted-foreground">High</span>
                </div>
              </div>
            </div>
          </div>
        );

      case 'sources':
        if (!analysisData.sources?.length) return renderEmptyState();
        return (
          <div className="pt-4 space-y-3">
            {analysisData.sources.map((source, idx) => (
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
        );

      case 'language':
        if (!analysisData.languageIssues?.length) return renderEmptyState();
        return (
          <div className="pt-4 space-y-4">
            {analysisData.languageIssues.map((issue, idx) => (
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
                {issue.examples && issue.examples.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {issue.examples.map((example, i) => (
                      <span key={i} className="px-2 py-1 bg-secondary/50 rounded text-xs">
                        "{example}"
                      </span>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        );

      case 'facts':
        if (!analysisData.factChecks?.length) return renderEmptyState();
        return (
          <div className="pt-4 space-y-4">
            {analysisData.factChecks.map((fact, idx) => (
              <div key={idx} className="p-4 border rounded-lg">
                <div className="flex items-start gap-3 mb-3">
                  {fact.status === 'True' && <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />}
                  {fact.status === 'False' && <XCircle className="w-5 h-5 text-red-600 mt-0.5" />}
                  {fact.status === 'Partially True' && <AlertTriangle className="w-5 h-5 text-amber-600 mt-0.5" />}
                  <div className="flex-1">
                    <h4 className="font-medium mb-1">"{fact.claim}"</h4>
                    <Badge variant="outline" className={
                      fact.status === 'True' ? 'bg-green-50 text-green-700 border-green-200' :
                      fact.status === 'False' ? 'bg-red-50 text-red-700 border-red-200' :
                      'bg-amber-50 text-amber-700 border-amber-200'
                    }>
                      {fact.status}
                    </Badge>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground pl-8">{fact.details}</p>
              </div>
            ))}
          </div>
        );

      case 'recommendations':
        if (!analysisData.recommendations?.length) return renderEmptyState();
        return (
          <div className="pt-4 space-y-3">
            {analysisData.recommendations.map((rec, idx) => (
              <div key={idx} className="flex gap-3 p-3 bg-blue-50/50 rounded-lg border border-blue-100">
                <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">
                  {idx + 1}
                </div>
                <p className="text-sm leading-relaxed">{rec}</p>
              </div>
            ))}
          </div>
        );

      case 'context':
      case 'forensics':
      case 'narrative':
        return (
          <div className="pt-4 text-center py-8">
            <div className="text-muted-foreground">
              <Clock className="w-8 h-8 mx-auto mb-2" />
              <p className="text-sm">Coming Soon</p>
              <p className="text-xs mt-1">This analysis module will be available in future updates</p>
            </div>
          </div>
        );

      default:
        return renderEmptyState();
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
                  className="text-white/90 hover:text-white hover:bg-white/10"
                >
                  <ArrowLeft className="w-4 h-4 mr-1" />
                  Back
                </Button>
                <div>
                  <h1 className="text-2xl font-bold text-white">Analysis Results</h1>
                  <p className="text-white/80 text-sm">AI-powered misinformation detection</p>
                </div>
              </div>
              
              {/* View Toggle */}
              <div className="flex gap-2 bg-white/10 rounded-lg p-1">
                <Button
                  size="sm"
                  variant={viewMode === 'summary' ? 'default' : 'ghost'}
                  onClick={() => setViewMode('summary')}
                  className={viewMode === 'summary' ? 'bg-white text-primary hover:bg-white/90' : 'text-white/90 hover:bg-white/10'}
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
                      setStreamingStep(0);
                    }
                  }}
                  className={viewMode === 'full' ? 'bg-white text-primary hover:bg-white/90' : 'text-white/90 hover:bg-white/10'}
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
                {analysisData.risk ? (
                  <Card className={`border-l-4 ${getRiskColor(analysisData.risk.level).border.replace('border-', 'border-l-')}`}>
                    <CardContent className="pt-6">
                      <div className="flex items-center justify-between mb-6">
                        <div>
                          <h3 className="text-lg font-semibold mb-2">Final Verdict</h3>
                          <p className="text-2xl font-bold text-amber-600">{analysisData.risk.verdict}</p>
                        </div>
                        <Badge variant="outline" className={`${getRiskColor(analysisData.risk.level).bg} ${getRiskColor(analysisData.risk.level).border} ${getRiskColor(analysisData.risk.level).text} px-4 py-2 text-sm font-semibold`}>
                          {analysisData.risk.level} Risk
                        </Badge>
                      </div>
                      
                      <div className="grid md:grid-cols-2 gap-6 mb-6">
                        <div>
                          <h4 className="font-semibold mb-2">Credibility Score</h4>
                          <Progress value={analysisData.risk.score} className="h-3 mb-2" />
                          <span className="font-bold text-lg">{analysisData.risk.score}%</span>
                        </div>
                        <div>
                          <h4 className="font-semibold mb-2">Analysis Confidence</h4>
                          <Progress value={analysisData.risk.confidence} className="h-3 mb-2" />
                          <span className="font-bold text-lg">{analysisData.risk.confidence}%</span>
                        </div>
                      </div>

                      {analysisData.recommendations?.[0] && (
                        <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                          <h4 className="font-semibold text-amber-800 mb-2">Key Recommendation</h4>
                          <p className="text-amber-700">{analysisData.recommendations[0]}</p>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ) : (
                  <Card>
                    <CardContent className="pt-6">
                      {renderEmptyState()}
                    </CardContent>
                  </Card>
                )}

                {/* Quick Stats */}
                <div className="grid md:grid-cols-3 gap-4">
                  <Card>
                    <CardContent className="pt-6 text-center">
                      <div className="text-2xl font-bold text-green-600">
                        {analysisData.sources?.filter(s => s.credibility === 'High').length || 0}
                      </div>
                      <div className="text-sm text-muted-foreground">High Credibility Sources</div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="pt-6 text-center">
                      <div className="text-2xl font-bold text-red-600">
                        {analysisData.languageIssues?.filter(p => p.severity === 'High').length || 0}
                      </div>
                      <div className="text-sm text-muted-foreground">Critical Issues Found</div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="pt-6 text-center">
                      <div className="text-2xl font-bold text-blue-600">
                        {analysisData.factChecks?.length || 0}
                      </div>
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
                {analysisData.content ? (
                  <Card>
                    <CardHeader>
                      <CardTitle>Analyzed Content</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="bg-secondary/10 rounded-lg p-4 border-l-4 border-l-blue-500">
                        <p className="text-muted-foreground italic leading-relaxed">
                          "{analysisData.content}"
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                ) : (
                  <Card>
                    <CardHeader>
                      <CardTitle>Analyzed Content</CardTitle>
                    </CardHeader>
                    <CardContent>
                      {renderEmptyState()}
                    </CardContent>
                  </Card>
                )}

                {/* Modular Analysis Cards */}
                <div className="space-y-4">
                  {availableCards.map((config, index) => {
                    const isVisible = !isStreaming || streamingStep > index;
                    const isExpanded = expandedCards.includes(config.id);
                    
                    if (!isVisible) return null;

                    return (
                      <Card key={config.id} className="border rounded-lg overflow-hidden">
                        <div 
                          className="px-6 py-4 cursor-pointer hover:bg-secondary/5 transition-colors"
                          onClick={() => toggleCard(config.id)}
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
                            <div className="flex items-center gap-2">
                              {!config.hasData && config.id !== 'context' && config.id !== 'forensics' && config.id !== 'narrative' && (
                                <Badge variant="outline" className="text-xs">No Data</Badge>
                              )}
                              {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                            </div>
                          </div>
                        </div>
                        
                        {isExpanded && (
                          <div className="px-6 pb-6 border-t bg-secondary/2">
                            {renderCardContent(config.id)}
                          </div>
                        )}
                      </Card>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Actions Section */}
            <Card className="mt-8">
              <CardContent className="pt-6">
                <h3 className="text-lg font-semibold mb-4">Actions</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <Button 
                    size="lg" 
                    onClick={() => navigate('/')}
                    className="w-full"
                  >
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Analyze Another
                  </Button>
                  <Button 
                    variant="outline" 
                    size="lg"
                    className="w-full"
                    onClick={() => {/* TODO: Implement flag for authority */}}
                  >
                    <Flag className="w-4 h-4 mr-2" />
                    Flag for Authority
                  </Button>
                  <Button 
                    variant="outline" 
                    size="lg"
                    className="w-full"
                    onClick={() => {/* TODO: Implement PDF download */}}
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Download Report (PDF)
                  </Button>
                  <Button 
                    variant="outline" 
                    size="lg"
                    className="w-full"
                    onClick={() => {/* TODO: Implement share results */}}
                  >
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