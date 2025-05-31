import mongoose from 'mongoose';

// models/videoModel.js

const videoSchema = new mongoose.Schema({
  videoUrl: { type: String, required: true },
  title: { type: String, required: true },
  artist: { type: String, default: 'Unknown Artist' },
  albumId: { type: mongoose.Schema.Types.ObjectId, ref: 'VideoAlbum', required: true },
  duration: Number
}, { timestamps: true });


export default mongoose.model('Video', videoSchema);
