

const MovieDetails = ({ movie, setSelectedMovie }) => {

    return (
        <div className="movie-details"

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
                onClick={() => { setSelectedMovie(false) }}
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
            <h1>{movie.title}</h1>
            <p>Episode ID: {movie.episode_id}</p>
            <p>Opening Crawl: {movie.opening_crawl}</p>
            <p>Director:{movie.director}</p>
            <p>Release Date:{movie.release_date}</p>

        </div>
    )
}

export default MovieDetails;