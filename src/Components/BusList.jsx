import styled from "styled-components";
import React from 'react';
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const BusContainer = styled.div`
  background-color: burlywood;
  padding: 10px;
  border-radius: 10px;
  box-shadow: 0px 4px 8px rgba(0,0,0,0.2);
`;

const BusItem = styled.div`
  background-color: white;
  padding: 1rem;
  margin: 0.5rem 0;
  border-radius: 5px;
`;

export const BusList = ({ selectedBus }) => {
  const navigate = useNavigate();

  return (
    <BusContainer>
      <h2 style={{ textAlign: "center" }}>Available Buses</h2>
      {selectedBus.map((bus) => (
        <BusItem className="d-flex align-items-center justify-content-between" key={bus.id}>
          <div>
            <h4>{bus.name}</h4>
            <p>
              <strong className="p-1">From:</strong>{bus.source}
            </p>
            <p>
              <strong className="p-1">To:</strong> {bus.destination}
            </p>
            <p>
              <strong className="p-1">Departure Time:</strong> {bus.departureTime}
            </p>
            <p>
              <strong className="p-1">Tentative Arrival Time:</strong> {bus.arrivalTime}
            </p>
            <p>
              <strong className="p-1">Price:</strong>{bus.price}
            </p>
            <p>
              <strong className="p-1">Type:</strong>{bus.busType}
            </p>
          </div>
          <div>
            <Button
              variant="contained"
              color="success"
              className="mb-5"
              style={{ fontFamily: "monospace" }}
              onClick={() => navigate(`/Layout/${bus.id}`)}  
            >
              View Seats
            </Button>
            <h5 style={{ textAlign: "center" }}>Available Seats: {bus.availableSeats.length}</h5>
          </div>
        </BusItem>
      ))}
    </BusContainer>
  );
};
