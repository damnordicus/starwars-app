import React, { useState, useEffect } from "react";

const PlanetInfo = ({ planetId, setShowPlanetInfo, showPlanetInfo }) => {
  const [planetData, setPlanetData] = useState(null);
  const [characters, setCharacters] = useState([]); // Declare state for characters

  useEffect(() => {
    if (planetId) {
      fetch(`https://swapi.dev/api/planets/${planetId}/`)
        .then((res) => res.json())
        .then((data) => {
          setPlanetData(data); // set the fetched plante data


          // fetch character data
          const characterPromises = data.residents.map((url) =>
            fetch(url).then((res) => res.json())
          );

          // wait for all character fetches to complete
          Promise.all(characterPromises).then((charactersData) =>
            setCharacters(charactersData)
          );
        });
    }
  }, [planetId]);

  if (planetData === null) {
    return <p>...Loading</p>;
  }

  const handleClick = () => {
    setShowPlanetInfo(!showPlanetInfo);
  };

  const handleCloseClick = (e) => {
    e.stopPropagation(); // Prevent the click event from propagating to the parent element
    setShowPlanetInfo(false);
  };

  return (
    <div
      onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside the dialog
      style={{
        position: "absolute",
        top: 120,
        right: "2%",
        padding: "20px",
        backgroundColor: "#333",
        opacity: 0.9,
        borderRadius: "8px",
        zIndex: 1000,
      }}
    >

      <button
        onClick={handleCloseClick}
        style={{
          position: "absolute",
          top: "5px",
          right: "5px",
          backgroundColor: "transparent",
          border: "none",
          color: "white",
          fontSize: "20px",
          cursor: "pointer",
        }}
      >
        ×
      </button>



      <h2>{planetData.name}</h2>
      <p>Planet ID: {planetId}</p>
      <p>Orbital Period: {planetData.orbital_period} days</p>
      <p>Rotation Period: {planetData.rotation_period} hours</p>
      <p>Climate: {planetData.climate}</p>
      <p>Terrain: {planetData.terrain}</p>
      <p>Gravity: {planetData.gravity}</p>
      <p>Surface Water: {planetData.surface_water}</p>
      <p>Population: {planetData.population}</p>
      <p>Diameter: {planetData.diameter}</p>
      {/* <p>Characters: {planetData.residents.map(x => <p>{x}</p>)}</p> */}
      {/* {x} is each element in the array and requires <p> tags to be displayed */}

      <h3>Actors:</h3>
      <ul>
        {characters.length === 0 && <li>N/A...</li>}{" "}
        {/* // Show "N/A..." if there are no characters or data is still loading */}
        {characters.map((character, index) => (
          <li key={index}>{character.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default PlanetInfo;
