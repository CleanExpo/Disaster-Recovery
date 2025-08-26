const puppeteer = require('puppeteer');
const path = require('path');

async function testContractorDashboard() {
    console.log('Starting browser...');
    const browser = await puppeteer.launch({
        headless: false,
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    });

    try {
        const page = await browser.newPage();
        await page.setViewport({ width: 1280, height: 800 });
        
        // Navigate to contractor login
        console.log('1. Navigating to login page...');
        await page.goto('http://localhost:3001/contractor/login', {
            waitUntil: 'networkidle2',
            timeout: 30000
        });
        
        // Fill demo credentials
        console.log('2. Filling demo credentials...');
        await page.type('input[id="username"]', 'demo');
        await page.type('input[id="password"]', 'Demo123!');
        
        // Take login screenshot
        await page.screenshot({ 
            path: path.join(__dirname, 'contractor-login-filled.png'),
            fullPage: true 
        });
        console.log('   Screenshot saved: contractor-login-filled.png');
        
        // Click sign in
        console.log('3. Clicking Sign In button...');
        await page.click('button[type="submit"]');
        
        // Wait for navigation to dashboard
        console.log('4. Waiting for dashboard to load...');
        await page.waitForNavigation({ waitUntil: 'networkidle2', timeout: 10000 });
        
        // Check if we're on the dashboard
        const currentUrl = page.url();
        console.log('   Current URL:', currentUrl);
        
        if (currentUrl.includes('/contractor/dashboard')) {
            console.log('✅ Successfully navigated to dashboard!');
            
            // Take dashboard screenshot
            await page.screenshot({ 
                path: path.join(__dirname, 'contractor-dashboard.png'),
                fullPage: true 
            });
            console.log('   Dashboard screenshot saved: contractor-dashboard.png');
            
            // Get dashboard content
            const dashboardContent = await page.evaluate(() => {
                const title = document.querySelector('h1')?.textContent || 
                              document.querySelector('.text-xl.font-bold')?.textContent || '';
                const tabs = Array.from(document.querySelectorAll('[role="tab"]')).map(t => t.textContent);
                const cards = Array.from(document.querySelectorAll('.card-header, .card-title')).map(c => c.textContent);
                
                return {
                    title,
                    tabs,
                    cards
                };
            });
            
            console.log('\n=== DASHBOARD CONTENT ===');
            console.log('Title:', dashboardContent.title);
            console.log('Tabs:', dashboardContent.tabs);
            console.log('Cards:', dashboardContent.cards);
            
        } else {
            console.log('❌ Did not navigate to dashboard. Still on:', currentUrl);
            
            // Check for errors
            const errorText = await page.evaluate(() => {
                const error = document.querySelector('.text-red-800, .text-red-600, .error');
                return error ? error.textContent : null;
            });
            
            if (errorText) {
                console.log('Error found:', errorText);
            }
        }
        
    } catch (error) {
        console.error('Error during test:', error.message);
        
        // Take error screenshot
        const page = (await browser.pages())[0];
        if (page) {
            await page.screenshot({ 
                path: path.join(__dirname, 'contractor-error.png'),
                fullPage: true 
            });
            console.log('Error screenshot saved: contractor-error.png');
        }
    } finally {
        console.log('\nClosing browser in 5 seconds...');
        await new Promise(resolve => setTimeout(resolve, 5000));
        await browser.close();
    }
}

testContractorDashboard();