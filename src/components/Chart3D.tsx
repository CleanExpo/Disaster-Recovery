'use client';

import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

interface Chart3DProps {
  type: 'bar' | 'pie' | 'line' | 'growth';
  data: any;
  title?: string;
  colors?: string[];
}

export default function Chart3D({ type, data, title, colors = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6'] }: Chart3DProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    canvas.width = canvas.offsetWidth * 2;
    canvas.height = canvas.offsetHeight * 2;
    ctx.scale(2, 2);

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw based on type
    if (type === 'bar') {
      drawBarChart(ctx, data, colors);
    } else if (type === 'pie') {
      drawPieChart(ctx, data, colors);
    } else if (type === 'line') {
      drawLineChart(ctx, data, colors);
    } else if (type === 'growth') {
      drawGrowthChart(ctx, data, colors);
    }
  }, [type, data, colors]);

  const drawBarChart = (ctx: CanvasRenderingContext2D, data: any, colors: string[]) => {
    const padding = 40;
    const width = ctx.canvas.width / 2 - padding * 2;
    const height = ctx.canvas.height / 2 - padding * 2;
    const barWidth = width / Object.keys(data).length;
    const maxValue = Math.max(...Object.values(data).map(v => Number(v)));

    // Draw grid
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
    ctx.lineWidth = 1;
    for (let i = 0; i <= 5; i++) {
      const y = padding + (height / 5) * i;
      ctx.beginPath();
      ctx.moveTo(padding, y);
      ctx.lineTo(padding + width, y);
      ctx.stroke();
    }

    // Draw bars with 3D effect
    Object.entries(data).forEach(([key, value]: [string, any], index) => {
      const barHeight = (value / maxValue) * height;
      const x = padding + index * barWidth + barWidth * 0.1;
      const y = padding + height - barHeight;
      const barActualWidth = barWidth * 0.8;

      // 3D shadow
      const gradient = ctx.createLinearGradient(x, y, x + barActualWidth, y + barHeight);
      gradient.addColorStop(0, colors[index % colors.length]);
      gradient.addColorStop(1, adjustColor(colors[index % colors.length], -30));
      
      // Draw bar
      ctx.fillStyle = gradient;
      ctx.fillRect(x, y, barActualWidth, barHeight);
      
      // Draw 3D top
      ctx.fillStyle = adjustColor(colors[index % colors.length], 20);
      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.lineTo(x + 10, y - 10);
      ctx.lineTo(x + barActualWidth + 10, y - 10);
      ctx.lineTo(x + barActualWidth, y);
      ctx.closePath();
      ctx.fill();
      
      // Draw 3D side
      ctx.fillStyle = adjustColor(colors[index % colors.length], -10);
      ctx.beginPath();
      ctx.moveTo(x + barActualWidth, y);
      ctx.lineTo(x + barActualWidth + 10, y - 10);
      ctx.lineTo(x + barActualWidth + 10, y + barHeight - 10);
      ctx.lineTo(x + barActualWidth, y + barHeight);
      ctx.closePath();
      ctx.fill();

      // Draw label
      ctx.fillStyle = 'white';
      ctx.font = '12px Inter';
      ctx.textAlign = 'center';
      ctx.fillText(key, x + barActualWidth / 2, padding + height + 20);
      
      // Draw value
      ctx.fillText(value.toString(), x + barActualWidth / 2, y - 5);
    });
  };

  const drawPieChart = (ctx: CanvasRenderingContext2D, data: any, colors: string[]) => {
    const centerX = ctx.canvas.width / 4;
    const centerY = ctx.canvas.height / 4;
    const radius = Math.min(centerX, centerY) - 40;
    const total = Object.values(data).reduce((sum: number, val: any) => sum + val, 0);
    let currentAngle = -Math.PI / 2;

    // Draw 3D effect layers
    for (let layer = 20; layer >= 0; layer--) {
      const layerOffset = layer * 0.5;
      
      Object.entries(data).forEach(([key, value]: [string, any], index) => {
        const sliceAngle = (value / total) * 2 * Math.PI;
        
        // Draw slice
        ctx.beginPath();
        ctx.moveTo(centerX, centerY + layerOffset);
        ctx.arc(centerX, centerY + layerOffset, radius, currentAngle, currentAngle + sliceAngle);
        ctx.closePath();
        
        const color = colors[index % colors.length];
        ctx.fillStyle = layer === 0 ? color : adjustColor(color, -layer * 2);
        ctx.fill();
        
        if (layer === 0) {
          // Draw label
          const labelAngle = currentAngle + sliceAngle / 2;
          const labelX = centerX + Math.cos(labelAngle) * (radius + 30);
          const labelY = centerY + Math.sin(labelAngle) * (radius + 30);
          
          ctx.fillStyle = 'white';
          ctx.font = '12px Inter';
          ctx.textAlign = 'center';
          ctx.fillText(key, labelX, labelY);
          ctx.fillText(`${((value / total) * 100).toFixed(1)}%`, labelX, labelY + 15);
        }
        
        currentAngle += sliceAngle;
      });
      
      currentAngle = -Math.PI / 2;
    }
  };

  const drawLineChart = (ctx: CanvasRenderingContext2D, data: any, colors: string[]) => {
    const padding = 40;
    const width = ctx.canvas.width / 2 - padding * 2;
    const height = ctx.canvas.height / 2 - padding * 2;
    const points = Object.entries(data);
    const maxValue = Math.max(...Object.values(data).map(v => Number(v)));
    const stepX = width / (points.length - 1);

    // Draw grid
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
    ctx.lineWidth = 1;
    for (let i = 0; i <= 5; i++) {
      const y = padding + (height / 5) * i;
      ctx.beginPath();
      ctx.moveTo(padding, y);
      ctx.lineTo(padding + width, y);
      ctx.stroke();
    }

    // Draw line with gradient fill
    ctx.beginPath();
    points.forEach(([key, value]: [string, any], index) => {
      const x = padding + index * stepX;
      const y = padding + height - (value / maxValue) * height;
      
      if (index === 0) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }
    });

    // Create gradient fill
    const gradient = ctx.createLinearGradient(0, padding, 0, padding + height);
    gradient.addColorStop(0, colors[0] + '80');
    gradient.addColorStop(1, colors[0] + '00');
    
    // Fill area under line
    ctx.lineTo(padding + width, padding + height);
    ctx.lineTo(padding, padding + height);
    ctx.closePath();
    ctx.fillStyle = gradient;
    ctx.fill();

    // Draw line
    ctx.beginPath();
    points.forEach(([key, value]: [string, any], index) => {
      const x = padding + index * stepX;
      const y = padding + height - (value / maxValue) * height;
      
      if (index === 0) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }
    });
    ctx.strokeStyle = colors[0];
    ctx.lineWidth = 3;
    ctx.stroke();

    // Draw points and labels
    points.forEach(([key, value]: [string, any], index) => {
      const x = padding + index * stepX;
      const y = padding + height - (value / maxValue) * height;
      
      // Draw point with glow
      ctx.beginPath();
      ctx.arc(x, y, 6, 0, Math.PI * 2);
      ctx.fillStyle = colors[0];
      ctx.fill();
      ctx.strokeStyle = 'white';
      ctx.lineWidth = 2;
      ctx.stroke();
      
      // Draw label
      ctx.fillStyle = 'white';
      ctx.font = '11px Inter';
      ctx.textAlign = 'center';
      ctx.fillText(key, x, padding + height + 20);
      ctx.fillText(value.toString(), x, y - 10);
    });
  };

  const drawGrowthChart = (ctx: CanvasRenderingContext2D, data: any, colors: string[]) => {
    // Similar to line chart but with exponential curve
    drawLineChart(ctx, data, colors);
    
    // Add growth indicators
    const padding = 40;
    const width = ctx.canvas.width / 2 - padding * 2;
    const height = ctx.canvas.height / 2 - padding * 2;
    
    // Draw growth arrow
    ctx.strokeStyle = '#10B981';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(padding + width - 50, padding + 50);
    ctx.lineTo(padding + width - 20, padding + 20);
    ctx.stroke();
    
    // Arrow head
    ctx.beginPath();
    ctx.moveTo(padding + width - 20, padding + 20);
    ctx.lineTo(padding + width - 30, padding + 25);
    ctx.lineTo(padding + width - 25, padding + 30);
    ctx.closePath();
    ctx.fillStyle = '#10B981';
    ctx.fill();
  };

  const adjustColor = (color: string, amount: number): string => {
    const num = parseInt(color.replace('#', ''), 16);
    const r = Math.max(0, Math.min(255, (num >> 16) + amount));
    const g = Math.max(0, Math.min(255, ((num >> 8) & 0x00FF) + amount));
    const b = Math.max(0, Math.min(255, (num & 0x0000FF) + amount));
    return `#${((r << 16) | (g << 8) | b).toString(16).padStart(6, '0')}`;
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="relative w-full h-96 bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10"
    >
      {title && (
        <h3 className="text-xl font-bold text-white mb-4">{title}</h3>
      )}
      <canvas
        ref={canvasRef}
        className="w-full h-full"
        style={{ imageRendering: 'crisp-edges' }}
      />
    </motion.div>
  );
}