import { AfterContentChecked, AfterContentInit, AfterViewChecked, AfterViewInit, Component, OnInit } from '@angular/core';
import { Bid } from 'src/app/model/bid';
import { Input } from '@angular/core';
import { ListingService } from 'src/app/services/listing.service';

@Component({
  selector: 'app-bid-grid',
  templateUrl: './bid-grid.component.html',
  styleUrls: ['./bid-grid.component.css']
})
export class BidGridComponent implements AfterViewChecked{
  @Input()
  bids?:Bid[];

  ngAfterViewChecked(): void {
    this.bids?.sort((a,b) => b.updatedPrice-a.updatedPrice)
  }

}
