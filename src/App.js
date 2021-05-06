import { useState, useEffect } from "react";
import { Route } from "react-router-dom";
import axios from "axios";
//Components
import MovieList from "./pages/MovieList";
import Nav from "./components/Nav";
import AddNominate from "./components/AddNominate";

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
        apikey: process.env.REACT_APP_OMDB_API,
      },
    });
    response.data.Search && setMovies(response.data.Search);
  };

  useEffect(() => {
    getMovieSearch();
  }, [searchValue]);

  const addNominatedMovie = (movie) => {
    const newNominationList = [...nominationList, movie];
    setNominationList(newNominationList);
  };

  return (
    <StyledApp>
      <Nav searchValue={searchValue} setSearchValue={setSearchValue} />
      <Route path={"/"}>
        <MovieList
          movies={movies}
          handleNominatesClick={addNominatedMovie}
          AddNominate={AddNominate}
        />
      </Route>
    </StyledApp>
  );
}
const StyledApp = styled.div`
  background-color: black;
`;

export default App;
