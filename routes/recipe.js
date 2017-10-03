var express = require('express');
var request = require('request');
var router = express.Router();
const cheerio = require('cheerio');

router.get('/', function(req, res, next) {
var divnum = "Hello";
    
var link = "http://allrecipes.com/recipe/43655/perfect-turkey/?internalSource=hub%20recipe&referringContentType=search%20results&clickId=cardslot%202";    
    
request(link, function (error, response, body) {
      // console.log('error:', error); // Print the error if one occurred
      // console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
      // console.log('body:', body); // Print the HTML for the Google homepage.

const $ = cheerio.load(body);      
var mhead = $('.recipe-summary__h1').text()
var desc = $('.submitter').text()
var ing = $('.heading__h2--gutters.recipe-ingredients__header').text()
var tv = $('.ready-in-time__container').text()
console.log(mhead);
//console.log(desc);
//console.log(ing);
//console.log(tv);

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
    
console.log(recsteps);
    
res.render('recipe', { si : divnum });
});

    });
    
    


module.exports = router;
