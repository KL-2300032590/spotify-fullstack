// src/middleware/videoUpload.js
import multer from 'multer';
import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'video_songs',
    resource_type: 'video',
    allowed_formats: ['mp4', 'mov', 'webm'],
  },
});

const upload = multer({ storage });

export const uploadVideo = upload.single('video');
