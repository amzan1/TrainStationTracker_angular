import { Component, OnInit } from '@angular/core';
import {DatePipe} from '@angular/common';
import {MatTabsModule} from '@angular/material/tabs';
import { AdminService, Trip } from 'src/app/Services/admin.service';
import { HomeService } from 'src/app/Services/home.service';
@Component({
  selector: 'app-my-bookinks',
  templateUrl: './my-bookinks.component.html',
  styleUrls: ['./my-bookinks.component.css']
})
export class MyBookinksComponent implements OnInit{
//   trips:any=[];
//   stations: { [key: number]: string } = {};
//   constructor(private user:AdminService,private usertoken:HomeService){

//   }
//   ngOnInit(): void {
//    this.user.GetUserTips;
//   }
//   GetUserTips() {
//     let user=this.usertoken.token()
//     console.log(user);
    
//     this.user.GetUserTips(user.Userid).subscribe(data => {
      
//         this.trips = data;
//         console.log(this.trips);
        
//       }
//     );
//   }
//   getStationName(id: number): string {
//     return this.stations[id] || 'Unknown';
//   }
// }
trips: Trip[] = [];
userId: string = '123'; // Replace with the actual user ID

constructor(private user: AdminService, private token:HomeService) {}

ngOnInit(): void {
  let user=this.token.token()
    console.log(user);
    
 this.user.GetUserTips(user.Userid).subscribe(data => {
      
        this.trips = data;
        console.log(this.trips);
})
}
}
