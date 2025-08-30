#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const glob = require('glob');

// Comprehensive American to Australian English replacements
const replacements = [
  // Primary words user specifically mentioned
  { american: /\bmold\b/gi, australian: 'mould' },
  { american: /\bMold\b/g, australian: 'Mould' },
  { american: /\bmolds\b/gi, australian: 'moulds' },
  { american: /\bMolds\b/g, australian: 'Moulds' },
  { american: /\bmoldy\b/gi, australian: 'mouldy' },
  { american: /\bMoldy\b/g, australian: 'Mouldy' },
  
  { american: /\bodor\b/gi, australian: 'odour' },
  { american: /\bOdor\b/g, australian: 'Odour' },
  { american: /\bodors\b/gi, australian: 'odours' },
  { american: /\bOdors\b/g, australian: 'Odours' },
  
  { american: /\bspecialize\b/gi, australian: 'specialise' },
  { american: /\bSpecialize\b/g, australian: 'Specialise' },
  { american: /\bspecialized\b/gi, australian: 'specialised' },
  { american: /\bSpecialized\b/g, australian: 'Specialised' },
  { american: /\bspecializing\b/gi, australian: 'specialising' },
  { american: /\bSpecializing\b/g, australian: 'Specialising' },
  { american: /\bspecialization\b/gi, australian: 'specialisation' },
  { american: /\bSpecialization\b/g, australian: 'Specialisation' },
  
  // Other common American to Australian
  { american: /\bcolor\b/gi, australian: 'colour' },
  { american: /\bColor\b/g, australian: 'Colour' },
  { american: /\bcolors\b/gi, australian: 'colours' },
  { american: /\bColors\b/g, australian: 'Colours' },
  { american: /\bcolored\b/gi, australian: 'coloured' },
  { american: /\bColored\b/g, australian: 'Coloured' },
  { american: /\bcoloring\b/gi, australian: 'colouring' },
  { american: /\bColoring\b/g, australian: 'Colouring' },
  
  { american: /\bcenter\b/gi, australian: 'centre' },
  { american: /\bCenter\b/g, australian: 'Centre' },
  { american: /\bcenters\b/gi, australian: 'centres' },
  { american: /\bCenters\b/g, australian: 'Centres' },
  { american: /\bcentered\b/gi, australian: 'centred' },
  { american: /\bCentered\b/g, australian: 'Centred' },
  { american: /\bcentering\b/gi, australian: 'centring' },
  { american: /\bCentering\b/g, australian: 'Centring' },
  
  { american: /\borganize\b/gi, australian: 'organise' },
  { american: /\bOrganize\b/g, australian: 'Organise' },
  { american: /\borganized\b/gi, australian: 'organised' },
  { american: /\bOrganized\b/g, australian: 'Organised' },
  { american: /\borganizing\b/gi, australian: 'organising' },
  { american: /\bOrganizing\b/g, australian: 'Organising' },
  { american: /\borganization\b/gi, australian: 'organisation' },
  { american: /\bOrganization\b/g, australian: 'Organisation' },
  
  { american: /\brealize\b/gi, australian: 'realise' },
  { american: /\bRealize\b/g, australian: 'Realise' },
  { american: /\brealized\b/gi, australian: 'realised' },
  { american: /\bRealized\b/g, australian: 'Realised' },
  { american: /\brealizing\b/gi, australian: 'realising' },
  { american: /\bRealizing\b/g, australian: 'Realising' },
  { american: /\brealization\b/gi, australian: 'realisation' },
  { american: /\bRealization\b/g, australian: 'Realisation' },
  
  { american: /\banalyze\b/gi, australian: 'analyse' },
  { american: /\bAnalyze\b/g, australian: 'Analyse' },
  { american: /\banalyzed\b/gi, australian: 'analysed' },
  { american: /\bAnalyzed\b/g, australian: 'Analysed' },
  { american: /\banalyzing\b/gi, australian: 'analysing' },
  { american: /\bAnalyzing\b/g, australian: 'Analysing' },
  
  { american: /\boptimize\b/gi, australian: 'optimise' },
  { american: /\bOptimize\b/g, australian: 'Optimise' },
  { american: /\boptimized\b/gi, australian: 'optimised' },
  { american: /\bOptimized\b/g, australian: 'Optimised' },
  { american: /\boptimizing\b/gi, australian: 'optimising' },
  { american: /\bOptimizing\b/g, australian: 'Optimising' },
  { american: /\boptimization\b/gi, australian: 'optimisation' },
  { american: /\bOptimization\b/g, australian: 'Optimisation' },
  
  { american: /\brecognize\b/gi, australian: 'recognise' },
  { american: /\bRecognize\b/g, australian: 'Recognise' },
  { american: /\brecognized\b/gi, australian: 'recognised' },
  { american: /\bRecognized\b/g, australian: 'Recognised' },
  { american: /\brecognizing\b/gi, australian: 'recognising' },
  { american: /\bRecognizing\b/g, australian: 'Recognising' },
  
  { american: /\bfavor\b/gi, australian: 'favour' },
  { american: /\bFavor\b/g, australian: 'Favour' },
  { american: /\bfavorite\b/gi, australian: 'favourite' },
  { american: /\bFavorite\b/g, australian: 'Favourite' },
  { american: /\bfavorable\b/gi, australian: 'favourable' },
  { american: /\bFavorable\b/g, australian: 'Favourable' },
  
  { american: /\bhonor\b/gi, australian: 'honour' },
  { american: /\bHonor\b/g, australian: 'Honour' },
  { american: /\bhonored\b/gi, australian: 'honoured' },
  { american: /\bHonored\b/g, australian: 'Honoured' },
  { american: /\bhonoring\b/gi, australian: 'honouring' },
  { american: /\bHonoring\b/g, australian: 'Honouring' },
  
  { american: /\blabor\b/gi, australian: 'labour' },
  { american: /\bLabor\b/g, australian: 'Labour' },
  { american: /\blabored\b/gi, australian: 'laboured' },
  { american: /\bLabored\b/g, australian: 'Laboured' },
  { american: /\blaboring\b/gi, australian: 'labouring' },
  { american: /\bLaboring\b/g, australian: 'Labouring' },
  
  { american: /\bbehavior\b/gi, australian: 'behaviour' },
  { american: /\bBehavior\b/g, australian: 'Behaviour' },
  { american: /\bbehaviors\b/gi, australian: 'behaviours' },
  { american: /\bBehaviors\b/g, australian: 'Behaviours' },
  
  { american: /\bneighbor\b/gi, australian: 'neighbour' },
  { american: /\bNeighbor\b/g, australian: 'Neighbour' },
  { american: /\bneighbors\b/gi, australian: 'neighbours' },
  { american: /\bNeighbors\b/g, australian: 'Neighbours' },
  { american: /\bneighborhood\b/gi, australian: 'neighbourhood' },
  { american: /\bNeighborhood\b/g, australian: 'Neighbourhood' },
  
  { american: /\bpersonalize\b/gi, australian: 'personalise' },
  { american: /\bPersonalize\b/g, australian: 'Personalise' },
  { american: /\bpersonalized\b/gi, australian: 'personalised' },
  { american: /\bPersonalized\b/g, australian: 'Personalised' },
  
  { american: /\bauthorize\b/gi, australian: 'authorise' },
  { american: /\bAuthorize\b/g, australian: 'Authorise' },
  { american: /\bauthorized\b/gi, australian: 'authorised' },
  { american: /\bAuthorized\b/g, australian: 'Authorised' },
  { american: /\bauthorization\b/gi, australian: 'authorisation' },
  { american: /\bAuthorization\b/g, australian: 'Authorisation' },
  
  { american: /\bdefense\b/gi, australian: 'defence' },
  { american: /\bDefense\b/g, australian: 'Defence' },
  { american: /\boffense\b/gi, australian: 'offence' },
  { american: /\bOffense\b/g, australian: 'Offence' },
  
  { american: /\bmaneuver\b/gi, australian: 'manoeuvre' },
  { american: /\bManeuver\b/g, australian: 'Manoeuvre' },
  { american: /\bmaneuvers\b/gi, australian: 'manoeuvres' },
  { american: /\bManeuvers\b/g, australian: 'Manoeuvres' },
  
  { american: /\btraveling\b/gi, australian: 'travelling' },
  { american: /\bTraveling\b/g, australian: 'Travelling' },
  { american: /\btraveled\b/gi, australian: 'travelled' },
  { american: /\bTraveled\b/g, australian: 'Travelled' },
  { american: /\btraveler\b/gi, australian: 'traveller' },
  { american: /\bTraveler\b/g, australian: 'Traveller' },
  
  { american: /\bfulfill\b/gi, australian: 'fulfil' },
  { american: /\bFulfill\b/g, australian: 'Fulfil' },
  { american: /\bfulfilled\b/gi, australian: 'fulfilled' },
  { american: /\bFulfilled\b/g, australian: 'Fulfilled' },
  { american: /\bfulfilling\b/gi, australian: 'fulfilling' },
  { american: /\bFulfilling\b/g, australian: 'Fulfilling' },
  { american: /\bfulfillment\b/gi, australian: 'fulfilment' },
  { american: /\bFulfillment\b/g, australian: 'Fulfilment' }
];

// Files and directories to skip
const skipPatterns = [
  'node_modules/**',
  '.next/**',
  '.git/**',
  'build/**',
  'dist/**',
  'coverage/**',
  '*.min.js',
  '*.min.css',
  'package-lock.json',
  'yarn.lock',
  'scripts/fix-australian-spellings.js' // Don't modify this script itself
];

function shouldSkipFile(filePath) {
  return skipPatterns.some(pattern => {
    if (pattern.includes('**')) {
      const basePattern = pattern.replace('/**', '');
      return filePath.includes(basePattern);
    }
    return filePath.endsWith(pattern);
  });
}

function fixSpellings(content, filePath) {
  let modified = content;
  let changeCount = 0;
  
  replacements.forEach(({ american, australian }) => {
    const matches = modified.match(american);
    if (matches) {
      const uniqueMatches = [...new Set(matches)];
      uniqueMatches.forEach(match => {
        const beforeCount = (modified.match(new RegExp(match, 'g')) || []).length;
        if (beforeCount > 0) {
          // Preserve case for exact replacement
          const replacement = match[0] === match[0].toUpperCase() 
            ? australian.charAt(0).toUpperCase() + australian.slice(1).toLowerCase()
            : australian.toLowerCase();
          
          modified = modified.replace(new RegExp(`\\b${match}\\b`, 'g'), replacement);
          changeCount += beforeCount;
        }
      });
    }
  });
  
  return { modified, changeCount };
}

function processFile(filePath) {
  if (shouldSkipFile(filePath)) {
    return { skipped: true };
  }
  
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    const { modified, changeCount } = fixSpellings(content, filePath);
    
    if (changeCount > 0) {
      fs.writeFileSync(filePath, modified, 'utf8');
      return { changed: true, changeCount };
    }
    
    return { changed: false };
  } catch (error) {
    console.error(`Error processing ${filePath}:`, error.message);
    return { error: true };
  }
}

function main() {
  console.log('🇦🇺 Fixing American to Australian English spellings...\n');
  
  // Get all TypeScript, JavaScript, and JSON files
  const patterns = [
    'src/**/*.{ts,tsx,js,jsx}',
    'app/**/*.{ts,tsx,js,jsx}',
    'components/**/*.{ts,tsx,js,jsx}',
    'lib/**/*.{ts,tsx,js,jsx}',
    'pages/**/*.{ts,tsx,js,jsx}',
    'scripts/**/*.js',
    '*.json',
    'public/**/*.json'
  ];
  
  let totalFiles = 0;
  let filesChanged = 0;
  let totalChanges = 0;
  let filesSkipped = 0;
  let filesWithErrors = 0;
  
  patterns.forEach(pattern => {
    const files = glob.sync(pattern);
    
    files.forEach(file => {
      totalFiles++;
      const result = processFile(file);
      
      if (result.skipped) {
        filesSkipped++;
      } else if (result.error) {
        filesWithErrors++;
      } else if (result.changed) {
        filesChanged++;
        totalChanges += result.changeCount;
        console.log(`✅ Fixed ${result.changeCount} spelling(s) in: ${file}`);
      }
    });
  });
  
  console.log('\n📊 Summary:');
  console.log(`Total files scanned: ${totalFiles}`);
  console.log(`Files changed: ${filesChanged}`);
  console.log(`Total corrections: ${totalChanges}`);
  console.log(`Files skipped: ${filesSkipped}`);
  if (filesWithErrors > 0) {
    console.log(`Files with errors: ${filesWithErrors}`);
  }
  
  console.log('\n✨ Australian English spelling corrections complete!');
}

// Run the script
main();