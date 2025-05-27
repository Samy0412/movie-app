import React from "react";

//Components
import Movie from "./Movie";

//Styling and animation
import styled from "styled-components";

//Types
import { MovieListProps } from "../types";

function MovieList({ movies, nominationList, handleNominatesClick }: MovieListProps) {
  return (
    <>
      <Movies>
        {movies.map((movie) => (
          <Movie
            key={movie.imdbID}
            title={movie.Title}
            year={movie.Year}
            poster={movie.Poster}
            movie={movie}
            nominationList={nominationList}
            handleNominatesClick={handleNominatesClick}
          />
        ))}
      </Movies>
    </>
  );
}

//Styled components
const Movies = styled.div`
  display: grid;
  padding: 2rem 2rem;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  grid-column-gap: 2.5rem;
  grid-row-gap: 2.5rem;
`;

export default MovieList;