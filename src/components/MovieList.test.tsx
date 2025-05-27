import React from 'react';
import { render, screen } from '@testing-library/react';
import MovieList from './MovieList';
import { MovieData } from '../types';

// Mock the Movie component
jest.mock('./Movie', () => {
  return function MockMovie({ title, year, poster, movie }: any) {
    return (
      <div data-testid={`movie-${movie.imdbID}`}>
        <h3>{title}</h3>
        <p>{year}</p>
        <img src={poster} alt={title} />
      </div>
    );
  };
});

describe('MovieList Component', () => {
  const mockMovies: MovieData[] = [
    { imdbID: '1', Title: 'The Matrix', Year: '1999', Poster: 'matrix.jpg' },
    { imdbID: '2', Title: 'Inception', Year: '2010', Poster: 'inception.jpg' },
    { imdbID: '3', Title: 'Interstellar', Year: '2014', Poster: 'interstellar.jpg' },
  ];

  const mockNominationList: MovieData[] = [
    { imdbID: '1', Title: 'The Matrix', Year: '1999', Poster: 'matrix.jpg' },
  ];

  const mockHandleNominatesClick = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders all movies in the list', () => {
    render(
      <MovieList
        movies={mockMovies}
        nominationList={mockNominationList}
        handleNominatesClick={mockHandleNominatesClick}
      />
    );

    expect(screen.getByTestId('movie-1')).toBeInTheDocument();
    expect(screen.getByTestId('movie-2')).toBeInTheDocument();
    expect(screen.getByTestId('movie-3')).toBeInTheDocument();
  });

  it('displays movie titles correctly', () => {
    render(
      <MovieList
        movies={mockMovies}
        nominationList={mockNominationList}
        handleNominatesClick={mockHandleNominatesClick}
      />
    );

    expect(screen.getByText('The Matrix')).toBeInTheDocument();
    expect(screen.getByText('Inception')).toBeInTheDocument();
    expect(screen.getByText('Interstellar')).toBeInTheDocument();
  });

  it('displays movie years correctly', () => {
    render(
      <MovieList
        movies={mockMovies}
        nominationList={mockNominationList}
        handleNominatesClick={mockHandleNominatesClick}
      />
    );

    expect(screen.getByText('1999')).toBeInTheDocument();
    expect(screen.getByText('2010')).toBeInTheDocument();
    expect(screen.getByText('2014')).toBeInTheDocument();
  });

  it('renders empty list when no movies provided', () => {
    render(
      <MovieList
        movies={[]}
        nominationList={mockNominationList}
        handleNominatesClick={mockHandleNominatesClick}
      />
    );

    expect(screen.queryByTestId(/movie-/)).not.toBeInTheDocument();
  });

  it('passes correct props to Movie components', () => {
    render(
      <MovieList
        movies={mockMovies.slice(0, 1)}
        nominationList={mockNominationList}
        handleNominatesClick={mockHandleNominatesClick}
      />
    );

    const movieElement = screen.getByTestId('movie-1');
    expect(movieElement).toBeInTheDocument();
    
    // Check that the movie data is passed correctly
    expect(screen.getByText('The Matrix')).toBeInTheDocument();
    expect(screen.getByText('1999')).toBeInTheDocument();
    expect(screen.getByAltText('The Matrix')).toHaveAttribute('src', 'matrix.jpg');
  });

  it('handles large number of movies', () => {
    const manyMovies: MovieData[] = Array.from({ length: 10 }, (_, i) => ({
      imdbID: `${i + 1}`,
      Title: `Movie ${i + 1}`,
      Year: `${2000 + i}`,
      Poster: `movie${i + 1}.jpg`,
    }));

    render(
      <MovieList
        movies={manyMovies}
        nominationList={mockNominationList}
        handleNominatesClick={mockHandleNominatesClick}
      />
    );

    // Check that all movies are rendered
    manyMovies.forEach((movie) => {
      expect(screen.getByTestId(`movie-${movie.imdbID}`)).toBeInTheDocument();
    });
  });
});