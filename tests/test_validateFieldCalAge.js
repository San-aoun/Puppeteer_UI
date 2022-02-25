const puppeteer = require('puppeteer');
const expect = require('chai').expect;

const config = require('../lib/config');
const helpers = require('../lib/helpers');
const calAge = require('../page-object/calAge');

before(async function(){
    browser = await puppeteer.launch({
        headless: config.isHeadless,
        slowMo: config.slowMo,
        devtools: config.isDevtools,
        timeout: config.launchTimeOut,
    })
    
    page = await browser.newPage()
    await page.setDefaultTimeout(config.waitingTimeOut)
    await page.setViewport({
        width: config.viewportWidth,
        height: config.viewportHeight
    })
})
after(async function() {
    await browser.close()
})

describe('TEST VALIDATE CALCULATE AGE',() => {
    // variable //
    var date = Date.now()

    it(' TC-001 : Positive | put 30/1/1991 | return You are 28',async() => {
        await helpers.loadUrl(page,config.baseUrl)

        await helpers.typeText(page,'30/01/1991','#Birthday')
        await page.waitForXPath('/html/body/div/main/form/div[2]/input');
        const [calualte] = await page.$x('/html/body/div/main/form/div[2]/input');
        if(calualte) calualte.click();

        var results = await calAge.getTextResults(page)
        console.log(results)
        expect(results).to.equal("You're 28")
        await page.screenshot({path: `Searchtest-TC001-${date}.png`})
        

        await page.waitForXPath('/html/body/div/main/div[2]/a');
        const [clicktryAgain] = await page.$x('/html/body/div/main/div[2]/a');
        if(clicktryAgain) clicktryAgain.click();
        
    }),
    it(' TC-002 : Nagative | put 30011991 | return String 30011991 was not recognized as a valid DateTime.',async() => {
        await helpers.loadUrl(page,config.baseUrl)

        await helpers.typeText(page,'30011991','#Birthday')
        await page.waitForXPath('/html/body/div/main/form/div[2]/input');
        const [calualte] = await page.$x('/html/body/div/main/form/div[2]/input');
        if(calualte) calualte.click();

        var results = await calAge.getTextResults(page)
        console.log(results)
        expect(results).to.equal("String '30011991' was not recognized as a valid DateTime.")
        await page.screenshot({path: `Searchtest-TC002-${date}.png`})

        await page.waitForXPath('/html/body/div/main/div[2]/a');
        const [clicktryAgain] = await page.$x('/html/body/div/main/div[2]/a');
        if(clicktryAgain) clicktryAgain.click();
    }),
    it(' TC-003 : Nagative | Do not put DOB | return Value cannot be null. Parameter name: Birthday',async() => {
        await helpers.loadUrl(page,config.baseUrl)

        await helpers.typeText(page,'','#Birthday')
        await page.waitForXPath('/html/body/div/main/form/div[2]/input');
        const [calualte] = await page.$x('/html/body/div/main/form/div[2]/input');
        if(calualte) calualte.click();

        var results = await calAge.getTextResults(page)
        console.log(results)
        expect(results).to.equal("Value cannot be null. Parameter name: Birthday")
        await page.screenshot({path: `Searchtest-TC003-${date}.png`})

        await page.waitForXPath('/html/body/div/main/div[2]/a');
        const [clicktryAgain] = await page.$x('/html/body/div/main/div[2]/a');
        if(clicktryAgain) clicktryAgain.click();
    }),    
    it(' TC-004 : Nagative | put 01/30/1991 | return String 01/30/1991 was not recognized as a valid DateTime.',async() => {
        await helpers.loadUrl(page,config.baseUrl)

        await helpers.typeText(page,'01/30/1991','#Birthday')
        await page.waitForXPath('/html/body/div/main/form/div[2]/input');
        const [calualte] = await page.$x('/html/body/div/main/form/div[2]/input');
        if(calualte) calualte.click();

        var results = await calAge.getTextResults(page)
        console.log(results)
        expect(results).to.equal("String '01/30/1991' was not recognized as a valid DateTime.")
        await page.screenshot({path: `Searchtest-TC004-${date}.png`})

        await page.waitForXPath('/html/body/div/main/div[2]/a');
        const [clicktryAgain] = await page.$x('/html/body/div/main/div[2]/a');
        if(clicktryAgain) clicktryAgain.click();
    }),    
    it(' TC-005 : Positive | put 30-jan-1991 | return You are 28',async() => {
        await helpers.loadUrl(page,config.baseUrl)
        
        await helpers.typeText(page,'30-jan-1991','#Birthday')
        await page.waitForXPath('/html/body/div/main/form/div[2]/input');
        const [calualte] = await page.$x('/html/body/div/main/form/div[2]/input');
        if(calualte) calualte.click();

        var results = await calAge.getTextResults(page)
        console.log(results)
        expect(results).to.equal("You're 28")
        await page.screenshot({path: `Searchtest-TC005-${date}.png`})

        await page.waitForXPath('/html/body/div/main/div[2]/a');
        const [clicktryAgain] = await page.$x('/html/body/div/main/div[2]/a');
        if(clicktryAgain) clicktryAgain.click();
    })
    it(' TC-006 : Nagative | put 30-ม.ค.-91 | return The string 30-ม.ค.-91 was not recognized as a valid DateTime. There is an unknown word starting at index 3.',async() => {
        await helpers.loadUrl(page,config.baseUrl)
        
        await helpers.typeText(page,'30-ม.ค.-91','#Birthday')
        await page.waitForXPath('/html/body/div/main/form/div[2]/input');
        const [calualte] = await page.$x('/html/body/div/main/form/div[2]/input');
        if(calualte) calualte.click();

        var results = await calAge.getTextResults(page)
        console.log(results)
        expect(results).to.equal("The string '30-ม.ค.-91' was not recognized as a valid DateTime. There is an unknown word starting at index '3'.")
        await page.screenshot({path: `Searchtest-TC006-${date}.png`})

        await page.waitForXPath('/html/body/div/main/div[2]/a');
        const [clicktryAgain] = await page.$x('/html/body/div/main/div[2]/a');
        if(clicktryAgain) clicktryAgain.click();
    })
    it(' TC-007 : Nagative | put 30 jen 1991 | return The string 30 jen 1991 was not recognized as a valid DateTime. There is an unknown word starting at index 3.',async() => {
        await helpers.loadUrl(page,config.baseUrl)
        
        await helpers.typeText(page,'30 jen 1991','#Birthday')
        await page.waitForXPath('/html/body/div/main/form/div[2]/input');
        const [calualte] = await page.$x('/html/body/div/main/form/div[2]/input');
        if(calualte) calualte.click();

        var results = await calAge.getTextResults(page)
        console.log(results)
        expect(results).to.equal("The string '30 jen 1991' was not recognized as a valid DateTime. There is an unknown word starting at index '3'.")
        await page.screenshot({path: `Searchtest-TC007-${date}.png`})

        await page.waitForXPath('/html/body/div/main/div[2]/a');
        const [clicktryAgain] = await page.$x('/html/body/div/main/div[2]/a');
        if(clicktryAgain) clicktryAgain.click();
    })
    it(' TC-008 : Nagative | put 30 January 1991 | return You are 28',async() => {
        await helpers.loadUrl(page,config.baseUrl)
        
        await helpers.typeText(page,'30 January 1991 ','#Birthday')
        await page.waitForXPath('/html/body/div/main/form/div[2]/input');
        const [calualte] = await page.$x('/html/body/div/main/form/div[2]/input');
        if(calualte) calualte.click();

        var results = await calAge.getTextResults(page)
        console.log(results)
        expect(results).to.equal("You're 28")
        await page.screenshot({path: `Searchtest-TC008-${date}.png`})
        

        await page.waitForXPath('/html/body/div/main/div[2]/a');
        const [clicktryAgain] = await page.$x('/html/body/div/main/div[2]/a');
        if(clicktryAgain) clicktryAgain.click();
    })
    it(' TC-009 : Nagative | put dfsdfsdfsdf | return The string dfsdfsdfsdf was not recognized as a valid DateTime. There is an unknown word starting at index 0.',async() => {
        await helpers.loadUrl(page,config.baseUrl)
        
        await helpers.typeText(page,'dfsdfsdfsdf','#Birthday')
        await page.waitForXPath('/html/body/div/main/form/div[2]/input');
        const [calualte] = await page.$x('/html/body/div/main/form/div[2]/input');
        if(calualte) calualte.click();

        var results = await calAge.getTextResults(page)
        console.log(results)
        expect(results).to.equal("The string 'dfsdfsdfsdf' was not recognized as a valid DateTime. There is an unknown word starting at index '0'.")
        await page.screenshot({path: `Searchtest-TC009-${date}.png`})

        await page.waitForXPath('/html/body/div/main/div[2]/a');
        const [clicktryAgain] = await page.$x('/html/body/div/main/div[2]/a');
        if(clicktryAgain) clicktryAgain.click();
    })
    it(' TC-010 : Nagative | put 45654654564 | return String 45654654564 was not recognized as a valid DateTime.',async() => {
        await helpers.loadUrl(page,config.baseUrl)
        
        await helpers.typeText(page,'45654654564','#Birthday')
        await page.waitForXPath('/html/body/div/main/form/div[2]/input');
        const [calualte] = await page.$x('/html/body/div/main/form/div[2]/input');
        if(calualte) calualte.click();

        var results = await calAge.getTextResults(page)
        console.log(results)
        expect(results).to.equal("String '45654654564' was not recognized as a valid DateTime.")
        await page.screenshot({path: `Searchtest-TC010-${date}.png`})

        await page.waitForXPath('/html/body/div/main/div[2]/a');
        const [clicktryAgain] = await page.$x('/html/body/div/main/div[2]/a');
        if(clicktryAgain) clicktryAgain.click();
    })
    it(' TC-011 : Nagative | put 30 jan 2025 | return Should not equal You are -5',async() => {
        await helpers.loadUrl(page,config.baseUrl)
         
        await helpers.typeText(page,'30 jan 2025 ','#Birthday')
        await page.waitForXPath('/html/body/div/main/form/div[2]/input');
        const [calualte] = await page.$x('/html/body/div/main/form/div[2]/input');
        if(calualte) calualte.click();

        var results = await calAge.getTextResults(page)
        console.log(results)
        expect(results).to.not.equal("You're -5")
        await page.screenshot({path: `Searchtest-TC011-${date}.png`})

        await page.waitForXPath('/html/body/div/main/div[2]/a');
        const [clicktryAgain] = await page.$x('/html/body/div/main/div[2]/a');
        if(clicktryAgain) clicktryAgain.click();
    })
    it(' TC-012 : Nagative | put 30/02/1991 | return String 30/02/1991 was not recognized as a valid DateTime.',async() => {
        await helpers.loadUrl(page,config.baseUrl)
        
        await helpers.typeText(page,'30/02/1991','#Birthday')
        await page.waitForXPath('/html/body/div/main/form/div[2]/input');
        const [calualte] = await page.$x('/html/body/div/main/form/div[2]/input');
        if(calualte) calualte.click();

        var results = await calAge.getTextResults(page)
        console.log(results)
        expect(results).to.equal("String '30/02/1991' was not recognized as a valid DateTime.")
        await page.screenshot({path: `Searchtest-TC012-${date}.png`})

        await page.waitForXPath('/html/body/div/main/div[2]/a');
        const [clicktryAgain] = await page.$x('/html/body/div/main/div[2]/a');
        if(clicktryAgain) clicktryAgain.click();
    })
    it(' TC-013 : Positive | put 30Jan1991 | return You are 28.',async() => {
        await helpers.loadUrl(page,config.baseUrl)
        
        await helpers.typeText(page,'30Jan1991','#Birthday')
        await page.waitForXPath('/html/body/div/main/form/div[2]/input');
        const [calualte] = await page.$x('/html/body/div/main/form/div[2]/input');
        if(calualte) calualte.click();

        var results = await calAge.getTextResults(page)
        console.log(results)
        expect(results).to.equal("You're 28")
        await page.screenshot({path: `Searchtest-TC013-${date}.png`})

        await page.waitForXPath('/html/body/div/main/div[2]/a');
        const [clicktryAgain] = await page.$x('/html/body/div/main/div[2]/a');
        if(clicktryAgain) clicktryAgain.click();
    })
    it(' TC-014 : Positive | put 30JANUARY1991 | return You are 28.',async() => {
        await helpers.loadUrl(page,config.baseUrl)
        
        await helpers.typeText(page,'30JANUARY1991','#Birthday')
        await page.waitForXPath('/html/body/div/main/form/div[2]/input');
        const [calualte] = await page.$x('/html/body/div/main/form/div[2]/input');
        if(calualte) calualte.click();

        var results = await calAge.getTextResults(page)
        console.log(results)
        expect(results).to.equal("You're 28")
        await page.screenshot({path: `Searchtest-TC014-${date}.png`})

        await page.waitForXPath('/html/body/div/main/div[2]/a');
        const [clicktryAgain] = await page.$x('/html/body/div/main/div[2]/a');
        if(clicktryAgain) clicktryAgain.click();
    })
    it(' TC-015 : Positive | put 30 JaN 1991 | return You are 28.',async() => {
        await helpers.loadUrl(page,config.baseUrl)
        
        await helpers.typeText(page,'30 JaN 1991','#Birthday')
        await page.waitForXPath('/html/body/div/main/form/div[2]/input');
        const [calualte] = await page.$x('/html/body/div/main/form/div[2]/input');
        if(calualte) calualte.click();

        var results = await calAge.getTextResults(page)
        console.log(results)
        expect(results).to.equal("You're 28")
        await page.screenshot({path: `Searchtest-TC014-${date}.png`})

        await page.waitForXPath('/html/body/div/main/div[2]/a');
        const [clicktryAgain] = await page.$x('/html/body/div/main/div[2]/a');
        if(clicktryAgain) clicktryAgain.click();
    })
    it(' TC-016 : Positive | put Jan 30 1991 | return You are 28.',async() => {
        await helpers.loadUrl(page,config.baseUrl)
        
        await helpers.typeText(page,'Jan 30 1991','#Birthday')
        await page.waitForXPath('/html/body/div/main/form/div[2]/input');
        const [calualte] = await page.$x('/html/body/div/main/form/div[2]/input');
        if(calualte) calualte.click();

        var results = await calAge.getTextResults(page)
        console.log(results)
        expect(results).to.equal("You're 28")
        await page.screenshot({path: `Searchtest-TC016-${date}.png`})

        await page.waitForXPath('/html/body/div/main/div[2]/a');
        const [clicktryAgain] = await page.$x('/html/body/div/main/div[2]/a');
        if(clicktryAgain) clicktryAgain.click();
    })
    it(' TC-017 : Positive | put 1991 Jan 30 | return You are 28.',async() => {
        await helpers.loadUrl(page,config.baseUrl)
        
        await helpers.typeText(page,'1991 Jan 30','#Birthday')
        await page.waitForXPath('/html/body/div/main/form/div[2]/input');
        const [calualte] = await page.$x('/html/body/div/main/form/div[2]/input');
        if(calualte) calualte.click();

        var results = await calAge.getTextResults(page)
        console.log(results)
        expect(results).to.equal("You're 28")
        await page.screenshot({path: `Searchtest-TC017-${date}.png`})

        await page.waitForXPath('/html/body/div/main/div[2]/a');
        const [clicktryAgain] = await page.$x('/html/body/div/main/div[2]/a');
        if(clicktryAgain) clicktryAgain.click();
    })
    it(' TC-018 : Positive | put 1991 01 30 | return You are 28.',async() => {
        await helpers.loadUrl(page,config.baseUrl)
        
        await helpers.typeText(page,'1991 Jan 30','#Birthday')
        await page.waitForXPath('/html/body/div/main/form/div[2]/input');
        const [calualte] = await page.$x('/html/body/div/main/form/div[2]/input');
        if(calualte) calualte.click();

        var results = await calAge.getTextResults(page)
        console.log(results)
        expect(results).to.equal("You're 281")
        await page.screenshot({path: `Searchtest-TC018-${date}.png`})

        await page.waitForXPath('/html/body/div/main/div[2]/a');
        const [clicktryAgain] = await page.$x('/html/body/div/main/div[2]/a');
        if(clicktryAgain) clicktryAgain.click();
    })
    it(' TC-019 : Positive | put 09 09 9999 | return You are -7980.',async() => {
        await helpers.loadUrl(page,config.baseUrl)
        
        await helpers.typeText(page,'09 09 9999','#Birthday')
        await page.waitForXPath('/html/body/div/main/form/div[2]/input');
        const [calualte] = await page.$x('/html/body/div/main/form/div[2]/input');
        if(calualte) calualte.click();

        var results = await calAge.getTextResults(page)
        console.log(results)
        expect(results).to.equal("You're -7980")
        await page.screenshot({path: `Searchtest-TC018-${date}.png`})

        await page.waitForXPath('/html/body/div/main/div[2]/a');
        const [clicktryAgain] = await page.$x('/html/body/div/main/div[2]/a');
        if(clicktryAgain) clicktryAgain.click();
    })
});