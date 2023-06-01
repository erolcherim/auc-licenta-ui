import { HttpClient } from '@angular/common/http';
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

  readonly apiurl = "http://localhost:8080/api/v1/listing/search"

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
      createdDate: response.createdDate,
      activatedDate: response.activatedDate,
      expirationDate: response.expirationDate
    })))
  }
}

export class re{
  noResults!:number
  listings!:Array<Listing>
}



