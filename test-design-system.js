const puppeteer = require('puppeteer');
const path = require('path');

async function testDesignSystem() {
    console.log('Testing Global Design System Implementation...\n');
    const browser = await puppeteer.launch({
        headless: false,
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    });

    try {
        const page = await browser.newPage();
        await page.setViewport({ width: 1280, height: 800 });
        
        // Test pages
        const testPages = [
            { name: 'Homepage', url: 'http://localhost:3001/', screenshot: 'homepage-redesign.png' },
            { name: 'Contractor Login', url: 'http://localhost:3001/contractor/login', screenshot: 'contractor-login-redesign.png' },
            { name: 'Services', url: 'http://localhost:3001/services', screenshot: 'services-redesign.png' }
        ];
        
        for (const testPage of testPages) {
            console.log(`Testing ${testPage.name}...`);
            
            await page.goto(testPage.url, {
                waitUntil: 'networkidle2',
                timeout: 30000
            });
            
            // Wait for design system styles to load
            await new Promise(resolve => setTimeout(resolve, 1000));
            
            // Check if design system CSS is loaded
            const hasDesignSystem = await page.evaluate(() => {
                const styles = getComputedStyle(document.documentElement);
                return {
                    hasPrimaryColor: styles.getPropertyValue('--primary-600') !== '',
                    hasEmergencyColor: styles.getPropertyValue('--emergency-600') !== '',
                    hasWarningColor: styles.getPropertyValue('--warning-600') !== '',
                    hasSuccessColor: styles.getPropertyValue('--success-600') !== '',
                    hasSpacingScale: styles.getPropertyValue('--space-4') !== '',
                    hasTypographyScale: styles.getPropertyValue('--text-base') !== ''
                };
            });
            
            console.log(`  Design System Variables:`, hasDesignSystem);
            
            // Check for button styles
            const buttons = await page.evaluate(() => {
                const btns = Array.from(document.querySelectorAll('button, .btn, [class*="btn-"]'));
                return {
                    totalButtons: btns.length,
                    primaryButtons: btns.filter(b => b.className.includes('btn-primary')).length,
                    emergencyButtons: btns.filter(b => b.className.includes('btn-emergency')).length,
                    secondaryButtons: btns.filter(b => b.className.includes('btn-secondary')).length
                };
            });
            
            console.log(`  Button Analysis:`, buttons);
            
            // Check for color usage
            const colorUsage = await page.evaluate(() => {
                const elements = Array.from(document.querySelectorAll('*'));
                const colors = {
                    emergency: 0,
                    warning: 0,
                    success: 0,
                    primary: 0
                };
                
                elements.forEach(el => {
                    const className = el.className;
                    if (typeof className === 'string') {
                        if (className.includes('emergency') || className.includes('red')) colors.emergency++;
                        if (className.includes('warning') || className.includes('orange')) colors.warning++;
                        if (className.includes('success') || className.includes('green')) colors.success++;
                        if (className.includes('primary') || className.includes('blue')) colors.primary++;
                    }
                });
                
                return colors;
            });
            
            console.log(`  Color Usage:`, colorUsage);
            
            // Take screenshot
            await page.screenshot({ 
                path: path.join(__dirname, testPage.screenshot),
                fullPage: true 
            });
            console.log(`  Screenshot saved: ${testPage.screenshot}\n`);
        }
        
        // Test mobile view
        console.log('Testing Mobile Responsive View...');
        await page.setViewport({ width: 390, height: 844, isMobile: true });
        await page.goto('http://localhost:3001/', {
            waitUntil: 'networkidle2'
        });
        
        await page.screenshot({ 
            path: path.join(__dirname, 'mobile-homepage-redesign.png'),
            fullPage: true 
        });
        console.log('  Mobile screenshot saved: mobile-homepage-redesign.png\n');
        
        console.log('✅ Design System Test Complete!');
        
    } catch (error) {
        console.error('Error during test:', error.message);
    } finally {
        console.log('\nClosing browser in 5 seconds...');
        await new Promise(resolve => setTimeout(resolve, 5000));
        await browser.close();
    }
}

testDesignSystem();