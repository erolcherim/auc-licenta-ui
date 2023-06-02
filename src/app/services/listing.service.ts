import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ListingService {
  
  readonly apiurl = "http://localhost:8080/api/v1/listing"

  constructor(private http:HttpClient) { }

  postListing(listing:any){
    const headers = new HttpHeaders({
      Authorization: `Bearer  ${localStorage.getItem('token')}`
    })
    return this.http.post(this.apiurl+"/", listing, {headers:headers})
  }

  bidOnListing(id:string, bid:any){
    const headers = new HttpHeaders({
      Authorization: `Bearer  ${localStorage.getItem('token')}`
    })
    return this.http.post<SingleResponse>(this.apiurl+`/bid/${id}`, bid, {headers:headers}).pipe(map((r:SingleResponse)=>({
      response:r.response
    })))
  }
}

export interface SingleResponse{
  response:string
}
