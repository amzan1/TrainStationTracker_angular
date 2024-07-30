import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AdminService } from 'src/app/Services/admin.service';

@Component({
  selector: 'app-create-train',
  templateUrl: './create-train.component.html',
  styleUrls: ['./create-train.component.css']
})
export class CreateTrainComponent {
  upForm: FormGroup;

  constructor(private adminService: AdminService) {
    this.upForm = new FormGroup({
      stationname: new FormControl('', [Validators.required]),
      latitude: new FormControl('', [Validators.required]),
      longitude: new FormControl('', [Validators.required]),
      Imagename: new FormControl('',[Validators.required])
    });
  }

  save() {
    if (this.upForm.valid) {
      this.adminService.createTrainStation(this.upForm.value);
      window.location.reload();
    }
  }

  uploadImage(file:any){
    if(file.length ==0)
      return;

    let fileToUpload = <File> file[0];

    const formData = new FormData();
    formData.append('file' , fileToUpload,fileToUpload.name);
    this.adminService.uploadImage(formData);
  }
}
