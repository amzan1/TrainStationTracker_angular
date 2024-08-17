import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AdminService, Trip, User } from 'src/app/Services/admin.service';
import { BookingService } from 'src/app/Services/booking.service';

@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.css']
})
export class InvoiceComponent implements OnInit {

  user: User | undefined;
  trip: Trip|undefined;
  currentDate: Date = new Date();

constructor(private bookingService:BookingService, private adminService:AdminService, private router:Router){}

invoiceNum:number = 0;

ngOnInit(): void {
  const userInfo=localStorage.getItem('user');
  if(userInfo){
    const userData = JSON.parse(userInfo);
     const UserId = userData.Userid;
     console.log(UserId);
     
     this.bookingService.getUserById(UserId).subscribe(
      (res:User)=> {
        this.user = res
      },
      (err) => {
        console.log('error');
        
      }
      
  );
  }

  const id=this.bookingService.IdTrip;
  this.bookingService.getTripById(id).subscribe(
    (res: Trip) => this.trip = res,
    (err) => console.log('error')
    
  );

  ///get number for invoice

  this.adminService.getNumberOfBookedTrips().subscribe((res)=>{
    this.invoiceNum=res
    console.log('hi')
  },
(err)=>{
  console.log('error :' +err)
})
  
}


goToMyBookings(){

  this.router.navigate(['user/myBookings'])
}
}
