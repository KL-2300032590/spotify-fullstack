// src/routes/offlineRoutes.js
import express from 'express';
import { saveOfflineSong, getOfflineSongs, removeOfflineSong } from '../controllers/offlineController.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/save', authMiddleware, saveOfflineSong);
router.get('/list', authMiddleware, getOfflineSongs);
router.delete('/remove/:songId', authMiddleware, removeOfflineSong);

export default router;
