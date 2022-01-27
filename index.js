var express = require('express');
var app = express();
var http = require('http');
var bodyParser = require('body-parser');
var logger = require('./conf/loggerConfig')

const cors = require('cors');
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
const serverPort = 8080

var path = require('path');

function addHeaders(req, res, next) {
  res.setHeader('Content-Type', 'application/json');
  next()
}


function addHeaders(req, res, next) {
  res.setHeader('Content-Type', 'application/json');
  next()
}

var cabRouter = require('./router/cab.route')
var cityRouter = require('./router/city.route')
var cabCityStateRouter = require('./router/cabCityState.route.js')
var cabBookRouter = require('./router/cabBook.route.js')


require('./model/db')();

function addHeaders(req, res, next) {
  res.setHeader('Content-Type', 'application/json');
  next()
}

app.use('/v1/cab', addHeaders, cabRouter);
app.use('/v1/city', addHeaders, cityRouter);
app.use('/v1/cab', addHeaders, cabCityStateRouter);
app.use('/v1/cab', addHeaders, cabBookRouter);

http.createServer(app).listen(serverPort, function () {
  logger.info('Swagger-ui is available on http://localhost:%d/docs', serverPort);
  logger.info("Express server listening on port " + serverPort);
});
