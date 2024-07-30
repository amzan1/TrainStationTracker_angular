import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthModule } from './auth/auth.module';
import { AdminModule } from './admin/admin.module';
import { HomeComponent } from './Landing/home/home.component';
import { AboutComponent } from './Landing/about/about.component';
import { ContactComponent } from './Landing/contact/contact.component';

const routes: Routes = [
 

  {
    path: 'security',
    loadChildren: ()=>AuthModule
  },
  {
    path:'admin',
    loadChildren:()=>AdminModule
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
  }
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
