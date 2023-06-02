import { Component } from '@angular/core';
import { Input, Output } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { LoginComponent } from 'src/app/login/login.component';
import { Listing } from 'src/app/model/listing';
import { FavoriteService } from 'src/app/services/favorite.service';
import { LoginService } from 'src/app/services/login.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-listing-card',
  templateUrl: './listing-card.component.html',
  styleUrls: ['./listing-card.component.css']
})
export class ListingCardComponent {
  @Input()
  listing!:Listing;

  favorited:boolean = false

  constructor(private favoriteService: FavoriteService){}
}
