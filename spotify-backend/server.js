import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import songRouter from './src/routes/songRoute.js';
import connectDB from './src/config/mongodb.js';
import connectCloudinary from './src/config/cloudinary.js';
import albumRouter from './src/routes/albumRoute.js';

// App config
const app = express();
const port = process.env.PORT || 4000;

// Connect to database and cloudinary
connectDB();
connectCloudinary();

// CORS setup to allow frontend to access the backend
const allowedOrigins = [
  'http://localhost:3000', // for local testing
  'https://spotify-frontend-f16a.onrender.com' // production frontend
];

app.use(cors({
  origin: allowedOrigins
}));

// Middlewares
app.use(express.json());

// Initialize routes
app.use('/api/song', songRouter);
app.use('/api/album', albumRouter);

// Test route
app.get('/', (req, res) => res.send('API WORKING'));

// Start server
app.listen(port, () => console.log(`Server Started on port ${port}`));
