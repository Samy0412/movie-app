import { MovieData } from "../types";

export const saveToLocalStorage = (items: MovieData[]): void => {
  localStorage.setItem("nominationList", JSON.stringify(items));
};

export const addToList = (item: MovieData, list: MovieData[]): MovieData[] => {
  const newList = [...list, item];
  return newList;
};

export const removeFromList = (item: MovieData, list: MovieData[]): MovieData[] => {
  const newList = list.filter((listItem) => listItem.imdbID !== item.imdbID);
  return newList;
};