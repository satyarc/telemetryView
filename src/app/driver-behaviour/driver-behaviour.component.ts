import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpParams, HttpRequest} from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import 'rxjs/Rx';

@Component({
  selector: 'app-driver-behaviour',
  inputs: ['driverBehaviour:driverBehaviour'],
  templateUrl: './driver-behaviour.component.html',
  styleUrls: ['./driver-behaviour.component.css']
})
export class DriverBehaviourComponent implements OnInit {

constructor() {
    
  }

  ngOnInit() {
  }

}
