import styled from "styled-components";
import React from 'react';
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import displayINRCurrency from "../Helper/Displayamount";

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
  display: flex;
  justify-content: space-between;
  align-items: center;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0px 8px 16px rgba(0, 0, 0, 0.2);
  }
`;

const Header = styled.h2`
  text-align: center;
  color: #333;
  margin-bottom: 20px;
`;

const BusDetails = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
`;

const BusInfoRow = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
`;

const BusName = styled.h4`
  font-size: 1.5rem;
  color: #333;
  flex: 1;
`;



const BusDetail = styled.p`
  font-size: 1rem;
  color: #555;
  margin: 5px 0;
`;

const ArrowContainer = styled.div`
  display: flex;
  align-items: center;
  margin: 10px 0;
`;

const Amenities = styled.div`
  margin-top: 10px;
`;

export const BusList = ({ selectedBus }) => {
  const navigate = useNavigate();

  return (
    <BusContainer>
      <Header>Available Buses</Header>
      {selectedBus.map((bus) => (
        <BusItem key={bus.id}>
          <BusDetails>
            <BusInfoRow>
              <BusName>{bus.name}</BusName>
              <ArrowContainer>
              <BusDetail>
                <strong>From:</strong> {bus.source}
              </BusDetail>
              <ArrowForwardIcon style={{ margin: "0 10px" }} />
              <BusDetail>
                <strong>To:</strong> {bus.destination}
              </BusDetail>
            </ArrowContainer>
     
            </BusInfoRow>
       
  
            <BusDetail>
              <strong>Departure Time:</strong> {bus.departureTime}
            </BusDetail>
            <BusDetail>
              <strong>Tentative Arrival Time:</strong> {bus.arrivalTime}
            </BusDetail>

                <BusDetail>
                  <strong>Price:</strong> {displayINRCurrency(bus.price)}
                </BusDetail>
                <BusDetail>
                  <strong>Type:</strong> {bus.busType}
                </BusDetail>
           
            <Amenities>
              <BusDetail><strong>Amenities:</strong> {bus?.amenities?.join(", ")}</BusDetail>
            </Amenities>
          </BusDetails>
          <Button
            variant="contained"
            color="success"
            style={{ fontFamily: "monospace" }}
            onClick={() => navigate(`/Layout/${bus.id}`)}
          >
            View Seats
          </Button>
        </BusItem>
      ))}
    </BusContainer>
  );
};
