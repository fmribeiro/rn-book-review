import { Review } from "../../models/Review";
import { User } from "../../models/User";
import { convertObjetIdToDate } from "../../utils/Utils";

export const GET_REVIEWS = "GET_REVIEWS";
export const SEARCH_REVIEWS = "SEARCH_REVIEWS";

export const fetchReviews = () => {
  return async (dispatch, getState) => {
    console.log("fetchReviews");
    try {
      const response = await fetch(
        "https://whispering-springs-63743.herokuapp.com/book-review/reviews/page/0/size/10"
      );
      if (!response.ok) {
        throw new Error("something went wrong");
      }
      let resData = await response.json();
      resData = resData.reviews;
      const reviews = [];
      // console.log(resData);

      for (const key in resData) {
        reviews.push(
          new Review(
            resData[key].id,
            resData[key].review,
            convertObjetIdToDate(resData[key].id),
            null,
            null,
            resData[key].bookTitle,
            resData[key].likes,
            new User(
              resData[key].user.id,
              resData[key].user.name,
              resData[key].user.nickname,
              resData[key].user.idToken,
              resData[key].user.insertDate
            )
          )
        );
      }
      // console.log(`fetch reviews${JSON.stringify(reviews)}`);
      dispatch({
        type: GET_REVIEWS,
        reviews: reviews,
      });
    } catch (error) {
      throw error;
    }
  };
};

export const searchReviews = (bookTitle) => {
  return async (dispatch, getState) => {
    console.log(`searchReviews: ${bookTitle}`);
    try {
      const reviews = [];
      const response = await fetch(
        `https://whispering-springs-63743.herokuapp.com/book-review/reviews/book/${bookTitle}`
      );

      if (!response.ok) {
        // throw new Error("something went wrong");
        console.log("something went wrong");
      } else {
        let resData = await response.json();
        // console.log(resData);

        for (const key in resData) {
          reviews.push(
            new Review(
              resData[key].id,
              resData[key].review,
              convertObjetIdToDate(resData[key].id),
              null,
              null,
              resData[key].bookTitle,
              resData[key].likes,
              null
            )
          );
        }
      }
      // console.log(`fetch reviews${JSON.stringify(reviews)}`);
      dispatch({
        type: SEARCH_REVIEWS,
        searchReviews: reviews,
      });
    } catch (error) {
      throw error;
    }
  };
};
