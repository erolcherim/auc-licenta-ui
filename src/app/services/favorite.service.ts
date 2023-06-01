import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { re } from './search.service';
import { Observable, map } from 'rxjs';

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
    return this.http.get<any>(this.apiurl+"/query", {headers: headers, params: {"page":page, "pageSize":pageSize}}).pipe(map((data:re)=>({
      noResults: data.noResults,
      listings: data.listings
    })))
  }
}
