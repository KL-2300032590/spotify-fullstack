import React, { useEffect, useState } from 'react';
import { assets } from '../assets/assets';
import axios from 'axios';
import { url } from '../App';
import { toast } from 'react-toastify';
import * as mm from 'music-metadata-browser';
import FetchFromAPI from './FetchFromAPI';

const AddSong = () => {
  const [image, setImage] = useState(false);
  const [song, setSong] = useState(false);
  const [name, setName] = useState('');
  const [desc, setDesc] = useState('');
  const [album, setAlbum] = useState('none');
  const [duration, setDuration] = useState('');
  const [loading, setLoading] = useState(false);
  const [albumData, setAlbumData] = useState([]);

  // Function to handle data from FetchFromAPI component
  const setSongData = (data) => {
    if (data.name) setName(data.name);
    if (data.artist || data.album) {
      setDesc(`By ${data.artist}${data.album ? ' — ' + data.album : ''}`);
    }
    if (data.album) setAlbum(data.album);
    if (data.image) {
      fetch(data.image)
        .then(res => res.blob())
        .then(blob => setImage(new File([blob], "cover.jpg", { type: blob.type })))
        .catch(err => toast.error("Image fetch failed"));
    }
    if (data.duration) setDuration(data.duration);
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append('name', name);
      formData.append('desc', desc);
      formData.append('duration', duration);
      formData.append('image', image);
      formData.append('audio', song);
      formData.append('album', album);

      const response = await axios.post(`${url}/api/song/add`, formData);

      if (response.data.success) {
        toast.success('Song added!');
        setName('');
        setDesc('');
        setAlbum('none');
        setImage(false);
        setSong(false);
        setDuration('');
      } else {
        toast.error('Something went wrong');
      }
    } catch (error) {
      toast.error('Failed to connect to server');
    }
    setLoading(false);
  };

  const loadAlbumData = async () => {
    try {
      const response = await axios.get(`${url}/api/album/list`);
      if (response.data.success) {
        setAlbumData(response.data.albums);
      } else {
        toast.error('Unable to load album data');
      }
    } catch (error) {
      toast.error('Error loading albums');
    }
  };

  useEffect(() => {
    loadAlbumData();
  }, []);

  const handleSongUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setSong(file);

    try {
      const metadata = await mm.parseBlob(file);
      const dur = metadata.format.duration;
      const title = metadata.common.title || file.name.replace(/\.[^/.]+$/, '');

      if (dur) setDuration(dur.toFixed(2));
      if (!name) setName(title);
    } catch (error) {
      console.error('Metadata error:', error);
      toast.warn('Could not read song metadata');
    }
  };

  return loading ? (
    <div className='grid place-items-center min-h-[80vh]'>
      <div className='w-16 h-16 place-self-center border-4 border-gray-400 border-t-green-800 rounded-full animate-spin'></div>
    </div>
  ) : (
    <form onSubmit={onSubmitHandler} className='flex flex-col items-start gap-8 text-gray-600'>
      <FetchFromAPI setSongData={setSongData} />

      <div className='flex gap-8'>
        <div className='flex flex-col gap-4'>
          <p>Upload</p>
          <input onChange={handleSongUpload} type='file' id='song' accept='audio/*' hidden />
          <label htmlFor='song'>
            <img src={song ? assets.upload_added : assets.upload_song} className='w-24 cursor-pointer' alt='' />
          </label>
        </div>
        <div className='flex flex-col gap-4'>
          <p>Upload Image</p>
          <input onChange={(e) => setImage(e.target.files[0])} type='file' id='image' accept='image/*' hidden />
          <label htmlFor='image'>
            <img
              src={image ? URL.createObjectURL(image) : assets.upload_area}
              className='cursor-pointer w-24'
              alt=''
            />
          </label>
        </div>
      </div>

      <div className='flex flex-col gap-2.5'>
        <p>Song name</p>
        <input
          onChange={(e) => setName(e.target.value)}
          value={name}
          className='bg-transparent outline-green-600 border-2 border-gray-400 p-2.5 w-[max(40vw,250px)]'
          placeholder='Type Here'
          type='text'
          required
        />
      </div>

      <div className='flex flex-col gap-2.5'>
        <p>Song description</p>
        <input
          onChange={(e) => setDesc(e.target.value)}
          value={desc}
          className='bg-transparent outline-green-600 border-2 border-gray-400 p-2.5 w-[max(40vw,250px)]'
          placeholder='Type Here'
          type='text'
          required
        />
      </div>

      {duration && (
        <div className='flex flex-col gap-2.5'>
          <p>Duration</p>
          <input
            value={duration + ' sec'}
            readOnly
            className='bg-transparent outline-green-600 border-gray-400 border-2 p-2.5 w-[max(40vw,250px)] text-gray-700'
          />
        </div>
      )}

      <div className='flex flex-col gap-2.5'>
        <p>Album</p>
        <select
          onChange={(e) => setAlbum(e.target.value)}
          value={album}
          className='bg-transparent outline-green-600 border-2 border-gray-400 p-2.5 w-[max(40vw,250px)]'
          required
        >
          <option value='none'>None</option>
          {albumData.map((album) => (
            <option key={album._id} value={album.name}>
              {album.name}
            </option>
          ))}
        </select>
      </div>

      <button
        type='submit'
        className='bg-green-600 text-white px-8 py-2.5 rounded-full hover:bg-green-700 transition-colors'
      >
        Add Song
      </button>
    </form>
  );
};

export default AddSong;
