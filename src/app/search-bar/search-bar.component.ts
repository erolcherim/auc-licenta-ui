import { Component, EventEmitter, Input, Output } from '@angular/core';
import { SearchService } from '../services/search.service';
import { ResultsGridComponent } from '../results-grid/results-grid.component';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent {
  searchInput:string = ""
  searchInputPrice:string = ""

  constructor(private service:SearchService) {}

  OnInit(){
    this.service.currentMessage.subscribe(message => this.searchInput = message[0])
  }

  OnSearch(){
    this.service.changeMessage([this.searchInput, this.searchInputPrice])
  }
}
