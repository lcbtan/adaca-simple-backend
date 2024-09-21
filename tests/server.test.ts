import request from 'supertest';
import app from '../src/app';
import { mockQuery } from './__mock__/pg';

jest.mock('../src/db', () => {
  const { Pool } = require('./__mock__/pg');
  return new Pool();
});

beforeAll(async () => {
  // Optionally, you can initialize the database here
});

afterAll(async () => {
  // Clean up any resources if needed
});

describe('POST /user', () => {
  it('should return 400 if name or age is missing', async () => {
    const response = await request(app).post('/user').send({});
    expect(response.status).toBe(400);
    expect(response.body.error).toBe('Name and age are required');
  });

  it('should return 201 and the created user if data is valid', async () => {
    mockQuery.mockResolvedValueOnce({
      rows: [{ id: 1, name: 'John', age: 30 }],
    });

    const response = await request(app).post('/user').send({ name: 'John', age: 30 });
    expect(response.status).toBe(201);
    expect(response.body.name).toBe('John');
    expect(response.body.age).toBe(30);
  });

  it('should return 500 if there is a database error', async () => {
    mockQuery.mockImplementationOnce(() => {
      throw new Error('Database error');
    });

    const response = await request(app).post('/user').send({ name: 'John', age: 30 });
    expect(response.status).toBe(500);
    expect(response.body.error).toBe('Database error');
  });
});

describe('GET /user', () => {
  it('should return 200 and an array of users', async () => {
    mockQuery.mockResolvedValueOnce({
      rows: [{ id: 1, name: 'John', age: 30 }],
    });

    const response = await request(app).get('/user');
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body.length).toBe(1);
    expect(response.body[0].name).toBe('John');
  });

  it('should return 500 if there is a database error', async () => {
    mockQuery.mockImplementationOnce(() => {
      throw new Error('Database error');
    });

    const response = await request(app).get('/user');
    expect(response.status).toBe(500);
    expect(response.body.error).toBe('Database error');
  });
});