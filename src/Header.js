import React from "react";
import "./Header.css";
import appLogo from "./app-logo.png";
import ThreeScene, {handleButtonClick} from "./ThreeScene"

function Header(
  {
    /*Array of Planet Objects, names to be used to populate option list */
  }
) {
  return (
    <div className="header">
      <div>
        <img className="logo" src={appLogo} alt="Super Cool Logo" />
      </div>
      <div className="nav-planets">
        <label>Choose a planet:</label>
        <select className="select" id="planets" name="planets">
          <option className="options" value="mun">
            mun
          </option>
          <option className="options" value="sol">
            sol
          </option>
          <option className="options" value="ya motha">
            ya motha
          </option>
          <option className="options" value="Mars">
            Mars
          </option>
          {/* Make this section of options dynamic based on the planet prop passed in:
            Something like:
              planets.map(
              <option value={planet.name}>{planet.name}</option>)

          */}
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
