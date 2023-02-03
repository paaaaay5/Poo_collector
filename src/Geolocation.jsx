import React, { useState, useEffect, useContext} from 'react';
import { UserCount} from './App'

const Geolocation = () => {
  const [location, setLocation] = useState({
    latitude: null,
    longitude: null,
    error: null,
  });

  useEffect(() => {
    if (!navigator.geolocation) {
      setLocation({ error: 'Geolocation is not supported by your browser' });
      return;
    }

    const handleGeoSuccess = (position) => {
      setLocation({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
        error: null,
      });
      UserCount.lat = position.coords.latitude;
      UserCount.lng = position.coords.longitude;
    };

    const handleGeoError = (error) => {
      setLocation({ error: error.message });
    };

    navigator.geolocation.getCurrentPosition(handleGeoSuccess, handleGeoError);
  }, []);

  return (
    <div>
      {location.error ? (
        <p>Error: {location.error}</p>
      ) : (
        <>
          <p>Latitude: {location.latitude}</p>
          <p>Longitude: {location.longitude}</p>
        </>
      )}
    </div>
  );
};

export default Geolocation;
//export default location;