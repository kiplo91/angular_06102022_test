import { Injectable } from '@angular/core';
import {HttpClient,HttpHeaders} from '@angular/common/http'
import { Observable } from 'rxjs';
const AUTH_API = " http://test-demo.aemenersol.com/api/";

const httpOptions = {
  headers: new HttpHeaders({'Content-Type':'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http:HttpClient
  ) { }

  signin(username:string,password:string): Observable<any>{
    return this.http.post(AUTH_API +'account/login',{
      username,
      password
    },httpOptions);
  }

  isLoggedIn():boolean{
    const token = window.sessionStorage.getItem('TOKEN');
    return token !=='null' ? true:false;
  }

  dashboard():Observable<any>{
    return this.http.get(AUTH_API+'dashboard',httpOptions);
  }
}
