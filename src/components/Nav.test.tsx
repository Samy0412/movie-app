import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { ChakraProvider } from '@chakra-ui/react';
import Nav from './Nav';
import { MovieData } from '../types';

// Mock the NominationList component to avoid complex dependencies
jest.mock('./NominationList', () => {
  return function MockNominationList({ nominationList }: any) {
    return <div data-testid="nomination-list">Nominations: {nominationList.length}</div>;
  };
});

// Mock react-icons to avoid import issues
jest.mock('react-icons/io5', () => ({
  IoSearchOutline: () => <div data-testid="search-icon">Search Icon</div>,
}));

// Wrapper component to provide Chakra UI context
const ChakraWrapper = ({ children }: { children: React.ReactNode }) => (
  <ChakraProvider>{children}</ChakraProvider>
);

describe('Nav Component', () => {
  const mockNominationList: MovieData[] = [
    { imdbID: '1', Title: 'The Matrix', Year: '1999', Poster: 'matrix.jpg' },
    { imdbID: '2', Title: 'Inception', Year: '2010', Poster: 'inception.jpg' },
  ];

  const defaultProps = {
    searchValue: '',
    setSearchValue: jest.fn(),
    nominationList: mockNominationList,
    handleNominatesClick: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders without crashing', () => {
    render(
      <ChakraWrapper>
        <Nav {...defaultProps} />
      </ChakraWrapper>
    );
    
    // Component should render without throwing errors
    expect(document.body).toBeInTheDocument();
  });

  it('displays the Shopify logo and title', () => {
    render(
      <ChakraWrapper>
        <Nav {...defaultProps} />
      </ChakraWrapper>
    );

    expect(screen.getByAltText('logo')).toBeInTheDocument();
    expect(screen.getByText('The shoppies')).toBeInTheDocument();
  });

  it('displays the info text', () => {
    render(
      <ChakraWrapper>
        <Nav {...defaultProps} />
      </ChakraWrapper>
    );

    expect(screen.getByText(/Search for movies and select your 5 favorites!/)).toBeInTheDocument();
  });

  it('renders search input with correct placeholder', () => {
    render(
      <ChakraWrapper>
        <Nav {...defaultProps} />
      </ChakraWrapper>
    );

    const searchInput = screen.getByPlaceholderText('Search a movie title');
    expect(searchInput).toBeInTheDocument();
    expect(searchInput).toHaveAttribute('type', 'text');
  });

  it('displays search icon', () => {
    render(
      <ChakraWrapper>
        <Nav {...defaultProps} />
      </ChakraWrapper>
    );

    expect(screen.getByTestId('search-icon')).toBeInTheDocument();
  });

  it('calls setSearchValue when input changes', () => {
    const mockSetSearchValue = jest.fn();
    render(
      <ChakraWrapper>
        <Nav {...defaultProps} setSearchValue={mockSetSearchValue} />
      </ChakraWrapper>
    );

    const searchInput = screen.getByPlaceholderText('Search a movie title');
    fireEvent.change(searchInput, { target: { value: 'batman' } });

    expect(mockSetSearchValue).toHaveBeenCalledWith('batman');
  });

  it('displays current search value in input', () => {
    render(
      <ChakraWrapper>
        <Nav {...defaultProps} searchValue="batman" />
      </ChakraWrapper>
    );

    const searchInput = screen.getByPlaceholderText('Search a movie title') as HTMLInputElement;
    expect(searchInput.value).toBe('batman');
  });

  it('renders NominationList component', () => {
    render(
      <ChakraWrapper>
        <Nav {...defaultProps} />
      </ChakraWrapper>
    );

    expect(screen.getByTestId('nomination-list')).toBeInTheDocument();
    expect(screen.getByText('Nominations: 2')).toBeInTheDocument();
  });

  it('handles empty nomination list', () => {
    render(
      <ChakraWrapper>
        <Nav {...defaultProps} nominationList={[]} />
      </ChakraWrapper>
    );

    expect(screen.getByText('Nominations: 0')).toBeInTheDocument();
  });

  it('accepts the correct props interface', () => {
    const props = {
      searchValue: 'test',
      setSearchValue: jest.fn(),
      nominationList: mockNominationList,
      handleNominatesClick: jest.fn(),
    };
    
    expect(() => {
      render(
        <ChakraWrapper>
          <Nav {...props} />
        </ChakraWrapper>
      );
    }).not.toThrow();
  });
});