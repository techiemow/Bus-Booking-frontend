import styled from "styled-components";
import React from 'react';
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const BusContainer = styled.div`
  background: linear-gradient(135deg, #f5f5f5, #e0e0e0);
  padding: 20px;
  border-radius: 15px;
  box-shadow: 0px 8px 16px rgba(0, 0, 0, 0.2);
  margin: 20px;
`;

const BusItem = styled.div`
  background-color: #ffffff;
  padding: 1.5rem;
  margin: 10px 0;
  border-radius: 10px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0px 8px 16px rgba(0, 0, 0, 0.2);
  }
`;

const Header = styled.h2`
  text-align: center;
  color: #333;
`;

const BusDetail = styled.p`
  margin: 5px 0;
  font-size: 1rem;
  color: #555;
`;


export const BusList = ({ selectedBus }) => {
  const navigate = useNavigate();

  return (
    <BusContainer>
      <Header style={{ textAlign: "center" }}>Available Buses</Header>
      {selectedBus.map((bus) => (
        <BusItem className="d-flex align-items-center justify-content-between px-5" key={bus.id}>
          <div>
            <h4>{bus.name}</h4>
            <BusDetail>
              <strong>From:</strong> {bus.source}
            </BusDetail>
            <BusDetail>
              <strong>To:</strong> {bus.destination}
            </BusDetail>
            <BusDetail>
              <strong>Departure Time:</strong> {bus.departureTime}
            </BusDetail>
            <BusDetail>
              <strong>Tentative Arrival Time:</strong> {bus.arrivalTime}
            </BusDetail>
            <BusDetail>
              <strong>Price:</strong> {bus.price}
            </BusDetail>
            <BusDetail>
              <strong>Type:</strong> {bus.busType}
            </BusDetail>
          </div>
          <div className="px-5">
            <Button
              variant="contained"
              color="success"
              className="mb-5 "
              style={{ fontFamily: "monospace" }}
              onClick={() => navigate(`/Layout/${bus.id}`)}  
            >
              View Seats
            </Button>
           
          </div>
        </BusItem>
      ))}
    </BusContainer>
  );
};
