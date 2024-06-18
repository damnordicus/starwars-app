//Movie.js

const Movie = ({movie, setSelectedMovie }) => {

    return (
        <div className = "movie" 
        onClick={()=>{setSelectedMovie(movie)}}
        style={{cursor: "pointer"}}
        >
            {movie.title}

        </div>
    )
}

export default Movie;