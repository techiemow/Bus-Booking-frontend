import React, { useEffect, useContext, useState } from 'react';
import { BusContext } from '../Context/BusContext';
import { Autocomplete, TextField, Button, useMediaQuery, useTheme } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import dayjs from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { BusesDetails, locations } from '../../Constants/Data';
import { BusList } from './BusList';
import styled from 'styled-components';

const StyledContainer = styled.div`
  padding: 20px;
  background-color: #f5f5f5;
  min-height: 100vh;
`;

const StyledSearchContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;

  @media (min-width: 600px) {
    flex-direction: row;
    align-items: center;
    justify-content: center;
  }
`;

const StyledAutocomplete = styled(Autocomplete)`
  margin: 10px 0;
  width: 100%;

  @media (min-width: 600px) {
    margin: 0 10px;
    width: 300px;
  }
`;

const StyledDatePickerContainer = styled.div`
  margin: 10px 0;
  width: 100%;

  @media (min-width: 600px) {
    margin-left: 20px;
    width: auto;
  }
`;

const StyledButtonContainer = styled.div`
  margin: 10px 0;
  width: 100%;
  display: flex;
  justify-content: center;

  @media (min-width: 600px) {
    margin-left: 20px;
    width: auto;
  }
`;

const StyledButton = styled(Button)`
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

  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const handleExchange = () => {
    setSearchDetails((prevDetails) => ({
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
      setSearchDetails((prevDetails) => ({ ...prevDetails, from: newValue }));
    }
  };

  const handleToChange = (event, newValue) => {
    if (newValue && newValue === searchDetails.from) {
      setError('From and To locations cannot be the same.');
    } else {
      setError('');
      setSearchDetails((prevDetails) => ({ ...prevDetails, to: newValue }));
    }
  };

  const handleDateChange = (newValue) => {
    setSearchDetails((prevDetails) => ({ ...prevDetails, date: newValue }));
  };

  useEffect(() => {
    setSearchDetails((prevDetails) => ({ ...prevDetails, date: null }));
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
      setError('Please fill all search details.');
    }
  };

  return (
    <StyledContainer>
      <StyledSearchContainer>
        <StyledAutocomplete
          disablePortal
          id="combo-box-demo-from"
          options={locations}
          value={searchDetails.from}
          onChange={handleFromChange}
          renderInput={(params) => <TextField {...params} label="From" variant="outlined" />}
        />
        <StyledButtonContainer>
          <StyledButton onClick={handleExchange} variant="contained">
            <i className="fa-solid fa-arrow-right-arrow-left"></i>
          </StyledButton>
        </StyledButtonContainer>
        <StyledAutocomplete
          disablePortal
          id="combo-box-demo-to"
          options={locations}
          value={searchDetails.to}
          onChange={handleToChange}
          renderInput={(params) => <TextField {...params} label="To" variant="outlined" />}
        />
        <StyledDatePickerContainer>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              value={searchDetails.date}
              onChange={handleDateChange}
              renderInput={(params) => <TextField {...params} label="Departure Date" variant="outlined" />}
              disablePast
            />
          </LocalizationProvider>
        </StyledDatePickerContainer>
        <StyledButtonContainer>
          <StyledButton
            variant="contained"
            onClick={handleSearch}
            endIcon={<SendIcon />}
            disabled={!!error}
          >
            Search
          </StyledButton>
        </StyledButtonContainer>
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
