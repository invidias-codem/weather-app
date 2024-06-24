import React, { useState } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import axios from 'axios';
import Weather from './components/Weather';
import './App.css';



const App = () => {
  const queryClient = new QueryClient();
  const [queryData, setQueryData] = useState({});
  const [location, setLocation] = useState('');

  const fetchWeather = async () => {
    const apiKey = '895284fb2d2c50a520ea537456963d9c';
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=imperial&appid=${apiKey}`;

    const response = await axios.get(url);
    setQueryData(response.data);
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      fetchWeather();
    }
  };

  return (
    <QueryClientProvider client={queryClient}>
      <div className="app">
        <Weather />
        <div className="search">
          <input
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Enter Location"
            type="text"
          />
        </div>
        <div className="container">
          {queryData.name && (
            <>
              <div className="top">
                <div className="location">
                  <p>{queryData.name}</p>
                </div>
                <div className="temp">
                  <h1>{queryData.main.temp.toFixed()}°F</h1>
                </div>
                <div className="description">
                  <p>{queryData.weather[0].main}</p>
                </div>
              </div>
              <div className="bottom">
                <div className="feels">
                  <p className="bold">{queryData.main.feels_like.toFixed()}°F</p>
                  <p>Feels Like</p>
                </div>
                <div className="humidity">
                  <p className="bold">{queryData.main.humidity}%</p>
                  <p>Humidity</p>
                </div>
                <div className="wind">
                  <p className="bold">{queryData.wind.speed.toFixed()} MPH</p>
                  <p>Wind Speed</p>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </QueryClientProvider>
  );
};

export default App;



