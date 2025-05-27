// Movie data structure from OMDB API
export interface MovieData {
  imdbID: string;
  Title: string;
  Year: string;
  Poster: string;
}

// API response structure
export interface MovieSearchResponse {
  Search?: MovieData[];
  totalResults?: string;
  Response: string;
  Error?: string;
}

// Component prop types
export interface MovieProps {
  title: string;
  poster: string;
  year: string;
  movie: MovieData;
  nominationList: MovieData[];
  handleNominatesClick: (action: "add" | "remove", movie: MovieData) => void;
}

export interface MovieListProps {
  movies: MovieData[];
  nominationList: MovieData[];
  handleNominatesClick: (action: "add" | "remove", movie: MovieData) => void;
}

export interface NavProps {
  searchValue: string;
  setSearchValue: (value: string) => void;
  nominationList: MovieData[];
  handleNominatesClick: (action: "add" | "remove", movie: MovieData) => void;
}

export interface NominationListProps {
  nominationList: MovieData[];
  handleNominatesClick: (action: "add" | "remove", movie: MovieData) => void;
}

export interface BannerProps {
  nominationList: MovieData[];
}