const http = require('http');
const puppeteer = require('puppeteer');

var server = http.createServer( async (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://127.0.0.1:8080');
    if (req.url == "/cnn") {
        let cnnPosts = await scrapCnn()

        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.write(JSON.stringify(cnnPosts));
        res.end();
    }
    else if (req.url == "/twitter") {
        let tweets = await scrapTwitter()

        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.write(JSON.stringify(tweets));
        res.end();
    }
    else
        res.end('Invalid Request!');

})

server.listen(5000);

console.log('Node.js web server at port 5000 is running..')


async function scrapCnn() {
    try {
        const browser = await puppeteer
            .launch();
        const page = await browser.newPage();
        await page.goto('https://edition.cnn.com/search?q=playstation+5&size=25');
        await page.waitForSelector('body');

        let grabArticles = await page.evaluate(() => {
            let $articleList = document.querySelectorAll('.cnn-search__result-contents');

            articles = [];
            $articleList.forEach(article => {
                let $link = article.querySelector("a");
                let $date = article.querySelector(".cnn-search__result-publish-date span:nth-child(2)");
                articles.push({
                    title: $link.innerHTML,
                    url: $link.getAttribute("href"),
                    date: $date.innerHTML
                });
            });

            return articles;
        });
        await browser.close();
        return grabArticles;
    } catch (err) {
        console.error(err);
    }
}

async function scrapTwitter() {
    try {
        
    } catch (err) {
        console.error(err);
    }
}