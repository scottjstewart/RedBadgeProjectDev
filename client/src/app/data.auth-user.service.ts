import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt'
import { User } from './user.model';

const url: string = 'http://localhost:3000'
const httpAuthOptions = {
  headers: new HttpHeaders({

  })
}

@Injectable({
  providedIn: 'root'
})
export class AuthUserService {

  constructor(
    private http: HttpClient,
    private jwt: JwtHelperService
  ) { }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error)
      return of(result as T)
    }
  }
  getUser(): Observable<User> {
    console.log('get user start')
    return this.http.get<User>('/user/get')
    .pipe(tap(auth => console.log(auth)))
  }

  updateUser(fn: string, ln: string, username: string, email: string, password: string): Observable<any> {
    let token = localStorage.getItem('sessionToken')
    let user: User = {
      firstName: fn,
      lastName: ln,
      email: email,
      userName: username,
      password: password
    }
    return this.http.put(url, user).pipe(
      tap(),
      catchError(this.handleError('updateUser', []))
    )
  }

  deleteUser(username: string, password: string): Observable<any> {
    return this.http.delete<any>(`${url}/user/delete`)
      .pipe(
        tap(),
        catchError(this.handleError('deletUser', []))
      )
  }

  loggedIn(): boolean {
    let token = localStorage.getItem('sessionToken')
    if (token && token !== null && token !== '') {
      return !this.jwt.isTokenExpired()
    } else {
      return false
    }
  }

}
