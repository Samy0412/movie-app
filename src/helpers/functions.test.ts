import { saveToLocalStorage, addToList, removeFromList } from './functions';
import { MovieData } from '../types';

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

describe('Helper Functions', () => {
  beforeEach(() => {
    // Clear all mocks before each test
    jest.clearAllMocks();
  });

  describe('saveToLocalStorage', () => {
    it('should save items to localStorage as JSON string', () => {
      const testItems: MovieData[] = [
        { imdbID: '1', Title: 'Test Movie 1', Year: '2021', Poster: 'N/A' },
        { imdbID: '2', Title: 'Test Movie 2', Year: '2022', Poster: 'N/A' }
      ];

      saveToLocalStorage(testItems);

      expect(window.localStorage.setItem).toHaveBeenCalledWith(
        'nominationList',
        JSON.stringify(testItems)
      );
      expect(window.localStorage.setItem).toHaveBeenCalledTimes(1);
    });

    it('should handle empty array', () => {
      const emptyArray: MovieData[] = [];

      saveToLocalStorage(emptyArray);

      expect(window.localStorage.setItem).toHaveBeenCalledWith(
        'nominationList',
        JSON.stringify(emptyArray)
      );
    });
  });

  describe('addToList', () => {
    it('should add a new item to an empty list', () => {
      const item: MovieData = { imdbID: '1', Title: 'Test Movie', Year: '2021', Poster: 'N/A' };
      const list: MovieData[] = [];

      const result = addToList(item, list);

      expect(result).toEqual([item]);
      expect(result).toHaveLength(1);
      // Ensure original list is not mutated
      expect(list).toEqual([]);
    });

    it('should add a new item to an existing list', () => {
      const existingItem: MovieData = { imdbID: '1', Title: 'Existing Movie', Year: '2020', Poster: 'N/A' };
      const newItem: MovieData = { imdbID: '2', Title: 'New Movie', Year: '2021', Poster: 'N/A' };
      const list: MovieData[] = [existingItem];

      const result = addToList(newItem, list);

      expect(result).toEqual([existingItem, newItem]);
      expect(result).toHaveLength(2);
      // Ensure original list is not mutated
      expect(list).toEqual([existingItem]);
    });

    it('should maintain order when adding items', () => {
      const item1: MovieData = { imdbID: '1', Title: 'Movie 1', Year: '2021', Poster: 'N/A' };
      const item2: MovieData = { imdbID: '2', Title: 'Movie 2', Year: '2022', Poster: 'N/A' };
      const item3: MovieData = { imdbID: '3', Title: 'Movie 3', Year: '2023', Poster: 'N/A' };
      
      let list: MovieData[] = [];
      list = addToList(item1, list);
      list = addToList(item2, list);
      list = addToList(item3, list);

      expect(list).toEqual([item1, item2, item3]);
    });
  });

  describe('removeFromList', () => {
    it('should remove an item from the list by imdbID', () => {
      const item1: MovieData = { imdbID: '1', Title: 'Movie 1', Year: '2021', Poster: 'N/A' };
      const item2: MovieData = { imdbID: '2', Title: 'Movie 2', Year: '2022', Poster: 'N/A' };
      const item3: MovieData = { imdbID: '3', Title: 'Movie 3', Year: '2023', Poster: 'N/A' };
      const list: MovieData[] = [item1, item2, item3];

      const result = removeFromList(item2, list);

      expect(result).toEqual([item1, item3]);
      expect(result).toHaveLength(2);
      // Ensure original list is not mutated
      expect(list).toEqual([item1, item2, item3]);
    });

    it('should return the same list if item is not found', () => {
      const item1: MovieData = { imdbID: '1', Title: 'Movie 1', Year: '2021', Poster: 'N/A' };
      const item2: MovieData = { imdbID: '2', Title: 'Movie 2', Year: '2022', Poster: 'N/A' };
      const itemNotInList: MovieData = { imdbID: '999', Title: 'Not Found', Year: '2023', Poster: 'N/A' };
      const list: MovieData[] = [item1, item2];

      const result = removeFromList(itemNotInList, list);

      expect(result).toEqual([item1, item2]);
      expect(result).toHaveLength(2);
    });

    it('should handle empty list', () => {
      const item: MovieData = { imdbID: '1', Title: 'Movie', Year: '2021', Poster: 'N/A' };
      const list: MovieData[] = [];

      const result = removeFromList(item, list);

      expect(result).toEqual([]);
      expect(result).toHaveLength(0);
    });

    it('should remove only the matching item when there are duplicates with same imdbID', () => {
      const item1: MovieData = { imdbID: '1', Title: 'Movie 1', Year: '2021', Poster: 'N/A' };
      const item2: MovieData = { imdbID: '2', Title: 'Movie 2', Year: '2022', Poster: 'N/A' };
      const item3: MovieData = { imdbID: '1', Title: 'Movie 1 Duplicate', Year: '2021', Poster: 'N/A' };
      const list: MovieData[] = [item1, item2, item3];

      const result = removeFromList(item1, list);

      // Should remove all items with the same imdbID
      expect(result).toEqual([item2]);
      expect(result).toHaveLength(1);
    });

    it('should handle removing the last item from a single-item list', () => {
      const item: MovieData = { imdbID: '1', Title: 'Only Movie', Year: '2021', Poster: 'N/A' };
      const list: MovieData[] = [item];

      const result = removeFromList(item, list);

      expect(result).toEqual([]);
      expect(result).toHaveLength(0);
    });
  });
});