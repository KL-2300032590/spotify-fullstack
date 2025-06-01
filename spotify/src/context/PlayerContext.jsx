import { createContext, useEffect, useRef, useState } from "react";
import axios from 'axios';

const PlayerContext = createContext();

const PlayerContextProvider = (props) => {
    const audioRef = useRef();
    const seekBg = useRef();
    const seekBar = useRef();

    const url = 'https://antara-b.onrender.com';
    const [songsData, setSongsData] = useState([]);
    const [albumsData, setAlbumsData] = useState([]);

    const [track, setTrack] = useState(null);
    const [playStatus, SetPlayStatus] = useState(false);
    const [time, SetTime] = useState({
        currentTime: { second: 0, minute: 0 },
        totalTime: { second: 0, minute: 0 }
    });

    const play = () => {
        if (audioRef.current) {
            audioRef.current.play().catch(err => console.error("Playback failed:", err));
            SetPlayStatus(true);
        }
    }

    const pause = () => {
        if (audioRef.current) {
            audioRef.current.pause();
            SetPlayStatus(false);
        }
    }

    const playWithId = (id) => {
        const song = songsData.find(item => item._id === id);
        if (song) {
            if (audioRef.current) {
                audioRef.current.pause();
                audioRef.current.currentTime = 0;
            }
            setTrack(song);
            // DO NOT set play status here; wait for canplay event
        }
    }

    const playTrack = (song) => {
        if (audioRef.current) {
            audioRef.current.pause();
            audioRef.current.currentTime = 0;
        }
        setTrack(song);
        // Play status will be handled in effect
    };

    const previous = () => {
        if (!track) return;
        const currentIndex = songsData.findIndex(item => item._id === track._id);
        if (currentIndex > 0) {
            setTrack(songsData[currentIndex - 1]);
            // Play status handled in useEffect
        }
    }

    const next = () => {
        if (!track) return;
        const currentIndex = songsData.findIndex(item => item._id === track._id);
        if (currentIndex < songsData.length - 1) {
            setTrack(songsData[currentIndex + 1]);
            // Play status handled in useEffect
        } else {
            SetPlayStatus(false);
        }
    }

    const seekSong = (e) => {
        if (audioRef.current && seekBg.current) {
            const newTime = (e.nativeEvent.offsetX / seekBg.current.offsetWidth) * audioRef.current.duration;
            audioRef.current.currentTime = newTime;
        }
    }

    const getSongsData = async () => {
        try {
            const response = await axios.get(`${url}/api/song/list`);
            setSongsData(response.data.songs);
            if (response.data.songs.length > 0) {
                setTrack(response.data.songs[0]);
            }
           // console.log("Fetched songs data:", response.data.songs);
        } catch (error) {
            console.error("Error fetching songs:", error);
        }
    }

    const getAlbumsData = async () => {
        try {
            const response = await axios.get(`${url}/api/album/list`);
            setAlbumsData(response.data.albums);
           // console.log("Fetched albums data:", response.data.albums);
        } catch (error) {
            console.error("Error fetching albums:", error);
        }
    }

    useEffect(() => {
        const interval = setInterval(() => {
            if (audioRef.current && seekBar.current) {
                audioRef.current.ontimeupdate = () => {
                    seekBar.current.style.width = `${Math.floor(audioRef.current.currentTime / audioRef.current.duration * 100)}%`;
                    SetTime({
                        currentTime: {
                            second: Math.floor(audioRef.current.currentTime % 60),
                            minute: Math.floor(audioRef.current.currentTime / 60)
                        },
                        totalTime: {
                            second: Math.floor(audioRef.current.duration % 60) || 0,
                            minute: Math.floor(audioRef.current.duration / 60) || 0
                        }
                    });
                }
            }
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        getSongsData();
        getAlbumsData();
    }, []);

    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.onended = next;
        }
    }, [track]);

    useEffect(() => {
        if (track && audioRef.current) {
            const audio = audioRef.current;
          //  console.log("Track changed to:", track.name, "with file:", track.file);

            audio.pause();
            audio.currentTime = 0;
            audio.src = track.file;

            const handleCanPlay = () => {
                audio.play().catch(err => {
                    console.error("Playback failed:", err);
                    SetPlayStatus(false);
                });
                SetPlayStatus(true);
                audio.removeEventListener('canplaythrough', handleCanPlay);
            };

            audio.addEventListener('canplaythrough', handleCanPlay);
            audio.load();

            return () => {
                audio.removeEventListener('canplaythrough', handleCanPlay);
            };
        }
    }, [track]);

    const ContextValue = {
        audioRef,
        seekBar,
        seekBg,
        track, setTrack,
        playStatus, SetPlayStatus,
        time, SetTime,
        play, pause,
        playWithId,
        playTrack,
        previous,
        next,
        seekSong,
        songsData,
        albumsData,
    }

    return (
        <PlayerContext.Provider value={ContextValue}>
            {props.children}
        </PlayerContext.Provider>
    )
}

export { PlayerContext };
export default PlayerContextProvider;
