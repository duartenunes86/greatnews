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
          expect.arrayContaining(['slug', 'description']))
          expect(Object.keys(response.body.topics[1])).toEqual(
            expect.arrayContaining(['slug', 'description']))
            expect(Object.keys(response.body.topics[2])).toEqual(
                expect.arrayContaining(['slug', 'description']))
          expect(response.body.topics.length).toBe(3)
                 
      });
  });
}
)
describe('error 404 GET /api/topics/', ()=>{
    test('GET:404 Not found', ()=>{
        
            return request(app)
            .get('/api/tropics')
            .expect(404)
   
        })
    })
   
    describe('GET /api', () => {
      test('GET:200 sends an object with the endpoints to the client', () => {
        return request(app)
          .get('/api')
          .expect(200)
          .then((response) => {
            expect(response.body.endpoints).toEqual(expect.any(Object));
            expect(Object.keys(response.body.endpoints)).toEqual(
              expect.arrayContaining(["GET /api", "GET /api/topics","GET /api/articles",  ]))
              
                     
          });
      });

    }
    )
    describe('error 404 on GET /api bad path', ()=>{
      test('GET:404', ()=>{
          
              return request(app)
              .get('/apii')
              .expect(404)
     
          })
      })
      describe('GET /api/articles/:article_id', () => {
        test('GET:200 sends an object with the article corresponding to the id given to the client', () => {
          
          return request(app)
            .get(`/api/articles/1`)
            .expect(200)
            .then((response) => {
              console.log(response.body)
              expect(response.body.article).toEqual(expect.any(Object));
              expect(Object.keys(response.body.article[0])).toEqual(
                expect.arrayContaining(["author",
                "title",
                "article_id",
                "body",
                "topic",
                "created_at",
                "votes",
                "article_img_url"  ]))
                expect(response.body.article[0].article_id).toBe(1)
              
                       
            });
          }
        )
        test('GET:404 on bad path', ()=>{
          
          return request(app)
          .get('/api/articless/1')
          .expect(404)
 
      })
        
      }
      )
     