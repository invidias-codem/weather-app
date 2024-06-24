import React from "react";

const Weather = ({ data }) => {
  return (
    <div className="weather">
      {data?.name ? (
        <>
          <h2>Weather in {data.name}</h2>
          {/* ... other weather information ... */}

          {data.alerts && data.alerts.length > 0 ? (
            <div className="alerts">
              <h3>Active Weather Alerts:</h3>
              <ul className="alert-list">
                {data.alerts.map((alert) => (
                  <li key={alert.event} className="alert">
                    <div className="alert-icon">
                      {/* Display appropriate icon based on alert.event */}
                    </div>
                    <div className="alert-info">
                      <h4 className="alert-title">{alert.event}</h4>
                      <p className="alert-description">{alert.description}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <div className="no-alerts">No active weather alerts.</div>
          )}
        </>
      ) : (
        <div>Enter a location to see weather data.</div>
      )}
    </div>
  );
};

export default Weather;














  





