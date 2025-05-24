import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const FetchFromAPI = ({ setSongData }) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchFromiTunes = async () => {
    if (!query.trim()) {
      toast.error('Please enter a search term');
      return;
    }
    setLoading(true);
    try {
      const response = await axios.get(
        `https://itunes.apple.com/search?term=${encodeURIComponent(query)}&entity=song&limit=10`
      );
      setResults(response.data.results);
    } catch (error) {
      console.error('API Fetch Error:', error);
      toast.error('Failed to fetch from iTunes API');
    }
    setLoading(false);
  };

  const handleUseThisSong = async (track) => {
    try {
      // Fetch audio preview blob
      const audioResponse = await fetch(track.previewUrl);
      const audioBlob = await audioResponse.blob();

      // Fetch cover image blob in high-res
      const imageResponse = await fetch(track.artworkUrl100.replace('100x100', '512x512'));
      const imageBlob = await imageResponse.blob();

      // Create File objects
      const audioFile = new File([audioBlob], 'preview.mp3', { type: audioBlob.type });
      const imageFile = new File([imageBlob], 'cover.jpg', { type: imageBlob.type });

      // Prepare song metadata object
      const songData = {
        name: track.trackName,
        artist: track.artistName,
        album: track.collectionName || 'none',
        duration: Math.round(track.trackTimeMillis / 1000).toString(),
        image: imageFile,
        audio: audioFile,
      };

      // Pass the data up to AddSong component
      setSongData(songData);

      toast.info(`Song data loaded. Please select album and submit.`);
    } catch (error) {
      console.error(error);
      toast.error('Failed to load song files.');
    }
  };

  return (
    <div className="p-6 max-w-3xl mx-auto border rounded shadow">
      <h2 className="text-2xl font-semibold mb-6">Fetch Song Metadata from iTunes</h2>

      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Enter song or artist name"
        className="w-full p-3 mb-4 border rounded"
      />

      <button
        onClick={fetchFromiTunes}
        className="bg-green-600 text-white px-5 py-2 rounded hover:bg-green-700 transition"
      >
        {loading ? 'Loading...' : 'Fetch'}
      </button>

      <div className="mt-8 space-y-6">
        {results.map((track) => (
          <div key={track.trackId} className="flex gap-4 p-4 border rounded shadow-sm bg-white">
            <img
              src={track.artworkUrl100.replace('100x100', '300x300')}
              alt={track.trackName}
              className="w-20 h-20 object-cover rounded"
            />

            <div className="flex-1">
              <h3 className="font-bold">{track.trackName}</h3>
              <p>{track.artistName}</p>
              <p className="text-sm text-gray-500">Album: {track.collectionName || 'Unknown'}</p>
              <audio controls className="mt-2 w-full">
                <source src={track.previewUrl} type="audio/mpeg" />
                Your browser does not support the audio element.
              </audio>
            </div>

            <button
              onClick={() => handleUseThisSong(track)}
              className="self-start bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
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
