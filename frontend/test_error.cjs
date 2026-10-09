const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();
  
  page.on('console', msg => console.log('PAGE LOG:', msg.text()));
  page.on('pageerror', error => console.log('PAGE ERROR:', error.message, error.stack));
  
  await page.goto('http://localhost:5173/admin/login');
  
  // Need to login to get past admin protect
  await page.type('input[type="email"]', 'admin@ojalis.com');
  await page.type('input[type="password"]', 'admin123');
  await page.click('button[type="submit"]');
  
  await page.waitForNavigation();
  
  console.log("Navigating to create event page...");
  await page.goto('http://localhost:5173/admin/online-classes/create');
  
  // Wait a moment for any render errors
  await page.waitForTimeout(2000);
  
  await browser.close();
})();
