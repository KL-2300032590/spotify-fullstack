// src/routes/visualizerRoutes.js
import express from 'express';
import { getSettings, updateSettings } from '../controllers/visualizerController.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/settings', authMiddleware, getSettings);
router.put('/settings', authMiddleware, updateSettings);

export default router;
