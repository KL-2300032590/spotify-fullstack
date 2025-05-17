import express from 'express';
import { fetchSongFromAPI } from '../controllers/apiFetchController.js';

const router = express.Router();

router.get('/fetch-song-data', fetchSongFromAPI);

export default router;
