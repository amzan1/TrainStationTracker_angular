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
import { TripsFilterPipe } from '../Pipes/trips-filter.pipe';
import { TripsComponent } from './trips/trips.component';
import { CreateTripsComponent } from './create-trips/create-trips.component';
import { TrainStationsComponent } from './train-stations/train-stations.component';
import { StationFilterPipe } from '../Pipes/station-filter.pipe';
import { CreateTrainComponent } from './create-train/create-train.component';
import { ReportsComponent } from './reports/reports.component';
import { MapComponent } from './map/map.component';
import { DateRangeFilterPipe } from '../Pipes/date-range-filter.pipe';
import { MatNativeDateModule } from '@angular/material/core';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { DateTripFilterPipe } from '../Pipes/date-trip-filter.pipe';
import { TestimonialsComponent } from './testimonials/testimonials.component';
import { MangeHomeComponent } from './mange-home/mange-home.component';
import { MangeAboutusComponent } from './mange-aboutus/mange-aboutus.component';
import { MangeContactusComponent } from './mange-contactus/mange-contactus.component';
import { ProfileComponent } from './profile/profile.component';



@NgModule({
  declarations: [
    DashboardComponent,
    SidebarComponent,
    UsersFilterPipe,
    TripsFilterPipe,
    TripsComponent,
    CreateTripsComponent,
    TrainStationsComponent,
    StationFilterPipe,
    CreateTrainComponent,
    ReportsComponent,
    MapComponent,
    DateRangeFilterPipe,
    DateTripFilterPipe,
    TestimonialsComponent,
    MangeHomeComponent,
    MangeAboutusComponent,
    MangeContactusComponent,
    ProfileComponent

  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    SharedModule,
    HttpClientModule,
    FormsModule,  // Add FormsModule to imports
    MatDatepickerModule,
    MatNativeDateModule,

  ],
  exports: [
    DashboardComponent,
    CreateTripsComponent,
    UsersFilterPipe,
    TripsFilterPipe,
    StationFilterPipe,
    DateRangeFilterPipe
  ]
})
export class AdminModule { }
