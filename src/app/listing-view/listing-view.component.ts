import { AfterContentInit, AfterViewChecked, Component, OnInit } from '@angular/core';
import { Listing } from '../model/listing';
import { Input } from '@angular/core';
import { Observable, map } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { SearchService } from '../services/search.service';

@Component({
  selector: 'app-listing-view',
  templateUrl: './listing-view.component.html',
  styleUrls: ['./listing-view.component.css']
})
export class ListingViewComponent implements OnInit{
  
  listingId!:string;
  listing?:Listing;
  bids!:Array<any>

  constructor(private service:SearchService, private route:ActivatedRoute) {}

  ngOnInit(): void {
    this.listingId=this.route.snapshot.paramMap.get("id")!
    this.service.getListingById(this.listingId).subscribe(r => this.listing=r)
  }
}
