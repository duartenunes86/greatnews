const app = require('../app');
const request = require('supertest');
const db = require('../db/connection.js');
const seed = require('../db/seeds/seed');
const topicData = require('../db/data/test-data/topics');
const userData = require('../db/data/test-data/users');
const articleData = require('../db/data/test-data/articles');
const commentData = require('../db/data/test-data/comments');
const fs = require('fs/promises')



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
      test('GET:200 sends an object with the endpoints to the client', () => { return fs.readFile('./endpoints.json', "utf-8").then((endpoints)=>{
        const endpoints1=JSON.parse(endpoints)
        
         
          return request(app)
          .get('/api')
          .expect(200)
          .then((response) => {
            
           
            expect(Object.keys(response.body.endpoints)).toEqual(
              
              expect.arrayContaining(Object.keys(endpoints1)  ))
            
            })
        })

        
           
              
                     
          })
      });

    
    
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
                expect(response.body.article[0].title).toEqual("Living in the shadow of a great man")
                expect(response.body.article[0].topic).toEqual("mitch")
                expect(response.body.article[0].author).toEqual("butter_bridge")
                expect(response.body.article[0].body).toEqual("I find this existence challenging")
              
                       
            });
          }
        )
        test('GET:404 on bad path', ()=>{
          
          return request(app)
          .get('/api/articless/1')
          .expect(404)
 
      })
      test('GET:404 sends an appropriate and error message when given a valid but non-existent id', () => {
        return request(app)
          .get('/api/articles/99999999999999')
          .expect(404)
          .then((response) => {
            
            expect(response.body.msg).toBe('article doesn\'t exist');
          });
      });  
      }
      )
      describe('GET /api/articles', () => {
        test('GET:200 sends an object with the articles', () => {
          
          return request(app)
            .get(`/api/articles`)
            .expect(200)
            .then((response) => {
              return response.body.results.forEach(element=>{
                
                expect(Object.keys(element)).toEqual(
                  expect.arrayContaining(["author",
                  "title",
                  "article_id",
                  
                  "topic",
                  "created_at",
                  "votes",
                  "article_img_url",
                "comment_count"]))
              })
                
                       
            });
          }
        )
        test('GET:404 on bad path', ()=>{
          
          return request(app)
          .get('/api/articless')
          .expect(404)
 
      })
      
      }
      )
      describe('GET /api/articles/:article_id/comments', () => {
        test('GET:200 sends an object with the article corresponding to the id given to the client', () => {
          
          return request(app)
            .get(`/api/articles/1/comments`)
            .expect(200)
            .then((response) => {
              
                expect(Object.keys(response.body.results[0])).toEqual(
                expect.arrayContaining([    "comment_id",
                  "votes",
                  "created_at",
                  "author",
                  "body",
                  "article_id"  ]))
                expect(response.body.results[0].article_id).toBe(1)
              
                       
            });
          }
        )
        test('GET:404 on bad path', ()=>{
          
          return request(app)
          .get('/api/articless/1/comments')
          .expect(404)
 
      })
      test('GET:404 sends an appropriate and error message when given a valid but non-existent id', () => {
        return request(app)
          .get('/api/articles/999999999/comments')
          .expect(404)
          .then((response) => {
            
            expect(response.body.msg).toBe('article doesn\'t exist');
          });
      });  
      })