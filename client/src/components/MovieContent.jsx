import React from 'react';

function MovieContent({movie, showFaves, handleSubmit}){
const addFavorite = !showFaves && <p className="addF" onClick={(e)=>{handleSubmit(e,null, movie)}}> add to Favorites </p>
const deleteFavorite = showFaves && <p className="deleteF" onClick={(e)=>{handleSubmit(e,null, null, movie.Oid)}}> Delete </p>
  return(
          <li className="movie_item">
            <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt ={movie.title} />
            <div className="movie_description">
              <section className="movie_details">
                <div className="movie_year">
                  <span className="title">Year</span>
                  <span>{movie.release_date}</span>
                </div>
                <div className="movie_rating">
                  <span className="title">Rating</span>
                  <span>{movie.popularity}</span>
                </div>
              </section>
              <h2> {movie.title} </h2>
              {movie.overview}
              {addFavorite}
              {deleteFavorite}
            </div>
          </li>
  )
}

export default MovieContent;