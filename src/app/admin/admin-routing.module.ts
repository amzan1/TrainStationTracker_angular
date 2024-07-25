import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { TripsComponent } from './trips/trips.component';
import { TrainStationsComponent } from './train-stations/train-stations.component';

const routes: Routes = [
  {
    path:'dashboard',
    component: DashboardComponent
  },
  {
    path:'trips',
    component:TripsComponent
  },
  {
    path:'trainstation',
    component:TrainStationsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
