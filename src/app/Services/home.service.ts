import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HomeService {
  constructor(private http:HttpClient){}
contact:any =[];

contactInfo(){
  this.http.get('https://localhost:7159/api/Contact/GetAllContactUsPage').subscribe(res=>{
    this.contact=res;
    console.log(res);
    
  },err=>{
    console.log('somthing went wrong');
    
  })
}
  
}