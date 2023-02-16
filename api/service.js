const data = require('./data.json');

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
