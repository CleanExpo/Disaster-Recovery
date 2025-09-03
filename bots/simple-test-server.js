// Simple test server without TypeScript
const express = require('express');
const app = express();
const port = 3005;

app.use(express.json());

app.get('/', (req, res) => {
  res.json({ message: 'Bot API is working!' });
});

app.get('/health', (req, res) => {
  res.json({ status: 'healthy', timestamp: new Date() });
});

app.post('/api/client/message', (req, res) => {
  console.log('Received message:', req.body);
  res.json({
    success: true,
    response: 'Test response from bot',
    sessionId: req.body.sessionId
  });
});

const server = app.listen(port, () => {
  console.log(`Bot API running at http://localhost:${port}`);
});

// Keep the server running
process.on('SIGINT', () => {
  console.log('Shutting down...');
  server.close();
  process.exit(0);
});