// src/routes/podcastRoute.js

import express from 'express';
import { uploadVideo } from '../middleware/videoUpload.js';
import Podcast from '../models/podcastModel.js';

const router = express.Router();

/**
 * @route POST /api/podcast/upload
 * @desc Upload a podcast video
 */
router.post('/upload', uploadVideo, async (req, res) => {
  try {
    const { title, speakers } = req.body;
    const videoUrl = req.file?.path || req.file?.secure_url;

    if (!videoUrl) {
      return res.status(400).json({ error: 'No video uploaded' });
    }

    const newPodcast = new Podcast({ title, speakers, videoUrl });
    await newPodcast.save();

    res.status(201).json(newPodcast);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Upload failed' });
  }
});

/**
 * @route GET /api/podcast
 * @desc Get all podcasts
 */
router.get('/', async (req, res) => {
  try {
    const podcasts = await Podcast.find().sort({ createdAt: -1 });
    res.json(podcasts);
  } catch (err) {
    console.error('Fetching podcasts failed:', err);
    res.status(500).json({ error: 'Failed to fetch podcasts', details: err.message });
  }
});

export default router;
