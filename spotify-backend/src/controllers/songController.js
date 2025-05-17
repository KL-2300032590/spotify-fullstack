import { v2 as cloudinary } from 'cloudinary';
import songModel from '../models/songModel.js';
import fetch from 'node-fetch'; // Ensure this is installed via npm

// 🎵 Add Song (Manual Upload)
const addSong = async (req, res) => {
  try {
    const { name, desc, album } = req.body;
    const audioFile = req.files.audio?.[0];
    const imageFile = req.files.image?.[0];

    if (!name || !desc || !album || !audioFile || !imageFile) {
      return res.status(400).json({ success: false, message: "Missing required fields" });
    }

    // Upload audio & image to Cloudinary
    const audioUpload = await cloudinary.uploader.upload(audioFile.path, {
      resource_type: "video"
    });

    const imageUpload = await cloudinary.uploader.upload(imageFile.path, {
      resource_type: "image"
    });

    // Duration format mm:ss
    const duration = `${Math.floor(audioUpload.duration / 60)}:${String(Math.floor(audioUpload.duration % 60)).padStart(2, '0')}`;

    // Save song to DB
    const songData = {
      name,
      desc,
      album,
      image: imageUpload.secure_url,
      file: audioUpload.secure_url,
      duration,
    };

    const song = new songModel(songData);
    await song.save();

    res.json({ success: true, message: "Song added successfully" });
  } catch (error) {
    console.error("❌ Error adding song:", error);
    res.status(500).json({ success: false, message: "Something went wrong" });
  }
};

// 📜 List All Songs
const listSong = async (req, res) => {
  try {
    const allSongs = await songModel.find({});
    res.json({ success: true, songs: allSongs });
  } catch (error) {
    console.error("❌ Error listing songs:", error);
    res.status(500).json({ success: false });
  }
};

// ❌ Remove Song by ID
const removeSong = async (req, res) => {
  try {
    await songModel.findByIdAndDelete(req.body.id);
    res.json({ success: true, message: "Song removed" });
  } catch (error) {
    console.error("❌ Error removing song:", error);
    res.status(500).json({ success: false, message: "Song not removed" });
  }
};

// 🎧 Add Song from iTunes API (Search by Query)
const addSongFromAPI = async (req, res) => {
  try {
    const { query } = req.body;

    if (!query) {
      return res.status(400).json({ success: false, message: "No query provided" });
    }

    const response = await fetch(`https://itunes.apple.com/search?term=${encodeURIComponent(query)}&media=music&limit=1`);
    const data = await response.json();

    if (data.resultCount === 0) {
      return res.status(404).json({ success: false, message: "No results found" });
    }

    const song = data.results[0];

    const newSong = {
      name: song.trackName,
      album: song.collectionName,
      artist: song.artistName,
      image: song.artworkUrl100.replace('100x100', '500x500'),
      url: song.trackViewUrl,
      preview: song.previewUrl,
      duration: Math.floor(song.trackTimeMillis / 1000), // duration in seconds
    };

    res.status(200).json({ success: true, song: newSong });
  } catch (error) {
    console.error("❌ Error fetching from API:", error);
    res.status(500).json({ success: false, message: "Failed to fetch song data" });
  }
};

export { addSong, listSong, removeSong, addSongFromAPI };
