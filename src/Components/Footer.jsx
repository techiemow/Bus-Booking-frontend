import React from 'react';
import { FaMapPin } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import logo from "../assests/logo.png";

const Footer = () => {
  return (
    <footer className="w-100 py-5 bg-light">
      <div className="container">
        <div className="row">
          <div className="col-lg-5 col-md-6 mb-4">
            <Link to="/" className='text-dark font-weight-bold'>
              <img src={logo} alt="logo" className="img-fluid mb-3" />
            </Link>
            <p className="text-secondary">
          
            </p>
          </div>

          <div className="col-lg-2 col-md-6 mb-4">
            <h5 className="font-weight-bold">About Us</h5>
            <ul className="list-unstyled">
              <li><Link to="#" className='text-secondary'>About Us</Link></li>
              <li><Link to="#" className='text-secondary'>Contact Us</Link></li>
              <li><Link to="#" className='text-secondary'>Privacy Policy</Link></li>
              <li><Link to="#" className='text-secondary'>Terms and Conditions</Link></li>
            </ul>
          </div>

          <div className="col-lg-2 col-md-6 mb-4">
            <h5 className="font-weight-bold">Services</h5>
            <ul className="list-unstyled">
              <li><Link to="#" className='text-secondary'>Safety Guarantee</Link></li>
              <li><Link to="#" className='text-secondary'>FAQ & Support</Link></li>
              <li><Link to="#" className='text-secondary'>Luxury Buses</Link></li>
              <li><Link to="#" className='text-secondary'>Enough Facilities</Link></li>
            </ul>
          </div>

          <div className="col-lg-3 col-md-6 mb-4">
            <h5 className="font-weight-bold">Get In Touch</h5>
            <div className="d-flex mb-2">
              <FaMapPin className='text-secondary mr-2' />
              <div>
                <p className="mb-1 text-secondary small">For Support & Reservations</p>
                <p className="mb-0 text-dark">123, Main Street, Anytown, USA</p>
              </div>
            </div>

            <div className="d-flex mb-2">
              <FaMapPin className='text-secondary mr-2' />
              <div>
                <p className="mb-1 text-secondary small">For Support & Reservations</p>
                <p className="mb-0 text-dark">123, Main Street, Anytown, USA</p>
              </div>
            </div>

            <div className="d-flex">
              <FaMapPin className='text-secondary mr-2' />
              <div>
                <p className="mb-1 text-secondary small">For Support & Reservations</p>
                <p className="mb-0 text-dark">123, Main Street, Anytown, USA</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer;
