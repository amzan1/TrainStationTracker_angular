import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { forkJoin, map, Observable, tap } from 'rxjs';
export interface User {
  userid: number;
  username: string;
  password: string;
  email: string;
  roleid: number;
  createdat: Date;
  firstname: string;
  lastname: string;
  role: number; // Adjust this type based on the actual 'role' structure
  bookings: any[];
  testimonials: any[];
}
export interface Station {
  stationid: number;
  stationname: string;
  latitude: number;
  longitude: number;
  createdat: string;
}
export interface Trip {
  tripid: number;
  originstationid: number;
  destinationstationid: number;
  departuretime: string; // ISO string
  duratointime: number; // in minutes
  availableseats: number;
  createdat: string;
  price: number;
  destinationstation: string | null;
  originstation: string | null;
  arrivalTime?: string; // Add this field to store calculated arrival time
}


@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http: HttpClient) { }
  numOfBookedTripsUrl = 'https://localhost:7159/api/Statistics/GetNumberOfBookedTrips';
  numOfTrainStationsUrl = 'https://localhost:7159/api/Statistics/GetNumberOfTrainStations';
  numOfActiveTripsUrl = 'https://localhost:7159/api/Statistics/GetNumberOfTrips';
  numOfUsersUrl = 'https://localhost:7159/api/Statistics/GetNumberOfUsers';
  totalRevinueUrl = 'https://localhost:7159/api/Statistics/GetTotalPrice';
  getAllUsersUrl = 'https://localhost:7159/api/Login/GetAllUsers';
  getAllTripsUrl = 'https://localhost:7159/api/Trips/GetAllTrips';
  UpdateTripUrl = 'https://localhost:7159/api/Trips/UpdateTrip';
  getAllStationsUrl = 'https://localhost:7159/api/TrainStation/GetAllTrainStations';
  deleteTrainUrl = 'https://localhost:7159/api/TrainStation/DeleteTrainstation/';
  deleteTripUrl = 'https://localhost:7159/api/Trips/DeleteTrip/';
  createTripUrl = 'https://localhost:7159/api/Trips/CreateTrip';
  updateTrainStationUrl = 'https://localhost:7159/api/TrainStation/UpdateTrainstation';
  createTrainStationUrl ='https://localhost:7159/api/TrainStation/CreateTrainstation';
  getAllReportsUrl ='https://localhost:7159/api/Report/Report';
  getTestimonialsUrl='https://localhost:7159/api/Testimonial/GetAllTestimonial';
  acceptTestimonialUrl='https://localhost:7159/api/Testimonial/AcceptTestimonial/';
  rejectTestimonialUrl ='https://localhost:7159/api/Testimonial/RejectTestimonial/';
  getTrips(): Observable<Trip[]> {
    return forkJoin({
      trips: this.http.get<Trip[]>(this.getAllTripsUrl),
      stations: this.http.get<any[]>(this.getAllStationsUrl)
    }).pipe(
      map(({ trips, stations }) => {
        const stationMap = this.createStationMap(stations);
        return trips.map(trip => ({
          ...trip,
          originstation: stationMap[trip.originstationid] || 'Unknown',
          destinationstation: stationMap[trip.destinationstationid] || 'Unknown',
          arrivalTime: this.calculateArrivalTime(trip.departuretime, trip.duratointime)
        }));
      })
    );
  }

  private createStationMap(stations: any[]): { [key: number]: string } {
    return stations.reduce((map, station) => {
      map[station.stationid] = station.stationname;
      return map;
    }, {} as { [key: number]: string });
  }

  private calculateArrivalTime(departureTime: string, duration: number): string {
    const departureDate = new Date(departureTime);
    departureDate.setMinutes(departureDate.getMinutes() + duration);
    return departureDate.toISOString();
  }

  getAllTrainStation() {
    return this.http.get(this.getAllStationsUrl)
  }
  updateTrip(body: any) {
    console.log('Updated');
    this.http.put(this.UpdateTripUrl, body).subscribe(res => {
      console.log("Updated");
      window.location.reload();

    },
      err => {
        console.log("Failed");
        console.log(err);
      })
  }
  createTrip(body: any) {
    console.log(body);
    this.http.post(this.createTripUrl, body).subscribe(res => {
      console.log("Created");

    },
      err => {
        console.log("Failed" + err);

      })
  }



  getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.getAllUsersUrl);
  }

  getNumberOfBookedTrips(): Observable<number> {
    return this.http.get<number>(this.numOfBookedTripsUrl);
  }

  getNumberOfTrainStations(): Observable<number> {
    return this.http.get<number>(this.numOfTrainStationsUrl);
  }

  getNumberOfActiveTrips(): Observable<number> {
    return this.http.get<number>(this.numOfActiveTripsUrl);
  }

  getNumberOfUsers(): Observable<number> {
    return this.http.get<number>(this.numOfUsersUrl);
  }

  getTotalRevinue(): Observable<number> {
    return this.http.get<number>(this.totalRevinueUrl);
  }
  
  getInitialReport(): Observable<any[]> {
    return forkJoin({
      Reports: this.http.get<any[]>(this.getAllReportsUrl),
      stations: this.http.get<any[]>(this.getAllStationsUrl)
    }).pipe(
      map(({ Reports, stations }) => {
        const stationMap = this.createStationMap(stations);
        return Reports.map(Reports => ({
          ...Reports,
          originstation: stationMap[Reports.originstationid] || 'Unknown',
          destinationstation: stationMap[Reports.destinationstationid] || 'Unknown',
        }));
      })
    );
  }

  getTestimonials(): Observable<any[]> {
    return forkJoin({
      testimonials: this.http.get<any[]>(this.getTestimonialsUrl),
      users: this.http.get<any[]>(this.getAllUsersUrl)
    }).pipe(
      map(({ testimonials, users }) => {
        // Create a map of userId to username
        const userMap = users.reduce((acc, user) => {
          acc[user.id] = user.username; // Assuming the user object has a 'username' field
          return acc;
        }, {});
  
        // Map through testimonials to add username
        return testimonials.map(testimonial => ({
          ...testimonial,
          username: userMap[testimonial.userId] || 'Unknown'
        }));
      })
    );
  }
  approveTestimonial(id: number): Observable<any> {
    return this.http.put(this.acceptTestimonialUrl + id, {});
  }

  rejectTestimonial(id: number): Observable<any> {
    return this.http.put(this.rejectTestimonialUrl + id, {});
  }
  

  DeleteTrip(id: number) {
    this.http.delete(this.deleteTripUrl + id).subscribe((res) => {
      console.log('Deleted');
      window.location.reload();
      this.getTrips();
    },
      err => {
        console.log("Error:" + err.status);
      })
  }

  DeleteTrain(id: number) {
    this.http.delete(this.deleteTrainUrl + id).subscribe((res) => {
      console.log('Deleted');
      window.location.reload();
      this.getAllTrainStation();
    },
      err => {
        console.log("Error:" + err.status);
      })
  }

  updateTrainStation(body: any) {
    console.log('Updated');
    this.http.put(this.updateTrainStationUrl, body).subscribe(res => {
      console.log("Updated");
      window.location.reload();

    },
      err => {
        console.log("Failed");
        console.log(err);
      })
  }

  createTrainStation(body: any) {
    console.log(body);
    this.http.post(this.createTrainStationUrl, body).subscribe(res => {
      console.log("Created");

    },
      err => {
        console.log("Failed" + err);

      })
  }
}