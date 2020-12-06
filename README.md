# PS5 Portal
This task is assigned by Professor Cor-Paul Bezemer of the University of Alberta to evaluate candidates for the ASGAARD lab.

## The Task
I like reading CNN news and Twitter, however I do not like their website. There is too much noise which takes away from the real content - Playstation 5!

I would like to see the titles of the 25 latest articles about (i.e., with the name in the article) PS5 and the 25 latest tweets on one page, so that I can easily keep track of the news about this console. If there are less than 25, just show the ones that are available. In addition, I would like to be able to read the full articles/posts in a convenient way. 

In the next 48 hours, can you build the following:
* A crawler that crawls the latest 25 articles about PS5 from CNN.com and the latest 25 tweets from the PS5 Twitter account
* A simple website that displays the titles of the crawled information
* A convenient way of displaying the information after I click on one of the titles
* **Do an additional cool thing with the data (please explain what you did in your documentation)**

You can use the programming language and tools that are convenient for you. Please keep track of your progress and all your code inside a GitHub repository.

After you finish, please share with me:
* The URL of the GitHub repository
* A zipped copy of the website on which I can view the output (or even better, a link to the website)

Note that this assignment is not about being the fastest to finish! You will get bonus points for creativity and the quality of your code and documentation.

## Solution
I have used https://edition.cnn.com/search?q=playstation+5&size=25 to get the latest 25 articles about PS5 from CNN.com and https://twitter.com/Ps5_New to get the latest 25 tweets from the PS5 Twitter account. Since there is no official Twitter account for PS5, just picked one account related to PS5.

I have created a server to scrap data from the pages. A headless browser, puppeteer, has been used to scrap the pages. The data is processed and prepared for the UI in the server and sent to the client. 

### Additional feature
I have added another list of tweets having hashtag #PS5 in the tweet. As a Twitter user and PlayStation 5 lover, what others near you are talking about PlayStation 5 may add some value to you. Here, *Near You* is a location based search filter of Twitter. So, the page I scraped is https://twitter.com/hashtag/ps5?lang=en&lf=on. The list is also visible in the landing page.

### Languages and Frameworks
#### Backend
* Node.js

#### Frontend
* JavaScript
* Angular
* HTML
* CSS

### ‎Techniques
* Web Scraping

### Dependencies
* [puppeteer](https://github.com/puppeteer/puppeteer): To control a headless Chrome browser programmatically and extract data smoothly and fast.

### Challenges/Problems Faced
* APIs are available but not easily consumable!
* CNN developer website is buggy
* I am new in scraping

## System Requirement
* `Node.js v12.19.0`. It may also work with slightly older versions of Node.

## How to Run
### 1. Get the repository
* Clone the repository with git command. 
```
git clone https://github.com/tajkiatoma/ps5-portal
```
* Alternatively, download the repository from [here](https://github.com/tajkiatoma/ps5-portal/archive/master.zip).

### 2. Go to repository directory
Open a command line interface (CLI) inside the `ps5-portal` directory for the next steps.

### 3. Install dependencies
Run `npm install` in the CLI to install all the node packages necessary for the app.

### 4. Run server 
Run `node server\server.js` in the CLI to start the server.

### 5. Run client: 
Run `npm start` in another CLI to start the client.

## Visit the Page
--- add the url