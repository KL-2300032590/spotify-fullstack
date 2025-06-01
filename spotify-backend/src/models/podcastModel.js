// src/models/podcastModel.js

import mongoose from 'mongoose';

const podcastSchema = new mongoose.Schema({
  title: { type: String, required: true },
  speakers: { type: String, required: true },
  videoUrl: { type: String, required: true },
  duration: { type: Number, default: 0 },
}, { timestamps: true });

export default mongoose.model('Podcast', podcastSchema);
