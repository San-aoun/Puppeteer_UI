const puppeteer = require('puppeteer');

let browser = null;
let page = null;

/* Constants */
const BASE_URL = 'https://amazon.com/';

const amazon = {

    initialize: async () => {
        console.log('Starting the scraper..');

        browser = await puppeteer.launch({
            headless: false
        })
        
        page = await browser.newPage();

        await page.goto(BASE_URL, { waitUntil: 'networkidle2' });

        console.log('Initialization completed..');
    },

    end: async () => {
        console.log('Stopping the scraper..');
        
        await browser.close();
    },
    getBookDetails: async(page) => {
        try {
            console.log('Get detail JJ.R martin')
            await page.waitFor(1000);
            var details = await page.evaluate(() => {
            
                let title = document.querySelector('#productTitle').innerText;
                //let manufacturer = $('#bylineInfo').text().replace(" ","").replace("\n","");
                let currentPrice = $('#priceblock_ourprice,#priceblock_dealprice').text()
                let rating = $('#acrCustomerReviewText').text()
                let totalRatings = $('#acrPopover').attr('title')
                
                return {
                    Title : title,
                    CurrentPrice : currentPrice,
                    Rating : rating,
                    TotalRatings : totalRatings
                }


            });
            return details;
            
        } catch (error) {
            
        }
        

        
    },
    getPrice: async(page) => {
        try {
            await page.waitFor(1000);
            var details = await page.evaluate(() => {
            
                let digitalPrice = jQuery("tr.digital-list-price").text()
                let printPrice = jQuery("tr.print-list-price").text()
                let currentPrice = jQuery("tr.kindle-price").text()
                
                return {
                    DigitalPrice : "document.querySelector('#a-autoid-10-announce > span > span').innerText",
                    PrintPrice : 'document.querySelector("tr.print-list-price").innerText',
                    CurrentPrice : 'document.querySelector("tr.kindle-price").innerText'
                }


            });
            var tt = document.querySelector("#a-autoid-10-announce > span > span").innerText;
            console.log(tt)
            console.log('tt')
            return details;
        } catch (error) {
            
        }
    },
    getProductDetails: async (page) => {
        try {
            console.log(`Going to the Product Page.. Product`);

            //await page.goto(link, { waitUntil: 'networkidle2' });
            
            await page.waitFor(2000)
            let details = await page.evaluate(() => {
                
                let title = document.querySelector('#productTitle').innerText;
                let manufacturer = document.querySelector('#bylineInfo').innerText;
                let currentPrice = document.querySelector('#priceblock_ourprice,#priceblock_dealprice').innerText;
                let rating = document.querySelector('#acrPopover').getAttribute('title');
                let totalRatings = document.querySelector('#acrCustomerReviewText').innerText;
                
                //console.log('test');
                //console.log('another test message');

                return {
                    Title : title,
                    //manufacturer: manufacturer,
                    //currentPrice: currentPrice,
                    //rating: rating,
                    //totalRatings: totalRatings
                }
            });
            console.log(details)
            return details;

            } catch (error) {
                
            }
        
        
    },

}

module.exports = amazon;