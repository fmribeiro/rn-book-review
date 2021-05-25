import { Book } from "../../models/Book";
import { User } from "../../models/User";
import { convertObjetIdToDate } from "../../utils/Utils";

export const GET_BOOKS = "GET_BOOKS";

export const fetchBooks = () => {
  return async (dispatch, getState) => {
    console.log("fetchBooks");
    try {
      const response = await fetch(
        "https://whispering-springs-63743.herokuapp.com/book-review/books/page/0/size/10"
      );
      if (!response.ok) {
        throw new Error("something went wrong");
      }
      let resData = await response.json();
      resData = resData.books;
      const books = [];

      for (const key in resData) {
        books.push(
          new Book(
            resData[key].id,
            resData[key].title,
            resData[key].isbn,
            resData[key].pageCount,
            resData[key].authors,
            resData[key].userId,
            resData[key].readStatus,
            resData[key].imagePath,
            resData[key].description,
            resData[key].publisher,
            convertObjetIdToDate(resData[key].id),
            resData[key].updateDate,
            new User(
              resData[key].user.id,
              resData[key].user.name,
              resData[key].user.nickname,
              null,
              convertObjetIdToDate(resData[key].id),
              null
            )
          )
        );
      }

      // console.log(`fetch books ${JSON.stringify(books)}`);
      dispatch({
        type: GET_BOOKS,
        books: books,
      });
    } catch (error) {
      throw error;
    }
  };
};
