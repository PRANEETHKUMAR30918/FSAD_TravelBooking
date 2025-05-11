import React, { useState, useEffect } from 'react';
import './Dashboard.css';
import { callApi, getSession, setSession } from './api';
import { useNavigate } from 'react-router-dom';
import MenuBar from './MenuBar';
import './Dashboard.css';

export default function Dashboard() {
  const [fullname, setFullname] = useState('');
  const [service, setService] = useState('');
  const [source, setSource] = useState('');
  const [destination, setDestination] = useState('');
  const [date, setDate] = useState('');
  const [options, setOptions] = useState([]);
  const [bookingMessage, setBookingMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    let csr = getSession('csrid');
    let data = JSON.stringify({ csrid: csr });

    callApi('POST', 'http://localhost:8030/users/getfullname', data, setFullname);
  }, []);

  const logout = () => {
    setSession('csrid', '');
    navigate('/');
  };

  const data = {
    airport: {
      mumbai: {
        hyderabad: [
          { airline: 'Air India', time: '10:00 AM', price: '$150', duration: '2h' },
          { airline: 'IndiGo', time: '1:00 PM', price: '$120', duration: '2h 30m' }
        ],
        chennai: [
          { airline: 'Vistara', time: '5:00 PM', price: '$170', duration: '2h 20m' }
        ]
      },
      hyderabad: {
        delhi: [
          { airline: 'Air Asia', time: '9:00 AM', price: '$140', duration: '2h 10m' }
        ]
      }
    },
    train: {
      mumbai: {
        hyderabad: [
          { train: 'Deccan Express', time: '6:00 AM', price: '$25', duration: '12h' }
        ]
      },
      delhi: {
        chennai: [
          { train: 'Tamil Express', time: '7:00 PM', price: '$35', duration: '24h' }
        ]
      }
    },
    bus: {
      vijayawada: {
        chennai: [
          { bus: 'Orange Travels', time: '10:00 PM', price: '$15', duration: '10h' }
        ]
      },
      hyderabad: {
        delhi: [
          { bus: 'VRL Travels', time: '6:00 PM', price: '$40', duration: '20h' }
        ]
      }
    },
    cab: {
      mumbai: {
        pune: [
          { cab: 'Ola Sedan', time: 'Anytime', price: '$50', duration: '3h' }
        ]
      },
      delhi: {
        agra: [
          { cab: 'Uber SUV', time: 'Anytime', price: '$60', duration: '4h' }
        ]
      }
    }
  };

  // Function to show available options based on service, source, and destination
  const showOptions = () => {
    if (!service || !source || !destination) {
      alert('Please select all fields.');
      return;
    }

    // Get available options for the selected route
    const availableOptions = data[service]?.[source]?.[destination];

    // If no available options found, alert user
    if (!availableOptions || availableOptions.length === 0) {
      alert('No available options found.');
      return;
    }

    // Set available options to display
    setOptions(availableOptions);

    // Save selected details to localStorage
    const bookingDetails = {
      service,
      source,
      destination,
      date,
    };

    // Store in localStorage
    localStorage.setItem('bookingDetails', JSON.stringify(bookingDetails));

    // Show success message
    setBookingMessage('Booking details stored successfully!');

    // Optionally, clear form fields
    setService('');
    setSource('');
    setDestination('');
    setDate('');
  };

  // Function to handle booking option
  const bookOption = (index) => {
    const bookedOption = options[index];
    setBookingMessage(`Booked Successfully: ${bookedOption.airline || bookedOption.train || bookedOption.bus || bookedOption.cab}`);
  };

  return (
    <div>
      <div className="dashboard">
        <div className="header">
          <img className="logo" src="/logo1.jpg" alt="Logo" />
          <div className="logotext">
            <span>Travel</span> Ease
          </div>
          <img className="logout" src="/logout.jpg" alt="Logout" onClick={logout} />
          <label>{fullname}</label>
        </div>
        <div className="menu">
          <MenuBar />
        </div>

        {/* Booking Form */}
        <div className="container mt-5">
          <h1>Travel Booking</h1>
          <div className="form-group">
            <label htmlFor="service">Service Type</label>
            <select
              id="service"
              value={service}
              onChange={(e) => setService(e.target.value)}
            >
              <option value="">Select Service</option>
              <option value="airport">Airport</option>
              <option value="train">Train</option>
              <option value="bus">Bus</option>
              <option value="cab">Cab</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="source">Source</label>
            <select
              id="source"
              value={source}
              onChange={(e) => setSource(e.target.value)}
            >
              <option value="">Select Source</option>
              <option value="mumbai">Mumbai</option>
              <option value="hyderabad">Hyderabad</option>
              <option value="vijayawada">Vijayawada</option>
              <option value="delhi">Delhi</option>
              <option value="chennai">Chennai</option>
              <option value="pune">Pune</option>
              <option value="agra">Agra</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="destination">Destination</label>
            <select
              id="destination"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
            >
              <option value="">Select Destination</option>
              <option value="mumbai">Mumbai</option>
              <option value="hyderabad">Hyderabad</option>
              <option value="vijayawada">Vijayawada</option>
              <option value="delhi">Delhi</option>
              <option value="chennai">Chennai</option>
              <option value="pune">Pune</option>
              <option value="agra">Agra</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="date">Travel Date</label>
            <input
              type="date"
              id="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>

          <button onClick={showOptions}>Submit</button>

          {/* Show Available Options */}
          <div className="results">
            {options.length > 0 ? (
              options.map((item, index) => (
                <div className="option-card" key={index}>
                  <strong>{item.airline || item.train || item.bus || item.cab}</strong><br />
                  Time: {item.time}<br />
                  Price: {item.price}<br />
                  Duration: {item.duration}<br />
                  <button onClick={() => bookOption(index)}>Book Now</button>
                </div>
              ))
            ) : (
              <p>Successfully added.</p>
            )}
          </div>

          {/* Show Booking Message */}
          {bookingMessage && <div className="booking-message">{bookingMessage}</div>}
        </div>
      </div>
    </div>
  );
}
