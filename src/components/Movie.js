import React from "react";

//Styling and animation
import styled from "styled-components";

//components
import AddNominate from "./AddNominate";
import RemoveNominate from "./RemoveNominate";

function Movie({
  title,
  poster,
  year,
  movie,
  nominationList,
  handleNominatesClick,
}) {
  //Checking is a movie is nominated or not
  const isNominated = (movie) => {
    let isNominated = false;
    nominationList &&
      nominationList.forEach((nominate) => {
        if (nominate.imdbID === movie.imdbID) isNominated = true;
      });
    return isNominated;
  };
  return (
    <StyledMovie
      onClick={() =>
        handleNominatesClick(!isNominated(movie) ? "add" : "remove", movie)
      }
    >
      <h3>{title}</h3>
      <p>{year}</p>
      <img src={poster} alt={title} />
      <Overlay>
        {isNominated(movie) && <RemoveNominate />}
        {!isNominated(movie) && nominationList.length < 5 && <AddNominate />}
      </Overlay>
    </StyledMovie>
  );
}

const StyledMovie = styled.div`
  min-height: 30vh;
  box-shadow: 0px 5px 20px rgba(0, 0, 0, 0.2);
  text-align: center;
  border-radius: 1rem;
  cursor: pointer;
  overflow: hidden;
  background-color: white;
  position: relative;
  img {
    width: 100%;
    height: 40vh;
    object-fit: cover;
  }
  &:hover {
    transform: scale(1.02);
    transition: ease-in-out 0.2s;
  }
`;

const Overlay = styled.div`
  opacity: 0;
  position: absolute;
  transition: 0.5s ease;
  bottom: 0;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.5);
  width: 100%;
  height: 100%;
  &:hover {
    opacity: 1;
  }
`;
export default Movie;
