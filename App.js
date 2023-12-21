import './App.css';
import Weather from './components/Weather';
import { QueryClient, QueryClientProvider } from 'react-query';
import React, { useState } from 'react';
import axios from 'axios';

const App = () => {
  const queryClient = new QueryClient();

  const [data, setData] = useState({});
  const [location, setLocation] = useState('');

  const fetchWeather = async () => {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=imperial&appid=895284fb2d2c50a520ea537456963d9c`;

    const response = await axios.get(url);
    setData(response.data);
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      fetchWeather();
    }
  };

  return (
    <QueryClientProvider client={queryClient}>
      <div className="app">
        
        <div className="search">
          <input
            value={location}
            onChange={(event) => setLocation(event.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Enter Location"
            type="text"
          />
        </div>
        <div className="container">
          <div className="top">
            <div className="location">
              <p>{data?.name}</p>
            </div>
            <div className="temp">
              {data.main ? <h1>{data.main.temp.toFixed()}°F</h1> : null}
            </div>
            <div className="description">
              {data.weather ? <p>{data.weather[0].main}</p> : null}
            </div>
          </div>

          {data?.name !== undefined && (
            <div className="bottom">
              <div className="feels">
                {data.main ? (
                  <p className="bold">{data.main.feels_like.toFixed()}°F</p>
                ) : null}
                <p>Feels Like</p>
              </div>
              <div className="humidity">
                {data.main ? <p className="bold">{data.main.humidity}%</p> : null}
                <p>Humidity</p>
              </div>
              <div className="wind">
                {data.wind ? (
                  <p className="bold">{data.wind.speed.toFixed()} MPH</p>
                ) : null}
                <p>Wind Speed</p>
              </div>
            </div>
          )}
        </div>
        <Weather />
      </div>
    </QueryClientProvider>
  );
};

export default App;


