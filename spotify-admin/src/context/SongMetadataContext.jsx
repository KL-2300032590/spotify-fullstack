// src/context/SongMetadataContext.js
import { createContext, useState } from 'react';

export const SongMetadataContext = createContext();

export const SongMetadataProvider = ({ children }) => {
  const [metadata, setMetadata] = useState(null);

  return (
    <SongMetadataContext.Provider value={{ metadata, setMetadata }}>
      {children}
    </SongMetadataContext.Provider>
  );
};
