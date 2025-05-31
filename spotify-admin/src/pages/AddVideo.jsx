// src/pages/admin/AddVideo.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const AddVideo = () => {
  const [title, setTitle] = useState('');
  const [artist, setArtist] = useState('');
  const [albumId, setAlbumId] = useState('');
  const [videoFile, setVideoFile] = useState(null);
  const [albums, setAlbums] = useState([]);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    axios.get('http://localhost:4000/api/video-album')
      .then(res => setAlbums(res.data))
      .catch(err => {
        console.error('Failed to load albums:', err);
        toast.error('Failed to load video albums');
      });
  }, []);

  const handleUpload = async (e) => {
    e.preventDefault();

    if (!title || !albumId || !videoFile) {
      toast.error('Please fill all required fields.');
      return;
    }

    const formData = new FormData();
    formData.append('video', videoFile);
    formData.append('title', title);
    formData.append('artist', artist || 'Unknown Artist');
    formData.append('albumId', albumId);
    formData.append('duration', 0); // you can calculate client-side if needed

    try {
      setUploading(true);
      const res = await axios.post('http://localhost:4000/api/video/upload', formData);
      toast.success('Video uploaded successfully!');
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
    <div className="max-w-2xl mx-auto mt-8 bg-gray-900 text-white p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-6">Upload New Video Song</h2>

      <form onSubmit={handleUpload} className="space-y-4">
        <input
          type="text"
          placeholder="Title *"
          className="w-full px-4 py-2 rounded bg-gray-800"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <input
          type="text"
          placeholder="Artist"
          className="w-full px-4 py-2 rounded bg-gray-800"
          value={artist}
          onChange={(e) => setArtist(e.target.value)}
        />

        <select
          value={albumId}
          onChange={(e) => setAlbumId(e.target.value)}
          className="w-full px-4 py-2 rounded bg-gray-800"
        >
          <option value="">Select Album *</option>
          {albums.map((album) => (
            <option key={album._id} value={album._id}>
              {album.name}
            </option>
          ))}
        </select>

        <input
          type="file"
          accept="video/mp4,video/webm,video/ogg"
          className="w-full px-4 py-2 bg-gray-800 text-white"
          onChange={(e) => setVideoFile(e.target.files[0])}
        />

        <button
          type="submit"
          disabled={uploading}
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded font-semibold"
        >
          {uploading ? 'Uploading...' : 'Upload Video'}
        </button>
      </form>
    </div>
  );
};

export default AddVideo;
