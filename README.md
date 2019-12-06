# Echo JS Article Scraper
[Check out the App](https://mem-mongo-scraper.herokuapp.com/saved.html)

## Overview
An app that scrapes articles from echojs.com and lets users save articles and leave comments on them.

## How It Works
- Scrape articles by clicking the "Scrape" button.
- Once articles are loaded, read full article by clicking the link in each article's panel and save articles by clicking the "Save Article" button.
- Saved articles can be viewed at the "Saved Articles" page.
- Notes can be added on saved articles by clicking the "View Notes" button.
- Saved articles can be deleted by clicking the "Delete" button.

![scraper-demo](/public/images/scraper2.gif)


## Technologies Used
- Bootstrap
- jQuery
- Express.js
- MongoDB
- Node.js
    - Node Packages
        - axios
        - cheerio
        - express
        - mongoose
        - morgan
