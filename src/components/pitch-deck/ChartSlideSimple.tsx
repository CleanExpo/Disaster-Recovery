'use client';

import React from 'react';

interface ChartSlideProps {
  data: any;
  type: 'line' | 'bar' | 'pie' | 'doughnut';
  title?: string;
  description?: string;
  className?: string;
}

const ChartSlideSimple: React.FC<ChartSlideProps> = ({ 
  data, 
  type, 
  title, 
  description,
  className = '' 
}) => {
  // Simple visualization without Chart.js
  const renderSimpleChart = () => {
    if (type === 'bar' && data.datasets?.[0]?.data) {
      const values = data.datasets[0].data;
      const labels = data.labels || [];
      const maxValue = Math.max(...values);
      
      return (
        <div className="space-y-4">
          {labels.map((label: string, index: number) => {
            const value = values[index];
            const percentage = (value / maxValue) * 100;
            
            return (
              <div key={index} className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-300">{label}</span>
                  <span className="text-white font-semibold">
                    ${typeof value === 'number' ? (value / 1000000).toFixed(1) : value}M
                  </span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-3">
                  <div 
                    className="bg-gradient-to-r from-blue-500 to-blue-400 h-3 rounded-full transition-all duration-1000"
                    style={{ width: `${percentage}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      );
    }
    
    if (type === 'pie' && data.datasets?.[0]?.data) {
      const values = data.datasets[0].data;
      const labels = data.labels || [];
      const total = values.reduce((a: number, b: number) => a + b, 0);
      
      return (
        <div className="grid grid-cols-2 gap-4">
          {labels.map((label: string, index: number) => {
            const value = values[index];
            const percentage = ((value / total) * 100).toFixed(1);
            
            return (
              <div key={index} className="bg-gray-800/50 p-4 rounded-lg">
                <div className="text-3xl font-bold text-white mb-1">{percentage}%</div>
                <div className="text-sm text-gray-400">{label}</div>
              </div>
            );
          })}
        </div>
      );
    }
    
    // Default fallback
    return (
      <div className="bg-gray-800/50 rounded-lg p-8 text-center">
        <div className="text-6xl mb-4">📊</div>
        <div className="text-xl text-white font-semibold">
          {title || 'Data Visualization'}
        </div>
        <div className="text-gray-400 mt-2">
          {description || 'Professional charts and analytics'}
        </div>
      </div>
    );
  };

  return (
    <div className={`w-full h-full flex flex-col justify-center ${className}`}>
      {title && (
        <h3 className="text-2xl font-bold text-white mb-6 text-center">{title}</h3>
      )}
      
      <div className="flex-1 flex items-center justify-center px-4">
        {renderSimpleChart()}
      </div>
      
      {description && (
        <p className="text-gray-400 text-center mt-6">{description}</p>
      )}
    </div>
  );
};

export default ChartSlideSimple;