import React, { useState, useEffect } from 'react';

const GyroSensor = () => {
    const [tilt, setTilt] = useState({ x: 0, y: 0, z: 0 });

    useEffect(() => {
    window.addEventListener('deviceorientation', handleOrientation,true);
    return () => {
        window.removeEventListener('deviceorientation', handleOrientation);
    };
    }, []);

    const handleOrientation = (event) => {
    setTilt({
        x: event.beta,
        y: event.gamma,
        z: event.alpha
    });
    console.log(event.beta)
    console.log(event.gamma)
    console.log(event.alpha)
    };

    return (
    <div>
        <p>Tilt around the x-axis: {tilt.x}°</p>
        <p>Tilt around the y-axis: {tilt.y}°</p>
        <p>Tilt around the z-axis: {tilt.z}°</p>
    </div>
    );
};

export default GyroSensor;
