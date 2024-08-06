import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { SharedModule } from '../shared/shared.module';
import { HttpClientModule } from '@angular/common/http';
import { SignedNavbarComponent } from './signed-navbar/signed-navbar.component';
import { ProfileComponent } from './profile/profile.component';
import { MyBookinksComponent } from './my-bookinks/my-bookinks.component';
import { AddTestimonialComponent } from './add-testimonial/add-testimonial.component';


@NgModule({
  declarations: [
    SignedNavbarComponent,
    ProfileComponent,
    MyBookinksComponent,
    AddTestimonialComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    SharedModule,
    HttpClientModule
  ]
})
export class UserModule { }
