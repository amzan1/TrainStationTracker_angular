import {  Component, OnDestroy, OnInit } from '@angular/core';
import { AdminService } from 'src/app/Services/admin.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Subscription, interval } from 'rxjs';
@Component({
  selector: 'app-testimonial',
  templateUrl: './testimonial.component.html',
  styleUrls: ['./testimonial.component.css']
})
export class TestimonialComponent implements OnInit, OnDestroy {
  testimonials: any[] = [];
  currentTestimonials: any[] = [];
  currentIndex = 0;
  displayCount = 3; // Number of testimonials to display at a time
  private subscription: Subscription = new Subscription();

  constructor(private adminService: AdminService) {}

  ngOnInit(): void {
    this.loadTestimonials();
  }

  private loadTestimonials() {
    this.adminService.getApprovedTestimonials().subscribe(res => {
      this.testimonials = res;
      this.updateCurrentTestimonials();
      this.startTestimonialRotation();
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