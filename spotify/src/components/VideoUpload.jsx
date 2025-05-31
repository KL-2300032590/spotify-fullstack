// src/components/VideoUpload.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const VideoUpload = ({ onSuccess }) => {
  const [albums, setAlbums] = useState([]);
  const [title, setTitle] = useState('');
  const [artist, setArtist] = useState('');
  const [albumId, setAlbumId] = useState('');
  const [videoFile, setVideoFile] = useState(null);
  const [uploading, setUploading] = useState(false);

  // Fetch albums from backend
  useEffect(() => {
    axios.get('http://localhost:4000/api/video-album')
      .then((res) => setAlbums(res.data))
      .catch((err) => {
        console.error('Error loading albums:', err);
        toast.error('Failed to fetch albums');
      });
  }, []);

  const handleUpload = async (e) => {
    e.preventDefault();

    if (!title || !albumId || !videoFile) {
      toast.error('Please fill all required fields');
      return;
    }

    try {
      setUploading(true);
      const formData = new FormData();
      formData.append('title', title);
      formData.append('artist', artist);
      formData.append('albumId', albumId);
      formData.append('video', videoFile);

      const res = await axios.post('http://localhost:4000/api/video/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      toast.success('Video uploaded successfully!');
      onSuccess();
      setTitle('');
      setArtist('');
      setAlbumId('');
      setVideoFile(null);
    } catch (err) {
      console.error(err);
      toast.error('Upload failed');
    } finally {
      setUploading(false);
    }
  };

  return (
    <form onSubmit={handleUpload} className="bg-gray-900 p-6 rounded-lg shadow-md space-y-4 max-w-xl mx-auto">
      <h3 className="text-lg font-semibold mb-4 text-white">Upload New Video</h3>

      <input
        type="text"
        placeholder="Title"
        className="w-full px-4 py-2 rounded bg-gray-800 text-white"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Artist"
        className="w-full px-4 py-2 rounded bg-gray-800 text-white"
        value={artist}
        onChange={(e) => setArtist(e.target.value)}
      />
      <select
        className="w-full px-4 py-2 rounded bg-gray-800 text-white"
        value={albumId}
        onChange={(e) => setAlbumId(e.target.value)}
        required
      >
        <option value="">Select Album</option>
        {albums.map((album) => (
          <option key={album._id} value={album._id}>
            {album.name}
          </option>
        ))}
      </select>
      <input
        type="file"
        accept="video/*"
        className="w-full px-4 py-2 text-white"
        onChange={(e) => setVideoFile(e.target.files[0])}
        required
      />

      <button
        type="submit"
        disabled={uploading}
        className="bg-green-600 hover:bg-green-700 text-white font-semibold px-4 py-2 rounded mt-4"
      >
        {uploading ? 'Uploading...' : 'Upload Video'}
      </button>
    </form>
  );
};

export default VideoUpload;
