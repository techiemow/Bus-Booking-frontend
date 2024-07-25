import dayjs from 'dayjs';
import React, { createContext, useState } from 'react';

export const BusContext = createContext();

export const BusProvider = ({ children }) => {
  const [searchDetails, setSearchDetails] = useState({
    from:'',
    to:'',
    date: dayjs(),

  });

  return (
    <BusContext.Provider value={{ searchDetails, setSearchDetails }}>
      {children}
    </BusContext.Provider>
  );
};
