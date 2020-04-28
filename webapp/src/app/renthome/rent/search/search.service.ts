import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders,HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { AuthService } from '../../../auth.service';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    'Authorization': 'my-auth-token'
  })
};

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  ApiUrl = 'api/rents';
  CurrentUserUrl = 'me';
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

  /* GET: get rent data by Id */
  getDataById(id:string): Observable<any>{
      const options = id ?{ params: new HttpParams().set('user_id', id) } : {};
      return this.http.get<any>(this.ApiUrl, options).pipe(catchError(this.handleError));
  }

  /* GET: get optional name data from DB*/
  searchOne(price:number,home_type:string,location:string,grossarea:Array<Number>,bedroom_no:number,bathroom_no:number): Observable<any[]> {
    let params_str = '';
    if(price!=undefined){params_str += "&price="+price.toString()}
    if(home_type!=undefined){params_str += "&home_type="+home_type}
    if(location!=undefined){params_str += "&location="+location}
    if(grossarea!=undefined){params_str += "&grossarea="+grossarea.toString()}
    if(bedroom_no!=undefined){params_str += "&bedroom_no="+bedroom_no.toString()}
    if(bathroom_no!=undefined){params_str += "&bathroom_no="+bathroom_no.toString()}
    
    const options = 
    { params: new HttpParams(
      { fromString:params_str.substr(1,params_str.length-1) })
    };

    return this.http.get<any[]>(this.ApiUrl, options)
      .pipe(
        catchError(this.handleError)
      );
  }

   /* PUT: update one from DB */
  updateData (user_id:string,data: any): Observable<any> {
    httpOptions.headers =
      httpOptions.headers.set('Authorization', 'my-new-auth-token');
    const url = `${this.ApiUrl}/${user_id}`;
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
