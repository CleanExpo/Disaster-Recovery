const puppeteer = require('puppeteer');
const path = require('path');

async function testMobileDashboard() {
    console.log('Starting browser for mobile view...');
    const browser = await puppeteer.launch({
        headless: false,
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    });

    try {
        const page = await browser.newPage();
        
        // Set mobile viewport (iPhone 12 Pro)
        await page.setViewport({ 
            width: 390, 
            height: 844,
            isMobile: true,
            hasTouch: true
        });
        
        // Navigate to contractor login
        console.log('1. Navigating to login page (mobile view)...');
        await page.goto('http://localhost:3001/contractor/login', {
            waitUntil: 'networkidle2',
            timeout: 30000
        });
        
        // Take mobile login screenshot
        await page.screenshot({ 
            path: path.join(__dirname, 'contractor-mobile-login.png'),
            fullPage: true 
        });
        console.log('   Mobile login screenshot saved');
        
        // Fill demo credentials
        console.log('2. Filling demo credentials...');
        await page.type('input[id="username"]', 'demo');
        await page.type('input[id="password"]', 'Demo123!');
        
        // Click sign in
        console.log('3. Signing in...');
        await page.click('button[type="submit"]');
        
        // Wait for dashboard
        console.log('4. Waiting for dashboard...');
        await page.waitForNavigation({ waitUntil: 'networkidle2', timeout: 10000 });
        
        // Take mobile dashboard screenshot
        await page.screenshot({ 
            path: path.join(__dirname, 'contractor-mobile-dashboard.png'),
            fullPage: true 
        });
        console.log('   Mobile dashboard screenshot saved');
        
        // Test mobile navigation
        console.log('5. Testing mobile navigation...');
        
        // Check for bottom navigation
        const hasBottomNav = await page.evaluate(() => {
            const nav = document.querySelector('nav.fixed.bottom-0');
            return nav !== null;
        });
        
        console.log('   Bottom navigation present:', hasBottomNav);
        
        // Check for mobile-specific elements
        const mobileElements = await page.evaluate(() => {
            const elements = {
                bottomNav: document.querySelector('nav.fixed.bottom-0') !== null,
                fabButton: document.querySelector('button.h-14.w-14.rounded-full') !== null,
                touchTargets: document.querySelectorAll('.touch-target').length,
                mobileCards: document.querySelectorAll('.priority-card').length
            };
            return elements;
        });
        
        console.log('\n=== MOBILE UI ELEMENTS ===');
        console.log('Bottom Navigation:', mobileElements.bottomNav);
        console.log('FAB Button:', mobileElements.fabButton);
        console.log('Touch Targets:', mobileElements.touchTargets);
        console.log('Priority Cards:', mobileElements.mobileCards);
        
        // Scroll to test performance section
        await page.evaluate(() => {
            const performanceSection = document.querySelector('[class*="Performance"]');
            if (performanceSection) {
                performanceSection.scrollIntoView();
            }
        });
        
        await page.waitForTimeout(1000);
        
        // Take screenshot of performance section
        await page.screenshot({ 
            path: path.join(__dirname, 'contractor-mobile-performance.png'),
            fullPage: false 
        });
        console.log('   Performance section screenshot saved');
        
    } catch (error) {
        console.error('Error during mobile test:', error.message);
    } finally {
        console.log('\nClosing browser in 5 seconds...');
        await new Promise(resolve => setTimeout(resolve, 5000));
        await browser.close();
    }
}

testMobileDashboard();