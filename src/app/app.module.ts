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
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { ListingCardComponent } from './results-grid/listing-card/listing-card.component';
import { ListingViewComponent } from './listing-view/listing-view.component';
import { HomePageComponent } from './home-page/home-page.component';
import { BidGridComponent } from './listing-view/bid-grid/bid-grid.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { LoginComponent } from './login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { TopupComponent } from './topup/topup.component';
import { RegisterComponent } from './register/register.component';
import { FavoriteComponent } from './favorite/favorite.component';
import { FavoriteGridComponent } from './favorite/favorite-grid/favorite-grid.component';
import { MatTabsModule } from '@angular/material/tabs';
import { MatExpansionModule } from '@angular/material/expansion';
import { AddListingComponent } from './add-listing/add-listing.component';
import { SimilarListingComponent } from './listing-view/similar-listing/similar-listing.component';
import { DeleteListingComponent } from './listing-view/delete-listing/delete-listing.component';
import { MatDialogModule } from '@angular/material/dialog';
import { EditListingComponent } from './listing-view/edit-listing/edit-listing.component';

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    ResultsGridComponent,
    ListingCardComponent,
    ListingViewComponent,
    HomePageComponent,
    BidGridComponent,
    SearchBarComponent,
    LoginComponent,
    TopupComponent,
    RegisterComponent,
    FavoriteComponent,
    FavoriteGridComponent,
    AddListingComponent,
    SimilarListingComponent,
    DeleteListingComponent,
    EditListingComponent,
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
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    ReactiveFormsModule,
    MatSnackBarModule,
    MatTabsModule,
    MatExpansionModule,
    MatDialogModule 
  ],
  providers: [],
  bootstrap: [AppComponent]
})

export class AppModule { }