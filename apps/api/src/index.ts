import express from 'express';
import cors from 'cors';
import productsRouter from './routes/products';

const app = express();
const PORT = process.env.PORT || 3001;

// CORS configuration - allow web1 and web2
const corsOptions = {
  origin: [
    'http://localhost:3002', // web1
    'http://localhost:3003', // web2
    process.env.WEB1_URL,
    process.env.WEB2_URL,
  ].filter(Boolean),
  credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', message: 'API is running' });
});

// API routes
app.get('/api/hello', (req, res) => {
  res.json({ message: 'Hello from API!' });
});

// Product routes
app.use('/api/products', productsRouter);

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// Error handler
app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error('Error:', err);
  res.status(500).json({ error: 'Internal server error' });
});

app.listen(PORT, () => {
  console.log(`🚀 API server running on http://localhost:${PORT}`);
  console.log(`📦 Products API: http://localhost:${PORT}/api/products`);
});

