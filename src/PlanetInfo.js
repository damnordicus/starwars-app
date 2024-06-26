import React, { useState, useEffect } from "react";
import { Navigate, useParams } from 'react-router-dom';
import { useNavigate, Link } from 'react-router-dom';



const PlanetInfo = ({ planetId, setShowPlanetInfo, showPlanetInfo, planetDatas }) => {
  const{ planetName } = useParams();
  const navigate = useNavigate();
 // const id = getPlanetIdByName(planetName, planetDatas);

  let planData = 0;
  if(planetDatas && planetName){
    for(let i = 0; i < planetDatas.length; i++){
      if(planetDatas[i].name === planetName){
         planData = i + 1;
      }
    }
  }

  const [planetData, setPlanetData] = useState(null);
  const [characters, setCharacters] = useState([]); // Declare state for characters
  const [movies, setMovies] = useState([]) //Declaring state for movies

  

if(planData){
    planetId = planData;
  }
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

          //fetch movie data
          const moviePromises = data.films.map((url) =>
            fetch(url).then((res) => res.json())
          );
          // wait for all movie fetches to complete
          Promise.all(moviePromises).then((moviesData) =>
            setMovies(moviesData)
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
    if(planetName){
        navigate("/");
    }
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

        maxHeight: "80vh", // Maximum height of the dialog box
        overflowY: "auto", // Enable vertical scrolling if content exceeds max height
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
      <img src={`/textures/${planetData.name}_description.png`} alt={`${planetData.name} Description`} />
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

      <h3>Visiting Characters:</h3>
      <ul>
        {characters.length === 0 && <li>N/A...</li>}{" "}
        {/* // Show "N/A..." if there are no characters or data is still loading */}
        {characters.map((character, index) => (
          <li key={index}>{character.name}</li>
        ))}
      </ul>



      <h3>Featured Movies:</h3>
      <ul>
        {movies.length === 0 && <li>N/A...</li>}{" "}
        {/* // Show "N/A..." if there are no movies or data is still loading */}
        {movies.map((movie, index) => (
          <li key={index}>{movie.title}</li>
        ))}
      </ul>


    </div>
  );
};

export default PlanetInfo;
