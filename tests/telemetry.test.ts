import request from 'supertest';
import app from '../src/app';
import { DataSource } from 'typeorm';
import dotenv from 'dotenv';

dotenv.config();
const token = 'Bearer '+process.env.JWT_TOKEN;
let dataSource: DataSource;
const telemetryData = { "sensorId": "A123", "temperature": 25.8, "createdAt": new Date().toISOString() };
jest.retryTimes(3);

beforeAll(async () => {   
    dataSource = new DataSource(require("../ormconfig.json"))
    await dataSource.connect();   
},10000);

afterAll(async () => {
  await dataSource.destroy();
});

describe('Telemetry Controller', () => {
  it('should ingest telemetry data', async () => {
    const response = await request(app)
      .post('/api/telemetry')
      .set('Authorization', token)
      .send(telemetryData);

    expect(response.status).toBe(201);
    expect(response.body.sensorId).toEqual(telemetryData.sensorId);
    expect(response.body.temperature).toEqual(telemetryData.temperature);
    expect(response.body.createdAt).toEqual(telemetryData.createdAt);
    expect(typeof response.body.id).toBe("number");
  });

  it('should return 400 with missing property error', async () => {
    const telemetryData = { "sensorId": "A123"};

    const response = await request(app)
      .post('/api/telemetry')
      .set('Authorization', token)
      .send(telemetryData);

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('message');
    expect(response.body.message).toEqual("request/body must have required property 'temperature'");
  });

  it('should return 400 with invalid property type error', async () => {
    const telemetryData = { "sensorId": 111, "temperature": 25.8};

    const response = await request(app)
      .post('/api/telemetry')
      .set('Authorization', token)
      .send(telemetryData);

    expect(response.status).toBe(400);    
    expect(response.body).toHaveProperty('message');
    expect(response.body.message).toEqual("request/body/sensorId must be string");
  });

  it('should return 404 with resource not found error', async () => {
    const response = await request(app)
      .post('/api/telemetry1')
      .set('Authorization', token)
      .send(telemetryData);

    expect(response.status).toBe(404);    
    expect(response.body).toHaveProperty('message');    
    expect(response.body.message).toEqual("not found");
  });


  it('should return 401 with missing Authorization header error', async () => {
    const response = await request(app)
      .post('/api/telemetry')
      .send(telemetryData);

    expect(response.status).toBe(401);    
    expect(response.body).toHaveProperty('message');
    expect(response.body.message).toEqual("Authorization header required");
  });

  it('should return 401 with invalid access token', async () => {
    const response = await request(app)
      .post('/api/telemetry')
      .set('Authorization', 'Bearer Test')
      .send(telemetryData);

    expect(response.status).toBe(401);    
    expect(response.body).toHaveProperty('message');
    expect(response.body.message).toEqual("Access denied. Please provide the valid token.");
  });
});