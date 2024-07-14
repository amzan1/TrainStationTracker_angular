import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/Services/user.service';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  thirdFormGroup: FormGroup;
  isAvailable: boolean = true; // Initialize as boolean

  constructor(
    private _formBuilder: FormBuilder,
  ) {
    this.firstFormGroup = this._formBuilder.group({
      firstname: ['', [Validators.required, Validators.pattern('[a-zA-Z ]*')]],
      lastname: ['', Validators.required]
    });
    this.secondFormGroup = this._formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      username: ['', Validators.required]
    });
    this.thirdFormGroup = this._formBuilder.group({
      password: ['', Validators.required]
    });
  }
  
  ngOnInit() {}

  onSubmit() {
    if (this.firstFormGroup.valid && this.secondFormGroup.valid && this.thirdFormGroup.valid) {
      const user = {
        ...this.firstFormGroup.value,
        ...this.secondFormGroup.value,
        ...this.thirdFormGroup.value
      };
      console.log('User:', user);
      // Add your registration logic here, e.g., call a service to submit the form data
    } else {
      // Handle form validation errors if needed
    }
  }

  checkUsername() {
    
    }
  
  }
