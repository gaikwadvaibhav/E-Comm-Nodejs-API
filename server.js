const express = require('express');
const bodyParser = require('body-parser');
var swaggerJSDoc = require('swagger-jsdoc'); // swagger-jsdoc`

const app = express();

// swaggerDefinition
var swaggerDefinition = {
    info: {
        title: 'Node Swagger API Test',
        version: '1.0.0',
        description: 'Demonstrating how to describe a RESTful API with Swagger',
    },
    host: 'localhost:3000',
    basePath: '/',
};

// options for the swagger docs
var options = {
    // import swaggerDefinitions
    swaggerDefinition: swaggerDefinition,
    // path to the API docs
    apis: ['./routes/*.js'],
};

// initialize swagger-jsdoc
var swaggerSpec = swaggerJSDoc(options);

// serve swagger
app.get('/swagger.json', function (req, res) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Accept", "application/json,*/*");
    res.setHeader('Content-Type', 'application/json');
    res.send(swaggerSpec);
});

// using mongodb database
var mongoose = require('mongoose');

// Import route file
var routes = require('./routes/index');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));



// Handle CORS for request
app.all('/*', (req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*"); // restrict it to the required domain
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-type,Accept,X-Access-Token,X-Key');
    if (req.method == 'OPTIONS') {
        res.status(200).end();
    } else {
        next();
    }
});

app.use('/', routes);


app.use(function (req, res, next) {
    res.status(404).json({ status: "Page not found" }).end();
})

//mongoose.connect("mongodb://localhost:27017/YourDB", { useNewUrlParser: true });
mongoose.connect("mongodb://localhost:27017/ecomm", { useNewUrlParser: true }, function () { /* dummy function */ })
    .then(() => {
        console.log("connected to ecomm database");
    })
    .catch(err => { // mongoose connection error will be handled here
        console.error('App starting error:', err.stack);
        process.exit(1);
    });

app.listen(3000, () => console.log('Server is listening, port 3000'));