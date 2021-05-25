export class Book {
  constructor(
    id,
    title,
    isbn,
    pageCount,
    authors,
    userId,
    readStatus,
    imagePath,
    description,
    publisher,
    insertDate,
    updateDate,
    user
  ) {
    this.id = id;
    this.title = title;
    this.isbn = isbn;
    this.pageCount = pageCount;
    this.authors = authors;
    this.userId = userId;
    this.readStatus = readStatus;
    this.imagePath = imagePath;
    this.description = description;
    this.publisher = publisher;
    this.insertDate = insertDate;
    this.updateDate = updateDate;
    this.user = user;
  }
}
