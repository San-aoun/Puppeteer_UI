const puppeteer = require('puppeteer');
const helpers = require('../lib/helpers');

const calAge = {

    getTextResults: async(page) => {
        try {
            await page.waitFor(500)
            var details = await page.evaluate(() => {          
                return document.querySelector('.text-center ').innerText;

            });
            //await page.waitFor(500)
            return details;
            
        } catch (error) {
            
        }
        

        
    },
 

}

module.exports = calAge;