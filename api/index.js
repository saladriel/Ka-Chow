const path = require('path');
const express = require('express');
const service = require('./service');

const app = express();
const port = 3000;

app.use(express.static(path.join(__dirname, './public')));

app.get('/characters', function (reqest, response) {
  const characters = service.getCharacters();
  response.send(characters);
});

app.get('/movies', function (reqest, response) {
  const movies = service.getMovies();
  response.send(movies);
});

app.get('/ka-chows/random', function (request, response) {
  const include = (request.query.include || '').split(',');
  const randomKaChow = service.getRandomKaChow(include);
  response.send(randomKaChow);
});

app.get('/ka-chows/:id', function (reqest, response) {
  const id = parseInt(reqest.params.id, 10);
  const kaChow = service.getKaChowById(id);
  response.send(kaChow);
});

app.use(function (error, request, response, next) {
  console.log(error);
  response.status(500);
  response.set('Content-Type', 'application/problem+json');
  response.send({
    type: 'https://api.ka-chow.com/v1/problems/UnknownProblem',
    title: 'An unknown problem occured.',
    status: 500,
  });
});

app.listen(port, function () {
  console.log(`Example app listening on port ${port}`);
});
