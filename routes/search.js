var express = require('express');
var router = express.Router();
var request = require('request');

/* GET home page. */
router.post('/', function(req, res, next) {

  var response = [
    {
      "mid": "/m/0cjtln",
      "locale": "",
      "description": "pulled pork",
      "score": 0.8614763617515564,
      "confidence": 0,
      "topicality": 0,
      "boundingPoly": null,
      "locations": [],
      "properties": []
    },
    {
      "mid": "/m/0c3y3jd",
      "locale": "",
      "description": "slider",
      "score": 0.8374393582344055,
      "confidence": 0,
      "topicality": 0,
      "boundingPoly": null,
      "locations": [],
      "properties": []
    },
    {
      "mid": "/m/07pt9wt",
      "locale": "",
      "description": "appetizer",
      "score": 0.7889784574508667,
      "confidence": 0,
      "topicality": 0,
      "boundingPoly": null,
      "locations": [],
      "properties": []
    },
    {
      "mid": "/m/05z6fm",
      "locale": "",
      "description": "beef on weck",
      "score": 0.7591284513473511,
      "confidence": 0,
      "topicality": 0,
      "boundingPoly": null,
      "locations": [],
      "properties": []
    },
    {
      "mid": "/m/0l515",
      "locale": "",
      "description": "sandwich",
      "score": 0.6702234148979187,
      "confidence": 0,
      "topicality": 0,
      "boundingPoly": null,
      "locations": [],
      "properties": []
    },
    {
      "mid": "/m/0cc7bks",
      "locale": "",
      "description": "buffalo burger",
      "score": 0.6582993865013123,
      "confidence": 0,
      "topicality": 0,
      "boundingPoly": null,
      "locations": [],
      "properties": []
    },
    {
      "mid": "/m/0bp3f6m",
      "locale": "",
      "description": "fried food",
      "score": 0.6489384770393372,
      "confidence": 0,
      "topicality": 0,
      "boundingPoly": null,
      "locations": [],
      "properties": []
    },
    {
      "mid": "/m/0cdn1",
      "locale": "",
      "description": "hamburger",
      "score": 0.6443697810173035,
      "confidence": 0,
      "topicality": 0,
      "boundingPoly": null,
      "locations": [],
      "properties": []
    },
    {
      "mid": "/m/01z1jf2",
      "locale": "",
      "description": "american food",
      "score": 0.6412472128868103,
      "confidence": 0,
      "topicality": 0,
      "boundingPoly": null,
      "locations": [],
      "properties": []
    },
    {
      "mid": "/m/02wbm",
      "locale": "",
      "description": "food",
      "score": 0.6021155118942261,
      "confidence": 0,
      "topicality": 0,
      "boundingPoly": null,
      "locations": [],
      "properties": []
    },
    {
      "mid": "/m/02q08p0",
      "locale": "",
      "description": "dish",
      "score": 0.5973641276359558,
      "confidence": 0,
      "topicality": 0,
      "boundingPoly": null,
      "locations": [],
      "properties": []
    },
    {
      "mid": "/m/0119x1zy",
      "locale": "",
      "description": "bun",
      "score": 0.5898458957672119,
      "confidence": 0,
      "topicality": 0,
      "boundingPoly": null,
      "locations": [],
      "properties": []
    },
    {
      "mid": "/m/0b3dyl",
      "locale": "",
      "description": "finger food",
      "score": 0.5897143483161926,
      "confidence": 0,
      "topicality": 0,
      "boundingPoly": null,
      "locations": [],
      "properties": []
    },
    {
      "mid": "/m/07fjx2",
      "locale": "",
      "description": "vetkoek",
      "score": 0.5624228715896606,
      "confidence": 0,
      "topicality": 0,
      "boundingPoly": null,
      "locations": [],
      "properties": []
    },
    {
      "mid": "/m/04scj",
      "locale": "",
      "description": "meat",
      "score": 0.5404865741729736,
      "confidence": 0,
      "topicality": 0,
      "boundingPoly": null,
      "locations": [],
      "properties": []
    },
    {
      "mid": "/m/0p57p",
      "locale": "",
      "description": "recipe",
      "score": 0.5130674839019775,
      "confidence": 0,
      "topicality": 0,
      "boundingPoly": null,
      "locations": [],
      "properties": []
    }
  ];

var isFood = false;

for(i in response){
  console.log(response[i].description);
  if(response[i].description == "food"){
    isFood = true;
    break;
  }
}

if(isFood){
  var searchTerm = response[0].description;

var link = "http://allrecipes.com/search/results/?wt=" + searchTerm;

  request(link, function (error, response, body) {
    console.log('error:', error); // Print the error if one occurred
    console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
    console.log('body:', body); // Print the HTML for the Google homepage.
  });


  res.json({"Food": true});
}else{

  // TODO: Show Error
  res.json({"Food": false});
}

res.json({"Food":"err"})
    // res.json(response);
});

module.exports = router;
