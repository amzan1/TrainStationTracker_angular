import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AdminService } from 'src/app/Services/admin.service';



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  @ViewChild('contactSection') contactSection!: ElementRef;
  @ViewChild('aboutSection') aboutSection!: ElementRef;
  onScrollToSection(sectionId: string): void {
    switch (sectionId) {
      case 'about-section':
        this.scrollTo(this.aboutSection);
        break;
      case 'contact-section':
        this.scrollTo(this.contactSection);
        break;
    }
  }

  private scrollTo(element: ElementRef): void {
    element.nativeElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
  constructor(public home:AdminService){}
  aboutContent: any = {}; // Initialize as an empty object
  homeContent: any = {}; // Initialize as an empty object
  contactContent: any = {}; // Initialize as an empty object
  testimonials:any = [];
  ngOnInit(): void {
    this.fetchAboutUsPageContents();
    this.fetchHomePageContents();
    this.fetchContactUsPageContents();
   this.fetchTestimonials()
  }
 
    fetchTestimonials(){
      this.home.getTestimonials().subscribe(
        data => {
          this.testimonials = data;
        },
        error => {
          console.error('Error fetching testimonials', error);
        }
      );
    }
  fetchContactUsPageContents() {
    this.home.getContactusPage().subscribe(data => {
      if (data && data.length > 0) {
        this.contactContent = data[0]; // Assuming the API returns an array with one item
      }
    });
  }
  fetchHomePageContents() {
    this.home.getHomeContent().subscribe(data => {
      if (data && data.length > 0) {
        this.homeContent = data[0]; // Assuming the API returns an array with one item
      }
    });
  }

  fetchAboutUsPageContents() {
    this.home.getAboutusPage().subscribe(data => {
      if (data && data.length > 0) {
        this.aboutContent = data[0]; // Assuming the API returns an array with one item
      } 
    });
   

  }
  activeIndex = 0;

  prevSlide() {
    this.activeIndex = (this.activeIndex > 0) ? this.activeIndex - 1 : this.testimonials.length - 1;
  }

  nextSlide() {
    this.activeIndex = (this.activeIndex < this.testimonials.length - 1) ? this.activeIndex + 1 : 0;
  }
}