import React, { useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { BusContext } from '../Context/BusContext';
import * as Yup from 'yup';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import dayjs from 'dayjs';
import axios from 'axios';  // Import axios
import { BusesDetails } from '../../Constants/Data';
import { apiurl } from '../../Constants/apiurl';

const BookingForm = ({ selectedSeats }) => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { searchDetails } = useContext(BusContext);
  const Id = parseInt(id);
console.log(Id)
  const selectedbus = BusesDetails.find((data) => data.id === Id);
  console.log(selectedbus);
  if (!selectedbus) {
    return <div>Error: Bus not found</div>;
  }

  if (!localStorage.getItem('login')) {
    return <div>Please log in to book seats.</div>;
  }

  const seatPrice = parseInt(selectedbus.price);

  const initialValues = {
    passengers: selectedSeats.map(() => ({ Name: '', PhoneNumber: '' })),
  };

  const validationSchema = Yup.object({
    passengers: Yup.array().of(
      Yup.object({
        Name: Yup.string().required('Name is required'),
        PhoneNumber: Yup.string()
          .matches(/^\d+$/, 'Phone number must be digits only')
          .required('Phone number is required'),
      })
    ),
  });

  const handleSubmit = async (values) => {
    const totalPrice = selectedSeats.length * seatPrice;
    const bookingDetails = {
      passengerName: values.passengers.map(p => p.Name),
      busType: selectedbus.busType,
      departureTime: selectedbus.departureTime,
      From: searchDetails.from,
      To: searchDetails.to,
      numberOfSeats: selectedSeats,
      totalPrice
    };
    
    try {
      await axios.post(`${apiurl}/bookings`, bookingDetails);
      alert("Booking successfully");
      navigate('/');
    } catch (error) {
      console.error('There was an error creating the booking!', error);
    }
  };

  return (
    <div className='text-center'>
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
            <div key={index}>
              <div className='my-3'>Seat Number: {seatNo}</div>
              <div className='form-group'>
                <label htmlFor={`passengers[${index}].Name`}>Name</label>
                <Field
                  type='text'
                  id={`passengers[${index}].Name`}
                  name={`passengers[${index}].Name`}
                  className='form-control'
                />
                <ErrorMessage name={`passengers[${index}].Name`} component='div' className='text-danger' />
              </div>
              <div className='form-group'>
                <label htmlFor={`passengers[${index}].PhoneNumber`}>Phone Number</label>
                <Field
                  type='text'
                  id={`passengers[${index}].PhoneNumber`}
                  name={`passengers[${index}].PhoneNumber`}
                  className='form-control'
                />
                <ErrorMessage name={`passengers[${index}].PhoneNumber`} component='div' className='text-danger' />
              </div>
            </div>
          ))}
          <button type='submit' className='btn btn-primary'>Pay Now</button>
        </Form>
      </Formik>
    </div>
  );
};

export default BookingForm;
