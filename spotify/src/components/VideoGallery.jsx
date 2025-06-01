import React, { useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';
import Navbar from './Navbar';
import { assets } from '../assets/assets/assets';

const VideoGallery = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const galleryRef = useRef();
  const modalRef = useRef();
  const videoRefs = useRef({});

  const [albumsData, setAlbumsData] = useState([]);
  const [videos, setVideos] = useState([]);
  const [modalVideo, setModalVideo] = useState(null);
  const [isShuffle, setIsShuffle] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const isVideoAlbum = location.pathname.startsWith('/videos/album/');
  const albumId = isVideoAlbum ? location.pathname.split('/').pop() : '';
  const selectedAlbum = albumsData.find((a) => a._id === albumId);
  const bgColor = selectedAlbum?.bgColor || '#121212';

  // Fetch albums
  useEffect(() => {
    axios.get('https://antara-b.onrender.com/api/video-album')
      .then(res => setAlbumsData(res.data))
      .catch(() => toast.error('Album loading failed'));
  }, []);

  // Fetch videos
  useEffect(() => {
    const url = isVideoAlbum
      ? `https://antara-b.onrender.com/api/video/album/${albumId}`
      : `https://antara-b.onrender.com/api/video`;

    axios.get(url)
      .then(res => setVideos(res.data))
      .catch(() => toast.error('Video loading failed'));
  }, [albumId, isVideoAlbum]);

  useEffect(() => {
    if (galleryRef.current) {
      galleryRef.current.style.background = `linear-gradient(${bgColor}, #121212)`;
    }
  }, [bgColor]);

  const handleKeyDown = (e) => {
    if (!modalVideo) return;
    if (e.key === ' ') {
      const videoEl = document.querySelector('video');
      if (videoEl?.paused) videoEl.play();
      else videoEl.pause();
      e.preventDefault();
    } else if (e.key === 'ArrowUp') {
      handleSwipe('up');
    } else if (e.key === 'ArrowDown') {
      handleSwipe('down');
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [modalVideo]);

  const handleSwipe = (direction) => {
    let nextIndex = currentIndex;
    if (direction === 'up') {
      nextIndex = (currentIndex - 1 + videos.length) % videos.length;
    } else if (direction === 'down') {
      nextIndex = (currentIndex + 1) % videos.length;
    }

    const nextVideo = videos[nextIndex];
    if (nextVideo) {
      setModalVideo(nextVideo);
      setCurrentIndex(nextIndex);
    }
  };

  const openModal = (video, index) => {
    setModalVideo(video);
    setCurrentIndex(index);
  };

  const handleTouchStart = useRef(null);
  const handleTouchEnd = useRef(null);

  const handleTouchStartEvent = (e) => {
    handleTouchStart.current = e.touches[0].clientY;
  };

  const handleTouchEndEvent = (e) => {
    handleTouchEnd.current = e.changedTouches[0].clientY;
    const diff = handleTouchStart.current - handleTouchEnd.current;
    if (diff > 30) handleSwipe('down'); // swipe up
    else if (diff < -30) handleSwipe('up'); // swipe down
  };

  return (
    <>
      <Navbar />
      <br></br>
      <div ref={galleryRef} className="relative text-white min-h-screen p-4 transition-all duration-500 overflow-hidden">
        {/* Header */}
        <div className=" flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
          <div className="flex items-center gap-2">
            <img onClick={() => navigate(-1)} src={assets.arrow_left} alt="Back" className="w-8 bg-black p-2 rounded-2xl cursor-pointer" />
            <h2 className="my-5 font-bold text-2xl">Video Songs</h2>
          </div>
          <button
            onClick={() => setIsShuffle(!isShuffle)}
            className={`px-4 py-2 rounded-lg ${isShuffle ? 'bg-purple-700' : 'bg-green-600'} hover:bg-opacity-80 transition text-white`}
          >
            Shuffle: {isShuffle ? 'On' : 'Off'}
          </button>
        </div>

        {/* Albums */}
        <div className="flex flex-wrap gap-4 mb-8 justify-center">
          {albumsData.map((a) => (
            <button
              key={a._id}
              onClick={() => navigate(`/videos/album/${a._id}`)}
              className={`px-4 py-2 rounded-lg font-semibold ${a._id === albumId ? 'bg-white text-black' : 'text-white'}`}
              style={{ backgroundColor: a._id === albumId ? '#fff' : a.bgColor }}
            >
              {a.name}
            </button>
          ))}
          <button
            onClick={() => navigate('/videos')}
            className={`px-4 py-2 rounded-lg font-semibold ${!isVideoAlbum ? 'bg-white text-black' : 'bg-gray-700 text-white'}`}
          >
            All Videos
          </button>
        </div>

        {/* Videos */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {videos.map((video, index) => (
            <div
              key={video._id}
              className="relative rounded-lg overflow-hidden shadow-lg cursor-pointer group"
              onMouseEnter={() => videoRefs.current[video._id]?.play()}
              onMouseLeave={() => {
                const v = videoRefs.current[video._id];
                if (v) {
                  v.pause();
                  v.currentTime = 0;
                }
              }}
              onClick={() => openModal(video, index)}
            >
              <video
                ref={(el) => (videoRefs.current[video._id] = el)}
                src={video.videoUrl}
                className="w-full h-48 object-cover"
                muted
                preload="metadata"
                playsInline
              />
              <div className="absolute inset-0 bg-black bg-opacity-60 flex flex-col justify-center items-center px-4">
                <p className="font-semibold text-lg truncate">{video.title}</p>
                <p className="text-sm text-gray-300 truncate">{video.artist}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Modal with swipe */}
        {modalVideo && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-90 px-4 transition-transform duration-500"
            onTouchStart={handleTouchStartEvent}
            onTouchEnd={handleTouchEndEvent}
          >
            <div ref={modalRef} className="relative bg-black rounded-lg shadow-lg w-full max-w-xl transform scale-100 transition-transform duration-300">
              <video
                key={modalVideo._id}
                src={modalVideo.videoUrl}
                className="w-full rounded-lg max-h-[80vh] mx-auto"
                controls
                autoPlay
                playsInline
                onEnded={() => handleSwipe('down')}
              />
              <button
                onClick={() => setModalVideo(null)}
                className="absolute top-2 right-2 text-white text-2xl bg-gray-800 rounded-full px-3 py-1 hover:bg-gray-700"
              >
                ✕
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default VideoGallery;
