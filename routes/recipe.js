var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
var s = req.body.s;
console.log("URL: "+s);
var divnum = "Hello";

res.render('recipe', { si : divnum });
});

module.exports = router;