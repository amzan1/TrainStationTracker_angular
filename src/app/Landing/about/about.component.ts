import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/Services/admin.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {
  constructor(public home: AdminService) { }
  aboutContent: any = {}; // Initialize as an empty object
  ngOnInit(): void {
    this.fetchAboutUsPageContents();
  }

  fetchAboutUsPageContents() {
    this.home.getAboutusPage().subscribe(data => {
      if (data && data.length > 0) {
        this.aboutContent = data[0]; // Assuming the API returns an array with one item
      }
    });
  }
}
