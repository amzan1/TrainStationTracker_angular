import { Token } from '@angular/compiler';
import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { AdminService } from 'src/app/Services/admin.service';
import { AuthService } from 'src/app/Services/auth.service';
import { HomeService } from 'src/app/Services/home.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  @ViewChild('updateDialog') CallUpdateDialog!: TemplateRef<any>;
  upForm: FormGroup;
  constructor(private user: AdminService,private usertoken:HomeService,public dialog: MatDialog) {
    this.upForm = new FormGroup({
      firstname: new FormControl('', [Validators.required]),
      lastname: new FormControl('', [Validators.required]),
      username: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
      userid:new FormControl('')
    });
  
  }
  pData:any;

  profile: any = {};

  ngOnInit(): void {
    this.userProfile();
    this.updateProfile();
    
  }
  userProfile() {
    let user=this.usertoken.token()
    console.log(user);
    
    this.user.userProfile(user.Userid).subscribe(data => {
      
        this.profile = data;
        console.log(this.profile);
        
      }
    );
  }
  updateProfile() {
   
    console.log(this.upForm.value);
    this.user.updateProfile(this.upForm.value)
  }
  
  openUpdateDailog(User: any) {
    console.log('User:', User);
    
    const dialogResult = this.dialog.open(this.CallUpdateDialog, {
      panelClass: 'custom-dialog',
      width: '80vw', // Optional: you can set the width here as well
      height: '80vh' // Optional: you can set the height here as well
      
    });
    this.pData = User;
    console.log("PData:", User);
    console.log();
    
    let user = this.usertoken.token();
  let userId = user ? user.Userid : null;
    // Ensure the form control update happens after the dialog is opened
    dialogResult.afterOpened().subscribe(() => {
      if (userId) {
        this.upForm.controls['userid'].setValue(userId); // Set user ID from the token
      }
      
      this.upForm.controls['username'].setValue(this.pData.username);
      this.upForm.controls['email'].setValue(this.pData.email);
      this.upForm.controls['password'].setValue(this.pData.password);
      this.upForm.controls['firstname'].setValue(this.pData.firstname);
      this.upForm.controls['lastname'].setValue(this.pData.lastname);
     
      console.log("user data:", this.pData.userid);
    });
  }

}
