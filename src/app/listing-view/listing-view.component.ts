import { AfterContentChecked, AfterContentInit, AfterViewChecked, AfterViewInit, Component, DoCheck, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { Listing } from '../model/listing';
import { Input } from '@angular/core';
import { Observable, map } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { SearchService } from '../services/search.service';
import { Router } from '@angular/router';
import { ListingService, SingleResponse } from '../services/listing.service';
import { FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NavBarComponent } from '../nav-bar/nav-bar.component';

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
  suggestedBidAmount:number = 0

  bidAmount = new FormControl('', [Validators.required])

  constructor(private service:SearchService, private listingService:ListingService, private route:ActivatedRoute, private router:Router, private _snackBar:MatSnackBar) {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
  }

  ngOnInit() {
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
      this.suggestedBidAmount = Math.ceil(0.1*this.listing.startingPrice) + this.listing.currentPrice
    })
  }

  proceedBid(){
    var bid = {
      updatedPrice:this.bidAmount.value
    }
    this.listingService.bidOnListing(this.listing?.id!, bid).subscribe({
      next: (r:SingleResponse) => {
        window.location.reload()
      },
      error: (e) => {
        this._snackBar.open(e.error.response, "Dismiss", {
          duration:2000
        })
      }
    }
    );
  }
}
