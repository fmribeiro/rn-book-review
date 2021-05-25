import { GET_BOOKS } from "../actions/books";

const initialState = {
  books: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_BOOKS:
      return {
        books: action.books,
      };
  }
  return state;
};
