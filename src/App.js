import { useState, useEffect } from "react";
import { Route } from "react-router-dom";
import axios from "axios";
//Components
import MovieList from "./pages/MovieList";
import Nav from "./components/Nav";

//Styling and animation
import styled from "styled-components";

function App() {
  //Movies from result search
  const [movies, setMovies] = useState([]);
  //Search value
  const [searchValue, setSearchValue] = useState("");
  //Nominated movies
  const [nominationList, setNominationList] = useState([]);

  //API request to get the movies
  const getMovieSearch = async () => {
    const baseUrl = `http://www.omdbapi.com/`;

    const response = await axios.get(baseUrl, {
      params: {
        s: `${searchValue}`,
        type: "movie",
        apikey: process.env.REACT_APP_OMDB_API,
      },
    });
    if (response.data.Search) {
      setMovies(response.data.Search);
    }
  };

  useEffect(() => {
    getMovieSearch();
  }, [searchValue]);

  useEffect(() => {
    const savedNominationList = JSON.parse(
      localStorage.getItem("nominationList")
    );
    savedNominationList && setNominationList(savedNominationList);
  }, []);

  const saveToLocalStorage = (items) => {
    localStorage.setItem("nominationList", JSON.stringify(items));
  };

  const addMovie = (movie) => {
    const newNominationList = [...nominationList, movie];
    setNominationList(newNominationList);
    saveToLocalStorage(newNominationList);
  };

  const removeMovie = (movie) => {
    const newNominationList = nominationList.filter(
      (nominate) => nominate.imdbID !== movie.imdbID
    );
    setNominationList(newNominationList);
    saveToLocalStorage(newNominationList);
  };

  const handleNominatesClick = (action, movie) => {
    action === "add" ? addMovie(movie) : removeMovie(movie);
  };

  return (
    <StyledApp>
      <Nav searchValue={searchValue} setSearchValue={setSearchValue} />
      <Route path={"/"}>
        <MovieList
          movies={movies}
          handleNominatesClick={handleNominatesClick}
          nominationList={nominationList}
        />
      </Route>
    </StyledApp>
  );
}
const StyledApp = styled.div`
  background-color: black;
`;

export default App;
