import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { forkJoin, map, Observable } from 'rxjs';
import { Trip, User } from './admin.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class BookingService {

  IdTrip:number=0;
  constructor(private http : HttpClient, private router:Router, private toastr:ToastrService) { }
  ID_Passing(id:number){
    this.IdTrip=id;
  }
  
  getTripById(id: number): Observable<Trip>{
    return forkJoin({
      tripByID:this.http.get<Trip>(`https://localhost:7159/api/Trips/GetTripById/${id}`),
      stations: this.http.get<any[]>('https://localhost:7159/api/TrainStation/GetAllTrainStations')
    }).pipe(
      map(({tripByID , stations}: {tripByID: Trip; stations: any[]})=>{
        const stationMap = this.createStationMap(stations);
        return{
          ...tripByID,
          originstation: stationMap[tripByID.originstationid] || 'Unknown',
          destinationstation: stationMap[tripByID.destinationstationid] || 'Unknown',
        };
      })
    );
  }

  private createStationMap(stations: any[]): { [key: number]: string } {
    return stations.reduce((map, station) => {
      map[station.stationid] = station.stationname;
      return map;
    }, {} as { [key: number]: string });
  }

  getUserById(id:string): Observable<User>{
    return this.http.get<User>(`https://localhost:7159/api/Login/GetUserById/${id}`)
  }

  createBooking(body:any): void{
    this.http.post('https://localhost:7011/api/Booking/BookTrip',body,{ responseType: 'text' }).subscribe(
      (res: any) => {
        this.toastr.success(res);
        this.router.navigate(['user/invoice']);
      },
      (err: any) => {
        console.error('Booking failed: ', err);
        this.toastr.error('Booking failed. Please try again.');
      }
    );
  }

}
