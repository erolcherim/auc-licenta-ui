import { AfterContentInit, AfterViewInit, Component, ContentChild, ContentChildren, OnInit, Output, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { FavoriteService } from '../services/favorite.service';
import { Listing } from '../model/listing';
import { SearchService } from '../services/search.service';
import { re } from '../services/search.service';


@Component({
  selector: 'app-favorite',
  templateUrl: './favorite.component.html',
  styleUrls: ['./favorite.component.css']
})
export class FavoriteComponent implements OnInit {
  //input arrays
  favorites!:Array<Listing>
  myListings!:Array<Listing>
  wonListing!:Array<Listing>
  //input totalElements(different from array.size() because array is always < pageSize, is returned from repository query.getTotalElements())
  noFavorites!:number
  noMyListings!:number
  noWonListings!:number

  page?:number = 0;
  pageSizePreview?:number = 5;

  @ContentChild(MatPaginator)
  paginator!:MatPaginator ;

  constructor(private service:FavoriteService, private searchService:SearchService){ 
  }

  ngOnInit(): void {
    this.populateGrid();
  }

  childEvent(event:any){
    this.page = event[0]
    this.pageSizePreview = event[1]
    this.service.getFavorites(this.page!, this.pageSizePreview!).subscribe((r:re) => {this.favorites=r.listings; this.noFavorites=r.noResults})
    this.searchService.getListingsForCurrentUser(this.page!, this.pageSizePreview!).subscribe((r:re) => {this.myListings=r.listings; this.noMyListings=r.noResults})
    console.log(this.favorites.at(0)?.id)
  }

  populateGrid(){
    this.service.getFavorites(0, 5).subscribe(r => {this.favorites=r.listings; this.noFavorites=r.noResults})
    this.searchService.getListingsForCurrentUser(this.page!, this.pageSizePreview!).subscribe((r:re) => {this.myListings=r.listings; this.noMyListings=r.noResults})
    this.service.getWon(this.page!, this.pageSizePreview!).subscribe((r:re) => {this.wonListing=r.listings; this.noWonListings=r.noResults})
  }
}
