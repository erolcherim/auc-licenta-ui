import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { __values } from 'tslib';
import { Listing } from '../model/listing';

@Injectable({
  providedIn: 'root'
})

export class SearchService {

  private messageSource = new BehaviorSubject<Array<string>>(["",""]);
  currentMessage = this.messageSource.asObservable();

  readonly apiurl = "https://api-licentaec.ngrok.app/api/v1/listing/search"
  // readonly apiurl = "https://localhost:8080/api/v1/listing/search"

  constructor(private http : HttpClient) { }

  changeMessage(message: Array<string>){
    this.messageSource.next(message)
  }

  getListings(requestBody:any) : Observable<re>{
    return this.http.post<any>(this.apiurl+'/latest', requestBody).pipe(map((response:any) => ({
      noResults: response.noResults,
      listings: response.listings
    })))
  }

  getListingsWithName(requestBody:any) : Observable<re> {
    return this.http.post<any>(this.apiurl+'/name-search', requestBody).pipe(map((response:any) => ({
      noResults: response.noResults,
      listings: response.listings
    })))
  }

  getListingsWithNameAndPrice(requestBody:any) : Observable<re> {
    return this.http.post<any>(this.apiurl+'/multi-search', requestBody).pipe(map((response:any) => ({
      noResults: response.noResults,
      listings: response.listings
    })))
  }

  getListingById(id:any) : Observable<Listing> {
    return this.http.get(this.apiurl + `/${id}`).pipe(map((response:any) =>({
      id: response.id,
      userId: response.userId,
      name: response.name,
      description: response.description,
      startingPrice: response.startingPrice,
      currentPrice: response.currentPrice,
      bids: response.bids,
      isActive: response.isActive,
      hasImage:response.hasImage,
      createdDate: response.createdDate,
      activatedDate: response.activatedDate,
      expirationDate: response.expirationDate
    })))
  }
  
  getListingsForCurrentUser(page:number, pageSize:number) : Observable<re> {
    const headers = new HttpHeaders({
      Authorization: `Bearer  ${localStorage.getItem('token')}`
    })
    return this.http.get<any>(this.apiurl+"/current-user", {headers: headers, params: {"page":page, "pageSize":pageSize}}).pipe(map((data:re)=>({
      noResults: data.noResults,
      listings: data.listings
    })))
  }

  getRecommended(requestBody:any){
    const headers = new HttpHeaders({
      Authorization: `Bearer  ${localStorage.getItem('token')}`
    })
    return this.http.post<Array<Listing>>(this.apiurl+"/recommended", requestBody, {headers:headers});
  }

}


export class re{
  noResults!:number
  listings!:Array<Listing>
}



