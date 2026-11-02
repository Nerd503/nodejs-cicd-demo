# Node.js CI/CD Demo Application

A simple Node.js Express application built to demonstrate a Jenkins-based CI/CD pipeline deployment on AWS EC2 Ubuntu server.

## Project Overview

This application provides a minimal REST API with health check capabilities, designed specifically for DevOps demonstrations. It showcases automated testing, continuous integration, and continuous deployment practices using Jenkins.

## Prerequisites

Before running this application, ensure you have the following installed:

- **Node.js** (version 22 or higher)
- **npm** (comes with Node.js)
- **Git** (for version control)

## Installation

Clone the repository and install dependencies:

```bash
git clone <your-repository-url>
cd nodejs-cicd-demo
npm install
```

## Running the Application

Start the application using:

```bash
npm start
```

The server will start on port `5000` by default (or the port specified in the `PORT` environment variable).

You should see the message:

```
Server is running on http://0.0.0.0:5000
```

## Running Tests

Execute the automated test suite using:

```bash
npm test
```

All tests use Node.js built-in test runner and verify the API endpoints work correctly.

## Configuration

### Port Configuration

The application uses the `PORT` environment variable. To run on a different port:

```bash
PORT=8080 npm start
```

Default port: `5000`

## API Endpoints

### GET /

Returns the application status.

**Response (200 OK):**

```json
{
  "message": "Node.js CI/CD deployment successful",
  "status": "running"
}
```

**Example:**

```bash
curl http://localhost:5000/
```

### GET /health

Health check endpoint for monitoring and deployment verification.

**Response (200 OK):**

```json
{
  "status": "healthy"
}
```

**Example:**

```bash
curl http://localhost:5000/health
```

### Unknown Routes

Returns 404 for any undefined routes.

**Response (404 Not Found):**

```json
{
  "error": "Route not found"
}
```

## Jenkins CI/CD Pipeline

This application is designed to work seamlessly with a Jenkins CI/CD pipeline that includes the following stages:

1. **Checkout**: Pull the latest code from GitHub repository
2. **Environment Check**: Verify Node.js, npm, and Git versions
3. **Install Dependencies**: Run `npm ci` for clean dependency installation
4. **Run Tests**: Execute `npm test` to validate application functionality
5. **Build Archive**: Package the application for deployment
6. **Deploy**: Transfer and deploy to AWS EC2 Ubuntu instance
7. **Start Service**: Run application as a systemd service
8. **Health Check**: Verify deployment using the `/health` endpoint

### Deployment Requirements

- AWS EC2 instance running Ubuntu
- Node.js 22+ installed on the EC2 instance
- systemd service configuration for the application
- SSH access from Jenkins to EC2 instance
- Security group rules allowing traffic on the application port

### Verification

After deployment, verify the application is running:

```bash
curl http://localhost:5000/health
```

Expected response:

```json
{
  "status": "healthy"
}
```

## Project Structure

```
nodejs-cicd-demo/
├── app.js              # Main application file
├── app.test.js         # Automated tests
├── package.json        # Project dependencies and scripts
├── package-lock.json   # Locked dependency versions
├── .gitignore          # Git ignore rules
└── README.md           # Project documentation
```

## Development

### Adding New Endpoints

Edit `app.js` to add new routes:

```javascript
app.get('/newroute', (req, res) => {
  res.status(200).json({ message: 'New endpoint' });
});
```

### Adding New Tests

Edit `app.test.js` to add new test cases:

```javascript
test('Your test description', async () => {
  const response = await fetch(`${baseUrl}/newroute`);
  assert.strictEqual(response.status, 200);
});
```

## Troubleshooting

### Port Already in Use

If you see `EADDRINUSE` error, either stop the process using that port or use a different port:

```bash
PORT=3000 npm start
```

### Tests Failing

Ensure no other instance of the application is running on the same port before running tests.

### Deployment Issues

- Verify Node.js version on EC2 matches requirements (22+)
- Check EC2 security group allows inbound traffic on the application port
- Ensure systemd service has correct file paths and permissions
- Review application logs: `journalctl -u nodejs-cicd-demo -f`

## License

ISC

## Author

DevOps Demo Project
