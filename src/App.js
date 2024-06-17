import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ThreeScene from "./ThreeScene";
import PlanetInfo from "./PlanetInfo"; // This will be our UI component to show on click
import Header from "./Header.js"; // This will be <self-explanatory>



const App = () => {
  const [showPlanetInfo, setShowPlanetInfo] = useState(false);
  const [selectedPlanetId, setSelectedPlanetId] = useState(null);
  const [planetDatas, setPlanetDatas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [menuPlanetSelected, setMenuPlanetSelected] = useState(null);

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
  }, []);

  //FETCH - Tiffany
  //Test
  return (
    <>
      <Routes>
        {/* <Route path="/Movies" element={<Movies />}/>
        <Route path="/Characters" element={<Characters />}/> */}
        <Route path="/Planets/:planetName" element={<PlanetInfo planetDatas={planetDatas} setShowPlanetInfo={setShowPlanetInfo} showPlanetInfo={showPlanetInfo}/>} />
        {/* <Route path="/a" element={<ThreeScene />} /> */}
      </Routes>
      <div>
        {!loading && <Header planetDatas={planetDatas} setMenuPlanetSelected={setMenuPlanetSelected} />}
        {!loading && (
          <ThreeScene
            onPlanetClick={handlePlanetClick}
            planetDatas={planetDatas}
            menuPlanetSelected={menuPlanetSelected}
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
