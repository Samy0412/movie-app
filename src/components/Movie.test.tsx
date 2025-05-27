import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Movie from './Movie';
import { MovieData } from '../types';

// Mock the icons to avoid import issues in tests
jest.mock('react-icons/io5', () => ({
  IoTrashBinSharp: () => <div data-testid="trash-icon">Trash</div>,
  IoAddOutline: () => <div data-testid="add-icon">Add</div>,
}));

describe('Movie Component', () => {
  const mockMovie: MovieData = {
    imdbID: '123',
    Title: 'Test Movie',
    Year: '2021',
    Poster: 'https://example.com/poster.jpg'
  };

  const mockHandleNominatesClick = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render movie information correctly', () => {
    render(
      <Movie
        title={mockMovie.Title}
        poster={mockMovie.Poster}
        year={mockMovie.Year}
        movie={mockMovie}
        nominationList={[]}
        handleNominatesClick={mockHandleNominatesClick}
      />
    );

    expect(screen.getByText('Test Movie')).toBeInTheDocument();
    expect(screen.getByText('2021')).toBeInTheDocument();
    expect(screen.getByAltText('Test Movie')).toBeInTheDocument();
  });

  it('should show add icon when movie is not nominated and nomination list is not full', () => {
    render(
      <Movie
        title={mockMovie.Title}
        poster={mockMovie.Poster}
        year={mockMovie.Year}
        movie={mockMovie}
        nominationList={[]}
        handleNominatesClick={mockHandleNominatesClick}
      />
    );

    expect(screen.getByTestId('add-icon')).toBeInTheDocument();
    expect(screen.queryByTestId('trash-icon')).not.toBeInTheDocument();
  });

  it('should show remove icon when movie is nominated', () => {
    const nominationList = [mockMovie];

    render(
      <Movie
        title={mockMovie.Title}
        poster={mockMovie.Poster}
        year={mockMovie.Year}
        movie={mockMovie}
        nominationList={nominationList}
        handleNominatesClick={mockHandleNominatesClick}
      />
    );

    expect(screen.getByTestId('trash-icon')).toBeInTheDocument();
    expect(screen.queryByTestId('add-icon')).not.toBeInTheDocument();
  });

  it('should not show add icon when nomination list is full (5 items)', () => {
    const fullNominationList: MovieData[] = [
      { imdbID: '1', Title: 'Movie 1', Year: '2021', Poster: 'N/A' },
      { imdbID: '2', Title: 'Movie 2', Year: '2021', Poster: 'N/A' },
      { imdbID: '3', Title: 'Movie 3', Year: '2021', Poster: 'N/A' },
      { imdbID: '4', Title: 'Movie 4', Year: '2021', Poster: 'N/A' },
      { imdbID: '5', Title: 'Movie 5', Year: '2021', Poster: 'N/A' }
    ];

    render(
      <Movie
        title={mockMovie.Title}
        poster={mockMovie.Poster}
        year={mockMovie.Year}
        movie={mockMovie}
        nominationList={fullNominationList}
        handleNominatesClick={mockHandleNominatesClick}
      />
    );

    expect(screen.queryByTestId('add-icon')).not.toBeInTheDocument();
    expect(screen.queryByTestId('trash-icon')).not.toBeInTheDocument();
  });

  it('should call handleNominatesClick with "add" when clicking non-nominated movie', () => {
    render(
      <Movie
        title={mockMovie.Title}
        poster={mockMovie.Poster}
        year={mockMovie.Year}
        movie={mockMovie}
        nominationList={[]}
        handleNominatesClick={mockHandleNominatesClick}
      />
    );

    const movieElement = screen.getByText('Test Movie').closest('div')?.parentElement;
    if (movieElement) {
      fireEvent.click(movieElement);
    }

    expect(mockHandleNominatesClick).toHaveBeenCalledWith('add', mockMovie);
    expect(mockHandleNominatesClick).toHaveBeenCalledTimes(1);
  });

  it('should call handleNominatesClick with "remove" when clicking nominated movie', () => {
    const nominationList = [mockMovie];

    render(
      <Movie
        title={mockMovie.Title}
        poster={mockMovie.Poster}
        year={mockMovie.Year}
        movie={mockMovie}
        nominationList={nominationList}
        handleNominatesClick={mockHandleNominatesClick}
      />
    );

    const movieElement = screen.getByText('Test Movie').closest('div')?.parentElement;
    if (movieElement) {
      fireEvent.click(movieElement);
    }

    expect(mockHandleNominatesClick).toHaveBeenCalledWith('remove', mockMovie);
    expect(mockHandleNominatesClick).toHaveBeenCalledTimes(1);
  });

  it('should show placeholder image when poster is "N/A"', () => {
    render(
      <Movie
        title={mockMovie.Title}
        poster="N/A"
        year={mockMovie.Year}
        movie={mockMovie}
        nominationList={[]}
        handleNominatesClick={mockHandleNominatesClick}
      />
    );

    const image = screen.getByAltText('Test Movie');
    expect(image).toHaveAttribute('src', 'img/no-image-available.png');
  });

  it('should show award icon when movie is nominated', () => {
    const nominationList = [mockMovie];

    render(
      <Movie
        title={mockMovie.Title}
        poster={mockMovie.Poster}
        year={mockMovie.Year}
        movie={mockMovie}
        nominationList={nominationList}
        handleNominatesClick={mockHandleNominatesClick}
      />
    );

    const awardImage = screen.getByAltText('award');
    expect(awardImage).toBeInTheDocument();
    expect(awardImage).toHaveAttribute('src', 'img/award-svg.svg');
  });

  it('should not show award icon when movie is not nominated', () => {
    render(
      <Movie
        title={mockMovie.Title}
        poster={mockMovie.Poster}
        year={mockMovie.Year}
        movie={mockMovie}
        nominationList={[]}
        handleNominatesClick={mockHandleNominatesClick}
      />
    );

    expect(screen.queryByAltText('award')).not.toBeInTheDocument();
  });

  it('should correctly identify nominated movie in a list of multiple movies', () => {
    const otherMovie: MovieData = { imdbID: '456', Title: 'Other Movie', Year: '2021', Poster: 'N/A' };
    const nominationList = [otherMovie, mockMovie];

    render(
      <Movie
        title={mockMovie.Title}
        poster={mockMovie.Poster}
        year={mockMovie.Year}
        movie={mockMovie}
        nominationList={nominationList}
        handleNominatesClick={mockHandleNominatesClick}
      />
    );

    expect(screen.getByTestId('trash-icon')).toBeInTheDocument();
    expect(screen.getByAltText('award')).toBeInTheDocument();
  });
});