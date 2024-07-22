import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SharedModule } from '../shared/shared.module';
import { AppModule } from '../app.module';
import { HttpClientModule } from '@angular/common/http';
import { SidebarComponent } from './sidebar/sidebar.component';
import { UsersFilterPipe } from '../Pipes/users-filter.pipe';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    DashboardComponent,
    SidebarComponent,
    UsersFilterPipe,

  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    SharedModule,
    HttpClientModule,
    FormsModule,  // Add FormsModule to imports

  ],
  exports: [
    DashboardComponent,
    UsersFilterPipe,
     // Export if it needs to be used outside this module
  ]
})
export class AdminModule { }
