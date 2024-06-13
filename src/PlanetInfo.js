import React from 'react';
import { useState, useEffect } from 'react';

const PlanetInfo = ({ planetId, setShowPlanetInfo, showPlanetInfo }) => {
  const [planetData, setPlanetData] = useState(null);

  //by Tiffany
  useEffect(() => {
    if (planetId) {
      fetch(`https://swapi.dev/api/planets/${planetId}/`)
        .then(res => res.json())
        .then(data =>
          setPlanetData(data)); //this will retrive data in API list
      // .catch(error => console.error('Error fetching planets:', error));
    }
  }, [planetId]);

  //by Tiffany
  if (planetData === null) {
    return (
      <p>
        ...Loading
      </p>
    )
  }
  const handleClick = () => {
    setShowPlanetInfo(!showPlanetInfo);
  }

  return (
    <div onClick={handleClick} style={{ position: 'absolute', top: 20, right: 20, padding: '20px', backgroundColor: 'rgba(255, 255, 255, 0.8)' }}>
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
    </div>
  );
};

export default PlanetInfo;