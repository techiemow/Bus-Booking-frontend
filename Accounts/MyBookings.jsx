import React, { useEffect, useState } from 'react';
import { Container, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Box } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { apiurl } from '../Constants/apiurl';
import { styled } from '@mui/material/styles';

// Styled components for table
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  borderBottom: '1px solid #ddd',
  padding: theme.spacing(1),
  fontWeight: 'bold',
  color: '#333',
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  '&:hover': {
    backgroundColor: theme.palette.action.selected,
    boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
    transition: 'background-color 0.3s, box-shadow 0.3s',
  },
}));

const StyledButton = styled(Button)(({ theme }) => ({
  transition: 'background-color 0.3s, transform 0.3s',
  '&:hover': {
    backgroundColor: theme.palette.primary.dark,
    transform: 'scale(1.05)',
  },
}));

// Gradient Title with Animation
const GradientTitle = styled(Typography)(({ theme }) => ({
  background: 'linear-gradient(45deg, #ff6f00 30%, #ff3d00 90%)',
  backgroundClip: 'text',
  color: 'transparent',
  display: 'inline-block',
  fontSize: '2rem',
  fontWeight: 'bold',
  textAlign: 'center',
  animation: 'gradient-animation 3s ease infinite',
  '@keyframes gradient-animation': {
    '0%': { backgroundPosition: '0% 0%' },
    '50%': { backgroundPosition: '100% 100%' },
    '100%': { backgroundPosition: '0% 0%' },
  },
}));

const StyledTableHead = styled(TableHead)(({ theme }) => ({
  background: 'linear-gradient(90deg, ##3700b3 30%, #03dac6 90%)',
  color: 'whitesmoke',
  '& th': {
    fontWeight: 'bold',
    fontSize: '1.1rem',
  },
  '& th:hover': {
    backgroundColor: '#f0f0f0',
  },
}));

const MyBookings = () => {
  const [bookings, setBookings] = useState([]);
  const navigate = useNavigate();
  const username = localStorage.getItem('login');

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await axios.get(`${apiurl}/MyBookings/${username}`);
        setBookings(response.data);
      } catch (error) {
        console.error('Error fetching bookings:', error);
      }
    };

    fetchBookings();
  }, [username]);

  const handlePayment = (bookingId) => {
    // Redirect to a payment page with the booking ID
    navigate(`/payment/${bookingId}`);
  };

  return (
    <Container component="main" maxWidth="md" sx={{ marginTop: '20px', background: 'linear-gradient(180deg, #f0f4f8 0%, #d0d8e1 100%)', minHeight: '100vh', padding: '20px' }}>
      <GradientTitle component="h1" variant="h4" sx={{ mb: 3 }}>
        My Bookings
      </GradientTitle>
      <TableContainer component={Paper} sx={{ boxShadow: '0 4px 8px rgba(0,0,0,0.1)', borderRadius: '8px' }}>
        <Table>
          <StyledTableHead>
            <TableRow>
              <StyledTableCell>Bus Type</StyledTableCell>
              <StyledTableCell>Departure Time</StyledTableCell>
              <StyledTableCell>From</StyledTableCell>
              <StyledTableCell>To</StyledTableCell>
              <StyledTableCell>Seat Numbers</StyledTableCell>
              <StyledTableCell>Total Price</StyledTableCell>
              <StyledTableCell>Date</StyledTableCell>
              <StyledTableCell>Actions</StyledTableCell>
            </TableRow>
          </StyledTableHead>
          <TableBody >
            {bookings.map((booking) => (
              <StyledTableRow key={booking._id}>
                <StyledTableCell>{booking.busType}</StyledTableCell>
                <StyledTableCell>{booking.departureTime}</StyledTableCell>
                <StyledTableCell>{booking.From}</StyledTableCell>
                <StyledTableCell>{booking.To}</StyledTableCell>
                <StyledTableCell>{booking.numberOfSeats.join(', ')}</StyledTableCell>
                <StyledTableCell>₹{booking.totalPrice}</StyledTableCell>
                <StyledTableCell>{new Date(booking.date).toLocaleDateString()}</StyledTableCell>
                <StyledTableCell align="center">
                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: 'row', // Arrange items in a row
                      justifyContent: 'center', // Center items horizontally
                      alignItems: 'center', // Center items vertically
                      mt: 2, // Margin top
                    }}
                  >
                    <StyledButton
                      variant="contained"
                      color="primary"
                      onClick={() => handlePayment(booking._id)}
                    >
                      Pay Now
                    </StyledButton>
                  </Box>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default MyBookings;
