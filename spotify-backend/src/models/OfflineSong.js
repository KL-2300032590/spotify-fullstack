// src/models/OfflineSong.js
import mongoose from 'mongoose';

const offlineSongSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  songId: { type: String, required: true },
  songData: { type: Object, required: true },
  savedAt: { type: Date, default: Date.now },
});

export default mongoose.model('OfflineSong', offlineSongSchema);
