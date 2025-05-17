import axios from 'axios';

const fetchSongFromAPI = async (req, res) => {
    try {
        const query = req.query.q;
        if (!query) return res.status(400).json({ success: false, message: "Query is required" });

        const response = await axios.get(`https://itunes.apple.com/search?term=${encodeURIComponent(query)}&media=music&limit=1`);
        const result = response.data.results[0];

        if (!result) return res.status(404).json({ success: false, message: "No results found" });

        const songData = {
            name: result.trackName,
            album: result.collectionName,
            artist: result.artistName,
            image: result.artworkUrl100.replace('100x100', '600x600'),
            preview: result.previewUrl,
            duration: `${Math.floor(result.trackTimeMillis / 60000)}:${Math.floor((result.trackTimeMillis % 60000) / 1000).toString().padStart(2, '0')}`
        };

        res.json({ success: true, data: songData });
    } catch (err) {
        res.status(500).json({ success: false, message: "Something went wrong", error: err.message });
    }
};

export { fetchSongFromAPI };
