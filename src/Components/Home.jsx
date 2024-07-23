import React from 'react'
import styled from "styled-components"
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { locations } from '../../Constants/Data';

const HomeContainer = styled.div`
  display: flex;
  position: relative;
  justify-content: center;
  height: 10rem;
  width: 95rem;
  align-items: center;
  background-color: #f5f5f5;
  font-size:2rem;
  background: linear-gradient(90deg, #a54ee3bf, #4cb5bd , #dea3a3);
`;

const Home = () => {
  return (
    <>
    <HomeContainer>
      Welcome to Bus Voyage App
    </HomeContainer>
<div style={{display:"flex"}}>
<Autocomplete
      disablePortal
      id="combo-box-demo"
      options={locations}
      sx={{ width: 300 }}
      renderInput={(params) => <TextField {...params} label="From" />}
    />
    
    <Autocomplete
      disablePortal
      id="combo-box-demo"
      options={locations}
      sx={{ width: 300 }}
      renderInput={(params) => <TextField {...params} label="To" />}
    />
</div>
    </>
  )
}

export default Home
