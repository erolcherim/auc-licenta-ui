import { Component } from '@angular/core';
import { Bid } from 'src/app/model/bid';
import { Input } from '@angular/core';

@Component({
  selector: 'app-bid-grid',
  templateUrl: './bid-grid.component.html',
  styleUrls: ['./bid-grid.component.css']
})
export class BidGridComponent {
  @Input()
  bids!:Bid[];
}
