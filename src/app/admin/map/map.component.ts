import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

interface TrainStation {
  id: number;
  stationname: string;
  latitude: number;
  longitude: number;
}
interface Marker {
  position: google.maps.LatLngLiteral;
  label: {
    color: string;
    text: string;
  };
}
@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {
  zoom = 11;
  center: google.maps.LatLngLiteral= { lat: 24.774265, lng: 46.738586 };
  // options: google.maps.MapOptions = {
  //   mapTypeId: 'hybrid',
  //   zoomControl: true,
  //   scrollwheel: false,
  //   disableDoubleClickZoom: true,
  //   maxZoom: 15,
  //   minZoom: 8,
  // };

  markers: Marker[] = [];

  constructor(private http:HttpClient){}
 
  ngOnInit(): void {
    this.http.get<TrainStation[]>('https://localhost:7159/api/TrainStation/GetAllTrainStations').subscribe((res)=>{
      console.log(res);
      
      this.markers = res.map(item=>({
        position:{lat:item.latitude, lng: item.longitude},
        label:{color:'black', text: item.stationname}
      }));
    });
  }

  
 

}
