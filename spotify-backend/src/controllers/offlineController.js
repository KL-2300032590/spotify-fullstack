// src/controllers/offlineController.js
import OfflineSong from '../models/OfflineSong.js';

export const saveOfflineSong = async (req, res) => {
  const userId = req.user.id;
  const { songId, songData } = req.body;

  if (!songId || !songData) return res.status(400).json({ message: 'Missing songId or songData.' });

  try {
    const exists = await OfflineSong.findOne({ userId, songId });
    if (exists) return res.status(400).json({ message: 'Song already saved offline.' });

    const offlineSong = new OfflineSong({ userId, songId, songData });
    await offlineSong.save();

    res.status(201).json({ message: 'Song saved offline.', offlineSong });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error.' });
  }
};

export const getOfflineSongs = async (req, res) => {
  const userId = req.user.id;
  try {
    const songs = await OfflineSong.find({ userId });
    res.json(songs);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error.' });
  }
};

export const removeOfflineSong = async (req, res) => {
  const userId = req.user.id;
  const { songId } = req.params;

  try {
    const deleted = await OfflineSong.findOneAndDelete({ userId, songId });
    if (!deleted) return res.status(404).json({ message: 'Song not found.' });
    res.json({ message: 'Song removed from offline list.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error.' });
  }
};
