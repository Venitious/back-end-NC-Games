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
            resultArr.forEach((review) => {
                expect(typeof review.review_id).toBe('number')
                expect(typeof review.title).toBe('string')
                expect(typeof review.category).toBe('string')
                expect(typeof review.designer).toBe('string')
                expect(typeof review.owner).toBe('string')
                expect(typeof review.review_body).toBe('string')
                expect(typeof review.review_img_url).toBe('string')
                expect(typeof review.created_at ).toBe('string')
                expect(typeof review.votes).toBe('number')
            })        
        })
    })
})
