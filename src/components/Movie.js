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
  //Checking if a movie is already nominated
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
      <div className="poster">
        <img
          src={poster === "N/A" ? "img/no-image-available.png" : poster}
          alt={title}
        />
      </div>
      <div className="info">
        <h3>{title}</h3>
        <p>{year}</p>
      </div>

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
  cursor: pointer;
  background-color: white;
  position: relative;

  .poster {
    overflow: hidden;
  }
  .info {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    padding: 1rem 1rem;
    max-height: 4rem;
    h3 {
      font-size: 14px;
      font-weight: 700;
    }
    p {
      font-size: 14px;
    }
  }
  img {
    width: 100%;
    height: 45vh;
    object-fit: cover;
  }
  &:hover {
    img {
      transform: scale(1.1);
      transition: ease-in-out 0.4s;
    }
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
