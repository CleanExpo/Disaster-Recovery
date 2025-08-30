'use client';

import React, { useEffect, useRef } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';
import { Line, Bar, Pie, Doughnut } from 'react-chartjs-2';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

interface ChartSlideProps {
  data: any;
}

export default function ChartSlide({ data }: ChartSlideProps) {
  const chartRef = useRef<any>(null);

  // Chart configuration
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom' as const,
        labels: {
          color: '#ffffff',
          font: {
            size: 14
          }
        }
      },
      title: {
        display: false
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        titleColor: '#ffffff',
        bodyColor: '#ffffff',
        borderColor: '#3b82f6',
        borderWidth: 1,
        padding: 12,
        displayColors: true,
        callbacks: {
          label: function(context: any) {
            let label = context.dataset.label || '';
            if (label) {
              label += ': ';
            }
            if (context.parsed.y !== null) {
              label += new Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: 'AUD',
                minimumFractionDigits: 0,
                maximumFractionDigits: 0
              }).format(context.parsed.y * 1000000);
            }
            return label;
          }
        }
      }
    },
    scales: data.chart?.type !== 'pie' && data.chart?.type !== 'doughnut' ? {
      x: {
        ticks: {
          color: '#ffffff',
          font: {
            size: 12
          }
        },
        grid: {
          color: 'rgba(255, 255, 255, 0.1)',
          borderColor: 'rgba(255, 255, 255, 0.2)'
        }
      },
      y: {
        ticks: {
          color: '#ffffff',
          font: {
            size: 12
          },
          callback: function(value: any) {
            return '$' + value + 'M';
          }
        },
        grid: {
          color: 'rgba(255, 255, 255, 0.1)',
          borderColor: 'rgba(255, 255, 255, 0.2)'
        }
      }
    } : {},
    animation: {
      duration: 2000,
      easing: 'easeInOutQuart' as const
    }
  };

  // Enhanced chart data with gradients
  const getEnhancedChartData = () => {
    if (!data.chart) return null;
    
    const chartData = { ...data.chart.data };
    
    // Add gradients to datasets
    if (chartRef.current && data.chart.type === 'line') {
      const ctx = chartRef.current.ctx;
      const gradient = ctx.createLinearGradient(0, 0, 0, 400);
      gradient.addColorStop(0, 'rgba(16, 185, 129, 0.5)');
      gradient.addColorStop(1, 'rgba(16, 185, 129, 0)');
      
      chartData.datasets = chartData.datasets.map((dataset: any) => ({
        ...dataset,
        backgroundColor: gradient,
        borderWidth: 3,
        pointRadius: 6,
        pointHoverRadius: 8,
        pointBackgroundColor: '#ffffff',
        pointBorderColor: dataset.borderColor,
        pointBorderWidth: 2
      }));
    }
    
    if (data.chart.type === 'bar') {
      chartData.datasets = chartData.datasets.map((dataset: any, index: number) => ({
        ...dataset,
        borderRadius: 8,
        borderWidth: 0,
        barThickness: 40,
        backgroundColor: index === 0 
          ? 'rgba(59, 130, 246, 0.8)'
          : 'rgba(16, 185, 129, 0.8)'
      }));
    }
    
    return chartData;
  };

  const renderChart = () => {
    const chartData = getEnhancedChartData();
    if (!chartData) return null;
    
    switch (data.chart.type) {
      case 'line':
        return <Line ref={chartRef} data={chartData} options={chartOptions} />;
      case 'bar':
        return <Bar ref={chartRef} data={chartData} options={chartOptions} />;
      case 'pie':
        return <Pie ref={chartRef} data={chartData} options={chartOptions} />;
      case 'doughnut':
        return <Doughnut ref={chartRef} data={chartData} options={chartOptions} />;
      default:
        return null;
    }
  };

  return (
    <div className="max-w-7xl mx-auto w-full">
      <h2 className="text-5xl md:text-6xl font-bold text-white mb-4 text-center animate-fadeIn">
        {data.title}
      </h2>
      {data.subtitle && (
        <p className="text-2xl text-blue-300 mb-12 text-center animate-fadeIn animation-delay-200">
          {data.subtitle}
        </p>
      )}
      
      <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 animate-scaleIn animation-delay-400">
        <div className="h-[500px]">
          {renderChart()}
        </div>
        
        {/* Additional metrics or insights */}
        {data.insights && (
          <div className="mt-8 grid grid-cols-3 gap-6">
            {data.insights.map((insight: any, index: number) => (
              <div 
                key={index}
                className="text-center animate-fadeIn"
                style={{ animationDelay: `${800 + index * 200}ms` }}
              >
                <p className="text-3xl font-bold text-white mb-2">{insight.value}</p>
                <p className="text-gray-300">{insight.label}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}