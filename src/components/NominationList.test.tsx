import React from 'react';
import { render, screen } from '@testing-library/react';
import { ChakraProvider } from '@chakra-ui/react';
import NominationList from './NominationList';
import { MovieData } from '../types';

// Mock the MovieList component to avoid complex dependencies
jest.mock('./MovieList', () => {
  return function MockMovieList({ movieList, handleNominatesClick, isNominated }: any) {
    return (
      <div data-testid="movie-list">
        {movieList.map((movie: MovieData) => (
          <div key={movie.imdbID} data-testid={`movie-${movie.imdbID}`}>
            {movie.Title}
          </div>
        ))}
      </div>
    );
  };
});

// Wrapper component to provide Chakra UI context
const ChakraWrapper = ({ children }: { children: React.ReactNode }) => (
  <ChakraProvider>{children}</ChakraProvider>
);

describe('NominationList Component', () => {
  const mockNominationList: MovieData[] = [
    { imdbID: '1', Title: 'The Matrix', Year: '1999', Poster: 'matrix.jpg' },
    { imdbID: '2', Title: 'Inception', Year: '2010', Poster: 'inception.jpg' },
    { imdbID: '3', Title: 'Interstellar', Year: '2014', Poster: 'interstellar.jpg' },
  ];

  const mockHandleNominatesClick = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders without crashing with nomination list', () => {
    render(
      <ChakraWrapper>
        <NominationList
          nominationList={mockNominationList}
          handleNominatesClick={mockHandleNominatesClick}
        />
      </ChakraWrapper>
    );
    
    // Component should render without throwing errors
    expect(document.body).toBeInTheDocument();
  });

  it('renders without crashing with empty nomination list', () => {
    render(
      <ChakraWrapper>
        <NominationList
          nominationList={[]}
          handleNominatesClick={mockHandleNominatesClick}
        />
      </ChakraWrapper>
    );
    
    // Component should render without throwing errors
    expect(document.body).toBeInTheDocument();
  });

  it('displays the correct nomination count in button text', () => {
    render(
      <ChakraWrapper>
        <NominationList
          nominationList={mockNominationList}
          handleNominatesClick={mockHandleNominatesClick}
        />
      </ChakraWrapper>
    );
    
    // Should show the count of nominations
    expect(screen.getByText('My list (3)')).toBeInTheDocument();
  });

  it('displays zero count when no nominations', () => {
    render(
      <ChakraWrapper>
        <NominationList
          nominationList={[]}
          handleNominatesClick={mockHandleNominatesClick}
        />
      </ChakraWrapper>
    );
    
    // Should show zero count
    expect(screen.getByText('My list (0)')).toBeInTheDocument();
  });

  it('accepts the correct props interface', () => {
    const props = {
      nominationList: mockNominationList,
      handleNominatesClick: mockHandleNominatesClick,
    };
    
    expect(() => {
      render(
        <ChakraWrapper>
          <NominationList {...props} />
        </ChakraWrapper>
      );
    }).not.toThrow();
  });
});