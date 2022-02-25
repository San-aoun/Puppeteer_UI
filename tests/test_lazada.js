const puppeteer = require('puppeteer')
const expect = require('chai').expect

const config = require('../lib/config')
const helpers = require('../lib/helpers')
const homepageObject = require('../page-object/home-page')

describe('Lazada',() => {
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

    describe('Lazada homepage',() => {
        it('should navigate to homepage',async() => {
            await helpers.loadUrl(page,config.baseUrl)
            //await helpers.shouldExist(page,homepageObject.actionHeader)
        })
        /*it('should click catagory link',async() =>{
            debugger;
            await helpers.shouldExist(page,homepageObject.catagoryElectronicMenu)
            await helpers.click(page,homepageObject.catagoryElectronicMenu)
            await page.screenshot({path: 'Searchtest01.png'})
            //await page.pdf({path: "output.pdf", format: 'A4'})
        })
        it('Get link sub-catagory',async() => {
            await helpers.shouldExist(page,homepageObject.subCatagoryElectronicMenu)
            const numberoflink = await helpers.getCount(page,homepageObject.subCatagoryElectronicMenu)
            expect(numberoflink).to.equal(10)
        })
        it('Get text sub-catagory',async() => {
            await helpers.shouldExist(page,homepageObject.subCatagoryElectronicMenu)
            const element = await page.$(homepageObject.subCatagoryElectronicMenu);
            const text = await page.evaluate(element => element.textContent, element);
        })*/
    })
})