import { Component } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  user = {
    username: '',
    password: '',
    email: '',
    firstname: '',
    lastname: ''
  };
  onSubmit() {
    console.log('User:', this.user);
    // Add your registration logic here
  }
}
