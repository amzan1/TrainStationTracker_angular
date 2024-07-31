import { AfterViewInit, Component } from '@angular/core';
import { AdminService } from 'src/app/Services/admin.service';

@Component({
  selector: 'app-testimonial',
  templateUrl: './testimonial.component.html',
  styleUrls: ['./testimonial.component.css']
})
export class TestimonialComponent {
  constructor(public home:AdminService){}
  testimonials:any = [];



  ngOnInit(): void {
   this.fetchTestimonials()
  }
  fetchTestimonials(){
    this.home.getApprovedTestimonials().subscribe(
      data => {
        this.testimonials = data;
      },
      error => {
        console.error('Error fetching testimonials', error);
      }
    );
  }
  activeIndex = 0;

  prevSlide() {
    this.activeIndex = (this.activeIndex > 0) ? this.activeIndex - 1 : this.testimonials.length - 1;
  }

  nextSlide() {
    this.activeIndex = (this.activeIndex < this.testimonials.length - 1) ? this.activeIndex + 1 : 0;
  }
}