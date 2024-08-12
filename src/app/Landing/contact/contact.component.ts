import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/Services/admin.service';
import { HomeComponent } from '../home/home.component';
import { HomeService } from 'src/app/Services/home.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {
  constructor(public home:HomeService){}
  ngOnInit(): void {
   this.home.contactInfo();
  }
}
