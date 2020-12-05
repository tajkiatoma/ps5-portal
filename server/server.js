const http = require('http');
const puppeteer = require('puppeteer');

var server = http.createServer(async (req, res) => {
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

async function scrapCnn() {
    try {
        const browser = await puppeteer
            .launch();
        const page = await browser.newPage();
        await page.goto('https://edition.cnn.com/search?q=playstation+5&size=25', { timeout: 60000 });
        await page.waitForSelector('body');

        let grabArticles = await page.evaluate(() => {
            let $articleList = document.querySelectorAll('.cnn-search__result-contents');

            let articles = [];
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

async function autoScroll(page) {
    await page.evaluate(async () => {
        await new Promise((resolve, reject) => {
            var distance = 800;
            var timerCount = 20;
            var timer = setInterval(() => {
                window.scrollBy(0, distance);

                if (timerCount == 0) {
                    clearInterval(timer);
                    resolve();
                }
                timerCount--;
            }, 100);
        });
    });
}

async function scrapTwitter() {
    try {
        const browser = await puppeteer.launch({ headless: true });
        const page = await browser.newPage();

        await page.goto('https://twitter.com/PlayStationCA', { timeout: 60000 });
        await page.setViewport({
            width: 1200,
            height: 2800
        });
        await page.waitForSelector('article');
        await autoScroll(page);

        let results = await page.$$eval('article div[lang]', ($tweetList) => {
            let tweets = $tweetList.map((tweet) => {
                return {
                    title: tweet.textContent/* ,
                    url: $link.getAttribute("href"),
                    date: $date.innerHTML */
                };
            });
            return tweets;
        });

        await browser.close();
        return results;
    } catch (err) {
        console.error(err);
    }
}

server.listen(5000);
console.log('Node.js web server at port 5000 is running..')
/* scrapTwitter().then(function (data) {
    console.log(data);
}) */
