import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { forkJoin, map, Observable, switchMap, tap } from 'rxjs';
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
  image:string;
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

  constructor(private http: HttpClient, private toastr:ToastrService) { }
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
  getAllAprovedTestimonialUrl='https://localhost:7159/api/Testimonial/GetAllApprovedTestimonial';
  userCreateTestimonial='https://localhost:7159/api/Testimonial/WriteTestimonial';
  getUserById='https://localhost:7159/api/Login/GetUserById';
  updateUserProfile='https://localhost:7159/api/Login/UpdateProfile';
  getTripById='https://localhost:7159/api/Trips/GetTripById';
  getUserBookingUrl='https://localhost:7159/api/Booking/GetUserBookings';


  // Pages Management 
  getHomeContentUrl ='https://localhost:7159/api/HomePage/GetAllHomePage';
  updateHomeContentUrl = 'https://localhost:7159/api/HomePage/UpdateHomePage';

  getAboutUsContentUrl ='https://localhost:7159/api/AboutUs/GetAllAboutUsPage';
  updateAboutUsUrl ='https://localhost:7159/api/AboutUs/UpdateAboutUsPage';

  getContactUsUrl ='https://localhost:7159/api/Contact/GetAllContactUsPage';
  updateContactUsUrl ='https://localhost:7159/api/Contact/UpdateContactUsPage';

  uploadImageUrl = 'https://localhost:7159/api/UploadImage';
  displayImg:any;
// Upload images
uploadAttachments(img: FormData) {
  this.http.post(this.uploadImageUrl, img, { responseType: 'text' }).subscribe({
    next: (res: string) => {
      this.displayImg = res; // Directly assign the plain text response
      console.log(this.displayImg);
    },
    error: (err) => {
      console.error('Error uploading image:', err);
    }
  });
}



  getContactusPage(): Observable<any[]> {
    return this.http.get<any[]>(this.getContactUsUrl);
  }

  updateContactUsContent(body: any): Observable<any> {
    return this.http.put(this.updateContactUsUrl, body);
  }

  getAboutusPage(): Observable<any[]> {
    return this.http.get<any[]>(this.getAboutUsContentUrl);
  }

  updateAboutUsContent(body: any): Observable<any> {
    body.image = this.displayImg;
    return this.http.put(this.updateAboutUsUrl, body);
  }

  getHomeContent(): Observable<any[]> {
    return this.http.get<any[]>(this.getHomeContentUrl);
  }

  updateHomeContent(body: any): Observable<any> {
    body.image = this.displayImg;
    return this.http.put(this.updateHomeContentUrl, body);
  }



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
      this.toastr.success('Update successful!');

      window.location.reload();

    },
      err => {
        console.log("Failed");
        this.toastr.error('Update failed. Please try again.');
        console.log(err);
      })
  }
  createTrip(body: any) {
    console.log(body);
    this.http.post(this.createTripUrl, body).subscribe(res => {
      console.log("Created");
      this.toastr.success('Create successful!');


    },
      err => {
        console.log("Failed" + err);
        this.toastr.error('Create failed. Please try again.');


      })
  }
  trips:any=[];
  GetUserTips(id: number): Observable<any>{

      this.trips= this.http.get(this.getTripById  +id).subscribe(data=>{
console.log('success');

       },err=>{
console.log('error');

       });
       return this.trips
  }



  getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.getAllUsersUrl);
  }
  users:any=[]
  userProfile (id: number): Observable<User> {
this.users=this.http.get<User>(`${this.getUserById}/${id}`);
console.log(this.users);

    return this.users
  }

  updateProfile(body: any) {
  
    this.http.put(this.updateUserProfile, body ).subscribe(
      res => {
        console.log(res);
        
        console.log("Updated");
        this.toastr.success('Update successful!');
        window.location.reload();
      },
      err => {
        console.log("Failed update profile");
        // this.toastr.error('Update failed. Please try again.');
        console.log(err);
      }
    );
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
  getApprovedTestimonials(): Observable<any[]> {
    return forkJoin({
      testimonials: this.http.get<any[]>(this.getAllAprovedTestimonialUrl),
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
  createTestimonial(body: any) {
    console.log(body);
    this.http.post(this.userCreateTestimonial, body).subscribe(res => {
      console.log("Created");
      this.toastr.success('Create successful!');
    },
      err => {
        console.log("Failed" + err);
        this.toastr.error('Create failed. Please try again.');
      })
  }  

  DeleteTrip(id: number) {
    this.http.delete(this.deleteTripUrl + id).subscribe((res) => {
      console.log('Deleted');
      this.toastr.success('Delete successful! The item has been removed.');

      window.location.reload();
      this.getTrips();
    },
      err => {
        console.log("Error:" + err.status);
        this.toastr.error('Delete failed. Please try again.');

      })
  }

  DeleteTrain(id: number) {
    this.http.delete(this.deleteTrainUrl + id).subscribe((res) => {
      console.log('Deleted');
      this.toastr.success('Delete successful! The item has been removed.');
      window.location.reload();
      this.getAllTrainStation();
    },
      err => {
        console.log("Error:" + err.status);
        this.toastr.error('Delete failed. Please try again.');

      })
  }

  updateTrainStation(body: any) {
    body.Image=this.displayImage;
    console.log(body);
    this.http.put(this.updateTrainStationUrl, body).subscribe(res => {
      console.log("Updated");
      this.toastr.success('Update successful!');
      window.location.reload();

    },
      err => {
        console.log("Updated Failed");
        console.log(err);
        this.toastr.error('Update failed. Please try again.');

      })
  }

  createTrainStation(body: any) {
    body.Image=this.displayImage;
    console.log(body);
    this.http.post(this.createTrainStationUrl, body).subscribe(res => {
      console.log("Created");
      this.toastr.success('Create successful!');


    },
      err => {
        console.log("Failed" + err);
        this.toastr.error('Create failed. Please try again.');

      })
  }


  displayImage:any;
  uploadImage(image:FormData){
    this.http.post('https://localhost:7159/api/UploadImage',image).subscribe((res:any)=>{
      this.displayImage= res.image;
      console.log(res);
    },err=>{
      console.log('uplodImage error'+err);
    })

  }
bookings:any=[];
    GetUserBook (id: number): Observable<any> {
      this.bookings=this.http.get<any>(`${this.getUserBookingUrl}/${id}`);
      console.log(this.bookings);
      
          return this.bookings
        }
  }
  
