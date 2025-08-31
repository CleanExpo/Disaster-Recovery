const { chromium } = require('playwright');

(async () => {
    const devices = [
        { name: 'iPhone 12', width: 390, height: 844 },
        { name: 'iPad', width: 768, height: 1024 },
        { name: 'Desktop', width: 1920, height: 1080 },
        { name: '4K', width: 3840, height: 2160 }
    ];
    
    const browser = await chromium.launch({ headless: true });
    
    for (const device of devices) {
        const context = await browser.newContext({
            viewport: { width: device.width, height: device.height }
        });
        const page = await context.newPage();
        
        try {
            await page.goto('http://host.docker.internal:3002', { 
                waitUntil: 'networkidle',
                timeout: 30000 
            });
            
            // Check for horizontal scroll
            const hasHorizontalScroll = await page.evaluate(() => {
                return document.documentElement.scrollWidth > document.documentElement.clientWidth;
            });
            
            if (hasHorizontalScroll) {
                console.log(`⚠ ${device.name}: Horizontal scroll detected`);
            } else {
                console.log(`✓ ${device.name}: No layout issues`);
            }
            
            // Take screenshot
            await page.screenshot({ 
                path: `/app/health-reports/screenshot-${device.name.replace(' ', '-')}.png`,
                fullPage: false
            });
            
        } catch (error) {
            console.log(`✗ ${device.name}: ${error.message}`);
        }
        
        await context.close();
    }
    
    await browser.close();
})();
