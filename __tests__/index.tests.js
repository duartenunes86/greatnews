const app = require('../app');
const request = require('supertest');
const db = require('../db/connection.js');
const seed = require('../db/seeds/seed');
const topicData = require('../db/data/test-data/topics');
const userData = require('../db/data/test-data/users');
const articleData = require('../db/data/test-data/articles');
const commentData = require('../db/data/test-data/comments');
const fs = require('fs/promises');
const {checkExists} = require('../utils.js');



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
              
              
                expect(response.body.article).toEqual(expect.objectContaining({
                  article_id: 1,
                  title: "Living in the shadow of a great man",
                  topic:"mitch",
                  author:"butter_bridge",
                  body:"I find this existence challenging",
                  article_img_url:"https://images.pexels.com/photos/158651/news-newsletter-newspaper-information-158651.jpeg?w=700&h=700"
                }))
                       
            })
          })
          
        
        test('GET:404 on bad path', ()=>{
          
          return request(app)
          .get('/api/articless/1')
          .expect(404)
 
      })
      test('GET:404 sends an appropriate and error message when given a valid but non-existent id', () => {
        return request(app)
          .get('/api/articles/999')
          .expect(404)
          .then((response) => {
            
            expect(response.body.msg).toBe('article doesn\'t exist');
          });
      });  
      test('GET:400 sends an appropriate and error message when given an invalid id', () => {
        return request(app)
          .get('/api/articles/banana')
          .expect(400)
          .then((response) => {
            expect(response.body.msg).toBe('Invalid input');
          });
      }
      )
    })
      describe('GET /api/articles', () => {
        test('GET:200 sends an object with the articles excluding the body property', () => {
          
          return request(app)
            .get(`/api/articles`)
            .expect(200)
            .then((response) => {
           
               expect(response.body.articles).toBeSortedBy("created_at", {descending: true})
              response.body.articles.forEach(element=>{
                
                
                expect(element).toEqual(expect.objectContaining({
                  title: expect.any(String),
                  article_id: expect.any(Number),
                  
                  topic: expect.any(String),
                  created_at: expect.any(String),
                  votes: expect.any(Number),
                  article_img_url: expect.any(String),
                  comment_count: expect.any(String)
                }))
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
              
               
         
                  response.body.comments.forEach(element=>{
                
                
                  expect(element).toEqual(expect.objectContaining({
                    comment_id: expect.any(Number),
                    votes: expect.any(Number),                    
                    created_at: expect.any(String),
                    author: expect.any(String),
                    body: expect.any(String),
                    article_id: expect.any(Number)
                  }))
                })
              
                       
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
          .get('/api/articles/999/comments')
          .expect(404)
          .then((response) => {
            
            expect(response.body.msg).toBe('item doesn\'t exist');
          });
      })
      test('GET:400 sends an appropriate and error message when given an invalid id', () => {
        return request(app)
          .get('/api/articles/banana/comments')
          .expect(400)
          .then((response) => {
            expect(response.body.msg).toBe('Invalid input');
          });
      }
      ) 
      test('GET:200 when the client asks for an article with no comments in it', () => {
        return request(app)
        .get('/api/articles/13/comments')
        .expect(200)
      })
    })
    describe("Post 201: inserts a new comment to some article", ()=>{ 
      let dateCreated=""
      test('POST:201 inserts a new comment to the db and sends the new comment back to the client', () => {
        const newComment = {
          username: 'butter_bridge',
          body: 'I do not believe you'
        };
        return request(app)
          .post('/api/articles/1/comments')
          .send(newComment)
          .expect(201)
          .then((response) => {
            console.log(response.body)
            expect(response.status).toBe(201); // Check the HTTP status code
    expect(response.body.comment).toHaveProperty('created_at'); // Check if 'comment' property exists
    expect(response.body.comment.body).toEqual(newComment.body);
    expect(response.body.comment.author).toEqual(newComment.username);
    expect(response.body.comment.votes).toEqual(0)
    expect(response.body.comment.article_id).toEqual(1)
     
     
      })
      
        })
        test('POST:404 on bad path', ()=>{
          
          return request(app)
          .post('/api/articless/1/comments')
          .expect(404)
 
      })
      test('POST:404 sends an appropriate and error message when given a valid but non-existent id', () => {
        return request(app)
          .post('/api/articles/999/comments')
          .expect(404)
          .then((response) => {
            
            expect(response.body.msg).toBe('item doesn\'t exist');
          });
      })
      test('POST:400 sends an appropriate and error message when given an invalid id', () => {
        return request(app)
          .post('/api/articles/banana/comments')
          .expect(400)
          .then((response) => {
            expect(response.body.msg).toBe('Invalid input');
          });
      }
      ) 
      
      })