// src/routes/videoRoute.js

import express from 'express';
import { uploadVideo } from '../middleware/videoUpload.js'; // Assuming Cloudinary middleware
import Video from '../models/videoModel.js';

const router = express.Router();

/**
 * @route POST /api/video/upload
 * @desc Upload a video to a specific album
 */
router.post('/upload', uploadVideo, async (req, res) => {
  try {
    const { title, artist, duration, albumId } = req.body;

    if (!req.file || !req.file.path && !req.file.secure_url) {
      return res.status(400).json({ error: 'No video file uploaded or Cloudinary failed' });
    }

    const videoUrl = req.file.secure_url || req.file.path;

    const newVideo = new Video({
      title,
      artist: artist || 'Unknown Artist',
      duration: duration || 0,
      albumId,
      videoUrl,
    });

    await newVideo.save();
    res.status(201).json(newVideo);
  } catch (err) {
    console.error('Video upload error:', err);
    res.status(500).json({ error: 'Video upload failed', details: err.message });
  }
});


/**
 * @route GET /api/video
 * @desc Fetch all videos
 */
router.get('/', async (req, res) => {
  try {
    const videos = await Video.find().sort({ createdAt: -1 });
    res.json(videos);
  } catch (err) {
    console.error('Error fetching videos:', err);
    res.status(500).json({ error: 'Fetching videos failed', details: err.message });
  }
});

/**
 * @route GET /api/video/album/:albumId
 * @desc Fetch videos belonging to a specific album
 */
router.get('/album/:albumId', async (req, res) => {
  try {
    const videos = await Video.find({ albumId: req.params.albumId }).sort({ createdAt: -1 });
    res.json(videos);
  } catch (err) {
    console.error('Error fetching album videos:', err);
    res.status(500).json({ error: 'Fetching videos by album failed', details: err.message });
  }
});

// @route GET /api/video/search?q=query
router.get('/search', async (req, res) => {
  const query = req.query.q;
  if (!query) return res.status(400).json({ error: 'Missing search query' });

  try {
    const regex = new RegExp(query, 'i'); // case-insensitive search
    const results = await Video.find({
      $or: [
        { title: regex },
        { artist: regex },
        { album: regex }
      ]
    }).sort({ createdAt: -1 });

    res.json(results);
  } catch (err) {
    console.error('Search error:', err);
    res.status(500).json({ error: 'Search failed', details: err.message });
  }
});


export default router;
