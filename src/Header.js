import React, { useEffect } from "react";
import "./Header.css";
import appLogo from "./app-logo.png";
import HandleButtonClick from "./ThreeScene.js";

function Header({
  planetDatas,
  /*Array of Planet Objects, names to be used to populate option list */
}) {
  useEffect(() => {
    console.log(planetDatas);
  });

  //NAvigate onclick to planet
  // set camera planets[index].position

  return (
    <div className="header">
      <div>
        <img className="logo" src={appLogo} alt="Super Cool Logo" />
      </div>
      <div className="nav-planets">
        <label>Choose a planet:</label>
        <select className="select" id="planets" name="planets">
          {planetDatas.map((index) => {
            return (
              <option className="options" value={index.name}>
                {index.name}
              </option>
            );
          })}
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
