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

  constructor(
    private _formBuilder: FormBuilder,
    public userService: UserService
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
  
  ngOnInit() {
    // Subscribe to username changes for real-time availability check
    this.secondFormGroup.get('username')?.valueChanges.subscribe(value => {
      this.checkUsername();
    });
  }

      onSubmit() {
        if (this.firstFormGroup.valid && this.secondFormGroup.valid && this.thirdFormGroup.valid) {
          const user = {
            ...this.firstFormGroup.value,
            ...this.secondFormGroup.value,
            ...this.thirdFormGroup.value
          };
          console.log('User:', user);
          
          this.userService.register(user)
            .subscribe(
              response => {
                console.log('Registration successful:', response);
                // Optionally, you can redirect to another page or show a success message
              },
              error => {
                console.error('Error registering user:', error);
                // Handle registration error (e.g., show error message)
              }
            );
        } else {
          // Handle form validation errors if needed
        }
      }
    
    

  checkUsername() {
    const username = this.secondFormGroup.get('username')?.value;
    if (username) {
      this.userService.checkUsernameAvailability(username)
        .subscribe(isAvailable => {
          this.userService.isAvailable = isAvailable;
          if (isAvailable) {
            this.secondFormGroup.get('username')?.setErrors({ taken: true });
          } else {
            this.secondFormGroup.get('username')?.setErrors(null);
          }
        }, error => {
          console.error('Error checking username availability:', error);
          // Handle error (e.g., show error message)
        });
    }
  }
}
