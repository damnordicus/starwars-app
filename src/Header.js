import React, { useEffect } from "react";
import { useNavigate, Link } from 'react-router-dom';
import "./Header.css";
import appLogo from "./app-logo.png";
//import {handleButtonClick} from "./ThreeScene.js";

function Header({
  planetDatas,
  setMenuPlanetSelected,
  /*Array of Planet Objects, names to be used to populate option list */
}) {
  const navigate = useNavigate();

  const handlePlanetSelection = (event) => {
      const planetName = event.target.value;
      navigate(`/Planets/${planetName}`);
      setMenuPlanetSelected(planetName);
  }

  //NAvigate onclick to planet
  // set camera planets[index].position
  const handleChange = (event) => {
      const selectedPlanetName = event.target.value;
      // Find the corresponding planet object based on the selected name
      const selectedPlanet = planetDatas.find(planet => planet.name === selectedPlanetName);
  
      // If a planet is found, trigger handleButtonClick with the planet ID
      if (selectedPlanet) {
        //find selected planet data in planetDatas
        for(let i = 0; i< planetDatas.length; i++)
          {
            if(planetDatas[i].name === selectedPlanet)
              {
                setMenuPlanetSelected(i);
              }
          }

        //setMenuPlanetSelected(selectedPlanet);
        //handleButtonClick(selectedPlanet.id); // Assuming planet object has an 'id' property
      }
    };
 
  return (
    <div className="header">
      <div>
        <img className="logo" src={appLogo} alt="Super Cool Logo" />
      </div>
      <div className="nav-planets">
        <label>Choose a planet:</label>
        <select className="select" id="planets" name="planets" onChange={handlePlanetSelection}>
          {planetDatas.map((index) => (
            <option className="options" value={index.name}>
              {index.name}
            </option>
          ))}
        </select>
      </div>
      <div className="nav-movies-characters">
        <Link to="/CharacterList" ><button className="cool-button">Characters</button></Link>
        {/* This will navigate to a homepage that lists all the characters */}
        <Link to="/MovieList"><button className="cool-button">Movies</button></Link>
        {/* This will navigate to a homepage that lists all the movies */}
      </div>
      <h1>STAR WARS APP</h1>
    </div>
  );
}

export default Header;
