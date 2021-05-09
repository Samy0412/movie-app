import axios from "axios";

//API request to get the movies from the search
export const getMovieSearch = async (searchValue) => {
  const baseUrl = `https://www.omdbapi.com/`;

  const response = await axios.get(baseUrl, {
    params: {
      s: `${searchValue}`,
      type: "movie",
      apikey: process.env.REACT_APP_OMDB_API,
    },
  });
  return response;
};
