import React, { useEffect, useState } from "react";
import ThreeScene from "./ThreeScene";
import PlanetInfo from "./PlanetInfo"; // This will be our UI component to show on click
import Header from "./Header.js"; // This will be <self-explanatory>

const App = () => {
  const [showPlanetInfo, setShowPlanetInfo] = useState(false);
  const [selectedPlanetId, setSelectedPlanetId] = useState(null);
  const [planetDatas, setPlanetDatas] = useState([]);
  const [loading, setLoading] = useState(true);

  const handlePlanetClick = (input) => {
    setSelectedPlanetId(input);
    setShowPlanetInfo(true);
  };

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("https://swapi.dev/api/planets");
      const results = await response.json();
      const data = results.results;
      setPlanetDatas(data);
      setLoading(false);
    };
    fetchData();
  });

  //FETCH - Tiffany
  //Test
  return (
    <>
      <div>
        {!loading && <Header />}
        {!loading && (
          <ThreeScene
            onPlanetClick={handlePlanetClick}
            planetDatas={planetDatas}
            planetNames={["test1", "test2", "test3", "test4", "test5"]}
          />
        )}
        {showPlanetInfo && (
          <PlanetInfo
            planetId={selectedPlanetId}
            setShowPlanetInfo={setShowPlanetInfo}
            showPlanetInfo={showPlanetInfo}
          />
        )}
      </div>
    </>
  );
};

export default App;
