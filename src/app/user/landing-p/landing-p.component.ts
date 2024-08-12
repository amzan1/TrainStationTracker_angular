import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/Services/admin.service';

@Component({
  selector: 'app-landing-p',
  templateUrl: './landing-p.component.html',
  styleUrls: ['./landing-p.component.css']
})
export class LandingPComponent implements OnInit {
constructor(private adminService:AdminService) {}
testimonials:any
homepage:any
stations:any
searchQuery='';
  ngOnInit(): void {
    this.adminService.getApprovedTestimonials().subscribe((res => {
      this.testimonials = res;
    }))
    this.adminService.getHomeContent().subscribe(data => {
      if (data && data.length > 0) {
        this.homepage = data[0]; // Assuming the API returns an array with one item
      }
    });
    this.adminService.getAllTrainStation().subscribe((res => {
      this.stations = res
    }))
  }

}
