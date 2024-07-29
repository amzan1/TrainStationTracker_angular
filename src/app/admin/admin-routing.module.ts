import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { TripsComponent } from './trips/trips.component';
import { TrainStationsComponent } from './train-stations/train-stations.component';
import { ReportsComponent } from './reports/reports.component';
import { TestimonialsComponent } from './testimonials/testimonials.component';
import { MangeHomeComponent } from './mange-home/mange-home.component';
import { MangeAboutusComponent } from './mange-aboutus/mange-aboutus.component';

const routes: Routes = [
  {
    path:'dashboard',
    component: DashboardComponent
  },
  {
    path:'home',
    component:MangeHomeComponent
  },
  {
    path:'aboutus',
    component:MangeAboutusComponent
  },
  {
    path:'testimonials',
    component: TestimonialsComponent
  },
  {
    path:'reports',
    component:ReportsComponent
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
