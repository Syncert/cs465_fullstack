var fs = require('fs');
const data = JSON.parse(fs.readFileSync('./data/news.json', 'utf8'));

var latestNewsData = data.latest_news;
var vacationTipsData = data.vacation_tips;
var newsArticleData = data.news_article;

/* GET news */
const news = (req,res) => {
    res.render('news', { 
        title: "Travlr Getaways", 
        latestNewsData,
        vacationTipsData,
        newsArticleData
    });
};

module.exports = {
    news
}