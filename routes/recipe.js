var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
var url = req.query.url;
console.log("URL: "+url);
var divnum = "Hello";

res.render('recipe', { si : divnum });
});

module.exports = router;
