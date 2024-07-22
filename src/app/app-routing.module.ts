import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthModule } from './auth/auth.module';
import { AdminModule } from './admin/admin.module';

const routes: Routes = [
 

  {
    path: 'security',
    loadChildren: ()=>AuthModule
  },
  {
    path:'admin',
    loadChildren:()=>AdminModule
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
