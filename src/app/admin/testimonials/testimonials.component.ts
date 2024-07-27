import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/Services/admin.service';

@Component({
  selector: 'app-testimonials',
  templateUrl: './testimonials.component.html',
  styleUrls: ['./testimonials.component.css']
})
export class TestimonialsComponent implements OnInit{
  constructor(private AdminService:AdminService) {}
  testimonials:any = [];
  ngOnInit(): void {
    this.fetchTestimonials()
  }

  fetchTestimonials(){
    this.AdminService.getTestimonials().subscribe(
      data => {
        this.testimonials = data;
      },
      error => {
        console.error('Error fetching testimonials', error);
      }
    );
  }

  approveTest(testimonialId: number): void {
    this.AdminService.approveTestimonial(testimonialId).subscribe(
      response => {
        // Handle successful approval
      },
      error => {
        console.error('Error approving testimonial', error);
      }
    );
  }

  rejectTest(testimonialId: number): void {
    this.AdminService.rejectTestimonial(testimonialId).subscribe(
      response => {
       
      },
      error => {
        console.error('Error rejecting testimonial', error);
      }
    );
  }

  handleTestimonialAction(id: number, status: string): void {
    if (status === 'Approve') {
      this.AdminService.rejectTestimonial(id).subscribe(
        response => {
          this.fetchTestimonials(); // Refresh the list after rejection
        },
        error => {
          console.error('Error rejecting testimonial', error);
        }
      );
    } else {
      this.AdminService.approveTestimonial(id).subscribe(
        response => {
          this.fetchTestimonials(); // Refresh the list after approval
        },
        error => {
          console.error('Error approving testimonial', error);
        }
      );
    }
  }
}
