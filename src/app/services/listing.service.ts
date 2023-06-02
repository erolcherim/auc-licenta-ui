import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

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
}
