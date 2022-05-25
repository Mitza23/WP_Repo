import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import {Observable, of, Subscription} from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import {Profile} from "./profile";
import {query} from "@angular/animations";
import {ProfilesComponent} from "./profiles/profiles.component";
import {ProfileDTO} from "./model/ProfileDTO";


@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  private backendUrl = 'http://localhost:8080/profile'

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private http: HttpClient) { }

  getProfiles(): Observable<Profile[]> {
    return this.http.get<Profile[]>(this.backendUrl+'/all')
      .pipe(
        catchError(this.handleError<Profile[]>('getBooks', []))
      );
  }

  addProfile(name : string, email : string, address : string, picture : string, age : number, town : string): Observable<Profile> {
    // @ts-ignore
    // return this.http.post<Profile>(this.backendUrl+'/add',
    //   {
    //     "name": name,
    //     "email": email,
    //     "address": address,
    //     "picture": picture,
    //     "age": age,
    //     "town": town
    //   })
    //   .pipe(
    //     catchError(this.handleError('addProfile', name))
    //   )
    return this.http.post<Profile>(this.backendUrl+'/add',
      new ProfileDTO(name, email, address, picture, age, town))
      .pipe(
        catchError(this.handleError('addProfile', name))
      )
  }

  updateProfile(profile : Profile): Observable<Profile> {
    return this.http.put<Profile>(this.backendUrl + '/update', profile)
      .pipe(
        catchError(this.handleError('updateProfile', profile))
      );
  }

  deleteProfile(id : number): Observable<unknown> {
    const url = `${this.backendUrl}/delete/${id}`;
    return this.http.delete(url)
      .pipe(
        catchError(this.handleError('deleteProfile'))
      );
  }

  filterProfiles(attribute: string, value: string) : Observable<Profile[]>{
    // @ts-ignore
    return this.http.get<Profile[]>(this.backendUrl + `/filter?attribute=${attribute}&value=${value}`)
      .pipe(
        catchError(this.handleError('filterProfiles'))
      );
  }

  resetFilter() : Observable<String> {
    return this.http.put<String>(this.backendUrl+'/resetFilter', {})
      .pipe(
        catchError(this.handleError<String>('resetFilter'))
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
