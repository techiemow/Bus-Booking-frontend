import React, { useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { BusContext } from '../Context/BusContext';
import * as Yup from 'yup';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import dayjs from 'dayjs';
import axios from 'axios';
import { BusesDetails } from '../../Constants/Data';
import { apiurl } from '../../Constants/apiurl';
import { Button } from '@mui/material';

const BookingForm = ({ selectedSeats, setSelectedSeats }) => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { searchDetails } = useContext(BusContext);
  const Id = parseInt(id);
  const selectedBus = BusesDetails.find((data) => data.id === Id);
  console.log(selectedBus);


  if (!selectedBus) {
    return <div>Error: Bus not found</div>;
  }

  if (!localStorage.getItem('login')) {
    return <div>Please log in to book seats.</div>;
  }

  const seatPrice = parseInt(selectedBus.price);

  console.log(selectedSeats);
  const initialValues = {
    passengers: selectedSeats.map(() => ({ Name: '', Age: '' })),
  };

  const validationSchema = Yup.object({
    passengers: Yup.array().of(
      Yup.object({
        Name: Yup.string().required('Name is required'),
        Age: Yup.number()
        .positive('Age must be a positive number')
        .integer('Age must be an integer')
        .required('Age is required'),
      })
    ),
  });

  const handleSubmit = async (values) => {
    const totalPrice = selectedSeats.length * seatPrice;
    const bookingDetails = {
      username: localStorage.getItem("login"),
      passengerName: values.passengers.map(p => p.Name),
      busType: selectedBus.busType,
      departureTime: selectedBus.departureTime,
      From: searchDetails.from,
      To: searchDetails.to,
      numberOfSeats: selectedSeats,
      totalPrice,
      date: dayjs(searchDetails.date).format('YYYY-MM-DD'), // Include date in booking details
    };

    try {
      const selectedDate = dayjs(searchDetails.date).format('YYYY-MM-DD');

      // Ensure bookedSeatsByDate exists
      if (!selectedBus.bookedSeatsByDate) {
        selectedBus.bookedSeatsByDate = {};
      }

      // Check if seats are already booked for the selected date
      const bookedSeats = selectedBus.bookedSeatsByDate[selectedDate] || [];
      const conflictSeats = selectedSeats.filter(seat => bookedSeats.includes(seat));

      if (conflictSeats.length > 0) {
        alert("Some seats are already booked for this date");
        return;
      }

      await axios.post(`${apiurl}/bookings`, bookingDetails);


      console.log(selectedBus.bookedSeatsByDate)
      setSelectedSeats([]);
      alert("Booking successfully completed!");
      navigate('/');
    } catch (error) {
      console.error('There was an error creating the booking!', error);
    }
  };




  return (
    <div className='text-center' style={{ padding: '20px', backgroundColor: '#f5f5f5', minHeight: '100vh' }}>
      <h5>{searchDetails.from} To {searchDetails.to}</h5>
      <h5>Date: {dayjs(searchDetails.date).format('YYYY-MM-DD')}</h5>
      <br />
      <h5>Please Fill out the below form</h5>

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        <Form>
          {selectedSeats.map((seatNo, index) => (
            <div key={index} style={{ margin: '20px 0', padding: '10px', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0,0,0,0.1)', backgroundColor: '#fff' }}>
              <div className='my-3' style={{ fontWeight: 'bold' }}>Seat Number: {seatNo}</div>
              <div className='form-group'>
                <label htmlFor={`passengers[${index}].Name`}>Name:</label>
                <Field
              fullWidth
              id={`passengers[${index}].Name`}
              name={`passengers[${index}].Name`}
              label='Name'
              variant='outlined'
              style={{ marginBottom: '10px' , marginleft: '10px' }}
                />
                <ErrorMessage name={`passengers[${index}].Name`} component='div' className='text-danger' />
              </div>
              <div className='form-group'>
                <label htmlFor={`passengers[${index}].Age`}>Age: </label>
                <Field
           fullWidth
           id={`passengers[${index}].Age`}
           name={`passengers[${index}].Age`}
           label='Age'
           type='number'
           variant='outlined'
           style={{ marginBottom: '10px' , marginleft: '10px' }}
                />
                <ErrorMessage name={`passengers[${index}].Age`} component='div' className='text-danger' />
              </div>
            </div>
          ))}
          <Button
              type='submit'
              variant='contained'
              color='primary'
              style={{ marginTop: '20px' }}
              onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#004ba0'}
              onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#1976d2'}
            >
              Book Now
            </Button>
        </Form>
      </Formik>
    </div>
  );
};

export default BookingForm;
