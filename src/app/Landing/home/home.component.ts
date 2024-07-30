import { AfterViewInit, Component } from '@angular/core';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements AfterViewInit {
  testimonials = [
    { text: 'This is the best service ever!', author: 'John Doe' },
    { text: 'Absolutely fantastic experience!', author: 'Jane Smith' },
    { text: 'I couldn\'t be happier with the results!', author: 'Emily Johnson' }
  ];

  currentSlide = 0;

  ngAfterViewInit() {
    this.updateCarousel();
  }

  nextSlide() {
    const totalSlides = this.testimonials.length;
    this.currentSlide = (this.currentSlide + 1) % totalSlides;
    this.updateCarousel();
  }

  prevSlide() {
    const totalSlides = this.testimonials.length;
    this.currentSlide = (this.currentSlide - 1 + totalSlides) % totalSlides;
    this.updateCarousel();
  }

  updateCarousel() {
    const carouselInner = document.querySelector('.carousel-inner') as HTMLElement;
    const activeItems = carouselInner.querySelectorAll('.carousel-item');
    activeItems.forEach((item, index) => {
      item.classList.remove('active');
      if (index === this.currentSlide) {
        item.classList.add('active');
      }
    });
  }
}