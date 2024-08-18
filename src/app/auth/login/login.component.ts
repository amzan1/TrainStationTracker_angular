import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/Services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: FormGroup;
 
 
  constructor(private fb: FormBuilder, public auth: AuthService, private spinner:NgxSpinnerService, private toastr:ToastrService) {
    this.loginForm = this.fb.group({
      userName: ['', Validators.required],
      Password: ['', Validators.required]
    });
    this.loginForm.setErrors({ unauthenticated: true });

  }
 
  onSubmit() {
    this.spinner.show();
    setTimeout(()=>{
      this.spinner.hide();
    },1000);

    if (this.loginForm.valid) {
      const credentials = this.loginForm.value;
      this.auth.Login(credentials)
      this.loginForm.setErrors({ unauthenticated: true });

    }
  }
  
}
 


