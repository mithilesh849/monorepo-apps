import express from 'express';
import cors from 'cors';
import productsRouter from './routes/products';

const app = express();
const PORT = process.env.PORT || 3001;

// CORS configuration - allow web1 and web2 (dynamic URLs from environment)
const allowedOrigins: string[] = [];

// Add localhost URLs for development
if (process.env.NODE_ENV !== 'production') {
  allowedOrigins.push('http://localhost:3002'); // web1 local
  allowedOrigins.push('http://localhost:3003'); // web2 local
}

// Add environment-based URLs
if (process.env.WEB1_URL) {
  allowedOrigins.push(process.env.WEB1_URL);
}
if (process.env.WEB2_URL) {
  allowedOrigins.push(process.env.WEB2_URL);
}

const corsOptions = {
  origin: allowedOrigins.length > 0 ? allowedOrigins : true, // Allow all if no URLs configured
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

