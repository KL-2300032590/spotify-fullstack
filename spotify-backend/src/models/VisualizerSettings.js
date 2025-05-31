// src/models/VisualizerSettings.js
import mongoose from 'mongoose';

const visualizerSettingsSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  theme: { type: String, default: 'default' },
  intensity: { type: Number, default: 50 },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

export default mongoose.model('VisualizerSettings', visualizerSettingsSchema);
