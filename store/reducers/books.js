import {
  FETCH_GOOGLE_BOOKS,
  FETCH_READ_BOOKS,
  FETCH_BOOKS,
} from "../actions/books";

const initialState = {
  books: [],
  googleBooks: [],
  readBooks: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_BOOKS:
      return {
        books: action.books,
      };
    case FETCH_GOOGLE_BOOKS:
      return {
        googleBooks: action.googleBooks,
      };
    case FETCH_READ_BOOKS:
      return {
        readBooks: action.readBooks,
      };
    default:
      return state;
  }
};
