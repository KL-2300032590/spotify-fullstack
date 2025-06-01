// src/admin/AddPodcast.jsx
import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const AddPodcast = () => {
  const [title, setTitle] = useState('');
  const [speakers, setSpeakers] = useState('');
  const [video, setVideo] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!title || !speakers || !video) return toast.error('All fields are required');

    const formData = new FormData();
    formData.append('title', title);
    formData.append('speakers', speakers);
    formData.append('video', video);

    try {
      setLoading(true);
      const res = await axios.post('http://localhost:4000/api/podcast/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      toast.success('Podcast uploaded!');
      setTitle('');
      setSpeakers('');
      setVideo(null);
    } catch (err) {
      console.error(err);
      toast.error('Upload failed!');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#121212] text-white p-8">
      <h1 className="text-2xl font-bold mb-6">🎙️ Upload New Podcast</h1>
      <form
        onSubmit={handleUpload}
        className="space-y-6 bg-[#1f1f1f] p-6 rounded-lg shadow-lg max-w-xl"
      >
        <input
          type="text"
          placeholder="Podcast Title"
          className="w-full p-2 rounded bg-[#2a2a2a] text-white"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="text"
          placeholder="Speakers"
          className="w-full p-2 rounded bg-[#2a2a2a] text-white"
          value={speakers}
          onChange={(e) => setSpeakers(e.target.value)}
        />
        <input
          type="file"
          accept="video/*"
          className="w-full text-white"
          onChange={(e) => setVideo(e.target.files[0])}
        />

        <button
          type="submit"
          className="bg-green-600 px-6 py-2 rounded hover:bg-green-700 disabled:opacity-50"
          disabled={loading}
        >
          {loading ? 'Uploading...' : 'Upload Podcast'}
        </button>
      </form>
    </div>
  );
};

export default AddPodcast;
