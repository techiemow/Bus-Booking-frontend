import React, { useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { BusContext } from '../Context/BusContext';
import * as Yup from 'yup';
import { TextField, Box, Grid, Typography, Breadcrumbs, Container, Link } from '@mui/material';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import dayjs from 'dayjs';
import axios from 'axios';
import { BusesDetails } from '../../Constants/Data';
import { apiurl } from '../../Constants/apiurl';
import { Button } from '@mui/material';
import HomeNavbar from './HomeNavbar';

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
      busid:Id,
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

      const usertoken = localStorage.getItem("usertoken");
      await axios.post(`${apiurl}/bookings`, bookingDetails,{
        headers:{
          auth:usertoken
        }
      });


      console.log(selectedBus.bookedSeatsByDate)
      setSelectedSeats([]);
      alert("Booking successfully completed!");
      navigate('/MyBookings');
    } catch (error) {
      console.error('There was an error creating the booking!', error);
    }
  };




  return (
    <div>
    <HomeNavbar/>
    <Container component="main" maxWidth="md" sx={{ padding: '20px', backgroundColor: '#f5f5f5', minHeight: '100vh' }}>
    <Breadcrumbs aria-label="breadcrumb" sx={{ marginBottom: '20px' }}>
        <Link color="inherit" href="/">
          Home
        </Link>
        <Typography color="text.primary">Booking</Typography>
      </Breadcrumbs>

    <Typography variant="h5" align="center">
      {searchDetails.from} To {searchDetails.to}
    </Typography>
    <Typography variant="h6" align="center">
      Date: {dayjs(searchDetails.date).format('YYYY-MM-DD')}
    </Typography>
    <Typography variant="h6" align="center" sx={{ marginY: '20px' }}>
      Please Fill out the below form
    </Typography>

    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting }) => (
        <Form>
          <Grid container spacing={3}>
            {selectedSeats.map((seatNo, index) => (
              <Grid item xs={12} key={index}>
                <Box
                  sx={{
                    padding: '10px',
                    borderRadius: '8px',
                    boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
                    backgroundColor: '#fff',
                    marginBottom: '20px'
                  }}
                >
                  <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                    Seat Number: {seatNo}
                  </Typography>
                  <Grid container spacing={2}>
                    <Grid item xs={12} md={6}>
                      <Field
                        as={TextField}
                        fullWidth
                        id={`passengers[${index}].Name`}
                        name={`passengers[${index}].Name`}
                        label="Name"
                        variant="outlined"
                        helperText={<ErrorMessage name={`passengers[${index}].Name`} />}
                        error={Boolean(<ErrorMessage name={`passengers[${index}].Name`} />)}
                      />
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <Field
                        as={TextField}
                        fullWidth
                        id={`passengers[${index}].Age`}
                        name={`passengers[${index}].Age`}
                        label="Age"
                        type="number"
                        variant="outlined"
                        helperText={<ErrorMessage name={`passengers[${index}].Age`} />}
                        error={Boolean(<ErrorMessage name={`passengers[${index}].Age`} />)}
                      />
                    </Grid>
                  </Grid>
                </Box>
              </Grid>
            ))}
            <Grid item xs={12}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                sx={{ marginTop: '20px' }}
                disabled={isSubmitting}
                onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#004ba0'}
                onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#1976d2'}
              >
                Book Now
              </Button>
              <Button
                type="submit"
                variant="contained"
                color="error"
                fullWidth
                sx={{ marginTop: '20px' }}
                disabled={isSubmitting}
                onClick={()=>{navigate("/")}}
              >
                Cancel
              </Button>
            </Grid>
          </Grid>
        </Form>
      )}
    </Formik>
  </Container>
  </div>
  );
};

export default BookingForm;
