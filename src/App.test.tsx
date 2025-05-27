import React from 'react';
import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import '@testing-library/jest-dom';
import App from './App';
import * as api from './helpers/api';
import { MovieData } from './types';

// Mock the API module
jest.mock('./helpers/api');
const mockedApi = api as jest.Mocked<typeof api>;

// Mock the components to avoid complex rendering issues
jest.mock('./components/MovieList', () => {
  return function MockMovieList({ movies, handleNominatesClick, nominationList }: {
    movies: MovieData[];
    handleNominatesClick: (action: "add" | "remove", movie: MovieData) => void;
    nominationList: MovieData[];
  }) {
    return (
      <div data-testid="movie-list">
        <div data-testid="movies-count">{movies.length}</div>
        <div data-testid="nominations-count">{nominationList.length}</div>
        <button 
          data-testid="mock-nominate-btn"
          onClick={() => handleNominatesClick('add', { imdbID: 'test123', Title: 'Test Movie', Year: '2021', Poster: 'N/A' })}
        >
          Mock Nominate
        </button>
      </div>
    );
  };
});

jest.mock('./components/Nav', () => {
  return function MockNav({ searchValue, setSearchValue, nominationList }: {
    searchValue: string;
    setSearchValue: (value: string) => void;
    nominationList: MovieData[];
  }) {
    return (
      <div data-testid="nav">
        <input
          data-testid="search-input"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          placeholder="Search movies"
        />
        <div data-testid="nav-nominations-count">{nominationList.length}</div>
      </div>
    );
  };
});

jest.mock('./components/Banner', () => {
  return function MockBanner({ nominationList }: { nominationList: MovieData[] }) {
    return (
      <div data-testid="banner">
        <div data-testid="banner-nominations-count">{nominationList.length}</div>
      </div>
    );
  };
});

// Mock localStorage
const localStorageMock = (() => {
  let store: Record<string, string> = {};
  return {
    getItem: jest.fn((key: string) => store[key] || null),
    setItem: jest.fn((key: string, value: string) => {
      store[key] = value.toString();
    }),
    removeItem: jest.fn((key: string) => {
      delete store[key];
    }),
    clear: jest.fn(() => {
      store = {};
    }),
  };
})();

Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
});

const renderApp = () => {
  return render(
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
};

describe('App Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    localStorageMock.clear();
    mockedApi.getMovieSearch.mockResolvedValue({
      data: { Search: [], Response: 'True' }
    } as any);
  });

  it('should render main components', async () => {
    await act(async () => {
      renderApp();
    });

    expect(screen.getByTestId('nav')).toBeInTheDocument();
    expect(screen.getByTestId('movie-list')).toBeInTheDocument();
    expect(screen.getByTestId('banner')).toBeInTheDocument();
  });

  it('should initialize with empty search value and movies', async () => {
    await act(async () => {
      renderApp();
    });

    const searchInput = screen.getByTestId('search-input');
    expect(searchInput).toHaveValue('');
    expect(screen.getByTestId('movies-count')).toHaveTextContent('0');
  });

  it('should load saved nominations from localStorage on mount', async () => {
    const savedNominations: MovieData[] = [
      { imdbID: '1', Title: 'Saved Movie 1', Year: '2021', Poster: 'N/A' },
      { imdbID: '2', Title: 'Saved Movie 2', Year: '2022', Poster: 'N/A' }
    ];
    
    localStorageMock.getItem.mockReturnValue(JSON.stringify(savedNominations));

    await act(async () => {
      renderApp();
    });

    expect(localStorageMock.getItem).toHaveBeenCalledWith('nominationList');
    expect(screen.getByTestId('nominations-count')).toHaveTextContent('2');
    expect(screen.getByTestId('nav-nominations-count')).toHaveTextContent('2');
    expect(screen.getByTestId('banner-nominations-count')).toHaveTextContent('2');
  });

  it('should handle search input changes and call API', async () => {
    const mockMovies: MovieData[] = [
      { imdbID: '1', Title: 'Test Movie 1', Year: '2021', Poster: 'N/A' },
      { imdbID: '2', Title: 'Test Movie 2', Year: '2022', Poster: 'N/A' }
    ];

    mockedApi.getMovieSearch.mockResolvedValue({
      data: { Search: mockMovies, Response: 'True' }
    } as any);

    await act(async () => {
      renderApp();
    });

    const searchInput = screen.getByTestId('search-input');
    
    await act(async () => {
      fireEvent.change(searchInput, { target: { value: 'test' } });
    });

    expect(searchInput).toHaveValue('test');

    await waitFor(() => {
      expect(mockedApi.getMovieSearch).toHaveBeenCalledWith('test');
    });

    await waitFor(() => {
      expect(screen.getByTestId('movies-count')).toHaveTextContent('2');
    });
  });

  it('should handle adding movies to nomination list', async () => {
    await act(async () => {
      renderApp();
    });

    const nominateButton = screen.getByTestId('mock-nominate-btn');
    
    await act(async () => {
      fireEvent.click(nominateButton);
    });

    await waitFor(() => {
      expect(screen.getByTestId('nominations-count')).toHaveTextContent('1');
    });

    expect(localStorageMock.setItem).toHaveBeenCalledWith(
      'nominationList',
      JSON.stringify([{ imdbID: 'test123', Title: 'Test Movie', Year: '2021', Poster: 'N/A' }])
    );
  });

  it('should render footer with correct content', async () => {
    await act(async () => {
      renderApp();
    });

    expect(screen.getByText(/2021 - Build by/)).toBeInTheDocument();
    expect(screen.getByText('Samantha Gadet')).toBeInTheDocument();
    
    const link = screen.getByRole('link', { name: 'Samantha Gadet' });
    expect(link).toHaveAttribute('href', 'https://github.com/Samy0412');
    expect(link).toHaveAttribute('target', '__blank');
  });

  it('should handle empty localStorage gracefully', async () => {
    localStorageMock.getItem.mockReturnValue(null);

    await act(async () => {
      renderApp();
    });

    expect(screen.getByTestId('nominations-count')).toHaveTextContent('0');
    expect(localStorageMock.getItem).toHaveBeenCalledWith('nominationList');
  });

  it('should handle malformed localStorage data gracefully', async () => {
    localStorageMock.getItem.mockReturnValue('invalid json');

    // This should not crash the app
    await act(async () => {
      expect(() => renderApp()).not.toThrow();
    });
  });
});