const puppeteer = require(`puppeteer`)
const ora = require(`ora`)
const chalk = require(`chalk`)
const fs = require(`fs`)
var final_cb;

function scrape_insta(name , cb) {
  console.log('called insta for', name);
  var res_obj = {'name' : 'some insta name'};
  start(name);
  final_cb = cb;
  console.log('test',final_cb);
}




    async function start(name) {
        //this.spinner.text = chalk.yellow(`Scraping url: https://www.instagram.com/narendramodi/?hl=en`)
        browser = await puppeteer.launch({args: ['--no-sandbox']});
        page = await browser.newPage()

        await page.goto('https://www.google.com/search?q='+name.split(' ').join('+')+'+instagram');
        await page.waitForSelector('h3.LC20lb', {timeout: 10000});
        var node = await page.evaluate(() => {
            let elements = document.querySelectorAll('h3.LC20lb')
            return elements[0].parentElement.getAttribute('href');
        });

        await page.setExtraHTTPHeaders({
            'Accept-Language': 'en-US'
        })

        await page.goto(node, {
            waitUntil: `networkidle0`
        })

        if (await page.$(`.dialog-404`)) {
            //this.spinner.fail(`The url you followed may be broken`);
            process.exit()
        }

        //this.spinner.succeed(chalk.green(`Valid page found`))
        //this.spinner.start()
        evaluate();
    }

    async function evaluate() {
        console.log('called evaluate');
        try {
            items = await load(100)
        } catch (error) {
            console.log('error');
            //this.spinner.fail(`There was a problem parsing the page`)
            process.exit()
        }
        //this.spinner.succeed(chalk.green(`Scraped ${this.items.size} posts`))
        buildJSON()
        await page.close()
        await browser.close()
    }

    async function load(maxItemsSize) {
        console.log('called load');
        maxItemsSize = maxItemsSize
        // var page = this.page
        let previousHeight
        var media = new Set()
        var index = `.`

        while (maxItemsSize == null || media.size < maxItemsSize) {
            try {
                previousHeight = await page.evaluate(`document.body.scrollHeight`)
                await page.evaluate(`window.scrollTo(0, document.body.scrollHeight)`)
                await page.waitForFunction(`document.body.scrollHeight > ${previousHeight}`)
                await page.waitFor(1000)
               // this.spinner.text = chalk.yellow(`Scrolling${index}`)

                const nodes = await page.evaluate(() => {
                    const images = document.querySelectorAll(`a > div > div.KL4Bh > img`)
                    return [].map.call(images, img => img.src)
                })

                nodes.forEach(element => {
                    if (media.size < maxItemsSize) {
                        media.add(element)
                    }
                })

                index = index + `.`
            }
            catch (error) {
                console.error(error)
                break
            }
        }
        return media
    }

    function buildJSON() {
        console.log('called buildjson');
        var tmp = [];
        var count = 0;
        var limit = 20;
        items.forEach(url => {
          count++;
          if(count <= limit) {
            tmp.push({
                "thumbnail_src": url,
                "accessibility_caption": ""
            })
          }
        })
        //console.log(JSON.stringify(tmp));
        if(final_cb)
          final_cb({'data':tmp});
    }

    module.exports = {
      scrape_insta : scrape_insta
    }
