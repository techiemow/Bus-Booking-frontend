import React, { useState, useContext } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { NavLink, useNavigate } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { apiurl } from '../Constants/apiurl';
import ToastContext from '../Notification/ToastContext';
import 'react-toastify/dist/ReactToastify.css';
import "./Login.css";
import HomeNavbar from '../src/Components/HomeNavbar';

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

const defaultTheme = createTheme();

const Login = () => {
  const initialValues = {
    username: '',
    password: '',
  };

  const navigate = useNavigate();
  const { showToast } = useContext(ToastContext);

  const validationSchema = Yup.object({
    username: Yup.string().required('Username is required'),
    password: Yup.string().required('Password is required'),
  });

  const [remember, setRemember] = useState(false);

  const handleSubmit = async (values, { setSubmitting }) => {
    const { username, password } = values;

    try {
      const apiResponse = await axios.get(`${apiurl}/Login/${username}/${password}`);
      if (apiResponse.data) {
        localStorage.setItem('login', apiResponse.data.username);
        localStorage.setItem('usertoken', apiResponse.data.token);
        showToast('Logged in successfully!');
        navigate('/');
      } else {
        showToast(`Login Failed: ${apiResponse.data.error}`);
      }
    } catch (error) {
      showToast('Login Failed');
    }

    setSubmitting(false);
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <HomeNavbar />
      <Container component="main" maxWidth="xs" sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: { xs: '16px', sm: '24px' }, // Adjust padding based on screen size
        marginTop: '8px',
        marginBottom: '8px',
      }}>
        <CssBaseline />
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            width: '100%', // Ensure the Box takes full width
            maxWidth: 400, // Maximum width of the form
            marginTop: 8,
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main', width: 56, height: 56 }}>
            <span className="material-symbols-outlined" style={{ fontSize: '24px' }}>
              departure_board
            </span>
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting }) => (
              <Form noValidate>
                <Field
                  as={TextField}
                  variant="outlined"
                  margin="normal"
                  fullWidth
                  id="username"
                  label="Username"
                  name="username"
                  autoComplete="username"
                  autoFocus
                  sx={{ mb: 2 }}
                />
                <ErrorMessage name="username" component="div" className="error text-danger" />
                <Field
                  as={TextField}
                  variant="outlined"
                  margin="normal"
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  sx={{ mb: 2 }}
                />
                <ErrorMessage name="password" component="div" className="error text-danger" />
                <FormControlLabel
                  control={<Checkbox value="remember" color="primary" onChange={() => setRemember(!remember)} />}
                  label="Remember me"
                />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  sx={{ mt: 3, mb: 2 }}
                  disabled={isSubmitting || !remember}
                >
                  Sign In
                </Button>
                <Grid container>
                  <Grid item xs>
                    <Link href="#" variant="body2">
                      Forgot password?
                    </Link>
                  </Grid>
                  <Grid item>
                    <NavLink to="/register" variant="body2">
                      {"Don't have an account? Sign Up"}
                    </NavLink>
                  </Grid>
                </Grid>
              </Form>
            )}
          </Formik>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
}

export default Login;
  