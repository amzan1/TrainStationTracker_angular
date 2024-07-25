import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  constructor(private http:HttpClient) { }
testimonials:any=[];
  getAllTestimonails(){
    this.http.get('').subscribe(res=>{
      this.testimonials=res;
    },err=>{
      console.log("error");
      
    })
  }
}
