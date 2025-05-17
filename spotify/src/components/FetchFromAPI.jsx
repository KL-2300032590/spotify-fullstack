import React, { useState } from 'react';
import axios from 'axios';
import { url } from '../config/api'; 
import { toast } from 'react-toastify';

const FetchFromAPI = () => {
    
  const [query, setQuery] = useState('');
  const [songData, setSongData] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchSongData = async () => {
    if (!query.trim()) {
      toast.warn("Please enter a song name.");
      return;
    }

    try {
      setLoading(true);
      const res = await axios.get(`${url}/api/fetch-song-data?q=${encodeURIComponent(query)}`);
      setSongData(res.data.data);
      toast.success("Song data fetched successfully!");
    } catch (err) {
      toast.error("Failed to fetch song data.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2 className='text-xl font-bold mb-4'>Fetch Song Metadata</h2>
      <div className='flex gap-4 mb-4'>
        <input
          type='text'
          placeholder='Enter song name (e.g., Eminem Lose Yourself)'
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className='border border-gray-300 px-4 py-2 rounded w-[60%]'
        />
        <button
          onClick={fetchSongData}
          className='bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded'
          disabled={loading}
        >
          {loading ? 'Fetching...' : 'Fetch'}
        </button>
      </div>

      {songData && (
        <div className='bg-white p-4 rounded shadow-md max-w-xl'>
          <h3 className='font-semibold text-lg mb-2'>Fetched Data:</h3>
          <p><strong>Song Name:</strong> {songData.name}</p>
          <p><strong>Album:</strong> {songData.album}</p>
          <p><strong>Description:</strong> {songData.desc}</p>
          <p><strong>Image URL:</strong> <a href={songData.image} className="text-blue-600 underline" target='_blank' rel='noreferrer'>Preview</a></p>
          <p><strong>File URL:</strong> <a href={songData.file} className="text-blue-600 underline" target='_blank' rel='noreferrer'>Preview</a></p>
          <p><strong>Duration:</strong> {songData.duration}</p>
        </div>
      )}
    </div>
  );
};

export default FetchFromAPI;
