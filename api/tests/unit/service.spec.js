const service = require('../../service');

const movieCount = 3;
const characterCount = 5;
const kaChowCount = 23;
const anyMovie = {
  id: expect.any(Number),
  name: expect.any(String),
  releaseDate: expect.any(String),
  imageUrl: expect.any(String),
};
const anyCharacter = {
  id: expect.any(Number),
  name: expect.any(String),
  actor: expect.any(String),
  imageUrl: expect.any(String),
};
const anyKaChow = {
  id: expect.any(Number),
  characterId: expect.any(Number),
  movieId: expect.any(Number),
  countInMovie: expect.any(Number),
  videoUrl: expect.any(String),
  audioUrl: expect.any(String),
};

describe('getMovies', function () {
  it('should return all movies', function () {
    const actual = service.getMovies();
    const expected = { results: expect.any(Array) };

    expect(actual).toEqual(expected);
    expect(actual.results.length).toBe(movieCount);
    actual.results.forEach(function (movie) {
      expect(movie).toEqual(anyMovie);
    });
  });
});

describe('getCharacters', function () {
  it('should return all characters', function () {
    const actual = service.getCharacters();
    const expected = { results: expect.any(Array) };

    expect(actual).toEqual(expected);
    expect(actual.results.length).toBe(characterCount);
    actual.results.forEach(function (character) {
      expect(character).toEqual(anyCharacter);
    });
  });
});

describe('getRandomKaChow', function () {
  it('should be sufficiently random', function () {
    /**
     * Chi-Square Goodness of Fit produced values consistently over critical value, so using a more
     * relaxed test to check the uniformity of distribution.
     */
    const sampleSize = 230000; // This is arbitrary but should be large enough to prevent flakiness.
    const expectedFrequency = sampleSize / kaChowCount;
    const variance = expectedFrequency * 0.1;
    const distribution = {};
    for (let i = 0; i < sampleSize; i++) {
      const kaChow = service.getRandomKaChow([]);
      distribution[kaChow.id] = (distribution[kaChow.id] || 0) + 1;
    }

    expect(Object.keys(distribution).length).toBe(kaChowCount);
    Object.values(distribution).forEach((actualFrequency) => {
      expect(Math.abs(actualFrequency - expectedFrequency)).toBeLessThanOrEqual(variance);
    });
  });

  it('should return a Ka-Chow with nothing included', function () {
    const actual = service.getRandomKaChow([]);
    const expected = anyKaChow;

    expect(actual).toEqual(expected);
  });

  it('should return a Ka-Chow with only character included', function () {
    const actual = service.getRandomKaChow(['character']);
    const expected = {
      ...anyKaChow,
      character: anyCharacter,
    };

    expect(actual).toEqual(expected);
  });

  it('should return a Ka-Chow with only movie included', function () {
    const actual = service.getRandomKaChow(['movie']);
    const expected = {
      ...anyKaChow,
      movie: anyMovie,
    };

    expect(actual).toEqual(expected);
  });

  it('should return a Ka-Chow with character and movie included', function () {
    const actual = service.getRandomKaChow(['character', 'movie']);
    const expected = {
      ...anyKaChow,
      character: anyCharacter,
      movie: anyMovie,
    };

    expect(actual).toEqual(expected);
  });
});

describe.only('getKaChowById', function () {
  it('should return null if Ka-Chow is not found', function () {
    const actual = service.getKaChowById(0);
    const expected = null;

    expect(actual).toBe(expected);
  });

  it('should return a Ka-Chow by Id with nothing included', function () {
    const actual = service.getKaChowById(1);
    const expected = {
      id: 1,
      characterId: 1,
      movieId: 1,
      countInMovie: 1,
      videoUrl: '/videos/ka-chow-01.mp4',
      audioUrl: '/audio/ka-chow-01.mp3',
    };

    expect(actual).toEqual(expected);
  });
});
