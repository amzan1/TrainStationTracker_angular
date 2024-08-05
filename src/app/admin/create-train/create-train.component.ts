import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AdminService } from 'src/app/Services/admin.service';

@Component({
  selector: 'app-create-train',
  templateUrl: './create-train.component.html',
  styleUrls: ['./create-train.component.css']
})
export class CreateTrainComponent implements OnInit{
  // google map
  zoom = 16;
  center: google.maps.LatLngLiteral = { lat: 24.774265, lng: 46.738586 };
  markerPosition: google.maps.LatLngLiteral | undefined;

  options: google.maps.MapOptions = {
    mapTypeId: 'hybrid',
    zoomControl: true,
    scrollwheel: false,
    disableDoubleClickZoom: true,
    maxZoom: 15,
    minZoom: 8,
  };
  // google map

  upForm: FormGroup;

  constructor(private adminService: AdminService) {
    this.upForm = new FormGroup({
      stationname: new FormControl('', [Validators.required]),
      latitude: new FormControl('', [Validators.required]),
      longitude: new FormControl('', [Validators.required]),
      Imagename: new FormControl('',[Validators.required])
    });
  }
  // google map
  ngOnInit() {
    navigator.geolocation.getCurrentPosition((position) => {
      this.center = {
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      };
    });
  }

  click(event:google.maps.MapMouseEvent): void {
    if (event.latLng) {
      this.markerPosition = {
        lat: event.latLng.lat(),
        lng: event.latLng.lng()
      };
      this.upForm.patchValue({
        latitude: this.markerPosition.lat,
        longitude: this.markerPosition.lng
      });
    }
    }
  // google map
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
