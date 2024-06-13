import React from 'react';

const PlanetInfo = ({planetId, setShowPlanetInfo, showPlanetInfo}) => {

  const handleClick = () => {
    setShowPlanetInfo(!showPlanetInfo);
  }

  return (
    <div onClick={handleClick}style={{ position: 'absolute', top: 20, right: 20, padding: '20px', backgroundColor: 'rgba(255, 255, 255, 0.8)' }}>
      <h2>Planet Information</h2>
      <p>This is information about the planet.</p>
      <p>Planet ID: {planetId}</p>
    </div>
  );
};

export default PlanetInfo;