// server.js: Main Program

// call the packages we need
var express    = require('express');        // call express
var app        = express();                 // define our app using express
var bodyParser = require('body-parser');
var db         = require('./db');
var router     = express.Router();

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = 3000;        // set our port

app.all('/', function HandleAll(request, response, next){
    console.log(request.connection.remoteAddress);
    next();
});

// test route to make sure everything is working 
// (accessed at GET http://leia.cs.spu.edu:3000/api)
router.get('/', function HomeGetHandler(request, response) {
    response.json({ message: 'It Works' });
    db.connect(function ConnectionHandler(err){
        if (err){
            console.log('Unable to connect to MySQL');
            process.exit(1);
        }
        db.get().query('SELECT * FROM friends LIMIT 5', function QueryHandler(err, result, fields){
            if (err) throw err;
            console.log(result);
        });
    });
});

// more routes for our API will happen here

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', router);

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Version 1: Magic happens on port ' + port);
