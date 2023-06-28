import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SearchService } from '../services/search.service';
import { Listing } from '../model/listing';

@Component({
  selector: 'app-shopping-asistant',
  templateUrl: './shopping-asistant.component.html',
  styleUrls: ['./shopping-asistant.component.css']
})
export class ShoppingAsistantComponent {
  form = new FormGroup({
    searchHits : new FormControl('',[Validators.required]),
    budget : new FormControl('', [Validators.required, Validators.pattern("^(?:[1-9][0-9]{0,5})$")]),
  })

  recommendedListings$?:any

  constructor(private searchService:SearchService){}

  getErrorSearchTerms(){
    if (this.form.controls['searchHits'].hasError('required')){
      return 'You must enter a value';
    }
    return "";
  }

  getErrorBudget(){
    if (this.form.controls['budget'].hasError('required')){
      return 'You must enter a value';
    }
    return this.form.controls['budget'].hasError('pattern') ? 'Budget must an integer (no decimals) and at least 1' : '';
  }

  proceedSearchRecommended(){
    var reqBody = {
      searchHits: this.form.value.searchHits?.split(","),
      budget: this.form.value.budget
    }
    this.searchService.getRecommended(reqBody).subscribe(r => this.recommendedListings$=r)
  }

}
