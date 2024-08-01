import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingPComponent } from './landing-p/landing-p.component';
import { TripsSearchComponent } from './trips-search/trips-search.component';

const routes: Routes = [
  {
    path:'home',
    component: LandingPComponent
  },
  {
    path:'trips',
    component:TripsSearchComponent
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
