#!/usr/bin/env ts-node
/**
 * Professional Color Scheme Update Script
 * 
 * Removes orange dominance and implements professional blue/gray palette
 * suitable for a $2.5B disaster recovery platform
 */

import * as fs from 'fs';
import * as path from 'path';
import { glob } from 'glob';

const COLOR_REPLACEMENTS = {
  // Replace orange/yellow with professional colors
  'yellow-400': 'blue-500',
  'yellow-500': 'blue-600', 
  'orange-400': 'blue-500',
  'orange-500': 'blue-600',
  'orange-600': 'blue-700',
  'amber-400': 'blue-500',
  'amber-500': 'blue-600',
  'amber-600': 'blue-700',
  
  // Gradient replacements
  'from-yellow-400': 'from-blue-500',
  'to-orange-500': 'to-blue-600',
  'from-orange-400': 'from-blue-500',
  'to-yellow-400': 'to-blue-500',
  'bg-gradient.*yellow.*orange': 'bg-gradient-to-r from-blue-600 to-indigo-700',
  
  // Specific orange hex codes
  '#FF6B35': '#0052CC', // Professional blue
  '#FFA500': '#3B82F6', // Blue-500
  '#FF8C00': '#2563EB', // Blue-600
  
  // Text color replacements for readability
  'text-yellow-400': 'text-blue-500',
  'text-orange-500': 'text-blue-600',
  'text-amber-600': 'text-gray-700',
  
  // Background replacements
  'bg-yellow-400/10': 'bg-blue-500/10',
  'bg-orange-400/10': 'bg-blue-500/10',
  'bg-yellow-500': 'bg-blue-600',
  'bg-orange-500': 'bg-blue-600',
  
  // Border replacements
  'border-yellow-400/30': 'border-blue-500/30',
  'border-orange-500': 'border-blue-600',
  'border-yellow-500': 'border-blue-600',
  
  // Ring replacements
  'ring-yellow-400': 'ring-blue-500',
  'ring-orange-500': 'ring-blue-600',
  
  // Specific component fixes for professional look
  'hover:bg-yellow-50': 'hover:bg-blue-50',
  'hover:bg-orange-50': 'hover:bg-blue-50',
  'focus:ring-yellow-500': 'focus:ring-blue-500',
  'focus:ring-orange-500': 'focus:ring-blue-500'
};

const PROFESSIONAL_UPDATES = {
  // Update CTA buttons to professional style
  'bg-gradient-to-r from-yellow-400 to-orange-500': 'bg-gradient-to-r from-blue-600 to-indigo-700',
  'bg-yellow-400 text-black': 'bg-blue-600 text-white',
  'bg-orange-500 text-white': 'bg-blue-600 text-white',
  
  // Update status indicators to be more subtle
  'text-yellow-400': 'text-amber-600', // Keep amber for warnings but more subtle
  'bg-yellow-400': 'bg-amber-100 text-amber-800', // Subtle warning style
  
  // Professional emergency colors
  'bg-red-900/20': 'bg-red-950/30', // Darker, more professional
  'border-red-500': 'border-red-600', // Slightly darker
  
  // Success colors remain green but more professional
  'bg-green-400': 'bg-emerald-500',
  'text-green-400': 'text-emerald-600'
};

async function updateColorScheme() {
  console.log('🎨 Starting professional color scheme update...\n');

  // Find all relevant files
  const files = await glob('src/**/*.{tsx,ts,css,scss}', {
    cwd: process.cwd(),
    ignore: ['**/node_modules/**', '**/*.test.*', '**/*.spec.*']
  });

  console.log(`Found ${files.length} files to process\n`);

  let totalReplacements = 0;
  const processedFiles: string[] = [];

  for (const file of files) {
    const filePath = path.join(process.cwd(), file);
    
    try {
      let content = await fs.promises.readFile(filePath, 'utf-8');
      let fileReplacements = 0;
      const originalContent = content;

      // Apply color replacements
      for (const [oldColor, newColor] of Object.entries(COLOR_REPLACEMENTS)) {
        const regex = new RegExp(oldColor.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g');
        const matches = content.match(regex);
        if (matches) {
          content = content.replace(regex, newColor);
          fileReplacements += matches.length;
        }
      }

      // Apply professional updates
      for (const [oldStyle, newStyle] of Object.entries(PROFESSIONAL_UPDATES)) {
        const regex = new RegExp(oldStyle.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g');
        const matches = content.match(regex);
        if (matches) {
          content = content.replace(regex, newStyle);
          fileReplacements += matches.length;
        }
      }

      // Special handling for Before/After Slider CTA button
      if (file.includes('BeforeAfterSlider')) {
        content = content.replace(
          'bg-gradient-to-r from-yellow-400 to-orange-500 text-black',
          'bg-gradient-to-r from-blue-600 to-indigo-700 text-white'
        );
        fileReplacements += 1;
      }

      // Special handling for Emergency components
      if (file.includes('emergency') || file.includes('Emergency')) {
        // Keep some yellow for urgency but make it more professional
        content = content.replace(/bg-yellow-400/g, 'bg-amber-500');
        content = content.replace(/text-yellow-400/g, 'text-amber-600');
      }

      // Save file if changes were made
      if (content !== originalContent) {
        await fs.promises.writeFile(filePath, content, 'utf-8');
        processedFiles.push(file);
        totalReplacements += fileReplacements;
        
        if (fileReplacements > 10) {
          console.log(`✅ ${file}: ${fileReplacements} replacements`);
        }
      }

    } catch (error) {
      console.error(`❌ Error processing ${file}:`, error);
    }
  }

  // Update global CSS files with professional color scheme
  await updateGlobalCSS();

  console.log(`\n🎉 Color scheme update complete!`);
  console.log(`📊 Total replacements: ${totalReplacements}`);
  console.log(`📁 Files updated: ${processedFiles.length}`);
  console.log(`\n✨ Key improvements:`);
  console.log(`   • Removed orange/yellow dominance`);
  console.log(`   • Implemented professional blue/gray palette`);
  console.log(`   • Enhanced readability and contrast`);
  console.log(`   • Maintained urgency indicators with subtle amber`);
  console.log(`   • Professional gradient buttons`);

  console.log(`\n🎯 Updated files:`);
  processedFiles.slice(0, 10).forEach(file => console.log(`   • ${file}`));
  if (processedFiles.length > 10) {
    console.log(`   • ... and ${processedFiles.length - 10} more files`);
  }
}

async function updateGlobalCSS() {
  const cssUpdates = [
    {
      file: 'src/styles/globals.css',
      updates: {
        '--primary-color: #FF6B35': '--primary-color: #0052CC',
        '--secondary-color: #FFA500': '--secondary-color: #6B7280',
        '--accent-color: #FF8C00': '--accent-color: #10B981'
      }
    }
  ];

  for (const cssFile of cssUpdates) {
    const filePath = path.join(process.cwd(), cssFile.file);
    
    try {
      if (await fs.promises.access(filePath).then(() => true).catch(() => false)) {
        let content = await fs.promises.readFile(filePath, 'utf-8');
        
        for (const [oldValue, newValue] of Object.entries(cssFile.updates)) {
          content = content.replace(new RegExp(oldValue, 'g'), newValue);
        }
        
        await fs.promises.writeFile(filePath, content, 'utf-8');
        console.log(`✅ Updated ${cssFile.file}`);
      }
    } catch (error) {
      console.log(`ℹ️  ${cssFile.file} not found, skipping`);
    }
  }
}

async function createColorVariables() {
  const colorVariablesCSS = `
/* Professional Color Scheme for Disaster Recovery Platform */
:root {
  /* Primary Colors */
  --color-primary: #0052CC; /* Professional Blue */
  --color-primary-light: #3B82F6; /* Blue-500 */
  --color-primary-dark: #1D4ED8; /* Blue-700 */
  
  /* Secondary Colors */
  --color-secondary: #6B7280; /* Gray-500 */
  --color-secondary-light: #9CA3AF; /* Gray-400 */
  --color-secondary-dark: #374151; /* Gray-700 */
  
  /* Status Colors */
  --color-success: #10B981; /* Emerald-500 */
  --color-warning: #F59E0B; /* Amber-500 - subtle for warnings */
  --color-error: #EF4444; /* Red-500 */
  --color-info: --color-primary;
  
  /* Background Colors */
  --color-bg-primary: #FFFFFF;
  --color-bg-secondary: #F9FAFB; /* Gray-50 */
  --color-bg-tertiary: #F3F4F6; /* Gray-100 */
  
  /* Text Colors */
  --color-text-primary: #111827; /* Gray-900 */
  --color-text-secondary: #6B7280; /* Gray-500 */
  --color-text-tertiary: #9CA3AF; /* Gray-400 */
  
  /* Border Colors */
  --color-border-primary: #D1D5DB; /* Gray-300 */
  --color-border-secondary: #E5E7EB; /* Gray-200 */
}

/* Dark mode support */
@media (prefers-color-scheme: dark) {
  :root {
    --color-bg-primary: #1F2937; /* Gray-800 */
    --color-bg-secondary: #111827; /* Gray-900 */
    --color-bg-tertiary: #374151; /* Gray-700 */
    
    --color-text-primary: #F9FAFB; /* Gray-50 */
    --color-text-secondary: #D1D5DB; /* Gray-300 */
    --color-text-tertiary: #9CA3AF; /* Gray-400 */
    
    --color-border-primary: #4B5563; /* Gray-600 */
    --color-border-secondary: #374151; /* Gray-700 */
  }
}
`;

  const cssPath = path.join(process.cwd(), 'src/styles/professional-colors.css');
  await fs.promises.writeFile(cssPath, colorVariablesCSS, 'utf-8');
  console.log('✅ Created professional color variables');
}

// Execute the color scheme update
updateColorScheme().then(() => {
  console.log('\n🏁 Professional color scheme successfully applied!');
  console.log('🔄 Please restart your development server to see changes.');
}).catch(error => {
  console.error('❌ Error updating color scheme:', error);
  process.exit(1);
});