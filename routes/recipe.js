var express = require('express');
var request = require('request');
var router = express.Router();
const cheerio = require('cheerio');

router.get('/', function(req, res, next) {
  var divnum = "Hello";

var link="http://"+req.query.url;

  request(link, function (error, response, body) {
    const $ = cheerio.load(body);
    var currentRecipe = new Object();
    var mhead = $('.recipe-summary__h1').text()
    var rname = $('.submitter__name').text()
    var desc = $('.submitter__description').text()
    // var imageurl = $('.hero-photo__wrap').find('img').attr("src");
    var imageurl = req.query.img;
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

    currentRecipe.item=mhead.trim();
    currentRecipe.imageurl=imageurl.trim();
    currentRecipe.rname=rname.trim();
    currentRecipe.desc=desc.trim();
    currentRecipe.ingredients=ingredients;
    currentRecipe.prepTime=prepTime.trim();
    currentRecipe.cookTime=cookTime.trim();
    currentRecipe.readyTime=readyTime.trim();
    currentRecipe.steps=recsteps;

    res.render('recipe', {title: currentRecipe.item,  si : currentRecipe });
  });

});
module.exports = router;
