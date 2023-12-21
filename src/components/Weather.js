import React from 'react';
import axios from 'axios';
import * as ReactQuery from 'react-query';

const Weather = () => {
  const apiKey = '895284fb2d2c50a520ea537456963d9c';

  const fetchWeather = React.useMemo(
    async () => {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=London&?{apiKey}units=imperial&appid=${apiKey}`
      );

      return response.data;
    },
    [apiKey]
  );

  const { data, isLoading, error } = ReactQuery.useQuery('weather', fetchWeather, {
    cacheTime: 60000, // cache the results for 1 minute
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className='weather'>
      <h1>Weather</h1>
      <p>Temperature: {data.main.temp}</p>
      <p>Humidity: {data.main.humidity}</p>
    </div>
  );
};

export default Weather;







  





