import React, { useEffect } from "react";
import "./Header.css";
import appLogo from "./app-logo.png";
//import {handleButtonClick} from "./ThreeScene.js";

function Header({
  planetDatas,
  setMenuPlanetSelected
  /*Array of Planet Objects, names to be used to populate option list */
}) {
  

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
        <select className="select" id="planets" name="planets" onChange={handleChange}>
          {planetDatas.map((index) => (
              <option className="options" value={index.name} >
                {index.name}
              </option>
            ))
          }
        </select>
      </div>
      <div className="nav-movies-characters">
        <button className="cool-button">characters</button>
        {/* This will navigate to a homepage that lists all the characters */}
        <button className="cool-button">movies</button>
        {/* This will navigate to a homepage that lists all the movies */}
      </div>
      <h1>STAR WARS APP</h1>
    </div>
  );
}

export default Header;
