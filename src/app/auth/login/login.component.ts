import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/Services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  constructor(private fb: FormBuilder, private userService: UserService) {
    this.loginForm = this.fb.group({
      userName: ['', Validators.required],
      Password: ['', Validators.required]
    });
  }

  ngOnInit(): void {}

  onSubmit() {
    if (this.loginForm.valid) {
      const credentials = this.loginForm.value;
      this.userService.login(credentials)
        .subscribe(response => {
          console.log('Login successful. Token:', response);
          // Handle successful login, e.g., store token in local storage
        }, error => {
          console.error('Login error:', error);
          // Handle login error, e.g., display error message
        });
    } else {
      // Handle form validation errors if needed
    }
  }
}
