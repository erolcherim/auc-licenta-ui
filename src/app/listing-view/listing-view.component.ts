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
import { MatDialog } from '@angular/material/dialog';
import { DeleteListingComponent } from './delete-listing/delete-listing.component';
import { EditListingComponent } from './edit-listing/edit-listing.component';

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
  suggestedBidAmount:number = 0;
  imageSrc:any;
  timeUntillActivation?:number;

  bidAmount = new FormControl('', [Validators.required])

  constructor(private service:SearchService, private listingService:ListingService, private route:ActivatedRoute, private router:Router, private _snackBar:MatSnackBar, public dialog:MatDialog) {
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
      this.service.getListingsWithNameAndPrice(requestBody).subscribe(r => {
          this.similarListings = r.listings
          this.similarListings.splice(0,1)
        }

      )
      this.suggestedBidAmount = Math.ceil(0.1*this.listing.startingPrice) + this.listing.currentPrice
      this.getImage(this.listing)
      let td = new Date(this.listing.createdDate);
      let tn = Date.now();
      if(this.listing.isActive==0){
        this.timeUntillActivation=Math.floor((td.getTime()+30*1000*60-tn)/1000/60);
      }
    })
  }

  getImage(listing:Listing){
    if (listing.hasImage == true){
      this.listingService.getListingImage(listing.id).subscribe({
        next:(r)=>{
          const reader = new FileReader();
          reader.onload = e => this.imageSrc = reader.result;
          reader.readAsDataURL(r);
        },
        error: (e) =>{ }
      })
    }
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

  openDeleteDialog(){
    const dialogRef=this.dialog.open(DeleteListingComponent);

    dialogRef.afterClosed().subscribe(result => {
      if(result=="true"){
        this.proceedDeleteListing(this.listingId);
      }
    })
  }

  openEditDialog(){
    const dialogRef=this.dialog.open(EditListingComponent, {
      data:{
        id: this.listingId,
        imageSrc:this.imageSrc,
        name:this.listing?.name,
        startingPrice:this.listing?.startingPrice,
        description:this.listing?.description
      }
    });
  }

  proceedDeleteListing(id:any){
    this.listingService.deleteListing(id).subscribe({
    next: (r:SingleResponse) => {
      this.router.navigate(['home']).then(()=>window.location.reload())
    },
    error: (e) => {
      this._snackBar.open(e.error.response, "Dismiss", {
        duration:2000
      })
    }
    })
  }

}
