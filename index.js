const axios = require('axios');
const cheerio = require('cheerio');

async function getNewsHeadlines(url) {
    try {
        const { data } = await axios.get(url, {
            headers: { "User-Agent": "Mozilla/5.0" }
        });
        const $ = cheerio.load(data);
        const headlines = [];

        $('h3').each((i, elem) => {  // Adjust this based on the website's structure
            const headline = $(elem).text().trim();
            if (headline) {
                headlines.push(headline);
            }
        });
        
        return headlines;
    } catch (error) {
        console.error(`Error fetching the URL: ${error.message}`);
        return [];
    }
}

(async () => {
    const newsUrl = "https://www.bbc.com/news"; // Change this to any news website
    const headlines = await getNewsHeadlines(newsUrl);

    if (headlines.length) {
        console.log("Top News Headlines:");
        headlines.slice(0, 10).forEach((headline, index) => {
            console.log(`${index + 1}. ${headline}`);
        });
    } else {
        console.log("No headlines found.");
    }
})();
