import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SharedModule } from '../shared/shared.module';
import { AppModule } from '../app.module';
import { HttpClientModule } from '@angular/common/http';
import { SidebarComponent } from './sidebar/sidebar.component';
import { UsersFilterPipe } from '../Pipes/users-filter.pipe';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TripsFilterPipe } from '../Pipes/trips-filter.pipe';
import { TripsComponent } from './trips/trips.component';
import { CreateTripsComponent } from './create-trips/create-trips.component';
import { TrainStationsComponent } from './train-stations/train-stations.component';
import { StationFilterPipe } from '../Pipes/station-filter.pipe';
import { CreateTrainComponent } from './create-train/create-train.component';
import { ReportsComponent } from './reports/reports.component';
import { MapComponent } from './map/map.component';
import { DateRangeFilterPipe } from '../Pipes/date-range-filter.pipe';
import { MAT_DATE_LOCALE, MatNativeDateModule, MatOptionModule } from '@angular/material/core';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { DateTripFilterPipe } from '../Pipes/date-trip-filter.pipe';
import { TestimonialsComponent } from './testimonials/testimonials.component';
import { MangeHomeComponent } from './mange-home/mange-home.component';
import { MangeAboutusComponent } from './mange-aboutus/mange-aboutus.component';
import { MangeContactusComponent } from './mange-contactus/mange-contactus.component';
import { GoogleMapsModule } from '@angular/google-maps'
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { OWL_DATE_TIME_FORMATS, OwlDateTimeModule, OwlNativeDateTimeModule } from '@danielmoncada/angular-datetime-picker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { OwlMomentDateTimeModule } from 'ng-pick-datetime-moment';

export const MY_MOMENT_FORMATS = {
  parseInput: 'DD/MM/YYYY HH:mm:ss',
  fullPickerInput: 'DD/MM/YYYY HH:mm:ss',
  datePickerInput: 'DD/MM/YYYY',
  timePickerInput: 'HH:mm:ss',
  monthYearLabel: 'MMM YYYY',
  dateA11yLabel: 'LL',
  monthYearA11yLabel: 'MMMM YYYY',
};

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
    
    

  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    SharedModule,
    HttpClientModule,
    FormsModule,  // Add FormsModule to imports
    ReactiveFormsModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatNativeDateModule,
    GoogleMapsModule,
    MatInputModule,
    MatSelectModule,
    MatOptionModule,
    MatDialogModule,
    MatButtonModule,
    OwlDateTimeModule,
    OwlNativeDateTimeModule,

    MatMomentDateModule,

    MatNativeDateModule
    
 
    

  ],
  exports: [
    DashboardComponent,
    CreateTripsComponent,
    UsersFilterPipe,
    TripsFilterPipe,
    StationFilterPipe,
    DateRangeFilterPipe
  ],
  providers: [
    { provide: MAT_DATE_LOCALE, useValue: 'en-GB' },
    { provide: OWL_DATE_TIME_FORMATS, useValue: MY_MOMENT_FORMATS }
  ]
})
export class AdminModule { }
