import { useState, useEffect } from "react";
import { Route } from "react-router-dom";

//Helper functions
import { getMovieSearch } from "./helpers/api";
import {
  saveToLocalStorage,
  addToList,
  removeFromList,
} from "./helpers/functions";

//Components
import MovieList from "./components/MovieList";
import Nav from "./components/Nav";
import Banner from "./components/Banner";

//Styling and animation
import styled from "styled-components";

function App() {
  //Movies from result search
  const [movies, setMovies] = useState([]);
  //Search value
  const [searchValue, setSearchValue] = useState("");
  //Nominated movies
  const [nominationList, setNominationList] = useState([]);

  //Retrieves the nomination list saved by the user if it exists
  useEffect(() => {
    const savedNominationList = JSON.parse(
      localStorage.getItem("nominationList")
    );
    savedNominationList && setNominationList(savedNominationList);
  }, []);

  //Gets the movies for the search
  useEffect(() => {
    getMovieSearch(searchValue).then((response) => {
      if (response.data.Search) {
        setMovies(response.data.Search);
      }
    });
  }, [searchValue]);

  //Adds or removes a movie from the nomination list
  const handleNominatesClick = (action, movie) => {
    let newNominationList = [];
    if (action === "add") {
      newNominationList = addToList(movie, nominationList);
    } else {
      newNominationList = removeFromList(movie, nominationList);
    }
    setNominationList(newNominationList);
    saveToLocalStorage(newNominationList);
  };

  return (
    <>
      <StyledApp>
        <Nav
          searchValue={searchValue}
          setSearchValue={setSearchValue}
          nominationList={nominationList}
          handleNominatesClick={handleNominatesClick}
          movies={movies}
        />
        <Route path={"/"}>
          <MovieList
            movies={movies}
            handleNominatesClick={handleNominatesClick}
            nominationList={nominationList}
          />
          <Footer>
            2021 - Build by{" "}
            <a href="https://github.com/Samy0412" target="__blank">
              Samantha Gadet
            </a>{" "}
            for the front end shopify challenge.
          </Footer>
        </Route>
      </StyledApp>
      <Banner nominationList={nominationList} />
    </>
  );
}

//Styled components
const StyledApp = styled.div`
  background-color: black;
  padding: 0rem 15rem;
  @media screen and (max-width: 1220px) {
    padding: 0rem;
  }
`;
const Footer = styled.div`
  color: white;
  position: absolute;
  bottom: 1rem;
  right: 0;
  padding-left: 1.5rem;
  padding-right: 1.5rem;
  font-size: 0.8rem;
  opacity: 0.7;
  a {
    color: rgb(192, 164, 96);
    font-weight: 500;
  }
`;

export default App;
