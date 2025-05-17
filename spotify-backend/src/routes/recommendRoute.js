import express from 'express';
import Song from '../models/songModel.js';
import natural from 'natural';

const router = express.Router();

router.get('/:songId', async (req, res) => {
  try {
    const { songId } = req.params;
    const targetSong = await Song.findById(songId);
    if (!targetSong) return res.status(404).json({ message: 'Song not found' });

    const allSongs = await Song.find({ _id: { $ne: songId } }); // exclude the target song
    const tfidf = new natural.TfIdf();

    // Step 1: Combine relevant text fields
    const songTexts = allSongs.map(song =>
      `${song.name} ${song.desc} ${song.album}`
    );

    const targetText = `${targetSong.name} ${targetSong.desc} ${targetSong.album}`;

    // Step 2: Add songs to tf-idf
    songTexts.forEach((text, index) => tfidf.addDocument(text, allSongs[index]._id.toString()));

    // Step 3: Score similarities
    const scores = [];
    tfidf.tfidfs(targetText, (i, measure) => {
      scores.push({ song: allSongs[i], score: measure });
    });

    // Step 4: Sort and return top 3
    scores.sort((a, b) => b.score - a.score);
    const topRecommendations = scores.slice(0, 3).map(s => s.song);

    res.json(topRecommendations);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;
