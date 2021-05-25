export class User {
  constructor(
    id,
    name,
    nickname,
    idToken,
    insertDate,
    following,
    books,
    reviews
  ) {
    this.id = id;
    this.name = name;
    this.nickname = nickname;
    this.idToken = idToken;
    this.insertDate = insertDate;
    this.following = following;
    this.books = books;
    this.reviews = reviews;
  }
}
