import { NgModule, inject } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListingViewComponent } from './listing-view/listing-view.component';
import { HomePageComponent } from './home-page/home-page.component';
import { LoginComponent } from './login/login.component';
import { TopupComponent } from './topup/topup.component';
import { FavoriteComponent } from './favorite/favorite.component';
import { RegisterComponent } from './register/register.component';
import { AddListingComponent } from './add-listing/add-listing.component';
import { ShoppingAsistantComponent } from './shopping-asistant/shopping-asistant.component';
import { authGuard } from './auth.guard';

const routes: Routes = [
  {path:"home", component: HomePageComponent},
  {path:"view/:id", component: ListingViewComponent},
  {path:"login", component: LoginComponent},
  {path:"topup", component: TopupComponent, canActivate:[authGuard]},
  {path:"favorites", component:FavoriteComponent, canActivate:[authGuard]},
  {path:"register", component:RegisterComponent},
  {path:"add", component:AddListingComponent, canActivate:[authGuard]},
  {path:"assistant", component:ShoppingAsistantComponent, canActivate:[authGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }

