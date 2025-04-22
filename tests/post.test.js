const request = require('supertest');
const app = require('../server');
const mongoose = require('mongoose');
require('dotenv').config();

let token = '';
let postId = '';

beforeAll(async () => {
  await mongoose.connect(process.env.MONGO_URI);

  // Register and login a test user
  await request(app).post('/api/auth/register').send({
    username: 'poster',
    password: '123456',
    role: 'user'
  });

  const res = await request(app).post('/api/auth/login').send({
    username: 'poster',
    password: '123456'
  });

  token = res.body.token;
});

afterAll(async () => {
  await mongoose.connection.dropDatabase(); // clean up
  await mongoose.connection.close();
});

describe('Post Endpoints', () => {
  it('should create a new post', async () => {
    const res = await request(app)
      .post('/api/posts')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'Test Post',
        content: 'Testing post creation'
      });

    expect(res.statusCode).toBe(201);
    expect(res.body.title).toBe('Test Post');
    postId = res.body._id;
  });

  it('should fetch all posts', async () => {
    const res = await request(app).get('/api/posts');
    expect(res.statusCode).toBe(200);
    expect(res.body.length).toBeGreaterThan(0);
  });

  it('should update the post', async () => {
    const res = await request(app)
      .put(`/api/posts/${postId}`)
      .set('Authorization', `Bearer ${token}`)
      .send({ content: 'Updated content' });

    expect(res.statusCode).toBe(200);
    expect(res.body.content).toBe('Updated content');
  });

  it('should delete the post', async () => {
    const res = await request(app)
      .delete(`/api/posts/${postId}`)
      .set('Authorization', `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe('Post deleted');
  });
});
