import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders,HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { AuthService } from '../../../auth.service';
import { User } from '../../dataformat';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    'Authorization': 'my-auth-token'
  })
};

@Injectable({
  providedIn: 'root'
})
export class BuyerService {
  ApiUrl = 'api/sells';
  CurrentUserUrl = 'me';
  SearchUserUrl = 'user';
  constructor(private http: HttpClient, private auth: AuthService) { }

  /* GET: get current user data from DB */ 
  getCurrentUser(): Observable<any>  {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': `Bearer ${this.auth.getToken()}` }) };
    return this.http.get<any>(this.CurrentUserUrl,httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  /* GET: get all data from DB */ 
  getData(): Observable<any[]>  {
    return this.http.get<any[]>(this.ApiUrl)
      .pipe(
        retry(3),
        catchError(this.handleError)
      );
  }

  /* GET: get optional name data from DB*/
  searchUserById(id: string): Observable<any> {

    return this.http.get<any>(this.SearchUserUrl+'/'+id)
      .pipe(
        catchError(this.handleError)
      );
  }

  /* PUT: update current user information*/
  updateCUser(userinfo:User):Observable<User>{
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': `Bearer ${this.auth.getToken()}` }) };
    return this.http.put<User>(this.SearchUserUrl,userinfo,httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  /* PUT: update user info by id  */
  updateUserById(userinfo:User):Observable<User>{
    const url = `${this.SearchUserUrl}/${userinfo.id}`;
    return this.http.put<User>(url,userinfo,httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  /* POST: add new one to DB */
  addData(data: any): Observable<any> {
    return this.http.post<any>(this.ApiUrl, data, httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  /* DELETE: delete one from DB */
  deleteData (id: string): Observable<{}> {
    const url = `${this.ApiUrl}/${id}`;
    return this.http.delete(url, httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

   /* PUT: update one from DB */
  updateData (id:string,data: any): Observable<any> {
    const url = `${this.ApiUrl}/${id}`;
    return this.http.put<any>(url, data, httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  // handle error
  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    } else {
      if (error.status==500){
        if(confirm("Please login before operation, Thank you!")){  
          let log001 = document.getElementById("log001");
          log001.click();
        }else{  
          let log001 = document.getElementById("log001");
          log001.click();
        }  
        console.clear();
        return throwError('Please login!');
      }
      console.error(`Backend returned code ${error.status}, ` +`body was: ${error.error}`);
    }
    
    return throwError('Something bad happened; please try again later.');
  };
}
