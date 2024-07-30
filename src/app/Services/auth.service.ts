import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { jwtDecode } from "jwt-decode";
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient,private router: Router, private toastr:ToastrService) { }
  private loginUserApi = 'https://localhost:7159/api/Login/Login';
 
 
  Login(credentials: { userName: string; Password: string }) {
    console.log(credentials)
    const headerDirc = {
      'Content-Type' : 'application/json',
      'Accept' : 'application/json'
    }
 
    const requestOptions = {
      headers:new HttpHeaders(headerDirc)
    }
    this.http.post(this.loginUserApi, credentials,requestOptions).subscribe((res: any) => {
      const response = {
        token: res.toString()
      }
      // Save to Local Storage
      localStorage.setItem('token', response.token);
      console.log(response.token);
      let data:any = jwtDecode(response.token);
      localStorage.setItem('user',JSON.stringify(data));
      console.log(data);
      if(data.RoleId == '1')
      {       
        this.toastr.success('Welcome back, Admin!')
        this.router.navigate(['admin/dashboard'])
      }
      else if(data.RoleId == '2')
      {
        this.toastr.success('Welcome back')
        this.router.navigate([''])
 
      }
     
    }, err => {
      //this.toaster.error('Something Went Wrong')
    })
  }
}
  

