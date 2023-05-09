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

describe('. GET /api/categories', () => {
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

