var express = require('express');
var request = require('request');
var router = express.Router();
const cheerio = require('cheerio');

router.get('/', function(req, res, next) {
  var divnum = "Hello";

  //var link = "http://allrecipes.com/recipe/7565/too-much-chocolate-cake/?internalSource=hub%20recipe&referringContentType=search%20results&clickId=cardslot%202";
  var link = "http://"+req.query.url;

  request(link, function (error, response, body) {
    // console.log('error:', error); // Print the error if one occurred
    // console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
    // console.log('body:', body); // Print the HTML for the Google homepage.

    const $ = cheerio.load(body);
    var currentRecipe = new Object();
    var mhead = $('.recipe-summary__h1').text()
    var desc = $('.submitter').text()
    var imageurl = $('.hero-photo__wrap').find('img').attr("src");
    var prepTime = $('.prepTime__item').find('[itemprop="prepTime"]').text()
    var cookTime = $('.prepTime__item').find('[itemprop="cookTime"]').text()
    var readyTime = $('.prepTime__item').find('[itemprop="totalTime"]').text()


    var ingredients = [];
    var yt = $('section.recipe-ingredients');
    $(yt).find('ul').each(function(i,element){
      $(this).find('li').each(function(i, element){
        var a = $(this).find('span.recipe-ingred_txt').text().trim();
        if(!!a && a!="Add all ingredients to list")
        ingredients.push(a);
      });

    });

    var recsteps = [];
    $('.directions--section__steps').find('li').each(function(i, element){
      var a = $(this).find('span.recipe-directions__list--item').text().trim();
      if(!!a)
      recsteps.push(a);
    });

    console.log(mhead);
    console.log(imageurl);
    console.log(desc);
    console.log(ingredients);
    console.log(prepTime);
    console.log(cookTime);
    console.log(readyTime);
    console.log(recsteps);

    currentRecipe.item=mhead.trim();
    currentRecipe.imageurl=imageurl.trim();
    currentRecipe.desc=desc.trim();
    currentRecipe.ingredients=ingredients;
    currentRecipe.prepTime=prepTime.trim();
    currentRecipe.cookTime=cookTime.trim();
    currentRecipe.readyTime=readyTime.trim();
    currentRecipe.steps=recsteps;

    res.render('recipe', { si : currentRecipe });
  });

});
module.exports = router;
