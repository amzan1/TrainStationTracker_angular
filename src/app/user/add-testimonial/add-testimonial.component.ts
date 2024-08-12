import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AdminService } from 'src/app/Services/admin.service';
import { HomeService } from 'src/app/Services/home.service';

@Component({
  selector: 'app-add-testimonial',
  templateUrl: './add-testimonial.component.html',
  styleUrls: ['./add-testimonial.component.css']
})
export class AddTestimonialComponent implements OnInit {
  upForm: FormGroup;

  constructor(private adminService: AdminService, private homeService: HomeService) {
    this.upForm = new FormGroup({
      content: new FormControl('', [Validators.required]),
      userid: new FormControl('', [Validators.required]),
      
    });
  }

  ngOnInit(): void {
    let user = this.homeService.token();
    let testimonial:any=this.upForm;
    this.upForm.controls['userid'].setValue(user.Userid);
    this.upForm.controls['content'].setValue(testimonial.content);
  }

  save() {
    if (this.upForm.valid) {
      this.adminService.createTestimonial(this.upForm.value);
      console.log('saved');
    } else {
      console.error('Form is invalid');
    }
  }
}