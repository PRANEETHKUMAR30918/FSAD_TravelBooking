import React, { useState } from 'react';

const FlightBooking = () => {
  // State variables to manage selected values and flights
  const [source, setSource] = useState('');
  const [destination, setDestination] = useState('');
  const [date, setDate] = useState('');
  const [flights, setFlights] = useState([]);
  const [bookingStatus, setBookingStatus] = useState('');

  // Dummy flight data
  const availableFlights = [
    { id: 1, airline: 'Airline A', flightNumber: 'AA123', time: '10:00 AM' },
    { id: 2, airline: 'Airline B', flightNumber: 'BB456', time: '12:30 PM' },
    { id: 3, airline: 'Airline C', flightNumber: 'CC789', time: '3:00 PM' },
    { id: 4, airline: 'Airline D', flightNumber: 'DD012', time: '5:45 PM' },
  ];

  // Handle the search button click
  const searchFlights = () => {
    // You can add logic to filter available flights based on source, destination, and date
    if (source && destination && date) {
      setFlights(availableFlights);  // Display all flights for now
    } else {
      alert('Please fill in all fields.');
    }
  };

  // Handle booking of a flight
  const handleBooking = (flight) => {
    setBookingStatus(`Flight ${flight.flightNumber} booked successfully with ${flight.airline}!`);
  };

  return (
    <div className="flight-booking-container">
      <h2>Book Your Flight</h2>

      {/* Source and Destination Inputs */}
      <div className="form-group">
        <label>Source</label>
        <input
          type="text"
          placeholder="Enter Source"
          value={source}
          onChange={(e) => setSource(e.target.value)}
        />
      </div>

      <div className="form-group">
        <label>Destination</label>
        <input
          type="text"
          placeholder="Enter Destination"
          value={destination}
          onChange={(e) => setDestination(e.target.value)}
        />
      </div>

      {/* Date Input */}
      <div className="form-group">
        <label>Travel Date</label>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
      </div>

      {/* Search Button */}
      <button onClick={searchFlights}>Search Flights</button>

      {/* Available Flights List */}
      <div>
        {flights.length > 0 && (
          <div>
            <h3>Available Flights</h3>
            <ul>
              {flights.map((flight) => (
                <li key={flight.id}>
                  <div>
                    <strong>{flight.airline}</strong> - {flight.flightNumber} at {flight.time}
                    <button onClick={() => handleBooking(flight)}>Book Now</button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Booking Confirmation */}
      {bookingStatus && (
        <div className="booking-status">
          <p>{bookingStatus}</p>
        </div>
      )}
    </div>
  );
};

export default FlightBooking;
