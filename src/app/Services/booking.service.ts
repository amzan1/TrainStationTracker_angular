import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Trip, User } from './admin.service';

@Injectable({
  providedIn: 'root'
})
export class BookingService {

  IdTrip:number=0;
  constructor(private http : HttpClient) { }
  ID_Passing(id:number){
    this.IdTrip=id;
  }

  getTripById(id: number): Observable<Trip>{
    return this.http.get<Trip>(`https://localhost:7159/api/Trips/GetTripById/${id}`);
  }

  getUserById(id:string): Observable<User>{
    return this.http.get<User>(`https://localhost:7159/api/Login/GetUserById/${id}`)
  }

  createBooking(body:any){
    return this.http.post('https://localhost:7159/api/Booking/BookTrip',body)
  }
}
