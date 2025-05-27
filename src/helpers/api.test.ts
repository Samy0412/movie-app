import axios from 'axios';
import { getMovieSearch } from './api';

// Mock axios
jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('API Helper Functions', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('getMovieSearch', () => {
    it('should make a GET request to OMDB API with correct parameters', async () => {
      const mockResponse = {
        data: {
          Search: [
            {
              Title: 'Test Movie',
              Year: '2021',
              imdbID: 'tt123456',
              Type: 'movie',
              Poster: 'https://example.com/poster.jpg'
            }
          ],
          totalResults: '1',
          Response: 'True'
        }
      };

      mockedAxios.get.mockResolvedValue(mockResponse);

      const searchValue = 'test movie';
      const result = await getMovieSearch(searchValue);

      expect(mockedAxios.get).toHaveBeenCalledWith(
        'https://www.omdbapi.com/',
        {
          params: {
            s: 'test movie',
            type: 'movie',
            apikey: process.env.REACT_APP_OMDB_API,
          },
        }
      );

      expect(result).toEqual(mockResponse);
    });

    it('should handle empty search value', async () => {
      const mockResponse = {
        data: {
          Response: 'False',
          Error: 'Incorrect IMDb ID.'
        }
      };

      mockedAxios.get.mockResolvedValue(mockResponse);

      const result = await getMovieSearch('');

      expect(mockedAxios.get).toHaveBeenCalledWith(
        'https://www.omdbapi.com/',
        {
          params: {
            s: '',
            type: 'movie',
            apikey: process.env.REACT_APP_OMDB_API,
          },
        }
      );

      expect(result).toEqual(mockResponse);
    });

    it('should handle API errors', async () => {
      const errorMessage = 'Network Error';
      mockedAxios.get.mockRejectedValue(new Error(errorMessage));

      await expect(getMovieSearch('test')).rejects.toThrow(errorMessage);

      expect(mockedAxios.get).toHaveBeenCalledWith(
        'https://www.omdbapi.com/',
        {
          params: {
            s: 'test',
            type: 'movie',
            apikey: process.env.REACT_APP_OMDB_API,
          },
        }
      );
    });

    it('should handle special characters in search value', async () => {
      const mockResponse = {
        data: {
          Search: [],
          totalResults: '0',
          Response: 'False',
          Error: 'Movie not found!'
        }
      };

      mockedAxios.get.mockResolvedValue(mockResponse);

      const searchValue = 'test & movie "special" chars';
      const result = await getMovieSearch(searchValue);

      expect(mockedAxios.get).toHaveBeenCalledWith(
        'https://www.omdbapi.com/',
        {
          params: {
            s: 'test & movie "special" chars',
            type: 'movie',
            apikey: process.env.REACT_APP_OMDB_API,
          },
        }
      );

      expect(result).toEqual(mockResponse);
    });

    it('should always request movie type', async () => {
      const mockResponse = { data: { Response: 'True', Search: [] } };
      mockedAxios.get.mockResolvedValue(mockResponse);

      await getMovieSearch('any search');

      const callArgs = mockedAxios.get.mock.calls[0][1];
      expect(callArgs?.params.type).toBe('movie');
    });

    it('should use environment variable for API key', async () => {
      const mockResponse = { data: { Response: 'True', Search: [] } };
      mockedAxios.get.mockResolvedValue(mockResponse);

      await getMovieSearch('test');

      const callArgs = mockedAxios.get.mock.calls[0][1];
      expect(callArgs?.params.apikey).toBe(process.env.REACT_APP_OMDB_API);
    });
  });
});