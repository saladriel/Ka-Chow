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

app.get('/movies', function (request, response) {
  const movies = service.getMovies();
  response.send(movies);
});

app.get('/ka-chows/random', function (request, response) {
  const include = (request.query.include || '').split(',');
  const randomKaChow = service.getRandomKaChow(include);
  response.send(randomKaChow);
});

app.get('/ka-chows/:id', function (request, response) {
  const id = parseInt(request.params.id, 10);
  if (Number.isNaN(id) || id < 1) {
    response.status(400);
    response.set('Content-Type', 'application/problem+json');
    response.send({
      type: 'https://api.ka-chow.com/v1/problem/InvalidInput',
      title: 'Some of the input provided was invalid.',
      status: 400,
    });
    return;
  }
  const include = (request.query.include || '').split(',');
  const kaChow = service.getKaChowById(id, include);
  if (kaChow === null) {
    response.status(404);
    response.set('Content-Type', 'application/problem+json');
    response.send({
      type: 'https://api.ka-chow.com/v1/problem/NotFound',
      title: 'The requested resource could not be found.',
      status: 404,
    });
    return;
  }
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
