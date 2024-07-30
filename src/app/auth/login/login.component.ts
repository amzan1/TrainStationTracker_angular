import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { AuthService } from 'src/app/Services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: FormGroup;
 
 
  constructor(private fb: FormBuilder, public auth: AuthService, private spinner:NgxSpinnerService) {
    this.loginForm = this.fb.group({
      userName: ['', Validators.required],
      Password: ['', Validators.required]
    });
  }
 
  onSubmit() {
    this.spinner.show();
    setTimeout(()=>{
      this.spinner.hide();
    },3000);

    if (this.loginForm.valid) {
      const credentials = this.loginForm.value;
      this.auth.Login(credentials)
    }
  }
}
 


