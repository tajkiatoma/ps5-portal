const http = require('http');
const puppeteer = require('puppeteer');

async function scrapCnn() {
    try {
        const browser = await puppeteer
            .launch();
        const page = await browser.newPage();

        await page.goto('https://edition.cnn.com/search?q=playstation+5&size=25', { timeout: 3000000 });
        await page.waitForSelector('body');

        let grabArticles = await page.evaluate(() => {
            let $articleList = document.querySelectorAll('.cnn-search__result-contents');

            let articles = [];
            $articleList.forEach(article => {
                let $link = article.querySelector("a");
                let $date = article.querySelector(".cnn-search__result-publish-date span:nth-child(2)");
                let $detail = article.querySelector(".cnn-search__result-body");
                articles.push({
                    title: $link.innerHTML,
                    url: $link.getAttribute("href"),
                    date: $date.innerHTML,
                    detail: $detail.innerHTML
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

        await page.goto('https://twitter.com/PlayStationCA', { timeout: 3000000 });
        await page.setViewport({
            width: 1200,
            height: 2800
        });
        await page.waitForSelector('article');
        await autoScroll(page);

        let results = await page.$$eval('article', ($tweetList) => {
            let tweets = $tweetList.map((tweet) => {
                let $title = tweet.querySelector("div[lang]");
                let $link = tweet.querySelector("a[dir]");
                let $date = tweet.querySelector("time");
                let $detail = tweet.querySelector("div[data-testid='tweet']>div:nth-of-type(2)>div:nth-of-type(2)>div[aria-label]");
                return {
                    title: $title.textContent ,
                    url: 'https://twitter.com' + $link.getAttribute("href"),
                    date: $date.innerHTML,
                    detail: $detail.getAttribute("aria-label")
                };
            });
            return tweets.length > 25 ? tweets.slice(0, 25) : tweets;
        });

        await browser.close();
        return results;
    } catch (err) {
        console.error(err);
    }
}

async function scrapOtherTweets() {
    try {
        const browser = await puppeteer.launch({ headless: true });
        const page = await browser.newPage();

        await page.goto('https://twitter.com/hashtag/ps5?lang=en&lf=on', { timeout: 3000000 });
        await page.setViewport({
            width: 1200,
            height: 2000
        });
        await page.waitForSelector('article');
        await autoScroll(page);

        let results = await page.$$eval('article', ($tweetList) => {
            let tweets = $tweetList.map((tweet) => {
                let $title = tweet.querySelector("div[lang]");
                let $link = tweet.querySelector("a[dir]");
                let $date = tweet.querySelector("time");
                let $detail = tweet.querySelector("div[data-testid='tweet']>div:nth-of-type(2)>div:nth-of-type(2)>div[aria-label]");
                let $user = {
                    name: tweet.querySelector("div[data-testid='tweet']>div:nth-of-type(2)>div>div>div>div>div>a>div>div"),
                    username: tweet.querySelector("div[data-testid='tweet']>div:nth-of-type(2)>div>div>div>div>div>a>div>div:nth-child(2)"),
                    profileLink: tweet.querySelector("div[data-testid='tweet']>div:nth-of-type(2)>div>div>div>div>div>a").getAttribute("href"),
                    profileImg: tweet.querySelector("div[data-testid='tweet'] div img").getAttribute("src")
                }
                
                return {
                    title: $title.textContent ,
                    url: 'https://twitter.com' + $link.getAttribute("href"),
                    date: $date.innerHTML,
                    detail: $detail.getAttribute("aria-label"),
                    postedBy: $user
                };
            });
            return tweets.length > 10 ? tweets.slice(0, 10) : tweets;
        });

        await browser.close();
        return results;
    } catch (err) {
        console.error(err);
    }
}

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
    else if (req.url == "/other") {
        let tweets = await scrapOtherTweets()

        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.write(JSON.stringify(tweets));
        res.end();
    }
    else
        res.end('Invalid Request!');
});

server.listen(5000);
console.log('Node.js web server at port 5000 is running..')
/* scrapOtherTweets().then(function (data) {
    console.log(data);
}) */
