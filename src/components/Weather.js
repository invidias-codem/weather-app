import React, { useState, useEffect } from 'react';
import { useQueryClient } from 'react-query';
import axios from 'axios';

const commonLocations = ['London', 'New York', 'Paris', 'Tokyo'];

const Weather = () => {
  const queryClient = useQueryClient();
  const [selectedLocation] = useState('');

  useEffect(() => {
    // Prefetch data for common locations (if not already cached)
    queryClient.refetchQueries(
      commonLocations.map((city) => ['weather', city]),
      () => Promise.all(
        commonLocations.map((city) =>
          axios.get(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=895284fb2d2c50a520ea537456963d9c`
          )
        )
      )
    );
  }, []);

  const { isLoading, error, data } = queryClient.useQuery(
    ['weather', selectedLocation],
    async () => {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${selectedLocation}&units=imperial&appid=YOUR_API_KEY`
      );
      return response.data;
    },
    {
      enabled: !!selectedLocation, // Only fetch for non-empty locations
      cacheTime: 60000, // Cache results for 1 minute
    }
  );

  return (
    <div className='weather'>
      {isLoading ? (
        <div>Loading weather data...</div>
      ) : error ? (
        <div>Error: {error.message}</div>
      ) : (
        <div>
          <h1>Weather in {data.name}</h1>
          <p>Temperature: {data.main.temp}</p>
          <p>Humidity: {data.main.humidity}</p>
        </div>
      )}
    </div>
  );
};

export default Weather;











  





