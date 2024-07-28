import React, { useState } from 'react';
import styled from "styled-components";

const HomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  width: 100vw;
  background: linear-gradient(90deg, #a54ee3bf, #4cb5bd , #dea3a3);
  font-size: 2rem;
  color: #fff;
  text-align: center;
`;

const Title = styled.h1`
  margin-bottom: 2rem;
  font-size: 3rem;
  color: #fff;
`;

const Description = styled.p`
  font-size: 1.5rem;
  margin-bottom: 2rem;
  max-width: 600px;
  line-height: 1.5;
`;

const Button = styled.button`
  padding: 1rem 2rem;
  font-size: 1.2rem;
  color: #fff;
  background-color: #4cb5bd;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #3a9ca5;
  }
`;

const ScrollButton = styled.button`
  padding: 10px 20px;
  font-size: 16px;
  color: #fff;
  background-color: #1976d2;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
  &:hover {
    background-color: #1565c0;
  }
`;
const Home = () => {
  const handleScroll = () => {
    window.scrollTo({
      top: 600, // Adjust this value to the position you want to scroll to
      behavior: 'smooth'
    });
  };

  return (
    <HomeContainer>
      <Title>Welcome to Bus Voyage</Title>
      <Description>
        Experience the best bus travel with us. We provide a seamless booking experience and ensure you have a comfortable journey.
      </Description>
      <ScrollButton onClick={handleScroll}>Book Your Trip</ScrollButton>
    </HomeContainer>
  );
}

export default Home;
