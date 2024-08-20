import { Component, OnDestroy, OnInit } from '@angular/core';
import { AdminService } from 'src/app/Services/admin.service';
import { interval, Subscription } from 'rxjs';

@Component({
  selector: 'app-landing-p',
  templateUrl: './landing-p.component.html',
  styleUrls: ['./landing-p.component.css']
})
export class LandingPComponent implements OnInit, OnDestroy {
  testimonials: any[] = [];
  currentTestimonials: any[] = [];
  currentIndex = 0;
  displayCount = 3; // Number of testimonials to display at a time
  homepage: any;
  stations: any;
  searchQuery = '';
  private subscription: Subscription = new Subscription();

  constructor(private adminService: AdminService) {}

  ngOnInit(): void {
    this.loadTestimonials();
    this.loadHomeContent();
    this.loadAllTrainStations();
  }

  private loadTestimonials() {
    this.adminService.getApprovedTestimonials().subscribe(res => {
      this.testimonials = res;
      this.updateCurrentTestimonials();
      this.startTestimonialRotation();
    });
  }

  private loadHomeContent() {
    this.adminService.getHomeContent().subscribe(data => {
      if (data && data.length > 0) {
        this.homepage = data[0]; // Assuming the API returns an array with one item
      }
    });
  }

  private loadAllTrainStations() {
    this.adminService.getAllTrainStation().subscribe(res => {
      this.stations = res;
    });
  }

  private updateCurrentTestimonials() {
    this.currentTestimonials = this.testimonials.slice(this.currentIndex, this.currentIndex + this.displayCount);
  }

  private startTestimonialRotation() {
    this.subscription.add(
      interval(3 * 1000).subscribe(() => { // Rotate every 10 seconds
        this.currentIndex += this.displayCount;
        if (this.currentIndex >= this.testimonials.length) {
          this.currentIndex = 0; // Loop back to the beginning
        }
        this.updateCurrentTestimonials();
      })
    );
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
