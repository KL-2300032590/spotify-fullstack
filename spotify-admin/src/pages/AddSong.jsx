// src/components/AddSong.js

import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import * as mm from 'music-metadata-browser';
import { assets } from '../assets/assets';
import { url } from '../App';
import FetchFromAPI from './FetchFromAPI';

const formatDuration = (seconds) => {
  if (!seconds || isNaN(seconds)) return '';
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
};

const AddSong = () => {
  const [image, setImage] = useState(null);
  const [song, setSong] = useState(null);
  const [name, setName] = useState('');
  const [desc, setDesc] = useState('');
  const [album, setAlbum] = useState('none');
  const [duration, setDuration] = useState('');
  const [loading, setLoading] = useState(false);
  const [albumData, setAlbumData] = useState([]);
  const imageObjectUrlRef = useRef(null);

  useEffect(() => {
    return () => {
      if (imageObjectUrlRef.current) {
        URL.revokeObjectURL(imageObjectUrlRef.current);
      }
    };
  }, [image]);

  useEffect(() => {
    const fetchAlbums = async () => {
      try {
        const res = await axios.get(`${url}/api/album/list`);
        if (res.data.success) {
          setAlbumData(res.data.albums);
        } else {
          toast.error('Failed to load albums');
        }
      } catch {
        toast.error('Error loading albums');
      }
    };
    fetchAlbums();
  }, []);

  const setSongData = (data) => {
    if (data.name) setName(data.name);
    if (data.artist || data.album) {
      setDesc(`By ${data.artist || ''}${data.album ? ' — ' + data.album : ''}`);
    }
    if (data.image) {
      setImage(data.image);
      if (imageObjectUrlRef.current) {
        URL.revokeObjectURL(imageObjectUrlRef.current);
      }
      imageObjectUrlRef.current = URL.createObjectURL(data.image);
    }
    if (data.duration) {
      setDuration(formatDuration(data.duration));
    }
    if (data.album) {
      const match = albumData.find(
        (a) => a.name.toLowerCase().trim() === data.album.toLowerCase().trim()
      );
      if (match) {
        setAlbum(match.name);
      } else {
        setAlbum('none');
        toast.info(`Album "${data.album}" not found. Please select manually.`);
      }
    }
    if (data.audio) {
      setSong(data.audio);
    }
  };

  const handleSongUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setSong(file);
    try {
      const metadata = await mm.parseBlob(file);
      const durSeconds = metadata.format.duration;
      const title = metadata.common.title || file.name.replace(/\.[^/.]+$/, '');
      if (durSeconds) setDuration(formatDuration(durSeconds));
      if (!name) setName(title);
    } catch {
      toast.warn('Unable to read audio metadata');
    }
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setImage(file);
    if (imageObjectUrlRef.current) {
      URL.revokeObjectURL(imageObjectUrlRef.current);
    }
    imageObjectUrlRef.current = URL.createObjectURL(file);
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    if (!song) return toast.warn('Please upload a song file');

    setLoading(true);
    try {
      const formData = new FormData();
      formData.append('name', name.trim());
      formData.append('desc', desc.trim());
      formData.append('duration', duration);
      formData.append('image', image || '');
      formData.append('audio', song);
      formData.append('album', album);

      const res = await axios.post(`${url}/api/song/add`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      if (res.data.success) {
        toast.success('Song added successfully!');
        setName('');
        setDesc('');
        setAlbum('none');
        setImage(null);
        setSong(null);
        setDuration('');
        if (imageObjectUrlRef.current) {
          URL.revokeObjectURL(imageObjectUrlRef.current);
          imageObjectUrlRef.current = null;
        }
      } else {
        toast.error('Failed to add song');
      }
    } catch {
      toast.error('Server error');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="grid place-items-center min-h-[80vh]">
        <div className="w-16 h-16 border-4 border-gray-400 border-t-green-800 rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <form
      onSubmit={onSubmitHandler}
      className="flex flex-col items-start gap-8 text-gray-600"
      encType="multipart/form-data"
    >
      <FetchFromAPI setSongData={setSongData} />

      <div className="flex gap-8">
        <div className="flex flex-col gap-4">
          <p>Upload Song</p>
          <input type="file" id="song" accept="audio/*" hidden onChange={handleSongUpload} />
          <label htmlFor="song" className="cursor-pointer">
            <img
              src={song ? assets.upload_added : assets.upload_song}
              alt="Upload Song"
              className="w-24"
            />
          </label>
        </div>

        <div className="flex flex-col gap-4">
          <p>Upload Image</p>
          <input type="file" id="image" accept="image/*" hidden onChange={handleImageUpload} />
          <label htmlFor="image" className="cursor-pointer">
            <img
              src={image ? imageObjectUrlRef.current : assets.upload_area}
              alt="Upload Cover"
              className="w-24"
            />
          </label>
        </div>
      </div>

      <div className="flex flex-col gap-2.5">
        <p>Song name</p>
        <input
          type="text"
          maxLength={100}
          required
          placeholder="Type Here"
          className="bg-transparent outline-green-600 border-2 border-gray-400 p-2.5 w-[min(600px,90vw)]"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>

      <div className="flex flex-col gap-2.5">
        <p>Song description</p>
        <input
          type="text"
          maxLength={150}
          required
          placeholder="Type Here"
          className="bg-transparent outline-green-600 border-2 border-gray-400 p-2.5 w-[min(600px,90vw)]"
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
        />
      </div>

      <div className="flex flex-col gap-2.5">
        <p>Song duration</p>
        <input
          type="text"
          readOnly
          placeholder="00:00"
          className="bg-transparent outline-green-600 border-2 border-gray-400 p-2.5 w-[min(600px,90vw)]"
          value={duration}
        />
      </div>

      <div className="flex flex-col gap-2.5">
        <p>Choose Album</p>
        <select
          className="bg-transparent outline-green-600 border-2 border-gray-400 p-2.5 w-[min(600px,90vw)]"
          onChange={(e) => setAlbum(e.target.value)}
          value={album}
          required
        >
          <option value="none" disabled>
            Select Album
          </option>
          {albumData.map((a) => (
            <option key={a._id} value={a.name}>
              {a.name}
            </option>
          ))}
        </select>
      </div>

      <button
        type="submit"
        className="bg-green-600 text-white px-6 py-2 rounded disabled:opacity-50"
        disabled={!song || !name || album === 'none' || loading}
      >
        Upload Song
      </button>
    </form>
  );
};

export default AddSong;
