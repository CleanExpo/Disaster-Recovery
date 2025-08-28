'use client';

import React, { useState, useRef } from 'react';

interface DamageAnalysis {
  severity: 'minor' | 'moderate' | 'severe' | 'critical';
  type: string[];
  estimatedCost: { min: number; max: number };
  urgency: 'low' | 'medium' | 'high' | 'immediate';
  recommendations: string[];
  confidence: number;
}

export default function AIDamageAssessment() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string>('');
  const [isAnalysing, setIsAnalysing] = useState(false);
  const [analysis, setAnalysis] = useState<DamageAnalysis | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type.startsWith('image/')) {
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
      setAnalysis(null);
    }
  };

  const analyseImage = async () => {
    if (!selectedFile) return;

    setIsAnalysing(true);
    
    // Simulate AI analysis (in production, call actual AI API)
    await new Promise(resolve => setTimeout(resolve, 3000));

    const mockAnalysis: DamageAnalysis = {
      severity: 'severe',
      type: ['Water Damage', 'Structural', 'Mold Risk'],
      estimatedCost: { min: 15000, max: 25000 },
      urgency: 'high',
      recommendations: [
        'Immediate water extraction required',
        'Structural assessment needed',
        'Deploy industrial dehumidifiers',
        'Monitor for mold growth over 48 hours',
        'Document for insurance claim'
      ],
      confidence: 94
    };

    setAnalysis(mockAnalysis);
    setIsAnalysing(false);
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'minor': return 'text-green-400 bg-green-400/10 border-green-400/30';
      case 'moderate': return 'text-yellow-400 bg-yellow-400/10 border-yellow-400/30';
      case 'severe': return 'text-orange-400 bg-orange-400/10 border-orange-400/30';
      case 'critical': return 'text-red-400 bg-red-400/10 border-red-400/30';
      default: return 'text-gray-400 bg-gray-400/10 border-gray-400/30';
    }
  };

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case 'low': return 'bg-green-500';
      case 'medium': return 'bg-yellow-500';
      case 'high': return 'bg-orange-500';
      case 'immediate': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <section className="py-20 relative overflow-hidden bg-gradient-to-b from-black via-gray-900 to-black">
      {/* Background effects */}
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 mb-4 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/30">
            <span className="text-2xl">🤖</span>
            <span className="text-sm font-medium text-blue-400">AI-Powered Analysis</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Instant Damage Assessment
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Upload a photo and our AI will instantly analyse damage severity, estimate costs, and provide actionable recommendations
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Upload Section */}
          <div className="bg-gray-900/50 backdrop-blur-lg border border-gray-800 rounded-2xl p-8">
            <h3 className="text-xl font-bold text-white mb-6">Upload Damage Photo</h3>
            
            <div className="space-y-4">
              <div
                onClick={() => fileInputRef.current?.click()}
                className="relative border-2 border-dashed border-gray-700 rounded-xl p-8 hover:border-blue-500/50 transition-colors cursor-pointer group"
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleFileSelect}
                  className="hidden"
                />
                
                {preview ? (
                  <div className="relative">
                    <img
                      src={preview}
                      alt="Damage preview"
                      className="w-full h-64 object-cover rounded-lg"
                    />
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center">
                      <p className="text-white font-medium">Click to change image</p>
                    </div>
                  </div>
                ) : (
                  <div className="text-center">
                    <div className="text-4xl mb-3">📸</div>
                    <p className="text-white font-medium mb-1">Click to upload image</p>
                    <p className="text-gray-500 text-sm">or drag and drop</p>
                    <p className="text-gray-600 text-xs mt-2">PNG, JPG up to 10MB</p>
                  </div>
                )}
              </div>

              {selectedFile && (
                <button
                  onClick={analyseImage}
                  disabled={isAnalysing}
                  className="w-full py-3 px-6 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 rounded-lg font-medium text-white transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isAnalysing ? (
                    <span className="flex items-center justify-center gap-2">
                      <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      Analysing...
                    </span>
                  ) : (
                    'Analyse Damage'
                  )}
                </button>
              )}
            </div>

            {/* Features */}
            <div className="mt-8 space-y-3">
              {[
                '95% accuracy rate',
                'Instant cost estimation',
                'Insurance-ready reports',
                'Multiple damage type detection'
              ].map((feature, index) => (
                <div key={index} className="flex items-center gap-2 text-sm text-gray-400">
                  <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  {feature}
                </div>
              ))}
            </div>
          </div>

          {/* Analysis Results */}
          <div className="bg-gray-900/50 backdrop-blur-lg border border-gray-800 rounded-2xl p-8">
            <h3 className="text-xl font-bold text-white mb-6">Analysis Results</h3>
            
            {analysis ? (
              <div className="space-y-6">
                {/* Severity Badge */}
                <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full border ${getSeverityColor(analysis.severity)}`}>
                  <span className="font-bold uppercase">{analysis.severity}</span>
                  <span className="text-sm opacity-75">DAMAGE</span>
                </div>

                {/* Confidence Score */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-gray-400 text-sm">AI Confidence</span>
                    <span className="text-white font-medium">{analysis.confidence}%</span>
                  </div>
                  <div className="w-full bg-gray-800 rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full"
                      style={{ width: `${analysis.confidence}%` }}
                    />
                  </div>
                </div>

                {/* Damage Types */}
                <div>
                  <p className="text-gray-400 text-sm mb-2">Detected Issues</p>
                  <div className="flex flex-wrap gap-2">
                    {analysis.type.map((type, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-gray-800 text-white rounded-lg text-sm"
                      >
                        {type}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Cost Estimation */}
                <div className="bg-black/30 rounded-lg p-4">
                  <p className="text-gray-400 text-sm mb-1">Estimated Cost Range</p>
                  <p className="text-2xl font-bold text-white">
                    ${analysis.estimatedCost.min.toLocaleString()} - ${analysis.estimatedCost.max.toLocaleString()}
                  </p>
                </div>

                {/* Urgency Level */}
                <div className="flex items-center gap-2">
                  <span className="text-gray-400 text-sm">Urgency:</span>
                  <div className="flex items-center gap-1">
                    {['immediate', 'high', 'medium'].includes(analysis.urgency) && (
                      <div className={`w-2 h-6 rounded-sm ${getUrgencyColor(analysis.urgency)}`} />
                    )}
                    {['immediate', 'high'].includes(analysis.urgency) && (
                      <div className={`w-2 h-6 rounded-sm ${getUrgencyColor(analysis.urgency)}`} />
                    )}
                    {analysis.urgency === 'immediate' && (
                      <div className={`w-2 h-6 rounded-sm ${getUrgencyColor(analysis.urgency)}`} />
                    )}
                    <div className={`w-2 h-6 rounded-sm ${analysis.urgency === 'low' ? 'bg-gray-600' : 'bg-gray-700'}`} />
                  </div>
                  <span className="text-white font-medium capitalize">{analysis.urgency}</span>
                </div>

                {/* Recommendations */}
                <div>
                  <p className="text-gray-400 text-sm mb-3">AI Recommendations</p>
                  <div className="space-y-2">
                    {analysis.recommendations.map((rec, index) => (
                      <div key={index} className="flex items-start gap-2">
                        <span className="text-blue-400 mt-0.5">•</span>
                        <span className="text-gray-300 text-sm">{rec}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3">
                  <button className="flex-1 py-2 px-4 bg-orange-600 hover:bg-orange-700 rounded-lg font-medium text-white transition-colors">
                    Request Service
                  </button>
                  <button className="flex-1 py-2 px-4 bg-gray-800 hover:bg-gray-700 rounded-lg font-medium text-white transition-colors">
                    Download Report
                  </button>
                </div>
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="text-6xl mb-4 opacity-20">🔍</div>
                <p className="text-gray-500">Upload an image to see AI analysis</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}