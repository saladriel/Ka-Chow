const service = require('../../service');

describe('getRandomKaChow', function () {
  it('should return a Ka-Chow with nothing included', function () {
    const actual = service.getRandomKaChow([]);
    const expected = {
      id: expect.any(Number),
      characterId: expect.any(Number),
      movieId: expect.any(Number),
      countInMovie: expect.any(Number),
      videoUrl: expect.any(String),
      audioUrl: expect.any(String),
    };

    expect(actual).toEqual(expected);
  });

  it('should return a Ka-Chow with only character included', function () {
    const actual = service.getRandomKaChow(['character']);
    const expected = {
      id: expect.any(Number),
      characterId: expect.any(Number),
      movieId: expect.any(Number),
      countInMovie: expect.any(Number),
      videoUrl: expect.any(String),
      audioUrl: expect.any(String),
      character: {
        id: expect.any(Number),
        name: expect.any(String),
        actor: expect.any(String),
        imageUrl: expect.any(String),
      },
    };

    expect(actual).toEqual(expected);
  });

  it('should return a Ka-Chow with only movie included', function () {
    const actual = service.getRandomKaChow(['movie']);
    const expected = {
      id: expect.any(Number),
      characterId: expect.any(Number),
      movieId: expect.any(Number),
      countInMovie: expect.any(Number),
      videoUrl: expect.any(String),
      audioUrl: expect.any(String),
      movie: {
        id: expect.any(Number),
        name: expect.any(String),
        releaseDate: expect.any(String),
        imageUrl: expect.any(String),
      },
    };

    expect(actual).toEqual(expected);
  });

  it('should return a Ka-Chow with character and movie included', function () {
    const actual = service.getRandomKaChow(['character', 'movie']);
    const expected = {
      id: expect.any(Number),
      characterId: expect.any(Number),
      movieId: expect.any(Number),
      countInMovie: expect.any(Number),
      videoUrl: expect.any(String),
      audioUrl: expect.any(String),
      character: {
        id: expect.any(Number),
        name: expect.any(String),
        actor: expect.any(String),
        imageUrl: expect.any(String),
      },
      movie: {
        id: expect.any(Number),
        name: expect.any(String),
        releaseDate: expect.any(String),
        imageUrl: expect.any(String),
      },
    };

    expect(actual).toEqual(expected);
  });
});
