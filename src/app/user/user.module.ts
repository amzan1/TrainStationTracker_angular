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
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';


@NgModule({
  declarations: [
    LandingPComponent,
    TripsSearchComponent,
    MapComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    SharedModule,
    HttpClientModule,
    AdminModule,
    GoogleMapsModule,
    SharedModule,
    MatDatepickerModule,
    MatNativeDateModule,
  ]
})
export class UserModule { }
