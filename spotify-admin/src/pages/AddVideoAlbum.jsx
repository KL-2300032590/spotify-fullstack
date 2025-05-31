// src/components/AddVideoAlbum.jsx
import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const AddVideoAlbum = ({ onCreate }) => {
  const [name, setName] = useState('');
  const [desc, setDesc] = useState('');
  const [bgColor, setBgColor] = useState('#3B82F6');
  const [loading, setLoading] = useState(false);

  const handleCreate = async (e) => {
    e.preventDefault();
    if (!name || !desc || !bgColor) {
      toast.error("All fields are required");
      return;
    }

    try {
      setLoading(true);
      await axios.post('http://localhost:4000/api/video-album/create', {
        name, desc, bgColor
      });
      toast.success("Album created successfully");
      onCreate(); // Refresh list or hide modal
      setName('');
      setDesc('');
      setBgColor('#3B82F6');
    } catch (err) {
      console.error(err);
      toast.error("Failed to create album");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleCreate} className="bg-gray-800 p-6 rounded-lg shadow-md text-white space-y-4 max-w-xl mx-auto">
      <h2 className="text-xl font-semibold mb-2">Create New Video Album</h2>

      <input
        type="text"
        placeholder="Album Name"
        className="w-full px-4 py-2 rounded bg-gray-700"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="text"
        placeholder="Album Description"
        className="w-full px-4 py-2 rounded bg-gray-700"
        value={desc}
        onChange={(e) => setDesc(e.target.value)}
      />
      <input
        type="color"
        className="w-20 h-10 p-1 bg-white rounded"
        value={bgColor}
        onChange={(e) => setBgColor(e.target.value)}
        title="Select background color"
      />

      <button
        type="submit"
        className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded font-semibold"
        disabled={loading}
      >
        {loading ? "Creating..." : "Create Album"}
      </button>
    </form>
  );
};

export default AddVideoAlbum;
