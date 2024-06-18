//MovieList.js
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import movieData from './movies';
import Movie from './Movie';
import MovieDetails from './MovieDetails';

const MovieList = () => {
    const [selectedMovie, setSelectedMovie] = useState(null);
    const navigate = useNavigate();

    if (selectedMovie) {
        return (
            <MovieDetails movie={selectedMovie}
                setSelectedMovie={setSelectedMovie} />
        )
    }

    const handleCloseClick = (e) => {
        e.stopPropagation(); // Prevent the click event from propagating to the parent element
        // if (planetName) {
        navigate("/");
        // }
        // setShowPlanetInfo(false);
    };
    console.log(movieData);

    return (
        <div className="movie-list"
            style={{
                position: "absolute",
                top: 120,
                left: "2%",
                padding: "20px",
                backgroundColor: "#333",
                opacity: 0.9,
                borderRadius: "8px",
                zIndex: 1000,

                maxHeight: "80vh", // Maximum height of the dialog box
                overflowY: "auto", // Enable vertical scrolling if content exceeds max height
            }}>
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
            {/* {console.log(movieData.results)} */}
            {movieData && movieData.results && movieData.results.length > 0 ? (
                movieData.results.map((movie) => (
                    // included a conditional check to ensure 'movieData', and etc... are defined
                    <Movie
                        key={movie.episode_id} //prop added
                        movie={movie}
                        setSelectedMovie={setSelectedMovie}
                    />
                ))
            ) : (
                <p>No movies available</p>
            )}
        </div>
    );
};

export default MovieList;