import { GET_REVIEWS, SEARCH_REVIEWS } from "../actions/reviews";

const initialState = {
  reviews: [],
  searchReviews: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_REVIEWS:
      return {
        reviews: action.reviews,
      };
    case SEARCH_REVIEWS:
      return {
        searchReviews: action.searchReviews,
      };
  }
  return state;
};
