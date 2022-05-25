import { Component, OnInit } from '@angular/core';
import {Book} from "../book";
import {BookService} from "../book.service";
import {compareNumbers} from "@angular/compiler-cli/src/version_helpers";


@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css']
})
export class BooksComponent implements OnInit {

  books : Book[] = []

  selected? : Book;

  errorMessage : string = "";

  filterQuery : string = ""

  constructor(private bookService : BookService) { }

  ngOnInit(): void {
    this.getBooks();
  }

  getBooks(): void {
    this.bookService.getBooks()
      .subscribe(books => this.books = books);
    console.log(this.books)
  }

  onSelect(book : Book): void {
    this.selected = book;
    console.log(book.title);
  }

  addBook(title: any, author: any, genre: any, pages: any): void {
    console.log(title.value);
    let newBook : Book = {id : 0, title : title.value, author : author.value, genre : genre.value,
      pages : pages.value, lent : false};
    this.bookService.addBook(newBook)
      .subscribe(response => {
        let r: any = response;
        this.errorMessage = r.result;
      })
  }

  deleteBook(book : Book): void {
    this.bookService.deleteBook(book)
      .subscribe(response => {
        let r: any = response;
        this.errorMessage = r.result;
      })
  }

  updateBook(book : Book): void {
    this.bookService.updateBook(book)
      .subscribe(response => {
        let r: any = response;
        this.errorMessage = r.result;
      })
  }

  lendBook(book : Book): void {
    this.bookService.lendBook(book)
      .subscribe(response => {
        let r: any = response;
        this.errorMessage = r.result;
      })
  }

  returnBook(book : Book): void {
    this.bookService.returnBook(book)
      .subscribe(response => {
        let r: any = response;
        this.errorMessage = r.result;
      })
  }

  filter(attribute : any, value : any): void {

    attribute = String(attribute.value).trim();
    value = String(value.value).trim();

    console.log(attribute)
    const attributes = ["id", "title", "author", "genre", "pages"]
    if(attributes.includes(attribute)) {
      if(attribute === 'id') {
        this.filterQuery += " AND " + attribute + "=" + value;
      }
      else if (attribute === 'pages') {
        this.filterQuery += " AND " + attribute + "<" + value;
      }
      else {
        this.filterQuery += " AND " + attribute + " LIKE \'%" + value + "%\'";
      }
      this.bookService.filterBooks(this.filterQuery)
        .subscribe(books => this.books = books);
    }
    else {
      alert("Invalid attribute");
    }

  }

  resetFilter(): void {
    this.filterQuery = "";
    this.bookService.resetFilter();
    this.getBooks();
  }

}
