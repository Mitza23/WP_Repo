import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import {Book} from "./book";
@Injectable({
  providedIn: 'root'
})
export class BookService {

  private backendUrl = 'http://localhost/WP_Lab_7/server';  // URL to web api

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private http: HttpClient) { }

  fetchBooks() : Observable<Book[]> {
    return this.http.get<Book[]>(this.backendUrl+)
  }
}
