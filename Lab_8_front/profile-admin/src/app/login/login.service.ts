import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable, of} from "rxjs";
import {Profile} from "../profile";
import {ProfileDTO} from "../model/ProfileDTO";
import {catchError} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private backendUrl = 'http://localhost:8080/profile'

  constructor(private http: HttpClient) { }

  addProfile(username : string, password : string, name : string, email : string, address : string, picture : string,
             age : number, town : string): Observable<number> {
    // @ts-ignore
    return this.http.post<number>(this.backendUrl+'/add',
      new ProfileDTO(username, password, name, email, address, picture, age, town))
      .pipe(
        catchError(this.handleError('addProfile', name))
      )
  }

  checkProfile(username : string, password : string) : Observable<number> {
    // @ts-ignore
    return this.http.get<number>(this.backendUrl+`/check?username=${username}&password=${password}`)
      .pipe(
        catchError(this.handleError('filterProfiles'))
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
