import { AfterContentChecked, AfterContentInit, AfterViewChecked, AfterViewInit, Component, DoCheck, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { Listing } from '../model/listing';
import { Input } from '@angular/core';
import { Observable, map } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { SearchService } from '../services/search.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-listing-view',
  templateUrl: './listing-view.component.html',
  styleUrls: ['./listing-view.component.css']
})
export class ListingViewComponent implements OnInit{
  
  listingId!:string;
  listing?:Listing;
  bids!:Array<any>
  similarListings?:Array<Listing>;
  listingName!:string;

  constructor(private service:SearchService, private route:ActivatedRoute, private router:Router) {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
  }

  ngOnInit() {
    console.log("init")
    this.listingId=this.route.snapshot.paramMap.get("id")!;
    this.service.getListingById(this.listingId).subscribe(r => {
      this.listing=r;
      var requestBody = {
        name:this.listing.name,
        currentPrice:this.listing.currentPrice,
        page:0,
        pageSize:5
      }
      this.service.getListingsWithNameAndPrice(requestBody).subscribe(r => 
        this.similarListings = r.listings
      )
    })
  }
}
