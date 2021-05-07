export const saveToLocalStorage = (items) => {
  localStorage.setItem("nominationList", JSON.stringify(items));
};

export const addToList = (item, list) => {
  const newList = [...list, item];
  return newList;
};

export const removeFromList = (item, list) => {
  const newList = list.filter((listItem) => listItem.imdbID !== item.imdbID);
  return newList;
};
