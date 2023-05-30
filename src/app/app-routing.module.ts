import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ResultsGridComponent } from './results-grid/results-grid.component';
import { AppComponent } from './app.component';
import { ListingViewComponent } from './listing-view/listing-view.component';
import { HomePageComponent } from './home-page/home-page.component';

const routes: Routes = [
  {path:"home", component: HomePageComponent},
  {path:"view/:id", component: ListingViewComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }

