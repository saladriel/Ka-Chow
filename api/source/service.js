const data = require('../data.json');

exports.getMovies = function () {
  return { results: data.movies };
};

exports.getCharacters = function () {
  return { results: data.characters };
};

exports.getRandomKaChow = function (include) {
  const randomIndex = Math.floor(Math.random() * data.kaChows.length);
  const randomKaChow = data.kaChows[randomIndex];
  return withIncluded(include, randomKaChow);
};

exports.getKaChowById = function (id, include) {
  let foundKaChow = data.kaChows.find(function (kaChow) {
    return kaChow.id === id;
  });
  if (foundKaChow === undefined) {
    return null;
  }
  return withIncluded(include, foundKaChow);
};

function withIncluded(include, kaChow) {
  const kaChowWithIncluded = { ...kaChow };
  if (include.includes('movie')) {
    const matchingMovie = data.movies.find(function (movie) {
      return movie.id === kaChowWithIncluded.movieId;
    });
    kaChowWithIncluded.movie = matchingMovie;
  }
  if (include.includes('character')) {
    const matchingCharacter = data.characters.find(function (character) {
      return character.id === kaChowWithIncluded.characterId;
    });
    kaChowWithIncluded.character = matchingCharacter;
  }
  return kaChowWithIncluded;
}
