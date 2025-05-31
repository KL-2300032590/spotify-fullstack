// middleware/upload.js

import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';
import ffmpeg from 'fluent-ffmpeg';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configure storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadDir = path.join(__dirname, '../../uploads/videos');
    // Create directory if it doesn't exist
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    // Create a unique filename with timestamp
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  }
});

// File filter
const fileFilter = (req, file, cb) => {
  const allowedTypes = ['video/mp4', 'video/webm', 'video/ogg'];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Invalid file type. Only MP4, WebM, and OGG videos are allowed.'), false);
  }
};

// Configure multer
const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 100 * 1024 * 1024, // 100MB limit
  }
});

// Video processing middleware
const processVideo = (req, res, next) => {
  if (!req.file) {
    return next();
  }

  const inputPath = req.file.path;
  const outputPath = inputPath.replace(/\.[^/.]+$/, '_optimized.mp4');
  
  ffmpeg(inputPath)
    .outputOptions([
      '-c:v libx264', // Use H.264 codec
      '-crf 23', // Constant Rate Factor (18-28 is good, lower is better quality but larger file)
      '-preset medium', // Encoding preset (slower = better compression)
      '-movflags +faststart', // Enable fast start for web playback
      '-c:a aac', // Audio codec
      '-b:a 128k', // Audio bitrate
      '-vf scale=1280:-2' // Scale video to 720p while maintaining aspect ratio
    ])
    .output(outputPath)
    .on('end', () => {
      // Delete original file and update req.file.path
      fs.unlink(inputPath, (err) => {
        if (err) console.error('Error deleting original file:', err);
        req.file.path = outputPath;
        req.file.filename = path.basename(outputPath);
        next();
      });
    })
    .on('error', (err) => {
      console.error('Error processing video:', err);
      next(err);
    })
    .run();
};

// Export middleware
export const uploadVideo = upload.single('video');
export const videoUpload = [uploadVideo, processVideo];
