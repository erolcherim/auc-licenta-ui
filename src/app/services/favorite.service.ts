import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { re } from './search.service';
import { BehaviorSubject, Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FavoriteService {
  
  readonly apiurl = "http://localhost:8080/api/v1/favorite"
  
  constructor(private http:HttpClient) { }

  getFavorites(page:number, pageSize:number) : Observable<re> {
    const headers = new HttpHeaders({
      Authorization: `Bearer  ${localStorage.getItem('token')}`
    })
    return this.http.get<any>(this.apiurl+"/", {headers: headers, params: {"page":page, "pageSize":pageSize}}).pipe(map((data:re)=>({
      noResults: data.noResults,
      listings: data.listings
    })))
  }

  getWon(page:number, pageSize:number) : Observable<re> {
    const headers = new HttpHeaders({
      Authorization: `Bearer  ${localStorage.getItem('token')}`
    })
    return this.http.get<any>(this.apiurl+"/won", {headers: headers, params: {"page":page, "pageSize":pageSize}}).pipe(map((data:re)=>({
      noResults: data.noResults,
      listings: data.listings
    })))
  }

  getFavoritesIds() : Observable<Array<String>> {
    const headers = new HttpHeaders({
      Authorization: `Bearer  ${localStorage.getItem('token')}`
    })
    return this.http.get<Array<string>>(this.apiurl+"/ids", {headers: headers})
  }

  addToFavorites(id:string){
    const headers = new HttpHeaders({
      Authorization: `Bearer  ${localStorage.getItem('token')}`
    })
    return this.http.put(this.apiurl+`/add/${id}`,'', {headers: headers})
  }

  removeFromFavorites(id:string){
    const headers = new HttpHeaders({
      Authorization: `Bearer  ${localStorage.getItem('token')}`
    })
    return this.http.put(this.apiurl+`/remove/${id}`,'', {headers: headers})
  }
}
