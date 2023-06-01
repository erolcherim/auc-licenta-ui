import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http:HttpClient) { }

  readonly apiurl = "http://localhost:8080/api/v1/auth"

  proceedLogin(user:any) : Observable<AuthResponse>{
    return this.http.post<AuthResponse>(this.apiurl+"/authenticate", user).pipe(map((r:AuthResponse)=>({
      token:r.token
    })))
  }

  proceedLoginRaw(user:any) {
    return this.http.post(this.apiurl+"/authenticate", user)
  }

  getIdFromToken(){
    let token =  localStorage.getItem('token')!
    let decodedJWT = JSON.parse(window.atob(token.split('.')[1]))
    return decodedJWT.id;
  }

  getEmailFromToken(){
    let token =  localStorage.getItem('token')!
    let decodedJWT = JSON.parse(window.atob(token.split('.')[1]))
    if (this.isLoggedIn()) {
      return decodedJWT.sub;
    }
    return ""
  }

  getLoggedInUser(){
    return this.http.get(this.apiurl+"/")
  }

  isLoggedIn(){
    return localStorage.getItem('token') != null;
  }

  logOut() { 
    localStorage.removeItem('token');
    window.location.reload();
  }
}

export interface AuthResponse{
  token:string
}
