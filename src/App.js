import React, { useState } from 'react';
import ThreeScene from './ThreeScene';
import PlanetInfo from './PlanetInfo'; // This will be our UI component to show on click

const App = () => {
  const [showPlanetInfo, setShowPlanetInfo] = useState(false);

  const handlePlanetClick = () => {
    setShowPlanetInfo(true);
  };

  return (
    <>
    <div>
      <ThreeScene onPlanetClick={handlePlanetClick} />
      {showPlanetInfo && <PlanetInfo />}
    </div>
    </>
  );
};

export default App;