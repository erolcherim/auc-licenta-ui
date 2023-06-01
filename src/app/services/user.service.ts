import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService{
  
  constructor(private http:HttpClient) { }

  readonly apiurl = "http://localhost:8080/api/v1/user"

  getUser(id:string) : Observable<User>{
    const headers = new HttpHeaders({
      Authorization: `Bearer  ${localStorage.getItem('token')}`
    })

    return this.http.get<any>(this.apiurl + `/${id}`, {headers: headers}).pipe(map((data:User)=>({
      email : data.email,
      firstName : data.firstName,
      lastName : data.lastName,
      balance : data.balance
    })))
  }

  topUp(id:string, topUpAmount:number){
    const headers = new HttpHeaders({
      Authorization: `Bearer  ${localStorage.getItem('token')}`
    })

    return this.http.post<any>(this.apiurl + `/balance/${id}`, topUpAmount, {headers: headers}).pipe(map((data:TopUpResponse) => ({
      response:data.response
    })))
  }
}

export interface User{
  firstName:string,
  lastName:string,
  email:string,
  balance:number;
}

export interface TopUpResponse{
  response:string
}
