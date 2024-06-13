import React from "react";

function Header(
  {
    /*Array of Planet Objects, names to be used to populate option list */
  }
) {
  return (
    <div className="header">
      <img src="../public/app-logo.png" alt="Super Cool Logo" />
      <div className="navigation">
        <label for="planets">Choose a planet:</label>
        <select id="planets" name="planets">
          <option value="mun">Volvo</option>
          <option value="sol">Saab</option>
          <option value="ya motha">Fiat</option>
          <option value="Mars">Audi</option>
          {/* Make this section of options dynamic based on the planet prop passed in:
            Something like:
              planets.map(
              <option value={planet.name}>{planet.name}</option>)

          */}
        </select>
        <p>characters home nav button</p>
        {/* This will navigate to a homepage that lists all the characters */}
        <p>movies home nav button</p>
        {/* This will navigate to a homepage that lists all the movies */}
      </div>
      <h1>STAR WARS APP</h1>
    </div>
  );
}

export default Header;
