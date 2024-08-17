import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { window } from 'rxjs';
import { AdminService } from 'src/app/Services/admin.service';
import { HomeService } from 'src/app/Services/home.service';

@Component({
  selector: 'app-add-testimonial',
  templateUrl: './add-testimonial.component.html',
  styleUrls: ['./add-testimonial.component.css']
})
export class AddTestimonialComponent implements OnInit {
  upForm: FormGroup;
  Activate:boolean= true;

  constructor(private adminService: AdminService, private homeService: HomeService, private toaster: ToastrService) {
    this.upForm = new FormGroup({
      content: new FormControl('', [Validators.required]),
      userid: new FormControl('', [Validators.required]),
      status: new FormControl('pending', Validators.required),
      createdAt: new FormControl('', Validators.required)  // Add the createdAt field
    });
  }
    ngOnInit(): void {
      let user = this.homeService.token();
      let testimonial: any = this.upForm;
    
      this.upForm.controls['userid'].setValue(user.Userid);
      this.upForm.controls['content'].setValue(testimonial.content);
      this.upForm.controls['status'].setValue('pending');
      
      // Set the createdAt field to the current date and time
      this.upForm.controls['createdAt'].setValue(new Date().toISOString());
    }

  save() {
    if (this.upForm.valid) {
      this.adminService.createTestimonial(this.upForm.value);
      this.upForm.controls['content'].setValue('');
      this.Activate = false;
      this.toaster.success('Sent successfully!');
      console.log('saved');
      
    } else {
      console.error('Form is invalid');
    }
  }
}