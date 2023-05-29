import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject, map } from 'rxjs';
import { __values } from 'tslib';

@Injectable({
  providedIn: 'root'
})

export class SearchService {

  private messageSource = new BehaviorSubject<Array<string>>(["",""]);
  currentMessage = this.messageSource.asObservable();

  readonly apiurl = "http://localhost:8080/api/v1"

  constructor(private http : HttpClient) { }

  changeMessage(message: Array<string>){
    this.messageSource.next(message)
  }

  getListings(requestBody:any) : Observable<re>{
    return this.http.post<any>(this.apiurl+'/listing/latest', requestBody).pipe(map((response:any) => ({
      noResults: response.noResults,
      listings: response.listings
    })))
  }

  getListingsWithName(requestBody:any) : Observable<re> {
    return this.http.post<any>(this.apiurl+'/listing/search', requestBody).pipe(map((response:any) => ({
      noResults: response.noResults,
      listings: response.listings
    })))
  }

  getListingsWithNameAndPrice(requestBody:any) : Observable<re> {
    return this.http.post<any>(this.apiurl+'/listing/multi-search', requestBody).pipe(map((response:any) => ({
      noResults: response.noResults,
      listings: response.listings
    })))
  }
}

export class re{
  noResults!:number
  listings!:Array<any>
}







