import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';

const Visualizer = () => {
  const canvasRef = useRef(null);
  const audioRef = useRef(null); // Better than useState for audio elements
  const [isPlaying, setIsPlaying] = useState(false);
  const [settings, setSettings] = useState({});
  const [songs, setSongs] = useState([]);
  const [selectedSong, setSelectedSong] = useState(null);

  // Fetch visualizer settings
  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const res = await axios.get('https://antara-b.onrender.com/api/visualizer/settings', {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });
        setSettings(res.data);
      } catch (err) {
        console.error("Visualizer settings fetch failed", err);
      }
    };
    fetchSettings();
  }, []);

  // Fetch songs
  useEffect(() => {
    const fetchSongs = async () => {
      try {
        const res = await axios.get('http://localhost:4000/api/song/list');
        if (Array.isArray(res.data.songs)) {
          setSongs(res.data.songs);
        }
      } catch (err) {
        console.error("Error fetching songs:", err);
      }
    };
    fetchSongs();
  }, []);

  // Visualizer logic
  useEffect(() => {
    if (!selectedSong || !isPlaying) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    const analyser = audioCtx.createAnalyser();
    let source;
    let animationId;

    // Proxy workaround (toggle this ON for CORS-safe testing)
    const PROXY_ENABLED = false;
    const audioUrl = PROXY_ENABLED
      ? `http://localhost:4000/api/proxy?url=${encodeURIComponent(selectedSong.file)}`
      : selectedSong.file;

    const audio = new Audio();
    audio.crossOrigin = 'anonymous'; // critical: set BEFORE src
    audio.src = audioUrl;
    audioRef.current = audio;

    source = audioCtx.createMediaElementSource(audio);
    source.connect(analyser);
    analyser.connect(audioCtx.destination);
    analyser.fftSize = 256;

    const bufferLength = analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);

    const draw = () => {
      animationId = requestAnimationFrame(draw);
      analyser.getByteFrequencyData(dataArray);

      ctx.fillStyle = settings.bgColor || '#111';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const barWidth = (canvas.width / bufferLength) * 2.5;
      let x = 0;
      for (let i = 0; i < bufferLength; i++) {
        const barHeight = dataArray[i];
        ctx.fillStyle = settings.barColor || `hsl(${barHeight + 200}, 100%, 50%)`;
        ctx.fillRect(x, canvas.height - barHeight, barWidth, barHeight);
        x += barWidth + 1;
      }
    };

    const start = async () => {
      try {
        await audio.play();
        draw();
      } catch (err) {
        console.error("Playback failed:", err);
      }
    };

    start();

    return () => {
      cancelAnimationFrame(animationId);
      if (audio) audio.pause();
      if (audioCtx) audioCtx.close();
    };
  }, [isPlaying, selectedSong, settings]);

  const togglePlay = () => {
    if (!selectedSong) {
      alert('Please select a song!');
      return;
    }

    if (isPlaying && audioRef.current) {
      audioRef.current.pause();
    }

    setIsPlaying((prev) => !prev);
  };

  return (
    <div className="max-w-4xl mx-auto p-6 mt-6 text-white bg-gradient-to-br from-black via-gray-900 to-gray-800 rounded-lg shadow-lg">
      <h2 className="text-3xl font-bold mb-6 text-red-500">Visualizer</h2>
      <p className="mb-4 text-gray-300">Choose a song to start visualizing:</p>

      <select
        onChange={(e) => {
          const song = songs.find((s) => s._id === e.target.value);
          setSelectedSong(song);
          setIsPlaying(false); // reset
        }}
        className="w-full p-2 mb-4 text-black rounded"
      >
        <option value="">-- Select a Song --</option>
        {songs.map((song) => (
          <option key={song._id} value={song._id}>
            {song.name} — {song.album}
          </option>
        ))}
      </select>

      <canvas ref={canvasRef} width={800} height={300} className="bg-black w-full rounded-lg" />

      <div className="mt-4 text-center">
        <button
          onClick={togglePlay}
          className={`px-6 py-2 rounded text-white font-semibold transition ${
            isPlaying ? 'bg-red-600 hover:bg-red-700' : 'bg-gray-700 hover:bg-gray-600'
          }`}
        >
          {isPlaying ? 'Stop Visualizer' : 'Start Visualizer'}
        </button>
      </div>
    </div>
  );
};

export default Visualizer;
