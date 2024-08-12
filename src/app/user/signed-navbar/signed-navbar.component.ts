import { Component } from '@angular/core';
import {Router } from '@angular/router';

@Component({
  selector: 'app-signed-navbar',
  templateUrl: './signed-navbar.component.html',
  styleUrls: ['./signed-navbar.component.css']
})
export class SignedNavbarComponent {
  constructor(private router:Router){}
  signOut() {
    localStorage.clear();
    this.router.navigate(['security/login'])
  }
}
