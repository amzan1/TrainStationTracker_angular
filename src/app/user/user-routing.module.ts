import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfileComponent } from './profile/profile.component';
import { MyBookinksComponent } from './my-bookinks/my-bookinks.component';
import { AddTestimonialComponent } from './add-testimonial/add-testimonial.component';

const routes: Routes = [

  {
    path:'profile',
    component:ProfileComponent
  },
  {
    path:'myBookings',
    component:MyBookinksComponent
  },
  {
    path:'testimonials',
    component:AddTestimonialComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
