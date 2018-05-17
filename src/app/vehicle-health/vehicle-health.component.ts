import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-vehicle-health',
  inputs: ['pageInfoList:pageInfoList'],
  templateUrl: './vehicle-health.component.html',
  styleUrls: ['./vehicle-health.component.css']
})
export class VehicleHealthComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
