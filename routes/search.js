var express = require('express');
var router = express.Router();
var request = require('request');
const cheerio = require('cheerio');

/* GET home page. */
router.get('/', function(req, res, next) {
  var s1 = req.query.s1;
  var s2 = req.query.s2;
  var s3 = req.query.s3;
  var img = req.query.img;

  var link = "http://allrecipes.com/search/results/?wt=" + s1;

    request(link, function (error, response, body) {
      // console.log('error:', error); // Print the error if one occurred
      // console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
      // console.log('body:', body); // Print the HTML for the Google homepage.

      if (!error && response.statusCode == 200) {
      var $ = cheerio.load(body);
      $('article.grid-col--fixed-tiles').each(function(i, element){
        if(!($(this).hasClass('hub-card') || $(this).hasClass('video-card')) && !($(this).next().hasClass('article-card'))){
          var a = $(this).find('h3').text();
          if(!!a){
            var recipe_name = a.trim()
            console.log("Recipe "+i+". "+recipe_name);  
          }
        }
      });
    }
    });

    res.render('search', {'img': img});
});

module.exports = router;
