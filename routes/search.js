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

  var urlinfo = {"s1": s1, "s2": s2, "s3": s3, "img": img };
  var recipes = [];
  var link = "http://allrecipes.com/search/results/?wt=" + s1;

    request(link, function (error, response, body) {
      // console.log('error:', error); // Print the error if one occurred
      // console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
      // console.log('body:', body); // Print the HTML for the Google homepage.

      if (!error && response.statusCode == 200) {
      var $ = cheerio.load(body);
      $('article.grid-col--fixed-tiles').each(function(i, element){
        if(!($(this).hasClass('hub-card') || $(this).hasClass('video-card')) && !($(this).next().hasClass('article-card'))){
          var recipe = new Object();
	        var a = $(this).find('h3').text();
          var imageurl = $(this).find('img').attr("data-original-src");
          var text = $(this).find('div.rec-card__description').text();
          var recipeby = $(this).find('ul.cook-details').find('li').find('h4').text();
          var nextlink = "allrecipes.com" + $(this).find('a').attr("href");
          //console.log(imageurl);
          //console.log(text);
          //console.log(recipeby);
          //console.log(nextlink);

          if(!!a && !!imageurl && !!text && !!recipeby && !!nextlink){
            recipe.name = a.trim();
            recipe.imageurl = imageurl.trim();
            recipe.text = text.trim();
            recipe.recipeby = recipeby.trim();
            recipe.nextlink = nextlink.trim();
            //console.log("Recipe "+i+". "+recipe.name);
            //console.log("image url = "+recipe.imageurl);
	    recipes.push(recipe);
          }
        }
      });
      // console.log(recipes);
    }
    // console.log(recipes);
    res.render('search', {'recipes': recipes, 'urlinfo': urlinfo});
});
});

module.exports = router;
