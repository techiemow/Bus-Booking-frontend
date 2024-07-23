import { Autocomplete, TextField } from '@mui/material'
import React, { useState } from 'react'
import { locations } from '../../Constants/Data'
import { Dayjs } from 'dayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

const Buses = () => {
    const [fromValue, setFromValue] = useState(null);
    const [toValue, setToValue] = useState(null);
    const [value, setValue] = useState( null);
  
    const handleExchange = () => {
      const temp = fromValue;
      setFromValue(toValue);
      setToValue(temp);
    };
  return (
    <div style={{ display: "flex", alignItems: "center" , justifyContent:"center"}}>
    <Autocomplete
      disablePortal
      id="combo-box-demo-from"
      options={locations}
      sx={{ width: 300 }}
      value={fromValue}
      onChange={(event, newValue) => setFromValue(newValue)}
      renderInput={(params) => <TextField {...params} label="From" />}
    />
    <button onClick={handleExchange} style={{ margin: '0 10px', padding: '10px', cursor: 'pointer' }}>
      Exchange
    </button>
    <Autocomplete
      disablePortal
      id="combo-box-demo-to"
      options={locations}
      sx={{ width: 300 }}
      value={toValue}
      onChange={(event, newValue) => setToValue(newValue)}
      renderInput={(params) => <TextField {...params} label="To" />}
    />
 <LocalizationProvider dateAdapter={AdapterDayjs} style={{padding: '10px'}}>
      <DemoContainer components={['DatePicker']}>
        <DatePicker value={value} onChange={(newValue) => setValue(newValue)} />
      </DemoContainer>
    </LocalizationProvider>
  </div>

  )
}

export default Buses