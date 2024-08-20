import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { AdminService } from 'src/app/Services/admin.service';
import * as $ from 'jquery'; // Import jQuery
import 'owl.carousel'; // Import Owl Carousel

@Component({
  selector: 'app-landing-p',
  templateUrl: './landing-p.component.html',
  styleUrls: ['./landing-p.component.css']
})
export class LandingPComponent implements OnInit, OnDestroy, AfterViewInit {
  testimonials: any[] = [];
  currentIndex = 0;
  sliderInterval: any;
constructor(private adminService:AdminService) {}
homepage:any
stations:any
searchQuery='';
  ngOnInit(): void {
    this.adminService.getApprovedTestimonials().subscribe((res => {
      this.testimonials = res;
      console.log(this.testimonials);
      
    }))
    this.adminService.getHomeContent().subscribe(data => {
      if (data && data.length > 0) {
        this.homepage = data[0]; // Assuming the API returns an array with one item
      }
    });
    this.adminService.getAllTrainStation().subscribe((res => {
      this.stations = res
    }));
    this.initializeCarousel();

  }
  ngAfterViewInit() {
    this.initializeCarousel();
  }
  initializeCarousel() {
    ($ as any)('#testimonial-slider').owlCarousel({
      items: 3,                // Display 3 items at a time
      loop: true,              // Infinite loop
      margin: 10,              // Margin between items
      autoplay: true,         // Enable autoplay
      autoplayTimeout: 1,  // Change slide every 5 seconds
      autoplayHoverPause: true, // Pause on hover
      nav: true,               // Show navigation arrows
      dots: false,             // Hide pagination dots
      responsive: {
        0: {
          items: 1 // Display 1 item on extra small screens
        },
        600: {
          items: 2 // Display 2 items on small screens
        },
        1000: {
          items: 3 // Display 3 items on medium and large screens
        }
      }
    });
  }
  
  ngOnDestroy() {
    // Cleanup Owl Carousel if necessary
    $('.owl-carousel').trigger('destroy.owl.carousel');
  }
}
