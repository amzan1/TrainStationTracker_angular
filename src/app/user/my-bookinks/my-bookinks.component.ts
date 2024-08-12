import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { MatTabsModule } from '@angular/material/tabs';
import { AdminService, Trip } from 'src/app/Services/admin.service';
import { HomeService } from 'src/app/Services/home.service';
@Component({
  selector: 'app-my-bookinks',
  templateUrl: './my-bookinks.component.html',
  styleUrls: ['./my-bookinks.component.css']
})
export class MyBookinksComponent implements OnInit {
  displayedColumns: string[] = ['username', 'bookingtime', 'departuretime', 'duratointime', 'price', 'paymentstatus'];

  bookings: any ;
  currentDate: Date = new Date();
  constructor(private user: AdminService, private token: HomeService) { }
  
  ngOnInit(): void {
    this.GetUserBookings()


  }

  GetUserBookings() {
    let user=this.token.token()
    console.log(user);
    
    this.user.GetUserBook(user.Userid).subscribe(data => {
      
        this.bookings = data;
        console.log(this.bookings);
        
      }
    );
}
}