import React from 'react';
import { FaMapPin, FaPhoneAlt, FaEnvelope } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import logo from "../assests/logo.png";

const Footer = () => {
  return (
    <footer className="w-100 py-5 bg-light">
      <div className="container">
        <div className="row">
          {/* Logo and Description */}
          <div className="col-lg-4 col-md-6 mb-4">
            <Link to="/" className='text-dark font-weight-bold'>
              <img src={logo} alt="logo" className="img-fluid mb-3" style={{ maxWidth: '150px' }} />
            </Link>
            <p className="text-secondary">
              Providing top-notch bus travel experiences with a focus on safety, comfort, and convenience.
            </p>
          </div>

          {/* About Us Links */}
          <div className="col-lg-2 col-md-6 mb-4">
            <h5 className="font-weight-bold">About Us</h5>
            <ul className="list-unstyled">
              <li><Link to="/about-us" className='text-secondary'>About Us</Link></li>
              <li><Link to="/contact-us" className='text-secondary'>Contact Us</Link></li>
              <li><Link to="/privacy-policy" className='text-secondary'>Privacy Policy</Link></li>
              <li><Link to="/terms-conditions" className='text-secondary'>Terms and Conditions</Link></li>
            </ul>
          </div>

          {/* Services Links */}
          <div className="col-lg-2 col-md-6 mb-4">
            <h5 className="font-weight-bold">Services</h5>
            <ul className="list-unstyled">
              <li><Link to="/safety-guarantee" className='text-secondary'>Safety Guarantee</Link></li>
              <li><Link to="/faq-support" className='text-secondary'>FAQ & Support</Link></li>
              <li><Link to="/luxury-buses" className='text-secondary'>Luxury Buses</Link></li>
              <li><Link to="/facilities" className='text-secondary'>Facilities</Link></li>
            </ul>
          </div>

          {/* Contact Information */}
          <div className="col-lg-4 col-md-6 mb-4">
            <h5 className="font-weight-bold">Get In Touch</h5>
            <div className="d-flex mb-2">
              <FaMapPin className='text-secondary mr-2' />
              <div>
                <p className="mb-1 text-secondary small">Address</p>
                <p className="mb-0 text-dark">123,Main Street,Bangalore,India</p>
              </div>
            </div>

            <div className="d-flex mb-2">
              <FaPhoneAlt className='text-secondary mr-2' />
              <div>
                <p className="mb-1 text-secondary small">Phone</p>
                <p className="mb-0 text-dark">9068954680</p>
              </div>
            </div>

            <div className="d-flex">
              <FaEnvelope className='text-secondary mr-2' />
              <div>
                <p className="mb-1 text-secondary small">Email</p>
                <p className="mb-0 text-dark">support@busvoyage.com</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer;