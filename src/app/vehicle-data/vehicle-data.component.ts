import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-vehicle-data',
  inputs: ['pageInfo:pageInfo','pageInfoList:pageInfoList'],
  templateUrl: './vehicle-data.component.html',
  styleUrls: ['./vehicle-data.component.css']
})
export class VehicleDataComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
