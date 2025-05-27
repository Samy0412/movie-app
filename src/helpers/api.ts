import axios, { AxiosResponse } from "axios";
import { MovieData } from "../types";

interface OMDBResponse {
  Search?: MovieData[];
  totalResults?: string;
  Response: string;
  Error?: string;
}

//API request to get the movies from the search
export const getMovieSearch = async (searchValue: string): Promise<AxiosResponse<OMDBResponse>> => {
  const baseUrl = `https://www.omdbapi.com/`;

  const response = await axios.get<OMDBResponse>(baseUrl, {
    params: {
      s: `${searchValue}`,
      type: "movie",
      apikey: process.env.REACT_APP_OMDB_API,
    },
  });
  return response;
};