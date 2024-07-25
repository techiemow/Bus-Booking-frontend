import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { BusContext } from '../Context/BusContext';
import * as Yup from 'yup';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import dayjs from 'dayjs';

const BookingForm = ({ selectedSeats }) => {
  const navigate = useNavigate();
  const { searchDetails } = useContext(BusContext);
  console.log(searchDetails);
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

  const handleSubmit = (values) => {
    console.log('Booking Details:', values);
    alert("Booking successfully");
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
        <Form >
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
