// src/Weather.js
import React, { useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import './Weather.css'; 
// src/index.js
import 'bootstrap/dist/css/bootstrap.min.css';

const Weather = () => {
    const [location, setLocation] = useState('');
    const [weatherData, setWeatherData] = useState(null);
    const [error, setError] = useState(null);

    const handleInputChange = (event) => {
        setLocation(event.target.value);
    };

    const fetchWeatherData = async (event) => {
        event.preventDefault();
        setError(null); // Reset any previous errors

        // Example API call (you'll need to replace with your actual API)
        try {
            const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=YOUR_API_KEY&units=metric`);
            if (!response.ok) throw new Error('City not found');
            const data = await response.json();
            setWeatherData(data);
        } catch (err) {
            setError(err.message);
            setWeatherData(null);
        }
    };

    return (
        <div className="text-center">
            <h2>Weather Information</h2>
            <Form onSubmit={fetchWeatherData} className="mb-3">
                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Enter Location</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="City Name"
                        value={location}
                        onChange={handleInputChange}
                    />
                </Form.Group>
                <Button variant="primary" type="submit">
                    Get Weather
                </Button>
            </Form>

            {error && <Alert variant="danger">{error}</Alert>}

            {weatherData && (
                <div className="mt-3">
                    <h4>Weather in {weatherData.name}</h4>
                    <p>Temperature: {weatherData.main.temp} °C</p>
                    <p>Condition: {weatherData.weather[0].description}</p>
                </div>
            )}
        </div>
    );
};

export default Weather;
