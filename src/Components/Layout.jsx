import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { BusesDetails } from '../../Constants/Data';
import { Button } from '@mui/material';
import dayjs from 'dayjs';
import { BusContext } from '../Context/BusContext';
import axios from 'axios';
import { apiurl } from '../../Constants/apiurl';

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
  const [bookedSeats, setBookedSeats] = useState([]);
  
  const Id = parseInt(id);
  const selectedBus = BusesDetails.find((data) => data.id === Id);
  const { searchDetails } = useContext(BusContext);
  
  if (!selectedBus) {
    return <div>Bus not found</div>;
  }

  const isSeater = selectedBus.busType === 'Seater';
  const seatWidth = isSeater ? '30px' : '80px';
  const seatPrice = parseInt(selectedBus.price);

  useEffect(() => {
    if (!localStorage.getItem('login')) {
      navigate('/login');
    }
  }, [navigate]);

  const fetchSeatAvailability = async () => {
    try {
      const username = localStorage.getItem('login');

      const selectedDate = dayjs(searchDetails.date).format('YYYY-MM-DD')
      const response = await axios.get(`${apiurl}/selection/${selectedDate}`);
      setBookedSeats(response.data.map(booking => booking.numberOfSeats).flat());
      console.log(response.data.map(booking => booking.numberOfSeats).flat());
    } catch (error) {
      console.error("Error fetching seat availability:", error);
    }
  };
  

  useEffect(() => {
    fetchSeatAvailability();
  }, [searchDetails]); // Fetch whenever date changes

  const seatSelection = (seat) => {
    if (!bookedSeats.includes(seat)) {
      setselectedSeats((prevState) =>
        prevState.includes(seat)
          ? prevState.filter((selectedSeat) => selectedSeat !== seat)
          : [...prevState, seat]
      );
    } else {
      alert("Seat already booked");
    }
  };

  const isSeatSelected = (seat) => selectedSeats.includes(seat);
  const isSeatBooked = (seat) => bookedSeats.includes(seat);

  const generateSeats = (array, key = '') =>
    array.map((seats, index) =>
      Array.isArray(seats) ? (
        <div className="d-flex" key={index}>
          {seats.map((seat) => (
            <Seatlist
              key={seat}
              style={{
                width: seatWidth,
                background: isSeatBooked(`${key}${seat}`)
                  ? '#b6b4b4'
                  : isSeatSelected(`${key}${seat}`)
                  ? '#318beb'
                  : '#fff',
                cursor: isSeatBooked(`${key}${seat}`) ? 'not-allowed' : 'pointer',
              }}
              onClick={() => seatSelection(`${key}${seat}`)}
            >
              {key}{seat}
            </Seatlist>
          ))}
        </div>
      ) : (
        <Seatlist
          key={index}
          style={{
            width: seatWidth,
            background: isSeatBooked(`${key}${seats}`)
              ? '#b6b4b4'
              : isSeatSelected(`${key}${seats}`)
              ? '#318beb'
              : '#fff',
            cursor: isSeatBooked(`${key}${seats}`) ? 'not-allowed' : 'pointer',
          }}
          onClick={() => seatSelection(`${key}${seats}`)}
        >
          {key}{seats}
        </Seatlist>
      )
    );

  return (
    <React.Fragment>
      <Header onClick={() => navigate('/')}>BusVoyage</Header>
      <Container>
        <h2>{selectedBus.name}</h2>
        <h5>{selectedBus.busType}</h5>
        <div className="d-flex">
          <div className="d-flex ms-2 align-items-center">
            <h6>Seats Available</h6>
            <Seatlist style={{ width: seatWidth }}>{1}</Seatlist>
          </div>
          <div className="d-flex ms-2 align-items-center">
            <h6>Booked Seat</h6>
            <Seatlist style={{ width: seatWidth, background: '#b6b4b4' }}>{1}</Seatlist>
          </div>
          <div className="d-flex ms-2 align-items-center">
            <h6>Selected Seat</h6>
            <Seatlist style={{ width: seatWidth, background: '#318beb' }}>{1}</Seatlist>
          </div>
        </div>
        
        <ul className="d-flex flex-wrap">
          {isSeater ? (
            <SeatContainer className="d-flex align-items-center">
              <h6 className="p-3">Seater</h6>
              <div>
                {generateSeats(selectedBus.seatLayout.first)}
                <div className="mt-4">
                  {generateSeats(selectedBus.seatLayout.second)}
                </div>
              </div>
            </SeatContainer>
          ) : (
            <>
              <SeatContainer className="d-flex align-items-center">
                <h6 className="p-3">Upper</h6>
                <div className="d-flex flex-wrap">
                  {generateSeats(selectedBus.seatLayout.upper.first)}
                  <div className="d-flex mt-4 flex-wrap">
                    {generateSeats(selectedBus.seatLayout.upper.second)}
                  </div>
                </div>
              </SeatContainer>
              <hr /><hr />
              <SeatContainer className="d-flex align-items-center">
                <h6 className="p-3">Lower</h6>
                <div className="d-flex flex-wrap">
                  {generateSeats(selectedBus.seatLayout.lower.first)}
                  <div className="d-flex mt-4 flex-wrap">
                    {generateSeats(selectedBus.seatLayout.lower.second)}
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
        <div className="text-center mt-5">
        {selectedSeats.length > 0 && (
          <h5>Total Price: {selectedSeats.length * seatPrice}</h5>
        )}
        </div>
       
        <div className='d-flex justify-content-center'>
          <Button
            variant="contained"
            color="success"
            className="mb-5 d-flex justify-content-center"
            style={{ fontFamily: "monospace" }}
            onClick={() => navigate(`/Layout/Booking/${id}`)} 
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
