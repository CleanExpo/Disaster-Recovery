/**
 * Enhanced Playwright Script to Analyze R6 Digital Website Design
 * Run this with: node analyze-r6-design.js
 * 
 * Features:
 * - Robust error handling and retry logic
 * - Multiple selector fallbacks
 * - Comprehensive design system extraction
 * - Color palette conversion to hex codes
 * - Mobile responsive analysis
 */

const { chromium } = require('playwright');
const fs = require('fs').promises;

// Helper function to convert RGB to Hex
function rgbToHex(rgb) {
  if (!rgb || rgb === 'rgba(0, 0, 0, 0)' || rgb === 'transparent') return null;
  
  const result = rgb.match(/\d+/g);
  if (!result || result.length < 3) return rgb;
  
  const [r, g, b] = result.map(num => parseInt(num));
  return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
}

// Helper function to safely evaluate elements
async function safeEvaluate(page, selector, evaluationFn, fallback = []) {
  try {
    const elements = await page.$$(selector);
    if (elements.length === 0) return fallback;
    
    return await page.$$eval(selector, evaluationFn);
  } catch (error) {
    console.warn(`⚠️ Could not evaluate selector "${selector}":`, error.message);
    return fallback;
  }
}

// Enhanced analysis with retry logic
async function analyzeR6Design() {
  console.log('🔍 Starting enhanced R6 Digital website analysis...\n');
  
  let browser, context, page;
  const analysisResults = {
    colors: new Set(),
    typography: [],
    buttons: [],
    spacing: [],
    navigation: {},
    animations: [],
    grid: [],
    timestamp: new Date().toISOString()
  };
  
  try {
    // Launch browser with better configuration
    browser = await chromium.launch({ 
      headless: false,
      args: ['--disable-web-security', '--disable-features=VizDisplayCompositor']
    });
    
    context = await browser.newContext({
      viewport: { width: 1440, height: 900 },
      userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
    });
    
    page = await context.newPage();
    
    // Set longer timeout and better error handling
    page.setDefaultTimeout(30000);
    
    // Navigate with retry logic
    console.log('📱 Navigating to R6 Digital website...');
    let retries = 3;
    while (retries > 0) {
      try {
        await page.goto('https://r6digital.com.au/creative-services/website-design/', {
          waitUntil: 'domcontentloaded',
          timeout: 30000
        });
        
        // Wait for critical elements to load
        await page.waitForTimeout(3000);
        break;
      } catch (error) {
        retries--;
        if (retries === 0) throw error;
        console.log(`⚠️ Retrying navigation... (${3 - retries}/3)`);
        await page.waitForTimeout(2000);
      }
    }
    
    console.log('✅ Page loaded successfully\n');
    
    // Analyze Hero Section with multiple selector fallbacks
    console.log('═══════════════════════════════════════════');
    console.log('🎨 HERO SECTION ANALYSIS');
    console.log('═══════════════════════════════════════════');
    
    const heroSelectors = [
      '.hero-section', '.hero', '.banner', 'header.entry-header', 
      '.page-header', '[class*="hero"]', 'section:first-of-type',
      '.wp-block-cover', '.elementor-section:first-child'
    ];
    
    let heroSection = null;
    for (const selector of heroSelectors) {
      try {
        heroSection = await page.$(selector);
        if (heroSection) {
          console.log(`✅ Found hero section with selector: ${selector}`);
          break;
        }
      } catch (e) {
        console.warn(`⚠️ Selector failed: ${selector}`);
      }
    }
    
    if (heroSection) {
      try {
        const heroStyles = await heroSection.evaluate(el => {
          const styles = window.getComputedStyle(el);
          return {
            background: styles.background,
            backgroundColor: styles.backgroundColor,
            backgroundImage: styles.backgroundImage,
            minHeight: styles.minHeight,
            height: styles.height,
            padding: styles.padding,
            display: styles.display,
            alignItems: styles.alignItems,
            justifyContent: styles.justifyContent,
            textAlign: styles.textAlign
          };
        });
        console.log('Hero Styles:', JSON.stringify(heroStyles, null, 2));
        
        // Store colors
        if (heroStyles.backgroundColor) analysisResults.colors.add(rgbToHex(heroStyles.backgroundColor));
      } catch (error) {
        console.warn('⚠️ Could not analyze hero styles:', error.message);
      }
    } else {
      console.log('⚠️ No hero section found with any selector');
    }
    
    // Enhanced Typography Analysis
    console.log('\n═══════════════════════════════════════════');
    console.log('📝 TYPOGRAPHY ANALYSIS');
    console.log('═══════════════════════════════════════════');
    
    const headings = await safeEvaluate(page, 'h1, h2, h3, h4, h5, h6', elements => 
      elements.slice(0, 10).map(el => {
        const styles = window.getComputedStyle(el);
        return {
          tag: el.tagName,
          text: el.innerText.substring(0, 80).trim(),
          fontSize: styles.fontSize,
          fontFamily: styles.fontFamily,
          fontWeight: styles.fontWeight,
          color: styles.color,
          lineHeight: styles.lineHeight,
          letterSpacing: styles.letterSpacing,
          textTransform: styles.textTransform,
          marginTop: styles.marginTop,
          marginBottom: styles.marginBottom
        };
      })
    );
    
    // Analyze body text
    const bodyText = await safeEvaluate(page, 'p, .content p, .description, [class*="text"]', elements => 
      elements.slice(0, 5).map(el => {
        const styles = window.getComputedStyle(el);
        return {
          fontSize: styles.fontSize,
          fontFamily: styles.fontFamily,
          fontWeight: styles.fontWeight,
          color: styles.color,
          lineHeight: styles.lineHeight,
          letterSpacing: styles.letterSpacing
        };
      })
    );
    
    // Store typography data
    analysisResults.typography = [...headings, ...bodyText];
    
    console.log('\n📑 HEADINGS:');
    headings.forEach(h => {
      console.log(`\n${h.tag}: "${h.text}"`);
      console.log(`  Font: ${h.fontFamily}`);
      console.log(`  Size: ${h.fontSize}, Weight: ${h.fontWeight}`);
      console.log(`  Color: ${h.color} (${rgbToHex(h.color)})`);
      console.log(`  Line Height: ${h.lineHeight}, Letter Spacing: ${h.letterSpacing}`);
      if (h.textTransform !== 'none') console.log(`  Transform: ${h.textTransform}`);
      
      // Store colors
      if (h.color) analysisResults.colors.add(rgbToHex(h.color));
    });
    
    if (bodyText.length > 0) {
      console.log('\n📄 BODY TEXT:');
      const uniqueBodyStyles = bodyText.filter((item, index, arr) => 
        arr.findIndex(t => t.fontSize === item.fontSize && t.fontFamily === item.fontFamily) === index
      );
      
      uniqueBodyStyles.forEach((p, i) => {
        console.log(`\nBody Style ${i + 1}:`);
        console.log(`  Font: ${p.fontFamily}`);
        console.log(`  Size: ${p.fontSize}, Weight: ${p.fontWeight}`);
        console.log(`  Color: ${p.color} (${rgbToHex(p.color)})`);
        console.log(`  Line Height: ${p.lineHeight}`);
        
        // Store colors
        if (p.color) analysisResults.colors.add(rgbToHex(p.color));
      });
    }
    
    // Enhanced Color Palette Analysis
    console.log('\n═══════════════════════════════════════════');
    console.log('🎨 COLOR PALETTE ANALYSIS');
    console.log('═══════════════════════════════════════════');
    
    try {
      const colors = await page.evaluate(() => {
        const elements = document.querySelectorAll('*');
        const colorSet = new Set();
        const borderColorSet = new Set();
        
        elements.forEach(el => {
          const styles = window.getComputedStyle(el);
          
          // Background colors
          if (styles.backgroundColor && 
              styles.backgroundColor !== 'rgba(0, 0, 0, 0)' && 
              styles.backgroundColor !== 'transparent') {
            colorSet.add(styles.backgroundColor);
          }
          
          // Text colors
          if (styles.color && styles.color !== 'rgba(0, 0, 0, 0)') {
            colorSet.add(styles.color);
          }
          
          // Border colors
          if (styles.borderColor && 
              styles.borderColor !== 'rgba(0, 0, 0, 0)' && 
              styles.borderColor !== 'transparent') {
            borderColorSet.add(styles.borderColor);
          }
          
          // Box shadow colors
          if (styles.boxShadow && styles.boxShadow !== 'none') {
            const shadowMatch = styles.boxShadow.match(/rgba?\([^)]+\)/g);
            if (shadowMatch) {
              shadowMatch.forEach(color => colorSet.add(color));
            }
          }
        });
        
        return {
          colors: Array.from(colorSet).slice(0, 30),
          borderColors: Array.from(borderColorSet).slice(0, 15)
        };
      });
      
      console.log('\n🎨 MAIN COLORS (RGB → HEX):');
      const hexColors = colors.colors
        .map(color => ({ rgb: color, hex: rgbToHex(color) }))
        .filter(c => c.hex)
        .sort((a, b) => a.hex.localeCompare(b.hex));
      
      hexColors.forEach(color => {
        console.log(`  ${color.hex.toUpperCase()} ← ${color.rgb}`);
        analysisResults.colors.add(color.hex.toUpperCase());
      });
      
      if (colors.borderColors.length > 0) {
        console.log('\n🔲 BORDER COLORS:');
        colors.borderColors.forEach(color => {
          const hex = rgbToHex(color);
          if (hex) {
            console.log(`  ${hex.toUpperCase()} ← ${color}`);
            analysisResults.colors.add(hex.toUpperCase());
          }
        });
      }
      
    } catch (error) {
      console.warn('⚠️ Could not analyze color palette:', error.message);
    }
    
    // Enhanced Button & CTA Analysis
    console.log('\n═══════════════════════════════════════════');
    console.log('🔘 BUTTON & CTA ANALYSIS');
    console.log('═══════════════════════════════════════════');
    
    const buttonSelectors = [
      'button', '.btn', 'a.button', 'input[type="submit"]', 
      '.wp-block-button__link', '[class*="button"]', 'a[class*="cta"]',
      '.elementor-button', '[role="button"]'
    ];
    
    let allButtons = [];
    for (const selector of buttonSelectors) {
      try {
        const buttons = await safeEvaluate(page, selector, elements => 
          elements.slice(0, 10).map(el => {
            const styles = window.getComputedStyle(el);
            return {
              selector: selector,
              text: (el.innerText || el.value || el.getAttribute('aria-label') || '').substring(0, 50),
              background: styles.background,
              backgroundColor: styles.backgroundColor,
              color: styles.color,
              padding: styles.padding,
              borderRadius: styles.borderRadius,
              fontSize: styles.fontSize,
              fontWeight: styles.fontWeight,
              fontFamily: styles.fontFamily,
              border: styles.border,
              boxShadow: styles.boxShadow,
              transition: styles.transition,
              textTransform: styles.textTransform,
              letterSpacing: styles.letterSpacing,
              minWidth: styles.minWidth,
              height: styles.height
            };
          })
        );
        allButtons = allButtons.concat(buttons);
      } catch (e) {
        console.warn(`⚠️ Button selector failed: ${selector}`);
      }
    }
    
    // Remove duplicates and store
    const uniqueButtons = allButtons.filter((button, index, arr) => 
      arr.findIndex(b => b.text === button.text && b.backgroundColor === button.backgroundColor) === index
    ).slice(0, 10);
    
    analysisResults.buttons = uniqueButtons;
    
    console.log(`\n🔘 Found ${uniqueButtons.length} unique buttons:`);
    uniqueButtons.forEach((btn, i) => {
      console.log(`\n--- Button ${i + 1} ---`);
      console.log(`Text: "${btn.text}"`);
      console.log(`Selector: ${btn.selector}`);
      console.log(`Background: ${btn.backgroundColor} (${rgbToHex(btn.backgroundColor)})`);
      console.log(`Color: ${btn.color} (${rgbToHex(btn.color)})`);
      console.log(`Border Radius: ${btn.borderRadius}`);
      console.log(`Padding: ${btn.padding}`);
      console.log(`Font: ${btn.fontSize} / ${btn.fontWeight} / ${btn.fontFamily}`);
      if (btn.textTransform !== 'none') console.log(`Transform: ${btn.textTransform}`);
      if (btn.boxShadow !== 'none') console.log(`Shadow: ${btn.boxShadow}`);
      console.log(`Transition: ${btn.transition}`);
      
      // Store colors
      if (btn.backgroundColor) analysisResults.colors.add(rgbToHex(btn.backgroundColor));
      if (btn.color) analysisResults.colors.add(rgbToHex(btn.color));
    });
    
    // Enhanced Spacing System Analysis
    console.log('\n═══════════════════════════════════════════');
    console.log('📏 SPACING SYSTEM ANALYSIS');
    console.log('═══════════════════════════════════════════');
    
    const sections = await safeEvaluate(page, 'section, .section, main > div, .container, .content, [class*="section"]', elements => 
      elements.slice(0, 10).map(el => {
        const styles = window.getComputedStyle(el);
        return {
          className: el.className,
          padding: styles.padding,
          paddingTop: styles.paddingTop,
          paddingBottom: styles.paddingBottom,
          paddingLeft: styles.paddingLeft,
          paddingRight: styles.paddingRight,
          margin: styles.margin,
          marginTop: styles.marginTop,
          marginBottom: styles.marginBottom,
          gap: styles.gap,
          maxWidth: styles.maxWidth
        };
      })
    );
    
    analysisResults.spacing = sections;
    
    console.log('\n📐 SECTION SPACING PATTERNS:');
    sections.forEach((s, i) => {
      console.log(`\n--- Section ${i + 1} (${s.className}) ---`);
      console.log(`Padding: ${s.padding}`);
      if (s.paddingTop !== s.paddingBottom) {
        console.log(`  Top: ${s.paddingTop}, Bottom: ${s.paddingBottom}`);
        console.log(`  Left: ${s.paddingLeft}, Right: ${s.paddingRight}`);
      }
      console.log(`Margin: ${s.margin}`);
      if (s.marginTop !== '0px' || s.marginBottom !== '0px') {
        console.log(`  Top: ${s.marginTop}, Bottom: ${s.marginBottom}`);
      }
      if (s.gap !== 'normal') console.log(`Gap: ${s.gap}`);
      if (s.maxWidth !== 'none') console.log(`Max Width: ${s.maxWidth}`);
    });
    
    // Enhanced Navigation Analysis
    console.log('\n═══════════════════════════════════════════');
    console.log('🧭 NAVIGATION ANALYSIS');
    console.log('═══════════════════════════════════════════');
    
    const navSelectors = ['nav', '.navigation', 'header nav', '.navbar', '.menu', '.main-nav', '.primary-nav'];
    let navElement = null;
    
    for (const selector of navSelectors) {
      try {
        navElement = await page.$(selector);
        if (navElement) {
          console.log(`✅ Found navigation with selector: ${selector}`);
          break;
        }
      } catch (e) {
        console.warn(`⚠️ Nav selector failed: ${selector}`);
      }
    }
    
    if (navElement) {
      try {
        const navStyles = await navElement.evaluate(el => {
          const styles = window.getComputedStyle(el);
          return {
            position: styles.position,
            background: styles.background,
            backgroundColor: styles.backgroundColor,
            height: styles.height,
            padding: styles.padding,
            boxShadow: styles.boxShadow,
            borderBottom: styles.borderBottom,
            zIndex: styles.zIndex,
            display: styles.display,
            justifyContent: styles.justifyContent,
            alignItems: styles.alignItems
          };
        });
        
        analysisResults.navigation = navStyles;
        console.log('\n🧭 Navigation Styles:');
        console.log(JSON.stringify(navStyles, null, 2));
        
        // Store nav colors
        if (navStyles.backgroundColor) analysisResults.colors.add(rgbToHex(navStyles.backgroundColor));
        
        // Analyze navigation links
        const navLinks = await safeEvaluate(navElement, 'a, .nav-link', elements =>
          elements.slice(0, 8).map(el => {
            const styles = window.getComputedStyle(el);
            return {
              text: el.innerText.trim(),
              color: styles.color,
              fontSize: styles.fontSize,
              fontWeight: styles.fontWeight,
              padding: styles.padding,
              textDecoration: styles.textDecoration
            };
          })
        );
        
        if (navLinks.length > 0) {
          console.log('\n🔗 Navigation Links:');
          navLinks.forEach((link, i) => {
            console.log(`  ${i + 1}. "${link.text}" - ${link.color} (${rgbToHex(link.color)})`);
            if (link.color) analysisResults.colors.add(rgbToHex(link.color));
          });
        }
        
      } catch (error) {
        console.warn('⚠️ Could not analyze navigation styles:', error.message);
      }
    } else {
      console.log('⚠️ No navigation found with any selector');
    }
    
    // Enhanced Grid & Card Analysis
    console.log('\n═══════════════════════════════════════════');
    console.log('🗂️ GRID & LAYOUT ANALYSIS');
    console.log('═══════════════════════════════════════════');
    
    const gridSelectors = ['.grid', '.row', '[class*="grid"]', '[class*="col-"]', '.flex', '[class*="flex"]', '.cards', '[class*="card"]'];
    let allGrids = [];
    
    for (const selector of gridSelectors) {
      try {
        const grids = await safeEvaluate(page, selector, elements => {
          return elements.slice(0, 5).map(el => {
            const styles = window.getComputedStyle(el);
            return {
              selector: selector,
              className: el.className,
              display: styles.display,
              gridTemplateColumns: styles.gridTemplateColumns,
              gridTemplateRows: styles.gridTemplateRows,
              gap: styles.gap,
              flexDirection: styles.flexDirection,
              flexWrap: styles.flexWrap,
              justifyContent: styles.justifyContent,
              alignItems: styles.alignItems,
              padding: styles.padding,
              margin: styles.margin
            };
          });
        });
        allGrids = allGrids.concat(grids);
      } catch (e) {
        console.warn(`⚠️ Grid selector failed: ${selector}`);
      }
    }
    
    const uniqueGrids = allGrids.filter((grid, index, arr) => 
      arr.findIndex(g => g.className === grid.className) === index
    ).slice(0, 8);
    
    analysisResults.grid = uniqueGrids;
    
    console.log(`\n🏗️ Found ${uniqueGrids.length} unique layout systems:`);
    uniqueGrids.forEach((grid, i) => {
      if (grid.display === 'grid' || grid.display === 'flex') {
        console.log(`\n--- Layout ${i + 1} ---`);
        console.log(`Selector: ${grid.selector}`);
        console.log(`Class: ${grid.className}`);
        console.log(`Display: ${grid.display}`);
        
        if (grid.display === 'grid') {
          if (grid.gridTemplateColumns !== 'none') {
            console.log(`Columns: ${grid.gridTemplateColumns}`);
          }
          if (grid.gridTemplateRows !== 'none') {
            console.log(`Rows: ${grid.gridTemplateRows}`);
          }
        }
        
        if (grid.display === 'flex') {
          console.log(`Direction: ${grid.flexDirection}`);
          console.log(`Wrap: ${grid.flexWrap}`);
          console.log(`Justify: ${grid.justifyContent}`);
          console.log(`Align: ${grid.alignItems}`);
        }
        
        console.log(`Gap: ${grid.gap}`);
        console.log(`Padding: ${grid.padding}`);
      }
    });
    
    // Enhanced Animation Analysis
    console.log('\n═══════════════════════════════════════════');
    console.log('✨ ANIMATIONS & TRANSITIONS');
    console.log('═══════════════════════════════════════════');
    
    try {
      const animations = await page.evaluate(() => {
        const animatedElements = [];
        const allElements = document.querySelectorAll('*');
        
        allElements.forEach(el => {
          const styles = window.getComputedStyle(el);
          
          // Check for transitions
          if (styles.transition && styles.transition !== 'all 0s ease 0s' && styles.transition !== 'none') {
            animatedElements.push({
              type: 'transition',
              element: el.tagName + (el.className ? '.' + el.className.split(' ')[0] : ''),
              value: styles.transition,
              transform: styles.transform !== 'none' ? styles.transform : null
            });
          }
          
          // Check for animations
          if (styles.animation && styles.animation !== 'none') {
            animatedElements.push({
              type: 'animation',
              element: el.tagName + (el.className ? '.' + el.className.split(' ')[0] : ''),
              value: styles.animation
            });
          }
        });
        
        return animatedElements.slice(0, 15);
      });
      
      analysisResults.animations = animations;
      
      console.log(`\n✨ Found ${animations.length} animated elements:`);
      animations.forEach((anim, i) => {
        console.log(`\n${i + 1}. ${anim.element} (${anim.type.toUpperCase()})`);
        console.log(`   Value: ${anim.value}`);
        if (anim.transform) console.log(`   Transform: ${anim.transform}`);
      });
      
    } catch (error) {
      console.warn('⚠️ Could not analyze animations:', error.message);
    }
    
    // Mobile Analysis
    console.log('\n═══════════════════════════════════════════');
    console.log('📱 MOBILE RESPONSIVE ANALYSIS');
    console.log('═══════════════════════════════════════════');
    
    // Test different viewport sizes
    const viewports = [
      { name: 'Mobile', width: 375, height: 667 },
      { name: 'Tablet', width: 768, height: 1024 },
      { name: 'Desktop', width: 1440, height: 900 }
    ];
    
    for (const viewport of viewports) {
      try {
        await page.setViewportSize({ width: viewport.width, height: viewport.height });
        await page.waitForTimeout(1000);
        
        console.log(`\n📐 ${viewport.name} (${viewport.width}x${viewport.height}):`);
        
        const mobileStyles = await page.evaluate(() => {
          const body = document.body;
          const styles = window.getComputedStyle(body);
          
          // Check for common responsive elements
          const nav = document.querySelector('nav, .navigation, .navbar');
          const hero = document.querySelector('.hero, .banner, section:first-of-type');
          
          return {
            bodyFontSize: styles.fontSize,
            navHeight: nav ? window.getComputedStyle(nav).height : 'N/A',
            heroHeight: hero ? window.getComputedStyle(hero).height : 'N/A'
          };
        });
        
        console.log(`  Body Font Size: ${mobileStyles.bodyFontSize}`);
        console.log(`  Navigation Height: ${mobileStyles.navHeight}`);
        console.log(`  Hero Height: ${mobileStyles.heroHeight}`);
        
      } catch (error) {
        console.warn(`⚠️ Could not analyze ${viewport.name} viewport:`, error.message);
      }
    }
    
    // Reset to desktop view
    await page.setViewportSize({ width: 1440, height: 900 });
    
    // Screenshots and Data Export
    console.log('\n═══════════════════════════════════════════');
    console.log('📸 CAPTURING SCREENSHOTS & EXPORTING DATA');
    console.log('═══════════════════════════════════════════');
    
    try {
      // Take screenshots
      await page.screenshot({ 
        path: 'r6-digital-homepage.png', 
        fullPage: false 
      });
      console.log('✅ Homepage screenshot saved');
      
      await page.screenshot({ 
        path: 'r6-digital-fullpage.png', 
        fullPage: true 
      });
      console.log('✅ Full page screenshot saved');
      
      // Export analysis data as JSON
      const finalAnalysis = {
        ...analysisResults,
        colors: Array.from(analysisResults.colors).filter(color => color && color !== 'null'),
        summary: {
          totalColors: analysisResults.colors.size,
          totalButtons: analysisResults.buttons.length,
          totalTypographyElements: analysisResults.typography.length,
          totalSpacingElements: analysisResults.spacing.length,
          totalAnimations: analysisResults.animations.length,
          totalGridSystems: analysisResults.grid.length
        }
      };
      
      await fs.writeFile('r6-digital-analysis.json', JSON.stringify(finalAnalysis, null, 2));
      console.log('✅ Analysis data exported to r6-digital-analysis.json');
      
    } catch (error) {
      console.warn('⚠️ Could not save screenshots or data:', error.message);
    }
    
    // Final Summary
    console.log('\n═══════════════════════════════════════════');
    console.log('📊 ANALYSIS SUMMARY');
    console.log('═══════════════════════════════════════════');
    
    const colorArray = Array.from(analysisResults.colors).filter(c => c && c !== 'null');
    console.log(`\n🎨 EXTRACTED DESIGN SYSTEM:`);
    console.log(`   Colors: ${colorArray.length} unique`);
    console.log(`   Typography: ${analysisResults.typography.length} elements`);
    console.log(`   Buttons: ${analysisResults.buttons.length} variations`);
    console.log(`   Spacing: ${analysisResults.spacing.length} patterns`);
    console.log(`   Animations: ${analysisResults.animations.length} effects`);
    console.log(`   Grid Systems: ${analysisResults.grid.length} layouts`);
    
    if (colorArray.length > 0) {
      console.log('\n🎯 KEY COLORS DETECTED:');
      colorArray.slice(0, 10).forEach(color => {
        console.log(`   ${color}`);
      });
    }
    
    console.log('\n✅ ANALYSIS COMPLETE - Ready for implementation!');
    
  } catch (error) {
    console.error('❌ Error during analysis:', error);
    console.error('Stack trace:', error.stack);
  } finally {
    try {
      if (browser) await browser.close();
    } catch (e) {
      console.warn('⚠️ Could not close browser properly');
    }
  }
}

// Enhanced main execution with better error handling
async function main() {
  try {
    console.log('🚀 Starting R6 Digital Design Analysis...\n');
    await analyzeR6Design();
    console.log('\n🎉 Analysis completed successfully!');
    console.log('\nFiles generated:');
    console.log('  - r6-digital-homepage.png');
    console.log('  - r6-digital-fullpage.png');
    console.log('  - r6-digital-analysis.json');
  } catch (error) {
    console.error('\n💥 Analysis failed:', error.message);
    console.error('\nPossible solutions:');
    console.error('  1. Check internet connection');
    console.error('  2. Run: npx playwright install');
    console.error('  3. Update the target URL if needed');
    console.error('  4. Check if the website is accessible');
    process.exit(1);
  }
}

// Run the analysis
main();