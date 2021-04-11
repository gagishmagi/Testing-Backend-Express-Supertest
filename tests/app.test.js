const mongoose = require("mongoose")
const supertest = require("supertest")
const Post = require("../models/Post")
const app = require("../app")

beforeEach((done) => {
    mongoose.connect(`${process.env.MONGO_DB_URL}/PostsTest`, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }, () => done())
})


afterEach((done) => {
    mongoose.connection.db.dropDatabase(() => {
        mongoose.connection.close(() => done())
    })
})

describe('Testing Restfull Api for Post Resource', () => {

    test('GET /api/posts', async () => {
        const post = await Post.create({
            title: "Post 1",
            content: "Lorem ipsum"
        })

        await supertest(app)
            .get("/api/posts")
            .expect(200)
            .then((response) => {
                //check the response type and length
                expect(Array.isArray(response.body)).toBeTruthy()
                expect(response.body.length).toEqual(1)

                // Check the response data
                expect(response.body[0]._id).toBe(post.id)
                expect(response.body[0].title).toBe(post.title)
                expect(response.body[0].content).toBe(post.content)
            })
    })

    test("GET /api/posts/:id", async () => {
        const post = await Post.create({
            title: "Post 1",
            content: "Lorem ipsum",
        })

        await supertest(app)
            .get("/api/posts/" + post.id)
            .expect(200)
            .then((response) => {
                expect(response.body._id).toBe(post.id)
                expect(response.body.title).toBe(post.title)
                expect(response.body.content).toBe(post.content)
            })
    })

    test("POST /api/posts", async () => {
        const data = {
            title: "Post 1",
            content: "Lorem ipsum",
        }

        await supertest(app)
            .post("/api/posts")
            .send(data)
            .expect(200)
            .then(async (response) => {
                // Check the response
                expect(response.body._id).toBeTruthy()
                // expect(response.body.error).toBeObject()
                // expect(response.body.error).toBeFalsy()
                // expect(response.body.error.message).toEqual("Something went wrong")
                expect(response.body.title).toBe(data.title)
                expect(response.body.content).toBe(data.content)

                // Check the data in the database
                const post = await Post.findOne({
                    _id: response.body._id
                })
                expect(post.id).toBeTruthy()
                expect(post.title).toBe(data.title)
                expect(post.content).toBe(data.content)
            })
    })

    test("PATCH /api/posts/:id", async () => {
        const post = await Post.create({
            title: "Post 1",
            content: "Lorem ipsum",
        })

        const data = {
            title: "New title",
            content: "dolor sit amet",
        }

        await supertest(app)
            .patch("/api/posts/" + post.id)
            .send(data)
            .expect(200)
            .then(async (response) => {
                // Check the response
                expect(response.body._id).toBe(post.id)
                expect(response.body.title).toBe(data.title)
                expect(response.body.content).toBe(data.content)

                // Check the data in the database
                const newPost = await Post.findOne({
                    _id: response.body._id
                })
                expect(newPost).toBeTruthy()
                expect(newPost.title).toBe(data.title)
                expect(newPost.content).toBe(data.content)
            })
    })

    test("DELETE /api/posts/:id", async () => {
        const post = await Post.create({
            title: "Post 1",
            content: "Lorem ipsum",
        })

        await supertest(app)
            .delete("/api/posts/" + post.id)
            .expect(204)
            .then(async () => {
                expect(await Post.findOne({
                    _id: post.id
                })).toBeFalsy()
            })
    })
})
