import { Component, ElementRef, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  @Output() scrollToSection = new EventEmitter<string>();

  scrollTo(sectionId: string): void {
    this.scrollToSection.emit(sectionId);
  }
}