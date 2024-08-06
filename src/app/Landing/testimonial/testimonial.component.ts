import {  Component } from '@angular/core';
import { AdminService } from 'src/app/Services/admin.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
@Component({
  selector: 'app-testimonial',
  templateUrl: './testimonial.component.html',
  styleUrls: ['./testimonial.component.css']
})
export class TestimonialComponent {
  upForm: FormGroup;
  constructor(public home:AdminService){
    this.upForm = new FormGroup({
      content: new FormControl('', [Validators.required]),
      userId: new FormControl('', [Validators.required])
    });
  }
  testimonials:any = [];



  ngOnInit(): void {
   this.fetchTestimonials()

  }
 
  fetchTestimonials(){
    this.home.getApprovedTestimonials().subscribe(
      data => {
        this.testimonials = data;
        console.log(this.testimonials);
        
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