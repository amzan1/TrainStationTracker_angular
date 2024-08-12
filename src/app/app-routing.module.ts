import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthModule } from './auth/auth.module';
import { AdminModule } from './admin/admin.module';
import { HomeComponent } from './Landing/home/home.component';
import { AboutComponent } from './Landing/about/about.component';
import { ContactComponent } from './Landing/contact/contact.component';
import { authorizationGuard } from './authorization.guard';
import { TestimonialComponent } from './Landing/testimonial/testimonial.component';
import { UserModule } from './user/user.module';

const routes: Routes = [
 

  {
    path: 'security',
    loadChildren: ()=>AuthModule
  },
  {
    path:'',
    component:HomeComponent
  },
  {
    path:'admin',
    loadChildren:()=>AdminModule,
    canActivate:[authorizationGuard]

  },
  {
    path:'user',
    loadChildren:()=>UserModule,

    canActivate:[authorizationGuard]
  },
  {
    path:'',
    component:HomeComponent
  },
  {
    path:'about',
    component:AboutComponent
  },
  {
    path:'contact',
    component:ContactComponent

  },
  {
    path:'testimonial',
component:TestimonialComponent
  },
  {
    path: 'user',
    loadChildren: ()=>UserModule
  }
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
