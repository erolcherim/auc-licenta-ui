import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ListingService {
  
  readonly apiurl = "http://localhost:8080/api/v1/listing"

  constructor(private http:HttpClient) { }

  postListing(body:any){
    const headers = new HttpHeaders({
      Authorization: `Bearer  ${localStorage.getItem('token')}`
    })
    return this.http.post(this.apiurl+"/", body, {headers:headers})
  }

  bidOnListing(id:string, bid:any){
    const headers = new HttpHeaders({
      Authorization: `Bearer  ${localStorage.getItem('token')}`
    })
    return this.http.post<SingleResponse>(this.apiurl+`/bid/${id}`, bid, {headers:headers}).pipe(map((r:SingleResponse)=>({
      response:r.response
    })))
  }

  getListingImage(id:any)  : Observable<Blob>{
    return this.http.get(this.apiurl+`/image/${id}`, {responseType:'blob'});
  }
}

export interface SingleResponse{
  response:string
}
