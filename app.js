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
        console.log(response);
        for(i in response){
        console.log(response[i].description);
        if(response[i].description.indexOf("food") != -1){
          isFood = true;
          break;
        }
        }

        if(isFood){
        var searchTerm = response[0].description;
        var other = [];
        for(var i = 1; i < response.length; i++){
          other.push(response[i].description);
        }
        var imgUrl = "images/"+req.file.path.substring(14);
        // console.log();

        res.json({"Food": true, "Search": searchTerm, "Search2": other[0], "Search3": other[1], "Img": imgUrl});
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
