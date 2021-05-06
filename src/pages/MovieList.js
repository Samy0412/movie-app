import React from "react";

//Components
import Movie from "../components/Movie";

//Styling and animation
import styled from "styled-components";

function MovieList({ movies, AddNominate, handleNominatesClick }) {
  return (
    <>
      <Movies>
        {movies.map((movie) => (
          <Movie
            key={movie.imdbID}
            title={movie.Title}
            year={movie.Year}
            poster={movie.Poster}
            AddNominate={AddNominate}
            movie={movie}
            handleNominatesClick={handleNominatesClick}
          />
        ))}
      </Movies>
      {movies && movies.length === 0 && (
        <h3>Sorry, we didn't find any match!</h3>
      )}
    </>
  );
}

const Movies = styled.div`
  min-height: 80vh;
  display: grid;
  padding: 2rem 2rem;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  grid-template-rows: 400px 400px 400px;
  grid-column-gap: 2.5rem;
  grid-row-gap: 2.5rem;
`;

export default MovieList;
