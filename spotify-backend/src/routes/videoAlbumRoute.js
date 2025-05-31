// routes/videoAlbumRoute.js

import express from 'express';
import VideoAlbum from '../models/videoAlbumModel.js';

const router = express.Router();

router.post('/create', async (req, res) => {
  try {
    const { name, desc, bgColor } = req.body;
    const newAlbum = new VideoAlbum({ name, desc, bgColor });
    await newAlbum.save();
    res.status(201).json(newAlbum);
  } catch (err) {
    res.status(500).json({ error: 'Failed to create album', details: err.message });
  }
});

router.get('/', async (req, res) => {
  try {
    const albums = await VideoAlbum.find();
    res.json(albums);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch albums' });
  }
});

export default router;
