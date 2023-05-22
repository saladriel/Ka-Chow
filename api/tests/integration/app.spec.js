const request = require('supertest');
const app = require('../../source/app');
const service = require('../../source/service');

jest.mock('../../source/service');

beforeEach(() => {
  jest.resetAllMocks();
});

describe('GET /characters', () => {
  it('should call application.getCharacters', async () => {
    await request(app).get('/characters');

    expect(service.getCharacters).toHaveBeenCalledTimes(1);
  });
});

describe('GET /movies', () => {
  it('should call application.getMovies', async () => {
    await request(app).get('/movies');

    expect(service.getMovies).toHaveBeenCalledTimes(1);
  });
});

describe('GET /ka-chows/random', () => {
  it.each([
    ['/ka-chows/random', []],
    ['/ka-chows/random?include=character', ['character']],
    ['/ka-chows/random?include=movie', ['movie']],
    ['/ka-chows/random?include=character,movie', ['character', 'movie']],
    ['/ka-chows/random?include=character,movie,movie', ['character', 'movie']], // duplicates ignored
    ['/ka-chows/random?include=character,movieZ', ['character']], // partially valid include
    ['/ka-chows/random?include=movieZ', []], // invalid include
    ['/ka-chows/random?include=', []], // include present but empty
  ])('should call application.getRandomKaChow: %s', async (href, include) => {
    await request(app).get(href);

    expect(service.getRandomKaChow).toHaveBeenCalledTimes(1);
    expect(service.getRandomKaChow).toHaveBeenCalledWith(include);
  });
});

describe('GET /ka-chows/:id', () => {
  it.each([
    ['/ka-chows/1', 1, []],
    ['/ka-chows/9000', 9000, []], // non-existent id but valid
    ['/ka-chows/1?include=character', 1, ['character']],
    ['/ka-chows/1?include=movie', 1, ['movie']],
    ['/ka-chows/1?include=character,movie', 1, ['character', 'movie']],
    ['/ka-chows/1?include=character,movie,movie', 1, ['character', 'movie']], // duplicates ignored
    ['/ka-chows/1?include=character,movieZ', 1, ['character']], // partially valid include
    ['/ka-chows/1?include=movieZ', 1, []], // invalid include
    ['/ka-chows/1?include=', 1, []], // include present but empty
  ])('should call application.getKaChowById: %s', async (href, id, include) => {
    await request(app).get(href);

    expect(service.getKaChowById).toHaveBeenCalledTimes(1);
    expect(service.getKaChowById).toHaveBeenCalledWith(id, include);
  });

  it.each([
    // prettier-ignore
    ["/ka-chows/1.9"],
    ['/ka-chows/0'],
    ['/ka-chows/non-number'],
  ])('should not call application.getKaChowById: %s', async (href) => {
    await request(app).get(href);

    expect(service.getKaChowById).toHaveBeenCalledTimes(0);
  });
});

describe('GET /ka-chows', () => {
  it.each([
    // no params
    ['/ka-chows', {}, {}, []],
    // paginate
    ['/ka-chows?offset=6', { offset: 6 }, {}, []],
    ['/ka-chows?limit=3', { limit: 3 }, {}, []],
    ['/ka-chows?offset=6&limit=3', { offset: 6, limit: 3 }, {}, []],
    // filter
    ['/ka-chows?character=Lightning%20McQueen', {}, { character: 'Lightning McQueen' }, []],
    ['/ka-chows?movie=Cars%202', {}, { movie: 'Cars 2' }, []],
    [
      '/ka-chows?character=Lightning%20McQueen&movie=Cars%202',
      {},
      { character: 'Lightning McQueen', movie: 'Cars 2' },
      [],
    ],
    // include
    ['/ka-chows?include=character', {}, {}, ['character']],
    ['/ka-chows?include=movie', {}, {}, ['movie']],
    ['/ka-chows?include=character,movie', {}, {}, ['character', 'movie']],
    // handles invalid and empty params
    ['/ka-chows?offset=6.7', { offset: 6 }, {}, []], // truncate decimals
    ['/ka-chows?offset=-1', {}, {}, []],
    ['/ka-chows?offset=non-number', {}, {}, []],
    ['/ka-chows?offset=', {}, {}, []],
    ['/ka-chows?limit=3.4', { limit: 3 }, {}, []], // truncate decimals
    ['/ka-chows?limit=-1', {}, {}, []],
    ['/ka-chows?limit=non-number', {}, {}, []],
    ['/ka-chows?limit=', {}, {}, []],
    ['/ka-chows?character=', {}, {}, []],
    ['/ka-chows?movie=', {}, {}, []],
    ['/ka-chows?include=character,movie,movie', {}, {}, ['character', 'movie']], // duplicates ignored
    ['/ka-chows?include=character,movieZ', {}, {}, ['character']], // partially valid include
    ['/ka-chows?include=movieZ', {}, {}, []], // invalid include
    ['/ka-chows?include=', {}, {}, []],
  ])('should call application.getKaChows: %s', async (href, paginate, filter, include) => {
    await request(app).get(href);

    expect(service.getKaChows).toHaveBeenCalledTimes(1);
    expect(service.getKaChows).toHaveBeenCalledWith(paginate, filter, include);
  });
});
