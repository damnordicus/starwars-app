import React, { useState } from 'react';
import ThreeScene from './ThreeScene';
import PlanetInfo from './PlanetInfo'; // This will be our UI component to show on click

const App = () => {
  const [showPlanetInfo, setShowPlanetInfo] = useState(false);
  const [selectedPlanetId, setSelectedPlanetId] = useState(null);

  const handlePlanetClick = (input) => {
    setSelectedPlanetId(input);
    setShowPlanetInfo(true);
  };

  //FETCH - Tiffany
  //Test
  return (
    <>
    <div>
      <ThreeScene onPlanetClick={handlePlanetClick} planetNames={["test1", "test2", "test3", "test4", "test5"]}/>
      {showPlanetInfo && <PlanetInfo planetId={selectedPlanetId} setShowPlanetInfo={setShowPlanetInfo} showPlanetInfo={showPlanetInfo} />}
    </div>
    </>
  );
};

export default App;