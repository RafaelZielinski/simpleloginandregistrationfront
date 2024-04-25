import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, tap, throwError } from 'rxjs';
import { CustomHttpResponse, Profile } from '../interface/appstates';
import { User } from '../interface/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private readonly server: string = 'localhost://8000';

  constructor(private http: HttpClient) { }

  save$ = (user: User) => <Observable<CustomHttpResponse<Profile>>>
  this.http.post<CustomHttpResponse<Profile>>
  (`${this.server}/user/register`, user)
    .pipe(
      tap(console.log),
      catchError(this.handleError)
    );


  login$ = (email:string, password: string) => <Observable<CustomHttpResponse<Profile>>>
  this.http.post<CustomHttpResponse<Profile>>
  (`${this.server}/user/login`, {email, password})
    .pipe(
      tap(console.log),
      catchError(this.handleError)
    );  


    private handleError(error: HttpErrorResponse): Observable<never> {
      console.log(error);
      let errorMessage: string;
      if (error.error instanceof ErrorEvent) {
        errorMessage  = `A client error occured - ${error.error.message}`;
        console.log(errorMessage);
      } else {
        if(error.error.reason) {
          errorMessage = error.error.reason;
          console.log(errorMessage);
        } else {
          errorMessage = `An error occured - Error codeStatus ${error.status}`;
          console.log(errorMessage)
        }
      }
      return throwError(() => errorMessage);
    }
}
