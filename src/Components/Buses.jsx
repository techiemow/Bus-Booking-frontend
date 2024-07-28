import React, { useEffect, useContext, useState } from 'react';
import { BusContext } from '../Context/BusContext';
import { Autocomplete, TextField, Button } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import dayjs from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { BusesDetails, locations } from '../../Constants/Data';
import { BusList } from './BusList';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const StyledContainer = styled.div`
  padding: 20px;
  background-color: #f5f5f5;
  min-height: 100vh;
`;

const StyledSearchContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
`;

const StyledButton = styled(Button)`
  margin: 0 10px;
  padding: 10px;
  background-color: #1976d2;
  color: #fff;
  border-radius: 4px;
  &:hover {
    background-color: #1565c0;
  }
`;

const ErrorMessage = styled.div`
  color: red;
  text-align: center;
  margin-bottom: 20px;
  opacity: 0.9;
  transition: opacity 0.3s;
`;

const Buses = () => {
  const { searchDetails, setSearchDetails } = useContext(BusContext);
  const [selectedBus, setSelectedBus] = useState([]);
  const [error, setError] = useState('');


  const handleExchange = () => {
    setSearchDetails(prevDetails => ({
      ...prevDetails,
      from: searchDetails.to,
      to: searchDetails.from,
    }));
  };

  const handleFromChange = (event, newValue) => {
    if (newValue && newValue === searchDetails.to) {
      setError('From and To locations cannot be the same.');
    } else {
      setError('');
      setSearchDetails(prevDetails => ({ ...prevDetails, from: newValue }));
    }
  };

  const handleToChange = (event, newValue) => {
    if (newValue && newValue === searchDetails.from) {
      setError('From and To locations cannot be the same.');
    } else {
      setError('');
      setSearchDetails(prevDetails => ({ ...prevDetails, to: newValue }));
    }
  };

  const handleDateChange = (newValue) => {
    setSearchDetails(prevDetails => ({ ...prevDetails, date: newValue }));
  };

  useEffect(() => {
    console.log('Search Details:', searchDetails);
  }, [searchDetails]);

  useEffect(() => {
    setSearchDetails(prevDetails => ({ ...prevDetails, date: null }));
  }, []);

  const handleSearch = () => {
    if (searchDetails.from && searchDetails.to && searchDetails.date) {
      setSelectedBus(
        BusesDetails.filter(
          (bus) =>
            bus.source === searchDetails.from &&
            bus.destination === searchDetails.to
        )
      );
    } else {
      console.error('Please fill all search details.');
    }
  };

  return (
    <StyledContainer>
      <StyledSearchContainer>
        <Autocomplete
          disablePortal
          id="combo-box-demo-from"
          options={locations}
          sx={{ width: 300, marginRight: '10px' }}
          value={searchDetails.from}
          onChange={handleFromChange}
          renderInput={(params) => <TextField {...params} label="From" variant="outlined" />}
        />
        <StyledButton onClick={handleExchange} variant='contained'>
          <i className="fa-solid fa-arrow-right-arrow-left"></i>
        </StyledButton>
        <Autocomplete
          disablePortal
          id="combo-box-demo-to"
          options={locations}
          sx={{ width: 300, marginLeft: '10px' }}
          value={searchDetails.to}
          onChange={handleToChange}
          renderInput={(params) => <TextField {...params} label="To" variant="outlined" />}
        />
        <div style={{marginLeft:"20px"}}>
        <LocalizationProvider dateAdapter={AdapterDayjs} >
          <DatePicker
            value={searchDetails.date}
            onChange={handleDateChange}
            renderInput={(params) => <TextField {...params} label="Departure Date" variant="outlined" />}
            disablePast
            
          />
         
        </LocalizationProvider>
        </div>
        <StyledButton
          variant="contained"
          onClick={handleSearch}
          endIcon={<SendIcon />}
          disabled={!!error}
          style={{marginLeft:"20px"}}
        >
          Search
        </StyledButton>
      </StyledSearchContainer>
      {error && <ErrorMessage>{error}</ErrorMessage>}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <h3>Selected Bus Route:</h3>
        <div style={{ marginBottom: '8px' }}>
          <p>From: {searchDetails.from}</p>
        </div>
        <div style={{ marginBottom: '8px' }}>
          <p>To: {searchDetails.to}</p>
        </div>
        <div style={{ marginBottom: '8px' }}>
          <p>Departure Date: {searchDetails.date ? dayjs(searchDetails.date).format('YYYY-MM-DD') : 'Not selected'}</p>
        </div>
      </div>
      {selectedBus && selectedBus.length > 0 ? <BusList selectedBus={selectedBus} /> : <h2 style={{ textAlign: 'center' }}>No buses found</h2>}
    </StyledContainer>
  );
};

export default Buses;
