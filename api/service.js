const data = require('./data.json');

exports.getMovies = function () {
  return { results: data.movies };
};

exports.getCharacters = function () {
  return { results: data.characters };
};

exports.getRandomKaChow = function (include) {
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
  return randomKaChow;
};

exports.getKaChowById = function (id) {
  const foundKaChow = data.kaChows.find(function (kaChow) {
    return kaChow.id === id;
  });
  if (foundKaChow === undefined) {
    return null;
  }
  return foundKaChow;
};
