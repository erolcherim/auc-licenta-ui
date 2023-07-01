import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ListingService {
  
  readonly apiurl = "https://api-licentaec.ngrok.app/api/v1/listing"
  // readonly apiurl = "https://localhost:8080/api/v1/listing"

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

  deleteListing(id:any){
    const headers = new HttpHeaders({
      Authorization: `Bearer  ${localStorage.getItem('token')}`
    })
    return this.http.delete<SingleResponse>(this.apiurl+`/${id}`, {headers:headers}).pipe(map((r:SingleResponse)=>({
      response:r.response
    })))
  }

  editListing(body:any, id:any){
    const headers = new HttpHeaders({
      Authorization: `Bearer  ${localStorage.getItem('token')}`
    })
    return this.http.put(this.apiurl+`/${id}`, body, {headers:headers})
  }
}

export interface SingleResponse{
  response:string
}
