import React, { useState } from 'react';
import styled from "styled-components";

const HomeContainer = styled.div`
  display: flex;
  position: relative;
  justify-content: center;
  height: 10rem;
  width: 98rem;
  justify-content: center;
  align-items: center;
  background-color: #f5f5f5;
  font-size: 2rem;
  background: linear-gradient(90deg, #a54ee3bf, #4cb5bd , #dea3a3);
  margin-bottom: 1rem;
`;

const Home = () => {


  return (
    <>
      <HomeContainer>
        Welcome to Bus Voyage App
      </HomeContainer>
      </>
  );
}

export default Home;
