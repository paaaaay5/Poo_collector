import React, { useState, useEffect } from 'react';

const CameraPermission = () => {
    const [hasPermission, setHasPermission] = useState(null);

    useEffect(() => {
    async function getPermission() {
        const { state } = await navigator.permissions.query({ name: 'camera' });
        setHasPermission(state);
    }
    getPermission();
    }, []);

  return (
    <div>
      {hasPermission === 'granted' ? (
        <div></div>
      ) : hasPermission === 'denied' ? (
        <p>Camera access is denied.</p>
      ) : (
        <div></div>
      )}
    </div>
  );
};

export default CameraPermission;
