import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ResultsGridComponent } from './results-grid/results-grid.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatGridListModule } from '@angular/material/grid-list';
import { HttpClientModule } from '@angular/common/http';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatPaginatorModule } from '@angular/material/paginator'
import { SearchBarComponent } from './search-bar/search-bar.component';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import { FormControl, FormsModule } from '@angular/forms';
import { ListingCardComponent } from './results-grid/listing-card/listing-card.component';
import { ListingViewComponent } from './listing-view/listing-view.component';
import { HomePageComponent } from './home-page/home-page.component';
import { BidGridComponent } from './listing-view/bid-grid/bid-grid.component';

@NgModule({
  declarations: [
    AppComponent,
    ResultsGridComponent,
    SearchBarComponent,
    ListingCardComponent,
    ListingViewComponent,
    HomePageComponent,
    BidGridComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatGridListModule, 
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    FormsModule,
    MatPaginatorModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})

export class AppModule { }
