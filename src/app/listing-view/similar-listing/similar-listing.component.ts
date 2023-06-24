import { Component, Input, OnInit } from '@angular/core';
import { Listing } from 'src/app/model/listing';
import { ListingService } from 'src/app/services/listing.service';

@Component({
  selector: 'app-similar-listing',
  templateUrl: './similar-listing.component.html',
  styleUrls: ['./similar-listing.component.css']
})
export class SimilarListingComponent implements OnInit {
  @Input()
  listing!:Listing;
  imageSrc?:any;

  ngOnInit(): void {
    this.getImage(this.listing)
  }

  constructor(private listingService:ListingService){}

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

}
