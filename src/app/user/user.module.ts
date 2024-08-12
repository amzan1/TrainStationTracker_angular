import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { SharedModule } from '../shared/shared.module';
import { HttpClientModule } from '@angular/common/http';
import { SignedNavbarComponent } from './signed-navbar/signed-navbar.component';
import { ProfileComponent } from './profile/profile.component';
import { MyBookinksComponent } from './my-bookinks/my-bookinks.component';
import { AddTestimonialComponent } from './add-testimonial/add-testimonial.component';
import { LandingPComponent } from './landing-p/landing-p.component';
import { TripsSearchComponent } from './trips-search/trips-search.component';
import { AdminModule } from '../admin/admin.module';
import { MapComponent } from './map/map.component';
import { GoogleMapsModule } from '@angular/google-maps';
import { PaymentComponent } from './payment/payment.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { InvoiceComponent } from './invoice/invoice.component';


@NgModule({
  declarations: [
    SignedNavbarComponent,
    ProfileComponent,
    MyBookinksComponent,
    AddTestimonialComponent,
    LandingPComponent,
    TripsSearchComponent,
    MapComponent,
    PaymentComponent,
    InvoiceComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    SharedModule,
    HttpClientModule,
    AdminModule,
    GoogleMapsModule,
    ReactiveFormsModule,
    SharedModule,
    MatDatepickerModule,
    MatNativeDateModule,
  ]
})
export class UserModule { }
