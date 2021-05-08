import React from "react";

//Styling and animation
import styled from "styled-components";

//Icon components
import { IoTrashBinSharp } from "react-icons/io5";
import { IoAddOutline } from "react-icons/io5";

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
          className="poster__image"
        />
        {isNominated(movie) && (
          <img src="img/award-svg.svg" alt="award" className="award" />
        )}
      </div>
      <div className="info">
        <h3>{title}</h3>
        <p>{year}</p>
      </div>

      <Overlay>
        {isNominated(movie) && (
          <RemoveNominate className="animate">
            <IoTrashBinSharp />
          </RemoveNominate>
        )}
        {!isNominated(movie) && nominationList.length < 5 && (
          <AddNominate className="animate">
            <IoAddOutline />
          </AddNominate>
        )}
      </Overlay>
    </StyledMovie>
  );
}

//Styled components
const StyledMovie = styled.div`
  min-height: 30vh;
  box-shadow: 0px 5px 20px rgba(0, 0, 0, 0.2);
  text-align: center;
  cursor: pointer;
  background-color: white;
  position: relative;
  animation: zoomIn 2s ease;
  .poster {
    overflow: hidden;
    position: relative;
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
  .poster__image {
    width: 100%;
    height: 45vh;
    object-fit: cover;
  }

  .award {
    width: 65px;
    position: absolute;
    bottom: 5px;
    left: 10px;
  }

  &:hover {
    .poster__image {
      transform: scale(1.1);
      transition: ease-in-out 0.4s;
    }
    .animate {
      animation: bounce ease 1s;
    }
    @keyframes bounce {
      0% {
        transform: scale(1.2);
      }
      50% {
        transform: scale(0.8);
      }
      100% {
        transform: scale(1);
      }
    }
  }
  @keyframes zoomIn {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }
`;
const RemoveNominate = styled.p`
  background-color: rgb(0, 0, 0);
  padding: 1rem;
  border-radius: 50%;
  color: rgba(192, 164, 96, 1);
  font-size: 2rem;
  font-weight: 700;
  transition: ease-in 0.2s;
  opacity: 0.6;

  :hover {
    opacity: 0.8;
  }
`;
const AddNominate = styled.p`
  background-color: rgb(0, 0, 0);
  padding: 0.5rem;
  border-radius: 50%;
  color: rgba(192, 164, 96, 1);
  font-size: 3rem;
  font-weight: 700;
  transition: ease-in 0.2s;
  opacity: 0.6;
  :hover {
    opacity: 0.8;
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
  background: rgba(192, 164, 96, 0.4);
  width: 100%;
  height: 100%;
  &:hover {
    opacity: 1;
  }
`;

export default Movie;
