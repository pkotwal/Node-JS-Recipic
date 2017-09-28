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
var upload = multer({ dest: 'uploads/' });

var index = require('./routes/index');
var users = require('./routes/users');
var search = require('./routes/search');

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

// app.get('/searh-image', function(req, res){
//   const request = {
//   source: {
//     filename: fileName
//   }
// };
//
// // Performs label detection on the image file
// vision.labelDetection(request)
//   .then((results) => {
//     const labels = results[0].labelAnnotations;
//
//     console.log('Labels:');
//     labels.forEach((label) => console.log(label.description));
//   })
//   .catch((err) => {
//     console.error('ERROR:', err);
//   });
//   res.send("OK");
// });

app.post('/test-json', function(req, res){
  // var json = {[
  //   {"mid":"/m/0cjtln","locale":"","description":"pulled pork","score":0.8614763617515564,"confidence":0,"topicality":0,"boundingPoly":null,"locations":[],"properties":[]},
  //   {"mid":"/m/0c3y3jd","locale":"","description":"slider","score":0.8374393582344055,"confidence":0,"topicality":0,"boundingPoly":null,"locations":[],"properties":[]},
  //   {"mid":"/m/07pt9wt","locale":"","description":"appetizer","score":0.7889784574508667,"confidence":0,"topicality":0,"boundingPoly":null,"locations":[],"properties":[]},
  //   {"mid":"/m/05z6fm","locale":"","description":"beef on weck","score":0.7591284513473511,"confidence":0,"topicality":0,"boundingPoly":null,"locations":[],"properties":[]},
  //   {"mid":"/m/0l515","locale":"","description":"sandwich","score":0.6702234148979187,"confidence":0,"topicality":0,"boundingPoly":null,"locations":[],"properties":[]},
  //   {"mid":"/m/0cc7bks","locale":"","description":"buffalo burger","score":0.6582993865013123,"confidence":0,"topicality":0,"boundingPoly":null,"locations":[],"properties":[]},
  //   {"mid":"/m/0bp3f6m","locale":"","description":"fried food","score":0.6489384770393372,"confidence":0,"topicality":0,"boundingPoly":null,"locations":[],"properties":[]},
  //   {"mid":"/m/0cdn1","locale":"","description":"hamburger","score":0.6443697810173035,"confidence":0,"topicality":0,"boundingPoly":null,"locations":[],"properties":[]},
  //   {"mid":"/m/01z1jf2","locale":"","description":"american food","score":0.6412472128868103,"confidence":0,"topicality":0,"boundingPoly":null,"locations":[],"properties":[]},
  //   {"mid":"/m/02wbm","locale":"","description":"food","score":0.6021155118942261,"confidence":0,"topicality":0,"boundingPoly":null,"locations":[],"properties":[]},
  //   {"mid":"/m/02q08p0","locale":"","description":"dish","score":0.5973641276359558,"confidence":0,"topicality":0,"boundingPoly":null,"locations":[],"properties":[]},
  //   {"mid":"/m/0119x1zy","locale":"","description":"bun","score":0.5898458957672119,"confidence":0,"topicality":0,"boundingPoly":null,"locations":[],"properties":[]},
  //   {"mid":"/m/0b3dyl","locale":"","description":"finger food","score":0.5897143483161926,"confidence":0,"topicality":0,"boundingPoly":null,"locations":[],"properties":[]},
  //   {"mid":"/m/07fjx2","locale":"","description":"vetkoek","score":0.5624228715896606,"confidence":0,"topicality":0,"boundingPoly":null,"locations":[],"properties":[]},
  //   {"mid":"/m/04scj","locale":"","description":"meat","score":0.5404865741729736,"confidence":0,"topicality":0,"boundingPoly":null,"locations":[],"properties":[]},
  //   {"mid":"/m/0p57p","locale":"","description":"recipe","score":0.5130674839019775,"confidence":0,"topicality":0,"boundingPoly":null,"locations":[],"properties":[]}]};

var json = [
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
  res.json(json);
});

app.post('/upload-file-form', upload.single('thefile'), function(req, res) {
  if (!req.file) {
    res.status(500).send('error: no file');
  }

// // Set the headers
// var headers = {
//     'User-Agent':       'Super Agent/0.0.1',
//     'Content-Type':     'application/x-www-form-urlencoded'
// }
//
// // Configure the request
// var options = {
//     url: 'https://vision.googleapis.com/v1/images:annotate?key=7e177e422ad4e8581a30b20f7cf57603083ebca4',
//     method: 'POST',
//     headers: headers,
//     form: {
//       "requests": [
//         {
//           "image": {
//             "source": {
//               "imageUri": "http://barcodedc.com/wp-content/gallery/food/healthfitnessrevolution-com.jpg"
//             }
//           },
//           "features": [
//             {
//               "type": "LABEL_DETECTION",
//               "maxResults": 100
//             }
//           ]
//         }
//       ]
// }
// }
//
// // Start the request
// request(options, function (error, response, body) {
//     if (!error && response.statusCode == 200) {
//         // Print out the response body
//         console.log(body);
//         res.send(body);
//     }else{
//       res.json({"error":error, "code":response.statusCode});
//     }
// });
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
    const labels = results[0].labelAnnotations;
    res.json(labels);

    // console.log('Labels:');
    // labels.forEach((label) => console.log(label.description));
  })
  .catch((err) => {
    console.error('ERROR:', err);
    res.send("Opps Error");
  });





//
//   const request = {
//     source: {
//       filename: req.file.path
//     }
//   };
//
// // Performs label detection on the image file
// vision.labelDetection(request)
//   .then((results) => {
//     const labels = results[0].labelAnnotations;
//     res.json(labels);
//     // console.log('Labels:');
//     // labels.forEach((label) => console.log(label.description));
//   })
//   .catch((err) => {
//     console.error('ERROR:', err);
//     res.send("Opps Error");
//   });
//   // res.send("OK");

  /*
  req.file:
    upload-file-form { fieldname: 'thefile',
    originalname: 'upload-me.txt',
    encoding: '7bit',
    mimetype: 'text/plain',
    destination: 'uploads/',
    filename: '4e5b95869729cf62b4db9005fe9ce575',
    path: 'uploads/4e5b95869729cf62b4db9005fe9ce575',
    size: 30 }
  */

  // res.json({
  //   'filename': req.file.originalname,
  //   'mimetype': req.file.mimetype,
  //   'size (bytes)': req.file.size
  // });
});

app.post('/upload-file-ajax', upload.single('ajaxfile'), function(req, res) {
  if (!req.file) {
    res.status(500).send('error: no file');
  }

  // actually do something with file...
  if (req.file.mimetype == 'text/plain') {
    var text = req.file.buffer.toString('utf8');
    console.log('contents of file:', text);
  } else {
    console.log('got a non-text file. here are some bytes:');
    console.log(req.file.buffer);
  }

  res.json({
    'filename': req.file.originalname,
    'mimetype': req.file.mimetype,
    'size (bytes)': req.file.size
  });
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// app.use(function(err, req, res, next) {
//   console.error(err);
//   next();
// });


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
