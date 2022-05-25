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
      .pipe(
        catchError(this.handleError<Book[]>('getBooks', []))
      );
  }

  filterBooks(query : string) : Observable<Book[]> {
    return this.http.get<Book[]>(this.backendUrl+'?action=filterBooks'
      + '&query=' + query)
      .pipe(
        catchError(this.handleError<Book[]>('filterBooks', []))
      );
  }

  resetFilter() : Observable<Book[]> {
    return this.http.get<Book[]>(this.backendUrl+'?action=resetFilter')
      .pipe(
        catchError(this.handleError<Book[]>('resetFilter', []))
      );
  }

  addBook(book : Book): Observable<string> {
    return this.http.get<string>(this.backendUrl+'?action=addBook'
      + '&title=' + book.title
      + '&author=' + book.author
      + '&genre=' + book.genre
      + '&pages=' + book.pages)
      .pipe(
        catchError(this.handleError<string>('addBook', ""))
      );
  }

  updateBook(book : Book): Observable<string> {
    return this.http.get<string>(this.backendUrl+'?action=updateBook'
      + '&id=' + book.id
      + '&title=' + book.title
      + '&author=' + book.author
      + '&genre=' + book.genre
      + '&pages=' + book.pages)
      .pipe(
        catchError(this.handleError<string>('updateBook', ""))
      );
  }

  deleteBook(book : Book): Observable<string> {
    return this.http.get<string>(this.backendUrl+'?action=deleteBook'
      + '&id=' + book.id)
      .pipe(
        catchError(this.handleError<string>('deleteBook', ""))
      );
  }

  lendBook(book : Book): Observable<string> {
    return this.http.get<string>(this.backendUrl+'?action=lendBook'
      + '&id=' + book.id)
      .pipe(
        catchError(this.handleError<string>('lendBook', ""))
      );
  }

  returnBook(book : Book): Observable<string> {
    return this.http.get<string>(this.backendUrl+'?action=returnBook'
      + '&id=' + book.id)
      .pipe(
      catchError(this.handleError<string>('returnBook', ""))
      );
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
