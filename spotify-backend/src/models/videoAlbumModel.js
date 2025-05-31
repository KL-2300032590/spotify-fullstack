// models/videoAlbumModel.js

import mongoose from 'mongoose';

const videoAlbumSchema = new mongoose.Schema({
  name: { type: String, required: true },
  desc:  String,
  bgColor: { type: String, default: '#121212' },
}, { timestamps: true });

export default mongoose.model('VideoAlbum', videoAlbumSchema);
