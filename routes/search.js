var express = require('express');
var router = express.Router();
var request = require('request');

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


    });

    res.render('search', {'img': img});
});

module.exports = router;
