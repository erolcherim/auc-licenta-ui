import { Component, OnInit, ViewChild, AfterViewInit, EventEmitter, Output } from '@angular/core';
import { tap} from 'rxjs';
import { SearchService, re } from '../services/search.service';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { Listing } from '../model/listing';

@Component({
  selector: 'app-results-grid',
  templateUrl: './results-grid.component.html',
  styleUrls: ['./results-grid.component.css']
})
export class ResultsGridComponent implements OnInit, AfterViewInit{
  listings!:Array<Listing>;
  name: string = "";
  price: string = ""
  totalSearchResults?:number;
  pageSizePreview?:number = 5;

  @ViewChild(MatPaginator)
  paginator!:MatPaginator;

  constructor(private service:SearchService) {}

  ngOnInit(): void {
    this.service.currentMessage.subscribe(message => {
      this.name = message[0]
      this.price = message[1]
      this.proceedSearch()
    })

  }

  ngAfterViewInit(): void {
    
    this.paginator.page
    .pipe(
      tap(() => {
        this.proceedSearch(); 
        this.pageSizePreview = this.paginator.pageSize;})
    )
    .subscribe()
  }
  
  proceedSearch(){
    if(this.name==""){
      this.proceedEmptySearch()
    }
    else if (this.name!="" && this.price==""){
      this.proceedSearchName()
    }
    else if (this.name!="" && this.price!=""){
      this.proceedSearchNamePrice()
    }
  }

  proceedEmptySearch(){
    var requestBody = {
      page: this.paginator?.pageIndex ?? 0,
      pageSize: this.paginator?.pageSize ?? 5
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
      page: this.paginator?.pageIndex ?? 0,
      pageSize: this.paginator?.pageSize ?? 5
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
      page: this.paginator?.pageIndex ?? 0,
      pageSize: this.paginator?.pageSize ?? 5
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

