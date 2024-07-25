import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { AdminService } from 'src/app/Services/admin.service';

@Component({
  selector: 'app-train-stations',
  templateUrl: './train-stations.component.html',
  styleUrls: ['./train-stations.component.css']
})
export class TrainStationsComponent implements OnInit {
  constructor(public adminService: AdminService, public dialog: MatDialog) { }
  @ViewChild('deleteDialog') CallDeleteDialog!: TemplateRef<any>;
  @ViewChild('updateDialog') CallUpdateDialog!: TemplateRef<any>;
  pData: any;
  trainStations: any;

  _stationFilter: string = '';
  updateForm: FormGroup = new FormGroup({
    stationid: new FormControl('', [Validators.required]),  // Added stationid control
    stationname: new FormControl('', [Validators.required]),
    latitude: new FormControl('', [Validators.required]),
    longitude: new FormControl('', [Validators.required]),
  })

  ngOnInit(): void {
    this.adminService.getAllTrainStation().subscribe(data => {
      this.trainStations = data;
    })
  }

  openDeleteDialog(id: number) {
    const dialogResult =
      this.dialog.open(this.CallDeleteDialog);
    dialogResult.afterClosed().subscribe((res) => {
      if (res != undefined) {
        if (res == 'yes')
          this.adminService.DeleteTrain(id)
        else
          console.log('Thank you');
      }
      else {
        console.log("Err");
      }
    });
  }
  openUpdateDailog(train: any) {
    console.log('Train:', train);

    const dialogResult = this.dialog.open(this.CallUpdateDialog);
    this.pData = train;
    console.log("PData:", this.pData);

    // Ensure the form control update happens after the dialog is opened
    dialogResult.afterOpened().subscribe(() => {
      this.updateForm.controls['stationid'].setValue(this.pData.stationid);
      console.log("Station ID set to:", this.pData.stationid);
    });
  }

  updateTrainStation() {
    this.adminService.updateTrainStation(this.updateForm.value);
    console.log(this.updateForm.value);
    
    console.log("API HIT ");

  }


}
