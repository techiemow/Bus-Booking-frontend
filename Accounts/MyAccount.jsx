import React, { useEffect, useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { createTheme, ThemeProvider } from '@mui/material';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import 'react-toastify/dist/ReactToastify.css';
import { apiurl } from '../Constants/apiurl';
import { useNavigate } from 'react-router-dom';

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="http://localhost:5173/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}




const theme = createTheme();

export default function MyAccount() {

    const username = localStorage.getItem('login');

    const navigate = useNavigate();
  const [userData, setUserData] = useState({
    username: '',
    phoneNumber: '',
    emailaddress: '',
    _id: '' // Make sure this field exists and is set
  });
  const [showForm, setShowForm] = useState(false);
  const [bookingCount ,setbookingCount] = useState(0);
  const fetchUserData = async () => {
    try {
      const response = await axios.get(`${apiurl}/user/${username}`);
      console.log('User data:', response.data.user); // Debug log
      setUserData(response.data.user);
      setbookingCount(response.data.bookingCount);
      if( response.data.user === null){
        navigate("/")
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };
  useEffect(() => {
    
    fetchUserData();
  }, [username]);

  const validationSchema = Yup.object({
    username: Yup.string().required('Username is required'),
    phoneNumber: Yup.string().required('Phone number is required'),
    emailaddress: Yup.string().email('Invalid email address').required('Email is required'),
  });

  const handleSubmit = async (values, { setSubmitting }) => {
    console.log('Submitting values:', values); // Debug log
    try {
      // Ensure userData._id is correctly set
      if (!userData._id) {
        throw new Error('User ID is missing');
      }

      const apiResponse = await axios.put(`${apiurl}/user/${userData._id}`, values);
      console.log('API Response:', apiResponse.data); // Debug log
      setUserData(apiResponse.data);
      setShowForm(false);
      fetchUserData()
    } catch (error) {
      console.error('Update error:', error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="md" sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: "center", marginTop:"100px"}}>
        <CssBaseline />
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <span className="material-symbols-outlined">account_circle</span>
          </Avatar>
          <Typography component="h1" variant="h5">
            My Account
          </Typography>
          {!showForm ? (
            <>
              <TableContainer component={Paper} sx={{ mt: 3, mb: 2 }}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell><u>Field</u></TableCell>
                      <TableCell><u>Value</u></TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <TableRow>
                      <TableCell>Username</TableCell>
                      <TableCell>{userData.username}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Email</TableCell>
                      <TableCell>{userData.emailaddress}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Phone Number</TableCell>
                      <TableCell>{userData.phoneNumber}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>No of Bookings 
                      </TableCell>
                      <TableCell>{bookingCount}</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
              <Button
                variant="contained"
                color="primary"
                onClick={() => setShowForm(true)}
              >
                Update Account Details
              </Button>
            </>
          ) : (
            <Formik
              enableReinitialize
              initialValues={userData}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              {({ isSubmitting }) => (
                <Form>
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <Field
                        as={TextField}
                        autoComplete="given-name"
                        name="username"
                        required
                        fullWidth
                        id="username"
                        label="Username"
                        autoFocus
                      />
                      <ErrorMessage name="username" component="div" className="error text-danger" />
                    </Grid>
                    <Grid item xs={12}>
                      <Field
                        as={TextField}
                        required
                        fullWidth
                        id="emailaddress"
                        label="emailaddress"
                        name="emailaddress"
                        autoComplete="email"
                      />
                      <ErrorMessage name="emailaddress" component="div" className="error text-danger" />
                    </Grid>
                    <Grid item xs={12}>
                      <Field
                        as={TextField}
                        required
                        fullWidth
                        name="phoneNumber"
                        label="Phone Number"
                        type="text"
                        id="phoneNumber"
                        autoComplete="phoneNumber"
                      />
                      <ErrorMessage name="phoneNumber" component="div" className="error text-danger" />
                    </Grid>
                  </Grid>
                  <Grid item xs={12} display="flex" justifyContent="flex-end" mt={3} mb={2}>
                    <Button
                      variant="contained"
                      color="warning"
                      onClick={() => setShowForm(false)}
                      sx={{ mr: 2 }}
                    >
                      Cancel
                    </Button>
                    <Button
                      type="submit"
                      variant="contained"
                      color="success"
                      disabled={isSubmitting}
                    >
                      Update
                    </Button>
                  </Grid>
                </Form>
              )}
            </Formik>
          )}
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
  );
}

