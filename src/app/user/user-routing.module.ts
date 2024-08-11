import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingPComponent } from './landing-p/landing-p.component';
import { TripsSearchComponent } from './trips-search/trips-search.component';
import { MapComponent } from './map/map.component';
import { PaymentComponent } from './payment/payment.component';
import { InvoiceComponent } from './invoice/invoice.component';

const routes: Routes = [
  {
    path:'home',
    component: LandingPComponent
  },
  {
    path:'trips',
    component:TripsSearchComponent
  },
  {
    path:'map',
    component:MapComponent
  },
  {
    path:'payment',
    component:PaymentComponent
  },
  {
    path:'invoice',
    component:InvoiceComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
