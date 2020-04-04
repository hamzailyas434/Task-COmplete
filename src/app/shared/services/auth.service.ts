import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers } from '@angular/http';
import { Observable } from 'rxjs';
import { GlobalConstants } from '../constants';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: Http, private _http: HttpClient) { }
  // signIn Method
  authenticateUser(loginObject: any): Observable<any> {
   var url = GlobalConstants.API_URL + 'api/services/app/User/Login'; //api/services/app/User/Login
   let headers = new Headers({ 'Content-Type': 'application/json' });
   let options = new RequestOptions({ headers: headers });
   let body = loginObject;
   return this.http.post(url, body, options);
}
 // to get user
getUser(): Observable<any>{
  var url = GlobalConstants.API_URL + "api/services/app/User/GetAll";
  return this.http.get(url);
}
}
