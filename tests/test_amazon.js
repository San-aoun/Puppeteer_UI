const puppeteer = require('puppeteer');
const expect = require('chai').expect;

const config = require('../lib/config');
const helpers = require('../lib/helpers');
const amazon = require('../page-object/amazon');

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

describe('Amazon homepage',() => {
    // variable //
    var date = Date.now()

    it('go to URL',async() => {
        await helpers.loadUrl(page,config.baseUrl)
    }),
    it('Search gatagory product : Searching BOOKs of "George R. R. Martin" ',async() => {
        await page.select('#searchDropdownBox','search-alias=stripbooks-intl-ship') 
        await page.type('#twotabsearchtextbox','George R. R. Martin')
        await page.click('.nav-input')

        // keep photo and keep all data at PDF
        await page.screenshot({path: `SearchtestA-${date}.png`})
        await page.pdf({path: `outputA-${date}.pdf`, format: 'A4'})
    })
    it('Choose the book "The World of Ice & Fire: The Untold History of Westeros and the Game of Thrones" ',async()=>{

        await page.waitForXPath('//span[contains(text(),"The World of Ice & Fire: The Untold History of Westeros and the Game of Thrones")]');
        const [book] = await page.$x('//span[contains(text(),"The World of Ice & Fire: The Untold History of Westeros and the Game of Thrones")]');
        if(book) book.click();
        await page.screenshot({path: `SearchtestA1-${date}.png`})

    })
    it('Check Detail about this book', async() => {
        await page.waitFor(1000);
        await page.waitForSelector('#productTitle')
        
        const titleDetail = await amazon.getBookDetails(page)
        console.log(titleDetail)
        expect(titleDetail.Title).to.equal("The World of Ice & Fire: The Untold History of Westeros and the Game of Thrones")
        expect(titleDetail.Rating).to.equal("2,057 customer reviews")
        expect(titleDetail.TotalRatings).to.equal("4.6 out of 5 stars")

        // keep photo and keep all data at PDF
        await page.screenshot({path: `SearchtestB-${date}.png`})
        await page.pdf({path: `outputB-${date}.pdf`, format: 'A4'})
    })
    it('Buy a book : The World of Ice & Fire',async() =>{
        await page.waitFor(1000)
        await page.waitForXPath('//*[@id="a-autoid-0-announce"]');
        const [kindle] = await page.$x('//*[@id="a-autoid-0-announce"]');
        if(kindle) kindle.click();

        const priceDetail = await amazon.getPrice(page)
        console.log(priceDetail)

        // keep photo and keep all data at PDF
        await page.screenshot({path: `SearchtestC-${date}.png`})
        await page.pdf({path: `outputC-${date}.pdf`, format: 'A4'})

    })
    it('Sign in for buy a book', async() =>{
        await page.waitFor(1000)
        await page.waitForSelector('#one-click-button')
        await page.click('#one-click-button')
        await page.screenshot({path: `SearchtestD-${date}.png`})

        await page.waitForSelector('#ap_email')
        await page.type('#ap_email','Piyathida_s101@hotmail.com')
        await page.screenshot({path: `SearchtestD1-${date}.png`})

        await page.click('#continue')
        await page.waitForSelector('#ap_password')
        await page.type('#ap_password','123456San')
        await page.click('#signInSubmit')


        await page.screenshot({path: `SearchtestD2-${date}.png`})
    })

})