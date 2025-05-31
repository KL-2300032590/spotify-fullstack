import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';

const Visualizer = () => {
  const canvasRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioElement, setAudioElement] = useState(null);
  const [settings, setSettings] = useState({});
  const [songs, setSongs] = useState([]);
  const [selectedSong, setSelectedSong] = useState(null);

  // Fetch visualizer settings
  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const res = await axios.get('http://localhost:4000/api/visualizer/settings', {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });
        setSettings(res.data);
      } catch (err) {
        console.error("Visualizer settings fetch failed", err);
      }
    };

    fetchSettings();
  }, []);

  // Fetch songs from Cloudinary-backed DB
 useEffect(() => {
  const fetchSongs = async () => {
    try {
      const res = await axios.get('http://localhost:4000/api/song/list');
      if (res.data && Array.isArray(res.data.songs)) {
        setSongs(res.data.songs); // ✅ this is correct
      } else {
        console.error("Invalid response format:", res.data);
        setSongs([]);
      }
    } catch (error) {
      console.error("Error fetching songs:", error);
      setSongs([]);
    }
  };

  fetchSongs();
}, []);

  // Setup visualizer when song is selected and playing
  useEffect(() => {
    if (!selectedSong) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    let audioCtx, analyser, source;
    let animationId;

    const drawBars = () => {
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

      draw();
    };

    const playSong = async () => {
      const audio = new Audio(selectedSong.file); // Cloudinary URL
      setAudioElement(audio);

      audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      analyser = audioCtx.createAnalyser();
      source = audioCtx.createMediaElementSource(audio);
      source.connect(analyser);
      analyser.connect(audioCtx.destination);
      analyser.fftSize = 256;

      await audio.play();
      drawBars();
    };

    if (isPlaying) {
      playSong();
    }

    return () => {
      cancelAnimationFrame(animationId);
      if (audioCtx) audioCtx.close();
      if (audioElement) audioElement.pause();
    };
  }, [isPlaying, selectedSong, settings]);

  const togglePlay = () => {
    if (!selectedSong) {
      alert('Please select a song!');
      return;
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
