import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const url = 'http://localhost:5000'; // Update if your backend runs on a different port

const FetchFromAPI = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState([]);

  useEffect(() => {
    const fetchSongs = async () => {
      if (!searchTerm.trim()) return;

      try {
        const res = await fetch(`https://itunes.apple.com/search?term=${encodeURIComponent(searchTerm)}&entity=song&limit=10`);
        const data = await res.json();
        setResults(data.results);
      } catch (err) {
        console.error("Error fetching from iTunes API:", err);
      }
    };

    fetchSongs();
  }, [searchTerm]);

  const handleUseThisSong = async (track) => {
    try {
      const audioBlob = await fetch(track.previewUrl).then(res => res.blob());
      const imageBlob = await fetch(track.artworkUrl100.replace('100x100', '512x512')).then(res => res.blob());

      const formData = new FormData();
      formData.append('name', track.trackName);
      formData.append('desc', `${track.trackName} by ${track.artistName}`);
      formData.append('album', track.collectionName || 'none');
      formData.append('duration', '30');
      formData.append('image', imageBlob, 'cover.jpg');
      formData.append('audio', audioBlob, 'preview.mp3');

      const res = await axios.post(`${url}/api/song/add`, formData);
      if (res.data.success) {
        toast.success(`"${track.trackName}" added successfully!`);
      } else {
        toast.error(`Failed to add "${track.trackName}"`);
      }
    } catch (err) {
      console.error(err);
      toast.error('Error saving the song');
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">Fetch Song Metadata</h2>

      <input
        className="w-full p-2 rounded bg-[#1e1e1e] text-white"
        type="text"
        placeholder="Search for a song..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <div className="mt-4">
        {results.map((track, index) => (
          <div key={index} className="bg-white shadow-md p-4 rounded mb-4">
            <div className="flex gap-4 items-center">
              <img
                src={track.artworkUrl100.replace('100x100', '300x300')}
                alt={track.trackName}
                className="w-20 h-20 rounded"
              />
              <div>
                <h3 className="font-bold">{track.trackName}</h3>
                <p>{track.artistName}</p>
                <p className="text-sm text-gray-600">Album: {track.collectionName}</p>
              </div>
            </div>

            <audio controls className="w-full mt-2">
              <source src={track.previewUrl} type="audio/mpeg" />
              Your browser does not support the audio element.
            </audio>

            <button
              onClick={() => handleUseThisSong(track)}
              className="mt-3 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
            >
              Use This Song
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FetchFromAPI;
