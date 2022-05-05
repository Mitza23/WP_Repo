import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import {Book} from "./book";
@Injectable({
  providedIn: 'root'
})
export class BookService {

  private backendUrl = 'http://localhost/WP_Lab_6/server/Controller.php';  // URL to web api

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private http: HttpClient) { }

  getBooks() : Observable<Book[]> {
    return this.http.get<Book[]>(this.backendUrl+'?action=getAll')
  }

  filterBooks(query : string) : Observable<Book[]> {
    return this.http.get<Book[]>(this.backendUrl+'?action=filterBooks'
      + '&query=' + query)
  }

  addBook(book : Book): Observable<string> {
    return this.http.post(this.backendUrl+'?action=addBook'
      + '&title=' + book.title
      + '&author=' + book.author
      + '&genre=' + book.genre
      + '&pages=' + book.pages)
  }

  updateBook(book : Book): Observable<String> {
    return this.http.post(this.backendUrl+'?action=updateBook'
      + '&id=' + book.book_id
      + '&title=' + book.title
      + '&author=' + book.author
      + '&genre=' + book.genre
      + '&pages=' + book.pages)
  }

  deleteBook(book : Book): Observable<string> {
    return this.http.post(this.backendUrl+'?action=deleteBook'
      + '&id=' + book.book_id)
  }

  lendBook(book : Book): Observable<string> {
    return this.http.post(this.backendUrl+'?action=lendBook'
      + '&id=' + book.book_id)
  }

  returnBook(book : Book): Observable<string> {
    return this.http.post(this.backendUrl+'?action=returnBook'
      + '&id=' + book.book_id)
  }
}
