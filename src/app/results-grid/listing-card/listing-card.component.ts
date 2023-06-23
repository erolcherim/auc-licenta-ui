import { Component, OnInit } from '@angular/core';
import { Input, Output } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { LoginComponent } from 'src/app/login/login.component';
import { Listing } from 'src/app/model/listing';
import { FavoriteService } from 'src/app/services/favorite.service';
import { ListingService } from 'src/app/services/listing.service';
import { LoginService } from 'src/app/services/login.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-listing-card',
  templateUrl: './listing-card.component.html',
  styleUrls: ['./listing-card.component.css']
})
export class ListingCardComponent implements OnInit{
  @Input()
  listing!:Listing;

  @Input()
  isFavorited?:boolean;

  isLoggedIn!:boolean;

  imageSrc!:any;

  constructor(private favoriteService: FavoriteService, private loginService:LoginService, private listingService:ListingService){ }
  
  ngOnInit(): void {
    this.isLoggedIn = this.loginService.isLoggedIn();
    if (this.listing.hasImage == true){
      this.listingService.getListingImage(this.listing.id).subscribe({
        next:(r)=>{
          const reader = new FileReader();
          reader.onload = e => this.imageSrc = reader.result;
          reader.readAsDataURL(r);
        },
        error: (e) =>{ }
      })
    }
  }


  addToFavorites(){
    if (this.isFavorited==false){
      this.favoriteService.addToFavorites(this.listing.id).subscribe()
      this.isFavorited=true
    }
    else if (this.isFavorited==true){
      this.favoriteService.removeFromFavorites(this.listing.id).subscribe()
      this.isFavorited=false
    }
  }
}
