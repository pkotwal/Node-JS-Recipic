var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var fs = require('fs');
var request = require('request');
var hbs = require('hbs');

const Vision = require('@google-cloud/vision');
const vision = Vision({keyFilename: './Recipe-finder-7e177e422ad4.json'
});

const fileName = './public/images/test1.jpeg';

var multer  = require('multer');
// var upload = multer({ storage: multer.memoryStorage() });
var upload = multer({ dest: './public/images/' });

var index = require('./routes/index');
var users = require('./routes/users');
var search = require('./routes/search');
var recipe = require('./routes/recipe');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

hbs.registerPartials(__dirname + '/views/partials');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/users', users);
app.use('/search', search);
app.use('/recipe', recipe);

app.get('/uploads/:imageUrl', function(req, res){
  console.log(req.params.imageUrl);
  res.sendFile(path.resolve(path.resolve(__dirname,"/uploads/"+req.params.imageUrl)));
});

app.post('/upload-file-ajax', upload.single('ajaxfile'), function(req, res) {
  if (!req.file) {
    res.status(500).send('error: no file');
  }

  if(req.file.mimetype.indexOf('image') == -1){
    // console.log('Not an Image');
    res.json({'Error': 'Not an Image'});
  }else{
    var request ={
              "image": {
                "source": {
                  "filename": req.file.path
                }
              },
              "features": [
                {
                  "type": "LABEL_DETECTION",
                  "maxResults": 100
                }
              ]
            };

    vision.annotateImage(request)
      .then((results) => {
        const response = results[0].labelAnnotations;


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
        var other1 = response[1].description;
        var other2 = response[2].description;

        var imgUrl = "images/"+req.file.path.substring(14);
        // console.log();

        res.json({"Food": true, "Search": searchTerm, "Search2": other1, "Search3": other2, "Img": imgUrl});
        }else{

        // TODO: Show Error
        res.json({"Error": "Not Food", "Food": false});
        }

      })
      .catch((err) => {
        console.error('ERROR:', err);
        res.send("Opps Error");
      });
  }



  // var response = [
  //   {
  //     "mid": "/m/0cjtln",
  //     "locale": "",
  //     "description": "pulled pork",
  //     "score": 0.8614763617515564,
  //     "confidence": 0,
  //     "topicality": 0,
  //     "boundingPoly": null,
  //     "locations": [],
  //     "properties": []
  //   },
  //   {
  //     "mid": "/m/0c3y3jd",
  //     "locale": "",
  //     "description": "slider",
  //     "score": 0.8374393582344055,
  //     "confidence": 0,
  //     "topicality": 0,
  //     "boundingPoly": null,
  //     "locations": [],
  //     "properties": []
  //   },
  //   {
  //     "mid": "/m/07pt9wt",
  //     "locale": "",
  //     "description": "appetizer",
  //     "score": 0.7889784574508667,
  //     "confidence": 0,
  //     "topicality": 0,
  //     "boundingPoly": null,
  //     "locations": [],
  //     "properties": []
  //   },
  //   {
  //     "mid": "/m/05z6fm",
  //     "locale": "",
  //     "description": "beef on weck",
  //     "score": 0.7591284513473511,
  //     "confidence": 0,
  //     "topicality": 0,
  //     "boundingPoly": null,
  //     "locations": [],
  //     "properties": []
  //   },
  //   {
  //     "mid": "/m/0l515",
  //     "locale": "",
  //     "description": "sandwich",
  //     "score": 0.6702234148979187,
  //     "confidence": 0,
  //     "topicality": 0,
  //     "boundingPoly": null,
  //     "locations": [],
  //     "properties": []
  //   },
  //   {
  //     "mid": "/m/0cc7bks",
  //     "locale": "",
  //     "description": "buffalo burger",
  //     "score": 0.6582993865013123,
  //     "confidence": 0,
  //     "topicality": 0,
  //     "boundingPoly": null,
  //     "locations": [],
  //     "properties": []
  //   },
  //   {
  //     "mid": "/m/0bp3f6m",
  //     "locale": "",
  //     "description": "fried food",
  //     "score": 0.6489384770393372,
  //     "confidence": 0,
  //     "topicality": 0,
  //     "boundingPoly": null,
  //     "locations": [],
  //     "properties": []
  //   },
  //   {
  //     "mid": "/m/0cdn1",
  //     "locale": "",
  //     "description": "hamburger",
  //     "score": 0.6443697810173035,
  //     "confidence": 0,
  //     "topicality": 0,
  //     "boundingPoly": null,
  //     "locations": [],
  //     "properties": []
  //   },
  //   {
  //     "mid": "/m/01z1jf2",
  //     "locale": "",
  //     "description": "american food",
  //     "score": 0.6412472128868103,
  //     "confidence": 0,
  //     "topicality": 0,
  //     "boundingPoly": null,
  //     "locations": [],
  //     "properties": []
  //   },
  //   {
  //     "mid": "/m/02wbm",
  //     "locale": "",
  //     "description": "food",
  //     "score": 0.6021155118942261,
  //     "confidence": 0,
  //     "topicality": 0,
  //     "boundingPoly": null,
  //     "locations": [],
  //     "properties": []
  //   },
  //   {
  //     "mid": "/m/02q08p0",
  //     "locale": "",
  //     "description": "dish",
  //     "score": 0.5973641276359558,
  //     "confidence": 0,
  //     "topicality": 0,
  //     "boundingPoly": null,
  //     "locations": [],
  //     "properties": []
  //   },
  //   {
  //     "mid": "/m/0119x1zy",
  //     "locale": "",
  //     "description": "bun",
  //     "score": 0.5898458957672119,
  //     "confidence": 0,
  //     "topicality": 0,
  //     "boundingPoly": null,
  //     "locations": [],
  //     "properties": []
  //   },
  //   {
  //     "mid": "/m/0b3dyl",
  //     "locale": "",
  //     "description": "finger food",
  //     "score": 0.5897143483161926,
  //     "confidence": 0,
  //     "topicality": 0,
  //     "boundingPoly": null,
  //     "locations": [],
  //     "properties": []
  //   },
  //   {
  //     "mid": "/m/07fjx2",
  //     "locale": "",
  //     "description": "vetkoek",
  //     "score": 0.5624228715896606,
  //     "confidence": 0,
  //     "topicality": 0,
  //     "boundingPoly": null,
  //     "locations": [],
  //     "properties": []
  //   },
  //   {
  //     "mid": "/m/04scj",
  //     "locale": "",
  //     "description": "meat",
  //     "score": 0.5404865741729736,
  //     "confidence": 0,
  //     "topicality": 0,
  //     "boundingPoly": null,
  //     "locations": [],
  //     "properties": []
  //   },
  //   {
  //     "mid": "/m/0p57p",
  //     "locale": "",
  //     "description": "recipe",
  //     "score": 0.5130674839019775,
  //     "confidence": 0,
  //     "topicality": 0,
  //     "boundingPoly": null,
  //     "locations": [],
  //     "properties": []
  //   }
  // ];
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
