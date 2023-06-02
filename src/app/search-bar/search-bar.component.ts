import { Component, OnInit } from '@angular/core';
import { SearchService } from '../services/search.service';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent implements OnInit{
  searchInput:string = ""
  searchInputPrice:string = ""

  constructor(private service:SearchService) {}

  ngOnInit(){
    this.service.currentMessage.subscribe(message => this.searchInput = message[0])
  }

  OnSearch(){
    this.service.changeMessage([this.searchInput, this.searchInputPrice])
  }
}
