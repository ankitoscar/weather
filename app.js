var express = require('express');
var path = require('path');
var app = express();

app.use('/static', express.static('static'))

app.get('/', function (req, res) {
  res.sendFile('home.html', {root:__dirname});
});
app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});