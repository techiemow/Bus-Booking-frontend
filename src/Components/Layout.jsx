import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { BusesDetails } from '../../Constants/Data';
import { Button } from '@mui/material';

const Header = styled.h1`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 24px;
  height: 100px;
  margin-bottom: 10px;
  background-color: #f9f9f9;
  padding: 10px;
  border-radius: 5px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  transition: background-color 0.3s ease;
  cursor: pointer;
`;

const Container = styled.div`
  background-color: #f0f0f0;
  border-radius: 5px;
  padding: 1rem;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
`;

const SeatContainer = styled.div`
  padding: 0.5rem;
`;

const Seatlist = styled.li`
  list-style-type: none;
  margin: 0.5rem;
  padding: 1rem;
  border-radius: 8px;
  cursor: pointer;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  background-color: white;
`;

const Layout = ({ selectedSeats, setselectedSeats }) => {
  const navigate = useNavigate();
  const { id } = useParams();

  const selectedbus = BusesDetails.find((data) => data.id === parseInt(id));
  const isSeater = selectedbus.busType === 'Seater';
  const seatwidth = isSeater ? '30px' : '80px';

  const isAvailable = (seat) => selectedbus.availableSeats.includes(seat);

  const seatselection = (seat) => {
    setselectedSeats((prevState) =>
      prevState.includes(seat)
        ? prevState.filter((selectedSeat) => selectedSeat !== seat)
        : [...prevState, seat]
    );
  };

  const isSeatSelected = (seat) => selectedSeats.includes(seat);

  const generateSeats = (array, key = '') =>
    array.map((seats, index) =>
      Array.isArray(seats) ? (
        <div className="d-flex" key={index}>
          {seats.map((seat) => (
            <Seatlist
              key={seat}
              style={{
                width: seatwidth,
                background: isSeatSelected(`${key}${seat}`) ? "#318beb" : isAvailable(`${key}${seat}`) ? '#fff' : '#b6b4b4',
                cursor: isAvailable(`${key}${seat}`) ? 'pointer' : 'not-allowed',
              }}
              onClick={() => isAvailable(`${key}${seat}`) && seatselection(`${key}${seat}`)}
            >
              {key}{seat}
            </Seatlist>
          ))}
        </div>
      ) : (
        <Seatlist
          key={index}
          style={{
            width: seatwidth,
            background: isSeatSelected(`${key}${seats}`) ? "#318beb" : isAvailable(`${key}${seats}`) ? '#fff' : '#b6b4b4',
            cursor: isAvailable(`${key}${seats}`) ? 'pointer' : 'not-allowed',
          }}
          onClick={() => isAvailable(`${key}${seats}`) && seatselection(`${key}${seats}`)}
        >
          {key}{seats}
        </Seatlist>
      )
    );

  return (
    <React.Fragment>
      <Header onClick={() => navigate('/')}>BusVoyage</Header>
      <Container>
        <h2>{selectedbus.name}</h2>
        <h5>{selectedbus.busType}</h5>
        <div className="d-flex">
          <div className="d-flex ms-2 align-items-center">
            <h6>Seats Available</h6>
            <Seatlist style={{ width: seatwidth }}>{1}</Seatlist>
          </div>
          <div className="d-flex ms-2 align-items-center">
            <h6>Booked Seat</h6>
            <Seatlist style={{ width: seatwidth, background: '#b6b4b4' }}>{1}</Seatlist>
          </div>
          <div className="d-flex ms-2 align-items-center">
            <h6>Selected Seat</h6>
            <Seatlist style={{ width: seatwidth, background: '#318beb' }}>{1}</Seatlist>
          </div>
        </div>
        <ul className="d-flex flex-wrap">
          {isSeater ? (
            <SeatContainer className="d-flex align-items-center">
              <h6 className="p-3">Seater</h6>
              <div>
                {generateSeats(selectedbus.seatLayout.first)}
                <div className="mt-4">
                  {generateSeats(selectedbus.seatLayout.second)}
                </div>
              </div>
            </SeatContainer>
          ) : (
            <>
              <SeatContainer className="d-flex align-items-center">
                <h6 className="p-3">Upper</h6>
                <div className="d-flex flex-wrap">
                  {generateSeats(selectedbus.seatLayout.upper.first, 'U')}
                  <div className="d-flex mt-4 flex-wrap">
                    {generateSeats(selectedbus.seatLayout.upper.second, 'U')}
                  </div>
                </div>
              </SeatContainer>
              <SeatContainer className="d-flex align-items-center">
                <h6 className="p-3">Lower</h6>
                <div className="d-flex flex-wrap">
                  {generateSeats(selectedbus.seatLayout.lower.first, 'L')}
                  <div className="d-flex mt-4 flex-wrap">
                    {generateSeats(selectedbus.seatLayout.lower.second, 'L')}
                  </div>
                </div>
              </SeatContainer>
            </>
          )}
        </ul>
        <div className='d-flex justify-content-center'>
          {selectedSeats.length > 0 && (
            <h4>Selected Seats - {selectedSeats.join(", ")}</h4>
          )}
        </div>
        <div>
          <Button
            variant="contained"
            color="success"
            className="mb-5"
            style={{ fontFamily: "monospace" }}
            onClick={() => navigate(`/Layout/Booking`)} 
            disabled={selectedSeats.length === 0}
          >
            Book Now
          </Button>
        </div>
      </Container>
    </React.Fragment>
  );
};

export default Layout;
