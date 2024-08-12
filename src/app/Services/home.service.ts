import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class HomeService {
  constructor(private http: HttpClient) { }
  contact: any = [];
  user: any = null;
  contactInfo() {
    this.http.get('https://localhost:7159/api/Contact/GetAllContactUsPage').subscribe(res => {
      this.contact = res;
      console.log(res);

    }, err => {
      console.log('somthing went wrong');

    })

  }
token(){
  let token = localStorage.getItem('token');


// Retrieve and parse the user data
// Retrieve the user data from local storage

let userData = localStorage.getItem('user');
this.user = userData ? JSON.parse(userData) : null;
console.log('hi');

console.log(this.user);

return this.user
}

// Check if user data exists and retrieve the userId


}



