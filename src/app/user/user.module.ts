import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { SharedModule } from '../shared/shared.module';
import { HttpClientModule } from '@angular/common/http';
import { LandingPComponent } from './landing-p/landing-p.component';
import { TripsSearchComponent } from './trips-search/trips-search.component';
import { AdminModule } from '../admin/admin.module';
import { MapComponent } from './map/map.component';
import { GoogleMapsModule } from '@angular/google-maps';
import { PaymentComponent } from './payment/payment.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    LandingPComponent,
    TripsSearchComponent,
    MapComponent,
    PaymentComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    SharedModule,
    HttpClientModule,
    AdminModule,
    GoogleMapsModule,
    ReactiveFormsModule
  ]
})
export class UserModule { }
