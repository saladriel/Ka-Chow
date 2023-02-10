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

app.get('/ka-chows/random', function (request, response) {
  const include = (request.query.include || '').split(',');
  const randomIndex = Math.floor(Math.random() * data.kaChows.length);
  const randomKaChow = data.kaChows[randomIndex];
  if (include.includes('movie')) {
    const matchingMovie = data.movies.find(function (movie) {
      return movie.id === randomKaChow.movieId;
    });
    randomKaChow.movie = matchingMovie;
  }
  if (include.includes('character')) {
    const matchingCharacter = data.characters.find(function (character) {
      return character.id === randomKaChow.characterId;
    });
    randomKaChow.character = matchingCharacter;
  }
  response.send(randomKaChow);
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
