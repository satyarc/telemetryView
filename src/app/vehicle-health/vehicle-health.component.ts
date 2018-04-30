import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-vehicle-health',
  inputs: ['vehicleHealth:vehicleHealth'],
  templateUrl: './vehicle-health.component.html',
  styleUrls: ['./vehicle-health.component.css']
})
export class VehicleHealthComponent implements OnInit {

  vehicleHealth = ["","","","","","","","","","","","","","","","","","","","","","","","","",""];
    
  constructor() { }

  ngOnInit() {
  }

}
