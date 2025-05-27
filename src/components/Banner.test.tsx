import React from 'react';
import { render, screen } from '@testing-library/react';
import { ChakraProvider } from '@chakra-ui/react';
import Banner from './Banner';
import { MovieData } from '../types';

// Wrapper component to provide Chakra UI context
const ChakraWrapper = ({ children }: { children: React.ReactNode }) => (
  <ChakraProvider>{children}</ChakraProvider>
);

describe('Banner Component', () => {
  const mockMovies: MovieData[] = [
    { imdbID: '1', Title: 'Movie 1', Year: '2021', Poster: 'poster1.jpg' },
    { imdbID: '2', Title: 'Movie 2', Year: '2022', Poster: 'poster2.jpg' },
    { imdbID: '3', Title: 'Movie 3', Year: '2023', Poster: 'poster3.jpg' },
    { imdbID: '4', Title: 'Movie 4', Year: '2024', Poster: 'poster4.jpg' },
    { imdbID: '5', Title: 'Movie 5', Year: '2025', Poster: 'poster5.jpg' },
  ];

  it('renders without crashing when 5 movies are provided', () => {
    render(
      <ChakraWrapper>
        <Banner nominationList={mockMovies} />
      </ChakraWrapper>
    );
    
    // Component should render without throwing errors
    expect(document.body).toBeInTheDocument();
  });

  it('renders without crashing when fewer than 5 movies are provided', () => {
    const fewerMovies = mockMovies.slice(0, 3);
    render(
      <ChakraWrapper>
        <Banner nominationList={fewerMovies} />
      </ChakraWrapper>
    );
    
    // Component should render without throwing errors
    expect(document.body).toBeInTheDocument();
  });

  it('renders without crashing when no movies are provided', () => {
    render(
      <ChakraWrapper>
        <Banner nominationList={[]} />
      </ChakraWrapper>
    );
    
    // Component should render without throwing errors
    expect(document.body).toBeInTheDocument();
  });

  it('accepts the correct props interface', () => {
    // This test ensures the component accepts the expected props
    const props = { nominationList: mockMovies };
    
    expect(() => {
      render(
        <ChakraWrapper>
          <Banner {...props} />
        </ChakraWrapper>
      );
    }).not.toThrow();
  });
});