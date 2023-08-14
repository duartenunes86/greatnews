const app = require('../app');
const request = require('supertest');
const db = require('../db/connection.js');
const seed = require('../db/seeds/seed');
const topicData = require('../db/data/test-data/topics');
const userData = require('../db/data/test-data/users');
const articleData = require('../db/data/test-data/articles');
const commentData = require('../db/data/test-data/comments');

beforeEach(() => seed({ topicData, userData, articleData, commentData }));
afterAll(() => db.end());

describe('/api/topics', () => {
  test('GET:200 sends an array of topics to the client', () => {
    return request(app)
      .get('/api/topics')
      .expect(200)
      .then((response) => {
        expect(response.body.topics).toEqual(expect.any(Array));
        expect(Object.keys(response.body.topics[0])).toEqual(
          expect.arrayContaining(['slug', 'description'])
        );
      });
  });
}
)