import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ResultsGridComponent } from './results-grid/results-grid.component';

const routes: Routes = [];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
