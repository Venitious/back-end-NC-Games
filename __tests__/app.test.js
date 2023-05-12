const app = require('../db/app')
const request = require('supertest')
const seed = require('../db/seeds/seed')
const data = require('../db/data/test-data/index')
const db = require('../db/connection')

beforeEach(()=> {
    return seed(data);
})

afterAll(() => {
    return db.end(); 
})

describe('GET /api/categories', () => {
    it('should respond with a message 200, the categories length and the typeOf property of each column ', () => {
        return request(app).get('/api/categories')
        .expect(200)
        .then((result) => {
            const resultArr = result.body.categories
            expect(resultArr.length).toBe(4)
            resultArr.forEach((game) => {
                expect(typeof game.slug).toBe('string')
                expect(typeof game.description).toBe('string')
            })
        })
    });
});


describe('GET/api/reviews/:review_id', () => {
    it('should respond with a message 200 and the specific review and its properties', () => {
        return request(app).get('/api/reviews/1')
        .expect(200)
        .then((result) => {
            const resultArr = result.body.review
            expect(resultArr.review_id).toBe(1)
            expect(resultArr.title).toBe('Agricola')
            expect(resultArr.category).toBe('euro game')
            expect(resultArr.designer).toBe('Uwe Rosenberg')
            expect(resultArr.owner).toBe('mallionaire')
            expect(resultArr.review_body).toBe('Farmyard fun!')
            expect(resultArr.review_img_url).toBe('https://images.pexels.com/photos/974314/pexels-photo-974314.jpeg?w=700&h=700')
            expect(resultArr.created_at).toBe('2021-01-18T10:00:20.514Z')
            expect(resultArr.votes).toBe(1)
        })
    });
    it('should return an error 404 not found when passed an endpoint which does not match a review_id ', () => {
        return request(app).get('/api/reviews/10000')
        .expect(404)
        .then((result) => {
            const errorMessage = result.body.msg
            expect(errorMessage).toBe('No user found for review_id: 10000')
        })        
    });
    it('should return an error 400 when passed a bad request', () => {
        return request(app).get('/api/reviews/nonsense')
        .expect(400)
        .then((result) => {
            const errorMessage = result.body.msg
            expect(errorMessage).toBe('Invalid input') 
        })        
    });
});

describe(' GET /api/reviews/', () => {
    it('it should respond with a message 200, the categories length & and the typeof property of each column ', () => {
        return request(app).get('/api/reviews')
        .expect(200)
        .then((result) => {
            const resultArr = result.body.reviews
            expect(resultArr.length).toBe(13)
            expect(resultArr).toBeSortedBy('created_at', {descending: true})
            resultArr.forEach((review) => {
                expect(typeof review.review_id).toBe('number')
                expect(typeof review.title).toBe('string')
                expect(typeof review.category).toBe('string')
                expect(typeof review.designer).toBe('string')
                expect(typeof review.owner).toBe('string')
                expect(typeof review.review_img_url).toBe('string')
                expect(typeof review.created_at ).toBe('string')
                expect(typeof review.votes).toBe('number')
                expect(typeof review.comment_count).toBe('string')
                expect(typeof review.review_body).toBe("undefined") 
            })        
        })
    })
})

describe('GET /api', () => {
    it('should respond with all the possible endpoints and their features ', () => {
        return request(app).get('/api')
        .expect(200)
        .then((result) => {
            const resultObj = result.body
            const objectKeys = Object.keys(resultObj)
            expect(objectKeys.length >= 4 ).toBe(true)
            expect(objectKeys).toContain("GET /api")
            expect(objectKeys).toContain("GET /api/reviews")
            expect(objectKeys).toContain("GET /api/categories")
            expect(objectKeys).toContain("GET /api/comments")      
        })
    });
});


describe('POST /api/reviews/:review_id/comments', () => {
    it('should post a new comment according to the provided review_id ', () => {
        const postRequest = {
            username: 'mallionaire',
            body: 'this is the test comment!'
        }
        return request(app).post('/api/reviews/1/comments')
        .send(postRequest)
        .expect(201)
        .then((result) => {
            const resultArr = result.body.newComment
            expect(resultArr.comment_id).toBe(7)
            expect(resultArr.review_id).toBe(1)
            expect(resultArr.body).toBe('this is the test comment!')
            expect(resultArr.author).toBe('mallionaire')
            expect(resultArr.votes).toBe(0)
            expect(typeof resultArr.created_at).toBe('string')
        })
    });
    it('should return a 404 not found and a message when passed a review_id which is not in existance ', () => {
        const postRequest = {
            username: 'mallionaire',
            body: 'this is the test comment!'
            }
        return request(app).post('/api/reviews/10000/comments')
        .send(postRequest)
        .expect(404)
        .then((result) => {
            const errorMessage = result.body.msg
            expect(errorMessage).toBe('Input not in use')
        })        
    });
    it('should return 400 bad request when passed an invalid review_id', () => {
        const postRequest = {
            username: 'mallionaire',
            body: 'this is the test comment!'
            }
        return request(app).post('/api/reviews/badRequest/comments')
        .send(postRequest)
        .expect(400)
        .then((result) => {
            const errorMessage = result.body.msg
            expect(errorMessage).toBe('Invalid input')
        })  
    });
    it('should return a 400 bad request when the data being passed into the table is the wrong type of data', () => {
        const postRequest = {
            username: 1234,
            body: 'test message'
            }
        return request(app).post('/api/reviews/1/comments')
        .send(postRequest)
        .expect(400)
        .then((result) => {
            const errorMessage = result.body.msg
            expect(errorMessage).toBe('Invalid input')
        })  
    });
    it('should return a 404 not found when the data passed into the comment section does not match a username ', () => {
        const postRequest = {
            username: 'fakeUser',
            body: 'test message'
            }
            return request(app).post('/api/reviews/10000/comments')
            .send(postRequest)
            .expect(404)
            .then((result) => {
                const errorMessage = result.body.msg
                expect(errorMessage).toBe('Input not in use')
            }) 
    });
});
    
