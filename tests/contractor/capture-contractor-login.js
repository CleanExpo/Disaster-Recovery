const puppeteer = require('puppeteer');
const path = require('path');

async function captureContractorLogin() {
    console.log('Starting browser...');
    const browser = await puppeteer.launch({
        headless: false,
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    });

    try {
        const page = await browser.newPage();
        
        // Set viewport
        await page.setViewport({ width: 1280, height: 800 });
        
        // Navigate to contractor login
        console.log('Navigating to http://localhost:3001/contractor/login...');
        await page.goto('http://localhost:3001/contractor/login', {
            waitUntil: 'networkidle2',
            timeout: 30000
        });
        
        // Wait for the login form to be visible
        await page.waitForSelector('input[id="username"]', { timeout: 5000 });
        
        // Take screenshot
        const screenshotPath = path.join(__dirname, 'contractor-login-screenshot.png');
        await page.screenshot({ 
            path: screenshotPath,
            fullPage: true 
        });
        console.log(`Screenshot saved to: ${screenshotPath}`);
        
        // Get page content
        const pageContent = await page.evaluate(() => {
            const title = document.querySelector('h1')?.textContent || '';
            const subtitle = document.querySelector('h1 + p')?.textContent || '';
            const demoBox = document.querySelector('.bg-blue-50')?.textContent || '';
            const formLabels = Array.from(document.querySelectorAll('label')).map(l => l.textContent);
            const buttons = Array.from(document.querySelectorAll('button')).map(b => b.textContent);
            const links = Array.from(document.querySelectorAll('a')).map(a => ({
                text: a.textContent,
                href: a.href
            }));
            
            return {
                title,
                subtitle,
                demoBox,
                formLabels,
                buttons,
                links
            };
        });
        
        console.log('\n=== CONTRACTOR LOGIN PAGE CONTENT ===');
        console.log('Title:', pageContent.title);
        console.log('Subtitle:', pageContent.subtitle);
        console.log('Demo Box:', pageContent.demoBox.replace(/\s+/g, ' ').trim());
        console.log('Form Fields:', pageContent.formLabels);
        console.log('Buttons:', pageContent.buttons);
        console.log('Links:', pageContent.links);
        
    } catch (error) {
        console.error('Error capturing page:', error);
    } finally {
        await browser.close();
    }
}

captureContractorLogin();