import { Component, OnInit } from '@angular/core';
import { Observable, map} from 'rxjs';
import { SearchService, re } from '../services/search.service';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-results-grid',
  templateUrl: './results-grid.component.html',
  styleUrls: ['./results-grid.component.css']
})
export class ResultsGridComponent implements OnInit{
  listingsList$!:Observable<any[]>;
  listings!:Array<any>;

  name: string = "";
  price: string = ""
  //paginator inputs
  page!: number;
  pageSize!: number;
  totalSearchResults!:number;


  constructor(private service:SearchService) {}

  ngOnInit(): void {
    this.page=0;
    this.pageSize=10;
    this.service.currentMessage.subscribe(message => {
      this.name = message[0]
      this.price = message[1]
      if(this.name==""){
        this.proceedEmptySearch()
      }
      else if (this.name!="" && this.price==""){
        this.proceedSearchName()
      }
      else if (this.name!="" && this.price!=""){
        this.proceedSearchNamePrice()
      }
    })

  }

  proceedEmptySearch(){
    var requestBody = {
      page: 0,
      pageSize: 3
    }
    this.service.getListings(requestBody).subscribe((data: re) => {
      this.listings = data.listings
      this.totalSearchResults = data.noResults
    })
  }

  proceedSearchName(){
    var requestBody = {
      name: this.name,
      sortBy: "_score",
      sortOrder: 1,
      page: this.page,
      pageSize: this.pageSize
    }
    this.service.getListingsWithName(requestBody).subscribe((data: re) => {
      this.listings = data.listings
      this.totalSearchResults = data.noResults
    })
  }

  proceedSearchNamePrice(){
    var requestBody = {
      name: this.name,
      currentPrice: this.price,
      page: this.page,
      pageSize: this.pageSize
    }
    this.service.getListingsWithNameAndPrice(requestBody).subscribe((data: re) => {
      this.listings = data.listings
      this.totalSearchResults = data.noResults
    })
  }

  pageChanged(event:any){
    console.log(event.pageSize)
  }
}

