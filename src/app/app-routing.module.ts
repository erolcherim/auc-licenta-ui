import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListingViewComponent } from './listing-view/listing-view.component';
import { HomePageComponent } from './home-page/home-page.component';
import { LoginComponent } from './login/login.component';
import { TopupComponent } from './topup/topup.component';
import { FavoriteComponent } from './favorite/favorite.component';
import { RegisterComponent } from './register/register.component';
import { AddListingComponent } from './add-listing/add-listing.component';

const routes: Routes = [
  {path:"home", component: HomePageComponent},
  {path:"view/:id", component: ListingViewComponent},
  {path:"login", component: LoginComponent},
  {path:"topup", component: TopupComponent},
  {path:"favorites", component:FavoriteComponent},
  {path:"register", component:RegisterComponent},
  {path:"add", component:AddListingComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }

