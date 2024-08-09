import React, { useEffect, useState } from 'react';
import { Container, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Box, useMediaQuery, useTheme } from '@mui/material';
import axios from 'axios';
import { apiurl } from '../Constants/apiurl';
import { styled } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import Footer from '../src/Components/Footer';

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
  marginRight: '10px',
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
  color: 'whitesmoke',
  '& th': {
    fontWeight: 'bold',
    fontSize: '1.1rem',
  },
  '& th:hover': {
    backgroundColor: '#f0f0f0',
  },
}));

const DeleteButton = styled(Button)(({ theme }) => ({
  backgroundColor: theme.palette.error.main,
  color: '#fff',
  '&:hover': {
    backgroundColor: theme.palette.error.dark,
  },
}));

const MyBookings = () => {
  const navigate = useNavigate();
  const [bookings, setBookings] = useState([]);
  const [order, setOrder] = useState(null);
  const username = localStorage.getItem('login');
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const usertoken = localStorage.getItem('usertoken');

  const fetchBookings = async () => {
    try {
      const response = await axios.get(`${apiurl}/MyBookings/${username}`,{
        headers:{
          auth:usertoken
        }
      });
      setBookings(response.data);
    } catch (error) {
      console.error('Error fetching bookings:', error);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const handlePayment = async (bookingId, totalPrice) => {
    if (totalPrice > 50000) {
      alert("Single transaction maximum price is 50000 INR");
      return;
    }
    try {
      const response = await axios.post(`${apiurl}/payment/${bookingId}`, {
        amount: totalPrice * 100,
        currency: "INR",
      },{
        headers:{
          auth:usertoken
        }
      });
      setOrder({ ...response.data, bookingId }); // Include bookingId in the order object
    } catch (error) {
      console.error('Error processing payment:', error);
      alert("Failed to process payment");
    }
  };

  const handleDelete = async (bookingId) => {
    try {
      await axios.delete(`${apiurl}/MyDeletes/${bookingId}`);
      setBookings(bookings.filter((b) => b.bookingId !== bookingId));
      fetchBookings();
    } catch (error) {
      console.error('Error deleting booking:', error);
      alert("Failed to delete booking");
    }
  };

  const handlePaymentStatus = () => {
    if (!order) return;

    const { bookingId } = order;
    const options = {
      key: "rzp_test_DClMygpDU9TijX",
      amount: order.amount,
      currency: order.currency,
      name: "Bus Voyage",
      description: "Payment for My Bus-Booking",
      order_id: order.id,
      handler: async (response) => {
        console.log(response);
        const orderId = response.razorpay_order_id;
        await axios.post(`${apiurl}/payment/verify/${orderId}`, {
          paymentId: response.razorpay_payment_id,
          orderId: response.razorpay_order_id,
          signature: response.razorpay_signature,
          bookingId,
        },{
          headers:{
            auth:usertoken
          }
        });
        alert('Payment Completed');
        setOrder(null);
        fetchBookings();
      },
      prefill: {
        name: "Customer Name",
        email: "customer@example.com",
        contact: "9876543210",
      },
      notes: {
        address: "Customer Address",
      },
      theme: {
        color: "#F37254",
      },
    };
    const razorpayInstance = new window.Razorpay(options);
    razorpayInstance.open();
  };

  return (
    <div>
      <Container component="main" maxWidth={isMobile ? "xs" : "md"} sx={{ marginTop: '20px', background: 'linear-gradient(180deg, #f0f4f8 0%, #d0d8e1 100%)', minHeight: '100vh', padding: '20px' }}>
        <div style={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row', justifyContent: 'space-between', alignItems: 'center' }}>
          <GradientTitle component="h1" variant="h4" sx={{ mb: 3 }}>
            My Bookings
          </GradientTitle>
          <Button color='warning' variant='contained' onClick={() => navigate("/")}>
            Go Back
          </Button>
        </div>

        <TableContainer component={Paper} sx={{ boxShadow: '0 4px 8px rgba(0,0,0,0.1)', borderRadius: '8px', overflowX: 'auto' }}>
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
                <StyledTableCell>Delete</StyledTableCell>
                <StyledTableCell>Payment</StyledTableCell>
              </TableRow>
            </StyledTableHead>
            <TableBody>
              {bookings.map((booking) => (
                <StyledTableRow key={booking._id}>
                  <StyledTableCell>{booking.busType}</StyledTableCell>
                  <StyledTableCell>{booking.departureTime}</StyledTableCell>
                  <StyledTableCell>{booking.From}</StyledTableCell>
                  <StyledTableCell>{booking.To}</StyledTableCell>
                  <StyledTableCell>{booking.numberOfSeats.join(', ')}</StyledTableCell>
                  <StyledTableCell>₹{booking.totalPrice}</StyledTableCell>
                  <StyledTableCell>{new Date(booking.date).toLocaleDateString()}</StyledTableCell>
                  <StyledTableCell>
                    <DeleteButton variant='contained' onClick={() => handleDelete(booking._id)}>Delete</DeleteButton>
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    <Box
                      sx={{
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'center',
                        alignItems: 'center',
                        mt: 2,
                      }}
                    >
                      {!booking.payment ? (
                        <StyledButton
                          variant="contained"
                          color="success"
                          onClick={() => handlePayment(booking._id, booking.totalPrice)}
                        >
                          Pay Now
                        </StyledButton>
                      ) : (
                        <Typography textAlign="center">
                          Payment Completed
                        </Typography>
                      )}
                    </Box>
                  </StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <Box sx={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row', mt: 2, alignItems: 'center' }}>
          {order && (
            <Button onClick={handlePaymentStatus} variant="contained" color="primary">
              Pay ₹{order.amount / 100}
            </Button>
          )}
        </Box>
      </Container>
      <Footer />
    </div>
  );
};

export default MyBookings;
