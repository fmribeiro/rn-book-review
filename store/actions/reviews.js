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
      dispatch({
        type: GET_REVIEWS,
        reviews: reviews,
      });
    } catch (error) {
      throw error;
    }
  };
};

export const fetchUserReviews = (id, idToken) => {
  return async (dispatch, getState) => {
    console.log("fetchUserReviews");
    try {
      const response = await fetch(
        `https://whispering-springs-63743.herokuapp.com/book-review/reviews/user/${id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${idToken}`,
          },
        }
      );

      if (!response.ok) {
        // console.log(`response: ${JSON.stringify(response)}`);
        dispatch({
          type: GET_REVIEWS,
          reviews: [],
        });
        throw new Error("something went wrong");
      } else {
        // console.log(`response: ${JSON.stringify(response)}`);
        let resData = await response.json();
        // resData = resData.reviews;
        const reviews = [];

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
        dispatch({
          type: GET_REVIEWS,
          reviews: reviews,
        });
      }
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
      dispatch({
        type: SEARCH_REVIEWS,
        searchReviews: reviews,
      });
    } catch (error) {
      throw error;
    }
  };
};

export const saveReview = (review, token) => {
  console.log(`saveReview: ${JSON.stringify(review)}`);
  console.log(`token: ${JSON.stringify(token)}`);

  return async (dispatch) => {
    let resData;
    const response = await fetch(
      "https://whispering-springs-63743.herokuapp.com/book-review/reviews",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(review),
      }
    );

    if (!response.ok) {
      const errorResData = await response.json();
      console.log(`errorMessage: ${JSON.stringify(errorResData)}`);
      let message = "Something went wrong";
      throw new Error(message);
    } else {
      resData = await response.json();
      console.log(`resData: ${JSON.stringify(resData)}`);
    }
  };
};
