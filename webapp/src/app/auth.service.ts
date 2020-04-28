import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  token: string
  isLoginSubject = new BehaviorSubject<boolean>(this.hasToken());
  constructor(private http: HttpClient) {
    if (!localStorage.getItem('access_token'))
      return;

    // console.log()
    //const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', "Authorization": `Bearer ${this.token}` }) };
    this.token = localStorage.getItem('access_token');
  }

  isLoggedIn() : Observable<boolean> {
    return this.isLoginSubject.asObservable();
  }

  getToken () {
    return this.token;
  }

  setToken (token: any) {
    if (token === null) {
      delete localStorage.access_token;
      this.token = null;
      this.isLoginSubject.next(false);
      return;
    }

    this.token = token;
    this.isLoginSubject.next(true);
    localStorage.setItem('access_token', token);

  }

  private hasToken (): boolean {
    return !!localStorage.getItem('access_token');
  }


}
