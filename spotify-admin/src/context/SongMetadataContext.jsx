import React, { createContext, useState } from 'react';

export const SongMetadataContext = createContext();

export const SongMetadataProvider = ({ children }) => {
  const [songData, setSongData] = useState({
    name: '',
    description: '',
    duration: '',
    image: '',
    album: '',
    audioBlob: null,
  });

  return (
    <SongMetadataContext.Provider value={{ songData, setSongData }}>
      {children}
    </SongMetadataContext.Provider>
  );
};

