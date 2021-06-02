import { Book } from "../../models/Book";
import { User } from "../../models/User";
import { convertObjetIdToDate } from "../../utils/Utils";

export const FETCH_BOOKS = "FETCH_BOOKS";
export const FETCH_GOOGLE_BOOKS = "FETCH_GOOGLE_BOOKS";
export const FETCH_READ_BOOKS = "FETCH_READ_BOOKS";

export const fetchBooks = () => {
  return async (dispatch, getState) => {
    console.log("fetchBooks");
    try {
      const response = await fetch(
        "https://whispering-springs-63743.herokuapp.com/book-review/books/page/0/size/10"
      );

      if (!response.ok) {
        dispatch({
          type: FETCH_BOOKS,
          books: [],
        });
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
      dispatch({
        type: FETCH_BOOKS,
        books: books,
      });
    } catch (error) {
      throw error;
    }
  };
};

export const fetchUserBooks = (id, idToken) => {
  return async (dispatch, getState) => {
    console.log("fetchUserBooks");
    try {
      const response = await fetch(
        `https://whispering-springs-63743.herokuapp.com/book-review/books/user/${id}/readStatus/lido`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${idToken}`,
          },
        }
      );

      if (!response.ok) {
        console.log(JSON.stringify(response));
        dispatch({
          type: FETCH_BOOKS,
          books: books,
        });
        throw new Error("something went wrong");
      }
      let resData = await response.json();
      // resData = resData.books;
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
            null
          )
        );
      }
      dispatch({
        type: FETCH_BOOKS,
        books: books,
      });
    } catch (error) {
      throw error;
    }
  };
};

export const fetchGoogleBooks = (bookTitle) => {
  return async (dispatch, getState) => {
    console.log(`fetchGoogleBooks: ${bookTitle}`);

    try {
      const response = await fetch(
        `https://www.googleapis.com/books/v1/volumes?q=${bookTitle}&maxResults=20&filter=ebooks`
      );
      if (!response.ok) {
        throw new Error("something went wrong");
      }
      let resData = await response.json();
      resData = resData.items;
      const books = [];
      // console.log(`resdata: ${JSON.stringify(resData)}`);

      for (const key in resData) {
        // console.log(`id: ${resData[key].id}`);
        const bookTitle = resData[key].volumeInfo.title;
        const bookSubTitle = resData[key].volumeInfo.subtitle
          ? resData[key].volumeInfo.subtitle
          : "";
        if (
          resData[key].volumeInfo.authors &&
          resData[key].volumeInfo.imageLinks
        ) {
          books.push(
            new Book(
              resData[key].id,
              `${bookTitle} ${bookSubTitle}`,
              null,
              resData[key].volumeInfo.pageCount,
              resData[key].volumeInfo.authors.map((author) => author + " "),
              null,
              null,
              resData[key].volumeInfo.imageLinks
                ? resData[key].volumeInfo.imageLinks.smallThumbnail
                : null,
              resData[key].volumeInfo.description,
              resData[key].volumeInfo.publisher,
              null,
              null,
              null
            )
          );
        }
      }
      dispatch({
        type: FETCH_GOOGLE_BOOKS,
        googleBooks: books,
      });
    } catch (error) {
      throw error;
    }
  };
};

// `/books/user/${this.utilsService.getLoggedUserId()}/readStatus/lido`;
export const fetchReadBooks = (userId, token) => {
  return async (dispatch, getState) => {
    // console.log(`fetchReadBooks: ${userId}`);
    try {
      const response = await fetch(
        `https://whispering-springs-63743.herokuapp.com/book-review/books/user/${userId}/readStatus/lido`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("something went wrong");
      }

      let resData = await response.json();
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
            null
          )
        );
      }

      // console.log(`books: ${JSON.stringify(books)}`);
      dispatch({
        type: FETCH_READ_BOOKS,
        readBooks: books.sort((a, b) => a.title > b.title),
      });
    } catch (error) {
      throw error;
    }
  };
};

export const saveBook = (book, token) => {
  console.log(`saveBook: ${JSON.stringify(book)}`);
  console.log(`token: ${JSON.stringify(token)}`);

  return async (dispatch) => {
    let resData;
    const response = await fetch(
      "https://whispering-springs-63743.herokuapp.com/book-review/books",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(book),
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
