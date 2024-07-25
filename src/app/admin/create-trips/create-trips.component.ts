import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AdminService } from 'src/app/Services/admin.service';

@Component({
  selector: 'app-create-trips',
  templateUrl: './create-trips.component.html',
  styleUrls: ['./create-trips.component.css']
})
export class CreateTripsComponent implements OnInit{
  constructor(private adminService:AdminService){}
  updateForm: FormGroup = new FormGroup({
    originstationid : new FormControl('', [Validators.required]),
    destinationstationid : new FormControl('', [Validators.required]),
    departuretime : new FormControl('', [Validators.required]),
    duratointime : new FormControl('', [Validators.required]),
    availableseats : new FormControl('', [Validators.required]),
    price : new FormControl('', [Validators.required]),
      })
      pData:any;
      stations1:any;
      filteredStationsForOrigin: any = [];
      filteredStationsForDestination: any = [];
      save() {
        this.adminService.createTrip(this.updateForm.value)
      }


      ngOnInit(): void {
        this.adminService.getAllTrainStation().subscribe(data => {
          this.stations1 = data;
          this.filteredStationsForOrigin = data;
          this.filteredStationsForDestination = data;
        });
  
        this.updateForm.controls['originstationid'].valueChanges.subscribe(value => {
          this.filterStations();
        });
    
        this.updateForm.controls['destinationstationid'].valueChanges.subscribe(value => {
          this.filterStations();
        });
    } 
    filterStations() {
      const originStationId = this.updateForm.controls['originstationid'].value;
      const destinationStationId = this.updateForm.controls['destinationstationid'].value;
  
      this.filteredStationsForOrigin = this.stations1.filter((stations1: { stationid: any; }) => stations1.stationid !== destinationStationId);
      this.filteredStationsForDestination = this.stations1.filter((stations1: { stationid: any; }) => stations1.stationid !== originStationId);
    }
  }
      
