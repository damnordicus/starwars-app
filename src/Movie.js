//Movie.js

const Movie = ({movie, setSelectedMovie }) => {

    return (
        <div className = "movie" 
        onClick={()=>{setSelectedMovie(movie)}}
        style={{cursor: "pointer"}}
        // pointer added to click on movies
        >
            {movie.title}

        </div>
    )
}

export default Movie;