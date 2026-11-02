const { test, describe, after } = require('node:test');
const assert = require('node:assert');
const app = require('./app');

// Create test server
const server = app.listen(0); // Use random available port
const port = server.address().port;
const baseUrl = `http://localhost:${port}`;

// Ensure server closes after all tests
after(() => {
  server.close();
});

describe('Node.js CI/CD Demo API Tests', () => {
  test('GET / should return HTTP 200', async () => {
    const response = await fetch(baseUrl);
    assert.strictEqual(response.status, 200);
  });

  test('GET / should return expected JSON response', async () => {
    const response = await fetch(baseUrl);
    const data = await response.json();
    
    assert.strictEqual(data.message, 'Node.js CI/CD deployment successful');
    assert.strictEqual(data.status, 'running');
  });

  test('GET /health should return HTTP 200', async () => {
    const response = await fetch(`${baseUrl}/health`);
    assert.strictEqual(response.status, 200);
  });

  test('GET /health should return healthy status', async () => {
    const response = await fetch(`${baseUrl}/health`);
    const data = await response.json();
    
    assert.strictEqual(data.status, 'healthy');
  });

  test('Unknown routes should return HTTP 404', async () => {
    const response = await fetch(`${baseUrl}/unknown`);
    assert.strictEqual(response.status, 404);
  });
});
