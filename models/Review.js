export class Review {
  constructor(
    id,
    review,
    insertDate,
    updateDate,
    userId,
    bookTitle,
    likes,
    user
  ) {
    this.id = id;
    this.review = review;
    this.insertDate = insertDate;
    this.updateDate = updateDate;
    this.userId = userId;
    this.bookTitle = bookTitle;
    this.likes = likes;
    this.user = user;
  }
}
