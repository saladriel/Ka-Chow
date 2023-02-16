const service = require('../../service');

describe('getRandomKaChow', function () {
  it('should be sufficiently random', function () {
    /**
     * Chi-Square Goodness of Fit produced values consistently over critical value, so using a more
     * relaxed test to check the uniformity of distribution.
     */
    const sampleSize = 230000; // This is arbitrary but should be large enough to prevent flakiness.
    const kaChowCount = 23;
    const expectedFrequency = sampleSize / kaChowCount;
    const variance = expectedFrequency * 0.1;
    const distribution = {};
    for (let i = 0; i < sampleSize; i++) {
      const kaChow = service.getRandomKaChow([]);
      distribution[kaChow.id] = (distribution[kaChow.id] || 0) + 1;
    }

    expect(Object.keys(distribution).length).toBe(kaChowCount);
    Object.values(distribution).forEach((actualFrequency) => {
      expect(Math.abs(actualFrequency - expectedFrequency)).toBeLessThanOrEqual(
        variance
      );
    });
  });

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
