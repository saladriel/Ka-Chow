const path = require('path');
const express = require('express');
const data = require('./data.json');

const app = express();
const port = 3000;

app.use(express.static(path.join(__dirname, './public')));

app.get('/characters', function (reqest, response) {
  response.send({
    results: data.characters,
  });
});

app.get('/movies', function (reqest, response) {
  response.send({
    results: data.movies,
  });
});

app.listen(port, function () {
  console.log(`Example app listening on port ${port}`);
});
