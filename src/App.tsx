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

//Types
import { MovieData } from "./types";

//Styling and animation
import styled from "styled-components";

function App(): React.JSX.Element {
  //Movies from result search
  const [movies, setMovies] = useState<MovieData[]>([]);
  //Search value
  const [searchValue, setSearchValue] = useState<string>("");
  //Nominated movies
  const [nominationList, setNominationList] = useState<MovieData[]>([]);

  //Retrieves the nomination list saved by the user if it exists
  useEffect(() => {
    try {
      const savedData = localStorage.getItem("nominationList");
      if (savedData) {
        const savedNominationList: MovieData[] = JSON.parse(savedData);
        savedNominationList && setNominationList(savedNominationList);
      }
    } catch (error) {
      console.error("Error parsing saved nomination list:", error);
    }
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
  const handleNominatesClick = (action: "add" | "remove", movie: MovieData): void => {
    let newNominationList: MovieData[] = [];
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