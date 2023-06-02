import { AfterViewInit, Component, OnInit, ViewChild, Input, Output, EventEmitter } from '@angular/core';
import { Listing } from 'src/app/model/listing';
import { FavoriteService } from 'src/app/services/favorite.service';
import { MatPaginator } from '@angular/material/paginator';
import { tap } from 'rxjs';
import { ListingCardComponent } from 'src/app/results-grid/listing-card/listing-card.component';

@Component({
  selector: 'app-favorite-grid',
  templateUrl: './favorite-grid.component.html',
  styleUrls: ['./favorite-grid.component.css']
})
export class FavoriteGridComponent {
  @Input()
  favorites!:Array<Listing>

  @Input()
  noFavorites!:number

  favoriteIds?:Array<String>

  @ViewChild(MatPaginator)
  paginator!:MatPaginator;

  @Output()
  notifyPagingChanges:EventEmitter<Array<number>> = new EventEmitter()
  pageChanged(event:any){
    this.notifyPagingChanges.emit([this.paginator.pageIndex, this.paginator.pageSize])
  }

  constructor(private service:FavoriteService){ }

  ngOnInit(){
    this.service.getFavoritesIds().subscribe(r => this.favoriteIds=r);
  }
}
